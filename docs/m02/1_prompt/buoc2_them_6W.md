# KHỐI 2 — BÀI 2.2 — TRA HỎI 6W

> Dán toàn bộ phần dưới đường kẻ vào CUỐI file `prompt_dai.md`.
> Sau đó sửa dòng đầu prompt thành `CHẠY: Bước 2`.

---

# ===== BỔ SUNG BÀI 2.2 — TRA HỎI 6W =====

## BƯỚC 2: TRA HỎI ĐỀ BÀI BẰNG 6W

- Kỹ năng: TRA HỎI 6W
- Khuôn: KHUÔN 6W
- Đọc thêm: `output/01_tom_tat.md`
- Ghi file: `output/02_6w.md`

## QUY TẮC BỔ SUNG

### Danh sách cố định

- Kỹ năng nào có danh sách ID cố định thì đi đủ và đúng thứ tự ID.
- Không gộp, không bỏ, không thêm ID mới, không sửa câu chữ của câu hỏi có sẵn.

## KỸ NĂNG: TRA HỎI 6W

Mục đích: đề bài thường chỉ tả luồng chạy đúng. 6W là 6 hướng hỏi để tìm cái đề bài chưa nói.

| W | Tên | Hỏi về |
|---|---|---|
| W1 | What if input lạ | Dữ liệu người dùng gõ vào |
| W2 | What if state lạ | Trạng thái đăng nhập, giỏ hàng, phiên lúc thao tác |
| W3 | What if data lạ | Dữ liệu đã có trong hệ thống: giá, ngưỡng, số tiền |
| W4 | What when timing | Thời điểm, thứ tự, đồng thời |
| W5 | Who else actor | Người hoặc hệ thống khác cùng tác động |
| W6 | What happens after | Dữ liệu thay đổi ra sao sau khi xong |

W1 và W3 khác nhau: W1 là thứ người dùng gõ vào. W3 là dữ liệu đã có trong hệ thống.

### Cách đánh giá

Với mỗi câu hỏi, tìm câu trả lời trong đề bài, ghi một nhãn:

| Nhãn | Khi nào |
|---|---|
| `CO` | Đề bài trả lời được, đủ để viết Expected Result |
| `MOT_PHAN` | Đề bài nhắc tới ĐÚNG chủ đề của câu hỏi nhưng không trả lời được |
| `KHONG` | Đề bài không nhắc tới chủ đề của câu hỏi. Nhắc chủ đề khác cũng là `KHONG` |

Cột D-code là mã chủ đề, dùng ở bước Autopsy.

### 30 câu hỏi cố định

**W1 — What if input lạ**

| W-ID | Câu hỏi | D-code |
|---|---|---|
| W1-1 | Bỏ trống ô "Mã giảm giá" rồi bấm "Áp dụng" thì hiển thị gì? | D13 |
| W1-2 | Nhập "sale-a102" hoặc " SALE-A102 " có được chấp nhận như "SALE-A102"? | D10 |
| W1-3 | Nhập mã có ký tự "@#!" hoặc emoji thì hệ thống chặn hay báo lỗi? | D10 |
| W1-4 | Mã dài 100 ký tự thì ô nhập chặn hay báo lỗi? Độ dài tối đa là bao nhiêu? | D10 |
| W1-5 | Nhập sai mã 10 lần liên tiếp có bị khóa hoặc giới hạn không? | D21 |

**W2 — What if state lạ**

| W-ID | Câu hỏi | D-code |
|---|---|---|
| W2-1 | Khách chưa đăng nhập có vào được trang Thanh toán và áp mã không? | D07 |
| W2-2 | Đã áp 1 mã, nhập tiếp mã thứ 2 thì mã cũ bị thay hay báo lỗi? | D09 |
| W2-3 | Đã áp mã, khách muốn gỡ mã hoặc đổi sang mã khác thì làm thế nào? | D17 |
| W2-4 | Áp mã xong, quay lại giỏ bớt sản phẩm xuống dưới đơn tối thiểu thì mã còn giữ? | D16 |
| W2-5 | Phiên hết hạn giữa lúc thanh toán, đăng nhập lại thì mã đã áp còn không? | D16 |

