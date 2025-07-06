const mongoose = require('mongoose');

const besoinRessourceSchema = new mongoose.Schema({
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
  productionRessourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductionRessource'
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
besoinRessourceSchema.index({ niveauId: 1, ressourceId: 1 });
besoinRessourceSchema.index({ productionRessourceId: 1 });

module.exports = mongoose.model('BesoinRessource', besoinRessourceSchema); 