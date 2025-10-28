use crate::parser::{Algorithm, BinaryOperator, Expression, Function, LValue, Statement, Type, UnaryOperator};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum Value {
    Entier(i64),
    Reel(f64),
    Chaine(String),
    Booleen(bool),
    Tableau(Vec<Value>),
    Null,
}

impl Value {
    pub fn to_string(&self) -> String {
        match self {
            Value::Entier(n) => n.to_string(),
            Value::Reel(f) => f.to_string(),
            Value::Chaine(s) => s.clone(),
            Value::Booleen(b) => if *b { "Vrai" } else { "Faux" }.to_string(),
            Value::Tableau(arr) => {
                let elements: Vec<String> = arr.iter().map(|v| v.to_string()).collect();
                format!("[{}]", elements.join(", "))
            }
            Value::Null => "null".to_string(),
        }
    }

    pub fn to_entier(&self) -> Result<i64, String> {
        match self {
            Value::Entier(n) => Ok(*n),
            Value::Reel(f) => Ok(*f as i64),
            Value::Chaine(s) => s.parse::<i64>().map_err(|_| format!("Impossible de convertir '{}' en entier", s)),
            _ => Err(format!("Impossible de convertir {:?} en entier", self)),
        }
    }

    pub fn to_reel(&self) -> Result<f64, String> {
        match self {
            Value::Entier(n) => Ok(*n as f64),
            Value::Reel(f) => Ok(*f),
            Value::Chaine(s) => s.parse::<f64>().map_err(|_| format!("Impossible de convertir '{}' en réel", s)),
            _ => Err(format!("Impossible de convertir {:?} en réel", self)),
        }
    }

    pub fn to_booleen(&self) -> Result<bool, String> {
        match self {
            Value::Booleen(b) => Ok(*b),
            Value::Entier(n) => Ok(*n != 0),
            _ => Err(format!("Impossible de convertir {:?} en booléen", self)),
        }
    }

    pub fn get_default_value(var_type: &Type) -> Value {
        match var_type {
            Type::Entier => Value::Entier(0),
            Type::Reel => Value::Reel(0.0),
            Type::Caractere => Value::Chaine(String::new()),
            Type::Chaine => Value::Chaine(String::new()),
            Type::Booleen => Value::Booleen(false),
            Type::Tableau(elem_type, dimensions) => {
                let default_elem = Value::get_default_value(elem_type);

                // Calculer la taille totale (produit de toutes les dimensions)
                let total_size: usize = if dimensions.is_empty() {
                    0
                } else {
                    dimensions.iter().product()
                };

                Value::Tableau(vec![default_elem; total_size])
            }
            Type::Void => Value::Null,
        }
    }
}

pub struct Interpreter {
    functions: HashMap<String, Function>,
    variables: HashMap<String, Value>,
    array_dimensions: HashMap<String, Vec<usize>>, // Stocke les dimensions des tableaux
    output: Vec<String>,
    current_line: String, // Buffer pour la ligne courante
    input_values: Vec<String>,
    input_index: usize,
    return_value: Option<Value>, // Pour gérer les returns
    has_returned: bool, // Flag pour stopper l'exécution après un return
}

impl Interpreter {
    pub fn new(input_values: Vec<String>) -> Self {
        Interpreter {
            functions: HashMap::new(),
            variables: HashMap::new(),
            array_dimensions: HashMap::new(),
            output: Vec::new(),
            current_line: String::new(),
            input_values,
            input_index: 0,
            return_value: None,
            has_returned: false,
        }
    }

    pub fn run(&mut self, algorithm: Algorithm) -> Result<Vec<String>, String> {
        // Store functions
        for func in &algorithm.functions {
            self.functions.insert(func.name.clone(), func.clone());
        }

        // Initialize variables with default values
        for var in &algorithm.variables {
            let default_value = Value::get_default_value(&var.var_type);
            self.variables.insert(var.name.clone(), default_value);

            // Stocker les dimensions pour les tableaux
            if let Type::Tableau(_, dimensions) = &var.var_type {
                self.array_dimensions.insert(var.name.clone(), dimensions.clone());
            }
        }

        // Execute statements
        for statement in &algorithm.statements {
            self.execute_statement(statement)?;
        }

        // Finaliser la dernière ligne si elle n'est pas vide
        if !self.current_line.is_empty() {
            self.output.push(self.current_line.clone());
        }

        Ok(self.output.clone())
    }

