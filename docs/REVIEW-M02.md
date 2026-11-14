# Bố cục repo sau khi hoàn thiện M02 — tài liệu cho AI review

Mục đích: giúp người review (AI hoặc người) nắm toàn bộ bố cục, luồng và trạng thái hiện tại của repo, rồi duyệt phần bổ sung Pha 3 của agent `qa-analyst/`.

Trạng thái tại thời điểm viết (14/11/2026):
- Pha 1, cổng chặn, Pha 2: đã xong từ trước (`gate_status.json` 28/28 RESOLVED).
- Pha 3: đã dựng 4 skill. Demo đã chạy Viewpoint và Test Idea, đang **dừng chờ người duyệt cột Lọc**. Test Case và Coverage Review trên `OUTPUT/test_cases.md` chưa chạy. Coverage Review trên bộ test mẫu Lab 4 đang chạy.
- Chưa commit. Xem mục 6.

---

## 1. Cây thư mục

Chú thích: `[NGUỒN]` = sự thật dự án, `[AGENT]` = agent đọc khi chạy, `[SINH RA]` = đầu ra agent, `[HỌC]` = tài liệu cho người học (agent không đọc), `[LƯU TRỮ]` = bản cũ hoặc đáp án.

```
QA-AI/
├── INPUT/                                         [NGUỒN] Single Source of Truth, chỉ đọc file .md
│   ├── Spec Function D.md                         Spec Function D: Áp dụng Mã giảm giá, 5 rule gốc (BR-01..BR-05)
│   ├── Hệ thống Thương mại điện tử “ShopGo”.md    Tổng quan ShopGo: actor, feature map A–H, glossary, NFR
│   ├── chat.md                                    Ghi chú Leader "mua hàng ở Nhật Bản" (tạo mâu thuẫn X01)
│   └── RAW/                                       Bản gốc .docx, không đọc trực tiếp
│
├── gate_status.json                               [NGUỒN] 28 câu trả lời BA đã xác nhận (cổng chặn)
│
├── qa-analyst/                                    [AGENT] Agent QA Analyst theo chuẩn AGENTS.md + SKILL.md
│   ├── AGENTS.md                                  Vai trò, nguồn sự thật, luồng Pha 1 → cổng chặn → Pha 2 → Pha 3,
│   │                                              bảng điều phối 9 skill, nhãn trạng thái, 8 ràng buộc
│   ├── knowledge/
│   │   ├── voucher-domain.md                      Tri thức ngành voucher, checklist D01–D23 (Loại, Rủi ro, W)
│   │   └── viewpoints.md                          MỚI. 8 viewpoint VP-01..VP-08 + bảng gắn D-code + quy tắc mã X
│   ├── skills/
│   │   ├── interrogation-6w/SKILL.md              Pha 1. Tra hỏi 6W
│   │   ├── clarification-questions/               Pha 1. Câu hỏi đóng gửi BA
│   │   │   ├── SKILL.md
│   │   │   └── assets/questions_for_clarification.md
│   │   ├── missing-rule-classification/SKILL.md   Pha 2. 5 nhóm Missing Rule
│   │   ├── requirement-autopsy-report/            Pha 2. Báo cáo 4 phần A–D
│   │   │   ├── SKILL.md
│   │   │   └── assets/requirement_autopsy_report.md
│   │   ├── fact-self-check/SKILL.md               Pha 2. Tự kiểm 10 tiêu chí FACT
│   │   ├── viewpoint-generator/                   MỚI. Pha 3 bước 1
│   │   │   ├── SKILL.md
│   │   │   └── assets/viewpoints.md
│   │   ├── test-idea-generation/                  MỚI. Pha 3 bước 2, sau đó DỪNG chờ người duyệt
│   │   │   ├── SKILL.md
│   │   │   └── assets/test_ideas.md
│   │   ├── test-case-format/                      MỚI. Pha 3 bước 3
│   │   │   ├── SKILL.md
│   │   │   ├── assets/test_cases.md
│   │   │   └── assets/test_cases.csv              Chỉ dòng header CSV
│   │   └── coverage-review/                       MỚI. Pha 3 bước 4
│   │       ├── SKILL.md
│   │       ├── assets/coverage_review.md
│   │       └── assets/lab4_test_suite.md          Bộ 15 test case mẫu Lab 4 (dữ liệu vào để review)
│   └── _archive/prompt_qa_analyst_v1.md           [LƯU TRỮ] Prompt dài trước khi tách
│
├── OUTPUT/                                        [SINH RA]
│   ├── questions_for_clarification.md             Pha 1. 28 câu hỏi
│   ├── requirement_autopsy_report.md              Pha 2. Báo cáo A–D
│   ├── viewpoints.md                              Pha 3.1. Demo đã chạy
│   ├── test_ideas.md                              Pha 3.2. Demo đã chạy, CHỜ DUYỆT cột Lọc
│   ├── coverage_review_lab4.md                    Pha 3.4 trên bộ Lab 4. Đang chạy
│   ├── test_cases.md, test_cases.csv              Pha 3.3. Chưa chạy (chờ duyệt)
│   └── coverage_review.md                         Pha 3.4 trên test_cases.md. Chưa chạy
│
├── tools/                                         Công cụ Node.js
│   ├── convert.js                                 .docx → .md
│   ├── gate.js                                    Cổng chặn: init / check / answer / status
│   ├── ba-answers-demo.js                         Điền câu trả lời BA mẫu
│   ├── check-m02.js                               Kiểm bài tách prompt 09/11 (12 check)
│   └── check-m02-02.js                            Kiểm bản đáp án Pha 3 cũ (xem mục 5, chưa khớp bản mới)
│
└── docs/
    ├── REVIEW-M02.md                              File này
    └── courses/                                   [HỌC] Agent không đọc (ràng buộc 4)
        ├── m01/
        │   ├── 6W.md                              Khung tra hỏi 6W
        │   ├── FACT.md                            10 tiêu chí FACT
        │   ├── MISSING_RULE_TYPES.md              5 nhóm Missing Rule
        │   ├── RCTFC.md                           Khung viết prompt
        │   └── DOMAIN_VOUCHER.md                  Tri thức voucher và checklist D01–D23
        └── m02/
            ├── NOTE.md                            Bảng nối 4 bài: đầu vào, đầu ra, dùng cho phần sau
            ├── viewpoint-generator.md             Bài 2.3 + Lab 2 (nguyên liệu thô của skill)
            ├── test-idea-generation.md            Bài 2.4 + Lab 3
            ├── test-case-format.md                Bài 2.5
            ├── coverage-review.md                 Bài 2.6 + Lab 4
            └── thuc-hanh/
                ├── MINDSET.md                     Cách tách prompt dài thành AGENTS.md + SKILL.md
                ├── TACH-SPEC.md                   Spec tách cũ (cấu trúc rules/templates, đã thay)
                ├── prompt-to-skill.svg
                ├── THUCHANH-0911.md               Prompt thực hành buổi 09/11 (tách prompt)
                ├── THUCHANH-M02-PHA3.md           Prompt thực hành Pha 3 (bản trước brief)
                ├── KICHBAN-M02-BUOI2.md           Kịch bản dạy bài 2.3–2.4, nháp Assignment 2 và Quiz
                ├── dap-an-mau/                    [LƯU TRỮ] Đáp án bài 09/11 (5 skill)
                └── dap-an-mau-02/                 [LƯU TRỮ] Đáp án Pha 3 bản trước brief (xem mục 5)
```

