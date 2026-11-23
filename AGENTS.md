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
| qa-analyst | Phân tích tài liệu yêu cầu, đào sâu thông tin qua 6W, hỏi BA qua cổng gate, xuất báo cáo mổ xẻ yêu cầu và chuẩn hóa tri thức dự án | Đọc qa-system/qa-analyst/AGENTS.md |
| qa-test-design | Phân tích chuẩn và coverage cho toàn bộ testcase: phân tích viewpoint, chiến lược rủi ro P1–P3, sinh test idea, viết test case Jira/TestRail và review độ phủ | Đọc qa-system/qa-test-design/AGENTS.md |

## Luồng
INPUT, sau đó qa-analyst (Pha 1, cổng chặn, Pha 2), bàn giao sang qa-test-design (Viewpoint, Coverage Strategy, Test Idea -> người duyệt -> Test Case, Coverage Review).

## Quy tắc chung
- Không đọc docs/.
- Chỉ ghi vào OUTPUT/ và knowledge/features/. Không sửa INPUT/.
- Câu trả lời BA chỉ nhập qua node qa-system/tools/gate.js answer.
- Không emoji. Nhãn trạng thái viết bằng chữ.