    fn execute_statement(&mut self, statement: &Statement) -> Result<(), String> {
        match statement {
            Statement::Assignment { var_name, value } => {
                let val = self.evaluate_expression(value)?;
                self.variables.insert(var_name.clone(), val);
                Ok(())
            }
            Statement::ArrayAssignment {
                var_name,
                indices,
                value,
            } => {
                let new_value = self.evaluate_expression(value)?;

                // Calculer l'index plat à partir des indices multidimensionnels
                let flat_index = self.calculate_flat_index(var_name, indices)?;

                if let Some(Value::Tableau(arr)) = self.variables.get_mut(var_name) {
                    if flat_index < arr.len() {
                        arr[flat_index] = new_value;
                        Ok(())
                    } else {
                        Err(format!(
                            "Index {} hors limites pour le tableau '{}'",
                            flat_index, var_name
                        ))
                    }
                } else {
                    Err(format!("'{}' n'est pas un tableau", var_name))
                }
            }
            Statement::Read { targets } => {
                for target in targets {
                    if self.input_index >= self.input_values.len() {
                        return Err(format!(
                            "Pas assez de valeurs d'entrée"
                        ));
                    }

                    let input_str = self.input_values[self.input_index].clone();
                    self.input_index += 1;

                    // Try to parse as integer first, then float, then treat as string
                    let value = if let Ok(n) = input_str.parse::<i64>() {
                        Value::Entier(n)
                    } else if let Ok(f) = input_str.parse::<f64>() {
                        Value::Reel(f)
                    } else if input_str.to_lowercase() == "vrai" {
                        Value::Booleen(true)
                    } else if input_str.to_lowercase() == "faux" {
                        Value::Booleen(false)
                    } else {
                        Value::Chaine(input_str)
                    };

                    // Assigner la valeur selon le type de lvalue
                    match target {
                        LValue::Variable(var_name) => {
                            self.variables.insert(var_name.clone(), value);
                        }
                        LValue::ArrayElement { name, indices } => {
                            let flat_index = self.calculate_flat_index(name, indices)?;
                            if let Some(Value::Tableau(arr)) = self.variables.get_mut(name) {
                                if flat_index < arr.len() {
                                    arr[flat_index] = value;
                                } else {
                                    return Err(format!(
                                        "Index {} hors limites pour le tableau '{}'",
                                        flat_index, name
                                    ));
                                }
                            } else {
                                return Err(format!("'{}' n'est pas un tableau", name));
                            }
                        }
                    }
                }
                Ok(())
            }
            Statement::Write { expressions } => {
                let mut output_parts = Vec::new();
                for expr in expressions {
                    let value = self.evaluate_expression(expr)?;
                    output_parts.push(value.to_string());
                }
                let text = output_parts.join(" ");

                // Traiter le texte caractère par caractère pour gérer \n
                for ch in text.chars() {
                    if ch == '\n' {
                        // Nouvelle ligne : flush le buffer actuel
                        self.output.push(self.current_line.clone());
                        self.current_line.clear();
                    } else {
                        self.current_line.push(ch);
                    }
                }

                Ok(())
            }
            Statement::If {
                condition,
                then_block,
                else_block,
            } => {
                let cond_value = self.evaluate_expression(condition)?;
                let cond_bool = cond_value.to_booleen()?;

                if cond_bool {
                    for stmt in then_block {
                        self.execute_statement(stmt)?;
                    }
                } else if let Some(else_stmts) = else_block {
                    for stmt in else_stmts {
                        self.execute_statement(stmt)?;
                    }
                }
                Ok(())
            }
            Statement::For {
                var_name,
                start,
                end,
                body,
            } => {
                let start_val = self.evaluate_expression(start)?;
                let end_val = self.evaluate_expression(end)?;

                let start_num = start_val.to_entier()?;
                let end_num = end_val.to_entier()?;

                for i in start_num..=end_num {
                    self.variables.insert(var_name.clone(), Value::Entier(i));
                    for stmt in body {
                        self.execute_statement(stmt)?;
                    }
                }
                Ok(())
            }
            Statement::While { condition, body } => {
                loop {
                    let cond_value = self.evaluate_expression(condition)?;
                    let cond_bool = cond_value.to_booleen()?;

                    if !cond_bool {
                        break;
                    }

                    for stmt in body {
                        self.execute_statement(stmt)?;
                    }
                }
                Ok(())
            }
            Statement::Repeat { body, condition } => {
                loop {
                    for stmt in body {
                        self.execute_statement(stmt)?;
                        if self.has_returned {
                            return Ok(());
                        }
                    }

                    let cond_value = self.evaluate_expression(condition)?;
                    let cond_bool = cond_value.to_booleen()?;

                    if cond_bool {
                        break;
                    }
                }
                Ok(())
            }
            Statement::Return { value } => {
                self.return_value = if let Some(expr) = value {
                    Some(self.evaluate_expression(expr)?)
                } else {
                    Some(Value::Null)
                };
                self.has_returned = true;
                Ok(())
            }
            Statement::ProcedureCall { name, arguments } => {
                let mut args = Vec::new();
                for arg in arguments {
                    args.push(self.evaluate_expression(arg)?);
                }
                let _ = self.call_function(name, args)?;
                Ok(())
            }
        }
    }

