use algo_practice_lib::{lexer::Lexer, parser::Parser, interpreter::Interpreter};

fn main() {
    let code = r#"Algorithme GestionEtudiants

Structure Etudiant
  nom : Chaine
  age : Entier
  moyenne : Reel
FinStructure

Variables
  etudiant1, etudiant2 : Etudiant
  meilleur : Chaine

DebutAlgorithme
  // Initialisation du premier étudiant
  Ecrire("Premier étudiant\n")
  Ecrire("Nom:\n")
  Lire(etudiant1.nom)
  Ecrire("Age:\n")
  Lire(etudiant1.age)
  Ecrire("Moyenne:\n")
  Lire(etudiant1.moyenne)

  // Initialisation du deuxième étudiant
  Ecrire("\nDeuxième étudiant\n")
  Ecrire("Nom:\n")
  Lire(etudiant2.nom)
  Ecrire("Age:\n")
  Lire(etudiant2.age)
  Ecrire("Moyenne:\n")
  Lire(etudiant2.moyenne)

  // Affichage des informations
  Ecrire("\nInformations:\n")
  Ecrire("Etudiant 1: ", etudiant1.nom, ", ", etudiant1.age, " ans, moyenne: ", etudiant1.moyenne, "\n")
  Ecrire("Etudiant 2: ", etudiant2.nom, ", ", etudiant2.age, " ans, moyenne: ", etudiant2.moyenne, "\n")

  // Comparaison
  Si etudiant1.moyenne > etudiant2.moyenne Alors
    meilleur <- etudiant1.nom
  Sinon
    meilleur <- etudiant2.nom
  FinSi

  Ecrire("\nMeilleure moyenne: ", meilleur, "\n")
FinAlgorithme
"#;

    let input_values = vec![
        "Alice".to_string(), "20".to_string(), "15.5".to_string(),
        "Bob".to_string(), "22".to_string(), "14.2".to_string()
    ];

    println!("=== Test Gestion Étudiants ===\n");

    // Lexer
    let mut lexer = Lexer::new(code.to_string());
    let tokens = match lexer.tokenize() {
        Ok(t) => {
            println!("✓ Lexer: {} tokens", t.len());
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
            println!("✓ Parser: OK");
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
