# Đáp án — Thực hành M02 phần 2 (Pha 3)

Đi kèm `docs/courses/m02/thuc-hanh/THUCHANH-M02-PHA3.md`. Câu chữ của Gemini sẽ khác, so theo ý chính.

| File đáp án | Nội dung |
|---|---|
| `qa-analyst/_archive/prompt_qa_analyst_v2.md` | Prompt dài hoàn chỉnh = v1 nguyên văn + phần Pha 3 (Prompt 4) |
| `qa-analyst/` | Bản tách hoàn chỉnh: 9 skill, 2 file knowledge, AGENTS.md có Pha 3 |
| `OUTPUT/` | Đầu ra mẫu khi chạy agent: viewpoints, test_ideas, test_cases (md + csv), coverage_review, coverage_review_lab4 |

Kiểm đáp án:

```
node tools/check-m02-02.js docs/courses/m02/thuc-hanh/dap-an-mau-02/qa-analyst --output docs/courses/m02/thuc-hanh/dap-an-mau-02/OUTPUT
```

---

## Prompt 1 — 4 bài nối nhau thế nào

**1.**

| Bài | Đọc file | Ghi file | Bài nào dùng đầu ra này |
|---|---|---|---|
| viewpoint-generator | `OUTPUT/requirement_autopsy_report.md` (Phần A, B), danh mục D01–D23 | `OUTPUT/viewpoints.md` | test-idea-generation, coverage-review |
| test-idea-generation | `OUTPUT/viewpoints.md`, Phần B báo cáo, `INPUT/` | `OUTPUT/test_ideas.md` | test-case-format |
| test-case-format | `OUTPUT/test_ideas.md` (idea `GIU`), báo cáo Pha 2 | `OUTPUT/test_cases.md`, `OUTPUT/test_cases.csv` | coverage-review (Module 4, 6) |
| coverage-review | Bộ test, báo cáo Pha 2, `OUTPUT/viewpoints.md` | `OUTPUT/coverage_review.md` | Module 3, Module 5 |

**2.**

| Nội dung | Có ở bài nào |
|---|---|
| 8 viewpoint | viewpoint-generator (định nghĩa), test-idea-generation (cột Viewpoint), coverage-review (Góc 2), test-case-format (qua tag) |
| Bảng gắn D-code | viewpoint-generator |
| Nhãn lọc idea | test-idea-generation, test-case-format (chỉ lấy `GIU`) |
| 8 trường test case | test-case-format |
| 9 điểm biên | coverage-review |
| Tag viewpoint | test-case-format (map 1–1 với 8 viewpoint) |

Ý chính: 8 viewpoint dùng ở 3–4 bài → phải là **knowledge**. Các nội dung còn lại chỉ 1 bài dùng → nằm trong skill của bài đó.

## Prompt 2 — Mỗi phần đi đâu

| Bài | Phần | Đặt ở | Lý do |
|---|---|---|---|
| Cả 4 bài | Mục đích | SKILL.md (1 câu đầu) | Giúp agent biết skill làm gì |
| Cả 4 bài | Đầu vào, đầu ra | SKILL.md | Cách làm: đọc gì, ghi gì |
| viewpoint-generator | 8 viewpoint, bảng gắn D-code | `knowledge/test-viewpoints.md` | 3 skill cùng dùng |
| test-case-format | 8 trường, Priority, Tags, quy tắc Expected | SKILL.md | Chỉ skill này dùng |
| coverage-review | 3 góc, nhãn phủ, 9 điểm biên | SKILL.md | Chỉ skill này dùng |
| test-idea-generation | Nguồn idea, cách viết, nhãn lọc | SKILL.md | Chỉ skill này dùng |
| Cả 4 bài | Cách làm | SKILL.md | Cách làm một việc |
| Cả 4 bài | Khuôn đầu ra | `assets/` của skill đó | Hình dạng file đầu ra |
| Cả 4 bài | Lỗi hay gặp | SKILL.md | Là quy tắc agent phải tránh |
| Cả 4 bài | Ví dụ ShopGo | BO (giữ 1 dòng mẫu trong assets) | Ví dụ cho người học, dễ thành dữ liệu giả |
| Cả 4 bài | Dùng cho phần sau | BO | Nói về khóa học, agent không cần |
| test-idea-generation | "Test idea khác test case" | BO | Kiến thức cho người học |
| coverage-review | "Coverage thấp có xấu không", bộ test mẫu Lab 4 | BO | Tài liệu học; bộ test Lab 4 là dữ liệu vào, để ở `OUTPUT/` |
| (mới) | Luồng Pha 3 + điểm dừng người lọc | AGENTS.md | Điều phối, mọi bước cần biết |

