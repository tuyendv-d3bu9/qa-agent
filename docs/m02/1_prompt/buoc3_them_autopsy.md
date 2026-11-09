# KHỐI 3 — LAB 1 — REQUIREMENT AUTOPSY

> Dán toàn bộ phần dưới đường kẻ vào CUỐI file `prompt_dai.md`.
> Sau đó sửa dòng đầu prompt thành `CHẠY: Bước 3`.

---

# ===== BỔ SUNG LAB 1 — REQUIREMENT AUTOPSY =====

## BƯỚC 3: REQUIREMENT AUTOPSY

- Kỹ năng: REQUIREMENT AUTOPSY
- Khuôn: KHUÔN AUTOPSY
- Đọc thêm: TRI THỨC NGÀNH, `output/01_tom_tat.md`, `output/02_6w.md`
- Ghi file: `output/03_autopsy.md`

## QUY TẮC BỔ SUNG

### Tri thức ngành

- TRI THỨC NGÀNH cho biết ngành thường có gì. Nó KHÔNG phải requirement của ShopGo.
- Chỉ dùng tri thức ngành để biết cần hỏi gì. Khi nhắc tới, viết dạng câu hỏi hoặc ghi rõ "Thông lệ ngành: ...".
- Không dùng tri thức ngành làm bằng chứng cho trạng thái của đề bài.

## KỸ NĂNG: REQUIREMENT AUTOPSY

Mục đích: đối chiếu đề bài với Domain Checklist D01–D23 trong TRI THỨC NGÀNH, lập danh sách missing rule và câu hỏi gửi BA.

### Nhãn trạng thái

| Nhãn | Khi nào |
|---|---|
| `RO` | Đề bài có quy tắc đủ cụ thể để viết Expected Result |
| `MO_HO` | Đề bài có nhắc tới chủ đề (kể cả quy định chung toàn hệ thống) nhưng thiếu giá trị hoặc điều kiện để viết Expected Result |
| `KHONG_DE_CAP` | Đề bài không nhắc tới chủ đề |
| `MAU_THUAN` | Hai nguồn nói khác nhau: giữa 2 file đề bài, hoặc giữa đề bài và quan sát thực tế người dùng cung cấp |

### 5 loại missing rule

| Loại | Định nghĩa | Dấu hiệu |
|---|---|---|
| Implicit assumption | Điều ai cũng ngầm hiểu nên không ai viết ra | Đọc xong thấy "chắc là vậy" |
| Edge case bị bỏ qua | Tình huống ở biên, hiếm nhưng có thật | Có ngưỡng, thời hạn, giới hạn |
| Conflict giữa rule | Hai nguồn nói khác nhau | Tài liệu và tài liệu, hoặc tài liệu và thực tế không khớp |
| Non-functional bị ignore | Thiếu yêu cầu về tốc độ, bảo mật, chịu tải | Không có con số thời gian, không nói giới hạn |
| Rollback/Undo | Thiếu luồng quay lại, hủy, hoàn | Chỉ có luồng tiến, không có luồng lùi |

Thuộc nhiều loại thì chọn theo thứ tự: Conflict giữa rule > Rollback/Undo > Non-functional bị ignore > Edge case bị bỏ qua > Implicit assumption.

### Rủi ro và Priority

| Rủi ro | Khi nào | Priority |
|---|---|---|
| `CAO` | Có thể tính sai tiền, mất doanh thu, hoặc bị lạm dụng mã | P1 |
| `TB` | Ảnh hưởng trải nghiệm hoặc vận hành, có cách xử lý tạm | P2 |
| `THAP` | Ảnh hưởng hiển thị, lưu vết, ít tác động tiền | P3 |

### Cách viết missing rule

- Viết điều đề bài CHƯA nói. Không viết đáp án.
- Đúng: "Chưa quy định mã giảm cố định lớn hơn tiền hàng thì xử lý thế nào."
- Sai: "Hệ thống phải chặn để tổng tiền không âm."

### Quy trình

