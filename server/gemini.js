import {jsonSchema} from './schema.js';

export async function fashionImageWithGemini(prompt,env,{fetchImpl=fetch,timeout=90000}={}){
 const response=await fetchImpl(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(env.GEMINI_IMAGE_MODEL)}:generateContent`,{
  method:'POST',headers:{'x-goog-api-key':env.GEMINI_API_KEY,'Content-Type':'application/json'},signal:AbortSignal.timeout(timeout),
  body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{responseModalities:['TEXT','IMAGE']}})
 });
 if(!response.ok)throw new Error('Image request failed');
 const result=await response.json();const candidate=result.candidates?.[0];
 if(candidate?.finishReason!=='STOP')throw new Error('Incomplete image');
 const image=candidate.content?.parts?.find(part=>part.inlineData?.mimeType?.startsWith('image/'))?.inlineData;
 if(!['image/png','image/jpeg','image/webp'].includes(image?.mimeType)||typeof image?.data!=='string'||!image.data||!/^[A-Za-z0-9+/=]+$/.test(image.data))throw new Error('No valid image');
 return `data:${image.mimeType};base64,${image.data}`;
}

export async function recommendWithGemini(config,garment,check,instructions,env,{fetchImpl=fetch,timeout=25000,retries=1}={}){
 const model=env.GEMINI_MODEL||'gemini-2.5-flash';
 const url=`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
 for(let attempt=0;attempt<=retries;attempt++){
  try{
   const response=await fetchImpl(url,{
    method:'POST',headers:{'x-goog-api-key':env.GEMINI_API_KEY,'Content-Type':'application/json'},signal:AbortSignal.timeout(timeout),
    body:JSON.stringify({systemInstruction:{parts:[{text:instructions}]},contents:[{role:'user',parts:[{text:JSON.stringify({config,garment,guard:check})}]}],generationConfig:{responseMimeType:'application/json',responseJsonSchema:jsonSchema,maxOutputTokens:6500}})
   });
   if(!response.ok){const error=new Error('Gemini request failed');error.status=response.status;throw error;}
   const result=await response.json();const candidate=result.candidates?.[0];
   if(candidate?.finishReason!=='STOP')throw new Error('Incomplete Gemini output');
   return candidate.content?.parts?.filter(part=>typeof part.text==='string'&&!part.thought).map(part=>part.text).join('');
  }catch(error){if(attempt===retries||(error.status&&error.status!==429&&error.status<500))throw error;await new Promise(resolve=>setTimeout(resolve,250));}
 }
}
