# Việt Phục Remix

Ứng dụng React + TypeScript khám phá Việt phục, phối outfit trên minh họa SVG, gợi ý GPT qua OpenAI và Lookbook cục bộ. Nền trang chủ dùng đúng ảnh người dùng cung cấp tại `public/imperial-red-background.png`.

## Chạy ứng dụng

```sh
npm install
cp .env.example .env
npm run dev
```

Trên PowerShell dùng `Copy-Item .env.example .env`. Mở địa chỉ Vite in trong terminal (mặc định `http://127.0.0.1:5173`). Vite chuyển `/api` tới Node ở cổng 3001.

## OpenAI GPT — cấu hình local

Mở `.env` ở thư mục gốc và điền khóa lấy từ [OpenAI API keys](https://platform.openai.com/api-keys):

```dotenv
OPENAI_API_KEY=your_private_api_key
OPENAI_MODEL=gpt-4.1-mini
OPENAI_IMAGE_MODEL=
PORT=3001
```

Thay `your_private_api_key` bằng khóa thật, lưu rồi khởi động lại `npm run dev`. `.env` được Git bỏ qua; không dán khóa vào chat, mã frontend hay localStorage. Khóa chỉ được máy chủ gửi tới `https://api.openai.com/v1/`. `.env` local không cấu hình khóa cho bản Sites đã triển khai.

`OPENAI_MODEL` có thể thay bằng model hỗ trợ Responses API và Structured Outputs mà tài khoản của bạn được dùng. Endpoint `POST /api/generate-outfit` kiểm tra đầu vào bằng Zod, gửi ngữ cảnh trang phục, dùng JSON schema strict, kiểm tra kết quả và áp dụng mức cảnh báo tối thiểu từ dữ liệu văn hóa. Mỗi lượt gọi có timeout 25 giây, thử lại tối đa một lần khi lỗi mạng, giới hạn lượt gọi hoặc lỗi máy chủ. Dùng `store:false` cho Responses. Key sai, thiếu key hoặc kết quả không hợp lệ trả ba **gợi ý mẫu có nhãn**. Không trả thông báo lỗi thô có thể chứa thông tin bí mật.

API được gọi qua `fetch` phía máy chủ, không cần thêm SDK. Node và Worker dùng chung logic này. Cấu trúc và API đối chiếu với [OpenAI Responses](https://developers.openai.com/api/reference/resources/responses/methods/create) và [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs).

Nếu muốn tạo ảnh và có quyền dùng model ảnh OpenAI, điền `OPENAI_IMAGE_MODEL` với tên model GPT Image hỗ trợ Images API. Nút tạo minh họa gọi `/api/visualize` phía máy chủ qua `/v1/images/generations`; mặc định để trống để không bật dịch vụ ảnh. Chưa cấu hình hoặc lỗi thì vẫn giữ minh họa tương tác và mô tả. Không có tích hợp thử đồ lên ảnh người thật. Tạo ảnh chỉ chạy khi người dùng nhấn nút riêng.

## Kiểm tra và bản production

```sh
npm test
npm run build
npm start
```

Node phục vụ cả `dist/` và API ở `http://127.0.0.1:3001`. Khi triển khai lên máy chủ bên ngoài, thay địa chỉ bind loopback cho phù hợp, dùng HTTPS và bổ sung giới hạn truy cập/chi phí API. Không dùng hosting tĩnh đơn thuần nếu cần GPT: cần máy chủ và biến môi trường riêng.

### Bản hosted trên Sites

`npm run build:hosted` tạo Worker ESM ở `dist/server/index.js`, nhúng các asset frontend (bao gồm nguyên vẹn ảnh nền gốc), và kiểm tra HTML, ảnh nền cùng API. Worker và Node dùng chung `server/service.js`; không đưa khóa API vào bundle. ID Site được lưu trong `.openai/hosting.json`. Bản xuất bản mặc định riêng tư. Theo lựa chọn hiện tại, API key được cấu hình local bằng `.env`; bản hosted vẫn trả gợi ý mẫu cho tới khi có `OPENAI_API_KEY` trong cấu hình bí mật của Site. Không upload `.env` lên Sites.

## Hiệu ứng

Hero có hạt sáng, cánh hoa, ánh sáng nhẹ, khung chân dung chuyển động và hiệu ứng đổi trang phục. Nội dung xuất hiện lần lượt khi cuộn; thẻ có ánh sáng theo con trỏ và nghiêng nhẹ trên máy tính; nút có ánh kim, gợn khi nhấn và phản hồi chọn màu/phụ kiện. Có chuyển cảnh trang, thanh tiến độ cuộn, nút về đầu trang, trạng thái đang tạo và hiệu ứng khi lưu Lookbook. `prefers-reduced-motion` tắt các chuyển động trang trí; cảm ứng không dùng hiệu ứng nghiêng theo chuột.

## Phạm vi demo

- Bảy mục điều hướng, tìm kiếm không phân biệt dấu, sáu bộ lọc và trang chi tiết cho 19 loại trang phục.
- Áo dài, ngũ thân, tứ thân và bà ba có phom SVG riêng, phản ứng với màu chính, màu phối và phụ kiện. Các cổ phục khác là minh họa đơn giản cần rà soát; trang phục cộng đồng hiển thị ý niệm và giữ màu minh họa cố định cho đến khi có mẫu xác minh.
- Lookbook lưu bằng localStorage: đặt tên trước khi lưu, so sánh tối đa ba outfit, xóa, xuất PNG và chia sẻ nội dung qua hệ thống hoặc sao chép. Dữ liệu chỉ có trên trình duyệt hiện tại.
- Ảnh tham chiếu chỉ dùng object URL trong bộ nhớ trình duyệt, không gửi API, không lưu localStorage; đóng trang hoặc xóa ảnh sẽ giải phóng. Nhân vật minh họa không dự đoán độ vừa vặn.
- Không có phần trăm xác thực văn hóa. Nguồn tổng quan đã đối chiếu được liên kết; các mục thiếu nguồn chuyên khảo được ghi rõ **cần rà soát**. SVG là hình cách điệu, không phải ảnh hiện vật hay phục dựng được kiểm chứng.
- Các bài giới thiệu ngắn phục vụ demo; nội dung ngũ thân, tứ thân, Nhật Bình và trang phục cộng đồng cần chuyên gia/cộng đồng rà soát trước khi dùng làm tài liệu giáo dục chính thức.
- Font tải từ Google Fonts; có font hệ thống dự phòng khi ngoại tuyến.

Ảnh tham chiếu của người dùng không được gửi cho OpenAI. Minh họa AI là hình thời trang tạo từ mô tả và có thể sai chi tiết, cần kiểm tra thủ công. Lookbook cũ có nhãn Gemini được giữ nguyên nguồn gốc; các gợi ý AI mới dùng GPT.
