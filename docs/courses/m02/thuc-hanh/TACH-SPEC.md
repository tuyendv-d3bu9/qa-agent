# TACH-SPEC — Tách và sửa qa-analyst/prompt_qa_analyst.md

Agent đọc file này để làm. Chép nguyên văn, chỉ đổi đúng những chỗ ghi ở đây.

## 1. Tách

Thân của một mục = các dòng sau dòng tiêu đề, đến trước tiêu đề cùng cấp hoặc cao hơn. Không lấy dòng tiêu đề. Bỏ dòng `---`. Dòng `#` trong khối code không phải tiêu đề.

| File mới | Nội dung |
|---|---|
| `qa-analyst/prompt_qa_analyst.md` | Dòng 1 của prompt cũ · `## I. VAI TRÒ (ROLE)` + thân mục I · `## II. CỔNG CHẶN CỨNG (HARD QUALITY GATE)` + thân mục IV · `## III. BẢN ĐỒ TRI THỨC` + câu đầu thân mục VI + KHỐI BẢN ĐỒ (mục 3) |
| `qa-analyst/rules/quy-tac-chung.md` | `# QUY TẮC CHUNG — QA ANALYST` · `## Nguồn sự thật` + thân II.1 · `## Ràng buộc tuyệt đối` + thân VII (ràng buộc 4 đổi theo K6) |
| `qa-analyst/knowledge/domain-voucher.md` | `# TRI THỨC NGÀNH — VOUCHER THƯƠNG MẠI ĐIỆN TỬ` + thân II.2 |
| `qa-analyst/skills/tra-hoi-6w.md` | `# KỸ NĂNG — TRA HỎI 6W` + thân III.1 |
| `qa-analyst/skills/phan-loai-missing-rule.md` | `# KỸ NĂNG — PHÂN LOẠI MISSING RULE` + thân III.2 |
| `qa-analyst/skills/tu-kiem-fact.md` | `# KỸ NĂNG — TỰ KIỂM FACT` + thân V |
| `qa-analyst/templates/questions_for_clarification.md` | `` # KHUÔN PHA 1 — `OUTPUT/questions_for_clarification.md` `` + thân VI.1 |
| `qa-analyst/templates/requirement_autopsy_report.md` | `` # KHUÔN PHA 2 — `OUTPUT/requirement_autopsy_report.md` `` + thân VI.2 |

Mỗi tiêu đề mới có 1 dòng trống trước và sau.

## 2. Sửa 6 lỗi

**K1** — Cuối `rules/quy-tac-chung.md`, thêm:

`````markdown
## Nhãn trạng thái

| Nhãn | Khi nào dùng |
|---|---|
| `RO` | Tài liệu trong `INPUT/` có quy tắc đủ cụ thể để viết Expected Result |
| `MO_HO` | Tài liệu có nhắc tới chủ đề nhưng thiếu giá trị hoặc điều kiện để viết Expected Result |
| `KHONG_DE_CAP` | Tài liệu không nhắc tới chủ đề |
| `MAU_THUAN` | Hai nguồn trong `INPUT/` nói khác nhau, hoặc tài liệu khác với quan sát thực tế |

Nhãn 6W (`CO`, `MOT_PHAN`, `KHONG`) chỉ dùng khi tra hỏi ở Pha 1. Báo cáo Pha 2 chỉ dùng 4 nhãn trên.
`````

**K2** — `skills/phan-loai-missing-rule.md`: thay `Toàn bộ các điểm được đánh giá mang nhãn `MOT_PHAN` hoặc `KHONG` bắt buộc phải` bằng `Toàn bộ các điểm có trạng thái `MO_HO`, `KHONG_DE_CAP` hoặc `MAU_THUAN` bắt buộc phải`

**K3** — Cùng file: thay `Rủi ro: TRUNG BÌNH.` bằng `Rủi ro: TB.` (3 chỗ)

**K4** — `knowledge/domain-voucher.md`: thay từ dòng `#### E. Danh mục kiểm tra nghiệp vụ miền Voucher (Checklist D01 - D23)` đến hết file bằng:

