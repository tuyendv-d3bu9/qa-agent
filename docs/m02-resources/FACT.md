# FACT — Đánh giá output của AI

Dùng sau mỗi bước, trước khi tin output. AI tự kiểm, người kiểm lại. Kết quả mỗi check ghi `DAT` hoặc `KHONG_DAT`.

| | Tiêu chí | Câu hỏi | Ví dụ lỗi ở Module 02 |
|---|---|---|---|
| F | Factual | Có đúng với đề bài không? | AI ghi "ShopGo cho 1 mã/đơn" trong khi đề bài không nói, đây là thông lệ lấy từ domain |
| A | Accurate | Có dùng đúng cho ShopGo không? | Dùng chữ "Voucher code", "Apply" thay vì "Mã giảm giá", "Áp dụng" trên UI ShopGo |
| C | Complete | Có bỏ sót gì không? | Thiếu D-code, thiếu câu hỏi 6W, bảng thống kê không khớp số dòng |
| T | Testable | Dùng được để viết test không? | Câu hỏi BA dạng mở "Rule làm tròn là gì?" → BA trả lời dài, không ra được Expected Result |

## 10 check cố định cho bước Requirement Autopsy

| ID | Tiêu chí | Check |
|---|---|---|
| F1 | Factual | Mọi dòng `RO` và `MO_HO` ở Phần A có trích input và có nguồn |
| F2 | Factual | Không có câu nào khẳng định rule ShopGo mà chỉ có trong tri thức ngành |
| F3 | Factual | Cột "Bằng chứng trong đề bài" chép sát câu chữ đề bài, không diễn giải thêm |
| A1 | Accurate | Dùng đúng thuật ngữ ShopGo: "Mã giảm giá", "Áp dụng", trang "Thanh toán", VND |
| A2 | Accurate | Ví dụ số dùng VND, định dạng `200.000đ` |
| C1 | Complete | Phần A đủ D01–D23, đúng thứ tự |
| C2 | Complete | Mọi D-code `MO_HO`, `KHONG_DE_CAP`, `MAU_THUAN` đều có đúng 1 dòng ở Phần B |
| C3 | Complete | Bảng thống kê khớp số dòng thực tế |
| T1 | Testable | Mọi câu hỏi BA là câu hỏi đóng, có ít nhất 2 phương án |
| T2 | Testable | Câu trả lời của BA cho mỗi câu hỏi đủ để viết 1 Expected Result cụ thể |

## Nguyên tắc

AI-First: để AI làm bản nháp và tự kiểm.
Không AI-Only: người vẫn đọc lại từng check, nhất là F2 và T1.
