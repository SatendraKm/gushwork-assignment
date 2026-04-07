# Project Structure - Modularized

This project has been refactored into a modular architecture for better maintainability, reusability, and organization.

## CSS Modules (`css/` directory)

Each CSS file is focused on a specific component or feature:

| Module | Purpose |
|--------|---------|
| `vars.css` | Design tokens (colors, spacing, typography, shadows, transitions) |
| `reset.css` | CSS reset and base element styles |
| `layout.css` | Container and spacing utilities |
| `typography.css` | Text utilities (titles, subtitles, accents) |
| `buttons.css` | Button system (primary, outline, dark, text variants) |
| `forms.css` | Form elements (inputs, selects, labels) |
| `sticky-header.css` | Sticky product header shown on scroll |
| `navbar.css` | Main navigation bar and mobile menu |
| `hero.css` | Hero section and product info |
| `carousel.css` | Image carousel and zoom preview |
| `sections.css` | Content sections (trusted, specs, features, FAQ, applications) |
| `process.css` | Manufacturing process tabs |
| `testimonials.css` | Testimonials carousel |
| `portfolio.css` | Portfolio grid and not-found banner |
| `resources.css` | Resources/downloads section |
| `cta.css` | Call-to-action banner |
| `footer.css` | Footer layout and links |
| `modals.css` | Modal overlays and animations |
| `responsive.css` | Media queries for tablet and mobile |
| `styles.css` | **Main entry point** - imports all modules |

### Benefits
- **Single Responsibility**: Each file handles one component
- **Easy Updates**: Change one component without affecting others
- **Scalability**: Add new components by creating new files
- **Maintainability**: Easier to locate and modify styles

## JavaScript Modules (`js/` directory)

Each JavaScript module exports a single initialization function:

| Module | Purpose |
|--------|---------|
| `sticky-header.js` | Sticky header visibility on scroll |
| `carousel.js` | Hero carousel + zoom preview functionality |
| `apps-carousel.js` | Applications carousel with touch support |
| `process-tabs.js` | Manufacturing process tab switching |
| `mobile-nav.js` | Mobile hamburger menu |
| `modals.js` | Modal opening/closing logic |
| `faq.js` | FAQ accordion behavior |
| `smooth-scroll.js` | Smooth anchor link scrolling |
| `lazy-loading.js` | Image lazy loading fallback |
| `main.js` | **Entry point** - imports and initializes all modules |

### Structure
Each module is an ES6 module with a default export:

```javascript
export function initFeatureName() {
  // Module implementation
}
```

The main.js file imports all modules and initializes them:

```javascript
import { initStickyHeader } from "./sticky-header.js";
import { initHeroCarousel } from "./carousel.js";
// ... other imports

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initHeroCarousel();
  // ... other initializations
});
```

### Benefits
- **Encapsulation**: Each feature is isolated in its own module
- **Reusability**: Modules can be imported and used in other projects
- **Lazy Loading**: Modules are only parsed/executed when needed
- **Testability**: Individual modules can be unit tested
- **Debugging**: Feature-specific code is easy to locate

## File Structure

```
d:\projects\gushwork\
├── index.html
├── css/
│   ├── vars.css                 (design tokens)
│   ├── reset.css                (base styles)
│   ├── layout.css
│   ├── typography.css
│   ├── buttons.css
│   ├── forms.css
│   ├── sticky-header.css
│   ├── navbar.css
│   ├── hero.css
│   ├── carousel.css
│   ├── sections.css
│   ├── process.css
│   ├── testimonials.css
│   ├── portfolio.css
│   ├── resources.css
│   ├── cta.css
│   ├── footer.css
│   ├── modals.css
│   ├── responsive.css           (media queries)
│   └── styles.css               (main entry point)
├── js/
│   ├── sticky-header.js
│   ├── carousel.js
│   ├── apps-carousel.js
│   ├── process-tabs.js
│   ├── mobile-nav.js
│   ├── modals.js
│   ├── faq.js
│   ├── smooth-scroll.js
│   ├── lazy-loading.js
│   └── main.js                  (entry point)
├── assets/
└── [original files preserved]
```

## Adding New Features

### Adding a New CSS Component
1. Create a new file in `css/` (e.g., `css/new-component.css`)
2. Add your styles
3. Import it in `css/styles.css`:
   ```css
   @import url("./new-component.css");
   ```

### Adding a New JavaScript Feature
1. Create a new file in `js/` (e.g., `js/new-feature.js`)
2. Export your initialization function:
   ```javascript
   export function initNewFeature() {
     // your code
   }
   ```
3. Import and initialize in `js/main.js`:
   ```javascript
   import { initNewFeature } from "./new-feature.js";
   
   document.addEventListener("DOMContentLoaded", () => {
     // ... existing code
     initNewFeature();
   });
   ```

## Migration Notes
- The original `styles.css` has been replaced with modular versions
- The original `script.js` has been replaced with ES6 modules
- All HTML references have been updated (`css/styles.css` and `js/main.js`)
- Functionality is **identical** - only organization has changed
- No breaking changes to HTML markup

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6 module support required (use transpiler for older browsers)
- CSS variable support required
