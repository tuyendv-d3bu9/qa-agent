# Test Idea — Function D

Trạng thái duyệt: DA_DUYET
Người lọc: Trainer (đáp án mẫu)

Nguồn: `OUTPUT/viewpoints.md`, Phần B của `OUTPUT/requirement_autopsy_report.md`, câu trả lời đã xác nhận trong `gate_status.json` (28/28 RESOLVED), `INPUT/Spec Function D.md`.

## Rule gốc

| BR-ID | Câu nguyên văn trong INPUT/Spec Function D.md |
|---|---|
| BR-01 | Có 2 loại mã: giảm theo phần trăm (%) và giảm số tiền cố định (VND). |
| BR-02 | Mã chỉ dùng được khi đơn hàng đạt giá trị tối thiểu quy định của mã. |
| BR-03 | Mỗi mã có ngày hết hạn. |
| BR-04 | Áp dụng thành công → hiển thị số tiền được giảm và tổng tiền mới. |
| BR-05 | Mã không hợp lệ hoặc hết hạn → hiển thị thông báo lỗi. |

## Danh sách idea

| TI-ID | Viewpoint | Test idea | Nguồn | Lọc | Lý do |
|---|---|---|---|---|---|
| TI-01 | VP-01 | Mã cố định `GIAM20K` (giảm 20.000đ, tối thiểu 200.000đ), tạm tính 250.000đ + phí vận chuyển 30.000đ = tổng 280.000đ → áp được, không có thông báo lỗi, hiển thị giảm 20.000đ, tổng mới 260.000đ | BR-01, BR-04, BR-05, Q-D20-01 | GIU |  |
| TI-02 | VP-01 | Mã `SALE20` (giảm 20%, trần 50.000đ, tối thiểu 200.000đ), tạm tính 500.000đ + phí vận chuyển 30.000đ = 530.000đ → giảm 50.000đ (20% vượt trần dù tính trên tạm tính 100.000đ hay trên tổng 106.000đ), tổng mới 480.000đ | BR-01, Q-D02-01 | GIU |  |
| TI-03 | VP-01 | Mã `FREESHIP`, tạm tính 250.000đ + phí vận chuyển 30.000đ = 280.000đ (đạt 200.000đ theo cả hai cách hiểu "hóa đơn") → áp được; số tiền giảm và thành phần được giảm: cần BA xác nhận | Q-D01-01 | GIU |  |
| TI-04 | VP-02 | Mã `FREESHIP`, tạm tính 150.000đ + phí vận chuyển 30.000đ = 180.000đ (dưới 200.000đ theo cả hai cách hiểu "hóa đơn") → không áp được, tổng giữ 180.000đ | BR-01, Q-D01-01 | GIU |  |
| TI-05 | VP-03 | Mã `SALE10` (giảm 10%, trần 100.000đ), tạm tính 300.000đ + phí vận chuyển 30.000đ = 330.000đ, không chạm trần → giảm 30.000đ hay 33.000đ tùy giá trị tính giảm: cần BA xác nhận | Q-D02-01 | GIU |  |
| TI-06 | VP-03 | B-01: tạm tính 169.999đ + phí vận chuyển 30.000đ = tổng 199.999đ, mã `GIAM20K` tối thiểu 200.000đ → không áp được, không hiển thị số tiền giảm, tổng giữ 199.999đ, thông báo lỗi riêng cho nguyên nhân chưa đủ tối thiểu | BR-02, BR-04, Q-D03-01, Q-D13-01 | GIU |  |
| TI-07 | VP-03 | B-02: tạm tính 170.000đ + phí vận chuyển 30.000đ = tổng 200.000đ, mã `GIAM20K` → áp được (>=), giảm 20.000đ, tổng mới 180.000đ | BR-02, Q-D03-01, Q-D03-02 | GIU |  |
| TI-08 | VP-03 | B-03: tạm tính 170.001đ + phí vận chuyển 30.000đ = tổng 200.001đ, mã `GIAM20K` → áp được, giảm 20.000đ, tổng mới 180.001đ | BR-02, Q-D03-02 | GIU |  |
| TI-09 | VP-03 | Tạm tính 190.000đ (dưới tối thiểu) + phí vận chuyển 30.000đ = tổng 220.000đ, mã `GIAM20K` → áp được vì so trên tổng gồm phí vận chuyển, tổng mới 200.000đ | Q-D03-01 | GIU |  |
| TI-10 | VP-03 | Tạm tính 180.000đ + phí vận chuyển 20.000đ = tổng 200.000đ, mã `GIAM20K` → áp được, tổng mới 180.000đ | Q-D03-02 | BO_TRUNG | Trùng TI-07: cùng điều kiện tổng đúng bằng tối thiểu 200.000đ (chỉ khác cách chia tạm tính và phí vận chuyển), cùng kết quả áp được, tổng 180.000đ |
| TI-11 | VP-03 | B-04: mã `HAN3011` hạn 30/11/2026, thời điểm 29/11/2026 10:00:00 (GMT+7), tổng 280.000đ → áp được, tổng mới 260.000đ | BR-03 | GIU |  |
| TI-12 | VP-03 | B-05: mã `HAN3011`, thời điểm 30/11/2026 23:59:30 (GMT+7) → còn hiệu lực, áp được, tổng mới 260.000đ | BR-03, Q-D04-01 | GIU |  |
| TI-13 | VP-03 | B-06: mã `HAN3011`, thời điểm 01/12/2026 00:00:00 (GMT+7) → không áp được, thông báo lỗi riêng cho nguyên nhân hết hạn | BR-03, BR-05, Q-D04-01, Q-D13-01 | GIU |  |
| TI-14 | VP-03 | Thiết bị đặt múi giờ UTC (đồng hồ thiết bị 30/11/2026 17:30), thời điểm thực 01/12/2026 00:30 (GMT+7), mã `HAN3011` → không áp được vì hệ thống xét hạn theo GMT+7 | Q-D04-02 | GIU |  |
| TI-15 | VP-02 | Mã `KHONGCO99` không tồn tại → không áp được, không hiển thị số tiền giảm, tổng giữ 280.000đ, thông báo lỗi riêng cho nguyên nhân mã không tồn tại | BR-04, BR-05, Q-D13-01 | GIU |  |
| TI-16 | VP-02 | Mã `HETLUOT` còn hạn nhưng đã dùng hết 100/100 lượt toàn hệ thống → không áp được, thông báo lỗi riêng cho nguyên nhân hết lượt | Q-D05-01, Q-D13-01 | GIU |  |
| TI-17 | VP-04 | Tài khoản đã đặt thành công 1 đơn với `GIAM20K`, nhập lại `GIAM20K` ở đơn mới → không áp được, có thông báo lỗi | Q-D06-01 | GIU |  |
| TI-18 | VP-08 | Khách vãng lai chưa đăng nhập vào trang Thanh toán → không nhập và áp được `GIAM20K` cho tới khi đăng nhập | Q-D07-01 | GIU |  |
| TI-19 | VP-02 | Giỏ gồm Áo thun 100.000đ (Thời trang) và Sách 100.000đ (Sách), phí vận chuyển 30.000đ, tổng 230.000đ, mã `GIAM20K` → áp được cho toàn bộ giỏ, tổng mới 210.000đ | Q-D08-01 | GIU |  |
| TI-20 | VP-02 | Đã áp `GIAM20K` (tổng 530.000đ còn 510.000đ), nhập `SALE20` hợp lệ → `SALE20` thay `GIAM20K`, chỉ 1 mã trên đơn, giảm 50.000đ (không cộng dồn 70.000đ), tổng mới 480.000đ | Q-D09-01, Q-D09-02 | GIU |  |
| TI-21 | VP-02 | Đã áp `GIAM20K`, nhập mã `HETHAN1311` đã hết hạn → `GIAM20K` được giữ hay bị gỡ: cần BA xác nhận | Q-D09-02 | GIU |  |
| TI-22 | VP-02 | Nhập `giam20k` (chữ thường) → hệ thống chuẩn hóa thành `GIAM20K`, áp được, tổng mới 260.000đ | Q-D10-01 | GIU |  |
| TI-23 | VP-02 | Nhập `Giam20K` (hoa thường lẫn lộn) → áp được, tổng mới 260.000đ | Q-D10-01 | BO_TRUNG | Trùng TI-22: cùng lớp tương đương mã không đúng chữ in hoa, cùng kết quả áp được, tổng 260.000đ |
| TI-24 | VP-02 | Nhập `  GIAM20K  ` (khoảng trắng đầu và cuối) → tự cắt khoảng trắng, áp được, tổng mới 260.000đ | Q-D10-02 | GIU |  |
| TI-25 | VP-02 | Nhập `GIAM20K!@#` (không có mã nào trùng chuỗi này) → không áp được, thông báo lỗi riêng cho nguyên nhân mã không tồn tại | BR-05, Q-D13-01 | GIU |  |
| TI-26 | VP-03 | Mã `SALE2` (giảm 2%, trần 100.000đ), tạm tính 775.000đ + phí vận chuyển 20.000đ = 795.000đ → tiền giảm 15.500đ (theo tạm tính) hoặc 15.900đ (theo tổng) đều làm tròn số học thành 16.000đ, tổng mới 779.000đ | Q-D11-01 | GIU |  |
| TI-27 | VP-03 | Mã `SALE2`, tạm tính 754.000đ + phí vận chuyển 20.000đ = 774.000đ → tiền giảm 15.080đ hoặc 15.480đ đều làm tròn thành 15.000đ, tổng mới 759.000đ | Q-D11-01 | GIU |  |
| TI-28 | VP-03 | Mã `SALE10` (giảm 10%), tạm tính 155.000đ + phí vận chuyển 30.000đ = 185.000đ → 15.500đ làm tròn 16.000đ (theo tạm tính) hay 18.500đ làm tròn 19.000đ (theo tổng): cần BA xác nhận giá trị tính giảm | Q-D11-01 | GIU |  |
| TI-29 | VP-03 | B-09: mã `GIAM300K` (giảm 300.000đ, tối thiểu 200.000đ), tạm tính 250.000đ + phí vận chuyển 30.000đ = 280.000đ → tiền giảm giới hạn bằng tạm tính 250.000đ, tổng mới 30.000đ, không âm | Q-D12-01, Q-D20-01 | GIU |  |
| TI-30 | VP-03 | B-08: mã `GIAM300K`, tạm tính 300.000đ + phí vận chuyển 30.000đ = 330.000đ → giảm đúng 300.000đ (bằng tạm tính), tổng mới 30.000đ | Q-D12-01, Q-D20-01 | GIU |  |
| TI-31 | VP-05 | Lần lượt áp 4 mã, mỗi mã vi phạm đúng 1 điều kiện (không tồn tại, hết hạn, chưa đủ tối thiểu, hết lượt) → 4 thông báo lỗi khác nhau theo nguyên nhân | BR-05, Q-D13-01 | GIU |  |
| TI-32 | VP-05 | Đã áp `GIAM20K` (tổng 260.000đ), bấm gỡ mã → số tiền giảm về 0đ, tổng về 280.000đ | Q-D17-01 | GIU |  |
| TI-33 | VP-08 | Áp `GIAM20K` thành công nhưng chưa Đặt hàng → lượt được tạm giữ, số lượt đã dùng chính thức chưa tăng (vẫn 10/100) | Q-D14-01 | GIU |  |
| TI-34 | VP-08 | Áp `GIAM20K` rồi Đặt hàng thành công → số lượt đã dùng chính thức tăng từ 10/100 lên 11/100 | Q-D14-01 | GIU |  |
| TI-35 | VP-04 | Mã còn 1 lượt, khách A đã áp thành công (lượt bị tạm giữ), khách B nhập cùng mã và bấm Áp dụng → khách B áp được hay bị từ chối: cần BA xác nhận | Q-D14-01, Q-D18-01 | GIU |  |
| TI-36 | VP-04 | Mã còn 1 lượt, 2 khách cùng bấm Đặt hàng cùng thời điểm → đơn ghi nhận trước tại máy chủ thành công, đơn sau bị từ chối với lỗi hết lượt | Q-D18-01 | GIU |  |
| TI-37 | VP-08 | Đơn đã đặt với `GIAM20K` bị khách hủy → lượt được hoàn (11/100 về 10/100), tài khoản áp lại được `GIAM20K` | Q-D15-01 | GIU |  |
| TI-38 | VP-08 | Đơn với `GIAM20K` thanh toán thẻ thất bại → lượt được hoàn, số lượt đã dùng giữ 10/100, tài khoản áp lại được `GIAM20K` | Q-D15-01 | GIU |  |
| TI-39 | VP-08 | Thanh toán thẻ thất bại → hệ thống cho khách chọn lại phương thức thanh toán khác | Q-D15-01 | NGOAI_PHAM_VI | Kết quả cần kiểm là luồng chọn phương thức thanh toán, thuộc tính năng Thanh toán, không phải hành vi của mã |
| TI-40 | VP-08 | Đã áp `GIAM20K` ở tạm tính 200.000đ + phí vận chuyển 30.000đ = 230.000đ, sửa giỏ còn tạm tính 100.000đ (tổng 130.000đ) → mã tự hủy, tiền giảm 0đ, tổng 130.000đ, có thông báo đơn không còn đủ điều kiện | BR-02, Q-D16-01 | GIU |  |
| TI-41 | VP-08 | Đã áp `TATMA20K`, Admin vô hiệu hóa mã trước khi khách bấm Đặt hàng → không tạo đơn, thông báo mã không còn hiệu lực | Q-D19-01 | GIU |  |
| TI-42 | VP-08 | Áp `HAN3011` lúc 30/11/2026 23:59:00, bấm Đặt hàng lúc 01/12/2026 00:00:30 (GMT+7) → không tạo đơn, thông báo mã không còn hiệu lực | Q-D19-01, Q-D04-01 | GIU |  |
| TI-43 | VP-08 | Mã `GIAM50K` (giảm 50.000đ, tối thiểu 100.000đ), tạm tính 180.000đ + phí vận chuyển 30.000đ = 210.000đ → tổng mới 160.000đ | Q-D20-01 | GIU |  |
| TI-44 | VP-08 | Đổi địa chỉ giao hàng sau khi áp mã → phí vận chuyển được tính lại đúng theo địa chỉ mới | Q-D20-01 | NGOAI_PHAM_VI | Kết quả cần kiểm là cách tính phí vận chuyển, thuộc tính năng Vận chuyển |
| TI-45 | VP-04 | Nhập sai 6 mã liên tiếp (`SAI001` đến `SAI006`) rồi nhập `GIAM20K` → không bị khóa, `GIAM20K` áp được, tổng mới 260.000đ | Q-D21-01 | GIU |  |
| TI-46 | VP-04 | Nhập sai 3 mã liên tiếp rồi nhập `GIAM20K` → không bị khóa, áp được | Q-D21-01 | BO_TRUNG | Trùng TI-45: cùng lớp tương đương nhập sai nhiều lần liên tiếp khi không có giới hạn, cùng kết quả không bị khóa và áp được |
| TI-47 | VP-06 | Mạng chậm (Slow 3G), bấm Áp dụng → hiển thị spinner, nút Áp dụng bị vô hiệu hóa đến khi có phản hồi | Q-D22-01 | GIU |  |
| TI-48 | VP-06 | Bấm đúp nhanh nút Áp dụng → chỉ 1 yêu cầu kiểm tra mã được gửi, giảm 20.000đ đúng 1 lần | Q-D22-01 | GIU |  |
| TI-49 | VP-08 | Đặt hàng thành công với `GIAM20K` → mã và số tiền giảm 20.000đ hiển thị ở Chi tiết đơn hàng, Lịch sử đơn hàng và email xác nhận | Q-D23-01 | GIU |  |
| TI-50 | VP-08 | Đặt hàng thành công → email xác nhận đến hộp thư khách trong vòng 5 phút | Q-D23-01 | NGOAI_PHAM_VI | Kết quả cần kiểm là thời gian gửi email, thuộc tính năng Email/Thông báo đơn hàng; Q-D23-01 chỉ xác nhận nội dung mã và tiền giảm trong email |
| TI-51 | VP-08 | Áp `GIAM20K` thành công → số tiền giảm 20.000 và tổng mới 260.000 hiển thị bằng đơn vị VND, không có lựa chọn ngoại tệ | Q-X01-01 | GIU |  |
| TI-52 | VP-08 | Chọn địa chỉ giao hàng tại Nhật Bản ở trang Thanh toán → không chọn được | Q-X01-01 | NGOAI_PHAM_VI | Kết quả cần kiểm là danh sách địa chỉ giao hàng, thuộc tính năng Địa chỉ/Vận chuyển |
| TI-53 | VP-07 | Chỉ dùng bàn phím: Tab tới ô Mã giảm giá, nhập `GIAM20K`, Tab tới nút Áp dụng, bấm Enter → áp được: cần BA xác nhận | VP-07 | GIU |  |
| TI-54 | VP-07 | Bật trình đọc màn hình, áp mã `KHONGCO99` → trình đọc đọc được nhãn ô nhập, nút Áp dụng và thông báo lỗi: cần BA xác nhận | VP-07 | GIU |  |

