# Coverage Strategy: Function D

## 1. Ma trận vùng rủi ro

| Vùng rủi ro | D-code | Khả năng | Căn cứ | Ảnh hưởng | Căn cứ | Ưu tiên |
|---|---|---|---|---|---|---|
| Tính toán tiền giảm & Trần giảm | D02, D11, D12, D20 | CAO | Chứa công thức tính tỷ lệ %, trần giảm tối đa, làm tròn số học 1.000đ; tồn tại mâu thuẫn M01 (giảm vượt tạm tính và phí ship) và M04 (cơ sở tính % trên tạm tính hay tổng gồm ship). | CAO | Sai lệch trực tiếp giá trị tiền hàng, thất thoát doanh thu của sàn hoặc trừ sai tiền của khách hàng. | P1 |
| Quản lý vòng đời & Tranh chấp lượt dùng | D05, D06, D14, D15, D18 | CAO | Điều kiện kết hợp phức tạp (giới hạn toàn sàn và mỗi tài khoản), xử lý đồng thời 2 khách cùng đặt hàng ở lượt cuối; tồn tại mâu thuẫn M02 (thời điểm tạm giữ lượt) và M07 (nhả lượt khi mất phiên/hủy mã). | CAO | Nguy cơ lạm dụng mã, vượt ngân sách khuyến mãi, thất thoát tài chính diện rộng. | P1 |
| Toàn vẹn dữ liệu & Phòng chống gian lận | D21 | CAO | Q-D21-02 chấp nhận lấy tiền giảm từ client gửi lên (lỗ hổng bảo mật nghiêm trọng - M06); Q-D21-01 không giới hạn số lần nhập sai. | CAO | Khách hàng/hacker có thể sửa đổi payload request để tự đặt số tiền giảm tùy ý, gây thất thoát tài chính trực tiếp và nghiêm trọng. | P1 |
| Điều kiện đơn tối thiểu & Biến động giỏ hàng | D03, D16 | CAO | Xử lý thay đổi động trạng thái giỏ hàng (sửa số lượng, giá trị tụt dưới ngưỡng, tính lại tiền giảm %); tồn tại mâu thuẫn M04 và M07. | CAO | Áp sai mã cho đơn không đủ điều kiện tối thiểu dẫn đến thất thoát chiết khấu hoặc đơn hàng bị từ chối sai. | P1 |
| Hiệu lực thời gian & Chặn hết hạn giữa luồng | D04, D19 | TB | Ràng buộc mốc thời gian biên 23:59:59 GMT+7 và cơ chế kiểm tra lại hiệu lực tại thời điểm bấm Đặt hàng. | CAO | Đơn hàng hoàn tất bằng mã đã hết hạn hoặc bị Admin thu hồi, làm thất thoát ngân sách khuyến mãi. | P1 |
| Phạm vi áp dụng sản phẩm & Quy tắc cộng dồn | D08, D09 | CAO | Tồn tại mâu thuẫn M05 giữa Q-D08-01 (áp dụng toàn giỏ) và Q-D08-02 (chặn khi có sản phẩm ngoài phạm vi); quy tắc ghi đè mã mới khi đã có mã cũ. | TB | Khách hàng áp sai danh mục hoặc bị lỗi ghi đè mã dẫn đến gián đoạn thanh toán, phát sinh khiếu nại CSKH. | P1 |
| Định dạng mã, Phân loại & Quyền áp dụng | D01, D07, D10, X01 | TB | Phân loại mã (mã Freeship có điều kiện phát sinh 200.000đ - M03); xử lý chuỗi (auto-trim, chữ hoa/thường); chặn khách vãng lai và giới hạn thị trường VNĐ. | TB | Khách hàng không nhập được mã hợp lệ hoặc Guest bị chặn thanh toán, gây bỏ giỏ hàng và tăng tải CSKH. | P2 |
| Trải nghiệm người dùng, Trạng thái chờ & Lưu vết | D13, D22, D23 | THAP | Quy tắc thuần về giao diện (hiển thị 4 thông báo lỗi riêng biệt, spinner loading khóa nút) và lưu vết thông tin vào DB/email. | THAP | Không làm sai tiền hay rò rỉ mã; chủ yếu ảnh hưởng đến cảm nhận giao diện hoặc thiếu thông tin hiển thị trên email. | P3 |

