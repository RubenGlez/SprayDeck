/**
 * Fetches color data from brand websites and writes to assets/data/.
 * No external dependencies — uses Node built-in https.
 * Run: node scripts/fetch-catalog.cjs [seriesId]
 * Omit seriesId to process all series.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'assets/data');

// ─── Series config ────────────────────────────────────────────────────────────

const SERIES = [
  {
    id: 'montana-94',
    urls: {
      es: 'https://www.montanacolors.com/productos/mtn-94-pintura-en-aerosol/',
      en: 'https://www.montanacolors.com/en/productos/mtn-94-aerosol-spray-paint/',
    },
    extract: extractMontanaColors,
  },
  {
    id: 'hardcore',
    urls: {
      es: 'https://www.montanacolors.com/productos/graffiti-bellas-artes-hardcore-pintura-aerosol/',
      en: 'https://www.montanacolors.com/en/productos/graffiti-fine-arts-hardcore-paint-aerosol/',
    },
    extract: extractMontanaColors,
  },
  {
    id: 'vice',
    urls: {
      es: 'https://www.montanacolors.com/productos/vice/',
      en: 'https://www.montanacolors.com/en/productos/vice/',
    },
    extract: extractMontanaColors,
  },
  {
    id: 'belton-premium',
    urls: {
      es: 'https://www.molotow.es/pintura-en-spray/spray-belton-molotow-premium-23-47629.html',
    },
    extract: extractBeltonPremium,
  },
  {
    id: 'flame-blue',
    urls: {
      en: 'https://www.flame-paint.com/products/flame-blue-400ml/',
    },
    extract: extractFlame,
  },
  {
    id: 'flame-orange',
    urls: {
      en: 'https://www.flame-paint.com/products/flame-orange-400-600ml/',
    },
    extract: extractFlame,
  },
  {
    id: 'aka-writter',
    urls: {
      de: 'https://www.akagraffiti.com/de/aka-sprays/295-writer-400ml-wahle-farben.html',
      es: 'https://www.akagraffiti.com/es/aka-sprays/295-spray-aka-writer.html',
      fr: 'https://www.akagraffiti.com/fr/aka-sprays/295-writer-400ml-choisissez-les-couleurs.html',
      pt: 'https://www.akagraffiti.com/pt/aka-sprays/295-writer-400ml-escolhe-cores.html',
    },
    extract: extractAkaGraffiti,
  },
  {
    id: 'loop',
    urls: {
      en: 'https://dispivalonline.es/spray-de-pintura/7249-spray-loop-colors-satinado-400-ml',
    },
    extract: extractDispiva,
  },
  {
    id: 'ironlak',
    urls: {
      en: 'https://ironlak.com/product/ironlak-acrlyic-spray-paint-400ml/',
    },
    extract: extractIronlak,
  },
];

// ─── Fetch ────────────────────────────────────────────────────────────────────

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchHtml(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// ─── Extractors ───────────────────────────────────────────────────────────────

/**
 * Montana Colors pages (MTN 94, Hardcore, Vice).
 * <div class="m-item_color" style='background-color:#hex'>
 *   <div class="m-text"> CODE Name </div>
 */
function extractMontanaColors(html, lang, colorsByCode, seriesId) {
  const blockRegex =
    /<div\s+class="m-item_color[^"]*"\s+data-id="\d+"[^>]*style=['"]background-color:\s*(#[0-9a-fA-F]{6})['"][^>]*>[\s\S]*?<div\s+class="m-text">([\s\S]*?)<\/div>/gi;

  let match;
  while ((match = blockRegex.exec(html)) !== null) {
    const hex = match[1].toUpperCase();
    const raw = match[2]
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!raw) continue;

    const spaceIdx = raw.indexOf(' ');
    if (spaceIdx === -1) continue;

    const code = raw.slice(0, spaceIdx).trim();
    const name = raw.slice(spaceIdx + 1).trim();
    if (!code || !name) continue;

    // Codeless colors (e.g. "Fluorescent") use hex as key so locale variants merge
    const key = /[\d-]/.test(code) ? code : hex;
    if (!colorsByCode[key]) colorsByCode[key] = { seriesId, hex, code, name: {} };
    colorsByCode[key].name[lang] = name;
  }
}