---

## 2. Luồng chạy của agent

```
Pha 1 → Cổng chặn → Pha 2 → Pha 3
                              ├── Viewpoint        → OUTPUT/viewpoints.md
                              ├── Test Idea        → OUTPUT/test_ideas.md   → DỪNG, chờ người duyệt cột Lọc
                              ├── Test Case        → OUTPUT/test_cases.md + OUTPUT/test_cases.csv
                              └── Coverage Review  → OUTPUT/coverage_review.md
                                                     (bộ Lab 4 → OUTPUT/coverage_review_lab4.md)
```

| Bước | Skill | Đọc | Ghi |
|---|---|---|---|
| Pha 1 | interrogation-6w, clarification-questions | `INPUT/`, `knowledge/voucher-domain.md` | `OUTPUT/questions_for_clarification.md` |
| Cổng chặn | (tool) | `node tools/gate.js check` | `gate_status.json` |
| Pha 2 | missing-rule-classification, requirement-autopsy-report, fact-self-check | `INPUT/`, `gate_status.json`, knowledge | `OUTPUT/requirement_autopsy_report.md` |
| Pha 3.1 | viewpoint-generator | Báo cáo Pha 2, `knowledge/viewpoints.md`, `knowledge/voucher-domain.md` | `OUTPUT/viewpoints.md` |
| Pha 3.2 | test-idea-generation | `OUTPUT/viewpoints.md`, báo cáo Pha 2, `INPUT/`, `knowledge/viewpoints.md` | `OUTPUT/test_ideas.md` |
| Điểm dừng | (người) | Người duyệt cột Lọc, xác nhận trong chat | |
| Pha 3.3 | test-case-format | Idea `GIU` trong `OUTPUT/test_ideas.md`, báo cáo Pha 2, `gate_status.json` | `OUTPUT/test_cases.md`, `.csv` |
| Pha 3.4 | coverage-review | Bộ test, báo cáo Pha 2, `OUTPUT/viewpoints.md`, `knowledge/viewpoints.md` | `OUTPUT/coverage_review.md` |

