export const purposes=['original','elegant','creative'];
export const avatarDescription=id=>['Female model with long side-parted hair','Tall female model with hair in a bun','Petite female model with a short bob haircut','Male model with short hair and broad shoulders'][id]||'Female model with long side-parted hair';
const rgb=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
export const colorDistance=(a,b)=>Math.hypot(...rgb(a).map((v,i)=>v-rgb(b)[i]));
const sameSet=(a,b)=>JSON.stringify([...new Set(a)].sort())===JSON.stringify([...new Set(b)].sort());

// Lock garment geometry and original selections; AI owns only the variant palette/accessories.
export function finalizeVariant(look,config,garment,index){
 const base={primary:config.primaryColor,secondary:config.secondaryColor,accessory:config.accessoryColor||'#D5AD62'};
 look.id=crypto.randomUUID();look.purpose=purposes[index];
 look.avatar=config.avatar??0;look.patternEnabled=config.patternEnabled??true;
 look.occasion=config.occasion;look.style=index===0?config.style:index===1?'Thanh lịch':'Nghệ thuật';
 if(index===0){look.name='Bản gốc của bạn';look.colors=base;look.accessories=[...config.accessories];look.stylingReason='Giữ nguyên trang phục, màu sắc, phụ kiện và họa tiết bạn đã chọn.';}
 else {
  look.colors.accessory??=base.accessory;
  look.accessories=[...new Set(look.accessories)];
  if(look.accessories.some(id=>!garment.accessories.includes(id)))throw new Error('Unsupported variant accessory');
  if(index===1){look.colors.primary=base.primary;
   if(colorDistance(look.colors.secondary,base.secondary)<35||sameSet(look.accessories,config.accessories))throw new Error('Elegant variant is not distinct');
  }else if(colorDistance(look.colors.primary,base.primary)<80||colorDistance(look.colors.primary,look.colors.secondary)<120)throw new Error('Creative variant lacks contrast');
 }
 look.changes=[];
 for(const field of ['primary','secondary','accessory'])if(base[field].toLowerCase()!==look.colors[field].toLowerCase())look.changes.push({field,from:base[field],to:look.colors[field]});
 if(!sameSet(config.accessories,look.accessories))look.changes.push({field:'accessories',from:config.accessories.join(','),to:look.accessories.join(',')});
 look.imagePrompt=`Realistic full-length fashion illustration of ${garment.name}. ${avatarDescription(look.avatar)}. Primary ${look.colors.primary}, secondary ${look.colors.secondary}, accessory ${look.colors.accessory}. Only accessories: ${look.accessories.join(', ')||'none'}. Decorative pattern: ${look.patternEnabled?'subtle non-ceremonial design where appropriate':'none'}. Keep ${garment.features.join(', ')}. ${garment.constraint}`;
 return look;
}

// Offline suggestions are explicitly labeled samples, never attributed to GPT.
export function sampleProposals(config,garment){
 const palette=['#FFF8EB','#354660','#EAD9BB','#A32930','#65816E','#73567E'];
 const secondary=palette.find(c=>colorDistance(c,config.secondaryColor)>=35);
 const primary=palette.find(c=>colorDistance(c,config.primaryColor)>=80);
 const contrast=palette.find(c=>colorDistance(c,primary)>=120);
 const available=garment.accessories;
 let elegant=available.filter(a=>['pearl','fan','flat','pin'].includes(a)).slice(0,2);
 if(sameSet(elegant,config.accessories))elegant=available.filter(a=>!config.accessories.includes(a)).slice(0,2);
 if(sameSet(elegant,config.accessories)&&available.length)elegant=[available[0]];
 const creative=available.filter(a=>!elegant.includes(a)).slice(0,2);
 return [{colors:{primary:config.primaryColor,secondary:config.secondaryColor,accessory:config.accessoryColor||'#D5AD62'},accessories:[...config.accessories]},
 {colors:{primary:config.primaryColor,secondary,accessory:'#B68A49'},accessories:elegant},
 {colors:{primary,secondary:contrast,accessory:'#C99535'},accessories:creative}];
}
