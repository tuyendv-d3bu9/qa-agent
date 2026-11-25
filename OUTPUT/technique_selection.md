# Technique Selection: Function D

Nguồn: `OUTPUT/coverage_strategy.md` (vùng P1, P2), `knowledge/features/voucher.md` (mục 3, 3b, 7, 9).
Kỹ thuật: EP (chia lớp tương đương), BVA (giá trị biên), DT (bảng quyết định), ST (chuyển trạng thái).
Vùng P3 (D13, D22, D23) không chọn kỹ thuật ở bước này.

## 1. Kỹ thuật theo field hoặc rule

| Field hoặc rule | Vùng rủi ro | Ưu tiên | Kỹ thuật | Lý do | Nguồn rule |
|---|---|---|---|---|---|
| Trần giảm của mã % | Tính toán tiền giảm & Trần giảm | P1 | BVA | Có ngưỡng: tiền giảm tính ra nhỏ hơn, bằng, lớn hơn trần. Giá trị trần do từng mã cấu hình nên ghi `[CAN_DU_LIEU]`. Expected cơ sở tính % chờ BA chốt M04 | R07 |
| Làm tròn tiền giảm mã % | Tính toán tiền giảm & Trần giảm | P1 | BVA | Có ngưỡng làm tròn ở phần lẻ 500đ khi làm tròn số học đến 1.000đ | R21 |
| Mã cố định lớn hơn tạm tính | Tính toán tiền giảm & Trần giảm | P1 | BVA | Có ngưỡng: giá trị mã nhỏ hơn, bằng, lớn hơn tạm tính. Phần dư có trừ tiếp vào phí ship không chờ BA chốt M01 | R22 |
| Loại mã | Tính toán tiền giảm & Trần giảm | P1 | EP | 3 nhóm xử lý khác nhau: mã %, mã cố định, mã Freeship | BR-01, R06 |
| Thành phần bị trừ tiền giảm | Tính toán tiền giảm & Trần giảm | P1 | EP | 2 nhóm: tiền hàng và phí vận chuyển. Expected chờ BA chốt M01, M04 | R34 |
| Mã trong đơn (vòng đời) | Quản lý vòng đời & Tranh chấp lượt dùng | P1 | ST | Mã trong đơn có vòng đời: chưa áp, đã áp (tạm giữ lượt), đã gỡ, bị hủy tự động, đã dùng, đã hoàn lượt. Xem mục 3 | R25, R26, R27, R28, R30, R31, R33 |
| Lượt dùng toàn sàn | Quản lý vòng đời & Tranh chấp lượt dùng | P1 | BVA | Có ngưỡng: còn 1 lượt và còn 0 lượt. Tổng lượt của mã test ghi `[CAN_DU_LIEU]` | R12 |
| Lượt dùng mỗi tài khoản | Quản lý vòng đời & Tranh chấp lượt dùng | P1 | BVA | Ngưỡng có số: tối đa 1 lần. Biên là đã dùng 0 lần và đã dùng 1 lần | R13 |
| Hai khách tranh lượt cuối | Quản lý vòng đời & Tranh chấp lượt dùng | P1 | ST | Lượt chuyển từ còn 1 sang hết khi đơn đầu tiên ghi nhận tại máy chủ. Cần kiểm thêm theo kiểu đồng thời (2 phiên bấm Đặt hàng cùng lúc). Mâu thuẫn với R25 về thời điểm giữ lượt, chờ BA chốt M02 | R32 |
| Số lần nhập mã sai | Toàn vẹn dữ liệu & Phòng chống gian lận | P1 | EP | 2 nhóm: nhập sai ít lần và nhập sai liên tục nhiều lần, cả hai đều không bị khóa theo rule. Loại test bảo mật (dò mã) | R36 |
| Tiền giảm gửi từ giao diện | Toàn vẹn dữ liệu & Phòng chống gian lận | P1 | EP | 2 nhóm: giá trị gửi lên khớp với giá trị đúng và giá trị bị sửa trong request. Loại test bảo mật (sửa request). Expected chờ BA chốt M06 | R37 |
| Tổng đơn so với đơn tối thiểu | Điều kiện đơn tối thiểu & Biến động giỏ hàng | P1 | BVA | Có ngưỡng một phía, so sánh >= trên tổng đơn gồm phí ship. Giá trị tối thiểu do từng mã cấu hình nên ghi `[CAN_DU_LIEU]` | BR-02, R08, R09 |
| Sửa giỏ sau khi áp mã | Điều kiện đơn tối thiểu & Biến động giỏ hàng | P1 | BVA, EP | BVA: tổng đơn sau khi sửa tụt xuống tối thiểu - 1đ hoặc vẫn bằng tối thiểu. EP: nhóm vẫn đạt ngưỡng (tính lại tiền giảm) và nhóm dưới ngưỡng (tự hủy mã) | R28, R29 |
| Đổi địa chỉ giao làm đổi phí ship | Điều kiện đơn tối thiểu & Biến động giỏ hàng | P1 | BVA, EP | Phí ship nằm trong tổng đơn (R08) nên đổi địa chỉ có thể kéo tổng đơn qua ngưỡng tối thiểu. EP: phí ship tăng, phí ship giảm | R35, R08 |
| Giờ hết hạn của mã | Hiệu lực thời gian & Chặn hết hạn giữa luồng | P1 | BVA | Có mốc: 23:59:59 ngày hết hạn, GMT+7. Biên là 23:59:58, 23:59:59, 00:00:00 ngày hôm sau | R10, R11 |
| Mã hết hạn hoặc bị vô hiệu giữa luồng | Hiệu lực thời gian & Chặn hết hạn giữa luồng | P1 | ST | Mã đang ở trạng thái đã áp thì chuyển sang không còn hiệu lực trước khi bấm Đặt hàng | R33 |
| Phạm vi sản phẩm trong giỏ | Phạm vi áp dụng sản phẩm & Quy tắc cộng dồn | P1 | EP | 2 nhóm giỏ: toàn sản phẩm trong phạm vi và giỏ lẫn sản phẩm ngoài phạm vi. Expected chờ BA chốt M05 | R15, R16 |
| Áp mã thứ hai khi đã có mã | Phạm vi áp dụng sản phẩm & Quy tắc cộng dồn | P1 | DT | 2 điều kiện kết hợp: đơn đã có mã A hay chưa, mã B hợp lệ hay không. Xem mục 2b | R17, R18 |
| Điều kiện áp mã thành công | Điều kiện đơn tối thiểu, Hiệu lực thời gian, Vòng đời | P1 | DT | Kết quả phụ thuộc từ 3 điều kiện trở lên: đủ tối thiểu, còn hạn, còn lượt. Xem mục 2a | BR-02, BR-03, R12, R23 |
| Ô nhập Mã giảm giá | Định dạng mã, Phân loại & Quyền áp dụng | P2 | EP, BVA | EP: chữ thường, có khoảng trắng đầu cuối, mã không tồn tại. BVA độ dài và định dạng: chưa có rule, ghi `[CAN_DU_LIEU]` | FLD-01, R19, R20, R23 |
| Trạng thái đăng nhập | Định dạng mã, Phân loại & Quyền áp dụng | P2 | EP | 2 nhóm: đã đăng nhập và khách vãng lai | R14 |
| Ngưỡng hóa đơn mã Freeship | Định dạng mã, Phân loại & Quyền áp dụng | P2 | BVA | Có số từ nguồn: 200.000đ. Cơ sở tính (tiền hàng hay tổng gồm ship), toán tử "từ" và việc bị ghi đè chờ BA chốt M03 | R06 |

