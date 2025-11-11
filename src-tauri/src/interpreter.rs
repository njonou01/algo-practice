//! Interpréteur pour le langage algorithmique français
//!
//! Ce module exécute l'arbre syntaxique produit par le parser.
//! Il gère l'évaluation des expressions, l'exécution des instructions,
//! les variables, les tableaux et les appels de fonctions/procédures.

use crate::parser::{Algorithm, BinaryOperator, Expression, Function, LValue, Statement, StatementWithLine, StructDefinition, Type, UnaryOperator};
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, HashSet};
use std::time::Instant;

/// Valeur runtime d'une variable ou expression
///
/// Représente toutes les valeurs possibles pendant l'exécution.
/// Les tableaux sont stockés en mémoire linéaire (vec plat).
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum Value {
    /// Valeur entière
    Entier(i64),
    /// Valeur réelle (flottant)
    Reel(f64),
    /// Chaîne de caractères
    Chaine(String),
    /// Caractère unique
    Caractere(char),
    /// Valeur booléenne
    Booleen(bool),
    /// Tableau (stocké linéairement, même pour 2D)
    Tableau(Vec<Value>),
    /// Structure/Enregistrement (nom du type, champs)
    Struct(String, HashMap<String, Value>),
    /// Pointeur (adresse mémoire)
    Pointeur(usize),
    /// Pointeur nil/null
    Nil,
    /// Valeur nulle (pour procédures)
    Null,
}

impl Value {
    /// Convertit la valeur en chaîne pour l'affichage
    pub fn to_string(&self) -> String {
        match self {
            Value::Entier(n) => n.to_string(),
            Value::Reel(f) => f.to_string(),
            Value::Chaine(s) => s.clone(),
            Value::Caractere(c) => c.to_string(),
            Value::Booleen(b) => if *b { "Vrai" } else { "Faux" }.to_string(),
            Value::Tableau(arr) => {
                let elements: Vec<String> = arr.iter().map(|v| v.to_string()).collect();
                format!("[{}]", elements.join(", "))
            }
            Value::Struct(type_name, fields) => {
                let fields_str: Vec<String> = fields
                    .iter()
                    .map(|(k, v)| format!("{}: {}", k, v.to_string()))
                    .collect();
                format!("{}{{ {} }}", type_name, fields_str.join(", "))
            }
            Value::Pointeur(addr) => format!("@{:x}", addr),
            Value::Nil => "Nil".to_string(),
            Value::Null => "null".to_string(),
        }
    }

    /// Convertit la valeur en entier
    ///
    /// # Retour
    ///
    /// * `Ok(i64)` - Entier converti
    /// * `Err(String)` - Erreur de conversion
    pub fn to_entier(&self) -> Result<i64, String> {
        match self {
            Value::Entier(n) => Ok(*n),
            Value::Reel(f) => Ok(*f as i64),
            Value::Chaine(s) => s.parse::<i64>().map_err(|_| format!("Impossible de convertir '{}' en entier", s)),
            _ => Err(format!("Impossible de convertir {:?} en entier", self)),
        }
    }

    /// Convertit la valeur en réel
    ///
    /// # Retour
    ///
    /// * `Ok(f64)` - Réel converti
    /// * `Err(String)` - Erreur de conversion
    pub fn to_reel(&self) -> Result<f64, String> {
        match self {
            Value::Entier(n) => Ok(*n as f64),
            Value::Reel(f) => Ok(*f),
            Value::Chaine(s) => s.parse::<f64>().map_err(|_| format!("Impossible de convertir '{}' en réel", s)),
            _ => Err(format!("Impossible de convertir {:?} en réel", self)),
        }
    }

    /// Convertit la valeur en booléen
    ///
    /// # Retour
    ///
    /// * `Ok(bool)` - Booléen converti
    /// * `Err(String)` - Erreur de conversion
    pub fn to_booleen(&self) -> Result<bool, String> {
        match self {
            Value::Booleen(b) => Ok(*b),
            Value::Entier(n) => Ok(*n != 0),
            _ => Err(format!("Impossible de convertir {:?} en booléen", self)),
        }
    }

}

/// Type de callback pour demander des entrées de manière dynamique
///
/// Arguments: (prompt, variables, has_prompt) -> Result<Vec<String>, String>
type InputCallback = Box<dyn FnMut(&str, &[String], bool, &[String]) -> Result<Vec<String>, String> + Send>;

/// Callback pour envoyer l'output en temps réel au frontend
///
/// Arguments: (complete_lines, current_line) -> Result<(), String>
type OutputCallback = Box<dyn FnMut(&[String], &str) -> Result<(), String> + Send>;

