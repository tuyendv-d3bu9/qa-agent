# Kịch bản buổi dạy M02 — Buổi 2: Viewpoint và Test Idea

Dành cho trainer. Buổi này dạy mục 1–2 của phần còn lại Module 02. Mục 3–5 chuyển sang buổi sau.

| Mục | Nội dung | Thời lượng gốc | Tối nay |
|---|---|---|---|
| 1 | Bài 2.3 Viewpoint-Based Testing + Lab 2 Viewpoint Generator | 50' + 30' | 40' + 30' |
| 2 | Bài 2.4 AI-Generated Test Ideas + Lab 3 Test Idea Sprint | 40' + 20' | 33' + 20' |
| | Mở đầu 5', nghỉ 5', tổng kết 7' | | 17' |
| | **Tổng** | | **140' = 2h20** |

## 1. Mục tiêu và điều kiện đầu vào

**Mục tiêu.** Hết buổi, học viên:
- Xếp 24 điểm chưa rõ của Function D vào 8 viewpoint cố định, đếm phân bố, chọn đúng Top 3.
- Viết được test idea dạng "điều kiện → kết quả", có nguồn BR / Q-ID / VP, có số tiền ở biên.
- Tự lọc idea (GIU / BO_TRUNG / NGOAI_PHAM_VI) và hiểu vì sao AI phải dừng chờ người duyệt.

**Kiểm trước giờ học (trainer + học viên, 5 phút đầu):**

| Kiểm | Lệnh / chỗ xem | Phải thấy |
|---|---|---|
| Bản tách buổi trước còn nguyên | `node tools/check-m02.js` | `Kết quả: 12/12 PASS` |
| Cổng chặn Pha 1 | `gate_status.json` | `resolved_count: 28`, `gate_passed: true` |
| Báo cáo Pha 2 | `OUTPUT/requirement_autopsy_report.md` | Có Phần A (24 mục, 0 `RO`), Phần B (28 Q-ID có cột Câu trả lời đã xác nhận) |
| Đáp án của trainer | `docs/courses/m02/thuc-hanh/dap-an-mau-02/OUTPUT/viewpoints.md`, `test_ideas.md` | Mở sẵn tab, không chiếu trước khi lab xong |

Học viên chưa đạt 12/12: cho chép `qa-analyst/` từ bạn bên cạnh hoặc từ `dap-an-mau-01`, không sửa trong giờ.

## 2. Timeline

### 00:00–00:05 Mở đầu

| Nội dung | Demo trainer | Học viên | Đầu ra kiểm |
|---|---|---|---|
| Nhắc buổi trước: prompt dài → AGENTS.md + skills. Chuỗi hôm nay: Requirement → **Viewpoint → Test idea → Người lọc** → Test case (buổi sau) | Chạy `check-m02.js` trên màn hình | Chạy cùng lệnh, giơ tay nếu chưa 12/12 | 12/12 PASS, gate 28/28 |

### 00:05–00:45 Bài 2.3 Viewpoint-Based Testing (40')

| Giờ | Nội dung giảng | Demo trainer | Học viên | Đầu ra kiểm |
|---|---|---|---|---|
| 00:05–00:15 | - Viewpoint = góc nhìn cố định để không dồn test vào Happy Path<br>- 8 viewpoint VP-01..VP-08, mỗi cái 1 câu hỏi chủ đạo<br>- Cố định để so được giữa các bộ test, không tự thêm | Chiếu bảng 8 viewpoint trong `viewpoint-generator.md` | Đọc theo, nêu 1 ví dụ test cho VP-04 và VP-07 | Học viên phân biệt Negative (sai hẳn) và Boundary (đúng ở biên) |
| 00:15–00:25 | - Mỗi D-code thuộc đúng 1 viewpoint chính, X01 xếp VP-08<br>- **"Edge Case" không phải viewpoint**: edge case nằm trong Boundary hoặc Negative (dù Phần D báo cáo có nhóm Missing Rule "Edge case bị bỏ qua" — đó là nhóm lỗi, không phải góc test)<br>- **VP-07 không có D-code** → ghi `KHONG_CO_DIEM`, vẫn giữ dòng. Không có điểm không có nghĩa là không cần test | Chiếu bảng gắn D-code | Trả lời miệng: Q-D04-01 (mốc 23:59:59) thuộc VP nào? (VP-03) | Không ai đề xuất VP "Edge Case" |
| 00:25–00:35 | - 4 bài học Pha 3 nối nhau qua file trong `OUTPUT/`<br>- Bảng 8 viewpoint dùng ở nhiều bài → sau này là `knowledge/test-viewpoints.md` (MINDSET: mỗi thông tin một nơi) | Chạy Demo prompt A (dưới) trên Gemini | Mở chat Gemini mới, tải 5 file (mục 3), chạy Demo prompt A cùng trainer | Bảng 2 dòng đúng thứ tự viewpoint-generator → test-idea-generation |
| 00:35–00:45 | - Cách đếm: điểm chưa rõ = mã khác `RO`; điểm `CAO` = mã có Q-ID mức `CAO` ở Phần B<br>- Top 3: nhiều `CAO` nhất → bằng thì tổng điểm → bằng nữa thì ID nhỏ<br>- Tính tay trước, rồi mới tin AI | Tính bảng phân bố trên bảng trắng (mục 3, "Đáp án tham chiếu Lab 2"), che cột kết quả | Tính tay 2 dòng VP-03 và VP-08 | Học viên ra VP-03 = 5 điểm / 4 CAO |

