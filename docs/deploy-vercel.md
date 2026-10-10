# Triển khai Việt Phục Remix trên Vercel

Frontend Vite được build vào `dist`; các file `api/*.js` chạy dưới dạng Vercel Functions và dùng chung logic với API local. Không chạy `npm run start` trên Vercel. Website sử dụng hash routing (`/#/studio`), vì vậy không cần rewrite toàn bộ URL vào `index.html`.

## Triển khai bằng GitHub

1. Đưa mã nguồn hiện tại lên repository GitHub của bạn. Giữ cả `public`, `src`, `server`, `api`, `package.json`, `package-lock.json` và `vercel.json`. Không đưa `.env` hoặc API key lên GitHub.
2. Vào Vercel → Add New → Project → Import repository.
3. Chọn Root Directory là thư mục chứa `package.json` (để mặc định nếu mã nguồn ở gốc repo).
4. Framework Preset: Vite; Build Command: `npm run build`; Output Directory: `dist`; Install Command: `npm ci`; Node.js: 22.x.
5. Thêm biến môi trường dưới đây cho Production và Preview, sau đó Deploy.

## Cấu hình GPT hiện tại

```dotenv
AI_PROVIDER=openai
OPENAI_API_KEY=<nhập key thật trong Vercel>
OPENAI_BASE_URL=https://api.vilao.ai/v1
OPENAI_API_MODE=chat_completions
OPENAI_MODEL=gpt-5.4-mini
```

Không thêm tiền tố `VITE_` cho các biến chứa key. `.env` local không tự xuất hiện trên Vercel. Nếu chưa có model tạo ảnh, không cần thêm `OPENAI_IMAGE_MODEL`; ứng dụng dùng SVG. Không cần cấu hình `PORT`.

Nếu dùng Gemini, thay `AI_PROVIDER` bằng `gemini` và thêm `GEMINI_API_KEY`, `GEMINI_MODEL=gemini-2.5-flash`. Chỉ nhập tên model mà tài khoản của bạn thực sự có quyền sử dụng.

Các API phối đồ được cấu hình `maxDuration=300` giây. Bật Fluid Compute trong Settings → Functions nếu dự án cũ chưa bật. Thời gian chạy được giới hạn theo gói Vercel.

## Kiểm tra sau triển khai

- Mở `/api/health`: GPT phải trả `provider: "openai"` và `openai: true` sau khi nhập key. Đây chỉ là kiểm tra có biến môi trường, không xác nhận key hoặc model dùng được.
- Mở `/#/studio`, tạo ba bản phối; kiểm tra chế độ GPT và sự khác biệt giữa các phương án.
- Nếu lỗi: mở Logs, lọc các endpoint `/api/generate-outfit` hoặc `/api/visualize`. Kiểm tra cấu hình gateway, quyền sử dụng model và hạn mức của key.
- Sau khi thay đổi biến môi trường: Deployments → chọn deployment → Redeploy để bản mới nhận cấu hình.

## Không dùng GitHub

Chạy trong PowerShell ở thư mục dự án:

```powershell
Set-Location D:\Arena
npx vercel login
npx vercel
```

Sau khi liên kết project, thêm biến môi trường trong dashboard cho Preview và Production. Deploy lại để kiểm tra, rồi xuất bản production:

```powershell
npx vercel --prod
```

Vercel sẽ trả URL deployment thực tế. Cấu hình local không đồng nghĩa đã xuất bản.

Tài liệu: https://vercel.com/docs/frameworks/frontend/vite ; https://vercel.com/docs/functions/runtimes/node-js ; https://vercel.com/docs/functions/configuring-functions/duration
