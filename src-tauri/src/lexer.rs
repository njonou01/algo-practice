use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum Token {
    // Mots-clés
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

pub struct Lexer {
    input: Vec<char>,
    position: usize,
    current_char: Option<char>,
}

impl Lexer {
    pub fn new(input: String) -> Self {
        let chars: Vec<char> = input.chars().collect();
        let current_char = chars.get(0).copied();
        Lexer {
            input: chars,
            position: 0,
            current_char,
        }
    }

    fn advance(&mut self) {
        self.position += 1;
        self.current_char = self.input.get(self.position).copied();
    }

    fn peek(&self, offset: usize) -> Option<char> {
        self.input.get(self.position + offset).copied()
    }

    fn skip_whitespace(&mut self) {
        while let Some(ch) = self.current_char {
            if ch == ' ' || ch == '\t' || ch == '\r' {
                self.advance();
            } else {
                break;
            }
        }
    }

    fn skip_comment(&mut self) {
        // Commentaires avec //
        if self.current_char == Some('/') && self.peek(1) == Some('/') {
            while self.current_char.is_some() && self.current_char != Some('\n') {
                self.advance();
            }
        }
    }

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

        // Convert to lowercase for case-insensitive keywords
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
            "finselon" => Token::FinSelon,
            "fonction" => Token::Fonction,
            "procedure" | "procédure" => Token::Procedure,
            "retourner" => Token::Retourner,
            "type" => Token::TypeDef,
            "enregistrement" => Token::Enregistrement,
            "finenregistrement" => Token::FinEnregistrement,
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

    pub fn tokenize(&mut self) -> Result<Vec<Token>, String> {
        let mut tokens = Vec::new();

        while let Some(ch) = self.current_char {
            // Skip whitespace
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
