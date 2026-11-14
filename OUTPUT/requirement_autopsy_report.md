# Báo cáo Requirement Autopsy — ShopGo Function D: Áp dụng Mã Giảm Giá

- Pha: 2 (Phân tích chi tiết và viết Expected Result)
- Cổng chặn: `node tools/gate.js check` trả về exit 0, 36/36 câu hỏi RESOLVED (kiểm tra lúc 2026-11-14T11:55:23.451Z).
- Nguồn sự thật: `INPUT/Spec Function D.md`, `INPUT/Hệ thống Thương mại điện tử “ShopGo”.md`, `INPUT/chat.md`, câu trả lời đã xác nhận trong `gate_status.json`.
- Quy ước Test Data: không tự đặt mã giảm giá hay giá tiền. Giá trị chưa có trong `INPUT/` hoặc câu trả lời đã xác nhận được ghi `[CAN_DU_LIEU]`.

## Phần A: Bảng mổ xẻ yêu cầu (Requirement Autopsy)

| Mã D-code | Tên khía cạnh | Bằng chứng trong INPUT | Trạng thái | Đánh giá chi tiết |
|---|---|---|---|---|
| D01 | Loại mã giảm giá | `Spec Function D.md`: "Có 2 loại mã: giảm theo phần trăm (%) và giảm số tiền cố định (VND)." | MO_HO | Nêu 2 loại mã tiền hàng, không nhắc mã Freeship có thuộc ô "Mã giảm giá" hay không. |
| D02 | Trần giảm của mã % | `ShopGo.md` mục 6: "Trần giảm tối đa (max discount cap)" | MO_HO | Thuật ngữ có trong Glossary nhưng Spec Function D không nêu mã % có trần giảm hay không, giá trị trần ở đâu. |
| D03 | Cơ sở tính và ngưỡng đơn tối thiểu | `Spec Function D.md`: "Mã chỉ dùng được khi đơn hàng đạt giá trị tối thiểu quy định của mã." | MO_HO | Không nêu cơ sở so sánh (tạm tính hay tổng có phí ship) và toán tử "đạt" (>= hay >). |
| D04 | Mốc thời gian hiệu lực | `Spec Function D.md`: "Mỗi mã có ngày hết hạn." | MO_HO | Không nêu giờ hết hạn trong ngày, múi giờ, ngày bắt đầu. |
| D05 | Tổng lượt dùng toàn hệ thống | Không có | KHONG_DE_CAP | Tài liệu không nhắc giới hạn tổng lượt dùng. |
| D06 | Lượt dùng mỗi khách hàng | Không có | KHONG_DE_CAP | Tài liệu không nhắc giới hạn lượt dùng theo tài khoản. |
| D07 | Đối tượng áp dụng và đăng nhập | `ShopGo.md` mục 3: "Xem sản phẩm, thêm vào giỏ; phải đăng nhập khi thanh toán" | MO_HO | Guest phải đăng nhập khi thanh toán, nhưng không nêu Guest có được nhập mã trước khi đăng nhập không. |
| D08 | Phạm vi áp dụng sản phẩm | Không có | KHONG_DE_CAP | Tài liệu không nhắc mã áp dụng toàn giỏ hay theo danh mục. |
| D09 | Quy tắc cộng dồn | Không có | KHONG_DE_CAP | Tài liệu không nhắc số mã tối đa trên một đơn, cách xử lý khi nhập mã thứ hai. |
| D10 | Tiêu chí mã hợp lệ | `Spec Function D.md`: "Mã không hợp lệ hoặc hết hạn → hiển thị thông báo lỗi." | MO_HO | Có khái niệm "không hợp lệ" nhưng không nêu tiêu chí (hoa/thường, khoảng trắng, độ dài). |
| D11 | Quy tắc làm tròn | `ShopGo.md` mục 7: "Tiền tệ VND, làm tròn theo quy ước hiển thị." | MO_HO | Không nêu quy ước làm tròn cụ thể (lên, xuống, số học, đến đơn vị nào). |
| D12 | Tiền giảm vượt tiền hàng | Không có | KHONG_DE_CAP | Tài liệu không nhắc trường hợp giá trị mã cố định lớn hơn tiền hàng. |
| D13 | Nội dung và vị trí thông báo lỗi | `Spec Function D.md`: "Mã không hợp lệ hoặc hết hạn → hiển thị thông báo lỗi." | MO_HO | Không nêu thông báo tách theo nguyên nhân hay dùng chung, không nêu vị trí hiển thị. |
| D14 | Thời điểm trừ lượt dùng | Không có | KHONG_DE_CAP | Tài liệu không nhắc thời điểm trừ lượt. |
| D15 | Hoàn lượt dùng mã | Không có | KHONG_DE_CAP | Tài liệu không nhắc hoàn lượt khi hủy đơn hoặc thanh toán thất bại. |
| D16 | Giỏ hàng hoặc phiên thay đổi sau khi áp mã | Không có | KHONG_DE_CAP | Tài liệu không nhắc xử lý mã khi sửa giỏ hoặc phiên hết hạn. |
| D17 | Gỡ bỏ hoặc thay đổi mã | Không có | KHONG_DE_CAP | Tài liệu không nhắc chức năng gỡ mã. |
| D18 | Thao tác đồng thời | Không có | KHONG_DE_CAP | Tài liệu không nhắc tranh chấp lượt cuối. |
| D19 | Mã mất hiệu lực giữa luồng | Không có | KHONG_DE_CAP | Tài liệu không nhắc kiểm tra lại mã khi bấm Đặt hàng. |
| D20 | Mã giảm giá và phí vận chuyển | `Spec Function D.md`: "hệ thống sẽ kiểm tra mã và áp dụng phần giảm vào tổng đơn hàng." | MO_HO | "Tổng đơn hàng" không rõ đã gồm phí ship hay chưa; `ShopGo.md` mục E có "Phí ship" nhưng không nêu quan hệ với mã. |
| D21 | Chống gian lận và dò mã | Không có | KHONG_DE_CAP | Tài liệu không nhắc giới hạn thử sai hay nơi tính tiền giảm. |
| D22 | Thời gian phản hồi và trạng thái chờ | Không có | KHONG_DE_CAP | NFR chỉ có "trang chính tải < 3s", không nhắc thao tác Áp dụng mã. |
| D23 | Lưu vết mã trên đơn hàng | Không có | KHONG_DE_CAP | Tài liệu không nhắc hiển thị mã trên chi tiết đơn, email. |
| X01 | Thị trường khách hàng | `chat.md`: "Leader của tôi nói rằng có thể mua hàng ở Nhật Bản"; `Spec Function D.md`: "Đối tượng người dùng cuối là khách mua hàng tại Việt Nam." | MAU_THUAN | Hai nguồn nói khác nhau về thị trường khách hàng. |

