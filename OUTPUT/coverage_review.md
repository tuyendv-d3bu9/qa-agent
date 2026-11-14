# Coverage Review — Bộ test Function D (`OUTPUT/test_cases.md`, 33 TC: VOUCHER-001 đến VOUCHER-033)

- Nguồn: `OUTPUT/test_cases.md`, `OUTPUT/requirement_autopsy_report.md` (rủi ro theo D-code, Phần B), `OUTPUT/project_knowledge.md` (BR-01 đến BR-05, mâu thuẫn M01 đến M07), `../qa-analyst/knowledge/viewpoints.md`.
- Nhãn phủ chỉ dựa vào Title, Test Steps, Expected Result của từng TC.
- Giá trị chưa có trong nguồn ghi `[CAN_DU_LIEU]`. Gap do mâu thuẫn còn mở ghi rõ mã M0x ở cột Mô tả.

## Góc 1. Requirement ↔ Test Suite

| Dòng | Nội dung | TC phủ | Nhãn phủ | Lý do |
|---|---|---|---|---|
| BR-01 | Có 2 loại mã: % và số tiền cố định | VOUCHER-001, VOUCHER-007, VOUCHER-015 | MOT_PHAN | Mã cố định có test áp đúng tiền giảm (001). Mã % chỉ có test bị từ chối (007) và test vượt trần (015); chưa có test tiền giảm % dưới trần bằng tỷ lệ nhân cơ sở tính (chặn bởi M04). |
| BR-02 | Mã chỉ dùng khi đơn đạt giá trị tối thiểu | VOUCHER-007, VOUCHER-009, VOUCHER-010, VOUCHER-011 | COVER | Có test dưới tối thiểu, đúng bằng, thấp hơn 1đ, cơ sở so là tổng gồm ship. |
| BR-03 | Mỗi mã có ngày hết hạn | VOUCHER-012, VOUCHER-013, VOUCHER-029 | COVER | Có test 23:59:59 ngày hết hạn, 00:00:00 ngày kế tiếp, hết hạn trước khi Đặt hàng. |
| BR-04 | Áp thành công hiển thị số tiền được giảm và tổng tiền mới | VOUCHER-001, VOUCHER-009, VOUCHER-016, VOUCHER-022 | COVER | Expected nêu rõ số tiền được giảm và công thức tổng tiền mới. |
| BR-05 | Mã không hợp lệ hoặc hết hạn hiển thị thông báo lỗi | VOUCHER-002, VOUCHER-008, VOUCHER-013, VOUCHER-019 | COVER | Có test mã không tồn tại và mã hết hạn, Expected nêu thông báo lỗi dưới ô "Mã giảm giá". Nội dung chữ chính xác chưa được xác nhận. |
| D01 | Loại mã giảm giá (gồm Freeship) | VOUCHER-001, VOUCHER-015 | MOT_PHAN | Không có TC nào cho mã Freeship (TI-03 chưa viết được, M03). Mã % chưa có test tiền giảm dưới trần (M04). |
| D02 | Trần giảm của mã % | VOUCHER-015 | MOT_PHAN | Chỉ có test tiền giảm theo % vượt trần. Thiếu test dưới trần và đúng bằng trần (phụ thuộc cơ sở tính %, M04). |
| D03 | Cơ sở tính và ngưỡng đơn tối thiểu | VOUCHER-007, VOUCHER-009, VOUCHER-010, VOUCHER-011 | COVER | Phủ toán tử >= (009, 010) và cơ sở tổng gồm ship (011). Điểm biên cao hơn 1đ xét ở Góc 3 (B-03). |
| D04 | Mốc thời gian hiệu lực | VOUCHER-012, VOUCHER-013, VOUCHER-014 | COVER | Phủ 23:59:59, 00:00:00 ngày kế tiếp, múi giờ GMT+7 khi máy khách khác múi giờ. |
| D05 | Tổng lượt dùng toàn hệ thống | VOUCHER-003 | COVER | Mã hết tổng lượt bị từ chối, lỗi "Hết lượt dùng". |
| D06 | Lượt dùng mỗi khách hàng | VOUCHER-017 | COVER | Tài khoản đã dùng mã ở đơn trước không áp lại được. |
| D07 | Đối tượng áp dụng và đăng nhập | VOUCHER-023 | COVER | Khách vãng lai không áp được mã; các TC còn lại đều ở trạng thái đã đăng nhập và áp được. |
| D08 | Phạm vi áp dụng sản phẩm | Không có | CHUA_COVER | TI-09, TI-10 chưa viết được do M05. |
| D09 | Quy tắc cộng dồn | VOUCHER-004 | MOT_PHAN | Có test mã B hợp lệ ghi đè mã A. Thiếu test mã B không hợp lệ thì mã A được giữ nguyên (Phần B dòng Q-D09-02). |
| D10 | Tiêu chí mã hợp lệ | VOUCHER-005, VOUCHER-006 | COVER | Phủ chữ thường tự chuyển in hoa và auto-trim khoảng trắng đầu cuối. |
| D11 | Quy tắc làm tròn | Không có | CHUA_COVER | TI-21, TI-22 chưa viết được do M04. |
| D12 | Tiền giảm vượt tiền hàng | VOUCHER-016 | MOT_PHAN | Chỉ có test giá trị mã bằng tạm tính. Thiếu test giá trị mã lớn hơn tạm tính (TI-23, M01). |
| D13 | Nội dung và vị trí thông báo lỗi | VOUCHER-002, VOUCHER-003, VOUCHER-007, VOUCHER-010, VOUCHER-013, VOUCHER-019 | COVER | Phủ đủ 4 nguyên nhân và vị trí dưới ô nhập. Câu chữ chính xác chưa được xác nhận. |
| D14 | Thời điểm trừ lượt dùng | Không có | CHUA_COVER | TI-26, TI-36 chưa viết được do M02. |
| D15 | Hoàn lượt dùng mã | VOUCHER-024, VOUCHER-025, VOUCHER-026 | COVER | Phủ hủy đơn, thanh toán thẻ thất bại, Ví ShopGo thất bại. |
| D16 | Giỏ hàng hoặc phiên thay đổi sau khi áp mã | VOUCHER-027, VOUCHER-028 | MOT_PHAN | Phủ Q-D16-01 (tụt dưới ngưỡng) và Q-D16-03 (mất phiên). Thiếu Q-D16-02: tiền giảm % tính lại khi đổi số lượng (TI-41, M04). |
| D17 | Gỡ bỏ hoặc thay đổi mã | VOUCHER-018 | COVER | Gỡ mã đưa tổng tiền về ban đầu. Việc nhả lượt tạm giữ khi gỡ (TI-30) thuộc M07, ghi ở D14. |
| D18 | Thao tác đồng thời | Không có | CHUA_COVER | Không có TC tranh chấp lượt cuối; mâu thuẫn M02. |
| D19 | Mã mất hiệu lực giữa luồng | VOUCHER-029, VOUCHER-030 | COVER | Phủ hết hạn và Admin vô hiệu hóa trước khi Đặt hàng. |
| D20 | Mã giảm giá và phí vận chuyển | VOUCHER-001, VOUCHER-016, VOUCHER-031 | COVER | Phủ tiền giảm trừ vào tổng gồm ship và tính lại khi đổi địa chỉ (mã cố định). |
| D21 | Chống gian lận và dò mã | Không có | CHUA_COVER | VOUCHER-017 gắn `@security` nhưng kiểm D06. TI-27, TI-28 chưa viết được do M06. |
| D22 | Thời gian phản hồi và trạng thái chờ | VOUCHER-020, VOUCHER-021 | COVER | Phủ loading, vô hiệu hóa nút, bấm nhiều lần. |
| D23 | Lưu vết mã trên đơn hàng | VOUCHER-032 | COVER | Phủ chi tiết đơn, lịch sử đơn, email xác nhận. |
| X01 | Thị trường khách hàng | VOUCHER-014, VOUCHER-033 | COVER | Phủ tiền tệ VNĐ và hạn mã theo GMT+7. Nhật Bản ngoài phạm vi (Q-X01-01, Q-X01-02). |

