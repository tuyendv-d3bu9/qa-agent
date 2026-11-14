# Chuẩn hóa Test Case cho Jira/TestRail

## Mục đích

Chuyển idea đã lọc thành test case đủ 8 trường, import được vào Jira hoặc TestRail. Phần này là định dạng, không phân tích thêm.

## Đầu vào, đầu ra

| | File | Lấy gì |
|---|---|---|
| Đầu vào | `OUTPUT/test_ideas.md` | Idea có nhãn `GIU` |
| Đầu vào | `OUTPUT/requirement_autopsy_report.md` | Expected Result đã xác nhận |
| Đầu ra | `OUTPUT/test_cases.md` | Bảng test case |
| Đầu ra | `OUTPUT/test_cases.csv` | Để import |

## 8 trường

| Trường | Quy tắc | Ví dụ |
|---|---|---|
| TC_ID | Tiền tố tính năng + số | `VOUCHER-001` |
| Title | Bắt đầu bằng Verify hoặc Validate. Tối đa 15 từ | Verify mã áp được khi đơn đúng bằng giá trị tối thiểu |
| Precondition | Trạng thái trước khi test | Đã đăng nhập. Giỏ có 1 sản phẩm, tổng đơn theo [CAN_DU_LIEU]. Đang ở trang Thanh toán |
| Test Steps | Đánh số, mỗi bước 1 hành động, tối đa 8 bước | 1. Nhập mã theo Test Data vào ô Mã giảm giá |
| Test Data | Giá trị cụ thể | [CAN_DU_LIEU] Mã giảm %, còn hạn, giá trị tối thiểu bằng tổng đơn |
| Expected Result | Cụ thể, kiểm được | Hiển thị số tiền được giảm và tổng tiền mới theo [CAN_DU_LIEU] |
| Priority | Theo bảng dưới | HIGH |
| Tags | Theo danh sách dưới | `@checkout @voucher @boundary` |

Thêm cột **Nguồn** để truy vết: TI-ID, D-code, Q-ID.

## Verify hay Validate

| Dùng | Khi |
|---|---|
| Verify | Kiểm hệ thống làm đúng (Happy Path, Boundary đúng biên) |
| Validate | Kiểm hệ thống chặn đúng (Negative, Security) |

## Priority

| Priority | Khi nào |
|---|---|
| `CRITICAL` | Sai thì sai tiền: số tiền giảm, tổng tiền |
| `HIGH` | Sai thì sai điều kiện áp mã: tối thiểu, hạn, lượt dùng |
| `MEDIUM` | Sai thì mã không hợp lệ lọt qua, hoặc thông báo sai |
| `LOW` | Hiển thị, câu chữ |

## Tags

- Luôn có: `@checkout @voucher`
- 1 tag viewpoint: `@happy @negative @boundary @security @ux @performance @a11y @integration`

## Quy tắc Expected Result

- Lấy từ rule gốc hoặc câu trả lời đã xác nhận ở cổng chặn.
- Không có nguồn thì không viết test case. Quay lại hỏi BA.
- Không viết "hiển thị thông báo lỗi" trống không. Ghi nội dung, vị trí. Chưa có nội dung thì ghi rõ chưa có, kèm Q-ID.

## 5 lỗi phổ biến khi AI sinh test case

| Lỗi | Ví dụ sai | Sửa |
|---|---|---|
| Expected mơ hồ | Hiển thị thông báo lỗi | Hiển thị "Mã đã hết hạn" dưới ô nhập mã |
| Test data chung chung | Nhập mã hợp lệ | [CAN_DU_LIEU] Mã giảm %, còn hạn, giá trị tối thiểu bằng tổng đơn |
| Gộp bước | Nhập mã và bấm Áp dụng | Tách thành 2 bước |
| Thiếu precondition | Không nói giỏ có gì | Ghi sản phẩm, tạm tính |
| Lấn phạm vi | Test luôn chọn thanh toán, đặt hàng | Dừng ở kết quả áp mã |

## Khuôn đầu ra

```markdown
# Test Case — Function D

| TC_ID | Title | Precondition | Test Steps | Test Data | Expected Result | Priority | Tags | Nguồn |
|---|---|---|---|---|---|---|---|---|
```

CSV, mỗi ô bọc nháy kép, các bước nối bằng ` | `:

```
"TC_ID","Title","Precondition","Test Steps","Test Data","Expected Result","Priority","Tags","Nguồn"
```

## Ví dụ đủ 8 trường

> Giả định BA đã trả lời Q-D03-02: đạt tối thiểu là lớn hơn hoặc bằng.

| Trường | Nội dung |
|---|---|
| TC_ID | VOUCHER-003 |
| Title | Verify mã áp được khi đơn đúng bằng giá trị tối thiểu |
| Precondition | Đã đăng nhập. Giỏ có SP-01, tổng đơn theo [CAN_DU_LIEU]. Đang ở trang Thanh toán, chưa áp mã |
| Test Steps | 1. Nhập mã theo Test Data vào ô Mã giảm giá<br>2. Bấm Áp dụng<br>3. Xem số tiền giảm và tổng tiền |
| Test Data | [CAN_DU_LIEU] Mã giảm %, còn hạn, giá trị tối thiểu bằng tổng đơn |
| Expected Result | Mã được áp. Hiển thị số tiền được giảm và tổng tiền mới theo [CAN_DU_LIEU] |
| Priority | HIGH |
| Tags | `@checkout @voucher @boundary` |
| Nguồn | TI-03, D03, Q-D03-02 |

## Dùng cho phần sau

- Module 4: Test Data ở đây là yêu cầu dữ liệu. Module 4 sinh bộ dữ liệu thật theo đó.
- Module 6: Test Steps và Expected Result là đầu vào để sinh Playwright script.
