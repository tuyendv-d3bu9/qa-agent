# Tri thức dự án — ShopGo Function D

Nguồn: `INPUT/Spec Function D.md` (BR-xx, đánh số theo thứ tự gạch đầu dòng "Các quy tắc đã nêu"), `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md`, câu trả lời RESOLVED trong `gate_status.json` (Q-ID), `OUTPUT/requirement_autopsy_report.md`. Không lấy rule từ `knowledge/voucher-domain.md`.

## 1. Rule đã xác nhận
| ID | D-code | Rule | Nguồn (BR-xx / Q-ID) |
|---|---|---|---|
| R01 | D01 | Có 2 loại mã: giảm theo phần trăm (%) và giảm số tiền cố định (VND). | BR-01 |
| R02 | D03 | Mã chỉ dùng được khi đơn hàng đạt giá trị tối thiểu quy định của mã. | BR-02 |
| R03 | D04 | Mỗi mã có ngày hết hạn. | BR-03 |
| R04 | D20, D23 | Áp dụng thành công thì hiển thị số tiền được giảm và tổng tiền mới. | BR-04 |
| R05 | D10, D13 | Mã không hợp lệ hoặc hết hạn thì hiển thị thông báo lỗi. | BR-05 |
| R06 | D01 | Ô "Mã giảm giá" có hỗ trợ mã Freeship (mặc định áp dụng cho hóa đơn từ 200.000đ). | Q-D01-01 |
| R07 | D02 | Mã % có trần giảm tối đa, cấu hình theo từng mã. | Q-D02-01 |
| R08 | D03 | Giá trị đơn tối thiểu so trên tổng tiền đơn hàng đã bao gồm phí vận chuyển. | Q-D03-01 |
| R09 | D03 | "Đạt giá trị tối thiểu" là lớn hơn hoặc bằng (>=) giá trị tối thiểu quy định. | Q-D03-02 |
| R10 | D04 | Mã có hiệu lực đến 23:59:59 của ngày hết hạn. | Q-D04-01 |
| R11 | D04 | Hạn mã kiểm tra theo múi giờ Việt Nam (GMT+7). | Q-D04-02 |
| R12 | D05 | Mã có giới hạn tổng lượt dùng toàn hệ thống; hết lượt thì không dùng được nữa. | Q-D05-01 |
| R13 | D06 | Mỗi tài khoản khách hàng áp dụng thành công một mã tối đa 1 lần. | Q-D06-01 |
| R14 | D07 | Bắt buộc đăng nhập tài khoản trước mới được nhập và áp dụng mã. | Q-D07-01 |
| R15 | D08 | Mã áp dụng cho toàn bộ sản phẩm trong giỏ hàng. | Q-D08-01 |
| R16 | D08 | Mã giới hạn phạm vi, giỏ có cả sản phẩm thuộc và không thuộc phạm vi: không cho áp mã. | Q-D08-02 |
| R17 | D09 | Tối đa 1 mã giảm giá trên một đơn hàng. | Q-D09-01 |
| R18 | D09 | Đã áp mã A, nhập mã B hợp lệ thì mã B tự động ghi đè thay mã A. | Q-D09-02 |
| R19 | D10 | Mã không phân biệt hoa/thường, hệ thống tự chuyển thành chữ in hoa. | Q-D10-01 |
| R20 | D10 | Hệ thống tự cắt khoảng trắng thừa đầu/cuối trước khi kiểm tra mã. | Q-D10-02 |
| R21 | D11 | Tiền giảm của mã % có phần lẻ được làm tròn số học đến hàng nghìn 1.000đ. | Q-D11-01 |
| R22 | D12 | Mã cố định lớn hơn tạm tính: tiền giảm tối đa bằng tạm tính, tiền hàng sau giảm về 0đ. | Q-D12-01 |
| R23 | D13 | Thông báo lỗi tách theo nguyên nhân: Hết hạn, Chưa đủ đơn tối thiểu, Hết lượt dùng, Mã không tồn tại. | Q-D13-01 |
| R24 | D13 | Thông báo lỗi hiển thị ngay dưới ô "Mã giảm giá". | Q-D13-02 |
| R25 | D14 | Tạm giữ lượt khi Áp dụng mã thành công, trừ chính thức khi Đặt hàng thành công. | Q-D14-01 |
| R26 | D15 | Đơn có mã bị hủy hoặc thanh toán thẻ thất bại: tự động hoàn lại lượt dùng mã. | Q-D15-01 |
| R27 | D15 | Thanh toán thẻ/Ví ShopGo thất bại: hoàn lượt, khách áp lại được. | Q-D15-02 |
| R28 | D16 | Sửa giỏ làm đơn dưới mức tối thiểu: tự động hủy áp dụng mã và thông báo đơn không còn đủ điều kiện hưởng ưu đãi. | Q-D16-01 |
| R29 | D16 | Đã áp mã %, đổi số lượng (vẫn đạt ngưỡng): tiền giảm tự tính lại theo giỏ mới. | Q-D16-02 |
| R30 | D16 | Phiên đăng nhập hết hạn sau khi áp mã: mất mã, khách phải áp lại. | Q-D16-03 |
| R31 | D17 | Có nút hoặc biểu tượng gỡ mã; bấm thì gỡ mã và tính lại tổng tiền ban đầu. | Q-D17-01 |
| R32 | D18 | Mã còn 1 lượt, 2 khách cùng Đặt hàng: đơn ghi nhận trước tại máy chủ thành công, đơn sau báo lỗi mã đã hết lượt. | Q-D18-01 |
| R33 | D19 | Kiểm tra lại mã khi bấm Đặt hàng; mã hết hạn hoặc bị Admin vô hiệu hóa thì từ chối tạo đơn và thông báo mã không còn hiệu lực. | Q-D19-01 |
| R34 | D20 | Tiền giảm (% và cố định) trừ vào tổng giá trị đơn hàng, gồm cả tiền hàng và phí vận chuyển. | Q-D20-01 |
| R35 | D20 | Đổi địa chỉ giao làm thay đổi phí ship sau khi áp mã: mã được kiểm tra và tính lại. | Q-D20-02 |
| R36 | D21 | Không giới hạn số lần nhập mã sai. | Q-D21-01 |
| R37 | D21 | Tiền giảm dùng giá trị giao diện gửi lên. (Còn mở, xem M06) | Q-D21-02 |
| R38 | D22 | Bấm Áp dụng: hiển thị spinner/loading và vô hiệu hóa nút Áp dụng trong khi chờ API phản hồi. | Q-D22-01 |
| R39 | D23 | Lưu vết đầy đủ mã và số tiền được giảm, hiển thị trong chi tiết đơn, lịch sử đơn và email xác nhận. | Q-D23-01 |
| R40 | X01 | Chỉ phục vụ khách mua hàng và giao hàng tại Việt Nam, tiền tệ VNĐ. | Q-X01-01 |
| R41 | X01 | Không áp dụng tiền tệ, múi giờ Nhật Bản vì chỉ bán tại Việt Nam. | Q-X01-02 |