**Demo prompt A** (rút gọn Prompt 1 của `THUCHANH-M02-PHA3.md`, chỉ 2 bài):

```
Mình gửi 5 file: requirement_autopsy_report.md, voucher-domain.md, viewpoint-generator.md, test-idea-generation.md, Spec Function D.md. Bạn chỉ dựa vào 5 file này, trả lời tiếng Việt, không emoji, không mở bài kết bài, chỉ đưa đúng thứ mình hỏi.

Bảng 2 dòng theo thứ tự làm: | Bài | Đọc file | Ghi file | Bài nào dùng đầu ra này |
```

### 00:45–01:15 Lab 2 Viewpoint Generator (30') — xem mục 3

| Giờ | Demo trainer | Học viên | Đầu ra kiểm |
|---|---|---|---|
| 00:45–00:50 | Đọc to tiêu chí đạt, dán prompt Lab 2 lên màn hình | Dán prompt Lab 2 | Gemini trả 3 phần: Bảng, Phân bố, Top 3 |
| 00:50–01:05 | Đi vòng lớp, soi lỗi hay gặp | Đối chiếu kết quả với bảng tự tính lúc 00:35 | Tổng 24 / 11, VP-07 `KHONG_CO_DIEM` |
| 01:05–01:15 | Chiếu đáp án `dap-an-mau-02/OUTPUT/viewpoints.md`, chữa 2–3 bài của học viên | Sửa bài, lưu thành `viewpoints.md` cá nhân | Top 3 = VP-03, VP-08, VP-02 |

### 01:15–01:20 Nghỉ

### 01:20–01:53 Bài 2.4 AI-Generated Test Ideas (33')

| Giờ | Nội dung giảng | Demo trainer | Học viên | Đầu ra kiểm |
|---|---|---|---|---|
| 01:20–01:27 | - Test idea 1 câu, chưa cần expected chi tiết; test case 8 trường (buổi sau)<br>- Mục đích idea: không bỏ sót<br>- Idea tốt: điều kiện → kết quả, có giá trị cụ thể | Chiếu cặp ví dụ tốt/kém trong `test-idea-generation.md` | Viết lại "Kiểm tra mã hết hạn" thành idea tốt | Câu có mốc giờ cụ thể, ví dụ 01/12/2026 00:00:00 GMT+7 → không áp được |
| 01:27–01:37 | - 3 nguồn: BR-xx, Q-xxx-xx, VP-xx. Không nguồn thì bỏ<br>- BR đánh số theo gạch đầu dòng "Các quy tắc đã nêu" trong Spec Function D (BR-01..BR-05)<br>- 3 bẫy tiền: Q-D03-01, Q-D20-01, cơ sở tính % (mục 4) | Giải 3 bẫy trên bảng với số cụ thể | Tính nhanh 3 ví dụ ở mục 4 | Ai cũng ghi "tạm tính + phí vận chuyển = tổng" |
| 01:37–01:47 | - Nhãn GIU / BO_TRUNG / NGOAI_PHAM_VI<br>- "Đặt hàng" không tự động là ngoài phạm vi: xét **kết quả cần kiểm** (lượt, tiền giảm, hiệu lực của mã → vẫn GIU)<br>- **Người lọc, không phải AI**: file có `Trạng thái duyệt: CHO_DUYET`, chỉ người đổi thành `DA_DUYET` | Chiếu đoạn ĐIỂM DỪNG NGƯỜI LỌC trong `dap-an-mau-02/qa-analyst/AGENTS.md` | Gán nhãn cho TI-39, TI-34, TI-10 (đọc từ đáp án, che cột Lọc) | TI-39 NGOAI_PHAM_VI, TI-34 GIU, TI-10 BO_TRUNG |
| 01:47–01:53 | Chốt tiêu chí đủ: mỗi BR 1 Happy + 1 Negative; mỗi Q-ID ≥ 1 idea; mỗi viewpoint ≥ 1 idea; Lab 3 ≥ 20 idea | Demo prompt B (dưới) | Chạy Demo prompt B | Bảng 4 dòng CO |

