# Sắp xếp repo theo khung qa-system

## Trước và sau

Trước:

```
INPUT/
OUTPUT/
  project_knowledge.md
docs/
  templates/knowledge/      khuôn tri thức dự án
tools/
gate_status.json
qa-analyst/
  AGENTS.md
  knowledge/voucher-domain.md
  knowledge/viewpoints.md
  skills/
qa-test-designer/
  AGENTS.md
  skills/
```

Sau:

```
INPUT/
OUTPUT/
docs/
knowledge/                  tri thức dùng chung nhiều agent
  _project.md               quy ước dự án
  _glossary.md              thuật ngữ dự án
  _system_map.json          bản đồ hệ thống
  voucher-domain.md
  viewpoints.md
  features/
    voucher.md              tri thức dự án của Function D
gate_status.json
AGENTS.md                   cửa vào: repo có gì, agent nào làm gì, chạy thế nào
qa-system/
  tools/                    convert.js, gate.js, ba-answers-demo.js, check-m02.js
  templates/knowledge/      khuôn _project, _glossary, _template, _system_map, _sut
  qa-analyst/
    AGENTS.md
    skills/
  qa-test-design/
    AGENTS.md
    skills/
```

Các thư mục khác trong khung (core, integrations, qa-automation, qa-lead, qa-reporter, qa-test-data, qa-ui-review, qa-readiness-evaluator, workflows) chưa có, làm ở các module sau.

Hai loại tri thức:

| Loại | Ở đâu |
|---|---|
| Tri thức ngành, dùng chung mọi dự án | knowledge/voucher-domain.md, knowledge/viewpoints.md |
| Tri thức dự án | knowledge/_project.md, knowledge/_glossary.md, knowledge/features/voucher.md |

## 1. Xem hiện trạng

```
Không sửa gì. Liệt kê:
1. Cây thư mục gốc repo, qa-analyst/, qa-test-designer/, tools/, docs/templates/.
2. Mọi file có nhắc tới "tools/", "knowledge/", "qa-analyst", "qa-test-designer", "project_knowledge". Bỏ qua docs/, OUTPUT/, node_modules/.
3. Các script trong package.json.
```

## 2. Chuyển thư mục

```
Chỉ chuyển, không sửa nội dung file:
1. git mv qa-analyst qa-system/qa-analyst
2. git mv qa-test-designer qa-system/qa-test-design
3. git mv tools qa-system/tools
4. git mv docs/templates qa-system/templates
5. Tạo knowledge/ và knowledge/features/ ở gốc repo.
6. git mv qa-system/qa-analyst/knowledge/voucher-domain.md knowledge/voucher-domain.md
7. git mv qa-system/qa-analyst/knowledge/viewpoints.md knowledge/viewpoints.md
8. Xóa qa-system/qa-analyst/knowledge/ nếu đã trống.
In cây thư mục sau khi chuyển.
```

## 3. Sửa đường dẫn tools

```
Đổi mọi "tools/" thành "qa-system/tools/" trong:
- package.json (các script)
- qa-system/**/AGENTS.md và qa-system/**/SKILL.md
- các file .js trong qa-system/tools/ (ví dụ ba-answers-demo.js gọi gate.js)
- các file khác ở danh sách bước 1, trừ docs/
Sau đó chạy node qa-system/tools/gate.js status, in kết quả.
```

## 4. Sửa đường dẫn knowledge và tên node

```
Trong qa-system/:
1. Đổi "../qa-analyst/knowledge/viewpoints.md" thành "knowledge/viewpoints.md".
2. Mọi chỗ nhắc knowledge/voucher-domain.md, knowledge/viewpoints.md giữ nguyên chữ, vì knowledge/ giờ ở gốc repo.
3. Đổi mọi "qa-test-designer" thành "qa-test-design".
4. Trong qa-system/qa-analyst/AGENTS.md, ràng buộc 4 đổi thành:
   4. **Không đọc ngoài phạm vi agent:** Tri thức của agent nằm trong `qa-system/` và `knowledge/`. Không đọc `docs/`.
Trong qa-system/tools/check-m02.js:
1. Thư mục agent đổi từ qa-analyst thành qa-system/qa-analyst.
2. File knowledge/voucher-domain.md đọc ở gốc repo.
3. Prompt cũ đọc ở qa-system/qa-analyst/_archive/prompt_qa_analyst_v1.md.
Chạy node qa-system/tools/check-m02.js. Chưa 12/12 PASS thì sửa đường dẫn trong check-m02.js đến khi đạt. Không sửa nội dung agent để cho qua.
```

## 5. Tách tri thức dự án

