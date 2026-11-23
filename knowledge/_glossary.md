# Thuật Ngữ Nghiệp Vụ Toàn Hệ Thống (_glossary.md)

> File này định nghĩa chính xác các thuật ngữ nghiệp vụ xuyên suốt mọi tính năng của dự án.
> Giúp Agent, Tester, BA và Developer hiểu cùng một nghĩa, tránh nhầm lẫn logic khi phân tích.

Dự án: `<điền>` · Cập nhật: `<điền>`

> Bảng bắt đầu trống. Chỉ ghi thuật ngữ có nguồn; agent không tự định nghĩa thay dự án.

---

## 1. Người Dùng & Phân Quyền (Users & Roles)

| Thuật ngữ | Tiếng Anh tương đương | Định nghĩa chính xác | Ranh giới / Lưu ý |
|---|---|---|---|
| Khách vãng lai | Guest | Xem sản phẩm, thêm vào giỏ; phải đăng nhập khi thanh toán | Nguồn: `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 3; `gate_status.json` Q-D07-01 |
| Khách hàng | Customer | Đã đăng ký; có hồ sơ, sổ địa chỉ, Ví ShopGo, lịch sử đơn; được áp dụng mã giảm giá | Nguồn: `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 3; `gate_status.json` Q-D07-01 |
| Nhân viên CSKH / Admin | Customer Support / Admin | Quản lý đơn, mã giảm giá, sản phẩm (back-office) | Nguồn: `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 3, 8 |

---

## 2. Thực Thể Nghiệp Vụ Cốt Lõi (Core Domain Entities)

| Thuật ngữ | Tiếng Anh tương đương | Định nghĩa chính xác | Ranh giới / Lưu ý |
|---|---|---|---|
| SKU | Stock Keeping Unit | Mã sản phẩm / đơn vị lưu kho | Nguồn: `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 6 |
| Tồn kho | Stock | Số lượng sản phẩm còn trong kho | Nguồn: `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 6 |
| COD | Cash On Delivery | Thu tiền khi nhận hàng | Nguồn: `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 6 |
| Voucher | Voucher / Discount code | Mã giảm giá (% hoặc số tiền cố định) | Nguồn: `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 6; `INPUT/Spec Function D.md` mục 1 |
| Ví ShopGo | ShopGo Wallet | Số dư trả trước của khách hàng | Nguồn: `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 6 |
| Hoàn tiền | Refund | Hoàn tiền về ví | Nguồn: `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 6 |

---

## 3. Trạng Thái Vòng Đời (Lifecycle States)

| Trạng thái | Ý nghĩa | Hành vi hệ thống |
|---|---|---|
| Chờ xác nhận | Đơn hàng mới tạo, chờ xác nhận | Nguồn: `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 6 |
| Đang giao | Đơn hàng đang được đơn vị vận chuyển giao | Nguồn: `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 6 |
| Hoàn tất | Đơn hàng đã giao thành công | Nguồn: `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 6 |
| Đã hủy | Đơn hàng bị hủy | Nguồn: `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 6 |

---

## 4. Tham Số & Công Thức Tính Toán (Parameters & Calculations)

| Thuật ngữ | Tiếng Anh tương đương | Định nghĩa & Công thức | Đơn vị / Định dạng |
|---|---|---|---|
| Giá trị đơn tối thiểu | Min order value | Giá trị đơn hàng tối thiểu quy định để mã có hiệu lực | Nguồn: `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 6; `INPUT/Spec Function D.md` mục 1; `gate_status.json` Q-D03-01, Q-D03-02 |
| Trần giảm tối đa | Max discount cap | Mức giảm tối đa áp dụng cho mã % | Nguồn: `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 6; `gate_status.json` Q-D02-01 |
