const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const colors = ['champagne', 'noir', 'sable', 'bleu'];

async function generate() {
  const output = {};
  for (const color of colors) {
    const buffer = await sharp(`public/gifts/hijab-${color}.jpg`)
      .resize(20, 25)
      .blur(2)
      .jpeg({ quality: 40 })
      .toBuffer();
    output[color] = `data:image/jpeg;base64,${buffer.toString('base64')}`;
  }
  fs.writeFileSync('src/data/hijab-blur-placeholders.json', JSON.stringify(output, null, 2), 'utf8');
  console.log('Successfully wrote src/data/hijab-blur-placeholders.json');
}
generate();
