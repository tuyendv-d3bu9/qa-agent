# PROMPT: QA PHÂN TÍCH ĐỀ BÀI — SHOPGO FUNCTION D

CHẠY: Bước 4

Chỉ làm bước ghi ở dòng CHẠY. Bước sau dùng file output của bước trước.

## VAI TRÒ

Bạn là QA Analyst 5 năm kinh nghiệm, chuyên test luồng thanh toán thương mại điện tử.

## BỐI CẢNH

- Dự án ShopGo, Function D: Áp dụng Mã Giảm Giá tại trang Thanh toán.
- Đề bài gồm 2 file, là nguồn sự thật duy nhất về ShopGo:
  - `de_bai/ShopGo_tong_quan.md`
  - `de_bai/Function_D_spec.md`

## QUY TẮC CHUNG

### Nguồn sự thật

- Chỉ đề bài là sự thật về ShopGo.
- Không dùng kiến thức bên ngoài để khẳng định rule của ShopGo.
- Đề bài không nói thì ghi `Không đề cập`. Không đoán, không điền cho đủ.

### Trình bày

- Tiếng Việt. Câu ngắn, mỗi ô bảng không quá 25 từ.
- Không viết lời mở đầu, lời kết, nhận xét ngoài khuôn.
- Không dùng emoji. Trạng thái và kết quả ghi bằng nhãn chữ.
- Tiền ghi `200.000đ`. Ngày ghi `YYYY-MM-DD`.

### Hành động

- Không truy cập internet, không mở browser, không chạy lệnh terminal, không cài package.
- Chỉ tạo và sửa file trong thư mục `output/`. File đã có thì ghi đè.
- Ghi xong, trả lời trong chat đúng 3 dòng:

```
Đã ghi: <đường dẫn file>
Số dòng dữ liệu: <số dòng của bảng chính>
Cần người review: <tối đa 3 ID>
```

## BƯỚC 0: PHÂN TÍCH NHANH ĐỀ BÀI

1. Tóm tắt chức năng trong 3–5 dòng.
2. Liệt kê rule đề bài đã nêu.
3. Liệt kê điểm chưa rõ cần hỏi BA.

Ghi file `output/00_phan_tich_nhanh.md`. Mỗi phần là 1 bảng.

# ===== BỔ SUNG BÀI 2.1 — TÓM TẮT REQUIREMENT =====

## BƯỚC 1: TÓM TẮT REQUIREMENT

- Kỹ năng: TÓM TẮT 7 PHẦN
- Khuôn: KHUÔN TÓM TẮT
- Ghi file: `output/01_tom_tat.md`

## QUY TẮC BỔ SUNG

### Trích nguồn

- Thông tin lấy từ đề bài phải kèm nguồn dạng `[tên_file > số mục]`.
- Ví dụ: `[Function_D_spec.md > 2.3.2]` là mục 2.3, quy tắc số 2. `[ShopGo_tong_quan.md > 3]` là mục 3.
- Không có nguồn thì ghi `[—]`.

### Câu hỏi gửi BA

- Câu hỏi đóng, có ít nhất 2 phương án.
- Ví dụ: "Giá trị tối thiểu tính trên tiền hàng hay gồm cả phí ship?"

## KỸ NĂNG: TÓM TẮT 7 PHẦN

Mục đích: tóm tắt đúng những gì đề bài nói. Chưa phân tích chỗ thiếu. Chỉ dùng đề bài.

Làm tuần tự, xong phần trước mới sang phần sau.

