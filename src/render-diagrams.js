const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');
const puppeteer = require('puppeteer');

const execAsync = promisify(exec);

const DIAGRAM_FOLDERS = [
  path.join(__dirname, '..', 'docs', 'diagrams')
];

async function renderDiagram(inputFile, outputFile) {
  const mmdContent = await fs.readFile(inputFile, 'utf-8');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Set a large viewport
  await page.setViewport({ width: 4800, height: 3200, deviceScaleFactor: 2 });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=block');

    * {
      font-family: 'Inter', sans-serif !important;
    }
    body {
      background: white;
      margin: 0;
      padding: 20px;
    }
    #diagram {
      font-family: 'Inter', sans-serif !important;
    }
    /* Force font loading by rendering hidden text */
    #font-loader {
      position: absolute;
      left: -9999px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div id="font-loader">ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789</div>
  <div id="diagram"></div>
  <script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
  <script>
    const mmdCode = ${JSON.stringify(mmdContent)};

    async function loadFontAndRender() {
      // Load Inter font explicitly
      const font = new FontFace('Inter', "url('https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2')");

      try {
        await font.load();
        document.fonts.add(font);
      } catch (e) {
        console.log('Font load error, continuing with fallback:', e);
      }

      // Wait for all fonts to be ready
      await document.fonts.ready;

      // Force a layout with the font
      const loader = document.getElementById('font-loader');
      loader.offsetHeight; // Force reflow

      // Extra wait to ensure font is applied
      await new Promise(r => setTimeout(r, 200));

      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'loose',
        fontFamily: 'Inter, sans-serif',
        themeVariables: {
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px'
        },
        flowchart: {
          curve: 'basis',
          useMaxWidth: false,
          htmlLabels: true
        },
        sequence: {
          useMaxWidth: false
        }
      });

      try {
        const { svg } = await mermaid.render('mermaid-diagram', mmdCode);
        document.getElementById('diagram').innerHTML = svg;
        window.mermaidRendered = true;
      } catch (e) {
        console.error('Mermaid error:', e);
        window.mermaidError = e.message;
      }
    }

    loadFontAndRender();
  </script>
</body>
</html>`;

  await page.setContent(html, { waitUntil: 'networkidle0' });

  // Wait for fonts to load and mermaid to render
  await page.waitForFunction(() => window.mermaidRendered === true || window.mermaidError, { timeout: 30000 });

  // Check for errors
  const error = await page.evaluate(() => window.mermaidError);
  if (error) {
    throw new Error(`Mermaid rendering failed: ${error}`);
  }

  // Small delay to ensure rendering is complete
  await new Promise(resolve => setTimeout(resolve, 500));

  // Get the SVG element bounds
  const svgElement = await page.$('#diagram svg');
  if (!svgElement) {
    throw new Error('SVG not found');
  }

  // Take screenshot of just the SVG with some padding
  await svgElement.screenshot({
    path: outputFile,
    omitBackground: false
  });

  await browser.close();
}

async function renderDiagrams() {
  try {
    for (const diagramsPath of DIAGRAM_FOLDERS) {
      const mmdFiles = await glob('*.mmd', { cwd: diagramsPath });

      console.log(`Processing folder: ${diagramsPath}`);

      if (mmdFiles.length === 0) {
        console.log('No .mmd files found in', diagramsPath);
        console.log();
        continue;
      }

      console.log(`Found ${mmdFiles.length} diagram(s) to render:`);
      mmdFiles.forEach(file => console.log(`  - ${file}`));
      console.log();

      // Create output directory if it doesn't exist
      const outputPath = path.join(diagramsPath, 'output');
      await fs.mkdir(outputPath, { recursive: true });

      // Render each diagram
      for (const file of mmdFiles) {
        const inputFile = path.join(diagramsPath, file);
        const outputFile = path.join(outputPath, file.replace('.mmd', '.png'));

        console.log(`Rendering ${file}...`);

        try {
          await renderDiagram(inputFile, outputFile);
          console.log(`✓ Successfully rendered ${file} to ${path.basename(outputFile)}`);
        } catch (error) {
          console.error(`✗ Error rendering ${file}:`, error.message);
        }
      }

      console.log(`All diagrams rendered to: ${outputPath}`);
      console.log();
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

renderDiagrams();
