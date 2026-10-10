import test from 'node:test';
import assert from 'node:assert/strict';
import {generateOutfit,visualizeOutfit,aiHealth} from '../server/service.js';
import {samples} from '../server/logic.js';
import {jsonSchema} from '../server/schema.js';
const config={garmentId:'ao-dai',occasion:'Tết Nguyên đán',style:'Thanh lịch',primaryColor:'#A32930',secondaryColor:'#FFF8EB',accessories:['pearl']};
const mockOutput=(input=config)=>({status:'completed',output:[{type:'message',content:[{type:'output_text',text:JSON.stringify({looks:samples(input).looks})}]}]});

test('OpenAI key is required; a legacy Google key never enables requests',async()=>{
 const output=await generateOutfit(config,{GEMINI_API_KEY:'legacy-key'});
 assert.equal(output.body.mode,'sample');assert.match(output.body.message,/OpenAI/);
 assert.deepEqual(aiHealth({OPENAI_API_KEY:'test'}),{ok:true,provider:'openai',openai:true,image:false});
});
test('Responses request uses strict structured output and keeps credentials out of returned looks',async()=>{
 let calls=0;
 const result=await generateOutfit(config,{OPENAI_API_KEY:'test-secret',OPENAI_MODEL:'gpt-4.1-mini'},{fetchImpl:async(url,request)=>{
  calls++;assert.equal(url,'https://api.openai.com/v1/responses');assert.equal(request.headers.Authorization,'Bearer test-secret');
  const body=JSON.parse(request.body);assert.equal(body.store,false);assert.equal(body.text.format.strict,true);assert.equal(body.model,'gpt-4.1-mini');assert.equal(body.text.format.schema.additionalProperties,false);
  return Response.json(mockOutput());
 }});
 assert.equal(calls,1);assert.equal(result.body.mode,'openai');assert.equal(result.body.looks.length,3);assert.ok(!JSON.stringify(result.body).includes('test-secret'));
});
test('invalid API credentials fall back once without retrying or leaking provider messages',async()=>{
 let calls=0;const result=await generateOutfit(config,{OPENAI_API_KEY:'secret'},{fetchImpl:async()=>{calls++;return Response.json({error:{message:'secret'}},{status:401})}});
 assert.equal(calls,1);assert.equal(result.body.mode,'sample');assert.match(result.body.message,/key chưa hợp lệ/);assert.ok(!JSON.stringify(result.body).includes('secret'));
});
test('rate limits retry once, then return labeled samples',async()=>{
 let calls=0;const result=await generateOutfit(config,{OPENAI_API_KEY:'test'},{fetchImpl:async()=>{calls++;return Response.json({}, {status:429})}});
 assert.equal(calls,2);assert.equal(result.body.mode,'sample');assert.match(result.body.message,/giới hạn/);
});
test('mismatched garment output is rejected and cultural warnings cannot be downgraded',async()=>{
 const invalid=mockOutput();const parsed=JSON.parse(invalid.output[0].content[0].text);parsed.looks[0].garmentId='mong';invalid.output[0].content[0].text=JSON.stringify(parsed);
 const bad=await generateOutfit(config,{OPENAI_API_KEY:'test'},{fetchImpl:async()=>Response.json(invalid)});assert.equal(bad.body.mode,'sample');
 const input={...config,garmentId:'ngu-than',occasion:'Tết Nguyên đán',accessories:[]};const result=mockOutput(input);const looks=JSON.parse(result.output[0].content[0].text);for(const look of looks.looks){look.culturalStatus='appropriate';look.culturalWarning=null;}result.output[0].content[0].text=JSON.stringify(looks);
 const guarded=await generateOutfit(input,{OPENAI_API_KEY:'test'},{fetchImpl:async()=>Response.json(result)});assert.equal(guarded.body.mode,'openai');assert.ok(guarded.body.looks.every(l=>l.culturalStatus==='consider'&&l.culturalWarning&&l.culturalNote.includes('cần rà soát')));
});
test('every object in the strict response schema has all properties required and no additional properties',()=>{
 const walk=(schema)=>{if(schema.type==='object'){assert.equal(schema.additionalProperties,false);assert.deepEqual([...schema.required].sort(),Object.keys(schema.properties).sort());Object.values(schema.properties).forEach(walk)}if(schema.type==='array')walk(schema.items)};walk(jsonSchema);
});
test('fashion visualization uses a separate OpenAI image endpoint and remains opt-in',async()=>{
 const look=samples(config).looks[0];const off=await visualizeOutfit(look,{OPENAI_API_KEY:'test'});assert.equal(off.status,503);
 const result=await visualizeOutfit(look,{OPENAI_API_KEY:'test',OPENAI_IMAGE_MODEL:'image-model'},{fetchImpl:async(url,request)=>{assert.equal(url,'https://api.openai.com/v1/images/generations');assert.equal(JSON.parse(request.body).model,'image-model');return Response.json({data:[{b64_json:'aW1hZ2U='}]})}});
 assert.equal(result.body.image,'data:image/png;base64,aW1hZ2U=');
});
