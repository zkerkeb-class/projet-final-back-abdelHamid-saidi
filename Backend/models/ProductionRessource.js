const mongoose = require('mongoose');

const productionRessourceSchema = new mongoose.Schema({
  niveauId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NiveauBatiment',
    required: true
  },
  ressourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ressource',
    required: true
  },
  quantite: {
    type: Number,
    required: true,
    min: 0
  },
  frequence: {
    type: Number,
    required: true,
    min: 1,
    default: 1 // en heures
  },
  actif: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
productionRessourceSchema.index({ niveauId: 1, ressourceId: 1 });
productionRessourceSchema.index({ actif: 1 });

module.exports = mongoose.model('ProductionRessource', productionRessourceSchema); 