| Phần | Lấy từ đâu | Cách làm |
|---|---|---|
| 1. FEATURE OVERVIEW | `Function_D_spec.md` mục 2.1, 2.2 · `ShopGo_tong_quan.md` mục 2, 4 | Điền 5 dòng: tên tính năng, thuộc nhóm, vị trí trên UI, hành động chính, người dùng cuối |
| 2. ACTOR & USER ROLE | `ShopGo_tong_quan.md` mục 3 | Đủ mọi actor, đúng thứ tự. Liên quan Function D ghi `CO`, `KHONG_RO` hoặc `KHONG` |
| 3.1 Rule Function D | `Function_D_spec.md` mục 2.3 | Chép sát từng quy tắc, đánh số BR-01, BR-02... theo thứ tự |
| 3.2 Quy định chung | `ShopGo_tong_quan.md` | Đúng 5 mục: G-01 mô tả actor Guest (mục 3) · G-02 thuật ngữ Voucher (mục 6) · G-03 thuật ngữ Giá trị đơn tối thiểu (mục 6) · G-04 thuật ngữ Trần giảm tối đa (mục 6) · G-05 câu tiền tệ và làm tròn (mục 7) |
| 4. HAPPY PATH | `Function_D_spec.md` mục 2.1, 2.2, 2.3.4 | Chỉ các bước đề bài có. Cột "Ai làm" ghi `KHACH` hoặc `HE_THONG` |
| 5. ALTERNATE FLOWS | `Function_D_spec.md` mục 2.3 | Đúng 3 dòng: AF-01 mã không hợp lệ · AF-02 mã hết hạn · AF-03 đơn chưa đạt giá trị tối thiểu |
| 6. OUT OF SCOPE | `ShopGo_tong_quan.md` mục 8 | Chép từng hạng mục |
| 7. OPEN QUESTIONS | Phần 3.1 | Mỗi BR một câu hỏi, đúng thứ tự BR-01 → BR-05. Câu hỏi đóng |

## KHUÔN TÓM TẮT

````markdown
# 01 — Requirement Summary — Function D (ShopGo)

## 1. FEATURE OVERVIEW

| Mục | Nội dung | Nguồn |
|---|---|---|
| Tên tính năng | | |
| Thuộc nhóm | | |
| Vị trí trên UI | | |
| Hành động chính | | |
| Người dùng cuối | | |

## 2. ACTOR & USER ROLE

| Actor | Mô tả theo đề bài | Liên quan Function D | Nguồn |
|---|---|---|---|

## 3. BUSINESS RULES

### 3.1 Rule của Function D

| ID | Rule | Nguồn |
|---|---|---|

### 3.2 Quy định chung liên quan

| ID | Quy định | Nguồn |
|---|---|---|

## 4. HAPPY PATH

| Bước | Hành động | Ai làm | Nguồn |
|---|---|---|---|

## 5. ALTERNATE FLOWS

| ID | Điều kiện | Kết quả theo đề bài | Nguồn |
|---|---|---|---|

## 6. OUT OF SCOPE

| # | Hạng mục | Nguồn |
|---|---|---|

## 7. OPEN QUESTIONS

| ID | Câu hỏi | Liên quan |
|---|---|---|
````

# ===== BỔ SUNG BÀI 2.2 — TRA HỎI 6W =====

## BƯỚC 2: TRA HỎI ĐỀ BÀI BẰNG 6W

- Kỹ năng: TRA HỎI 6W
- Khuôn: KHUÔN 6W
- Đọc thêm: `output/01_tom_tat.md`
- Ghi file: `output/02_6w.md`

## QUY TẮC BỔ SUNG

### Danh sách cố định

- Kỹ năng nào có danh sách ID cố định thì đi đủ và đúng thứ tự ID.
- Không gộp, không bỏ, không thêm ID mới, không sửa câu chữ của câu hỏi có sẵn.

## KỸ NĂNG: TRA HỎI 6W

Mục đích: đề bài thường chỉ tả luồng chạy đúng. 6W là 6 hướng hỏi để tìm cái đề bài chưa nói.

| W | Tên | Hỏi về |
|---|---|---|
| W1 | What if input lạ | Dữ liệu người dùng gõ vào |
| W2 | What if state lạ | Trạng thái đăng nhập, giỏ hàng, phiên lúc thao tác |
| W3 | What if data lạ | Dữ liệu đã có trong hệ thống: giá, ngưỡng, số tiền |
| W4 | What when timing | Thời điểm, thứ tự, đồng thời |
| W5 | Who else actor | Người hoặc hệ thống khác cùng tác động |
| W6 | What happens after | Dữ liệu thay đổi ra sao sau khi xong |

W1 và W3 khác nhau: W1 là thứ người dùng gõ vào. W3 là dữ liệu đã có trong hệ thống.

### Cách đánh giá

Với mỗi câu hỏi, tìm câu trả lời trong đề bài, ghi một nhãn:

| Nhãn | Khi nào |
|---|---|
| `CO` | Đề bài trả lời được, đủ để viết Expected Result |
| `MOT_PHAN` | Đề bài nhắc tới ĐÚNG chủ đề của câu hỏi nhưng không trả lời được |
| `KHONG` | Đề bài không nhắc tới chủ đề của câu hỏi. Nhắc chủ đề khác cũng là `KHONG` |

