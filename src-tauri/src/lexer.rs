//! Analyseur lexical (Lexer) pour le langage algorithmique français
//!
//! Ce module transforme le code source en une séquence de tokens.
//! Il gère la reconnaissance des mots-clés, identifiants, nombres,
//! chaînes de caractères et opérateurs du langage algorithmique.

use serde::{Deserialize, Serialize};

/// Énumération de tous les tokens reconnus par le langage
///
/// Représente les unités lexicales de base du langage algorithmique français.
/// Chaque variante correspond à un élément syntaxique reconnaissable.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum Token {
    // Mots-clés de structure
    Algorithme,
    Variables,
    Constantes,
    Debut,
    Fin,
    Si,
    Alors,
    Sinon,
    FinSi,
    Pour,
    De,
    A,
    Faire,
    FinPour,
    TantQue,
    FinTantQue,
    Repeter,
    Jusqua,
    Selon,
    Cas,
    Defaut,
    FinSelon,
    Fonction,
    Procedure,
    Retourner,
    TypeDef,
    Enregistrement,
    FinEnregistrement,

    // Types
    Entier,
    Reel,
    Caractere,
    Chaine,
    Booleen,
    Tableau,

    // Opérateurs
    Assignment,        // <-
    Plus,              // +
    Moins,             // -
    Multiplier,        // *
    Diviser,           // /
    Modulo,            // %
    Egal,              // =
    Different,         // ≠ ou !=
    Inferieur,         // <
    Superieur,         // >
    InferieurEgal,     // ≤ ou <=
    SuperieurEgal,     // ≥ ou >=
    Et,                // ET
    Ou,                // OU
    Non,               // NON

    // Fonctions intégrées
    Lire,
    Ecrire,

    // Délimiteurs
    Virgule,           // ,
    DeuxPoints,        // :
    Point,             // .
    ParentheseOuv,     // (
    ParentheseFerm,    // )
    CrochetOuv,        // [
    CrochetFerm,       // ]

    // Valeurs
    Identifiant(String),
    NombreEntier(i64),
    NombreReel(f64),
    ChaineDeCaracteres(String),
    Vrai,
    Faux,

    // Fin de ligne / Fin de fichier
    NouvelleLigne,
    EOF,
}

/// Analyseur lexical pour le langage algorithmique
///
/// Parcourt le code source caractère par caractère et produit
/// une séquence de tokens pour l'analyseur syntaxique.
pub struct Lexer {
    /// Caractères du code source
    input: Vec<char>,
    /// Position courante dans le code
    position: usize,
    /// Caractère actuellement examiné
    current_char: Option<char>,
}

impl Lexer {
    /// Crée un nouveau lexer à partir du code source
    ///
    /// # Arguments
    ///
    /// * `input` - Code source de l'algorithme
    pub fn new(input: String) -> Self {
        let chars: Vec<char> = input.chars().collect();
        let current_char = chars.get(0).copied();
        Lexer {
            input: chars,
            position: 0,
            current_char,
        }
    }

    /// Avance d'un caractère dans le code source
    fn advance(&mut self) {
        self.position += 1;
        self.current_char = self.input.get(self.position).copied();
    }

    /// Regarde un caractère en avant sans avancer
    ///
    /// # Arguments
    ///
    /// * `offset` - Nombre de caractères à regarder en avant
    fn peek(&self, offset: usize) -> Option<char> {
        self.input.get(self.position + offset).copied()
    }

    /// Ignore les espaces, tabulations et retours chariot
    fn skip_whitespace(&mut self) {
        while let Some(ch) = self.current_char {
            if ch == ' ' || ch == '\t' || ch == '\r' {
                self.advance();
            } else {
                break;
            }
        }
    }

    /// Ignore les commentaires (lignes commençant par //)
    fn skip_comment(&mut self) {
        // Commentaires avec //
        if self.current_char == Some('/') && self.peek(1) == Some('/') {
            while self.current_char.is_some() && self.current_char != Some('\n') {
                self.advance();
            }
        }
    }