    fn evaluate_expression(&mut self, expr: &Expression) -> Result<Value, String> {
        match expr {
            Expression::NombreEntier(n) => Ok(Value::Entier(*n)),
            Expression::NombreReel(f) => Ok(Value::Reel(*f)),
            Expression::Chaine(s) => Ok(Value::Chaine(s.clone())),
            Expression::Booleen(b) => Ok(Value::Booleen(*b)),
            Expression::Variable(name) => self
                .variables
                .get(name)
                .cloned()
                .ok_or_else(|| format!("Variable '{}' non définie", name)),
            Expression::BinaryOp { left, op, right } => {
                let left_val = self.evaluate_expression(left)?;
                let right_val = self.evaluate_expression(right)?;
                self.apply_binary_op(&left_val, op, &right_val)
            }
            Expression::UnaryOp { op, operand } => {
                let operand_val = self.evaluate_expression(operand)?;
                self.apply_unary_op(op, &operand_val)
            }
            Expression::ArrayAccess { name, indices } => {
                // Calculer l'index plat à partir des indices multidimensionnels
                let flat_index = self.calculate_flat_index(name, indices)?;

                if let Some(Value::Tableau(arr)) = self.variables.get(name) {
                    arr.get(flat_index).cloned().ok_or_else(|| {
                        format!(
                            "Index {} hors limites pour le tableau '{}'",
                            flat_index, name
                        )
                    })
                } else {
                    Err(format!("'{}' n'est pas un tableau", name))
                }
            }
            Expression::FunctionCall { name, args } => {
                let mut arg_values = Vec::new();
                for arg in args {
                    arg_values.push(self.evaluate_expression(arg)?);
                }

                let result = self.call_function(name, arg_values)?;
                result.ok_or_else(|| format!("La procédure '{}' ne retourne pas de valeur", name))
            }
        }
    }

