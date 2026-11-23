# Voucher — Feature Knowledge

> Dữ kiện nghiệp vụ **có nguồn** của một tính năng. Mọi agent đọc file này trước khi chạy.
> Luật đọc/ghi: `qa-system/core/QA_STANDARD.md` §8. Schema bảng: §9.
>
> File được tạo tự động khi intake (hoặc `npm run knowledge:new <feature-slug>`) và **bắt đầu trống**.
> Dòng còn `<điền>` hoặc bảng chưa có dòng = chưa khai báo — agent coi như không có, không tự điền giá trị.

Feature slug: `voucher` · Nguồn tài liệu: `INPUT/` · Cập nhật lần cuối: `2026-11-21` · Trạng thái tổng thể: `DRAFT`

---



## 1. TỔNG QUAN TÍNH NĂNG (FEATURE OVERVIEW)
Chức năng Function D: Áp dụng Mã Giảm Giá (Voucher) tại trang Thanh toán của hệ thống thương mại điện tử ShopGo. Cho phép khách hàng nhập mã giảm giá (% hoặc số tiền cố định hoặc freeship) để giảm trừ vào đơn hàng khi thỏa mãn các điều kiện quy định. (Nguồn: `INPUT/Spec Function D.md` §1; `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` §1)

## 2. TÁC NHÂN & PHÂN QUYỀN (ACTORS & ROLES)

| Tác nhân (Actor) | Quyền hạn trong tính năng này | Điều kiện tiên quyết | Nguồn (file §mục) |
|---|---|---|---|
| Khách hàng (Customer) | Nhập mã giảm giá, bấm Áp dụng, gỡ mã, nhận số tiền giảm trừ vào tổng đơn | Đã đăng ký và bắt buộc đăng nhập tài khoản trước khi áp dụng mã | `INPUT/Spec Function D.md` §1; `gate_status.json` Q-D07-01 |
| Khách vãng lai (Guest) | Xem sản phẩm, thêm vào giỏ hàng; không được áp dụng mã giảm giá khi chưa đăng nhập | Chưa đăng nhập | `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` §3; `gate_status.json` Q-D07-01 |
| Nhân viên CSKH / Admin | Quản lý, cấu hình mã giảm giá (back-office) | Tài khoản quản trị | `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` §3, §8 |

## 3. QUY TẮC NGHIỆP VỤ ĐÃ XÁC NHẬN (CONFIRMED BUSINESS RULES)
> Chỉ rule **có nguồn**: tài liệu (kèm trích nguyên văn) hoặc quyết định ở Mục 8 (`knowledge §8 #n`).
> Điều chưa rõ nằm ở Mục 7.