Tổng Góc 1: 29 dòng; COVER 18, MOT_PHAN 6, CHUA_COVER 5.

## Góc 2. Viewpoint Balance

Đếm theo tag của từng TC (`@happy`, `@negative`, `@boundary`, `@security`, `@ux`, `@performance`, `@a11y`, `@integration`).

| Viewpoint | Số TC | Tỉ lệ |
|---|---|---|
| VP-01 Happy Path | 1 (001) | 3,1% |
| VP-02 Negative | 7 (002 đến 008) | 21,2% |
| VP-03 Boundary | 8 (009 đến 016) | 24,2% |
| VP-04 Security | 1 (017) | 3,0% |
| VP-05 UX/Usability | 2 (018, 019) | 6,1% |
| VP-06 Performance | 2 (020, 021) | 6,1% |
| VP-07 Accessibility | 1 (022) | 3,0% |
| VP-08 Integration | 11 (023 đến 033) | 33,3% |
| Ngoài danh sách | 0 | 0,0% |
| Tổng | 33 | 100% |

Ghi chú: tỉ lệ làm tròn 1 chữ số thập phân theo phần dư lớn nhất để tổng đúng 100%. Không có viewpoint 0 TC. VP-01, VP-04, VP-07 chỉ có 1 TC. VOUCHER-004 (D09), 005 và 006 (D10) gắn `@negative` đúng theo bảng gắn D-code trong `knowledge/viewpoints.md` (D09, D10 thuộc VP-02): input hoặc luồng lạ được hệ thống xử lý đúng nên Expected là áp thành công.

