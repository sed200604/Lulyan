const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const colors = ['champagne', 'noir', 'sable', 'bleu'];
const inputDir = 'public/gifts';
const outputDir = 'public/gifts';

async function optimize() {
  for (const color of colors) {
    const input = path.join(inputDir, `hijab-${color}.jpg`);
    if (!fs.existsSync(input)) {
      console.warn(`Missing: ${input}`);
      continue;
    }
    const output = path.join(outputDir, `hijab-${color}.optimized.jpg`);
    await sharp(input)
      .resize(1200, 1500, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(output);
  }

  // Now rename
  for (const color of colors) {
    const input = path.join(inputDir, `hijab-${color}.jpg`);
    const output = path.join(outputDir, `hijab-${color}.optimized.jpg`);
    if (fs.existsSync(output)) {
      fs.unlinkSync(input);
      fs.renameSync(output, input);
      const stats = fs.statSync(input);
      console.log(`${color}: ${(stats.size / 1024).toFixed(0)} KB`);
    }
  }
}
optimize();
