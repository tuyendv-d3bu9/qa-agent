# TỔNG HỢP THÔNG TIN REPOSITORY (`qa`) — TÀI LIỆU NGỮ CẢNH CHO AI

> **Mục đích tài liệu:** Tài liệu này tổng hợp toàn bộ kiến trúc, dữ liệu, quy trình nghiệp vụ, công cụ CLI và trạng thái hiện tại của repository `qa`. Tài liệu được thiết kế để AI tiếp theo đọc và nắm bắt 100% ngữ cảnh dự án ngay lập tức mà không cần quét lại toàn bộ mã nguồn.

---

## 1. TỔNG QUAN DỰ ÁN (PROJECT OVERVIEW)

- **Tên dự án:** Hệ thống Phân tích Yêu cầu & Kiểm soát Chất lượng Kiểm thử (QA Requirement Autopsy & Missing Rules Analysis).
- **Đối tượng nghiệp vụ mục tiêu:** Hệ thống Thương mại điện tử **ShopGo** — tập trung sâu vào **Function D: Áp dụng Mã Giảm Giá (Voucher)** tại bước Thanh toán (Checkout).
- **Triết lý thiết kế:**
  - **AI-First nhưng không AI-Only:** AI thực hiện mổ xẻ yêu cầu (Requirement Autopsy), tìm quy tắc bị khuyết (Missing Rules), đặt câu hỏi làm rõ cho BA/PO và tự kiểm định bằng khung **FACT**, nhưng bị kiểm soát bởi cơ chế **Hard Quality Gate** (cổng chặn cứng bằng code).
  - **Phân tách rạch ròi giữa Fact và Domain Knowledge:** Chỉ các tài liệu Markdown trong `INPUT/` mới là Nguồn sự thật duy nhất (Single Source of Truth - SSOT) của dự án. Tri thức ngành TMĐT (`resources/`) chỉ dùng để biết **cần hỏi gì**, tuyệt đối không dùng để tự suy diễn hoặc bịa ra quy tắc hệ thống (Expected Result) khi đề bài chưa nêu.
- **Nền tảng kỹ thuật:** Node.js (CommonJS), sử dụng `mammoth`, `turndown`, `turndown-plugin-gfm` để tiền xử lý tài liệu `.docx` sang GitHub Flavored Markdown (`.md`), cùng CLI script quản lý trạng thái cổng chất lượng (`gate.js`).

---

## 2. CẤU TRÚC THƯ MỤC & TỆP TIN (DIRECTORY STRUCTURE)

```text
qa/
├── INPUT/                                      # [SSOT] Tài liệu yêu cầu đầu vào (chỉ đọc .md)
│   ├── Hệ thống Thương mại điện tử “ShopGo”.md # Tổng quan ShopGo, Actors, Feature Map (A-H), Glossary, NFR
│   ├── Spec Function D.md                      # Đặc tả Function D: Áp dụng Mã Giảm Giá (Voucher)
│   ├── chat.md                                 # Ghi chú Leader (xung đột phạm vi địa lý, X01)
│   └── RAW/                                    # Bản gốc .docx sau khi convert
├── OUTPUT/                                     # Đầu ra các pha (questions, autopsy report, viewpoints, test_ideas...)
├── qa-analyst/                                 # Agent QA Analyst: AGENTS.md + knowledge/ + skills/
│   ├── AGENTS.md                               # Vai trò, luồng Pha 1 -> cổng chặn -> Pha 2 -> Pha 3, bảng skill, ràng buộc
│   ├── knowledge/                              # voucher-domain.md (D01-D23), viewpoints.md (8 viewpoint)
│   ├── skills/                                 # Mỗi skill 1 thư mục: SKILL.md + assets/
│   └── _archive/prompt_qa_analyst_v1.md        # Prompt dài trước khi tách
├── docs/
│   ├── INFO.md                                 # Tệp tổng hợp thông tin repo
│   ├── REVIEW-M02.md                           # Bố cục repo cho người review M02
│   └── courses/                                # Tài liệu khóa học (agent không đọc)
│       ├── m01/                                # 6W.md, FACT.md, MISSING_RULE_TYPES.md, RCTFC.md, DOMAIN_VOUCHER.md
│       └── m02/                                # viewpoint-generator, test-idea-generation, test-case-format, coverage-review, NOTE
│           └── thuc-hanh/                      # MINDSET, THUCHANH-0911, đáp án mẫu
├── tools/
│   ├── convert.js                              # .docx -> .md, chuyển bản gốc sang INPUT/RAW/
│   ├── gate.js                                 # Hard Quality Gate (init, check, answer, status)
│   ├── ba-answers-demo.js                      # Điền câu trả lời BA mẫu
│   └── check-m02.js                            # Kiểm bài tách prompt (12 check)
├── gate_status.json                            # Trạng thái cổng chặn, câu trả lời BA đã xác nhận
├── package.json
└── package-lock.json
```