/**
 * Molotow / Belton Premium (molotow.es).
 * <tr data-color="#hex">
 *   <span class="nombreLotes">001. Jasmin yellow</span>
 *   <span class="referenciaLotes">327.001</span>
 */
function extractBeltonPremium(html, lang, colorsByCode, seriesId) {
  const blockRegex =
    /<tr[^>]*data-color="(#[0-9a-fA-F]{6})"[\s\S]*?<span\s+class="nombreLotes">([\s\S]*?)<\/span>[\s\S]*?<span\s+class="referenciaLotes">([\s\S]*?)<\/span>/gi;

  let match;
  while ((match = blockRegex.exec(html)) !== null) {
    const hex = match[1].toUpperCase();
    const rawName = match[2].replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    const code = match[3].replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

    // rawName format: "001. Jasmin yellow" — strip the leading number
    const name = rawName.replace(/^\d+\.\s*/, '').trim();
    if (!name || !code) continue;

    if (!colorsByCode[code]) colorsByCode[code] = { seriesId, hex, code, name: {} };
    colorsByCode[code].name[lang] = name;
  }
}

/**
 * FLAME Blue / Orange (flame-paint.com).
 * <div class="flame-color-wrap" data-tooltip="vanilla FB-100">
 *   <span class="flame-color" style="background-color: #hex;">
 */
