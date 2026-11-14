# Phân tích screenshot bằng AI Vision

## Mục đích

Đưa ảnh màn hình cho AI tìm lỗi giao diện, lỗi accessibility, lỗi trải nghiệm. Người kiểm lại bằng mắt trước khi dùng.

## Đầu vào, đầu ra

| | File | Lấy gì |
|---|---|---|
| Đầu vào | Ảnh chụp màn hình Checkout | Từ 2 màn hình trở lên |
| Đầu ra | OUTPUT/ui_review.md | Danh sách vấn đề |

## 3 nhóm vấn đề

| Nhóm | Ví dụ trên Checkout |
|---|---|
| UI_INCONSISTENCY | Nút Áp dụng lúc bo góc lúc vuông, khoảng cách ô mã không đều |
| ACCESSIBILITY | Chữ xám nhạt trên nền trắng ở dòng "Đã áp mã giảm giá", nút quá sát nhau |
| UX_PROBLEM | Không có trạng thái đang xử lý khi kiểm tra mã, thông báo lỗi khó hiểu |

## Cách làm

1. Chụp màn hình rõ nét, đủ khung. Ghi tên màn hình và bước checkout.
2. Đưa ảnh cho AI, yêu cầu chỉ nhận xét những gì nhìn thấy.
3. Mỗi vấn đề ghi: vị trí, lý do, mức độ, đề xuất sửa.
4. Người kiểm từng dòng bằng mắt. Dòng nào không thấy trên ảnh thì bỏ.

## Giới hạn

- AI không thấy hover, animation, chuyển trang.
- Ảnh mờ thì AI dễ bịa. Luôn kiểm lại bằng mắt.
- AI không biết rule nghiệp vụ. Vấn đề về tiền, về rule thì không lấy từ bài này.

## Khuôn đầu ra

```markdown
# UI Review: Checkout

| UI-ID | Màn hình | Nhóm | Vị trí | Vấn đề | Lý do | Mức | Đề xuất sửa | Đã kiểm bằng mắt |
|---|---|---|---|---|---|---|---|---|
```

Mức: CAO, TB, THAP. Đã kiểm bằng mắt: CO hoặc KHONG.

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| AI đoán hành vi không có trên ảnh | Bỏ dòng đó |
| Không ghi vị trí | Ghi vùng trên màn hình, gần thành phần nào |
| Dùng luôn không kiểm | Cột "Đã kiểm bằng mắt" phải là CO |

## Dùng cho phần sau

- Vấn đề CAO đưa sang Module 5 để viết bug report kèm ảnh.
