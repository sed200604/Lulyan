const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('src/data/products.ts', 'utf8');

// Basic regex to find each product object
const productRegex = /{[\s\S]*?id: '(.*?)'[\s\S]*?name: '(.*?)'[\s\S]*?images: \[\s*([\s\S]*?)\s*\]/g;
let match;
const products = [];

while ((match = productRegex.exec(content)) !== null) {
  const id = match[1];
  const name = match[2];
  const imagesBlock = match[3];
  
  // Try to find the folder from the first image src
  const srcMatch = imagesBlock.match(/src: '(.*?)'/);
  let folder = '';
  if (srcMatch) {
    const parts = srcMatch[1].split('/');
    if (parts.length >= 4) {
      folder = parts[3]; // e.g., product-6
    }
  }
  
  products.push({ id, name, folder, fullMatch: match[0], imagesBlock });
}

console.log(`Found ${products.length} products in products.ts`);

const publicDir = path.join(__dirname, 'public/images/products');
const existingFolders = fs.readdirSync(publicDir).filter(f => fs.statSync(path.join(publicDir, f)).isDirectory());

console.log('Existing folders in public/images/products:', existingFolders);

products.forEach(p => {
  console.log(`\nProduct: ${p.name} (ID: ${p.id})`);
  console.log(`Referenced folder: ${p.folder}`);
  
  // Check if folder exists
  let folderExists = false;
  let targetFolder = p.folder;
  
  if (existingFolders.includes(p.folder)) {
    folderExists = true;
  } else {
    // Case insensitive check
    const caseMatch = existingFolders.find(f => f.toLowerCase() === p.folder.toLowerCase());
    if (caseMatch) {
      console.log(`Folder exists with different case: ${caseMatch}`);
      targetFolder = caseMatch;
      folderExists = true;
    } else {
       // check with or without space, e.g. Produit -8 vs product-8
       const relaxedMatch = existingFolders.find(f => f.toLowerCase().replace(/\\s+/g, '').replace('produit', 'product') === p.folder.toLowerCase().replace(/\\s+/g, '').replace('produit', 'product'));
       if(relaxedMatch) {
           console.log(`Folder exists with different name: ${relaxedMatch}`);
           targetFolder = relaxedMatch;
           folderExists = true;
       }
    }
  }
  
  if (!folderExists) {
    console.log(`❌ Folder ${p.folder} DOES NOT EXIST!`);
  } else {
    const files = fs.readdirSync(path.join(publicDir, targetFolder)).filter(f => f.match(/\\.(png|jpe?g|webp)$/i));
    console.log(`✅ Folder ${targetFolder} has ${files.length} images:`, files);
  }
});
