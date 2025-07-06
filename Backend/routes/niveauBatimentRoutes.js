const express = require('express');
const router = express.Router();
const niveauBatimentController = require('../controllers/niveauBatimentController');
const auth = require('../middleware/auth');

// Routes publiques
router.get('/', niveauBatimentController.getAllNiveauxBatiments);
router.get('/nom/:nom', niveauBatimentController.getNiveauxByNom);
router.get('/niveau/:niveau', niveauBatimentController.getNiveauxByNiveau);
router.get('/:id', niveauBatimentController.getNiveauBatimentById);

// Routes protégées (admin)
router.post('/', auth, niveauBatimentController.createNiveauBatiment);
router.put('/:id', auth, niveauBatimentController.updateNiveauBatiment);
router.delete('/:id', auth, niveauBatimentController.deleteNiveauBatiment);

module.exports = router; 