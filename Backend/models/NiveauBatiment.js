const mongoose = require('mongoose');

const niveauBatimentSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    enum: ['Bureau', 'Usine', 'Dépôt', 'Centrale', 'Épicerie', 'Atelier', 'Banque']
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  niveau: {
    type: Number,
    required: true,
    min: 1
  },
  description: {
    type: String,
    trim: true
  },
  coutBase: {
    type: Number,
    required: false,
    min: 0,
    default: 0
  },
  coutAmelioration: {
    type: Number,
    required: false,
    min: 0,
    default: 0
  },
  ressourcesAmelioration: [{
    ressourceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ressource'
    },
    quantite: {
      type: Number,
      min: 0,
      default: 0
    }
  }],
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
niveauBatimentSchema.index({ nom: 1, niveau: 1 }, { unique: true });
niveauBatimentSchema.index({ niveau: 1 });

module.exports = mongoose.model('NiveauBatiment', niveauBatimentSchema); 