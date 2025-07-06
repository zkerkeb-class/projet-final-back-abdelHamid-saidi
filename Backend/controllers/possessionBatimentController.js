const PossessionBatiment = require('../models/PossessionBatiment');

// Récupérer tous les bâtiments d'un joueur
exports.getBatimentsJoueur = async (req, res) => {
  try {
    const { joueurId } = req.params;
    const batiments = await PossessionBatiment.find({ joueurId })
      .populate('joueurId', 'pseudo email')
      .populate('niveauId');
    res.json(batiments);
  } catch (error) {
    console.error('Erreur lors de la récupération des bâtiments:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des bâtiments' });
  }
};

// Récupérer un bâtiment spécifique
exports.getBatimentById = async (req, res) => {
  try {
    const batiment = await PossessionBatiment.findById(req.params.id)
      .populate('joueurId', 'pseudo email')
      .populate('niveauId');
    if (!batiment) {
      return res.status(404).json({ message: 'Bâtiment non trouvé' });
    }
    res.json(batiment);
  } catch (error) {
    console.error('Erreur lors de la récupération du bâtiment:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du bâtiment' });
  }
};

// Créer un nouveau bâtiment
exports.createBatiment = async (req, res) => {
  try {
    const { pos_x, pos_y, niveauId, joueurId } = req.body;
    
    if (!pos_x || !pos_y || !niveauId || !joueurId) {
      return res.status(400).json({ message: 'Position, niveau et joueur requis' });
    }

    const batiment = new PossessionBatiment({ pos_x, pos_y, niveauId, joueurId });
    await batiment.save();
    
    res.status(201).json({
      message: 'Bâtiment créé avec succès',
      batiment
    });
  } catch (error) {
    console.error('Erreur lors de la création du bâtiment:', error);
    res.status(500).json({ message: 'Erreur lors de la création du bâtiment' });
  }
};

// Mettre à jour un bâtiment
exports.updateBatiment = async (req, res) => {
  try {
    const { pos_x, pos_y, niveauId } = req.body;
    
    const batiment = await PossessionBatiment.findById(req.params.id);
    if (!batiment) {
      return res.status(404).json({ message: 'Bâtiment non trouvé' });
    }

    if (pos_x !== undefined) batiment.pos_x = pos_x;
    if (pos_y !== undefined) batiment.pos_y = pos_y;
    if (niveauId) batiment.niveauId = niveauId;

    await batiment.save();
    res.json({
      message: 'Bâtiment mis à jour avec succès',
      batiment
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du bâtiment:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du bâtiment' });
  }
};

// Supprimer un bâtiment
exports.deleteBatiment = async (req, res) => {
  try {
    const batiment = await PossessionBatiment.findByIdAndDelete(req.params.id);
    if (!batiment) {
      return res.status(404).json({ message: 'Bâtiment non trouvé' });
    }
    res.json({ message: 'Bâtiment supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du bâtiment:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du bâtiment' });
  }
};

// Récupérer tous les bâtiments (admin)
exports.getAllBatiments = async (req, res) => {
  try {
    const batiments = await PossessionBatiment.find({})
      .populate('joueurId', 'pseudo email')
      .populate('niveauId');
    res.json(batiments);
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les bâtiments:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de tous les bâtiments' });
  }
}; 