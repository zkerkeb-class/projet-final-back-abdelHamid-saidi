const BesoinRessource = require('../models/BesoinRessource');

// Récupérer tous les besoins
exports.getAllBesoins = async (req, res) => {
  try {
    const besoins = await BesoinRessource.find({})
      .populate('niveauId')
      .populate('ressourceId')
      .populate('productionRessourceId');
    res.json(besoins);
  } catch (error) {
    console.error('Erreur lors de la récupération des besoins:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des besoins' });
  }
};

// Récupérer un besoin par ID
exports.getBesoinById = async (req, res) => {
  try {
    const besoin = await BesoinRessource.findById(req.params.id)
      .populate('niveauId')
      .populate('ressourceId')
      .populate('productionRessourceId');
    if (!besoin) {
      return res.status(404).json({ message: 'Besoin non trouvé' });
    }
    res.json(besoin);
  } catch (error) {
    console.error('Erreur lors de la récupération du besoin:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du besoin' });
  }
};

// Créer un nouveau besoin
exports.createBesoin = async (req, res) => {
  try {
    const { niveauId, ressourceId, quantite, productionRessourceId } = req.body;
    
    if (!niveauId || !ressourceId || quantite === undefined) {
      return res.status(400).json({ message: 'Niveau, ressource et quantité requis' });
    }

    const besoin = new BesoinRessource({
      niveauId,
      ressourceId,
      quantite,
      productionRessourceId
    });

    await besoin.save();
    res.status(201).json({
      message: 'Besoin créé avec succès',
      besoin
    });
  } catch (error) {
    console.error('Erreur lors de la création du besoin:', error);
    res.status(500).json({ message: 'Erreur lors de la création du besoin' });
  }
};

// Mettre à jour un besoin
exports.updateBesoin = async (req, res) => {
  try {
    const { niveauId, ressourceId, quantite, productionRessourceId } = req.body;
    
    const besoin = await BesoinRessource.findById(req.params.id);
    if (!besoin) {
      return res.status(404).json({ message: 'Besoin non trouvé' });
    }

    if (niveauId) besoin.niveauId = niveauId;
    if (ressourceId) besoin.ressourceId = ressourceId;
    if (quantite !== undefined) besoin.quantite = quantite;
    if (productionRessourceId !== undefined) besoin.productionRessourceId = productionRessourceId;

    await besoin.save();
    res.json({
      message: 'Besoin mis à jour avec succès',
      besoin
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du besoin:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du besoin' });
  }
};

// Supprimer un besoin
exports.deleteBesoin = async (req, res) => {
  try {
    const besoin = await BesoinRessource.findByIdAndDelete(req.params.id);
    if (!besoin) {
      return res.status(404).json({ message: 'Besoin non trouvé' });
    }
    res.json({ message: 'Besoin supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du besoin:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du besoin' });
  }
};

// Récupérer les besoins par niveau
exports.getBesoinsByNiveau = async (req, res) => {
  try {
    const { niveauId } = req.params;
    const besoins = await BesoinRessource.find({ niveauId })
      .populate('niveauId')
      .populate('ressourceId')
      .populate('productionRessourceId');
    res.json(besoins);
  } catch (error) {
    console.error('Erreur lors de la récupération des besoins par niveau:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des besoins par niveau' });
  }
};

// Récupérer les besoins par ressource
exports.getBesoinsByRessource = async (req, res) => {
  try {
    const { ressourceId } = req.params;
    const besoins = await BesoinRessource.find({ ressourceId })
      .populate('niveauId')
      .populate('ressourceId')
      .populate('productionRessourceId');
    res.json(besoins);
  } catch (error) {
    console.error('Erreur lors de la récupération des besoins par ressource:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des besoins par ressource' });
  }
}; 