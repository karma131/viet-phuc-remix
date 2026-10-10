import type {Garment} from '../types';
function channels(hex:string){return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255)}
function hueAndSaturation(hex:string){const [r,g,b]=channels(hex),max=Math.max(r,g,b),min=Math.min(r,g,b),delta=max-min;const hue=delta===0?0:max===r?60*(((g-b)/delta+6)%6):max===g?60*((b-r)/delta+2):60*((r-g)/delta+4);return {hue,saturation:max===0?0:delta/max,lightness:(max+min)/2}}
export function paletteGuidance(primary:string,secondary:string){
 const a=hueAndSaturation(primary),b=hueAndSaturation(secondary),gap=Math.min(Math.abs(a.hue-b.hue),360-Math.abs(a.hue-b.hue));
 if(Math.hypot(...channels(primary).map((v,i)=>v-channels(secondary)[i]))<.15)return {title:'Tông gần nhau',text:'Hai màu khá gần nhau; dùng phụ kiện hoặc chất liệu khác để các lớp trang phục dễ nhận biết.'};
 if(a.saturation<.18||b.saturation<.18||a.lightness>.9||b.lightness>.9)return {title:'Có màu nền trung tính',text:'Một màu tạo nền nhẹ cho màu còn lại. Lặp lại một sắc ở phụ kiện để bản phối có liên kết.'};
 if(gap>=140)return {title:'Tương phản nổi bật',text:'Hai sắc đối nhau tạo điểm nhấn rõ. Nên chọn một màu chủ đạo và dùng màu còn lại với diện tích nhỏ hơn.'};
 if(gap<=45)return {title:'Sắc màu liền kề',text:'Hai sắc gần nhau tạo tổng thể mềm mại. Cân bằng độ sáng và tối để áo, quần và phụ kiện không hòa lẫn.'};
 return {title:'Phối sắc đa dạng',text:'Bảng màu có nhiều sắc độ. Giữ phụ kiện gọn và thử so sánh thêm một phương án có màu nền trung tính.'};
}
export function suggestGarments(garments:Garment[],occasion:string,weather:string){
 const priority=weather==='hot'?['ba-ba','ao-dai-cach-tan','ao-dai']:weather==='cool'?['ngu-than','ao-dai','ao-dai-nam']:weather==='rain'?['ba-ba','ao-dai-cach-tan']:[];
 return garments.filter(g=>g.occasions.includes(occasion)).sort((a,b)=>{const rank=(id:string)=>priority.includes(id)?priority.indexOf(id):priority.length;return rank(a.id)-rank(b.id)}).slice(0,4);
}
