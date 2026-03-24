import fs from 'fs';

const content = fs.readFileSync('src/App.tsx', 'utf-8');
const idRegex = /id:\s*'([^']+)'/g;
const ids = [];
let match;
while ((match = idRegex.exec(content)) !== null) {
  ids.push(match[1]);
}

const duplicates = ids.filter((item, index) => ids.indexOf(item) !== index);
console.log("Duplicates:", duplicates);
