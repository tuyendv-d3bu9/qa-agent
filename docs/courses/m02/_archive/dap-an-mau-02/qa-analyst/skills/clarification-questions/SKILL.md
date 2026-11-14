---
name: clarification-questions
description: Viết câu hỏi đóng gửi BA, đặt ID theo D-code và mã X cho mâu thuẫn, xuất OUTPUT/questions_for_clarification.md đúng định dạng tools/gate.js đọc được. Dùng ở cuối Pha 1.
---

# Câu hỏi làm rõ

## Khi nào đặt câu hỏi

- Mỗi D-code trong Domain Checklist mà tài liệu `INPUT/` chưa đủ để viết Expected Result có ít nhất 1 câu hỏi.
- Mỗi mâu thuẫn giữa các tệp trong `INPUT/` có 1 mã X riêng và ít nhất 1 câu hỏi.

## Đặt mã

| Loại | Quy tắc | Ví dụ |
|---|---|---|
| ID câu hỏi theo D-code | `Q-<D-code>-<số thứ tự 2 chữ số>` | `Q-D03-02` |
| Mã mâu thuẫn | `X01`, `X02`... theo thứ tự phát hiện | `X01` |
| ID câu hỏi mâu thuẫn | `Q-<mã X>-<số thứ tự 2 chữ số>` | `Q-X01-01` |

Thứ tự dòng: D01 đến D23, sau đó X01 trở đi.

## Viết câu hỏi

- Câu hỏi đóng, có ít nhất 2 phương án A, B, C...
- Các phương án nằm trong cùng một ô, ngăn nhau bằng `<br>`.
- Không gợi ý phương án nên chọn. Câu hỏi mâu thuẫn phải nêu tên 2 tệp nói khác nhau.

## Đầu ra

- Dùng khuôn `assets/questions_for_clarification.md`.
- Ghi `OUTPUT/questions_for_clarification.md`, sau đó chạy `node tools/gate.js init OUTPUT/questions_for_clarification.md`.