/// Interpréteur d'algorithmes
///
/// Maintient l'état d'exécution : variables, tableaux, fonctions, entrées/sorties.
/// Gère la portée des variables lors des appels de fonctions.
pub struct Interpreter {
    /// Définitions des structures/enregistrements
    struct_defs: HashMap<String, StructDefinition>,
    /// Table des fonctions et procédures définies
    functions: HashMap<String, Function>,
    /// Variables globales et locales courantes
    variables: HashMap<String, Value>,
    /// Noms des constantes (non modifiables)
    constants: HashSet<String>,
    /// Dimensions des tableaux (pour calcul d'index 2D)
    array_dimensions: HashMap<String, Vec<usize>>,
    /// Lignes de sortie complètes
    output: Vec<String>,
    /// Buffer pour la ligne courante (avant \n)
    current_line: String,
    /// Valeurs d'entrée fournies par l'utilisateur (mode synchrone)
    input_values: Vec<String>,
    /// Index courant dans input_values (mode synchrone)
    input_index: usize,
    /// Callback pour demander des entrées (mode asynchrone)
    input_callback: Option<InputCallback>,
    /// Callback pour envoyer l'output en temps réel
    output_callback: Option<OutputCallback>,
    /// Timestamp du dernier flush d'output
    last_flush_time: Instant,
    /// Dernière ligne écrite (pour associer aux Lire())
    last_written_text: String,
    /// Valeur de retour d'une fonction
    return_value: Option<Value>,
    /// Flag indiquant qu'un return a été exécuté
    has_returned: bool,
    /// Numéro de ligne de l'instruction courante (pour erreurs d'exécution)
    current_statement_line: usize,
    /// Heap (tas) pour stocker les objets alloués dynamiquement
    heap: HashMap<usize, Value>,
    /// Prochain identifiant d'adresse libre
    next_address: usize,
}

impl Interpreter {
    /// Crée un nouvel interpréteur avec les valeurs d'entrée (mode synchrone)
    ///
    /// # Arguments
    ///
    /// * `input_values` - Valeurs fournies pour Lire()
    pub fn new(input_values: Vec<String>) -> Self {
        Interpreter {
            struct_defs: HashMap::new(),
            functions: HashMap::new(),
            variables: HashMap::new(),
            constants: HashSet::new(),
            array_dimensions: HashMap::new(),
            output: Vec::new(),
            current_line: String::new(),
            input_values,
            input_index: 0,
            input_callback: None,
            output_callback: None,
            last_flush_time: Instant::now(),
            last_written_text: String::new(),
            return_value: None,
            has_returned: false,
            current_statement_line: 1,
            heap: HashMap::new(),
            next_address: 1,
        }
    }

    /// Crée un nouvel interpréteur avec un callback pour les entrées dynamiques (mode asynchrone)
    ///
    /// # Arguments
    ///
    /// * `callback` - Fonction appelée quand l'interpréteur a besoin d'entrées
    pub fn new_with_callback(callback: InputCallback) -> Self {
        Interpreter {
            struct_defs: HashMap::new(),
            functions: HashMap::new(),
            variables: HashMap::new(),
            constants: HashSet::new(),
            array_dimensions: HashMap::new(),
            output: Vec::new(),
            current_line: String::new(),
            input_values: Vec::new(),
            input_index: 0,
            input_callback: Some(callback),
            output_callback: None,
            last_flush_time: Instant::now(),
            last_written_text: String::new(),
            return_value: None,
            has_returned: false,
            current_statement_line: 1,
            heap: HashMap::new(),
            next_address: 1,
        }
    }

    /// Crée un nouvel interpréteur avec callbacks pour entrées et sorties (mode asynchrone interactif)
    ///
    /// # Arguments
    ///
    /// * `input_callback` - Fonction appelée quand l'interpréteur a besoin d'entrées
    /// * `output_callback` - Fonction appelée après chaque Ecrire() pour envoyer l'output en temps réel
    pub fn new_with_callbacks(input_callback: InputCallback, output_callback: OutputCallback) -> Self {
        Interpreter {
            struct_defs: HashMap::new(),
            functions: HashMap::new(),
            variables: HashMap::new(),
            constants: HashSet::new(),
            array_dimensions: HashMap::new(),
            output: Vec::new(),
            current_line: String::new(),
            input_values: Vec::new(),
            input_index: 0,
            input_callback: Some(input_callback),
            output_callback: Some(output_callback),
            last_flush_time: Instant::now(),
            last_written_text: String::new(),
            return_value: None,
            has_returned: false,
            current_statement_line: 1,
            heap: HashMap::new(),
            next_address: 1,
        }
    }

    /// Formate un message d'erreur avec le numéro de ligne
    fn error(&self, msg: &str) -> String {
        format!("Erreur ligne {}: {}", self.current_statement_line, msg)
    }

