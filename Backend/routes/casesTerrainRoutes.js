const express = require('express');
const router = express.Router();
const casesTerrainController = require('../controllers/casesTerrainController');
const auth = require('../middleware/auth');

// Routes protégées (joueur connecté)
router.get('/joueur/:joueurId', auth, casesTerrainController.getCasesJoueur);
router.get('/:id', auth, casesTerrainController.getCaseById);
router.post('/', auth, casesTerrainController.createCase);
router.put('/:id', auth, casesTerrainController.updateCase);
router.delete('/:id', auth, casesTerrainController.deleteCase);

// Route admin
router.get('/', auth, casesTerrainController.getAllCases);

module.exports = router; 