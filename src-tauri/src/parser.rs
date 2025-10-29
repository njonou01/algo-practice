//! Analyseur syntaxique (Parser) pour le langage algorithmique français
//!
//! Ce module transforme une séquence de tokens en arbre syntaxique abstrait (AST).
//! Il définit toutes les structures de données représentant la syntaxe du langage :
//! types, variables, expressions, instructions, fonctions et l'algorithme complet.

use crate::lexer::{Token, TokenWithLocation};
use serde::{Deserialize, Serialize};

/// Types de données supportés par le langage
///
/// Représente tous les types possibles pour les variables et expressions.
/// Support des tableaux multi-dimensionnels via Vec<usize> pour les dimensions.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum Type {
    /// Type entier (nombres entiers)
    Entier,
    /// Type réel (nombres à virgule flottante)
    Reel,
    /// Type caractère (un seul caractère)
    Caractere,
    /// Type chaîne (séquence de caractères)
    Chaine,
    /// Type booléen (Vrai/Faux)
    Booleen,
    /// Type tableau (type éléments, dimensions)
    /// Ex: Tableau[10] → (Entier, vec![10])
    /// Ex: Tableau[5,3] → (Entier, vec![5,3])
    Tableau(Box<Type>, Vec<usize>),
    /// Type structure/enregistrement (nom de la structure)
    /// Ex: Personne, Etudiant
    Structure(String),
    /// Type vide pour les procédures sans retour
    Void,
}

/// Définition d'une structure/enregistrement
///
/// Permet de créer des types composites regroupant plusieurs champs.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct StructDefinition {
    /// Nom de la structure
    pub name: String,
    /// Liste des champs avec leurs types
    pub fields: Vec<Variable>,
}

/// Déclaration de variable
///
/// Associe un nom à un type pour les variables locales et globales.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Variable {
    /// Nom de la variable
    pub name: String,
    /// Type de la variable
    pub var_type: Type,
}

/// Paramètre de fonction ou procédure
///
/// Définit les arguments attendus par une fonction ou procédure.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Parameter {
    /// Nom du paramètre
    pub name: String,
    /// Type du paramètre
    pub param_type: Type,
}

/// Définition de fonction ou procédure
///
/// Contient le prototype, les variables locales et le corps de la fonction.
/// Une procédure est une fonction avec return_type = Type::Void.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Function {
    /// Nom de la fonction/procédure
    pub name: String,
    /// Liste des paramètres
    pub parameters: Vec<Parameter>,
    /// Type de retour (Void pour procédure)
    pub return_type: Type,
    /// Variables locales
    pub variables: Vec<Variable>,
    /// Instructions du corps
    pub statements: Vec<StatementWithLine>,
}

/// Expression évaluable du langage
///
/// Représente toute valeur calculable : littéraux, variables, opérations,
/// appels de fonctions et accès aux tableaux.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum Expression {
    /// Littéral entier (ex: 42)
    NombreEntier(i64),
    /// Littéral réel (ex: 3.14)
    NombreReel(f64),
    /// Littéral chaîne (ex: "Bonjour")
    Chaine(String),
    /// Littéral booléen (Vrai/Faux)
    Booleen(bool),
    /// Référence à une variable
    Variable(String),
    /// Opération binaire (ex: a + b, x < 10)
    BinaryOp {
        left: Box<Expression>,
        op: BinaryOperator,
        right: Box<Expression>,
    },
    /// Opération unaire (ex: NON x, -5)
    UnaryOp {
        op: UnaryOperator,
        operand: Box<Expression>,
    },
    /// Appel de fonction (ex: Carre(5))
    FunctionCall {
        name: String,
        args: Vec<Expression>,
    },
    /// Accès à un élément de tableau (ex: tab[i], matrice[i,j])
    ArrayAccess {
        name: String,
        /// Indices (1 pour tableau 1D, 2 pour tableau 2D)
        indices: Vec<Expression>,
    },
    /// Accès à un champ de structure (ex: personne.nom, etudiant.age)
    FieldAccess {
        object: Box<Expression>,
        field: String,
    },
}

/// Opérateurs binaires du langage
///
/// Opérateurs arithmétiques, de comparaison et logiques.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum BinaryOperator {
    Add,                 // +
    Subtract,            // -
    Multiply,            // *
    Divide,              // /
    Modulo,              // %
    Equal,               // =
    NotEqual,            // ≠ ou !=
    LessThan,            // <
    GreaterThan,         // >
    LessThanOrEqual,     // ≤ ou <=
    GreaterThanOrEqual,  // ≥ ou >=
    And,                 // ET
    Or,                  // OU
}

/// Opérateurs unaires du langage
///
/// Négation logique et arithmétique.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum UnaryOperator {
    Not,    // NON
    Minus,  // -
}

