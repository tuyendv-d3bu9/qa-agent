# Boundary và Validation

## Mục đích

Lỗi hay nằm ở biên. Bài này lấy đủ điểm biên cho từng field, rồi viết scenario cho luồng Checkout.

## Đầu vào, đầu ra

| | File | Lấy gì |
|---|---|---|
| Đầu vào | OUTPUT/technique_selection.md | Field dùng BVA, EP |
| Đầu vào | OUTPUT/project_knowledge.md | Giá trị ngưỡng đã chốt |
| Đầu ra | OUTPUT/test_scenarios.md | Bảng giá trị biên, bảng scenario |

## Điểm biên theo loại field

| Loại field | Điểm cần test |
|---|---|
| Số có khoảng | min-1, min, min+1, giữa, max-1, max, max+1 |
| Chuỗi có độ dài | rỗng, 1 ký tự, max, max+1, ký tự đặc biệt |
| Định dạng cố định | đúng định dạng, thiếu ký tự, thừa ký tự, sai ký tự |
| Ngày | trước 1 ngày, đúng ngày, sau 1 ngày |

## Field của Function D

| Field | Loại | Ngưỡng lấy từ |
|---|---|---|
| Giá trị đơn tối thiểu của mã | Số có khoảng | Rule đã chốt về đơn tối thiểu |
| Tiền giảm so với trần | Số có khoảng | Rule đã chốt về trần giảm |
| Tiền giảm so với tiền hàng | Số có khoảng | Rule đã chốt về giảm vượt tiền hàng |
| Mã giảm giá | Chuỗi, định dạng | Rule đã chốt về định dạng mã |
| Ngày hết hạn | Ngày | Rule đã chốt về mốc giờ hết hạn |

Không có giá trị ngưỡng thì ghi [CAN_DU_LIEU]. Không tự đặt số.

## Lab 1: từ 15 scenario cho Checkout 4 bước

Checkout: 1. Giỏ hàng và mã giảm giá, 2. Thông tin giao hàng, 3. Thanh toán, 4. Xác nhận đơn.

Phải có đủ 3 nhóm:
- Boundary: giá trị biên của các field trên.
- Validation: dữ liệu sai bị chặn đúng.
- Negative: luồng bất thường.

Negative bắt buộc có:
- Mã hết hạn giữa lúc đang checkout.
- Mất mạng ngay sau khi áp mã.
- Mã hết lượt đúng lúc bấm Áp dụng.

## Khuôn đầu ra

```markdown
# Test Scenarios: Checkout Function D

## Giá trị biên
| Field | Partition | Giá trị test | Kết quả mong đợi | Nguồn |
|---|---|---|---|---|

## Scenario
| SC-ID | Bước checkout | Nhóm | Scenario | Kỹ thuật | Nguồn | Ưu tiên |
|---|---|---|---|---|---|---|
```

Nhóm: BOUNDARY, VALIDATION, NEGATIVE. Ưu tiên lấy từ coverage_strategy.md.

## Ví dụ

| SC-ID | Bước checkout | Nhóm | Scenario | Kỹ thuật | Nguồn | Ưu tiên |
|---|---|---|---|---|---|---|
| SC-01 | 1 | BOUNDARY | Đơn thấp hơn tối thiểu 1đ, áp mã bị từ chối | BVA | Q-D03-02 | P1 |
| SC-07 | 3 | NEGATIVE | Áp mã ở bước 1, sang bước 3 thì mã hết hạn, bấm Đặt hàng | ST | Q-D19-01 | P1 |

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| Thiếu min-1 và max+1 | Mỗi khoảng phải có đủ 2 điểm ngoài biên |
| Giá trị ngưỡng tự đặt | Lấy từ rule đã chốt, không có thì [CAN_DU_LIEU] |
| Scenario chỉ ở bước 1 | Có scenario ở bước 2, 3, 4 khi mã ảnh hưởng tới bước đó |
| Hai scenario khác chữ nhưng cùng điều kiện | Gộp lại |

## Dùng cho phần sau

- Module 4: bảng giá trị biên là yêu cầu để sinh test data.
- Module 6: scenario là nền để viết test case tự động.
