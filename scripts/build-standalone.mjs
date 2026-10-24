import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { basename, join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
let html = readFileSync(join(dist, 'index.html'), 'utf8');

const scriptPattern = /<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/;
const stylePattern = /<link\b[^>]*\brel="stylesheet"[^>]*\bhref="([^"]+)"[^>]*>/;
const scriptMatch = html.match(scriptPattern);
const styleMatch = html.match(stylePattern);

if (!scriptMatch || !styleMatch) {
  throw new Error('Riferimenti CSS/JS non trovati nella build');
}

function assetFromReference(reference) {
  return join(dist, 'assets', basename(reference));
}

function dataUri(path) {
  const extension = path.split('.').pop();
  const mimeTypes = {
    woff2: 'font/woff2',
    woff: 'font/woff',
    svg: 'image/svg+xml',
  };
  const mime = mimeTypes[extension] ?? 'application/octet-stream';
  return `data:${mime};base64,${readFileSync(path).toString('base64')}`;
}

const javascriptPath = assetFromReference(scriptMatch[1]);
const cssPath = assetFromReference(styleMatch[1]);
let javascript = readFileSync(javascriptPath, 'utf8');
let css = readFileSync(cssPath, 'utf8');

css = css.replace(/url\((["']?)([^)"']+)\1\)/g, (match, _quote, reference) => {
  if (reference.startsWith('data:')) return match;
  return `url("${dataUri(assetFromReference(reference))}")`;
});

if (javascript.includes('import.meta')) {
  throw new Error('Il bundle contiene import.meta: la conversione standalone non è sicura');
}

javascript = javascript.replace(/<\/script/gi, '<\\/script');

// Use a classic script after #root: this works both offline and in HTML previewers.
html = html.replace(scriptMatch[0], '');
html = html.replace(styleMatch[0], () => `<style>${css}</style>`);
html = html.replace(
  /<link\b[^>]*\brel="icon"[^>]*>/,
  `<link rel="icon" type="image/svg+xml" href="${dataUri(join(root, 'public', 'favicon.svg'))}" />`,
);
html = html.replace(
  '</head>',
  '<meta name="logos-distribution" content="standalone-offline" />\n  </head>',
);
html = html.replace(
  '</body>',
  () => `<script type="text/javascript">${javascript}</script>\n  </body>`,
);

const output = join(root, 'logos.html');
writeFileSync(output, html, 'utf8');
console.log(`File standalone creato: logos.html (${Math.round(statSync(output).size / 1024)} KB)`);
