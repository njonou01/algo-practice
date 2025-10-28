//! AlgoLab - Backend Rust pour l'interprétation d'algorithmes
//!
//! Ce module est le point d'entrée principal du backend Tauri.
//! Il orchestre les trois phases d'exécution d'un algorithme :
//! 1. **Analyse lexicale** (lexer) - Transformation du code en tokens
//! 2. **Analyse syntaxique** (parser) - Construction de l'arbre syntaxique
//! 3. **Interprétation** (interpreter) - Exécution de l'algorithme

mod lexer;
mod parser;
mod interpreter;

use lexer::Lexer;
use parser::Parser;
use interpreter::Interpreter;
use serde::{Deserialize, Serialize};

/// Résultat d'exécution d'un algorithme
///
/// Structure renvoyée au frontend TypeScript après l'exécution d'un algorithme.
/// Contient le statut de succès, les sorties générées et les éventuelles erreurs.
#[derive(Debug, Serialize, Deserialize)]
pub struct ExecutionResult {
    /// Indique si l'exécution s'est terminée avec succès
    success: bool,
    /// Lignes de sortie produites par l'algorithme (via Ecrire)
    output: Vec<String>,
    /// Message d'erreur en cas d'échec (lexicale, syntaxique ou d'exécution)
    error: Option<String>,
}

/// Commande Tauri pour exécuter un algorithme en français
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
/// Enregistre la commande `execute_algorithm` accessible depuis le frontend.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![execute_algorithm])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
