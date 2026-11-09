## TRI THỨC NGÀNH: VOUCHER TRONG THƯƠNG MẠI ĐIỆN TỬ VIỆT NAM

Phần này là tri thức ngành, KHÔNG phải requirement của ShopGo. Dùng để biết cần hỏi gì. Mọi "thông lệ" ở đây có thể đúng ở hệ thống khác nhưng sai ở ShopGo.

### Cách tính tiền thường gặp

| Trường hợp | Cách tính thường gặp | Ví dụ |
|---|---|---|
| Mã % có trần | Giảm = min(tạm tính × %, trần) | Tạm tính 600.000đ, 10%, trần 50.000đ → giảm 50.000đ, còn 550.000đ |
| Mã cố định | Giảm = min(giá trị mã, tạm tính) | Mã 100.000đ, tạm tính 80.000đ → giảm 80.000đ, tiền hàng 0đ |
| Đơn tối thiểu | So tạm tính trước giảm với ngưỡng, "đạt" là lớn hơn hoặc bằng | Ngưỡng 200.000đ: 199.999đ không đạt, 200.000đ đạt |
| Làm tròn | Làm tròn xuống tới 1đ hoặc tới 1.000đ | 199.999đ × 15% = 29.999,85đ → 29.999đ hay 30.000đ? |
| Phí ship | Tính riêng, không nằm trong cơ sở tính mã giảm giá | Mã giảm giá trừ tiền hàng, mã freeship trừ phí ship |

Thông lệ: mã được kiểm tra hai lần, lúc bấm Áp dụng và lúc bấm Đặt hàng.

### Bug hay gặp ngoài thực tế

| # | Bug | Vì sao xảy ra |
|---|---|---|
| E1 | Áp mã xong, bớt hàng xuống dưới đơn tối thiểu vẫn giữ giảm giá | Chỉ kiểm tra mã lúc bấm Áp dụng |
| E2 | Mã 1 lượt dùng được 2 lần bằng 2 tab | Không khóa lượt khi đặt hàng đồng thời |
| E3 | Mã hết hạn lúc 00:00 vẫn đặt hàng được | Không kiểm tra lại lúc đặt hàng |
| E4 | Mã cố định lớn hơn tiền hàng làm tổng tiền âm | Không chặn số tiền giảm |
| E5 | Tiền giảm lệch vài đồng giữa màn hình và hóa đơn | Làm tròn ở 2 chỗ theo 2 cách |
| E6 | Hủy đơn nhưng khách mất lượt dùng mã | Không có luồng hoàn lượt |
| E7 | Mọi lỗi đều hiện "Mã không hợp lệ" | Không tách thông báo theo nguyên nhân |
| E8 | Dò được mã thật bằng script | Không giới hạn số lần nhập sai |
| E9 | Sửa request để tự đặt số tiền giảm | Server tin số tiền giảm từ trình duyệt |

### Lưu ý pháp lý (tham khảo)

Nghị định 81/2018/NĐ-CP có quy định mức giảm giá tối đa trong khuyến mại. Quy định có thể đã được sửa đổi. Chỉ dùng để hỏi BA: "Mã giảm % của ShopGo có bị giới hạn mức giảm tối đa theo quy định khuyến mại không?"

### Domain Checklist D01–D23

