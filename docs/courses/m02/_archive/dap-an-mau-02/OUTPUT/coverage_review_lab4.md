# Coverage Review — Bộ test mẫu Lab 4 (OUTPUT/lab4_test_suite.md)

Đầu vào: `OUTPUT/lab4_test_suite.md` (15 TC, chỉ có Title, Priority, Viewpoint), `OUTPUT/requirement_autopsy_report.md`, câu trả lời đã xác nhận trong `gate_status.json`, bảng BR trong `OUTPUT/test_ideas.md`, `knowledge/test-viewpoints.md`.

Bộ test không có Steps và Expected, nên nhãn phủ chỉ dựa vào Title. Title không nêu điều kiện cụ thể thì không tính `COVER`.

## Góc 1. Requirement ↔ Test Suite

| Dòng | Nội dung | TC phủ | Nhãn phủ | Lý do |
|---|---|---|---|---|
| BR-01 | Có 2 loại mã: % và số tiền cố định | TC-01 | MOT_PHAN | TC-01 "Áp mã voucher hợp lệ" không nói loại mã. Không TC nào nêu mã % hay mã cố định |
| BR-02 | Mã chỉ dùng khi đơn đạt giá trị tối thiểu | TC-02, TC-03 | COVER | TC-02 đơn đúng bằng min order, TC-03 đơn dưới min order |
| BR-03 | Mỗi mã có ngày hết hạn | TC-04 | COVER | TC-04 áp mã đã hết hạn |
| BR-04 | Áp thành công → hiển thị số tiền giảm và tổng mới | TC-12 | MOT_PHAN | TC-12 chỉ nói số tiền giảm trên UI. Không TC nào kiểm tổng tiền mới sau khi áp (TC-06 chỉ kiểm tổng sau khi xóa mã) |
| BR-05 | Mã không hợp lệ hoặc hết hạn → thông báo lỗi | TC-04, TC-05, TC-08 | COVER | Mã hết hạn, mã không tồn tại, mã có ký tự đặc biệt |
| D01 | Loại mã giảm giá (có Freeship, Q-D01-01) | — | CHUA_COVER | Không TC nào nhắc loại mã hay Freeship |
| D02 | Trần giảm mã % (Q-D02-01) | — | CHUA_COVER | Không TC nào nhắc trần giảm |
| D03 | Cơ sở tính và ngưỡng tối thiểu (Q-D03-01, Q-D03-02) | TC-02, TC-03 | MOT_PHAN | Có đúng bằng và dưới min order, nhưng không TC nào nêu tối thiểu so trên tổng gồm phí vận chuyển |
| D04 | Mốc giờ hết hạn, múi giờ (Q-D04-01, Q-D04-02) | TC-04 | MOT_PHAN | TC-04 "đã hết hạn" không nêu mốc 23:59:59 hay GMT+7 |
| D05 | Tổng lượt toàn hệ thống (Q-D05-01) | — | CHUA_COVER | Không TC nào nhắc hết lượt |
| D06 | Lượt dùng mỗi khách (Q-D06-01) | — | CHUA_COVER | Không TC nào nhắc dùng lại mã |
| D07 | Điều kiện đăng nhập (Q-D07-01) | TC-14 (không tính) | CHUA_COVER | Test sai rule: TC-14 "Checkout không đăng nhập vẫn áp được voucher" trái Q-D07-01 (bắt buộc đăng nhập trước mới nhập và áp mã) |
| D08 | Phạm vi sản phẩm (Q-D08-01) | — | CHUA_COVER | Không TC nào nhắc danh mục |
| D09 | Cộng dồn, thay mã (Q-D09-01, Q-D09-02) | TC-11 | MOT_PHAN | TC-11 "Áp 2 mã cùng lúc" chạm chủ đề 1 mã/đơn, nhưng xếp Negative và không thể hiện quy tắc mã mới hợp lệ ghi đè mã cũ (Q-D09-02) |
| D10 | Tiêu chí mã hợp lệ (Q-D10-01, Q-D10-02) | TC-08 | MOT_PHAN | Chỉ có ký tự đặc biệt. Thiếu chữ thường và khoảng trắng đầu cuối |
| D11 | Làm tròn (Q-D11-01) | — | CHUA_COVER | Không TC nào nhắc làm tròn |
| D12 | Tiền giảm vượt tiền hàng (Q-D12-01) | TC-07 (không tính) | CHUA_COVER | Test sai rule: TC-07 "giảm bằng đúng tổng tiền đơn (đơn = 0đ)" trái Q-D12-01 (tiền giảm tối đa bằng tạm tính, tổng còn phí vận chuyển) |
| D13 | Thông báo lỗi riêng theo nguyên nhân (Q-D13-01) | — | CHUA_COVER | TC-04, TC-05 có nguyên nhân lỗi nhưng Title không nhắc thông báo; không TC nào so các thông báo |
| D14 | Thời điểm trừ lượt (Q-D14-01) | — | CHUA_COVER | TC-09 chỉ nói chuyển sang bước thanh toán, không nhắc lượt dùng |
| D15 | Hoàn lượt (Q-D15-01) | — | CHUA_COVER | Không TC nào nhắc hủy đơn hay thanh toán thất bại |
| D16 | Giỏ thay đổi sau khi áp mã (Q-D16-01) | — | CHUA_COVER | Không TC nào nhắc sửa giỏ |
| D17 | Gỡ mã (Q-D17-01) | TC-06 | COVER | TC-06 xóa voucher đã áp, tổng tiền tính lại |
| D18 | Thao tác đồng thời (Q-D18-01) | — | CHUA_COVER | Không TC nào nhắc lượt cuối hay đồng thời |
| D19 | Mã mất hiệu lực giữa luồng (Q-D19-01) | — | CHUA_COVER | Không TC nào nhắc mã bị vô hiệu hóa hay hết hạn trước Đặt hàng |
| D20 | Giảm trừ vào tổng gồm phí vận chuyển (Q-D20-01) | — | CHUA_COVER | Không TC nào nhắc phí vận chuyển |
| D21 | Chống dò mã (Q-D21-01) | TC-10 (không tính) | CHUA_COVER | Test sai rule: TC-10 "Nhập sai mã voucher 5 lần liên tiếp" xếp Security, con số 5 lần trùng phương án A (khóa sau 5 lần) đã bị loại; Q-D21-01 xác nhận không giới hạn. Expected không có trong Title, cần tác giả xác nhận |
| D22 | Trạng thái chờ (Q-D22-01) | — | CHUA_COVER | Không TC nào nhắc loading hay bấm đúp |
| D23 | Lưu vết mã trên đơn (Q-D23-01) | TC-15 | MOT_PHAN | TC-15 chỉ có lịch sử đơn hàng. Thiếu chi tiết đơn hàng và email xác nhận |
| X01 | Phạm vi Việt Nam, VND (Q-X01-01) | — | CHUA_COVER | Không TC nào nhắc VND hay địa chỉ giao hàng |

