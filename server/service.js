import {GoogleGenAI} from '@google/genai';
import {inputSchema,resultSchema,lookSchema,garments,guard,samples} from './logic.js';
import {jsonSchema} from './schema.js';
let active=0;
export async function generateOutfit(body,env){
 const parsed=inputSchema.safeParse(body);
 if(!parsed.success)return {status:400,body:{error:'Vui lòng kiểm tra trang phục, dịp sử dụng và màu sắc.'}};
 const config=parsed.data;
 if(!env.GEMINI_API_KEY)return {status:200,body:samples(config)};
 if(active>=5)return {status:429,body:{error:'Studio đang bận. Vui lòng thử lại sau.'}};
 active++;
 try{
  const g=garments.find(x=>x.id===config.garmentId),check=guard(config);
  const ai=new GoogleGenAI({apiKey:env.GEMINI_API_KEY});let response;
  for(let attempt=0;attempt<2;attempt++){
   try{response=await ai.models.generateContent({model:env.GEMINI_MODEL||'gemini-2.5-flash',contents:JSON.stringify({task:'Tạo đúng 3 outfit khác nhau. Toàn bộ văn bản tiếng Việt. Chỉ dùng dữ kiện đã cung cấp, không bịa lịch sử, nguồn hoặc ý nghĩa hoa văn. Khi source=pending, nói rõ cần rà soát. Màu là sáng tạo hiện đại. Phụ kiện trả về bằng ID trong accessories của garment. Không hạ mức cảnh báo guard. imagePrompt giữ cấu trúc, không tuyên bố phục dựng chính xác. Giữ garmentId của đầu vào.',config,garment:g,guard:check}),config:{responseMimeType:'application/json',responseJsonSchema:jsonSchema,httpOptions:{timeout:25000}}});break;}
   catch(e){if(attempt===1)throw e;}
  }
  const output=resultSchema.parse(JSON.parse(response.text));
  if(output.looks.some(l=>l.garmentId!==g.id||l.accessories.some(a=>!g.accessories.includes(a))))throw new Error('Invalid context');
  const rank={appropriate:0,consider:1,not_recommended:2};
  for(const l of output.looks){l.id=crypto.randomUUID();l.colors.accessory??=config.accessoryColor;if(rank[l.culturalStatus]<rank[check.status]){l.culturalStatus=check.status;l.culturalWarning=check.reason;}if(g.source==='pending')l.culturalNote=`Nội dung cần rà soát. ${g.constraint} ${l.culturalNote}`;}
  return {status:200,body:{...output,mode:'gemini',message:'Được tạo bằng Gemini AI'}};
 }catch{return {status:200,body:samples(config,'Gemini chưa phản hồi hợp lệ. Bạn có thể thử lại.')}}
 finally{active--;}
}
export async function visualizeOutfit(body,env){
 if(!env.GEMINI_API_KEY||!env.GEMINI_IMAGE_MODEL)return {status:503,body:{error:'Chưa cấu hình mô hình tạo ảnh. Minh họa tương tác vẫn hoạt động.'}};
 const parsed=lookSchema.safeParse(body);
 if(!parsed.success)return {status:400,body:{error:'Dữ liệu outfit không hợp lệ.'}};
 const g=garments.find(x=>x.id===parsed.data.garmentId);
 if(!g||g.silhouette==='static')return {status:400,body:{error:'Cần mẫu trang phục đã xác minh trước khi tạo ảnh.'}};
 try{
  const ai=new GoogleGenAI({apiKey:env.GEMINI_API_KEY});
  const result=await ai.models.generateContent({model:env.GEMINI_IMAGE_MODEL,contents:`Tạo minh họa thời trang, không phải phục dựng. ${parsed.data.imagePrompt}. Cấu trúc cần giữ: ${g.features.join(', ')}. ${g.constraint}`,config:{responseModalities:['TEXT','IMAGE'],httpOptions:{timeout:45000}}});
  const img=result.candidates?.[0]?.content?.parts?.find(p=>p.inlineData?.mimeType?.startsWith('image/'))?.inlineData;
  if(!img)throw new Error('No image');
  return {status:200,body:{image:`data:${img.mimeType};base64,${img.data}`}};
 }catch{return {status:502,body:{error:'Không thể tạo ảnh lúc này. Hãy dùng minh họa tương tác.'}};}
}
