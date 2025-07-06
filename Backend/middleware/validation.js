exports.validateAuth = (req, res, next) => {
  try {
    const { email, motDePasse } = req.body;

    // Validation de l'email
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Email invalide' });
    }

    // Validation du mot de passe
    if (!motDePasse || motDePasse.length < 6) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères' });
    }

    // Validation du pseudo pour l'inscription
    if (req.path === '/inscription') {
      const { pseudo } = req.body;
      if (!pseudo || pseudo.length < 3) {
        return res.status(400).json({ message: 'Le pseudo doit contenir au moins 3 caractères' });
      }
    }

    next();
  } catch (error) {
    console.error('Erreur de validation:', error);
    res.status(500).json({ message: 'Erreur lors de la validation des données' });
  }
}; 