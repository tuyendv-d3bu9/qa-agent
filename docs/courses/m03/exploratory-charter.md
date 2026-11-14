# Exploratory Testing theo charter

## Mục đích

Có những lỗi kịch bản viết sẵn không bắt được. Exploratory testing là test có chủ đích, có giới hạn thời gian, tập trung vào 1 rủi ro.

## Đầu vào, đầu ra

| | File | Lấy gì |
|---|---|---|
| Đầu vào | OUTPUT/coverage_strategy.md | Vùng rủi ro P1, P2 |
| Đầu ra | OUTPUT/exploratory_charters.md | Các charter |

## Cấu trúc 1 charter

| Phần | Ghi gì | Ví dụ |
|---|---|---|
| Mission | Khám phá cái gì, để tìm loại lỗi gì | Khám phá việc mã mất hiệu lực giữa luồng checkout, tìm trường hợp vẫn đặt được đơn |
| Area | Màn hình, bước nào | Checkout bước 1 đến bước 4 |
| Risk | Vùng rủi ro nào trong coverage_strategy.md | Mã hết hạn giữa luồng, P1 |
| Time-box | Bao lâu | 45 phút |
| Notes | Gợi ý cách thử, dữ liệu cần | Đổi giờ hệ thống test, mở 2 tab, quay lại bước trước |

## Cách làm

1. Chọn vùng rủi ro P1 trước, sau đó P2.
2. Mỗi charter 1 rủi ro. Không gộp.
3. Có ít nhất 1 charter cho tính năng Gợi ý Voucher Thông minh.
4. Time-box chọn 30, 45 hoặc 60 phút.
5. AI viết bản nháp, người chỉnh Mission và Time-box cho thực tế.

## Khi chạy charter, ghi lại

| Loại | Ví dụ |
|---|---|
| BUG | Mã hết hạn vẫn đặt được đơn |
| CAU_HOI | Khi mã bị admin tắt, có báo khách không? |
| Y_TUONG | Thử thêm với mã còn 1 lượt |

## Khuôn đầu ra

```markdown
# Exploratory Charters: Function D

## CH-01
| Phần | Nội dung |
|---|---|
| Mission | |
| Area | |
| Risk | |
| Time-box | |
| Notes | |
```

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| Mission quá rộng, kiểu "test voucher" | Nói rõ khám phá gì, tìm lỗi gì |
| Không có time-box | Thêm thời gian, hết giờ thì dừng và ghi lại |
| Hai charter cùng 1 rủi ro | Đổi sang rủi ro khác |
| Charter thành kịch bản từng bước | Charter chỉ định hướng, không viết step |

## Dùng cho phần sau

- Bug tìm được đưa sang Module 5 để viết bug report.
