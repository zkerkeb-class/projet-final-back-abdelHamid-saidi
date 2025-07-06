const express = require('express');
const router = express.Router();
const besoinRessourceController = require('../controllers/besoinRessourceController');
const auth = require('../middleware/auth');

// Routes publiques
router.get('/', besoinRessourceController.getAllBesoins);
router.get('/niveau/:niveauId', besoinRessourceController.getBesoinsByNiveau);
router.get('/ressource/:ressourceId', besoinRessourceController.getBesoinsByRessource);
router.get('/:id', besoinRessourceController.getBesoinById);

// Routes protégées (admin)
router.post('/', auth, besoinRessourceController.createBesoin);
router.put('/:id', auth, besoinRessourceController.updateBesoin);
router.delete('/:id', auth, besoinRessourceController.deleteBesoin);

module.exports = router; 