    fn apply_binary_op(
        &self,
        left: &Value,
        op: &BinaryOperator,
        right: &Value,
    ) -> Result<Value, String> {
        match op {
            BinaryOperator::Add => match (left, right) {
                (Value::Entier(a), Value::Entier(b)) => Ok(Value::Entier(a + b)),
                (Value::Reel(a), Value::Reel(b)) => Ok(Value::Reel(a + b)),
                (Value::Entier(a), Value::Reel(b)) => Ok(Value::Reel(*a as f64 + b)),
                (Value::Reel(a), Value::Entier(b)) => Ok(Value::Reel(a + *b as f64)),
                (Value::Chaine(a), Value::Chaine(b)) => Ok(Value::Chaine(format!("{}{}", a, b))),
                _ => Err(format!("Addition invalide entre {:?} et {:?}", left, right)),
            },
            BinaryOperator::Subtract => match (left, right) {
                (Value::Entier(a), Value::Entier(b)) => Ok(Value::Entier(a - b)),
                (Value::Reel(a), Value::Reel(b)) => Ok(Value::Reel(a - b)),
                (Value::Entier(a), Value::Reel(b)) => Ok(Value::Reel(*a as f64 - b)),
                (Value::Reel(a), Value::Entier(b)) => Ok(Value::Reel(a - *b as f64)),
                _ => Err(format!(
                    "Soustraction invalide entre {:?} et {:?}",
                    left, right
                )),
            },
            BinaryOperator::Multiply => match (left, right) {
                (Value::Entier(a), Value::Entier(b)) => Ok(Value::Entier(a * b)),
                (Value::Reel(a), Value::Reel(b)) => Ok(Value::Reel(a * b)),
                (Value::Entier(a), Value::Reel(b)) => Ok(Value::Reel(*a as f64 * b)),
                (Value::Reel(a), Value::Entier(b)) => Ok(Value::Reel(a * *b as f64)),
                _ => Err(format!(
                    "Multiplication invalide entre {:?} et {:?}",
                    left, right
                )),
            },
            BinaryOperator::Divide => match (left, right) {
                (Value::Entier(a), Value::Entier(b)) => {
                    if *b == 0 {
                        Err("Division par zéro".to_string())
                    } else {
                        Ok(Value::Entier(a / b))
                    }
                }
                (Value::Reel(a), Value::Reel(b)) => {
                    if *b == 0.0 {
                        Err("Division par zéro".to_string())
                    } else {
                        Ok(Value::Reel(a / b))
                    }
                }
                (Value::Entier(a), Value::Reel(b)) => {
                    if *b == 0.0 {
                        Err("Division par zéro".to_string())
                    } else {
                        Ok(Value::Reel(*a as f64 / b))
                    }
                }
                (Value::Reel(a), Value::Entier(b)) => {
                    if *b == 0 {
                        Err("Division par zéro".to_string())
                    } else {
                        Ok(Value::Reel(a / *b as f64))
                    }
                }
                _ => Err(format!(
                    "Division invalide entre {:?} et {:?}",
                    left, right
                )),
            },
            BinaryOperator::Modulo => match (left, right) {
                (Value::Entier(a), Value::Entier(b)) => {
                    if *b == 0 {
                        Err("Modulo par zéro".to_string())
                    } else {
                        Ok(Value::Entier(a % b))
                    }
                }
                _ => Err(format!("Modulo invalide entre {:?} et {:?}", left, right)),
            },
            BinaryOperator::Equal => {
                Ok(Value::Booleen(self.compare_values(left, right)? == std::cmp::Ordering::Equal))
            }
            BinaryOperator::NotEqual => {
                Ok(Value::Booleen(self.compare_values(left, right)? != std::cmp::Ordering::Equal))
            }
            BinaryOperator::LessThan => {
                Ok(Value::Booleen(self.compare_values(left, right)? == std::cmp::Ordering::Less))
            }
            BinaryOperator::GreaterThan => Ok(Value::Booleen(
                self.compare_values(left, right)? == std::cmp::Ordering::Greater,
            )),
            BinaryOperator::LessThanOrEqual => Ok(Value::Booleen(
                self.compare_values(left, right)? != std::cmp::Ordering::Greater,
            )),
            BinaryOperator::GreaterThanOrEqual => Ok(Value::Booleen(
                self.compare_values(left, right)? != std::cmp::Ordering::Less,
            )),
            BinaryOperator::And => {
                let left_bool = left.to_booleen()?;
                let right_bool = right.to_booleen()?;
                Ok(Value::Booleen(left_bool && right_bool))
            }
            BinaryOperator::Or => {
                let left_bool = left.to_booleen()?;
                let right_bool = right.to_booleen()?;
                Ok(Value::Booleen(left_bool || right_bool))
            }
        }
    }

    fn apply_unary_op(&self, op: &UnaryOperator, operand: &Value) -> Result<Value, String> {
        match op {
            UnaryOperator::Not => {
                let bool_val = operand.to_booleen()?;
                Ok(Value::Booleen(!bool_val))
            }
            UnaryOperator::Minus => match operand {
                Value::Entier(n) => Ok(Value::Entier(-n)),
                Value::Reel(f) => Ok(Value::Reel(-f)),
                _ => Err(format!("Négation invalide de {:?}", operand)),
            },
        }
    }

