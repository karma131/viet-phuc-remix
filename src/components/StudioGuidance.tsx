import {useEffect,useState} from 'react';
import type {Config,Garment,Look} from '../types';
import {accessories} from '../data/options';
import {entries,SourceLink} from './CulturalContent';
import {paletteGuidance,suggestGarments} from '../utils/styleGuidance';

export function EventDiscovery({garments,occasion,onChoose}:{garments:Garment[];occasion:string;onChoose:(g:Garment,event:string)=>void}){
 const [event,setEvent]=useState(occasion),[weather,setWeather]=useState('mild');
 useEffect(()=>setEvent(occasion),[occasion]);
 const suggested=suggestGarments(garments,event,weather);
 return <section className="demo-guidance event-discovery"><h3>Bắt đầu từ sự kiện</h3><p>Chọn dịp sử dụng để tìm dáng áo, hoặc tiếp tục phối trang phục hiện tại.</p><div className="guidance-fields"><label>Sự kiện<select value={event} onChange={e=>setEvent(e.target.value)}>{[...new Set(garments.flatMap(g=>g.occasions))].map(o=><option key={o}>{o}</option>)}</select></label><label>Thời tiết bạn dự kiến<select value={weather} onChange={e=>setWeather(e.target.value)}><option value="mild">Ôn hòa / trong nhà</option><option value="hot">Nóng</option><option value="cool">Se lạnh</option><option value="rain">Có mưa</option></select></label></div><p className="muted">{weather==='hot'?'Ưu tiên chất liệu thoáng, nhẹ; cân nhắc tay và độ dài phù hợp.':weather==='cool'?'Chọn chất liệu giữ ấm vừa phải và lớp mặc trong phù hợp.':weather==='rain'?'Ưu tiên địa điểm có mái che; bảo vệ tà dài và giày khỏi nước.':'Cân nhắc chất liệu theo địa điểm và thời gian sử dụng.'} Đây là gợi ý tham khảo theo thời tiết bạn chọn, không phải dự báo trực tiếp.</p><div className="option-chips">{suggested.map(g=><button key={g.id} onClick={()=>onChoose(g,event)}>{g.name}</button>)}</div></section>;
}

export function GarmentContext({garment}:{garment:Garment}){
 const entry=entries[garment.id];
 return <section className="demo-guidance garment-context"><h3>Hiểu chiếc áo bạn chọn</h3><p><strong>{garment.name}</strong> · {garment.region} · {garment.period}</p><p>{entry.origin}</p><p>{entry.context}</p><details><summary>Nguồn tham khảo & phạm vi tư liệu</summary><SourceLink id={entry.source}/><p className="muted">{entry.scope}</p></details><a className="text-button" href={'#/garment/'+garment.id}>Khám phá câu chuyện chiếc áo →</a></section>;
}

export function PaletteCheck({config}:{config:Config}){
 const guidance=paletteGuidance(config.primaryColor,config.secondaryColor);
 return <div className="demo-guidance palette-check" aria-live="polite"><strong>Kiểm tra hòa sắc · {guidance.title}</strong><p>{guidance.text}</p><small>Gợi ý thẩm mỹ từ bảng màu; không xác định ý nghĩa văn hóa của màu sắc.</small></div>;
}

export function OutfitComparison({looks}:{looks:Look[]}){
 if(looks.length<2)return null;
 const accessoryText=(ids:string[])=>ids.map(id=>accessories.find(a=>a.id===id)?.name||id).join(' · ')||'Không thêm phụ kiện';
 return <section className="comparison" aria-label="So sánh bản phối"><h3>So sánh các bản phối đã chọn</h3><div className="comparison-scroll"><table><thead><tr><th>Điểm so sánh</th>{looks.map(l=><th key={l.id}>{l.name}</th>)}</tr></thead><tbody><tr><th>Phong cách</th>{looks.map(l=><td key={l.id}>{l.style}</td>)}</tr><tr><th>Bảng màu</th>{looks.map(l=><td key={l.id}><div className="mini-swatches">{Object.values(l.colors).map((color,i)=><span key={i} style={{background:color}} title={color}/>)}</div>{Object.values(l.colors).join(' / ')}</td>)}</tr><tr><th>Phụ kiện</th>{looks.map(l=><td key={l.id}>{accessoryText(l.accessories)}</td>)}</tr><tr><th>Lý do phối</th>{looks.map(l=><td key={l.id}>{l.stylingReason}</td>)}</tr><tr><th>Ngữ cảnh văn hóa</th>{looks.map(l=><td key={l.id}>{l.culturalStatus==='appropriate'?'Phù hợp':l.culturalStatus==='consider'?'Cần cân nhắc':'Không khuyến nghị'}{l.culturalWarning&&<p>{l.culturalWarning}</p>}</td>)}</tr></tbody></table></div></section>;
}
