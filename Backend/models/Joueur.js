const mongoose = require('mongoose');

const joueurSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  motDePasseHash: {
    type: String,
    required: true
  },
  patrimoine: {
    type: Number,
    default: 0,
    min: 0
  },
  classement: {
    type: Number,
    default: 0,
    min: 0
  },
  niveauActuel: {
    type: Number,
    default: 1,
    min: 1
  },
  experience: {
    type: Number,
    default: 0,
    min: 0
  },
  dateDerniereConnexion: {
    type: Date,
    default: Date.now
  },
  actif: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index pour optimiser les requêtes (sans les champs déjà indexés par unique: true)
joueurSchema.index({ patrimoine: -1 }); // Pour le classement
joueurSchema.index({ niveauActuel: -1 });
joueurSchema.index({ actif: 1 });

module.exports = mongoose.model('Joueur', joueurSchema); 