    /// Lit un nombre (entier ou réel)
    ///
    /// Reconnaît les nombres avec partie décimale (point flottant).
    /// Exemple : 42, 3.14
    fn read_number(&mut self) -> Token {
        let mut num_str = String::new();
        let mut is_float = false;

        while let Some(ch) = self.current_char {
            if ch.is_numeric() {
                num_str.push(ch);
                self.advance();
            } else if ch == '.' && !is_float && self.peek(1).map_or(false, |c| c.is_numeric()) {
                is_float = true;
                num_str.push(ch);
                self.advance();
            } else {
                break;
            }
        }

        if is_float {
            Token::NombreReel(num_str.parse().unwrap_or(0.0))
        } else {
            Token::NombreEntier(num_str.parse().unwrap_or(0))
        }
    }

    /// Lit une chaîne de caractères entre guillemets
    ///
    /// Gère les séquences d'échappement : \n, \t, \r, \\, \"
    /// Exemple : "Bonjour\nMonde"
    fn read_string(&mut self) -> Token {
        self.advance(); // Skip opening quote
        let mut string = String::new();

        while let Some(ch) = self.current_char {
            if ch == '"' {
                self.advance(); // Skip closing quote
                break;
            } else if ch == '\\' {
                self.advance();
                if let Some(escaped) = self.current_char {
                    match escaped {
                        'n' => string.push('\n'),
                        't' => string.push('\t'),
                        'r' => string.push('\r'),
                        '\\' => string.push('\\'),
                        '"' => string.push('"'),
                        _ => {
                            string.push('\\');
                            string.push(escaped);
                        }
                    }
                    self.advance();
                }
            } else {
                string.push(ch);
                self.advance();
            }
        }

        Token::ChaineDeCaracteres(string)
    }

    /// Lit un identifiant ou un mot-clé
    ///
    /// Reconnaît les mots-clés du langage (insensibles à la casse)
    /// et les identifiants définis par l'utilisateur.
    /// Supporte les caractères accentués français.
    fn read_identifier(&mut self) -> Token {
        let mut ident = String::new();

        while let Some(ch) = self.current_char {
            if ch.is_alphanumeric() || ch == '_' || ch == 'é' || ch == 'è' || ch == 'ê'
                || ch == 'à' || ch == 'â' || ch == 'ù' || ch == 'û' || ch == 'ô'
                || ch == 'î' || ch == 'ï' || ch == 'ç' {
                ident.push(ch);
                self.advance();
            } else {
                break;
            }
        }

        // Conversion en minuscules pour mots-clés insensibles à la casse
        let lower = ident.to_lowercase();

        match lower.as_str() {
            "algorithme" | "algo" => Token::Algorithme,
            "variables" | "variable" | "var" => Token::Variables,
            "constantes" | "constante" | "const" => Token::Constantes,
            "debut" | "début" => Token::Debut,
            "fin" => Token::Fin,
            "si" => Token::Si,
            "alors" => Token::Alors,
            "sinon" => Token::Sinon,
            "finsi" => Token::FinSi,
            "pour" => Token::Pour,
            "de" => Token::De,
            "a" | "à" => Token::A,
            "faire" => Token::Faire,
            "finpour" => Token::FinPour,
            "tantque" => Token::TantQue,
            "fintantque" => Token::FinTantQue,
            "repeter" | "répéter" => Token::Repeter,
            "jusqua" | "jusqu'à" => Token::Jusqua,
            "selon" => Token::Selon,
            "cas" => Token::Cas,
            "defaut" | "défaut" => Token::Defaut,
            "finselon" => Token::FinSelon,
            "fonction" => Token::Fonction,
            "procedure" | "procédure" => Token::Procedure,
            "retourner" => Token::Retourner,
            "type" => Token::TypeDef,
            "enregistrement" | "structure" => Token::Enregistrement,
            "finenregistrement" | "finstructure" => Token::FinEnregistrement,
            "entier" => Token::Entier,
            "reel" | "réel" => Token::Reel,
            "caractere" | "caractère" | "car" => Token::Caractere,
            "chaine" | "chaîne" => Token::Chaine,
            "booleen" | "booléen" => Token::Booleen,
            "tableau" => Token::Tableau,
            "et" => Token::Et,
            "ou" => Token::Ou,
            "non" => Token::Non,
            "lire" => Token::Lire,
            "ecrire" | "écrire" | "afficher" => Token::Ecrire,
            "vrai" => Token::Vrai,
            "faux" => Token::Faux,
            _ => Token::Identifiant(ident),
        }
    }