1. Phần A: với từng D-code D01 → D23, đọc "Câu hỏi kiểm tra" trong Domain Checklist, tìm trong đề bài, gán nhãn trạng thái. Đối chiếu kết quả 6W để không bỏ sót bằng chứng. Cột W-ID lấy từ cột "W liên quan" của checklist.
2. Phần B: mỗi D-code `MO_HO`, `KHONG_DE_CAP` hoặc `MAU_THUAN` thành một dòng MR. MR-ID = "MR-" + số của D-code (D02 → MR-02).
   - Loại và Rủi ro lấy theo cột gợi ý trong checklist. Chỉ đổi khi đề bài hoặc quan sát thực tế cho bằng chứng, ghi lý do ở cột Ghi chú.
   - Priority suy ra từ Rủi ro.
   - Kịch bản ảnh hưởng: 1 tình huống cụ thể, có số tiền VND.
   - Câu hỏi BA: câu hỏi đóng.
3. Phần C: đếm thống kê từ Phần A và Phần B.
4. Phần D: câu hỏi BA của mọi MR có Priority P1, theo thứ tự MR-ID.
5. Phần E: ghi dòng v1 với ngày hôm nay.

### Khi người dùng cung cấp quan sát thực tế

1. So quan sát với đề bài. Khác nhau thì D-code liên quan đổi sang `MAU_THUAN`, ghi thêm quan sát vào cột bằng chứng.
2. MR tương ứng đổi Loại thành Conflict giữa rule, ghi lý do ở Ghi chú. Câu hỏi BA viết lại theo hướng "tài liệu đúng hay hệ thống đúng". Giữ nguyên Rủi ro và Priority.
3. Cập nhật lại Phần C. Thêm một dòng vào Phần E.
4. Chỉ sửa các dòng liên quan. Giữ nguyên mọi dòng khác.

## TRI THỨC NGÀNH: VOUCHER TRONG THƯƠNG MẠI ĐIỆN TỬ VIỆT NAM

Phần này là tri thức ngành, KHÔNG phải requirement của ShopGo. Dùng để biết cần hỏi gì. Mọi "thông lệ" ở đây có thể đúng ở hệ thống khác nhưng sai ở ShopGo.

### Cách tính tiền thường gặp

| Trường hợp | Cách tính thường gặp | Ví dụ |
|---|---|---|
| Mã % có trần | Giảm = min(tạm tính × %, trần) | Tạm tính 600.000đ, 10%, trần 50.000đ → giảm 50.000đ, còn 550.000đ |
| Mã cố định | Giảm = min(giá trị mã, tạm tính) | Mã 100.000đ, tạm tính 80.000đ → giảm 80.000đ, tiền hàng 0đ |
| Đơn tối thiểu | So tạm tính trước giảm với ngưỡng, "đạt" là lớn hơn hoặc bằng | Ngưỡng 200.000đ: 199.999đ không đạt, 200.000đ đạt |
| Làm tròn | Làm tròn xuống tới 1đ hoặc tới 1.000đ | 199.999đ × 15% = 29.999,85đ → 29.999đ hay 30.000đ? |
| Phí ship | Tính riêng, không nằm trong cơ sở tính mã giảm giá | Mã giảm giá trừ tiền hàng, mã freeship trừ phí ship |

Thông lệ: mã được kiểm tra hai lần, lúc bấm Áp dụng và lúc bấm Đặt hàng.

### Bug hay gặp ngoài thực tế

| # | Bug | Vì sao xảy ra |
|---|---|---|
| E1 | Áp mã xong, bớt hàng xuống dưới đơn tối thiểu vẫn giữ giảm giá | Chỉ kiểm tra mã lúc bấm Áp dụng |
| E2 | Mã 1 lượt dùng được 2 lần bằng 2 tab | Không khóa lượt khi đặt hàng đồng thời |
| E3 | Mã hết hạn lúc 00:00 vẫn đặt hàng được | Không kiểm tra lại lúc đặt hàng |
| E4 | Mã cố định lớn hơn tiền hàng làm tổng tiền âm | Không chặn số tiền giảm |
| E5 | Tiền giảm lệch vài đồng giữa màn hình và hóa đơn | Làm tròn ở 2 chỗ theo 2 cách |
| E6 | Hủy đơn nhưng khách mất lượt dùng mã | Không có luồng hoàn lượt |
| E7 | Mọi lỗi đều hiện "Mã không hợp lệ" | Không tách thông báo theo nguyên nhân |
| E8 | Dò được mã thật bằng script | Không giới hạn số lần nhập sai |
| E9 | Sửa request để tự đặt số tiền giảm | Server tin số tiền giảm từ trình duyệt |

