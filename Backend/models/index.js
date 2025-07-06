// Import de tous les modèles Mongoose
const Joueur = require('./Joueur');
const CasesTerrain = require('./CasesTerrain');
const NiveauBatiment = require('./NiveauBatiment');
const Ressource = require('./Ressource');
const RessourceJoueur = require('./RessourceJoueur');
const ProductionRessource = require('./ProductionRessource');
const BesoinRessource = require('./BesoinRessource');
const PossessionBatiment = require('./PossessionBatiment');

// Export de tous les modèles
module.exports = {
  Joueur,
  CasesTerrain,
  PossessionBatiment,
  NiveauBatiment, 
  Ressource,
  RessourceJoueur,
  ProductionRessource,
  BesoinRessource, 
}; 