/// Cible d'affectation (LValue)
///
/// Représente où peut être assignée une valeur :
/// soit une variable simple, soit un élément de tableau, soit un champ de structure.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum LValue {
    /// Variable simple (ex: x)
    Variable(String),
    /// Élément de tableau (ex: tab[i], matrice[i,j])
    ArrayElement {
        name: String,
        indices: Vec<Expression>,
    },
    /// Champ de structure (ex: personne.nom, etudiant.notes[0])
    FieldAccess {
        object: Box<LValue>,
        field: String,
    },
}

/// Structure contenant une instruction et son numéro de ligne
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct StatementWithLine {
    pub statement: Statement,
    pub line: usize,
}

impl StatementWithLine {
    pub fn new(statement: Statement, line: usize) -> Self {
        StatementWithLine { statement, line }
    }
}

/// Instruction exécutable du langage
///
/// Représente toutes les instructions possibles : affectations, E/S,
/// structures de contrôle, appels de fonctions/procédures.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum Statement {
    /// Affectation simple (ex: x <- 5)
    Assignment {
        var_name: String,
        value: Expression,
    },
    /// Affectation dans un tableau (ex: tab[i] <- 10)
    ArrayAssignment {
        var_name: String,
        /// Indices (1 pour 1D, 2 pour 2D)
        indices: Vec<Expression>,
        value: Expression,
    },
    /// Affectation généralisée (variable, tableau, champ)
    /// Ex: x <- 5, tab[i] <- 10, personne.nom <- "Alice"
    GeneralAssignment {
        target: LValue,
        value: Expression,
    },
    /// Lecture d'entrée (ex: Lire(x, tab[i]))
    Read {
        targets: Vec<LValue>,
    },
    /// Écriture de sortie (ex: Ecrire("Résultat: ", x))
    Write {
        expressions: Vec<Expression>,
    },
    /// Structure conditionnelle Si/Alors/Sinon
    If {
        condition: Expression,
        then_block: Vec<StatementWithLine>,
        else_block: Option<Vec<StatementWithLine>>,
    },
    /// Boucle Pour (ex: Pour i De 1 A 10)
    For {
        var_name: String,
        start: Expression,
        end: Expression,
        body: Vec<StatementWithLine>,
    },
    /// Boucle TantQue
    While {
        condition: Expression,
        body: Vec<StatementWithLine>,
    },
    /// Boucle Répéter/Jusqu'à
    Repeat {
        body: Vec<StatementWithLine>,
        condition: Expression,
    },
    /// Retour de fonction
    Return {
        value: Option<Expression>,
    },
    /// Appel de procédure (ex: Saluer("Alice"))
    ProcedureCall {
        name: String,
        arguments: Vec<Expression>,
    },
    /// Structure Selon/Cas (switch/case)
    Match {
        expression: Expression,
        cases: Vec<MatchCase>,
        default_case: Option<Vec<StatementWithLine>>,
    },
}

/// Cas d'une structure Selon
///
/// Associe une liste de valeurs à un bloc d'instructions.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct MatchCase {
    /// Valeurs déclenchant ce cas
    pub values: Vec<Expression>,
    /// Instructions à exécuter
    pub statements: Vec<StatementWithLine>,
}

/// Algorithme complet
///
/// Structure racine représentant un algorithme entier avec ses
/// structures, fonctions, variables globales et instructions principales.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Algorithm {
    /// Nom de l'algorithme
    pub name: String,
    /// Définitions de structures
    pub structs: Vec<StructDefinition>,
    /// Fonctions et procédures définies
    pub functions: Vec<Function>,
    /// Variables globales
    pub variables: Vec<Variable>,
    /// Instructions du corps principal
    pub statements: Vec<StatementWithLine>,
}

/// Analyseur syntaxique (Parser)
///
/// Parcourt la séquence de tokens et construit l'arbre syntaxique.
pub struct Parser {
    /// Liste des tokens avec leurs lignes à analyser
    tokens: Vec<TokenWithLocation>,
    /// Position courante dans la liste
    position: usize,
}

impl Parser {
    /// Crée un nouveau parser à partir d'une liste de tokens
    ///
    /// # Arguments
    ///
    /// * `tokens` - Séquence de tokens avec lignes produite par le lexer
    pub fn new(tokens: Vec<TokenWithLocation>) -> Self {
        Parser {
            tokens,
            position: 0,
        }
    }

    /// Retourne le token courant sans avancer
    fn current_token(&self) -> &Token {
        self.tokens
            .get(self.position)
            .map(|t| &t.token)
            .unwrap_or(&Token::EOF)
    }

    /// Retourne le numéro de ligne du token courant
    fn current_line(&self) -> usize {
        self.tokens
            .get(self.position)
            .map(|t| t.line)
            .unwrap_or(1)
    }

