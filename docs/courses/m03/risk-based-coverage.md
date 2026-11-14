# Coverage theo rủi ro

## Mục đích

Coverage tốt là test đúng chỗ, không phải test nhiều. Chỗ nào dễ sai và sai thì thiệt nhiều thì test trước, test kỹ.

## Đầu vào, đầu ra

| | File | Lấy gì |
|---|---|---|
| Đầu vào | OUTPUT/requirement_autopsy_report.md | Rủi ro từng D-code |
| Đầu vào | OUTPUT/project_knowledge.md | Rule đã chốt, mâu thuẫn còn mở |
| Đầu vào | OUTPUT/viewpoints.md | Top 3 viewpoint |
| Đầu ra | OUTPUT/coverage_strategy.md | Vùng rủi ro, thứ tự ưu tiên, loại test |

## Công thức

Rủi ro = Khả năng xảy ra x Mức ảnh hưởng

| Khả năng xảy ra | Dấu hiệu |
|---|---|
| CAO | Rule mơ hồ, có mâu thuẫn, nhiều điều kiện kết hợp, có tính toán |
| TB | Rule rõ nhưng có biên hoặc có thời gian |
| THAP | Rule rõ, đơn giản, chỉ hiển thị |

| Mức ảnh hưởng | Dấu hiệu |
|---|---|
| CAO | Sai tiền, mất doanh thu, bị lạm dụng mã |
| TB | Khách không dùng được mã, phải gọi CSKH |
| THAP | Sai chữ, sai giao diện, không ảnh hưởng tiền |

## Ma trận ưu tiên

| | Ảnh hưởng THAP | Ảnh hưởng TB | Ảnh hưởng CAO |
|---|---|---|---|
| Khả năng CAO | P2 | P1 | P1 |
| Khả năng TB | P3 | P2 | P1 |
| Khả năng THAP | P3 | P3 | P2 |

## Cách làm

1. Gom D-code cùng chủ đề thành vùng rủi ro. Ví dụ D02, D03, D11, D12 thành vùng "Tính tiền giảm".
2. Mỗi vùng chấm Khả năng và Ảnh hưởng, ghi dấu hiệu làm căn cứ.
3. Tra ma trận ra P1, P2, P3. Xếp theo thứ tự.
4. Với các vùng P1: đề xuất loại test (kỹ thuật, viewpoint) và mức độ test.
5. Vùng có mâu thuẫn còn mở trong project_knowledge.md: ghi rõ, chưa test Expected cho tới khi BA chốt.

## Quy tắc

- Chấm phải có dấu hiệu. Không chấm theo cảm giác.
- Đủ các vùng rủi ro, mỗi D-code nằm trong 1 vùng.
- Top 3 viewpoint ở OUTPUT/viewpoints.md phải có mặt trong các vùng P1 hoặc giải thích vì sao không.

## Khuôn đầu ra

```markdown
# Coverage Strategy: Function D

| Vùng rủi ro | D-code | Khả năng | Căn cứ | Ảnh hưởng | Căn cứ | Ưu tiên |
|---|---|---|---|---|---|---|

## Vùng P1
| Vùng | Loại test đề xuất | Kỹ thuật | Viewpoint | Mức độ |
|---|---|---|---|---|

## Chưa test được vì còn mâu thuẫn
| Vùng | Mâu thuẫn | Nguồn |
|---|---|---|
```

## Ví dụ

| Vùng rủi ro | Khả năng | Ảnh hưởng | Ưu tiên |
|---|---|---|---|
| Tính sai tiền giảm, khách bị trừ sai | CAO, có làm tròn và trần giảm | CAO, sai tiền | P1 |
| Hết hạn đúng lúc đang checkout | TB, có thời gian | CAO, đơn đặt bằng mã đã hết hạn | P1 |
| Đổi chữ nút Áp dụng thành chữ hoa | THAP | THAP | P3 |

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| Chấm mọi thứ là CAO | Ghi dấu hiệu cho từng ô, không có dấu hiệu thì hạ xuống |
| Bỏ qua vùng có mâu thuẫn | Ghi vào mục "Chưa test được", không tự đoán Expected |
| Vùng quá rộng, kiểu "Voucher" | Tách theo chủ đề D-code |

## Dùng cho phần sau

- 3.2 chọn kỹ thuật cho từng vùng P1.
- 3.4 viết exploratory charter cho các vùng P1.
