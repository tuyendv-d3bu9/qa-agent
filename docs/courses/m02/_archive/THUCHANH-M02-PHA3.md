# Thực hành M02 (phần 2) — Hoàn thiện prompt với Pha 3 rồi tách thành skill

Pha 3 = Viewpoint → Test Idea → (người lọc) → Test Case → Coverage Review.
Cách làm giống buổi 09/11: thêm kỹ năng vào prompt dài trước, soi lỗ hổng, rồi tách sang AGENTS.md + SKILL.md.

**Chuẩn bị:** mở chat Gemini mới, cả lớp cùng model. Tải lên 7 file:
`qa-analyst/_archive/prompt_qa_analyst_v1.md` · `qa-analyst/AGENTS.md` · `OUTPUT/requirement_autopsy_report.md` ·
`docs/courses/m02/viewpoint-generator.md` · `docs/courses/m02/test-idea-generation.md` ·
`docs/courses/m02/test-case-format.md` · `docs/courses/m02/coverage-review.md`

Dán nguyên từng prompt. Xong prompt nào, so với màn hình trainer rồi mới sang prompt sau.

---

### Prompt 1 — Bài đọc: 4 bài nối nhau thế nào

```
Mình gửi 7 file: prompt_qa_analyst_v1.md, AGENTS.md, requirement_autopsy_report.md và 4 bài viewpoint-generator.md, test-idea-generation.md, test-case-format.md, coverage-review.md. Bạn chỉ dựa vào 7 file này, trả lời tiếng Việt, không emoji, không mở bài kết bài, chỉ đưa đúng thứ mình hỏi.

1. Bảng 4 dòng theo thứ tự làm: | Bài | Đọc file | Ghi file | Bài nào dùng đầu ra này |
2. Bảng các nội dung xuất hiện ở từ 2 bài trở lên: | Nội dung | Có ở bài nào |. Chỉ xét: 8 viewpoint, bảng gắn D-code, nhãn lọc idea, 8 trường test case, 9 điểm biên, tag viewpoint.
```

### Prompt 2 — Mỗi phần của bài học đi đâu

```
Áp 4 câu hỏi sau cho từng phần của 4 bài (Mục đích, Đầu vào đầu ra, Kiến thức cốt lõi, Cách làm, Khuôn đầu ra, Ví dụ ShopGo, Lỗi hay gặp, Dùng cho phần sau). Gặp câu "có" đầu tiên thì dừng:
- Agent cần biết ở mọi bước? → AGENTS.md
- Là cách làm một việc cụ thể? → skills/<tên>/SKILL.md
- Là hình dạng file đầu ra? → assets/ của skill tạo ra file đó
- Là kiến thức nhiều skill dùng chung? → knowledge/
Thêm 1 lựa chọn: BO = tài liệu cho người học, agent không cần.

Cho mình bảng | Bài | Phần | Đặt ở | Lý do (tối đa 12 từ) |. Phần nào nhiều skill cùng dùng thì ghi rõ tên file knowledge.
```

### Prompt 3 — Lab: soi 4 bài như soi requirement trước khi đưa vào prompt

```
Trước khi đưa 4 bài vào prompt, soi chúng như soi một requirement. Kiểm 6 điểm, trả đúng bảng | K | Có lỗ hổng không (CO / KHONG) | Bằng chứng (tối đa 20 từ) | Đề xuất sửa (tối đa 20 từ) |
K1. 8 viewpoint được dùng ở mấy bài? Nếu mỗi skill chép lại bảng 8 viewpoint thì khi đổi 1 viewpoint phải sửa mấy file?
K2. test-idea-generation dùng nguồn BR-01, BR-02... Có bài nào nói BR được đánh số từ đâu không?
K3. "Người lọc, không phải AI." Agent biết người đã lọc xong bằng cách nào? Có dấu hiệu nào trong file không?
K4. Ví dụ ở test-case-format: giỏ 200.000đ, mã tối thiểu 200.000đ, giảm 20% còn 160.000đ. Đối chiếu Phần B requirement_autopsy_report.md: Q-D03-01 tối thiểu tính trên tổng có phí ship; Q-D20-01 tiền giảm trừ vào tổng có phí ship. Ví dụ còn đúng không? Tiền giảm % tính trên tạm tính hay tổng đã được xác nhận chưa?
K5. coverage-review dùng "bộ test mẫu Lab 4" nằm trong tài liệu học. Ràng buộc 4 của AGENTS.md cho agent đọc docs/ không? Agent lấy bộ test này ở đâu?
K6. NGOAI_PHAM_VI gồm "đặt hàng". Vậy idea cho D14 (trừ lượt khi Đặt hàng) và D19 (mã hết hạn trước khi bấm Đặt hàng) có bị loại hết không?
```

### Prompt 4 — Viết phần bổ sung cho prompt dài (prompt v2)

