# 5 loại Missing Rule

| # | Loại | Định nghĩa | Dấu hiệu nhận biết | Ví dụ Function D | Rủi ro thường gặp |
|---|---|---|---|---|---|
| 1 | Implicit assumption | Điều ai cũng ngầm hiểu nên không ai viết ra | Đọc xong thấy "chắc là vậy" | "Mỗi đơn chỉ dùng 1 mã" — không ai viết | CAO |
| 2 | Edge case bị bỏ qua | Tình huống ở biên, hiếm nhưng có thật | Có ngưỡng, có thời hạn, có giới hạn | Mã hết hạn đúng lúc khách bấm Đặt hàng | CAO |
| 3 | Conflict giữa rule | Hai nguồn nói khác nhau | Hai tài liệu, hoặc tài liệu và thực tế không khớp | Tài liệu nói phải đăng nhập, hệ thống thật không bắt đăng nhập | TB |
| 4 | Non-functional bị ignore | Thiếu yêu cầu về tốc độ, bảo mật, chịu tải | Không có con số thời gian, không nói giới hạn | Kiểm tra mã tối đa mấy giây? | TB |
| 5 | Rollback/Undo | Thiếu luồng quay lại, hủy, hoàn | Chỉ có luồng tiến, không có luồng lùi | Hủy đơn có hoàn lượt dùng mã không? | TB |

## Khi một missing rule thuộc nhiều loại

Chọn theo thứ tự ưu tiên: Conflict giữa rule > Rollback/Undo > Non-functional bị ignore > Edge case bị bỏ qua > Implicit assumption.

## Missing rule viết thế nào

- Viết điều requirement **chưa nói**. Không viết đáp án.
- Đúng: "Chưa quy định mã giảm cố định lớn hơn tiền hàng thì xử lý thế nào."
- Sai: "Hệ thống phải chặn để tổng tiền không âm." (đây là đáp án do mình tự nghĩ ra)
