# Contact aquarium

The current background uses recorded aquarium footage with natural fish movement at 25 fps, replacing the generated eight-frame animation.

## Current assets and source

- Video: `public/contact/aquarium-real.mp4` — H.264 Main, 960 × 540, 25 fps, 17.4 seconds, no audio, fast-start MP4. A 0.6-second end-to-start crossfade softens the loop boundary.
- Poster: `public/contact/aquarium-poster.webp` — extracted from the video's first frame. Used during loading, playback failure and reduced-motion mode.
- Source: [Fishes Swimming in an Aquarium](https://www.pexels.com/video/fishes-swimming-in-an-aquarium-9796986/), by Ammad Rasool on Pexels.
- Download: `https://videos.pexels.com/video-files/9796986/9796986-hd_1920_1080_25fps.mp4`.
- License: [Pexels License](https://www.pexels.com/license/), checked 26 October 2026. Allows free website use and modification; attribution is appreciated but not required. This project includes this credit for provenance.

The clip is self-hosted. Playback starts when the panel enters view and pauses when offscreen, manually paused, in a hidden tab, or when reduced motion is enabled. The poster remains visible if video playback is unavailable. Only the message panel is affected; the form's email-draft behavior is preserved.

## Legacy generated sequence

The earlier generated asset `public/contact/aquarium.webp` is retained as a historical asset, but the contact form no longer displays it. It was made with the built-in imagegen tool using the prompt below.

### Original generation prompt

Use case: photorealistic-natural. A production website animation sprite sheet, EXACT four equal columns and two equal rows of eight square frames. Overall 2048x1024 preferred, 2:1 aspect. Same fixed camera and aquarium in every cell, all objects perfectly registered except moving fish, fins, water and plants. An elegant real freshwater aquarium: several small vivid tangerine-orange and lemon-yellow tropical fish swimming in a gentle loop between fresh lime-green aquatic plants, crystal-clear pale aqua water, smooth round river stones, soft sunlight caustics, tiny rising bubbles. Layered depth, shallow cinematic focus, subtle glass reflections. Eight consecutive evenly spaced frames of fish gliding smoothly through a short oval path, fins fluttering, tall plants gently swaying, bubbles rising and water reflections shifting; last frame returns smoothly to first. Color scheme vibrant citrus orange, lemon and fresh green against deep aqua, sophisticated clear bright color rather than neon; realistic high-detail photography, dreamy soft lighting, no hard shadows, no murky low contrast, no pixelation. Aquarium scenery fills EACH cell completely, no frame labels, no text, no logos, no watermark, no borders or gridlines. This will sit behind a frosted glass contact form; keep the left half quieter with open water, most fish at center-right and plants near lower corners.

