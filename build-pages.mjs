import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import MarkdownIt from 'markdown-it';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const md = new MarkdownIt({ html: true });

// Component list
const components = [
  { name: 'button', title: 'Button' },
  { name: 'icon-button', title: 'Icon Button' },
  { name: 'fab', title: 'FAB' },
  { name: 'toolbar', title: 'Toolbar' },
  { name: 'menu', title: 'Menu' },
  { name: 'checkbox', title: 'Checkbox' },
  { name: 'ripple', title: 'Ripple' },
  { name: 'switch', title: 'Switch' },
  { name: 'text-field', title: 'Text Field' },
  { name: 'tooltip', title: 'Tooltip' },
  { name: 'select', title: 'Select' },
];

// Read template
const template = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf-8');

// Generate index.html
const homeContent = fs.readFileSync(path.join(__dirname, 'content/home.md'), 'utf-8');
let indexContent = md.render(homeContent);

for (const comp of components) {
  const mdContent = fs.readFileSync(path.join(__dirname, `content/${comp.name}.md`), 'utf-8');
  indexContent += md.render(mdContent);
}

const indexHtml = template
  .replace('{{TITLE}}', 'SEE')
  .replace('{{CONTENT}}', indexContent)
  .replace('{{CSS_PATH}}', './main.css')
  .replace('{{SCRIPT_PATH}}', './main.ts');

fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml);

// Generate component pages
for (const comp of components) {
  const dir = path.join(__dirname, 'components', comp.name);
  fs.mkdirSync(dir, { recursive: true });
  
  const mdContent = fs.readFileSync(path.join(__dirname, `content/${comp.name}.md`), 'utf-8');
  const html = template
    .replace('{{TITLE}}', `${comp.title} - SEE`)
    .replace('{{CONTENT}}', md.render(mdContent))
    .replace('{{CSS_PATH}}', '../../main.css')
    .replace('{{SCRIPT_PATH}}', '../../main.ts');
  
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

console.log('✓ Generated HTML pages');
