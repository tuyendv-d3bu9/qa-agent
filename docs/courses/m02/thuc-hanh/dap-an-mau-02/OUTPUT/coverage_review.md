# Coverage Review — OUTPUT/test_cases.md (VOUCHER-001 đến VOUCHER-039)

Đầu vào: `OUTPUT/test_cases.md` (39 test case), `OUTPUT/requirement_autopsy_report.md`, bảng BR trong `OUTPUT/test_ideas.md`, `knowledge/test-viewpoints.md`. Nhãn phủ chỉ dựa trên Title, Test Steps, Expected Result của từng test case.

## Góc 1. Requirement ↔ Test Suite

| Dòng | Nội dung | TC phủ | Nhãn phủ | Lý do |
|---|---|---|---|---|
| BR-01 | Có 2 loại mã: % và số tiền cố định | VOUCHER-001, VOUCHER-002, VOUCHER-003 | COVER | Có mã cố định GIAM20K (001), mã % SALE20 (002), thêm mã Freeship bị từ chối (003) |
| BR-02 | Mã chỉ dùng khi đơn đạt giá trị tối thiểu | VOUCHER-004, VOUCHER-005, VOUCHER-006, VOUCHER-007, VOUCHER-031 | COVER | Đủ dưới 1đ, bằng, trên 1đ, tối thiểu so trên tổng, tụt dưới tối thiểu sau khi sửa giỏ |
| BR-03 | Mỗi mã có ngày hết hạn | VOUCHER-008, VOUCHER-009, VOUCHER-010, VOUCHER-011, VOUCHER-033 | COVER | Trước 1 ngày, đúng ngày 23:59:30, 00:00:00 ngày sau, múi giờ, hết hạn giữa luồng |
| BR-04 | Áp thành công → hiển thị số tiền giảm và tổng mới | VOUCHER-001, VOUCHER-004, VOUCHER-012 | COVER | 001 kiểm số tiền giảm 20.000đ và tổng 260.000đ; 004, 012 kiểm không hiển thị số tiền giảm khi áp thất bại |
| BR-05 | Mã không hợp lệ hoặc hết hạn → thông báo lỗi | VOUCHER-010, VOUCHER-012, VOUCHER-020, VOUCHER-025 | COVER | Hết hạn, không tồn tại, ký tự đặc biệt, 4 nguyên nhân |
| D01 | Loại mã giảm giá | VOUCHER-001, VOUCHER-002, VOUCHER-003 | MOT_PHAN | Chưa có TC Freeship áp thành công: Q-D01-01 chưa nói Freeship giảm thành phần nào, bao nhiêu (TI-03 bị chặn) |
| D02 | Trần giảm của mã % | VOUCHER-002, VOUCHER-017 | MOT_PHAN | Chỉ có trường hợp chạm trần. Thiếu trường hợp không chạm trần vì giá trị tính giảm chưa xác nhận (TI-05 bị chặn) |
| D03 | Cơ sở tính và ngưỡng tối thiểu | VOUCHER-004, VOUCHER-005, VOUCHER-006, VOUCHER-007 | COVER | Tổng gồm phí vận chuyển (Q-D03-01), toán tử >= (Q-D03-02), đủ 3 điểm biên |
| D04 | Mốc thời gian hiệu lực | VOUCHER-008, VOUCHER-009, VOUCHER-010, VOUCHER-011 | COVER | 23:59:59 (Q-D04-01) và GMT+7 (Q-D04-02) |
| D05 | Tổng lượt toàn hệ thống | VOUCHER-013, VOUCHER-025 | COVER | Mã HETLUOT 100/100 bị từ chối |
| D06 | Lượt dùng mỗi khách | VOUCHER-014 | COVER | Tài khoản đã dùng GIAM20K bị từ chối lần 2 |
| D07 | Điều kiện đăng nhập | VOUCHER-015 | COVER | Khách chưa đăng nhập không áp được mã (Q-D07-01) |
| D08 | Phạm vi sản phẩm | VOUCHER-016 | COVER | Giỏ 2 danh mục, mã áp cho toàn giỏ |
| D09 | Cộng dồn, thay mã | VOUCHER-017 | MOT_PHAN | Có ghi đè bằng mã hợp lệ. Thiếu trường hợp mã mới không hợp lệ (TI-21 bị chặn) |
| D10 | Tiêu chí mã hợp lệ | VOUCHER-012, VOUCHER-018, VOUCHER-019, VOUCHER-020 | COVER | Chữ thường, khoảng trắng đầu cuối, ký tự đặc biệt, mã không tồn tại |
| D11 | Làm tròn | VOUCHER-021, VOUCHER-022 | MOT_PHAN | Chỉ dùng dữ liệu cho cùng kết quả ở cả 2 cơ sở tính. Thiếu trường hợp 2 cơ sở cho kết quả khác (TI-28 bị chặn) |
| D12 | Tiền giảm vượt tiền hàng | VOUCHER-023, VOUCHER-024 | COVER | Giảm lớn hơn và bằng tạm tính; theo Q-D12-01 trong gate_status.json (xem Ghi chú 1) |
| D13 | Thông báo lỗi | VOUCHER-025 | COVER | 4 nguyên nhân, 4 thông báo khác nhau; câu chữ chưa có |
| D14 | Thời điểm trừ lượt | VOUCHER-027, VOUCHER-028 | MOT_PHAN | Có tạm giữ khi Áp dụng và trừ khi Đặt hàng. Thiếu hành vi khi lượt cuối đang bị tạm giữ (TI-35 bị chặn, mâu thuẫn Q-D14-01 và Q-D18-01) |
| D15 | Hoàn lượt | VOUCHER-029, VOUCHER-030 | COVER | Hủy đơn và thanh toán thẻ thất bại |
| D16 | Giỏ thay đổi sau khi áp mã | VOUCHER-031 | COVER | Tổng tụt từ 230.000đ xuống 130.000đ, mã tự hủy |
| D17 | Gỡ mã | VOUCHER-026 | COVER | Tiền giảm về 0đ, tổng về 280.000đ |
| D18 | Thao tác đồng thời | — | CHUA_COVER | TI-36 bị chặn: điều kiện đầu vào mâu thuẫn giữa Q-D14-01 và Q-D18-01 |
| D19 | Mã mất hiệu lực giữa luồng | VOUCHER-032, VOUCHER-033 | COVER | Admin vô hiệu hóa và hết hạn trước Đặt hàng |
| D20 | Giảm trừ vào tổng gồm phí vận chuyển | VOUCHER-034, VOUCHER-001, VOUCHER-023 | COVER | Tổng = tạm tính + phí vận chuyển - tiền giảm (xem Ghi chú 2) |
| D21 | Chống dò mã | VOUCHER-035 | COVER | 6 lần sai không bị khóa (Q-D21-01) |
| D22 | Trạng thái chờ | VOUCHER-036, VOUCHER-037 | COVER | Spinner, vô hiệu hóa nút, bấm đúp chỉ 1 yêu cầu |
| D23 | Lưu vết mã trên đơn | VOUCHER-038 | COVER | Chi tiết đơn, Lịch sử đơn, email |
| X01 | Phạm vi Việt Nam, VND | VOUCHER-039 | COVER | Tiền hiển thị bằng VND, không có ngoại tệ. Địa chỉ Nhật Bản là NGOAI_PHAM_VI (TI-52) |

