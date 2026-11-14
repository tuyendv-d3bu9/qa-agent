# Business Domain — Voucher trong Thương mại điện tử Việt Nam

> **Đọc trước khi dùng.** File này là tri thức ngành, KHÔNG phải requirement của ShopGo.
> Dùng để biết **cần hỏi gì**. Không dùng để **tự trả lời** thay BA.
> Mọi dòng "Thông lệ ngành" ở đây có thể đúng ở hệ thống khác nhưng sai ở ShopGo.

## Vì sao cần file này

Đề bài chỉ nói những gì người viết nhớ ra. Tester hiểu domain sẽ thấy được những gì đề bài **không** nói.
Ví dụ: đề bài nói "mã có ngày hết hạn". Người hiểu domain sẽ hỏi tiếp: hết hạn lúc 00:00 hay 23:59:59, đang thanh toán dở thì sao, có ngày bắt đầu không.

| | Đề bài | Tri thức ngành |
|---|---|---|
| Trả lời câu hỏi | ShopGo làm gì? | Ngành thường làm gì? |
| Độ tin cậy | Nguồn sự thật của dự án | Tham khảo |
| Dùng để | Viết Expected Result | Đặt câu hỏi cho BA |

---

## A. Thuật ngữ

| Thuật ngữ | Nghĩa | Ghi chú |
|---|---|---|
| Voucher / Mã giảm giá | Chuỗi ký tự khách nhập để được giảm tiền | ShopGo dùng chữ "Mã giảm giá" trên UI |
| Mã giảm % | Giảm theo tỉ lệ trên một số tiền gốc | Hầu như luôn đi kèm trần giảm |
| Mã giảm cố định | Giảm một số tiền cố định | Có thể lớn hơn tiền hàng nếu không chặn |
| Mã freeship | Giảm hoặc miễn phí vận chuyển | Thường tách riêng với mã giảm giá |
| Đơn tối thiểu (min order) | Ngưỡng tiền để mã được dùng | Cần biết tính trên số tiền nào |
| Trần giảm (max cap) | Số tiền giảm tối đa của mã % | Vd: 10%, tối đa 50.000đ |
| Tổng lượt (usage limit) | Tổng số lần mã được dùng trên toàn hệ thống | Vd: 500 lượt |
| Lượt/khách (per-user limit) | Số lần một khách được dùng mã | Cần biết nhận diện khách bằng gì |
| Cộng dồn (stacking) | Dùng nhiều mã trên một đơn | Nguồn bug và lạm dụng phổ biến |
| Phạm vi (scope) | Sản phẩm/ngành hàng được áp mã | Toàn giỏ hay một phần giỏ |
| Giữ chỗ (reserve) | Tạm giữ một lượt khi khách vừa áp mã | Chưa trừ thật cho tới khi đặt hàng |
| Tạm tính (subtotal) | Tổng tiền hàng trước giảm, trước phí ship | Cơ sở tính phổ biến |

## B. Vòng đời

### B1. Vòng đời của mã (phía quản trị)

```
Nháp → Đang hoạt động → Hết hạn
                      → Hết lượt
                      → Bị tắt (Admin)
```

### B2. Vòng đời của mã trong một đơn (phía khách)

```
Chưa áp → Đang kiểm tra → Đã áp ──→ Đã dùng (đặt hàng thành công) ──→ Hoàn lượt (hủy đơn)
                        → Bị từ chối      ↑
          Đã áp → Đã gỡ                   └── Kiểm tra lại khi giỏ đổi / lúc đặt hàng
```

Thông lệ ngành: mã được kiểm tra **hai lần** — lúc bấm Áp dụng và lúc bấm Đặt hàng. Hệ thống chỉ kiểm tra một lần là nguồn bug quen thuộc.

## C. Cách tính tiền (thông lệ, mỗi hệ thống một kiểu)

| Trường hợp | Cách tính thường gặp | Ví dụ |
|---|---|---|
| Mã % có trần | Giảm = min(tạm tính × %, trần) | Tạm tính 600.000đ, 10%, trần 50.000đ → 60.000đ > trần → giảm 50.000đ, còn 550.000đ |
| Mã cố định | Giảm = min(giá trị mã, tạm tính) | Mã 100.000đ, tạm tính 80.000đ → giảm 80.000đ, tiền hàng 0đ |
| Min order | So sánh tạm tính trước giảm với ngưỡng, "đạt" = lớn hơn hoặc bằng | Ngưỡng 200.000đ: 199.999đ không đạt, 200.000đ đạt |
| Làm tròn | Làm tròn xuống tới 1đ, hoặc tới 1.000đ | 199.999đ × 15% = 29.999,85đ → 29.999đ hay 30.000đ? |
| Phí ship | Tính riêng, không nằm trong cơ sở tính mã giảm giá | Mã giảm giá trừ tiền hàng, mã freeship trừ phí ship |

