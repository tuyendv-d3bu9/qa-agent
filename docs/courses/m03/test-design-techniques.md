# Chọn kỹ thuật thiết kế test

## Mục đích

Mỗi field, mỗi rule chọn đúng kỹ thuật. Chọn sai thì sinh ra rất nhiều test vô ích hoặc bỏ sót lỗi.

## Đầu vào, đầu ra

| | File | Lấy gì |
|---|---|---|
| Đầu vào | OUTPUT/coverage_strategy.md | Vùng P1, P2 |
| Đầu vào | OUTPUT/project_knowledge.md | Field, rule đã chốt |
| Đầu ra | OUTPUT/technique_selection.md | Field hoặc rule, kỹ thuật, lý do |

## 4 kỹ thuật

| Kỹ thuật | Dùng khi | Ví dụ Function D |
|---|---|---|
| EP (chia lớp tương đương) | Giá trị chia được thành nhóm xử lý giống nhau | Mã: hợp lệ, hết hạn, sai định dạng, không tồn tại |
| BVA (giá trị biên) | Có khoảng, có ngưỡng | Giá trị đơn tối thiểu, trần giảm, ngày hết hạn |
| Decision Table (bảng quyết định) | Nhiều điều kiện kết hợp ra một kết quả | Đủ tối thiểu, còn hạn, còn lượt: áp được hay không |
| State Transition (chuyển trạng thái) | Đối tượng có vòng đời | Mã trong đơn: chưa áp, đang kiểm tra, đã áp, bị từ chối, đã gỡ |

## Câu hỏi để chọn

Hỏi lần lượt, có thể chọn nhiều kỹ thuật cho cùng 1 rule:

1. Có khoảng giá trị hoặc ngưỡng không? Có thì BVA.
2. Có các nhóm giá trị xử lý giống nhau không? Có thì EP.
3. Kết quả phụ thuộc từ 2 điều kiện trở lên không? Có thì Decision Table.
4. Đối tượng có trạng thái thay đổi theo thời gian không? Có thì State Transition.

## Kiểm đề xuất của AI

AI hay đề xuất kỹ thuật không áp dụng được. Trước khi nhận, hỏi lại:

| Kỹ thuật AI đề xuất | Hỏi lại |
|---|---|
| State Transition | Field này có trạng thái và có chuyển trạng thái không? Ô nhập mã chỉ là ô chữ, không có vòng đời |
| Decision Table | Có thật từ 2 điều kiện trở lên không? |
| BVA | Ngưỡng là bao nhiêu, lấy từ rule nào? |

## Ví dụ Decision Table

| Điều kiện | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| Đơn đủ tối thiểu | C | C | C | C | K | K | K | K |
| Mã còn hạn | C | C | K | K | C | C | K | K |
| Mã còn lượt | C | K | C | K | C | K | C | K |
| Áp được | C | K | K | K | K | K | K | K |

C là có, K là không. Thông báo lỗi từng cột lấy theo rule đã chốt về thông báo lỗi.

## Khuôn đầu ra

```markdown
# Technique Selection: Function D

| Field hoặc rule | Vùng rủi ro | Kỹ thuật | Lý do | Nguồn rule |
|---|---|---|---|---|

## Không áp dụng
| Field | Kỹ thuật bị loại | Vì sao |
|---|---|---|
```

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| Dùng State Transition cho ô nhập mã | Ô nhập không có vòng đời. Vòng đời là của mã trong đơn |
| Decision Table cho 1 điều kiện | Dùng EP hoặc BVA |
| EP chỉ có nhóm hợp lệ | Phải có nhóm không hợp lệ |

## Dùng cho phần sau

- 3.3 sinh giá trị biên và scenario theo kỹ thuật đã chọn.