---

## 3. KIẾN TRÚC QUY TRÌNH 2 PHA & HARD QUALITY GATE (WORKFLOW)

Quy trình phân tích của QA Analyst được thiết kế chặt chẽ qua **Tiền xử lý -> Pha 1 -> Cổng chặn Gate -> Pha 2**:

```text
[ TIỀN XỬ LÝ: npm run convert (node tools/convert.js) ]
  - Chuyển đổi mọi file .docx trong INPUT/ sang .md (trích xuất ảnh vào INPUT/images/ nếu có).
  - Di chuyển toàn bộ file gốc (.docx và file phi Markdown) từ INPUT/ sang RAW/.
       │
       ▼
[ PHA 1: PHÂN TÍCH SƠ BỘ & ĐẶT CÂU HỎI LÀM RÕ ]
  - Đọc các file .md trong INPUT/ (Single Source of Truth).
  - Rà soát qua Khung 6W (W1-W6) kết hợp Danh mục miền Voucher (D01-D23) và phát hiện xung đột (X01...).
  - Xuất danh sách câu hỏi đóng (tối thiểu 2 phương án A/B) ra: OUTPUT/questions_for_clarification.md
       │
       ▼
[ KHỞI TẠO CỔNG CHẶN: node tools/gate.js init OUTPUT/questions_for_clarification.md ]
  - Parse bảng câu hỏi từ Markdown sang tệp trạng thái: gate_status.json
  - Mặc định toàn bộ câu hỏi có status = "UNRESOLVED".
       │
       ▼
╔════════════════════════════════════════════════════════════════════════════╗
║ CỔNG CHẶN CỨNG (HARD QUALITY GATE): node tools/gate.js check              ║
║                                                                            ║
║ - Kiểm tra tệp gate_status.json:                                           ║
║   + Nếu còn câu hỏi UNRESOLVED hoặc chưa có answer:                        ║
║     -> Trả về exit code 1 (CHẶN CỨNG).                                     ║
║     -> Tuyệt đối cấm AI đi tiếp sang Pha 2 hoặc tự suy diễn Expected Result║
║   + Chỉ khi 100% câu hỏi có status === "RESOLVED" và answer hợp lệ:        ║
║     -> Trả về exit code 0 (THÔNG QUA CỔNG).                                ║
╚════════════════════════════════════════════════════════════════════════════╝
       │
       ▼
[ PHA 2: PHÂN TÍCH CHI TIẾT & XUẤT BÁO CÁO HOÀN CHỈNH ]
  - Kết hợp SSOT (INPUT/*.md) + Câu trả lời đã xác nhận từ BA/PO trong gate_status.json.
  - Tự kiểm định chất lượng qua 10 tiêu chí FACT (F1-F3, A1-A2, C1-C3, T1-T2).
  - Xuất báo cáo cuối cùng ra: OUTPUT/requirement_autopsy_report.md (gồm 4 phần A, B, C, D).
```

---

## 4. CHI TIẾT CÔNG CỤ & LỆNH CLI (`tools/` & `package.json`)

### 4.1. NPM Scripts (`package.json`)
| Lệnh npm | Lệnh thực thi tương đương | Chức năng |
|---|---|---|
| `npm run convert` | `node tools/convert.js` | Chuyển đổi `.docx` trong `INPUT/` sang `.md` và lưu trữ file gốc vào `RAW/` |
| `npm run gate:init` | `node tools/gate.js init <file>` | Khởi tạo `gate_status.json` từ file Markdown hoặc JSON chứa câu hỏi |
| `npm run gate:check` | `node tools/gate.js check` | Kiểm tra cổng chất lượng (`exit 0` nếu đạt 100%, `exit 1` nếu còn câu chưa trả lời) |
| `npm run gate:status` | `node tools/gate.js status` | Hiển thị thống kê nhanh tiến độ giải quyết câu hỏi |

