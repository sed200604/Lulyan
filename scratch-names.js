const fs = require('fs');
const path = require('path');
const file = fs.readFileSync(path.join(__dirname, 'src/data/products.ts'), 'utf8');
const names = [...file.matchAll(/name:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log(names);
