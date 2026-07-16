/**
 * Image Optimization Script v2
 * Writes optimized versions directly over the original using sharp's buffer approach
 * (avoids EBUSY by reading into memory, then writing back)
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const MAX_DIMENSION = 1600;
const QUALITY = 80;
const SIZE_THRESHOLD = 200 * 1024; // 200 KB

let totalBefore = 0;
let totalAfter = 0;
let processedCount = 0;
let errorCount = 0;

function getAllImages(dir, images = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllImages(fullPath, images);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      const stats = fs.statSync(fullPath);
      if (stats.size > SIZE_THRESHOLD) {
        images.push({ path: fullPath, size: stats.size });
      }
    }
  }
  return images;
}

async function optimizeImage(imgPath, originalSize) {
  try {
    // Read entire file into buffer first (avoids EBUSY lock on Windows)
    const inputBuffer = fs.readFileSync(imgPath);
    
    const metadata = await sharp(inputBuffer).metadata();
    const { width, height } = metadata;

    let resizeOptions = {};
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      if (width >= height) {
        resizeOptions = { width: MAX_DIMENSION, withoutEnlargement: true };
      } else {
        resizeOptions = { height: MAX_DIMENSION, withoutEnlargement: true };
      }
    }

    const ext = path.extname(imgPath).toLowerCase();
    let pipeline = sharp(inputBuffer);

    if (Object.keys(resizeOptions).length > 0) {
      pipeline = pipeline.resize(resizeOptions);
    }

    if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: QUALITY });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
    } else if (ext === '.png') {
      pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
    }

    // Get optimized buffer
    const outputBuffer = await pipeline.toBuffer();
    
    // Only replace if we actually saved space
    if (outputBuffer.length < originalSize) {
      fs.writeFileSync(imgPath, outputBuffer);
      
      const savedKB = Math.round((originalSize - outputBuffer.length) / 1024);
      const reduction = Math.round((1 - outputBuffer.length / originalSize) * 100);
      console.log(`✅ ${path.relative(PUBLIC_DIR, imgPath)}: ${Math.round(originalSize/1024)}KB → ${Math.round(outputBuffer.length/1024)}KB (-${savedKB}KB, -${reduction}%)`);
      
      totalBefore += originalSize;
      totalAfter += outputBuffer.length;
      processedCount++;
    } else {
      console.log(`⏭️  ${path.relative(PUBLIC_DIR, imgPath)}: Already optimal (${Math.round(originalSize/1024)}KB)`);
      totalBefore += originalSize;
      totalAfter += originalSize;
    }
  } catch (err) {
    console.error(`❌ ${path.relative(PUBLIC_DIR, imgPath)}: ${err.message}`);
    errorCount++;
  }
}

async function main() {
  console.log('🔍 Scanning for images > 200KB...\n');
  const images = getAllImages(PUBLIC_DIR);
  console.log(`Found ${images.length} images to optimize.\n`);

  for (const img of images) {
    await optimizeImage(img.path, img.size);
  }

  console.log('\n═══════════════════════════════════════');
  console.log(`✅ Processed: ${processedCount} images`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📦 Before: ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
  console.log(`📦 After:  ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
  console.log(`💾 Saved:  ${((totalBefore - totalAfter) / 1024 / 1024).toFixed(1)} MB (-${Math.round((1 - totalAfter/totalBefore) * 100)}%)`);
  console.log('═══════════════════════════════════════');
}

main().catch(console.error);
