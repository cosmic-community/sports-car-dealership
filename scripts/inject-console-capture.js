const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes('dashboard-console-capture.js')) {
    console.log(`✓ Script already present in ${filePath}`);
    return;
  }
  
  const headCloseIndex = content.indexOf('</head>');
  if (headCloseIndex === -1) {
    console.log(`✗ No </head> tag found in ${filePath}`);
    return;
  }
  
  const newContent = 
    content.slice(0, headCloseIndex) +
    `  ${scriptTag}\n` +
    content.slice(headCloseIndex);
  
  fs.writeFileSync(filePath, newContent);
  console.log(`✓ Script injected into ${filePath}`);
}

const outputDir = path.join(__dirname, '..', '.next', 'server', 'app');

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name.endsWith('.html')) {
      injectScript(fullPath);
    }
  }
}

console.log('Injecting console capture script...');
processDirectory(outputDir);
console.log('Done!');