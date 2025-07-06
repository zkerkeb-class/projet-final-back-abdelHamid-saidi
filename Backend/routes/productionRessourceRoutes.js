const express = require('express');
const router = express.Router();
const productionRessourceController = require('../controllers/productionRessourceController');
const auth = require('../middleware/auth');

// Routes publiques
router.get('/', productionRessourceController.getAllProductions);
router.get('/actives', productionRessourceController.getProductionsActives);
router.get('/niveau/:niveauId', productionRessourceController.getProductionsByNiveau);
router.get('/:id', productionRessourceController.getProductionById);

// Routes protégées (nécessitent une authentification)
router.post('/', auth, productionRessourceController.createProduction);
router.put('/:id', auth, productionRessourceController.updateProduction);
router.delete('/:id', auth, productionRessourceController.deleteProduction);

module.exports = router; 