### 4.2. Công cụ chuyển đổi tài liệu (`tools/convert.js`)
- Quét tất cả các tệp trong thư mục `INPUT/` (bỏ qua thư mục con và file tạm Word `~$`).
- Với tệp `.docx`:
  - Dùng `mammoth` trích xuất HTML ngữ nghĩa; nếu có ảnh nhúng sẽ tự động lưu vào `INPUT/images/<ten_file>_img_<so>.<ext>`.
  - Dùng `turndown` kèm `turndown-plugin-gfm` chuyển sang GitHub Flavored Markdown và ghi ra `INPUT/<ten_file>.md`.
  - Sau khi chuyển đổi thành công, di chuyển file `.docx` gốc sang thư mục `RAW/`.
- Với các tệp khác không có đuôi `.md`: Tự động di chuyển sang `RAW/`.

### 4.3. Công cụ quản lý cổng chất lượng (`tools/gate.js`)
Hỗ trợ 4 lệnh CLI:
1. **Khởi tạo (`init`):**
   ```bash
   node tools/gate.js init OUTPUT/questions_for_clarification.md
   ```
   - Tự động phân tích cú pháp bảng Markdown (hỗ trợ bảng 3, 4 hoặc 5 cột: `| ID | D-code | Khía cạnh | Câu hỏi | Phương án |`, tự tách các phương án qua `<br>`, `\n`, hoặc `; `) hoặc danh sách dạng `### Q-xxx` / `**Q-xxx**`.
   - Ghi đè tệp `gate_status.json`.
2. **Kiểm tra cổng (`check`):**
   ```bash
   node tools/gate.js check
   ```
   - Duyệt mảng `questions` trong `gate_status.json`. Nếu `unresolved.length > 0`, in danh sách câu hỏi chưa trả lời ra `stderr` và thoát với `process.exit(1)`. Nếu 100% đã giải quyết, cập nhật `gate_passed = true` và thoát với `process.exit(0)`.
3. **Cập nhật câu trả lời (`answer`):**
   ```bash
   node tools/gate.js answer --id <ID> --answer "<NOI_DUNG_TRA_LOI>" [--by "<TEN_NGUOI_TRA_LOI>"]
   ```
   - Tìm câu hỏi theo `id` (không phân biệt hoa/thường), cập nhật `status = "RESOLVED"`, `answer`, `answered_by` (mặc định `"QA/BA"`), `answered_at` (ISO timestamp), và tính lại bộ đếm `resolved_count`, `unresolved_count`, `gate_passed`.
4. **Xem trạng thái (`status`):**
   ```bash
   node tools/gate.js status
   ```
   - In bảng tóm tắt tổng số câu hỏi, số câu đã giải quyết, số câu chưa giải quyết và trạng thái cổng (`THONG QUA` / `DANG CHAN`).

---

## 5. NỘI DUNG DỮ LIỆU ĐẦU VÀO (`INPUT/` — SINGLE SOURCE OF TRUTH)

Hiện tại thư mục `INPUT/` có 3 tệp Markdown đóng vai trò là nguồn sự thật duy nhất của dự án:

### 5.1. `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md`
- **Bối cảnh:** Web bán lẻ trực tuyến (general retail) cho khách hàng SME (bán quần áo, phụ kiện, đồ gia dụng...). Khách hàng thuê CO-WELL đảm nhận QA cho phiên bản web.
- **Đặc điểm hệ thống:**
  - Web app responsive (desktop + mobile web).
  - Người dùng cuối: Khách mua hàng tại **Việt Nam**; tiền tệ **VND**; ngôn ngữ **tiếng Việt**.
  - Tích hợp ngoài: Cổng thanh toán thẻ (bên thứ ba), dịch vụ Email/SMS, đơn vị vận chuyển (tính phí ship).
  - Back-office (Admin): Quản lý sản phẩm, mã giảm giá, đơn hàng (nằm ngoài phạm vi test chi tiết, chỉ dùng làm ngữ cảnh).
