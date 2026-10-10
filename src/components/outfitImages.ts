import type {Look} from '../types';
let capability:Promise<boolean>|undefined;
const images=new Map<string,Promise<string>>();
export function imageCapability(){return capability??=fetch('/api/health').then(r=>{if(!r.ok)throw new Error('Health unavailable');return r.json()}).then(out=>!!out.image).catch(()=>{capability=undefined;return false})}
export function generateLookImage(look:Look,retry=false){
 const {image:storedImage,...payload}=look;
 if(retry)images.delete(look.id);
 let image=images.get(look.id);
 if(!image){image=fetch('/api/visualize',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(95000)}).then(async r=>{const out=await r.json();if(!r.ok)throw new Error(out.error||'Không thể tạo ảnh');if(!/^data:image\/(png|jpeg|webp);base64,/.test(out.image))throw new Error('Ảnh không hợp lệ');return out.image as string});images.set(look.id,image);if(images.size>50)images.delete(images.keys().next().value!)}
 return image;
}