**Demo prompt B** (rút gọn Prompt 3 của `THUCHANH-M02-PHA3.md`, giữ K1, K3, K4, K6):

```
Soi 2 bài viewpoint-generator.md và test-idea-generation.md như soi requirement. Trả đúng bảng | K | Có lỗ hổng không (CO / KHONG) | Bằng chứng (tối đa 20 từ) | Đề xuất sửa (tối đa 20 từ) |
K1. Bảng 8 viewpoint dùng ở mấy bài? Chép vào mỗi skill thì vi phạm quy tắc "mỗi thông tin một nơi" thế nào?
K3. "Người lọc, không phải AI." AI biết người đã lọc xong bằng dấu hiệu nào trong file?
K4. Ví dụ "Đơn 199.999đ" ở viewpoint-generator. Đối chiếu Q-D03-01 và Q-D20-01: 199.999đ là tạm tính hay tổng có phí ship? Giảm % tính trên giá trị nào?
K6. NGOAI_PHAM_VI gồm "đặt hàng". Idea cho D14 (trừ lượt khi Đặt hàng) và D19 (mã hết hạn trước khi bấm Đặt hàng) có bị loại hết không?
```

Đáp án: cả 4 là CO. Xem bảng Prompt 3 trong `dap-an-mau-02/DAP-AN.md`.

### 01:53–02:13 Lab 3 Test Idea Sprint (20') — xem mục 3

| Giờ | Demo trainer | Học viên | Đầu ra kiểm |
|---|---|---|---|
| 01:53–01:55 | Dán prompt Lab 3 | Dán prompt Lab 3 cùng chat Lab 2 | File bắt đầu bằng `Trạng thái duyệt: CHO_DUYET` |
| 01:55–02:07 | Đi vòng lớp, soi lỗi hay gặp | **Tự lọc**: đọc cột Lọc, sửa ít nhất 1 nhãn hoặc ghi lý do giữ nguyên; ghi tên vào `Người lọc:`, đổi thành `DA_DUYET` | ≥ 20 idea, đủ 8 viewpoint, mỗi idea có Nguồn |
| 02:07–02:13 | Chiếu `dap-an-mau-02/OUTPUT/test_ideas.md`, so bảng Thống kê | So với đáp án, đánh dấu idea mình thiếu | Mỗi học viên nêu 1 idea đáp án có mà mình thiếu |

### 02:13–02:20 Tổng kết và bàn giao (7')

| Nội dung | Học viên | Đầu ra kiểm |
|---|---|---|
| Nhắc 6 bẫy ở mục 4; giới thiệu buổi sau (mục 6); ghi câu hỏi bổ sung cho BA về cơ sở tính % | Lưu `viewpoints.md`, `test_ideas.md` (DA_DUYET) để dùng buổi sau | Mỗi học viên có 2 file |

## 3. Lab 2 và Lab 3

**Chuẩn bị chat Gemini** (cả lớp cùng model, chat mới). Tải 5 file: `OUTPUT/requirement_autopsy_report.md` · `qa-analyst/knowledge/voucher-domain.md` · `docs/courses/m02/viewpoint-generator.md` · `docs/courses/m02/test-idea-generation.md` · `INPUT/Spec Function D.md`.

