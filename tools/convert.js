/**
 * ============================================================================
 * DOCX to Markdown Converter
 * ============================================================================
 * 
 * DESCRIPTION:
 *   This tool automatically batch-converts Microsoft Word documents (.docx)
 *   located in the root 'INPUT/' directory into clean GitHub Flavored Markdown 
 *   (.md) files, also saved directly inside 'INPUT/'.
 * 
 *   After conversion:
 *   - Converted Markdown files (.md) and extracted images stay in 'INPUT/'.
 *   - All non-Markdown files (the original .docx documents and any other 
 *     non-.md files) are moved to the root 'RAW/' directory for archiving.
 * 
 * DIRECTORY STRUCTURE:
 *   qa/
 *   ├── INPUT/                 <- Converted .md files and images stay here
 *   │   ├── images/            <- Extracted images from DOCX files
 *   │   └── document.md
 *   ├── RAW/                   <- Original .docx and other non-.md files moved here
 *   │   └── document.docx
 *   ├── tools/
 *   │   └── convert.js         <- This tool
 *   └── package.json
 * 
 * PREREQUISITES:
 *   Node.js (v16+) installed.
 *   Dependencies installed via:
 *     npm install
 * 
 * USAGE:
 *   Run directly using Node.js:
 *     node tools/convert.js
 * 
 *   Or using npm script:
 *     npm run convert
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const TurndownService = require('turndown');
const { gfm } = require('turndown-plugin-gfm');

// Base directory paths (relative to project root)
const PROJECT_ROOT = path.resolve(__dirname, '..');
const INPUT_DIR = path.join(PROJECT_ROOT, 'INPUT');
const RAW_DIR = path.join(INPUT_DIR, 'RAW');
const IMAGES_DIR = path.join(INPUT_DIR, 'images');

// Initialize Turndown service with GFM support (tables, task lists, strikethrough)
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});
turndownService.use(gfm);

/**
 * Moves a file from source to target directory safely.
 * @param {string} sourcePath - Absolute path of source file
 * @param {string} targetDir - Destination directory
 */
function moveFileToDir(sourcePath, targetDir) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const fileName = path.basename(sourcePath);
  const destPath = path.join(targetDir, fileName);

  try {
    fs.renameSync(sourcePath, destPath);
    console.log(`[Archived] Moved non-md file to RAW/: ${fileName}`);
  } catch (err) {
    // Fallback for cross-device or permission edge cases
    fs.copyFileSync(sourcePath, destPath);
    fs.unlinkSync(sourcePath);
    console.log(`[Archived] Moved non-md file to RAW/: ${fileName}`);
  }
}

/**
 * Converts a single .docx file to a .md file inside INPUT_DIR.
 * @param {string} filePath - Absolute path to the .docx file
 * @returns {Promise<boolean>} True if converted successfully, false otherwise
 */
async function convertDocxToMarkdown(filePath) {
  const fileNameWithExt = path.basename(filePath);
  const fileBaseName = path.parse(filePath).name;
  console.log(`[Converting] Processing: "${fileNameWithExt}"...`);

  let imageCounter = 0;

  // Configure mammoth conversion options including embedded image extraction
  const options = {
    convertImage: mammoth.images.inline((element) => {
      return element.read('binary').then((imageBuffer) => {
        imageCounter++;

        if (!fs.existsSync(IMAGES_DIR)) {
          fs.mkdirSync(IMAGES_DIR, { recursive: true });
        }

        const ext = element.contentType.split('/')[1] || 'png';
        const sanitizedBaseName = fileBaseName.replace(/[^a-zA-Z0-9_-]/g, '_');
        const imgFileName = `${sanitizedBaseName}_img_${imageCounter}.${ext}`;
        const imgFilePath = path.join(IMAGES_DIR, imgFileName);

        fs.writeFileSync(imgFilePath, imageBuffer, 'binary');
        console.log(`  -> Extracted image: images/${imgFileName}`);

        return {
          src: `./images/${imgFileName}`,
        };
      });
    }),
  };

  try {
    // Step 1: Extract semantic HTML from DOCX
    const result = await mammoth.convertToHtml({ path: filePath }, options);
    const html = result.value;

    // Step 2: Convert HTML to GitHub Flavored Markdown
    const markdown = turndownService.turndown(html);

    // Step 3: Write .md file into INPUT directory
    const outputMdPath = path.join(INPUT_DIR, `${fileBaseName}.md`);
    fs.writeFileSync(outputMdPath, markdown, 'utf8');

    console.log(`[Success] Created Markdown: INPUT/${fileBaseName}.md`);

    if (result.messages && result.messages.length > 0) {
      result.messages.forEach((msg) => {
        if (msg.type === 'warning') {
          console.warn(`  [Warning] ${msg.message}`);
        }
      });
    }

    return true;
  } catch (error) {
    console.error(`[Error] Failed to convert "${fileNameWithExt}":`, error.message);
    return false;
  }
}

/**
 * Main execution function.
 */
async function main() {
  console.log('========================================================');
  console.log(' DOCX to Markdown Converter (Node.js)');
  console.log('========================================================\n');

  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`[Error] INPUT directory not found at: ${INPUT_DIR}`);
    process.exit(1);
  }

  // Ensure RAW directory exists
  if (!fs.existsSync(RAW_DIR)) {
    fs.mkdirSync(RAW_DIR, { recursive: true });
  }

  // Scan INPUT directory for files (ignoring subdirectories like 'images' or 'RAW')
  const entries = fs.readdirSync(INPUT_DIR, { withFileTypes: true });
  const files = entries.filter((entry) => entry.isFile()).map((entry) => entry.name);

  if (files.length === 0) {
    console.log('No files found in INPUT/ directory.');
    return;
  }

  // Identify .docx files, other non-.md files, and existing .md files
  const docxFiles = [];
  const otherNonMdFiles = [];
  const existingMdFiles = [];

  for (const file of files) {
    // Ignore Word temporary lock files starting with ~$
    if (file.startsWith('~$')) {
      console.log(`[Skipping] Temporary Word file: ${file}`);
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    if (ext === '.docx') {
      docxFiles.push(file);
    } else if (ext === '.md') {
      existingMdFiles.push(file);
    } else {
      otherNonMdFiles.push(file);
    }
  }

  console.log(`Found:`);
  console.log(`  - DOCX files to convert : ${docxFiles.length}`);
  console.log(`  - Other non-MD files    : ${otherNonMdFiles.length}`);
  console.log(`  - Existing MD files     : ${existingMdFiles.length}\n`);

  // 1. Process and convert all DOCX files
  for (const file of docxFiles) {
    const fullPath = path.join(INPUT_DIR, file);
    const success = await convertDocxToMarkdown(fullPath);

    // After conversion attempt, move original DOCX to RAW/
    if (success) {
      moveFileToDir(fullPath, RAW_DIR);
    } else {
      console.warn(`[Notice] Keeping "${file}" in INPUT/ due to conversion errors.`);
    }
    console.log('');
  }

  // 2. Move any other non-MD files from INPUT/ to RAW/
  for (const file of otherNonMdFiles) {
    const fullPath = path.join(INPUT_DIR, file);
    moveFileToDir(fullPath, RAW_DIR);
  }

  console.log('========================================================');
  console.log(' Conversion & archiving completed successfully!');
  console.log(` - Markdown files are located in: INPUT/`);
  console.log(` - Archived raw files are in    : RAW/`);
  console.log('========================================================');
}

// Execute script
main();