### Lưu ý pháp lý (tham khảo)

Nghị định 81/2018/NĐ-CP có quy định mức giảm giá tối đa trong khuyến mại. Quy định có thể đã được sửa đổi. Chỉ dùng để hỏi BA: "Mã giảm % của ShopGo có bị giới hạn mức giảm tối đa theo quy định khuyến mại không?"

### Domain Checklist D01–D23

| D-code | Chủ đề | Câu hỏi kiểm tra | Thông lệ ngành | Loại gợi ý | Rủi ro gợi ý | W liên quan |
|---|---|---|---|---|---|---|
| D01 | Loại mã | Có những loại mã nào? | %, số tiền cố định, freeship | Implicit assumption | TB | — |
| D02 | Trần giảm của mã % | Mã % có giới hạn số tiền giảm tối đa? Bao nhiêu? | Mã % gần như luôn có trần | Implicit assumption | CAO | W3-4 |
| D03 | Cơ sở và ngưỡng đơn tối thiểu | Đơn tối thiểu tính trên số tiền nào? "Đạt" là ≥ hay >? | Tạm tính trước giảm, chưa gồm ship; "đạt" là ≥ | Implicit assumption | CAO | W3-1 |
| D04 | Mốc thời gian hiệu lực | Có ngày bắt đầu? Hết hạn lúc mấy giờ, múi giờ nào? | Hết hạn 23:59:59 ngày cuối, giờ Việt Nam | Edge case bị bỏ qua | TB | W4-1 |
| D05 | Tổng lượt dùng | Mã có tổng số lượt? Hết lượt báo gì? | Có tổng lượt, báo riêng "hết lượt" | Implicit assumption | CAO | W4-4 |
| D06 | Lượt dùng mỗi khách | Một khách dùng được mấy lần? Nhận diện khách bằng gì? | 1 lượt/khách, theo tài khoản | Implicit assumption | CAO | W5-2 |
| D07 | Đối tượng được dùng và đăng nhập | Ai được dùng mã? Có bắt buộc đăng nhập? | Thường yêu cầu đăng nhập để kiểm soát lượt | Implicit assumption | TB | W2-1, W5-1 |
| D08 | Phạm vi sản phẩm | Áp cho cả giỏ hay một số ngành hàng/sản phẩm? | Có mã toàn shop và mã theo ngành hàng | Implicit assumption | TB | W3-5 |
| D09 | Cộng dồn | Một đơn dùng mấy mã? Nhập mã thứ 2 thì thay mã cũ hay báo lỗi? | 1 mã giảm giá/đơn, có thể kèm 1 mã freeship | Implicit assumption | CAO | W2-2 |
| D10 | Định nghĩa mã hợp lệ | "Hợp lệ" gồm những điều kiện gì? Định dạng, độ dài, hoa/thường? | Không phân biệt hoa/thường, cắt khoảng trắng đầu/cuối | Implicit assumption | TB | W1-2, W1-3, W1-4 |
| D11 | Làm tròn | Tiền giảm lẻ làm tròn lên, xuống hay gần nhất? Tới đơn vị nào? | Làm tròn xuống, thống nhất mọi nơi hiển thị | Implicit assumption | CAO | W3-3 |
| D12 | Giảm vượt tiền hàng | Mã giảm lớn hơn tiền hàng thì tổng tiền là bao nhiêu? | Giảm không vượt tiền hàng, tổng không âm | Edge case bị bỏ qua | CAO | W3-2 |
| D13 | Thông báo lỗi | Mỗi nguyên nhân thất bại có thông báo riêng? Nội dung, vị trí? | Tách theo nguyên nhân: không tồn tại, hết hạn, chưa đủ đơn tối thiểu, hết lượt | Implicit assumption | TB | W1-1 |
| D14 | Thời điểm trừ lượt | Trừ lượt lúc bấm Áp dụng hay lúc đặt hàng thành công? | Giữ chỗ khi áp, trừ khi đặt hàng thành công | Implicit assumption | CAO | W6-1 |
| D15 | Hoàn lượt | Hủy đơn, thanh toán thất bại: mã có được trả lại? | Thanh toán thất bại thì trả mã | Rollback/Undo | TB | W5-5, W6-2, W6-3 |
| D16 | Giỏ hoặc phiên thay đổi sau khi áp | Sửa giỏ, quay lại, phiên hết hạn: mã có được kiểm tra lại? | Kiểm tra lại mỗi lần giỏ đổi | Edge case bị bỏ qua | CAO | W2-4, W2-5 |
| D17 | Gỡ hoặc đổi mã | Khách gỡ mã, đổi mã khác được không? Tổng tiền tính lại thế nào? | Có nút gỡ mã, mã mới thay mã cũ | Rollback/Undo | TB | W2-3 |
| D18 | Dùng đồng thời | Hai thiết bị cùng dùng một mã còn 1 lượt thì sao? | Chỉ một đơn thành công | Edge case bị bỏ qua | CAO | W4-3 |
| D19 | Mã mất hiệu lực giữa luồng | Mã hết hạn hoặc bị tắt sau khi áp, trước khi đặt hàng? | Kiểm tra lại lúc đặt hàng, báo khách | Edge case bị bỏ qua | CAO | W4-2, W5-3 |
| D20 | Mã và phí ship | Mã trừ trên tiền hàng hay cả phí ship? Phí ship đổi thì tính lại? | Mã giảm giá trừ tiền hàng, ship tính riêng | Implicit assumption | TB | W6-4 |
| D21 | Chống dò và giả mạo | Giới hạn số lần nhập sai? Server tự tính tiền giảm? | Giới hạn nhập sai, server tự tính | Non-functional bị ignore | TB | W1-5, W5-4 |
| D22 | Thời gian phản hồi | Kiểm tra mã tối đa bao lâu? Có trạng thái đang xử lý? | Vài giây, có loading, chặn bấm lặp | Non-functional bị ignore | TB | W4-5 |
| D23 | Lưu vết trên đơn | Mã và tiền giảm có hiện trên chi tiết đơn, email xác nhận? | Lưu vào đơn, hiện trên email | Implicit assumption | THAP | W6-5 |

