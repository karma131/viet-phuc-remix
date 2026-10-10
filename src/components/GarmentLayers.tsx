import type {Garment} from '../types';

// Front-view teaching drawings: proportions are illustrative, never a reconstruction.
const trousers='M141 255L128 468Q152 480 176 469L181 326L190 471Q212 480 235 469L217 255Z';
const narrowSleeves='M144 115L117 129L80 235L110 250L144 162M212 115L237 129L274 235L246 250L212 162';
const broadSleeves='M144 115L112 129L61 274L118 297L150 180M211 115L247 129L299 274L242 297L209 180';
export const discoveryPalettes:Record<string,{secondary:string;accent?:string}>={
 'tu-than':{secondary:'#38332D'},'ba-ba':{secondary:'#302A27'},mong:{secondary:'#536377',accent:'#c3a37f'},thai:{secondary:'#2D3235'},dao:{secondary:'#303A47',accent:'#a43c38'},muong:{secondary:'#2B3033',accent:'#c7ae85'},cham:{secondary:'#EAD9BB'},khmer:{secondary:'#C6AA71',accent:'#B68A49'},'e-de':{secondary:'#302C2D',accent:'#a54d43'}
};
export const garmentProfiles:Record<string,{body:string;lower:string;sleeves:string;collar:string;note:string;pattern:'floral'|'border'|'plain';wide?:boolean}>= {
 'ao-dai':{body:'M144 115L180 130L212 115L225 246L256 438Q218 456 181 445Q145 461 105 438L133 246Z',lower:trousers,sleeves:narrowSleeves,collar:'stand',note:'Hai tà · quần dài · phom ôm nhẹ',pattern:'floral'},
 'ao-dai-cach-tan':{body:'M143 117Q180 139 213 117L219 245L244 361Q211 377 181 367Q149 382 116 362L139 245Z',lower:trousers,sleeves:'M143 117L119 132L94 202L121 213L145 163M213 117L238 132L263 202L236 213L212 163',collar:'round',note:'Tà ngắn · cổ tròn · diễn giải đương đại',pattern:'floral'},
 'ao-dai-nam':{body:'M142 114L180 129L215 114L228 419Q182 437 131 419L137 177Z',lower:trousers,sleeves:'M142 114L112 130L78 235L110 251L140 165M215 114L247 130L279 235L246 251L215 165',collar:'stand',note:'Áo dài nam đương đại · phom thẳng',pattern:'plain'},
 'ngu-than':{body:'M142 113L179 129L214 113L220 203L230 427Q180 445 129 427L139 203Z',lower:trousers,sleeves:narrowSleeves,collar:'stand',note:'Ngũ thân · tay chẽn · năm khuy',pattern:'plain'},
 'ao-tac':{body:'M143 114L180 130L213 114L231 449Q181 466 126 449L140 209Z',lower:trousers,sleeves:broadSleeves,collar:'stand',note:'Ngũ thân · tay thụng rộng',pattern:'plain',wide:true},
 'tu-than':{body:'M143 115L173 131L160 246L135 435L112 429L135 243ZM213 115L187 131L202 246L230 436L253 429L224 243Z',lower:'M143 221L213 221L228 451Q183 466 134 451Z',sleeves:narrowSleeves,collar:'open',note:'Bốn thân · vạt mở · yếm · dải lưng',pattern:'plain'},
 'ba-ba':{body:'M143 115L180 127L213 115L219 208L234 282Q210 294 181 283Q153 296 126 283L139 208Z',lower:trousers,sleeves:narrowSleeves,collar:'round',note:'Áo ngắn · khuy giữa · hai túi · quần dài',pattern:'plain'},
 'nhat-binh':{body:'M143 114L180 129L214 114L231 453Q180 472 129 453L140 211Z',lower:trousers,sleeves:broadSleeves,collar:'rectangle',note:'Cổ chữ nhật · tay rộng · minh họa nhập môn',pattern:'floral',wide:true},
 'giao-linh':{body:'M143 114L180 139L213 114L231 451Q185 468 128 451L138 214Z',lower:trousers,sleeves:broadSleeves,collar:'cross',note:'Cổ giao nhau · vạt chéo',pattern:'plain',wide:true},
 'vien-linh':{body:'M143 115Q180 143 213 115L225 251L233 437Q179 454 127 437L138 251Z',lower:trousers,sleeves:broadSleeves,collar:'round',note:'Cổ tròn · thân dài · tay rộng cách điệu',pattern:'plain',wide:true},
 'doi-kham':{body:'M142 116L167 125L163 245L145 444L125 438L138 241ZM214 116L192 125L199 245L221 444L241 438L224 241Z',lower:'M155 139L206 139L231 449Q180 460 130 449Z',sleeves:broadSleeves,collar:'open',note:'Hai vạt đối nhau · áo trong riêng',pattern:'plain',wide:true},
 'tay':{body:'M143 115L181 128L213 115L223 220L231 405Q179 419 128 405L138 220Z',lower:trousers,sleeves:narrowSleeves,collar:'stand',note:'Gợi mở áo dài chàm nữ Tày · cần đối chiếu địa phương',pattern:'plain'},
 'mong':{body:'M144 116L179 128L212 116L219 223L208 238L151 238L138 223Z',lower:'M150 235L211 235L264 409Q180 449 96 409Z',sleeves:narrowSleeves,collar:'open',note:'Gợi mở áo ngắn và váy xếp nếp Mông · không đại diện mọi nhóm',pattern:'border'},
 'thai':{body:'M143 116Q180 134 213 116L218 226Q180 239 141 226L139 173Z',lower:'M142 229L216 229L226 463Q180 475 132 463Z',sleeves:narrowSleeves,collar:'round',note:'Gợi mở áo cóm và váy dài nữ Thái · cần xác định nhóm',pattern:'plain'},
 'dao':{body:'M144 115L168 127L160 289L135 349L115 340L137 222ZM211 115L191 127L200 289L225 349L246 340L223 222Z',lower:trousers,sleeves:narrowSleeves,collar:'open',note:'Gợi mở áo khoác, quần và mảng yếm Dao Đỏ',pattern:'border'},
 'muong':{body:'M143 116L173 127L171 221L139 224L138 166ZM213 116L187 127L189 221L220 224L215 166Z',lower:'M143 224L216 224L226 460Q180 476 133 460Z',sleeves:narrowSleeves,collar:'open',note:'Gợi mở áo ngắn và cạp váy nữ Mường',pattern:'border'},
 'cham':{body:'M144 116Q179 130 212 116L216 244L223 414Q180 432 136 414L142 244Z',lower:'M144 252L217 252L230 470Q181 481 131 470Z',sleeves:narrowSleeves,collar:'round',note:'Gợi mở áo dài bít tà và váy nữ Chăm',pattern:'plain'},
 'khmer':{body:'M144 116Q180 136 212 116L219 244Q181 258 140 244L140 179Z',lower:'M142 243L217 243L229 463L193 471L132 460Z',sleeves:'M144 116L120 132L98 187L125 199L144 159M212 116L236 132L260 187L232 199L212 159',collar:'round',note:'Gợi mở áo và sampot nữ Khmer · mảng khăn cách điệu',pattern:'plain'},
 'e-de':{body:'M143 116L180 126L213 116L218 241Q180 252 140 241L137 166Z',lower:'M140 244L217 244L232 450Q181 465 127 450Z',sleeves:narrowSleeves,collar:'round',note:'Gợi mở áo chui đầu và váy quấn nữ Ê Đê',pattern:'border'}
};

