use crate::lexer::Token;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum Type {
    Entier,
    Reel,
    Caractere,
    Chaine,
    Booleen,
    Tableau(Box<Type>, Vec<usize>), // Vec pour supporter 1D et 2D
    Void, // Pour les procédures
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Variable {
    pub name: String,
    pub var_type: Type,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Parameter {
    pub name: String,
    pub param_type: Type,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Function {
    pub name: String,
    pub parameters: Vec<Parameter>,
    pub return_type: Type,
    pub variables: Vec<Variable>,
    pub statements: Vec<Statement>,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum Expression {
    NombreEntier(i64),
    NombreReel(f64),
    Chaine(String),
    Booleen(bool),
    Variable(String),
    BinaryOp {
        left: Box<Expression>,
        op: BinaryOperator,
        right: Box<Expression>,
    },
    UnaryOp {
        op: UnaryOperator,
        operand: Box<Expression>,
    },
    FunctionCall {
        name: String,
        args: Vec<Expression>,
    },
    ArrayAccess {
        name: String,
        indices: Vec<Expression>, // Support pour 1D et 2D
    },
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum BinaryOperator {
    Add,
    Subtract,
    Multiply,
    Divide,
    Modulo,
    Equal,
    NotEqual,
    LessThan,
    GreaterThan,
    LessThanOrEqual,
    GreaterThanOrEqual,
    And,
    Or,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum UnaryOperator {
    Not,
    Minus,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum LValue {
    Variable(String),
    ArrayElement {
        name: String,
        indices: Vec<Expression>,
    },
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum Statement {
    Assignment {
        var_name: String,
        value: Expression,
    },
    ArrayAssignment {
        var_name: String,
        indices: Vec<Expression>, // Support pour 1D et 2D
        value: Expression,
    },
    Read {
        targets: Vec<LValue>,
    },
    Write {
        expressions: Vec<Expression>,
    },
    If {
        condition: Expression,
        then_block: Vec<Statement>,
        else_block: Option<Vec<Statement>>,
    },
    For {
        var_name: String,
        start: Expression,
        end: Expression,
        body: Vec<Statement>,
    },
    While {
        condition: Expression,
        body: Vec<Statement>,
    },
    Repeat {
        body: Vec<Statement>,
        condition: Expression,
    },
    Return {
        value: Option<Expression>,
    },
    ProcedureCall {
        name: String,
        arguments: Vec<Expression>,
    },
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Algorithm {
    pub name: String,
    pub functions: Vec<Function>,
    pub variables: Vec<Variable>,
    pub statements: Vec<Statement>,
}

pub struct Parser {
    tokens: Vec<Token>,
    position: usize,
}

impl Parser {
    pub fn new(tokens: Vec<Token>) -> Self {
        Parser {
            tokens,
            position: 0,
        }
    }

    fn current_token(&self) -> &Token {
        self.tokens.get(self.position).unwrap_or(&Token::EOF)
    }

    fn advance(&mut self) {
        if self.position < self.tokens.len() {
            self.position += 1;
        }
    }

    fn skip_newlines(&mut self) {
        while *self.current_token() == Token::NouvelleLigne {
            self.advance();
        }
    }

    fn expect(&mut self, expected: Token) -> Result<(), String> {
        self.skip_newlines();
        if *self.current_token() == expected {
            self.advance();
            Ok(())
        } else {
            Err(format!(
                "Erreur de syntaxe: attendu {:?}, trouvé {:?}",
                expected,
                self.current_token()
            ))
        }
    }

    pub fn parse(&mut self) -> Result<Algorithm, String> {
        self.skip_newlines();

        // Parse "Algorithme: <nom>"
        self.expect(Token::Algorithme)?;
        self.skip_newlines();

        let name = if let Token::Identifiant(n) = self.current_token().clone() {
            self.advance();
            n
        } else {
            return Err("Nom d'algorithme attendu".to_string());
        };

        self.skip_newlines();

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
            return Err("Nom de fonction attendu".to_string());
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
                        return Err("Nom de paramètre attendu".to_string());
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

    fn parse_type(&mut self) -> Result<Type, String> {
        let type_token = self.current_token().clone();
        self.advance();

        match type_token {
            Token::Entier => Ok(Type::Entier),
            Token::Reel => Ok(Type::Reel),
            Token::Caractere => Ok(Type::Caractere),
            Token::Chaine => Ok(Type::Chaine),
            Token::Booleen => Ok(Type::Booleen),
            Token::Tableau => {
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
                            return Err("Taille de dimension attendue après la virgule".to_string());
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
            _ => Err(format!("Type invalide: {:?}", type_token)),
        }
    }

    fn parse_statement(&mut self) -> Result<Statement, String> {
        self.skip_newlines();

        match self.current_token().clone() {
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
                    Ok(Statement::ProcedureCall { name, arguments })
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
                    Ok(Statement::ArrayAssignment {
                        var_name: name,
                        indices,
                        value,
                    })
                } else {
                    // Regular assignment
                    self.expect(Token::Assignment)?;
                    self.skip_newlines();
                    let value = self.parse_expression()?;
                    Ok(Statement::Assignment {
                        var_name: name,
                        value,
                    })
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
                            } else {
                                targets.push(LValue::Variable(name));
                            }
                        }
                    }
                }

                self.expect(Token::ParentheseFerm)?;
                Ok(Statement::Read { targets })
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
                Ok(Statement::Write { expressions })
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
                Ok(Statement::If {
                    condition,
                    then_block,
                    else_block,
                })
            }
            Token::Pour => {
                self.advance();
                self.skip_newlines();

                let var_name = if let Token::Identifiant(name) = self.current_token().clone() {
                    self.advance();
                    name
                } else {
                    return Err("Nom de variable attendu après Pour".to_string());
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
                Ok(Statement::For {
                    var_name,
                    start,
                    end,
                    body,
                })
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
                Ok(Statement::While { condition, body })
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

                Ok(Statement::Repeat { body, condition })
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

                Ok(Statement::Return { value })
            }
            _ => Err(format!(
                "Instruction invalide: {:?}",
                self.current_token()
            )),
        }
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
                    Ok(Expression::ArrayAccess {
                        name,
                        indices,
                    })
                } else {
                    Ok(Expression::Variable(name))
                }
            }
            Token::ParentheseOuv => {
                self.advance();
                let expr = self.parse_expression()?;
                self.expect(Token::ParentheseFerm)?;
                Ok(expr)
            }
            _ => Err(format!(
                "Expression invalide: {:?}",
                self.current_token()
            )),
        }
    }
}