    /// Convertit un LValue en Expression pour pouvoir l'évaluer
    fn lvalue_to_expression(&self, lvalue: &LValue) -> Result<Expression, String> {
        match lvalue {
            LValue::Variable(name) => Ok(Expression::Variable(name.clone())),
            LValue::ArrayElement { name, indices } => Ok(Expression::ArrayAccess {
                name: name.clone(),
                indices: indices.clone(),
            }),
            LValue::FieldAccess { object, field } => {
                let obj_expr = self.lvalue_to_expression(object)?;
                Ok(Expression::FieldAccess {
                    object: Box::new(obj_expr),
                    field: field.clone(),
                })
            }
            LValue::Dereference { pointer } => {
                let ptr_expr = self.lvalue_to_expression(pointer)?;
                Ok(Expression::Dereference {
                    pointer: Box::new(ptr_expr),
                })
            }
        }
    }

    /// Trouve des variables similaires (distance de Levenshtein)
    fn find_similar_variables(&self, name: &str) -> Vec<String> {
        let mut similar = Vec::new();

        for var_name in self.variables.keys() {
            // Distance de Levenshtein simple
            if levenshtein_distance(name, var_name) <= 2 {
                similar.push(format!("'{}'", var_name));
            }
        }

        similar.sort();
        similar.truncate(3); // Max 3 suggestions
        similar
    }

    /// Retourne la valeur par défaut pour un type donné
    ///
    /// Utilise les définitions de structures pour initialiser correctement les champs
    ///
    /// # Arguments
    ///
    /// * `var_type` - Type dont on veut la valeur par défaut
    fn get_default_value_for_type(&self, var_type: &Type) -> Result<Value, String> {
        match var_type {
            Type::Entier => Ok(Value::Entier(0)),
            Type::Reel => Ok(Value::Reel(0.0)),
            Type::Caractere => Ok(Value::Chaine(String::new())),
            Type::Chaine => Ok(Value::Chaine(String::new())),
            Type::Booleen => Ok(Value::Booleen(false)),
            Type::Tableau(elem_type, dimensions) => {
                let default_elem = self.get_default_value_for_type(elem_type)?;

                // Calculer la taille totale (produit de toutes les dimensions)
                let total_size: usize = if dimensions.is_empty() {
                    0
                } else {
                    dimensions.iter().product()
                };

                Ok(Value::Tableau(vec![default_elem; total_size]))
            }
            Type::Structure(type_name) => {
                // Récupérer la définition de la structure
                let struct_def = self.struct_defs.get(type_name)
                    .ok_or_else(|| format!("Structure '{}' non définie", type_name))?;

                // Initialiser tous les champs avec leurs valeurs par défaut
                let mut fields = HashMap::new();
                for field in &struct_def.fields {
                    let default_value = self.get_default_value_for_type(&field.var_type)?;
                    fields.insert(field.name.clone(), default_value);
                }

                Ok(Value::Struct(type_name.clone(), fields))
            }
            Type::Pointeur(_) => Ok(Value::Nil),
            Type::Void => Ok(Value::Null),
        }
    }

    /// Exécute un algorithme complet
    ///
    /// Point d'entrée principal de l'interpréteur.
    /// 1. Enregistre les définitions de structures
    /// 2. Enregistre les fonctions/procédures
    /// 3. Initialise les variables globales
    /// 4. Exécute les instructions du corps principal
    /// 5. Retourne les lignes de sortie générées
    ///
    /// # Arguments
    ///
    /// * `algorithm` - AST de l'algorithme à exécuter
    ///
    /// # Retour
    ///
    /// * `Ok(Vec<String>)` - Lignes de sortie si succès
    /// * `Err(String)` - Message d'erreur d'exécution
    pub fn run(&mut self, algorithm: Algorithm) -> Result<Vec<String>, String> {
        // Enregistrer toutes les définitions de structures
        for struct_def in &algorithm.structs {
            self.struct_defs.insert(struct_def.name.clone(), struct_def.clone());
        }

        // Enregistrer toutes les fonctions et procédures
        for func in &algorithm.functions {
            self.functions.insert(func.name.clone(), func.clone());
        }

        // Initialiser les variables globales avec leurs valeurs par défaut ou initiales
        for var in &algorithm.variables {
            // Si la variable a une valeur initiale (constante avec initialisation directe),
            // évaluer l'expression. Sinon, utiliser la valeur par défaut du type.
            let value = if let Some(ref init_expr) = var.initial_value {
                self.evaluate_expression(init_expr)?
            } else {
                self.get_default_value_for_type(&var.var_type)?
            };

            self.variables.insert(var.name.clone(), value);

            // Marquer les constantes
            if var.is_const {
                self.constants.insert(var.name.clone());
            }

            // Stocker les dimensions pour les tableaux (utile pour indexation 2D)
            if let Type::Tableau(_, dimensions) = &var.var_type {
                self.array_dimensions.insert(var.name.clone(), dimensions.clone());
            }
        }

        // Exécuter séquentiellement toutes les instructions
        for statement in &algorithm.statements {
            self.execute_statement(statement)?;
        }

        // Finaliser la dernière ligne si elle n'est pas vide
        if !self.current_line.is_empty() {
            self.output.push(self.current_line.clone());
            self.current_line.clear();
        }

        // Envoyer l'output final si callback présent
        if let Some(ref mut callback) = self.output_callback {
            callback(&self.output, &self.current_line)?;
        }

        Ok(self.output.clone())
    }

