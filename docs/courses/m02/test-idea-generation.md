# AI-Generated Test Ideas

## Mục đích

Sinh nhiều tình huống cần test, mỗi tình huống có nguồn rõ ràng. Sau đó người lọc lại trước khi viết test case.

## Đầu vào, đầu ra

| | File | Lấy gì |
|---|---|---|
| Đầu vào | `OUTPUT/viewpoints.md` | 8 viewpoint, điểm chưa rõ của từng viewpoint |
| Đầu vào | `OUTPUT/requirement_autopsy_report.md` | Phần B: rule đã xác nhận |
| Đầu vào | `INPUT/` | Rule gốc của Function D |
| Đầu ra | `OUTPUT/test_ideas.md` | Danh sách idea đã lọc |

## Test idea khác test case

| | Test idea | Test case |
|---|---|---|
| Độ dài | 1 câu | 8 trường |
| Expected cụ thể | Chưa cần | Bắt buộc |
| Mục đích | Không bỏ sót tình huống | Chạy được, kiểm được |

## Chuỗi làm việc

```
Requirement → Viewpoint → Test idea → Người lọc → Test case
```

## Lấy idea từ đâu

| Nguồn | Ghi ở cột Nguồn | Ví dụ |
|---|---|---|
| Rule gốc trong `INPUT/` | `BR-xx` | BR-02 mã chỉ dùng khi đơn đạt tối thiểu |
| Rule đã xác nhận ở cổng chặn | `Q-xxx-xx` | Q-D03-02 đạt tối thiểu là lớn hơn hoặc bằng |
| Viewpoint chưa có nguồn nào | `VP-xx` | VP-07 ô nhập mã dùng bằng bàn phím |

BR đánh số theo thứ tự gạch đầu dòng "Các quy tắc đã nêu" trong `INPUT/Spec Function D.md`: BR-01, BR-02...

Đủ khi:
- Mỗi BR có ít nhất 1 idea Happy và 1 idea Negative.
- Mỗi câu hỏi đã xác nhận có ít nhất 1 idea.
- Mỗi viewpoint có ít nhất 1 idea.

Lab 3 yêu cầu từ 20 idea trở lên.

## Cách viết một idea

- 1 câu: điều kiện → kết quả.
- Có giá trị cụ thể nếu là biên.
- Ví dụ tốt: "Đơn 199.999đ, mã yêu cầu tối thiểu 200.000đ → không áp được."
- Ví dụ kém: "Kiểm tra mã giảm giá."

## Lọc idea

| Nhãn | Khi nào |
|---|---|
| `GIU` | Có nguồn, đúng phạm vi Function D, không trùng |
| `BO_TRUNG` | Cùng điều kiện, cùng kết quả với idea có ID nhỏ hơn |
| `NGOAI_PHAM_VI` | Test luồng không liên quan tới mã: chọn phương thức thanh toán, tính phí ship |

Người lọc, không phải AI. AI có thể đề xuất nhãn, người quyết định.

## Khuôn đầu ra

```markdown
# Test Idea — Function D

| TI-ID | Viewpoint | Test idea | Nguồn | Lọc | Lý do |
|---|---|---|---|---|---|
| TI-01 | VP-01 | | BR-01 | GIU | |

## Thống kê

| Viewpoint | Số idea | GIU | BO_TRUNG | NGOAI_PHAM_VI |
|---|---|---|---|---|
| Tổng | | | | |
```

## Ví dụ

| TI-ID | Viewpoint | Test idea | Nguồn | Lọc | Lý do |
|---|---|---|---|---|---|
| TI-03 | VP-03 | Đơn đúng 200.000đ, mã tối thiểu 200.000đ → áp được | Q-D03-02 | GIU | BA xác nhận là lớn hơn hoặc bằng |
| TI-04 | VP-03 | Đơn 199.999đ, mã tối thiểu 200.000đ → không áp được | BR-02 | GIU | |
| TI-09 | VP-02 | Mã đã hết hạn → báo lỗi | BR-05 | BO_TRUNG | Trùng TI-06 |

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| Idea không có nguồn | Hỏi lại: dựa vào rule nào? Không có thì bỏ |
| Idea quá chung | Viết lại theo dạng điều kiện → kết quả |
| Trùng nhau đổi chữ | Cùng điều kiện, cùng kết quả là trùng |
| Lấn sang thanh toán, ship | Đánh `NGOAI_PHAM_VI` |
| Để AI tự lọc rồi dùng luôn | Người đọc lại cột Lọc |

## Dùng cho phần sau

- Idea `GIU` là đầu vào để viết test case Jira/TestRail.
- Module 3 dùng idea để chọn kỹ thuật thiết kế: EP, BVA, Decision Table, State Transition.
