const mongoose = require('mongoose');

const possessionBatimentSchema = new mongoose.Schema({
  pos_x: {
    type: Number,
    required: true,
    min: 0
  },
  pos_y: {
    type: Number,
    required: true,
    min: 0
  },
  niveauId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NiveauBatiment',
    required: true
  },
  joueurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Joueur',
    required: true
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
possessionBatimentSchema.index({ joueurId: 1 });
possessionBatimentSchema.index({ niveauId: 1 });
possessionBatimentSchema.index({ pos_x: 1, pos_y: 1 });

module.exports = mongoose.model('PossessionBatiment', possessionBatimentSchema); 