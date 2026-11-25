# Test Scenarios: Checkout Function D

Nguồn: `OUTPUT/technique_selection.md`, `knowledge/features/voucher.md` (mục 3, 7, 9), `OUTPUT/coverage_strategy.md`.
Checkout: 1. Giỏ hàng và mã giảm giá, 2. Thông tin giao hàng, 3. Thanh toán, 4. Xác nhận đơn.
Đơn vị biên: tiền 1đ, giờ 1 giây. Ngưỡng do từng mã cấu hình được ghi theo tên ngưỡng, số cụ thể là `[CAN_DU_LIEU]`.

## 1. Giá trị biên

| Field | Partition | Giá trị test | Kết quả mong đợi | Nguồn |
|---|---|---|---|---|
| Tổng đơn (gồm phí ship) so với đơn tối thiểu | Dưới ngưỡng | Tối thiểu - 1đ `[CAN_DU_LIEU]` | Không áp được, báo "Chưa đủ đơn tối thiểu" dưới ô mã | R08, R09, R23, R24 |
| Tổng đơn (gồm phí ship) so với đơn tối thiểu | Đạt ngưỡng | Đúng bằng tối thiểu `[CAN_DU_LIEU]` | Áp được, hiển thị tiền giảm và tổng mới | R09, BR-04 |
| Tổng đơn (gồm phí ship) so với đơn tối thiểu | Đạt ngưỡng | Tối thiểu + 1đ `[CAN_DU_LIEU]` | Áp được | R09 |
| Tổng đơn (gồm phí ship) so với đơn tối thiểu | Không có max | Không áp dụng | Rule chỉ có ngưỡng dưới, không có điểm max, max+1 | BR-02 |
| Tiền giảm mã % so với trần | Dưới trần | Tiền giảm tính ra = Trần - 1.000đ `[CAN_DU_LIEU]` | Giảm đúng số tính ra | R07 |
| Tiền giảm mã % so với trần | Đúng trần | Tiền giảm tính ra = Trần `[CAN_DU_LIEU]` | Giảm bằng trần | R07 |
| Tiền giảm mã % so với trần | Vượt trần | Tiền giảm tính ra = Trần + 1.000đ `[CAN_DU_LIEU]` | Chỉ giảm bằng trần | R07 |
| Làm tròn tiền giảm mã % | Không có phần lẻ | Phần lẻ 0đ | Giữ nguyên | R21 |
| Làm tròn tiền giảm mã % | Làm tròn xuống | Phần lẻ 499đ | Làm tròn xuống hàng nghìn | R21 |
| Làm tròn tiền giảm mã % | Làm tròn lên | Phần lẻ 500đ | Làm tròn lên hàng nghìn | R21 |
| Làm tròn tiền giảm mã % | Làm tròn lên | Phần lẻ 999đ | Làm tròn lên hàng nghìn | R21 |
| Mã cố định so với tạm tính | Nhỏ hơn | Giá trị mã = Tạm tính - 1đ `[CAN_DU_LIEU]` | Giảm đủ giá trị mã, tiền hàng còn 1đ | R22 |
| Mã cố định so với tạm tính | Bằng | Giá trị mã = Tạm tính `[CAN_DU_LIEU]` | Tiền hàng sau giảm về 0đ | R22 |
| Mã cố định so với tạm tính | Lớn hơn | Giá trị mã = Tạm tính + 1đ `[CAN_DU_LIEU]` | Tiền giảm bằng tạm tính, tiền hàng về 0đ. Phần dư 1đ có trừ vào phí ship không: chờ BA chốt M01 | R22, M01 |
| Giờ hết hạn (GMT+7) | Còn hiệu lực | 23:59:58 ngày hết hạn | Áp được | R10, R11 |
| Giờ hết hạn (GMT+7) | Còn hiệu lực | 23:59:59 ngày hết hạn | Áp được | R10, R11 |
| Giờ hết hạn (GMT+7) | Hết hạn | 00:00:00 ngày hôm sau | Không áp được, báo "Hết hạn" | R10, R11, R23 |
| Lượt dùng toàn sàn còn lại | Còn lượt | 1 | Áp được | R12 |
| Lượt dùng toàn sàn còn lại | Hết lượt | 0 | Không áp được, báo "Hết lượt dùng" | R12, R23 |
| Số lần tài khoản đã dùng mã | Chưa dùng | 0 | Áp được | R13 |
| Số lần tài khoản đã dùng mã | Đã dùng | 1 | Bị chặn. Nội dung thông báo chưa có rule | R13 |
| Hóa đơn với mã Freeship | Dưới ngưỡng | 199.999đ | Chờ BA chốt M03 | R06, M03 |
| Hóa đơn với mã Freeship | Đúng ngưỡng | 200.000đ | Chờ BA chốt M03 (toán tử "từ") | R06, M03 |
| Hóa đơn với mã Freeship | Trên ngưỡng | 200.001đ | Chờ BA chốt M03 | R06, M03 |
| Mã giảm giá (chuỗi) | Chữ thường | Mã hợp lệ viết thường `[CAN_DU_LIEU]` | Tự chuyển in hoa, áp như mã gốc | R19 |
| Mã giảm giá (chuỗi) | Khoảng trắng đầu cuối | Mã hợp lệ có khoảng trắng đầu và cuối `[CAN_DU_LIEU]` | Tự cắt khoảng trắng, áp như mã gốc | R20 |
| Mã giảm giá (chuỗi) | Không tồn tại | Chuỗi không trùng mã nào `[CAN_DU_LIEU]` | Báo "Mã không tồn tại" dưới ô mã | R23, R24 |
| Mã giảm giá (chuỗi) | Rỗng, độ dài max, max+1, ký tự đặc biệt | `[CAN_DU_LIEU]` | Chưa có rule về độ dài và định dạng mã | FLD-01 |

