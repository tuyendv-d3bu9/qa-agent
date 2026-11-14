---
name: test-case-format
description: Chuyển test idea nhãn GIU đã được người duyệt thành test case đủ 8 trường kèm cột Nguồn, xuất OUTPUT/test_cases.md và OUTPUT/test_cases.csv để import Jira/TestRail. Dùng ở Pha 3, chỉ khi OUTPUT/test_ideas.md có Trạng thái duyệt: DA_DUYET.
---

# Chuẩn hóa test case

Mục đích: chuyển idea đã lọc thành test case import được vào Jira hoặc TestRail. Đây là bước định dạng, không phân tích thêm.

## Điều kiện

Chỉ làm khi `OUTPUT/test_ideas.md` có dòng `Trạng thái duyệt: DA_DUYET`. Còn `CHO_DUYET` thì dừng, báo người dùng duyệt trước.

## Đầu vào

| File | Lấy gì |
|---|---|
| `OUTPUT/test_ideas.md` | Idea có nhãn `GIU` |
| `OUTPUT/requirement_autopsy_report.md` | Expected Result đã xác nhận |
| `knowledge/test-viewpoints.md` | Tag của viewpoint |

## 8 trường

| Trường | Quy tắc | Ví dụ |
|---|---|---|
| TC_ID | `VOUCHER-` + 3 chữ số | `VOUCHER-001` |
| Title | Bắt đầu bằng Verify hoặc Validate. Tối đa 15 từ | Verify mã áp được khi đơn đúng bằng giá trị tối thiểu |
| Precondition | Trạng thái trước khi test: đăng nhập, giỏ có gì, tạm tính, phí vận chuyển, trang đang đứng | Đã đăng nhập. Tạm tính 180.000đ, phí vận chuyển 20.000đ. Đang ở trang Thanh toán, chưa áp mã |
| Test Steps | Đánh số, mỗi bước 1 hành động, tối đa 8 bước | 1. Nhập "SALE-A102" vào ô Mã giảm giá |
| Test Data | Giá trị cụ thể | Mã `SALE-A102` (giảm 20.000đ, tối thiểu 200.000đ, còn hạn) |
| Expected Result | Cụ thể, kiểm được | Giảm 20.000đ. Tổng còn 180.000đ |
| Priority | Theo bảng Priority | HIGH |
| Tags | Theo quy tắc Tags | `@checkout @voucher @boundary` |

Thêm cột **Nguồn** để truy vết: TI-ID, D-code, Q-ID hoặc BR-ID.

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
- Thêm đúng 1 tag viewpoint lấy từ `knowledge/test-viewpoints.md`.

## Quy tắc Expected Result

- Lấy từ rule gốc hoặc câu trả lời đã xác nhận ở cổng chặn.
- Không có nguồn thì không viết test case. Ghi idea đó vào mục "Idea chưa viết được" kèm điều còn thiếu, để hỏi BA.
- Không viết "hiển thị thông báo lỗi" trống không. Ghi nội dung, vị trí. Chưa có nội dung thì ghi rõ chưa có, kèm Q-ID.
- Số tiền trong Expected Result phải tính ra được từ Precondition và Test Data.

## 5 lỗi phổ biến khi AI sinh test case

| Lỗi | Ví dụ sai | Sửa |
|---|---|---|
| Expected mơ hồ | Hiển thị thông báo lỗi | Hiển thị "Mã đã hết hạn" dưới ô nhập mã |
| Test data chung chung | Nhập mã hợp lệ | Nhập `SALE-A102` |
| Gộp bước | Nhập mã và bấm Áp dụng | Tách thành 2 bước |
| Thiếu precondition | Không nói giỏ có gì | Ghi sản phẩm, tạm tính, phí vận chuyển |
| Lấn phạm vi | Test luôn chọn thanh toán, đặt hàng | Dừng ở kết quả áp mã, trừ khi rule cần kiểm nằm ở bước Đặt hàng |

## Đầu ra

- Dùng khuôn `assets/test_cases.md`, ghi `OUTPUT/test_cases.md`.
- Ghi thêm `OUTPUT/test_cases.csv`: dòng đầu là tiêu đề cột, mỗi ô bọc nháy kép, các bước nối bằng ` | `, nháy kép trong nội dung viết thành 2 nháy kép.
