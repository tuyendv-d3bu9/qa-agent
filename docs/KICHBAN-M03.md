# M03: Prompt từng bước

## Tổng quan

M03 có 6 bài. Phần 1 (3 bài) đã xong. Phần 2 làm tiếp: trước tiên khai môi trường test (sut-profile), sau đó 3 bài còn lại.

```
qa-analyst
  riêng                sut-profile              knowledge/_sut.json, OUTPUT/sut_profile.md   Phần 2

qa-test-design
  1 viewpoint
  2 rủi ro             risk-based-coverage      OUTPUT/coverage_strategy.md       Phần 1
  3 chọn kỹ thuật      test-design-techniques   OUTPUT/technique_selection.md     Phần 1
  4 biên, scenario     boundary-validation      OUTPUT/test_scenarios.md          Phần 1
  5 test idea, người duyệt
  6 test case
  7 coverage review
  riêng                ai-feature-testing       OUTPUT/ai_feature_tests.md        Phần 2
  riêng                exploratory-charter      OUTPUT/exploratory_charters.md    Phần 2

qa-ui-review (mới)
  screenshot-analysis                           OUTPUT/ui_review.md               Phần 2
```

exploratory-charter tạm đặt ở qa-test-design. Module 6 chuyển sang agent qa-automation.

Mỗi skill chat 2 lần: lần 1 bàn, lần 2 làm. Bàn xong thấy đúng mới cho làm.

## 0. Chuẩn bị

```
git pull
node qa-system/tools/gate.js status
node qa-system/tools/check-m02.js
```

Chạy đúng là khi thấy: THONG QUA và 12/12 PASS.

# Phần 1

## A. Dựng skill

Nguyên liệu ở docs/courses/m03/.

### 1. Skill risk-based-coverage

```
Đọc docs/courses/m03/risk-based-coverage.md. Tôi muốn làm thành skill risk-based-coverage cho qa-test-design, Bước 2.
Chưa tạo file. Đề xuất: thư mục, description viết bằng lời thường, mục nào chép nguyên văn, mục nào phải sửa cho hợp repo.
```

Khi bàn, để ý: bài ghi OUTPUT/project_knowledge.md, file này giờ là knowledge/features/voucher.md.

```
Làm theo đề xuất đã chốt. Không làm gì khác.
```

### 2. Skill test-design-techniques

```
Đọc docs/courses/m03/test-design-techniques.md. Làm thành skill test-design-techniques cho qa-test-design, Bước 3, đọc OUTPUT/coverage_strategy.md.
Chưa tạo file. Đề xuất như skill trước. Bài chỉ có câu hỏi để chọn, đề xuất thêm cách làm từng bước để lần nào chạy cũng giống nhau.
```

Khi bàn, để ý: ngưỡng không có số thì ghi [CAN_DU_LIEU], không dùng State Transition cho ô nhập mã.

```
Làm theo đề xuất đã chốt. Không làm gì khác.
```

### 3. Skill boundary-validation

```
Đọc docs/courses/m03/boundary-validation.md. Làm thành skill boundary-validation cho qa-test-design, Bước 4, đọc OUTPUT/technique_selection.md.
Chưa tạo file. Đề xuất như skill trước.
```

Khi bàn, để ý: ngưỡng lấy từ rule đã chốt trong knowledge/features/voucher.md, ưu tiên lấy từ coverage_strategy.md, đủ 3 NEGATIVE bắt buộc.

```
Làm theo đề xuất đã chốt. Không làm gì khác.
```

### 4. Nối vào qa-test-design

```
Đưa 2 skill test-design-techniques và boundary-validation vào qa-system/qa-test-design/AGENTS.md thành Bước 3, Bước 4, đánh số lại các bước sau.
Thêm cách nhận việc: tôi nói việc cần làm, agent tự chọn bước, không cần tôi gọi tên skill. File đã có thì không ghi đè, nhất là test_ideas.md đã duyệt.
Chưa sửa, đề xuất trước.
```

```
Làm theo đề xuất đã chốt. Chạy node qa-system/tools/check-m02.js, phải 12/12 PASS.
```

## B. Chạy

Không cần gọi tên skill, nói việc cần làm.

### 5. Chấm rủi ro

```
Đọc AGENTS.md. Chấm rủi ro cho Function D, cho tôi biết chỗ nào phải test trước.
```

### 6. Chọn kỹ thuật

```
Đọc AGENTS.md. Từ chiến lược rủi ro đã có, chọn kỹ thuật thiết kế test cho các vùng ưu tiên cao.
```

### 7. Giá trị biên và scenario

