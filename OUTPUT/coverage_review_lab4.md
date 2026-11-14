# Coverage Review — Bộ test mẫu Lab 4 (15 TC)

Phạm vi: `qa-test-designer/skills/coverage-review/assets/lab4_test_suite.md`. Bộ test chỉ có Title, Priority, Viewpoint (không có Steps, Expected), nên nhãn phủ chỉ dựa vào Title.
Nguồn rule: `INPUT/Spec Function D.md` (BR-01..BR-05 theo thứ tự bullet "Các quy tắc đã nêu"), `gate_status.json` (36/36 câu đã xác nhận). Rủi ro lấy theo cột "Rủi ro gợi ý" của `qa-analyst/knowledge/voucher-domain.md`; X01 = TB.
Quy ước: TC trái với câu trả lời đã xác nhận được ghi là "Test sai rule" kèm Q-ID và không được tính là phủ đúng.

## Góc 1. Requirement ↔ Test Suite

### Rule gốc (BR)

| Dòng | Nội dung | TC phủ | Nhãn phủ | Lý do |
|---|---|---|---|---|
| BR-01 | Có 2 loại mã: giảm % và giảm số tiền cố định (VND) | TC-01 | MOT_PHAN | Title TC-01 không nêu loại mã; không có TC riêng cho mã %, mã cố định (và mã Freeship theo Q-D01-01) |
| BR-02 | Mã chỉ dùng được khi đơn đạt giá trị tối thiểu | TC-02, TC-03 | COVER | Title nêu rõ trường hợp bằng và dưới min order |
| BR-03 | Mỗi mã có ngày hết hạn | TC-04 | COVER | Title nêu rõ "Áp mã đã hết hạn" |
| BR-04 | Áp thành công: hiển thị số tiền được giảm và tổng tiền mới | TC-12, TC-06 | MOT_PHAN | TC-12 chỉ nêu số tiền giảm; không TC nào nêu tổng tiền mới sau khi áp (TC-06 là tính lại sau khi gỡ) |
| BR-05 | Mã không hợp lệ hoặc hết hạn: hiển thị thông báo lỗi | TC-04, TC-05, TC-08 | MOT_PHAN | Title nêu điều kiện lỗi nhưng không nêu việc hiển thị thông báo lỗi (theo nguyên nhân, dưới ô nhập: Q-D13-01, Q-D13-02) |

### Danh mục D01–D23, X01