    /// Avance au token suivant
    fn advance(&mut self) {
        if self.position < self.tokens.len() {
            self.position += 1;
        }
    }

    /// Ignore tous les tokens de nouvelle ligne consécutifs
    fn skip_newlines(&mut self) {
        while *self.current_token() == Token::NouvelleLigne {
            self.advance();
        }
    }

    /// Vérifie et consomme le token attendu
    ///
    /// # Arguments
    ///
    /// * `expected` - Token attendu à cette position
    ///
    /// # Retour
    ///
    /// * `Ok(())` si le token correspond
    /// * `Err(String)` avec message d'erreur sinon
    fn expect(&mut self, expected: Token) -> Result<(), String> {
        self.skip_newlines();
        if *self.current_token() == expected {
            self.advance();
            Ok(())
        } else {
            Err(format!(
                "Erreur ligne {}: Attendu {:?}, trouvé {:?}",
                self.current_line(),
                expected,
                self.current_token()
            ))
        }
    }

    /// Analyse syntaxique complète d'un algorithme
    ///
    /// Point d'entrée principal du parser. Analyse la structure complète
    /// d'un algorithme : nom, fonctions/procédures, variables et instructions.
    ///
    /// # Retour
    ///
    /// * `Ok(Algorithm)` - AST complet si syntaxe valide
    /// * `Err(String)` - Message d'erreur si syntaxe invalide
    pub fn parse(&mut self) -> Result<Algorithm, String> {
        self.skip_newlines();

        // Analyse "Algorithme: <nom>"
        self.expect(Token::Algorithme)?;
        self.skip_newlines();

        let name = if let Token::Identifiant(n) = self.current_token().clone() {
            self.advance();
            n
        } else {
            return Err(format!("Erreur ligne {}: Nom d'algorithme attendu", self.current_line()));
        };

        self.skip_newlines();

        // Parse struct definitions
        let mut structs = Vec::new();
        while *self.current_token() == Token::Enregistrement {
            structs.push(self.parse_struct()?);
            self.skip_newlines();
        }

        // Parse functions/procedures
        let mut functions = Vec::new();
        while matches!(self.current_token(), Token::Fonction | Token::Procedure) {
            functions.push(self.parse_function()?);
            self.skip_newlines();
        }

        // Parse variables
        let mut variables = Vec::new();
        if *self.current_token() == Token::Variables {
            self.advance();
            self.skip_newlines();

            // Skip optional ":"
            if *self.current_token() == Token::DeuxPoints {
                self.advance();
                self.skip_newlines();
            }

            variables = self.parse_variables()?;
        }

        self.skip_newlines();

        // Parse "Debut"
        self.expect(Token::Debut)?;
        self.skip_newlines();

        // Parse statements
        let mut statements = Vec::new();
        while *self.current_token() != Token::Fin && *self.current_token() != Token::EOF {
            self.skip_newlines();
            if *self.current_token() == Token::Fin {
                break;
            }
            statements.push(self.parse_statement()?);
            self.skip_newlines();
        }

        // Parse "Fin"
        self.expect(Token::Fin)?;

        Ok(Algorithm {
            name,
            structs,
            functions,
            variables,
            statements,
        })
    }

    fn parse_variables(&mut self) -> Result<Vec<Variable>, String> {
        let mut variables = Vec::new();

        loop {
            self.skip_newlines();

            // Check if we're at Debut or end of variables
            if matches!(self.current_token(), Token::Debut | Token::EOF) {
                break;
            }

            // Parse variable names
            let mut names = Vec::new();
            if let Token::Identifiant(name) = self.current_token().clone() {
                names.push(name);
                self.advance();
            } else {
                break;
            }

            // Parse additional names separated by commas
            while *self.current_token() == Token::Virgule {
                self.advance();
                self.skip_newlines();
                if let Token::Identifiant(name) = self.current_token().clone() {
                    names.push(name);
                    self.advance();
                }
            }

            // Parse ":"
            self.expect(Token::DeuxPoints)?;
            self.skip_newlines();

            // Parse type
            let var_type = self.parse_type()?;

            // Create variables
            for name in names {
                variables.push(Variable {
                    name,
                    var_type: var_type.clone(),
                });
            }

            self.skip_newlines();
        }

        Ok(variables)
    }