## 2. Mâu thuẫn còn mở, cần hỏi lại BA
| ID | Mô tả | Nguồn mâu thuẫn |
|---|---|---|
| M01 | Tiền giảm vượt tạm tính và phí ship: Q-D12-01 giới hạn tiền giảm tối đa bằng tạm tính (tiền hàng về 0đ); Expected Result D12 ở Phần B viết đúng theo Q-D12-01 nên không lệch với Phần B. Nhưng Q-D20-01 nói tiền giảm trừ vào tổng gồm cả phí ship. Chưa rõ phần giá trị mã còn dư có được trừ tiếp vào phí ship không, tức trần là tạm tính hay tổng gồm ship. | Q-D12-01, Q-D20-01, Phần B dòng D12 |
| M02 | Thời điểm giữ lượt: Q-D14-01 tạm giữ lượt ngay khi Áp dụng thành công; Q-D18-01 chọn "đơn ghi nhận trước tại máy chủ thành công" và loại phương án giữ chỗ khi Áp dụng. Nếu lượt cuối đã được tạm giữ khi khách thứ nhất Áp dụng, khách thứ hai không thể áp mã nên không có tình huống 2 đơn tranh chấp như Q-D18-01 mô tả. | Q-D14-01, Q-D18-01 |
| M03 | Điều kiện ngoài phương án ở Q-D01-01: câu trả lời thêm "mặc định áp dụng cho hóa đơn từ 200.000đ". Chưa rõ "hóa đơn" tính trên tạm tính hay tổng gồm ship (Q-D03-01 dùng tổng gồm ship), toán tử "từ" có tương đương >= (Q-D03-02) không, và "mặc định" có bị ghi đè bởi giá trị tối thiểu cấu hình riêng từng mã (BR-02) không. | Q-D01-01, Q-D03-01, Q-D03-02, BR-02 |
| M04 | Cơ sở tính tiền giảm %: phương án B của Q-D02-01 diễn đạt "% trên tổng tiền hàng", trong khi Q-D20-01 trả lời tiền giảm trừ vào tổng gồm cả phí vận chuyển. Chưa rõ % tính trên tạm tính hay trên tổng có phí ship; ảnh hưởng tiền giảm, trần (Q-D02-01) và làm tròn (Q-D11-01). | Q-D02-01, Q-D20-01, Q-D11-01 |
| M05 | Phạm vi mã: Q-D08-01 trả lời mã áp dụng cho toàn bộ sản phẩm trong giỏ (không giới hạn danh mục), nhưng Q-D08-02 trả lời "Không cho áp mã" khi giỏ lẫn sản phẩm ngoài phạm vi, ngầm định tồn tại mã có giới hạn phạm vi. Hai câu trả lời không cùng đúng được. | Q-D08-01, Q-D08-02 |
| M06 | Toàn vẹn tiền giảm: Q-D21-02 chọn "Dùng giá trị giao diện gửi lên". Đây là rủi ro bảo mật: người dùng có thể sửa request để tự đặt số tiền giảm, lệch với các rule tính tiền do hệ thống quyết định (trần Q-D02-01, làm tròn Q-D11-01, giới hạn Q-D12-01, tính lại Q-D16-02, Q-D20-02). Kết hợp Q-D21-01 (không giới hạn nhập sai) làm tăng rủi ro lạm dụng. Ghi nhận rủi ro, không tự ghi đè câu trả lời; cần BA/PO xác nhận lại. | Q-D21-02, Q-D21-01, Q-D02-01, Q-D11-01, Q-D12-01 |
| M07 | Lượt tạm giữ khi mất phiên: Q-D16-03 nói phiên hết hạn thì mất mã, khách phải áp lại; Q-D14-01 tạm giữ lượt khi Áp dụng. Chưa rõ lượt đã tạm giữ có được nhả khi mất mã không; nếu không nhả, khi áp lại có bị chặn bởi giới hạn 1 lần/tài khoản (Q-D06-01) hoặc hết tổng lượt (Q-D05-01) không. Tương tự chưa rõ khi gỡ mã (Q-D17-01), mã bị ghi đè (Q-D09-02) hoặc tự hủy do dưới ngưỡng (Q-D16-01). | Q-D16-03, Q-D14-01, Q-D06-01, Q-D05-01, Q-D17-01, Q-D09-02, Q-D16-01 |

## 3. Ngoài phạm vi
| Hạng mục | Nguồn |
|---|---|
| Back-office admin chi tiết | `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 8 |
| Tích hợp ERP/kho | `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 8 |
| Load test (hiệu năng tải cao) | `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 8 |
| Native mobile app | `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 8 |
| Mua hàng và giao hàng sang Nhật Bản, chuyển đổi ngoại tệ | Q-X01-01 |
| Tiền tệ và múi giờ Nhật Bản cho hiệu lực mã | Q-X01-02 |
