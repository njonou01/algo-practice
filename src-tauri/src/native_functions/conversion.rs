/**
 * Fonctions de conversion de types
 *
 * Fonctions: EnTexte, EnEntier, EnReel, EnTableauCaracteres, EnChaineCaracteres
 */

use crate::interpreter::Value;

/**
 * EnTexte(valeur: Type) : Chaine
 * Convertit n'importe quelle valeur en chaîne de caractères
 */
pub fn to_string(args: Vec<Value>) -> Result<Value, String> {
    if args.len() != 1 {
        return Err(format!("EnTexte() attend 1 argument, {} fourni(s)", args.len()));
    }

    let string_value = match &args[0] {
        Value::Entier(n) => n.to_string(),
        Value::Reel(f) => f.to_string(),
        Value::Chaine(s) => s.clone(),
        Value::Booleen(b) => if *b { "Vrai".to_string() } else { "Faux".to_string() },
        Value::Caractere(c) => c.to_string(),
        Value::Tableau(arr) => {
            let elements: Vec<String> = arr.iter()
                .map(|v| match v {
                    Value::Entier(n) => n.to_string(),
                    Value::Reel(f) => f.to_string(),
                    Value::Chaine(s) => format!("\"{}\"", s),
                    Value::Booleen(b) => if *b { "Vrai" } else { "Faux" }.to_string(),
                    Value::Caractere(c) => format!("'{}'", c),
                    _ => "...".to_string(),
                })
                .collect();
            format!("[{}]", elements.join(", "))
        },
        Value::Struct(_type_name, fields) => {
            let field_strs: Vec<String> = fields.iter()
                .map(|(k, v)| {
                    let v_str = match v {
                        Value::Entier(n) => n.to_string(),
                        Value::Reel(f) => f.to_string(),
                        Value::Chaine(s) => format!("\"{}\"", s),
                        Value::Booleen(b) => if *b { "Vrai" } else { "Faux" }.to_string(),
                        _ => "...".to_string(),
                    };
                    format!("{}: {}", k, v_str)
                })
                .collect();
            format!("{{{}}}", field_strs.join(", "))
        },
        Value::Pointeur(addr) => format!("@{:x}", addr),
        Value::Nil => "Nil".to_string(),
        Value::Null => "Null".to_string(),
    };

    Ok(Value::Chaine(string_value))
}

/**
 * EnEntier(chaine: Chaine) : Entier
 * Convertit une chaîne de caractères en entier
 */
pub fn to_int(args: Vec<Value>) -> Result<Value, String> {
    if args.len() != 1 {
        return Err(format!("EnEntier() attend 1 argument, {} fourni(s)", args.len()));
    }

    let string = match &args[0] {
        Value::Chaine(s) => s,
        _ => return Err("EnEntier() attend une chaîne de caractères".to_string()),
    };

    match string.trim().parse::<i64>() {
        Ok(n) => Ok(Value::Entier(n)),
        Err(_) => Err(format!("EnEntier() : impossible de convertir '{}' en entier", string)),
    }
}

/**
 * EnReel(chaine: Chaine) : Reel
 * Convertit une chaîne de caractères en nombre réel
 */
pub fn to_float(args: Vec<Value>) -> Result<Value, String> {
    if args.len() != 1 {
        return Err(format!("EnReel() attend 1 argument, {} fourni(s)", args.len()));
    }

    let string = match &args[0] {
        Value::Chaine(s) => s,
        _ => return Err("EnReel() attend une chaîne de caractères".to_string()),
    };

    match string.trim().parse::<f64>() {
        Ok(f) => Ok(Value::Reel(f)),
        Err(_) => Err(format!("EnReel() : impossible de convertir '{}' en nombre réel", string)),
    }
}

/**
 * EnTableauCaracteres(texte: Chaine) : Tableau de Caractere
 * Convertit une chaîne en tableau de caractères
 * Exemple: "Bonjour" → ['B', 'o', 'n', 'j', 'o', 'u', 'r']
 */
pub fn to_char_array(args: Vec<Value>) -> Result<Value, String> {
    if args.len() != 1 {
        return Err(format!("EnTableauCaracteres() attend 1 argument, {} fourni(s)", args.len()));
    }

    let string = match &args[0] {
        Value::Chaine(s) => s,
        _ => return Err("EnTableauCaracteres() attend une chaîne de caractères".to_string()),
    };

    let char_array: Vec<Value> = string
        .chars()
        .map(|c| Value::Caractere(c))
        .collect();

    Ok(Value::Tableau(char_array))
}

/**
 * EnChaineCaracteres(tableau: Tableau de Caractere) : Chaine
 * Convertit un tableau de caractères en chaîne
 * Exemple: ['H', 'i'] → "Hi"
 */
pub fn from_char_array(args: Vec<Value>) -> Result<Value, String> {
    if args.len() != 1 {
        return Err(format!("EnChaineCaracteres() attend 1 argument, {} fourni(s)", args.len()));
    }

    let array = match &args[0] {
        Value::Tableau(arr) => arr,
        _ => return Err("EnChaineCaracteres() attend un tableau".to_string()),
    };

    let mut result = String::new();

    for (i, value) in array.iter().enumerate() {
        match value {
            Value::Caractere(c) => result.push(*c),
            _ => return Err(format!(
                "EnChaineCaracteres() : l'élément {} du tableau n'est pas un caractère",
                i
            )),
        }
    }

    Ok(Value::Chaine(result))
}
