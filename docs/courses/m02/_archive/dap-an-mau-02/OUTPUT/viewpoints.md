# Viewpoint — Function D

Nguồn: Phần A (trạng thái) và Phần B (mức rủi ro) của `OUTPUT/requirement_autopsy_report.md`; bảng gắn D-code trong `knowledge/test-viewpoints.md`.

Phần A có 24 mục, 0 mục `RO`: 9 `MO_HO` (D01, D02, D03, D04, D07, D10, D11, D13, D20), 14 `KHONG_DE_CAP` (D05, D06, D08, D09, D12, D14, D15, D16, D17, D18, D19, D21, D22, D23), 1 `MAU_THUAN` (X01). Vì vậy cả 24 mục là điểm chưa rõ.

## 1. Bảng viewpoint

| ID | Viewpoint | Mục tiêu | Điểm chưa rõ | Rủi ro nếu bỏ qua | 3 test idea mẫu |
|---|---|---|---|---|---|
| VP-01 | Happy Path | Luồng áp mã hợp lệ cho đơn đủ điều kiện chạy đúng: giảm đúng số tiền, tổng tiền mới đúng | D01 | Mã Freeship (được hỗ trợ theo Q-D01-01) không áp được hoặc giảm sai thành phần, khách có đơn 280.000đ mất ưu đãi phí vận chuyển 30.000đ hoặc bị giảm nhầm vào tiền hàng | Mã cố định GIAM20K, tổng 280.000đ, giảm 20.000đ còn 260.000đ; Mã 20% chạm trần 50.000đ; Mã Freeship với hóa đơn từ 200.000đ |
| VP-02 | Negative | Mã sai, hết lượt, dùng nhiều mã hoặc nhập sai định dạng bị chặn hoặc chuẩn hóa đúng | D05, D08, D09, D10 | Mã hết tổng lượt vẫn áp được, chương trình 100 lượt x 20.000đ vượt ngân sách 2.000.000đ; hoặc 2 mã cộng dồn giảm 70.000đ thay vì 50.000đ | Mã hết tổng lượt toàn hệ thống bị từ chối; Mã mới hợp lệ ghi đè mã cũ, không cộng dồn; Mã nhập chữ thường hoặc có khoảng trắng đầu cuối vẫn áp được |
| VP-03 | Boundary | Giá trị ở biên (tối thiểu, hạn, trần, làm tròn, giảm vượt tiền hàng) được tính đúng | D02, D03, D04, D11, D12 | Tổng đơn 199.999đ (tạm tính 169.999đ + phí vận chuyển 30.000đ) vẫn áp được mã tối thiểu 200.000đ, mất 20.000đ mỗi đơn | Tổng đơn đúng bằng 200.000đ tính cả phí vận chuyển; Mã hết hiệu lực từ 00:00:00 ngày kế tiếp theo GMT+7; Tiền giảm % có số lẻ làm tròn số học đến 1.000đ |
| VP-04 | Security | Mã không bị lạm dụng: dùng lại nhiều lần, tranh lượt cuối, dò mã | D06, D18, D21 | Một tài khoản dùng GIAM20K 10 lần, chương trình mất 200.000đ thay vì 20.000đ; hoặc 2 khách cùng dùng lượt cuối của mã | Tài khoản đã dùng mã nhập lại bị từ chối; 2 khách cùng Đặt hàng với lượt cuối; Nhập sai 6 lần liên tiếp không bị khóa (không có rate limit theo Q-D21-01) |
| VP-05 | UX/Usability | Khách hiểu vì sao mã lỗi, gỡ được mã và thấy rõ số tiền giảm | D13, D17 | Khách có tổng đơn 190.000đ nhận cùng một thông báo như mã không tồn tại, bỏ đơn thay vì mua thêm 10.000đ để đạt tối thiểu 200.000đ | Mỗi nguyên nhân lỗi có thông báo riêng; Gỡ mã đưa tiền giảm về 0đ và tổng về ban đầu; Áp thành công hiển thị số tiền giảm và tổng mới |
| VP-06 | Performance | Thao tác kiểm tra mã có trạng thái chờ rõ ràng và không gửi trùng yêu cầu | D22 | Mạng chậm, khách bấm Áp dụng 3 lần, hệ thống nhận 3 yêu cầu kiểm tra mã trùng lặp và tạm giữ lượt sai | Spinner và vô hiệu hóa nút Áp dụng khi chờ phản hồi; Bấm đúp chỉ gửi 1 yêu cầu; Thời gian kiểm tra mã khi mạng chậm |
| VP-07 | Accessibility | Khách dùng bàn phím hoặc trình đọc màn hình vẫn nhập và áp được mã | KHONG_CO_DIEM | Khách dùng trình đọc màn hình không nghe được thông báo lỗi, không áp được mã giảm 20.000đ mà không biết lý do | Dùng Tab tới ô Mã giảm giá và nút Áp dụng, Enter để áp; Trình đọc màn hình đọc nhãn ô nhập và nút; Trình đọc màn hình đọc thông báo lỗi khi xuất hiện |
| VP-08 | Integration | Mã khớp với tài khoản, giỏ hàng, đơn hàng, thanh toán, admin, email | D07, D14, D15, D16, D19, D20, D23, X01 | Khách áp GIAM20K ở tổng 230.000đ rồi bớt hàng còn 130.000đ vẫn giữ giảm 20.000đ; hoặc đơn bị hủy không hoàn lượt, khách mất quyền dùng mã | Sửa giỏ làm tổng dưới tối thiểu thì mã tự hủy; Hủy đơn hoàn lại lượt dùng mã; Mã bị Admin vô hiệu hóa trước Đặt hàng thì không tạo đơn |

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