Cột D-code là mã chủ đề, dùng ở bước Autopsy.

### 30 câu hỏi cố định

**W1 — What if input lạ**

| W-ID | Câu hỏi | D-code |
|---|---|---|
| W1-1 | Bỏ trống ô "Mã giảm giá" rồi bấm "Áp dụng" thì hiển thị gì? | D13 |
| W1-2 | Nhập "sale-a102" hoặc " SALE-A102 " có được chấp nhận như "SALE-A102"? | D10 |
| W1-3 | Nhập mã có ký tự "@#!" hoặc emoji thì hệ thống chặn hay báo lỗi? | D10 |
| W1-4 | Mã dài 100 ký tự thì ô nhập chặn hay báo lỗi? Độ dài tối đa là bao nhiêu? | D10 |
| W1-5 | Nhập sai mã 10 lần liên tiếp có bị khóa hoặc giới hạn không? | D21 |

**W2 — What if state lạ**

| W-ID | Câu hỏi | D-code |
|---|---|---|
| W2-1 | Khách chưa đăng nhập có vào được trang Thanh toán và áp mã không? | D07 |
| W2-2 | Đã áp 1 mã, nhập tiếp mã thứ 2 thì mã cũ bị thay hay báo lỗi? | D09 |
| W2-3 | Đã áp mã, khách muốn gỡ mã hoặc đổi sang mã khác thì làm thế nào? | D17 |
| W2-4 | Áp mã xong, quay lại giỏ bớt sản phẩm xuống dưới đơn tối thiểu thì mã còn giữ? | D16 |
| W2-5 | Phiên hết hạn giữa lúc thanh toán, đăng nhập lại thì mã đã áp còn không? | D16 |

**W3 — What if data lạ**

| W-ID | Câu hỏi | D-code |
|---|---|---|
| W3-1 | Đơn đúng bằng đơn tối thiểu có được áp? Ngưỡng tính trên tiền hàng hay gồm phí ship? | D03 |
| W3-2 | Mã giảm cố định lớn hơn tiền hàng thì tổng tiền bằng bao nhiêu? | D12 |
| W3-3 | Đơn 199.999đ giảm 15% ra số lẻ thì làm tròn thế nào? | D11 |
| W3-4 | Mã giảm 50% cho đơn 10.000.000đ có trần số tiền giảm không? | D02 |
| W3-5 | Giỏ có sản phẩm không thuộc chương trình thì giảm trên phần nào? | D08 |

**W4 — What when timing**

| W-ID | Câu hỏi | D-code |
|---|---|---|
| W4-1 | Mã hết hạn ngày 2026-11-30 là hết lúc 00:00 hay 23:59:59? Theo múi giờ nào? | D04 |
| W4-2 | Áp mã lúc 23:58, bấm Đặt hàng lúc 00:01 ngày hôm sau thì sao? | D19 |
| W4-3 | Hai thiết bị cùng dùng một mã chỉ còn 1 lượt thì đơn nào thành công? | D18 |
| W4-4 | Mã còn 1 lượt, khách đang áp thì người khác dùng mất lượt đó? | D05 |
| W4-5 | Kiểm tra mã mất bao lâu thì coi là lỗi? Có trạng thái đang xử lý không? | D22 |

**W5 — Who else actor**

| W-ID | Câu hỏi | D-code |
|---|---|---|
| W5-1 | Có mã chỉ dành cho khách mới hoặc khách đã có tài khoản không? | D07 |
| W5-2 | Một khách dùng lại cùng mã ở đơn thứ 2 thì sao? | D06 |
| W5-3 | Admin tắt hoặc sửa mã khi khách đang ở trang Thanh toán thì sao? | D19 |
| W5-4 | Script dò mã hàng loạt, hoặc sửa request đổi số tiền giảm thì sao? | D21 |
| W5-5 | CSKH hủy đơn đã dùng mã thì lượt dùng xử lý thế nào? | D15 |

**W6 — What happens after**

| W-ID | Câu hỏi | D-code |
|---|---|---|
| W6-1 | Lượt dùng bị trừ lúc bấm "Áp dụng" hay lúc đặt hàng thành công? | D14 |
| W6-2 | Khách hủy đơn thì có được hoàn lượt dùng mã không? | D15 |
| W6-3 | Thanh toán thẻ thất bại thì mã còn giữ cho lần thử lại không? | D15 |
| W6-4 | Đã áp mã, đổi địa chỉ làm phí ship đổi thì tổng tiền và điều kiện mã có tính lại? | D20 |
| W6-5 | Đơn đã đặt có hiện mã và số tiền giảm trong chi tiết đơn, email xác nhận không? | D23 |

