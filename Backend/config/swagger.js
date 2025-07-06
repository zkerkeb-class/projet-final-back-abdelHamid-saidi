const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API BizTown',
      version: '1.0.0',
      description: 'API pour le jeu BizTown - Gestion des joueurs et de la ville',
      contact: {
        name: 'Équipe BizTown',
        email: 'contact@biztown.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      },
      {
        url: 'https://api.biztown.com',
        description: 'Serveur de production'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token pour l\'authentification'
        }
      },
      schemas: {
        Joueur: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID unique du joueur'
            },
            nom: {
              type: 'string',
              description: 'Nom du joueur'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email du joueur'
            },
            motDePasse: {
              type: 'string',
              description: 'Mot de passe (non retourné dans les réponses)'
            },
            niveau: {
              type: 'number',
              description: 'Niveau actuel du joueur'
            },
            experience: {
              type: 'number',
              description: 'Expérience actuelle du joueur'
            },
            ressources: {
              type: 'object',
              description: 'Ressources du joueur'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date de création du compte'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date de dernière modification'
            }
          }
        },
        InscriptionRequest: {
          type: 'object',
          required: ['nom', 'email', 'motDePasse'],
          properties: {
            nom: {
              type: 'string',
              description: 'Nom du joueur',
              minLength: 2,
              maxLength: 50
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email du joueur'
            },
            motDePasse: {
              type: 'string',
              description: 'Mot de passe',
              minLength: 6
            }
          }
        },
        ConnexionRequest: {
          type: 'object',
          required: ['email', 'motDePasse'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email du joueur'
            },
            motDePasse: {
              type: 'string',
              description: 'Mot de passe'
            }
          }
        },
        ConnexionResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Message de succès'
            },
            token: {
              type: 'string',
              description: 'JWT token pour l\'authentification'
            },
            joueur: {
              $ref: '#/components/schemas/Joueur'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Message d\'erreur'
            },
            error: {
              type: 'string',
              description: 'Détails de l\'erreur (en développement uniquement)'
            }
          }
        }
      }
    }
  },
  apis: [
    './routes/*.js',
    './controllers/*.js',
    './app.js'
  ]
};

const specs = swaggerJsdoc(options);

module.exports = specs; 