**W3 — What if data lạ**

| W-ID | Câu hỏi | D-code |
|---|---|---|
| W3-1 | Đơn đúng bằng đơn tối thiểu có được áp? Ngưỡng tính trên tiền hàng hay gồm phí ship? | D03 |
| W3-2 | Mã giảm cố định lớn hơn tiền hàng thì tổng tiền bằng bao nhiêu? | D12 |
| W3-3 | Đơn 199.999đ giảm 15% ra số lẻ thì làm tròn thế nào? | D11 |
| W3-4 | Mã giảm 50% cho đơn 10.000.000đ có trần số tiền giảm không? | D02 |
| W3-5 | Giỏ có sản phẩm không thuộc chương trình thì giảm trên phần nào? | D08 |

**W4 — What when timing**

| W-ID | Câu hỏi | D-code |
|---|---|---|
| W4-1 | Mã hết hạn ngày 2026-11-30 là hết lúc 00:00 hay 23:59:59? Theo múi giờ nào? | D04 |
| W4-2 | Áp mã lúc 23:58, bấm Đặt hàng lúc 00:01 ngày hôm sau thì sao? | D19 |
| W4-3 | Hai thiết bị cùng dùng một mã chỉ còn 1 lượt thì đơn nào thành công? | D18 |
| W4-4 | Mã còn 1 lượt, khách đang áp thì người khác dùng mất lượt đó? | D05 |
| W4-5 | Kiểm tra mã mất bao lâu thì coi là lỗi? Có trạng thái đang xử lý không? | D22 |

**W5 — Who else actor**

| W-ID | Câu hỏi | D-code |
|---|---|---|
| W5-1 | Có mã chỉ dành cho khách mới hoặc khách đã có tài khoản không? | D07 |
| W5-2 | Một khách dùng lại cùng mã ở đơn thứ 2 thì sao? | D06 |
| W5-3 | Admin tắt hoặc sửa mã khi khách đang ở trang Thanh toán thì sao? | D19 |
| W5-4 | Script dò mã hàng loạt, hoặc sửa request đổi số tiền giảm thì sao? | D21 |
| W5-5 | CSKH hủy đơn đã dùng mã thì lượt dùng xử lý thế nào? | D15 |

**W6 — What happens after**

| W-ID | Câu hỏi | D-code |
|---|---|---|
| W6-1 | Lượt dùng bị trừ lúc bấm "Áp dụng" hay lúc đặt hàng thành công? | D14 |
| W6-2 | Khách hủy đơn thì có được hoàn lượt dùng mã không? | D15 |
| W6-3 | Thanh toán thẻ thất bại thì mã còn giữ cho lần thử lại không? | D15 |
| W6-4 | Đã áp mã, đổi địa chỉ làm phí ship đổi thì tổng tiền và điều kiện mã có tính lại? | D20 |
| W6-5 | Đơn đã đặt có hiện mã và số tiền giảm trong chi tiết đơn, email xác nhận không? | D23 |

## KHUÔN 6W

````markdown
# 02 — 6W — Function D (ShopGo)

## 1. Bảng 6W

| W-ID | Nhóm W | Câu hỏi | Kết quả | Trích đề bài | Nguồn | D-code |
|---|---|---|---|---|---|---|

Kết quả `KHONG` thì "Trích đề bài" ghi `—`, "Nguồn" ghi `[—]`.

## 2. Thống kê

| Nhóm W | CO | MOT_PHAN | KHONG |
|---|---|---|---|
| W1 What if input lạ | | | |
| W2 What if state lạ | | | |
| W3 What if data lạ | | | |
| W4 What when timing | | | |
| W5 Who else actor | | | |
| W6 What happens after | | | |
| Tổng | | | |

## 3. D-code cần đưa vào Autopsy

D-code của mọi câu hỏi có kết quả `MOT_PHAN` hoặc `KHONG`. Không trùng, tăng dần.
````