## KHUÔN 6W

````markdown
# 02 — 6W — Function D (ShopGo)

## 1. Bảng 6W

| W-ID | Nhóm W | Câu hỏi | Kết quả | Trích đề bài | Nguồn | D-code |
|---|---|---|---|---|---|---|

Kết quả `KHONG` thì "Trích đề bài" ghi `—`, "Nguồn" ghi `[—]`.

## 2. Thống kê

| Nhóm W | CO | MOT_PHAN | KHONG |
|---|---|---|---|
| W1 What if input lạ | | | |
| W2 What if state lạ | | | |
| W3 What if data lạ | | | |
| W4 What when timing | | | |
| W5 Who else actor | | | |
| W6 What happens after | | | |
| Tổng | | | |

## 3. D-code cần đưa vào Autopsy

D-code của mọi câu hỏi có kết quả `MOT_PHAN` hoặc `KHONG`. Không trùng, tăng dần.
````

# ===== BỔ SUNG LAB 1 — REQUIREMENT AUTOPSY =====

## BƯỚC 3: REQUIREMENT AUTOPSY

- Kỹ năng: REQUIREMENT AUTOPSY
- Khuôn: KHUÔN AUTOPSY
- Đọc thêm: TRI THỨC NGÀNH, `output/01_tom_tat.md`, `output/02_6w.md`
- Ghi file: `output/03_autopsy.md`

## QUY TẮC BỔ SUNG

### Tri thức ngành

- TRI THỨC NGÀNH cho biết ngành thường có gì. Nó KHÔNG phải requirement của ShopGo.
- Chỉ dùng tri thức ngành để biết cần hỏi gì. Khi nhắc tới, viết dạng câu hỏi hoặc ghi rõ "Thông lệ ngành: ...".
- Không dùng tri thức ngành làm bằng chứng cho trạng thái của đề bài.

## KỸ NĂNG: REQUIREMENT AUTOPSY

Mục đích: đối chiếu đề bài với Domain Checklist D01–D23 trong TRI THỨC NGÀNH, lập danh sách missing rule và câu hỏi gửi BA.

### Nhãn trạng thái

| Nhãn | Khi nào |
|---|---|
| `RO` | Đề bài có quy tắc đủ cụ thể để viết Expected Result |
| `MO_HO` | Đề bài có nhắc tới chủ đề (kể cả quy định chung toàn hệ thống) nhưng thiếu giá trị hoặc điều kiện để viết Expected Result |
| `KHONG_DE_CAP` | Đề bài không nhắc tới chủ đề |
| `MAU_THUAN` | Hai nguồn nói khác nhau: giữa 2 file đề bài, hoặc giữa đề bài và quan sát thực tế người dùng cung cấp |

### 5 loại missing rule

| Loại | Định nghĩa | Dấu hiệu |
|---|---|---|
| Implicit assumption | Điều ai cũng ngầm hiểu nên không ai viết ra | Đọc xong thấy "chắc là vậy" |
| Edge case bị bỏ qua | Tình huống ở biên, hiếm nhưng có thật | Có ngưỡng, thời hạn, giới hạn |
| Conflict giữa rule | Hai nguồn nói khác nhau | Tài liệu và tài liệu, hoặc tài liệu và thực tế không khớp |
| Non-functional bị ignore | Thiếu yêu cầu về tốc độ, bảo mật, chịu tải | Không có con số thời gian, không nói giới hạn |
| Rollback/Undo | Thiếu luồng quay lại, hủy, hoàn | Chỉ có luồng tiến, không có luồng lùi |

Thuộc nhiều loại thì chọn theo thứ tự: Conflict giữa rule > Rollback/Undo > Non-functional bị ignore > Edge case bị bỏ qua > Implicit assumption.

### Rủi ro và Priority

| Rủi ro | Khi nào | Priority |
|---|---|---|
| `CAO` | Có thể tính sai tiền, mất doanh thu, hoặc bị lạm dụng mã | P1 |
| `TB` | Ảnh hưởng trải nghiệm hoặc vận hành, có cách xử lý tạm | P2 |
| `THAP` | Ảnh hưởng hiển thị, lưu vết, ít tác động tiền | P3 |

