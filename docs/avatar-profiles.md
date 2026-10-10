# Avatar profiles

Four selectable SVG avatars use distinct hair and face geometry: original long hair, a tall bun-haired character, a petite bob-haired character and a broad-shouldered short-haired male character. The picker shows portrait thumbnails, descriptions and pressed state. Switching synchronizes the selected index with Studio configuration so it survives navigation, generation, saving and applying an outfit.

Avatar, garment and accessory layers share one profile transform to keep collars, cuffs, hands and accessories aligned. Taller profiles scale from the top of the SVG so headwear stays within the viewBox. Garment-only catalog fallback ignores these transforms. Selecting a male character keeps the user's chosen garment and accessories; no automatic gender filter changes the outfit.

Input, output and provider JSON schemas accept indices 0–3. Authoritative fashion-image prompts include the selected model's hair/body description, including male identity for index 3. Existing saved indices 0–2 remain compatible. Production build and 31 tests pass; browser switching confirmed indices 1, 2 and 3 update the live preview.
