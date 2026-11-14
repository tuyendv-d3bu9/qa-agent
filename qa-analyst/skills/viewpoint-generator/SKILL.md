---
name: viewpoint-generator
description: Xếp các D-code và mã X chưa rõ vào 8 viewpoint kiểm thử cố định, đếm phân bố rủi ro và chọn Top 3 viewpoint ưu tiên. Dùng ở bước Viewpoint (đầu tiên) của Pha 3; đọc OUTPUT/requirement_autopsy_report.md, knowledge/viewpoints.md, knowledge/voucher-domain.md và ghi OUTPUT/viewpoints.md.
---

# Viewpoint Generator

## Mục đích

Nhìn Function D từ 8 góc kiểm thử cố định. Biết góc nào đang có nhiều điểm chưa rõ nhất để ưu tiên test.

## Đầu vào, đầu ra

| | File | Lấy gì |
|---|---|---|
| Đầu vào | `OUTPUT/requirement_autopsy_report.md` | Phần A (trạng thái D-code), Phần B (missing rule, rủi ro) |
| Đầu vào | `knowledge/voucher-domain.md` | Danh mục D01–D23 |
| Đầu ra | `OUTPUT/viewpoints.md` | Bảng viewpoint, phân bố rủi ro, Top 3 |

## 8 viewpoint

Xem `knowledge/viewpoints.md`.

## Cách làm

1. Đọc Phần A. Lấy mọi D-code và mã X có trạng thái khác `RO`.
2. Xếp từng mã vào viewpoint theo bảng trên.
3. Mỗi viewpoint đếm: số điểm chưa rõ, số điểm rủi ro `CAO`.
4. Mỗi viewpoint viết:
   - Mục tiêu: 1 câu, dựa vào câu hỏi chủ đạo.
   - Rủi ro nếu bỏ qua: 1 tình huống cụ thể, có số tiền nếu liên quan tiền.
   - 3 test idea mẫu: ưu tiên lấy từ điểm chưa rõ của viewpoint đó.
5. Chọn Top 3: nhiều điểm `CAO` nhất. Bằng nhau thì xét tổng số điểm. Vẫn bằng thì theo ID nhỏ hơn.

## Quy tắc

- Đủ 8 viewpoint, kể cả viewpoint không có điểm nào.
- Viewpoint không có điểm nào ghi `KHONG_CO_DIEM`. Không có nghĩa là không cần test, mà là danh mục D-code chưa có chủ đề cho góc này.
- Không tự đặt viewpoint mới như "Edge Case". Edge case nằm trong Boundary hoặc Negative.

## Khuôn đầu ra

Dùng khuôn `assets/viewpoints.md`.

## Ví dụ một dòng

| ID | Viewpoint | Mục tiêu | Điểm chưa rõ | Rủi ro nếu bỏ qua | 3 test idea mẫu |
|---|---|---|---|---|---|
| VP-03 | Boundary | Giá trị ở biên tính đúng | D02, D03, D04, D11, D12 | Đơn 199.999đ vẫn được giảm 20%, mất 40.000đ mỗi đơn | Đơn đúng bằng tối thiểu; Giảm % vượt trần; Tiền giảm có số lẻ |

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| Dồn gần hết idea vào Happy Path | Đếm phân bố, viewpoint nào trống thì xem lại |
| Gộp Negative và Boundary | Boundary là đúng ở biên. Negative là sai hẳn |
| Bỏ qua viewpoint không có điểm | Vẫn ghi đủ 8 dòng, đánh `KHONG_CO_DIEM` |
| Tự thêm viewpoint | Chỉ dùng 8 viewpoint cố định để so được giữa các bộ test |
