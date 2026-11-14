# M02: Prompt từng bước

## Tổng quan

Đến đây qa-analyst đã chạy xong Pha 1 (hỏi BA) và Pha 2 (báo cáo). Phần này bổ sung các bài còn lại của Module 02 để đi tiếp từ báo cáo đến test case.

```
INPUT
  |
qa-analyst
  Pha 1   câu hỏi gửi BA
  Cổng    BA trả lời, đủ mới đi tiếp
  Pha 2   báo cáo, tri thức dự án
  Pha 3   viewpoint, test idea, người duyệt
  |
qa-test-designer
  test case Jira/TestRail
  coverage review
```

## Pipeline

### Để tới được qa-test-designer, cần có gì

qa-test-designer viết test case. Muốn viết đúng, nó cần 5 thứ do qa-analyst làm ra:

| File | Cần để làm gì |
|---|---|
| gate_status.json | Câu trả lời BA đã chốt. Không có thì không biết kết quả đúng là gì |
| OUTPUT/requirement_autopsy_report.md | Biết chỗ nào trong tài liệu còn thiếu, rủi ro cao hay thấp |
| OUTPUT/project_knowledge.md | Danh sách rule đã chốt. Expected Result của test case lấy từ đây |
| OUTPUT/viewpoints.md | Biết cần test ở những góc nào, góc nào ưu tiên |
| OUTPUT/test_ideas.md | Danh sách tình huống đã được người duyệt. Chỉ tình huống được giữ mới thành test case |

### Từng chặng làm gì

| Chặng | Ai làm | Xong có gì | Là nguyên liệu cho |
|---|---|---|---|
| Pha 1 | Agent | Câu hỏi gửi BA | BA trả lời |
| Cổng chặn | BA và tool gate | gate_status.json đủ câu trả lời | Pha 2. Thiếu câu nào là dừng |
| Pha 2, báo cáo | Agent | requirement_autopsy_report.md | Viewpoint, tri thức dự án |
| Pha 2, tri thức dự án | Agent | project_knowledge.md | Expected Result của test case |
| Pha 3, viewpoint | Agent | viewpoints.md | Test idea, coverage review |
| Pha 3, test idea | Agent | test_ideas.md | Người duyệt |
| Duyệt | Người | Idea được giữ | Test case |
| Test case | qa-test-designer | test_cases.md, test_cases.csv | Coverage review, Module 4, Module 6 |
| Coverage review | qa-test-designer | coverage_review.md | Module 3, Module 5 |

### Các điểm dừng

| Dừng ở đâu | Vì sao | Người dùng làm gì |
|---|---|---|
| Sau Pha 1 | Chưa có câu trả lời BA | Trả lời câu hỏi qua tool gate |
| Sau test idea | Người phải chọn idea nào được viết thành test case | Duyệt cột Lọc |
| Cuối qa-test-designer | Xong việc | Đọc test case và coverage review |

Mỗi lần dừng, agent tự giải thích: vừa xong gì, ra file nào, file đó dùng cho bước nào, người dùng cần làm gì tiếp.

## 0. Chuẩn bị

gate_status.json phải có đủ 36 câu trả lời. Lần chạy Pha 1 gần nhất sinh thêm 8 câu (Q-D08-02, Q-D13-02, Q-D15-02, Q-D16-02, Q-D16-03, Q-D20-02, Q-D21-02, Q-X01-02), BA đã trả lời.

```
git pull
node tools/gate.js status
```

Đúng khi thấy: Da giai quyet 36, Chua giai quyet 0, THONG QUA.

Không chạy lại Pha 1, không chạy `node tools/gate.js init`. Lệnh init xóa hết câu trả lời BA.

## A. Dựng skill

Nguyên liệu thô nằm ở docs/courses/m02/.

### 1. Viewpoint knowledge
Bảng 8 viewpoint dùng chung cho viewpoint, test idea, coverage. Để ở 1 chỗ, sửa 1 lần.

```
Tạo qa-analyst/knowledge/viewpoints.md:
- Dòng đầu: # Tri thức: 8 viewpoint kiểm thử
- Chép nguyên văn từ docs/courses/m02/viewpoint-generator.md: mục "8 viewpoint" và mục "Gắn D-code vào viewpoint".
Không làm gì khác.
```

### 2. Skill viewpoint-generator
Dạy agent cách xếp điểm chưa rõ vào 8 viewpoint và chọn Top 3.

```
Từ docs/courses/m02/viewpoint-generator.md tạo:
- qa-analyst/skills/viewpoint-generator/SKILL.md
- qa-analyst/skills/viewpoint-generator/assets/viewpoints.md (khối khuôn đầu ra)

SKILL.md:
---
name: viewpoint-generator
description: Xếp các điểm chưa rõ trong báo cáo Pha 2 vào 8 viewpoint, đếm rủi ro, chọn Top 3. Dùng ở Pha 3, ghi OUTPUT/viewpoints.md.
---
# Viewpoint Generator
+ chép nguyên văn các mục còn lại.
+ mục "8 viewpoint", "Gắn D-code vào viewpoint" thay bằng: Xem knowledge/viewpoints.md
+ mục "Khuôn đầu ra" thay bằng: Dùng khuôn assets/viewpoints.md
+ bỏ mục "Dùng cho phần sau".
Không làm gì khác.
```

