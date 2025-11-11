//! AlgoLab - Backend Rust pour l'interprétation d'algorithmes
//!
//! Ce module est le point d'entrée principal du backend Tauri.
//! Il orchestre les trois phases d'exécution d'un algorithme :
//! 1. **Analyse lexicale** (lexer) - Transformation du code en tokens
//! 2. **Analyse syntaxique** (parser) - Construction de l'arbre syntaxique
//! 3. **Interprétation** (interpreter) - Exécution de l'algorithme

pub mod lexer;
pub mod parser;
pub mod interpreter;
pub mod native_functions;

use lexer::Lexer;
use parser::Parser;
use interpreter::Interpreter;
use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use std::sync::mpsc::{channel, Sender, Receiver};
use tauri::Emitter;

/// Résultat d'exécution d'un algorithme
///
/// Structure renvoyée au frontend TypeScript après l'exécution d'un algorithme.
/// Contient le statut de succès, les sorties générées et les éventuelles erreurs.
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ExecutionResult {
    /// Indique si l'exécution s'est terminée avec succès
    success: bool,
    /// Lignes de sortie produites par l'algorithme (via Ecrire)
    output: Vec<String>,
    /// Message d'erreur en cas d'échec (lexicale, syntaxique ou d'exécution)
    error: Option<String>,
}

/// Requête d'entrée envoyée au frontend
///
/// Structure émise via événement quand l'interpréteur a besoin d'une valeur
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct InputRequest {
    /// Texte du dernier Ecrire() avant le Lire(), s'il existe
    pub prompt: String,
    /// Noms des variables à lire
    pub variables: Vec<String>,
    /// true si un Ecrire() précède le Lire()
    pub has_prompt: bool,
    /// Output accumulé jusqu'à ce point (pour affichage en temps réel)
    pub current_output: Vec<String>,
}

/// Mise à jour de l'output envoyée au frontend
///
/// Structure émise via événement après chaque Ecrire() pour affichage en temps réel
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct OutputUpdate {
    /// Lignes complètes (avec \n)
    pub output: Vec<String>,
    /// Ligne courante incomplète (sans \n terminal)
    pub current_line: String,
}

/// Mise à jour des variables envoyée au frontend
///
/// Structure émise après chaque instruction pour afficher l'état des variables
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct VariablesUpdate {
    /// Variables avec leurs valeurs formatées
    pub variables: Vec<VariableInfo>,
}

/// Information sur une variable
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct VariableInfo {
    pub name: String,
    pub value: String,
    pub var_type: String,
}

/// État de l'exécution partagé entre les threads
type ExecutionState = Arc<Mutex<Option<Sender<Vec<String>>>>>;

/// Gestionnaire d'état pour l'exécution en cours
#[derive(Clone)]
struct AppState {
    /// Channel pour envoyer les valeurs d'entrée à l'interpréteur
    input_sender: ExecutionState,
}

/// Commande Tauri pour envoyer des valeurs d'entrée à l'interpréteur en cours d'exécution
///
/// Cette fonction est appelée par le frontend quand l'utilisateur a entré des valeurs
/// dans la modal d'entrée. Elle transmet ces valeurs à l'interpréteur via le channel.
///
/// # Arguments
///
/// * `values` - Les valeurs entrées par l'utilisateur
/// * `state` - État de l'application contenant le channel
///
/// # Retour
///
/// Retourne un Result indiquant si l'envoi a réussi
#[tauri::command]
fn send_input_values(values: Vec<String>, state: tauri::State<AppState>) -> Result<(), String> {
    let sender_lock = state.input_sender.lock().unwrap();
    if let Some(sender) = sender_lock.as_ref() {
        sender.send(values).map_err(|e| format!("Erreur lors de l'envoi des valeurs: {}", e))?;
        Ok(())
    } else {
        Err("Aucune exécution en cours".to_string())
    }
}

