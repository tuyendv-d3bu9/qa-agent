# Thực hành 09/11 — M02: từ prompt dài thành AGENTS.md + SKILL.md

**Chuẩn bị:** mở chat Gemini mới, cả lớp cùng model. Tải lên 3 file:
`docs/INFO.md` · `qa-analyst/prompt_qa_analyst.md` · `OUTPUT/questions_for_clarification.md`

Dán nguyên từng prompt. Xong prompt nào, so với màn hình trainer rồi mới sang prompt sau.

---

### Prompt 1 — Bài 2.1: đọc prompt theo RCTFC

```
Mình gửi 3 file: INFO.md, prompt_qa_analyst.md, questions_for_clarification.md. Bạn chỉ dựa vào 3 file này, trả lời tiếng Việt, không emoji, không mở bài kết bài, chỉ đưa đúng thứ mình hỏi.

Đọc prompt_qa_analyst.md theo RCTFC. Cho mình bảng 7 dòng, mỗi mục "##" một dòng:
| Mục | RCTFC (R / C-Context / T / F / C-Constraint) | Câu làm căn cứ (tối đa 15 từ) |
```

### Prompt 2 — Bài 2.2: câu hỏi đến từ góc 6W nào

```
Với 28 câu hỏi trong questions_for_clarification.md: lấy D-code, tra cột "W liên quan" ở bảng INFO.md mục 6.3, lấy W đầu tiên. D01 và câu có mã X thì ghi KHONG_W.
Cho mình đúng 1 bảng, các dòng W1, W2, W3, W4, W5, W6, KHONG_W, Tổng:
| Nhóm W | Số câu | ID |
```

### Prompt 3 — Lab 1: soi chính prompt như soi requirement

```
Soi chính prompt_qa_analyst.md như soi một requirement. Kiểm 6 điểm, trả đúng bảng | K | DAT hoặc KHONG_DAT | Bằng chứng (tối đa 20 từ) |
K1. Nhãn RO, MO_HO, KHONG_DE_CAP, MAU_THUAN có được định nghĩa ở đâu không?
K2. Mục III.2 chọn điểm cần phân loại bằng nhãn nào? Có khớp nhãn ở Phần A mục VI.2 không?
K3. Mức rủi ro có dùng thống nhất CAO / TB / THAP không?
K4. Danh mục D01–D23 có cột Loại và Rủi ro gợi ý như bảng INFO.md mục 6.3 không?
K5. Có quy tắc đặt ID câu hỏi và mã X (như Q-X01-01) không?
K6. Ràng buộc 4 ở mục VII nhắc thư mục nào? Có khớp cây thư mục INFO.md mục 2 không?
```

### Prompt 4 — Tách prompt thành AGENTS.md + SKILL.md

```
Prompt 217 dòng này khó sửa. Mình chuyển nó sang chuẩn agent: AGENTS.md là hướng dẫn chung agent luôn đọc, mỗi kỹ năng là 1 thư mục có SKILL.md, khuôn đầu ra đặt trong assets/ của skill dùng nó, tri thức ngành dùng chung để ở knowledge/. Cấu trúc cố định:

qa-analyst/
├── AGENTS.md
├── knowledge/voucher-domain.md
└── skills/
    ├── interrogation-6w/SKILL.md
    ├── clarification-questions/SKILL.md
    ├── clarification-questions/assets/questions_for_clarification.md
    ├── missing-rule-classification/SKILL.md
    ├── requirement-autopsy-report/SKILL.md
    ├── requirement-autopsy-report/assets/requirement_autopsy_report.md
    └── fact-self-check/SKILL.md

Làm 2 việc:
1. Bảng | Mục gốc | Sang file |, đúng 11 dòng theo thứ tự: I, II.1, II.2, III.1, III.2, IV, V, câu mở đầu VI, VI.1, VI.2, VII. Câu hỏi để chọn: mục này là hướng dẫn chung (AGENTS.md), tri thức nghiệp vụ (knowledge), cách làm một việc (SKILL.md), hay hình dạng file đầu ra (assets)?
2. Viết frontmatter cho 5 SKILL.md theo luật: name trùng tên thư mục; description 1–2 câu nói skill làm gì và dùng ở Pha 1 hay Pha 2. Dạng:
---
name: <tên>
description: <mô tả>
---
```

