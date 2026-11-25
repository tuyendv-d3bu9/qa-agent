---
name: test-design-techniques
description: Với mỗi field hoặc rule nằm trong vùng rủi ro P1, P2, chọn kỹ thuật thiết kế test phù hợp (chia lớp tương đương, giá trị biên, bảng quyết định, chuyển trạng thái), ghi rõ vì sao chọn và rule nào làm căn cứ, đồng thời liệt kê kỹ thuật bị loại. Dùng ở Bước 3 của qa-test-design, ngay sau khi có OUTPUT/coverage_strategy.md; đọc thêm knowledge/features/voucher.md và ghi OUTPUT/technique_selection.md.
---

# Chọn kỹ thuật thiết kế test

## Mục đích

Mỗi field, mỗi rule chọn đúng kỹ thuật. Chọn sai thì sinh ra rất nhiều test vô ích hoặc bỏ sót lỗi.

## Đầu vào, đầu ra

| | File | Lấy gì |
|---|---|---|
| Đầu vào | `OUTPUT/coverage_strategy.md` | Vùng P1, P2 và mâu thuẫn còn mở |
| Đầu vào | `knowledge/features/voucher.md` | Field (mục 3b), rule đã chốt (mục 3), mâu thuẫn (mục 7), hằng số (mục 9) |
| Đầu ra | `OUTPUT/technique_selection.md` | Field hoặc rule, kỹ thuật, lý do, nguồn |

## 4 kỹ thuật

| Kỹ thuật | Viết tắt | Dùng khi | Ví dụ Function D |
|---|---|---|---|
| Chia lớp tương đương | EP | Giá trị chia được thành nhóm xử lý giống nhau | Mã: hợp lệ, hết hạn, sai định dạng, không tồn tại |
| Giá trị biên | BVA | Có khoảng, có ngưỡng | Giá trị đơn tối thiểu, trần giảm, ngày hết hạn |
| Bảng quyết định | DT | Nhiều điều kiện kết hợp ra một kết quả | Đủ tối thiểu, còn hạn, còn lượt: áp được hay không |
| Chuyển trạng thái | ST | Đối tượng có vòng đời | Mã trong đơn: chưa áp, đã áp (tạm giữ lượt), đã gỡ, đã đặt hàng, bị từ chối |

## Câu hỏi để chọn

Hỏi lần lượt cho từng field hoặc rule. Một rule có thể chọn nhiều kỹ thuật:

1. Có khoảng giá trị hoặc ngưỡng không? Có thì BVA.
2. Có các nhóm giá trị xử lý giống nhau không? Có thì EP.
3. Kết quả phụ thuộc từ 2 điều kiện trở lên không? Có thì DT.
4. Đối tượng có trạng thái thay đổi theo thời gian không? Có thì ST.

## Cách làm

1. Lấy danh sách vùng P1, P2 từ `OUTPUT/coverage_strategy.md`. Vùng P3 không cần chọn kỹ thuật.
2. Trong mỗi vùng, tách ra từng field hoặc rule cụ thể (theo ID rule ở mục 3 của `knowledge/features/voucher.md`).
3. Trả lời 4 câu hỏi ở trên cho từng dòng, ghi lý do bằng một câu.
4. Kỹ thuật nào đã cân nhắc nhưng không dùng thì ghi vào mục "Không áp dụng" kèm lý do.
5. Với BVA: ghi rõ ngưỡng lấy từ rule nào. Rule không có con số cụ thể thì ghi `[CAN_DU_LIEU]`, không tự đặt số.
6. Với DT: vẽ bảng quyết định cho các tổ hợp điều kiện chính. Thông báo lỗi từng cột lấy theo rule về thông báo lỗi (R23).
7. Với ST: vẽ bảng trạng thái và các chuyển hợp lệ, không hợp lệ.
8. Rule đang dính mâu thuẫn mở (mục 7) vẫn chọn kỹ thuật, nhưng ghi chú "Expected chờ BA chốt Mxx".

## Kiểm đề xuất của AI

AI hay đề xuất kỹ thuật không áp dụng được. Trước khi nhận, hỏi lại:

| Kỹ thuật AI đề xuất | Hỏi lại |
|---|---|
| ST | Field này có trạng thái và có chuyển trạng thái không? Ô nhập mã chỉ là ô chữ, không có vòng đời |
| DT | Có thật từ 2 điều kiện trở lên không? |
| BVA | Ngưỡng là bao nhiêu, lấy từ rule nào? |

## Quy tắc

- Mỗi dòng có cột Nguồn rule. Không có nguồn thì không ghi dòng đó.
- EP phải có cả nhóm hợp lệ và nhóm không hợp lệ.
- Không đặt ngưỡng hay giá trị tiền tự nghĩ ra.
- Không dùng tên kỹ thuật ngoài 4 kỹ thuật trên ở cột Kỹ thuật. Loại test khác (bảo mật, đồng thời) ghi ở cột Lý do.

## Khuôn đầu ra

Dùng khuôn `assets/technique_selection.md`.

## Ví dụ bảng quyết định

| Điều kiện | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| Đơn đủ tối thiểu | C | C | C | C | K | K | K | K |
| Mã còn hạn | C | C | K | K | C | C | K | K |
| Mã còn lượt | C | K | C | K | C | K | C | K |
| Áp được | C | K | K | K | K | K | K | K |

C là có, K là không.

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| Dùng ST cho ô nhập mã | Ô nhập không có vòng đời. Vòng đời là của mã trong đơn |
| DT cho 1 điều kiện | Dùng EP hoặc BVA |
| EP chỉ có nhóm hợp lệ | Phải có nhóm không hợp lệ |

## Dùng cho bước sau

- Bước 4 (`skills/boundary-validation`) lấy các dòng BVA, EP để sinh giá trị biên và scenario.
