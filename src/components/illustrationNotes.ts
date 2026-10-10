import {entries,references} from './CulturalContent';
export const illustrationNotes:Record<string,{label:string;url:string}>=Object.fromEntries(['tay','mong','thai','dao','muong','cham','khmer','e-de'].map(id=>{const ref=references.find(r=>r.id===entries[id].source)!;return [id,{label:'Tư liệu đọc thêm · '+ref.category,url:ref.url}]}));