function extractFlame(html, lang, colorsByCode, seriesId) {
  const blockRegex =
    /class="flame-color-wrap"[^>]*data-tooltip="([^"]+)"[\s\S]*?class=['"]flame-color[^'"]*['"][^>]*style="[^"]*background-color:\s*(#[0-9a-fA-F]{6})/gi;

  let match;
  while ((match = blockRegex.exec(html)) !== null) {
    const tooltip = match[1].replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    const hex = match[2].toUpperCase();

    // tooltip: "vanilla FB-100" — last token is the code
    const parts = tooltip.split(' ');
    if (parts.length < 2) continue;
    const code = parts.pop().trim();
    const name = parts.join(' ').trim();
    if (!code || !name) continue;

    if (!colorsByCode[code]) colorsByCode[code] = { seriesId, hex, code, name: {} };
    colorsByCode[code].name[lang] = name;
  }
}

/**
 * AKA Graffiti (akagraffiti.com) — minified single-line HTML.
 * <div class="text-center color" style="background: #hex ...">
 *   <div class="colorSkuDesc ..."> CODE Name </div>
 */
function extractAkaGraffiti(html, lang, colorsByCode, seriesId) {
  const blockRegex =
    /class="text-center color[^"]*"[^>]*style="background:\s*(#[0-9a-fA-F]{6})[^"]*"[\s\S]*?class="colorSkuDesc[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;

  let match;
  while ((match = blockRegex.exec(html)) !== null) {
    const hex = match[1].toUpperCase();
    const raw = match[2]
      .replace(/<[^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!raw) continue;

    // Format: "SCHWARZ AKA100" — code is the last token
    const parts = raw.split(' ');
    const code = parts.pop().trim();
    const name = parts.join(' ').trim();
    if (!code || !name) continue;

    if (!colorsByCode[code]) colorsByCode[code] = { seriesId, hex, code, name: {} };
    colorsByCode[code].name[lang] = name;
  }
}

/**
 * Dispiva online shop — used for Loop Colors.
 * <input class="input-color" title="WHITE 100">
 * <span class="color" style="background-color: #hex">
 */
function extractDispiva(html, lang, colorsByCode, seriesId) {
  const blockRegex =
    /<input[^>]*class="input-color"[^>]*title="([^"]+)"[\s\S]*?<span[^>]*class="color"[^>]*style="background-color:\s*(#[0-9a-fA-F]{6})"/gi;

  let match;
  while ((match = blockRegex.exec(html)) !== null) {
    const title = match[1].replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    const hex = match[2].toUpperCase();

    // title: "VALENCIA 108" — last token is the numeric code
    const parts = title.split(' ');
    const lastPart = parts[parts.length - 1];
    const hasNumericCode = /^\d+$/.test(lastPart);
    const code = hasNumericCode ? lastPart : title;
    const name = hasNumericCode ? parts.slice(0, -1).join(' ').trim() : title;
    if (!name) continue;

    if (!colorsByCode[code]) colorsByCode[code] = { seriesId, hex, code, name: {} };
    colorsByCode[code].name[lang] = name;
  }
}

/**
 * Ironlak (ironlak.com) — WooCommerce color swatches.
 * <div class="rtwpvs-term" title="Color Name">
 *   <span class="rtwpvs-term-span-color" style="background-color:#hex;">
 */
function extractIronlak(html, lang, colorsByCode, seriesId) {
  const blockRegex =
    /class="rtwpvs-term\s[^"]*"\s+title="([^"]+)"[\s\S]*?background-color:(#[0-9a-fA-F]{6})/gi;

  let match;
  while ((match = blockRegex.exec(html)) !== null) {
    const name = match[1].replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    const hex = match[2].toUpperCase();
    if (!name) continue;

    // No numeric codes — use slugified name as key
    const key = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (!colorsByCode[key]) colorsByCode[key] = { seriesId, hex, code: name, name: {} };
    colorsByCode[key].name[lang] = name;
  }
}

// ─── LAB conversion ───────────────────────────────────────────────────────────

function hexToLab(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const rl = toLinear(r), gl = toLinear(g), bl = toLinear(b);

  const x = (rl * 0.4124564 + gl * 0.3575761 + bl * 0.1804375) / 0.95047;
  const y = (rl * 0.2126729 + gl * 0.7151522 + bl * 0.0721750) / 1.0;
  const z = (rl * 0.0193339 + gl * 0.1191920 + bl * 0.9503041) / 1.08883;

  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const fx = f(x), fy = f(y), fz = f(z);

  return {
    l: Math.round((116 * fy - 16) * 100) / 100,
    a: Math.round((500 * (fx - fy)) * 100) / 100,
    b: Math.round((200 * (fy - fz)) * 100) / 100,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function processSeries(config) {
  console.log(`\n[${config.id}] Fetching...`);
  const colorsByCode = {};

  for (const [lang, url] of Object.entries(config.urls)) {
    console.log(`  ${lang}: ${url}`);
    const html = await fetchHtml(url);
    config.extract(html, lang, colorsByCode, config.id);
    console.log(`  → ${Object.keys(colorsByCode).length} colors so far`);
  }

  const sorted = Object.keys(colorsByCode).sort((a, b) =>
    a.localeCompare(b, 'en', { numeric: true, sensitivity: 'base' })
  );

  const result = sorted.map((key) => {
    const c = colorsByCode[key];
    return {
      id: crypto.randomUUID(),
      seriesId: c.seriesId,
      hex: c.hex,
      code: c.code,
      name: c.name,
      lab: hexToLab(c.hex),
    };
  });

  const outputPath = path.join(DATA_DIR, `${config.id}-colors.json`);
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
  console.log(`[${config.id}] ✓ ${result.length} colors → ${path.relative(ROOT, outputPath)}`);
  return result.length;
}

async function main() {
  const target = process.argv[2];
  const toProcess = target ? SERIES.filter((s) => s.id === target) : SERIES;

  if (toProcess.length === 0) {
    console.error(`Series "${target}" not found. Available: ${SERIES.map((s) => s.id).join(', ')}`);
    process.exit(1);
  }

  let total = 0;
  for (const config of toProcess) {
    total += await processSeries(config);
  }
  console.log(`\nDone. ${total} colors written.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