## 2. Scenario

| SC-ID | Bước checkout | Nhóm | Scenario | Kỹ thuật | Nguồn | Ưu tiên |
|---|---|---|---|---|---|---|
| SC-01 | 1 | BOUNDARY | Tổng đơn gồm phí ship thấp hơn tối thiểu 1đ, áp mã bị từ chối, báo chưa đủ đơn tối thiểu | BVA | Q-D03-01, Q-D03-02, Q-D13-01 | P1 |
| SC-02 | 1 | BOUNDARY | Tổng đơn gồm phí ship đúng bằng tối thiểu, áp mã thành công | BVA | Q-D03-01, Q-D03-02 | P1 |
| SC-03 | 1 | BOUNDARY | Mã % có tiền giảm tính ra vượt trần, hệ thống chỉ giảm bằng trần | BVA | Q-D02-01 | P1 |
| SC-04 | 1 | BOUNDARY | Mã % ra tiền giảm có phần lẻ 499đ và 500đ, kiểm làm tròn xuống và lên hàng nghìn | BVA | Q-D11-01 | P1 |
| SC-05 | 1 | BOUNDARY | Mã cố định lớn hơn tạm tính 1đ, tiền hàng về 0đ, kiểm phần dư có trừ vào phí ship không | BVA | Q-D12-01, M01 | P1 |
| SC-06 | 1 | BOUNDARY | Áp mã lúc 23:59:59 ngày hết hạn được, áp lúc 00:00:00 hôm sau bị từ chối, giờ theo GMT+7 | BVA | Q-D04-01, Q-D04-02 | P1 |
| SC-07 | 1 | BOUNDARY | Tài khoản đã đặt hàng thành công bằng mã, áp lại chính mã đó lần thứ 2 thì bị chặn | BVA | Q-D06-01 | P1 |
| SC-08 | 2 | BOUNDARY | Tổng đơn đang đúng bằng tối thiểu, đổi địa chỉ giao làm phí ship giảm, tổng đơn tụt dưới tối thiểu, mã được kiểm tra lại | BVA | Q-D20-02, Q-D03-01 | P1 |
| SC-09 | 1 | BOUNDARY | Mã Freeship với hóa đơn 199.999đ, 200.000đ, 200.001đ | BVA | Q-D01-01, M03 | P2 |
| SC-10 | 1 | VALIDATION | Giỏ lẫn sản phẩm thuộc và không thuộc phạm vi mã, hệ thống không cho áp mã | EP | Q-D08-02, M05 | P1 |
| SC-11 | 1 | VALIDATION | Sửa số tiền giảm trong request gửi lên máy chủ, kiểm hệ thống có chặn không | EP | Q-D21-02, M06 | P1 |
| SC-12 | 1 | VALIDATION | Đã áp mã A, nhập mã B hợp lệ thì mã B thay mã A; nhập mã B không hợp lệ thì báo lỗi | DT | Q-D09-01, Q-D09-02, Q-D13-01 | P1 |
| SC-13 | 1 | VALIDATION | Nhập mã viết thường, có khoảng trắng đầu và cuối, hệ thống tự chuẩn hóa và áp được | EP | Q-D10-01, Q-D10-02 | P2 |
| SC-14 | 1 | VALIDATION | Nhập chuỗi không trùng mã nào, báo mã không tồn tại ngay dưới ô mã | EP | Q-D13-01, Q-D13-02 | P2 |
| SC-15 | 1 | VALIDATION | Khách vãng lai chưa đăng nhập nhập mã, hệ thống không cho áp | EP | Q-D07-01 | P2 |
| SC-16 | 1 | NEGATIVE | Mã còn 1 lượt, khách khác vừa dùng lượt cuối đúng lúc khách này bấm Áp dụng, báo hết lượt dùng | ST | Q-D05-01, Q-D13-01, Q-D14-01, M02 | P1 |
| SC-17 | 1 | NEGATIVE | Mất mạng ngay sau khi bấm Áp dụng, đang hiện spinner, kiểm trạng thái mã và lượt tạm giữ khi có mạng lại | ST | Q-D22-01, Q-D14-01 | P1 |
| SC-18 | 3 | NEGATIVE | Áp mã ở bước 1, sang bước 3 thì mã hết hạn hoặc bị Admin vô hiệu hóa, bấm Đặt hàng bị từ chối, báo mã không còn hiệu lực | ST | Q-D19-01 | P1 |
| SC-19 | 3 | NEGATIVE | Mã còn 1 lượt, 2 khách cùng bấm Đặt hàng, đơn ghi nhận trước tại máy chủ thành công, đơn sau báo hết lượt | ST | Q-D18-01, M02 | P1 |
| SC-20 | 1 | NEGATIVE | Áp mã xong, giảm số lượng làm tổng đơn dưới tối thiểu, mã tự bị hủy và có thông báo | ST | Q-D16-01, M07 | P1 |
| SC-21 | 1 | NEGATIVE | Áp mã % xong, tăng số lượng (vẫn đạt ngưỡng), tiền giảm được tính lại theo giỏ mới | EP | Q-D16-02, M04 | P1 |
| SC-22 | 2 | NEGATIVE | Áp mã xong, phiên đăng nhập hết hạn ở bước giao hàng, đăng nhập lại thì mất mã, phải áp lại | ST | Q-D16-03, M07 | P1 |
| SC-23 | 3 | NEGATIVE | Đặt hàng bằng mã, thanh toán thẻ hoặc Ví ShopGo thất bại, lượt được hoàn, khách áp lại được | ST | Q-D15-01, Q-D15-02 | P1 |
| SC-24 | 4 | NEGATIVE | Đơn đã đặt bằng mã bị hủy sau bước xác nhận, lượt dùng mã được hoàn lại | ST | Q-D15-01 | P1 |
| SC-25 | 1 | NEGATIVE | Áp mã xong bấm gỡ mã, tổng tiền về ban đầu, kiểm lượt tạm giữ có được nhả không | ST | Q-D17-01, M07 | P1 |

