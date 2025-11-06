/**
 * Fonctions mathématiques natives
 *
 * Fonctions: Racine, Puissance, Sin, Cos, Tan, Log, Exp
 */

use crate::interpreter::Value;

/**
 * Racine(x: Reel) : Reel
 * Calcule la racine carrée de x
 */
pub fn sqrt(args: Vec<Value>) -> Result<Value, String> {
    if args.len() != 1 {
        return Err(format!("Racine() attend 1 argument, {} fourni(s)", args.len()));
    }

    let x = match &args[0] {
        Value::Entier(n) => *n as f64,
        Value::Reel(f) => *f,
        _ => return Err("Racine() attend un nombre".to_string()),
    };

    if x < 0.0 {
        return Err("Racine() : impossible de calculer la racine d'un nombre négatif".to_string());
    }

    Ok(Value::Reel(x.sqrt()))
}

/**
 * Puissance(base: Reel, exposant: Reel) : Reel
 * Calcule base^exposant
 */
pub fn power(args: Vec<Value>) -> Result<Value, String> {
    if args.len() != 2 {
        return Err(format!("Puissance() attend 2 arguments, {} fourni(s)", args.len()));
    }

    let base = match &args[0] {
        Value::Entier(n) => *n as f64,
        Value::Reel(f) => *f,
        _ => return Err("Puissance() : la base doit être un nombre".to_string()),
    };

    let exp = match &args[1] {
        Value::Entier(n) => *n as f64,
        Value::Reel(f) => *f,
        _ => return Err("Puissance() : l'exposant doit être un nombre".to_string()),
    };

    Ok(Value::Reel(base.powf(exp)))
}

/**
 * Sin(angle: Reel) : Reel
 * Calcule le sinus de l'angle (en radians)
 */
pub fn sin(args: Vec<Value>) -> Result<Value, String> {
    if args.len() != 1 {
        return Err(format!("Sin() attend 1 argument, {} fourni(s)", args.len()));
    }

    let angle = match &args[0] {
        Value::Entier(n) => *n as f64,
        Value::Reel(f) => *f,
        _ => return Err("Sin() attend un nombre (angle en radians)".to_string()),
    };

    Ok(Value::Reel(angle.sin()))
}

/**
 * Cos(angle: Reel) : Reel
 * Calcule le cosinus de l'angle (en radians)
 */
pub fn cos(args: Vec<Value>) -> Result<Value, String> {
    if args.len() != 1 {
        return Err(format!("Cos() attend 1 argument, {} fourni(s)", args.len()));
    }

    let angle = match &args[0] {
        Value::Entier(n) => *n as f64,
        Value::Reel(f) => *f,
        _ => return Err("Cos() attend un nombre (angle en radians)".to_string()),
    };

    Ok(Value::Reel(angle.cos()))
}

/**
 * Tan(angle: Reel) : Reel
 * Calcule la tangente de l'angle (en radians)
 */
pub fn tan(args: Vec<Value>) -> Result<Value, String> {
    if args.len() != 1 {
        return Err(format!("Tan() attend 1 argument, {} fourni(s)", args.len()));
    }

    let angle = match &args[0] {
        Value::Entier(n) => *n as f64,
        Value::Reel(f) => *f,
        _ => return Err("Tan() attend un nombre (angle en radians)".to_string()),
    };

    Ok(Value::Reel(angle.tan()))
}

/**
 * Log(x: Reel) : Reel
 * Calcule le logarithme naturel (base e) de x
 */
pub fn log(args: Vec<Value>) -> Result<Value, String> {
    if args.len() != 1 {
        return Err(format!("Log() attend 1 argument, {} fourni(s)", args.len()));
    }

    let x = match &args[0] {
        Value::Entier(n) => *n as f64,
        Value::Reel(f) => *f,
        _ => return Err("Log() attend un nombre".to_string()),
    };

    if x <= 0.0 {
        return Err("Log() : impossible de calculer le logarithme d'un nombre négatif ou nul".to_string());
    }

    Ok(Value::Reel(x.ln()))
}

/**
 * Exp(x: Reel) : Reel
 * Calcule e^x (exponentielle)
 */
pub fn exp(args: Vec<Value>) -> Result<Value, String> {
    if args.len() != 1 {
        return Err(format!("Exp() attend 1 argument, {} fourni(s)", args.len()));
    }

    let x = match &args[0] {
        Value::Entier(n) => *n as f64,
        Value::Reel(f) => *f,
        _ => return Err("Exp() attend un nombre".to_string()),
    };

    Ok(Value::Reel(x.exp()))
}