## Góc 2. Viewpoint Balance

Đếm theo cột Viewpoint ghi trong bộ test.

| Viewpoint | Số TC | Tỉ lệ |
|---|---|---|
| VP-01 Happy Path | 5 (TC-01, TC-06, TC-09, TC-14, TC-15) | 33,3% |
| VP-02 Negative | 5 (TC-03, TC-04, TC-05, TC-08, TC-11) | 33,3% |
| VP-03 Boundary | 2 (TC-02, TC-07) | 13,3% |
| VP-04 Security | 1 (TC-10) | 6,7% |
| VP-05 UX/Usability | 1 (TC-12) | 6,7% |
| VP-06 Performance | 0 | 0% |
| VP-07 Accessibility | 0 | 0% |
| VP-08 Integration | 0 | 0% |
| Ngoài danh sách | 1 (TC-13, ghi "Edge Case") | 6,7% |
| Tổng | 15 | 100% |

Nhận xét: TC-06 (gỡ mã, thuộc D17 → VP-05), TC-14 (đăng nhập, D07 → VP-08), TC-15 (lịch sử đơn, D23 → VP-08) ghi Happy Path nhưng theo bảng gắn D-code thuộc viewpoint khác. Nếu xếp lại, VP-08 có 2 TC nhưng TC-14 vẫn là test sai rule. TC-01 và TC-09 trùng luồng Happy; TC-09 lấn sang bước thanh toán, không phủ thêm rule nào của Function D.

## Góc 3. Boundary

