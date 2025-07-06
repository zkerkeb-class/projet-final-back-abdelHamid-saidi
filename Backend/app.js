const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');
const connectDB = require('./config/database');

// Import des routes
const joueurRoutes = require('./routes/joueurRoutes');
const ressourceRoutes = require('./routes/ressourceRoutes');
const niveauBatimentRoutes = require('./routes/niveauBatimentRoutes');
const ressourceJoueurRoutes = require('./routes/ressourceJoueurRoutes');
const casesTerrainRoutes = require('./routes/casesTerrainRoutes');
const possessionBatimentRoutes = require('./routes/possessionBatimentRoutes');
const productionRessourceRoutes = require('./routes/productionRessourceRoutes');
const besoinRessourceRoutes = require('./routes/besoinRessourceRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques du dossier images
app.use('/images', express.static('images'));

// Charger la doc OpenAPI depuis le fichier YAML
const openapiDocument = yaml.load(fs.readFileSync('./openapi.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API BizTown - Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    docExpansion: 'list',
    filter: true,
    showRequestHeaders: true,
    tryItOutEnabled: true
  }
}));

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API BizTown' });
});

// Routes de l'API
app.use('/api/joueurs', joueurRoutes);
app.use('/api/ressources', ressourceRoutes);
app.use('/api/niveaux-batiments', niveauBatimentRoutes);
app.use('/api/ressources-joueurs', ressourceJoueurRoutes);
app.use('/api/cases-terrain', casesTerrainRoutes);
app.use('/api/possession-batiments', possessionBatimentRoutes);
app.use('/api/production-ressources', productionRessourceRoutes);
app.use('/api/besoins-ressources', besoinRessourceRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('=== ERREUR SERVEUR ===');
  console.error('Type d\'erreur:', err.name);
  console.error('Message d\'erreur:', err.message);
  console.error('Stack trace:', err.stack);
  console.error('=== FIN ERREUR ===');
  
  res.status(500).json({ 
    message: 'Une erreur est survenue sur le serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Port
const PORT = process.env.PORT || 3000;

// Démarrage du serveur
const startServer = async () => {
  try {
    console.log('=== DÉMARRAGE DU SERVEUR ===');
    
    // Connexion à MongoDB
    console.log('Connexion à MongoDB...');
    await connectDB();
    console.log('Connexion à MongoDB établie avec succès.');
    
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
      console.log('=== FIN DÉMARRAGE ===');
    });
  } catch (error) {
    console.error('=== ERREUR DE DÉMARRAGE ===');
    console.error('Type d\'erreur:', error.name);
    console.error('Message d\'erreur:', error.message);
    console.error('Stack trace:', error.stack);
    console.error('=== FIN ERREUR ===');
  }
};

startServer(); 