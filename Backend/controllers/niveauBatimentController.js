const NiveauBatiment = require('../models/NiveauBatiment');

// Récupérer tous les niveaux de bâtiments
exports.getAllNiveauxBatiments = async (req, res) => {
  try {
    const niveaux = await NiveauBatiment.find({}).populate('ressourcesAmelioration.ressourceId');
    res.json(niveaux);
  } catch (error) {
    console.error('Erreur lors de la récupération des niveaux de bâtiments:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des niveaux de bâtiments' });
  }
};

// Récupérer un niveau de bâtiment par ID
exports.getNiveauBatimentById = async (req, res) => {
  try {
    const niveau = await NiveauBatiment.findById(req.params.id).populate('ressourcesAmelioration.ressourceId');
    if (!niveau) {
      return res.status(404).json({ message: 'Niveau de bâtiment non trouvé' });
    }
    res.json(niveau);
  } catch (error) {
    console.error('Erreur lors de la récupération du niveau de bâtiment:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du niveau de bâtiment' });
  }
};

// Créer un nouveau niveau de bâtiment
exports.createNiveauBatiment = async (req, res) => {
  try {
    const { nom, niveau, image, description, coutBase, coutAmelioration, ressourcesAmelioration, taille } = req.body;
    
    if (!nom || !niveau || !image) {
      return res.status(400).json({ message: 'Nom, niveau et image sont requis' });
    }

    const niveauBatiment = new NiveauBatiment({
      nom,
      niveau,
      image,
      description,
      coutBase: coutBase || 0,
      coutAmelioration: coutAmelioration || 0,
      ressourcesAmelioration: ressourcesAmelioration || [],
      taille: taille || { largeur: 1, hauteur: 1 }
    });

    await niveauBatiment.save();
    res.status(201).json({
      message: 'Niveau de bâtiment créé avec succès',
      niveauBatiment
    });
  } catch (error) {
    console.error('Erreur lors de la création du niveau de bâtiment:', error);
    res.status(500).json({ message: 'Erreur lors de la création du niveau de bâtiment' });
  }
};

// Mettre à jour un niveau de bâtiment
exports.updateNiveauBatiment = async (req, res) => {
  try {
    const { nom, niveau, image, description, coutBase, coutAmelioration, ressourcesAmelioration, taille } = req.body;
    
    const niveauBatiment = await NiveauBatiment.findById(req.params.id);
    if (!niveauBatiment) {
      return res.status(404).json({ message: 'Niveau de bâtiment non trouvé' });
    }

    // Mise à jour des champs
    if (nom) niveauBatiment.nom = nom;
    if (niveau) niveauBatiment.niveau = niveau;
    if (image) niveauBatiment.image = image;
    if (description !== undefined) niveauBatiment.description = description;
    if (coutBase !== undefined) niveauBatiment.coutBase = coutBase;
    if (coutAmelioration !== undefined) niveauBatiment.coutAmelioration = coutAmelioration;
    if (ressourcesAmelioration) niveauBatiment.ressourcesAmelioration = ressourcesAmelioration;
    if (taille) niveauBatiment.taille = taille;

    await niveauBatiment.save();
    res.json({
      message: 'Niveau de bâtiment mis à jour avec succès',
      niveauBatiment
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du niveau de bâtiment:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du niveau de bâtiment' });
  }
};

// Supprimer un niveau de bâtiment
exports.deleteNiveauBatiment = async (req, res) => {
  try {
    const niveauBatiment = await NiveauBatiment.findByIdAndDelete(req.params.id);
    if (!niveauBatiment) {
      return res.status(404).json({ message: 'Niveau de bâtiment non trouvé' });
    }
    res.json({ message: 'Niveau de bâtiment supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du niveau de bâtiment:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du niveau de bâtiment' });
  }
};

// Récupérer les niveaux par nom de bâtiment
exports.getNiveauxByNom = async (req, res) => {
  try {
    const { nom } = req.params;
    const niveaux = await NiveauBatiment.find({ nom }).populate('ressourcesAmelioration.ressourceId');
    res.json(niveaux);
  } catch (error) {
    console.error('Erreur lors de la récupération des niveaux par nom:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des niveaux par nom' });
  }
};

// Récupérer les niveaux par niveau
exports.getNiveauxByNiveau = async (req, res) => {
  try {
    const { niveau } = req.params;
    const niveaux = await NiveauBatiment.find({ niveau: parseInt(niveau) }).populate('ressourcesAmelioration.ressourceId');
    res.json(niveaux);
  } catch (error) {
    console.error('Erreur lors de la récupération des niveaux par niveau:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des niveaux par niveau' });
  }
}; 