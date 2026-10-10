# Demo coverage

Studio supports garment-first or event-first discovery, occasion, style, three colors, accessories, immediate SVG mockups, and three outfit cards (original/elegant/creative). The selected garment's short cultural context and detail/source link are shown beside the preview. Pending sources retain their labels and cultural warnings.

Event-first discovery filters the 19 catalog records by their actual occasions. Optional weather selection is manual (mild/hot/cool/rain), prioritizes fitting silhouettes and shows practical advice; it is not a live forecast or an AI claim. Palette feedback analyzes hue separation, saturation and lightness without assigning an objective aesthetic score or cultural meaning.

Avatar selection and private local image reference are available in Studio and the existing try-on page. Reference photos are not uploaded and do not simulate fitting on a real person. Generated cards can be compared immediately with color/accessory/style/reason/cultural rows, applied to Studio, saved locally, exported or shared via existing browser controls. Lookbook comparison remains available. This does not add cloud synchronization or publish the hosted website.

Validation: production build and 29 tests pass. Browser checks confirmed event/weather discovery (Dạo phố + hot prioritizes bà ba), cultural context, palette feedback, successful GPT results and a two-card comparison table. At 390px the document had no horizontal overflow. Reference-photo handling retains the existing type/size checks and local-only object URL lifecycle.
