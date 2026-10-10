import {useId} from 'react';
import type {Garment} from '../types';
export function AvatarPreview({garment,primary,secondary='#FFF8EB',accent='#D5AD62',accessories=[],avatar=0}:{garment:Garment;primary:string;secondary?:string;accent?:string;accessories?:string[];avatar?:number}){
 const key=useId().replace(/:/g,''); const s=garment.silhouette;const skin=['#edc2a0','#bc805d','#e1ae88'][avatar];const wide=['tac','nhat','giao','vien','doi'].includes(s); const short=s==='baba';
 return <svg className="avatar-svg" viewBox="0 0 360 520" role="img" aria-label={`Minh họa ${garment.name}`} xmlns="http://www.w3.org/2000/svg">
 <defs><linearGradient id={key+'cloth'} x1="0" x2="1"><stop stopColor={primary}/><stop offset=".5" stopColor={primary}/><stop offset="1" stopColor="#000" stopOpacity=".18"/></linearGradient><pattern id={key+'flower'} width="43" height="58" patternUnits="userSpaceOnUse"><g stroke={accent} fill="none" opacity=".48" strokeWidth=".7"><path d="M22 11q-15-12-11 5q-13 5 1 11q-3 15 10 7q12 8 10-7q14-6 1-11q4-17-11-5Z"/><circle cx="22" cy="22" r="3"/><path d="M22 34q-9 12 4 23M24 46q12-7 12-1q-4 5-11 4"/></g></pattern></defs>
 <ellipse cx="182" cy="490" rx="91" ry="10" fill="#39201c" opacity=".12"/>
 <path d="M145 429l-3 54q-19 7-25 15q30 7 51-4l7-60M189 434l8 53q1 9 7 11q24 5 36-3q-6-10-22-13l-8-52" fill="#4d302a"/>
 <path d="M143 263l-15 206q23 13 47 0l7-143l8 146q24 10 44-2l-22-206" fill={secondary} stroke="#6d4935" strokeOpacity=".3"/>
 <path d="M135 115q-21 10-29 29l-38 100q-3 10 8 18q13 4 18-10l46-85M220 115q19 10 27 33l33 97q5 15-8 19q-10 2-15-11l-40-87" fill={skin}/>
 <path d="M153 96v27l27 24l24-26V95" fill={skin}/>
 <path d="M137 57q-3-41 44-43q42-1 43 40l-1 46q20 19 5 63l-31-29l-46 10q-22-23-12-53Z" fill="#302622"/>
 <path d="M148 53q1-21 34-22q28 2 31 22v27q-3 27-31 32q-31-8-34-33Z" fill={skin}/>
 <path d="M144 61q17-5 22-29q23 23 48 25q8-33-29-36q-45-6-41 40" fill="#302622"/>
 <path d="M157 64q7-4 14 0m19 0q7-4 14 0" stroke="#392b27" strokeWidth="1.3" fill="none"/><path d="M158 69q6 4 11 0m23 0q5 4 10 0" stroke="#392b27" strokeWidth="1.1" fill="none"/><path d="M180 72l-3 12h5" stroke="#aa725b" fill="none"/><path d="M174 91q8 5 16-1q-9-3-16 1" fill="#aa514b"/>
 {s==='static'?<g><rect x="100" y="174" width="160" height="238" rx="80" fill={primary} opacity=".14"/><path d="M139 197l42-27l43 27l-7 137h-72Z" stroke={accent} fill="none" strokeWidth="2"/><text x="180" y="363" textAnchor="middle" fill="#6b4d34" fontSize="11">TƯ LIỆU ĐANG BỔ SUNG</text></g>:<g>
 <path d={s==='ngu'?'M143 113l-28 15l-35 105l29 14l32-86l-12 271q48 19 100 0l-13-271l32 86l29-14l-36-105l-28-15l-35 16Z':wide?'M143 113l-30 13l-51 146l56 24l31-110l-22 270q54 23 110-1l-27-269l32 113l56-23l-50-149l-34-15l-32 13Z':short?'M144 114l-24 13l-37 103l28 14l30-78l-17 119q52 14 111-1l-20-118l31 80l28-16l-38-103l-24-13l-32 16Z':'M144 114l-26 14l-38 107l30 15l33-88l-11 84l-28 193q40 22 76 8q40 12 77-9l-32-192l-12-84l33 88l28-15l-37-107l-25-14l-33 15Z'} fill={`url(#${key}cloth)`} stroke="#6c4631" strokeWidth=".8"/>
 <path d={s==='ngu'?'M142 147l-10 281q45 18 94 0l-12-281Z':short?'M141 145l-15 136q57 14 106 0l-19-135Z':'M142 147l-7 97l-26 191q33 18 69 9q45 13 74-8l-29-192l-11-97Z'} fill={`url(#${key}flower)`}/>
 {s==='tu'||s==='doi'?<><path d="M170 123l-19 120l-30 190l41 11l19-219l22 221l43-12l-31-194l-24-116" fill={secondary}/><path d="M151 241q33 12 67 0l3 15q-37 12-74 0Z" fill={accent}/><path d="M176 251q-6 51-22 69l16 10l20-71l19 83l16-9l-21-77" fill={accent}/></>:s==='nhat'?<><path d="M145 119l14 82h44l16-82l-21 9l-6 53h-22l-8-53Z" fill={accent}/><path d="M149 126l13 61h36l13-61" fill="none" stroke={secondary} strokeWidth="3"/></>:s==='giao'?<><path d="M147 116l67 91l-11 18l-64-99m68-10l-66 100" fill="none" stroke={secondary} strokeWidth="10"/><path d="M139 242h82v14h-82" fill={accent}/></>:s==='vien'?<path d="M153 120q24 27 53 0" fill="none" stroke={accent} strokeWidth="6"/>:<><path d="M160 113v-10q20-8 40 0v12l-20 15Z" fill={primary} stroke={accent} strokeWidth="1.5"/><path d={short?'M180 130v151':'M180 130q24 0 29 27v87'} fill="none" stroke={accent} strokeWidth="1"/>{[0,1,2,3,4].map(i=><circle key={i} cx={short?180:202+i*1.4} cy={short?143+i*24:143+i*18} r="2" fill={accent}/>)}</>}
 <path d={short?'M149 178l-8 80m64-80l14 78':'M155 250l-24 172m71-169l25 173m-44-164l-3 168'} stroke={secondary} opacity=".2" strokeWidth="2" fill="none"/>
 </g>}
 <path d="M79 241q-16 10-7 28q7 8 14-3l4-12M274 243q14 8 7 27q-8 10-15-3l-4-12" fill={skin}/>
 {accessories.includes('pearl')&&<g fill={secondary}><circle cx="147" cy="82" r="3"/><circle cx="214" cy="82" r="3"/></g>}
 {accessories.includes('silver')&&<g stroke={accent} fill="none"><circle cx="146" cy="83" r="5"/><circle cx="215" cy="83" r="5"/></g>}
 {accessories.includes('non-la')&&<g><path d="M111 43L182 0l77 43q-71 13-148 0" fill="#e4c893" stroke={accent}/><path d="M131 40L182 6l52 34M151 43l31-37l29 38" stroke="#b69760" fill="none"/></g>}
 {accessories.includes('khan-dong')&&<g><ellipse cx="182" cy="24" rx="45" ry="16" fill={accent}/><path d="M141 24q40 12 82 0m-80 6q38 10 78 0" stroke={primary} fill="none"/></g>}
 {accessories.includes('silk')&&<path d="M151 118q-18 20 6 39l-26 159l20 8l28-165q24-12 21-38" fill={accent} opacity=".85"/>}
 {accessories.some(x=>['mini','woven','embroidered'].includes(x))&&<g stroke={accent}><path d="M270 273q-21-40-32 4" fill="none" strokeWidth="3"/><rect x="232" y="274" width="45" height="43" rx="6" fill={accent}/><path d="M238 282h33m-33 8h33m-33 8h33" stroke={secondary} opacity=".5"/></g>}
 {accessories.includes('fan')&&<g><path d="M80 265l-33-59q34-26 70 2Z" fill={secondary} stroke={accent}/><path d="M80 265l-15-68m15 68l14-67m-14 67l-32-60m32 60l36-58" stroke={accent}/></g>}
 {accessories.includes('pin')&&<path d="M198 27l31-6m-12-7l8 14" stroke={accent} strokeWidth="3"/>}
 {accessories.includes('necklace')&&<path d="M154 117q25 34 51 0" stroke={accent} strokeWidth="3" fill="none"/>}
 {accessories.includes('belt')&&<path d="M137 241h85v12h-85l46 11l-9 66" fill={accent} stroke={accent} strokeWidth="3"/>}
 {accessories.some(x=>['flat','mary-jane','sandals'].includes(x))&&<g fill={accent}><path d="M142 483l26 3l-3 11q-25 5-47 1Z"/><path d="M199 484l19 0l22 12q-21 7-38 1Z"/></g>}
 </svg>
}


