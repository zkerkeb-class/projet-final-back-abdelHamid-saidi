const mongoose = require('mongoose');
require('dotenv').config();

// Import de tous les modèles pour s'assurer qu'ils sont chargés
const { 
  Joueur, 
  CasesTerrain, 
  PossessionBatiment, 
  NiveauBatiment, 
  Ressource, 
  RessourceJoueur, 
  ProductionRessource, 
  BesoinRessource 
} = require('../models');

const clearDatabase = async () => {
  try {
    console.log('=== DÉBUT DU NETTOYAGE DE LA BASE DE DONNÉES ===');
    
    // Connexion à MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/biztown';
    await mongoose.connect(mongoURI);
    console.log('Connexion à MongoDB établie');

    // Nettoyage de toutes les collections
    console.log('Nettoyage des collections...');
    
    const collections = [
      { name: 'Joueur', model: Joueur },
      { name: 'CasesTerrain', model: CasesTerrain },
      { name: 'PossessionBatiment', model: PossessionBatiment },
      { name: 'NiveauBatiment', model: NiveauBatiment },
      { name: 'Ressource', model: Ressource },
      { name: 'RessourceJoueur', model: RessourceJoueur },
      { name: 'ProductionRessource', model: ProductionRessource },
      { name: 'BesoinRessource', model: BesoinRessource }
    ];

    for (const collection of collections) {
      const result = await collection.model.deleteMany({});
      console.log(`✓ Collection ${collection.name} nettoyée (${result.deletedCount} documents supprimés)`);
    }

    // Nettoyage des collections système si elles existent
    const db = mongoose.connection.db;
    const collectionsList = await db.listCollections().toArray();
    
    // Suppression des collections qui pourraient rester (anciennes collections)
    const collectionsToDrop = collectionsList
      .map(col => col.name)
      .filter(name => !collections.some(c => c.name.toLowerCase() === name.toLowerCase()));

    for (const collectionName of collectionsToDrop) {
      try {
        await db.dropCollection(collectionName);
        console.log(`✓ Collection système ${collectionName} supprimée`);
      } catch (error) {
        console.log(`⚠ Collection ${collectionName} ne peut pas être supprimée (peut-être une collection système)`);
      }
    }

    console.log('=== NETTOYAGE TERMINÉ AVEC SUCCÈS ===');
    console.log('Toutes les données ont été supprimées de la base de données.');
    console.log('Vous pouvez maintenant exécuter le seeding avec: node seeders/seed.js');

  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Connexion à MongoDB fermée');
  }
};

// Exécution du nettoyage
clearDatabase(); 