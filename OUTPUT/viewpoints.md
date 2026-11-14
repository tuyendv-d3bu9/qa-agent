# Viewpoint — Function D

Nguồn: Phần A (D01–D23 và X01 đều khác `RO`, 0 mục `RO`), rủi ro theo "Rủi ro gợi ý" trong `knowledge/voucher-domain.md`, X01 = TB. Mỗi D-code lấy mức rủi ro cao nhất.

## 1. Bảng viewpoint

| ID | Viewpoint | Mục tiêu | Điểm chưa rõ | Rủi ro nếu bỏ qua | 3 test idea mẫu |
|---|---|---|---|---|---|
| VP-01 | Happy Path | Kiểm tra mã hợp lệ trên đơn đủ điều kiện được giảm đúng và tổng tiền đúng | D01 | Chưa rõ hệ thống hỗ trợ loại mã nào (phần trăm, số tiền cố định, freeship), mã đúng có thể bị tính sai cách giảm ngay trên luồng chính | Áp mã phần trăm hợp lệ trên đơn đủ điều kiện; Áp mã số tiền cố định hợp lệ; Áp mã freeship hợp lệ (nếu có loại này) |
| VP-02 | Negative | Kiểm tra input hoặc luồng sai bị chặn đúng | D05, D08, D09, D10 | Mã đã hết lượt toàn hệ thống hoặc nhiều mã cùng áp trên một đơn vẫn được chấp nhận, cửa hàng giảm giá ngoài kế hoạch | Áp mã đã hết tổng lượt dùng; Nhập mã thứ hai khi đã có mã trên đơn; Nhập mã sai hoa/thường, có khoảng trắng thừa hoặc ký tự đặc biệt |
| VP-03 | Boundary | Kiểm tra giá trị ở biên được tính đúng | D02, D03, D04, D11, D12 | Mã phần trăm không có trần giảm hoặc đơn sát ngưỡng tối thiểu vẫn được giảm, tiền giảm vượt mức dự kiến; tiền giảm lớn hơn tiền hàng làm tổng tiền âm | Đơn đúng bằng ngưỡng tối thiểu và thấp hơn một đơn vị; Giảm phần trăm vượt trần giảm; Tiền giảm lớn hơn tiền hàng |
| VP-04 | Security | Kiểm tra mã không bị lạm dụng | D06, D18, D21 | Một khách dùng lại mã nhiều lần, hai người cùng dùng lượt cuối thành công cả hai, hoặc dò mã không bị giới hạn | Cùng một khách dùng mã vượt giới hạn lượt; Hai phiên cùng áp mã ở lượt cuối; Thử sai mã liên tục nhiều lần |
| VP-05 | UX/Usability | Kiểm tra người dùng hiểu và dùng được chức năng mã giảm giá | D13, D17 | Mọi lỗi chỉ hiện một thông báo chung, khách không biết vì sao mã bị từ chối; không gỡ hoặc đổi được mã đã áp | Thông báo lỗi riêng cho mã hết hạn và mã không tồn tại; Gỡ mã đã áp và kiểm tra tổng tiền tính lại; Đổi sang mã khác |
| VP-06 | Performance | Kiểm tra việc kiểm tra mã đủ nhanh và có trạng thái chờ | D22 | Kiểm tra mã chậm không có loading, khách bấm Áp dụng nhiều lần gây gửi trùng yêu cầu | Đo thời gian phản hồi khi áp mã; Bấm đúp nút Áp dụng khi đang xử lý; Mô phỏng timeout khi kiểm tra mã |
| VP-07 | Accessibility | Kiểm tra người dùng đặc biệt dùng được ô nhập mã và nút Áp dụng | KHONG_CO_DIEM | Danh mục D-code chưa có chủ đề cho góc này; nếu bỏ qua, người dùng bàn phím hoặc trình đọc màn hình có thể không áp được mã | Dùng Tab và Enter để nhập và áp mã; Trình đọc màn hình đọc nhãn ô nhập mã; Thông báo lỗi được trình đọc màn hình đọc ra |
| VP-08 | Integration | Kiểm tra mã giảm giá khớp với tài khoản, giỏ hàng, đơn hàng, thanh toán, vận chuyển, admin, email | D07, D14, D15, D16, D19, D20, D23, X01 | Lượt dùng bị trừ khi chỉ bấm áp dụng dù đơn chưa đặt, hoặc giỏ đổi sau khi áp mã mà tiền giảm không tính lại, đơn mất điều kiện vẫn được giảm | Sửa giỏ hàng sau khi áp mã; Hủy đơn hoặc thanh toán thất bại rồi kiểm tra lượt dùng; Admin tắt mã khi khách đang thanh toán |

## 2. Phân bố

| ID | Số điểm | Số điểm CAO |
|---|---|---|
| VP-01 | 1 | 0 |
| VP-02 | 4 | 2 |
| VP-03 | 5 | 4 |
| VP-04 | 3 | 2 |
| VP-05 | 2 | 0 |
| VP-06 | 1 | 0 |
| VP-07 | 0 | 0 |
| VP-08 | 8 | 3 |
| Tổng | 24 | 11 |

## 3. Top 3

1. VP-03 — 4 điểm CAO, 5 điểm
2. VP-08 — 3 điểm CAO, 8 điểm
3. VP-02 — 2 điểm CAO, 4 điểm (bằng VP-04 về số điểm CAO, hơn về tổng số điểm)