---

## 3. Cách 4 skill Pha 3 được dựng

Nguyên liệu: 4 file trong `docs/courses/m02/`. Quy tắc đã áp dụng:

| Quy tắc | Áp dụng |
|---|---|
| Chép nguyên văn, không thêm nội dung | Mỗi skill do 1 sub-agent dựng, đã so từng dòng với file thô. Chỉ bỏ H1 gốc và mục "Dùng cho phần sau" |
| Nội dung nhiều skill dùng chung → `knowledge/` | Bảng 8 viewpoint + bảng gắn D-code chỉ nằm ở `knowledge/viewpoints.md`; skill ghi "Xem `knowledge/viewpoints.md`" |
| Khuôn đầu ra → `assets/` | Mỗi skill có mục "Khuôn đầu ra" chỉ còn dòng "Dùng khuôn `assets/<file>`" |
| Frontmatter | `name` trùng tên thư mục; `description` nói bước nào của Pha 3, đọc file nào, ghi file nào |
| AGENTS.md | Chỉ thêm (Pha 3, 4 dòng skill, knowledge, file đầu ra, điểm dừng, ràng buộc 7–8). Đổi đúng 2 câu: "với 2 tệp tin" và "dùng chung cho cả 2 pha". Nội dung Pha 1, cổng chặn, Pha 2 giữ nguyên |

Ràng buộc mới trong `AGENTS.md`:
- 7: Expected Result chỉ lấy từ `INPUT/` hoặc `gate_status.json`; không có nguồn thì không viết test case.
- 8: Không bịa Test Data (mã voucher, giá); thiếu thì gắn `[CAN_DU_LIEU]`. Quy tắc này ưu tiên hơn ví dụ trong skill (ví dụ `SALE-A102`).

---

## 4. Kết quả kiểm hiện tại (9 tiêu chí của brief)

| # | Tiêu chí | Kết quả |
|---|---|---|
| 1 | `knowledge/viewpoints.md` + 4 skill có `SKILL.md` và `assets/` | DAT |
| 2 | Frontmatter đúng, `description` nói Pha 3 | DAT |
| 3 | `AGENTS.md` trỏ đủ 4 skill, có Pha 3, có điểm dừng | DAT |
| 4 | Nội dung Pha 1, cổng chặn, Pha 2 không đổi | DAT |
| 5 | `OUTPUT/viewpoints.md` đủ 8 viewpoint, có Top 3 | DAT |
| 6 | `OUTPUT/test_ideas.md` idea nào cũng có Nguồn và Lọc | DAT |
| 7 | `OUTPUT/test_cases.md` + `.csv` | Chưa chạy (chờ duyệt) |
| 8 | 2 file coverage review đủ 3 góc + Gap | Đang chạy / chưa chạy |
| 9 | Không emoji | DAT |

`node tools/check-m02.js` vẫn 12/12 PASS.

Số liệu demo:
- Viewpoint: 24 điểm chưa rõ (D01–D23 + X01, không có mã `RO`), 11 điểm CAO. Top 3: VP-03 (4 CAO), VP-08 (3 CAO), VP-02 (2 CAO, hơn VP-04 về tổng điểm). VP-07 `KHONG_CO_DIEM`.
- Test Idea: 57 idea; 52 `GIU`, 1 `BO_TRUNG`, 4 `NGOAI_PHAM_VI`. BR-01..BR-05 đánh theo thứ tự gạch đầu dòng "Các quy tắc đã nêu" trong `INPUT/Spec Function D.md`.