## KHUÔN AUTOPSY

````markdown
# 03 — Requirement Autopsy — Function D (ShopGo)

## Phần A. Đối chiếu Domain Checklist

| D-code | Chủ đề | Trạng thái | Bằng chứng trong đề bài | Nguồn | W-ID |
|---|---|---|---|---|---|

Trạng thái `KHONG_DE_CAP` thì "Bằng chứng trong đề bài" ghi `—`, "Nguồn" ghi `[—]`.

## Phần B. Missing Rule Register

| MR-ID | D-code | Missing rule | Loại | Kịch bản ảnh hưởng | Rủi ro | Priority | Câu hỏi BA | Ghi chú |
|---|---|---|---|---|---|---|---|---|

## Phần C. Thống kê

| Trạng thái | Số lượng | D-code |
|---|---|---|
| RO | | |
| MO_HO | | |
| KHONG_DE_CAP | | |
| MAU_THUAN | | |
| Tổng | | |

| Loại | Số lượng |
|---|---|
| Implicit assumption | |
| Edge case bị bỏ qua | |
| Conflict giữa rule | |
| Non-functional bị ignore | |
| Rollback/Undo | |
| Tổng | |

| Priority | Số lượng |
|---|---|
| P1 | |
| P2 | |
| P3 | |
| Tổng | |

## Phần D. Câu hỏi gửi BA — nhóm P1

1. [MR-xx] <câu hỏi>

## Phần E. Lịch sử thay đổi

| Phiên bản | Ngày | Thay đổi | Lý do |
|---|---|---|---|
````
