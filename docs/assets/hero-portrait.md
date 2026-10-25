# Hero portrait cutout

Source: the user's existing `public/profile.jpg`, which remains available.

Final asset: `public/profile-hero-cutout.webp`, a transparent derivative created with the built-in imagegen tool and encoded as WebP with its alpha channel preserved. It is displayed as a large borderless portrait across the hero background. CSS fades the lower edge into the shared page color and adapts the portrait placement for narrow screens.

The edit removes the original gray backdrop and small decorative watermark while retaining the person's identity, pose and suit. The new image is an AI-edited derivative, rather than an unchanged copy of the source pixels.

## Editing prompt

Use case: background-extraction and identity-preserve. EDIT the supplied portrait photograph, do not generate a new person. Remove ONLY the gray studio background to true transparent RGBA alpha. Preserve the man's exact identity, face, expression, skin, eyes, hairstyle, pose, body proportions, black suit, white shirt and tie exactly as in the reference. Preserve photographic detail and existing facial lighting. No face reconstruction, no beautification, no retouching, no different hair, no clothing changes, no added body parts. Keep the full original hair and visible shoulders/body within the canvas at the same framing and original approximately 3:4 portrait aspect ratio. Remove the small four-point decorative watermark in the bottom right, repairing only the tiny suit area beneath it. Clean natural alpha along hair strands and suit, no gray matte, no halo, no shadow or border around the cutout, no new backdrop, no text, no logos. This exact existing portrait will be placed very large on a website; retain the sharpest faithful detail available. Transparent background is essential.