| ID | Điều kiện | Hành vi / Kết quả | Nguồn (file §mục) | Trích nguyên văn | Trạng thái |
|---|---|---|---|---|---|
| BR-01 | Phân loại mã | Có 2 loại mã: giảm theo phần trăm (%) và giảm số tiền cố định (VND) | `INPUT/Spec Function D.md` §1 | "Có 2 loại mã: giảm theo phần trăm (%) và giảm số tiền cố định (VND)." | Confirmed |
| BR-02 | Giá trị đơn tối thiểu | Mã chỉ dùng được khi đơn hàng đạt giá trị tối thiểu quy định của mã | `INPUT/Spec Function D.md` §1 | "Mã chỉ dùng được khi đơn hàng đạt giá trị tối thiểu quy định của mã." | Confirmed |
| BR-03 | Thời hạn mã | Mỗi mã có ngày hết hạn | `INPUT/Spec Function D.md` §1 | "Mỗi mã có ngày hết hạn." | Confirmed |
| BR-04 | Áp dụng thành công | Hiển thị số tiền được giảm và tổng tiền mới | `INPUT/Spec Function D.md` §1 | "Áp dụng thành công → hiển thị số tiền được giảm và tổng tiền mới." | Confirmed |
| BR-05 | Áp dụng thất bại | Mã không hợp lệ hoặc hết hạn → hiển thị thông báo lỗi | `INPUT/Spec Function D.md` §1 | "Mã không hợp lệ hoặc hết hạn → hiển thị thông báo lỗi." | Confirmed |
| R06 | D01: Ô "Mã giảm giá" có hỗ trợ mã Freeship (mặc định áp dụng cho hóa đơn từ 200.000đ). | Áp dụng theo quyết định | `gate_status.json` Q-D01-01 (knowledge §8 #1) | "A. Có hỗ trợ mã Freeship (nhưng mặc định áp dụng cho hóa đơn từ 200.000đ)" | Confirmed |
| R07 | D02: Mã % có trần giảm tối đa, cấu hình theo từng mã. | Áp dụng theo quyết định | `gate_status.json` Q-D02-01 (knowledge §8 #2) | "A. Có trần giảm tối đa (cấu hình theo từng mã cụ thể)" | Confirmed |
| R08 | D03: Giá trị đơn tối thiểu so trên tổng tiền đơn hàng đã bao gồm phí vận chuyển. | Áp dụng theo quyết định | `gate_status.json` Q-D03-01 (knowledge §8 #3) | "B. Tổng tiền đơn hàng (đã bao gồm phí vận chuyển)" | Confirmed |
| R09 | D03: "Đạt giá trị tối thiểu" là lớn hơn hoặc bằng (>=) giá trị tối thiểu quy định. | Áp dụng theo quyết định | `gate_status.json` Q-D03-02 (knowledge §8 #4) | "A. Lớn hơn hoặc bằng (>= giá trị tối thiểu quy định)" | Confirmed |
| R10 | D04: Mã có hiệu lực đến 23:59:59 của ngày hết hạn. | Áp dụng theo quyết định | `gate_status.json` Q-D04-01 (knowledge §8 #5) | "A. Đến 23:59:59 của ngày hết hạn" | Confirmed |
| R11 | D04: Hạn mã kiểm tra theo múi giờ Việt Nam (GMT+7). | Áp dụng theo quyết định | `gate_status.json` Q-D04-02 (knowledge §8 #6) | "A. Múi giờ Việt Nam (GMT+7)" | Confirmed |
| R12 | D05: Mã có giới hạn tổng lượt dùng toàn hệ thống; hết lượt thì không dùng được nữa. | Áp dụng theo quyết định | `gate_status.json` Q-D05-01 (knowledge §8 #7) | "A. Có giới hạn tổng lượt dùng toàn hệ thống (hết lượt thì không dùng được nữa)" | Confirmed |
| R13 | D06: Mỗi tài khoản khách hàng áp dụng thành công một mã tối đa 1 lần. | Áp dụng theo quyết định | `gate_status.json` Q-D06-01 (knowledge §8 #8) | "A. Tối đa 1 lần duy nhất cho mỗi tài khoản khách hàng" | Confirmed |
| R14 | D07: Bắt buộc đăng nhập tài khoản trước mới được nhập và áp dụng mã. | Áp dụng theo quyết định | `gate_status.json` Q-D07-01 (knowledge §8 #9) | "A. Bắt buộc phải đăng nhập tài khoản trước mới được nhập và áp dụng mã" | Confirmed |
| R15 | D08: Mã áp dụng cho toàn bộ sản phẩm trong giỏ hàng. | Áp dụng theo quyết định | `gate_status.json` Q-D08-01 (knowledge §8 #10) | "A. Áp dụng cho toàn bộ sản phẩm trong giỏ hàng" | Confirmed |
| R16 | D08: Mã giới hạn phạm vi, giỏ có cả sản phẩm thuộc và không thuộc phạm vi: không cho áp mã. | Áp dụng theo quyết định | `gate_status.json` Q-D08-02 (knowledge §8 #29) | "C. Không cho áp mã" | Confirmed |
| R17 | D09: Tối đa 1 mã giảm giá trên một đơn hàng. | Áp dụng theo quyết định | `gate_status.json` Q-D09-01 (knowledge §8 #11) | "A. Tối đa 1 mã giảm giá duy nhất trên một đơn hàng" | Confirmed |
| R18 | D09: Đã áp mã A, nhập mã B hợp lệ thì mã B tự động ghi đè thay mã A. | Áp dụng theo quyết định | `gate_status.json` Q-D09-02 (knowledge §8 #12) | "A. Tự động ghi đè mã mới thay thế mã cũ nếu mã mới hợp lệ" | Confirmed |
| R19 | D10: Mã không phân biệt hoa/thường, hệ thống tự chuyển thành chữ in hoa. | Áp dụng theo quyết định | `gate_status.json` Q-D10-01 (knowledge §8 #13) | "A. Không phân biệt hoa/thường (hệ thống tự động chuyển đổi thành chữ in hoa)" | Confirmed |
| R20 | D10: Hệ thống tự cắt khoảng trắng thừa đầu/cuối trước khi kiểm tra mã. | Áp dụng theo quyết định | `gate_status.json` Q-D10-02 (knowledge §8 #14) | "A. Tự động cắt bỏ khoảng trắng thừa (auto-trim) trước khi kiểm tra mã" | Confirmed |
| R21 | D11: Tiền giảm của mã % có phần lẻ được làm tròn số học đến hàng nghìn 1.000đ. | Áp dụng theo quyết định | `gate_status.json` Q-D11-01 (knowledge §8 #15) | "C. Làm tròn số học đến hàng nghìn 1.000đ" | Confirmed |
| R22 | D12: Mã cố định lớn hơn tạm tính: tiền giảm tối đa bằng tạm tính, tiền hàng sau giảm về 0đ. | Áp dụng theo quyết định | `gate_status.json` Q-D12-01 (knowledge §8 #16) | "A. Tiền giảm tối đa bằng tạm tính tiền hàng (tiền hàng sau giảm về 0đ)" | Confirmed |
| R23 | D13: Thông báo lỗi tách theo nguyên nhân: Hết hạn, Chưa đủ đơn tối thiểu, Hết lượt dùng, Mã không tồn tại. | Áp dụng theo quyết định | `gate_status.json` Q-D13-01 (knowledge §8 #17) | "A. Tách biệt thông báo lỗi theo nguyên nhân (Hết hạn, Chưa đủ đơn tối thiểu, Hết lượt dùng, Mã không tồn tại)" | Confirmed |
| R24 | D13: Thông báo lỗi hiển thị ngay dưới ô "Mã giảm giá". | Áp dụng theo quyết định | `gate_status.json` Q-D13-02 (knowledge §8 #30) | "A. Ngay dưới ô "Mã giảm giá"" | Confirmed |
| R25 | D14: Tạm giữ lượt khi Áp dụng mã thành công, trừ chính thức khi Đặt hàng thành công. | Áp dụng theo quyết định | `gate_status.json` Q-D14-01 (knowledge §8 #18) | "B. Tạm giữ lượt khi bấm Áp dụng mã thành công và trừ chính thức khi Đặt hàng thành công" | Confirmed |
| R26 | D15: Đơn có mã bị hủy hoặc thanh toán thẻ thất bại: tự động hoàn lại lượt dùng mã. | Áp dụng theo quyết định | `gate_status.json` Q-D15-01 (knowledge §8 #19) | "A. Tự động hoàn lại lượt dùng mã cho khách hàng" | Confirmed |
| R27 | D15: Thanh toán thẻ/Ví ShopGo thất bại: hoàn lượt, khách áp lại được. | Áp dụng theo quyết định | `gate_status.json` Q-D15-02 (knowledge §8 #31) | "A. Hoàn lượt, khách áp lại được" | Confirmed |
| R28 | D16: Sửa giỏ làm đơn dưới mức tối thiểu: tự động hủy áp dụng mã và thông báo đơn không còn đủ điều kiện hưởng ưu đãi. | Áp dụng theo quyết định | `gate_status.json` Q-D16-01 (knowledge §8 #20) | "A. Tự động hủy áp dụng mã và thông báo đơn hàng không còn đủ điều kiện hưởng ưu đãi" | Confirmed |
| R29 | D16: Đã áp mã %, đổi số lượng (vẫn đạt ngưỡng): tiền giảm tự tính lại theo giỏ mới. | Áp dụng theo quyết định | `gate_status.json` Q-D16-02 (knowledge §8 #32) | "A. Tự tính lại theo giỏ mới" | Confirmed |
| R30 | D16: Phiên đăng nhập hết hạn sau khi áp mã: mất mã, khách phải áp lại. | Áp dụng theo quyết định | `gate_status.json` Q-D16-03 (knowledge §8 #33) | "B. Mất mã, khách phải áp lại" | Confirmed |
| R31 | D17: Có nút hoặc biểu tượng gỡ mã; bấm thì gỡ mã và tính lại tổng tiền ban đầu. | Áp dụng theo quyết định | `gate_status.json` Q-D17-01 (knowledge §8 #21) | "A. Có nút hoặc biểu tượng gỡ mã, khi bấm vào thì gỡ mã và tính lại tổng tiền ban đầu" | Confirmed |
| R32 | D18: Mã còn 1 lượt, 2 khách cùng Đặt hàng: đơn ghi nhận trước tại máy chủ thành công, đơn sau báo lỗi mã đã hết lượt. | Áp dụng theo quyết định | `gate_status.json` Q-D18-01 (knowledge §8 #22) | "A. Đơn hàng nào ghi nhận trước tại máy chủ sẽ áp dụng thành công, đơn hàng sau báo lỗi mã đã hết lượt" | Confirmed |
| R33 | D19: Kiểm tra lại mã khi bấm Đặt hàng; mã hết hạn hoặc bị Admin vô hiệu hóa thì từ chối tạo đơn và thông báo mã không còn hiệu lực. | Áp dụng theo quyết định | `gate_status.json` Q-D19-01 (knowledge §8 #23) | "A. Kiểm tra lại tại thời điểm bấm Đặt hàng, từ chối tạo đơn và thông báo mã không còn hiệu lực" | Confirmed |
| R34 | D20: Tiền giảm (% và cố định) trừ vào tổng giá trị đơn hàng, gồm cả tiền hàng và phí vận chuyển. | Áp dụng theo quyết định | `gate_status.json` Q-D20-01 (knowledge §8 #24) | "B. Giảm trừ vào tổng giá trị đơn hàng (bao gồm cả tiền hàng và phí vận chuyển)" | Confirmed |
| R35 | D20: Đổi địa chỉ giao làm thay đổi phí ship sau khi áp mã: mã được kiểm tra và tính lại. | Áp dụng theo quyết định | `gate_status.json` Q-D20-02 (knowledge §8 #34) | "A. Có, kiểm tra và tính lại" | Confirmed |
| R36 | D21: Không giới hạn số lần nhập mã sai. | Áp dụng theo quyết định | `gate_status.json` Q-D21-01 (knowledge §8 #25) | "B. Không giới hạn số lần nhập mã sai" | Confirmed |
| R37 | D21: Tiền giảm dùng giá trị giao diện gửi lên. (Còn mở, xem M06) | Áp dụng theo quyết định | `gate_status.json` Q-D21-02 (knowledge §8 #35) | "B. Dùng giá trị giao diện gửi lên" | Confirmed |
| R38 | D22: Bấm Áp dụng: hiển thị spinner/loading và vô hiệu hóa nút Áp dụng trong khi chờ API phản hồi. | Áp dụng theo quyết định | `gate_status.json` Q-D22-01 (knowledge §8 #26) | "A. Có hiển thị spinner/loading và vô hiệu hóa nút Áp dụng trong khi chờ API phản hồi" | Confirmed |
| R39 | D23: Lưu vết đầy đủ mã và số tiền được giảm, hiển thị trong chi tiết đơn, lịch sử đơn và email xác nhận. | Áp dụng theo quyết định | `gate_status.json` Q-D23-01 (knowledge §8 #27) | "A. Có lưu vết đầy đủ mã giảm giá, số tiền được giảm và hiển thị trong chi tiết đơn hàng, lịch sử đơn và email xác nhận" | Confirmed |
| R40 | X01: Chỉ phục vụ khách mua hàng và giao hàng tại Việt Nam, tiền tệ VNĐ. | Áp dụng theo quyết định | `gate_status.json` Q-X01-01 (knowledge §8 #28) | "A. Không hỗ trợ, chỉ phục vụ khách mua hàng và giao hàng tại Việt Nam với đơn vị tiền tệ VNĐ" | Confirmed |
| R41 | X01: Không áp dụng tiền tệ, múi giờ Nhật Bản vì chỉ bán tại Việt Nam. | Áp dụng theo quyết định | `gate_status.json` Q-X01-02 (knowledge §8 #36) | "C. Không áp dụng vì chỉ bán tại Việt Nam" | Confirmed |

### 3b. FIELD & RÀNG BUỘC

| ID | Field | Kiểu | Bắt buộc | Ràng buộc (min/max/định dạng) | Thông báo khi sai | Nguồn (file §mục) | Trích nguyên văn |
|---|---|---|---|---|---|---|---|
| FLD-01 | Ô nhập Mã giảm giá | Text | Không | Cắt khoảng trắng đầu/cuối, không phân biệt hoa/thường, tự chuyển in hoa | Tách theo nguyên nhân lỗi | `gate_status.json` Q-D10-01, Q-D10-02, Q-D13-01 | "A. Không phân biệt hoa/thường..." |

## 4. LUỒNG CHÍNH (HAPPY PATH)
1. Khách hàng đã đăng nhập tài khoản ShopGo và tiến hành thanh toán đơn hàng tại trang Thanh toán. (Nguồn: `INPUT/Spec Function D.md` §1; `gate_status.json` Q-D07-01)
2. Tại ô nhập "Mã giảm giá", khách hàng nhập mã voucher hợp lệ và bấm nút "Áp dụng". Hệ thống hiển thị hiệu ứng spinner/loading và tạm khóa nút trong khi xử lý. (Nguồn: `INPUT/Spec Function D.md` §1; `gate_status.json` Q-D22-01)
3. Hệ thống kiểm tra mã hợp lệ, thỏa mãn giá trị tối thiểu, còn hạn sử dụng và còn lượt dùng; tạm giữ lượt dùng mã. (Nguồn: `gate_status.json` Q-D14-01)
4. Hệ thống áp dụng thành công: hiển thị số tiền được giảm và tổng tiền mới (tiền giảm trừ vào tổng đơn gồm cả phí vận chuyển; làm tròn số học hàng nghìn đối với mã %). (Nguồn: `INPUT/Spec Function D.md` §1; `gate_status.json` Q-D11-01, Q-D20-01)
5. Khách hàng bấm "Đặt hàng": hệ thống kiểm tra lại hiệu lực mã lần cuối, trừ chính thức lượt dùng và lưu vết mã giảm giá vào đơn hàng. (Nguồn: `gate_status.json` Q-D14-01, Q-D19-01, Q-D23-01)

## 5. LUỒNG PHỤ & LỖI (ALTERNATE & ERROR FLOWS)

| ID | Tình huống | Hệ thống phản hồi (nguyên văn nếu có) | Nguồn (file §mục) | Trích nguyên văn |
|---|---|---|---|---|
| ALT-01 | Mã không hợp lệ hoặc hết hạn | Hiển thị thông báo lỗi tách biệt theo nguyên nhân ngay dưới ô "Mã giảm giá" | `INPUT/Spec Function D.md` §1; `gate_status.json` Q-D13-01, Q-D13-02 | "Mã không hợp lệ hoặc hết hạn → hiển thị thông báo lỗi." |
| ALT-02 | Khách hàng chủ động gỡ mã | Bấm nút hoặc biểu tượng gỡ mã: hệ thống gỡ mã và tính lại tổng tiền ban đầu | `gate_status.json` Q-D17-01 | "A. Có nút hoặc biểu tượng gỡ mã, khi bấm thì gỡ mã và tính lại tổng tiền ban đầu" |
| ALT-03 | Nhập mã mới khi đã có mã trước đó | Tự động ghi đè mã mới thay thế mã cũ | `gate_status.json` Q-D09-02 | "A. Tự động ghi đè mã mới thay thế mã cũ (nếu mã mới hợp lệ)" |
| ALT-04 | Sửa giỏ hàng làm đơn dưới mức tối thiểu sau khi áp mã | Tự động hủy áp dụng mã và thông báo đơn không còn đủ điều kiện hưởng ưu đãi | `gate_status.json` Q-D16-01 | "A. Tự động hủy áp dụng mã và thông báo đơn không còn đủ điều kiện hưởng ưu đãi" |
| ALT-05 | Đơn hàng bị hủy hoặc thanh toán thẻ/Ví ShopGo thất bại | Tự động hoàn lại lượt dùng mã cho khách hàng | `gate_status.json` Q-D15-01, Q-D15-02 | "A. Tự động hoàn lại lượt dùng mã cho khách hàng" |
| ALT-06 | Phiên đăng nhập hết hạn sau khi đã áp mã | Mất mã, khách hàng phải áp lại mã sau khi đăng nhập lại | `gate_status.json` Q-D16-03 | "B. Mất mã, khách phải áp lại" |
| ALT-07 | Hai đơn cùng tranh chấp khi mã chỉ còn 1 lượt | Đơn ghi nhận trước tại máy chủ thành công; đơn ghi nhận sau báo lỗi mã đã hết lượt | `gate_status.json` Q-D18-01 | "A. Đơn hàng nào ghi nhận trước tại máy chủ thì áp dụng thành công; đơn ghi nhận sau sẽ báo lỗi mã đã hết lượt" |
| ALT-08 | Mã hết hạn hoặc bị Admin vô hiệu hóa tại thời điểm bấm Đặt hàng | Từ chối tạo đơn và thông báo mã không còn hiệu lực | `gate_status.json` Q-D19-01 | "A. Kiểm tra lại tại thời điểm bấm Đặt hàng; nếu mã vừa hết hạn/vừa bị Admin vô hiệu hóa thì từ chối tạo đơn và thông báo mã không còn hiệu lực" |


## 6. NGOÀI PHẠM VI (OUT OF SCOPE)
> Chỉ những gì nguồn **nói rõ** là không làm, kèm trích nguồn. Điều tài liệu không nhắc tới là câu hỏi (Mục 7), không phải ngoài phạm vi.

| Nội dung loại trừ | Nguồn (file §mục) | Trích nguyên văn |
|---|---|---|
| Back-office admin chi tiết | `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 8 | "Back-office admin chi tiết" |
| Tích hợp ERP/kho | `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 8 | "tích hợp ERP/kho" |
| Load test (hiệu năng tải cao) | `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 8 | "load test (hiệu năng tải cao)" |
| Native mobile app | `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md` mục 8 | "native mobile app" |
| Mua hàng và giao hàng sang Nhật Bản, chuyển đổi ngoại tệ | `gate_status.json` Q-X01-01 | "Không hỗ trợ, chỉ phục vụ khách mua hàng và nhận hàng tại Việt Nam (tiền tệ VNĐ)" |
| Tiền tệ và múi giờ Nhật Bản cho hiệu lực mã | `gate_status.json` Q-X01-02 | "Không áp dụng vì chỉ bán tại Việt Nam" |


## 7. CÂU HỎI MỞ & KẼ HỞ 06W (OPEN QUESTIONS & MISSING RULES)
> Skill `02` thêm dòng (`New`). Cột `Phản hồi chính thức`, `Người trả lời`, `Ngày`, `Trạng thái` do **con người** điền
> (hoặc agent chép nguyên văn khi người dùng chuyển lời BA). Trạng thái: `New` → `TREO` → `Confirmed` / `Rejected` (§9.3).
> Mã `MR-xx` cấp tiếp số lớn nhất đang có — không đánh lại từ 01.

| ID | Kẽ hở | Nhóm 06W | Nguồn phát hiện | Phương án gợi ý (chưa phải rule) | Câu hỏi cho BA/PO | Phản hồi chính thức | Người trả lời | Ngày | Trạng thái |
|---|---|---|---|---|---|---|---|---|---|
| M01 | Tiền giảm vượt tạm tính và phí ship: Q-D12-01 giới hạn tiền giảm tối đa bằng tạm tính (tiền hàng về 0đ), nhưng Q-D20-01 nói tiền giảm trừ vào tổng gồm cả phí ship. Chưa rõ phần giá trị mã còn dư có được trừ tiếp vào phí ship không. | W5 (How much) | `Q-D12-01, Q-D20-01` | Làm rõ trần giảm là tạm tính hay tổng gồm phí ship | Phần giá trị mã còn dư sau khi giảm hết tiền hàng có được trừ tiếp vào phí ship không, tức trần là tạm tính hay tổng gồm ship? | <điền> | <điền> | <điền> | TREO |
| M02 | Thời điểm giữ lượt: Q-D14-01 tạm giữ lượt ngay khi Áp dụng thành công; Q-D18-01 chọn "đơn ghi nhận trước tại máy chủ thành công" và loại phương án giữ chỗ khi Áp dụng. | W4 (When) | `Q-D14-01, Q-D18-01` | Thống nhất cơ chế giữ chỗ tại bước Áp dụng hay bước Đặt hàng | Hệ thống giữ chỗ lượt dùng mã ngay khi Áp dụng hay chỉ tranh chấp tại thời điểm bấm Đặt hàng? | <điền> | <điền> | <điền> | TREO |
| M03 | Điều kiện ngoài phương án ở Q-D01-01: câu trả lời thêm "mặc định áp dụng cho hóa đơn từ 200.000đ". Chưa rõ "hóa đơn" tính trên tạm tính hay tổng gồm ship, toán tử "từ" có tương đương >= không, và "mặc định" có bị ghi đè bởi giá trị tối thiểu cấu hình riêng từng mã (BR-02) không. | W3 (Where / Scope) | `Q-D01-01, Q-D03-01, Q-D03-02, BR-02` | Làm rõ ngưỡng 200.000đ của Freeship tính trên cơ sở nào và có bị ghi đè không | Ngưỡng hóa đơn 200.000đ của mã Freeship tính trên tiền hàng hay tổng gồm ship, và có bị ghi đè bởi cấu hình riêng không? | <điền> | <điền> | <điền> | TREO |
| M04 | Cơ sở tính tiền giảm %: phương án B của Q-D02-01 diễn đạt "% trên tổng tiền hàng", trong khi Q-D20-01 trả lời tiền giảm trừ vào tổng gồm cả phí vận chuyển. Chưa rõ % tính trên tạm tính hay trên tổng có phí ship. | W5 (How much) | `Q-D02-01, Q-D20-01, Q-D11-01` | Xác định tỷ lệ % tính trên tiền hàng (Subtotal) hay tổng đơn có ship | Tiền giảm của mã % tính trên tạm tính tiền hàng hay trên tổng tiền đã bao gồm phí ship? | <điền> | <điền> | <điền> | TREO |
| M05 | Phạm vi mã: Q-D08-01 trả lời mã áp dụng cho toàn bộ sản phẩm trong giỏ (không giới hạn danh mục), nhưng Q-D08-02 trả lời "Không cho áp mã" khi giỏ lẫn sản phẩm ngoài phạm vi, ngầm định tồn tại mã có giới hạn phạm vi. | W3 (Where / Scope) | `Q-D08-01, Q-D08-02` | Làm rõ hệ thống có hỗ trợ mã giới hạn phạm vi sản phẩm/danh mục không | ShopGo có loại mã giảm giá giới hạn phạm vi sản phẩm/danh mục hay không? | <điền> | <điền> | <điền> | TREO |
| M06 | Toàn vẹn tiền giảm: Q-D21-02 chọn "Dùng giá trị giao diện gửi lên". Đây là rủi ro bảo mật: client có thể can thiệp số tiền giảm, lệch với các rule server tính toán. | W6 (How) | `Q-D21-02, Q-D21-01, Q-D02-01, Q-D11-01, Q-D12-01` | Server phải tính toán và xác thực lại tiền giảm, không tin tưởng giá trị từ client | Tiền giảm có bắt buộc phải được server tính toán và xác thực lại để chống gian lận không? | <điền> | <điền> | <điền> | TREO |
| M07 | Lượt tạm giữ khi mất phiên: Q-D16-03 nói phiên hết hạn thì mất mã, khách phải áp lại; Q-D14-01 tạm giữ lượt khi Áp dụng. Chưa rõ lượt đã tạm giữ có được nhả khi mất mã hoặc gỡ mã không. | W4 (When) | `Q-D16-03, Q-D14-01, Q-D06-01, Q-D05-01, Q-D17-01, Q-D09-02, Q-D16-01` | Tự động giải phóng lượt tạm giữ khi phiên hết hạn, gỡ mã, đè mã hoặc giỏ hàng dưới ngưỡng | Lượt tạm giữ có được tự động nhả lại khi phiên hết hạn, khách gỡ mã hoặc đổi giỏ hàng không? | <điền> | <điền> | <điền> | TREO |


## 8. QUYẾT ĐỊNH ĐÃ CHỐT (CONFIRMED DECISIONS LOG)
> Chỉ ghi khi BA/PO đã quyết. Thiếu `Người phê duyệt` hoặc `Ngày chốt` thì tool coi là chưa chốt.
> Lần chạy sau agent áp dụng luôn, không hỏi lại.

| # | Mã liên quan | Câu hỏi | Quyết định chính thức | Người phê duyệt | Ngày chốt |
|---|---|---|---|---|---|
| 1 | Q-D01-01 | Ngoài 2 loại mã giảm giá tiền hàng (% và số tiền cố định), hệ thống có hỗ trợ loại mã miễn phí hoặc giảm phí vận chuyển (Freeship) tại ô nhập này không? | A. Có hỗ trợ mã Freeship (nhưng mặc định áp dụng cho hóa đơn từ 200.000đ) | QA/BA | 2026-11-09T14:23:30.000Z |
| 2 | Q-D02-01 | Mã giảm giá theo tỷ lệ phần trăm (%) có áp dụng mức giảm tối đa (trần giảm) không? | A. Có trần giảm tối đa (cấu hình theo từng mã cụ thể) | QA/BA | 2026-11-09T14:23:30.000Z |
| 3 | Q-D03-01 | Giá trị đơn hàng tối thiểu quy định của mã được so sánh dựa trên cơ sở nào? | B. Tổng tiền đơn hàng (đã bao gồm phí vận chuyển) | QA/BA | 2026-11-09T14:23:30.000Z |
| 4 | Q-D03-02 | Điều kiện "đạt giá trị tối thiểu quy định" được hiểu theo toán tử so sánh nào? | A. Lớn hơn hoặc bằng (>= giá trị tối thiểu quy định) | QA/BA | 2026-11-09T14:23:30.000Z |
| 5 | Q-D04-01 | Ngày hết hạn của mã giảm giá được tính hiệu lực đến thời điểm nào trong ngày? | A. Đến 23:59:59 của ngày hết hạn | QA/BA | 2026-11-09T14:23:30.000Z |
| 6 | Q-D04-02 | Múi giờ chuẩn được hệ thống sử dụng để kiểm tra ngày giờ hết hạn của mã là gì? | A. Múi giờ Việt Nam (GMT+7) | QA/BA | 2026-11-09T14:23:30.000Z |
| 7 | Q-D05-01 | Hệ thống có giới hạn tổng số lượt sử dụng tối đa trên toàn sàn đối với một mã giảm giá không? | A. Có giới hạn tổng lượt dùng toàn hệ thống (hết lượt thì không dùng được nữa) | QA/BA | 2026-11-09T14:23:30.000Z |
| 8 | Q-D06-01 | Một tài khoản khách hàng được phép áp dụng thành công một mã giảm giá tối đa bao nhiêu lần? | A. Tối đa 1 lần duy nhất cho mỗi tài khoản khách hàng | QA/BA | 2026-11-09T14:23:30.000Z |
| 9 | Q-D07-01 | Khách vãng lai (Guest) có được nhập và áp dụng mã giảm giá tại trang Thanh toán trước khi đăng nhập không? | A. Bắt buộc phải đăng nhập tài khoản trước mới được nhập và áp dụng mã | QA/BA | 2026-11-09T14:23:30.000Z |
| 10 | Q-D08-01 | Phạm vi áp dụng của mã giảm giá có giới hạn theo danh mục/sản phẩm cụ thể không? | A. Áp dụng cho toàn bộ sản phẩm trong giỏ hàng | QA/BA | 2026-11-09T14:23:30.000Z |
| 11 | Q-D09-01 | Một đơn hàng được phép áp dụng đồng thời tối đa bao nhiêu mã giảm giá? | A. Tối đa 1 mã giảm giá duy nhất trên một đơn hàng | QA/BA | 2026-11-09T14:23:30.000Z |
| 12 | Q-D09-02 | Khi đã áp dụng thành công mã A, nếu khách hàng nhập tiếp mã B và bấm Áp dụng thì hệ thống xử lý thế nào? | A. Tự động ghi đè mã mới thay thế mã cũ nếu mã mới hợp lệ | QA/BA | 2026-11-09T14:23:30.000Z |
| 13 | Q-D10-01 | Ký tự của mã giảm giá khi nhập vào có phân biệt chữ hoa và chữ thường (Case-sensitive) không? | A. Không phân biệt hoa/thường (hệ thống tự động chuyển đổi thành chữ in hoa) | QA/BA | 2026-11-09T14:23:30.000Z |
| 14 | Q-D10-02 | Khi người dùng nhập hoặc dán mã có khoảng trắng thừa ở đầu hoặc cuối chuỗi, hệ thống xử lý thế nào? | A. Tự động cắt bỏ khoảng trắng thừa (auto-trim) trước khi kiểm tra mã | QA/BA | 2026-11-09T14:23:30.000Z |
| 15 | Q-D11-01 | Khi mã giảm theo tỷ lệ % sinh ra số tiền giảm có phần lẻ, hệ thống áp dụng quy tắc làm tròn nào cho tiền tệ VND? | C. Làm tròn số học đến hàng nghìn 1.000đ | QA/BA | 2026-11-09T14:23:30.000Z |
| 16 | Q-D12-01 | Đối với mã giảm số tiền cố định, nếu giá trị giảm lớn hơn tạm tính tiền hàng của giỏ hàng thì hệ thống xử lý thế nào? | A. Tiền giảm tối đa bằng tạm tính tiền hàng (tiền hàng sau giảm về 0đ) | QA/BA | 2026-11-09T14:23:30.000Z |
| 17 | Q-D13-01 | Khi áp dụng mã không thành công, hệ thống hiển thị thông báo lỗi chung hay tách biệt theo từng nguyên nhân cụ thể? | A. Tách biệt thông báo lỗi theo nguyên nhân (Hết hạn, Chưa đủ đơn tối thiểu, Hết lượt dùng, Mã không tồn tại) | QA/BA | 2026-11-09T14:23:30.000Z |
| 18 | Q-D14-01 | Lượt sử dụng của mã giảm giá được hệ thống trừ chính thức vào thời điểm nào? | B. Tạm giữ lượt khi bấm Áp dụng mã thành công và trừ chính thức khi Đặt hàng thành công | QA/BA | 2026-11-09T14:23:30.000Z |
| 19 | Q-D15-01 | Khi đơn hàng có áp dụng mã bị khách hàng hủy hoặc thanh toán trực tuyến qua thẻ thất bại, lượt dùng mã có được hoàn lại không? | A. Tự động hoàn lại lượt dùng mã cho khách hàng | QA/BA | 2026-11-09T14:23:30.000Z |
| 20 | Q-D16-01 | Sau khi áp mã thành công, nếu khách hàng quay lại giỏ hàng sửa số lượng làm giá trị đơn tụt xuống dưới mức đơn tối thiểu thì hệ thống xử lý thế nào? | A. Tự động hủy áp dụng mã và thông báo đơn hàng không còn đủ điều kiện hưởng ưu đãi | QA/BA | 2026-11-09T14:23:30.000Z |
| 21 | Q-D17-01 | Sau khi áp dụng mã thành công, khách hàng có thể chủ động gỡ bỏ mã giảm giá khỏi đơn hàng không? | A. Có nút hoặc biểu tượng gỡ mã, khi bấm vào thì gỡ mã và tính lại tổng tiền ban đầu | QA/BA | 2026-11-09T14:23:30.000Z |
| 22 | Q-D18-01 | Khi mã chỉ còn 1 lượt dùng duy nhất và có 2 khách hàng cùng bấm Đặt hàng tại cùng một thời điểm, hệ thống xử lý thế nào? | A. Đơn hàng nào ghi nhận trước tại máy chủ sẽ áp dụng thành công, đơn hàng sau báo lỗi mã đã hết lượt | QA/BA | 2026-11-09T14:23:30.000Z |
| 23 | Q-D19-01 | Nếu khách hàng đã áp mã thành công tại trang Thanh toán nhưng trước khi bấm Đặt hàng mà mã bị hết hạn hoặc bị Admin vô hiệu hóa, hệ thống xử lý thế nào? | A. Kiểm tra lại tại thời điểm bấm Đặt hàng, từ chối tạo đơn và thông báo mã không còn hiệu lực | QA/BA | 2026-11-09T14:23:30.000Z |
| 24 | Q-D20-01 | Tiền giảm giá của mã (cả % và số tiền cố định) được giảm trừ vào thành phần nào của đơn hàng? | B. Giảm trừ vào tổng giá trị đơn hàng (bao gồm cả tiền hàng và phí vận chuyển) | QA/BA | 2026-11-09T14:23:30.000Z |
| 25 | Q-D21-01 | Hệ thống có cơ chế giới hạn số lần nhập mã sai liên tiếp (Rate limit / Brute-force protection) để ngăn chặn bot dò mã không? | B. Không giới hạn số lần nhập mã sai | QA/BA | 2026-11-09T14:23:30.000Z |
| 26 | Q-D22-01 | Khi khách hàng bấm nút "Áp dụng", hệ thống có hiển thị trạng thái chờ (loading) và vô hiệu hóa nút để chặn thao tác bấm đúp liên tục không? | A. Có hiển thị spinner/loading và vô hiệu hóa nút Áp dụng trong khi chờ API phản hồi | QA/BA | 2026-11-09T14:23:30.000Z |
| 27 | Q-D23-01 | Sau khi đặt hàng thành công, thông tin mã giảm giá và số tiền được giảm có được lưu trữ và hiển thị trong chi tiết đơn hàng cùng email xác nhận đơn không? | A. Có lưu vết đầy đủ mã giảm giá, số tiền được giảm và hiển thị trong chi tiết đơn hàng, lịch sử đơn và email xác nhận | QA/BA | 2026-11-09T14:23:30.000Z |
| 28 | Q-X01-01 | Tệp chat.md ghi nhận thông tin Leader nói có thể mua hàng ở Nhật Bản, trong khi ShopGo.md quy định người dùng cuối tại Việt Nam, tiền tệ VNĐ. Hệ thống có hỗ trợ mua và giao hàng sang Nhật Bản không? | A. Không hỗ trợ, chỉ phục vụ khách mua hàng và giao hàng tại Việt Nam với đơn vị tiền tệ VNĐ | QA/BA | 2026-11-09T14:23:30.000Z |
| 29 | Q-D08-02 | Nếu mã giới hạn phạm vi và giỏ có cả sản phẩm thuộc và không thuộc phạm vi thì tiền giảm tính thế nào? | C. Không cho áp mã | BA (demo lớp học) | 2026-11-14T11:55:09.655Z |
| 30 | Q-D13-02 | Thông báo lỗi hiển thị ở đâu? | A. Ngay dưới ô "Mã giảm giá" | BA (demo lớp học) | 2026-11-14T11:55:09.675Z |
| 31 | Q-D15-02 | Khi thanh toán thẻ/Ví ShopGo thất bại thì lượt dùng mã xử lý thế nào? | A. Hoàn lượt, khách áp lại được | BA (demo lớp học) | 2026-11-14T11:55:09.695Z |
| 32 | Q-D16-02 | Sau khi áp mã %, khách đổi số lượng sản phẩm (vẫn đạt ngưỡng) thì tiền giảm có được tính lại không? | A. Tự tính lại theo giỏ mới | BA (demo lớp học) | 2026-11-14T11:55:09.715Z |
| 33 | Q-D16-03 | Khi phiên đăng nhập hết hạn sau khi đã áp mã, đăng nhập lại thì mã có được giữ không? | B. Mất mã, khách phải áp lại | BA (demo lớp học) | 2026-11-14T11:55:09.734Z |
| 34 | Q-D20-02 | Khi đổi địa chỉ giao làm thay đổi phí ship sau khi đã áp mã thì mã có được kiểm tra lại không? | A. Có, kiểm tra và tính lại | BA (demo lớp học) | 2026-11-14T11:55:09.754Z |
| 35 | Q-D21-02 | Tiền giảm được tính và xác nhận ở đâu? | B. Dùng giá trị giao diện gửi lên | BA (demo lớp học) | 2026-11-14T11:55:09.774Z |
| 36 | Q-X01-02 | Nếu khách tại Nhật Bản được mua hàng, tiền tệ và múi giờ hiệu lực mã áp dụng thế nào? | C. Không áp dụng vì chỉ bán tại Việt Nam | BA (demo lớp học) | 2026-11-14T11:55:09.794Z |

## 9. HẰNG SỐ NGHIỆP VỤ (DOMAIN CONSTANTS)
> Chỉ hằng số có trong nguồn. Dùng cho chuỗi biên và sinh dữ liệu test.

| Hằng số | Kiểu dữ liệu | Giá trị | Phạm vi ảnh hưởng | Nguồn (file §mục) |
|---|---|---|---|---|
| Tiền tệ chuẩn | String | VNĐ | Toàn hệ thống | `INPUT/Spec Function D.md` §1 |
| Múi giờ chuẩn | String | GMT+7 | Kiểm tra hạn sử dụng mã | `gate_status.json` Q-D04-02 |
| Thời điểm hết hạn trong ngày | String | 23:59:59 | Kiểm tra hạn sử dụng mã | `gate_status.json` Q-D04-01 |
| Làm tròn mã % | Number | 1.000đ (làm tròn số học) | Tính tiền giảm mã % | `gate_status.json` Q-D11-01 |
| Giới hạn áp dụng mã / đơn | Number | 1 | Trang thanh toán | `gate_status.json` Q-D09-01 |
| Giới hạn áp dụng / tài khoản | Number | 1 | Toàn hệ thống | `gate_status.json` Q-D06-01 |
| Ngưỡng mặc định mã Freeship | Currency | 200.000đ | Mã Freeship | `gate_status.json` Q-D01-01 |

## 10. MA TRẬN TRUY VẾT (TRACEABILITY MATRIX)

| Mã | Nguồn (file §mục) | Test Case IDs liên quan | Ghi chú |
|---|---|---|---|
| BR-01 | `INPUT/Spec Function D.md` §1 | <điền> | Phân loại mã |
| BR-02 | `INPUT/Spec Function D.md` §1 | <điền> | Đơn tối thiểu |
| BR-03 | `INPUT/Spec Function D.md` §1 | <điền> | Hạn dùng mã |
| BR-04 | `INPUT/Spec Function D.md` §1 | <điền> | Hiển thị tiền giảm và tổng mới |
| BR-05 | `INPUT/Spec Function D.md` §1 | <điền> | Thông báo lỗi |
