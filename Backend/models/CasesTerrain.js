const mongoose = require('mongoose');

const casesTerrainSchema = new mongoose.Schema({
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
  joueurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Joueur',
    required: true
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
casesTerrainSchema.index({ joueurId: 1 });
casesTerrainSchema.index({ pos_x: 1, pos_y: 1 });

module.exports = mongoose.model('CasesTerrain', casesTerrainSchema); 