| Dòng | Nội dung | TC phủ | Nhãn phủ | Lý do |
|---|---|---|---|---|
| D01 | Loại mã (%, cố định, Freeship) | TC-01 | MOT_PHAN | Không phân biệt loại mã; thiếu Freeship (Q-D01-01) |
| D02 | Trần giảm mã % | — | CHUA_COVER | Không có TC |
| D03 | Cơ sở và ngưỡng đơn tối thiểu (>=) | TC-02, TC-03 | MOT_PHAN | Có bằng và dưới; thiếu cao hơn 1đ, dưới không đúng 1đ; Title không nêu cơ sở so sánh là tổng tiền gồm phí ship (Q-D03-01) |
| D04 | Mốc hiệu lực (23:59:59, GMT+7) | TC-04 | MOT_PHAN | Chỉ có "đã hết hạn", không có mốc giờ và múi giờ (Q-D04-01, Q-D04-02) |
| D05 | Tổng lượt dùng toàn hệ thống | — | CHUA_COVER | Không có TC |
| D06 | Giới hạn 1 lần mỗi tài khoản | — | CHUA_COVER | Không có TC |
| D07 | Bắt buộc đăng nhập | TC-14 | CHUA_COVER (Test sai rule) | TC-14 kỳ vọng khách không đăng nhập vẫn áp được mã, trái Q-D07-01 (bắt buộc đăng nhập) |
| D08 | Phạm vi sản phẩm áp dụng | — | CHUA_COVER | Không có TC (Q-D08-01, Q-D08-02) |
| D09 | Tối đa 1 mã, mã mới ghi đè mã cũ | TC-11 | MOT_PHAN | Có "Áp 2 mã cùng lúc"; thiếu luồng ghi đè mã B thay mã A (Q-D09-02) |
| D10 | Tiêu chí mã hợp lệ (hoa/thường, trim, ký tự đặc biệt) | TC-08 | MOT_PHAN | Chỉ có ký tự đặc biệt; thiếu hoa/thường (Q-D10-01), khoảng trắng thừa (Q-D10-02) |
| D11 | Làm tròn đến hàng nghìn 1.000đ | — | CHUA_COVER | Không có TC (Q-D11-01) |
| D12 | Tiền giảm vượt tiền hàng | TC-07 | MOT_PHAN (Test sai rule) | TC-07 lấy "tổng tiền đơn" làm mốc; Q-D12-01 quy định tiền giảm tối đa bằng tạm tính tiền hàng. Thiếu trường hợp nhỏ hơn và lớn hơn |
| D13 | Thông báo lỗi tách theo nguyên nhân, dưới ô nhập | — | CHUA_COVER | Không Title nào nêu nội dung hoặc vị trí thông báo lỗi |
| D14 | Tạm giữ lượt khi áp, trừ chính thức khi đặt hàng | — | CHUA_COVER | TC-09 chỉ nêu chuyển bước thanh toán, không nêu lượt dùng |
| D15 | Hoàn lượt khi hủy đơn hoặc thanh toán thất bại | — | CHUA_COVER | Không có TC |
| D16 | Giỏ hàng hoặc phiên thay đổi sau khi áp mã | — | CHUA_COVER | Không có TC (Q-D16-01, Q-D16-02, Q-D16-03) |
| D17 | Gỡ mã hoặc đổi mã khác | TC-06 | MOT_PHAN | Có gỡ mã và tính lại tổng; thiếu đổi sang mã khác |
| D18 | Đồng thời ở lượt cuối | — | CHUA_COVER | Không có TC |
| D19 | Mã mất hiệu lực giữa luồng | — | CHUA_COVER | Không có TC |
| D20 | Tiền giảm trừ vào tổng đơn (gồm phí ship), kiểm lại khi đổi địa chỉ | — | CHUA_COVER | Không có TC (Q-D20-01, Q-D20-02) |
| D21 | Phòng chống dò mã, nơi tính tiền giảm | TC-10 | CHUA_COVER (Test sai rule) | TC-10 kiểm cơ chế chặn sau 5 lần sai; Q-D21-01 xác nhận không giới hạn số lần nhập sai. Q-D21-02 chưa có TC |
| D22 | Loading và vô hiệu hóa nút Áp dụng | TC-13 | MOT_PHAN | TC-13 chạm phản hồi mạng; thiếu loading và chặn bấm đúp (Q-D22-01) |
| D23 | Lưu vết mã trên đơn hàng, email | TC-15 | MOT_PHAN | Chỉ có lịch sử đơn; thiếu chi tiết đơn và email xác nhận (Q-D23-01) |
| X01 | Phạm vi thị trường (chỉ Việt Nam, VND) | — | CHUA_COVER | Không có TC (Q-X01-01, Q-X01-02) |

Tổng hợp Góc 1 (29 dòng): COVER 2, MOT_PHAN 12 (trong đó 1 Test sai rule), CHUA_COVER 15 (trong đó 2 Test sai rule).

## Góc 2. Viewpoint Balance

| Viewpoint | Số TC | Tỉ lệ |
|---|---|---|
| VP-01 Happy Path | 5 (TC-01, 06, 09, 14, 15) | 33,3% |
| VP-02 Negative | 5 (TC-03, 04, 05, 08, 11) | 33,3% |
| VP-03 Boundary | 2 (TC-02, 07) | 13,3% |
| VP-04 Security | 1 (TC-10) | 6,7% |
| VP-05 UX/Usability | 1 (TC-12, nhãn "UX") | 6,7% |
| VP-06 Performance | 0 | 0% |
| VP-07 Accessibility | 0 | 0% |
| VP-08 Integration | 0 | 0% |
| Ngoài danh sách | 1 (TC-13, nhãn "Edge Case") | 6,7% |
| Tổng | 15 | 100% |

