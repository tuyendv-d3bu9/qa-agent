# Test tính năng có AI

## Mục đích

Tính năng có AI không trả một kết quả cố định. Không test bằng cách so đúng một giá trị, mà kiểm theo tiêu chí.

## Tính năng giả định

Gợi ý Voucher Thông minh: AI đề xuất mã giảm giá phù hợp dựa trên giỏ hàng và lịch sử mua. ShopGo thật chưa có tính năng này.

## Đầu vào, đầu ra

| | File | Lấy gì |
|---|---|---|
| Đầu vào | Mô tả tính năng | Ở mục trên |
| Đầu ra | OUTPUT/ai_feature_tests.md | Test case theo 4 trục |

## 4 trục kiểm

| Trục | Câu hỏi |
|---|---|
| OUTPUT_LOGIC | Gợi ý có hợp với giỏ hàng không? |
| BIAS | Cùng giỏ hàng, khách khác nhau có được gợi ý công bằng không? |
| FALLBACK | Không đủ dữ liệu thì hệ thống làm gì thay vì lỗi hoặc trống? |
| LATENCY | Gợi ý hiện ra sau bao lâu, có trạng thái đang tải không? |

## Viết Expected cho tính năng AI

| Kiểu cũ | Kiểu đúng |
|---|---|
| Gợi ý mã SALE-A102 | Mọi mã được gợi ý thuộc ngành hàng có trong giỏ |
| Hiện gợi ý | Hiện gợi ý trong 3 giây, có trạng thái đang tải |
| Gợi ý giống nhau | Cùng giỏ hàng, khác giới tính hoặc độ tuổi, danh sách gợi ý giống nhau |

## 5 test case mẫu

| ID | Test | Trục |
|---|---|---|
| AI-01 | Giỏ hàng thời trang, gợi ý đúng ngành hàng | OUTPUT_LOGIC |
| AI-02 | Khách mới chưa có lịch sử, hiện voucher chào mừng mặc định thay vì lỗi | FALLBACK |
| AI-03 | Giỏ hàng nhiều ngành, không gợi ý lệch hoặc quá tự tin | OUTPUT_LOGIC |
| AI-04 | Gợi ý hiện trong 3 giây, có trạng thái đang tải | LATENCY |
| AI-05 | Cùng giỏ hàng, không phân biệt theo giới tính, độ tuổi | BIAS |

## Khuôn đầu ra

```markdown
# AI Feature Tests: Gợi ý Voucher Thông minh

| ID | Trục | Điều kiện | Cách làm | Tiêu chí đạt | Ưu tiên |
|---|---|---|---|---|---|
```

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| Expected so khớp 1 mã cụ thể | Viết tiêu chí, không viết 1 giá trị |
| Quên trục FALLBACK | Luôn có test khách mới, giỏ trống, lịch sử ít |
| Test BIAS nhưng đổi cả giỏ hàng | Giữ nguyên giỏ, chỉ đổi thông tin khách |
| Chạy 1 lần rồi kết luận | Chạy lại nhiều lần với cùng đầu vào, xem kết quả có ổn định không |

## Dùng cho phần sau

- Module 6: tiêu chí đạt là nền để viết kiểm tra tự động cho tính năng AI.
