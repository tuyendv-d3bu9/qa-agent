# KHỐI 1 — BÀI 2.1 — TÓM TẮT REQUIREMENT

> Dán toàn bộ phần dưới đường kẻ vào CUỐI file `prompt_dai.md`.
> Sau đó sửa dòng đầu prompt thành `CHẠY: Bước 1`.

---

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
