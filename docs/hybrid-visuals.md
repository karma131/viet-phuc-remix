# Hybrid garment visualization

Discovery and garment detail pages now use 19 photorealistic AI product illustrations. The traditional áo dài now matches the series with a warm gray studio backdrop and portrait 2:3 framing. `src/data/catalog-images.json` maps garment IDs to independent image assets and visible provenance labels. All AI images are labeled as illustrations; community variants remain introductory concepts and are not authenticated artifacts. Assets in `public/garments` have 400/800px WebP variants, responsive selection and lazy loading. Broken images fall back to the matching vector silhouette. The built-in image generation tool was used; this static catalog does not require an image API model or incur runtime generation requests. Exact prompts are in `docs/catalog-image-prompts.json`.

Studio and Lookbook continue to use SVG profiles on an avatar. `src/components/GarmentLayers.tsx` defines body, sleeve, lower garment, collar, closure and decoration geometry. `AvatarPreview.tsx` adds independently controlled avatar and accessory layers. SVG IDs are unique per instance and decorative patterns are clipped to garment geometry.

The four priority profiles distinguish two-panel áo dài over trousers, straight ngũ thân with five buttons and panel seams, open-front tứ thân with yếm and sash, and short bà ba with center buttons and pockets. Historical profiles preserve their collar and sleeve distinctions. Community illustrations use explicitly labeled introductory variants; they are not definitive historical reconstructions or representations of every subgroup. Source notes are available on garment detail pages. Existing cultural warnings remain in place. No ceremonial motifs are invented.

## Gemini structured recommendations

Existing Vilao/OpenAI configuration remains usable. To select Gemini locally, set these server-side variables in `.env` and restart the API:

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_google_api_key
GEMINI_MODEL=gemini-2.5-flash
```

`AI_PROVIDER=openai` (the default) continues to use `OPENAI_API_KEY`, `OPENAI_BASE_URL` and `OPENAI_MODEL`. Set `OPENAI_API_MODE=chat_completions` for Vilao; the default mode is Responses. The full JSON contract is included in both the API schema and prompt for gateway compatibility. GPT has a 90-second request deadline; the frontend waits up to 190 seconds. Timeouts and malformed JSON are not automatically retried. Gemini uses Google's `generateContent` REST endpoint with a JSON response schema, followed by the same runtime validation and cultural guard as OpenAI. Provider errors return clearly labeled samples; keys are never sent to the browser. See [Google's structured-output documentation](https://ai.google.dev/gemini-api/docs/generate-content/structured-output) and [OpenAI's Chat Completions reference](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create).

Results now have three ordered purposes: original, elegant and creative. Only the original preserves every selected color, accessory and style. The elegant proposal retains the main garment color and changes the secondary color and accessory combination. The creative proposal changes the main color and chooses a visibly contrasting secondary color. Both proposals retain garment structure, occasion, avatar and decorative-pattern setting. AI accessories must belong to the garment's allowed list. RGB distance checks reject visually duplicate proposals; failed output returns explicitly labeled offline samples. Cultural warnings cannot be lowered. Image prompts use each validated variant's attributes. Cards show computed changes against the generation-time original and can apply a variant to Studio; saving retains purpose and change metadata. Older saved outfits remain readable.

## Optional fashion images

Leave `OPENAI_IMAGE_MODEL` empty to use SVG result cards. No image requests are sent, and the unavailable generation button is hidden. When `OPENAI_API_KEY` and an image-capable `OPENAI_IMAGE_MODEL` are configured, AI recommendation cards automatically request realistic full-length fashion illustrations from the configured Images API. This also works when Gemini is the recommendation provider and a separate image provider is configured. Each result is deduplicated by outfit ID to avoid repeated paid requests during remounts. A pending or failed image request retains its exact SVG preview, with a visible status. Only provider-returned image data is displayed; there are no stock-image substitutions. Generated images can be saved with the outfit and exported.

Alternatively, set `GEMINI_IMAGE_MODEL` to a Gemini model with native image output and provide `GEMINI_API_KEY`. This calls `generateContent` with `TEXT` and `IMAGE` response modalities and accepts validated inline PNG/JPEG/WebP data. If both image providers are configured, Gemini image generation takes precedence. Both image-model variables are empty by default. See [Google's image-generation documentation](https://ai.google.dev/gemini-api/docs/generate-content/image-generation).

Community categories still require verified garment references before photorealistic generation is enabled; their SVG illustrations remain available. Model support must be verified with the chosen gateway; no live Gemini or image generation was verified without configured credentials/models.

## Illustration references

- [Vietnam Tourism: traditional ethnic costumes](https://vietnam.travel/things-to-do/vietnam-traditional-dress-ethnic-groups)
- [Southern Women's Museum: Khmer traditional wedding garments and comparative garment structures](https://baotangphunu.com/trang-phc-ci-truyn-thng-ca-ph-n-khmer-nam-b-2/)

These introductory references inform schematic silhouettes, not exact pattern replication. Locality, subgroup and wearer context still need specialist review.

Run `npm test` for SVG layer/accessory tests, 19 distinct-profile checks, selection preservation, Gemini structured output and existing provider/cultural tests. Run `npm run build:hosted` for TypeScript, production assets, Worker API and exact custom-background verification.