    /// Assigne une valeur à une LValue (variable, élément de tableau ou champ de structure)
    ///
    /// # Arguments
    ///
    /// * `lvalue` - Emplacement mémoire où assigner
    /// * `value` - Valeur à assigner
    ///
    /// # Retour
    ///
    /// * `Ok(())` si succès
    /// * `Err(String)` si erreur d'affectation
    fn assign_to_lvalue(&mut self, lvalue: &LValue, value: Value) -> Result<(), String> {
        match lvalue {
            LValue::Variable(var_name) => {
                // Vérifier si c'est une constante
                if self.constants.contains(var_name) {
                    return Err(self.error(&format!("Impossible de modifier la constante '{}'", var_name)));
                }
                self.variables.insert(var_name.clone(), value);
                Ok(())
            }
            LValue::ArrayElement { name, indices } => {
                let flat_index = self.calculate_flat_index(name, indices)?;
                if let Some(Value::Tableau(arr)) = self.variables.get_mut(name) {
                    if flat_index < arr.len() {
                        arr[flat_index] = value;
                        Ok(())
                    } else {
                        Err(self.error(&format!(
                            "Index {} hors limites pour le tableau '{}'",
                            flat_index, name
                        )))
                    }
                } else {
                    Err(self.error(&format!("'{}' n'est pas un tableau", name)))
                }
            }
            LValue::FieldAccess { object, field } => {
                // Pour l'accès aux champs, on doit récursivement atteindre l'objet
                // et modifier le champ dans la structure
                self.assign_to_field(object, field, value)
            }
            LValue::Dereference { pointer } => {
                // Obtenir l'adresse du pointeur
                let ptr_lvalue_expr = self.lvalue_to_expression(pointer)?;
                let ptr_value = self.evaluate_expression(&ptr_lvalue_expr)?;

                match ptr_value {
                    Value::Pointeur(addr) => {
                        if self.heap.contains_key(&addr) {
                            self.heap.insert(addr, value);
                            Ok(())
                        } else {
                            Err(self.error(&format!("Pointeur invalide @{:x} (mémoire libérée ou non allouée)", addr)))
                        }
                    }
                    Value::Nil => {
                        Err(self.error("Tentative d'assignation via un pointeur Nil"))
                    }
                    _ => Err(self.error(&format!("Tentative de déréférencement d'une valeur non-pointeur")))
                }
            }
        }
    }

