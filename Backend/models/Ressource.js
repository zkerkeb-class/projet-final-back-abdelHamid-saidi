const mongoose = require('mongoose');

const ressourceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Énergie', 'Matériaux', 'Produits', 'Influence']
  },
  nom: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  prixAchat: {
    type: Number,
    required: true,
    min: 0
  },
  prixVente: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes (sans les champs déjà indexés par unique: true)
ressourceSchema.index({ type: 1 });
ressourceSchema.index({ prixAchat: 1 });
ressourceSchema.index({ prixVente: 1 });

module.exports = mongoose.model('Ressource', ressourceSchema); 