export const avatarProfiles=[
 {id:0,label:'Nhân vật 01',description:'Tóc dài · Dáng cân đối',skin:'#edc2a0',transform:''},
 {id:1,label:'Nhân vật 02',description:'Tóc búi · Dáng cao',skin:'#bc805d',transform:'translate(180 0) scale(1.035 1.025) translate(-180 0)'},
 {id:2,label:'Nhân vật 03',description:'Tóc bob · Dáng nhỏ',skin:'#e1ae88',transform:'translate(180 260) scale(.96 .97) translate(-180 -260)'},
 {id:3,label:'Nhân vật 04 · Nam',description:'Tóc ngắn · Vai rộng',skin:'#d3a17e',transform:'translate(180 0) scale(1.09 1.02) translate(-180 0)'}
];
export function AvatarPortrait({avatar,skin}:{avatar:number;skin:string}){
 const hair='#302622';
 return <g data-avatar-portrait={avatar}>
 <path d="M153 96V127L180 147L204 127V96" fill={skin}/>
 {avatar===0?<>
  <path data-piece="hair" d="M137 57Q134 16 181 14Q223 14 224 54L223 101Q237 124 227 157L200 133L151 144Q131 126 139 91Z" fill={hair}/>
  <path data-piece="face" d="M148 53Q148 30 181 31Q211 31 213 53V79Q210 106 181 112Q148 104 148 79Z" fill={skin}/>
  <path d="M144 61Q161 56 166 32Q189 55 214 57Q222 22 185 21Q140 15 144 61" fill={hair}/>
  <path d="M157 64q7-4 14 0m19 0q7-4 14 0M158 69q6 4 11 0m23 0q5 4 10 0" stroke="#392b27" strokeWidth="1.1" fill="none"/>
 </>:avatar===1?<>
  <path data-piece="hair" d="M145 61Q129 31 149 21Q143 3 166 4Q193-4 209 13Q229 25 218 63L211 97L151 99Z" fill={hair}/>
  <path data-piece="face" d="M147 53Q150 27 182 30Q212 31 214 55L211 86Q205 107 181 114Q156 106 150 86Z" fill={skin}/>
  <path d="M145 57Q150 26 173 24Q173 42 217 50L213 36Q188 15 158 27Z" fill={hair}/>
  <path d="M155 62q8-5 16-1m20 0q8-4 15 2M156 71q7-7 14 0m22 0q7-7 13 0" stroke="#392b27" strokeWidth="1.4" fill="none"/><g fill="#392b27"><circle cx="163" cy="70" r="2"/><circle cx="198" cy="70" r="2"/></g>
  <path d="M153 20q18-6 32 0" stroke="#8d6c4a" fill="none" strokeWidth="2"/>
 </>:avatar===2?<>
  <path data-piece="hair" d="M136 49Q134 13 181 13Q225 14 227 50L231 103Q213 119 201 108L150 110Q135 111 131 100Z" fill={hair}/>
  <path data-piece="face" d="M147 52Q149 32 181 30Q213 32 216 54V80Q210 111 182 113Q150 109 147 80Z" fill={skin}/>
  <path d="M142 57L145 36Q179 16 218 38L221 58L200 50L198 41L196 53L179 52L168 39L166 54Z" fill={hair}/>
  <path d="M155 65q8-3 15 0m22 0q7-3 15 0M156 72q7-5 13 0m24 0q6-5 12 0" stroke="#392b27" strokeWidth="1.2" fill="none"/>
  <g fill="#bb745e" opacity=".3"><ellipse cx="158" cy="85" rx="6" ry="3"/><ellipse cx="205" cy="85" rx="6" ry="3"/></g>
 </>:<>
  <path data-piece="hair" d="M141 61L140 33Q142 10 178 12L200 8Q223 18 222 45L218 68L210 46L150 47L148 68Z" fill={hair}/>
  <path data-piece="face" d="M148 47Q176 30 213 47L215 82L207 101L190 112L172 112L155 101L147 83Z" fill={skin}/>
  <path d="M145 53L148 31Q173 14 211 26L220 49L209 43L195 29Q174 46 145 53Z" fill={hair}/>
  <path d="M155 63l16-2m20 0l16 3M156 72q7-5 14 0m21 0q8-5 14 0" stroke="#392b27" strokeWidth="1.8" fill="none"/><g fill="#392b27"><circle cx="163" cy="72" r="2"/><circle cx="198" cy="72" r="2"/></g>
 </>}
 <path d="M180 73l-3 12h5" stroke="#aa725b" fill="none"/>
 <path d={avatar===3?'M174 94q8 3 16-1':avatar===2?'M173 93q9 9 19-1q-10 1-19 1':'M174 91q8 5 16-1q-9-3-16 1'} fill={avatar===3?'none':'#aa514b'} stroke={avatar===3?'#925e4c':'none'} strokeWidth="1.4"/>
 </g>;
}

export function AvatarPicker({value,onChange}:{value:number;onChange:(id:number)=>void}){
 return <div className="avatar-options avatar-profile-picker">{avatarProfiles.map(profile=><button key={profile.id} className={value===profile.id?'selected':''} aria-label={profile.label} aria-pressed={value===profile.id} onClick={()=>onChange(profile.id)}><svg viewBox="125 0 112 125" aria-hidden="true"><AvatarPortrait avatar={profile.id} skin={profile.skin}/></svg><span>{profile.label}<small>{profile.description}</small></span></button>)}</div>;
}