### 3. Skill test-idea-generation
Dạy agent sinh test idea có nguồn và dừng lại cho người duyệt.

```
Từ docs/courses/m02/test-idea-generation.md tạo:
- qa-analyst/skills/test-idea-generation/SKILL.md
- qa-analyst/skills/test-idea-generation/assets/test_ideas.md (khối khuôn đầu ra)

SKILL.md:
---
name: test-idea-generation
description: Sinh test idea có nguồn, đề xuất nhãn lọc. Dùng ở Pha 3 sau viewpoint, ghi OUTPUT/test_ideas.md, xong thì dừng chờ người duyệt.
---
# AI-Generated Test Ideas
+ chép nguyên văn các mục còn lại.
+ mục "Khuôn đầu ra" thay bằng: Dùng khuôn assets/test_ideas.md
+ bỏ mục "Dùng cho phần sau".
+ kết quả của idea chỉ lấy từ OUTPUT/project_knowledge.md mục 1. Idea chạm mâu thuẫn ở mục 2 thì ghi kết quả: cần BA xác nhận.
+ thêm cuối file:
## Điểm dừng
Ghi xong OUTPUT/test_ideas.md thì dừng, chờ người duyệt cột Lọc.
Không làm gì khác.
```

### 4. Skill project-knowledge
Dạy agent gom rule đã chốt và chỉ ra chỗ BA trả lời mâu thuẫn.

```
Tạo qa-analyst/skills/project-knowledge/SKILL.md:
---
name: project-knowledge
description: Gom rule đã xác nhận từ INPUT/ và gate_status.json thành tri thức dự án. Dùng cuối Pha 2.
---
# Tri thức dự án

Đọc: INPUT/, gate_status.json, OUTPUT/requirement_autopsy_report.md
Ghi: OUTPUT/project_knowledge.md theo khuôn assets/project_knowledge.md

1. Mỗi BR trong Spec và mỗi câu trả lời trong gate_status.json thành 1 rule, ghi D-code và nguồn.
2. Ghi mâu thuẫn. Kiểm ít nhất: Q-D12-01 với Expected Result Phần B và Q-D20-01, Q-D14-01 với Q-D18-01, điều kiện thêm trong Q-D01-01, % tính trên tạm tính hay tổng có phí ship, Q-D08-01 với Q-D08-02, Q-D21-02 với an toàn số tiền giảm, Q-D16-03 với Q-D14-01.
3. Chép hạng mục ngoài phạm vi trong INPUT/.
Rule chỉ lấy từ INPUT/ hoặc gate_status.json. Dòng nào cũng có nguồn.
Không tự giải quyết mâu thuẫn, chỉ ghi để hỏi lại BA.

Tạo qa-analyst/skills/project-knowledge/assets/project_knowledge.md:
# Tri thức dự án: ShopGo Function D
## 1. Rule đã xác nhận
| ID | D-code | Rule | Nguồn |
|---|---|---|---|
## 2. Mâu thuẫn cần hỏi lại BA
| ID | Mô tả | Nguồn |
|---|---|---|
## 3. Ngoài phạm vi
| Hạng mục | Nguồn |
|---|---|

Không làm gì khác.
```

### 5. Cập nhật qa-analyst/AGENTS.md
Báo cho agent biết có thêm Pha 3, có điểm dừng, biết tự làm tiếp và giải thích cho người dùng.

```
Chỉ sửa qa-analyst/AGENTS.md. Không đổi Pha 1, cổng chặn, Pha 2.
1. Bảng skill thêm:
| Pha 2 | skills/project-knowledge/SKILL.md | Cuối Pha 2 |
| Pha 3 | skills/viewpoint-generator/SKILL.md | Đầu Pha 3 |
| Pha 3 | skills/test-idea-generation/SKILL.md | Sau viewpoint, xong thì dừng |
2. Tri thức thêm: knowledge/viewpoints.md
3. Luồng thêm Pha 3: viewpoint, sau đó test idea, sau đó dừng chờ duyệt.
4. Thêm mục:
## Đầu ra bàn giao cho qa-test-designer
- gate_status.json
- OUTPUT/requirement_autopsy_report.md
- OUTPUT/project_knowledge.md
- OUTPUT/viewpoints.md
- OUTPUT/test_ideas.md
5. Thêm mục:
## Cách làm tiếp và điểm dừng
- Khi được bảo làm, xem OUTPUT/ và gate_status.json để biết đang ở chặng nào, làm tiếp đến điểm dừng gần nhất.
- gate_status.json đã có câu trả lời thì không chạy lại Pha 1, không chạy node tools/gate.js init.
- Điểm dừng: sau Pha 1 (chờ BA trả lời), sau test idea (chờ người duyệt), sau khi bàn giao.
- Mỗi lần dừng, giải thích cho người dùng bằng câu ngắn: vừa xong gì, ra file nào, file đó dùng cho bước nào, người dùng cần làm gì tiếp.
6. Ràng buộc thêm:
- Expected Result chỉ lấy từ INPUT/ hoặc gate_status.json.
- Không bịa Test Data. Thiếu thì ghi [CAN_DU_LIEU].
- Một D-code có nhiều mức rủi ro thì lấy mức cao nhất.
Chạy node tools/check-m02.js. Phải ra 12/12 PASS.
```