    fn parse_function(&mut self) -> Result<Function, String> {
        let is_procedure = *self.current_token() == Token::Procedure;
        self.advance(); // Skip Fonction ou Procedure
        self.skip_newlines();

        // Parse function name
        let name = if let Token::Identifiant(n) = self.current_token().clone() {
            self.advance();
            n
        } else {
            return Err(format!("Erreur ligne {}: Nom de fonction attendu", self.current_line()));
        };

        self.skip_newlines();

        // Parse parameters
        let mut parameters = Vec::new();
        if *self.current_token() == Token::ParentheseOuv {
            self.advance();
            self.skip_newlines();

            if *self.current_token() != Token::ParentheseFerm {
                loop {
                    // Parse parameter name
                    let param_name = if let Token::Identifiant(n) = self.current_token().clone() {
                        self.advance();
                        n
                    } else {
                        return Err(format!("Erreur ligne {}: Nom de paramètre attendu", self.current_line()));
                    };

                    self.skip_newlines();
                    self.expect(Token::DeuxPoints)?;
                    self.skip_newlines();

                    let param_type = self.parse_type()?;

                    parameters.push(Parameter {
                        name: param_name,
                        param_type,
                    });

                    self.skip_newlines();

                    if *self.current_token() == Token::Virgule {
                        self.advance();
                        self.skip_newlines();
                    } else {
                        break;
                    }
                }
            }

            self.expect(Token::ParentheseFerm)?;
            self.skip_newlines();
        }

        // Parse return type (only for functions)
        let return_type = if is_procedure {
            Type::Void
        } else {
            self.expect(Token::DeuxPoints)?;
            self.skip_newlines();
            self.parse_type()?
        };

        self.skip_newlines();

        // Parse local variables
        let mut variables = Vec::new();
        if *self.current_token() == Token::Variables {
            self.advance();
            self.skip_newlines();

            if *self.current_token() == Token::DeuxPoints {
                self.advance();
                self.skip_newlines();
            }

            variables = self.parse_variables()?;
        }

        self.skip_newlines();

        // Parse Debut
        self.expect(Token::Debut)?;
        self.skip_newlines();

        // Parse statements
        let mut statements = Vec::new();
        while *self.current_token() != Token::Fin && *self.current_token() != Token::EOF {
            self.skip_newlines();
            if *self.current_token() == Token::Fin {
                break;
            }
            statements.push(self.parse_statement()?);
            self.skip_newlines();
        }

        // Parse Fin
        self.expect(Token::Fin)?;

        Ok(Function {
            name,
            parameters,
            return_type,
            variables,
            statements,
        })
    }

    fn parse_struct(&mut self) -> Result<StructDefinition, String> {
        // Structure NomStructure
        self.expect(Token::Enregistrement)?;
        self.skip_newlines();

        let name = if let Token::Identifiant(n) = self.current_token().clone() {
            self.advance();
            n
        } else {
            return Err(format!("Erreur ligne {}: Nom de structure attendu", self.current_line()));
        };

        self.skip_newlines();

        // Parse les champs (comme des variables)
        let fields = self.parse_variables()?;

        self.skip_newlines();
        self.expect(Token::FinEnregistrement)?;

        Ok(StructDefinition { name, fields })
    }

    fn parse_type(&mut self) -> Result<Type, String> {
        let type_token = self.current_token().clone();

        match type_token {
            Token::Entier => {
                self.advance();
                Ok(Type::Entier)
            }
            Token::Reel => {
                self.advance();
                Ok(Type::Reel)
            }
            Token::Caractere => {
                self.advance();
                Ok(Type::Caractere)
            }
            Token::Chaine => {
                self.advance();
                Ok(Type::Chaine)
            }
            Token::Booleen => {
                self.advance();
                Ok(Type::Booleen)
            }
            Token::Identifiant(struct_name) => {
                // C'est un type structure personnalisé
                self.advance();
                Ok(Type::Structure(struct_name))
            }
            Token::Tableau => {
                self.advance();
                self.skip_newlines();
                self.expect(Token::CrochetOuv)?;

                // Parse dimensions (peut être 1D ou 2D)
                let mut dimensions = Vec::new();

                if let Token::NombreEntier(n) = self.current_token() {
                    dimensions.push(*n as usize);
                    self.advance();
                    self.skip_newlines();

                    // Check pour une 2e dimension
                    if *self.current_token() == Token::Virgule {
                        self.advance();
                        self.skip_newlines();

                        if let Token::NombreEntier(n2) = self.current_token() {
                            dimensions.push(*n2 as usize);
                            self.advance();
                            self.skip_newlines();
                        } else {
                            return Err(format!("Erreur ligne {}: Taille de dimension attendue après la virgule", self.current_line()));
                        }
                    }
                }

                self.expect(Token::CrochetFerm)?;
                self.skip_newlines();

                // Parse "de"
                if *self.current_token() == Token::De {
                    self.advance();
                    self.skip_newlines();
                }

                let element_type = self.parse_type()?;
                Ok(Type::Tableau(Box::new(element_type), dimensions))
            }
            _ => Err(format!("Erreur ligne {}: Type invalide: {:?}", self.current_line(), type_token)),
        }
    }