## 2. Bảng quyết định

### 2a. Điều kiện áp mã thành công

Giả định chung cho cả bảng: khách đã đăng nhập (R14), mã tồn tại, tài khoản chưa dùng mã (R13).

| Điều kiện | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| Đơn đủ tối thiểu | C | C | C | C | K | K | K | K |
| Mã còn hạn | C | C | K | K | C | C | K | K |
| Mã còn lượt | C | K | C | K | C | K | C | K |
| Áp được | C | K | K | K | K | K | K | K |
| Thông báo | Hiển thị tiền giảm và tổng mới (BR-04) | Hết lượt dùng (R23) | Hết hạn (R23) | Chưa có rule | Chưa đủ đơn tối thiểu (R23) | Chưa có rule | Chưa có rule | Chưa có rule |

C là có, K là không. Cột 4, 6, 7, 8 có từ 2 điều kiện sai cùng lúc. R23 tách thông báo theo nguyên nhân nhưng không nói nguyên nhân nào được báo trước, nên chưa viết Expected cho 4 cột này.

### 2b. Áp mã thứ hai khi đã có mã

| Điều kiện | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Đơn đã có mã A | C | C | K | K |
| Mã B hợp lệ | C | K | C | K |
| Kết quả | Mã B thay mã A (R18) | Chưa có rule: mã A có được giữ không | Áp mã B (BR-04) | Báo lỗi theo nguyên nhân (R23) |

