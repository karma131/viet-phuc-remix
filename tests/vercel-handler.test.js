import test from 'node:test';
import assert from 'node:assert/strict';
import {postHandler} from '../server/vercel-handler.js';
import health from '../api/health.js';

function response(){return {headers:{},setHeader(k,v){this.headers[k]=v;return this;},status(n){this.code=n;return this;},json(body){this.body=body;return this;}};}
test('Vercel adapters pass body and service status without starting a listener',async()=>{
 const res=response();const input={garmentId:'ao-dai'};
 await postHandler(async(body,env)=>{assert.equal(body,input);assert.equal(env,process.env);return {status:422,body:{error:'invalid'}};})({method:'POST',body:input},res);
 assert.equal(res.code,422);assert.equal(res.body.error,'invalid');assert.equal(res.headers['Cache-Control'],'no-store');
});
test('Vercel adapter rejects wrong method, malformed JSON and oversized input before calling service',async()=>{
 let calls=0;const handler=postHandler(async()=>{calls++;});
 for(const [req,code] of [[{method:'GET'},405],[{method:'POST',get body(){throw new Error('bad json');}},400],[{method:'POST',body:{text:'x'.repeat(41000)}},413]]){
  const res=response();await handler(req,res);assert.equal(res.code,code);
 }
 assert.equal(calls,0);
});
test('Vercel adapter never exposes internal exception details',async()=>{
 const res=response();await postHandler(async()=>{throw new Error('private key');})({method:'POST',body:{}},res);
 assert.equal(res.code,500);assert.equal(JSON.stringify(res.body).includes('private key'),false);
});
test('health endpoint reports configuration flags without secret values',()=>{
 const res=response();health({method:'GET'},res);assert.equal(res.code,200);assert.equal(typeof res.body.openai,'boolean');assert.equal('OPENAI_API_KEY' in res.body,false);
 const denied=response();health({method:'POST'},denied);assert.equal(denied.code,405);
});
