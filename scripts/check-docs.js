const fs = require('fs');
const path = require('path');

const requiredFiles = [
    'docs/ARCHITECTURE.md',
    'docs/DEPLOYMENT.md',
    'docs/RUNBOOK.md',
    'docs/CONTRIBUTING.md',
    'README.md',
    'backend/docs/openapi.yaml',
    'backend/docs/API.md',
    'backend/docs/typedoc/index.html',
    'frontend/docs/typedoc/index.html',
    'frontend/docs/storybook/index.html'
];

console.log('Verifying documentation artifacts...');

let missing = [];

requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) {
        console.error(`❌ Missing: ${file}`);
        missing.push(file);
    } else {
        console.log(`✅ Found: ${file}`);
    }
});

if (missing.length > 0) {
    console.error(`\nverification failed. ${missing.length} files missing.`);
    process.exit(1);
} else {
    console.log('\nAll documentation artifacts found!');
}