```
Đọc AGENTS.md. Lấy các giá trị biên và viết scenario cho luồng Checkout.
```

File đã có mà muốn chạy lại thì thêm chữ "làm lại".

### 8. Kiểm

| # | Đúng khi |
|---|---|
| 1 | check-m02.js 12/12 PASS, gate THONG QUA |
| 2 | coverage_strategy.md: mỗi D-code D01 đến D23 và X01 nằm đúng 1 vùng, ô nào cũng có căn cứ |
| 3 | technique_selection.md: dòng nào cũng có nguồn rule, không có State Transition cho ô nhập mã |
| 4 | test_scenarios.md: từ 15 scenario, đủ BOUNDARY, VALIDATION, NEGATIVE, có scenario ở bước 2, 3, 4 |
| 5 | Không có ngưỡng, giá tiền, mã voucher tự đặt |

# Phần 2

Phần 2 bắt đầu bằng khai môi trường test. Sau đó 3 bài khác nhau ở chỗ làm trên gì và ai làm:

| Bài | Làm trên gì | Ai làm | Agent |
|---|---|---|---|
| ai-feature-testing | Tính năng có AI bên trong (Gợi ý Voucher Thông minh) | Agent viết test theo tiêu chí | qa-test-design |
| exploratory-charter | Vùng rủi ro | Agent viết bản định hướng, người chạy tay | qa-test-design (Module 6 chuyển sang qa-automation) |
| screenshot-analysis | Màn hình Checkout | Agent tìm lỗi giao diện, người kiểm lại bằng mắt | qa-ui-review (mới) |

Nguyên liệu có sẵn:
- docs/courses/m03/sut-profile.md: bài khai môi trường test.

## C0. Môi trường test

Làm trước 3 bài còn lại. URL khai 1 lần ở knowledge/_sut.json, các bài sau đọc lại.

### 9. Viết file môi trường

Người dạy tạo INPUT/moi-truong.md:

```
# Môi trường test

- Tên hệ thống: ShopGo
- URL: <điền link website>
- Ghi chú: <điền nếu có>
```

### 10. Skill sut-profile

```
Đọc docs/courses/m03/sut-profile.md. Làm thành skill sut-profile cho qa-analyst. Skill này đứng riêng, không nằm trong Pha 1, cổng gate, Pha 2.
Chưa tạo file. Đề xuất: thư mục, description viết bằng lời thường, mục nào chép nguyên văn, mục nào phải sửa, dòng thêm vào AGENTS.md của qa-analyst và AGENTS.md gốc.
```

Khi bàn, để ý:
- Bảng Kỹ năng của qa-analyst thêm dòng: người dùng nói về môi trường, URL, web test thì dùng sut-profile.
- Pha 1 bỏ qua INPUT/moi-truong.md, không sinh câu hỏi BA về file này.
- AGENTS.md gốc thêm ngoại lệ: skill sut-profile được ghi knowledge/_sut.json. Thêm quy tắc: URL chỉ lấy từ knowledge/_sut.json, không tự đoán.
- Khuôn lấy từ qa-system/templates/knowledge/_sut.json, giữ đúng tên trường.
- Cần Playwright MCP để mở web.

```
Làm theo đề xuất đã chốt. Chạy node qa-system/tools/check-m02.js, phải 12/12 PASS.
```

### 11. Chạy sut-profile

```
Đọc AGENTS.md. Lấy thông tin môi trường test.
```

Agent dừng chờ duyệt. Người mở OUTPUT/sut_profile.md, kiểm từng dòng có nguồn, mở web xem lại nếu cần. Đúng thì:

```
Đã duyệt OUTPUT/sut_profile.md.
```

## C. Dựng skill và agent

### 12. Skill ai-feature-testing

```
Đọc docs/courses/m03/ai-feature-testing.md. Làm thành skill ai-feature-testing cho qa-test-design. Skill này nằm ngoài luồng 7 bước, chỉ chạy khi test tính năng có AI.
Chưa tạo file. Đề xuất: thư mục, description viết bằng lời thường, mục nào chép nguyên văn, mục nào phải sửa, và dòng thêm vào AGENTS.md của qa-test-design.
```

Khi bàn, để ý: tính năng nằm ở trang chủ website, agent mở URL trong knowledge/_sut.json bằng Playwright MCP để xem. Tiêu chí đạt viết theo 4 trục trong bài; chỗ nào web không thể hiện và không có tài liệu thì ghi [CAN_DU_LIEU]. Ví dụ "Gợi ý mã SALE-A102" là kiểu sai, không dùng làm dữ liệu.

```
Làm theo đề xuất đã chốt. Không làm gì khác.
```

