const express = require('express');
const router = express.Router();
const joueurController = require('../controllers/joueurController');
const { validateAuth } = require('../middleware/validation');
const auth = require('../middleware/auth');

// Route de test pour vérifier les joueurs (à retirer en production)
router.get('/test', async (req, res) => {
  try {
    const joueurs = await joueurController.getAllJoueurs();
    res.json(joueurs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des joueurs', error: error.message });
  }
});

// Routes d'authentification
router.post('/inscription', validateAuth, joueurController.inscription);
router.post('/connexion', validateAuth, joueurController.connexion);

// Routes protégées (nécessitent une authentification)
router.get('/profil', auth, joueurController.getProfil);
router.put('/profil', auth, joueurController.updateProfil);
router.get('/classement', auth, joueurController.getClassement);

module.exports = router; 