    /// Tokenise le code source complet
    ///
    /// Parcourt tout le code source et produit la liste complète des tokens.
    /// Gère les commentaires, espaces, nombres, chaînes, identifiants et opérateurs.
    ///
    /// # Retour
    ///
    /// * `Ok(Vec<Token>)` - Liste des tokens si succès
    /// * `Err(String)` - Message d'erreur si caractère invalide rencontré
    pub fn tokenize(&mut self) -> Result<Vec<Token>, String> {
        let mut tokens = Vec::new();

        while let Some(ch) = self.current_char {
            // Ignore les espaces
            if ch == ' ' || ch == '\t' || ch == '\r' {
                self.skip_whitespace();
                continue;
            }

            // Handle comments
            if ch == '/' && self.peek(1) == Some('/') {
                self.skip_comment();
                continue;
            }

            // Handle newlines
            if ch == '\n' {
                tokens.push(Token::NouvelleLigne);
                self.advance();
                continue;
            }

            // Numbers
            if ch.is_numeric() {
                tokens.push(self.read_number());
                continue;
            }

            // Strings
            if ch == '"' {
                tokens.push(self.read_string());
                continue;
            }

            // Identifiers and keywords
            if ch.is_alphabetic() || ch == '_' || "éèêàâùûôîïç".contains(ch) {
                tokens.push(self.read_identifier());
                continue;
            }

            // Assignment operator <-
            if ch == '<' && self.peek(1) == Some('-') {
                tokens.push(Token::Assignment);
                self.advance();
                self.advance();
                continue;
            }

            // Comparison operators
            if ch == '<' {
                if self.peek(1) == Some('=') {
                    tokens.push(Token::InferieurEgal);
                    self.advance();
                    self.advance();
                } else {
                    tokens.push(Token::Inferieur);
                    self.advance();
                }
                continue;
            }

            if ch == '>' {
                if self.peek(1) == Some('=') {
                    tokens.push(Token::SuperieurEgal);
                    self.advance();
                    self.advance();
                } else {
                    tokens.push(Token::Superieur);
                    self.advance();
                }
                continue;
            }

            if ch == '!' && self.peek(1) == Some('=') {
                tokens.push(Token::Different);
                self.advance();
                self.advance();
                continue;
            }

            // Unicode operators
            if ch == '≠' {
                tokens.push(Token::Different);
                self.advance();
                continue;
            }
            if ch == '≤' {
                tokens.push(Token::InferieurEgal);
                self.advance();
                continue;
            }
            if ch == '≥' {
                tokens.push(Token::SuperieurEgal);
                self.advance();
                continue;
            }

            // Single character tokens
            match ch {
                '+' => {
                    tokens.push(Token::Plus);
                    self.advance();
                }
                '-' => {
                    tokens.push(Token::Moins);
                    self.advance();
                }
                '*' => {
                    tokens.push(Token::Multiplier);
                    self.advance();
                }
                '/' => {
                    tokens.push(Token::Diviser);
                    self.advance();
                }
                '%' => {
                    tokens.push(Token::Modulo);
                    self.advance();
                }
                '=' => {
                    tokens.push(Token::Egal);
                    self.advance();
                }
                ',' => {
                    tokens.push(Token::Virgule);
                    self.advance();
                }
                ':' => {
                    tokens.push(Token::DeuxPoints);
                    self.advance();
                }
                '.' => {
                    tokens.push(Token::Point);
                    self.advance();
                }
                '(' => {
                    tokens.push(Token::ParentheseOuv);
                    self.advance();
                }
                ')' => {
                    tokens.push(Token::ParentheseFerm);
                    self.advance();
                }
                '[' => {
                    tokens.push(Token::CrochetOuv);
                    self.advance();
                }
                ']' => {
                    tokens.push(Token::CrochetFerm);
                    self.advance();
                }
                _ => {
                    return Err(format!("Caractère invalide: '{}'", ch));
                }
            }
        }

        tokens.push(Token::EOF);
        Ok(tokens)
    }
}
