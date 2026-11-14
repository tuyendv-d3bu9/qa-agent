# Test Idea — Function D

Nguồn: `INPUT/Spec Function D.md` (BR-01..BR-05 theo thứ tự gạch đầu dòng "Các quy tắc đã nêu"), câu trả lời RESOLVED trong `gate_status.json` (36 Q-ID, tổng hợp ở `OUTPUT/project_knowledge.md` mục 1), `OUTPUT/viewpoints.md`. Idea chạm mâu thuẫn còn mở M01–M07 (`OUTPUT/project_knowledge.md` mục 2) có kết quả "cần BA xác nhận". Giá trị chưa có trong nguồn gắn `[CAN_DU_LIEU]`. Cột Lọc là nhãn AI đề xuất, người duyệt quyết định.

| TI-ID | Viewpoint | Test idea | Nguồn | Lọc | Lý do |
|---|---|---|---|---|---|
| TI-01 | VP-01 | Mã giảm cố định hợp lệ, còn hạn, tổng đơn gồm phí ship đạt tối thiểu, giá trị mã nhỏ hơn tạm tính [CAN_DU_LIEU: mã cố định, giá trị mã, giá trị tối thiểu, giỏ hàng] → áp thành công, hiển thị số tiền được giảm bằng giá trị mã và tổng tiền mới bằng tổng đơn gồm ship trừ tiền giảm, không hiện thông báo lỗi | BR-01, BR-04, BR-05, Q-D20-01 | GIU | Happy cho BR-01, BR-04, BR-05 |
| TI-02 | VP-01 | Mã % hợp lệ trên đơn đủ điều kiện [CAN_DU_LIEU: mã %, tỷ lệ, trần, giỏ hàng] → áp thành công, hiển thị số tiền được giảm và tổng tiền mới; số tiền giảm cụ thể (tính % trên tạm tính hay trên tổng gồm ship) cần BA xác nhận | BR-01, BR-04, Q-D02-01 | GIU | Cần BA xác nhận: M04 |
| TI-03 | VP-01 | Nhập mã Freeship hợp lệ vào ô "Mã giảm giá" trên hóa đơn quanh mức 200.000đ [CAN_DU_LIEU: mã Freeship] → ô chấp nhận mã Freeship; điều kiện "từ 200.000đ" tính trên tạm tính hay tổng gồm ship, có là >= không, có bị ghi đè bởi tối thiểu riêng của mã không: cần BA xác nhận | Q-D01-01 | GIU | Cần BA xác nhận: M03 |
| TI-04 | VP-02 | Nhập mã không tồn tại [CAN_DU_LIEU: chuỗi mã không có trong hệ thống] → không áp được, báo lỗi nguyên nhân "Mã không tồn tại" | BR-05, Q-D13-01 | GIU | Negative cho BR-05 |
| TI-05 | VP-02 | Mã đã hết tổng lượt dùng toàn hệ thống [CAN_DU_LIEU: mã đã dùng hết lượt] → không áp được, báo lỗi nguyên nhân "Hết lượt dùng" | Q-D05-01, Q-D13-01 | GIU | |
| TI-06 | VP-02 | Đã áp mã A, nhập tiếp mã B hợp lệ [CAN_DU_LIEU: 2 mã hợp lệ] → mã B tự động ghi đè mã A, đơn chỉ còn 1 mã, tiền giảm và tổng tiền theo mã B | Q-D09-01, Q-D09-02 | GIU | |
| TI-07 | VP-02 | Nhập mã hợp lệ bằng chữ thường hoặc lẫn hoa/thường → hệ thống chuyển thành chữ in hoa và áp thành công | Q-D10-01 | GIU | |
| TI-08 | VP-02 | Nhập mã hợp lệ có khoảng trắng thừa ở đầu và cuối → hệ thống cắt khoảng trắng và áp thành công | Q-D10-02 | GIU | |
| TI-09 | VP-02 | Giỏ có sản phẩm thuộc nhiều danh mục, áp mã hợp lệ → mã áp cho toàn bộ sản phẩm trong giỏ hay tồn tại mã giới hạn phạm vi: cần BA xác nhận | Q-D08-01 | GIU | Cần BA xác nhận: M05 |
| TI-10 | VP-02 | Mã giới hạn phạm vi, giỏ có cả sản phẩm thuộc và không thuộc phạm vi → theo Q-D08-02 không cho áp mã, nhưng mâu thuẫn với Q-D08-01: cần BA xác nhận | Q-D08-02 | GIU | Cần BA xác nhận: M05 |
| TI-11 | VP-02 | Mã % hợp lệ nhưng tổng đơn gồm ship dưới mức tối thiểu của mã [CAN_DU_LIEU] → không áp được, báo lỗi nguyên nhân "Chưa đủ đơn tối thiểu" | BR-01, BR-02, Q-D13-01 | GIU | Negative cho BR-01 |
| TI-12 | VP-02 | Áp mã thất bại (mã không tồn tại) → không hiển thị số tiền được giảm và tổng tiền mới, chỉ hiển thị thông báo lỗi | BR-04, BR-05 | GIU | Negative cho BR-04 |
| TI-13 | VP-02 | Nhập mã đã hết hạn → báo lỗi | BR-05 | BO_TRUNG | Trùng TI-18 |
| TI-14 | VP-03 | Tổng đơn gồm ship đúng bằng giá trị tối thiểu của mã [CAN_DU_LIEU: giá trị tối thiểu] → áp được | BR-02, Q-D03-02 | GIU | Happy cho BR-02, BA xác nhận >= |
| TI-15 | VP-03 | Tổng đơn gồm ship thấp hơn giá trị tối thiểu của mã 1đ [CAN_DU_LIEU: giá trị tối thiểu] → không áp được, báo lỗi "Chưa đủ đơn tối thiểu" | BR-02, Q-D03-02, Q-D13-01 | GIU | Negative cho BR-02 |
| TI-16 | VP-03 | Tạm tính dưới mức tối thiểu nhưng tạm tính cộng phí ship đạt mức tối thiểu [CAN_DU_LIEU] → áp được | Q-D03-01 | GIU | Tối thiểu so trên tổng gồm ship |
| TI-17 | VP-03 | Áp mã lúc 23:59:59 ngày hết hạn theo giờ Việt Nam (GMT+7) [CAN_DU_LIEU: mã có ngày hết hạn xác định] → áp được | BR-03, Q-D04-01 | GIU | Happy cho BR-03 |
| TI-18 | VP-03 | Áp mã lúc 00:00:00 ngày kế tiếp sau ngày hết hạn (GMT+7) → không áp được, báo lỗi nguyên nhân "Hết hạn" | BR-03, BR-05, Q-D04-01, Q-D13-01 | GIU | Negative cho BR-03 |
| TI-19 | VP-03 | Máy khách đặt múi giờ khác GMT+7, thời điểm đã sang ngày sau theo giờ máy nhưng vẫn trong ngày hết hạn theo GMT+7 → áp được vì hạn mã kiểm theo GMT+7, không theo múi giờ Nhật Bản hay giờ máy | Q-D04-02, Q-X01-02 | GIU | |
| TI-20 | VP-03 | Mã % có tiền giảm tính ra lớn hơn trần giảm tối đa cấu hình của mã [CAN_DU_LIEU: tỷ lệ, trần] → tiền giảm bằng đúng trần | Q-D02-01 | GIU | |
| TI-21 | VP-03 | Mã % có tiền giảm tính ra với phần lẻ dưới 500đ [CAN_DU_LIEU] → tiền giảm làm tròn xuống hàng nghìn | Q-D11-01 | GIU | Làm tròn số học đến 1.000đ |
| TI-22 | VP-03 | Mã % có tiền giảm tính ra với phần lẻ từ 500đ trở lên [CAN_DU_LIEU] → tiền giảm làm tròn lên hàng nghìn | Q-D11-01 | GIU | Làm tròn số học đến 1.000đ |
| TI-23 | VP-03 | Mã cố định có giá trị lớn hơn tạm tính [CAN_DU_LIEU] → tiền hàng sau giảm về 0đ; phần giá trị mã còn dư có trừ tiếp vào phí ship không: cần BA xác nhận | Q-D12-01, Q-D20-01 | GIU | Cần BA xác nhận: M01 |
| TI-24 | VP-03 | Mã cố định có giá trị đúng bằng tạm tính [CAN_DU_LIEU] → tiền hàng sau giảm 0đ, tổng tiền mới bằng phí ship, không âm | Q-D12-01, Q-D20-01 | GIU | Không có phần dư nên không chạm M01 |
| TI-25 | VP-04 | Tài khoản đã đặt hàng thành công với mã X, áp lại mã X ở đơn mới → không áp được | Q-D06-01 | GIU | |
| TI-26 | VP-04 | Mã còn 1 lượt, 2 khách cùng áp và cùng bấm Đặt hàng → theo Q-D18-01 đơn ghi nhận trước tại máy chủ thành công, đơn sau báo lỗi hết lượt, nhưng mâu thuẫn với tạm giữ lượt khi Áp dụng: cần BA xác nhận | Q-D18-01, Q-D14-01 | GIU | Cần BA xác nhận: M02 |
| TI-27 | VP-04 | Nhập mã sai liên tục nhiều lần [CAN_DU_LIEU: số lần thử] → không bị khóa hay giới hạn, vẫn nhập và áp được mã đúng sau đó | Q-D21-01 | GIU | Rủi ro lạm dụng ghi ở M06 |
| TI-28 | VP-04 | Sửa request Áp dụng/Đặt hàng để gửi số tiền giảm khác giá trị đúng của mã → hệ thống dùng giá trị giao diện gửi lên hay tự tính: cần BA xác nhận | Q-D21-02 | GIU | Cần BA xác nhận: M06 |
| TI-29 | VP-05 | Đã áp mã, bấm nút hoặc biểu tượng gỡ mã → mã bị gỡ, tổng tiền trở về giá trị ban đầu | Q-D17-01 | GIU | |
| TI-30 | VP-05 | Gỡ mã đã áp rồi áp lại chính mã đó → lượt tạm giữ có được nhả không, có bị chặn bởi giới hạn 1 lần/tài khoản không: cần BA xác nhận | Q-D17-01, Q-D14-01, Q-D06-01 | GIU | Cần BA xác nhận: M07 |
| TI-31 | VP-05 | Lần lượt áp mã hết hạn, chưa đủ đơn tối thiểu, hết lượt, không tồn tại → mỗi trường hợp hiện đúng thông báo theo nguyên nhân, ngay dưới ô "Mã giảm giá" | Q-D13-01, Q-D13-02 | GIU | |
| TI-32 | VP-06 | Bấm Áp dụng → hiển thị spinner/loading và nút Áp dụng bị vô hiệu hóa cho đến khi API phản hồi | Q-D22-01 | GIU | |
| TI-33 | VP-06 | Bấm Áp dụng nhiều lần liên tiếp khi đang chờ API → các lần bấm sau không có tác dụng do nút đang bị vô hiệu hóa | Q-D22-01 | GIU | |
| TI-34 | VP-07 | Chỉ dùng bàn phím: Tab tới ô "Mã giảm giá", nhập mã hợp lệ, Tab tới nút Áp dụng và nhấn Enter → áp thành công, hiển thị số tiền được giảm và tổng tiền mới | VP-07, BR-04 | GIU | Viewpoint chưa có nguồn riêng |
| TI-35 | VP-08 | Khách vãng lai chưa đăng nhập ở trang Thanh toán → không được nhập và áp dụng mã | Q-D07-01 | GIU | |
| TI-36 | VP-08 | Áp mã thành công nhưng chưa Đặt hàng → lượt được tạm giữ, chỉ trừ chính thức khi Đặt hàng thành công; thời điểm giữ lượt mâu thuẫn với Q-D18-01: cần BA xác nhận | Q-D14-01 | GIU | Cần BA xác nhận: M02 |
| TI-37 | VP-08 | Đơn đã đặt có mã bị hủy → lượt dùng mã được tự động hoàn lại | Q-D15-01 | GIU | |
| TI-38 | VP-08 | Đơn có mã thanh toán bằng thẻ thất bại → lượt dùng mã được hoàn lại, khách áp lại được mã | Q-D15-01, Q-D15-02 | GIU | |
| TI-39 | VP-08 | Đơn có mã thanh toán bằng Ví ShopGo thất bại → lượt dùng mã được hoàn lại, khách áp lại được mã | Q-D15-02 | GIU | |
| TI-40 | VP-08 | Đã áp mã, giảm số lượng trong giỏ khiến đơn dưới mức tối thiểu → tự động hủy áp dụng mã và thông báo đơn không còn đủ điều kiện hưởng ưu đãi | Q-D16-01 | GIU | |
| TI-41 | VP-08 | Đã áp mã %, đổi số lượng trong giỏ mà đơn vẫn đạt mức tối thiểu → tiền giảm tự tính lại theo giỏ mới | Q-D16-02 | GIU | |
| TI-42 | VP-08 | Đã áp mã, phiên đăng nhập hết hạn rồi đăng nhập lại → mã bị mất, khách phải áp lại | Q-D16-03 | GIU | |
| TI-43 | VP-08 | Sau khi mất mã do hết phiên, áp lại chính mã đó → lượt tạm giữ có được nhả không, có bị chặn bởi giới hạn 1 lần/tài khoản hoặc hết tổng lượt không: cần BA xác nhận | Q-D16-03, Q-D14-01, Q-D06-01, Q-D05-01 | GIU | Cần BA xác nhận: M07 |
| TI-44 | VP-08 | Mã A bị mã B ghi đè, hoặc bị tự hủy do đơn dưới ngưỡng → lượt tạm giữ của mã A có được nhả không: cần BA xác nhận | Q-D09-02, Q-D16-01, Q-D14-01 | GIU | Cần BA xác nhận: M07 |
| TI-45 | VP-08 | Đã áp mã, mã hết hạn trước khi bấm Đặt hàng → từ chối tạo đơn, thông báo mã không còn hiệu lực | Q-D19-01 | GIU | |
| TI-46 | VP-08 | Đã áp mã, Admin vô hiệu hóa mã trước khi khách bấm Đặt hàng → từ chối tạo đơn, thông báo mã không còn hiệu lực | Q-D19-01 | GIU | |
| TI-47 | VP-08 | Đã áp mã, đổi địa chỉ giao làm phí ship thay đổi → mã được kiểm tra lại và tiền giảm, tổng tiền được tính lại | Q-D20-02 | GIU | |
| TI-48 | VP-08 | Đặt hàng thành công có mã → mã và số tiền được giảm hiển thị trong chi tiết đơn, lịch sử đơn và email xác nhận | Q-D23-01 | GIU | |
| TI-49 | VP-08 | Áp mã thành công → số tiền được giảm và tổng tiền mới hiển thị bằng VNĐ, không có tùy chọn ngoại tệ | Q-X01-01 | GIU | Chỉ phục vụ Việt Nam, VNĐ |
| TI-50 | VP-08 | Đơn không áp mã, chọn lần lượt COD, Thẻ, Ví ShopGo → đặt hàng được với từng phương thức | VP-08 | NGOAI_PHAM_VI | Luồng chọn phương thức thanh toán, không liên quan tới mã |
| TI-51 | VP-08 | Đơn không áp mã, đổi địa chỉ giao → phí ship được tính lại theo đơn vị vận chuyển | VP-08 | NGOAI_PHAM_VI | Luồng tính phí ship, không liên quan tới mã |

## Thống kê

| Viewpoint | Số idea | GIU | BO_TRUNG | NGOAI_PHAM_VI |
|---|---|---|---|---|
| VP-01 | 3 | 3 | 0 | 0 |
| VP-02 | 10 | 9 | 1 | 0 |
| VP-03 | 11 | 11 | 0 | 0 |
| VP-04 | 4 | 4 | 0 | 0 |
| VP-05 | 3 | 3 | 0 | 0 |
| VP-06 | 2 | 2 | 0 | 0 |
| VP-07 | 1 | 1 | 0 | 0 |
| VP-08 | 17 | 15 | 0 | 2 |
| Tổng | 51 | 48 | 1 | 2 |

Idea cần BA xác nhận (11): TI-02 (M04), TI-03 (M03), TI-09 (M05), TI-10 (M05), TI-23 (M01), TI-26 (M02), TI-28 (M06), TI-30 (M07), TI-36 (M02), TI-43 (M07), TI-44 (M07).

DỪNG: chờ người duyệt cột Lọc trước khi viết test case.