Ghi chú: TC-14 xếp Happy Path nhưng là Test sai rule (D07); TC-15 (lịch sử đơn) và TC-09 (chuyển bước thanh toán) có nội dung Integration nhưng được đếm theo nhãn đã ghi.

## Góc 3. Boundary

| ID | Điểm | TC phủ | Nhãn phủ |
|---|---|---|---|
| B-01 | Đơn tối thiểu: thấp hơn 1đ | TC-03 | MOT_PHAN (chỉ "dưới min order", không đúng 1đ) |
| B-02 | Đơn tối thiểu: bằng | TC-02 | COVER |
| B-03 | Đơn tối thiểu: cao hơn 1đ | — | CHUA_COVER |
| B-04 | Ngày hết hạn: trước 1 ngày | — | CHUA_COVER |
| B-05 | Ngày hết hạn: đúng ngày | — | CHUA_COVER |
| B-06 | Ngày hết hạn: sau 1 ngày | TC-04 | MOT_PHAN (chỉ "đã hết hạn", không nêu sau 1 ngày) |
| B-07 | Tiền giảm nhỏ hơn tiền hàng | — | CHUA_COVER |
| B-08 | Tiền giảm bằng tiền hàng | TC-07 | MOT_PHAN (Test sai rule Q-D12-01: mốc là tổng tiền đơn thay vì tạm tính tiền hàng) |
| B-09 | Tiền giảm lớn hơn tiền hàng | — | CHUA_COVER |

## Gap

