import {z} from 'zod';
import {finalizeVariant,sampleProposals} from './variants.js';
import garmentRecords from '../src/data/garments.json' with {type:'json'};
export const garments=garmentRecords;
const hex=z.string().regex(/^#[0-9a-f]{6}$/i);
export const inputSchema=z.object({garmentId:z.string().max(50),occasion:z.string().max(80),style:z.enum(['Truyền thống','Tối giản','Hoài cổ','Thanh lịch','Nữ tính dịu dàng','Đường phố kết hợp','Hiện đại tinh tế','Nghệ thuật','Học thuật cổ điển','Sắc màu pastel']),primaryColor:hex,secondaryColor:hex,accessoryColor:hex.default('#D5AD62'),patternEnabled:z.boolean().default(true),avatar:z.number().int().min(0).max(3).default(0),accessories:z.array(z.enum(['non-la','khan-dong','silk','pearl','silver','necklace','pin','embroidered','mini','woven','mary-jane','flat','sandals','fan','belt'])).max(15)}).superRefine((x,ctx)=>{const g=garments.find(g=>g.id===x.garmentId);if(!g)ctx.addIssue({code:'custom',message:'Trang phục không tồn tại'});else if(!g.occasions.includes(x.occasion))ctx.addIssue({code:'custom',message:'Dịp sử dụng không phù hợp với trang phục'});});
export const lookSchema=z.object({id:z.string().max(100),name:z.string().min(1).max(100),garmentId:z.string(),style:z.string().max(80),occasion:z.string().max(80),colors:z.object({primary:hex,secondary:hex,accessory:hex.optional()}),accessories:z.array(z.string().max(70)).max(15),stylingReason:z.string().max(2000),culturalNote:z.string().max(2000),culturalStatus:z.enum(['appropriate','consider','not_recommended']),culturalWarning:z.string().max(1500).nullable(),imagePrompt:z.string().max(3000),patternEnabled:z.boolean().default(true),avatar:z.number().int().min(0).max(3).default(0)});
export const resultSchema=z.object({looks:z.array(lookSchema).length(3)});
export function guard(config){const g=garments.find(x=>x.id===config.garmentId);const unsupported=config.accessories.filter(x=>!g.accessories.includes(x));const fusion=['Đường phố kết hợp','Nghệ thuật'].includes(config.style);const uncertain=!!g.requiresContext;const status=g.category==='Dân tộc'&&fusion?'not_recommended':unsupported.length||fusion||uncertain?'consider':'appropriate';return {status,reason:status==='appropriate'?'Gợi ý giữ phom trang phục; màu và phụ kiện là lựa chọn đương đại.':g.constraint,alternative:g.category==='Dân tộc'?'Chọn mẫu cộng đồng đã xác minh trước khi phối; có thể thử áo dài cách tân để sáng tạo tự do.':'Giữ cấu trúc áo, chọn phong cách Thanh lịch và phụ kiện được gợi ý.',unsupported};}
export function samples(config,reason='Gợi ý cá nhân hóa chưa được thiết lập.'){
 const g=garments.find(x=>x.id===config.garmentId);
 return {mode:'sample',message:`Gợi ý mẫu · ${reason}`,looks:sampleProposals(config,g).map((proposal,i)=>{
  const look=finalizeVariant({...proposal,name:['Bản gốc của bạn','Mẫu phối thanh lịch','Mẫu phối sáng tạo'][i],garmentId:g.id,stylingReason:i===1?'Mẫu tham khảo: giữ màu áo, đổi màu phối và chọn phụ kiện gọn nhẹ.':'Mẫu tham khảo: đổi màu áo và phối sắc tương phản để tạo điểm nhấn.',culturalNote:g.constraint},config,g,i);
  const baseCheck=guard(config),variantCheck=guard({...config,style:look.style,accessories:look.accessories});
  const rank={appropriate:0,consider:1,not_recommended:2};
  const check=rank[baseCheck.status]>rank[variantCheck.status]?baseCheck:variantCheck;
  look.culturalStatus=check.status;look.culturalWarning=check.status==='appropriate'?null:check.reason;
  return look;
 })};
}


