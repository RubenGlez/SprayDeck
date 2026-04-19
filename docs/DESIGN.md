# Design System Specification: High-Utility Obsidian

## 1. Overview & Creative North Star: "The Neon Architect"
The "Neon Architect" is the Creative North Star for this design system. We are moving away from the "discovery" phase of graffiti and into the "execution" phase. This system treats the interface as a high-precision digital workbench. It is brutalist in its efficiency but editorial in its execution. 

To break the "template" look, we utilize **intentional asymmetry** and **data-density**. Instead of centered, airy layouts, we favor left-aligned, information-rich modules that mimic a physical toolbox or a cockpit. We eschew traditional borders for tonal depth, creating a "layered glass" aesthetic that feels premium, indestructible, and purpose-built for the street.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
The color palette is anchored in an absolute deep void (`surface-container-lowest: #000000`), punctuated by high-visibility neon accents.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Layout boundaries must be established through background color shifts.
*   **Primary Container:** Use `surface-container-low` (#111414) for the main background.
*   **Secondary Modules:** Place `surface-container` (#171a1a) or `surface-container-high` (#1c2020) cards on top to create distinction.
*   **Interaction:** Use `surface-bright` (#282d2d) only for active or hovered states.

### Glass & Gradient Implementation
To move beyond a flat utility app, use **Glassmorphism** for floating elements (like a "quick-tool" bar). Use `surface-container-highest` (#222727) at 60% opacity with a `24px` backdrop blur. 
*   **Signature CTA Gradient:** Use a linear gradient from `primary` (#a1ffc2) to `primary-container` (#00fc9a) at a 135-degree angle. This adds "soul" to functional buttons.

---

## 3. Typography: Technical Authority
We use **Space Grotesk** exclusively. Its monospaced-influenced terminals provide a "technical" feel that fits a utility-first toolbox.

*   **Display (L/M/S):** Used for "Big Data" readouts (e.g., remaining paint volume, GPS coordinates). These should be tracked-in (-2%) to feel dense.
*   **Headline & Title:** Used for tool categories. These represent the "Labels" on a physical drawer.
*   **Body (L/M/S):** Optimized for legibility in low-light environments. Ensure `body-md` is the default for most data entries.
*   **Labels:** Use `label-sm` in all-caps with +5% letter spacing for metadata (e.g., HEX codes, timestamps).

---

## 4. Elevation & Depth: Tonal Layering
In a high-utility app, shadows are often noise. We replace them with **Tonal Layering**.

*   **The Layering Principle:** Stacking determines importance. A `surface-container-highest` (#222727) element automatically feels "closer" to the user than a `surface-container-low` (#111414) base.
*   **Ambient Shadows:** For floating modals only, use a shadow with a `32px` blur, 8% opacity, using the `primary-fixed-dim` (#00ec90) color to simulate the neon glow hitting the surface.
*   **The Ghost Border:** If high-contrast accessibility is required, use `outline-variant` (#464848) at **15% opacity**. Never 100%.

---

## 5. Components: The Digital Workbench

### Buttons (The "Actuators")
*   **Primary:** `ROUND_FULL`. Background: `primary-container` (#00fc9a). Text: `on-primary` (#00643a).
*   **Secondary:** `ROUND_FULL`. Background: `surface-variant` (#222727). Text: `primary` (#a1ffc2).
*   **Tertiary:** No background. Text: `primary` (#a1ffc2) with an icon.

### Input Fields (The "Data Ports")
*   Forgo the "box" look. Use a `surface-container-highest` (#222727) background with a `ROUND_FULL` shape. 
*   **Active State:** Instead of a border, use a subtle `primary` (#a1ffc2) outer glow (4px blur, 20% opacity).

### Cards & Lists (The "Trays")
*   **Forbid Dividers:** Use `0.9rem` (spacing-4) of vertical whitespace or a shift from `surface-container` to `surface-container-high`.
*   **Utility Metric:** Every card should have a "Primary Metric" in the top right using `label-md` for quick scanning.

### Specialized Components
*   **The "Color-Swatch" Chip:** A `ROUND_FULL` chip where the leading element is a large circle of the color, and the trailing text is the HEX code in `label-sm`.
*   **The "Inventory Meter":** A horizontal bar using `primary-dim` (#00ec90) for the fill and `surface-container-highest` (#222727) for the track. No rounded ends on the inner fill—keep it sharp and technical.

---

## 6. Do’s and Don’ts

### Do
*   **Do** embrace density. If you can fit more data points without sacrificing legibility, do it.
*   **Do** use `ROUND_FULL` for everything. This softens the aggressive "Obsidian" colors, making the app feel like a modern, ergonomic tool.
*   **Do** use `secondary` (#65f9c3) for status-ready indicators and `error` (#ff716c) for low-stock alerts.

### Don’t
*   **Don't** use icons with varying line weights. Use 2px "bold" line icons to match the weight of Space Grotesk.
*   **Don't** use "Discovery" patterns (like carousels). Use vertical scrolling lists and grids that mimic a file system.
*   **Don't** use pure white (#FFFFFF). Use `on-surface` (#edeeed) to reduce eye strain in dark environments.