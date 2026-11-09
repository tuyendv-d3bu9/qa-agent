# KHỐI 4 — LAB 1 — TỰ KIỂM FACT

> Dán toàn bộ phần dưới đường kẻ vào CUỐI file `prompt_dai.md`.
> Sau đó sửa dòng đầu prompt thành `CHẠY: Bước 4`.

---

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
