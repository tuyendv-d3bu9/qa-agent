# Mindset: từ prompt dài thành AGENTS.md + SKILL.md

## 1. Khi nào cần tách

Prompt tốt sẽ dài dần, vì mỗi bài học lại thêm một kỹ năng. Dài chưa phải là xấu. Cần tách khi thấy:

- Sửa một chỗ nhỏ mà phải đọc cả file mới tìm ra.
- Cùng một loại nội dung (ví dụ câu cấm) nằm rải ở nhiều mục.
- Cùng một thông tin viết ở 2 nơi. Sửa nơi này, quên nơi kia.
- Muốn dùng lại một phần (ví dụ 6W) cho tính năng khác thì phải copy cả đoạn.

## 2. Chuẩn đích đến

| Thành phần | Là gì | Ghi chú |
|---|---|---|
| `AGENTS.md` | Hướng dẫn chung, agent luôn đọc trước | Tên chuẩn có chữ S ở cuối |
| `skills/<tên>/SKILL.md` | Một kỹ năng, mỗi kỹ năng một thư mục | Đầu file có frontmatter `name`, `description` |
| `skills/<tên>/assets/` | File đi kèm skill | Ví dụ khuôn file đầu ra |
| `knowledge/` | Tri thức nghiệp vụ dùng chung | Không phải skill, không có frontmatter |

Đầu một `SKILL.md`:

```markdown
---
name: missing-rule-classification
description: Xếp mỗi điểm còn thiếu vào 1 trong 5 nhóm Missing Rule và gán mức rủi ro. Dùng ở Pha 2.
---
```

- `name`: trùng tên thư mục. Tiếng Anh, chữ thường, nối bằng gạch ngang.
- `description`: skill **làm gì** và **dùng khi nào**. Agent đọc dòng này để quyết định có mở skill hay không, nên đây là dòng quan trọng nhất.

## 3. Mỗi mục của prompt đi đâu

Với từng mục, hỏi lần lượt 4 câu. Gặp câu "có" đầu tiên thì dừng.

| Câu hỏi | Có thì đặt ở |
|---|---|
| Agent cần biết điều này ở **mọi** bước? | `AGENTS.md` |
| Đây là **cách làm** một việc cụ thể? | `skills/<tên>/SKILL.md` |
| Đây là **hình dạng file đầu ra**? | `assets/` của skill tạo ra file đó |
| Đây là **kiến thức nghiệp vụ** nhiều skill dùng chung? | `knowledge/` |

Áp vào `prompt_qa_analyst.md`:

| Mục gốc | Câu trả lời | Đặt ở |
|---|---|---|
| I. Vai trò | Mọi bước | `AGENTS.md` |
| II.1 Nguồn sự thật | Mọi bước | `AGENTS.md` |
| II.2 Tri thức ngành | Kiến thức dùng chung | `knowledge/voucher-domain.md` |
| III.1 Khung 6W | Cách làm | `skills/6w-interrogation/SKILL.md` |
| III.2 5 nhóm Missing Rule | Cách làm | `skills/missing-rule-classification/SKILL.md` |
| IV. Cổng chặn | Mọi bước | `AGENTS.md` |
| V. FACT | Cách làm | `skills/fact-self-check/SKILL.md` |
| VI.1, VI.2 Định dạng đầu ra | Hình dạng file | `assets/` của skill tạo ra file đó |
| VII. Ràng buộc | Mọi bước | `AGENTS.md` |

## 4. Ba quy tắc khi tách

**Chép nguyên văn, không viết lại.**
Tách là đổi chỗ để, không phải đổi nội dung. Không nhân tiện viết lại cho hay hơn. Chỉ sửa câu nói về chính cấu trúc prompt, ví dụ câu "toàn bộ tri thức nằm trong prompt này" sẽ sai sau khi tách.

**Tách trước, sửa sau.**
Vừa tách vừa sửa thì khi kết quả sai, không biết sai do tách hay do sửa. Tách xong, chạy lại thấy giống trước rồi mới sửa.

**Mỗi lỗi chỉ sửa ở một file.**
Nếu sửa một lỗi mà phải mở nhiều file, nghĩa là tách chưa đúng chỗ.

## 5. AGENTS.md chỉ còn phần điều phối

`AGENTS.md` trả lời 3 câu:

1. Agent đóng vai ai, theo nguyên tắc gì.
2. Làm theo luồng nào (Pha 1 → cổng chặn → Pha 2).
3. Bước nào dùng skill nào, đọc tri thức nào, ghi ra đâu.

Agent đọc `AGENTS.md` trước, rồi chỉ mở đúng skill cần cho bước đang làm.

## 6. Kiểm sau khi tách

| Câu hỏi | Đúng khi |
|---|---|
| Có dòng nào của prompt cũ bị mất không? | Mọi dòng còn nguyên văn ở một file nào đó |
| Mỗi `SKILL.md` có đủ `name`, `description` không? | `name` trùng thư mục, `description` nói làm gì và dùng khi nào |
| `AGENTS.md` có trỏ tới đủ skill và tri thức không? | Không có skill nào nằm ngoài bảng điều phối |
| Prompt sau khi tách chạy ra kết quả giống trước không? | Cùng đầu vào, cùng đầu ra |
| Có bước nào trong luồng chưa có skill không? | Mỗi bước trong luồng có skill hoặc có lý do không cần |

## 7. Bẫy hay gặp

| Bẫy | Hậu quả |
|---|---|
| Viết lại cho gọn trong lúc tách | Không so được với bản cũ, lỗi mới lẫn vào |
| Chia quá nhỏ, mỗi gạch đầu dòng một file | Agent phải mở quá nhiều file, khó đọc hơn bản dài |
| Để một thông tin ở 2 nơi | Đổi một chỗ, quên chỗ kia |
| Viết `description` chung chung ("hỗ trợ QA") | Agent không biết khi nào dùng skill |
| Đặt tên theo bài học (`bai-2-2`) | Tên phải nói nội dung là gì, không nói học lúc nào |
| Agent đọc cả tài liệu học | Tài liệu cho người học khác tri thức cho agent. Agent chỉ đọc thư mục của agent |

## 8. Một câu để nhớ

> Phần nào thay đổi vì cùng một lý do thì để chung. Phần nào thay đổi vì lý do khác thì tách riêng.