| D-code | Chủ đề | Câu hỏi kiểm tra | Thông lệ ngành | Loại gợi ý | Rủi ro gợi ý | W liên quan |
|---|---|---|---|---|---|---|
| D01 | Loại mã | Có những loại mã nào? | %, số tiền cố định, freeship | Implicit assumption | TB | — |
| D02 | Trần giảm của mã % | Mã % có giới hạn số tiền giảm tối đa? Bao nhiêu? | Mã % gần như luôn có trần | Implicit assumption | CAO | W3-4 |
| D03 | Cơ sở và ngưỡng đơn tối thiểu | Đơn tối thiểu tính trên số tiền nào? "Đạt" là ≥ hay >? | Tạm tính trước giảm, chưa gồm ship; "đạt" là ≥ | Implicit assumption | CAO | W3-1 |
| D04 | Mốc thời gian hiệu lực | Có ngày bắt đầu? Hết hạn lúc mấy giờ, múi giờ nào? | Hết hạn 23:59:59 ngày cuối, giờ Việt Nam | Edge case bị bỏ qua | TB | W4-1 |
| D05 | Tổng lượt dùng | Mã có tổng số lượt? Hết lượt báo gì? | Có tổng lượt, báo riêng "hết lượt" | Implicit assumption | CAO | W4-4 |
| D06 | Lượt dùng mỗi khách | Một khách dùng được mấy lần? Nhận diện khách bằng gì? | 1 lượt/khách, theo tài khoản | Implicit assumption | CAO | W5-2 |
| D07 | Đối tượng được dùng và đăng nhập | Ai được dùng mã? Có bắt buộc đăng nhập? | Thường yêu cầu đăng nhập để kiểm soát lượt | Implicit assumption | TB | W2-1, W5-1 |
| D08 | Phạm vi sản phẩm | Áp cho cả giỏ hay một số ngành hàng/sản phẩm? | Có mã toàn shop và mã theo ngành hàng | Implicit assumption | TB | W3-5 |
| D09 | Cộng dồn | Một đơn dùng mấy mã? Nhập mã thứ 2 thì thay mã cũ hay báo lỗi? | 1 mã giảm giá/đơn, có thể kèm 1 mã freeship | Implicit assumption | CAO | W2-2 |
| D10 | Định nghĩa mã hợp lệ | "Hợp lệ" gồm những điều kiện gì? Định dạng, độ dài, hoa/thường? | Không phân biệt hoa/thường, cắt khoảng trắng đầu/cuối | Implicit assumption | TB | W1-2, W1-3, W1-4 |
| D11 | Làm tròn | Tiền giảm lẻ làm tròn lên, xuống hay gần nhất? Tới đơn vị nào? | Làm tròn xuống, thống nhất mọi nơi hiển thị | Implicit assumption | CAO | W3-3 |
| D12 | Giảm vượt tiền hàng | Mã giảm lớn hơn tiền hàng thì tổng tiền là bao nhiêu? | Giảm không vượt tiền hàng, tổng không âm | Edge case bị bỏ qua | CAO | W3-2 |
| D13 | Thông báo lỗi | Mỗi nguyên nhân thất bại có thông báo riêng? Nội dung, vị trí? | Tách theo nguyên nhân: không tồn tại, hết hạn, chưa đủ đơn tối thiểu, hết lượt | Implicit assumption | TB | W1-1 |
| D14 | Thời điểm trừ lượt | Trừ lượt lúc bấm Áp dụng hay lúc đặt hàng thành công? | Giữ chỗ khi áp, trừ khi đặt hàng thành công | Implicit assumption | CAO | W6-1 |
| D15 | Hoàn lượt | Hủy đơn, thanh toán thất bại: mã có được trả lại? | Thanh toán thất bại thì trả mã | Rollback/Undo | TB | W5-5, W6-2, W6-3 |
| D16 | Giỏ hoặc phiên thay đổi sau khi áp | Sửa giỏ, quay lại, phiên hết hạn: mã có được kiểm tra lại? | Kiểm tra lại mỗi lần giỏ đổi | Edge case bị bỏ qua | CAO | W2-4, W2-5 |
| D17 | Gỡ hoặc đổi mã | Khách gỡ mã, đổi mã khác được không? Tổng tiền tính lại thế nào? | Có nút gỡ mã, mã mới thay mã cũ | Rollback/Undo | TB | W2-3 |
| D18 | Dùng đồng thời | Hai thiết bị cùng dùng một mã còn 1 lượt thì sao? | Chỉ một đơn thành công | Edge case bị bỏ qua | CAO | W4-3 |
| D19 | Mã mất hiệu lực giữa luồng | Mã hết hạn hoặc bị tắt sau khi áp, trước khi đặt hàng? | Kiểm tra lại lúc đặt hàng, báo khách | Edge case bị bỏ qua | CAO | W4-2, W5-3 |
| D20 | Mã và phí ship | Mã trừ trên tiền hàng hay cả phí ship? Phí ship đổi thì tính lại? | Mã giảm giá trừ tiền hàng, ship tính riêng | Implicit assumption | TB | W6-4 |
| D21 | Chống dò và giả mạo | Giới hạn số lần nhập sai? Server tự tính tiền giảm? | Giới hạn nhập sai, server tự tính | Non-functional bị ignore | TB | W1-5, W5-4 |
| D22 | Thời gian phản hồi | Kiểm tra mã tối đa bao lâu? Có trạng thái đang xử lý? | Vài giây, có loading, chặn bấm lặp | Non-functional bị ignore | TB | W4-5 |
| D23 | Lưu vết trên đơn | Mã và tiền giảm có hiện trên chi tiết đơn, email xác nhận? | Lưu vào đơn, hiện trên email | Implicit assumption | THAP | W6-5 |