## Phần B: Bảng phân tích Missing Rule và Câu hỏi BA

Câu hỏi, phương án và câu trả lời lấy nguyên văn từ `gate_status.json`. Dòng có ghi chú "xem M0x" là điểm còn mâu thuẫn, ghi tại `OUTPUT/project_knowledge.md` mục 2, cần hỏi lại BA.

| Mã D-code | Nhóm Missing Rule | Mức độ rủi ro | Điều tài liệu chưa nói | Câu hỏi đóng cho BA | Câu trả lời đã xác nhận (từ gate) | Expected Result tương ứng |
|---|---|---|---|---|---|---|
| D01 (Q-D01-01) | Implicit assumption | TB | Chưa quy định ô "Mã giảm giá" có nhận mã Freeship hay không. | Ngoài 2 loại mã giảm giá tiền hàng (% và số tiền cố định), hệ thống có hỗ trợ loại mã miễn phí hoặc giảm phí vận chuyển (Freeship) tại ô nhập này không? A. Có hỗ trợ mã Freeship / B. Không hỗ trợ mã Freeship | A. Có hỗ trợ mã Freeship (nhưng mặc định áp dụng cho hóa đơn từ 200.000đ) | Nhập mã Freeship hợp lệ `[CAN_DU_LIEU]` vào ô "Mã giảm giá" với hóa đơn từ 200.000đ: hệ thống chấp nhận mã. Mức giảm phí ship cụ thể `[CAN_DU_LIEU]`. Điều kiện "200.000đ" ngoài phương án, xem M03. |
| D02 (Q-D02-01) | Implicit assumption | CAO | Chưa quy định mã % có trần giảm hay không. | Mã giảm giá theo tỷ lệ phần trăm (%) có áp dụng mức giảm tối đa (trần giảm) không? A. Có trần giảm tối đa (cấu hình theo từng mã cụ thể) / B. Không áp dụng trần giảm | A. Có trần giảm tối đa (cấu hình theo từng mã cụ thể) | Với mã % có trần `[CAN_DU_LIEU]`, khi tiền giảm tính theo % lớn hơn trần thì tiền giảm hiển thị bằng đúng trần của mã. Cơ sở tính % chưa thống nhất, xem M04. |
| D03 (Q-D03-01) | Implicit assumption | CAO | Chưa quy định ngưỡng tối thiểu so trên tạm tính hay tổng có phí ship. | Giá trị đơn hàng tối thiểu quy định của mã được so sánh dựa trên cơ sở nào? A. Tạm tính tiền hàng / B. Tổng tiền đơn hàng (đã bao gồm phí vận chuyển) | B. Tổng tiền đơn hàng (đã bao gồm phí vận chuyển) | Đơn có tạm tính dưới ngưỡng nhưng tạm tính cộng phí ship đạt ngưỡng `[CAN_DU_LIEU]`: Áp dụng mã thành công. |
| D03 (Q-D03-02) | Implicit assumption | CAO | Chưa quy định toán tử so sánh của "đạt giá trị tối thiểu". | Điều kiện "đạt giá trị tối thiểu quy định" được hiểu theo toán tử so sánh nào? A. >= / B. > | A. Lớn hơn hoặc bằng (>= giá trị tối thiểu quy định) | Tổng đơn đúng bằng ngưỡng tối thiểu `[CAN_DU_LIEU]`: Áp dụng mã thành công. Thấp hơn ngưỡng 1đ: hiển thị lỗi chưa đủ đơn tối thiểu. |
| D04 (Q-D04-01) | Edge case bị bỏ qua | TB | Chưa quy định mã hết hiệu lực vào thời điểm nào trong ngày hết hạn. | Ngày hết hạn của mã giảm giá được tính hiệu lực đến thời điểm nào trong ngày? A. Đến 23:59:59 / B. Đến 00:00:00 | A. Đến 23:59:59 của ngày hết hạn | Áp dụng lúc 23:59:59 ngày hết hạn: thành công. Áp dụng lúc 00:00:00 ngày kế tiếp: hiển thị lỗi mã hết hạn. |
| D04 (Q-D04-02) | Edge case bị bỏ qua | TB | Chưa quy định múi giờ kiểm tra hạn mã. | Múi giờ chuẩn được hệ thống sử dụng để kiểm tra ngày giờ hết hạn của mã là gì? A. GMT+7 / B. UTC | A. Múi giờ Việt Nam (GMT+7) | Mốc hết hạn được so theo giờ GMT+7: lúc 23:59:59 GMT+7 ngày hết hạn vẫn áp dụng được, sau đó báo lỗi hết hạn. |
| D05 (Q-D05-01) | Implicit assumption | CAO | Chưa quy định giới hạn tổng lượt dùng toàn hệ thống. | Hệ thống có giới hạn tổng số lượt sử dụng tối đa trên toàn sàn đối với một mã giảm giá không? A. Có giới hạn / B. Không giới hạn | A. Có giới hạn tổng lượt dùng toàn hệ thống (hết lượt thì không dùng được nữa) | Mã đã hết tổng lượt `[CAN_DU_LIEU]`: Áp dụng thất bại, hiển thị lỗi hết lượt dùng. |
| D06 (Q-D06-01) | Implicit assumption | CAO | Chưa quy định số lần một tài khoản được dùng một mã. | Một tài khoản khách hàng được phép áp dụng thành công một mã giảm giá tối đa bao nhiêu lần? A. Tối đa 1 lần / B. Nhiều lần | A. Tối đa 1 lần duy nhất cho mỗi tài khoản khách hàng | Tài khoản đã đặt hàng thành công với mã: lần áp dụng lại mã đó bị từ chối. |
| D07 (Q-D07-01) | Implicit assumption | TB | Chưa quy định Guest có được nhập mã trước khi đăng nhập. | Khách vãng lai (Guest) có được nhập và áp dụng mã giảm giá tại trang Thanh toán trước khi đăng nhập không? A. Bắt buộc đăng nhập trước / B. Cho áp thử | A. Bắt buộc phải đăng nhập tài khoản trước mới được nhập và áp dụng mã | Guest chưa đăng nhập không nhập và áp dụng được mã; sau khi đăng nhập thì nhập và áp dụng được. |
| D08 (Q-D08-01) | Implicit assumption | TB | Chưa quy định phạm vi sản phẩm được giảm. | Phạm vi áp dụng của mã giảm giá có giới hạn theo danh mục/sản phẩm cụ thể không? A. Toàn bộ giỏ hàng / B. Theo danh mục | A. Áp dụng cho toàn bộ sản phẩm trong giỏ hàng | Giỏ có sản phẩm thuộc nhiều danh mục: tiền giảm tính trên toàn bộ sản phẩm trong giỏ. Mâu thuẫn với Q-D08-02, xem M05. |
| D08 (Q-D08-02) | Implicit assumption | TB | Chưa quy định cách tính khi giỏ lẫn sản phẩm thuộc và không thuộc phạm vi mã. | Nếu mã giới hạn phạm vi và giỏ có cả sản phẩm thuộc và không thuộc phạm vi thì tiền giảm tính thế nào? A. Chỉ trên sản phẩm thuộc phạm vi / B. Toàn bộ giỏ / C. Không cho áp mã | C. Không cho áp mã | Mã có giới hạn phạm vi `[CAN_DU_LIEU]`, giỏ lẫn sản phẩm ngoài phạm vi: Áp dụng thất bại, mã không được áp. Nội dung thông báo `[CAN_DU_LIEU]`. Xem M05. |
| D09 (Q-D09-01) | Implicit assumption | CAO | Chưa quy định số mã tối đa trên một đơn. | Một đơn hàng được phép áp dụng đồng thời tối đa bao nhiêu mã giảm giá? A. Tối đa 1 mã / B. Nhiều mã nếu khác loại | A. Tối đa 1 mã giảm giá duy nhất trên một đơn hàng | Đơn hàng luôn chỉ có 1 mã đang áp dụng. |
| D09 (Q-D09-02) | Implicit assumption | CAO | Chưa quy định xử lý khi nhập mã B lúc đã áp mã A. | Khi đã áp dụng thành công mã A, nếu khách hàng nhập tiếp mã B và bấm Áp dụng thì hệ thống xử lý thế nào? A. Tự động ghi đè / B. Báo lỗi yêu cầu gỡ mã cũ | A. Tự động ghi đè mã mới thay thế mã cũ nếu mã mới hợp lệ | Mã B hợp lệ: mã B thay mã A, tiền giảm và tổng tiền tính theo mã B. Mã B không hợp lệ: mã A được giữ nguyên. |
| D10 (Q-D10-01) | Implicit assumption | TB | Chưa quy định mã có phân biệt hoa/thường. | Ký tự của mã giảm giá khi nhập vào có phân biệt chữ hoa và chữ thường không? A. Không phân biệt (tự chuyển in hoa) / B. Phân biệt | A. Không phân biệt hoa/thường (hệ thống tự động chuyển đổi thành chữ in hoa) | Nhập mã hợp lệ `[CAN_DU_LIEU]` bằng chữ thường: hệ thống chuyển thành chữ in hoa và áp dụng thành công. |
| D10 (Q-D10-02) | Implicit assumption | TB | Chưa quy định xử lý khoảng trắng thừa đầu/cuối. | Khi người dùng nhập hoặc dán mã có khoảng trắng thừa ở đầu hoặc cuối chuỗi, hệ thống xử lý thế nào? A. Auto-trim / B. Báo lỗi | A. Tự động cắt bỏ khoảng trắng thừa (auto-trim) trước khi kiểm tra mã | Nhập mã hợp lệ `[CAN_DU_LIEU]` kèm khoảng trắng đầu/cuối: áp dụng thành công. |
| D11 (Q-D11-01) | Implicit assumption | CAO | Chưa quy định quy tắc làm tròn tiền giảm có phần lẻ. | Khi mã % sinh ra số tiền giảm có phần lẻ, hệ thống áp dụng quy tắc làm tròn nào? A. Số học đến 1đ / B. Floor đến 1.000đ / C. Số học đến 1.000đ | C. Làm tròn số học đến hàng nghìn 1.000đ | Tiền giảm của mã % được làm tròn số học đến hàng 1.000đ: phần lẻ từ 500đ trở lên làm tròn lên, dưới 500đ làm tròn xuống. Giá trị đơn và tỷ lệ `[CAN_DU_LIEU]`. |
| D12 (Q-D12-01) | Edge case bị bỏ qua | CAO | Chưa quy định xử lý khi giá trị mã cố định lớn hơn tạm tính. | Đối với mã giảm số tiền cố định, nếu giá trị giảm lớn hơn tạm tính tiền hàng thì hệ thống xử lý thế nào? A. Tiền giảm tối đa bằng tạm tính / B. Báo lỗi | A. Tiền giảm tối đa bằng tạm tính tiền hàng (tiền hàng sau giảm về 0đ) | Mã cố định có giá trị lớn hơn tạm tính `[CAN_DU_LIEU]`: tiền giảm hiển thị bằng tạm tính, tiền hàng sau giảm 0đ, tổng không âm. Phần phí ship sau giảm chưa thống nhất với Q-D20-01, xem M01. |
| D13 (Q-D13-01) | Implicit assumption | TB | Chưa quy định thông báo lỗi tách theo nguyên nhân hay dùng chung. | Khi áp dụng mã không thành công, hệ thống hiển thị thông báo lỗi chung hay tách biệt theo nguyên nhân? A. Tách biệt / B. Dùng chung | A. Tách biệt thông báo lỗi theo nguyên nhân (Hết hạn, Chưa đủ đơn tối thiểu, Hết lượt dùng, Mã không tồn tại) | Mỗi nguyên nhân (Hết hạn, Chưa đủ đơn tối thiểu, Hết lượt dùng, Mã không tồn tại) hiển thị một thông báo riêng, khác nhau. Câu chữ từng thông báo `[CAN_DU_LIEU]`. |
| D13 (Q-D13-02) | Implicit assumption | TB | Chưa quy định vị trí hiển thị thông báo lỗi. | Thông báo lỗi hiển thị ở đâu? A. Ngay dưới ô "Mã giảm giá" / B. Toast/popup | A. Ngay dưới ô "Mã giảm giá" | Áp dụng thất bại: thông báo lỗi hiển thị ngay dưới ô "Mã giảm giá", không ở dạng toast/popup. |
| D14 (Q-D14-01) | Implicit assumption | CAO | Chưa quy định thời điểm trừ lượt dùng. | Lượt sử dụng của mã giảm giá được hệ thống trừ chính thức vào thời điểm nào? A. Khi Đặt hàng thành công / B. Tạm giữ khi Áp dụng, trừ khi Đặt hàng | B. Tạm giữ lượt khi bấm Áp dụng mã thành công và trừ chính thức khi Đặt hàng thành công | Áp dụng mã thành công: 1 lượt được tạm giữ. Đặt hàng thành công: lượt đó bị trừ chính thức. Mâu thuẫn với Q-D18-01, xem M02; luồng nhả lượt tạm giữ chưa rõ, xem M07. |
| D15 (Q-D15-01) | Rollback/Undo | TB | Chưa quy định hoàn lượt khi hủy đơn hoặc thanh toán thẻ thất bại. | Khi đơn hàng có áp dụng mã bị khách hủy hoặc thanh toán thẻ thất bại, lượt dùng mã có được hoàn lại không? A. Tự động hoàn / B. Không hoàn | A. Tự động hoàn lại lượt dùng mã cho khách hàng | Hủy đơn có mã hoặc thanh toán thẻ thất bại: lượt dùng mã tự động được hoàn, khách áp dụng lại được mã. |
| D15 (Q-D15-02) | Rollback/Undo | TB | Chưa quy định xử lý lượt khi thanh toán thẻ/Ví ShopGo thất bại. | Khi thanh toán thẻ/Ví ShopGo thất bại thì lượt dùng mã xử lý thế nào? A. Hoàn lượt / B. Mất lượt | A. Hoàn lượt, khách áp lại được | Thanh toán thẻ hoặc Ví ShopGo thất bại: lượt được hoàn, khách áp dụng lại mã thành công. |
| D16 (Q-D16-01) | Edge case bị bỏ qua | CAO | Chưa quy định xử lý khi sửa giỏ làm đơn tụt dưới ngưỡng tối thiểu. | Sau khi áp mã, nếu khách sửa số lượng làm giá trị đơn dưới mức tối thiểu thì hệ thống xử lý thế nào? A. Tự động hủy áp dụng và thông báo / B. Giữ đến khi Đặt hàng | A. Tự động hủy áp dụng mã và thông báo đơn hàng không còn đủ điều kiện hưởng ưu đãi | Giảm số lượng làm tổng đơn dưới ngưỡng: mã tự động bị gỡ, tiền giảm về 0đ, hiển thị thông báo đơn không còn đủ điều kiện. |
| D16 (Q-D16-02) | Edge case bị bỏ qua | CAO | Chưa quy định tiền giảm % có tính lại khi đổi số lượng. | Sau khi áp mã %, khách đổi số lượng sản phẩm (vẫn đạt ngưỡng) thì tiền giảm có được tính lại không? A. Tự tính lại / B. Giữ nguyên | A. Tự tính lại theo giỏ mới | Đổi số lượng vẫn đạt ngưỡng: tiền giảm và tổng tiền được tính lại theo giỏ mới. |
| D16 (Q-D16-03) | Edge case bị bỏ qua | CAO | Chưa quy định mã còn giữ khi phiên đăng nhập hết hạn. | Khi phiên đăng nhập hết hạn sau khi đã áp mã, đăng nhập lại thì mã có được giữ không? A. Giữ mã / B. Mất mã | B. Mất mã, khách phải áp lại | Phiên hết hạn sau khi áp mã, đăng nhập lại: trang Thanh toán không còn mã, khách phải áp lại. Trạng thái lượt tạm giữ chưa rõ, xem M07. |
| D17 (Q-D17-01) | Rollback/Undo | TB | Chưa quy định chức năng gỡ mã. | Sau khi áp dụng mã thành công, khách hàng có thể chủ động gỡ bỏ mã không? A. Có nút gỡ / B. Không | A. Có nút hoặc biểu tượng gỡ mã, khi bấm vào thì gỡ mã và tính lại tổng tiền ban đầu | Bấm nút/biểu tượng gỡ mã: mã bị gỡ, tổng tiền trở về giá trị trước khi áp mã. |
| D18 (Q-D18-01) | Edge case bị bỏ qua | CAO | Chưa quy định xử lý khi 2 khách cùng đặt hàng ở lượt cuối. | Khi mã chỉ còn 1 lượt và 2 khách cùng bấm Đặt hàng tại cùng thời điểm, hệ thống xử lý thế nào? A. Đơn ghi nhận trước thành công, đơn sau báo hết lượt / B. Giữ chỗ khi Áp dụng | A. Đơn hàng nào ghi nhận trước tại máy chủ sẽ áp dụng thành công, đơn hàng sau báo lỗi mã đã hết lượt | Mã còn 1 lượt, 2 đơn đặt đồng thời: chỉ đơn ghi nhận trước thành công, đơn sau báo lỗi hết lượt. Mâu thuẫn với Q-D14-01, xem M02. |
| D19 (Q-D19-01) | Edge case bị bỏ qua | CAO | Chưa quy định kiểm tra lại mã khi bấm Đặt hàng. | Nếu mã hết hạn hoặc bị Admin vô hiệu hóa sau khi áp nhưng trước khi Đặt hàng, hệ thống xử lý thế nào? A. Kiểm tra lại, từ chối tạo đơn / B. Vẫn cho hoàn tất | A. Kiểm tra lại tại thời điểm bấm Đặt hàng, từ chối tạo đơn và thông báo mã không còn hiệu lực | Mã hết hạn hoặc bị vô hiệu hóa sau khi áp: bấm Đặt hàng thì đơn không được tạo, hiển thị thông báo mã không còn hiệu lực. |
| D20 (Q-D20-01) | Implicit assumption | TB | Chưa quy định tiền giảm trừ vào tiền hàng hay tổng gồm phí ship. | Tiền giảm giá của mã (cả % và cố định) được giảm trừ vào thành phần nào? A. Chỉ tiền hàng / B. Tổng giá trị gồm phí ship | B. Giảm trừ vào tổng giá trị đơn hàng (bao gồm cả tiền hàng và phí vận chuyển) | Tiền giảm được trừ vào tổng gồm tiền hàng và phí ship. Cơ sở tính % và trần ở D12 chưa thống nhất, xem M01, M04. |
| D20 (Q-D20-02) | Implicit assumption | TB | Chưa quy định mã có kiểm tra lại khi phí ship thay đổi. | Khi đổi địa chỉ giao làm thay đổi phí ship sau khi đã áp mã thì mã có được kiểm tra lại không? A. Có / B. Không | A. Có, kiểm tra và tính lại | Đổi địa chỉ làm phí ship thay đổi: mã được kiểm tra lại điều kiện và tiền giảm, tổng tiền được tính lại. |
| D21 (Q-D21-01) | Non-functional bị ignore | TB | Chưa quy định giới hạn số lần nhập mã sai. | Hệ thống có cơ chế giới hạn số lần nhập mã sai liên tiếp không? A. Khóa 5 phút sau 5 lần sai / B. Không giới hạn | B. Không giới hạn số lần nhập mã sai | Nhập sai liên tiếp nhiều lần: hệ thống không khóa ô nhập, mỗi lần đều xử lý và báo lỗi. Rủi ro dò mã ghi tại M06. |
| D21 (Q-D21-02) | Non-functional bị ignore | TB | Chưa quy định tiền giảm do máy chủ tự tính hay lấy từ giao diện. | Tiền giảm được tính và xác nhận ở đâu? A. Máy chủ tự tính / B. Dùng giá trị giao diện gửi lên | B. Dùng giá trị giao diện gửi lên | Theo câu trả lời: hệ thống dùng tiền giảm do giao diện gửi lên. Không viết test chấp nhận hành vi này trước khi BA xác nhận lại, xem M06. |
| D22 (Q-D22-01) | Non-functional bị ignore | TB | Chưa quy định trạng thái chờ khi bấm Áp dụng. | Khi bấm "Áp dụng", hệ thống có hiển thị loading và vô hiệu hóa nút không? A. Có / B. Không | A. Có hiển thị spinner/loading và vô hiệu hóa nút Áp dụng trong khi chờ API phản hồi | Bấm Áp dụng: hiển thị spinner/loading, nút Áp dụng bị vô hiệu hóa đến khi có phản hồi; bấm đúp không gửi thêm yêu cầu. Thời gian timeout `[CAN_DU_LIEU]`. |
| D23 (Q-D23-01) | Implicit assumption | THAP | Chưa quy định lưu vết mã trên đơn và email. | Sau khi đặt hàng thành công, thông tin mã và số tiền giảm có được lưu và hiển thị trong chi tiết đơn và email xác nhận không? A. Có lưu đầy đủ / B. Chỉ tổng tiền | A. Có lưu vết đầy đủ mã giảm giá, số tiền được giảm và hiển thị trong chi tiết đơn hàng, lịch sử đơn và email xác nhận | Đặt hàng thành công có mã: chi tiết đơn, lịch sử đơn và email xác nhận hiển thị mã và số tiền được giảm. |
| X01 (Q-X01-01) | Conflict giữa rule | TB | Chưa thống nhất thị trường khách hàng giữa `chat.md` và Spec. | Hệ thống có hỗ trợ mua và giao hàng sang Nhật Bản không? A. Không, chỉ Việt Nam, VNĐ / B. Có | A. Không hỗ trợ, chỉ phục vụ khách mua hàng và giao hàng tại Việt Nam với đơn vị tiền tệ VNĐ | Function D chỉ kiểm thử cho khách và giao hàng tại Việt Nam, tiền tệ VNĐ. Mua/giao hàng Nhật Bản ngoài phạm vi. |
| X01 (Q-X01-02) | Conflict giữa rule | TB | Chưa quy định tiền tệ, múi giờ nếu khách ở Nhật Bản. | Nếu khách tại Nhật Bản được mua hàng, tiền tệ và múi giờ hiệu lực mã áp dụng thế nào? A. VND, UTC+7 / B. Theo Nhật Bản / C. Không áp dụng | C. Không áp dụng vì chỉ bán tại Việt Nam | Không thiết kế test tiền tệ, múi giờ Nhật Bản; mốc hiệu lực mã theo GMT+7 (Q-D04-02). |