```
Tạo tri thức dự án từ khuôn trong qa-system/templates/knowledge/. Không sửa khuôn.
Chỉ điền giá trị có nguồn trong INPUT/ hoặc gate_status.json. Ô không có nguồn để nguyên <điền>.
1. Chép _project.md, _glossary.md, _system_map.json sang knowledge/.
   - knowledge/_project.md: điền tên dự án, tiền tệ, timezone, module prefix VOUCHER, ràng buộc dự án, mỗi giá trị kèm nguồn.
   - knowledge/_glossary.md: chép thuật ngữ trong Glossary của INPUT/Hệ thống Thương mại điện tử “ShopGo”.md, kèm nguồn.
   - knowledge/_system_map.json: chỉ điền project_name, last_updated, features_inventory ("voucher": "knowledge/features/voucher.md"). Không sửa mục khác.
2. Chép _template.md thành knowledge/features/voucher.md. Điền từ OUTPUT/project_knowledge.md và gate_status.json:
   - Mục 3: rule BR-01 đến BR-05 và rule từ câu trả lời đã chốt.
   - Mục 6: hạng mục ngoài phạm vi.
   - Mục 7: mâu thuẫn còn mở.
   - Mục 8: mọi câu RESOLVED trong gate_status.json: Q-ID, câu hỏi, câu trả lời, answered_by, answered_at.
3. Sửa skill qa-system/qa-analyst/skills/project-knowledge/:
   - Ghi vào knowledge/features/voucher.md theo khuôn qa-system/templates/knowledge/_template.md. Đọc thêm knowledge/_project.md, knowledge/_glossary.md.
   - Xóa assets/project_knowledge.md.
4. Đổi mọi "OUTPUT/project_knowledge.md" thành "knowledge/features/voucher.md" trong qa-system/**/AGENTS.md và qa-system/**/SKILL.md.
5. Xóa OUTPUT/project_knowledge.md.
gate_status.json vẫn là nguồn gốc câu trả lời BA. Lệch nhau thì theo gate_status.json, chép lại mục 8.
In mục 7 và số dòng mục 8 của knowledge/features/voucher.md.
```

## 6. Tạo AGENTS.md ở gốc repo

```
Tạo AGENTS.md ở gốc repo với nội dung đúng như sau:

# QA System: ShopGo

## Repo
| Thư mục | Là gì | Agent đọc không |
|---|---|---|
| INPUT/ | Tài liệu dự án, nguồn sự thật. Chỉ đọc file .md | Có |
| OUTPUT/ | Kết quả agent ghi ra | Có, ghi vào đây |
| knowledge/ | Tri thức dùng chung nhiều agent | Có |
| gate_status.json | Câu trả lời BA đã chốt | Có |
| qa-system/ | Các agent, công cụ, khuôn | Có |
| docs/ | Tài liệu cho người học | Không |

## Tri thức
| File | Là gì |
|---|---|
| knowledge/_project.md | Quy ước dự án |
| knowledge/_glossary.md | Thuật ngữ dự án |
| knowledge/_system_map.json | Bản đồ hệ thống |
| knowledge/features/voucher.md | Rule đã chốt, mâu thuẫn còn mở, quyết định BA của Function D |
| knowledge/voucher-domain.md | Tri thức ngành voucher, D01–D23 |
| knowledge/viewpoints.md | 8 viewpoint |

## Quy ước đường dẫn
- INPUT/, OUTPUT/, knowledge/, gate_status.json tính từ gốc repo.
- skills/ trong AGENTS.md của một agent tính từ thư mục của agent đó.
- Công cụ chạy từ gốc repo: node qa-system/tools/<tên file>.js

## Agent
| Agent | Làm gì | Bắt đầu bằng |
|---|---|---|
| qa-analyst | Phân tích tài liệu, hỏi BA, báo cáo, tri thức dự án, viewpoint, test idea | Đọc qa-system/qa-analyst/AGENTS.md |
| qa-test-design | Viết test case, review độ phủ | Đọc qa-system/qa-test-design/AGENTS.md |

## Luồng
INPUT, sau đó qa-analyst (Pha 1, cổng chặn, Pha 2, Pha 3), người duyệt test idea, sau đó qa-test-design.

## Quy tắc chung
- Không đọc docs/.
- Chỉ ghi vào OUTPUT/ và knowledge/features/. Không sửa INPUT/.
- Câu trả lời BA chỉ nhập qua node qa-system/tools/gate.js answer.
- Không emoji. Nhãn trạng thái viết bằng chữ.
```

## 7. Kiểm

```
Không chạy agent. Làm 4 việc:
1. Đọc AGENTS.md gốc, qa-system/qa-analyst/AGENTS.md, qa-system/qa-test-design/AGENTS.md. Liệt kê mọi đường dẫn được nhắc tới, ghi CO nếu tồn tại, KHONG nếu không.
2. Chạy node qa-system/tools/check-m02.js.
3. Chạy node qa-system/tools/gate.js status.
4. Đếm câu RESOLVED trong gate_status.json và số dòng mục 8 của knowledge/features/voucher.md. Hai số phải bằng nhau.
In kết quả 4 việc.
```

## 8. Lưu lại

```
git add -A && git commit -m "Sap xep repo theo khung qa-system, tach tri thuc du an"
```

## Chạy agent từ giờ

```
Đọc AGENTS.md và chạy qa-analyst.
```

```
Đọc AGENTS.md và chạy qa-test-design.
```
