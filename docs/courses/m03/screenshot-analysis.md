# Phân tích screenshot bằng AI Vision

## Mục đích

Đưa ảnh màn hình cho AI tìm lỗi giao diện, lỗi accessibility, lỗi trải nghiệm. Người kiểm lại bằng mắt trước khi dùng.

Agent qa-ui-review tự mở website bằng Playwright MCP, tự chụp màn hình rồi phân tích. URL lấy từ knowledge/_sut.json (bài sut-profile), không dán link vào câu lệnh, không tự đoán link.

## Đầu vào, đầu ra

| | File | Lấy gì |
|---|---|---|
| Đầu vào | knowledge/_sut.json | URL website |
| Đầu vào | OUTPUT/sut_profile.md | Các màn đã biết, cách đi tới Checkout |
| Đầu ra | OUTPUT/ui_review/*.png | Ảnh agent tự chụp, từ 2 màn hình Checkout trở lên |
| Đầu ra | OUTPUT/ui_review.md | Danh sách vấn đề |

## 3 nhóm vấn đề

| Nhóm | Ví dụ trên Checkout |
|---|---|
| UI_INCONSISTENCY | Nút Áp dụng lúc bo góc lúc vuông, khoảng cách ô mã không đều |
| ACCESSIBILITY | Chữ xám nhạt trên nền trắng ở dòng "Đã áp mã giảm giá", nút quá sát nhau |
| UX_PROBLEM | Không có trạng thái đang xử lý khi kiểm tra mã, thông báo lỗi khó hiểu |

## Cách làm

1. Lấy URL trong knowledge/_sut.json. Không có URL hoặc không mở được web thì dừng, báo người dùng. Không tả màn hình khi chưa chụp được.
2. Dùng Playwright MCP mở web, đi tới Checkout. Chụp từng trạng thái: trước khi nhập mã, áp mã thành công, áp mã lỗi. Ảnh rõ nét, đủ khung, lưu ở OUTPUT/ui_review/, tên file ghi màn hình và trạng thái.
3. Xem từng ảnh, chỉ nhận xét những gì nhìn thấy trên ảnh.
4. Mỗi vấn đề ghi: tên ảnh, vị trí, lý do, mức độ, đề xuất sửa.
5. Ghi xong OUTPUT/ui_review.md thì dừng ở cổng QA, cột "Đã kiểm bằng mắt" để KHONG.
6. Người kiểm từng dòng bằng mắt, điền CO. Dòng nào không thấy trên ảnh thì bỏ.

## Giới hạn

- AI không thấy hover, animation, chuyển trang.
- Ảnh mờ thì AI dễ bịa. Luôn kiểm lại bằng mắt.
- AI không biết rule nghiệp vụ. Vấn đề về tiền, về rule thì không lấy từ bài này.
- Khi tự đi trên web: không nhập dữ liệu cá nhân thật, không đăng nhập bằng tài khoản thật, không thanh toán thật. Mã giảm giá để thử lấy từ tài liệu hoặc người dùng đưa, không tự bịa.

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
