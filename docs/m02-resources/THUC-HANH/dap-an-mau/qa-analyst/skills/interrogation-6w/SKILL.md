---
name: interrogation-6w
description: Tra hỏi tài liệu trong INPUT/ theo 6 góc W1–W6 để tìm điều chưa được nói rõ. Dùng ở Pha 1, trước khi viết câu hỏi làm rõ.
---

# Tra hỏi 6W

Áp dụng 6 góc nhìn tra hỏi để tìm ra những gì tài liệu chưa đề cập:
- **W1 (What if input lạ):** Người dùng nhập gì ngoài dự kiến? (Rỗng, khoảng trắng đầu/cuối, chữ thường/hoa, emoji, ký tự đặc biệt, chuỗi cực dài, dán từ clipboard, bấm liên tục).
- **W2 (What if state lạ):** Trạng thái hệ thống, giỏ hàng hoặc phiên lúc thao tác thế nào? (Chưa đăng nhập, đã áp sẵn 1 mã, muốn gỡ mã, quay lại sửa giỏ hàng, phiên đăng nhập hết hạn).
- **W3 (What if data lạ):** Giá trị dữ liệu nào nằm ở biên hoặc ngoài khoảng bình thường? (Đúng bằng đơn tối thiểu, tiền giảm vượt tiền hàng, số lẻ phần trăm, mã không có giới hạn trần, giỏ hàng lẫn lộn sản phẩm được giảm và không được giảm).
- **W4 (What when timing):** Chuyện gì xảy ra khi thời điểm hoặc thứ tự thao tác thay đổi? (Đúng giây hết hạn 23:59:59, áp mã trước nửa đêm nhưng đặt hàng sau nửa đêm, 2 thiết bị dùng mã ở lượt cuối, mạng chậm/mất kết nối khi đang kiểm tra).
- **W5 (Who else actor):** Ngoài khách hàng đang mua, ai khác tác động vào luồng này? (Khách mới so với khách cũ, dùng lại mã trên tài khoản khác, Admin tắt mã giữa chừng, bot dò quét mã, CSKH hủy đơn sau khi đặt).
- **W6 (What happens after):** Dữ liệu và trạng thái biến đổi thế nào sau hành động? (Thời điểm trừ lượt dùng, hủy đơn có được trả lại mã, thanh toán thất bại có giữ mã, thay đổi địa chỉ giao hàng làm đổi phí ship có tính lại mã, thông tin mã có lưu vào email/hóa đơn).

Cách gán nhãn cho từng câu hỏi 6W:
- `CO`: Tài liệu trong `INPUT/` đã nêu rõ ràng, đủ để viết Expected Result cụ thể.
- `MOT_PHAN`: Tài liệu có nhắc đến chủ đề nhưng chưa nêu quy tắc xử lý chi tiết.
- `KHONG`: Tài liệu hoàn toàn không nhắc đến khía cạnh này.

Đọc kèm: `knowledge/voucher-domain.md` (cột W liên quan).