### 6. Node qa-test-designer
Tạo node thứ 2 với 2 skill viết test case và review độ phủ.

```
Tạo qa-test-designer/AGENTS.md:
# QA TEST DESIGNER
## Vai trò
Nhận bàn giao từ qa-analyst. Viết test case Jira/TestRail, review độ phủ.
## Đầu vào
gate_status.json, OUTPUT/requirement_autopsy_report.md, OUTPUT/project_knowledge.md, OUTPUT/viewpoints.md, OUTPUT/test_ideas.md, ../qa-analyst/knowledge/viewpoints.md
Thiếu file nào hoặc test idea chưa được duyệt thì dừng, báo người dùng quay lại qa-analyst.
## Luồng
| Bước | Skill | Ghi |
|---|---|---|
| 1 | skills/test-case-format/SKILL.md | OUTPUT/test_cases.md, OUTPUT/test_cases.csv |
| 2 | skills/coverage-review/SKILL.md trên bộ Lab 4 | OUTPUT/coverage_review_lab4.md |
| 3 | skills/coverage-review/SKILL.md trên OUTPUT/test_cases.md | OUTPUT/coverage_review.md |
Chỉ dùng idea GIU. Idea cần BA xác nhận thì không viết test case, ghi vào mục "Idea chưa viết được" kèm Q-ID.
Làm hết 3 bước rồi dừng, giải thích cho người dùng: đã ra file nào, dùng cho việc gì tiếp.
## Ràng buộc
- Expected Result chỉ lấy từ INPUT/ hoặc gate_status.json.
- Không bịa Test Data. Thiếu thì ghi [CAN_DU_LIEU].
- Không coi thông lệ ngành là quy định của dự án.
- Không đọc docs/.
- Không emoji.

Từ docs/courses/m02/test-case-format.md tạo qa-test-designer/skills/test-case-format/ (SKILL.md, assets/test_cases.md, assets/test_cases.csv chỉ header), cùng cách như skill viewpoint-generator:
---
name: test-case-format
description: Chuyển idea GIU thành test case 8 trường Jira/TestRail. Dùng ở qa-test-designer bước 1.
---
+ ví dụ 8 trường: Test Data thay bằng [CAN_DU_LIEU], Expected Result thay bằng: Theo Q-D03-01, Q-D03-02 và Q-D20-01.

Từ docs/courses/m02/coverage-review.md tạo qa-test-designer/skills/coverage-review/ (SKILL.md, assets/coverage_review.md, assets/lab4_test_suite.md):
---
name: coverage-review
description: Review độ phủ bộ test theo 3 góc, lập danh sách gap. Dùng ở qa-test-designer bước 2 và 3.
---
+ knowledge/viewpoints.md đổi thành ../qa-analyst/knowledge/viewpoints.md
+ test case trái câu trả lời trong gate_status.json thì không tính phủ, ghi gap "Test sai rule" kèm Q-ID.

Không làm gì khác.
```

## B. Chạy

### 7. Chạy qa-analyst
Agent làm lại báo cáo theo đủ 36 câu trả lời, rồi làm tri thức dự án, viewpoint, test idea, rồi dừng và giải thích.

```
Đọc qa-analyst/AGENTS.md. Làm lại Pha 2 từ đầu, rồi làm tiếp.
```

### 8. Duyệt
Cả lớp giữ nguyên đề xuất để cùng quy trình. Số idea mỗi người có thể khác nhau.

```
Đã duyệt OUTPUT/test_ideas.md, giữ nguyên nhãn Lọc.
```

### 9. Chạy qa-test-designer
Agent làm test case và 2 bản coverage review, rồi dừng và giải thích.

```
Đọc qa-test-designer/AGENTS.md và làm.
```

### 10. Kiểm

```
node tools/check-m02.js
node tools/gate.js status
```

| # | Đúng khi |
|---|---|
| 1 | check-m02.js ra 12/12 PASS |
| 2 | gate 36/36, THONG QUA |
| 3 | OUTPUT/ có đủ: requirement_autopsy_report.md, project_knowledge.md, viewpoints.md, test_ideas.md, test_cases.md, test_cases.csv, coverage_review.md, coverage_review_lab4.md |
| 4 | project_knowledge.md: dòng nào cũng có nguồn, mục 2 có đủ các điểm ở bước 4 |
| 5 | test_cases.md và test_cases.csv cùng số test case |
| 6 | Không có mã voucher hay giá tiền tự đặt |

So với đáp án trong repo: cấu trúc phải giống. Số idea, số test case, số gap được phép khác.
