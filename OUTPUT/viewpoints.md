# Viewpoint — Function D

## 1. Bảng viewpoint

| ID | Viewpoint | Mục tiêu | Điểm chưa rõ | Rủi ro nếu bỏ qua | 3 test idea mẫu |
|---|---|---|---|---|---|
| VP-01 | Happy Path | Xác nhận luồng nhập mã hợp lệ cho đơn đủ điều kiện chạy đúng: áp được, giảm đúng, tổng tiền mới đúng. | D01 | Mã Freeship áp được cho hóa đơn dưới 200.000đ, hoặc mã Freeship hợp lệ không áp được cho hóa đơn từ 200.000đ: hoặc mất phí vận chuyển trên mỗi đơn không đủ điều kiện, hoặc khách bỏ đơn. | Mã Freeship, hóa đơn trên 200.000đ → áp được, phí vận chuyển được miễn hoặc giảm; Mã giảm % hợp lệ, đơn đạt tối thiểu → áp được, hiển thị tiền giảm và tổng mới; Mã giảm cố định hợp lệ, mệnh giá nhỏ hơn tiền hàng → tiền giảm bằng đúng mệnh giá |
| VP-02 | Negative | Xác nhận mã hoặc thao tác sai (hết lượt, nhiều mã, sai định dạng nhập, ngoài phạm vi) bị chặn hoặc chuẩn hóa đúng. | D05, D08, D09, D10 | Mã đã hết tổng lượt vẫn áp được, hoặc mã thứ 2 được cộng dồn vào đơn đã có mã: mỗi đơn vượt lượt hoặc cộng dồn làm thất thoát trọn số tiền giảm của mã. | Mã còn hạn nhưng đã hết tổng lượt → từ chối, báo hết lượt; Đã áp mã A, áp mã B hợp lệ → B thay A, tính lại tổng; Nhập mã hợp lệ bằng chữ thường hoặc có khoảng trắng đầu/cuối → áp được như mã chuẩn |
| VP-03 | Boundary | Xác nhận tiền giảm và điều kiện áp mã đúng tại các giá trị biên: đơn tối thiểu, mốc hết hạn, trần giảm, làm tròn, giảm vượt tiền hàng. | D02, D03, D04, D11, D12 | Tổng đơn đúng bằng mức tối thiểu bị từ chối do so sánh sai toán tử; mã cố định lớn hơn tiền hàng làm tiền hàng âm; làm tròn sai bậc (1đ thay vì 1.000đ) lệch tới 500đ mỗi đơn giữa số hiển thị và số thu. | Tổng đơn (gồm phí vận chuyển) đúng bằng mức tối thiểu → áp được; Áp mã lúc 23:59:59 ngày hết hạn → áp được, lúc 00:00:00 ngày kế tiếp → từ chối; Tiền giảm % có phần lẻ đúng 500đ → làm tròn lên hàng nghìn |
| VP-04 | Security | Xác nhận mã không bị lạm dụng: dùng lại vượt giới hạn mỗi tài khoản, tranh chấp lượt cuối, nhập thử nhiều lần. | D06, D18, D21 | Một tài khoản dùng lại mã giới hạn 1 lần/khách ở nhiều đơn, hoặc 2 đơn cùng giành được lượt cuối: mỗi lần vượt giới hạn mất trọn số tiền giảm của mã. | Tài khoản đã dùng mã ở đơn trước nhập lại mã → từ chối, báo lỗi; Mã còn 1 lượt, 2 tài khoản cùng bấm Đặt hàng → đơn ghi nhận trước thành công, đơn sau báo hết lượt; Nhập sai mã nhiều lần liên tiếp → không bị khóa nhập mã |
| VP-05 | UX/Usability | Xác nhận khách hiểu được lý do mã không áp được và có thể gỡ mã đã áp. | D13, D17 | Mọi lỗi dùng chung một câu, khách không biết mã hết hạn hay đơn chưa đủ tối thiểu nên bỏ đơn; không gỡ được mã đã áp nên không đổi được sang lựa chọn khác. | Mã không tồn tại, hết hạn, đơn chưa đạt tối thiểu, hết lượt → 4 thông báo lỗi khác nhau; Bấm gỡ mã sau khi áp thành công → mã bị gỡ, tổng tiền về ban đầu; Đang có thông báo lỗi, nhập lại mã hợp lệ → áp được, thông báo lỗi không còn |
| VP-06 | Performance | Xác nhận trạng thái chờ khi kiểm tra mã hiển thị đúng và chặn được gửi trùng yêu cầu. | D22 | Không vô hiệu hóa nút Áp dụng khi chờ phản hồi: khách bấm đúp gửi nhiều yêu cầu kiểm tra mã cho cùng một phiên, có nguy cơ tạm giữ nhiều lượt dùng. | Bấm Áp dụng → hiển thị loading, nút Áp dụng bị vô hiệu hóa đến khi có phản hồi; Bấm đúp liên tục vào Áp dụng → chỉ 1 yêu cầu kiểm tra mã được gửi; Phản hồi trả về → nút Áp dụng hoạt động lại |
| VP-07 | Accessibility | Xác nhận khách chỉ dùng bàn phím hoặc trình đọc màn hình vẫn nhập và áp được mã. | KHONG_CO_DIEM | Khách không dùng được chuột hoặc dùng trình đọc màn hình không áp được mã, không nghe được thông báo lỗi: mất toàn bộ ưu đãi với nhóm khách này. | Tab tới ô Mã giảm giá, nhập mã, Tab tới nút Áp dụng, nhấn Enter → áp được; Trình đọc màn hình đọc được nhãn ô Mã giảm giá và nút Áp dụng; Thông báo lỗi xuất hiện → trình đọc màn hình đọc được nội dung lỗi |
| VP-08 | Integration | Xác nhận mã giảm giá khớp với tài khoản, giỏ hàng, đơn hàng, thanh toán, vận chuyển, admin và email. | D07, D14, D15, D16, D19, D20, D23, X01 | Đơn có mã bị hủy hoặc thanh toán thẻ thất bại mà không hoàn lượt: khách mất quyền dùng mã 1 lần/khách; mã bị Admin vô hiệu hóa vẫn tạo được đơn: giảm tiền ngoài chương trình trên mỗi đơn. | Áp mã thành công rồi giảm số lượng trong giỏ làm tổng đơn dưới tối thiểu → mã tự bị hủy, tổng tính lại; Admin vô hiệu hóa mã trước khi khách bấm Đặt hàng → từ chối tạo đơn; Đơn có mã bị hủy → lượt dùng được hoàn |

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
3. VP-02 — 2 điểm CAO, 4 điểm