    fn calculate_flat_index(&mut self, var_name: &str, indices: &[Expression]) -> Result<usize, String> {
        // Évaluer tous les indices
        let mut index_values = Vec::new();
        for idx_expr in indices {
            let val = self.evaluate_expression(idx_expr)?;
            index_values.push(val.to_entier()? as usize);
        }

        // Récupérer les dimensions du tableau
        let dimensions = self.array_dimensions.get(var_name)
            .ok_or_else(|| format!("'{}' n'est pas un tableau", var_name))?;

        // Vérifier que le nombre d'indices correspond au nombre de dimensions
        if index_values.len() != dimensions.len() {
            return Err(format!(
                "Nombre d'indices incorrect pour '{}': attendu {}, trouvé {}",
                var_name, dimensions.len(), index_values.len()
            ));
        }

        // Calculer l'index plat
        if dimensions.len() == 1 {
            // Tableau 1D: index direct
            Ok(index_values[0])
        } else if dimensions.len() == 2 {
            // Tableau 2D: row * num_cols + col
            let row = index_values[0];
            let col = index_values[1];
            let num_cols = dimensions[1];
            Ok(row * num_cols + col)
        } else {
            Err("Tableaux à plus de 2 dimensions non supportés".to_string())
        }
    }

    fn call_function(&mut self, func_name: &str, arguments: Vec<Value>) -> Result<Option<Value>, String> {
        // Look up the function
        let function = self.functions.get(func_name)
            .ok_or_else(|| format!("Fonction '{}' non définie", func_name))?
            .clone(); // Clone to avoid borrow checker issues

        // Check argument count
        if arguments.len() != function.parameters.len() {
            return Err(format!(
                "Fonction '{}': attendu {} arguments, trouvé {}",
                func_name,
                function.parameters.len(),
                arguments.len()
            ));
        }

        // Save current state
        let saved_variables = self.variables.clone();
        let saved_array_dimensions = self.array_dimensions.clone();
        let saved_return_value = self.return_value.clone();
        let saved_has_returned = self.has_returned;

        // Reset return state
        self.return_value = None;
        self.has_returned = false;

        // Bind parameters
        for (param, arg) in function.parameters.iter().zip(arguments.iter()) {
            self.variables.insert(param.name.clone(), arg.clone());
        }

        // Initialize local variables
        for var in &function.variables {
            let default_value = Value::get_default_value(&var.var_type);
            self.variables.insert(var.name.clone(), default_value);

            // Store array dimensions
            if let Type::Tableau(_, dimensions) = &var.var_type {
                self.array_dimensions.insert(var.name.clone(), dimensions.clone());
            }
        }

        // Execute function body
        for statement in &function.statements {
            self.execute_statement(statement)?;
            if self.has_returned {
                break;
            }
        }

        // Check if function returned a value when it should
        let result = if function.return_type == Type::Void {
            // Procedure - no return value expected
            Ok(None)
        } else {
            // Function - return value expected
            if let Some(val) = self.return_value.clone() {
                Ok(Some(val))
            } else {
                Err(format!("Fonction '{}' doit retourner une valeur", func_name))
            }
        };

        // Restore state
        self.variables = saved_variables;
        self.array_dimensions = saved_array_dimensions;
        self.return_value = saved_return_value;
        self.has_returned = saved_has_returned;

        result
    }

    fn compare_values(&self, left: &Value, right: &Value) -> Result<std::cmp::Ordering, String> {
        match (left, right) {
            (Value::Entier(a), Value::Entier(b)) => Ok(a.cmp(b)),
            (Value::Reel(a), Value::Reel(b)) => {
                if a < b {
                    Ok(std::cmp::Ordering::Less)
                } else if a > b {
                    Ok(std::cmp::Ordering::Greater)
                } else {
                    Ok(std::cmp::Ordering::Equal)
                }
            }
            (Value::Entier(a), Value::Reel(b)) => {
                let a_f = *a as f64;
                if a_f < *b {
                    Ok(std::cmp::Ordering::Less)
                } else if a_f > *b {
                    Ok(std::cmp::Ordering::Greater)
                } else {
                    Ok(std::cmp::Ordering::Equal)
                }
            }
            (Value::Reel(a), Value::Entier(b)) => {
                let b_f = *b as f64;
                if *a < b_f {
                    Ok(std::cmp::Ordering::Less)
                } else if *a > b_f {
                    Ok(std::cmp::Ordering::Greater)
                } else {
                    Ok(std::cmp::Ordering::Equal)
                }
            }
            (Value::Chaine(a), Value::Chaine(b)) => Ok(a.cmp(b)),
            (Value::Booleen(a), Value::Booleen(b)) => Ok(a.cmp(b)),
            _ => Err(format!(
                "Comparaison invalide entre {:?} et {:?}",
                left, right
            )),
        }
    }
}