Tổng: 25 scenario. BOUNDARY 9, VALIDATION 6, NEGATIVE 10. Bước 1: 19, bước 2: 2, bước 3: 3, bước 4: 1.
3 scenario NEGATIVE bắt buộc: SC-18 (mã hết hạn giữa lúc checkout), SC-17 (mất mạng ngay sau khi áp mã), SC-16 (hết lượt đúng lúc bấm Áp dụng).

## 3. Cần dữ liệu

| Mục | Cần gì | Dùng cho |
|---|---|---|
| Mã % test | Tỷ lệ %, trần giảm, đơn tối thiểu, hạn dùng, tổng lượt | SC-01 đến SC-04, SC-06, SC-21 |
| Mã cố định test | Giá trị giảm, đơn tối thiểu | SC-05, SC-12 |
| Mã Freeship test | Ngưỡng cấu hình riêng (nếu có) | SC-09 |
| Mã còn đúng 1 lượt | Tổng lượt và số lượt đã dùng | SC-16, SC-19 |
| Mã có giới hạn phạm vi | Danh mục hoặc sản phẩm thuộc phạm vi | SC-10 |
| Địa chỉ giao có phí ship khác nhau | Ít nhất 2 địa chỉ và phí ship tương ứng | SC-08 |
| Định dạng và độ dài mã | Độ dài tối đa, ký tự cho phép | Bảng giá trị biên, field Mã giảm giá |
| Môi trường đổi giờ hệ thống | Cách đặt giờ máy chủ về 23:59:59 GMT+7 | SC-06, SC-18 |