## Góc 3. Boundary

| ID | Điểm | TC phủ | Nhãn phủ |
|---|---|---|---|
| B-01 | Tối thiểu: thấp hơn 1đ | VOUCHER-010 | COVER |
| B-02 | Tối thiểu: bằng | VOUCHER-009 | COVER |
| B-03 | Tối thiểu: cao hơn 1đ | VOUCHER-001, VOUCHER-011 (chỉ ghi "đạt tối thiểu", không đúng 1đ) | MOT_PHAN |
| B-04 | Hết hạn: trước 1 ngày | VOUCHER-001 (chỉ ghi "còn hạn", không chỉ rõ trước 1 ngày) | MOT_PHAN |
| B-05 | Hết hạn: đúng ngày | VOUCHER-012 | COVER |
| B-06 | Hết hạn: sau 1 ngày | VOUCHER-013 | COVER |
| B-07 | Tiền giảm nhỏ hơn tiền hàng | VOUCHER-001 | COVER |
| B-08 | Tiền giảm bằng tiền hàng | VOUCHER-016 | COVER |
| B-09 | Tiền giảm lớn hơn tiền hàng | Không có | CHUA_COVER |

Tổng Góc 3: 9 điểm; COVER 6, MOT_PHAN 2, CHUA_COVER 1.

## Gap