    /// Assigne une valeur à un champ de structure (récursivement si nécessaire)
    ///
    /// # Arguments
    ///
    /// * `object` - LValue représentant l'objet contenant le champ
    /// * `field` - Nom du champ
    /// * `value` - Valeur à assigner
    fn assign_to_field(&mut self, object: &LValue, field: &str, value: Value) -> Result<(), String> {
        let line = self.current_statement_line;
        match object {
            LValue::Variable(var_name) => {
                // Accès direct : var.field
                if let Some(Value::Struct(type_name, fields)) = self.variables.get_mut(var_name) {
                    if fields.contains_key(field) {
                        fields.insert(field.to_string(), value);
                        Ok(())
                    } else {
                        let type_name = type_name.clone();
                        Err(format!("Erreur ligne {}: Champ '{}' introuvable dans la structure '{}'", line, field, type_name))
                    }
                } else {
                    Err(format!("Erreur ligne {}: '{}' n'est pas une structure", line, var_name))
                }
            }
            LValue::FieldAccess { object: nested_object, field: nested_field } => {
                // Accès imbriqué : obj.field1.field2
                // On doit d'abord obtenir la valeur de obj.field1, puis modifier field2
                // Cette implémentation suppose un niveau d'imbrication
                match nested_object.as_ref() {
                    LValue::Variable(var_name) => {
                        if let Some(Value::Struct(_, outer_fields)) = self.variables.get_mut(var_name) {
                            if let Some(Value::Struct(inner_type, inner_fields)) = outer_fields.get_mut(nested_field) {
                                if inner_fields.contains_key(field) {
                                    inner_fields.insert(field.to_string(), value);
                                    Ok(())
                                } else {
                                    Err(format!("Champ '{}' introuvable dans la structure '{}'", field, inner_type))
                                }
                            } else {
                                Err(format!("'{}' n'est pas une structure", nested_field))
                            }
                        } else {
                            Err(format!("'{}' n'est pas une structure", var_name))
                        }
                    }
                    _ => Err("Accès aux champs imbriqués trop profonds non supporté".to_string())
                }
            }
            LValue::ArrayElement { name, indices } => {
                // Accès à un champ dans un élément de tableau : arr[i].field
                let flat_index = self.calculate_flat_index(name, indices)?;
                if let Some(Value::Tableau(arr)) = self.variables.get_mut(name) {
                    if flat_index < arr.len() {
                        // Obtenir l'élément du tableau (qui doit être une structure)
                        if let Value::Struct(type_name, fields) = &mut arr[flat_index] {
                            if fields.contains_key(field) {
                                fields.insert(field.to_string(), value);
                                Ok(())
                            } else {
                                let type_name = type_name.clone();
                                Err(format!("Erreur ligne {}: Champ '{}' introuvable dans la structure '{}'", line, field, type_name))
                            }
                        } else {
                            Err(format!("Erreur ligne {}: L'élément du tableau '{}' n'est pas une structure", line, name))
                        }
                    } else {
                        Err(format!("Erreur ligne {}: Index {} hors limites pour le tableau '{}'", line, flat_index, name))
                    }
                } else {
                    Err(format!("Erreur ligne {}: '{}' n'est pas un tableau", line, name))
                }
            }
            LValue::Dereference { pointer } => {
                // Pour ptr^.field, on doit d'abord déréférencer, puis modifier le champ
                let ptr_expr = self.lvalue_to_expression(pointer)?;
                let ptr_value = self.evaluate_expression(&ptr_expr)?;

                match ptr_value {
                    Value::Pointeur(addr) => {
                        if let Some(Value::Struct(type_name, fields)) = self.heap.get_mut(&addr) {
                            if fields.contains_key(field) {
                                fields.insert(field.to_string(), value);
                                Ok(())
                            } else {
                                Err(format!("Erreur ligne {}: Champ '{}' introuvable dans la structure '{}'", line, field, type_name))
                            }
                        } else {
                            Err(format!("Erreur ligne {}: Pointeur ne pointe pas vers une structure", line))
                        }
                    }
                    Value::Nil => {
                        Err(format!("Erreur ligne {}: Tentative d'accès à un champ via un pointeur Nil", line))
                    }
                    _ => Err(format!("Erreur ligne {}: Tentative de déréférencement d'une valeur non-pointeur", line))
                }
            }
        }
    }

