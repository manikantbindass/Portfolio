# DSA homepage card animal scene

The decorative scene is scoped to the homepage project card whose slug is `dsa`. Other project cards, About scenes, and the existing DSA detail-page cat animation retain their own implementations.

`public/projects/dsa/pet-chase-sprite.webp` is an eight-frame, four-column by two-row transparent sprite sheet generated with the built-in image-generation tool. It shows a photorealistic gray-and-white Siberian husky and golden retriever playfully following a black cat and white Persian cat. It is generated artwork, not recorded live-animal footage or a project screenshot.

Original generation: `C:/Users/manik/.codex/generated_images/01a1739d-b3a7-7890-9874-05e9a555e39f/exec-27733c88-b0e2-4206-a3d8-e12418343ca5.png`.

Selected framing revision: `C:/Users/manik/.codex/generated_images/01a1739d-b3a7-7890-9874-05e9a555e39f/exec-6653a26e-2717-4df4-8ea5-8a8d46ff21d6.png`. Converted to WebP at quality 90 with alpha quality 100; source originals remain unchanged.

Prompt: Create an exact 4 × 2 grid of eight equal square animation frames, without gutters or labels. Every frame contains the same four realistic animals, husky and golden retriever following a black cat and white Persian cat in a friendly rightward running formation. Static side-view camera, consistent scale and identities, sequential looping running gait, paw lift and natural fur movement. Fine realistic fur, soft blue-gray/lavender studio rim light, natural golden coat, transparent background including between legs. No aggression, extra animals, cropped tails, text, or watermark.

Framing revision: Preserve identities, realism, transparency, eight gait poses and the grid. Keep each group centered within its own cell, with clear padding around paws, tails and ears, and remove stray opaque marks outside the silhouettes.

The first version used a grouped eight-frame sheet, short dissolves, and minimal horizontal drift. It has been superseded because it looked like blended poses in place. The original asset remains for provenance and is no longer referenced by the scene.

## Independent running cycles

The current scene uses four individual 16-frame sheets in a four-column by four-row arrangement. Each animal has distinct gathered, extended, ground-contact, and airborne running poses. The CSS plays the unblended cycles at different stride timings and moves the animals across the card on staggered tracks, with soft contact shadows. No duplicated silhouettes or oscillating-in-place group are used. This remains generated animation, not recorded real-world footage.

| Workspace asset | Generated source filename |
| --- | --- |
| `public/projects/dsa/husky-run.webp` | `exec-fe193856-4a4e-4170-95b1-39c91b5d9095.png` |
| `public/projects/dsa/retriever-run.webp` | `exec-f65ebfc2-de8b-449a-961c-0edbf3ab873c.png` |
| `public/projects/dsa/black-cat-run.webp` | `exec-fa4c9221-d419-47dd-80b9-6179cfd0935c.png` |
| `public/projects/dsa/persian-cat-run.webp` | `exec-2e53c317-13cf-4269-809d-a1fa6824f0c8.png` |

Source folder: `C:/Users/manik/.codex/generated_images/01a1739d-b3a7-7890-9874-05e9a555e39f/`. All four assets were generated with the built-in image-generation tool and converted to WebP preserving alpha.

Prompt set: one sheet each for a gray-and-white blue-eyed husky, golden retriever, sleek black cat, and white Persian cat. Four columns by four rows of sixteen successive side-profile right-facing running-gallop poses; the same full-body animal and scale per frame; full suspension, forward extension, gathered spine-flexed poses, paw touchdown and push-off, and natural ears/tail/fur movement. Fine photographic fur and anatomy, natural daylight with subtle cool rim lighting, true transparent background, clear framing, and no props, ghosted limbs, text, watermark, or cartoon styling. The frames loop in order while the animal travels across the screen.

One pause control stops both travel and gait. Reduced-motion preferences show the four animals in fixed readable positions; the card description and links remain on the frosted layer. The new scene is still confined to the homepage DSA card.