Tối nay chỉ dùng Gemini chat. Chưa chạy agent code vì `qa-analyst/` chưa có skill Pha 3 (`check-m02-02.js` hiện 1/10) và ràng buộc 4 của AGENTS.md cấm agent đọc `docs/`. Prompt 4–6 + lượt 2–3 agent code của `THUCHANH-M02-PHA3.md` để buổi sau.

### Lab 2 — prompt

```
Làm đúng mục "Cách làm" trong viewpoint-generator.md, trả về nội dung file viewpoints.md theo đúng "Khuôn đầu ra" của bài đó.
1. Lấy mọi D-code và mã X có trạng thái khác RO ở Phần A của requirement_autopsy_report.md. Xếp vào viewpoint theo bảng "Gắn D-code vào viewpoint". X01 xếp VP-08.
2. Mức rủi ro của một mã = mức cao nhất trong các Q-ID của mã đó ở Phần B.
3. Đủ 8 dòng. Viewpoint không có mã ghi KHONG_CO_DIEM. Không thêm viewpoint nào khác 8 viewpoint đã cho.
4. "Rủi ro nếu bỏ qua": 1 tình huống cụ thể có số tiền. Số tiền nào liên quan đơn tối thiểu hoặc tổng tiền thì ghi rõ tạm tính + phí vận chuyển = tổng, theo câu trả lời đã xác nhận ở Phần B. Không tự đặt quy tắc.
5. Dưới bảng Phân bố thêm 1 dòng đối chiếu: tổng số điểm so với số mã khác RO ở Phần A; tổng điểm CAO so với số mục CAO ở Phần D mục 3.
```

**Tiêu chí đạt:** đủ 8 dòng; VP-07 = `KHONG_CO_DIEM`; X01 ở VP-08; tổng 24 điểm, 11 `CAO`; Top 3 đúng thứ tự; mỗi dòng có rủi ro kèm số tiền; không có viewpoint lạ.

**Đáp án tham chiếu Lab 2** (tự tính từ Phần A + Phần B + bảng gắn D-code; khớp `dap-an-mau-02/OUTPUT/viewpoints.md`):

| ID | Mã (Phần A, tất cả khác RO) | Mã có Q-ID mức CAO (Phần B) | Số điểm | Số CAO |
|---|---|---|---|---|
| VP-01 | D01 | — (Q-D01-01 TB) | 1 | 0 |
| VP-02 | D05, D08, D09, D10 | D05, D09 | 4 | 2 |
| VP-03 | D02, D03, D04, D11, D12 | D02, D03, D11, D12 | 5 | 4 |
| VP-04 | D06, D18, D21 | D06, D18 | 3 | 2 |
| VP-05 | D13, D17 | — | 2 | 0 |
| VP-06 | D22 | — | 1 | 0 |
| VP-07 | KHONG_CO_DIEM | — | 0 | 0 |
| VP-08 | D07, D14, D15, D16, D19, D20, D23, X01 | D14, D16, D19 | 8 | 3 |
| Tổng | 9 MO_HO + 14 KHONG_DE_CAP + 1 MAU_THUAN | khớp Phần D mục 3: 11 mục CAO | 24 | 11 |

Top 3: **VP-03** (4 CAO, 5 điểm) → **VP-08** (3 CAO, 8 điểm) → **VP-02** (2 CAO, 4 điểm; bằng VP-04 về CAO, hơn về tổng 4 > 3).

**Lỗi hay gặp Lab 2** (từ `viewpoint-generator.md`):

| Lỗi | Trainer hỏi lại |
|---|---|
| Dồn idea mẫu vào Happy Path | Đếm phân bố, viewpoint nào trống? |
| Gộp Negative và Boundary | Đúng ở biên hay sai hẳn? |
| Bỏ dòng VP-07 | Đủ 8 dòng chưa? `KHONG_CO_DIEM` đâu? |
| Tự thêm "Edge Case", "Data" | Chỉ 8 viewpoint cố định |
| Tổng ≠ 24 hoặc CAO ≠ 11 | Đối chiếu Phần D mục 1 và mục 3 |
| Top 3 chọn VP-08 đầu vì nhiều điểm | Xét số CAO trước, tổng điểm sau |

### Lab 3 — prompt (cùng chat Lab 2)

