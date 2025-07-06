const CasesTerrain = require('../models/CasesTerrain');

// Récupérer toutes les cases d'un joueur
exports.getCasesJoueur = async (req, res) => {
  try {
    const { joueurId } = req.params;
    const cases = await CasesTerrain.find({ joueurId }).populate('joueurId', 'pseudo email');
    res.json(cases);
  } catch (error) {
    console.error('Erreur lors de la récupération des cases:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des cases' });
  }
};

// Récupérer une case spécifique
exports.getCaseById = async (req, res) => {
  try {
    const caseTerrain = await CasesTerrain.findById(req.params.id).populate('joueurId', 'pseudo email');
    if (!caseTerrain) {
      return res.status(404).json({ message: 'Case non trouvée' });
    }
    res.json(caseTerrain);
  } catch (error) {
    console.error('Erreur lors de la récupération de la case:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la case' });
  }
};

// Créer une nouvelle case
exports.createCase = async (req, res) => {
  try {
    const { pos_x, pos_y, joueurId } = req.body;
    
    if (!pos_x || !pos_y || !joueurId) {
      return res.status(400).json({ message: 'Position et joueur requis' });
    }

    const caseTerrain = new CasesTerrain({ pos_x, pos_y, joueurId });
    await caseTerrain.save();
    
    res.status(201).json({
      message: 'Case créée avec succès',
      caseTerrain
    });
  } catch (error) {
    console.error('Erreur lors de la création de la case:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la case' });
  }
};

// Mettre à jour une case
exports.updateCase = async (req, res) => {
  try {
    const { pos_x, pos_y } = req.body;
    
    const caseTerrain = await CasesTerrain.findById(req.params.id);
    if (!caseTerrain) {
      return res.status(404).json({ message: 'Case non trouvée' });
    }

    if (pos_x !== undefined) caseTerrain.pos_x = pos_x;
    if (pos_y !== undefined) caseTerrain.pos_y = pos_y;

    await caseTerrain.save();
    res.json({
      message: 'Case mise à jour avec succès',
      caseTerrain
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la case:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la case' });
  }
};

// Supprimer une case
exports.deleteCase = async (req, res) => {
  try {
    const caseTerrain = await CasesTerrain.findByIdAndDelete(req.params.id);
    if (!caseTerrain) {
      return res.status(404).json({ message: 'Case non trouvée' });
    }
    res.json({ message: 'Case supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la case:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la case' });
  }
};

// Récupérer toutes les cases (admin)
exports.getAllCases = async (req, res) => {
  try {
    const cases = await CasesTerrain.find({}).populate('joueurId', 'pseudo email');
    res.json(cases);
  } catch (error) {
    console.error('Erreur lors de la récupération de toutes les cases:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de toutes les cases' });
  }
}; 