## Phần C: Bảng tự kiểm định chất lượng theo FACT

| Mã | Tiêu chí | Kết quả | Dẫn chứng |
|---|---|---|---|
| F1 | Trích dẫn trung thực | DAT | 9 dòng `MO_HO` và dòng `MAU_THUAN` X01 ở Phần A đều có trích dẫn nguyên văn kèm tên file. Không có dòng `RO`. |
| F2 | Không bịa đặt quy tắc | DAT | Expected Result Phần B chỉ lấy từ câu trả lời trong `gate_status.json`; không dùng `knowledge/voucher-domain.md` làm quy tắc. Giá trị chưa có ghi `[CAN_DU_LIEU]`. |
| F3 | Bằng chứng nguyên bản | DAT | Cột bằng chứng Phần A trích sát câu chữ, phần diễn giải tách sang cột Đánh giá chi tiết. |
| A1 | Thuật ngữ chuẩn xác | DAT | Dùng "Mã giảm giá", "Áp dụng", "Thanh toán", "Đặt hàng", "VNĐ/VND" theo INPUT. |
| A2 | Định dạng số tiền | DAT | Mọi số tiền dạng `200.000đ`, `1.000đ`, `500đ`, `0đ`, `1đ`. |
| C1 | Rà soát toàn diện | DAT | Phần A đủ D01 đến D23 đúng thứ tự, thêm X01. |
| C2 | Không bỏ sót Missing Rule | DAT | 24/24 dòng không `RO` ở Phần A đều có ít nhất 1 dòng Phần B; Phần B có 36 dòng ứng với 36 câu hỏi trong gate. |
| C3 | Khớp số liệu thống kê | DAT | Phần D: 24 dòng Phần A (9 + 14 + 1 + 0), 36 dòng Phần B; tổng nhóm 20 + 8 + 2 + 3 + 3 = 36, tổng rủi ro 15 + 20 + 1 = 36. |
| T1 | Câu hỏi BA là câu hỏi đóng | DAT | 36/36 câu hỏi có từ 2 phương án trở lên (A, B hoặc A, B, C). |
| T2 | Khả năng kiểm thử | KHONG_DAT | Phần lớn câu trả lời đủ để viết Expected Result, nhưng còn mâu thuẫn chặn Expected Result thống nhất: Q-D14-01 với Q-D18-01 (M02), Q-D08-01 với Q-D08-02 (M05), Q-D12-01 với Q-D20-01 (M01), cơ sở tính % (M04), Q-D21-02 (M06), lượt tạm giữ khi mất phiên (M07), điều kiện ngoài phương án Q-D01-01 (M03). Cần hỏi lại BA. |

## Phần D: Bảng thống kê định lượng

| Chỉ số | Số lượng |
|---|---|
| Tổng D-code kiểm tra | 23 (D01 đến D23) + 1 mã X (X01) = 24 dòng Phần A |
| Quy tắc rõ ràng (`RO`) | 0 |
| `MO_HO` | 9 (D01, D02, D03, D04, D07, D10, D11, D13, D20) |
| `KHONG_DE_CAP` | 14 (D05, D06, D08, D09, D12, D14, D15, D16, D17, D18, D19, D21, D22, D23) |
| `MAU_THUAN` | 1 (X01) |
| Tổng điểm mơ hồ/thiếu/mâu thuẫn | 24 |
| Số dòng Missing Rule ở Phần B (= số câu hỏi RESOLVED) | 36 |
| Nhóm Implicit assumption | 20 |
| Nhóm Edge case bị bỏ qua | 8 |
| Nhóm Conflict giữa rule | 2 |
| Nhóm Non-functional bị ignore | 3 |
| Nhóm Rollback/Undo | 3 |
| Rủi ro CAO | 15 |
| Rủi ro TB | 20 |
| Rủi ro THAP | 1 |
| Kết quả FACT | 9 DAT, 1 KHONG_DAT (T2) |