## Thống kê

| Viewpoint | Số idea | GIU | BO_TRUNG | NGOAI_PHAM_VI |
|---|---|---|---|---|
| VP-01 Happy Path | 3 | 3 | 0 | 0 |
| VP-02 Negative | 10 | 9 | 1 | 0 |
| VP-03 Boundary | 15 | 14 | 1 | 0 |
| VP-04 Security | 5 | 4 | 1 | 0 |
| VP-05 UX/Usability | 2 | 2 | 0 | 0 |
| VP-06 Performance | 2 | 2 | 0 | 0 |
| VP-07 Accessibility | 2 | 2 | 0 | 0 |
| VP-08 Integration | 15 | 11 | 0 | 4 |
| Tổng | 54 | 47 | 3 | 4 |

## Kiểm tra điều kiện đủ

### Mỗi BR có ít nhất 1 idea Happy và 1 idea Negative

| BR-ID | Idea Happy (áp được / hiển thị đúng) | Idea Negative (bị chặn / báo lỗi) |
|---|---|---|
| BR-01 | TI-01, TI-02 | TI-04 |
| BR-02 | TI-07, TI-08 | TI-06, TI-40 |
| BR-03 | TI-11, TI-12 | TI-13 |
| BR-04 | TI-01 | TI-06, TI-15 |
| BR-05 | TI-01 | TI-13, TI-15, TI-25, TI-31 |

