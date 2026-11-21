# Báo cáo kiểm tra định dạng test case

Bộ test: `OUTPUT/test_cases.md` và `OUTPUT/test_cases.csv`. Số TC: 33 (VOUCHER-001 đến VOUCHER-033). Ngày kiểm: 2026-11-14.

Luật gốc: `qa-test-designer/skills/test-case-format/SKILL.md`. Bộ luật F01 đến F14 theo `.claude/agents/tc-checker.md`.

## Tổng hợp

| Kết quả | Số TC |
|---|---|
| DAT (không lỗi) | 30 |
| LOI | 2 |
| CAN_XAC_MINH | 1 |

Ghi chú: LOI gồm VOUCHER-022 (F10) và VOUCHER-024 (F06). CAN_XAC_MINH là VOUCHER-010 (F13). Ba nhóm không chồng lấp nhau.

## Lỗi theo luật

| Mã luật | Số lỗi | TC vi phạm |
|---|---|---|
| F01 | 0 | Không có |
| F02 | 0 | Không có. ID VOUCHER-001 đến VOUCHER-033 liên tục, không trùng |
| F03 | 0 | Không có. Tất cả Title bắt đầu bằng Verify hoặc Validate |
| F04 | 0 | Không có. Số từ Title từ 8 đến 15. Dài nhất VOUCHER-030 (15 từ) |
| F05 | 0 | Không có. Số bước từ 2 đến 8. VOUCHER-019 có 8 bước, đúng giới hạn |
| F06 | 1 | VOUCHER-024 |
| F07 | 0 | Không có |
| F08 | 0 | Không có |
| F09 | 0 | Không có |
| F10 | 1 | VOUCHER-022 |
| F11 | 0 | Không có. 6 TC có cụm "hiển thị thông báo lỗi" (VOUCHER-002, 003, 007, 008, 010, 013) đều kèm nội dung theo nguyên nhân và Q-ID |
| F12 | 0 | Không có. Tất cả Test Data có [CAN_DU_LIEU] kèm mô tả |
| F13 | 0 (1 CAN_XAC_MINH) | CAN_XAC_MINH: VOUCHER-010 |
| F14 | 0 | Khớp. Xem mục F14 bên dưới |

Luật bị vi phạm: F06 (1 TC), F10 (1 TC). Các luật còn lại không có LOI. F13 chỉ có 1 CAN_XAC_MINH.

## Chi tiết

| TC_ID | Mã luật | Trích nguyên văn | Ghi chú sửa |
|---|---|---|---|
| VOUCHER-024 | F06 | "2. Tạo giỏ mới theo [CAN_DU_LIEU] và vào trang Thanh toán" | LOI. Bước nối 2 động từ hành động ("Tạo" và "vào") bằng "và". Tách thành 2 bước: "Tạo giỏ mới theo [CAN_DU_LIEU]" và "Vào trang Thanh toán". Khi tách, bộ bước thành 5 bước, vẫn trong giới hạn 8. |
| VOUCHER-022 | F10 | "TI-34, VP-07, BR-04" | LOI. Cột Nguồn có TI-ID nhưng không có D-code và không có Q-ID. Bổ sung D-code hoặc Q-ID nếu có nguồn. Nếu không có nguồn, cần BA xác nhận trước khi giữ TC. |
| VOUCHER-010 | F13 (CAN_XAC_MINH) | "[CAN_DU_LIEU] Mã giảm cố định còn hạn, còn lượt, giá trị tối thiểu bằng tổng đơn gồm ship cộng 1đ" | CAN_XAC_MINH, không kết luận lỗi. Test Data có số tiền cụ thể "1đ". Reviewer kiểm nguồn của "1đ" (Q-D03-02 hoặc BR-02 nếu liên quan). Nếu không có nguồn, thay bằng mô tả [CAN_DU_LIEU] không có số cụ thể. |

## Khớp md và csv (F14)

Kết quả: ĐẠT.

- Số dòng: md 33, csv 33. Mỗi dòng có 9 cột.
- TC_ID: giống nhau và cùng thứ tự ở cả 33 dòng.
- Title: giống nhau ở cả 33 dòng.
- Priority, Tags, Nguồn: giống nhau sau khi bỏ dấu backtick trong md.
- Khác biệt hình thức, không tính là lỗi: Test Steps trong md ngăn bước bằng `<br>`, trong csv ngăn bằng ` | `. Đây là cách chuyển định dạng bình thường.
- Không có file csv bị thiếu.

## Khác biệt với luật gốc (nếu có)

1. F10. Luật gốc (SKILL.md, mục Đầu vào và Thêm cột Nguồn) liệt kê TI-ID, D-code và Q-ID để truy vết. Bộ luật F10 yêu cầu TI-ID và (D-code hoặc Q-ID). Kết luận cho VOUCHER-022 giống nhau theo cả hai cách đọc, vì TC này không có D-code và không có Q-ID.
2. F06, F11, F12, F13 không có trong SKILL.md. F13 bám ràng buộc 3 của `qa-test-designer/AGENTS.md` (không bịa Test Data). F11 và F12 bám mục Quy tắc Expected Result và mục Test Data của SKILL.md.
3. Không tính là LOI, ghi chú để reviewer xem: SKILL.md quy định Verify cho Happy và Boundary, Validate cho Negative và Security. Các TC gắn tag @negative nhưng mở đầu bằng Verify: VOUCHER-004, VOUCHER-005, VOUCHER-006. F03 của bộ luật chỉ kiểm từ đầu tiên là Verify hoặc Validate, nên các TC này vẫn đạt F03.
4. Ngoài phạm vi: báo cáo không đánh giá nội dung nghiệp vụ. Không đọc `docs/`.