    fn parse_statement(&mut self) -> Result<StatementWithLine, String> {
        self.skip_newlines();
        let line = self.current_line();

        let statement = match self.current_token().clone() {
            Token::Identifiant(name) => {
                self.advance();
                self.skip_newlines();

                // Check for procedure call
                if *self.current_token() == Token::ParentheseOuv {
                    self.advance();
                    self.skip_newlines();

                    let mut arguments = Vec::new();
                    if *self.current_token() != Token::ParentheseFerm {
                        arguments.push(self.parse_expression()?);
                        self.skip_newlines();

                        while *self.current_token() == Token::Virgule {
                            self.advance();
                            self.skip_newlines();
                            arguments.push(self.parse_expression()?);
                            self.skip_newlines();
                        }
                    }

                    self.expect(Token::ParentheseFerm)?;
                    Statement::ProcedureCall { name, arguments }
                }
                // Check for array assignment
                else if *self.current_token() == Token::CrochetOuv {
                    self.advance();
                    self.skip_newlines();

                    // Parse indices (1D ou 2D)
                    let mut indices = Vec::new();
                    indices.push(self.parse_expression()?);
                    self.skip_newlines();

                    // Check pour un 2e indice
                    if *self.current_token() == Token::Virgule {
                        self.advance();
                        self.skip_newlines();
                        indices.push(self.parse_expression()?);
                        self.skip_newlines();
                    }

                    self.expect(Token::CrochetFerm)?;
                    self.skip_newlines();
                    self.expect(Token::Assignment)?;
                    self.skip_newlines();
                    let value = self.parse_expression()?;
                    Statement::ArrayAssignment {
                        var_name: name,
                        indices,
                        value,
                    }
                }
                // Check for field access assignment
                else if *self.current_token() == Token::Point {
                    // Parse field access chain
                    let mut lvalue = LValue::Variable(name);
                    while *self.current_token() == Token::Point {
                        self.advance();
                        self.skip_newlines();

                        let field = if let Token::Identifiant(field_name) = self.current_token().clone() {
                            self.advance();
                            field_name
                        } else {
                            return Err(format!("Erreur ligne {}: Nom de champ attendu après '.'", self.current_line()));
                        };

                        lvalue = LValue::FieldAccess {
                            object: Box::new(lvalue),
                            field,
                        };
                        self.skip_newlines();
                    }

                    // Now expect assignment
                    self.expect(Token::Assignment)?;
                    self.skip_newlines();
                    let value = self.parse_expression()?;
                    Statement::GeneralAssignment {
                        target: lvalue,
                        value,
                    }
                } else {
                    // Regular assignment
                    self.expect(Token::Assignment)?;
                    self.skip_newlines();
                    let value = self.parse_expression()?;
                    Statement::Assignment {
                        var_name: name,
                        value,
                    }
                }
            }
            Token::Lire => {
                self.advance();
                self.skip_newlines();
                self.expect(Token::ParentheseOuv)?;
                self.skip_newlines();

                let mut targets = Vec::new();
                if let Token::Identifiant(name) = self.current_token().clone() {
                    self.advance();
                    self.skip_newlines();

                    // Vérifier si c'est un accès tableau
                    if *self.current_token() == Token::CrochetOuv {
                        self.advance();
                        self.skip_newlines();

                        // Parser les indices
                        let mut indices = Vec::new();
                        indices.push(self.parse_expression()?);
                        self.skip_newlines();

                        // Vérifier pour un 2e indice
                        if *self.current_token() == Token::Virgule {
                            self.advance();
                            self.skip_newlines();
                            indices.push(self.parse_expression()?);
                            self.skip_newlines();
                        }

                        self.expect(Token::CrochetFerm)?;
                        self.skip_newlines();

                        targets.push(LValue::ArrayElement { name, indices });
                    } else if *self.current_token() == Token::Point {
                        // Accès aux champs d'une structure
                        let mut lvalue = LValue::Variable(name);
                        while *self.current_token() == Token::Point {
                            self.advance();
                            self.skip_newlines();

                            let field = if let Token::Identifiant(field_name) = self.current_token().clone() {
                                self.advance();
                                field_name
                            } else {
                                return Err(format!("Erreur ligne {}: Nom de champ attendu après '.'", self.current_line()));
                            };

                            lvalue = LValue::FieldAccess {
                                object: Box::new(lvalue),
                                field,
                            };
                            self.skip_newlines();
                        }
                        targets.push(lvalue);
                    } else {
                        targets.push(LValue::Variable(name));
                    }

                    // Parser les autres variables séparées par des virgules
                    while *self.current_token() == Token::Virgule {
                        self.advance();
                        self.skip_newlines();
                        if let Token::Identifiant(name) = self.current_token().clone() {
                            self.advance();
                            self.skip_newlines();

                            // Vérifier si c'est un accès tableau
                            if *self.current_token() == Token::CrochetOuv {
                                self.advance();
                                self.skip_newlines();

                                let mut indices = Vec::new();
                                indices.push(self.parse_expression()?);
                                self.skip_newlines();

                                if *self.current_token() == Token::Virgule {
                                    self.advance();
                                    self.skip_newlines();
                                    indices.push(self.parse_expression()?);
                                    self.skip_newlines();
                                }

                                self.expect(Token::CrochetFerm)?;
                                self.skip_newlines();

                                targets.push(LValue::ArrayElement { name, indices });
                            } else if *self.current_token() == Token::Point {
                                // Accès aux champs d'une structure
                                let mut lvalue = LValue::Variable(name);
                                while *self.current_token() == Token::Point {
                                    self.advance();
                                    self.skip_newlines();

                                    let field = if let Token::Identifiant(field_name) = self.current_token().clone() {
                                        self.advance();
                                        field_name
                                    } else {
                                        return Err(format!("Erreur ligne {}: Nom de champ attendu après '.'", self.current_line()));
                                    };

                                    lvalue = LValue::FieldAccess {
                                        object: Box::new(lvalue),
                                        field,
                                    };
                                    self.skip_newlines();
                                }
                                targets.push(lvalue);
                            } else {
                                targets.push(LValue::Variable(name));
                            }
                        }
                    }
                }

                self.expect(Token::ParentheseFerm)?;
                Statement::Read { targets }
            }
            Token::Ecrire => {
                self.advance();
                self.skip_newlines();
                self.expect(Token::ParentheseOuv)?;
                self.skip_newlines();

                let mut expressions = Vec::new();
                if *self.current_token() != Token::ParentheseFerm {
                    expressions.push(self.parse_expression()?);
                    self.skip_newlines();

                    while *self.current_token() == Token::Virgule {
                        self.advance();
                        self.skip_newlines();
                        expressions.push(self.parse_expression()?);
                        self.skip_newlines();
                    }
                }

                self.expect(Token::ParentheseFerm)?;
                Statement::Write { expressions }
            }
            Token::Si => {
                self.advance();
                self.skip_newlines();
                let condition = self.parse_expression()?;
                self.skip_newlines();
                self.expect(Token::Alors)?;
                self.skip_newlines();

                let mut then_block = Vec::new();
                while *self.current_token() != Token::Sinon
                    && *self.current_token() != Token::FinSi
                    && *self.current_token() != Token::EOF
                {
                    then_block.push(self.parse_statement()?);
                    self.skip_newlines();
                }

                let else_block = if *self.current_token() == Token::Sinon {
                    self.advance();
                    self.skip_newlines();
                    let mut else_stmts = Vec::new();
                    while *self.current_token() != Token::FinSi && *self.current_token() != Token::EOF
                    {
                        else_stmts.push(self.parse_statement()?);
                        self.skip_newlines();
                    }
                    Some(else_stmts)
                } else {
                    None
                };

                self.expect(Token::FinSi)?;
                Statement::If {
                    condition,
                    then_block,
                    else_block,
                }
            }
            Token::Pour => {
                self.advance();
                self.skip_newlines();

                let var_name = if let Token::Identifiant(name) = self.current_token().clone() {
                    self.advance();
                    name
                } else {
                    return Err(format!("Erreur ligne {}: Nom de variable attendu après Pour", self.current_line()));
                };

                self.skip_newlines();
                self.expect(Token::De)?;
                self.skip_newlines();
                let start = self.parse_expression()?;
                self.skip_newlines();
                self.expect(Token::A)?;
                self.skip_newlines();
                let end = self.parse_expression()?;
                self.skip_newlines();
                self.expect(Token::Faire)?;
                self.skip_newlines();

                let mut body = Vec::new();
                while *self.current_token() != Token::FinPour && *self.current_token() != Token::EOF {
                    body.push(self.parse_statement()?);
                    self.skip_newlines();
                }

                self.expect(Token::FinPour)?;
                Statement::For {
                    var_name,
                    start,
                    end,
                    body,
                }
            }
            Token::TantQue => {
                self.advance();
                self.skip_newlines();
                let condition = self.parse_expression()?;
                self.skip_newlines();
                self.expect(Token::Faire)?;
                self.skip_newlines();

                let mut body = Vec::new();
                while *self.current_token() != Token::FinTantQue
                    && *self.current_token() != Token::EOF
                {
                    body.push(self.parse_statement()?);
                    self.skip_newlines();
                }

                self.expect(Token::FinTantQue)?;
                Statement::While { condition, body }
            }
            Token::Repeter => {
                self.advance();
                self.skip_newlines();

                let mut body = Vec::new();
                while *self.current_token() != Token::Jusqua && *self.current_token() != Token::EOF {
                    body.push(self.parse_statement()?);
                    self.skip_newlines();
                }

                self.expect(Token::Jusqua)?;
                self.skip_newlines();
                let condition = self.parse_expression()?;

                Statement::Repeat { body, condition }
            }
            Token::Retourner => {
                self.advance();
                self.skip_newlines();

                // Check if there's a return value
                let value = if matches!(
                    self.current_token(),
                    Token::NouvelleLigne | Token::EOF | Token::Fin
                ) {
                    None
                } else {
                    Some(self.parse_expression()?)
                };

                Statement::Return { value }
            }
            Token::Selon => {
                self.advance();
                self.skip_newlines();

                // Parse the expression to match
                let expression = self.parse_expression()?;
                self.skip_newlines();

                // Parse cases
                let mut cases = Vec::new();
                let mut default_case = None;

                while *self.current_token() != Token::FinSelon && *self.current_token() != Token::EOF {
                    self.skip_newlines();

                    if *self.current_token() == Token::Cas {
                        self.advance();
                        self.skip_newlines();

                        // Parse case values (separated by commas)
                        let mut values = Vec::new();
                        values.push(self.parse_expression()?);
                        self.skip_newlines();

                        while *self.current_token() == Token::Virgule {
                            self.advance();
                            self.skip_newlines();
                            values.push(self.parse_expression()?);
                            self.skip_newlines();
                        }

                        // Expect ':'
                        self.expect(Token::DeuxPoints)?;
                        self.skip_newlines();

                        // Parse statements for this case
                        let mut statements = Vec::new();
                        while *self.current_token() != Token::Cas
                            && *self.current_token() != Token::Defaut
                            && *self.current_token() != Token::FinSelon
                            && *self.current_token() != Token::EOF
                        {
                            statements.push(self.parse_statement()?);
                            self.skip_newlines();
                        }

                        cases.push(MatchCase { values, statements });
                    } else if *self.current_token() == Token::Defaut {
                        self.advance();
                        self.skip_newlines();
                        self.expect(Token::DeuxPoints)?;
                        self.skip_newlines();

                        // Parse default case statements
                        let mut statements = Vec::new();
                        while *self.current_token() != Token::FinSelon
                            && *self.current_token() != Token::EOF
                        {
                            statements.push(self.parse_statement()?);
                            self.skip_newlines();
                        }

                        default_case = Some(statements);
                    } else {
                        break;
                    }
                }

                self.expect(Token::FinSelon)?;
                Statement::Match {
                    expression,
                    cases,
                    default_case,
                }
            }
            _ => return Err(format!(
                "Erreur ligne {}: Instruction invalide: {:?}",
                self.current_line(),
                self.current_token()
            )),
        };

        Ok(StatementWithLine::new(statement, line))
    }

