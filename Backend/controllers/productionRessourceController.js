const ProductionRessource = require('../models/ProductionRessource');

// Récupérer toutes les productions
exports.getAllProductions = async (req, res) => {
  try {
    const productions = await ProductionRessource.find({})
      .populate('niveauId')
      .populate('ressourceId');
    res.json(productions);
  } catch (error) {
    console.error('Erreur lors de la récupération des productions:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des productions' });
  }
};

// Récupérer une production par ID
exports.getProductionById = async (req, res) => {
  try {
    const production = await ProductionRessource.findById(req.params.id)
      .populate('niveauId')
      .populate('ressourceId');
    if (!production) {
      return res.status(404).json({ message: 'Production non trouvée' });
    }
    res.json(production);
  } catch (error) {
    console.error('Erreur lors de la récupération de la production:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la production' });
  }
};

// Créer une nouvelle production
exports.createProduction = async (req, res) => {
  try {
    const { niveauId, ressourceId, quantite, frequence, actif } = req.body;
    
    if (!niveauId || !ressourceId || quantite === undefined || frequence === undefined) {
      return res.status(400).json({ message: 'Niveau, ressource, quantité et fréquence requis' });
    }

    const production = new ProductionRessource({
      niveauId,
      ressourceId,
      quantite,
      frequence,
      actif: actif !== undefined ? actif : true
    });

    await production.save();
    res.status(201).json({
      message: 'Production créée avec succès',
      production
    });
  } catch (error) {
    console.error('Erreur lors de la création de la production:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la production' });
  }
};

// Mettre à jour une production
exports.updateProduction = async (req, res) => {
  try {
    const { niveauId, ressourceId, quantite, frequence, actif } = req.body;
    
    const production = await ProductionRessource.findById(req.params.id);
    if (!production) {
      return res.status(404).json({ message: 'Production non trouvée' });
    }

    if (niveauId) production.niveauId = niveauId;
    if (ressourceId) production.ressourceId = ressourceId;
    if (quantite !== undefined) production.quantite = quantite;
    if (frequence !== undefined) production.frequence = frequence;
    if (actif !== undefined) production.actif = actif;

    await production.save();
    res.json({
      message: 'Production mise à jour avec succès',
      production
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la production:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la production' });
  }
};

// Supprimer une production
exports.deleteProduction = async (req, res) => {
  try {
    const production = await ProductionRessource.findByIdAndDelete(req.params.id);
    if (!production) {
      return res.status(404).json({ message: 'Production non trouvée' });
    }
    res.json({ message: 'Production supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la production:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la production' });
  }
};

// Récupérer les productions par niveau
exports.getProductionsByNiveau = async (req, res) => {
  try {
    const { niveauId } = req.params;
    const productions = await ProductionRessource.find({ niveauId })
      .populate('niveauId')
      .populate('ressourceId');
    res.json(productions);
  } catch (error) {
    console.error('Erreur lors de la récupération des productions par niveau:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des productions par niveau' });
  }
};

// Récupérer les productions actives
exports.getProductionsActives = async (req, res) => {
  try {
    const productions = await ProductionRessource.find({ actif: true })
      .populate('niveauId')
      .populate('ressourceId');
    res.json(productions);
  } catch (error) {
    console.error('Erreur lors de la récupération des productions actives:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des productions actives' });
  }
}; 