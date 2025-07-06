const mongoose = require('mongoose');

const ressourceJoueurSchema = new mongoose.Schema({
  joueurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Joueur',
    required: true
  },
  ressourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ressource',
    required: true
  },
  quantite: {
    type: Number,
    default: 0,
    min: 0
  },
  derniereMiseAJour: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes
ressourceJoueurSchema.index({ joueurId: 1, ressourceId: 1 }, { unique: true });
ressourceJoueurSchema.index({ joueurId: 1 });
ressourceJoueurSchema.index({ ressourceId: 1 });

module.exports = mongoose.model('RessourceJoueur', ressourceJoueurSchema); 