### 13. Skill exploratory-charter

```
Đọc docs/courses/m03/exploratory-charter.md. Làm thành skill exploratory-charter cho qa-test-design, đọc OUTPUT/coverage_strategy.md. Skill này nằm ngoài luồng 7 bước.
Chưa tạo file. Đề xuất: thư mục, description viết bằng lời thường, mục nào chép nguyên văn, mục nào phải sửa, dòng thêm vào bảng Kỹ năng và mục Nhận việc của qa-test-design.
```

Khi bàn, để ý: charter do người chạy, không viết step, không sinh code, mỗi charter 1 rủi ro. Mission viết theo mẫu "Khám phá [đối tượng] để phát hiện [vấn đề]". Area ghi theo các màn trong OUTPUT/sut_profile.md.

```
Làm theo đề xuất đã chốt. Không làm gì khác.
```

### 14. Agent qa-ui-review và skill screenshot-analysis

```
Đọc docs/courses/m03/screenshot-analysis.md. Tạo agent mới qa-system/qa-ui-review, skill screenshot-analysis.
Chưa tạo file. Đề xuất: AGENTS.md của agent, SKILL.md, khuôn đầu ra, dòng thêm vào AGENTS.md gốc.
```

Khi bàn, để ý:
- Agent lấy URL trong knowledge/_sut.json, dùng Playwright MCP tự mở web, tự chụp các màn Checkout (trước khi nhập mã, áp mã thành công, áp mã lỗi). Ảnh lưu ở OUTPUT/ui_review/, mỗi dòng lỗi ghi tên ảnh.
- Không có URL hoặc không mở được web thì dừng, không tả màn hình.
- Không nhập dữ liệu thật, không đăng nhập tài khoản thật, không thanh toán thật. Mã giảm giá để thử không tự bịa.
- Chỉ nhận xét cái nhìn thấy trên ảnh. Cột "Đã kiểm bằng mắt" agent để KHONG, người điền CO.

Phân tích phải có cổng QA, giống cổng gate ở qa-analyst: agent ghi xong OUTPUT/ui_review.md thì dừng, báo số dòng chờ kiểm. Người kiểm xong mới đi tiếp. Chỉ dòng CO được dùng tiếp (Module 5 viết bug report). Agent không tự điền CO, không tự xóa dòng.

```
Làm theo đề xuất đã chốt. Không làm gì khác.
```

## D. Chạy

### 15. Test tính năng AI

```
Đọc AGENTS.md. Viết test cho tính năng Gợi ý Voucher Thông minh.
```

### 16. Exploratory charter

```
Đọc AGENTS.md. Viết exploratory charter cho các vùng rủi ro để nhóm test tay đi khám phá.
```

### 17. Review giao diện

```
<người dạy tự điền link website và câu lệnh>
```

Agent dừng ở cổng QA. Người kiểm từng dòng trong OUTPUT/ui_review.md: đúng thì sửa cột "Đã kiểm bằng mắt" thành CO, không thấy trên ảnh thì xóa dòng. Kiểm xong:

```
Đã kiểm xong OUTPUT/ui_review.md. Tóm tắt các vấn đề đã xác nhận, xếp theo mức CAO, TB, THAP.
```

### 18. Kiểm

| # | Đúng khi |
|---|---|
| 0 | knowledge/_sut.json có url lấy từ INPUT/moi-truong.md, đúng tên trường của khuôn; sut_profile.md dòng nào cũng có nguồn |
| 1 | ai_feature_tests.md: đủ 4 trục OUTPUT_LOGIC, BIAS, FALLBACK, LATENCY; tiêu chí đạt là tiêu chí, không phải 1 mã cụ thể |
| 2 | Test BIAS giữ nguyên giỏ, chỉ đổi thông tin khách |
| 3 | exploratory_charters.md: mỗi charter 1 rủi ro, vùng P1 nào cũng có charter, có charter Gợi ý Voucher Thông minh, không có step |
| 4 | Time-box là 30, 45 hoặc 60 phút |
| 5 | ui_review.md: dòng nào cũng có tên ảnh và vị trí, ảnh có trong OUTPUT/ui_review/, chỉ có 3 nhóm UI_INCONSISTENCY, ACCESSIBILITY, UX_PROBLEM, không có dòng về tiền hay rule nghiệp vụ |
| 6 | Agent dừng ở cổng QA, không tự điền CO. Sau khi người kiểm: mọi dòng còn lại là CO, dòng AI bịa đã bị xóa |
| 7 | check-m02.js vẫn 12/12 PASS |

Số test, số charter, số lỗi tìm được mỗi người có thể khác.
