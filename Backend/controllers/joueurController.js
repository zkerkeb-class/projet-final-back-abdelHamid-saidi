const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joueur = require('../models/Joueur');

exports.inscription = async (req, res) => {
  try {
    console.log('Tentative d\'inscription avec:', { pseudo: req.body.pseudo, email: req.body.email });
    
    const { pseudo, email, motDePasse } = req.body;
    
    if (!pseudo || !email || !motDePasse) {
      console.log('Données manquantes:', { pseudo: !!pseudo, email: !!email, motDePasse: !!motDePasse });
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
    }

    const joueurExistant = await Joueur.findOne({ email });
    if (joueurExistant) {
      console.log('Email déjà utilisé:', email);
      return res.status(400).json({ message: 'Email déjà utilisé.' });
    }

    console.log('Création du hash du mot de passe');
    const hash = await bcrypt.hash(motDePasse, 10);
    
    console.log('Création du nouveau joueur');
    const joueur = new Joueur({ 
      pseudo, 
      email, 
      motDePasseHash: hash,
      patrimoine: 1000,
      classement: 0
    });

    await joueur.save();

    console.log('Joueur créé avec succès:', { id: joueur._id, pseudo: joueur.pseudo });
    const token = jwt.sign(
      { id: joueur._id, email: joueur.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'Inscription réussie',
      token,
      joueur: { 
        id: joueur._id, 
        pseudo: joueur.pseudo, 
        email: joueur.email,
        patrimoine: joueur.patrimoine,
        classement: joueur.classement
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ 
      message: 'Erreur serveur lors de l\'inscription',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.connexion = async (req, res) => {
  try {
    console.log('=== DÉBUT TENTATIVE DE CONNEXION ===');
    console.log('Corps de la requête:', req.body);
    
    const { email, motDePasse } = req.body;
    
    if (!email || !motDePasse) {
      console.log('Données manquantes:', { email: !!email, motDePasse: !!motDePasse });
      return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    console.log('Recherche du joueur dans la base de données...');
    const joueur = await Joueur.findOne({ email });
    console.log('Résultat de la recherche:', joueur ? 'Joueur trouvé' : 'Joueur non trouvé');
    
    if (!joueur) {
      console.log('Joueur non trouvé pour l\'email:', email);
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    console.log('Joueur trouvé, vérification du mot de passe');
    console.log('Hash stocké:', joueur.motDePasseHash);
    const valide = await bcrypt.compare(motDePasse, joueur.motDePasseHash);
    console.log('Résultat de la comparaison:', valide ? 'Mot de passe valide' : 'Mot de passe invalide');
    
    if (!valide) {
      console.log('Mot de passe incorrect pour l\'email:', email);
      return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
    }

    console.log('Connexion réussie pour:', email);
    const token = jwt.sign(
      { id: joueur._id, email: joueur.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    const response = {
      message: 'Connexion réussie',
      token,
      joueur: { 
        id: joueur._id, 
        pseudo: joueur.pseudo, 
        email: joueur.email,
        patrimoine: joueur.patrimoine,
        classement: joueur.classement
      }
    };
    console.log('Réponse envoyée:', response);
    console.log('=== FIN TENTATIVE DE CONNEXION ===');
    
    res.json(response);
  } catch (error) {
    console.error('=== ERREUR LORS DE LA CONNEXION ===');
    console.error('Type d\'erreur:', error.name);
    console.error('Message d\'erreur:', error.message);
    console.error('Stack trace:', error.stack);
    console.error('=== FIN ERREUR ===');
    
    res.status(500).json({ 
      message: 'Erreur serveur lors de la connexion',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.getProfil = async (req, res) => {
  try {
    const joueur = await Joueur.findById(req.user.id).select('-motDePasseHash');
    
    if (!joueur) {
      return res.status(404).json({ message: 'Joueur non trouvé' });
    }

    res.json(joueur);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  }
};

exports.updateProfil = async (req, res) => {
  try {
    const { pseudo, email } = req.body;
    const joueur = await Joueur.findById(req.user.id);

    if (!joueur) {
      return res.status(404).json({ message: 'Joueur non trouvé' });
    }

    // Vérifier si le pseudo est déjà utilisé
    if (pseudo && pseudo !== joueur.pseudo) {
      const existingJoueur = await Joueur.findOne({ pseudo });
      if (existingJoueur) {
        return res.status(400).json({ message: 'Ce pseudo est déjà utilisé' });
      }
    }

    // Vérifier si l'email est déjà utilisé
    if (email && email !== joueur.email) {
      const existingJoueur = await Joueur.findOne({ email });
      if (existingJoueur) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }
    }

    // Mettre à jour le profil
    joueur.pseudo = pseudo || joueur.pseudo;
    joueur.email = email || joueur.email;
    await joueur.save();

    res.json({
      message: 'Profil mis à jour avec succès',
      joueur: {
        id: joueur._id,
        pseudo: joueur.pseudo,
        email: joueur.email,
        patrimoine: joueur.patrimoine,
        classement: joueur.classement
      }
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
  }
};

exports.getClassement = async (req, res) => {
  try {
    const joueurs = await Joueur.find({}, 'pseudo patrimoine classement')
      .sort({ patrimoine: -1 })
      .limit(10);

    res.json(joueurs);
  } catch (error) {
    console.error('Erreur lors de la récupération du classement:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du classement' });
  }
};

exports.getAllJoueurs = async () => {
  try {
    return await Joueur.find({}, 'pseudo email patrimoine classement');
  } catch (error) {
    console.error('Erreur lors de la récupération des joueurs:', error);
    throw error;
  }
}; 