Ghi chú: TI-01 là idea Happy của BR-05 theo nghĩa mã hợp lệ thì không hiển thị thông báo lỗi. TI-06 và TI-15 là idea Negative của BR-04: áp không thành công thì không hiển thị số tiền giảm, tổng giữ nguyên.

### Mỗi câu hỏi đã xác nhận có ít nhất 1 idea (28/28)

| Q-ID | Idea |
|---|---|
| Q-D01-01 | TI-03, TI-04 |
| Q-D02-01 | TI-02, TI-05 |
| Q-D03-01 | TI-06, TI-07, TI-09 |
| Q-D03-02 | TI-07, TI-08, TI-10 |
| Q-D04-01 | TI-12, TI-13, TI-42 |
| Q-D04-02 | TI-14 |
| Q-D05-01 | TI-16 |
| Q-D06-01 | TI-17 |
| Q-D07-01 | TI-18 |
| Q-D08-01 | TI-19 |
| Q-D09-01 | TI-20 |
| Q-D09-02 | TI-20, TI-21 |
| Q-D10-01 | TI-22, TI-23 |
| Q-D10-02 | TI-24 |
| Q-D11-01 | TI-26, TI-27, TI-28 |
| Q-D12-01 | TI-29, TI-30 |
| Q-D13-01 | TI-06, TI-13, TI-15, TI-16, TI-25, TI-31 |
| Q-D14-01 | TI-33, TI-34, TI-35 |
| Q-D15-01 | TI-37, TI-38, TI-39 |
| Q-D16-01 | TI-40 |
| Q-D17-01 | TI-32 |
| Q-D18-01 | TI-35, TI-36 |
| Q-D19-01 | TI-41, TI-42 |
| Q-D20-01 | TI-01, TI-29, TI-30, TI-43, TI-44 |
| Q-D21-01 | TI-45, TI-46 |
| Q-D22-01 | TI-47, TI-48 |
| Q-D23-01 | TI-49, TI-50 |
| Q-X01-01 | TI-51, TI-52 |

### Mỗi viewpoint có ít nhất 1 idea

Đủ 8/8 viewpoint (xem bảng Thống kê). VP-07 Accessibility chưa có D-code và chưa có câu trả lời xác nhận nên 2 idea có Nguồn `VP-07`, kết quả ghi `cần BA xác nhận`.

Tổng 54 idea (yêu cầu tối thiểu 20).

### Idea GIU chưa có kết quả xác nhận

Các idea GIU có kết quả `cần BA xác nhận` không viết được test case, chuyển sang mục "Idea chưa viết được" trong `OUTPUT/test_cases.md`: TI-03, TI-05, TI-21, TI-28, TI-35, TI-53, TI-54, TI-36.
TI-36 có kết quả xác nhận (Q-D18-01) nhưng điều kiện đầu vào xung đột với Q-D14-01, xem chi tiết trong `OUTPUT/test_cases.md`.
