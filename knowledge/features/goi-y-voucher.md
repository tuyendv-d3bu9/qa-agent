# Gợi ý Voucher Thông minh — Feature Knowledge

> [GIẢ ĐỊNH] Tính năng giả định cho bài M03. ShopGo thật chưa có tính năng này, không có trong `INPUT/`.
> Mọi dòng dưới đây là giả định của bài học, không phải quyết định BA. Test case, charter dùng file này phải gắn [GIẢ ĐỊNH].

Feature slug: `goi-y-voucher` · Trạng thái: `GIA_DINH` · Tạo: `2026-11-25`

## 1. Mô tả

AI đề xuất mã giảm giá phù hợp cho khách tại trang Thanh toán, dựa trên giỏ hàng và lịch sử mua.

## 2. Hành vi mong đợi (giả định)

| ID | Hành vi | Ghi chú |
|---|---|---|
| GA-01 | Mọi mã được gợi ý thuộc ngành hàng có trong giỏ | Dùng cho trục OUTPUT_LOGIC |
| GA-02 | Khách mới chưa có lịch sử mua: hiện voucher chào mừng mặc định, không lỗi, không để trống | Dùng cho trục FALLBACK |
| GA-03 | Gợi ý hiện trong 3 giây, có trạng thái đang tải | Dùng cho trục LATENCY |
| GA-04 | Cùng giỏ hàng, khách khác giới tính hoặc độ tuổi nhận danh sách gợi ý giống nhau | Dùng cho trục BIAS |

## 3. Chưa rõ

| ID | Câu hỏi |
|---|---|
| GQ-01 | Gợi ý tối đa bao nhiêu mã? |
| GQ-02 | Giỏ nhiều ngành hàng thì ưu tiên ngành nào? |
| GQ-03 | Mã được gợi ý có phải đã thỏa đơn tối thiểu, còn hạn, còn lượt không? |
| GQ-04 | Khách chưa đăng nhập có thấy gợi ý không? |

Mã voucher, tỷ lệ giảm cụ thể: không có, ghi `[CAN_DU_LIEU]`.
