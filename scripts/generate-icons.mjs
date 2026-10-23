import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const iconsDir = path.join(rootDir, 'icons');
const outFile = path.join(rootDir, 'src/components/icons/paths.ts');

/** "Users Crown.svg" → usersCrown */
function fileToKey(filename) {
  const base = filename.replace(/\.svg$/i, '');
  return base
    .split(/[\s_-]+/)
    .map((word, index) => {
      const lower = word.toLowerCase();
      return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

function parseSvgViewBox(svg) {
  const match = svg.match(/viewBox="([^"]+)"/i);
  return match ? match[1] : '0 0 24 24';
}

function parseSvgInner(svg) {
  return svg
    .replace(/<\?xml[^>]*>/g, '')
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .replace(/fill="black"/g, 'fill="currentColor"')
    .replace(/fill="white"/gi, 'fill="currentColor"')
    .replace(/fill="#000000"/gi, 'fill="currentColor"')
    .replace(/fill="#000"/gi, 'fill="currentColor"')
    .trim();
}

const files = fs
  .readdirSync(iconsDir)
  .filter((f) => f.endsWith('.svg'))
  .sort();

const iconPaths = {};
const iconViewBoxes = {};

for (const file of files) {
  const key = fileToKey(file);
  const fullPath = path.join(iconsDir, file);
  const svg = fs.readFileSync(fullPath, 'utf8');
  iconPaths[key] = parseSvgInner(svg);
  iconViewBoxes[key] = parseSvgViewBox(svg);
}

/** Stable aliases used across the app */
const aliases = {
  chevronLeft: 'angleLeft',
  chevronRight: 'angleRight',
  chevronDown: 'chevronDown',
  chevronUp: 'chevronUp',
  trash2: 'trashAlt',
  info: 'infoCircle',
  locationPin: 'locationPin',
  exclamationTriangle: 'exclamationTriangle',
  externalLink: 'externalLink',
  downloadAlt: 'downloadAlt',
  ellipsesHorizontal: 'ellipsesHorizontal',
  ellipsesVertical: 'ellipsesVertical',
  spinner: 'circleNotch',
  loader: 'circleNotch',
};

for (const [alias, sourceKey] of Object.entries(aliases)) {
  if (iconPaths[sourceKey]) {
    iconPaths[alias] = iconPaths[sourceKey];
    iconViewBoxes[alias] = iconViewBoxes[sourceKey];
  }
}

const entries = Object.entries(iconPaths)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([key, inner]) => `  ${key}: ${JSON.stringify(inner)},`);

const viewBoxEntries = Object.entries(iconViewBoxes)
  .filter(([, viewBox]) => viewBox !== '0 0 24 24')
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([key, viewBox]) => `  ${key}: ${JSON.stringify(viewBox)},`);

const content = `// Generated from /icons — run \`npm run generate-icons\` after adding SVGs.
// fill uses currentColor for light/dark theme tinting via CSS.

export const iconPaths = {
${entries.join('\n')}
} as const;

export const iconViewBoxes = {
${viewBoxEntries.join('\n')}
} as const;

export type IconName = keyof typeof iconPaths;
`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, content);
console.log(`Generated ${Object.keys(iconPaths).length} icons → ${outFile}`);