Chênh lệch làm tròn chỉ vài đồng nhưng gây lệch giữa màn hình, hóa đơn và số tiền cổng thanh toán trừ. Đây là loại bug khó phát hiện bằng mắt.

## D. Lưu ý pháp lý tại Việt Nam (tham khảo)

- Nghị định 81/2018/NĐ-CP về hoạt động xúc tiến thương mại có quy định mức giảm giá tối đa trong khuyến mại (mức phổ biến được nhắc tới là không quá 50% giá trước khuyến mại, có ngoại lệ).
- Quy định có thể đã được sửa đổi, bổ sung. **Không dùng để viết Expected Result.** Chỉ dùng để hỏi BA: "Mã giảm % của ShopGo có bị giới hạn mức giảm tối đa theo quy định khuyến mại không?"

## E. Bug hay gặp ngoài thực tế

| # | Bug | Vì sao xảy ra |
|---|---|---|
| E1 | Áp mã xong, bớt hàng xuống dưới min order vẫn giữ giảm giá | Chỉ kiểm tra mã lúc bấm Áp dụng |
| E2 | Một mã 1 lượt dùng được 2 lần bằng 2 tab | Không khóa lượt khi đặt hàng đồng thời |
| E3 | Mã hết hạn lúc 00:00 vẫn đặt hàng được | Không kiểm tra lại lúc đặt hàng |
| E4 | Mã cố định lớn hơn tiền hàng làm tổng tiền âm | Không chặn số tiền giảm |
| E5 | Số tiền giảm lệch vài đồng giữa màn hình và hóa đơn | Làm tròn ở 2 chỗ theo 2 cách |
| E6 | Hủy đơn nhưng khách mất lượt dùng mã | Không có luồng hoàn lượt |
| E7 | Mọi lỗi đều hiện "Mã không hợp lệ" | Không tách thông báo theo nguyên nhân |
| E8 | Dò được mã thật bằng script | Không giới hạn số lần nhập sai |
| E9 | Sửa request để tự đặt số tiền giảm | Server tin số tiền giảm từ phía trình duyệt |

---

## F. Domain Checklist D01–D23

Dùng ở bước Requirement Autopsy (Lab 1). Mỗi D-code là một chủ đề cần kiểm tra trong đề bài.

Cột **Loại gợi ý** và **Rủi ro gợi ý** là mặc định. Chỉ đổi khi đề bài hoặc quan sát thực tế cho bằng chứng.

Cách chấm Rủi ro:
- `CAO`: có thể tính sai tiền, mất doanh thu, hoặc bị lạm dụng mã.
- `TB`: ảnh hưởng trải nghiệm hoặc vận hành, có cách xử lý tạm.
- `THAP`: ảnh hưởng hiển thị, lưu vết, ít tác động tiền.