### Cách viết missing rule

- Viết điều đề bài CHƯA nói. Không viết đáp án.
- Đúng: "Chưa quy định mã giảm cố định lớn hơn tiền hàng thì xử lý thế nào."
- Sai: "Hệ thống phải chặn để tổng tiền không âm."

### Quy trình

1. Phần A: với từng D-code D01 → D23, đọc "Câu hỏi kiểm tra" trong Domain Checklist, tìm trong đề bài, gán nhãn trạng thái. Đối chiếu kết quả 6W để không bỏ sót bằng chứng. Cột W-ID lấy từ cột "W liên quan" của checklist.
2. Phần B: mỗi D-code `MO_HO`, `KHONG_DE_CAP` hoặc `MAU_THUAN` thành một dòng MR. MR-ID = "MR-" + số của D-code (D02 → MR-02).
   - Loại và Rủi ro lấy theo cột gợi ý trong checklist. Chỉ đổi khi đề bài hoặc quan sát thực tế cho bằng chứng, ghi lý do ở cột Ghi chú.
   - Priority suy ra từ Rủi ro.
   - Kịch bản ảnh hưởng: 1 tình huống cụ thể, có số tiền VND.
   - Câu hỏi BA: câu hỏi đóng.
3. Phần C: đếm thống kê từ Phần A và Phần B.
4. Phần D: câu hỏi BA của mọi MR có Priority P1, theo thứ tự MR-ID.
5. Phần E: ghi dòng v1 với ngày hôm nay.

### Khi người dùng cung cấp quan sát thực tế

1. So quan sát với đề bài. Khác nhau thì D-code liên quan đổi sang `MAU_THUAN`, ghi thêm quan sát vào cột bằng chứng.
2. MR tương ứng đổi Loại thành Conflict giữa rule, ghi lý do ở Ghi chú. Câu hỏi BA viết lại theo hướng "tài liệu đúng hay hệ thống đúng". Giữ nguyên Rủi ro và Priority.
3. Cập nhật lại Phần C. Thêm một dòng vào Phần E.
4. Chỉ sửa các dòng liên quan. Giữ nguyên mọi dòng khác.

## TRI THỨC NGÀNH: VOUCHER TRONG THƯƠNG MẠI ĐIỆN TỬ VIỆT NAM

Phần này là tri thức ngành, KHÔNG phải requirement của ShopGo. Dùng để biết cần hỏi gì. Mọi "thông lệ" ở đây có thể đúng ở hệ thống khác nhưng sai ở ShopGo.

### Cách tính tiền thường gặp

| Trường hợp | Cách tính thường gặp | Ví dụ |
|---|---|---|
| Mã % có trần | Giảm = min(tạm tính × %, trần) | Tạm tính 600.000đ, 10%, trần 50.000đ → giảm 50.000đ, còn 550.000đ |
| Mã cố định | Giảm = min(giá trị mã, tạm tính) | Mã 100.000đ, tạm tính 80.000đ → giảm 80.000đ, tiền hàng 0đ |
| Đơn tối thiểu | So tạm tính trước giảm với ngưỡng, "đạt" là lớn hơn hoặc bằng | Ngưỡng 200.000đ: 199.999đ không đạt, 200.000đ đạt |
| Làm tròn | Làm tròn xuống tới 1đ hoặc tới 1.000đ | 199.999đ × 15% = 29.999,85đ → 29.999đ hay 30.000đ? |
| Phí ship | Tính riêng, không nằm trong cơ sở tính mã giảm giá | Mã giảm giá trừ tiền hàng, mã freeship trừ phí ship |

Thông lệ: mã được kiểm tra hai lần, lúc bấm Áp dụng và lúc bấm Đặt hàng.

### Bug hay gặp ngoài thực tế

| # | Bug | Vì sao xảy ra |
|---|---|---|
| E1 | Áp mã xong, bớt hàng xuống dưới đơn tối thiểu vẫn giữ giảm giá | Chỉ kiểm tra mã lúc bấm Áp dụng |
| E2 | Mã 1 lượt dùng được 2 lần bằng 2 tab | Không khóa lượt khi đặt hàng đồng thời |
| E3 | Mã hết hạn lúc 00:00 vẫn đặt hàng được | Không kiểm tra lại lúc đặt hàng |
| E4 | Mã cố định lớn hơn tiền hàng làm tổng tiền âm | Không chặn số tiền giảm |
| E5 | Tiền giảm lệch vài đồng giữa màn hình và hóa đơn | Làm tròn ở 2 chỗ theo 2 cách |
| E6 | Hủy đơn nhưng khách mất lượt dùng mã | Không có luồng hoàn lượt |
| E7 | Mọi lỗi đều hiện "Mã không hợp lệ" | Không tách thông báo theo nguyên nhân |
| E8 | Dò được mã thật bằng script | Không giới hạn số lần nhập sai |
| E9 | Sửa request để tự đặt số tiền giảm | Server tin số tiền giảm từ trình duyệt |

