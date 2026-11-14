# Tri thức ngành — Voucher thương mại điện tử

*Lưu ý cốt tử: Phần này là tri thức tham khảo chuẩn ngành, KHÔNG phải đặc tả riêng của dự án. Dùng để biết cần hỏi những gì, TUYỆT ĐỐI KHÔNG dùng để tự khẳng định hành vi của hệ thống khi tài liệu trong `INPUT/` chưa nêu.*

#### A. Thuật ngữ nghiệp vụ chuẩn
- Voucher / Mã giảm giá: Chuỗi ký tự người dùng nhập để được chiết khấu tiền đơn hàng (trên UI ShopGo hiển thị là "Mã giảm giá").
- Mã giảm theo phần trăm (%): Giảm theo tỷ lệ phần trăm trên giá trị tiền hàng hợp lệ; thường bắt buộc phải có mức giảm tối đa (trần giảm).
- Mã giảm số tiền cố định: Giảm một lượng tiền cụ thể (ví dụ giảm 50.000đ); có nguy cơ số tiền giảm lớn hơn tiền hàng nếu không có quy định chặn.
- Mã Freeship: Giảm hoặc miễn phí tiền vận chuyển; vận hành độc lập hoặc kết hợp với mã giảm giá tiền hàng.
- Đơn hàng tối thiểu (Min order): Giá trị ngưỡng tối thiểu để mã có hiệu lực. Cần làm rõ: tính trên tiền hàng tạm tính trước giảm hay tính trên tổng tiền sau khi cộng phí vận chuyển.
- Trần giảm (Max cap): Số tiền giảm tối đa của một mã giảm theo phần trăm (ví dụ: 10%, tối đa 50.000đ).
- Tổng lượt dùng (Usage limit): Tổng số lần mã có thể được sử dụng trên toàn hệ thống (ví dụ: 1.000 lượt).
- Lượt dùng mỗi khách hàng (Per-user limit): Số lần tối đa một tài khoản khách hàng được áp dụng mã.
- Cộng dồn (Stacking): Khả năng áp dụng đồng thời nhiều mã trên cùng một đơn hàng.
- Phạm vi áp dụng (Scope): Danh mục sản phẩm hoặc ngành hàng cụ thể được hưởng ưu đãi (toàn bộ giỏ hàng hay từng sản phẩm riêng lẻ).
- Giữ chỗ lượt dùng (Reserve): Trạng thái tạm khóa 1 lượt dùng khi người dùng áp dụng mã thành công tại trang thanh toán nhưng chưa hoàn tất đặt hàng.
- Tạm tính (Subtotal): Tổng tiền của các sản phẩm trong giỏ hàng trước khi tính chiết khấu và phí vận chuyển.

#### B. Vòng đời của mã giảm giá
- Phía quản trị (Admin): Nháp -> Đang kích hoạt -> Hết hạn hiệu lực / Hết tổng lượt dùng / Bị vô hiệu hóa thủ công (Admin).
- Phía khách hàng trong một đơn hàng:
  - Chưa áp dụng -> Đang kiểm tra -> Đã áp dụng -> Đã sử dụng (Đặt hàng thành công) -> Hoàn trả lượt dùng (Hủy đơn/Thanh toán thất bại).
  - Đã áp dụng -> Đã gỡ bỏ mã (Khách chủ động gỡ hoặc sửa đổi giỏ hàng làm mất điều kiện).
  - Quy chuẩn ngành: Mã giảm giá phải được hệ thống kiểm tra ít nhất 2 lần: Thời điểm khách bấm nút "Áp dụng" và Thời điểm khách bấm nút "Đặt hàng".

#### C. Quy tắc tính toán tiền tệ phổ biến
- Mã phần trăm có trần: Tiền giảm = Min(Tạm tính x Tỷ lệ %, Trần giảm).
- Mã số tiền cố định: Tiền giảm = Min(Giá trị mã, Tạm tính). Tổng tiền hàng không bao giờ được phép âm.
- Ngưỡng đơn tối thiểu: "Đạt" thông lệ là lớn hơn hoặc bằng (>=) ngưỡng quy định. So sánh dựa trên tạm tính trước giảm, chưa gồm phí ship.
- Làm tròn số tiền lẻ: Thống nhất nguyên tắc làm tròn (làm tròn xuống hay làm tròn số học) đến đơn vị đồng (VND), đồng bộ từ giao diện, cơ sở dữ liệu đến cổng thanh toán bên thứ ba.
- Phí vận chuyển: Tính toán độc lập với tiền hàng; mã giảm giá thông thường không chiết khấu trên phí vận chuyển.

#### D. Các lỗi nghiệp vụ (Bug) điển hình ngoài thực tế
- E1: Áp mã thành công, sau đó quay lại giỏ bớt hàng xuống dưới mức đơn tối thiểu nhưng hệ thống vẫn giữ nguyên tiền giảm giá.
- E2: Mã chỉ còn 1 lượt dùng nhưng hai tài khoản trên hai thiết bị bấm đặt hàng cùng một giây thì cả hai đơn đều thành công.
- E3: Mã hết hạn lúc 00:00 nhưng đơn hàng đặt lúc 00:01 vẫn áp dụng thành công do chỉ kiểm tra lúc nhập mã.
- E4: Mã giảm cố định lớn hơn tổng tiền hàng dẫn đến tổng tiền đơn hàng bị âm.
- E5: Lệch vài đồng giữa số tiền hiển thị trên màn hình, số tiền trên hóa đơn và số tiền trừ qua cổng thanh toán do cơ chế làm tròn không đồng nhất.
- E6: Khách hàng hủy đơn hoặc thanh toán qua thẻ thất bại nhưng bị mất luôn lượt dùng mã.
- E7: Mọi lỗi nhập mã đều hiển thị chung một câu "Mã không hợp lệ", không phân biệt được hết hạn, hết lượt hay chưa đủ điều kiện.
- E8: Bị dò mã hàng loạt do hệ thống không giới hạn số lần nhập sai liên tiếp.
- E9: Người dùng có thể sửa request API để tự thay đổi số tiền được giảm giá vì máy chủ tin tưởng dữ liệu từ phía giao diện.

