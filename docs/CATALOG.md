# Catalog Expansion Plan

Automated fetching via `scripts/fetch-catalog.cjs` (`npm run catalog:fetch`).
No external dependencies — plain Node HTTP fetch, SSR pages only.

---

## Phase 1 — Complete existing brands (all 7 series)

All series already in the app. Just need extractors wired up.

| # | Series | Brand | URL | Extractor | Locales | Status |
|---|--------|-------|-----|-----------|---------|--------|
| 1 | Montana 94 | Montana Colors | `montanacolors.com/productos/mtn-94-pintura-en-aerosol/` | `extractMontanaColors` | es, en | ✅ Done |
| 2 | Hardcore | Montana Colors | `montanacolors.com/productos/graffiti-bellas-artes-hardcore-pintura-aerosol/` | `extractMontanaColors` | es, en | ✅ 137 colors |
| 3 | Vice | Montana Colors | `montanacolors.com/productos/vice/` | `extractMontanaColors` | es, en | ✅ 50 colors |
| 4 | Belton Premium | Molotow | `molotow.es/pintura-en-spray/spray-belton-molotow-premium-23-47629.html` | `extractBeltonPremium` | es | ✅ 250 colors |
| 5 | FLAME Blue | Molotow | `flame-paint.com/products/flame-blue-400ml/` | `extractFlame` | en | ✅ 120 colors |
| 6 | FLAME Orange | Molotow | `flame-paint.com/products/flame-orange-400-600ml/` | `extractFlame` | en | ✅ 134 colors |
| 7 | AKA Writer | AKA Colors | `akagraffiti.com/de/aka-sprays/295-writer-400ml-wahle-farben.html` | `extractAkaGraffiti` | de, es, fr, pt | ✅ 163 colors |

### Extractor notes

**`extractMontanaColors`** (already done)
- `<div class="m-item_color" style='background-color:#hex'>` → hex
- `<div class="m-text">CODE Name</div>` → code + name
- EN URL pattern: `/en/productos/{slug}/`

**`extractBeltonPremium`** (new)
- `<tr data-color="#hex">` → hex
- `<span class="nombreLotes">001. Jasmin yellow</span>` → code + name (split on `. `)
- Spanish page only — no EN equivalent found on molotow.es

**`extractFlame`** (new)
- `<div class="flame-color-wrap" data-tooltip="name FB-100">` → name + code
- `<span style="background-color: #hex;">` → hex
- Code is last space-separated token in tooltip; name is everything before it
- English only

**`extractAkaGraffiti`** (new)
- `<div class="text-center color" style="background: #hex">` → hex
- `<div class="colorSkuDesc ...">CODE Name</div>` → code + name
- DE page used as source; check if other locales exist at `/es/`, `/en/`, `/fr/`

---

## Phase 2 — New brands

Top brands with accessible web color catalogs. Priority order based on popularity in the graffiti scene.

| # | Brand | Origin | Series | URL | Scrapable | Status |
|---|-------|--------|--------|-----|-----------|--------|
| 8 | Montana Cans | Germany | Black, Gold, Ultra | `montana-cans.com/Products/SPRAY-CANS/` | ⚠️ Investigate | ⬜ |
| 9 | Ironlak | Australia | Standard | `ironlak.com/product/ironlak-acrlyic-spray-paint-400ml/` | ✅ Ready | ✅ 101 colors |
| 10 | Loop Colors | Italy | Standard | `dispivalonline.es/spray-de-pintura/7249-spray-loop-colors-satinado-400-ml` | ✅ Ready | ✅ 200 colors |

### Notes per brand

**Montana Cans** (different company from Montana Colors — German brand)
- Series: Black (graffiti), Gold (artist), Ultra Wide
- Product pages found at `montana-cans.com/Products/SPRAY-CANS/MONTANA-SPRAY-PAINT/`
- Color data structure not confirmed yet — needs investigation
- High priority: one of the most used brands globally

**Ironlak** (Australian brand, popular worldwide)
- Source: `ironlak.com/product/ironlak-acrlyic-spray-paint-400ml/` — 102 colors, SSR
- Structure: WooCommerce swatches — `<div title="Color Name">` + `<span style="background-color:#hex">`
- No numeric codes — name only (e.g. "Aspen (White)", "Earth"). Code = slug from name.
- New extractor `extractIronlak` needed — straightforward

**Loop Colors** (Italian brand, already in brands.json with 0 colors)
- Source: third-party shop `dispivalonline.es` — 206 colors, SSR, clean data
- Structure: `<input title="NAME CODE">` + `<span style="background-color: #hex">`
- New extractor `extractDispiva` needed — straightforward
- Resolves the Loop Colors launch blocker in LAUNCH.md

### Skipped (unreachable or no catalog)
- **Clash Colors** — website unreachable (timeout)
- **Arton Colors** — website unreachable (timeout)
- **Kobra** — website unreachable (timeout)
- **Krylon / Rust-Oleum / Duplicolor** — hardware-store brands, not graffiti-specific

---

## Implementation order

1. Wire Phase 1 series into `fetch-catalog.cjs` (3 extractors to write)
2. Run `npm run catalog:fetch` and verify all 7 series
3. Investigate Montana Cans color data structure
4. Investigate Ironlak color data structure
5. Decide on Loop Colors approach (PDF vs manual)
6. Add new brands to brands.json + series.json as data becomes available