    fn parse_expression(&mut self) -> Result<Expression, String> {
        self.parse_or_expression()
    }

    fn parse_or_expression(&mut self) -> Result<Expression, String> {
        let mut left = self.parse_and_expression()?;

        while *self.current_token() == Token::Ou {
            self.advance();
            self.skip_newlines();
            let right = self.parse_and_expression()?;
            left = Expression::BinaryOp {
                left: Box::new(left),
                op: BinaryOperator::Or,
                right: Box::new(right),
            };
        }

        Ok(left)
    }

    fn parse_and_expression(&mut self) -> Result<Expression, String> {
        let mut left = self.parse_comparison_expression()?;

        while *self.current_token() == Token::Et {
            self.advance();
            self.skip_newlines();
            let right = self.parse_comparison_expression()?;
            left = Expression::BinaryOp {
                left: Box::new(left),
                op: BinaryOperator::And,
                right: Box::new(right),
            };
        }

        Ok(left)
    }

    fn parse_comparison_expression(&mut self) -> Result<Expression, String> {
        let mut left = self.parse_additive_expression()?;

        loop {
            self.skip_newlines();
            let op = match self.current_token() {
                Token::Egal => BinaryOperator::Equal,
                Token::Different => BinaryOperator::NotEqual,
                Token::Inferieur => BinaryOperator::LessThan,
                Token::Superieur => BinaryOperator::GreaterThan,
                Token::InferieurEgal => BinaryOperator::LessThanOrEqual,
                Token::SuperieurEgal => BinaryOperator::GreaterThanOrEqual,
                _ => break,
            };

            self.advance();
            self.skip_newlines();
            let right = self.parse_additive_expression()?;
            left = Expression::BinaryOp {
                left: Box::new(left),
                op,
                right: Box::new(right),
            };
        }

        Ok(left)
    }

