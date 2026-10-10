import test from 'node:test';
import assert from 'node:assert/strict';
import {generateOutfit} from '../server/service.js';
import {samples,garments} from '../server/logic.js';
import {inputSchema,lookSchema} from '../server/logic.js';
import {colorDistance} from '../server/variants.js';
const config={garmentId:'ao-dai-cach-tan',occasion:'Dạo phố',style:'Nghệ thuật',primaryColor:'#CA9A83',secondaryColor:'#FFF8EB',accessoryColor:'#D5AD62',accessories:['mini','pearl'],avatar:1,patternEnabled:false};
const run=looks=>generateOutfit(config,{OPENAI_API_KEY:'test'},{fetchImpl:async()=>Response.json({status:'completed',output:[{type:'message',content:[{type:'output_text',text:JSON.stringify({looks})}]}]})});
test('male avatar survives generation and saved-look validation, with a matching image prompt',async()=>{
 const input={...config,avatar:3};assert.ok(inputSchema.safeParse(input).success);assert.equal(inputSchema.safeParse({...input,avatar:4}).success,false);
 const result=await generateOutfit(input,{OPENAI_API_KEY:'test'},{fetchImpl:async()=>Response.json({status:'completed',output:[{type:'message',content:[{type:'output_text',text:JSON.stringify({looks:samples(input).looks})}]}]})});
 assert.equal(result.body.mode,'openai');for(const look of result.body.looks){assert.equal(look.avatar,3);assert.ok(lookSchema.safeParse(look).success);assert.match(look.imagePrompt,/Male model/)}
});
test('model variant palettes survive normalization; original and locked attributes cannot drift',async()=>{
 const looks=samples(config).looks;
 looks[0].colors.primary='#000000';looks[0].accessories=[];
 looks[1].colors={primary:'#000000',secondary:'#C7D6CF',accessory:'#807042'};looks[1].accessories=['flat'];
 looks[2].colors={primary:'#354660',secondary:'#EAD9BB',accessory:'#C99535'};looks[2].accessories=['silk'];
 const result=await run(looks);assert.equal(result.body.mode,'openai');
 const [original,elegant,creative]=result.body.looks;
 assert.equal(original.purpose,'original');assert.equal(original.colors.primary,config.primaryColor);assert.deepEqual(original.accessories,config.accessories);assert.deepEqual(original.changes,[]);
 assert.equal(elegant.colors.primary,config.primaryColor);assert.equal(elegant.colors.secondary,'#C7D6CF');assert.deepEqual(elegant.accessories,['flat']);
 assert.equal(creative.colors.primary,'#354660');assert.equal(creative.colors.secondary,'#EAD9BB');assert.deepEqual(creative.accessories,['silk']);
 assert.ok(creative.changes.some(c=>c.field==='primary'&&c.from===config.primaryColor&&c.to==='#354660'));
 for(const look of result.body.looks){assert.equal(look.garmentId,config.garmentId);assert.equal(look.occasion,config.occasion);assert.equal(look.avatar,1);assert.equal(look.patternEnabled,false);assert.ok(look.imagePrompt.includes(look.colors.primary));assert.ok(look.imagePrompt.includes(look.accessories.join(', ')))}
});
test('duplicate visuals and unsupported accessories never masquerade as successful GPT suggestions',async()=>{
 for(const alter of [l=>{l[1].colors.secondary=config.secondaryColor},l=>{l[1].accessories=[...config.accessories]},l=>{l[2].colors.primary=config.primaryColor},l=>{l[2].accessories=['invented-crown']}]){
  const looks=samples(config).looks;alter(looks);const out=await run(looks);assert.equal(out.body.mode,'sample');assert.match(out.body.message,/Gợi ý mẫu/);
 }
});
test('offline variants render distinct palettes for every garment, with valid accessory choices',()=>{
 for(const g of garments){const input={...config,garmentId:g.id,occasion:g.occasions[0],primaryColor:g.color,accessories:g.accessories.slice(0,2)};const [a,b,c]=samples(input).looks;
 assert.equal(a.colors.primary,input.primaryColor);assert.ok(colorDistance(b.colors.secondary,a.colors.secondary)>=35);assert.ok(colorDistance(c.colors.primary,a.colors.primary)>=80);assert.ok(colorDistance(c.colors.primary,c.colors.secondary)>=120);
 for(const look of [b,c])assert.ok(look.accessories.every(id=>g.accessories.includes(id)));
 }
});