```
Dùng bảng viewpoint vừa làm (đã sửa theo đáp án trainer: tổng 24 điểm, 11 CAO, Top 3 VP-03, VP-08, VP-02). Làm đúng test-idea-generation.md, trả về nội dung file test_ideas.md theo "Khuôn đầu ra".
1. Dòng đầu file: "Trạng thái duyệt: CHO_DUYET". Dòng 2: "Người lọc: " để trống.
2. Bảng Rule gốc: BR-01, BR-02... đánh theo thứ tự gạch đầu dòng "Các quy tắc đã nêu" trong Spec Function D.md, ghi câu nguyên văn.
3. Ít nhất 20 idea, đủ 8 viewpoint. Mỗi BR có 1 idea Happy và 1 idea Negative. Mỗi Q-ID ở Phần B có ít nhất 1 idea. Ưu tiên Top 3 viewpoint.
4. Mỗi idea 1 câu: điều kiện → kết quả, có mã và số tiền cụ thể. Mọi ví dụ tiền ghi tạm tính + phí vận chuyển = tổng. Đơn tối thiểu so trên tổng có phí vận chuyển (Q-D03-01). Tiền giảm trừ vào tổng (Q-D20-01).
5. Kết quả chưa có câu trả lời xác nhận thì ghi "cần BA xác nhận", không tự đoán. Lưu ý: giảm % tính trên tạm tính hay trên tổng chưa có Q-ID nào chốt.
6. Cột Lọc chỉ là đề xuất. Idea có kết quả về mã (lượt, tiền giảm, hiệu lực) xảy ra lúc Đặt hàng vẫn GIU. Chỉ NGOAI_PHAM_VI khi kết quả cần kiểm thuộc tính năng khác (thanh toán, phí ship, email).
7. Cuối file: bảng Thống kê theo viewpoint. Dừng ở đây, không viết test case.
```

**Tiêu chí đạt:** ≥ 20 idea; đủ 8 viewpoint (VP-07 dùng nguồn `VP-07`); mỗi idea có Nguồn; BR-01..BR-05 đủ Happy + Negative; không idea nào tự chốt cơ sở tính %; học viên tự ghi tên `Người lọc` và đổi `DA_DUYET`, sửa hoặc xác nhận ít nhất 1 nhãn.

**Đáp án tham chiếu Lab 3:** `docs/courses/m02/thuc-hanh/dap-an-mau-02/OUTPUT/test_ideas.md`. Tại thời điểm soạn: 54 idea = 47 GIU, 3 BO_TRUNG (TI-10, TI-23, TI-46), 4 NGOAI_PHAM_VI (TI-39, TI-44, TI-50, TI-52); VP-03 và VP-08 mỗi nhóm 15 idea; 28/28 Q-ID có idea. File do agent khác sinh, trainer mở lại trước giờ để cập nhật số.

**Lỗi hay gặp Lab 3** (từ `test-idea-generation.md`):

| Lỗi | Trainer hỏi lại |
|---|---|
| Idea không có nguồn | Dựa vào rule nào? Không có thì bỏ |
| Idea quá chung ("Kiểm tra mã giảm giá") | Điều kiện gì → kết quả gì? |
| Trùng đổi chữ (`giam20k` / `Giam20K`) | Cùng điều kiện, cùng kết quả → BO_TRUNG |
| Lấn sang thanh toán, phí ship | Kết quả cần kiểm thuộc tính năng nào? |
| Để AI tự lọc rồi dùng luôn | Ai đổi `DA_DUYET`? Tên ở `Người lọc:` là ai? |
| Ví dụ tiền chỉ có tạm tính | Phí vận chuyển bao nhiêu? Tổng bao nhiêu? |

## 4. Bẫy cần nhấn tối nay

