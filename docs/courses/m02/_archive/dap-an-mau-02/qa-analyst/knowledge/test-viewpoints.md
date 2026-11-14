# Tri thức kiểm thử — 8 viewpoint cố định

8 viewpoint dưới đây là khung dùng chung cho Pha 3. Không thêm, không bớt, không đổi tên viewpoint, để so được giữa các bộ test.

| ID | Viewpoint | Câu hỏi chủ đạo | Phạm vi trong Function D | Tag |
|---|---|---|---|---|
| VP-01 | Happy Path | Luồng đúng có chạy đúng không? | Mã hợp lệ, đơn đủ điều kiện, giảm đúng, tổng tiền đúng | `@happy` |
| VP-02 | Negative | Input hoặc luồng sai có bị chặn đúng không? | Mã không tồn tại, hết hạn, sai định dạng, hết lượt, dùng nhiều mã | `@negative` |
| VP-03 | Boundary | Giá trị ở biên có đúng không? | Đơn tối thiểu, mốc hết hạn, trần giảm, làm tròn, giảm vượt tiền hàng | `@boundary` |
| VP-04 | Security | Có bị lạm dụng không? | Dò mã, sửa request, dùng vượt lượt, dùng đồng thời | `@security` |
| VP-05 | UX/Usability | Người dùng có hiểu và dùng được không? | Thông báo lỗi, gỡ hoặc đổi mã, hiển thị số tiền giảm | `@ux` |
| VP-06 | Performance | Có đủ nhanh không? | Thời gian kiểm tra mã, trạng thái đang xử lý | `@performance` |
| VP-07 | Accessibility | Người dùng đặc biệt có dùng được không? | Ô nhập mã, nút Áp dụng với bàn phím, trình đọc màn hình | `@a11y` |
| VP-08 | Integration | Có khớp với tính năng khác không? | Tài khoản, giỏ hàng, đơn hàng, thanh toán, vận chuyển, admin, email | `@integration` |

Boundary là đúng ở biên. Negative là sai hẳn. "Edge case" không phải viewpoint riêng: biên giá trị xếp VP-03, luồng sai xếp VP-02.

## Gắn D-code vào viewpoint

Mỗi D-code thuộc đúng 1 viewpoint chính.

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

Mã X (mâu thuẫn tài liệu) xếp vào viewpoint của chủ đề nó nói tới. Ví dụ mâu thuẫn về nơi mua hàng và tiền tệ xếp VP-08.
