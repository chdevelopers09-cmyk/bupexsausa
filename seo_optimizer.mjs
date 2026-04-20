import fs from 'fs';
import path from 'path';

const publicDir = 'app-build/app/(public)';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function processDirectory(dir, name) {
  const pagePath = path.join(dir, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Skip if it already has metadata
    if (!content.includes('export const metadata') && name !== '(public)') {
      const pageTitle = name.split('-').map(capitalizeFirstLetter).join(' ');
      const metadata = `\nimport { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  title: '${pageTitle} | BUPEXSA USA',\n  description: 'Explore the ${pageTitle} page of BUPEXSA USA, the official alumni association for PCSS Buea.',\n};\n\n`;
      
      const lines = content.split('\n');
      let newLines = [];
      let importsDone = false;
      let inserted = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('import ') && !importsDone) {
          // Keep buffering imports
          newLines.push(line);
        } else if (line.trim() === '' && !importsDone && newLines.length > 0) {
          // Keep buffering empty lines directly after imports
          newLines.push(line);
        } else {
          // Reached end of imports
          if (!inserted && !importsDone) {
             const cleanedImportLines = newLines.filter(l => l.trim() !== '');
             newLines = [...cleanedImportLines, metadata, line];
             inserted = true;
          } else {
             newLines.push(line);
          }
          importsDone = true;
        }
      }
      
      let finalContent = newLines.join('\n');
      
      // Ensure we have revalidation for speed
      if (!finalContent.includes('export const revalidate')) {
          finalContent = `export const revalidate = 86400; // Cache for 24 hours\n\n` + finalContent;
      }
      
      fs.writeFileSync(pagePath, finalContent);
      console.log(`Optimized SEO & Speed for: ${pagePath}`);
    } else if (name === '(public)' && !content.includes('export const revalidate')) {
        let finalContent = `export const revalidate = 86400; // Cache for 24 hours\n\n` + content;
        fs.writeFileSync(pagePath, finalContent);
        console.log(`Optimized Speed caching for Home Page`);
    }
  }

  const items = fs.readdirSync(dir);
  for (const item of items) {
    const itemPath = path.join(dir, item);
    if (fs.statSync(itemPath).isDirectory() && !item.startsWith('[')) {
      processDirectory(itemPath, item);
    }
  }
}

processDirectory(publicDir, '(public)');