#### E. Danh mục kiểm tra nghiệp vụ miền Voucher (Checklist D01 - D23)

Loại gợi ý và Rủi ro gợi ý là mặc định. Chỉ đổi khi `INPUT/` hoặc câu trả lời đã xác nhận ở cổng chặn cho bằng chứng, và phải ghi lý do.

| D-code | Nội dung kiểm tra | Loại gợi ý | Rủi ro gợi ý | W liên quan |
|---|---|---|---|---|
| D01 | Loại mã giảm giá (Phần trăm, số tiền cố định, freeship). | Implicit assumption | TB | — |
| D02 | Trần giảm của mã phần trăm (Số tiền giảm tối đa). | Implicit assumption | CAO | W3 |
| D03 | Cơ sở tính và ngưỡng đơn tối thiểu (Tạm tính hay tổng tiền, quy định dấu >= hay >). | Implicit assumption | CAO | W3 |
| D04 | Mốc thời gian hiệu lực (Ngày bắt đầu, giờ hết hạn, múi giờ áp dụng). | Edge case bị bỏ qua | TB | W4 |
| D05 | Tổng lượt dùng toàn hệ thống (Số lượt tối đa, cách xử lý khi hết lượt). | Implicit assumption | CAO | W4 |
| D06 | Giới hạn lượt dùng mỗi khách hàng (Số lần mỗi khách, phương thức nhận diện khách). | Implicit assumption | CAO | W5 |
| D07 | Đối tượng áp dụng và điều kiện đăng nhập (Bắt buộc đăng nhập hay cho phép khách vãng lai). | Implicit assumption | TB | W2, W5 |
| D08 | Phạm vi áp dụng của sản phẩm (Toàn sàn hay một số danh mục hàng hóa). | Implicit assumption | TB | W3 |
| D09 | Quy tắc cộng dồn (Dùng nhiều mã/đơn hay tối đa 1 mã, cơ chế ghi đè khi nhập mã mới). | Implicit assumption | CAO | W2 |
| D10 | Tiêu chí mã hợp lệ (Phân biệt hoa/thường, khoảng trắng thừa, độ dài, ký tự đặc biệt). | Implicit assumption | TB | W1 |
| D11 | Quy tắc làm tròn số tiền lẻ (Làm tròn lên, xuống hay làm tròn gần nhất đến đơn vị nào). | Implicit assumption | CAO | W3 |
| D12 | Xử lý khi số tiền giảm vượt quá tiền hàng (Chặn không cho tổng tiền âm). | Edge case bị bỏ qua | CAO | W3 |
| D13 | Nội dung và vị trí thông báo lỗi (Tách biệt thông báo lỗi theo từng nguyên nhân cụ thể). | Implicit assumption | TB | W1 |
| D14 | Thời điểm chính thức trừ lượt dùng (Lúc bấm áp dụng hay lúc đặt hàng thành công). | Implicit assumption | CAO | W6 |
| D15 | Cơ chế hoàn lượt dùng mã (Hủy đơn hàng, thanh toán trực tuyến thất bại). | Rollback/Undo | TB | W5, W6 |
| D16 | Xử lý khi giỏ hàng hoặc phiên thay đổi sau khi đã áp mã (Sửa giỏ, phiên hết hạn). | Edge case bị bỏ qua | CAO | W2 |
| D17 | Luồng gỡ bỏ mã hoặc thay đổi mã khác (Giao diện nút gỡ, cách tính lại tổng tiền). | Rollback/Undo | TB | W2 |
| D18 | Xử lý thao tác đồng thời (Hai người cùng dùng mã ở lượt cuối cùng). | Edge case bị bỏ qua | CAO | W4 |
| D19 | Mã mất hiệu lực giữa luồng thao tác (Admin tắt mã hoặc mã hết hạn khi khách đang thanh toán). | Edge case bị bỏ qua | CAO | W4, W5 |
| D20 | Mối quan hệ giữa mã giảm giá và phí vận chuyển (Trừ tiền hàng hay trừ phí ship). | Implicit assumption | TB | W6 |
| D21 | Cơ chế phòng chống gian lận và dò mã (Giới hạn số lần thử sai, máy chủ tự tính tiền giảm). | Non-functional bị ignore | TB | W1, W5 |
| D22 | Thời gian phản hồi và trạng thái chờ (Timeout kiểm tra mã, loading chặn bấm đúp). | Non-functional bị ignore | TB | W4 |
| D23 | Lưu vết thông tin mã trên đơn hàng (Hiển thị chi tiết mã và tiền giảm trong hóa đơn, email). | Implicit assumption | THAP | W6 |