Đối chiếu: 24 điểm = 24 mã khác `RO` ở Phần A. 11 điểm `CAO` = 11 mục rủi ro `CAO` ở Phần D mục 3 của báo cáo Pha 2.

## 3. Top 3

1. VP-03 — 4 điểm CAO, 5 điểm
2. VP-08 — 3 điểm CAO, 8 điểm
3. VP-02 — 2 điểm CAO, 4 điểm (bằng VP-04 về điểm CAO, hơn VP-04 về tổng điểm 4 > 3)

## 4. Truy vết mức rủi ro từng mã

Mã có nhiều câu hỏi lấy mức cao nhất trong Phần B.

| Mã | Viewpoint | Câu hỏi Phần B | Mức rủi ro |
|---|---|---|---|
| D01 | VP-01 | Q-D01-01 | TB |
| D02 | VP-03 | Q-D02-01 | CAO |
| D03 | VP-03 | Q-D03-01, Q-D03-02 | CAO |
| D04 | VP-03 | Q-D04-01, Q-D04-02 | TB |
| D05 | VP-02 | Q-D05-01 | CAO |
| D06 | VP-04 | Q-D06-01 | CAO |
| D07 | VP-08 | Q-D07-01 | TB |
| D08 | VP-02 | Q-D08-01 | TB |
| D09 | VP-02 | Q-D09-01, Q-D09-02 | CAO |
| D10 | VP-02 | Q-D10-01, Q-D10-02 | TB |
| D11 | VP-03 | Q-D11-01 | CAO |
| D12 | VP-03 | Q-D12-01 | CAO |
| D13 | VP-05 | Q-D13-01 | TB |
| D14 | VP-08 | Q-D14-01 | CAO |
| D15 | VP-08 | Q-D15-01 | TB |
| D16 | VP-08 | Q-D16-01 | CAO |
| D17 | VP-05 | Q-D17-01 | TB |
| D18 | VP-04 | Q-D18-01 | CAO |
| D19 | VP-08 | Q-D19-01 | CAO |
| D20 | VP-08 | Q-D20-01 | TB |
| D21 | VP-04 | Q-D21-01 | TB |
| D22 | VP-06 | Q-D22-01 | TB |
| D23 | VP-08 | Q-D23-01 | THAP |
| X01 | VP-08 | Q-X01-01 | TB |
