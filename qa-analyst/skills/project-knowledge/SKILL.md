---
name: project-knowledge
description: Gom rule đã xác nhận của dự án từ INPUT/ và gate_status.json thành tri thức dự án. Dùng cuối Pha 2.
---

# Tri thức dự án

## Điều kiện

Chạy cuối Pha 2, sau skill `requirement-autopsy-report`.

Đọc: `INPUT/` (chỉ file .md), `gate_status.json`, `OUTPUT/requirement_autopsy_report.md`.

## Cách làm

1. Mục 1 Rule đã xác nhận: mỗi rule gốc BR-xx và mỗi câu trả lời RESOLVED trong `gate_status.json` thành 1 rule. BR-xx đánh số theo thứ tự gạch đầu dòng "Các quy tắc đã nêu" trong `INPUT/Spec Function D.md`. Ghi D-code và nguồn (BR-xx hoặc Q-ID). Viết rule đúng ý câu trả lời, không thêm chi tiết.
2. Mục 2 Mâu thuẫn còn mở: đối chiếu các câu trả lời với nhau và với Expected Result Phần B của báo cáo. BẮT BUỘC kiểm ít nhất 4 điểm:
   - Q-D12-01 so với Expected Result Phần B.
   - Q-D14-01 so với Q-D18-01.
   - Điều kiện thêm trong câu trả lời Q-D01-01 (ngoài phương án).
   - Tiền giảm % tính trên tạm tính hay tổng có phí ship (Q-D02-01, Q-D20-01).
3. Mục 3 Ngoài phạm vi: lấy từ `INPUT/` (Out of Scope) và câu trả lời (ví dụ Q-X01-01).

## Quy tắc

- Rule chỉ lấy từ `INPUT/` hoặc `gate_status.json`. KHÔNG lấy từ `knowledge/voucher-domain.md`.
- Mọi dòng có nguồn.
- Không tự giải quyết mâu thuẫn, chỉ ghi lại để hỏi lại BA.

## Đầu ra

Dùng khuôn `assets/project_knowledge.md`, ghi `OUTPUT/project_knowledge.md`.
