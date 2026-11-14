# Coverage Review bằng AI

## Mục đích

Tìm chỗ bộ test chưa phủ. Trả lời: rule nào chưa có test, góc nào còn trống, điểm biên nào thiếu.

## Đầu vào, đầu ra

| | File | Lấy gì |
|---|---|---|
| Đầu vào | Bộ test cần review | `OUTPUT/test_cases.md` hoặc bộ test mẫu Lab 4 |
| Đầu vào | `OUTPUT/requirement_autopsy_report.md` | Danh sách rule, D-code, rủi ro |
| Đầu vào | `OUTPUT/viewpoints.md` | 8 viewpoint |
| Đầu ra | `OUTPUT/coverage_review.md` | 3 góc nhìn + danh sách gap |

## 3 góc nhìn

| Góc | Câu hỏi | Ví dụ gap |
|---|---|---|
| Requirement ↔ Test Suite | Rule nào chưa có test? | Chưa test giới hạn lượt dùng mỗi khách |
| Viewpoint Balance | Viewpoint nào thiếu test? | 0 test Performance, 0 test Integration |
| Boundary Completeness | Điểm biên nào thiếu? | Có test bằng tối thiểu, thiếu test thấp hơn 1đ |

## Nhãn phủ

| Nhãn | Khi nào |
|---|---|
| `COVER` | Có test case kiểm đúng chủ đề, điều kiện cụ thể |
| `MOT_PHAN` | Có test chạm chủ đề nhưng thiếu trường hợp chính |
| `CHUA_COVER` | Không có test nào |

Chỉ dựa vào Title, Steps, Expected. Không đoán "chắc test này có kiểm".

## Điểm biên cần có

| ID | Biên | Điểm | D-code |
|---|---|---|---|
| B-01 | Giá trị tối thiểu | Thấp hơn 1đ | D03 |
| B-02 | Giá trị tối thiểu | Bằng | D03 |
| B-03 | Giá trị tối thiểu | Cao hơn 1đ | D03 |
| B-04 | Ngày hết hạn | Trước 1 ngày | D04 |
| B-05 | Ngày hết hạn | Đúng ngày | D04 |
| B-06 | Ngày hết hạn | Sau 1 ngày | D04 |
| B-07 | Tiền giảm so với tiền hàng | Nhỏ hơn | D12 |
| B-08 | Tiền giảm so với tiền hàng | Bằng | D12 |
| B-09 | Tiền giảm so với tiền hàng | Lớn hơn | D12 |

Test chỉ nói "dưới tối thiểu" mà không đúng 1đ thì ghi `MOT_PHAN`.

## Cách làm

1. Góc 1: liệt kê rule gốc (BR) và D01–D23. Mỗi dòng ghi TC phủ và nhãn phủ.
2. Góc 2: đếm số TC theo 8 viewpoint. Test ghi viewpoint lạ (ví dụ "Edge Case") đếm vào dòng "Ngoài danh sách".
3. Góc 3: dò 9 điểm biên.
4. Mỗi dòng không phải `COVER`, và mỗi viewpoint 0 TC, thành 1 gap.
5. Mỗi gap ghi rủi ro (lấy theo D-code) và đề xuất 1 test case bổ sung.

## Khuôn đầu ra

```markdown
# Coverage Review — <tên bộ test>

## Góc 1. Requirement ↔ Test Suite
| Dòng | Nội dung | TC phủ | Nhãn phủ | Lý do |
|---|---|---|---|---|

## Góc 2. Viewpoint Balance
| Viewpoint | Số TC | Tỉ lệ |
|---|---|---|
| Ngoài danh sách | | |
| Tổng | | 100% |

## Góc 3. Boundary
| ID | Điểm | TC phủ | Nhãn phủ |
|---|---|---|---|

## Gap
| GAP-ID | Góc | Dòng gốc | Mô tả | Rủi ro | Đề xuất test case |
|---|---|---|---|---|---|
```

## Bộ test mẫu cho Lab 4

| TC_ID | Title | Priority | Viewpoint |
|---|---|---|---|
| TC-01 | Áp mã voucher hợp lệ, đơn đủ điều kiện | Critical | Happy Path |
| TC-02 | Áp mã với giá trị đơn đúng bằng min order | High | Boundary |
| TC-03 | Áp mã khi đơn dưới min order | High | Negative |
| TC-04 | Áp mã đã hết hạn | Medium | Negative |
| TC-05 | Nhập mã không tồn tại | Medium | Negative |
| TC-06 | Xóa voucher đã áp, tổng tiền tính lại đúng | High | Happy Path |
| TC-07 | Áp mã giảm giá bằng đúng tổng tiền đơn (đơn = 0đ) | High | Boundary |
| TC-08 | Nhập mã với ký tự đặc biệt | Low | Negative |
| TC-09 | Áp mã thành công, chuyển sang bước thanh toán | Critical | Happy Path |
| TC-10 | Nhập sai mã voucher 5 lần liên tiếp | Medium | Security |
| TC-11 | Áp 2 mã voucher cùng lúc | Medium | Negative |
| TC-12 | Voucher hiển thị đúng số tiền giảm trên UI | Medium | UX |
| TC-13 | Mất mạng giữa lúc đang áp voucher | Medium | Edge Case |
| TC-14 | Checkout không đăng nhập vẫn áp được voucher | Medium | Happy Path |
| TC-15 | Voucher áp thành công lưu đúng trong lịch sử đơn hàng | High | Happy Path |

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| Coi test "chắc có kiểm" là COVER | Chỉ ra Title hoặc Steps nào nói điều đó |
| Tự thêm viewpoint mới | Đối chiếu 8 viewpoint cố định |
| Gap không có rủi ro | Lấy rủi ro theo D-code |
| Đề xuất test case chung chung | Đề xuất phải có điều kiện cụ thể |

## Coverage thấp có xấu không

Không hẳn. Bộ test viết từ tài liệu sẽ chỉ phủ phần tài liệu nói. Coverage Review có giá trị khi chỉ rõ chỗ trống, vì sao trống, ai cần trả lời.

## Dùng cho phần sau

- Module 3: gap là đầu vào cho coverage strategy theo rủi ro.
- Module 5: số liệu phủ đưa vào QA Report.
