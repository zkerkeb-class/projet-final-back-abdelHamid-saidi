const Ressource = require('../models/Ressource');

// Récupérer toutes les ressources
exports.getAllRessources = async (req, res) => {
  try {
    const ressources = await Ressource.find({});
    res.json(ressources);
  } catch (error) {
    console.error('Erreur lors de la récupération des ressources:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des ressources' });
  }
};

// Récupérer une ressource par ID
exports.getRessourceById = async (req, res) => {
  try {
    const ressource = await Ressource.findById(req.params.id);
    if (!ressource) {
      return res.status(404).json({ message: 'Ressource non trouvée' });
    }
    res.json(ressource);
  } catch (error) {
    console.error('Erreur lors de la récupération de la ressource:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la ressource' });
  }
};

// Créer une nouvelle ressource
exports.createRessource = async (req, res) => {
  try {
    const { type, nom, image, prixAchat, prixVente, description } = req.body;
    
    if (!type || !nom || !image || prixAchat === undefined || prixVente === undefined) {
      return res.status(400).json({ message: 'Tous les champs obligatoires sont requis' });
    }

    const ressource = new Ressource({
      type,
      nom,
      image,
      prixAchat,
      prixVente,
      description
    });

    await ressource.save();
    res.status(201).json({
      message: 'Ressource créée avec succès',
      ressource
    });
  } catch (error) {
    console.error('Erreur lors de la création de la ressource:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la ressource' });
  }
};

// Mettre à jour une ressource
exports.updateRessource = async (req, res) => {
  try {
    const { type, nom, image, prixAchat, prixVente, description } = req.body;
    
    const ressource = await Ressource.findById(req.params.id);
    if (!ressource) {
      return res.status(404).json({ message: 'Ressource non trouvée' });
    }

    // Mise à jour des champs
    if (type) ressource.type = type;
    if (nom) ressource.nom = nom;
    if (image) ressource.image = image;
    if (prixAchat !== undefined) ressource.prixAchat = prixAchat;
    if (prixVente !== undefined) ressource.prixVente = prixVente;
    if (description !== undefined) ressource.description = description;

    await ressource.save();
    res.json({
      message: 'Ressource mise à jour avec succès',
      ressource
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la ressource:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la ressource' });
  }
};

// Supprimer une ressource
exports.deleteRessource = async (req, res) => {
  try {
    const ressource = await Ressource.findByIdAndDelete(req.params.id);
    if (!ressource) {
      return res.status(404).json({ message: 'Ressource non trouvée' });
    }
    res.json({ message: 'Ressource supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la ressource:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la ressource' });
  }
};

// Récupérer les ressources par type
exports.getRessourcesByType = async (req, res) => {
  try {
    const { type } = req.params;
    const ressources = await Ressource.find({ type });
    res.json(ressources);
  } catch (error) {
    console.error('Erreur lors de la récupération des ressources par type:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des ressources par type' });
  }
}; 