`````markdown
#### E. Danh mục kiểm tra nghiệp vụ miền Voucher (Checklist D01 - D23)

Cột Loại gợi ý và Rủi ro gợi ý là mặc định. Chỉ đổi khi tài liệu `INPUT/` hoặc câu trả lời đã xác nhận ở cổng chặn cho bằng chứng, và phải ghi lý do.

| D-code | Nội dung kiểm tra | Loại gợi ý | Rủi ro gợi ý | W liên quan |
|---|---|---|---|---|
| D01 | Loại mã giảm giá (Phần trăm, số tiền cố định, freeship). | Implicit assumption | TB | — |
| D02 | Trần giảm của mã phần trăm (Số tiền giảm tối đa). | Implicit assumption | CAO | W3 |
| D03 | Cơ sở tính và ngưỡng đơn tối thiểu (Tạm tính hay tổng tiền, quy định dấu >= hay >). | Implicit assumption | CAO | W3 |
| D04 | Mốc thời gian hiệu lực (Ngày bắt đầu, giờ hết hạn, múi giờ áp dụng). | Edge case bị bỏ qua | TB | W4 |
| D05 | Tổng lượt dùng toàn hệ thống (Số lượt tối đa, cách xử lý khi hết lượt). | Implicit assumption | CAO | W4 |
| D06 | Giới hạn lượt dùng mỗi khách hàng (Số lần mỗi khách, phương thức nhận diện khách). | Implicit assumption | CAO | W5 |
| D07 | Đối tượng áp dụng và điều kiện đăng nhập (Bắt buộc đăng nhập hay cho phép khách vãng lai). | Implicit assumption | TB | W2, W5 |
| D08 | Phạm vi áp dụng của sản phẩm (Toàn sàn hay một số danh mục hàng hóa). | Implicit assumption | TB | W3 |
| D09 | Quy tắc cộng dồn (Dùng nhiều mã/đơn hay tối đa 1 mã, cơ chế ghi đè khi nhập mã mới). | Implicit assumption | CAO | W2 |
| D10 | Tiêu chí mã hợp lệ (Phân biệt hoa/thường, khoảng trắng thừa, độ dài, ký tự đặc biệt). | Implicit assumption | TB | W1 |
| D11 | Quy tắc làm tròn số tiền lẻ (Làm tròn lên, xuống hay làm tròn gần nhất đến đơn vị nào). | Implicit assumption | CAO | W3 |
| D12 | Xử lý khi số tiền giảm vượt quá tiền hàng (Chặn không cho tổng tiền âm). | Edge case bị bỏ qua | CAO | W3 |
| D13 | Nội dung và vị trí thông báo lỗi (Tách biệt thông báo lỗi theo từng nguyên nhân cụ thể). | Implicit assumption | TB | W1 |
| D14 | Thời điểm chính thức trừ lượt dùng (Lúc bấm áp dụng hay lúc đặt hàng thành công). | Implicit assumption | CAO | W6 |
| D15 | Cơ chế hoàn lượt dùng mã (Hủy đơn hàng, thanh toán trực tuyến thất bại). | Rollback/Undo | TB | W5, W6 |
| D16 | Xử lý khi giỏ hàng hoặc phiên thay đổi sau khi đã áp mã (Sửa giỏ, phiên hết hạn). | Edge case bị bỏ qua | CAO | W2 |
| D17 | Luồng gỡ bỏ mã hoặc thay đổi mã khác (Giao diện nút gỡ, cách tính lại tổng tiền). | Rollback/Undo | TB | W2 |
| D18 | Xử lý thao tác đồng thời (Hai người cùng dùng mã ở lượt cuối cùng). | Edge case bị bỏ qua | CAO | W4 |
| D19 | Mã mất hiệu lực giữa luồng thao tác (Admin tắt mã hoặc mã hết hạn khi khách đang thanh toán). | Edge case bị bỏ qua | CAO | W4, W5 |
| D20 | Mối quan hệ giữa mã giảm giá và phí vận chuyển (Trừ tiền hàng hay trừ phí ship). | Implicit assumption | TB | W6 |
| D21 | Cơ chế phòng chống gian lận và dò mã (Giới hạn số lần thử sai, máy chủ tự tính tiền giảm). | Non-functional bị ignore | TB | W1, W5 |
| D22 | Thời gian phản hồi và trạng thái chờ (Timeout kiểm tra mã, loading chặn bấm đúp). | Non-functional bị ignore | TB | W4 |
| D23 | Lưu vết thông tin mã trên đơn hàng (Hiển thị chi tiết mã và tiền giảm trong hóa đơn, email). | Implicit assumption | THAP | W6 |
`````

