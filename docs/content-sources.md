# Nội dung và nguồn văn hóa

Đối chiếu ngày 10/10/2026. Danh mục nguồn, phạm vi và bài đọc cho 19 mục nằm trong `src/data/cultural-content.json`. Nội dung là tóm lược có dẫn nguồn, không sao chép toàn văn. Các bài “Chuyện chiếc áo” dùng cùng dữ kiện đã đối chiếu, tránh có hai phiên bản lịch sử khác nhau.

Nguồn chính: Cục Du lịch Quốc gia Việt Nam; Sở Văn hóa, Thể thao và Du lịch Huế; bài của Phan Thanh Hải trên Khám phá Huế; VietnamPlus/TTXVN; VOV; VTV; Bảo tàng Phụ nữ Nam Bộ; hồ sơ Smithsonian; Tuyên giáo và Dân vận Cao Bằng; Báo Đắk Nông (lưu trên Báo Lâm Đồng).

Không sử dụng trang bán trang phục, Wikipedia hoặc nội dung do GPT sinh làm nguồn khẳng định lịch sử. Không lấy các số liệu dân số, danh hiệu quốc phục, thời điểm ra đời duy nhất hay ý nghĩa hoa văn chưa được đối chiếu để bổ sung cho website.

## Phạm vi

- Nhật Bình: thông tin trong bài của Phan Thanh Hải; không xác nhận hình AI là phục dựng hay gán phẩm cấp cho bản phối.
- Giao lĩnh, viên lĩnh: thuật ngữ nhận diện cổ áo. Viên lĩnh dùng phóng sự tái hiện của VietnamPlus, không coi mẫu trình diễn là hiện vật.
- Đối khâm: bài Nhật Bình xác nhận thuật ngữ trong trường hợp cụ thể. Mẫu đối khâm trên website chưa có hiện vật xác định; không gán triều đại hoặc rập.
- Áo bà ba: mô tả hồ sơ hiện vật Smithsonian, không suy ra người sáng tạo hay nguồn gốc duy nhất.
- Tày: mẫu trình diễn trong phóng sự VOV. Mông: kỹ thuật của Mông Hoa tại Chế Cu Nha. Dao: nữ phục Dao Đỏ ở Cao Bằng. Thái: bài về khăn Piêu của phụ nữ Thái Đen. Không mở rộng các mô tả này thành mẫu dùng chung cho toàn bộ dân tộc.
- Mường: bài VOV có người thực hành và nhà nghiên cứu ở Hòa Bình. Chăm: tổng quan Vietnam Tourism. Khmer: bài trưng bày trang phục cưới nữ của Bảo tàng Phụ nữ Nam Bộ. Ê Đê: mô tả cấu trúc từ báo địa phương.

Ảnh AI/SVG, bảng màu, phụ kiện và sự kiện gợi ý là sản phẩm minh họa/phối đương đại. `requiresContext` tách sự tồn tại của nguồn tổng quan khỏi độ chắc chắn của mẫu phối. Có nguồn không tự chuyển một bản phối cổ phục hoặc cộng đồng thành trạng thái “Phù hợp”.

## Thay đổi chức năng

Bỏ mục Thử đồ AI và biểu mẫu ảnh tham chiếu. Các liên kết cũ `#/tryon` mở Remix Studio để không tạo trang lỗi. Giữ avatar SVG, gợi ý phối GPT, so sánh và Lookbook.

Máy chủ thay `culturalNote` do mô hình trả về bằng dữ kiện biên tập từ danh mục đã đối chiếu. GPT chỉ được giải thích màu, phụ kiện và tính tiện dụng; không làm nguồn lịch sử. Khi chạy local phải khởi động lại máy chủ sau thay đổi dữ liệu hoặc logic.
