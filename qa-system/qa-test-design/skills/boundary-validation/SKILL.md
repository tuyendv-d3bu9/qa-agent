---
name: boundary-validation
description: Lấy đủ các điểm biên cho từng field đã chọn BVA hoặc EP, rồi viết scenario cho luồng Checkout 4 bước, chia 3 nhóm BOUNDARY, VALIDATION, NEGATIVE. Ngưỡng nào chưa có số trong rule đã chốt thì ghi [CAN_DU_LIEU], không tự đặt. Dùng ở Bước 4 của qa-test-design, sau khi có OUTPUT/technique_selection.md; đọc thêm knowledge/features/voucher.md, OUTPUT/coverage_strategy.md và ghi OUTPUT/test_scenarios.md.
---

# Boundary và Validation

## Mục đích

Lỗi hay nằm ở biên. Skill này lấy đủ điểm biên cho từng field, rồi viết scenario cho luồng Checkout.

## Đầu vào, đầu ra

| | File | Lấy gì |
|---|---|---|
| Đầu vào | `OUTPUT/technique_selection.md` | Field dùng BVA, EP; bảng quyết định; bảng trạng thái |
| Đầu vào | `knowledge/features/voucher.md` | Giá trị ngưỡng đã chốt (mục 3, mục 9), mâu thuẫn còn mở (mục 7) |
| Đầu vào | `OUTPUT/coverage_strategy.md` | Ưu tiên P1, P2, P3 của từng vùng |
| Đầu ra | `OUTPUT/test_scenarios.md` | Bảng giá trị biên, bảng scenario |

## Điểm biên theo loại field

| Loại field | Điểm cần test |
|---|---|
| Số có khoảng | min-1, min, min+1, giữa, max-1, max, max+1 |
| Chuỗi có độ dài | rỗng, 1 ký tự, max, max+1, ký tự đặc biệt |
| Định dạng cố định | đúng định dạng, thiếu ký tự, thừa ký tự, sai ký tự |
| Ngày, giờ | trước 1 đơn vị, đúng mốc, sau 1 đơn vị |

Đơn vị biên của tiền là 1đ. Đơn vị biên của giờ hết hạn là 1 giây (mốc 23:59:59, R10).

## Field của Function D

| Field | Loại | Ngưỡng lấy từ |
|---|---|---|
| Giá trị đơn tối thiểu của mã | Số có khoảng | Rule đã chốt về đơn tối thiểu (BR-02, R08, R09) |
| Tiền giảm so với trần | Số có khoảng | Rule đã chốt về trần giảm (R07) |
| Tiền giảm so với tiền hàng | Số có khoảng | Rule đã chốt về giảm vượt tiền hàng (R22) |
| Làm tròn tiền giảm mã % | Số có khoảng | Rule làm tròn 1.000đ (R21) |
| Mã giảm giá | Chuỗi, định dạng | Rule đã chốt về định dạng mã (R19, R20) |
| Ngày hết hạn | Ngày, giờ | Rule đã chốt về mốc giờ hết hạn (R10, R11) |

Không có giá trị ngưỡng thì ghi `[CAN_DU_LIEU]`. Không tự đặt số. Có thể biểu diễn điểm biên theo tên ngưỡng, ví dụ "Tối thiểu - 1đ", khi rule chỉ nói ngưỡng do từng mã cấu hình.

## Scenario cho Checkout 4 bước

Checkout gồm: 1. Giỏ hàng và mã giảm giá, 2. Thông tin giao hàng, 3. Thanh toán, 4. Xác nhận đơn.

Phải có đủ 3 nhóm:
- BOUNDARY: giá trị biên của các field trên.
- VALIDATION: dữ liệu sai bị chặn đúng.
- NEGATIVE: luồng bất thường.

Nhóm NEGATIVE bắt buộc có:
- Mã hết hạn giữa lúc đang checkout.
- Mất mạng ngay sau khi áp mã.
- Mã hết lượt đúng lúc bấm Áp dụng.

Tối thiểu 15 scenario. Có scenario ở bước 2, 3, 4 khi mã ảnh hưởng tới bước đó.

## Cách làm

1. Từ `OUTPUT/technique_selection.md`, lấy mọi dòng có BVA hoặc EP.
2. Mỗi field: xác định loại, lấy ngưỡng từ rule đã chốt, liệt kê đủ điểm biên theo bảng trên.
3. Mỗi điểm biên ghi Kết quả mong đợi lấy từ rule. Rule dính mâu thuẫn mở thì ghi "Chờ BA chốt Mxx", không đoán.
4. Viết scenario theo 3 nhóm, gắn bước checkout, kỹ thuật, nguồn và ưu tiên (lấy từ vùng tương ứng trong `OUTPUT/coverage_strategy.md`).
5. Gộp scenario khác chữ nhưng cùng điều kiện.
6. Cuối file: ghi danh sách `[CAN_DU_LIEU]` cần xin và danh sách scenario đang chờ BA.

## Quy tắc

- Mỗi khoảng phải có đủ 2 điểm ngoài biên (min-1 và max+1).
- Không tự đặt ngưỡng, giá trị tiền, mã voucher.
- Mỗi scenario có cột Nguồn (BR-xx, Rxx, Q-xxx-xx). Không có nguồn thì không viết.
- Nhóm chỉ dùng BOUNDARY, VALIDATION, NEGATIVE. Kỹ thuật chỉ dùng EP, BVA, DT, ST.

## Khuôn đầu ra

Dùng khuôn `assets/test_scenarios.md`.

## Ví dụ

| SC-ID | Bước checkout | Nhóm | Scenario | Kỹ thuật | Nguồn | Ưu tiên |
|---|---|---|---|---|---|---|
| SC-01 | 1 | BOUNDARY | Đơn thấp hơn tối thiểu 1đ, áp mã bị từ chối | BVA | Q-D03-02 | P1 |
| SC-07 | 3 | NEGATIVE | Áp mã ở bước 1, sang bước 3 thì mã hết hạn, bấm Đặt hàng | ST | Q-D19-01 | P1 |

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| Thiếu min-1 và max+1 | Mỗi khoảng phải có đủ 2 điểm ngoài biên |
| Giá trị ngưỡng tự đặt | Lấy từ rule đã chốt, không có thì `[CAN_DU_LIEU]` |
| Scenario chỉ ở bước 1 | Có scenario ở bước 2, 3, 4 khi mã ảnh hưởng tới bước đó |
| Hai scenario khác chữ nhưng cùng điều kiện | Gộp lại |

## Dùng cho bước sau

- Bước 5 (`skills/test-idea-generation`) dùng scenario làm gợi ý idea cho vùng P1.
- Bảng giá trị biên là đầu vào để sinh test data (Module 4).
- Scenario là nền để viết test tự động (Module 6).