| D-code | Chủ đề | Câu hỏi kiểm tra | Thông lệ ngành (tham khảo) | Loại gợi ý | Rủi ro gợi ý | W liên quan |
|---|---|---|---|---|---|---|
| D01 | Loại mã | Có những loại mã nào? | %, số tiền cố định, freeship | Implicit assumption | TB | — |
| D02 | Trần giảm của mã % | Mã % có giới hạn số tiền giảm tối đa? Bao nhiêu? | Mã % gần như luôn có trần | Implicit assumption | CAO | W3-4 |
| D03 | Cơ sở và ngưỡng đơn tối thiểu | Min order tính trên số tiền nào? "Đạt" là ≥ hay >? | Tạm tính trước giảm, chưa gồm ship; "đạt" là ≥ | Implicit assumption | CAO | W3-1 |
| D04 | Mốc thời gian hiệu lực | Có ngày bắt đầu? Hết hạn lúc mấy giờ, theo múi giờ nào? | Hết hạn 23:59:59 ngày cuối, giờ Việt Nam | Edge case bị bỏ qua | TB | W4-1 |
| D05 | Tổng lượt dùng | Mã có tổng số lượt? Hết lượt báo gì? | Có tổng lượt, báo riêng "hết lượt" | Implicit assumption | CAO | W4-4 |
| D06 | Lượt dùng mỗi khách | Một khách dùng được mấy lần? Nhận diện khách bằng gì? | 1 lượt/khách, nhận diện theo tài khoản | Implicit assumption | CAO | W5-2 |
| D07 | Đối tượng được dùng và đăng nhập | Ai được dùng mã? Có bắt buộc đăng nhập? | Thường yêu cầu đăng nhập để kiểm soát lượt | Implicit assumption | TB | W2-1, W5-1 |
| D08 | Phạm vi sản phẩm | Áp cho cả giỏ hay một số ngành hàng/sản phẩm? | Có mã toàn shop và mã theo ngành hàng | Implicit assumption | TB | W3-5 |
| D09 | Cộng dồn | Một đơn dùng mấy mã? Nhập mã thứ 2 thì thay mã cũ hay báo lỗi? | 1 mã giảm giá/đơn, có thể kèm 1 mã freeship | Implicit assumption | CAO | W2-2 |
| D10 | Định nghĩa mã hợp lệ | "Hợp lệ" gồm những điều kiện gì? Định dạng, độ dài, hoa/thường? | Không phân biệt hoa/thường, cắt khoảng trắng đầu/cuối | Implicit assumption | TB | W1-2, W1-3, W1-4 |
| D11 | Làm tròn | Tiền giảm lẻ làm tròn lên, xuống hay gần nhất? Tới đơn vị nào? | Làm tròn xuống, thống nhất mọi nơi hiển thị | Implicit assumption | CAO | W3-3 |
| D12 | Giảm vượt tiền hàng | Mã giảm lớn hơn tiền hàng thì tổng tiền là bao nhiêu? | Giảm không vượt tiền hàng, tổng không âm | Edge case bị bỏ qua | CAO | W3-2 |
| D13 | Thông báo lỗi | Mỗi nguyên nhân thất bại có thông báo riêng? Nội dung, vị trí? | Tách theo nguyên nhân: không tồn tại, hết hạn, chưa đủ min, hết lượt | Implicit assumption | TB | W1-1 |
| D14 | Thời điểm trừ lượt | Trừ lượt lúc bấm Áp dụng hay lúc đặt hàng thành công? | Giữ chỗ khi áp, trừ khi đặt hàng thành công | Implicit assumption | CAO | W6-1 |
| D15 | Hoàn lượt | Hủy đơn, thanh toán thất bại: mã có được trả lại? | Thanh toán thất bại thì trả mã | Rollback/Undo | TB | W5-5, W6-2, W6-3 |
| D16 | Giỏ hoặc phiên thay đổi sau khi áp | Sửa giỏ, quay lại, phiên hết hạn: mã có được kiểm tra lại? | Kiểm tra lại mỗi lần giỏ đổi | Edge case bị bỏ qua | CAO | W2-4, W2-5 |
| D17 | Gỡ hoặc đổi mã | Khách gỡ mã, đổi mã khác được không? Tổng tiền tính lại thế nào? | Có nút gỡ mã, mã mới thay mã cũ | Rollback/Undo | TB | W2-3 |
| D18 | Dùng đồng thời | Hai thiết bị cùng dùng một mã còn 1 lượt thì sao? | Chỉ một đơn thành công | Edge case bị bỏ qua | CAO | W4-3 |
| D19 | Mã mất hiệu lực giữa luồng | Mã hết hạn hoặc bị tắt sau khi áp, trước khi đặt hàng? | Kiểm tra lại lúc đặt hàng, báo khách | Edge case bị bỏ qua | CAO | W4-2, W5-3 |
| D20 | Mã và phí ship | Mã trừ trên tiền hàng hay cả phí ship? Phí ship đổi thì tính lại? | Mã giảm giá trừ tiền hàng, ship tính riêng | Implicit assumption | TB | W6-4 |
| D21 | Chống dò và giả mạo | Giới hạn số lần nhập sai? Server tự tính tiền giảm? | Giới hạn nhập sai, server tự tính | Non-functional bị ignore | TB | W1-5, W5-4 |
| D22 | Thời gian phản hồi | Kiểm tra mã tối đa bao lâu? Có trạng thái đang xử lý? | Vài giây, có loading, chặn bấm lặp | Non-functional bị ignore | TB | W4-5 |
| D23 | Lưu vết trên đơn | Mã và tiền giảm có hiện trên chi tiết đơn, email xác nhận? | Lưu vào đơn, hiện trên email | Implicit assumption | THAP | W6-5 |