- **Vai trò người dùng (Actors):**
  1. `Khách vãng lai (Guest)`: Xem sản phẩm, thêm vào giỏ; **phải đăng nhập khi thanh toán**.
  2. `Khách hàng (Customer)`: Đã đăng ký; có hồ sơ, sổ địa chỉ, Ví ShopGo, lịch sử đơn.
  3. `Nhân viên CSKH / Admin`: Quản lý đơn, mã giảm giá, sản phẩm (back-office).
- **Bản đồ tính năng (Feature Map A – H):**
  - `A` — Tài khoản & Xác thực: Đăng ký, Đăng nhập, Quên mật khẩu, Xác thực OTP/email, Hồ sơ, Sổ địa chỉ.
  - `B` — Danh mục & Tìm kiếm: Danh sách sản phẩm, Lọc/Sắp xếp, Chi tiết sản phẩm, Hiển thị tồn kho.
  - `C` — Giỏ hàng: Thêm/Sửa/Xóa, Cập nhật số lượng, Giữ giỏ khi đăng nhập lại.
  - `D` — Khuyến mãi & Mã giảm giá: **Áp dụng Voucher tại thanh toán** *(Function trọng tâm hiện tại)*.
  - `E` — Thanh toán: Chọn địa chỉ giao, Phương thức (COD / Thẻ / Ví ShopGo), Phí ship, Đặt hàng.
  - `F` — Ví ShopGo (E-Wallet): Nạp tiền, Số dư, Lịch sử giao dịch, Hoàn tiền *(cầu nối Module 3)*.
  - `G` — Quản lý đơn hàng: Trạng thái đơn, Hủy đơn, Theo dõi, Trả hàng.
  - `H` — Thông báo & Đánh giá: Email/SMS xác nhận, Đánh giá sản phẩm.
- **Môi trường & NFR:**
  - Trình duyệt: Chrome, Edge, Safari (bản mới); mobile web (responsive).
  - Môi trường: Dev -> Staging/Test -> Production.
  - Glossary: SKU, Tồn kho (stock), COD, Voucher (% hoặc số tiền cố định), Giá trị đơn tối thiểu (min order value), Trần giảm tối đa (max discount cap), Ví ShopGo, Hoàn tiền (refund về ví), Trạng thái đơn (Chờ xác nhận -> Đang giao -> Hoàn tất / Đã hủy).
  - NFR: Trang chính tải < 3s; mật khẩu mã hóa, OTP có hạn; tiền tệ VND, làm tròn theo quy ước hiển thị.
  - Ngoài phạm vi (Out of Scope): Back-office admin chi tiết, tích hợp ERP/kho, load test, native mobile app.

### 5.2. `INPUT/Spec Function D.md`
Đặc tả gốc của **Function D: Áp dụng Mã Giảm Giá (Voucher)** (nằm ở bước Thanh toán thuộc nhóm tính năng E) cực kỳ ngắn gọn, chỉ gồm:
- **Vị trí:** Tại trang Thanh toán, khách hàng có ô nhập “Mã giảm giá” và nút “Áp dụng”.
- **Hành động:** Khi khách hàng nhập mã rồi bấm Áp dụng, hệ thống sẽ kiểm tra mã và áp dụng phần giảm vào tổng đơn hàng.
- **5 quy tắc đã nêu:**
  1. Có 2 loại mã: giảm theo phần trăm (%) và giảm số tiền cố định (VND).
  2. Mã chỉ dùng được khi đơn hàng đạt giá trị tối thiểu quy định của mã.
  3. Mỗi mã có ngày hết hạn.
  4. Áp dụng thành công -> hiển thị số tiền được giảm và tổng tiền mới.
  5. Mã không hợp lệ hoặc hết hạn -> hiển thị thông báo lỗi.

### 5.3. `INPUT/chat.md`
Chứa duy nhất 1 dòng ghi chú:
> `"Hôm nay ngày 6/11, thì Leader của tôi nói rằng có thể mua hàng ở Nhật Bản"`
- **Ý nghĩa trong phân tích:** Tạo ra một **Conflict giữa rule (Xung đột quy tắc - Mã X01)** với tài liệu `ShopGo.md` và `Spec Function D.md` (vốn quy định người dùng cuối là khách mua hàng tại Việt Nam, tiền tệ VNĐ).

