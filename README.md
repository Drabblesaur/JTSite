# Johnny To — Portfolio (React)

A React + Vite port of the portfolio site: Landing, About, Case Study, and Résumé pages.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To build for production:

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build
```

## Project structure

```
public/assets/          Fonts, logo, and photos (served at /assets/...)
src/
  main.jsx              App entry + router + scroll manager
  styles.css            Global resets, @font-face, keyframes, print rules
  data/projects.js      ← EDIT ME: all project content (cards + case studies)
  lib/ui.jsx            css() helper + <A>/<Box> (styled + hover) primitives
  components/
    Nav.jsx             Shared top navigation
    Footer.jsx          Shared contact footer
    PhotoSlot.jsx       Drag/drop image placeholder (swap for real <img>)
  pages/
    Landing.jsx         "/"           hero, about, stack, work grid
    About.jsx           "/about"      bio + flippable photo stack
    CaseStudy.jsx       "/work/:slug" per-project detail (data-driven)
    Resume.jsx          "/resume"     printable résumé sheet
```

## Where to edit common things

- **Project cards & case studies** → `src/data/projects.js`. Each entry drives
  both the Work card on the landing page and its `/work/<slug>` case-study page.
- **Your name, bio, résumé copy** → the relevant file in `src/pages/`.
- **Colors, fonts, spacing** → styles are inline on each element. Shared tokens
  worth knowing: background `#F2F0EF` (résumé `#e9e6e2`), ink `#1a1712`, accent
  green `#A7C098`, fonts `Comico` (display), `Redaction 35` (serif), `Space Mono`
  / `JetBrains Mono` (mono).

## Styling approach

Elements use plain inline `style={{ ... }}` objects. For links/elements that
need a hover state, use the `<A>` / `<Box>` helpers from `src/lib/ui.jsx`:

```jsx
<A href="..." sx="color:#4a4640" hx="color:#1a1712">Link</A>
```

`sx` is the base CSS string, `hx` is merged in on hover. The `css()` helper
parses those strings into React style objects.

## Notes

- The hero 3D scene loads the **Spline** viewer from a CDN (`index.html`) and is
  used as a web component `<spline-viewer>`. Remove that script + element if you
  don't want the dependency.
- `PhotoSlot` accepts a dragged/selected image for the current session only
  (no persistence). Replace instances with real `<img src>` once you have final
  photos.
- The Résumé "Download PDF" button calls `window.print()`; the print stylesheet
  in `styles.css` hides the nav and squares up the sheet.
- Routing uses `BrowserRouter`. `npm run dev` serves deep links fine; for static
  hosting, add a catch-all rewrite to `index.html` (or switch to `HashRouter`
  in `src/main.jsx`).
