# Viewpoint Generator

## Mục đích

Nhìn Function D từ 8 góc kiểm thử cố định. Biết góc nào đang có nhiều điểm chưa rõ nhất để ưu tiên test.

## Đầu vào, đầu ra

| | File | Lấy gì |
|---|---|---|
| Đầu vào | `OUTPUT/requirement_autopsy_report.md` | Phần A (trạng thái D-code), Phần B (missing rule, rủi ro) |
| Đầu vào | `knowledge/voucher-domain.md` | Danh mục D01–D23 |
| Đầu ra | `OUTPUT/viewpoints.md` | Bảng viewpoint, phân bố rủi ro, Top 3 |

## 8 viewpoint

| ID | Viewpoint | Câu hỏi chủ đạo | Phạm vi trong Function D |
|---|---|---|---|
| VP-01 | Happy Path | Luồng đúng có chạy đúng không? | Mã hợp lệ, đơn đủ điều kiện, giảm đúng, tổng tiền đúng |
| VP-02 | Negative | Input hoặc luồng sai có bị chặn đúng không? | Mã không tồn tại, hết hạn, sai định dạng, hết lượt, dùng nhiều mã |
| VP-03 | Boundary | Giá trị ở biên có đúng không? | Đơn tối thiểu, mốc hết hạn, trần giảm, làm tròn, giảm vượt tiền hàng |
| VP-04 | Security | Có bị lạm dụng không? | Dò mã, sửa request, dùng vượt lượt, dùng đồng thời |
| VP-05 | UX/Usability | Người dùng có hiểu và dùng được không? | Thông báo lỗi, gỡ hoặc đổi mã, hiển thị số tiền giảm |
| VP-06 | Performance | Có đủ nhanh không? | Thời gian kiểm tra mã, trạng thái đang xử lý |
| VP-07 | Accessibility | Người dùng đặc biệt có dùng được không? | Ô nhập mã, nút Áp dụng với bàn phím, trình đọc màn hình |
| VP-08 | Integration | Có khớp với tính năng khác không? | Tài khoản, giỏ hàng, đơn hàng, thanh toán, vận chuyển, admin, email |

## Gắn D-code vào viewpoint

Mỗi D-code thuộc 1 viewpoint chính.

| Viewpoint | D-code |
|---|---|
| VP-01 Happy Path | D01 |
| VP-02 Negative | D05, D08, D09, D10 |
| VP-03 Boundary | D02, D03, D04, D11, D12 |
| VP-04 Security | D06, D18, D21 |
| VP-05 UX/Usability | D13, D17 |
| VP-06 Performance | D22 |
| VP-07 Accessibility | (chưa có D-code) |
| VP-08 Integration | D07, D14, D15, D16, D19, D20, D23 |

Mã X (mâu thuẫn tài liệu) xếp vào viewpoint của chủ đề nó nói tới. X01 (mua ở Nhật Bản) xếp VP-08.

## Cách làm

1. Đọc Phần A. Lấy mọi D-code và mã X có trạng thái khác `RO`.
2. Xếp từng mã vào viewpoint theo bảng trên.
3. Mỗi viewpoint đếm: số điểm chưa rõ, số điểm rủi ro `CAO`.
4. Mỗi viewpoint viết:
   - Mục tiêu: 1 câu, dựa vào câu hỏi chủ đạo.
   - Rủi ro nếu bỏ qua: 1 tình huống cụ thể, có số tiền nếu liên quan tiền.
   - 3 test idea mẫu: ưu tiên lấy từ điểm chưa rõ của viewpoint đó.
5. Chọn Top 3: nhiều điểm `CAO` nhất. Bằng nhau thì xét tổng số điểm. Vẫn bằng thì theo ID nhỏ hơn.

## Quy tắc

- Đủ 8 viewpoint, kể cả viewpoint không có điểm nào.
- Viewpoint không có điểm nào ghi `KHONG_CO_DIEM`. Không có nghĩa là không cần test, mà là danh mục D-code chưa có chủ đề cho góc này.
- Không tự đặt viewpoint mới như "Edge Case". Edge case nằm trong Boundary hoặc Negative.

## Khuôn đầu ra

```markdown
# Viewpoint — Function D

## 1. Bảng viewpoint

| ID | Viewpoint | Mục tiêu | Điểm chưa rõ | Rủi ro nếu bỏ qua | 3 test idea mẫu |
|---|---|---|---|---|---|

## 2. Phân bố

| ID | Số điểm | Số điểm CAO |
|---|---|---|
| Tổng | | |

## 3. Top 3

1. VP-xx — <số điểm CAO> điểm CAO, <tổng> điểm
2.
3.
```

## Ví dụ một dòng

| ID | Viewpoint | Mục tiêu | Điểm chưa rõ | Rủi ro nếu bỏ qua | 3 test idea mẫu |
|---|---|---|---|---|---|
| VP-03 | Boundary | Giá trị ở biên tính đúng | D02, D03, D04, D11, D12 | Đơn 199.999đ vẫn được giảm 20%, mất 40.000đ mỗi đơn | Đơn đúng bằng tối thiểu; Giảm % vượt trần; Tiền giảm có số lẻ |

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| Dồn gần hết idea vào Happy Path | Đếm phân bố, viewpoint nào trống thì xem lại |
| Gộp Negative và Boundary | Boundary là đúng ở biên. Negative là sai hẳn |
| Bỏ qua viewpoint không có điểm | Vẫn ghi đủ 8 dòng, đánh `KHONG_CO_DIEM` |
| Tự thêm viewpoint | Chỉ dùng 8 viewpoint cố định để so được giữa các bộ test |

## Dùng cho phần sau

- Test Idea dùng bảng viewpoint làm khung.
- Module 3 dùng Top 3 để làm coverage strategy theo rủi ro.