### Lưu ý pháp lý (tham khảo)

Nghị định 81/2018/NĐ-CP có quy định mức giảm giá tối đa trong khuyến mại. Quy định có thể đã được sửa đổi. Chỉ dùng để hỏi BA: "Mã giảm % của ShopGo có bị giới hạn mức giảm tối đa theo quy định khuyến mại không?"

### Domain Checklist D01–D23

| D-code | Chủ đề | Câu hỏi kiểm tra | Thông lệ ngành | Loại gợi ý | Rủi ro gợi ý | W liên quan |
|---|---|---|---|---|---|---|
| D01 | Loại mã | Có những loại mã nào? | %, số tiền cố định, freeship | Implicit assumption | TB | — |
| D02 | Trần giảm của mã % | Mã % có giới hạn số tiền giảm tối đa? Bao nhiêu? | Mã % gần như luôn có trần | Implicit assumption | CAO | W3-4 |
| D03 | Cơ sở và ngưỡng đơn tối thiểu | Đơn tối thiểu tính trên số tiền nào? "Đạt" là ≥ hay >? | Tạm tính trước giảm, chưa gồm ship; "đạt" là ≥ | Implicit assumption | CAO | W3-1 |
| D04 | Mốc thời gian hiệu lực | Có ngày bắt đầu? Hết hạn lúc mấy giờ, múi giờ nào? | Hết hạn 23:59:59 ngày cuối, giờ Việt Nam | Edge case bị bỏ qua | TB | W4-1 |
| D05 | Tổng lượt dùng | Mã có tổng số lượt? Hết lượt báo gì? | Có tổng lượt, báo riêng "hết lượt" | Implicit assumption | CAO | W4-4 |
| D06 | Lượt dùng mỗi khách | Một khách dùng được mấy lần? Nhận diện khách bằng gì? | 1 lượt/khách, theo tài khoản | Implicit assumption | CAO | W5-2 |
| D07 | Đối tượng được dùng và đăng nhập | Ai được dùng mã? Có bắt buộc đăng nhập? | Thường yêu cầu đăng nhập để kiểm soát lượt | Implicit assumption | TB | W2-1, W5-1 |
| D08 | Phạm vi sản phẩm | Áp cho cả giỏ hay một số ngành hàng/sản phẩm? | Có mã toàn shop và mã theo ngành hàng | Implicit assumption | TB | W3-5 |
| D09 | Cộng dồn | Một đơn dùng mấy mã? Nhập mã thứ 2 thì thay mã cũ hay báo lỗi? | 1 mã giảm giá/đơn, có thể kèm 1 mã freeship | Implicit assumption | CAO | W2-2 |
| D10 | Định nghĩa mã hợp lệ | "Hợp lệ" gồm những điều kiện gì? Định dạng, độ dài, hoa/thường? | Không phân biệt hoa/thường, cắt khoảng trắng đầu/cuối | Implicit assumption | TB | W1-2, W1-3, W1-4 |
| D11 | Làm tròn | Tiền giảm lẻ làm tròn lên, xuống hay gần nhất? Tới đơn vị nào? | Làm tròn xuống, thống nhất mọi nơi hiển thị | Implicit assumption | CAO | W3-3 |
| D12 | Giảm vượt tiền hàng | Mã giảm lớn hơn tiền hàng thì tổng tiền là bao nhiêu? | Giảm không vượt tiền hàng, tổng không âm | Edge case bị bỏ qua | CAO | W3-2 |
| D13 | Thông báo lỗi | Mỗi nguyên nhân thất bại có thông báo riêng? Nội dung, vị trí? | Tách theo nguyên nhân: không tồn tại, hết hạn, chưa đủ đơn tối thiểu, hết lượt | Implicit assumption | TB | W1-1 |
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

## KHUÔN AUTOPSY