## 4. Ghi chú cách đếm

- Nguồn: Phần A và Phần B của `OUTPUT/requirement_autopsy_report.md`. Phần A có 24 mã khác `RO` (D01–D23, X01), không có mã nào `RO`.
- Một "điểm chưa rõ" là một mã (D-code hoặc X) ở Phần A, không phải một dòng câu hỏi Q ở Phần B. Mã có nhiều dòng Q (D03, D04, D09, D10) vẫn tính 1 điểm.
- Một điểm là `CAO` khi mức rủi ro của mã đó ở Phần B là `CAO`. Nếu một mã có nhiều dòng Q khác mức rủi ro thì lấy mức cao nhất. Trong báo cáo hiện tại không có trường hợp này: D03 (CAO, CAO), D04 (TB, TB), D09 (CAO, CAO), D10 (TB, TB). Tổng 11 điểm CAO khớp Phần D mục 3 (11 mục CAO).
- Điểm CAO theo viewpoint: VP-02 = D05, D09; VP-03 = D02, D03, D11, D12; VP-04 = D06, D18; VP-08 = D14, D16, D19.
- X01 xếp VP-08 theo `knowledge/viewpoints.md`.
- Top 3: VP-03 (4 CAO) và VP-08 (3 CAO) xếp theo số điểm CAO. VP-02 và VP-04 cùng 2 điểm CAO, xét tổng số điểm: VP-02 có 4, VP-04 có 3, nên chọn VP-02.
- Số tiền ở cột "Rủi ro nếu bỏ qua" chỉ dùng giá trị có trong câu trả lời đã xác nhận ở `gate_status.json` (200.000đ của Q-D01-01, bậc 1.000đ của Q-D11-01) hoặc suy ra trực tiếp từ đó (lệch tối đa 500đ khi làm tròn sai bậc). Không dùng các số ví dụ khác trong Phần B của báo cáo Pha 2 vì không có trong `INPUT/` hay `gate_status.json`.