## Prompt 3 — Soi 4 bài như soi requirement

| K | Có lỗ hổng không | Bằng chứng | Đề xuất sửa |
|---|---|---|---|
| K1 | CO | 8 viewpoint ở viewpoint-generator, test-idea, coverage-review | Viết 1 lần ở `knowledge/test-viewpoints.md`, skill chỉ trỏ tới |
| K2 | CO | Bài chỉ ví dụ "BR-02 mã chỉ dùng khi đơn đạt tối thiểu", không nói đánh số từ đâu | BR đánh theo thứ tự gạch đầu dòng "Các quy tắc đã nêu" trong Spec Function D |
| K3 | CO | "Người lọc, không phải AI" nhưng không có dấu hiệu duyệt trong file | Thêm dòng `Trạng thái duyệt: CHO_DUYET/DA_DUYET`, agent dừng khi CHO_DUYET |
| K4 | CO | Q-D03-01: tối thiểu tính trên tổng có phí ship; ví dụ không có phí ship | Precondition bắt buộc ghi tạm tính và phí vận chuyển; cơ sở tính % chưa xác nhận |
| K5 | CO | Ràng buộc 4: không đọc `docs/`; bộ test Lab 4 nằm trong docs | Bộ test là dữ liệu vào, để `OUTPUT/lab4_test_suite.md`; skill nhận bộ test do người dùng chỉ định |
| K6 | CO | NGOAI_PHAM_VI gồm "đặt hàng" sẽ loại idea D14, D15, D19 | Xét kết quả cần kiểm: nếu là về mã (lượt, tiền giảm, hiệu lực) thì vẫn trong phạm vi |

Điểm nhấn khi giảng K4: Q-D02-01 viết `Min(Giá trị tính giảm x Tỷ lệ %, trần)` nhưng chưa có câu hỏi nào chốt "Giá trị tính giảm" là tạm tính hay tổng có phí ship. Đây là missing rule mới phát hiện ở Pha 3 → quay lại hỏi BA, không tự đoán.

Điểm nhấn thứ hai: báo cáo Pha 2 tự mâu thuẫn ở D12. Q-D12-01 trả lời "tiền giảm tối đa bằng tạm tính tiền hàng", nhưng Expected Result lại viết "tổng tiền sau giảm về 0đ", còn Q-D20-01 cho trừ vào tổng có phí ship. Vì vậy điểm biên B-07 đến B-09 (tiền giảm so với tiền hàng) chưa viết được Expected chắc chắn. Theo câu trả lời trong `gate_status.json`, và ghi nhận để hỏi lại BA.

## Prompt 4 — Phần bổ sung prompt v2

Xem `qa-analyst/_archive/prompt_qa_analyst_v2.md`. Phần chèn so với v1:

| Phần chèn | Dòng trong v2 | Chèn sau |
|---|---|---|
| II.3 Bộ 8 viewpoint kiểm thử | 90–121 | II.2 |
| III.3 – III.6 (4 kỹ năng Pha 3) | 157–416 | III.2 |
| Đoạn Pha 3 + sơ đồ điểm dừng người lọc | 456–476 | Sơ đồ cổng chặn ở IV |
| Câu mở đầu VI (danh sách file theo pha) | 501–504 | Thay câu "với 2 tệp tin" |
| VI.3 – VI.6 (4 khuôn đầu ra) | 527–626 | VI.2 |

v1 giữ nguyên văn, kể cả các lỗi đã sửa ở bài 09/11 (TRUNG BÌNH, nhãn MOT_PHAN, ràng buộc 4 cũ). Bản tách giữ các bản sửa đó.

## Prompt 5 — Bảng tách và frontmatter

| Mục v2 | Sang file |
|---|---|
| II.3 | `knowledge/test-viewpoints.md` |
| III.3 | `skills/viewpoint-generator/SKILL.md` |
| III.4 | `skills/test-idea-generation/SKILL.md` |
| III.5 | `skills/test-case-format/SKILL.md` |
| III.6 | `skills/coverage-review/SKILL.md` |
| IV (đoạn Pha 3) | `AGENTS.md` (mục Luồng làm việc và cổng chặn) |
| Câu mở đầu VI | `AGENTS.md` (mục Kỹ năng và tri thức) |
| VI.3 | `skills/viewpoint-generator/assets/viewpoints.md` |
| VI.4 | `skills/test-idea-generation/assets/test_ideas.md` |
| VI.5 | `skills/test-case-format/assets/test_cases.md` |
| VI.6 | `skills/coverage-review/assets/coverage_review.md` |

