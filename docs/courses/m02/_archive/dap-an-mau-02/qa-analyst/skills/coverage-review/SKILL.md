---
name: coverage-review
description: Rà độ phủ một bộ test theo 3 góc Requirement, Viewpoint Balance, Boundary, gán nhãn COVER, MOT_PHAN, CHUA_COVER, liệt kê gap kèm rủi ro và đề xuất test case, xuất OUTPUT/coverage_review.md. Dùng ở cuối Pha 3, sau khi có bộ test.
---

# Coverage Review

Mục đích: tìm chỗ bộ test chưa phủ. Trả lời: rule nào chưa có test, góc nào còn trống, điểm biên nào thiếu.

## Đầu vào

| File | Lấy gì |
|---|---|
| Bộ test cần review | Người dùng chỉ định. Mặc định `OUTPUT/test_cases.md` |
| `OUTPUT/requirement_autopsy_report.md` | Danh sách D-code, rủi ro, câu trả lời đã xác nhận |
| `OUTPUT/test_ideas.md` | Bảng rule gốc BR |
| `knowledge/test-viewpoints.md` | 8 viewpoint |

Bộ test khác mặc định thì tên file đầu ra thêm hậu tố, ví dụ `OUTPUT/coverage_review_lab4.md`.

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

Test case có Expected trái với câu trả lời đã xác nhận ở cổng chặn thì không tính phủ. Ghi gap loại "Test sai rule", nêu Q-ID.

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

1. Góc 1: liệt kê rule gốc BR và D01–D23, thêm mã X nếu có. Mỗi dòng ghi TC phủ và nhãn phủ.
2. Góc 2: đếm số TC theo 8 viewpoint. Test ghi viewpoint lạ (ví dụ "Edge Case") đếm vào dòng "Ngoài danh sách".
3. Góc 3: dò 9 điểm biên.
4. Mỗi dòng không phải `COVER`, mỗi viewpoint 0 TC, mỗi test sai rule thành 1 gap.
5. Mỗi gap ghi rủi ro (lấy theo D-code ở báo cáo Pha 2) và đề xuất 1 test case bổ sung có điều kiện cụ thể.

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| Coi test "chắc có kiểm" là COVER | Chỉ ra Title hoặc Steps nào nói điều đó |
| Tự thêm viewpoint mới | Đối chiếu 8 viewpoint cố định |
| Gap không có rủi ro | Lấy rủi ro theo D-code |
| Đề xuất test case chung chung | Đề xuất phải có điều kiện cụ thể |

## Đầu ra

Dùng khuôn `assets/coverage_review.md`, ghi `OUTPUT/coverage_review.md`.