| GAP-ID | Góc | Dòng gốc | Mô tả | Rủi ro | Đề xuất test case |
|---|---|---|---|---|---|
| GAP-01 | 1 | D07, TC-14 | Test sai rule (Q-D07-01): TC-14 kỳ vọng khách chưa đăng nhập áp được mã | TB | Sửa TC-14: Khách chưa đăng nhập nhập mã hợp lệ [CAN_DU_LIEU] và bấm Áp dụng; kỳ vọng hệ thống yêu cầu đăng nhập, không áp mã |
| GAP-02 | 1 | D21, TC-10 | Test sai rule (Q-D21-01): TC-10 kiểm chặn sau 5 lần sai trong khi rule xác nhận không giới hạn | TB | Sửa TC-10: Nhập sai mã 6 lần liên tiếp, sau đó nhập mã hợp lệ [CAN_DU_LIEU]; kỳ vọng không bị khóa, mã hợp lệ áp thành công |
| GAP-03 | 1, 3 | D12, B-08, TC-07 | Test sai rule (Q-D12-01): TC-07 dùng tổng tiền đơn làm mốc thay vì tạm tính tiền hàng | CAO | Sửa TC-07: Mã cố định có giá trị giảm bằng đúng tạm tính tiền hàng [CAN_DU_LIEU]; kỳ vọng tiền hàng sau giảm = 0đ, không âm |
| GAP-04 | 1 | BR-01, D01 | Không tách loại mã %, cố định, Freeship | TB | 3 TC: áp mã %, mã cố định, mã Freeship trên đơn từ 200.000đ (Q-D01-01) [CAN_DU_LIEU mã]; kỳ vọng số tiền giảm đúng theo loại |
| GAP-05 | 1 | BR-04 | Không kiểm tổng tiền mới sau khi áp thành công | TB (theo D20) | Áp mã hợp lệ [CAN_DU_LIEU]; kỳ vọng hiển thị đồng thời số tiền giảm và tổng tiền mới = tổng đơn gồm phí ship trừ tiền giảm (Q-D20-01) |
| GAP-06 | 1 | BR-05, D13 | Không kiểm nội dung và vị trí thông báo lỗi theo nguyên nhân | TB | 4 TC cho mã hết hạn, chưa đủ đơn tối thiểu, hết lượt, không tồn tại [CAN_DU_LIEU]; kỳ vọng mỗi trường hợp có thông báo riêng, hiển thị ngay dưới ô "Mã giảm giá" (Q-D13-01, Q-D13-02) |
| GAP-07 | 1 | D02 | Thiếu trần giảm mã % | CAO | Mã % có trần [CAN_DU_LIEU tỉ lệ, trần], đơn có tiền giảm tính theo % vượt trần; kỳ vọng tiền giảm = trần (Q-D02-01) |
| GAP-08 | 1, 3 | D03, B-01, B-03 | Thiếu biên thấp hơn 1đ, cao hơn 1đ; chưa nêu cơ sở so sánh | CAO | 2 TC: tổng tiền đơn gồm phí ship = min order - 1đ (từ chối) và = min order + 1đ (áp thành công) [CAN_DU_LIEU min order] (Q-D03-01, Q-D03-02) |
| GAP-09 | 1, 3 | D04, B-04, B-05, B-06 | Thiếu biên ngày hết hạn và mốc 23:59:59 GMT+7 | TB | 3 TC: áp trước ngày hết hạn 1 ngày (thành công), đúng ngày hết hạn lúc 23:59:59 GMT+7 (thành công), sau ngày hết hạn 1 ngày (từ chối) [CAN_DU_LIEU mã, ngày] (Q-D04-01, Q-D04-02) |
| GAP-10 | 1 | D05 | Thiếu kiểm hết tổng lượt toàn hệ thống | CAO | Mã đã dùng hết tổng lượt [CAN_DU_LIEU]; kỳ vọng từ chối, báo hết lượt (Q-D05-01) |
| GAP-11 | 1 | D06 | Thiếu kiểm 1 lần mỗi tài khoản | CAO | Tài khoản đã đặt hàng thành công với mã [CAN_DU_LIEU] áp lại mã đó; kỳ vọng từ chối (Q-D06-01) |
| GAP-12 | 1 | D08 | Thiếu kiểm phạm vi sản phẩm | TB | Giỏ có sản phẩm thuộc và không thuộc phạm vi mã [CAN_DU_LIEU]; kỳ vọng không cho áp mã (Q-D08-02) |
| GAP-13 | 1 | D09 | Thiếu luồng ghi đè mã | CAO | Đã áp mã A, nhập mã B hợp lệ [CAN_DU_LIEU]; kỳ vọng mã B thay mã A, đơn chỉ còn 1 mã (Q-D09-01, Q-D09-02) |
| GAP-14 | 1 | D10 | Thiếu hoa/thường và khoảng trắng thừa | TB | Nhập mã hợp lệ [CAN_DU_LIEU] ở dạng chữ thường và có khoảng trắng đầu/cuối; kỳ vọng áp thành công (Q-D10-01, Q-D10-02) |
| GAP-15 | 1 | D11 | Thiếu làm tròn | CAO | Mã % sinh tiền giảm có phần lẻ dưới 1.000đ [CAN_DU_LIEU]; kỳ vọng làm tròn số học đến hàng nghìn (Q-D11-01) |
| GAP-16 | 1 | D14 | Thiếu thời điểm giữ và trừ lượt | CAO | Áp mã thành công nhưng chưa đặt hàng, rồi đặt hàng [CAN_DU_LIEU]; kỳ vọng lượt bị tạm giữ khi áp và trừ chính thức khi đặt hàng thành công (Q-D14-01) |
| GAP-17 | 1 | D15 | Thiếu hoàn lượt | TB | Đặt đơn có mã rồi hủy đơn, và đơn thanh toán thẻ/Ví ShopGo thất bại [CAN_DU_LIEU]; kỳ vọng hoàn lượt, khách áp lại được (Q-D15-01, Q-D15-02) |
| GAP-18 | 1 | D16 | Thiếu thay đổi giỏ hoặc phiên sau khi áp | CAO | 3 TC: giảm số lượng làm đơn dưới min (tự hủy mã, thông báo); đổi số lượng vẫn đạt ngưỡng với mã % (tính lại); phiên hết hạn rồi đăng nhập lại (mất mã) [CAN_DU_LIEU] (Q-D16-01..03) |
| GAP-19 | 1 | D17 | Thiếu đổi mã khác sau khi đã áp | TB | Đã áp mã A, gỡ rồi áp mã B [CAN_DU_LIEU]; kỳ vọng tổng tiền tính theo mã B (Q-D17-01) |
| GAP-20 | 1 | D18 | Thiếu đồng thời ở lượt cuối | CAO | Mã còn 1 lượt [CAN_DU_LIEU], 2 tài khoản bấm Đặt hàng cùng lúc; kỳ vọng đơn ghi nhận trước thành công, đơn sau báo hết lượt (Q-D18-01) |
| GAP-21 | 1 | D19 | Thiếu mã mất hiệu lực giữa luồng | CAO | Áp mã thành công, Admin vô hiệu hóa mã trước khi bấm Đặt hàng [CAN_DU_LIEU]; kỳ vọng từ chối tạo đơn, báo mã không còn hiệu lực (Q-D19-01) |
| GAP-22 | 1 | D20 | Thiếu kiểm tiền giảm trừ vào tổng gồm phí ship và đổi địa chỉ | TB | Áp mã rồi đổi địa chỉ làm đổi phí ship [CAN_DU_LIEU]; kỳ vọng mã được kiểm tra và tính lại (Q-D20-01, Q-D20-02) |
| GAP-23 | 1 | D21 | Thiếu TC cho Q-D21-02 (dùng giá trị giao diện gửi lên) | TB | Gửi request áp mã có tiền giảm khác giá trị hệ thống hiển thị [CAN_DU_LIEU]; ghi nhận hành vi theo Q-D21-02 và báo cáo rủi ro bảo mật cho BA |
| GAP-24 | 1, 2 | D22, VP-06 | 0 TC Performance; thiếu loading và chặn bấm đúp | TB | Bấm Áp dụng 2 lần liên tiếp khi chờ phản hồi [CAN_DU_LIEU]; kỳ vọng có loading, nút bị vô hiệu hóa, chỉ 1 request được xử lý (Q-D22-01) |
| GAP-25 | 1 | D23 | Thiếu chi tiết đơn và email | THAP | Đặt hàng có mã [CAN_DU_LIEU]; kỳ vọng mã và số tiền giảm hiển thị trong chi tiết đơn, lịch sử đơn, email xác nhận (Q-D23-01) |
| GAP-26 | 1 | X01 | Thiếu kiểm phạm vi thị trường | TB | Xác nhận giao diện chỉ hiển thị VND và địa chỉ giao trong Việt Nam; không có lựa chọn Nhật Bản (Q-X01-01, Q-X01-02) |
| GAP-27 | 2 | VP-07 | 0 TC Accessibility | Unknown (chưa có D-code) | Thao tác ô "Mã giảm giá" và nút "Áp dụng" chỉ bằng bàn phím; kiểm trình đọc màn hình đọc được nhãn và thông báo lỗi |
| GAP-28 | 2 | VP-08 | 0 TC Integration | CAO (theo D14, D16, D19) | Dùng các TC GAP-16, GAP-18, GAP-21, GAP-25 với nhãn Integration |
| GAP-29 | 2 | Ngoài danh sách | TC-13 ghi nhãn "Edge Case" không thuộc 8 viewpoint | TB (theo D22) | Đổi nhãn TC-13 sang VP-06 Performance hoặc VP-08 Integration và bổ sung Expected theo Q-D22-01 |
| GAP-30 | 3 | B-07, B-09 | Thiếu biên tiền giảm nhỏ hơn và lớn hơn tiền hàng | CAO | 2 TC: mã cố định nhỏ hơn tạm tính tiền hàng (giảm đúng giá trị mã); lớn hơn tạm tính tiền hàng (tiền giảm = tạm tính, tiền hàng về 0đ) [CAN_DU_LIEU] (Q-D12-01) |

## Điểm cần làm rõ

- Q-D12-01 (tiền giảm tối đa bằng tạm tính tiền hàng) và Q-D20-01 (tiền giảm trừ vào tổng đơn gồm phí ship) có thể mâu thuẫn ở trường hợp tiền giảm lớn hơn tiền hàng. Cách tính chính xác: Unknown, cần BA xác nhận trước khi viết Expected cho GAP-03, GAP-30.
- Q-D21-02 (dùng tiền giảm do giao diện gửi lên) là rủi ro bảo mật; cần BA xác nhận lại.