### Prompt 5 — Sửa 6 lỗi, mỗi lỗi một file

```
Viết nội dung sửa cho 6 lỗi ở Prompt 3, theo cấu trúc mới. Với mỗi lỗi ghi: sửa ở file nào, và đoạn chữ mới.
K1. Thêm vào AGENTS.md mục "## Nhãn trạng thái": bảng | Nhãn | Khi nào dùng |, 4 dòng: RO = tài liệu đủ để viết Expected Result; MO_HO = có nhắc nhưng thiếu giá trị hoặc điều kiện; KHONG_DE_CAP = không nhắc tới; MAU_THUAN = hai nguồn nói khác nhau. Thêm 1 câu: nhãn 6W (CO, MOT_PHAN, KHONG) chỉ dùng ở Pha 1.
K2. Trong missing-rule-classification: câu chọn điểm theo nhãn MOT_PHAN, KHONG đổi thành theo trạng thái MO_HO, KHONG_DE_CAP, MAU_THUAN.
K3. Cùng file: đổi "TRUNG BÌNH" thành "TB".
K4. Trong voucher-domain.md: đổi danh sách D01–D23 thành bảng | D-code | Nội dung kiểm tra | Loại gợi ý | Rủi ro gợi ý | W liên quan |. Nội dung kiểm tra giữ nguyên câu trong prompt. Loại, Rủi ro lấy từ INFO.md mục 6.3. W liên quan chỉ ghi nhóm (W3-4 thành W3, nhiều nhóm ngăn bằng ", ", không có ghi —).
K5. Viết thân SKILL.md của clarification-questions, 4 mục: Khi nào đặt câu hỏi; Đặt mã (ID Q-<D-code>-<2 số>, mâu thuẫn mã X01, X02..., ID Q-X01-01); Viết câu hỏi (câu đóng, ít nhất 2 phương án A, B..., ngăn bằng <br>); Đầu ra (dùng assets/questions_for_clarification.md, ghi OUTPUT/questions_for_clarification.md, chạy node tools/gate.js init).
K6. Ràng buộc 4 trong AGENTS.md: đổi thành "toàn bộ tri thức của agent nằm trong qa-analyst/, không đọc docs/ hay resources/".
Thêm: viết thân SKILL.md của requirement-autopsy-report, 3 mục: Điều kiện (chỉ làm khi gate check exit 0); Cách làm (Phần A gán nhãn trạng thái, Phần B dùng missing-rule-classification và gate_status.json, Phần C dùng fact-self-check, Phần D đếm); Đầu ra.
```

### Prompt 6 — Viết lệnh cho agent code

```
Gộp kết quả Prompt 4 và Prompt 5 thành 1 lệnh cho agent code. Dùng đúng khuôn dưới, điền đủ chỗ <...>, không thêm gì khác:

Mục tiêu: chuyển qa-analyst/prompt_qa_analyst.md thành AGENTS.md và SKILL.md theo chuẩn. Lập plan và task list trước, rồi làm.
Bước 1. Chuyển qa-analyst/prompt_qa_analyst.md sang qa-analyst/_archive/prompt_qa_analyst_v1.md. Mọi nội dung lấy từ bản này.
Bước 2. Tạo đúng cấu trúc:
<cây thư mục ở Prompt 4>
Bước 3. Chép NGUYÊN VĂN thân từng mục gốc sang file theo bảng, không viết lại:
<bảng Prompt 4>
Bước 4. Đầu mỗi SKILL.md đặt frontmatter:
<5 khối frontmatter ở Prompt 4>
Bước 5. Sửa lỗi và thêm nội dung mới:
<toàn bộ kết quả Prompt 5, mỗi lỗi ghi rõ file>
Bước 6. Chạy node tools/check-m02.js. Có FAIL thì sửa theo thông báo, chạy lại đến khi 12/12 PASS.
Bước 7. Báo lại kết quả bước 6.
```

---

### Sang agent code

Copy nguyên câu trả lời Prompt 6, dán vào agent. Agent tự lập plan, task và làm.

Xong khi thấy `Kết quả: 12/12 PASS`. Từ giờ chạy agent bằng: `Đọc qa-analyst/AGENTS.md và làm theo.`
