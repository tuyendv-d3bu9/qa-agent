# Bộ test mẫu Lab 4

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

