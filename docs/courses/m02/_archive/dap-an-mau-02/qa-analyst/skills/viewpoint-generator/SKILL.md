---
name: viewpoint-generator
description: Xếp các D-code và mã X chưa RO trong báo cáo Pha 2 vào 8 viewpoint cố định, đếm điểm chưa rõ và điểm CAO, chọn Top 3, xuất OUTPUT/viewpoints.md. Dùng ở bước đầu Pha 3, sau khi đã có OUTPUT/requirement_autopsy_report.md.
---

# Viewpoint Generator

Mục đích: nhìn Function D từ 8 góc kiểm thử cố định, biết góc nào đang có nhiều điểm chưa rõ nhất để ưu tiên test.

## Đầu vào

| File | Lấy gì |
|---|---|
| `OUTPUT/requirement_autopsy_report.md` | Phần A: trạng thái từng D-code và mã X. Phần B: mức rủi ro |
| `knowledge/test-viewpoints.md` | 8 viewpoint và bảng gắn D-code |
| `knowledge/voucher-domain.md` | Danh mục D01–D23 |

## Cách làm

1. Đọc Phần A. Lấy mọi D-code và mã X có trạng thái khác `RO`. Đó là các điểm chưa rõ.
2. Xếp từng mã vào viewpoint theo bảng gắn D-code trong `knowledge/test-viewpoints.md`.
3. Lấy mức rủi ro của từng mã ở Phần B. Một mã có nhiều câu hỏi thì lấy mức cao nhất.
4. Mỗi viewpoint đếm: số điểm chưa rõ, số điểm rủi ro `CAO`.
5. Mỗi viewpoint viết:
   - Mục tiêu: 1 câu, dựa vào câu hỏi chủ đạo.
   - Rủi ro nếu bỏ qua: 1 tình huống cụ thể, có số tiền nếu liên quan tiền.
   - 3 test idea mẫu: ưu tiên lấy từ điểm chưa rõ của viewpoint đó, ngăn cách nhau bằng `; `.
6. Chọn Top 3: nhiều điểm `CAO` nhất. Bằng nhau thì xét tổng số điểm. Vẫn bằng thì theo ID nhỏ hơn.

## Quy tắc

- Đủ 8 viewpoint, kể cả viewpoint không có điểm nào.
- Viewpoint không có điểm nào ghi `KHONG_CO_DIEM` ở cột Điểm chưa rõ. Không có nghĩa là không cần test, mà là danh mục D-code chưa có chủ đề cho góc này. Vẫn viết 3 test idea mẫu.
- Không tự đặt viewpoint mới.
- Tổng ở bảng Phân bố phải bằng số mã khác `RO` ở Phần A.

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| Dồn gần hết idea vào Happy Path | Đếm phân bố, viewpoint nào trống thì xem lại |
| Gộp Negative và Boundary | Boundary là đúng ở biên. Negative là sai hẳn |
| Bỏ qua viewpoint không có điểm | Vẫn ghi đủ 8 dòng, đánh `KHONG_CO_DIEM` |
| Tự thêm viewpoint | Chỉ dùng 8 viewpoint cố định để so được giữa các bộ test |

## Đầu ra

Dùng khuôn `assets/viewpoints.md`, ghi `OUTPUT/viewpoints.md`.
