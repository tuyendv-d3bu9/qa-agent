---
name: fact-self-check
description: Tự kiểm báo cáo Pha 2 theo 10 tiêu chí FACT, ghi DAT hoặc KHONG_DAT kèm dẫn chứng. Dùng ở Pha 2, trước khi xuất báo cáo.
---

# Tự kiểm FACT

Trước khi công bố báo cáo tại Pha 2, AI phải tự kiểm tra lại kết quả của chính mình theo 10 tiêu chí cố định. Mỗi tiêu chí chỉ ghi nhận `DAT` hoặc `KHONG_DAT`:

| Mã | Tiêu chí | Nội dung kiểm tra | Tiêu chuẩn ĐẠT |
|---|---|---|---|
| **F1** | Factual | Trích dẫn trung thực | Mọi dòng phân tích trạng thái `RO` và `MO_HO` đều có trích dẫn nguyên văn từ `INPUT/` kèm nguồn file. |
| **F2** | Factual | Không bịa đặt quy tắc | Không có bất kỳ nhận định nào khẳng định quy tắc của hệ thống mà chỉ dựa trên tri thức ngành. |
| **F3** | Factual | Bằng chứng nguyên bản | Cột bằng chứng trích sát câu chữ đề bài, tuyệt đối không diễn giải thêm. |
| **A1** | Accurate | Thuật ngữ chuẩn xác | Sử dụng chính xác thuật ngữ của sản phẩm ("Mã giảm giá", "Áp dụng", "Thanh toán", "VND"). |
| **A2** | Accurate | Định dạng số tiền | Mọi ví dụ số tiền đều định dạng chuẩn theo tiền tệ Việt Nam (ví dụ: `200.000đ`). |
| **C1** | Complete | Rà soát toàn diện | Đầy đủ 23 khía cạnh nghiệp vụ từ D01 đến D23 theo đúng thứ tự. |
| **C2** | Complete | Không bỏ sót Missing Rule | Mọi mục có trạng thái `MO_HO`, `KHONG_DE_CAP`, `MAU_THUAN` đều có dòng phân tích chi tiết tại Phần B. |
| **C3** | Complete | Khớp số liệu thống kê | Bảng thống kê định lượng khớp 100% với số dòng chi tiết trong báo cáo. |
| **T1** | Testable | Câu hỏi BA là câu hỏi đóng | 100% câu hỏi gửi BA là câu hỏi đóng, có ít nhất 2 phương án lựa chọn (A, B...). |
| **T2** | Testable | Khả năng kiểm thử | Câu trả lời của BA cho mỗi câu hỏi đóng đủ cơ sở rõ ràng để viết ngay Expected Result cụ thể. |