```markdown
---
name: viewpoint-generator
description: Xếp các D-code và mã X chưa RO trong báo cáo Pha 2 vào 8 viewpoint cố định, đếm điểm chưa rõ và điểm CAO, chọn Top 3, xuất OUTPUT/viewpoints.md. Dùng ở bước đầu Pha 3, sau khi đã có OUTPUT/requirement_autopsy_report.md.
---
```

```markdown
---
name: test-idea-generation
description: Sinh test idea từ rule gốc BR, câu trả lời đã xác nhận Q-ID và 8 viewpoint, đề xuất nhãn lọc GIU, BO_TRUNG, NGOAI_PHAM_VI, xuất OUTPUT/test_ideas.md rồi dừng chờ người duyệt. Dùng ở Pha 3, sau viewpoint-generator.
---
```

```markdown
---
name: test-case-format
description: Chuyển test idea nhãn GIU đã được người duyệt thành test case đủ 8 trường kèm cột Nguồn, xuất OUTPUT/test_cases.md và OUTPUT/test_cases.csv để import Jira/TestRail. Dùng ở Pha 3, chỉ khi OUTPUT/test_ideas.md có Trạng thái duyệt: DA_DUYET.
---
```

```markdown
---
name: coverage-review
description: Rà độ phủ một bộ test theo 3 góc Requirement, Viewpoint Balance, Boundary, gán nhãn COVER, MOT_PHAN, CHUA_COVER, liệt kê gap kèm rủi ro và đề xuất test case, xuất OUTPUT/coverage_review.md. Dùng ở cuối Pha 3, sau khi có bộ test.
---
```

## Prompt 6 — Lệnh cho agent code

Điền khuôn bằng kết quả Prompt 4 và 5 ở trên. Kết quả đúng khi agent tạo ra thư mục giống `qa-analyst/` trong đáp án và:

```
node tools/check-m02.js      -> Kết quả: 12/12 PASS
node tools/check-m02-02.js   -> Kết quả: 10/10 PASS
```

## Lab 4 — Gap cài sẵn trong bộ test mẫu

Chi tiết: `OUTPUT/coverage_review_lab4.md` (37 gap). Học viên tìm được 4 nhóm dưới đây là đạt.

| Nhóm gap | Ví dụ trong bộ test | Vì sao |
|---|---|---|
| Test sai rule | TC-14 Checkout không đăng nhập vẫn áp được voucher | Trái Q-D07-01: phải đăng nhập mới áp mã |
| Test sai rule | TC-10 Nhập sai mã 5 lần liên tiếp | Bám phương án khóa sau 5 lần, đã bị loại ở Q-D21-01 (không giới hạn) |
| Test sai rule | TC-07 Áp mã giảm bằng tổng tiền (đơn = 0đ) | Q-D12-01: giảm tối đa bằng tạm tính, tổng vẫn còn phí ship |
| Viewpoint lạ | TC-13 ghi "Edge Case" | Không thuộc 8 viewpoint, đếm vào "Ngoài danh sách" |
| Viewpoint 0 TC | Performance, Accessibility, Integration | Không TC nào |
| Thiếu biên | Thiếu B-03, B-04, B-05, B-07, B-08, B-09; B-01 và B-06 chỉ MOT_PHAN | TC-03 "dưới min order" không đúng 1đ; TC-04 không nêu mốc giờ |
| Rule chưa phủ | D05, D06, D14, D15, D16, D18, D19, D20, D22, X01... | Không có TC nào chạm tới |

## Điểm cần nói với lớp: mâu thuẫn trong câu trả lời BA

Phát hiện khi chạy Pha 3. Đây là missing rule mới, cần hỏi lại BA, không tự đoán:

1. Q-D12-01 (giảm tối đa bằng tạm tính) khác Expected Result trong báo cáo Pha 2 (tổng về 0đ).
2. Q-D14-01 chọn tạm giữ lượt khi Áp dụng, Q-D18-01 lại loại phương án giữ chỗ khi Áp dụng. Chưa dựng được test tranh lượt cuối.
3. Chưa chốt tiền giảm % tính trên tạm tính hay tổng. Test case mẫu chọn số liệu cho cùng kết quả ở cả hai cách (VOUCHER-002, VOUCHER-022).
4. Q-D01-01 thêm điều kiện "hóa đơn từ 200.000đ" ngoài phương án, chưa nói Freeship giảm bao nhiêu.
5. Q-D06-01 có lỗi "đã dùng mã" nhưng Q-D13-01 chỉ liệt kê 4 nguyên nhân lỗi.
6. D22 chưa có ngưỡng thời gian phản hồi.

Danh sách idea bị chặn và câu hỏi BA đề xuất: mục "Idea chưa viết được" trong `OUTPUT/test_cases.md`.
