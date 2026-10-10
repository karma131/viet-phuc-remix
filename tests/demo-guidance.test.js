import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import Module from 'node:module';
import {garments} from '../server/logic.js';
const bundle=await build({entryPoints:['src/utils/styleGuidance.ts'],bundle:true,platform:'node',format:'cjs',write:false});
const mod=new Module('demo-guidance');mod._compile(bundle.outputFiles[0].text,'demo-guidance.cjs');
const {paletteGuidance,suggestGarments}=mod.exports;
test('event suggestions never include garments that lack the selected occasion',()=>{
 for(const event of [...new Set(garments.flatMap(g=>g.occasions))])for(const weather of ['hot','cool','rain','mild']){const result=suggestGarments(garments,event,weather);assert.ok(result.length>0&&result.length<=4);assert.ok(result.every(g=>g.occasions.includes(event)))}
 assert.deepEqual(suggestGarments(garments,'unknown','hot'),[]);
});
test('weather prioritization respects occasion and does not mutate source order',()=>{
 const original=garments.map(g=>g.id);const options=suggestGarments(garments,'Dạo phố','hot');assert.equal(options[0].id,'ba-ba');assert.deepEqual(garments.map(g=>g.id),original);
});
test('palette guidance handles achromatic, identical and opposing hues',()=>{
 assert.match(paletteGuidance('#FFFFFF','#000000').title,/trung tính/);
 assert.match(paletteGuidance('#65816E','#65816E').title,/gần nhau/);
 assert.match(paletteGuidance('#FF0000','#00FFFF').title,/Tương phản/);
 assert.deepEqual(paletteGuidance('#ffffff','#000000'),paletteGuidance('#FFFFFF','#000000'));
});