## 2. Vùng P1 (Ưu tiên kiểm thử cao nhất)

| Vùng | Loại test đề xuất | Kỹ thuật | Viewpoint | Mức độ |
|---|---|---|---|---|
| Tính toán tiền giảm & Trần giảm | Functional, Boundary, Calculation | BVA, EP, Decision Table | VP-03 Boundary, VP-01 Happy Path | Kỹ lưỡng (Thử toàn bộ điểm biên trần giảm, làm tròn số học hàng nghìn, tiền giảm bằng tạm tính) |
| Quản lý vòng đời & Tranh chấp lượt dùng | Concurrency, Functional, Rollback | State Transition, Concurrency Testing | VP-04 Security, VP-08 Integration, VP-02 Negative | Kỹ lưỡng (Thử nghiệm 2 user đặt hàng đồng thời ở lượt cuối, chu trình tạm giữ - trừ - hoàn lượt) |
| Toàn vẹn dữ liệu & Phòng chống gian lận | Security, Penetration, Integrity | Parameter Tampering, Brute-force / Rate-limit test | VP-04 Security | Sâu (Kiểm tra sửa đổi request số tiền giảm, tự động hóa script thử mã liên tục) |
| Điều kiện đơn tối thiểu & Biến động giỏ hàng | Functional, Boundary, State Transition | BVA (Ngưỡng tối thiểu -1đ, đúng bằng, +1đ), State Transition | VP-03 Boundary, VP-08 Integration | Kỹ lưỡng (Thay đổi số lượng giỏ hàng sau khi áp mã, kiểm tra tính lại tiền và tự hủy mã) |
| Hiệu lực thời gian & Chặn hết hạn giữa luồng | Functional, Boundary, Edge Case | BVA (23:59:59 GMT+7 và 00:00:00 ngày hôm sau), Time-shift / Interception | VP-03 Boundary, VP-08 Integration | Kỹ lưỡng (Tắt mã từ Admin hoặc đợi hết hạn trong lúc đang ở trang Checkout trước khi bấm Đặt hàng) |
| Phạm vi áp dụng sản phẩm & Quy tắc cộng dồn | Functional, Negative | EP, Decision Table (Giỏ đơn thuần vs Giỏ lẫn lộn, Mã A vs Mã B) | VP-02 Negative, VP-08 Integration | Trung bình (Thử các tổ hợp giỏ hàng và chuỗi áp đè mã mới) |

## 3. Chưa test được vì còn mâu thuẫn

| Vùng | Mâu thuẫn | Nguồn |
|---|---|---|
| Tính toán tiền giảm & Trần giảm | M01 (Trần giảm là tạm tính hay tổng gồm ship), M04 (Cơ sở tính % là tạm tính hay tổng gồm ship) | knowledge/features/voucher.md mục 7 (Q-D12-01, Q-D20-01, Q-D02-01) |
| Quản lý vòng đời & Tranh chấp lượt dùng | M02 (Giữ chỗ lượt tại bước Áp dụng hay tranh chấp tại bước Đặt hàng), M07 (Giải phóng lượt tạm giữ khi mất phiên/gỡ mã) | knowledge/features/voucher.md mục 7 (Q-D14-01, Q-D18-01, Q-D16-03) |
| Toàn vẹn dữ liệu & Phòng chống gian lận | M06 (Xác thực tiền giảm tại máy chủ hay tin tưởng giao diện gửi lên) | knowledge/features/voucher.md mục 7 (Q-D21-02) |
| Phạm vi áp dụng sản phẩm & Quy tắc cộng dồn | M05 (Hệ thống có hỗ trợ mã giới hạn phạm vi danh mục hay chỉ áp dụng toàn sàn) | knowledge/features/voucher.md mục 7 (Q-D08-01, Q-D08-02) |
| Định dạng mã, Phân loại & Quyền áp dụng | M03 (Ngưỡng 200.000đ của mã Freeship tính trên tiền hàng hay tổng gồm ship) | knowledge/features/voucher.md mục 7 (Q-D01-01, Q-D03-01) |
