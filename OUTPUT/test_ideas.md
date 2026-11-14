# Test Idea — Function D

| TI-ID | Viewpoint | Test idea | Nguồn | Lọc | Lý do |
|---|---|---|---|---|---|
| TI-01 | VP-01 | Mã giảm % hợp lệ [CAN_DU_LIEU: mã %, tỷ lệ, trần], tổng đơn đạt tối thiểu, tiền giảm theo % chưa vượt trần → áp được, tiền giảm tính theo tỷ lệ % của mã | BR-01 | GIU | Happy của BR-01, loại mã % |
| TI-02 | VP-01 | Mã giảm cố định hợp lệ [CAN_DU_LIEU: mã cố định, mệnh giá], tổng đơn đạt tối thiểu, mệnh giá nhỏ hơn tiền hàng → áp được, tiền giảm bằng đúng mệnh giá | BR-01 | GIU | Happy của BR-01, loại mã cố định |
| TI-03 | VP-01 | Tổng đơn lớn hơn mức tối thiểu của mã [CAN_DU_LIEU: mã có mức tối thiểu, giỏ hàng vượt mức] → áp được | BR-02 | GIU | Happy của BR-02 |
| TI-04 | VP-01 | Mã chưa tới ngày hết hạn [CAN_DU_LIEU: mã còn hạn] → áp được | BR-03 | GIU | Happy của BR-03 |
| TI-05 | VP-01 | Áp mã thành công → hiển thị số tiền được giảm và tổng tiền mới | BR-04 | GIU | Happy của BR-04 |
| TI-06 | VP-01 | Đang hiển thị thông báo lỗi của mã sai, nhập lại mã hợp lệ [CAN_DU_LIEU] và bấm Áp dụng → áp được, không còn thông báo lỗi | BR-05 | GIU | Happy của BR-05 |
| TI-07 | VP-01 | Mã Freeship [CAN_DU_LIEU: mã Freeship], hóa đơn trên 200.000đ → áp được, phí vận chuyển được miễn hoặc giảm theo mã | Q-D01-01 | GIU | BA xác nhận có mã Freeship, mặc định cho hóa đơn từ 200.000đ |
| TI-08 | VP-02 | Mã giảm cố định hợp lệ nhưng tổng đơn chưa đạt tối thiểu của mã [CAN_DU_LIEU] → không áp được | BR-01 | GIU | Negative của BR-01: điều kiện tối thiểu áp cả cho loại cố định |
| TI-09 | VP-02 | Mã giảm % hợp lệ nhưng tổng đơn chưa đạt tối thiểu của mã [CAN_DU_LIEU] → không áp được | BR-02 | GIU | Negative của BR-02 |
| TI-10 | VP-02 | Mã đã qua ngày hết hạn [CAN_DU_LIEU: mã hết hạn] → không áp được, hiển thị thông báo lỗi | BR-03 | GIU | Negative của BR-03 |
| TI-11 | VP-02 | Bấm Áp dụng với mã không áp được → không hiển thị số tiền được giảm, tổng tiền giữ nguyên | BR-04 | GIU | Negative của BR-04 |
| TI-12 | VP-02 | Mã không tồn tại trong hệ thống [CAN_DU_LIEU: chuỗi mã chưa được tạo] → hiển thị thông báo lỗi | BR-05 | GIU | Negative của BR-05, nhánh "không hợp lệ" |
| TI-13 | VP-02 | Mã đã hết hạn → hiển thị thông báo lỗi | BR-05 | BO_TRUNG | Trùng TI-10: cùng điều kiện mã hết hạn, cùng kết quả báo lỗi |
| TI-14 | VP-02 | Mã còn hạn nhưng đã hết tổng lượt dùng toàn hệ thống [CAN_DU_LIEU: mã đã dùng hết lượt] → từ chối, báo mã đã hết lượt sử dụng | Q-D05-01 | GIU | BA xác nhận có giới hạn tổng lượt |
| TI-15 | VP-02 | Giỏ có sản phẩm thuộc nhiều danh mục khác nhau [CAN_DU_LIEU] → mã áp cho toàn bộ giỏ, không sản phẩm nào bị loại khỏi phần được giảm | Q-D08-01 | GIU | BA xác nhận áp cho toàn bộ sản phẩm trong giỏ |
| TI-16 | VP-02 | Mở trang Thanh toán ở 2 tab, tab 1 áp mã A, tab 2 áp mã B, rồi bấm Đặt hàng → đơn chỉ có 1 mã, tiền giảm không cộng dồn | Q-D09-01 | GIU | BA xác nhận tối đa 1 mã mỗi đơn |
| TI-17 | VP-02 | Đã áp mã A, nhập mã B hợp lệ và bấm Áp dụng → mã B thay mã A, tiền giảm và tổng tiền tính lại theo mã B | Q-D09-02 | GIU | BA xác nhận tự động ghi đè nếu mã mới hợp lệ |
| TI-18 | VP-02 | Đã áp mã A, nhập mã B không hợp lệ và bấm Áp dụng → báo lỗi cho mã B, mã A vẫn được giữ | Q-D09-02 | GIU | Kết quả "giữ mã A" suy ra từ điều kiện "nếu mã mới hợp lệ", cần người xác nhận |
| TI-19 | VP-02 | Nhập mã hợp lệ bằng chữ thường hoặc hoa/thường lẫn lộn [CAN_DU_LIEU] → hệ thống chuyển thành chữ in hoa, áp được | Q-D10-01 | GIU | BA xác nhận không phân biệt hoa/thường |
| TI-20 | VP-02 | Nhập hoặc dán mã hợp lệ có khoảng trắng ở đầu và cuối → hệ thống tự cắt khoảng trắng, áp được | Q-D10-02 | GIU | BA xác nhận auto-trim |
| TI-21 | VP-03 | Tổng đơn (gồm phí vận chuyển) đúng bằng mức tối thiểu của mã [CAN_DU_LIEU] → áp được | Q-D03-02 | GIU | BA xác nhận đạt tối thiểu là lớn hơn hoặc bằng |
| TI-22 | VP-03 | Tổng đơn (gồm phí vận chuyển) thấp hơn mức tối thiểu của mã đúng 1đ [CAN_DU_LIEU] → không áp được | BR-02 | GIU | Biên dưới của BR-02 |
| TI-23 | VP-03 | Tiền hàng dưới mức tối thiểu của mã nhưng tiền hàng cộng phí vận chuyển đạt mức tối thiểu [CAN_DU_LIEU] → áp được | Q-D03-01 | GIU | BA xác nhận so sánh trên tổng tiền đơn đã gồm phí vận chuyển |
| TI-24 | VP-03 | Mã giảm % có trần [CAN_DU_LIEU: tỷ lệ, trần], tiền giảm tính theo % vượt trần → tiền giảm bằng trần | Q-D02-01 | GIU | BA xác nhận có trần giảm cấu hình theo từng mã |
| TI-25 | VP-03 | Mã giảm % có trần, tiền giảm tính theo % đúng bằng trần [CAN_DU_LIEU] → tiền giảm bằng trần | Q-D02-01 | GIU | Biên của trần giảm, điều kiện khác TI-24 |
| TI-26 | VP-03 | Áp mã lúc 23:59:59 (GMT+7) của ngày hết hạn → áp được | Q-D04-01 | GIU | BA xác nhận hiệu lực đến 23:59:59 ngày hết hạn |
| TI-27 | VP-03 | Áp mã lúc 00:00:00 (GMT+7) của ngày kế tiếp ngày hết hạn → từ chối, báo mã đã hết hạn | Q-D04-01 | GIU | Biên ngay sau mốc hết hạn |
| TI-28 | VP-03 | Thiết bị đặt múi giờ khác GMT+7, áp mã tại thời điểm đã qua 23:59:59 ngày hết hạn theo GMT+7 nhưng chưa qua theo giờ thiết bị → từ chối, báo mã đã hết hạn | Q-D04-02 | GIU | BA xác nhận kiểm tra theo GMT+7 |
| TI-29 | VP-03 | Tiền giảm % tính ra có phần lẻ dưới hàng nghìn đúng 500đ [CAN_DU_LIEU: tổ hợp tổng đơn và tỷ lệ] → làm tròn lên hàng nghìn kế tiếp | Q-D11-01 | GIU | BA xác nhận làm tròn số học đến 1.000đ |
| TI-30 | VP-03 | Tiền giảm % tính ra có phần lẻ dưới hàng nghìn là 499đ [CAN_DU_LIEU: tổ hợp tổng đơn và tỷ lệ] → làm tròn xuống hàng nghìn | Q-D11-01 | GIU | Biên dưới của làm tròn số học |
| TI-31 | VP-03 | Mã giảm cố định có mệnh giá lớn hơn tạm tính tiền hàng [CAN_DU_LIEU], đơn đạt tối thiểu → tiền giảm bằng tạm tính, tiền hàng sau giảm là 0đ, không âm | Q-D12-01 | GIU | BA xác nhận tiền giảm tối đa bằng tạm tính; cần người xem chỗ khác với Q-D20-01 |
| TI-32 | VP-03 | Mã Freeship, hóa đơn đúng 200.000đ → áp được | Q-D01-01 | GIU | Biên "từ 200.000đ" của mã Freeship |
| TI-33 | VP-03 | Mã Freeship, hóa đơn 199.999đ → không áp được | Q-D01-01 | GIU | Biên dưới 200.000đ của mã Freeship |
| TI-34 | VP-04 | Tài khoản đã dùng mã thành công ở đơn trước, nhập lại mã đó và bấm Áp dụng → từ chối, báo lỗi | Q-D06-01 | GIU | BA xác nhận tối đa 1 lần mỗi tài khoản |
| TI-35 | VP-04 | Mã còn 1 lượt, 2 tài khoản cùng bấm Đặt hàng cùng thời điểm → đơn ghi nhận trước tại máy chủ thành công với mã, đơn sau báo mã đã hết lượt | Q-D18-01 | GIU | BA xác nhận xử lý tuần tự theo thời điểm ghi nhận |
| TI-36 | VP-04 | Nhập sai mã nhiều lần liên tiếp rồi nhập mã hợp lệ → không bị khóa nhập mã, mã hợp lệ áp được | Q-D21-01 | GIU | BA xác nhận không giới hạn số lần nhập sai |
| TI-37 | VP-05 | Lần lượt áp mã không tồn tại, mã hết hạn, mã với đơn chưa đạt tối thiểu, mã hết lượt → 4 thông báo lỗi khác nhau theo đúng nguyên nhân | Q-D13-01 | GIU | BA xác nhận tách thông báo theo nguyên nhân |
| TI-38 | VP-05 | Áp mã thành công rồi bấm nút gỡ mã → mã bị gỡ khỏi đơn, tổng tiền tính lại về ban đầu | Q-D17-01 | GIU | BA xác nhận có nút gỡ mã |
| TI-39 | VP-06 | Bấm Áp dụng → hiển thị loading, nút Áp dụng bị vô hiệu hóa cho đến khi có phản hồi | Q-D22-01 | GIU | BA xác nhận có loading và vô hiệu hóa nút |
| TI-40 | VP-06 | Bấm đúp liên tục vào nút Áp dụng → chỉ 1 yêu cầu kiểm tra mã được gửi | Q-D22-01 | GIU | Điều kiện bấm đúp khác TI-39 |
| TI-41 | VP-07 | Chỉ dùng bàn phím: Tab tới ô Mã giảm giá, nhập mã, Tab tới nút Áp dụng, nhấn Enter → áp được | VP-07 | GIU | Viewpoint chưa có nguồn nào; chưa có Expected trong INPUT/ hay gate |
| TI-42 | VP-07 | Dùng trình đọc màn hình → đọc được nhãn ô Mã giảm giá, nút Áp dụng và nội dung thông báo lỗi | VP-07 | GIU | Viewpoint chưa có nguồn nào; chưa có Expected trong INPUT/ hay gate |
| TI-43 | VP-08 | Khách vãng lai chưa đăng nhập → không nhập và áp được mã | Q-D07-01 | GIU | BA xác nhận bắt buộc đăng nhập trước khi áp mã |
| TI-44 | VP-08 | Áp mã thành công → 1 lượt dùng của mã được tạm giữ cho phiên thanh toán đó | Q-D14-01 | GIU | BA xác nhận tạm giữ khi Áp dụng; cần người xem chỗ khác với Q-D18-01 |
| TI-45 | VP-08 | Đặt hàng thành công với mã → lượt dùng được trừ chính thức | Q-D14-01 | GIU | Kết quả kiểm là lượt dùng của mã, dù xảy ra lúc Đặt hàng |
| TI-46 | VP-08 | Đơn có mã bị hủy → lượt dùng được hoàn cho tài khoản và cộng lại vào tổng lượt của mã | Q-D15-01 | GIU | Kết quả kiểm là lượt dùng của mã, dù kích hoạt bởi Hủy đơn |
| TI-47 | VP-08 | Đơn có mã thanh toán thẻ thất bại → lượt dùng được hoàn cho tài khoản | Q-D15-01 | GIU | Kết quả kiểm là lượt dùng của mã, dù kích hoạt bởi Thanh toán |
| TI-48 | VP-08 | Áp mã thành công rồi giảm số lượng trong giỏ làm tổng đơn dưới mức tối thiểu → mã tự bị hủy, tổng tiền tính lại, hiển thị thông báo đơn không còn đủ điều kiện | Q-D16-01 | GIU | BA xác nhận tự hủy mã khi giỏ thay đổi |
| TI-49 | VP-08 | Áp mã thành công, Admin vô hiệu hóa mã trước khi khách bấm Đặt hàng → từ chối tạo đơn, báo mã không còn hiệu lực | Q-D19-01 | GIU | Kết quả kiểm là hiệu lực của mã lúc Đặt hàng |
| TI-50 | VP-08 | Áp mã trước 23:59:59 ngày hết hạn, bấm Đặt hàng sau 00:00:00 ngày kế tiếp → từ chối tạo đơn, báo mã không còn hiệu lực | Q-D19-01 | GIU | Điều kiện mã hết hạn giữa luồng, khác TI-49 |
| TI-51 | VP-08 | Đơn có phí vận chuyển, áp mã giảm cố định [CAN_DU_LIEU] → tổng tiền mới bằng tiền hàng cộng phí vận chuyển trừ tiền giảm | Q-D20-01 | GIU | BA xác nhận giảm trừ vào tổng gồm phí vận chuyển |
| TI-52 | VP-08 | Đặt hàng thành công với mã → chi tiết đơn, lịch sử đơn và email xác nhận hiển thị mã và số tiền được giảm | Q-D23-01 | GIU | Kết quả kiểm là thông tin mã được lưu vết |
| TI-53 | VP-08 | Áp mã thành công → số tiền được giảm và tổng tiền mới hiển thị bằng VND | Q-X01-01 | GIU | BA xác nhận chỉ VND, chỉ Việt Nam |
| TI-54 | VP-08 | Chọn địa chỉ giao hàng tại Nhật Bản ở trang Thanh toán → không chọn được | Q-X01-01 | NGOAI_PHAM_VI | Thuộc tính năng Thanh toán (chọn địa chỉ giao) |
| TI-55 | VP-08 | Khách vãng lai bấm Thanh toán từ giỏ hàng → bị yêu cầu đăng nhập | Q-D07-01 | NGOAI_PHAM_VI | Thuộc tính năng Tài khoản và Thanh toán (luồng đăng nhập) |
| TI-56 | VP-08 | Áp mã Freeship → phí vận chuyển gốc trước khi giảm được tính đúng theo đơn vị vận chuyển | Q-D01-01 | NGOAI_PHAM_VI | Thuộc tính năng Thanh toán (phí ship) |
| TI-57 | VP-08 | Áp mã thành công rồi thanh toán bằng Ví ShopGo → số dư ví bị trừ đúng tổng tiền mới | BR-04 | NGOAI_PHAM_VI | Thuộc tính năng Thanh toán và Ví ShopGo |

