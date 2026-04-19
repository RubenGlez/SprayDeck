# Product

## Navigation

5-tab bottom navigator (expo-router, file-based):

| Tab | Screen | Status |
|---|---|---|
| Home | Dashboard: greeting, quick actions, recent palettes, favorite series, last doodle | ✅ Built |
| Catalog | Full color browser with search, series filter, favorites toggle, color detail sheet | ✅ Built |
| Palettes | Palette list, manual builder, photo import | ✅ Built |
| Doodles | Wall simulator: project list + two-layer gesture editor | ✅ Built |
| Profile | Artist tag, language | ✅ Built |

---

## Features

### Home tab
- Personalized greeting using artist tag (aka)
- Quick action buttons: Create Palette · New Doodle · Explore Colors
- "Continue last doodle" — most recently edited project
- Recent palettes (last 4)
- Favorite series preview (up to 6 cards)

### Catalog tab
- Multi-column color swatch grid across all brands and series
- Search by color name or code
- Filter by series via bottom sheet (select-all / clear)
- Toggle to show only favorited colors
- Color detail bottom sheet:
  - Large swatch, code, name, brand, series
  - Similar colors within the same brand
  - Similar colors across other brands (LAB-based — key differentiator)
  - "Add to palette" action

### Palettes tab
- Grid of saved palettes with swatch preview and name
- FAB: create new palette manually
- Header: import from gallery / import from camera
- Manual palette builder: search + filter catalog, add/remove colors, save with name
- Photo import flow:
  1. Receive image from gallery or camera
  2. Extract 5–8 dominant colors (`react-native-image-colors`)
  3. Match each to nearest spray in catalog (LAB distance)
  4. Show original swatch → matched spray + similarity %
  5. Accept/reject individual matches, edit manually
  6. Save as palette

### Doodles tab
- Grid of saved projects with composite thumbnail, name, date
- FAB: new doodle
- Two-layer editor:
  - Layer 1 (background): wall photo
  - Layer 2 (overlay): sketch/design image
  - Gestures: pan, pinch-zoom, rotate
  - Toolbar: scale slider, rotation, flip H/V, opacity
  - Export as PNG via `react-native-view-shot`
  - Save / re-edit project

### Profile tab
- Artist tag (aka) — used in Home greeting
- Language selection (EN, ES, DE, FR, PT) — bottom sheet

---

## Spray Paint Catalog

### Brands (4 total, 3 with series data)

| Brand | Origin | Series in app | Total colors |
|---|---|---|---|
| Montana Colors | Spain | Montana 94, Montana Hardcore, Montana Vice | 385 |
| Molotow | Germany | Belton Premium, FLAME Blue, FLAME Orange | 504 |
| AKA Colors | Spain | AKA Writer | 163 |
| Loop Colors | Italy | — | 0 (brand added, no series yet) |

### Series (7 total)

| Series | Brand | Finish | Pressure | Colors |
|---|---|---|---|---|
| Montana 94 | Montana Colors | Matte | Low | 199 |
| Montana Hardcore | Montana Colors | Gloss | High | 136 |
| Montana Vice | Montana Colors | Satin | Mixed | 50 |
| Belton Premium | Molotow | Satin | Low | 250 |
| FLAME Blue | Molotow | Matte | Low | 120 |
| FLAME Orange | Molotow | Matte | High | 134 |
| AKA Writer | AKA Colors | Matte | Low | 163 |

**Total: 1,052 colors** with LAB values for cross-brand matching.

### Catalog gaps to fill before launch
- Loop Colors: at least one series needed (brand is in the app but has no colors)
- Montana Vice: only 50 colors — verify this is the complete range or expand

---

## Localization

| Language | Code | Status |
|---|---|---|
| Spanish | es | ✅ Default |
| English | en | ✅ |
| German | de | ✅ |
| French | fr | ✅ |
| Portuguese | pt | ✅ |

---

## Out of Scope (current version)

- iOS support
- Backend / server-side anything
- User accounts or sync
- Geolocated spot saving (map view)
- Spray quantity calculator (m² based)
- AI-assisted color combination suggestions
- 3D wall preview
- Cross-brand color equivalence table (static)
- Shopping list export from palette

---

## Future Features (post-launch candidates)

These are validated ideas worth building after the initial release:

- **Light mode** — the app is currently dark-only (Obsidian theme). Light mode support is deferred until the dark theme is fully polished.
- **Shopping list from palette** — export a palette as a brand-grouped shopping list
- **Spray quantity calculator** — estimate cans needed based on surface area
- **Palette sharing** — share a palette as an image (swatches + color codes)
- **More brands** — Loop Colors series, potential others (Ironlak, Sabotaz, etc.)
