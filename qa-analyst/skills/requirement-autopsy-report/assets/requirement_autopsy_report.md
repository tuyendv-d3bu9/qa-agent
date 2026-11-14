# Khuôn báo cáo Requirement Autopsy (Pha 2)

Cấu trúc báo cáo bao gồm 4 phần:
- **Phần A: Bảng mổ xẻ yêu cầu (Requirement Autopsy):**
  - Cột: Mã D-code | Tên khía cạnh | Bằng chứng trong INPUT | Trạng thái (`RO`, `MO_HO`, `KHONG_DE_CAP`, `MAU_THUAN`) | Đánh giá chi tiết.
- **Phần B: Bảng phân tích Missing Rule và Câu hỏi BA:**
  - Cột: Mã D-code | Nhóm Missing Rule (theo 5 nhóm) | Mức độ rủi ro (`CAO`, `TB`, `THAP`) | Điều tài liệu chưa nói | Câu hỏi đóng cho BA | Câu trả lời đã xác nhận (từ gate) | Expected Result tương ứng.
- **Phần C: Bảng tự kiểm định chất lượng theo FACT:**
  - Bảng 10 tiêu chí từ F1 đến T2, ghi rõ kết quả `DAT` / `KHONG_DAT` kèm dẫn chứng.
- **Phần D: Bảng thống kê định lượng:**
  - Bảng tổng hợp số lượng: Tổng D-code kiểm tra, số quy tắc rõ ràng, số điểm mơ hồ/thiếu, phân bố theo 5 nhóm Missing Rule, phân bố theo mức độ rủi ro.
