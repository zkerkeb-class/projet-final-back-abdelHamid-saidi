const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import des modèles
const Joueur = require('../models/Joueur');
const Ressource = require('../models/Ressource');
const NiveauBatiment = require('../models/NiveauBatiment');
const RessourceJoueur = require('../models/RessourceJoueur');
const CasesTerrain = require('../models/CasesTerrain');
const PossessionBatiment = require('../models/PossessionBatiment');
const ProductionRessource = require('../models/ProductionRessource');
const BesoinRessource = require('../models/BesoinRessource');

const seedData = async () => {
  try {
    console.log('=== DÉBUT DU SEEDING ===');
    
    // Connexion à MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/biztown';
    await mongoose.connect(mongoURI);
    console.log('Connexion à MongoDB établie');

    // Nettoyage complet de toutes les collections
    console.log('🧹 Nettoyage de la base de données...');
    await Joueur.deleteMany({});
    await Ressource.deleteMany({});
    await NiveauBatiment.deleteMany({});
    await RessourceJoueur.deleteMany({});
    await CasesTerrain.deleteMany({});
    await PossessionBatiment.deleteMany({});
    await ProductionRessource.deleteMany({});
    await BesoinRessource.deleteMany({});
    console.log('✅ Base de données nettoyée');

    // Création de plusieurs joueurs
    const hash1 = await bcrypt.hash('password123', 10);
    const hash2 = await bcrypt.hash('azerty', 10);
    const hash3 = await bcrypt.hash('testpass', 10);
    const joueurs = await Joueur.insertMany([
      {
        pseudo: 'Hamid',
        email: 'hamid@biztown.com',
        motDePasseHash: hash1,
        patrimoine: 10000,
        classement: 1,
        niveauActuel: 1,
        experience: 0
      },
      {
        pseudo: 'Alice',
        email: 'alice@biztown.com',
        motDePasseHash: hash2,
        patrimoine: 8000,
        classement: 2,
        niveauActuel: 1,
        experience: 0
      },
      {
        pseudo: 'Bob',
        email: 'bob@biztown.com',
        motDePasseHash: hash3,
        patrimoine: 5000,
        classement: 3,
        niveauActuel: 1,
        experience: 0
      }
    ]);
    console.log(`${joueurs.length} joueurs créés`);

    // Création des ressources
    const ressources = [
      { 
        type: 'Énergie', 
        nom: 'Électricité', 
        image: '/images/ressources/electricite.png',
        prixAchat: 0.5,
        prixVente: 0.4,
        description: 'Énergie électrique pour alimenter les bâtiments'
      },
      { 
        type: 'Matériaux', 
        nom: 'Acier', 
        image: '/images/ressources/acier.png',
        prixAchat: 2.0,
        prixVente: 1.8,
        description: 'Matériau de construction robuste'
      },
      { 
        type: 'Matériaux', 
        nom: 'Bois', 
        image: '/images/ressources/bois.png',
        prixAchat: 1.5,
        prixVente: 1.3,
        description: 'Matériau de construction naturel'
      },
      { 
        type: 'Produits', 
        nom: 'Ordinateur', 
        image: '/images/ressources/ordinateur.png',
        prixAchat: 100.0,
        prixVente: 90.0,
        description: 'Produit technologique de haute valeur'
      },
      { 
        type: 'Produits', 
        nom: 'Téléphone', 
        image: '/images/ressources/telephone.png',
        prixAchat: 50.0,
        prixVente: 45.0,
        description: 'Produit technologique portable'
      },
      { 
        type: 'Influence', 
        nom: 'Réputation', 
        image: '/images/ressources/reputation.png',
        prixAchat: 10.0,
        prixVente: 9.0,
        description: 'Capital réputation de l\'entreprise'
      }
    ];
    const ressourcesCreees = await Ressource.insertMany(ressources);
    console.log(`${ressourcesCreees.length} ressources créées`);

    // Création de plusieurs niveaux de bâtiments
    const niveauxBatiments = [
      {
        nom: 'Bureau',
        niveau: 1,
        image: '/images/batiments/bureau/1.png',
        description: 'Bureau de base pour la gestion',
        coutBase: 1000,
        coutAmelioration: 500,
        ressourcesAmelioration: [
          { ressourceId: ressourcesCreees[0]._id, quantite: 10 },
          { ressourceId: ressourcesCreees[1]._id, quantite: 5 }
        ]
      },
      {
        nom: 'Usine',
        niveau: 1,
        image: '/images/batiments/usine/1.png',
        description: 'Usine de production basique',
        coutBase: 2000,
        coutAmelioration: 800,
        ressourcesAmelioration: [
          { ressourceId: ressourcesCreees[0]._id, quantite: 15 },
          { ressourceId: ressourcesCreees[1]._id, quantite: 8 }
        ]
      },
      {
        nom: 'Épicerie',
        niveau: 1,
        image: '/images/batiments/Epicerie/1.png',
        description: 'Épicerie de base pour le commerce',
        coutBase: 1500,
        coutAmelioration: 600,
        ressourcesAmelioration: [
          { ressourceId: ressourcesCreees[0]._id, quantite: 8 },
          { ressourceId: ressourcesCreees[2]._id, quantite: 10 }
        ]
      },
      {
        nom: 'Épicerie',
        niveau: 2,
        image: '/images/batiments/Epicerie/2.png',
        description: 'Épicerie améliorée pour le commerce',
        coutAmelioration: 600,
        ressourcesAmelioration: [
          { ressourceId: ressourcesCreees[0]._id, quantite: 8 },
          { ressourceId: ressourcesCreees[2]._id, quantite: 10 }
        ]
      },
      {
        nom: 'Centrale',
        niveau: 1,
        image: '/images/batiments/centrale/1.png',
        description: 'Centrale électrique',
        coutBase: 2500,
        coutAmelioration: 1000,
        ressourcesAmelioration: [
          { ressourceId: ressourcesCreees[0]._id, quantite: 12 },
          { ressourceId: ressourcesCreees[2]._id, quantite: 15 }
        ]
      }
    ];
    const niveauxBatimentsCrees = await NiveauBatiment.insertMany(niveauxBatiments);
    console.log(`${niveauxBatimentsCrees.length} niveaux de bâtiments créés`);

    // Création des ressources initiales pour chaque joueur
    let ressourcesJoueur = [];
    for (const joueur of joueurs) {
      ressourcesJoueur = ressourcesJoueur.concat(
        ressourcesCreees.map(ressource => ({
          joueurId: joueur._id,
          ressourceId: ressource._id,
          quantite: ressource.type === 'Énergie' ? 100 : 
                    ressource.type === 'Matériaux' ? 50 : 
                    ressource.type === 'Produits' ? 5 : 10
        }))
      );
    }
    await RessourceJoueur.insertMany(ressourcesJoueur);
    console.log('Ressources initiales des joueurs créées');

    // Création de cases de terrain pour chaque joueur
    let cases = [];
    for (let i = 0; i < joueurs.length; i++) {
      cases.push({ pos_x: 1, pos_y: 1 + i, joueurId: joueurs[i]._id });
      cases.push({ pos_x: 2, pos_y: 1 + i, joueurId: joueurs[i]._id });
    }
    const casesCreees = await CasesTerrain.insertMany(cases);
    console.log(`${casesCreees.length} cases de terrain créées`);

    // Création de possessions de bâtiments pour chaque joueur
    let possessions = [];
    for (let i = 0; i < joueurs.length; i++) {
      possessions.push({
        pos_x: 1,
        pos_y: 1 + i,
        niveauId: niveauxBatimentsCrees[i % niveauxBatimentsCrees.length]._id,
        joueurId: joueurs[i]._id
      });
    }
    const possessionsCreees = await PossessionBatiment.insertMany(possessions);
    console.log(`${possessionsCreees.length} possessions de bâtiments créées`);

    // Création de productions de ressources
    const productions = [
      {
        niveauId: niveauxBatimentsCrees[0]._id,
        ressourceId: ressourcesCreees[0]._id,
        quantite: 10,
        frequence: 1,
        actif: true
      },
      {
        niveauId: niveauxBatimentsCrees[1]._id,
        ressourceId: ressourcesCreees[1]._id,
        quantite: 5,
        frequence: 2,
        actif: true
      }
    ];
    const productionsCreees = await ProductionRessource.insertMany(productions);
    console.log(`${productionsCreees.length} productions de ressources créées`);

    // Création de besoins en ressources
    const besoins = [
      {
        niveauId: niveauxBatimentsCrees[0]._id,
        ressourceId: ressourcesCreees[1]._id,
        quantite: 3,
        productionRessourceId: productionsCreees[0]._id
      },
      {
        niveauId: niveauxBatimentsCrees[1]._id,
        ressourceId: ressourcesCreees[2]._id,
        quantite: 2,
        productionRessourceId: productionsCreees[1]._id
      }
    ];
    const besoinsCreees = await BesoinRessource.insertMany(besoins);
    console.log(`${besoinsCreees.length} besoins en ressources créés`);

    console.log('=== SEEDING TERMINÉ AVEC SUCCÈS ===');
    console.log('Données créées :');
    console.log(`- ${joueurs.length} joueurs`);
    console.log(`- ${ressourcesCreees.length} ressources`);
    console.log(`- ${niveauxBatimentsCrees.length} niveaux de bâtiments`);
    console.log(`- ${ressourcesJoueur.length} ressources initiales pour les joueurs`);
    console.log(`- ${casesCreees.length} cases de terrain`);
    console.log(`- ${possessionsCreees.length} possessions de bâtiments`);
    console.log(`- ${productionsCreees.length} productions de ressources`);
    console.log(`- ${besoinsCreees.length} besoins en ressources`);
    console.log('');
    console.log('Comptes de test :');
    joueurs.forEach(j => console.log(`Email: ${j.email} | Mot de passe: password123/azerty/testpass`));

  } catch (error) {
    console.error('Erreur lors du seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Connexion à MongoDB fermée');
  }
};

// Exécution du seeding
seedData(); 