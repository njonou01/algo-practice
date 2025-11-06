/**
 * Fonctions de date et temps
 *
 * Fonctions: DateActuelle, HeureActuelle, TimestampActuel, JourSemaine
 */

use crate::interpreter::Value;
use chrono::{Local, Datelike};

/**
 * DateActuelle() : Chaine
 * Retourne la date actuelle au format "JJ/MM/AAAA"
 */
pub fn current_date(args: Vec<Value>) -> Result<Value, String> {
    if !args.is_empty() {
        return Err(format!("DateActuelle() ne prend aucun argument, {} fourni(s)", args.len()));
    }

    let now = Local::now();
    let date_string = now.format("%d/%m/%Y").to_string();

    Ok(Value::Chaine(date_string))
}

/**
 * HeureActuelle() : Chaine
 * Retourne l'heure actuelle au format "HH:MM:SS"
 */
pub fn current_time(args: Vec<Value>) -> Result<Value, String> {
    if !args.is_empty() {
        return Err(format!("HeureActuelle() ne prend aucun argument, {} fourni(s)", args.len()));
    }

    let now = Local::now();
    let time_string = now.format("%H:%M:%S").to_string();

    Ok(Value::Chaine(time_string))
}

/**
 * TimestampActuel() : Entier
 * Retourne le timestamp Unix actuel (secondes depuis le 1er janvier 1970)
 */
pub fn current_timestamp(args: Vec<Value>) -> Result<Value, String> {
    if !args.is_empty() {
        return Err(format!("TimestampActuel() ne prend aucun argument, {} fourni(s)", args.len()));
    }

    let now = Local::now();
    let timestamp = now.timestamp();

    Ok(Value::Entier(timestamp))
}

/**
 * JourSemaine() : Chaine
 * Retourne le jour de la semaine actuel en français
 */
pub fn day_of_week(args: Vec<Value>) -> Result<Value, String> {
    if !args.is_empty() {
        return Err(format!("JourSemaine() ne prend aucun argument, {} fourni(s)", args.len()));
    }

    let now = Local::now();
    let weekday = now.weekday();

    let day_name = match weekday {
        chrono::Weekday::Mon => "Lundi",
        chrono::Weekday::Tue => "Mardi",
        chrono::Weekday::Wed => "Mercredi",
        chrono::Weekday::Thu => "Jeudi",
        chrono::Weekday::Fri => "Vendredi",
        chrono::Weekday::Sat => "Samedi",
        chrono::Weekday::Sun => "Dimanche",
    };

    Ok(Value::Chaine(day_name.to_string()))
}