## Góc 2. Viewpoint Balance

| Viewpoint | Số TC | Tỉ lệ |
|---|---|---|
| VP-01 Happy Path | 2 | 5,1% |
| VP-02 Negative | 8 | 20,5% |
| VP-03 Boundary | 12 | 30,8% |
| VP-04 Security | 2 | 5,1% |
| VP-05 UX/Usability | 2 | 5,1% |
| VP-06 Performance | 2 | 5,1% |
| VP-07 Accessibility | 0 | 0% |
| VP-08 Integration | 11 | 28,2% |
| Ngoài danh sách | 0 | 0% |
| Tổng | 39 | 100% |

Tỉ lệ làm tròn 1 chữ số thập phân, cộng lại 99,9% do làm tròn.

## Góc 3. Boundary

| ID | Điểm | TC phủ | Nhãn phủ |
|---|---|---|---|
| B-01 | Tổng thấp hơn tối thiểu 1đ (199.999đ) | VOUCHER-004 | COVER |
| B-02 | Tổng bằng tối thiểu (200.000đ) | VOUCHER-005 | COVER |
| B-03 | Tổng cao hơn tối thiểu 1đ (200.001đ) | VOUCHER-006 | COVER |
| B-04 | Trước ngày hết hạn 1 ngày (29/11/2026) | VOUCHER-008 | COVER |
| B-05 | Đúng ngày hết hạn (30/11/2026 23:59:30) | VOUCHER-009 | COVER |
| B-06 | Sau ngày hết hạn (01/12/2026 00:00:00) | VOUCHER-010 | COVER |
| B-07 | Tiền giảm nhỏ hơn tiền hàng (20.000đ < 250.000đ) | VOUCHER-001 | COVER |
| B-08 | Tiền giảm bằng tiền hàng (300.000đ = 300.000đ) | VOUCHER-024 | COVER |
| B-09 | Tiền giảm lớn hơn tiền hàng (300.000đ > 250.000đ) | VOUCHER-023 | COVER |

## Gap

