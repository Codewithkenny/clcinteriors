# CLC Interiors Premium Catalogue V8

A semantic, responsive HTML/CSS/JS catalogue for CLC Interiors.

## Direction
- Catalogue-first header: brand + Share Catalogue only.
- Transformation showcase focused on how furniture is made and the finished result.
- User-controlled image switch for the featured project; it does not rotate automatically.
- Finished Work section with TikTok enquiry CTA.
- Centered TikTok QR code with no coloured background.
- Share Catalogue uses the dummy production URL `https://www.clcinterior.com`.
- TikTok enquiry destination: `https://www.tiktok.com/@wemimoney_`.
- Instagram: `https://www.instagram.com/clcinteriors/`.
- Motion-based reveal animations plus CSS fallback.

## Before launch
1. Replace placeholder Unsplash images with CLC's real finished photography.
2. Add matching CLC making-process and finished-result photo pairs for each furniture category.
3. Replace the text CLC mark with the official logo asset if supplied.
4. Point `CATALOGUE_URL` in `script.js` to the final hosted domain if it differs from `https://www.clcinterior.com`.

## Demo transformation photography
The catalogue currently uses local stock/demo photos so the making and finished result views can be previewed before CLC project photography is supplied. These are examples, not photographs of completed CLC commissions or necessarily the same physical project. Replace each `before` and `after` image in `script.js` with a matching CLC making-process and finished-result pair for production.

Additional stock images were downloaded from Pexels and are covered by the [Pexels License](https://www.pexels.com/license/). Photographer credits and source pages:
- Sofa workshop: [Mandiri Abadi](https://www.pexels.com/photo/people-making-furniture-in-workshop-15016524/); finished sofa: [Curtis Adams](https://www.pexels.com/photo/sofa-in-living-room-16641324/).
- Woodworking process: [cottonbro studio](https://www.pexels.com/photo/woman-standing-beside-a-table-inside-a-workshop-7484165/); finished dining room: [Christa Grover](https://www.pexels.com/photo/dining-table-area-2121118/).


## Replacing the CLC transformation images
The transformation section is intentionally set up so every making-process and finished-result image is a normal HTML `<img>` element. You do not need to edit the JavaScript to add CLC photos.

In `script.js`, each project contains two image slots:
- `class="mini-before"` — replace its `src` with the CLC making-process image.
- `class="mini-after"` — replace its `src` with the CLC finished-result image.

There are 4 furniture examples, each with a making-process and finished-result image. The featured display and project cards read from those same image paths, so replacing the stock photos is straightforward.

Example:
```html
<img class="mini-before" src="images/clc-sofa-before.jpg" alt="CLC sofa before transformation">
<img class="mini-after" src="images/clc-sofa-after.jpg" alt="CLC finished custom sofa">
```

The small project cards preview the finished result and show the making-process photo on hover.
