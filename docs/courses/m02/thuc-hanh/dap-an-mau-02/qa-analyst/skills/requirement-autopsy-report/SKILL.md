---
name: requirement-autopsy-report
description: Viết báo cáo Requirement Autopsy 4 phần A–D ra OUTPUT/requirement_autopsy_report.md. Chỉ dùng ở Pha 2, sau khi node tools/gate.js check trả về exit 0.
---

# Báo cáo Requirement Autopsy

## Điều kiện

Chỉ làm khi `node tools/gate.js check` trả về exit 0. Exit 1 thì dừng, không viết Expected Result.

## Cách làm

1. Phần A: với từng D-code D01 đến D23 trong `knowledge/voucher-domain.md`, đối chiếu `INPUT/`, gán nhãn trạng thái theo AGENTS.md. Thêm các mã X nếu có.
2. Phần B: mỗi dòng không phải `RO` dùng skill `missing-rule-classification`. Câu trả lời lấy từ `gate_status.json`. Expected Result chỉ viết từ câu trả lời đã xác nhận.
3. Phần C: dùng skill `fact-self-check`.
4. Phần D: đếm từ Phần A và Phần B.

## Đầu ra

Dùng khuôn `assets/requirement_autopsy_report.md`, ghi `OUTPUT/requirement_autopsy_report.md`.