| GAP-ID | Góc | Dòng gốc | Mô tả | Rủi ro | Đề xuất test case |
|---|---|---|---|---|---|
| GAP-01 | Góc 1 | D01 | Chưa có TC mã Freeship áp thành công | TB | Sau khi BA trả lời câu hỏi của TI-03: mã FREESHIP, tạm tính 250.000đ + phí vận chuyển 30.000đ = 280.000đ, kiểm số tiền giảm và tổng mới theo câu trả lời |
| GAP-02 | Góc 1 | D02 | Chưa có TC mã % không chạm trần | CAO | Sau khi BA chốt giá trị tính giảm (TI-05): mã SALE10 (10%, trần 100.000đ), tạm tính 300.000đ + phí vận chuyển 30.000đ → giảm 30.000đ (tổng 300.000đ) nếu tính trên tạm tính, hoặc 33.000đ (tổng 297.000đ) nếu tính trên tổng |
| GAP-03 | Góc 1 | D09 | Chưa có TC đang áp mã A rồi nhập mã B không hợp lệ | CAO | Sau khi BA trả lời câu hỏi của TI-21: áp GIAM20K (tổng 260.000đ), nhập HETHAN1311 → kiểm GIAM20K còn hay bị gỡ, tổng 260.000đ hay 280.000đ |
| GAP-04 | Góc 1 | D11 | Chưa có TC làm tròn khi 2 cơ sở tính cho kết quả khác | CAO | Sau khi BA chốt giá trị tính giảm: SALE10, tạm tính 155.000đ + phí vận chuyển 30.000đ = 185.000đ → giảm 16.000đ (tổng 169.000đ) hoặc 19.000đ (tổng 166.000đ) |
| GAP-05 | Góc 1 | D14 | Chưa có TC khi lượt cuối đang bị tạm giữ | CAO | Sau khi BA giải mâu thuẫn Q-D14-01/Q-D18-01: mã còn 1 lượt, buyer07 áp thành công, buyer08 nhập cùng mã và bấm Áp dụng → kiểm buyer08 bị từ chối hay áp được |
| GAP-06 | Góc 1 | D18 | Chưa có TC tranh lượt cuối khi Đặt hàng đồng thời | CAO | Sau khi BA giải mâu thuẫn: mã còn 1 lượt, buyer07 và buyer08 cùng gửi Đặt hàng trong cùng 1 giây (công cụ gửi đồng thời) → 1 đơn thành công, 1 đơn bị từ chối với lỗi hết lượt, lượt đã dùng 100/100 |
| GAP-07 | Góc 2 | VP-07 | 0 TC Accessibility | Không có D-code (VP-07 KHONG_CO_DIEM); chưa xếp mức | Sau khi BA trả lời câu hỏi của TI-53: chỉ dùng bàn phím, Tab tới ô Mã giảm giá, nhập GIAM20K, Tab tới Áp dụng, Enter → giảm 20.000đ, tổng 260.000đ |

## Thống kê

| Góc | COVER | MOT_PHAN | CHUA_COVER |
|---|---|---|---|
| Góc 1. Requirement (29 dòng: 5 BR, 23 D-code, 1 mã X) | 23 | 5 | 1 |
| Góc 2. Viewpoint (8 viewpoint; có TC = COVER, 0 TC = CHUA_COVER) | 7 | 0 | 1 |
| Góc 3. Boundary (9 điểm) | 9 | 0 | 0 |

Tổng gap: 7 (6 ở Góc 1, 1 ở Góc 2, 0 ở Góc 3). 6/7 gap chỉ đóng được sau khi BA trả lời câu hỏi mới ở mục "Idea chưa viết được" của `OUTPUT/test_cases.md`.

## Ghi chú

1. D12: VOUCHER-023 theo Q-D12-01 trong gate_status.json (giảm tối đa bằng tạm tính, tổng còn phí vận chuyển 30.000đ). ER Q-D12-01 ở báo cáo Pha 2 ghi tổng về 0đ. Nếu BA chốt theo báo cáo thì VOUCHER-023 phải sửa Expected thành giảm 280.000đ, tổng 0đ.
2. D20: vì Q-D12-01 giới hạn tiền giảm cố định ở mức tạm tính, VOUCHER-034 cho cùng tổng tiền dù tiền giảm trừ vào tạm tính hay vào tổng. Test này kiểm công thức tổng tiền, không phân biệt được 2 phương án của Q-D20-01. Chỉ phân biệt được khi biết giá trị tính giảm của mã % hoặc cách giảm của mã Freeship.
3. Chưa có ngưỡng thời gian phản hồi khi kiểm tra mã (D22 chỉ xác nhận spinner và vô hiệu hóa nút). VOUCHER-036 không kiểm thời gian.
