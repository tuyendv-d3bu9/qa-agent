# RCTFC — Khung viết prompt

5 phần của một prompt dùng được nhiều lần và cho kết quả ổn định.

| # | Phần | Trả lời câu hỏi | Thiếu thì sao |
|---|---|---|---|
| R | Role | AI đóng vai ai, kinh nghiệm gì? | Output chung chung, không đúng góc nhìn QA |
| C | Context | Dự án nào, tính năng nào, đọc file nào? | AI tự bịa bối cảnh |
| T | Task | Làm gì, theo thứ tự bước nào? | AI làm một phần, bỏ một phần |
| F | Format | Output theo khuôn nào, ghi ra đâu? | Mỗi lần chạy ra một kiểu |
| C | Constraint | Không được làm gì, giới hạn ở đâu? | Scope creep, bịa rule, viết lan man |

## RCTFC nằm ở đâu trong prompt của buổi này

| Phần RCTFC | Mục trong `prompt_dai.md` |
|---|---|
| Role | VAI TRÒ |
| Context | BỐI CẢNH · TRI THỨC NGÀNH |
| Task | các mục BƯỚC · các mục KỸ NĂNG |
| Format | các mục KHUÔN |
| Constraint | QUY TẮC CHUNG · các mục QUY TẮC BỔ SUNG |

Prompt càng nhiều kỹ năng thì mỗi phần càng dài. Đến một lúc, một phần (ví dụ Task) nằm rải rác nhiều chỗ. Đó là lúc cần tách prompt thành tri thức.

## Ví dụ

Kém:
```
Phân tích requirement voucher giúp tôi.
```

Tốt:
```
VAI TRÒ: Bạn là Senior QA Analyst chuyên checkout TMĐT.
BỐI CẢNH: Đề bài Function D ở de_bai/. Chỉ đề bài là sự thật về ShopGo.
NHIỆM VỤ: Với từng câu hỏi 6W, đánh giá đề bài đã trả lời chưa.
ĐỊNH DẠNG: Bảng W-ID | Câu hỏi | Kết quả | Trích đề bài | Nguồn.
RÀNG BUỘC: Không thêm câu hỏi mới. Không viết lời mở đầu.
```

## Checklist tự kiểm prompt

- [ ] Có đủ 5 phần R, C, T, F, C
- [ ] Context ghi rõ đường dẫn file
- [ ] Task chia bước, có thứ tự
- [ ] Format có khuôn và tên file output
- [ ] Constraint nói rõ điều KHÔNG được làm