```
Viết phần bổ sung để prompt_qa_analyst_v1.md thành v2. Giữ nguyên mọi mục cũ, chỉ chèn thêm, đúng các chỗ sau:
- II.3 "Bộ 8 viewpoint kiểm thử (Tri thức dùng chung cho Pha 3)": bảng 8 viewpoint thêm cột Tag, bảng gắn D-code giữ đúng khuôn của bài (cột 1 dạng `VP-01 Happy Path`, cột 2 là danh sách D-code), câu về mã X. Viết 1 lần duy nhất ở đây.
- III.3 Viewpoint Generator (Pha 3.1), III.4 Sinh test idea (Pha 3.2), III.5 Chuẩn hóa test case (Pha 3.3), III.6 Coverage Review (Pha 3.4). Mỗi mục gồm: Mục đích, Đầu vào, Cách làm, Quy tắc, Lỗi hay gặp, Đầu ra. Không chép lại bảng 8 viewpoint. Vì các mục này sẽ được chép nguyên văn sang skill, không viết "xem II.3" hay "xem VI.3": ghi thẳng `knowledge/test-viewpoints.md`, và mục Đầu ra viết dạng "Dùng khuôn `assets/<file>`, ghi `OUTPUT/<file>`".
- IV thêm đoạn "Pha 3" với sơ đồ có ĐIỂM DỪNG NGƯỜI LỌC giữa test idea và test case.
- VI đổi câu mở đầu thành danh sách file theo pha; thêm VI.3–VI.6 là khuôn của 4 file đầu ra. Dòng ví dụ ở khuôn VI.3 dùng VP-03.
Sửa luôn 6 lỗ hổng ở Prompt 3 theo đề xuất của bạn. Trả về đúng phần chèn, mỗi phần ghi rõ chèn vào sau mục nào.
```

### Prompt 5 — Bảng tách và frontmatter

```
Prompt v2 sẽ tách tiếp theo cấu trúc đã có. Thêm vào qa-analyst/:

qa-analyst/
├── knowledge/test-viewpoints.md
└── skills/
    ├── viewpoint-generator/SKILL.md
    ├── viewpoint-generator/assets/viewpoints.md
    ├── test-idea-generation/SKILL.md
    ├── test-idea-generation/assets/test_ideas.md
    ├── test-case-format/SKILL.md
    ├── test-case-format/assets/test_cases.md
    ├── coverage-review/SKILL.md
    └── coverage-review/assets/coverage_review.md

Làm 2 việc:
1. Bảng | Mục v2 | Sang file |, đúng 11 dòng theo thứ tự: II.3, III.3, III.4, III.5, III.6, IV (đoạn Pha 3), câu mở đầu VI, VI.3, VI.4, VI.5, VI.6.
2. Frontmatter cho 4 SKILL.md mới: name trùng tên thư mục; description 1–2 câu nói skill làm gì, ghi file đầu ra trong OUTPUT/, và dùng ở Pha 3 bước nào.
```

### Prompt 6 — Viết lệnh cho agent code

```
Gộp kết quả Prompt 4 và Prompt 5 thành 1 lệnh cho agent code. Dùng đúng khuôn dưới, điền đủ chỗ <...>, không thêm gì khác:

Mục tiêu: thêm Pha 3 vào agent qa-analyst theo chuẩn AGENTS.md + SKILL.md. Lập plan và task list trước, rồi làm.
Bước 1. Tạo qa-analyst/_archive/prompt_qa_analyst_v2.md = prompt_qa_analyst_v1.md + các phần chèn sau, đúng vị trí:
<toàn bộ kết quả Prompt 4>
Bước 2. Tạo đúng cấu trúc:
<cây thư mục ở Prompt 5>
Bước 3. Chép NGUYÊN VĂN thân từng mục của v2 sang file theo bảng, không viết lại:
<bảng Prompt 5>
Bước 4. Đầu mỗi SKILL.md mới đặt frontmatter:
<4 khối frontmatter ở Prompt 5>
Bước 5. Trong qa-analyst/AGENTS.md: thêm 4 dòng Pha 3 vào bảng skill, thêm knowledge/test-viewpoints.md vào phần tri thức dùng chung.
Bước 6. Chạy node tools/check-m02.js (phải giữ 12/12 PASS) và node tools/check-m02-02.js. Có FAIL thì sửa theo thông báo, chạy lại đến khi 10/10 PASS.
Bước 7. Báo lại kết quả bước 6.
```

---

### Sang agent code

**Lượt 1 — tách.** Copy nguyên câu trả lời Prompt 6, dán vào agent. Xong khi thấy `Kết quả: 10/10 PASS`.

**Lượt 2 — chạy Pha 3 đến điểm dừng.**

```
Đọc qa-analyst/AGENTS.md và làm Pha 3.
```

Agent phải tự dừng sau khi ghi `OUTPUT/test_ideas.md` với `Trạng thái duyệt: CHO_DUYET`. Agent đi tiếp sang test case mà không dừng là sai, sửa lại AGENTS.md.

**Người lọc.** Mở `OUTPUT/test_ideas.md`, đọc cột Lọc, sửa nhãn nếu không đồng ý. Ghi tên vào `Người lọc:`, đổi thành `Trạng thái duyệt: DA_DUYET`.

**Lượt 3 — chạy tiếp.**

```
Đã duyệt test_ideas.md. Đọc qa-analyst/AGENTS.md và làm tiếp Pha 3.
```

**Lab 4 — review bộ test mẫu.**

```
Đọc qa-analyst/AGENTS.md. Dùng skill coverage-review cho bộ test OUTPUT/lab4_test_suite.md.
```

Bộ này có ít nhất 4 gap cài sẵn. Tìm đủ trước khi xem đáp án.

**Kiểm cuối.**

```
node tools/check-m02-02.js --output OUTPUT
```

Xong khi thấy `Kết quả: 14/14 PASS`.
