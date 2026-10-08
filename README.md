# CLC Interiors Premium Catalogue V8

A semantic, responsive HTML/CSS/JS catalogue for CLC Interiors.

## Direction
- Catalogue-first header: brand + Share Catalogue only.
- Transformation showcase for furniture and spaces.
- Interactive Before / After slider for the featured transformation.
- Finished Work section with TikTok enquiry CTA.
- Centered TikTok QR code with no coloured background.
- Share Catalogue uses the dummy production URL `https://www.clcinterior.com`.
- TikTok enquiry destination: `https://www.tiktok.com/@wemimoney_`.
- Instagram: `https://www.instagram.com/clcinteriors/`.
- Motion-based reveal animations plus CSS fallback.

## Before launch
1. Replace placeholder Unsplash images with CLC's real finished photography.
2. Add matching CLC before/after pairs for sofas, beds, dining, consoles and spaces.
3. Replace the text CLC mark with the official logo asset if supplied.
4. Point `CATALOGUE_URL` in `script.js` to the final hosted domain if it differs from `https://www.clcinterior.com`.

## Demo transformation photography
The Before/After area currently uses free stock photography from Pexels so the interaction can be previewed with real images before CLC project photography is supplied. These are demonstration pairs rather than photographs of the same physical projects. Replace each `before` and `after` URL in `script.js` with matching CLC project pairs for production.


## Replacing the CLC transformation images
The transformation section is intentionally set up so every Before/After image is a normal HTML `<img>` element. You do not need to edit the JavaScript to add CLC photos.

Inside `index.html`, each transformation card contains two image slots:
- `class="mini-before"` — replace its `src` with the CLC before/work-in-progress image.
- `class="mini-after"` — replace its `src` with the CLC finished image.

There are 5 transformation projects, so there are **10 image elements** in the toggle cards. The large featured Before/After display automatically reads those same image elements when a project is selected. This keeps one source of truth and makes replacing the stock photos simple.

Example:
```html
<img class="mini-before" src="images/clc-sofa-before.jpg" alt="CLC sofa before transformation">
<img class="mini-after" src="images/clc-sofa-after.jpg" alt="CLC finished custom sofa">
```

The small transformation cards also crossfade between their Before and After image when hovered, so you can quickly preview both states.
