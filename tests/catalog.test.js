import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';

test('all 19 garments have distinct local product assets and truthful provenance',()=>{
 const garments=JSON.parse(readFileSync(new URL('../src/data/garments.json',import.meta.url)));
 const images=JSON.parse(readFileSync(new URL('../src/data/catalog-images.json',import.meta.url)));
 assert.equal(Object.keys(images).length,19);
 assert.equal(new Set(Object.values(images).map(x=>x.src)).size,19);
 for(const garment of garments){
  const image=images[garment.id];assert.ok(image,garment.id);
  assert.match(image.label,/Minh họa AI/);
  for(const src of [image.src,image.small]){
   assert.match(src,/^\/garments\/[a-z0-9-]+\.webp$/);
   const path=new URL('../public'+src,import.meta.url);
   assert.ok(statSync(path).size>1000);
   assert.equal(readFileSync(path).subarray(8,12).toString(),'WEBP');
  }
 }
});
