/**
 * Gestionnaire de modèles Monaco pour éviter les fuites mémoire
 * Basé sur les best practices de Monaco Editor
 */

type Monaco = any;

interface ModelInfo {
  fileId: string;
  uri: string;
  model: any;
}

class MonacoModelManager {
  private monaco: Monaco | null = null;
  private models: Map<string, ModelInfo> = new Map();

  /**
   * Initialise le gestionnaire avec l'instance Monaco
   */
  init(monaco: Monaco) {
    this.monaco = monaco;
    console.log('📦 MonacoModelManager initialisé');
  }

  /**
   * Crée ou récupère un modèle pour un fichier
   */
  getOrCreateModel(fileId: string, content: string, uri: string): any {
    if (!this.monaco) {
      console.error('❌ Monaco non initialisé');
      return null;
    }

    console.log(`📝 getOrCreateModel appelé pour ${fileId}, content length: ${content.length}`);

    // Vérifier si le modèle existe déjà
    const existingModel = this.models.get(fileId);
    if (existingModel) {
      console.log(`♻️ Réutilisation du modèle existant pour: ${fileId}`);
      // TOUJOURS mettre à jour le contenu (important pour les exemples)
      if (existingModel.model.getValue() !== content) {
        console.log(`🔄 Mise à jour du contenu du modèle (${existingModel.model.getValue().length} -> ${content.length} chars)`);
        existingModel.model.setValue(content);
      }
      return existingModel.model;
    }

    // Créer un nouvel URI Monaco
    const monacoUri = this.monaco.Uri.parse(uri);

    // Vérifier si un modèle existe déjà avec cet URI (cas rare)
    let model = this.monaco.editor.getModel(monacoUri);

    if (!model) {
      // Créer un nouveau modèle
      console.log(`✨ Création d'un nouveau modèle pour: ${fileId} (${uri}) avec ${content.length} caractères`);
      model = this.monaco.editor.createModel(
        content,
        'algorithmique',
        monacoUri
      );
      console.log(`✅ Modèle créé, value length: ${model.getValue().length}`);
    } else {
      console.log(`♻️ Modèle existant trouvé par URI: ${uri}`);
      model.setValue(content);
    }

    // Stocker le modèle
    this.models.set(fileId, {
      fileId,
      uri,
      model,
    });

    return model;
  }

  /**
   * Supprime un modèle et libère la mémoire
   */
  disposeModel(fileId: string) {
    const modelInfo = this.models.get(fileId);
    if (modelInfo) {
      console.log(`🗑️ Suppression du modèle: ${fileId}`);
      modelInfo.model.dispose();
      this.models.delete(fileId);
    }
  }

  /**
   * Obtient un modèle existant
   */
  getModel(fileId: string): any | null {
    const modelInfo = this.models.get(fileId);
    return modelInfo ? modelInfo.model : null;
  }

  /**
   * Nettoie tous les modèles
   */
  disposeAll() {
    console.log(`🗑️ Nettoyage de ${this.models.size} modèles`);
    this.models.forEach((modelInfo) => {
      modelInfo.model.dispose();
    });
    this.models.clear();
  }

  /**
   * Obtient des statistiques sur les modèles
   */
  getStats() {
    return {
      totalModels: this.models.size,
      models: Array.from(this.models.values()).map(m => ({
        fileId: m.fileId,
        uri: m.uri,
      })),
    };
  }
}

// Instance singleton
export const monacoModelManager = new MonacoModelManager();