---

## 6. BỘ KHUNG PHÂN TÍCH & TRI THỨC NGÀNH (`resources/` & `qa-analyst/`)

Toàn bộ nội dung trong thư mục `resources/` đã được tích hợp khép kín vào tệp `qa-analyst/prompt_qa_analyst.md`. Dưới đây là cấu trúc cốt lõi của các bộ khung này:

### 6.1. Khung viết Prompt `RCTFC` (`resources/RCTFC.md`)
Mọi prompt chuẩn trong dự án tuân theo 5 phần:
- **R (Role):** Vai trò, kinh nghiệm và tư duy của AI (Senior QA Analyst).
- **C (Context):** Bối cảnh dự án, đường dẫn file SSOT, tri thức ngành tham khảo.
- **T (Task):** Các bước thực hiện tuần tự kèm điều kiện chuyển bước.
- **F (Format):** Khuôn mẫu bảng biểu và tên file đầu ra cụ thể.
- **C (Constraint):** Các giới hạn nghiêm ngặt về những điều không được làm.

### 6.2. Khung tra hỏi 6W (`resources/6W.md`)
6 góc nhìn để phát hiện khoảng trống trong tài liệu yêu cầu:
- **W1 (What if input lạ):** Dữ liệu người dùng gõ/dán vào ô nhập (rỗng, khoảng trắng đầu/cuối, hoa/thường, ký tự đặc biệt, emoji, quá dài, bấm lặp liên tục). -> Liên quan `D10`, `D13`, `D21`.
- **W2 (What if state lạ):** Trạng thái hệ thống/giỏ hàng/phiên lúc thao tác (chưa đăng nhập, đã áp sẵn 1 mã, muốn gỡ mã, quay lại giỏ bớt hàng xuống dưới đơn tối thiểu, phiên hết hạn). -> Liên quan `D07`, `D09`, `D16`, `D17`.
- **W3 (What if data lạ):** Dữ liệu nghiệp vụ ở biên hoặc ngoài khoảng (đúng bằng đơn tối thiểu, giảm cố định lớn hơn tiền hàng, nhân % ra số lẻ, mã % không có trần, giỏ lẫn sản phẩm ngoài chương trình). -> Liên quan `D02`, `D03`, `D08`, `D11`, `D12`.
- **W4 (What when timing):** Thời điểm, thứ tự, đồng thời (hết hạn lúc 00:00 hay 23:59:59, múi giờ nào, áp mã lúc 23:58 đặt hàng lúc 00:01, 2 người cùng dùng lượt cuối cùng, mạng chậm/timeout). -> Liên quan `D04`, `D05`, `D18`, `D19`, `D22`.
- **W5 (Who else actor):** Tác nhân khác ngoài khách đang mua (khách mới/cũ, dùng lại mã ở đơn thứ 2, Admin tắt/sửa mã giữa chừng, bot dò mã/sửa request API, CSKH hủy đơn). -> Liên quan `D06`, `D07`, `D15`, `D19`, `D21`.
- **W6 (What happens after):** Hậu quả dữ liệu sau hành động (trừ lượt lúc bấm Áp dụng hay lúc Đặt hàng, hủy đơn/thanh toán thẻ thất bại có hoàn lượt không, đổi địa chỉ làm đổi phí ship có tính lại mã không, lưu vết trên đơn/email). -> Liên quan `D14`, `D15`, `D20`, `D23`.

**Nhãn đánh giá 6W:**
- `CO`: Đề bài đã trả lời rõ, đủ viết Expected Result.
- `MOT_PHAN`: Đề bài có nhắc chủ đề nhưng chưa đủ chi tiết xử lý.
- `KHONG`: Đề bài hoàn toàn không đề cập.

### 6.3. Danh mục kiểm tra nghiệp vụ miền Voucher `D01 – D23` (`resources/DOMAIN_VOUCHER.md`)
23 khía cạnh bắt buộc phải rà soát theo đúng thứ tự trong báo cáo Requirement Autopsy:

