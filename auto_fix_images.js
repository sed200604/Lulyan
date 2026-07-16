const fs = require('fs');
const path = require('path');

let content = fs.readFileSync('src/data/products.ts', 'utf8');
const publicDir = path.join(__dirname, 'public/images/products');
const existingFolders = fs.readdirSync(publicDir).filter(f => fs.statSync(path.join(publicDir, f)).isDirectory());

const productRegex = /({\s*id: '(LR-\d+)'[\s\S]*?images:\s*\[)([\s\S]*?)(\]\s*,)/g;

const alts = ['Face', 'Dos', 'Profil', 'Detail', 'Lifestyle', 'Vue 6'];

content = content.replace(productRegex, (fullMatch, beforeImages, id, oldImagesBlock, afterImages) => {
  // Extract folder from old images
  const srcMatch = oldImagesBlock.match(/src: '(.*?)'/);
  if (!srcMatch) return fullMatch;
  
  let folder = srcMatch[1].split('/')[3];
  
  let targetFolder = folder;
  if (!existingFolders.includes(folder)) {
    const relaxedMatch = existingFolders.find(f => f.toLowerCase().replace(/\s+/g, '').replace('produit', 'product') === folder.toLowerCase().replace(/\s+/g, '').replace('produit', 'product'));
    if (relaxedMatch) {
      targetFolder = relaxedMatch;
    } else {
      console.log(`Could not find folder for ${id}, original folder: ${folder}`);
      return fullMatch;
    }
  }

  const files = fs.readdirSync(path.join(publicDir, targetFolder)).filter(f => /\.(png|jpe?g|webp)$/i.test(f));
  if (files.length === 0) {
    console.log(`No images found in ${targetFolder} for ${id}`);
    return fullMatch; // don't change if no files
  }

  // Generate new images array content
  let newImagesBlock = '\n';
  files.forEach((file, index) => {
    const alt = alts[index % alts.length];
    newImagesBlock += `      { src: '/images/products/${targetFolder}/${file}', alt: '${alt}' },\n`;
  });
  newImagesBlock += '    ';

  return beforeImages + newImagesBlock + afterImages;
});

fs.writeFileSync('src/data/products.ts', content, 'utf8');
console.log('Successfully updated products.ts with actual image paths.');