    fn parse_additive_expression(&mut self) -> Result<Expression, String> {
        let mut left = self.parse_multiplicative_expression()?;

        loop {
            self.skip_newlines();
            let op = match self.current_token() {
                Token::Plus => BinaryOperator::Add,
                Token::Moins => BinaryOperator::Subtract,
                _ => break,
            };

            self.advance();
            self.skip_newlines();
            let right = self.parse_multiplicative_expression()?;
            left = Expression::BinaryOp {
                left: Box::new(left),
                op,
                right: Box::new(right),
            };
        }

        Ok(left)
    }

    fn parse_multiplicative_expression(&mut self) -> Result<Expression, String> {
        let mut left = self.parse_unary_expression()?;

        loop {
            self.skip_newlines();
            let op = match self.current_token() {
                Token::Multiplier => BinaryOperator::Multiply,
                Token::Diviser => BinaryOperator::Divide,
                Token::Modulo => BinaryOperator::Modulo,
                _ => break,
            };

            self.advance();
            self.skip_newlines();
            let right = self.parse_unary_expression()?;
            left = Expression::BinaryOp {
                left: Box::new(left),
                op,
                right: Box::new(right),
            };
        }

        Ok(left)
    }

    fn parse_unary_expression(&mut self) -> Result<Expression, String> {
        self.skip_newlines();

        match self.current_token() {
            Token::Non => {
                self.advance();
                let operand = self.parse_unary_expression()?;
                Ok(Expression::UnaryOp {
                    op: UnaryOperator::Not,
                    operand: Box::new(operand),
                })
            }
            Token::Moins => {
                self.advance();
                let operand = self.parse_unary_expression()?;
                Ok(Expression::UnaryOp {
                    op: UnaryOperator::Minus,
                    operand: Box::new(operand),
                })
            }
            _ => self.parse_primary_expression(),
        }
    }

