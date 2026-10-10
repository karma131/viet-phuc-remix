import {useId} from 'react';
import type {Garment} from '../types';
import {GarmentLayers,garmentProfiles} from './GarmentLayers';
import {AvatarPortrait,avatarProfiles} from './AvatarPortrait';
export type PreviewLayers={avatar?:boolean;garment?:boolean;patterns?:boolean;accessories?:boolean};
type Props={garment:Garment;primary:string;secondary?:string;accent?:string;accessories?:string[];avatar?:number;layers?:PreviewLayers;display?:'avatar'|'garment'};
export function AvatarPreview({garment,primary,secondary='#FFF8EB',accent='#D5AD62',accessories=[],avatar=0,layers={},display='avatar'}:Props){
 const key=useId().replace(/:/g,'');const p=garmentProfiles[garment.id];const profile=avatarProfiles[avatar]||avatarProfiles[0];const skin=profile.skin;
 const shadow=/^#[0-9a-f]{6}$/i.test(primary)?'#'+[1,3,5].map(i=>Math.round(parseInt(primary.slice(i,i+2),16)*.82).toString(16).padStart(2,'0')).join(''):primary;
 const showAvatar=display==='avatar'&&layers.avatar!==false;
 const leftHand=p.wide?'translate(-5 43)':['ao-dai-cach-tan','khmer'].includes(garment.id)?'translate(14 -39)':undefined;
 const rightHand=p.wide?'translate(12 45)':['ao-dai-cach-tan','khmer'].includes(garment.id)?'translate(-14 -39)':undefined;
 const active=(id:string)=>layers.accessories!==false&&accessories.includes(id);
 const headwear=active('non-la')||active('khan-dong');
 return <svg className={'avatar-svg '+(display==='garment'?'garment-illustration':'')} viewBox={display==='garment'?'35 86 290 400':'0 0 360 520'} role="img" aria-label={`Minh họa ${garment.name}`} data-profile={garment.id} xmlns="http://www.w3.org/2000/svg">
 <title>{garment.name}</title><desc>{p.note}. Minh họa cách điệu để tìm hiểu cấu trúc, không phải phục dựng.</desc>
 <defs><linearGradient id={key+'cloth'} x1="0" x2="1"><stop stopColor={primary}/><stop offset=".55" stopColor={primary}/><stop offset="1" stopColor={shadow}/></linearGradient><pattern id={key+'flower'} width="43" height="58" patternUnits="userSpaceOnUse"><g stroke={accent} fill="none" strokeWidth=".7"><path d="M22 11q-15-12-11 5q-13 5 1 11q-3 15 10 7q12 8 10-7q14-6 1-11q4-17-11-5Z"/><circle cx="22" cy="22" r="3"/><path d="M22 34q-9 12 4 23"/></g></pattern></defs>
 <ellipse cx="182" cy={display==='garment'?479:499} rx="88" ry="6" fill="#39201c" opacity=".08"/>
 <g data-avatar-profile={profile.id} transform={display==='avatar'?profile.transform:undefined}>
 {showAvatar&&<g data-layer="avatar">
 <path d="M145 448L142 484Q123 489 117 499Q147 504 170 494L175 449M190 449L197 488Q199 498 208 499Q224 503 243 495Q232 485 219 483L215 447" fill="#4d302a"/>
 <defs><clipPath id={key+'headwearClip'}><rect x="100" y={active('non-la')?43:32} width="170" height="170"/></clipPath></defs>
 <g data-headwear-fit={headwear?'clipped':'natural'} clipPath={headwear?`url(#${key}headwearClip)`:undefined}><AvatarPortrait avatar={profile.id} skin={skin}/></g>
 <g fill={skin}><path transform={leftHand} d="M80 235l30 15l-18 24q-12 14-20 2q-6-8 0-22Z"/><path transform={rightHand} d="M246 250l28-15l13 31q5 16-7 18q-12 1-18-14Z"/></g></g>}
 <GarmentLayers garment={garment} primary={primary} secondary={secondary} accent={accent} clothId={key+'cloth'} patternId={key+'flower'} clipId={key+'garmentClip'} patterns={layers.patterns!==false} visible={layers.garment!==false}/>
 <g data-layer="accessories">
 {active('pearl')&&<g data-accessory="pearl" fill={secondary}><circle cx="147" cy="82" r="3"/><circle cx="214" cy="82" r="3"/></g>}
 {active('silver')&&<g data-accessory="silver" stroke={accent} fill="none"><circle cx="146" cy="83" r="5"/><circle cx="215" cy="83" r="5"/></g>}
 {active('non-la')&&<g data-accessory="non-la"><path d="M111 43L182 0l77 43q-71 13-148 0" fill="#e4c893" stroke={accent}/><path d="M131 40L182 6l52 34M151 43l31-37l29 38" stroke="#b69760" fill="none"/></g>}
 {active('khan-dong')&&<g data-accessory="khan-dong"><ellipse cx="182" cy="24" rx="45" ry="16" fill={accent}/><path d="M141 24q40 12 82 0m-80 6q38 10 78 0" stroke={primary} fill="none"/></g>}
 {active('silk')&&<path data-accessory="silk" d="M151 118q-18 20 6 39l-26 159l20 8l28-165q24-12 21-38" fill={accent} opacity=".9"/>}
 {['mini','woven','embroidered'].filter(active).map((id,i)=><g key={id} data-accessory={id} transform={`translate(${i*17} ${i*15})`} stroke={accent}><path d="M270 273q-21-40-32 4" fill="none" strokeWidth="3"/><rect x="232" y="274" width="45" height="43" rx={id==='mini'?6:2} fill={id==='woven'?'#c3a16d':accent}/>{id==='embroidered'?<path d="M254 281l10 12l-10 15l-10-15Z" stroke={secondary} fill="none"/>:id==='woven'?<path d="M238 282h33m-33 8h33m-33 8h33M243 277v35m10-35v35m10-35v35" stroke={secondary} opacity=".6"/>:<path d="M251 289h9v6h-9Z" fill={secondary}/>}</g>)}
 {active('fan')&&<g data-accessory="fan" transform={leftHand}><path d="M80 265l-33-59q34-26 70 2Z" fill={secondary} stroke={accent}/><path d="M80 265l-15-68m15 68l14-67m-14 67l-32-60m32 60l36-58" stroke={accent}/></g>}
 {active('pin')&&<path data-accessory="pin" d="M198 27l31-6m-12-7l8 14" stroke={accent} strokeWidth="3"/>}
 {active('necklace')&&<path data-accessory="necklace" d="M154 117q25 34 51 0" stroke={accent} strokeWidth="3" fill="none"/>}
 {active('belt')&&<path data-accessory="belt" d="M137 241h85v12h-85l46 11l-9 66" fill={accent} stroke={accent} strokeWidth="3"/>}
 {['flat','mary-jane','sandals'].filter(active).map((id,i)=><g data-accessory={id} key={id} transform={`translate(0 ${i*3})`} fill={accent}><path d="M142 483l26 3l-3 11q-25 5-47 1Z"/><path d="M199 484l19 0l22 12q-21 7-38 1Z"/>{id==='mary-jane'&&<path d="M151 481l10 6M206 481l9 6" stroke={secondary} strokeWidth="3"/>}{id==='sandals'&&<path d="M129 493l19-9m-8 14l20-11M208 485l15 10m-5-9l14 9" stroke={secondary} strokeWidth="2"/>}</g>)}
 </g></g></svg>;
}
