---
name: missing-rule-classification
description: Xếp mỗi điểm có trạng thái MO_HO, KHONG_DE_CAP hoặc MAU_THUAN vào 1 trong 5 nhóm Missing Rule và gán mức rủi ro CAO, TB, THAP. Dùng ở Pha 2.
---

# Phân loại Missing Rule

Toàn bộ các điểm có trạng thái `MO_HO`, `KHONG_DE_CAP` hoặc `MAU_THUAN` bắt buộc phải được phân loại vào đúng 1 trong 5 nhóm sau:
1. **Implicit assumption (Giả định ngầm):** Điều hiển nhiên ai cũng ngầm hiểu nên tài liệu không viết ra (Ví dụ: "Mỗi đơn chỉ được dùng 1 mã" - tài liệu không ghi nhưng ngầm mặc định). Rủi ro: CAO.
2. **Edge case bị bỏ qua:** Tình huống xảy ra ở biên, hiếm gặp nhưng hoàn toàn có thật (Ví dụ: Mã hết hạn đúng giây khách bấm đặt hàng; tiền giảm cố định lớn hơn tiền hàng). Rủi ro: CAO.
3. **Conflict giữa rule (Xung đột quy tắc):** Sự mâu thuẫn giữa hai tài liệu hoặc giữa spec và hệ thống thực tế (Ví dụ: Một tài liệu nói phải đăng nhập, một chỗ khác cho khách vãng lai thanh toán). Rủi ro: TB.
4. **Non-functional bị ignore (Bỏ qua phi chức năng):** Thiếu yêu cầu về thời gian phản hồi, bảo mật chống brute-force, hoặc giới hạn chịu tải. Rủi ro: TB.
5. **Rollback/Undo (Thiếu luồng hoàn tác):** Tài liệu chỉ mô tả chiều tiến (thành công) mà không có chiều lùi (hủy đơn, hoàn lượt dùng, thanh toán lỗi). Rủi ro: TB.

**Quy tắc ưu tiên khi một điểm rơi vào nhiều nhóm:**
`Conflict giữa rule` > `Rollback/Undo` > `Non-functional bị ignore` > `Edge case bị bỏ qua` > `Implicit assumption`.

**Nguyên tắc vàng khi phát biểu Missing Rule:**
- Chỉ viết điều tài liệu **chưa nói**. Tuyệt đối không tự đưa ra đáp án.
- Viết đúng: *"Chưa quy định khi số tiền giảm cố định lớn hơn tổng tiền hàng thì tổng đơn hàng xử lý như thế nào."*
- Viết sai: *"Hệ thống phải chặn để tổng đơn hàng không bị âm."* (Đây là tự suy đoán giải pháp).
