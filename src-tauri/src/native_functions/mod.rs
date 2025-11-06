/**
 * Module des fonctions natives d'AlgoGénie
 *
 * Ce module fournit toutes les fonctions natives impossibles à implémenter
 * en pseudocode pur (aléatoire, date/temps, math avancé, conversions, etc.)
 *
 * Organisation:
 * - math.rs: Fonctions mathématiques (Racine, Puissance, Sin, Cos, Tan, Log, Exp)
 * - random.rs: Génération aléatoire (Aleatoire, AleatoireReel)
 * - datetime.rs: Date et temps (DateActuelle, HeureActuelle, TimestampActuel, JourSemaine)
 * - conversion.rs: Conversions de types (EnTexte, EnEntier, EnReel, EnTableauCaracteres, EnChaineCaracteres)
 */

use crate::interpreter::Value;

// Sous-modules
mod math;
mod random;
mod datetime;
mod conversion;

/**
 * Point d'entrée principal pour appeler une fonction native
 *
 * @param name Nom de la fonction (ex: "Aleatoire", "Sin", "DateActuelle")
 * @param args Arguments de la fonction
 * @return Résultat de la fonction ou erreur
 */
pub fn call(name: &str, args: Vec<Value>) -> Result<Value, String> {
    match name {
        // === MATHÉMATIQUES ===
        "Racine" => math::sqrt(args),
        "Puissance" => math::power(args),
        "Sin" => math::sin(args),
        "Cos" => math::cos(args),
        "Tan" => math::tan(args),
        "Log" => math::log(args),
        "Exp" => math::exp(args),

        // === ALÉATOIRE ===
        "Aleatoire" => random::random_int(args),
        "AleatoireReel" => random::random_float(args),

        // === DATE ET TEMPS ===
        "DateActuelle" => datetime::current_date(args),
        "HeureActuelle" => datetime::current_time(args),
        "TimestampActuel" => datetime::current_timestamp(args),
        "JourSemaine" => datetime::day_of_week(args),

        // === CONVERSION ===
        "EnTexte" => conversion::to_string(args),
        "EnEntier" => conversion::to_int(args),
        "EnReel" => conversion::to_float(args),
        "EnTableauCaracteres" => conversion::to_char_array(args),
        "EnChaineCaracteres" => conversion::from_char_array(args),

        // Fonction inconnue
        _ => Err(format!("Fonction native '{}' inconnue", name))
    }
}

/**
 * Liste toutes les fonctions natives disponibles
 * Utile pour l'autocomplétion et la documentation
 */
pub fn list_all() -> Vec<&'static str> {
    vec![
        // Math
        "Racine", "Puissance", "Sin", "Cos", "Tan", "Log", "Exp",
        // Random
        "Aleatoire", "AleatoireReel",
        // DateTime
        "DateActuelle", "HeureActuelle", "TimestampActuel", "JourSemaine",
        // Conversion
        "EnTexte", "EnEntier", "EnReel", "EnTableauCaracteres", "EnChaineCaracteres",
    ]
}

/**
 * Vérifie si une fonction est une fonction native
 */
pub fn is_native(name: &str) -> bool {
    list_all().contains(&name)
}