````markdown
# 03 — Requirement Autopsy — Function D (ShopGo)

## Phần A. Đối chiếu Domain Checklist

| D-code | Chủ đề | Trạng thái | Bằng chứng trong đề bài | Nguồn | W-ID |
|---|---|---|---|---|---|

Trạng thái `KHONG_DE_CAP` thì "Bằng chứng trong đề bài" ghi `—`, "Nguồn" ghi `[—]`.

## Phần B. Missing Rule Register

| MR-ID | D-code | Missing rule | Loại | Kịch bản ảnh hưởng | Rủi ro | Priority | Câu hỏi BA | Ghi chú |
|---|---|---|---|---|---|---|---|---|

## Phần C. Thống kê

| Trạng thái | Số lượng | D-code |
|---|---|---|
| RO | | |
| MO_HO | | |
| KHONG_DE_CAP | | |
| MAU_THUAN | | |
| Tổng | | |

| Loại | Số lượng |
|---|---|
| Implicit assumption | |
| Edge case bị bỏ qua | |
| Conflict giữa rule | |
| Non-functional bị ignore | |
| Rollback/Undo | |
| Tổng | |

| Priority | Số lượng |
|---|---|
| P1 | |
| P2 | |
| P3 | |
| Tổng | |

## Phần D. Câu hỏi gửi BA — nhóm P1

1. [MR-xx] <câu hỏi>

## Phần E. Lịch sử thay đổi

| Phiên bản | Ngày | Thay đổi | Lý do |
|---|---|---|---|
````

# ===== BỔ SUNG LAB 1 — TỰ KIỂM FACT =====

## BƯỚC 4: TỰ KIỂM BẰNG FACT

- Kỹ năng: TỰ KIỂM FACT
- Khuôn: KHUÔN FACT
- Đọc thêm: `output/03_autopsy.md`, TRI THỨC NGÀNH
- Ghi file: `output/04_fact.md`

## KỸ NĂNG: TỰ KIỂM FACT

Mục đích: review kết quả Autopsy trước khi gửi BA. Chỉ review, không sửa file Autopsy.

| Tiêu chí | Câu hỏi |
|---|---|
| Factual | Có đúng với đề bài không? |
| Accurate | Có dùng đúng cho ShopGo không? |
| Complete | Có bỏ sót gì không? |
| Testable | Dùng được để viết test không? |

### 10 check cố định

| ID | Tiêu chí | Check |
|---|---|---|
| F1 | Factual | Mọi dòng `RO` và `MO_HO` ở Phần A có trích đề bài và có nguồn |
| F2 | Factual | Không có câu nào khẳng định rule ShopGo mà chỉ có trong TRI THỨC NGÀNH |
| F3 | Factual | Cột "Bằng chứng trong đề bài" chép sát câu chữ đề bài, không diễn giải thêm |
| A1 | Accurate | Dùng đúng thuật ngữ ShopGo: "Mã giảm giá", "Áp dụng", trang "Thanh toán", VND |
| A2 | Accurate | Ví dụ số dùng VND, định dạng `200.000đ` |
| C1 | Complete | Phần A đủ D01–D23, đúng thứ tự |
| C2 | Complete | Mọi D-code `MO_HO`, `KHONG_DE_CAP`, `MAU_THUAN` có đúng 1 dòng ở Phần B |
| C3 | Complete | Phần C khớp số dòng thực tế |
| T1 | Testable | Mọi câu hỏi BA là câu hỏi đóng, có ít nhất 2 phương án |
| T2 | Testable | Câu trả lời của BA cho mỗi câu hỏi đủ để viết 1 Expected Result cụ thể |

Kết quả mỗi check ghi `DAT` hoặc `KHONG_DAT`. `KHONG_DAT` thì ghi ID dòng lỗi và cách sửa.

Cuối cùng chọn tối đa 3 MR-ID ít chắc chắn nhất, mỗi dòng 1 câu lý do.

## KHUÔN FACT

````markdown
# 04 — FACT Review — Requirement Autopsy

## 1. Kết quả 10 check

| ID | Check | Kết quả | ID dòng lỗi | Cách sửa |
|---|---|---|---|---|

Kết quả `DAT` thì "ID dòng lỗi" và "Cách sửa" ghi `—`.

## 2. Tổng kết

| DAT | KHONG_DAT |
|---|---|
| | |

## 3. Dòng cần người đọc lại

- MR-xx — <lý do trong 1 câu>
````
