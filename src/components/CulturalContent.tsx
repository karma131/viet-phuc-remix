import cultural from '../data/cultural-content.json';
export const references=cultural.references;
export const reviewedAt=cultural.reviewedAt;
export const entries:Record<string,{source:string;description:string;features:string[];origin:string;context:string;scope:string;requiresContext?:boolean}>=cultural.entries;
export function SourceLink({id}:{id:string}){
 const ref=references.find(r=>r.id===id);
 return ref?<a className="text-button" href={ref.url} target="_blank" rel="noreferrer">{ref.author} · {ref.title} ↗</a>:null;
}
export function CulturalReading({id}:{id:string}){
 const entry=entries[id];
 if(!entry)return null;
 return <div className="cultural-reading"><h3>Bối cảnh & tư liệu</h3><p>{entry.origin}</p><SourceLink id={entry.source}/><h3>Hiểu cách sử dụng</h3><p>{entry.context}</p><div className="detail-source"><strong>Phạm vi thông tin</strong><p>{entry.scope}</p><small>Đối chiếu nguồn ngày 10/10/2026. Gợi ý dịp mặc, màu và phụ kiện trong Studio là lựa chọn sáng tạo của website.</small></div></div>;
}
export function SourcesPage(){return <section className="section page-section"><div className="section-heading"><div className="eyebrow">ĐỌC TƯ LIỆU GỐC</div><h2>Nguồn tham khảo</h2><p>Nội dung được tóm lược và diễn đạt lại từ các nguồn dưới đây. Mỗi trang trang phục dẫn nguồn cụ thể để bạn đọc đối chiếu.</p></div><div className="detail-source"><strong>Cách đọc nội dung</strong><p>Thông tin văn hóa có nguồn được tách khỏi gợi ý phối đồ đương đại. Ảnh sản phẩm AI và hình SVG là minh họa, không phải ảnh hiện vật hay bằng chứng lịch sử. Bản phối được gợi ý là đề xuất thẩm mỹ, không chứng nhận tính chính xác văn hóa.</p><p>Không bổ sung niên đại, cấp bậc hoặc ý nghĩa hoa văn khi nguồn chưa xác nhận. Phạm vi cộng đồng, người mặc và dịp sử dụng được ghi ngay tại trang chi tiết.</p><small>Đối chiếu liên kết và nội dung ngày 10/10/2026.</small></div>{references.map(r=><article className="source-card" key={r.id} id={'source-'+r.id}><div><span className="tag">{r.category}</span><h3>{r.title}</h3><p>{r.author}</p><p>{r.description}</p><a className="text-button" href={r.url} target="_blank" rel="noreferrer">Đọc nguồn gốc ↗</a></div></article>)}</section>}
