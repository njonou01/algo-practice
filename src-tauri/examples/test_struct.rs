use algo_practice_lib::{lexer::Lexer, parser::Parser, interpreter::Interpreter};

fn main() {
    let code = r#"Algorithme TestStructure

Structure Point
  x : Entier
  y : Entier
FinStructure

Variables
  p1, p2 : Point
  somme : Entier

Debut
  // Test lecture des champs
  Ecrire("Point 1 - x:\n")
  Lire(p1.x)
  Ecrire("Point 1 - y:\n")
  Lire(p1.y)

  // Test affectation
  p2.x <- 10
  p2.y <- 20

  // Test affichage
  Ecrire("Point 1: (", p1.x, ", ", p1.y, ")\n")
  Ecrire("Point 2: (", p2.x, ", ", p2.y, ")\n")

  // Test calcul avec champs
  somme <- p1.x + p2.x
  Ecrire("Somme des x: ", somme, "\n")
Fin
"#;

    let input_values = vec!["5".to_string(), "3".to_string()];

    println!("=== Test des structures ===\n");
    println!("Code:\n{}\n", code);
    println!("Entrées: {:?}\n", input_values);

    // Lexer
    let mut lexer = Lexer::new(code.to_string());
    let tokens = match lexer.tokenize() {
        Ok(t) => {
            println!("✓ Lexer: {} tokens générés", t.len());
            t
        }
        Err(e) => {
            println!("✗ Erreur lexer: {}", e);
            return;
        }
    };

    // Parser
    let mut parser = Parser::new(tokens);
    let algorithm = match parser.parse() {
        Ok(a) => {
            println!("✓ Parser: algorithme '{}' parsé avec {} structures", a.name, a.structs.len());
            for s in &a.structs {
                println!("  - Structure '{}' avec {} champs", s.name, s.fields.len());
            }
            a
        }
        Err(e) => {
            println!("✗ Erreur parser: {}", e);
            return;
        }
    };

    // Interpréteur
    let mut interpreter = Interpreter::new(input_values);
    match interpreter.run(algorithm) {
        Ok(output) => {
            println!("✓ Exécution réussie!\n");
            println!("Sortie:");
            for line in output {
                println!("{}", line);
            }
        }
        Err(e) => {
            println!("✗ Erreur d'exécution: {}", e);
        }
    }
}