/// Commande Tauri pour exécuter un algorithme de manière asynchrone avec entrées dynamiques
///
/// Cette fonction lance l'exécution dans un thread séparé et utilise des événements
/// pour demander des entrées au frontend pendant l'exécution.
///
/// # Arguments
///
/// * `code` - Le code source de l'algorithme en français
/// * `app` - Handle de l'application Tauri pour émettre des événements
/// * `state` - État de l'application pour gérer le channel
///
/// # Retour
///
/// Retourne immédiatement, les résultats sont envoyés via événements
#[tauri::command]
async fn execute_algorithm_async(
    code: String,
    app: tauri::AppHandle,
    state: tauri::State<'_, AppState>,
) -> Result<(), String> {
    // Créer un channel pour recevoir les valeurs d'entrée
    let (tx, rx): (Sender<Vec<String>>, Receiver<Vec<String>>) = channel();

    // Stocker le sender dans l'état partagé
    {
        let mut sender_lock = state.input_sender.lock().unwrap();
        *sender_lock = Some(tx);
    }

    // Exécuter dans l'async runtime de Tauri
    tauri::async_runtime::spawn(async move {
        // Phase 1 : Analyse lexicale (tokenisation)
        let mut lexer = Lexer::new(code);
        let tokens = match lexer.tokenize() {
            Ok(t) => t,
            Err(e) => {
                let result = ExecutionResult {
                    success: false,
                    output: vec![],
                    error: Some(format!("Erreur lexicale: {}", e)),
                };
                let _ = app.emit("execution-complete", result);
                return;
            }
        };

        // Phase 2 : Analyse syntaxique (construction de l'AST)
        let mut parser = Parser::new(tokens);
        let algorithm = match parser.parse() {
            Ok(a) => a,
            Err(e) => {
                let result = ExecutionResult {
                    success: false,
                    output: vec![],
                    error: Some(format!("Erreur de syntaxe: {}", e)),
                };
                let _ = app.emit("execution-complete", result);
                return;
            }
        };

        // Phase 3 : Interprétation et exécution avec callbacks pour entrées et sorties
        let app_for_callback = app.clone();
        let app_for_output = app.clone();
        let app_for_result = app.clone();

        // Exécuter l'interpréteur dans spawn_blocking (code synchrone bloquant)
        let _ = tauri::async_runtime::spawn_blocking(move || {
            let mut interpreter = Interpreter::new_with_callbacks(
            // Input callback
            Box::new(move |prompt, variables, has_prompt, current_output| {
                // Émettre une requête d'entrée vers le frontend avec l'output actuel
                let request = InputRequest {
                    prompt: prompt.to_string(),
                    variables: variables.to_vec(),
                    has_prompt,
                    current_output: current_output.to_vec(),
                };

                if app_for_callback.emit("input-request", request).is_err() {
                    return Err("Impossible d'émettre la requête d'entrée".to_string());
                }

                // Attendre la réponse du frontend
                match rx.recv() {
                    Ok(values) => Ok(values),
                    Err(_) => Err("Timeout ou canal fermé en attente des valeurs".to_string()),
                }
            }),
            // Output callback - envoi en temps réel après chaque Ecrire()
            Box::new(move |complete_lines, current_line| {
                let update = OutputUpdate {
                    output: complete_lines.to_vec(),
                    current_line: current_line.to_string(),
                };

                // Émettre l'événement vers le frontend
                app_for_output.emit("output-update", update)
                    .map_err(|_| "Impossible d'émettre la mise à jour de l'output".to_string())?;

                // Petit délai pour permettre au frontend de traiter l'événement
                std::thread::sleep(std::time::Duration::from_millis(1));
                Ok(())
            })
        );

            match interpreter.run(algorithm) {
                Ok(output) => {
                    let result = ExecutionResult {
                        success: true,
                        output,
                        error: None,
                    };
                    let _ = app_for_result.emit("execution-complete", result);
                }
                Err(e) => {
                    let result = ExecutionResult {
                        success: false,
                        output: vec![],
                        error: Some(format!("Erreur d'exécution: {}", e)),
                    };
                    let _ = app_for_result.emit("execution-complete", result);
                }
            }
        }).await; // Attendre la fin du spawn_blocking
    });

    Ok(())
}

/// Commande Tauri pour exécuter un algorithme en français (version synchrone - pour compatibilité)
///
/// Cette fonction est exposée au frontend via l'API Tauri invoke.
/// Elle gère l'ensemble du pipeline d'exécution :
/// - Tokenisation du code source
/// - Analyse syntaxique et construction de l'AST
/// - Interprétation avec gestion des entrées/sorties
///
/// # Arguments
///
/// * `code` - Le code source de l'algorithme en français
/// * `input_values` - Valeurs d'entrée fournies pour Lire()
///
/// # Retour
///
/// Retourne un `ExecutionResult` contenant le résultat de l'exécution
#[tauri::command]
fn execute_algorithm(code: String, input_values: Vec<String>) -> ExecutionResult {
    // Phase 1 : Analyse lexicale (tokenisation)
    let mut lexer = Lexer::new(code);
    let tokens = match lexer.tokenize() {
        Ok(t) => t,
        Err(e) => {
            return ExecutionResult {
                success: false,
                output: vec![],
                error: Some(format!("Erreur lexicale: {}", e)),
            }
        }
    };

    // Phase 2 : Analyse syntaxique (construction de l'AST)
    let mut parser = Parser::new(tokens);
    let algorithm = match parser.parse() {
        Ok(a) => a,
        Err(e) => {
            return ExecutionResult {
                success: false,
                output: vec![],
                error: Some(format!("Erreur de syntaxe: {}", e)),
            }
        }
    };

    // Phase 3 : Interprétation et exécution
    let mut interpreter = Interpreter::new(input_values);
    match interpreter.run(algorithm) {
        Ok(output) => ExecutionResult {
            success: true,
            output,
            error: None,
        },
        Err(e) => ExecutionResult {
            success: false,
            output: vec![],
            error: Some(format!("Erreur d'exécution: {}", e)),
        },
    }
}

/// Point d'entrée principal de l'application Tauri
///
/// Configure et lance l'application avec les plugins nécessaires :
/// - `tauri_plugin_opener` : Ouvre des URLs/fichiers
/// - `tauri_plugin_dialog` : Boîtes de dialogue pour sauvegarde/ouverture
/// - `tauri_plugin_fs` : Accès au système de fichiers
///
/// Enregistre les commandes accessibles depuis le frontend.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .manage(AppState {
            input_sender: Arc::new(Mutex::new(None)),
        })
        .invoke_handler(tauri::generate_handler![
            execute_algorithm,
            execute_algorithm_async,
            send_input_values
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
