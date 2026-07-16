const fs = require('fs');
const path = require('path');
const file = fs.readFileSync(path.join(__dirname, 'src/data/products.ts'), 'utf8');
const lines = file.split('\n');
const startLine = lines.findIndex(line => line.includes('Azur Blanc'));
console.log('Start line:', startLine + 1);