**K5** — Tạo `skills/cau-hoi-lam-ro.md`:

`````markdown
# KỸ NĂNG — CÂU HỎI LÀM RÕ (PHA 1)

Mục đích: biến mỗi điểm tài liệu chưa đủ để viết Expected Result thành câu hỏi đóng gửi BA, đúng định dạng để `node tools/gate.js init` đọc được.

## Khi nào đặt câu hỏi

- Mỗi D-code trong Danh mục D01 - D23 mà tài liệu `INPUT/` chưa đủ để viết Expected Result có ít nhất 1 câu hỏi.
- Mỗi mâu thuẫn giữa các tệp trong `INPUT/` có 1 mã X riêng và ít nhất 1 câu hỏi.

## Đặt mã

| Loại | Quy tắc | Ví dụ |
|---|---|---|
| ID câu hỏi theo D-code | `Q-<D-code>-<số thứ tự 2 chữ số>` | `Q-D03-02` |
| Mã mâu thuẫn | `X01`, `X02`... theo thứ tự phát hiện | `X01` |
| ID câu hỏi mâu thuẫn | `Q-<mã X>-<số thứ tự 2 chữ số>` | `Q-X01-01` |

Thứ tự dòng trong bảng: D01 đến D23, sau đó X01 trở đi.

## Viết câu hỏi

- Câu hỏi đóng, có ít nhất 2 phương án, đánh A, B, C...
- Các phương án nằm trong cùng một ô, ngăn nhau bằng `<br>`.
- Không gợi ý phương án nên chọn. Không đưa đáp án vào câu hỏi.
- Câu hỏi mâu thuẫn phải nêu tên 2 tệp đang nói khác nhau.
`````

Trong KHỐI BẢN ĐỒ, dòng Pha 1, chèn `` `qa-analyst/skills/cau-hoi-lam-ro.md`<br> `` ngay trước `` `qa-analyst/templates/questions_for_clarification.md` ``.

**K6** — Ràng buộc 4 thay bằng:

`````markdown
4. **Không phụ thuộc vào thư mục ngoài `qa-analyst/`:** Toàn bộ tri thức nằm trong thư mục `qa-analyst/` (rules, knowledge, skills, templates). Không đọc `docs/` hay `resources/`.
`````

## 3. KHỐI BẢN ĐỒ

`````markdown
- Pha 1: `OUTPUT/questions_for_clarification.md`
- Pha 2: `OUTPUT/requirement_autopsy_report.md`

Trước khi làm bất kỳ pha nào, đọc `qa-analyst/rules/quy-tac-chung.md`. Sau đó chỉ đọc đúng các file ghi ở dòng của pha cần làm.

| Pha | Việc | Đọc file | Ghi file |
|---|---|---|---|
| Pha 1 | Tra hỏi đề bài, xuất câu hỏi làm rõ | `qa-analyst/knowledge/domain-voucher.md`<br>`qa-analyst/skills/tra-hoi-6w.md`<br>`qa-analyst/templates/questions_for_clarification.md` | `OUTPUT/questions_for_clarification.md` |
| Cổng chặn | Kiểm tra câu trả lời của BA | Chạy `node tools/gate.js check` | `gate_status.json` (do tool ghi) |
| Pha 2 | Mổ xẻ yêu cầu, phân loại missing rule, viết Expected Result, tự kiểm | `qa-analyst/knowledge/domain-voucher.md`<br>`qa-analyst/skills/phan-loai-missing-rule.md`<br>`qa-analyst/skills/tu-kiem-fact.md`<br>`qa-analyst/templates/requirement_autopsy_report.md`<br>`gate_status.json` | `OUTPUT/requirement_autopsy_report.md` |
`````

## 4. Kiểm

`node tools/check-m02.js` phải ra `Khớp: 9/9`.
