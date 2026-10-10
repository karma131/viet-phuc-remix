import {aiHealth} from '../server/service.js';

export default function handler(req,res){
 res.setHeader('Cache-Control','no-store');
 if(req.method!=='GET')return res.setHeader('Allow','GET').status(405).json({error:'Chỉ hỗ trợ GET.'});
 return res.status(200).json(aiHealth(process.env));
}
