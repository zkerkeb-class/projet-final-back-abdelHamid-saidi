# 🖼️ Guide d'accès aux images - API BizTown

## 📁 Structure des images

Les images sont organisées dans le dossier `Backend/images/` avec la structure suivante :

```
Backend/images/
├── batiments/
│   ├── bureau/
│   │   └── 1.png
│   ├── usine/
│   │   └── 1.png
│   ├── Epicerie/
│   │   ├── 1.png
│   │   └── 2.png
│   └── centrale/
│       └── 1.png
├── menu/
│   ├── carte.png
│   ├── resources.png
│   └── batiments.png
└── ressources/
    ├── electricite.png
    ├── acier.png
    ├── bois.png
    ├── ordinateur.png
    ├── telephone.png
    └── reputation.png
```

## 🌐 Accès aux images

### Configuration serveur
Le serveur Express est configuré pour servir les fichiers statiques du dossier `images` :

```javascript
// Dans app.js
app.use('/images', express.static('images'));
```

### URLs d'accès

#### Images des bâtiments
- Bureau : `http://localhost:3000/images/batiments/bureau/1.png`
- Usine : `http://localhost:3000/images/batiments/usine/1.png`
- Épicerie : `http://localhost:3000/images/batiments/Epicerie/1.png`
- Centrale : `http://localhost:3000/images/batiments/centrale/1.png`

#### Images du menu (sidebar)
- Carte : `http://localhost:3000/images/menu/carte.png`
- Ressources : `http://localhost:3000/images/menu/resources.png`
- Bâtiments : `http://localhost:3000/images/menu/batiments.png`

#### Images des ressources
- Électricité : `http://localhost:3000/images/ressources/electricite.png`
- Acier : `http://localhost:3000/images/ressources/acier.png`
- Bois : `http://localhost:3000/images/ressources/bois.png`
- Ordinateur : `http://localhost:3000/images/ressources/ordinateur.png`
- Téléphone : `http://localhost:3000/images/ressources/telephone.png`
- Réputation : `http://localhost:3000/images/ressources/reputation.png`

## 🔄 Récupération depuis l'API

### Bâtiments
```javascript
// Récupérer tous les niveaux de bâtiments
const batiments = await fetch('http://localhost:3000/api/niveaux-batiments');
const data = await batiments.json();

// Chaque bâtiment contient un champ 'image' avec le chemin
data.forEach(batiment => {
  const imageUrl = `http://localhost:3000${batiment.image}`;
  console.log(`${batiment.nom}: ${imageUrl}`);
});
```

### Ressources
```javascript
// Récupérer toutes les ressources
const ressources = await fetch('http://localhost:3000/api/ressources');
const data = await ressources.json();

// Chaque ressource contient un champ 'image' avec le chemin
data.forEach(ressource => {
  const imageUrl = `http://localhost:3000${ressource.image}`;
  console.log(`${ressource.nom}: ${imageUrl}`);
});
```

## 🎯 Utilisation dans le frontend

### React/TypeScript
```typescript
import { batimentService, ressourceService, menuService } from '../services/api';

// Récupérer les bâtiments
const batiments = await batimentService.getAllNiveauxBatiments();
const imageUrl = `http://localhost:3000${batiment.image}`;

// Récupérer les ressources
const ressources = await ressourceService.getAllRessources();
const imageUrl = `http://localhost:3000${ressource.image}`;

// Récupérer les images du menu
const menuImages = menuService.getMenuImages();
const carteImage = menuImages.carte;
```

### Affichage d'image
```jsx
<img 
  src={`http://localhost:3000${batiment.image}`}
  alt={batiment.nom}
  onError={(e) => {
    // Image par défaut en cas d'erreur
    e.currentTarget.src = 'http://localhost:3000/images/batiments/bureau/1.png';
  }}
/>
```

### Sidebar avec images
```jsx
const sidebarItems = [
  { 
    icon: 'http://localhost:3000/images/menu/carte.png', 
    label: 'Carte',
    type: 'image'
  },
  { 
    icon: 'http://localhost:3000/images/menu/resources.png', 
    label: 'Ressources',
    type: 'image'
  },
  { 
    icon: 'http://localhost:3000/images/menu/batiments.png', 
    label: 'Bâtiments',
    type: 'image'
  },
];
```

## 📝 Notes importantes

1. **Redémarrage du serveur** : Après avoir ajouté de nouvelles images, redémarrez le serveur backend
2. **Chemins relatifs** : Les chemins dans la base de données sont relatifs (ex: `/images/batiments/bureau/1.png`)
3. **URLs complètes** : Pour l'affichage, ajoutez l'URL de base du serveur
4. **Gestion d'erreurs** : Toujours prévoir une image par défaut en cas d'erreur de chargement
5. **Images du menu** : Les images du menu sont servies directement depuis le dossier `images/menu/`

## 🚀 Ajout de nouvelles images

1. Placez vos images dans le dossier approprié (`batiments/`, `ressources/` ou `menu/`)
2. Mettez à jour la base de données avec les nouveaux chemins (pour les bâtiments et ressources)
3. Redémarrez le serveur backend
4. Testez l'accès via l'URL complète 