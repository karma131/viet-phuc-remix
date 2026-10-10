// Reuse the local API service without starting an Express listener on Vercel.
export function postHandler(service){
 return async function handler(req,res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST')return res.setHeader('Allow','POST').status(405).json({error:'Chỉ hỗ trợ POST.'});
  let body;
  try{
   body=req.body;
   if(Buffer.byteLength(JSON.stringify(body??null),'utf8')>40*1024)return res.status(413).json({error:'Dữ liệu gửi lên quá lớn.'});
  }catch{return res.status(400).json({error:'Dữ liệu JSON không hợp lệ.'});}
  try{
   const out=await service(body,process.env);
   return res.status(out.status).json(out.body);
  }catch{
   return res.status(500).json({error:'Không thể xử lý yêu cầu. Bạn có thể thử lại.'});
  }
 };
}
