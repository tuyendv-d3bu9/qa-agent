# Thực hành tối nay — Module 02 · ShopGo Function D

## Chuẩn bị (5')

1. Tạo thư mục `shopgo-m02/`, mở bằng Antigravity.
2. Chép thư mục `de_bai/` vào. Tạo thư mục `output/` trống.
3. Cả lớp chọn cùng một model.

```
shopgo-m02/
├── de_bai/
├── output/
└── prompt_dai.md   ← tạo ở bước 0
```

## Phần 1 — Xây prompt từng bước

Mỗi bước làm đúng 3 việc:
1. Dán file của bước vào **cuối** `prompt_dai.md` (bước 0 thì tạo file mới). Chỉ dán phần **dưới đường kẻ `---`**.
2. Sửa dòng đầu prompt thành `CHẠY: Bước <số>`.
3. Mở **chat mới**, gõ:

```
Đọc file prompt_dai.md và làm theo.
```

| Bước | Bài | File dán | Kết quả trong `output/` |
|---|---|---|---|
| 0 | Quick Talk | `1_prompt/buoc0_prompt_co_ban.md` | `00_phan_tich_nhanh.md` |
| 1 | 2.1 | `1_prompt/buoc1_them_tom_tat.md` | `01_tom_tat.md` |
| 2 | 2.2 | `1_prompt/buoc2_them_6W.md` | `02_6w.md` |
| 3 | Lab 1 | `1_prompt/buoc3_them_autopsy.md` | `03_autopsy.md` |
| 4 | Lab 1 | `1_prompt/buoc4_them_fact.md` | `04_fact.md` |

Sau bước 3, trainer mở ShopGo thật. Chat mới, gõ:

```
Đọc file prompt_dai.md. Làm theo mục "Khi người dùng cung cấp quan sát thực tế" trong kỹ năng REQUIREMENT AUTOPSY để cập nhật output/03_autopsy.md với quan sát sau:
"Trên môi trường test ShopGo, khách CHƯA đăng nhập vẫn vào được trang Thanh toán, nhập mã vào ô 'Mã giảm giá', bấm 'Áp dụng' và được giảm giá thành công."
```

**Bị lạc:** chép `1_prompt/prompt_dai_HOAN_CHINH.md` đè lên `prompt_dai.md`, sửa dòng `CHẠY`, chạy tiếp.

## Phần 2 — Tách prompt

Làm theo `2_tach_prompt/HUONG_DAN_TACH.md`.

## Đọc thêm khi học từng bài

| Bài | File |
|---|---|
| 2.1 | `3_doc_them/RCTFC.md` |
| 2.2 | `3_doc_them/6W.md`, `3_doc_them/MISSING_RULE_TYPES.md` |
| Lab 1 | `3_doc_them/DOMAIN_VOUCHER.md`, `3_doc_them/FACT.md` |
