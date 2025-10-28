mod lexer;
mod parser;
mod interpreter;

use lexer::Lexer;
use parser::Parser;
use interpreter::Interpreter;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct ExecutionResult {
    success: bool,
    output: Vec<String>,
    error: Option<String>,
}

#[tauri::command]
fn execute_algorithm(code: String, input_values: Vec<String>) -> ExecutionResult {
    // Tokenize
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

    // Parse
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

    // Execute
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![execute_algorithm])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
