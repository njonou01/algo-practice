/**
 * Utilitaires de validation pour les fichiers et URIs
 */

/**
 * Caractères invalides dans les noms de fichiers selon différents systèmes d'exploitation
 */
const INVALID_FILENAME_CHARS = /[<>:"|?*\x00-\x1F]/;
const INVALID_FILENAME_CHARS_WINDOWS = /[<>:"|?*\x00-\x1F\\\/]/;

/**
 * Noms réservés Windows
 */
const RESERVED_NAMES_WINDOWS = new Set([
  'CON', 'PRN', 'AUX', 'NUL',
  'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9',
  'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'
]);

/**
 * Valide un nom de fichier (sans le chemin)
 * Retourne true si valide, false sinon
 */
export function isValidFileName(fileName: string): boolean {
  if (!fileName || fileName.trim() === '') {
    return false;
  }

  // Vérifier la longueur (255 caractères max pour la plupart des systèmes)
  if (fileName.length > 255) {
    return false;
  }

  // Vérifier les caractères invalides
  if (INVALID_FILENAME_CHARS.test(fileName)) {
    return false;
  }

  // Vérifier les noms réservés Windows
  const nameWithoutExt = fileName.split('.')[0].toUpperCase();
  if (RESERVED_NAMES_WINDOWS.has(nameWithoutExt)) {
    return false;
  }

  // Pas de points ou espaces uniquement
  if (/^[.\s]+$/.test(fileName)) {
    return false;
  }

  return true;
}

/**
 * Assainit un nom de fichier en remplaçant les caractères invalides
 */
export function sanitizeFileName(fileName: string): string {
  if (!fileName) return 'fichier.algo';

  // Remplacer les caractères invalides par des underscores
  let sanitized = fileName.replace(INVALID_FILENAME_CHARS_WINDOWS, '_');

  // Remplacer les espaces multiples par un seul
  sanitized = sanitized.replace(/\s+/g, ' ');

  // Retirer les points en début et fin
  sanitized = sanitized.replace(/^\.+|\.+$/g, '');

  // Si vide après nettoyage, utiliser un nom par défaut
  if (!sanitized || sanitized.trim() === '') {
    return 'fichier.algo';
  }

  // Vérifier les noms réservés Windows
  const nameWithoutExt = sanitized.split('.')[0].toUpperCase();
  if (RESERVED_NAMES_WINDOWS.has(nameWithoutExt)) {
    sanitized = `_${sanitized}`;
  }

  // Limiter la longueur
  if (sanitized.length > 255) {
    const ext = sanitized.match(/\.[^.]+$/)?.[0] || '';
    const baseName = sanitized.slice(0, 255 - ext.length);
    sanitized = baseName + ext;
  }

  return sanitized;
}

/**
 * Valide un chemin de fichier complet
 */
export function isValidFilePath(path: string): boolean {
  if (!path || path.trim() === '') {
    return false;
  }

  // Vérifier la longueur totale du chemin (4096 sur Unix, 260 sur Windows sans mode long)
  if (path.length > 4096) {
    return false;
  }

  // Extraire le nom de fichier
  const fileName = path.split('/').pop() || path.split('\\').pop();
  if (!fileName) {
    return false;
  }

  return isValidFileName(fileName);
}

/**
 * Encode un chemin de fichier en URI valide pour Monaco
 * Normalise les séparateurs et encode les caractères spéciaux
 */
export function encodeFileUri(path: string): string {
  // Normaliser les séparateurs de chemin
  const normalizedPath = path.replace(/\\/g, '/');

  // Encoder chaque segment du chemin individuellement pour préserver les /
  const segments = normalizedPath.split('/');
  const encodedSegments = segments.map(segment =>
    encodeURIComponent(segment)
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
  );

  return `file:///${encodedSegments.join('/')}`;
}

/**
 * Décode un URI de fichier Monaco en chemin
 */
export function decodeFileUri(uri: string): string {
  // Retirer le préfixe file:///
  const withoutProtocol = uri.replace(/^file:\/\/\//, '');

  // Décoder l'URI
  try {
    return decodeURIComponent(withoutProtocol);
  } catch (e) {
    console.warn('[WARN] Erreur lors du décodage de l\'URI:', uri, e);
    return withoutProtocol;
  }
}

/**
 * Extrait le nom de fichier depuis un chemin complet
 */
export function extractFileName(path: string): string {
  const fileName = path.split('/').pop() || path.split('\\').pop();
  return sanitizeFileName(fileName || 'fichier.algo');
}
