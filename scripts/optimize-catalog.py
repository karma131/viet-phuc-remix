"""Encode project catalog assets; preserve originals outside the public bundle."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
public = root / 'public' / 'garments'
archive = root / 'assets' / 'catalog-originals'
archive.mkdir(parents=True, exist_ok=True)
count = 0
for path in sorted(public.glob('*.png')):
    if path.stem not in ('ngu-than', 'ngu-than-v2'):
        image = Image.open(path).convert('RGB')
        for width, suffix in ((800, ''), (400, '-400')):
            sized = image.copy()
            sized.thumbnail((width, round(width * image.height / image.width)), Image.Resampling.LANCZOS)
            sized.save(public / (path.stem + suffix + '.webp'), 'WEBP', quality=90, method=6)
        count += 1
    destination = archive / path.name
    if destination.exists():
        raise RuntimeError(f'Original already exists: {destination}')
    path.rename(destination)
print(f'Encoded {count} catalog images at 400/800px; originals preserved in {archive}')