    fn parse_primary_expression(&mut self) -> Result<Expression, String> {
        self.skip_newlines();

        match self.current_token().clone() {
            Token::NombreEntier(n) => {
                self.advance();
                Ok(Expression::NombreEntier(n))
            }
            Token::NombreReel(f) => {
                self.advance();
                Ok(Expression::NombreReel(f))
            }
            Token::ChaineDeCaracteres(s) => {
                self.advance();
                Ok(Expression::Chaine(s))
            }
            Token::Vrai => {
                self.advance();
                Ok(Expression::Booleen(true))
            }
            Token::Faux => {
                self.advance();
                Ok(Expression::Booleen(false))
            }
            Token::Identifiant(name) => {
                self.advance();
                self.skip_newlines();

                // Check for function call
                if *self.current_token() == Token::ParentheseOuv {
                    self.advance();
                    self.skip_newlines();

                    let mut args = Vec::new();
                    if *self.current_token() != Token::ParentheseFerm {
                        args.push(self.parse_expression()?);
                        self.skip_newlines();

                        while *self.current_token() == Token::Virgule {
                            self.advance();
                            self.skip_newlines();
                            args.push(self.parse_expression()?);
                            self.skip_newlines();
                        }
                    }

                    self.expect(Token::ParentheseFerm)?;
                    Ok(Expression::FunctionCall { name, args })
                }
                // Check for array access
                else if *self.current_token() == Token::CrochetOuv {
                    self.advance();
                    self.skip_newlines();

                    // Parse indices (1D ou 2D)
                    let mut indices = Vec::new();
                    indices.push(self.parse_expression()?);
                    self.skip_newlines();

                    // Check pour un 2e indice
                    if *self.current_token() == Token::Virgule {
                        self.advance();
                        self.skip_newlines();
                        indices.push(self.parse_expression()?);
                        self.skip_newlines();
                    }

                    self.expect(Token::CrochetFerm)?;

                    let mut expr = Expression::ArrayAccess {
                        name,
                        indices,
                    };

                    // Support chaînage d'accès aux champs (ex: tab[i].champ)
                    expr = self.parse_field_access(expr)?;
                    Ok(expr)
                } else {
                    let mut expr = Expression::Variable(name);
                    // Support accès aux champs (ex: personne.nom)
                    expr = self.parse_field_access(expr)?;
                    Ok(expr)
                }
            }
            Token::ParentheseOuv => {
                self.advance();
                let expr = self.parse_expression()?;
                self.expect(Token::ParentheseFerm)?;
                Ok(expr)
            }
            _ => Err(format!(
                "Erreur ligne {}: Expression invalide: {:?}",
                self.current_line(),
                self.current_token()
            )),
        }
    }

    /// Parse les accès aux champs (opérateur point)
    /// Gère le chaînage : personne.nom, personne.adresse.ville, etc.
    fn parse_field_access(&mut self, mut expr: Expression) -> Result<Expression, String> {
        self.skip_newlines();

        while *self.current_token() == Token::Point {
            self.advance();
            self.skip_newlines();

            let field_name = if let Token::Identifiant(name) = self.current_token().clone() {
                self.advance();
                name
            } else {
                return Err(format!("Erreur ligne {}: Nom de champ attendu après '.'", self.current_line()));
            };

            expr = Expression::FieldAccess {
                object: Box::new(expr),
                field: field_name,
            };

            self.skip_newlines();
        }

        Ok(expr)
    }
}