## 3. Chuyển trạng thái

Đối tượng: mã trong đơn (không phải ô nhập mã).

| Trạng thái hiện tại | Sự kiện | Trạng thái sau | Hợp lệ | Nguồn |
|---|---|---|---|---|
| Chưa áp | Bấm Áp dụng, mã đủ điều kiện | Đã áp, tạm giữ lượt | Có | R25 |
| Chưa áp | Bấm Áp dụng, mã không đủ điều kiện | Chưa áp, báo lỗi | Có | BR-05, R23 |
| Đã áp | Bấm gỡ mã | Đã gỡ, tổng tiền về ban đầu | Có | R31 |
| Đã áp | Áp mã B hợp lệ | Mã B đã áp, mã A bị thay | Có | R18 |
| Đã áp | Sửa giỏ làm tổng đơn dưới tối thiểu | Bị hủy tự động, có thông báo | Có | R28 |
| Đã áp | Phiên đăng nhập hết hạn | Mất mã, khách phải áp lại | Có | R30 |
| Đã áp | Bấm Đặt hàng, mã còn hiệu lực | Đã dùng, trừ lượt chính thức | Có | R25, R33 |
| Đã áp | Bấm Đặt hàng, mã vừa hết hạn hoặc bị Admin vô hiệu | Bị từ chối, không tạo đơn | Có | R33 |
| Đã dùng | Đơn bị hủy hoặc thanh toán thẻ, Ví ShopGo thất bại | Đã hoàn lượt, khách áp lại được | Có | R26, R27 |
| Đã dùng | Tài khoản áp lại chính mã đó | Bị chặn | Không | R13 |
| Đã gỡ, bị hủy tự động, mất mã | Lượt đã tạm giữ | Chưa rõ có nhả lượt không | Chờ BA | M07 |

## 4. Không áp dụng

| Field hoặc rule | Kỹ thuật bị loại | Vì sao |
|---|---|---|
| Ô nhập Mã giảm giá | ST | Ô nhập chỉ là ô chữ, không có vòng đời. Vòng đời là của mã trong đơn (mục 3) |
| Trạng thái đăng nhập | DT | Chỉ 1 điều kiện (đăng nhập hay chưa), dùng EP là đủ |
| Lượt dùng mỗi tài khoản | EP riêng | Chỉ có 2 giá trị 0 và 1, BVA đã phủ hết |
| Làm tròn tiền giảm mã % | DT | Chỉ phụ thuộc phần lẻ của số tiền, không có điều kiện kết hợp |
| Số lần nhập mã sai | BVA | Rule nói không giới hạn, không có ngưỡng để lấy biên |
| Tiền tệ và múi giờ Nhật Bản | EP | Ngoài phạm vi theo R40, R41 |
