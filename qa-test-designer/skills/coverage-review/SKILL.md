---
name: coverage-review
description: Rà bộ test theo 3 góc (Requirement ↔ Test Suite, Viewpoint Balance, Boundary), gán nhãn COVER, MOT_PHAN, CHUA_COVER và liệt kê gap kèm rủi ro, đề xuất test case. Dùng ở bước Coverage Review (cuối) của Pha 3; đọc bộ test (OUTPUT/test_cases.md hoặc assets/lab4_test_suite.md), OUTPUT/requirement_autopsy_report.md, OUTPUT/viewpoints.md, ../qa-analyst/knowledge/viewpoints.md và ghi OUTPUT/coverage_review.md (với bộ Lab 4 thì ghi OUTPUT/coverage_review_lab4.md).
---

# Coverage Review

## Mục đích

Tìm chỗ bộ test chưa phủ. Trả lời: rule nào chưa có test, góc nào còn trống, điểm biên nào thiếu.

## Đầu vào, đầu ra

| | File | Lấy gì |
|---|---|---|
| Đầu vào | Bộ test cần review | `OUTPUT/test_cases.md` hoặc bộ test mẫu Lab 4 |
| Đầu vào | `OUTPUT/requirement_autopsy_report.md` | Danh sách rule, D-code, rủi ro |
| Đầu vào | `OUTPUT/viewpoints.md` | 8 viewpoint |
| Đầu ra | `OUTPUT/coverage_review.md` | 3 góc nhìn + danh sách gap |

Danh sách 8 viewpoint: xem `../qa-analyst/knowledge/viewpoints.md`.

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

Danh sách 8 viewpoint: xem `../qa-analyst/knowledge/viewpoints.md`.

## Khuôn đầu ra

Dùng khuôn `assets/coverage_review.md`.

## Bộ test mẫu cho Lab 4

Bộ test mẫu: `assets/lab4_test_suite.md`.

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| Coi test "chắc có kiểm" là COVER | Chỉ ra Title hoặc Steps nào nói điều đó |
| Tự thêm viewpoint mới | Đối chiếu 8 viewpoint cố định |
| Gap không có rủi ro | Lấy rủi ro theo D-code |
| Đề xuất test case chung chung | Đề xuất phải có điều kiện cụ thể |

## Coverage thấp có xấu không

Không hẳn. Bộ test viết từ tài liệu sẽ chỉ phủ phần tài liệu nói. Coverage Review có giá trị khi chỉ rõ chỗ trống, vì sao trống, ai cần trả lời.

