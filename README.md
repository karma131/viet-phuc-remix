# Việt Phục Remix

Ứng dụng React + TypeScript khám phá Việt phục, phối outfit trên minh họa SVG, gợi ý Gemini và Lookbook cục bộ. Nền trang chủ dùng đúng ảnh người dùng cung cấp tại `public/imperial-red-background.png`.

## Chạy ứng dụng

```sh
npm install
cp .env.example .env
npm run dev
```

Trên PowerShell dùng `Copy-Item .env.example .env`. Mở địa chỉ Vite in trong terminal (mặc định `http://127.0.0.1:5173`). Vite chuyển `/api` tới Node ở cổng 3001.

## Gemini

Đặt `GEMINI_API_KEY` trong `.env`, rồi khởi động lại máy chủ. Khóa chỉ đọc ở Node, không đưa vào frontend. `GEMINI_MODEL` mặc định `gemini-2.5-flash`; có thể thay bằng model văn bản được tài khoản hỗ trợ. Endpoint `POST /api/generate-outfit` kiểm tra đầu vào bằng Zod, cung cấp ngữ cảnh trang phục, yêu cầu JSON schema, kiểm tra kết quả, áp dụng cảnh báo tối thiểu từ dữ liệu văn hóa, giới hạn thời gian và thử lại một lần. Không có khóa hoặc lỗi Gemini sẽ trả ba **gợi ý mẫu có nhãn**, không giả lập kết quả AI.

Nếu có quyền sử dụng model tạo ảnh, cấu hình `GEMINI_IMAGE_MODEL` với tên model có hỗ trợ IMAGE. Nút tạo minh họa gọi `/api/visualize` phía máy chủ. Chưa cấu hình hoặc lỗi thì vẫn giữ minh họa tương tác và mô tả. Không có tích hợp thử đồ lên ảnh người thật.

## Kiểm tra và bản production

```sh
npm test
npm run build
npm start
```

Node phục vụ cả `dist/` và API ở `http://127.0.0.1:3001`. Khi triển khai lên máy chủ bên ngoài, thay địa chỉ bind loopback cho phù hợp, dùng HTTPS và bổ sung giới hạn truy cập/chi phí API. Không dùng hosting tĩnh đơn thuần nếu cần Gemini: cần máy chủ và biến môi trường riêng.

### Bản hosted trên Sites

`npm run build:hosted` tạo Worker ESM ở `dist/server/index.js`, nhúng các asset frontend (bao gồm nguyên vẹn ảnh nền gốc), và kiểm tra HTML, ảnh nền cùng API. Worker và Node dùng chung `server/service.js`; không đưa khóa API vào bundle. ID Site được lưu trong `.openai/hosting.json`. Bản xuất bản mặc định riêng tư. Cấu hình `GEMINI_API_KEY`, `GEMINI_MODEL` và tùy chọn `GEMINI_IMAGE_MODEL` qua biến môi trường bí mật của Site; `.env` chỉ dành cho chạy local. Không có khóa thì bản hosted vẫn trả gợi ý mẫu.

## Phạm vi demo

- Bảy mục điều hướng, tìm kiếm không phân biệt dấu, sáu bộ lọc và trang chi tiết cho 19 loại trang phục.
- Áo dài, ngũ thân, tứ thân và bà ba có phom SVG riêng, phản ứng với màu chính, màu phối và phụ kiện. Các cổ phục khác là minh họa đơn giản cần rà soát; trang phục cộng đồng hiển thị ý niệm và giữ màu minh họa cố định cho đến khi có mẫu xác minh.
- Lookbook lưu bằng localStorage: đặt tên trước khi lưu, so sánh tối đa ba outfit, xóa, xuất PNG và chia sẻ nội dung qua hệ thống hoặc sao chép. Dữ liệu chỉ có trên trình duyệt hiện tại.
- Ảnh tham chiếu chỉ dùng object URL trong bộ nhớ trình duyệt, không gửi API, không lưu localStorage; đóng trang hoặc xóa ảnh sẽ giải phóng. Nhân vật minh họa không dự đoán độ vừa vặn.
- Không có phần trăm xác thực văn hóa. Nguồn tổng quan đã đối chiếu được liên kết; các mục thiếu nguồn chuyên khảo được ghi rõ **cần rà soát**. SVG là hình cách điệu, không phải ảnh hiện vật hay phục dựng được kiểm chứng.
- Các bài giới thiệu ngắn phục vụ demo; nội dung ngũ thân, tứ thân, Nhật Bình và trang phục cộng đồng cần chuyên gia/cộng đồng rà soát trước khi dùng làm tài liệu giáo dục chính thức.
- Font tải từ Google Fonts; có font hệ thống dự phòng khi ngoại tuyến.

Ảnh tham chiếu của người dùng không được gửi cho Gemini. Minh họa AI là hình thời trang tạo từ mô tả và có thể sai chi tiết, cần kiểm tra thủ công.
