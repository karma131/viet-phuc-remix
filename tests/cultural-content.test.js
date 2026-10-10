import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import Module from 'node:module';
import cultural from '../src/data/cultural-content.json' with {type:'json'};
import {garments} from '../server/logic.js';
const bundle=await build({entryPoints:['src/data/options.ts','src/components/illustrationNotes.ts'],bundle:true,platform:'node',format:'cjs',outdir:'out',write:false});
const modules=bundle.outputFiles.map(file=>{const mod=new Module(file.path);mod._compile(file.text,file.path);return mod.exports;});
test('all 19 records have complete readings with resolvable, specific sources',()=>{
 assert.equal(Object.keys(cultural.entries).length,19);
 const refs=new Map(cultural.references.map(r=>[r.id,r]));
 assert.equal(refs.size,cultural.references.length);
 for(const g of garments){const e=cultural.entries[g.id];assert.ok(e);for(const field of ['description','origin','context','scope'])assert.ok(e[field]?.trim());assert.equal(g.source,e.source);assert.deepEqual(g.features,e.features);assert.equal(g.constraint,e.scope);assert.ok(refs.has(e.source));assert.equal(new URL(refs.get(e.source).url).protocol,'https:');}
 assert.equal(garments.some(g=>g.source==='pending'),false);
});
test('all published stories use reviewed readings instead of unsourced filler',()=>{
 const stories=modules.find(m=>m.stories).stories;assert.equal(stories.length,8);
 for(const story of stories){const entry=cultural.entries[story.garment];assert.equal(story.source,entry.source);assert.deepEqual(story.paragraphs,[entry.origin,entry.context]);}
});
test('community illustration links resolve to their own reading, never an unrelated garment',()=>{
 const notes=modules.find(m=>m.illustrationNotes).illustrationNotes;
 for(const [id,note] of Object.entries(notes)){const ref=cultural.references.find(r=>r.id===cultural.entries[id].source);assert.equal(note.url,ref.url);}
 assert.notEqual(notes.muong.url,notes.khmer.url);
 assert.notEqual(notes.cham.url,notes.khmer.url);
});
