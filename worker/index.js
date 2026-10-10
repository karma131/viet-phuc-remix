import {generateOutfit,visualizeOutfit} from '../server/service.js';
import assets from './assets.generated.js';
const json=(body,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export default {async fetch(request,env){
 const path=new URL(request.url).pathname;
 if(path==='/api/health')return json({ok:true,gemini:!!env.GEMINI_API_KEY,image:!!(env.GEMINI_API_KEY&&env.GEMINI_IMAGE_MODEL)});
 if(path.startsWith('/api/')){
  if(request.method!=='POST')return json({error:'Phương thức không được hỗ trợ.'},405);
  if(!['/api/generate-outfit','/api/visualize'].includes(path))return json({error:'Không tìm thấy chức năng.'},404);
  if(Number(request.headers.get('Content-Length'))>40000)return json({error:'Dữ liệu quá lớn.'},413);
  try{
   const raw=await request.text();if(raw.length>40000)return json({error:'Dữ liệu quá lớn.'},413);
   const body=JSON.parse(raw);const result=await(path==='/api/generate-outfit'?generateOutfit(body,env):visualizeOutfit(body,env));
   return json(result.body,result.status);
  }catch{return json({error:'Không thể xử lý dữ liệu gửi lên.'},400)}
 }
 if(!['GET','HEAD'].includes(request.method))return new Response('Phương thức không được hỗ trợ.',{status:405});
 const file=assets[path==='/'?'/index.html':path];if(!file)return new Response('Không tìm thấy trang.',{status:404});
 const bytes=Uint8Array.from(atob(file.data),c=>c.charCodeAt(0));
 return new Response(request.method==='HEAD'?null:bytes,{headers:{'Content-Type':file.type,'Cache-Control':path.startsWith('/assets/')?'public, max-age=31536000, immutable':'public, max-age=300'}});
}};
