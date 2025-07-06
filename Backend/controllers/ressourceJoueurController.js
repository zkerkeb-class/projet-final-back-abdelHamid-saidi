const RessourceJoueur = require('../models/RessourceJoueur');
const Ressource = require('../models/Ressource');

// Récupérer toutes les ressources d'un joueur
exports.getRessourcesJoueur = async (req, res) => {
  try {
    const { joueurId } = req.params;
    const ressourcesJoueur = await RessourceJoueur.find({ joueurId })
      .populate('ressourceId')
      .populate('joueurId', 'pseudo email');
    
    res.json(ressourcesJoueur);
  } catch (error) {
    console.error('Erreur lors de la récupération des ressources du joueur:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des ressources du joueur' });
  }
};

// Récupérer une ressource spécifique d'un joueur
exports.getRessourceJoueurById = async (req, res) => {
  try {
    const { joueurId, ressourceId } = req.params;
    const ressourceJoueur = await RessourceJoueur.findOne({ 
      joueurId, 
      ressourceId 
    }).populate('ressourceId').populate('joueurId', 'pseudo email');
    
    if (!ressourceJoueur) {
      return res.status(404).json({ message: 'Ressource du joueur non trouvée' });
    }
    
    res.json(ressourceJoueur);
  } catch (error) {
    console.error('Erreur lors de la récupération de la ressource du joueur:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la ressource du joueur' });
  }
};

// Créer ou mettre à jour une ressource pour un joueur
exports.createOrUpdateRessourceJoueur = async (req, res) => {
  try {
    const { joueurId, ressourceId } = req.params;
    const { quantite } = req.body;
    
    if (quantite === undefined || quantite < 0) {
      return res.status(400).json({ message: 'Quantité valide requise' });
    }

    const ressourceJoueur = await RessourceJoueur.findOneAndUpdate(
      { joueurId, ressourceId },
      { 
        quantite,
        derniereMiseAJour: new Date()
      },
      { 
        upsert: true, 
        new: true 
      }
    ).populate('ressourceId').populate('joueurId', 'pseudo email');

    res.json({
      message: 'Ressource du joueur mise à jour avec succès',
      ressourceJoueur
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la ressource du joueur:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la ressource du joueur' });
  }
};

// Ajouter une quantité à une ressource existante
exports.addRessourceJoueur = async (req, res) => {
  try {
    const { joueurId, ressourceId } = req.params;
    const { quantite } = req.body;
    
    if (quantite === undefined || quantite <= 0) {
      return res.status(400).json({ message: 'Quantité positive requise' });
    }

    const ressourceJoueur = await RessourceJoueur.findOneAndUpdate(
      { joueurId, ressourceId },
      { 
        $inc: { quantite: quantite },
        derniereMiseAJour: new Date()
      },
      { 
        upsert: true, 
        new: true 
      }
    ).populate('ressourceId').populate('joueurId', 'pseudo email');

    res.json({
      message: 'Ressource ajoutée avec succès',
      ressourceJoueur
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de ressource:', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de ressource' });
  }
};

// Consommer une quantité d'une ressource
exports.consumeRessourceJoueur = async (req, res) => {
  try {
    const { joueurId, ressourceId } = req.params;
    const { quantite } = req.body;
    
    if (quantite === undefined || quantite <= 0) {
      return res.status(400).json({ message: 'Quantité positive requise' });
    }

    const ressourceJoueur = await RessourceJoueur.findOne({ joueurId, ressourceId });
    
    if (!ressourceJoueur) {
      return res.status(404).json({ message: 'Ressource du joueur non trouvée' });
    }

    if (ressourceJoueur.quantite < quantite) {
      return res.status(400).json({ message: 'Quantité insuffisante' });
    }

    ressourceJoueur.quantite -= quantite;
    ressourceJoueur.derniereMiseAJour = new Date();
    await ressourceJoueur.save();

    await ressourceJoueur.populate('ressourceId');
    await ressourceJoueur.populate('joueurId', 'pseudo email');

    res.json({
      message: 'Ressource consommée avec succès',
      ressourceJoueur
    });
  } catch (error) {
    console.error('Erreur lors de la consommation de ressource:', error);
    res.status(500).json({ message: 'Erreur lors de la consommation de ressource' });
  }
};

// Supprimer une ressource d'un joueur
exports.deleteRessourceJoueur = async (req, res) => {
  try {
    const { joueurId, ressourceId } = req.params;
    
    const ressourceJoueur = await RessourceJoueur.findOneAndDelete({ joueurId, ressourceId });
    
    if (!ressourceJoueur) {
      return res.status(404).json({ message: 'Ressource du joueur non trouvée' });
    }
    
    res.json({ message: 'Ressource du joueur supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la ressource du joueur:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la ressource du joueur' });
  }
};

// Récupérer toutes les ressources de tous les joueurs (admin)
exports.getAllRessourcesJoueurs = async (req, res) => {
  try {
    const ressourcesJoueurs = await RessourceJoueur.find({})
      .populate('ressourceId')
      .populate('joueurId', 'pseudo email');
    
    res.json(ressourcesJoueurs);
  } catch (error) {
    console.error('Erreur lors de la récupération de toutes les ressources des joueurs:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de toutes les ressources des joueurs' });
  }
}; 