| Mã | Chủ đề nghiệp vụ | Loại Missing Rule gợi ý | Rủi ro gợi ý | W liên quan |
|---|---|---|---|---|
| **D01** | Loại mã giảm giá (%, cố định, freeship) | Implicit assumption | `TB` | — |
| **D02** | Trần giảm của mã phần trăm (Max cap) | Implicit assumption | `CAO` | W3-4 |
| **D03** | Cơ sở tính (Subtotal hay Total) và ngưỡng đơn tối thiểu (`>=` hay `>`) | Implicit assumption | `CAO` | W3-1 |
| **D04** | Mốc thời gian hiệu lực (Ngày bắt đầu, giờ hết hạn, múi giờ) | Edge case bị bỏ qua | `TB` | W4-1 |
| **D05** | Tổng lượt dùng toàn hệ thống (Usage limit) | Implicit assumption | `CAO` | W4-4 |
| **D06** | Giới hạn lượt dùng mỗi khách hàng (Per-user limit) | Implicit assumption | `CAO` | W5-2 |
| **D07** | Đối tượng được dùng và điều kiện đăng nhập | Implicit assumption | `TB` | W2-1, W5-1 |
| **D08** | Phạm vi áp dụng của sản phẩm (Toàn sàn hay theo danh mục) | Implicit assumption | `TB` | W3-5 |
| **D09** | Quy tắc cộng dồn (Stacking) & cơ chế ghi đè khi nhập mã thứ 2 | Implicit assumption | `CAO` | W2-2 |
| **D10** | Định nghĩa mã hợp lệ (Hoa/thường, khoảng trắng thừa, độ dài, ký tự) | Implicit assumption | `TB` | W1-2, W1-3, W1-4 |
| **D11** | Quy tắc làm tròn số tiền lẻ (Lên, xuống hay số học; đơn vị nào) | Implicit assumption | `CAO` | W3-3 |
| **D12** | Xử lý khi số tiền giảm vượt quá tiền hàng (Chặn âm tiền) | Edge case bị bỏ qua | `CAO` | W3-2 |
| **D13** | Nội dung và vị trí thông báo lỗi (Tách biệt theo nguyên nhân hay gộp chung) | Implicit assumption | `TB` | W1-1 |
| **D14** | Thời điểm chính thức trừ lượt dùng (Lúc Áp dụng hay lúc Đặt hàng) | Implicit assumption | `CAO` | W6-1 |
| **D15** | Cơ chế hoàn lượt dùng mã (Hủy đơn, thanh toán thất bại) | Rollback/Undo | `TB` | W5-5, W6-2, W6-3 |
| **D16** | Giỏ hàng hoặc phiên thay đổi sau khi đã áp mã | Edge case bị bỏ qua | `CAO` | W2-4, W2-5 |
| **D17** | Luồng gỡ bỏ mã hoặc đổi mã khác | Rollback/Undo | `TB` | W2-3 |
| **D18** | Xử lý thao tác đồng thời (Race condition ở lượt dùng cuối) | Edge case bị bỏ qua | `CAO` | W4-3 |
| **D19** | Mã mất hiệu lực giữa luồng (Hết hạn hoặc Admin tắt trước khi bấm Đặt hàng) | Edge case bị bỏ qua | `CAO` | W4-2, W5-3 |
| **D20** | Mối quan hệ giữa mã giảm giá và phí vận chuyển | Implicit assumption | `TB` | W6-4 |
| **D21** | Cơ chế phòng chống dò mã (Rate limit) và giả mạo API | Non-functional bị ignore | `TB` | W1-5, W5-4 |
| **D22** | Thời gian phản hồi tối đa và trạng thái chờ (Loading / chặn bấm đúp) | Non-functional bị ignore | `TB` | W4-5 |
| **D23** | Lưu vết thông tin mã trên đơn hàng và email xác nhận | Implicit assumption | `THAP` | W6-5 |

