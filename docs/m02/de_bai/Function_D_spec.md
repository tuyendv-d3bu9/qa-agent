# Function D: Áp dụng Mã Giảm Giá (Voucher)

> Chuyển từ: `ĐỀ BÀI - Spec Function D.docx`. Chuyển sang Markdown, giữ nguyên nội dung. Mục 2 là khung nội dung trong file gốc, được đặt số mục để trích nguồn.

CO-WELL Tech Academy · Practical AI for Manual Testers — Hệ thống Thương mại điện tử "ShopGo"

Chức năng được yêu cầu kiểm thử trong phần thực hành này là Function D: Áp dụng Mã Giảm Giá (Voucher). Lát cắt tính năng này nằm ở bước Thanh toán của nhóm tính năng E.

## 1. Bối cảnh chức năng

1. Hệ thống ShopGo là một ứng dụng web bán lẻ trực tuyến có hỗ trợ responsive cho cả desktop và mobile web.
2. Đối tượng người dùng cuối là khách mua hàng tại Việt Nam.
3. Đơn vị tiền tệ hiển thị và thanh toán là VNĐ, ngôn ngữ giao diện là tiếng Việt.

## 2. Mô tả chức năng

### 2.1 Vị trí

Tại trang Thanh toán, khách hàng có ô nhập "Mã giảm giá" và nút "Áp dụng".

### 2.2 Hành động

Khi khách hàng nhập mã rồi bấm Áp dụng, hệ thống sẽ kiểm tra mã và áp dụng phần giảm vào tổng đơn hàng.

### 2.3 Các quy tắc đã nêu

1. Có 2 loại mã: giảm theo phần trăm (%) và giảm số tiền cố định (VND).
2. Mã chỉ dùng được khi đơn hàng đạt giá trị tối thiểu quy định của mã.
3. Mỗi mã có ngày hết hạn.
4. Áp dụng thành công → hiển thị số tiền được giảm và tổng tiền mới.
5. Mã không hợp lệ hoặc hết hạn → hiển thị thông báo lỗi.
