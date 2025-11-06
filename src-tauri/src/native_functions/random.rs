/**
 * Fonctions de génération aléatoire
 *
 * Fonctions: Aleatoire, AleatoireReel
 */

use crate::interpreter::Value;
use rand::Rng;

/**
 * Aleatoire(min: Entier, max: Entier) : Entier
 * Génère un nombre entier aléatoire entre min et max (inclus)
 */
pub fn random_int(args: Vec<Value>) -> Result<Value, String> {
    if args.len() != 2 {
        return Err(format!("Aleatoire() attend 2 arguments, {} fourni(s)", args.len()));
    }

    let min = match &args[0] {
        Value::Entier(n) => *n,
        _ => return Err("Aleatoire() : le minimum doit être un entier".to_string()),
    };

    let max = match &args[1] {
        Value::Entier(n) => *n,
        _ => return Err("Aleatoire() : le maximum doit être un entier".to_string()),
    };

    if min > max {
        return Err(format!("Aleatoire() : min ({}) ne peut pas être supérieur à max ({})", min, max));
    }

    let mut rng = rand::thread_rng();
    let random_value = rng.gen_range(min..=max);

    Ok(Value::Entier(random_value))
}

/**
 * AleatoireReel() : Reel
 * Génère un nombre réel aléatoire entre 0.0 et 1.0 (exclus)
 */
pub fn random_float(args: Vec<Value>) -> Result<Value, String> {
    if !args.is_empty() {
        return Err(format!("AleatoireReel() ne prend aucun argument, {} fourni(s)", args.len()));
    }

    let mut rng = rand::thread_rng();
    let random_value: f64 = rng.gen();

    Ok(Value::Reel(random_value))
}