### 6.4. Khung phân loại 5 nhóm Missing Rule (`resources/MISSING_RULE_TYPES.md`)
Mọi điểm có trạng thái `MO_HO`, `KHONG_DE_CAP`, hoặc `MAU_THUAN` phải được xếp vào 1 trong 5 nhóm theo **thứ tự ưu tiên giảm dần** (nếu trùng nhiều nhóm thì chọn nhóm đứng trước):
1. **`Conflict giữa rule`** (Xung đột quy tắc giữa các tài liệu hoặc trong cùng tài liệu) — Rủi ro thường gặp: `TB` / `CAO`.
2. **`Rollback/Undo`** (Thiếu luồng quay lui, hủy, gỡ mã, hoàn trả lượt) — Rủi ro thường gặp: `TB`.
3. **`Non-functional bị ignore`** (Bỏ qua hiệu năng, bảo mật, rate-limit, loading/timeout) — Rủi ro thường gặp: `TB`.
4. **`Edge case bị bỏ qua`** (Tình huống biên về giá trị, thời gian, đồng thời) — Rủi ro thường gặp: `CAO`.
5. **`Implicit assumption`** (Giả định ngầm ai cũng nghĩ là hiển nhiên nên không viết ra) — Rủi ro thường gặp: `CAO`.

### 6.5. Tiêu chuẩn tự kiểm định `FACT` — 10 Checks bắt buộc (`resources/FACT.md`)
Trước khi xuất báo cáo Pha 2, AI phải kiểm tra 10 mục cố định (`DAT` / `KHONG_DAT`):
- **F1 (Factual):** Mọi dòng `RO` và `MO_HO` ở Phần A đều có trích dẫn nguyên văn từ `INPUT/` kèm tên file nguồn.
- **F2 (Factual):** Không có bất kỳ nhận định nào khẳng định quy tắc của ShopGo mà chỉ lấy từ tri thức ngành.
- **F3 (Factual):** Cột bằng chứng chép sát câu chữ đề bài, tuyệt đối không diễn giải thêm.
- **A1 (Accurate):** Dùng đúng thuật ngữ giao diện ShopGo: `"Mã giảm giá"`, `"Áp dụng"`, trang `"Thanh toán"`, `"VND"`.
- **A2 (Accurate):** Mọi ví dụ số tiền đều dùng định dạng tiền tệ Việt Nam (ví dụ: `200.000đ`).
- **C1 (Complete):** Phần A rà soát đủ 23 khía cạnh từ `D01` đến `D23` theo đúng thứ tự (và các mã mở rộng như `X01` nếu có).
- **C2 (Complete):** Mọi mục có trạng thái `MO_HO`, `KHONG_DE_CAP`, `MAU_THUAN` đều có dòng phân tích chi tiết tương ứng tại Phần B.
- **C3 (Complete):** Bảng thống kê định lượng (Phần D) khớp 100% với số dòng thực tế trong các bảng Phần A và Phần B.
- **T1 (Testable):** 100% câu hỏi gửi BA là câu hỏi đóng, có ít nhất 2 phương án lựa chọn (A, B...).
- **T2 (Testable):** Câu trả lời cho mỗi câu hỏi đóng đủ cơ sở rõ ràng để viết ngay 1 Expected Result cụ thể.

---

## 7. TRẠNG THÁI HIỆN TẠI CỦA REPOSITORY (CURRENT STATE SNAPSHOT)

Tính đến thời điểm hiện tại, tiến độ thực tế trong repo đang ở **cuối Pha 1, đang dừng tại Hard Quality Gate để chờ câu trả lời**:

1. **Bước Tiền xử lý (Convert):** **ĐÃ HOÀN TẤT**
   - 2 file `.docx` đã được chuyển thành `.md` trong `INPUT/` và bản gốc đã nằm trong `RAW/`.
2. **Pha 1 (Xuất câu hỏi làm rõ):** **ĐÃ HOÀN TẤT**
   - Tệp `OUTPUT/questions_for_clarification.md` đã được tạo hoàn chỉnh với **28 câu hỏi đóng**:
     - **27 câu hỏi thuộc D01 – D23:** Bao gồm `Q-D01-01`, `Q-D02-01`, `Q-D03-01`, `Q-D03-02`, `Q-D04-01`, `Q-D04-02`, `Q-D05-01`, `Q-D06-01`, `Q-D07-01`, `Q-D08-01`, `Q-D09-01`, `Q-D09-02`, `Q-D10-01`, `Q-D10-02`, `Q-D11-01`, `Q-D12-01`, `Q-D13-01`, `Q-D14-01`, `Q-D15-01`, `Q-D16-01`, `Q-D17-01`, `Q-D18-01`, `Q-D19-01`, `Q-D20-01`, `Q-D21-01`, `Q-D22-01`, `Q-D23-01`.
     - **01 câu hỏi xung đột (`Q-X01-01`, mã `X01`):** Làm rõ mâu thuẫn giữa `INPUT/chat.md` (Leader nói mua hàng ở Nhật Bản) và `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` (chỉ phục vụ khách tại Việt Nam, tiền tệ VNĐ).