---

## 5. Điểm cần người review chú ý

**Nguyên liệu thô chưa đủ hoặc tự mâu thuẫn** (giữ nguyên văn theo brief, agent tự quyết khi chạy và ghi lại):
1. Cách đếm "điểm CAO" khi một D-code có nhiều câu hỏi khác mức rủi ro: không quy định. Demo lấy mức cao nhất.
2. Cách đánh số BR-xx: không quy định.
3. `NGOAI_PHAM_VI` gồm "đặt hàng", nhưng D14, D15, D19 là rule của mã xảy ra lúc Đặt hàng. Demo giữ `GIU` nếu điều cần kiểm là về mã.
4. Ví dụ trong `test-case-format` (giỏ 200.000đ, giảm 20% còn 160.000đ) bỏ qua phí ship, trái Q-D03-01 và Q-D20-01; ví dụ dùng mã bịa `SALE-A102`.
5. Ví dụ TI-15 trong `test-idea-generation` có Nguồn "—", trái quy tắc "idea không có nguồn thì bỏ".
6. Câu "Bộ này có ít nhất 4 gap cài sẵn." trong `assets/lab4_test_suite.md` gợi ý đáp án cho agent.

**Câu trả lời BA tự mâu thuẫn** (cần hỏi lại BA):
1. Q-D12-01 (giảm tối đa bằng tạm tính) khác Expected Result Phần B báo cáo Pha 2 (tổng về 0đ).
2. Q-D14-01 (tạm giữ lượt khi Áp dụng) khác Q-D18-01 (loại phương án giữ chỗ khi Áp dụng).
3. Chưa xác nhận tiền giảm % tính trên tạm tính hay tổng có phí ship.
4. Q-D01-01 thêm điều kiện "hóa đơn từ 200.000đ" ngoài phương án.

**Phần lưu trữ chưa đồng bộ với bản mới:**
- `docs/courses/m02/thuc-hanh/dap-an-mau-02/`, `THUCHANH-M02-PHA3.md`, `KICHBAN-M02-BUOI2.md` và `tools/check-m02-02.js` làm trước brief: dùng tên `knowledge/test-viewpoints.md`, cơ chế `Trạng thái duyệt: CHO_DUYET/DA_DUYET`, bộ Lab 4 ở `OUTPUT/`, test data có mã voucher cụ thể. Bản `qa-analyst/` hiện tại theo brief: `knowledge/viewpoints.md`, duyệt qua chat, bộ Lab 4 ở `assets/`, `[CAN_DU_LIEU]`. Cần quyết: xoá, giữ làm lưu trữ, hay cập nhật theo bản mới.

---

## 6. Thay đổi chưa commit

- `docs/` đã di chuyển từ `docs/m02-resources/` sang `docs/courses/m01|m02/` (git hiện thấy là xoá + file mới).
- `docs/INFO.md` bị xoá (không do lần tái cấu trúc này). Khôi phục được bằng `git restore docs/INFO.md`; nội dung cũ mô tả cấu trúc trước khi tách prompt.
- `qa-analyst/prompt_qa_analyst.md` đã chuyển vào `qa-analyst/_archive/prompt_qa_analyst_v1.md` (bài 09/11).
- `tools/check-m02.js`: thêm 1 điều kiện bỏ qua câu "với 2 tệp tin:" (sửa trước khi có brief).
- `gate_status.json`: đã có 28 câu trả lời.

---

## 7. Gợi ý checklist cho người review

1. `qa-analyst/AGENTS.md`: luồng Pha 3 và điểm dừng có rõ để agent không tự đi tiếp không?
2. 4 `SKILL.md` mới: có chép thiếu hoặc lệch so với `docs/courses/m02/*.md` không?
3. `knowledge/viewpoints.md`: đủ 23 D-code, mỗi D-code đúng 1 viewpoint?
4. `OUTPUT/viewpoints.md`: số điểm và Top 3 khớp Phần A, B báo cáo Pha 2?
5. `OUTPUT/test_ideas.md`: nguồn của từng idea có thật trong `INPUT/` hoặc `gate_status.json`? Nhãn Lọc đề xuất có hợp lý (xem TI-13, TI-18, TI-31, TI-41, TI-42, TI-44, TI-54..57)?
6. Có chỗ nào agent dùng thông lệ ngành như quy định của ShopGo không (ràng buộc 5)?
