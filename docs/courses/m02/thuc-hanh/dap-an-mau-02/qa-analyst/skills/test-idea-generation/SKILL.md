---
name: test-idea-generation
description: Sinh test idea từ rule gốc BR, câu trả lời đã xác nhận Q-ID và 8 viewpoint, đề xuất nhãn lọc GIU, BO_TRUNG, NGOAI_PHAM_VI, xuất OUTPUT/test_ideas.md rồi dừng chờ người duyệt. Dùng ở Pha 3, sau viewpoint-generator.
---

# Sinh test idea

Mục đích: sinh nhiều tình huống cần test, mỗi tình huống có nguồn rõ ràng. Người lọc lại trước khi viết test case.

Chuỗi làm việc: Requirement → Viewpoint → Test idea → Người lọc → Test case.

## Đầu vào

| File | Lấy gì |
|---|---|
| `OUTPUT/viewpoints.md` | 8 viewpoint, điểm chưa rõ của từng viewpoint |
| `OUTPUT/requirement_autopsy_report.md` | Phần B: câu trả lời đã xác nhận và Expected Result |
| `INPUT/Spec Function D.md` | Rule gốc của Function D |

## Đánh số rule gốc

Rule gốc là các gạch đầu dòng ở mục "Các quy tắc đã nêu" trong `INPUT/Spec Function D.md`. Đánh số theo đúng thứ tự xuất hiện: `BR-01`, `BR-02`... Đầu file `OUTPUT/test_ideas.md` ghi bảng BR kèm câu nguyên văn.

## Lấy idea từ đâu

| Nguồn | Ghi ở cột Nguồn | Ví dụ |
|---|---|---|
| Rule gốc trong `INPUT/` | `BR-xx` | BR-02 mã chỉ dùng khi đơn đạt tối thiểu |
| Câu trả lời đã xác nhận ở cổng chặn | `Q-xxx-xx` | Q-D03-02 đạt tối thiểu là lớn hơn hoặc bằng |
| Viewpoint chưa có nguồn nào | `VP-xx` | VP-07 ô nhập mã dùng bằng bàn phím |

Mọi idea, kể cả `NGOAI_PHAM_VI`, phải ghi nguồn. Idea không có nguồn thì bỏ.

Đủ khi:

- Mỗi BR có ít nhất 1 idea Happy và 1 idea Negative.
- Mỗi câu hỏi đã xác nhận có ít nhất 1 idea.
- Mỗi viewpoint có ít nhất 1 idea.
- Tổng từ 20 idea trở lên.

## Cách viết một idea

- 1 câu: điều kiện → kết quả.
- Có giá trị cụ thể nếu là biên. Số tiền viết dạng `200.000đ`.
- Kết quả chỉ lấy từ rule gốc hoặc câu trả lời đã xác nhận. Nguồn `VP-xx` chưa có kết quả xác nhận thì ghi kết quả là `cần BA xác nhận`.
- Ví dụ tốt: "Đơn 199.999đ, mã yêu cầu tối thiểu 200.000đ → không áp được."
- Ví dụ kém: "Kiểm tra mã giảm giá."

## Lọc idea

| Nhãn | Khi nào |
|---|---|
| `GIU` | Có nguồn, đúng phạm vi Function D, không trùng |
| `BO_TRUNG` | Cùng điều kiện, cùng kết quả với idea có ID nhỏ hơn |
| `NGOAI_PHAM_VI` | Kết quả cần kiểm thuộc tính năng khác: chọn phương thức thanh toán, cách tính phí ship, tạo đơn |

Idea có bước đi qua Đặt hàng nhưng kết quả cần kiểm là về mã (lượt dùng, tiền giảm, mã còn hiệu lực) vẫn thuộc phạm vi Function D.

Mỗi nhãn khác `GIU` phải có Lý do. `BO_TRUNG` ghi trùng với TI nào.

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| Idea không có nguồn | Hỏi lại: dựa vào rule nào? Không có thì bỏ |
| Idea quá chung | Viết lại theo dạng điều kiện → kết quả |
| Trùng nhau đổi chữ | Cùng điều kiện, cùng kết quả là trùng |
| Lấn sang thanh toán, ship | Đánh `NGOAI_PHAM_VI` |
| Để AI tự lọc rồi dùng luôn | Người đọc lại cột Lọc |

## Điểm dừng người lọc

- AI chỉ đề xuất nhãn ở cột Lọc. Người quyết định.
- Ghi file với dòng `Trạng thái duyệt: CHO_DUYET`, báo người dùng, rồi dừng.
- Người lọc sửa cột Lọc nếu cần, đổi thành `Trạng thái duyệt: DA_DUYET` và ghi tên ở dòng `Người lọc:`.

## Đầu ra

Dùng khuôn `assets/test_ideas.md`, ghi `OUTPUT/test_ideas.md`. Bảng Thống kê đếm từ bảng idea, tổng khớp số dòng.
