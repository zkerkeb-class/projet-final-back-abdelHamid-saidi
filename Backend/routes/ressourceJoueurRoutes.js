const express = require('express');
const router = express.Router();
const ressourceJoueurController = require('../controllers/ressourceJoueurController');
const auth = require('../middleware/auth');

// Routes protégées (joueur connecté)
router.get('/joueur/:joueurId', auth, ressourceJoueurController.getRessourcesJoueur);
router.get('/joueur/:joueurId/ressource/:ressourceId', auth, ressourceJoueurController.getRessourceJoueurById);
router.put('/joueur/:joueurId/ressource/:ressourceId', auth, ressourceJoueurController.createOrUpdateRessourceJoueur);
router.post('/joueur/:joueurId/ressource/:ressourceId/add', auth, ressourceJoueurController.addRessourceJoueur);
router.post('/joueur/:joueurId/ressource/:ressourceId/consume', auth, ressourceJoueurController.consumeRessourceJoueur);
router.delete('/joueur/:joueurId/ressource/:ressourceId', auth, ressourceJoueurController.deleteRessourceJoueur);

// Route admin
router.get('/', auth, ressourceJoueurController.getAllRessourcesJoueurs);

module.exports = router; 