| ID | Điểm | TC phủ | Nhãn phủ |
|---|---|---|---|
| B-01 | Tổng thấp hơn tối thiểu 1đ | TC-03 | MOT_PHAN |
| B-02 | Tổng bằng tối thiểu | TC-02 | COVER |
| B-03 | Tổng cao hơn tối thiểu 1đ | — | CHUA_COVER |
| B-04 | Trước ngày hết hạn 1 ngày | — | CHUA_COVER |
| B-05 | Đúng ngày hết hạn | — | CHUA_COVER |
| B-06 | Sau ngày hết hạn 1 ngày | TC-04 | MOT_PHAN |
| B-07 | Tiền giảm nhỏ hơn tiền hàng | — | CHUA_COVER |
| B-08 | Tiền giảm bằng tiền hàng | — | CHUA_COVER |
| B-09 | Tiền giảm lớn hơn tiền hàng | — | CHUA_COVER |

B-01: TC-03 chỉ nói "dưới min order", không đúng 1đ. B-06: TC-04 "đã hết hạn" không nêu mốc ngay sau ngày hết hạn. B-08: TC-07 so tiền giảm với tổng đơn (gồm phí vận chuyển), không phải tiền hàng, và trái Q-D12-01 nên không tính.

## Gap

| GAP-ID | Góc | Dòng gốc | Mô tả | Rủi ro | Đề xuất test case |
|---|---|---|---|---|---|
| GAP-01 | Góc 1 | BR-01 | Không TC nào nêu loại mã % hay cố định | TB (D01) | Verify mã cố định GIAM20K (giảm 20.000đ, tối thiểu 200.000đ), tạm tính 250.000đ + phí vận chuyển 30.000đ → tổng mới 260.000đ; Verify mã SALE20 (20%, trần 50.000đ), tạm tính 500.000đ + phí vận chuyển 30.000đ → giảm 50.000đ, tổng 480.000đ |
| GAP-02 | Góc 1 | BR-04 | Không TC kiểm tổng tiền mới sau khi áp | TB (D20) | GIAM20K, tạm tính 250.000đ + phí vận chuyển 30.000đ → hiển thị giảm 20.000đ và tổng mới 260.000đ |
| GAP-03 | Góc 1 | D01 | Chưa test mã Freeship | TB | Mã FREESHIP, tạm tính 150.000đ + phí vận chuyển 30.000đ = 180.000đ (dưới 200.000đ) → không áp được, tổng giữ 180.000đ |
| GAP-04 | Góc 1 | D02 | Chưa test trần giảm | CAO | SALE20 (20%, trần 50.000đ), tạm tính 500.000đ + phí vận chuyển 30.000đ = 530.000đ → giảm 50.000đ, tổng 480.000đ |
| GAP-05 | Góc 1 | D03 | Không nêu tối thiểu so trên tổng gồm phí vận chuyển | CAO | GIAM20K, tạm tính 190.000đ + phí vận chuyển 30.000đ = 220.000đ → áp được, tổng 200.000đ |
| GAP-06 | Góc 1 | D04 | Không nêu mốc 23:59:59 và GMT+7 | TB | Mã HAN3011 hạn 30/11/2026: lúc 30/11/2026 23:59:30 (GMT+7) áp được; lúc 01/12/2026 00:00:00 (GMT+7) bị từ chối với lỗi hết hạn |
| GAP-07 | Góc 1 | D05 | Chưa test mã hết tổng lượt | CAO | Mã HETLUOT còn hạn, đã dùng 100/100 lượt → không áp được, lỗi riêng hết lượt, tổng giữ 280.000đ |
| GAP-08 | Góc 1 | D06 | Chưa test khách dùng lại mã | CAO | Tài khoản đã đặt thành công 1 đơn với GIAM20K, nhập lại GIAM20K ở đơn mới 280.000đ → không áp được, tổng giữ 280.000đ |
| GAP-09 | Góc 1 | D07 | Test sai rule: TC-14 kỳ vọng khách không đăng nhập vẫn áp được mã, trái Q-D07-01 | TB | Sửa TC-14 thành: Validate khách chưa đăng nhập không nhập và áp được GIAM20K tại trang Thanh toán, giỏ 250.000đ |
| GAP-10 | Góc 1 | D08 | Chưa test giỏ nhiều danh mục | TB | Giỏ Áo thun 100.000đ (Thời trang) + Sách 100.000đ (Sách), phí vận chuyển 30.000đ, GIAM20K → áp được, tổng 210.000đ |
| GAP-11 | Góc 1 | D09 | TC-11 không thể hiện quy tắc ghi đè, dễ viết Expected là chặn | CAO | Áp GIAM20K (tổng 530.000đ còn 510.000đ), nhập SALE20 → chỉ còn SALE20, giảm 50.000đ (không phải 70.000đ), tổng 480.000đ |
| GAP-12 | Góc 1 | D10 | Thiếu chữ thường và khoảng trắng | TB | Nhập "giam20k" và "  GIAM20K  " với đơn 280.000đ → đều áp được, tổng 260.000đ |
| GAP-13 | Góc 1 | D11 | Chưa test làm tròn | CAO | SALE2 (2%), tạm tính 775.000đ + phí vận chuyển 20.000đ = 795.000đ → giảm 16.000đ, tổng 779.000đ |
| GAP-14 | Góc 1 | D12 | Test sai rule: TC-07 kỳ vọng đơn về 0đ, trái Q-D12-01 | CAO | GIAM300K (giảm 300.000đ, tối thiểu 200.000đ), tạm tính 250.000đ + phí vận chuyển 30.000đ → giảm 250.000đ, tổng 30.000đ. Ghi chú: TC-07 khớp ER báo cáo Pha 2 nhưng không khớp gate_status.json, cần BA chốt |
| GAP-15 | Góc 1 | D13 | Chưa test thông báo riêng theo nguyên nhân | TB | Đơn 280.000đ, lần lượt áp KHONGCO99, HETHAN1311, MIN1TR (tối thiểu 1.000.000đ), HETLUOT → 4 thông báo khác nhau theo nguyên nhân |
| GAP-16 | Góc 1 | D14 | Chưa test thời điểm trừ lượt | CAO | GIAM20K đã dùng 10/100: sau Áp dụng vẫn 10/100; sau Đặt hàng thành công là 11/100 |
| GAP-17 | Góc 1 | D15 | Chưa test hoàn lượt | TB | Hủy đơn có GIAM20K (lượt 11/100) → lượt về 10/100, tài khoản áp lại được GIAM20K |
| GAP-18 | Góc 1 | D16 | Chưa test sửa giỏ sau khi áp mã | CAO | Áp GIAM20K ở tạm tính 200.000đ + phí vận chuyển 30.000đ, giảm số lượng còn tạm tính 100.000đ → mã tự hủy, tổng 130.000đ |
| GAP-19 | Góc 1 | D18 | Chưa test tranh lượt cuối | CAO | Mã còn 1 lượt, 2 tài khoản cùng gửi Đặt hàng → 1 đơn thành công, 1 đơn bị từ chối với lỗi hết lượt. Cần BA giải mâu thuẫn Q-D14-01/Q-D18-01 trước khi viết Precondition |
| GAP-20 | Góc 1 | D19 | Chưa test mã mất hiệu lực trước Đặt hàng | CAO | Áp TATMA20K (tổng 260.000đ), Admin vô hiệu hóa mã, bấm Đặt hàng → không tạo đơn, thông báo mã không còn hiệu lực |
| GAP-21 | Góc 1 | D20 | Chưa test giảm trừ vào tổng gồm phí vận chuyển | TB | GIAM50K (giảm 50.000đ, tối thiểu 100.000đ), tạm tính 180.000đ + phí vận chuyển 30.000đ = 210.000đ → tổng 160.000đ |
| GAP-22 | Góc 1 | D21 | Test sai rule (Expected chưa rõ): TC-10 "nhập sai 5 lần" bám phương án khóa sau 5 lần đã bị loại ở Q-D21-01 | TB | Sửa TC-10 thành: nhập sai 6 mã liên tiếp rồi nhập GIAM20K → không bị khóa, áp được, tổng 260.000đ |
| GAP-23 | Góc 1 | D22 | Chưa test trạng thái chờ | TB | Mạng Slow 3G, bấm Áp dụng → spinner và nút bị vô hiệu hóa đến khi có phản hồi; bấm đúp chỉ gửi 1 yêu cầu |
| GAP-24 | Góc 1 | D23 | TC-15 chỉ có lịch sử đơn | THAP | Đặt hàng với GIAM20K → Chi tiết đơn, Lịch sử đơn và email xác nhận đều hiển thị GIAM20K và giảm 20.000đ |
| GAP-25 | Góc 1 | X01 | Chưa test phạm vi VND | TB | Áp GIAM20K → số tiền giảm 20.000 và tổng 260.000 hiển thị bằng VND, không có lựa chọn ngoại tệ |
| GAP-26 | Góc 2 | VP-06 | 0 TC Performance | TB (D22) | Như GAP-23 |
| GAP-27 | Góc 2 | VP-07 | 0 TC Accessibility | Không có D-code (VP-07 KHONG_CO_DIEM); chưa xếp mức | Chỉ dùng bàn phím: Tab tới ô Mã giảm giá, nhập GIAM20K, Tab tới Áp dụng, Enter. Expected cần BA xác nhận trước |
| GAP-28 | Góc 2 | VP-08 | 0 TC Integration (TC-14, TC-15 có nội dung Integration nhưng ghi Happy Path; TC-14 sai rule) | CAO (D14, D16, D19) | Như GAP-16, GAP-18, GAP-20 |
| GAP-29 | Góc 2 | Ngoài danh sách | TC-13 ghi viewpoint "Edge Case", không thuộc 8 viewpoint; "mất mạng giữa lúc áp voucher" chưa có rule xác nhận | Không gắn D-code; gần D22 (TB) | Xếp lại TC-13 vào VP-06 hoặc VP-02, hỏi BA Expected: mất mạng khi đang chờ phản hồi thì mã có được áp, lượt có bị tạm giữ không |
| GAP-30 | Góc 3 | B-01 | TC-03 chỉ nói dưới min order, không đúng 1đ | CAO (D03) | Tạm tính 169.999đ + phí vận chuyển 30.000đ = 199.999đ, GIAM20K → không áp được, tổng giữ 199.999đ |
| GAP-31 | Góc 3 | B-03 | Thiếu tổng cao hơn tối thiểu 1đ | CAO (D03) | Tạm tính 170.001đ + phí vận chuyển 30.000đ = 200.001đ, GIAM20K → áp được, tổng 180.001đ |
| GAP-32 | Góc 3 | B-04 | Thiếu trước ngày hết hạn 1 ngày | TB (D04) | HAN3011 hạn 30/11/2026, lúc 29/11/2026 10:00 (GMT+7) → áp được, tổng 260.000đ |
| GAP-33 | Góc 3 | B-05 | Thiếu đúng ngày hết hạn | TB (D04) | HAN3011 lúc 30/11/2026 23:59:30 (GMT+7) → áp được, tổng 260.000đ |
| GAP-34 | Góc 3 | B-06 | TC-04 không nêu mốc sau hạn | TB (D04) | HAN3011 lúc 01/12/2026 00:00:00 (GMT+7) → không áp được, lỗi hết hạn |
| GAP-35 | Góc 3 | B-07 | Thiếu tiền giảm nhỏ hơn tiền hàng | CAO (D12) | GIAM20K, tạm tính 250.000đ + phí vận chuyển 30.000đ → giảm 20.000đ, tổng 260.000đ |
| GAP-36 | Góc 3 | B-08 | Thiếu tiền giảm bằng tiền hàng (TC-07 so với tổng đơn và sai rule) | CAO (D12) | GIAM300K, tạm tính 300.000đ + phí vận chuyển 30.000đ → giảm 300.000đ, tổng 30.000đ |
| GAP-37 | Góc 3 | B-09 | Thiếu tiền giảm lớn hơn tiền hàng | CAO (D12) | GIAM300K, tạm tính 250.000đ + phí vận chuyển 30.000đ → giảm 250.000đ, tổng 30.000đ |