3. **Trạng thái Cổng chặn (`gate_status.json`):** **ĐANG CHẶN (`gate_passed: false`)**
   - `total_questions`: `28`
   - `resolved_count`: `0`
   - `unresolved_count`: `28`
   - Chạy `npm run gate:check` tại thời điểm này sẽ trả về `exit code 1`.
4. **Pha 2 (Báo cáo Requirement Autopsy):** **CHƯA THỰC HIỆN**
   - Tệp `OUTPUT/requirement_autopsy_report.md` chưa được tạo (vì cổng Gate đang chặn theo đúng quy trình).

---

## 8. QUY CHUẨN ĐẦU RA PHA 2 & RÀNG BUỘC CHO AI TIẾP THEO

Khi AI tiếp theo nhận nhiệm vụ tiếp tục xây dựng hoặc vận hành repo này, cần nắm rõ cấu trúc đầu ra mục tiêu và các ràng buộc bắt buộc từ `qa-analyst/prompt_qa_analyst.md`:

### 8.1. Cấu trúc tệp `OUTPUT/requirement_autopsy_report.md` (Khi bước sang Pha 2)
Báo cáo hoàn chỉnh ở Pha 2 bắt buộc gồm 4 phần:
- **Phần A — Bảng mổ xẻ yêu cầu (Requirement Autopsy):**
  - Cột: `Mã D-code | Tên khía cạnh | Bằng chứng trong INPUT | Trạng thái (RO / MO_HO / KHONG_DE_CAP / MAU_THUAN) | Đánh giá chi tiết`.
- **Phần B — Bảng phân tích Missing Rule và Câu hỏi BA:**
  - Cột: `Mã D-code | Nhóm Missing Rule (theo 5 nhóm) | Mức độ rủi ro (CAO / TB / THAP) | Điều tài liệu chưa nói | Câu hỏi đóng cho BA | Câu trả lời đã xác nhận (từ gate_status.json) | Expected Result tương ứng`.
- **Phần C — Bảng tự kiểm định chất lượng theo FACT:**
  - Bảng 10 tiêu chí từ `F1` đến `T2`, ghi rõ `DAT` / `KHONG_DAT` kèm dẫn chứng cụ thể.
- **Phần D — Bảng thống kê định lượng:**
  - Tổng hợp số lượng: Tổng D-code kiểm tra, số quy tắc `RO`, `MO_HO`, `KHONG_DE_CAP`, `MAU_THUAN`, phân bố theo 5 nhóm Missing Rule, và phân bố theo mức độ rủi ro (`CAO`, `TB`, `THAP`).

### 8.2. 6 Ràng buộc tuyệt đối (Hard Constraints) trong `qa-analyst/prompt_qa_analyst.md`
1. **Không sử dụng emoji:** Tuyệt đối không dùng bất kỳ emoji nào trong quá trình giao tiếp, suy luận, tạo prompt hay xuất báo cáo.
2. **Chỉ đọc file Markdown trong `INPUT/`:** Không bao giờ đọc trực tiếp file `.docx` hoặc file nhị phân; nếu có file mới phải chạy `npm run convert` trước.
3. **Tuân thủ tuyệt đối Hard Quality Gate:** Không được bước sang Pha 2 hoặc sinh Expected Result nếu `node tools/gate.js check` trả về exit code `1`.
4. **Độc lập với thư mục `resources/` khi chạy Prompt:** Toàn bộ tri thức đã được đóng gói trong `qa-analyst/prompt_qa_analyst.md`.
5. **Khách quan tuyệt đối:** Không bao giờ biến "thông lệ ngành" thành "quy định của ShopGo" khi tài liệu `INPUT/` hoặc câu trả lời Gate chưa xác nhận.
6. **Ngôn ngữ:** Sử dụng 100% tiếng Việt chuẩn mực ngành kiểm thử phần mềm (QA/Testing).