| # | Bẫy | Ví dụ để giảng | Đúng | Nguồn |
|---|---|---|---|---|
| 1 | Đơn tối thiểu so trên **tổng gồm phí ship** | Tạm tính 190.000đ + ship 30.000đ = 220.000đ, mã tối thiểu 200.000đ | Áp được (học viên hay trả lời "không" vì nhìn tạm tính) | Q-D03-01, TI-09 |
| 2 | Tiền giảm **trừ vào tổng** | Tạm tính 180.000đ + ship 30.000đ = 210.000đ, mã 50.000đ | Tổng mới 160.000đ | Q-D20-01, TI-43 |
| 3 | **Cơ sở tính % chưa xác nhận** (missing rule mới ở Pha 3) | `SALE10`, tạm tính 300.000đ + ship 30.000đ: giảm 30.000đ hay 33.000đ? | Ghi "cần BA xác nhận", viết câu hỏi bổ sung gửi BA. Q-D02-01 chỉ nói `Min(Giá trị tính giảm x %, trần)`, không định nghĩa "Giá trị tính giảm" | Q-D02-01, TI-05, TI-28 |
| 4 | **Điểm dừng người lọc** | AI sinh idea xong đi thẳng sang test case | Sai. File phải `Trạng thái duyệt: CHO_DUYET`; chỉ người đổi `DA_DUYET` mới đi tiếp | DAP-AN K3, AGENTS.md đáp án |
| 5 | **"Edge Case" không phải viewpoint** | Học viên thêm dòng VP-09 Edge Case | Xếp vào VP-03 Boundary hoặc VP-02 Negative | viewpoint-generator.md, Quy tắc |
| 6 | **VP-07 không có D-code** | Học viên xóa dòng VP-07 | Giữ dòng, ghi `KHONG_CO_DIEM`; Lab 3 vẫn có idea nguồn `VP-07`, kết quả "cần BA xác nhận" | TI-53, TI-54 |

Bẫy phụ nếu còn giờ: Q-D12-01 giảm cố định vượt tiền hàng chỉ giảm tối đa bằng tạm tính, ship vẫn trả (tạm tính 250.000đ + ship 30.000đ, mã 300.000đ → tổng 30.000đ, TI-29).

## 5. Phương án thời gian

| Tình huống | Cắt / dời | Giữ bằng mọi giá |
|---|---|---|
| Trễ 10' | Bỏ Demo prompt A; Demo prompt B chỉ chạy K3, K4 | Bảng tính tay phân bố; bẫy 1–3 |
| Trễ 20' | Thêm: Lab 2 không chữa bài cá nhân, chỉ chiếu đáp án 5'; Lab 3 hạ xuống ≥ 12 idea, chỉ Top 3 viewpoint + VP-07 | Học viên tự lọc và đổi `DA_DUYET` |
| Trễ 30'+ | Lab 3 làm ở nhà, nộp trước buổi sau; tổng kết 3' | Giảng xong 2.4 phần nhãn lọc và điểm dừng |
| Dư 10–15' | Chạy Prompt 3 đủ K1–K6 của `THUCHANH-M02-PHA3.md`; so idea từng dòng với đáp án | — |
| Dư 20'+ | Mở đầu Bài 2.5: chuyển 3 idea GIU thành test case 8 trường trong `test-case-format.md` | Không bắt đầu Prompt 4–6 (cần trọn khối thời gian) |

## 6. Bàn giao sang buổi sau

| Mục | Nội dung | Thời lượng | Ghi chú |
|---|---|---|---|
| 3 | Bài 2.5 Chuẩn hóa Test Case cho Jira/TestRail | 45' | Đầu vào: `test_ideas.md` DA_DUYET của học viên |
| 4 | Bài 2.6 Coverage Review + Lab 4 Coverage Audit | 40' + 25' | Bộ test: `OUTPUT/lab4_test_suite.md`, ≥ 4 gap cài sẵn |
| — | Prompt 4–6 + agent code lượt 1–3 (`THUCHANH-M02-PHA3.md`) | ghép vào mục 3–4 | Kết thúc: `check-m02-02.js` 10/10, `--output OUTPUT` 14/14 |
| 5 | Hướng dẫn Assignment 2 + Daily Quiz | 15' | Bản nháp dưới đây |

### Assignment 2 — BẢN NHÁP (chưa duyệt)

