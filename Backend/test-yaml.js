const yaml = require('js-yaml');
const fs = require('fs');

try {
  console.log('Test de syntaxe du fichier openapi.yaml...');
  const doc = yaml.load(fs.readFileSync('./openapi.yaml', 'utf8'));
  console.log('✅ Fichier openapi.yaml valide !');
  console.log('Version OpenAPI:', doc.openapi);
  console.log('Titre:', doc.info.title);
  console.log('Nombre de routes:', Object.keys(doc.paths).length);
} catch (e) {
  console.log('❌ Erreur dans openapi.yaml:', e.message);
  process.exit(1);
} 