    /// Exécute une instruction
    ///
    /// Dispatch vers la logique appropriée selon le type d'instruction.
    ///
    /// # Arguments
    ///
    /// * `statement` - Instruction à exécuter
    ///
    /// # Retour
    ///
    /// * `Ok(())` si succès
    /// * `Err(String)` si erreur d'exécution
    fn execute_statement(&mut self, stmt_with_line: &StatementWithLine) -> Result<(), String> {
        // Mettre à jour le numéro de ligne courant pour les messages d'erreur
        self.current_statement_line = stmt_with_line.line;

        match &stmt_with_line.statement {
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
                        Err(self.error(&format!(
                            "Index {} hors limites pour le tableau '{}'",
                            flat_index, var_name
                        )))
                    }
                } else {
                    Err(self.error(&format!("'{}' n'est pas un tableau", var_name)))
                }
            }
            Statement::Read { targets } => {
                // Collecter les noms de variables
                let var_names: Vec<String> = targets.iter().map(|target| {
                    match target {
                        LValue::Variable(name) => name.clone(),
                        LValue::ArrayElement { name, .. } => format!("{}[...]", name),
                        LValue::FieldAccess { field, .. } => field.clone(),
                        LValue::Dereference { .. } => "ptr^".to_string(),
                    }
                }).collect();

                // Sauvegarder le prompt avant de l'effacer
                let prompt_for_display = self.last_written_text.clone();
                let has_prompt = !prompt_for_display.is_empty();

                // Obtenir les valeurs selon le mode (callback ou synchrone)
                let values = if let Some(callback) = self.input_callback.as_mut() {
                    // Mode asynchrone : utiliser le callback
                    let prompt = self.last_written_text.clone();

                    // Réinitialiser le texte écrit après utilisation
                    self.last_written_text.clear();

                    // Construire l'output complet incluant la ligne courante
                    let mut complete_output = self.output.clone();
                    if !self.current_line.is_empty() {
                        complete_output.push(self.current_line.clone());
                    }

                    // Appeler le callback pour obtenir les valeurs, en passant l'output complet
                    callback(&prompt, &var_names, has_prompt, &complete_output)?
                } else {
                    // Mode synchrone : utiliser les valeurs pré-fournies
                    let mut result = Vec::new();
                    for _ in 0..targets.len() {
                        if self.input_index >= self.input_values.len() {
                            return Err(self.error("Pas assez de valeurs d'entrée"));
                        }
                        result.push(self.input_values[self.input_index].clone());
                        self.input_index += 1;
                    }
                    // Réinitialiser le texte écrit
                    self.last_written_text.clear();
                    result
                };

                // Afficher dans la sortie ce qui a été entré
                for (i, input_str) in values.iter().enumerate() {
                    if has_prompt && i == 0 {
                        // Premier champ avec prompt : ajouter la valeur à la ligne courante
                        self.current_line.push_str(input_str);
                        // Flush la ligne
                        self.output.push(self.current_line.clone());
                        self.current_line.clear();
                    } else if has_prompt {
                        // Autres champs avec prompt : nouvelle ligne avec juste la valeur
                        self.output.push(input_str.clone());
                    } else {
                        // Pas de prompt : afficher "nom_variable: valeur"
                        if !self.current_line.is_empty() {
                            self.output.push(self.current_line.clone());
                            self.current_line.clear();
                        }
                        self.output.push(format!("{}: {}", var_names[i], input_str));
                    }
                }

                // Assigner les valeurs aux variables
                for (target, input_str) in targets.iter().zip(values.iter()) {
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
                        Value::Chaine(input_str.clone())
                    };

                    // Assigner la valeur en utilisant la méthode générique
                    self.assign_to_lvalue(target, value)?;
                }
                Ok(())
            }
            Statement::Write { expressions } => {
                let mut output_parts = Vec::new();
                for expr in expressions {
                    let value = self.evaluate_expression(expr)?;
                    output_parts.push(value.to_string());
                }
                let text = output_parts.join("");

                // Sauvegarder le texte écrit complet (pour l'associer au Lire suivant)
                // Enlever les \n pour avoir un prompt propre
                let clean_text = text.replace("\\n", "").replace('\n', "");
                self.last_written_text = clean_text.trim().to_string();

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

                // Envoyer l'output en temps réel si callback présent (flush immédiat après chaque Ecrire)
                if let Some(ref mut callback) = self.output_callback {
                    // Envoyer les lignes complètes et la ligne courante séparément
                    callback(&self.output, &self.current_line)?;
                    self.last_flush_time = Instant::now();
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
            Statement::Match {
                expression,
                cases,
                default_case,
            } => {
                // Evaluate the expression to match
                let match_value = self.evaluate_expression(expression)?;

                // Try each case
                let mut matched = false;
                for case in cases {
                    // Check if match_value equals any of the case values
                    for case_value_expr in &case.values {
                        let case_value = self.evaluate_expression(case_value_expr)?;

                        // Compare values
                        if self.values_equal(&match_value, &case_value) {
                            // Exécuter les instructions for this case
                            for stmt in &case.statements {
                                self.execute_statement(stmt)?;
                                if self.has_returned {
                                    return Ok(());
                                }
                            }
                            matched = true;
                            break;
                        }
                    }
                    if matched {
                        break;
                    }
                }

                // If no case matched, execute default case if exists
                if !matched {
                    if let Some(default_stmts) = default_case {
                        for stmt in default_stmts {
                            self.execute_statement(stmt)?;
                            if self.has_returned {
                                return Ok(());
                            }
                        }
                    }
                }

                Ok(())
            }
            Statement::GeneralAssignment { target, value } => {
                // Affectation générale : supporte variables, tableaux et champs de structures
                let val = self.evaluate_expression(value)?;
                self.assign_to_lvalue(target, val)
            }
            Statement::Free { pointer } => {
                // Libérer la mémoire pointée
                let ptr_value = self.evaluate_expression(pointer)?;
                match ptr_value {
                    Value::Pointeur(addr) => {
                        if self.heap.remove(&addr).is_some() {
                            Ok(())
                        } else {
                            Err(self.error(&format!("Tentative de libération d'un pointeur invalide @{:x}", addr)))
                        }
                    }
                    Value::Nil => {
                        // Libérer Nil est une no-op (comme free(NULL) en C)
                        Ok(())
                    }
                    _ => Err(self.error("Tentative de libération d'une valeur non-pointeur"))
                }
            }
        }
    }

    /// Évalue une expression et retourne sa valeur
    ///
    /// Gère les littéraux, variables, opérations binaires/unaires,
    /// appels de fonctions et accès aux tableaux.
    ///
    /// # Arguments
    ///
    /// * `expr` - Expression à évaluer
    ///
    /// # Retour
    ///
    /// * `Ok(Value)` - Valeur calculée
    /// * `Err(String)` - Erreur d'évaluation
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
                .ok_or_else(|| {
                    let mut msg = format!("Variable '{}' non définie", name);

                    // Suggérer des variables similaires
                    let similar = self.find_similar_variables(name);
                    if !similar.is_empty() {
                        msg.push_str(&format!("\n   💡 Variables similaires: {}", similar.join(", ")));
                    }

                    // Rappel de la déclaration
                    msg.push_str("\n   💡 N'oubliez pas de déclarer vos variables dans la section 'Variables'");

                    self.error(&msg)
                }),
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
                        self.error(&format!(
                            "Index {} hors limites pour le tableau '{}'",
                            flat_index, name
                        ))
                    })
                } else {
                    Err(self.error(&format!("'{}' n'est pas un tableau", name)))
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
            Expression::FieldAccess { object, field } => {
                let obj_value = self.evaluate_expression(object)?;
                match obj_value {
                    Value::Struct(_, fields) => {
                        fields.get(field)
                            .cloned()
                            .ok_or_else(|| format!("Champ '{}' introuvable dans la structure", field))
                    }
                    _ => Err(format!("Tentative d'accès à un champ sur une non-structure"))
                }
            }
            Expression::Dereference { pointer } => {
                let ptr_value = self.evaluate_expression(pointer)?;
                match ptr_value {
                    Value::Pointeur(addr) => {
                        self.heap.get(&addr)
                            .cloned()
                            .ok_or_else(|| self.error(&format!("Pointeur invalide @{:x} (mémoire libérée ou non allouée)", addr)))
                    }
                    Value::Nil => {
                        Err(self.error("Tentative de déréférencement d'un pointeur Nil"))
                    }
                    _ => Err(self.error(&format!("Tentative de déréférencement d'une valeur non-pointeur: {:?}", ptr_value)))
                }
            }
            Expression::Allocate { type_name } => {
                // Allouer une nouvelle structure
                let struct_def = self.struct_defs.get(type_name)
                    .cloned()
                    .ok_or_else(|| self.error(&format!("Type '{}' non défini", type_name)))?;

                // Créer une instance avec valeurs par défaut
                let mut fields = HashMap::new();
                for field in &struct_def.fields {
                    fields.insert(field.name.clone(), self.get_default_value_for_type(&field.var_type)?);
                }

                let value = Value::Struct(type_name.clone(), fields);

                // Stocker dans le heap
                let addr = self.next_address;
                self.next_address += 1;
                self.heap.insert(addr, value);

                Ok(Value::Pointeur(addr))
            }
            Expression::Nil => {
                Ok(Value::Nil)
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
            BinaryOperator::Divide => {
                // Convertir les deux opérandes en réels pour précision
                let left_f = left.to_reel()?;
                let right_f = right.to_reel()?;

                if right_f == 0.0 {
                    Err("Division par zéro".to_string())
                } else {
                    Ok(Value::Reel(left_f / right_f))
                }
            },
            BinaryOperator::Modulo => {
                // Convertir les valeurs en entiers si nécessaire
                let a = match left {
                    Value::Entier(n) => *n,
                    Value::Reel(f) => *f as i64,
                    _ => return Err(format!("Modulo invalide: l'opérande gauche doit être un nombre, reçu {:?}", left)),
                };
                let b = match right {
                    Value::Entier(n) => *n,
                    Value::Reel(f) => *f as i64,
                    _ => return Err(format!("Modulo invalide: l'opérande droit doit être un nombre, reçu {:?}", right)),
                };

                if b == 0 {
                    Err("Modulo par zéro".to_string())
                } else {
                    Ok(Value::Entier(a % b))
                }
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

    /// Calcule l'index plat pour un accès tableau multi-dimensionnel
    ///
    /// Convertit les indices 2D (ligne, colonne) en index 1D linéaire.
    /// Formule 2D : index = ligne * nb_colonnes + colonne
    ///
    /// # Arguments
    ///
    /// * `var_name` - Nom du tableau
    /// * `indices` - Expressions des indices (1 ou 2)
    ///
    /// # Retour
    ///
    /// * `Ok(usize)` - Index plat calculé
    /// * `Err(String)` - Erreur si dimensions incorrectes
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

    /// Appelle une fonction ou procédure
    ///
    /// Gère la portée des variables en sauvegardant/restaurant l'état.
    /// 1. Sauvegarde l'état actuel (variables, tableaux)
    /// 2. Lie les paramètres aux arguments
    /// 3. Initialise les variables locales
    /// 4. Exécute le corps de la fonction
    /// 5. Restaure l'état précédent
    ///
    /// # Arguments
    ///
    /// * `func_name` - Nom de la fonction à appeler
    /// * `arguments` - Valeurs des arguments
    ///
    /// # Retour
    ///
    /// * `Ok(Some(Value))` - Valeur retournée par la fonction
    /// * `Ok(None)` - Procédure sans retour
    /// * `Err(String)` - Erreur d'appel ou d'exécution
    fn call_function(&mut self, func_name: &str, arguments: Vec<Value>) -> Result<Option<Value>, String> {
        // Vérifier d'abord si c'est une fonction native
        if crate::native_functions::is_native(func_name) {
            let result = crate::native_functions::call(func_name, arguments)?;
            return Ok(Some(result));
        }

        // Sinon, récupérer la définition de la fonction utilisateur
        let function = self.functions.get(func_name)
            .ok_or_else(|| format!("Fonction '{}' non définie", func_name))?
            .clone(); // Clone pour éviter les conflits d'emprunt

        // Vérifier le nombre d'arguments
        if arguments.len() != function.parameters.len() {
            return Err(format!(
                "Fonction '{}': attendu {} arguments, trouvé {}",
                func_name,
                function.parameters.len(),
                arguments.len()
            ));
        }

        // Sauvegarder l'état actuel (portée)
        let saved_variables = self.variables.clone();
        let saved_array_dimensions = self.array_dimensions.clone();
        let saved_return_value = self.return_value.clone();
        let saved_has_returned = self.has_returned;

        // Réinitialiser l'état de retour
        self.return_value = None;
        self.has_returned = false;

        // Lier les paramètres aux arguments
        for (param, arg) in function.parameters.iter().zip(arguments.iter()) {
            self.variables.insert(param.name.clone(), arg.clone());
        }

        // Initialiser les variables locales
        for var in &function.variables {
            let default_value = self.get_default_value_for_type(&var.var_type)?;
            self.variables.insert(var.name.clone(), default_value);

            // Stocker les dimensions pour les tableaux
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
            // Comparaisons de pointeurs
            (Value::Pointeur(a), Value::Pointeur(b)) => Ok(a.cmp(b)),
            (Value::Nil, Value::Nil) => Ok(std::cmp::Ordering::Equal),
            (Value::Pointeur(_), Value::Nil) => Ok(std::cmp::Ordering::Greater),
            (Value::Nil, Value::Pointeur(_)) => Ok(std::cmp::Ordering::Less),
            _ => Err(format!(
                "Comparaison invalide entre {:?} et {:?}",
                left, right
            )),
        }
    }

    fn values_equal(&self, left: &Value, right: &Value) -> bool {
        match (left, right) {
            (Value::Entier(a), Value::Entier(b)) => a == b,
            (Value::Reel(a), Value::Reel(b)) => (a - b).abs() < f64::EPSILON,
            (Value::Entier(a), Value::Reel(b)) => (*a as f64 - b).abs() < f64::EPSILON,
            (Value::Reel(a), Value::Entier(b)) => (a - *b as f64).abs() < f64::EPSILON,
            (Value::Chaine(a), Value::Chaine(b)) => a == b,
            (Value::Booleen(a), Value::Booleen(b)) => a == b,
            (Value::Pointeur(a), Value::Pointeur(b)) => a == b,
            (Value::Nil, Value::Nil) => true,
            (Value::Pointeur(_), Value::Nil) | (Value::Nil, Value::Pointeur(_)) => false,
            _ => false,
        }
    }
}

/// Calcule la distance de Levenshtein entre deux chaînes
/// (nombre minimum d'éditions pour transformer s1 en s2)
fn levenshtein_distance(s1: &str, s2: &str) -> usize {
    let len1 = s1.chars().count();
    let len2 = s2.chars().count();

    if len1 == 0 {
        return len2;
    }
    if len2 == 0 {
        return len1;
    }

    let mut matrix = vec![vec![0; len2 + 1]; len1 + 1];

    for i in 0..=len1 {
        matrix[i][0] = i;
    }
    for j in 0..=len2 {
        matrix[0][j] = j;
    }

    let s1_chars: Vec<char> = s1.chars().collect();
    let s2_chars: Vec<char> = s2.chars().collect();

    for i in 1..=len1 {
        for j in 1..=len2 {
            let cost = if s1_chars[i - 1] == s2_chars[j - 1] { 0 } else { 1 };
            matrix[i][j] = std::cmp::min(
                std::cmp::min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1),
                matrix[i - 1][j - 1] + cost,
            );
        }
    }

    matrix[len1][len2]
}
