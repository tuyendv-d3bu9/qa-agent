## KỸ NĂNG: REQUIREMENT AUTOPSY

Mục đích: đối chiếu đề bài với Domain Checklist D01–D23 trong TRI THỨC NGÀNH, lập danh sách missing rule và câu hỏi gửi BA.

### Nhãn trạng thái

| Nhãn | Khi nào |
|---|---|
| `RO` | Đề bài có quy tắc đủ cụ thể để viết Expected Result |
| `MO_HO` | Đề bài có nhắc tới chủ đề (kể cả quy định chung toàn hệ thống) nhưng thiếu giá trị hoặc điều kiện để viết Expected Result |
| `KHONG_DE_CAP` | Đề bài không nhắc tới chủ đề |
| `MAU_THUAN` | Hai nguồn nói khác nhau: giữa 2 file đề bài, hoặc giữa đề bài và quan sát thực tế người dùng cung cấp |

### 5 loại missing rule

| Loại | Định nghĩa | Dấu hiệu |
|---|---|---|
| Implicit assumption | Điều ai cũng ngầm hiểu nên không ai viết ra | Đọc xong thấy "chắc là vậy" |
| Edge case bị bỏ qua | Tình huống ở biên, hiếm nhưng có thật | Có ngưỡng, thời hạn, giới hạn |
| Conflict giữa rule | Hai nguồn nói khác nhau | Tài liệu và tài liệu, hoặc tài liệu và thực tế không khớp |
| Non-functional bị ignore | Thiếu yêu cầu về tốc độ, bảo mật, chịu tải | Không có con số thời gian, không nói giới hạn |
| Rollback/Undo | Thiếu luồng quay lại, hủy, hoàn | Chỉ có luồng tiến, không có luồng lùi |

Thuộc nhiều loại thì chọn theo thứ tự: Conflict giữa rule > Rollback/Undo > Non-functional bị ignore > Edge case bị bỏ qua > Implicit assumption.

### Rủi ro và Priority

| Rủi ro | Khi nào | Priority |
|---|---|---|
| `CAO` | Có thể tính sai tiền, mất doanh thu, hoặc bị lạm dụng mã | P1 |
| `TB` | Ảnh hưởng trải nghiệm hoặc vận hành, có cách xử lý tạm | P2 |
| `THAP` | Ảnh hưởng hiển thị, lưu vết, ít tác động tiền | P3 |

### Cách viết missing rule

- Viết điều đề bài CHƯA nói. Không viết đáp án.
- Đúng: "Chưa quy định mã giảm cố định lớn hơn tiền hàng thì xử lý thế nào."
- Sai: "Hệ thống phải chặn để tổng tiền không âm."

### Quy trình

1. Phần A: với từng D-code D01 → D23, đọc "Câu hỏi kiểm tra" trong Domain Checklist, tìm trong đề bài, gán nhãn trạng thái. Đối chiếu kết quả 6W để không bỏ sót bằng chứng. Cột W-ID lấy từ cột "W liên quan" của checklist.
2. Phần B: mỗi D-code `MO_HO`, `KHONG_DE_CAP` hoặc `MAU_THUAN` thành một dòng MR. MR-ID = "MR-" + số của D-code (D02 → MR-02).
   - Loại và Rủi ro lấy theo cột gợi ý trong checklist. Chỉ đổi khi đề bài hoặc quan sát thực tế cho bằng chứng, ghi lý do ở cột Ghi chú.
   - Priority suy ra từ Rủi ro.
   - Kịch bản ảnh hưởng: 1 tình huống cụ thể, có số tiền VND.
   - Câu hỏi BA: câu hỏi đóng.
3. Phần C: đếm thống kê từ Phần A và Phần B.
4. Phần D: câu hỏi BA của mọi MR có Priority P1, theo thứ tự MR-ID.
5. Phần E: ghi dòng v1 với ngày hôm nay.

### Khi người dùng cung cấp quan sát thực tế

1. So quan sát với đề bài. Khác nhau thì D-code liên quan đổi sang `MAU_THUAN`, ghi thêm quan sát vào cột bằng chứng.
2. MR tương ứng đổi Loại thành Conflict giữa rule, ghi lý do ở Ghi chú. Câu hỏi BA viết lại theo hướng "tài liệu đúng hay hệ thống đúng". Giữ nguyên Rủi ro và Priority.
3. Cập nhật lại Phần C. Thêm một dòng vào Phần E.
4. Chỉ sửa các dòng liên quan. Giữ nguyên mọi dòng khác.