## Thống kê

| Viewpoint | Số idea | GIU | BO_TRUNG | NGOAI_PHAM_VI |
|---|---|---|---|---|
| VP-01 | 7 | 7 | 0 | 0 |
| VP-02 | 13 | 12 | 1 | 0 |
| VP-03 | 13 | 13 | 0 | 0 |
| VP-04 | 3 | 3 | 0 | 0 |
| VP-05 | 2 | 2 | 0 | 0 |
| VP-06 | 2 | 2 | 0 | 0 |
| VP-07 | 2 | 2 | 0 | 0 |
| VP-08 | 15 | 11 | 0 | 4 |
| Tổng | 57 | 52 | 1 | 4 |

## Ghi chú

Danh mục BR: đánh số theo thứ tự 5 gạch đầu dòng dưới "Các quy tắc đã nêu" trong `INPUT/Spec Function D.md`, trích nguyên văn:

| BR | Câu gốc trong INPUT |
|---|---|
| BR-01 | "Có 2 loại mã: giảm theo phần trăm (%) và giảm số tiền cố định (VND)." |
| BR-02 | "Mã chỉ dùng được khi đơn hàng đạt giá trị tối thiểu quy định của mã." |
| BR-03 | "Mỗi mã có ngày hết hạn." |
| BR-04 | "Áp dụng thành công → hiển thị số tiền được giảm và tổng tiền mới." |
| BR-05 | "Mã không hợp lệ hoặc hết hạn → hiển thị thông báo lỗi." |