export function GarmentLayers({garment,primary,secondary,accent,clothId,patternId,clipId,patterns=true,visible=true}:{garment:Garment;primary:string;secondary:string;accent:string;clothId:string;patternId:string;clipId:string;patterns?:boolean;visible?:boolean}){
 const p=garmentProfiles[garment.id];
 const panels=['tu-than','doi-kham','mong','dao','muong'].includes(garment.id);
 return <>
 <defs><clipPath id={clipId}><path d={p.body}/><path d={p.sleeves}/>{p.pattern==='border'&&<path d={p.lower}/>}</clipPath></defs>
 <g data-layer="garment" data-garment={garment.id} opacity={visible?1:0} stroke="#624535" strokeWidth=".7" strokeLinejoin="round">
  <path data-piece="lower" d={p.lower} fill={secondary}/>
  {panels&&<path data-piece="inner" d="M159 121L181 132L202 121L214 232L180 264L147 232Z" fill={secondary}/>}
  <path data-piece="sleeves" d={p.sleeves} fill={`url(#${clothId})`}/>
  <path data-piece="body" d={p.body} fill={`url(#${clothId})`}/>
  {p.collar==='stand'&&<path d="M160 114V104Q180 95 200 104V114L180 130Z" fill={primary} stroke={accent} strokeWidth="1.3"/>}
  {p.collar==='round'&&<path d="M158 119Q180 142 202 119" fill="none" stroke={accent} strokeWidth="2"/>}
  {p.collar==='rectangle'&&<><path d="M145 116L159 196H203L219 116L199 125L192 179H170L163 126Z" fill={accent}/><path d="M151 124L164 188H197L210 124" fill="none" stroke={secondary} strokeWidth="3"/></>}
  {p.collar==='cross'&&<><path d="M145 117L209 204L196 228L140 132M211 119L153 203" stroke={secondary} strokeWidth="9" fill="none"/><path d="M139 241H222V255H139Z" fill={accent}/></>}
  {['ao-dai','ao-dai-nam','ngu-than','ao-tac','tay'].includes(garment.id)&&<><path d="M180 130Q213 130 214 158V249" fill="none" stroke={accent}/>{[0,1,2,3,4].map(i=><circle key={i} cx={i===0?199:214} cy={i===0?140:153+i*18} r="1.9" fill={accent}/>)}</>}
  {garment.id==='ngu-than'&&<path data-piece="fifth-panel-seam" d="M206 251L214 426M148 252L143 430" fill="none" stroke={accent} strokeOpacity=".5"/>}
  {garment.id==='ba-ba'&&<><path d="M180 128V283M146 231H165V255H144M197 231H216L218 255H197" fill="none" stroke={accent}/>{[145,169,193,217,241,265].map(y=><circle key={y} cx="180" cy={y} r="1.6" fill={accent}/>)}</>}
  {garment.id==='tu-than'&&<><path d="M156 125L180 135L201 125L199 229H159Z" fill={secondary}/><path d="M144 231Q180 241 219 231L222 246Q181 256 141 246Z" fill={accent}/><path d="M174 244L150 337L166 344L184 253L204 348L220 340L193 244Z" fill={accent}/></>}
  {garment.id==='thai'&&[143,158,173,188,203,218].map(y=><path key={y} d={`M174 ${y}h12`} stroke={accent} strokeWidth="2"/>)}
  {garment.id==='mong'&&<g fill="none" stroke={primary} strokeOpacity=".6">{Array.from({length:13},(_,i)=><path key={i} d={`M${151+i*5} 239L${100+i*13} 413`}/>)}</g>}
  {garment.id==='dao'&&<><path d="M158 143H203L215 289Q182 308 147 289Z" fill={secondary}/><path d="M146 118L165 128L151 279M211 118L195 128L209 279" stroke={accent} strokeWidth="6" fill="none"/></>}
  {garment.id==='muong'&&<path d="M142 223H216L219 262H139Z" fill={accent}/>}
  {garment.id==='khmer'&&<><path d="M207 122L214 154L147 247L135 231Z" fill={secondary} stroke={accent}/><path d="M211 249L163 452M214 263L175 458" stroke={primary} opacity=".55" fill="none"/></>}
  {garment.id==='e-de'&&<><path d="M141 229H217V241H141ZM130 433H229V446H130Z" fill={accent}/><path d="M152 124H207" stroke={accent} strokeWidth="3"/></>}
 </g>
 <g data-layer="patterns" clipPath={`url(#${clipId})`} opacity={patterns?1:0} pointerEvents="none">
  {p.pattern==='floral'&&<rect x="55" y="145" width="250" height="320" fill={`url(#${patternId})`} opacity=".65"/>}
  {p.pattern==='border'&&<g stroke={accent} fill="none" opacity=".65">{[238,247,391,400,440].map(y=><path key={y} d={`M95 ${y}H264`} strokeWidth="2"/>)}{Array.from({length:15},(_,i)=><path key={i} d={`M${99+i*11} 403l5 5l-5 5l-5-5Z`}/>)}</g>}
  <path d="M153 286L136 418M206 288L225 421" stroke={secondary} strokeWidth="1" opacity=".2" fill="none"/>
 </g>
 </>;
}