| GAP-ID | Góc | Dòng gốc | Mô tả | Rủi ro | Đề xuất test case |
|---|---|---|---|---|---|
| GAP-01 | 1 | BR-01 | Chưa có test tiền giảm của mã % dưới trần. Do mâu thuẫn M04 (cơ sở tính %). | TB (D01) | Verify tiền giảm mã % dưới trần: mã % có trần [CAN_DU_LIEU], giỏ [CAN_DU_LIEU] sao cho tỷ lệ nhân cơ sở tính nhỏ hơn trần. Expected: tiền giảm bằng tỷ lệ nhân cơ sở tính (cơ sở chờ BA chốt M04), tổng tiền mới bằng tổng gồm ship trừ tiền giảm. |
| GAP-02 | 1 | D01 | Chưa có test mã Freeship. Do mâu thuẫn M03. | TB (D01) | Verify mã Freeship [CAN_DU_LIEU] áp được tại ô "Mã giảm giá" với hóa đơn đúng 200.000đ (cơ sở tính và toán tử chờ BA chốt M03). Expected: mã được chấp nhận, mức giảm phí ship [CAN_DU_LIEU]. |
| GAP-03 | 1 | D02 | Thiếu test dưới trần và đúng bằng trần. Do mâu thuẫn M04. | CAO (D02) | Verify tiền giảm mã % đúng bằng trần: mã % có trần [CAN_DU_LIEU], giỏ [CAN_DU_LIEU] sao cho tỷ lệ nhân cơ sở tính đúng bằng trần. Expected: tiền giảm bằng trần, tổng tiền mới bằng tổng gồm ship trừ trần. |
| GAP-04 | 1 | D08 | Không có test phạm vi sản phẩm. Do mâu thuẫn M05. | TB (D08) | Validate mã giới hạn phạm vi [CAN_DU_LIEU], giỏ lẫn sản phẩm thuộc và không thuộc phạm vi [CAN_DU_LIEU]. Expected: mã không được áp, nội dung thông báo [CAN_DU_LIEU] (chờ BA chốt M05). |
| GAP-05 | 1 | D09 | Thiếu test mã B không hợp lệ khi đang áp mã A. Không do mâu thuẫn (riêng trạng thái lượt tạm giữ của A thuộc M07). | CAO (D09) | Validate đang áp mã A hợp lệ [CAN_DU_LIEU], nhập mã B không tồn tại [CAN_DU_LIEU], bấm Áp dụng. Expected: mã A vẫn được áp, số tiền được giảm và tổng tiền giữ theo mã A, lỗi "Mã không tồn tại" dưới ô "Mã giảm giá". |
| GAP-06 | 1 | D11 | Không có test làm tròn. Do mâu thuẫn M04. | CAO (D11) | Verify làm tròn tiền giảm mã %: tỷ lệ và giỏ [CAN_DU_LIEU] sao cho tiền giảm trước làm tròn có phần lẻ đúng 500đ (và 1 TC phần lẻ 499đ). Expected: 500đ làm tròn lên, 499đ làm tròn xuống đến hàng 1.000đ (cơ sở tính chờ M04). |
| GAP-07 | 1 | D12 | Thiếu test giá trị mã cố định lớn hơn tạm tính. Do mâu thuẫn M01. | CAO (D12) | Verify mã cố định [CAN_DU_LIEU] có giá trị lớn hơn tạm tính [CAN_DU_LIEU]. Expected: tiền giảm bằng tạm tính, tiền hàng sau giảm 0đ, tổng không âm; phần dư có trừ vào phí ship không chờ BA chốt M01. |
| GAP-08 | 1 | D14 | Không có test tạm giữ và trừ lượt. Do mâu thuẫn M02 (và M07 với việc nhả lượt). | CAO (D14) | Verify mã còn đúng 1 tổng lượt [CAN_DU_LIEU]: tài khoản 1 áp mã thành công, tài khoản 2 áp cùng mã. Expected theo Q-D14-01: tài khoản 2 bị từ chối "Hết lượt dùng" do lượt đã tạm giữ (chờ BA chốt M02). |
| GAP-09 | 1 | D16 | Thiếu test tính lại tiền giảm % khi đổi số lượng (Q-D16-02). Do mâu thuẫn M04. | CAO (D16) | Verify đã áp mã % [CAN_DU_LIEU], tăng số lượng sản phẩm [CAN_DU_LIEU] vẫn đạt ngưỡng. Expected: tiền giảm và tổng tiền được tính lại theo giỏ mới (cơ sở tính chờ M04). |
| GAP-10 | 1 | D18 | Không có test tranh chấp lượt cuối. Do mâu thuẫn M02. | CAO (D18) | Validate mã còn 1 lượt [CAN_DU_LIEU], 2 tài khoản đã áp mã cùng bấm Đặt hàng đồng thời. Expected theo Q-D18-01: chỉ đơn ghi nhận trước tại máy chủ thành công, đơn sau báo lỗi hết lượt (chờ BA chốt M02). |
| GAP-11 | 1 | D21 | Không có test chống dò mã và toàn vẹn tiền giảm. Do mâu thuẫn M06. | TB (D21) | Validate sửa request Áp dụng để đổi số tiền giảm khác giá trị mã [CAN_DU_LIEU]. Expected chờ BA/PO chốt M06 (Q-D21-02 hiện chọn dùng giá trị giao diện gửi lên, là rủi ro bảo mật). Kèm 1 TC nhập sai liên tiếp số lần [CAN_DU_LIEU]: ô nhập không bị khóa (Q-D21-01). |
| GAP-12 | 3 | B-03 | Không có test tổng đơn cao hơn tối thiểu đúng 1đ. Không do mâu thuẫn. | CAO (D03) | Verify mã cố định [CAN_DU_LIEU] có giá trị tối thiểu bằng tổng đơn gồm ship trừ 1đ. Expected: mã được áp, tiền giảm bằng giá trị mã, tổng tiền mới bằng tổng gồm ship trừ giá trị mã. |
| GAP-13 | 3 | B-04 | Không có test áp mã trước ngày hết hạn đúng 1 ngày. Không do mâu thuẫn. | TB (D04) | Verify mã [CAN_DU_LIEU] có ngày hết hạn là ngày hôm sau theo GMT+7, áp trong ngày hiện tại. Expected: mã được áp, hiển thị số tiền được giảm và tổng tiền mới. |
| GAP-14 | 3 | B-09 | Không có test tiền giảm lớn hơn tiền hàng. Do mâu thuẫn M01 (trùng nội dung GAP-07). | CAO (D12) | Dùng chung đề xuất GAP-07. |

Tổng gap: 14 (Góc 1: 11, Góc 2: 0, Góc 3: 3). Gap do mâu thuẫn còn mở: 11 (M01: GAP-07, GAP-14; M02: GAP-08, GAP-10; M03: GAP-02; M04: GAP-01, GAP-03, GAP-06, GAP-09; M05: GAP-04; M06: GAP-11). Gap không do mâu thuẫn: 3 (GAP-05, GAP-12, GAP-13), có thể viết TC ngay.