Quy ước đã dùng:
- Idea Happy của một BR ghi ở VP-01, idea Negative ghi ở VP-02. Mỗi idea ghi 1 nguồn chính.
- Idea từ câu hỏi đã xác nhận ghi viewpoint chính của D-code; riêng idea biên (TI-32, TI-33 của D01) ghi VP-03.
- `NGOAI_PHAM_VI`: chỉ gán khi điều cần kiểm là hành vi của tính năng khác (chọn địa chỉ, đăng nhập, phí ship, trừ ví). Idea xảy ra lúc Đặt hàng, Hủy đơn hoặc thanh toán thất bại nhưng điều cần kiểm là lượt dùng, hiệu lực hoặc tiền giảm của mã (TI-35, TI-44 đến TI-47, TI-49, TI-50, TI-52) đề xuất `GIU`.
- Giá trị tiền chỉ lấy từ câu trả lời đã xác nhận (200.000đ của Q-D01-01, bậc 1.000đ của Q-D11-01) hoặc biên suy ra trực tiếp (199.999đ, 1đ, 500đ, 499đ, 0đ). Mã voucher, mức tối thiểu, tỷ lệ %, trần, mệnh giá chưa có trong INPUT/ hay gate nên gắn `[CAN_DU_LIEU]`.

Nhãn ở cột Lọc là đề xuất của AI. Người duyệt cột Lọc trước khi sang bước Test Case.
