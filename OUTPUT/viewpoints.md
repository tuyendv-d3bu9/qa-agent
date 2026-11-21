# Viewpoint — Function D

Nguồn: Phần A (D01–D23 và X01 đều khác `RO`, 0 mục `RO`), rủi ro theo "Rủi ro gợi ý" trong `knowledge/voucher-domain.md`, X01 = TB. Mỗi D-code lấy mức rủi ro cao nhất.

## 1. Bảng viewpoint

| ID | Viewpoint | Mục tiêu | Điểm chưa rõ | Rủi ro nếu bỏ qua | 3 test idea mẫu |
|---|---|---|---|---|---|
| VP-01 | Happy Path | Kiểm tra mã hợp lệ trên đơn đủ điều kiện được giảm đúng và tổng tiền đúng | D01 | Chưa rõ hệ thống hỗ trợ loại mã nào (% hay số tiền cố định hay Freeship), mã hợp lệ có thể bị tính sai số tiền giảm ngay trên luồng chính, ví dụ đơn 500.000đ áp mã giảm 50.000đ nhưng bị tính giảm sai thành 0đ hoặc trừ sai tổng tiền thanh toán | Áp mã phần trăm hợp lệ trên đơn đủ điều kiện; Áp mã số tiền cố định hợp lệ; Áp mã Freeship hợp lệ cho hóa đơn từ 200.000đ |
| VP-02 | Negative | Kiểm tra input hoặc luồng sai bị chặn đúng | D05, D08, D09, D10 | Mã đã hết tổng lượt dùng hoặc cho phép áp nhiều mã trên một đơn, ví dụ khách áp đồng thời 2 mã giảm 50.000đ làm thất thoát 100.000đ trên mỗi đơn hàng | Áp mã đã hết tổng lượt dùng toàn hệ thống; Nhập mã thứ hai khi đã có mã trên đơn; Nhập mã sai định dạng, hoa thường hoặc có khoảng trắng thừa |
| VP-03 | Boundary | Kiểm tra giá trị ở biên được tính đúng | D02, D03, D04, D11, D12 | Mã phần trăm không có trần giảm hoặc đơn sát ngưỡng tối thiểu vẫn được giảm, ví dụ đơn 199.999đ (thiếu 1đ) vẫn được giảm 20% làm mất 40.000đ mỗi đơn, hoặc tiền giảm vượt tiền hàng làm tổng tiền âm | Đơn đúng bằng ngưỡng tối thiểu và đơn thấp hơn 1đ; Giảm phần trăm vượt trần giảm tối đa; Tiền giảm có số lẻ làm tròn đến 1.000đ |
| VP-04 | Security | Kiểm tra mã không bị lạm dụng | D06, D18, D21 | Kẻ gian lạm dụng mã vượt lượt quy định hoặc dò quét mã liên tục, ví dụ một tài khoản áp dụng lại mã 100.000đ nhiều lần gây thất thoát ngân sách khuyến mãi | Cùng một tài khoản áp dụng mã vượt quá 1 lần; Hai phiên cùng áp mã và đặt hàng ở lượt cuối; Thử sai mã liên tục nhiều lần mà không bị khóa |
| VP-05 | UX/Usability | Kiểm tra người dùng hiểu và dùng được chức năng mã giảm giá | D13, D17 | Mọi lỗi chỉ hiển thị một thông báo chung khiến khách không biết nguyên nhân bị từ chối, hoặc không có nút gỡ mã dẫn đến khách bỏ giỏ hàng không thanh toán | Thông báo lỗi riêng biệt cho từng nguyên nhân dưới ô nhập mã; Bấm nút gỡ mã và tổng tiền khôi phục ban đầu; Nhập mã mới tự động ghi đè mã cũ |
| VP-06 | Performance | Kiểm tra việc kiểm tra mã đủ nhanh và có trạng thái chờ | D22 | Thao tác kiểm tra mã chậm và không có trạng thái loading, khách bấm liên tiếp nhiều lần làm gửi trùng yêu cầu gây nghẽn máy chủ hoặc treo phiên thanh toán | Hiển thị spinner và vô hiệu hóa nút Áp dụng khi chờ API; Bấm liên tiếp nhiều lần vào nút Áp dụng khi đang xử lý; Thời gian phản hồi kiểm tra mã đáp ứng quy định |
| VP-07 | Accessibility | Kiểm tra người dùng đặc biệt dùng được ô nhập mã và nút Áp dụng | KHONG_CO_DIEM | Danh mục D-code chưa có chủ đề cho góc này; nếu bỏ qua, người dùng bàn phím hoặc trình đọc màn hình không thể tiếp cận và áp dụng mã giảm giá | Dùng phím Tab và Enter để nhập và áp mã; Trình đọc màn hình đọc nhãn ô nhập mã; Thông báo lỗi được trình đọc màn hình thông báo rõ ràng |
| VP-08 | Integration | Kiểm tra mã giảm giá khớp với tài khoản, giỏ hàng, đơn hàng, thanh toán, vận chuyển, admin, email | D07, D14, D15, D16, D19, D20, D23, X01 | Lượt dùng bị trừ khi mới bấm áp dụng dù chưa đặt hàng, hoặc sửa giỏ hàng xuống dưới ngưỡng tối thiểu mà không hủy mã, ví dụ đơn giảm xuống dưới 200.000đ vẫn được giảm 50.000đ làm thất thoát tiền hàng | Khách chưa đăng nhập bị chặn áp dụng mã; Sửa giỏ hàng làm đơn dưới mức tối thiểu thì tự động hủy mã; Hủy đơn hàng hoặc thanh toán thất bại tự động hoàn lại lượt dùng |

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
