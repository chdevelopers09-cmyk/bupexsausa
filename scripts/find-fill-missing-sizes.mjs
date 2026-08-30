import fs from 'fs';
import path from 'path';

const root = process.cwd();
const exts = ['.tsx', '.jsx'];
let results = [];

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (exts.includes(path.extname(full))) {
      const text = fs.readFileSync(full, 'utf8');
      const regex = /<Image[\s\S]*?>/g;
      let m;
      while ((m = regex.exec(text)) !== null) {
        const tag = m[0];
        if (/\bfill\b/.test(tag) && !/\bsizes\s*=/.test(tag)) {
          // get line number
          const before = text.slice(0, m.index);
          const line = before.split('\n').length;
          results.push({ file: path.relative(root, full), line, tag: tag.replace(/\n/g, ' ') });
        }
      }
    }
  }
}

walk(root);
console.log(JSON.stringify(results, null, 2));
