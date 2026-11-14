# Sắp xếp repo theo khung qa-system

## Trước và sau

Trước:

```
INPUT/
OUTPUT/
docs/
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
  voucher-domain.md
  viewpoints.md
gate_status.json
AGENTS.md                   cửa vào: repo có gì, agent nào làm gì, chạy thế nào
qa-system/
  tools/                    convert.js, gate.js, ba-answers-demo.js, check-m02.js
  qa-analyst/
    AGENTS.md
    skills/
  qa-test-design/
    AGENTS.md
    skills/
```

Các thư mục khác trong khung (core, integrations, qa-automation, qa-lead, qa-reporter, qa-test-data, qa-ui-review, qa-readiness-evaluator, templates, workflows) chưa có, làm ở các module sau.

## 1. Xem hiện trạng

```
Không sửa gì. Liệt kê:
1. Cây thư mục gốc repo, qa-analyst/, qa-test-designer/, tools/.
2. Mọi file có nhắc tới "tools/", "knowledge/", "qa-analyst", "qa-test-designer". Bỏ qua docs/, OUTPUT/, node_modules/.
3. Các script trong package.json.
```

## 2. Chuyển thư mục

```
Chỉ chuyển, không sửa nội dung file:
1. git mv qa-analyst qa-system/qa-analyst
2. git mv qa-test-designer qa-system/qa-test-design
3. git mv tools qa-system/tools
4. Tạo knowledge/ ở gốc repo.
5. git mv qa-system/qa-analyst/knowledge/voucher-domain.md knowledge/voucher-domain.md
6. git mv qa-system/qa-analyst/knowledge/viewpoints.md knowledge/viewpoints.md
7. Xóa qa-system/qa-analyst/knowledge/ nếu đã trống.
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
Trong qa-system/tools/check-m02.js:
1. Thư mục agent đổi từ qa-analyst thành qa-system/qa-analyst.
2. File knowledge/voucher-domain.md đọc ở gốc repo.
Chạy node qa-system/tools/check-m02.js. Chưa 12/12 PASS thì sửa đường dẫn trong check-m02.js đến khi đạt. Không sửa nội dung agent để cho qua.
```

## 5. Tạo AGENTS.md ở gốc repo

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
| qa-system/ | Các agent và công cụ | Có |
| docs/ | Tài liệu cho người học | Không |

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
- Chỉ ghi vào OUTPUT/. Không sửa INPUT/.
- Không emoji. Nhãn trạng thái viết bằng chữ.
```

## 6. Kiểm

```
Không chạy agent. Làm 3 việc:
1. Đọc AGENTS.md gốc, qa-system/qa-analyst/AGENTS.md, qa-system/qa-test-design/AGENTS.md. Liệt kê mọi đường dẫn được nhắc tới, ghi CO nếu tồn tại, KHONG nếu không.
2. Chạy node qa-system/tools/check-m02.js.
3. Chạy node qa-system/tools/gate.js status.
In kết quả 3 việc.
```

## 7. Lưu lại

```
git add -A && git commit -m "Sap xep repo theo khung qa-system"
```

## Chạy agent từ giờ

```
Đọc AGENTS.md và chạy qa-analyst.
```

```
Đọc AGENTS.md và chạy qa-test-design.
```
