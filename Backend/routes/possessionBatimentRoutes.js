const express = require('express');
const router = express.Router();
const possessionBatimentController = require('../controllers/possessionBatimentController');
const auth = require('../middleware/auth');

// Routes publiques
router.get('/', possessionBatimentController.getAllBatiments);
router.get('/:id', possessionBatimentController.getBatimentById);
router.get('/joueur/:joueurId', possessionBatimentController.getBatimentsJoueur);

// Routes protégées (nécessitent une authentification)
router.post('/', auth, possessionBatimentController.createBatiment);
router.put('/:id', auth, possessionBatimentController.updateBatiment);
router.delete('/:id', auth, possessionBatimentController.deleteBatiment);

module.exports = router; 