## Thống kê

| Góc | COVER | MOT_PHAN | CHUA_COVER |
|---|---|---|---|
| Góc 1. Requirement (29 dòng: 5 BR, 23 D-code, 1 mã X) | 4 | 7 | 18 |
| Góc 2. Viewpoint (8 viewpoint; có TC = COVER, 0 TC = CHUA_COVER) | 5 | 0 | 3 |
| Góc 3. Boundary (9 điểm) | 1 | 2 | 6 |

Tổng gap: 37 (25 ở Góc 1, 4 ở Góc 2 gồm 3 viewpoint 0 TC và 1 TC ngoài danh sách, 8 ở Góc 3). Trong đó 3 gap loại "Test sai rule": GAP-09 (TC-14, Q-D07-01), GAP-14 (TC-07, Q-D12-01), GAP-22 (TC-10, Q-D21-01).

## Tóm tắt gap cài sẵn trong bộ Lab 4

1. Test sai rule: TC-14 trái Q-D07-01; TC-07 trái Q-D12-01; TC-10 bám phương án đã bị loại của Q-D21-01.
2. Viewpoint ngoài danh sách: TC-13 "Edge Case".
3. Viewpoint 0 TC: Performance, Accessibility, Integration.
4. Thiếu điểm biên: B-03, B-04, B-05, B-07, B-08, B-09 chưa có; B-01, B-06 chỉ một phần.
5. D-code CAO chưa phủ: D02, D05, D06, D11, D12, D14, D16, D18, D19.