## 4. Chờ BA chốt

### 4a. Mâu thuẫn đã có trong knowledge/features/voucher.md mục 7

| SC-ID hoặc Field | Mâu thuẫn | Nguồn |
|---|---|---|
| SC-05, Mã cố định so với tạm tính | M01: phần dư sau khi giảm hết tiền hàng có trừ vào phí ship không | Q-D12-01, Q-D20-01 |
| SC-16, SC-19 | M02: giữ lượt lúc Áp dụng hay chỉ tranh chấp lúc Đặt hàng | Q-D14-01, Q-D18-01 |
| SC-09, Hóa đơn với mã Freeship | M03: ngưỡng 200.000đ tính trên cơ sở nào, "từ" có là >= không | Q-D01-01, Q-D03-01 |
| SC-03, SC-21 | M04: tiền giảm % tính trên tạm tính hay tổng gồm ship | Q-D02-01, Q-D20-01 |
| SC-10 | M05: ShopGo có loại mã giới hạn phạm vi không | Q-D08-01, Q-D08-02 |
| SC-11 | M06: tiền giảm có được máy chủ tính lại không | Q-D21-02 |
| SC-20, SC-22, SC-25 | M07: lượt tạm giữ có được nhả khi gỡ mã, mất phiên, giỏ dưới ngưỡng không | Q-D16-03, Q-D14-01, Q-D17-01 |

### 4b. Kẽ hở mới phát hiện ở bước này (chưa có trong mục 7, đề xuất qa-analyst đưa vào câu hỏi BA)

| SC-ID hoặc Field | Kẽ hở | Liên quan |
|---|---|---|
| Bảng quyết định 2a cột 4, 6, 7, 8 | Nhiều điều kiện sai cùng lúc thì báo lỗi nào trước | Q-D13-01 |
| SC-07 | Nội dung thông báo khi tài khoản đã dùng mã (không thuộc 4 nguyên nhân của R23) | Q-D06-01, Q-D13-01 |
| SC-15 | Nội dung thông báo hoặc cách chặn khách vãng lai | Q-D07-01 |
| SC-12 | Đã có mã A, nhập mã B không hợp lệ thì mã A có được giữ không | Q-D09-02 |
| SC-17 | Mất mạng sau khi bấm Áp dụng: mã có được áp, lượt có bị giữ không | Q-D22-01, Q-D14-01 |
| SC-03, SC-04 | Làm tròn trước rồi so trần, hay so trần trước rồi làm tròn | Q-D02-01, Q-D11-01 |
| SC-08 | Đổi địa chỉ làm tổng đơn dưới tối thiểu thì xử lý như R28 (tự hủy và thông báo) hay khác | Q-D20-02, Q-D16-01 |
| Mã giảm giá (chuỗi) | Độ dài tối đa, ký tự cho phép, xử lý chuỗi rỗng | Q-D10-01, Q-D10-02 |