| Mục | Nội dung |
|---|---|
| Đề bài | Hoàn thiện Pha 3 cho agent `qa-analyst` theo chuẩn AGENTS.md + SKILL.md, chạy agent cho Function D đến hết Coverage Review, có điểm dừng người lọc |
| Đầu vào | `INPUT/`, `OUTPUT/requirement_autopsy_report.md`, `gate_status.json` (28/28), `qa-analyst/` sau buổi 1, `OUTPUT/lab4_test_suite.md`, `viewpoints.md` và `test_ideas.md` từ Lab 2–3 |
| Đầu ra | 1. `qa-analyst/`: 4 skill Pha 3 + `knowledge/test-viewpoints.md` + `_archive/prompt_qa_analyst_v2.md`<br>2. `OUTPUT/`: `viewpoints.md`, `test_ideas.md` (DA_DUYET, có tên người lọc), `test_cases.md`, `test_cases.csv`, `coverage_review.md`<br>3. Ghi chú ≤ 1 trang: các nhãn lọc đã sửa so với đề xuất AI và lý do; câu hỏi bổ sung cho BA về cơ sở tính giảm % |

| Tiêu chí chấm | Điểm |
|---|---|
| `check-m02.js` 12/12 và `check-m02-02.js --output OUTPUT` 14/14 | 25 |
| Viewpoint: đủ 8 dòng, tổng 24 / 11 CAO, Top 3 VP-03, VP-08, VP-02, VP-07 `KHONG_CO_DIEM` | 15 |
| Test idea: ≥ 20, có nguồn, đủ 3 điều kiện đủ, không trùng đổi chữ | 20 |
| Người lọc: có tên, có ≥ 1 nhãn sửa kèm lý do, agent dừng đúng ở CHO_DUYET | 15 |
| Bẫy tiền: tạm tính + ship = tổng ở mọi ví dụ; cơ sở tính % ghi "cần BA xác nhận" | 15 |
| Test case import được (CSV), Coverage Review tìm ≥ 4 gap của Lab 4 | 10 |
| **Tổng** | **100** |

### Daily Quiz bài 2.3–2.4 — BẢN NHÁP (chưa duyệt)

| # | Câu hỏi | Lựa chọn | Đáp án |
|---|---|---|---|
| 1 | Edge case xếp vào đâu? | A. VP riêng "Edge Case" B. Boundary hoặc Negative C. Happy Path D. Integration | B |
| 2 | VP-07 Accessibility không có D-code. Ghi gì? | A. Bỏ dòng B. Gộp vào VP-05 C. Giữ dòng, ghi `KHONG_CO_DIEM` D. Ghi 0 và xóa ở Top 3 | C |
| 3 | Viewpoint xếp thứ 1 trong Top 3 của Function D? | A. VP-08 (8 điểm) B. VP-03 (4 CAO) C. VP-02 D. VP-04 | B |
| 4 | VP-02 và VP-04 cùng 2 điểm CAO. Ai vào Top 3? | A. VP-02, vì tổng điểm 4 > 3 B. VP-04, vì Security quan trọng hơn C. Cả hai D. VP-02, vì ID nhỏ hơn (không xét tổng) | A |
| 5 | Tạm tính 190.000đ + ship 30.000đ, mã tối thiểu 200.000đ? | A. Không áp được B. Áp được C. Cần BA xác nhận D. Áp được nếu bỏ ship | B |
| 6 | Tạm tính 180.000đ + ship 30.000đ, mã giảm 50.000đ. Tổng mới? | A. 130.000đ B. 160.000đ C. 180.000đ D. 210.000đ | B |
| 7 | `SALE10`, tạm tính 300.000đ + ship 30.000đ. Idea nên ghi kết quả gì? | A. Giảm 30.000đ B. Giảm 33.000đ C. Cần BA xác nhận giá trị tính giảm D. Lấy theo tri thức ngành | C |
| 8 | Idea nào viết đúng? | A. Kiểm tra mã giảm giá B. Mã hết hạn → lỗi C. Tạm tính 169.999đ + ship 30.000đ = 199.999đ, mã tối thiểu 200.000đ → không áp được D. Test biên đơn tối thiểu | C |
| 9 | "Áp mã rồi Đặt hàng thành công → lượt dùng tăng 10/100 lên 11/100" gán nhãn gì? | A. NGOAI_PHAM_VI vì là Đặt hàng B. GIU vì kết quả là lượt của mã C. BO_TRUNG D. Bỏ vì không có nguồn | B |
| 10 | Ai đổi `CHO_DUYET` thành `DA_DUYET`? | A. AI sau khi tự lọc B. Script `check-m02-02.js` C. Người lọc, sau khi đọc cột Lọc D. BA | C |
