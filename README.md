# Việt Phục Remix

Ứng dụng React + TypeScript khám phá Việt phục, phối outfit trên minh họa SVG, gợi ý Gemini hoặc GPT và Lookbook cục bộ. Nền trang chủ dùng đúng ảnh người dùng cung cấp tại `public/imperial-red-background.png`. Xem [hệ minh họa hybrid và cấu hình Gemini](docs/hybrid-visuals.md).

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
OPENAI_BASE_URL=https://api.vilao.ai/v1
OPENAI_API_MODE=chat_completions
OPENAI_MODEL=gpt-5.4-mini
OPENAI_IMAGE_MODEL=
PORT=3001
```

Thay `your_private_api_key` bằng khóa của dịch vụ tương ứng, lưu rồi khởi động lại `npm run dev`. `.env` được Git bỏ qua; không dán khóa vào chat, mã frontend hay localStorage. Máy chủ gửi khóa tới endpoint `OPENAI_BASE_URL` đã cấu hình. Khi bỏ biến này, mặc định là `https://api.openai.com/v1`. Base URL phải dùng HTTPS và không chứa thông tin đăng nhập, query hay fragment. `OPENAI_API_MODE=chat_completions` dùng `/chat/completions` cho Vilao; bỏ biến này hoặc đặt `responses` để dùng `/responses`. Schema JSON được gửi trong cả request API và chỉ dẫn để tương thích gateway. Model cấu hình cần được dịch vụ đó hỗ trợ. `.env` local không cấu hình khóa cho bản Sites đã triển khai.

`OPENAI_MODEL` có thể thay bằng model hỗ trợ Responses API và Structured Outputs mà tài khoản của bạn được dùng. Endpoint `POST /api/generate-outfit` kiểm tra đầu vào bằng Zod, gửi ngữ cảnh trang phục, dùng JSON schema strict, kiểm tra kết quả và áp dụng mức cảnh báo tối thiểu từ dữ liệu văn hóa. GPT có timeout 90 giây; Gemini 25 giây. Thử lại tối đa một lần khi lỗi kết nối, giới hạn lượt gọi hoặc lỗi máy chủ; không tự gọi lại khi hết thời gian chờ hoặc JSON sai. GPT-5 dùng mức suy luận thấp. Giao diện chờ tối đa 190 giây. Dùng `store:false` cho Responses. Key sai, thiếu key hoặc kết quả không hợp lệ trả ba **gợi ý mẫu có nhãn**. Không trả thông báo lỗi thô có thể chứa thông tin bí mật.

API được gọi qua `fetch` phía máy chủ, không cần thêm SDK. Node và Worker dùng chung logic này. Cấu trúc và API đối chiếu với [OpenAI Responses](https://developers.openai.com/api/reference/resources/responses/methods/create) và [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs).

Nếu muốn tạo ảnh và có quyền dùng model ảnh, điền `OPENAI_IMAGE_MODEL` với tên model hỗ trợ Images API của dịch vụ đã cấu hình. Thẻ gợi ý AI tự tạo minh họa thời trang chân thực khi model ảnh được bật; nút riêng cho phép thử lại. Mặc định để trống: thẻ giữ SVG và ẩn nút chưa khả dụng. Khi lỗi, bản phối SVG vẫn giữ nguyên. Trang phục cộng đồng cần mẫu đã xác minh trước khi tạo ảnh chân thực. Không có tích hợp thử đồ lên ảnh người thật.

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

- Sáu mục điều hướng; bỏ trang Thử đồ AI và ảnh tham chiếu. Tìm kiếm không phân biệt dấu, sáu bộ lọc và trang chi tiết cho 19 loại trang phục. Liên kết cũ `#/tryon` mở Remix Studio.
- Cả 19 loại có hình vector riêng trong thư viện. Studio có các lớp nhân vật, áo, trang trí và phụ kiện tách biệt. Màu, phụ kiện, avatar và tùy chọn trang trí được giữ trong gợi ý AI. Trang phục cộng đồng là sơ đồ nhập môn theo biến thể có ghi chú nguồn, cần cộng đồng/chuyên gia rà soát; màu là lựa chọn đương đại.
- Lookbook lưu bằng localStorage: đặt tên trước khi lưu, so sánh tối đa ba outfit, xóa, xuất PNG và chia sẻ nội dung qua hệ thống hoặc sao chép. Dữ liệu chỉ có trên trình duyệt hiện tại.
- Nhân vật SVG chỉ giúp xem màu và phụ kiện, không dự đoán độ vừa vặn.
- 19 mục có bài đọc dẫn nguồn và phạm vi tư liệu; 8 bài “Chuyện chiếc áo” dùng chung dữ kiện đã đối chiếu. Danh mục nằm trong `src/data/cultural-content.json`; phương pháp và giới hạn được ghi tại `docs/content-sources.md`.
- Nguồn tổng quan không chứng nhận mẫu phục dựng. SVG/ảnh AI và gợi ý phối đương đại được ghi rõ. Ghi chú văn hóa trong kết quả GPT được máy chủ thay bằng dữ kiện biên tập có nguồn, không dùng mô hình làm nguồn lịch sử.
- Font tải từ Google Fonts; có font hệ thống dự phòng khi ngoại tuyến.

Minh họa AI là hình thời trang tạo từ thuộc tính đã chọn và có thể sai chi tiết, cần kiểm tra thủ công. Nhãn gợi ý ghi đúng nhà cung cấp (Gemini/GPT) hoặc gợi ý mẫu.
