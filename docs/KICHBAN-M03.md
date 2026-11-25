# M03: Prompt từng bước

## Tổng quan

M03 thêm 3 skill vào qa-test-design. Không tạo agent mới.

```
qa-test-design
  1 viewpoint
  2 rủi ro             risk-based-coverage      OUTPUT/coverage_strategy.md
  3 chọn kỹ thuật      test-design-techniques   OUTPUT/technique_selection.md
  4 biên, scenario     boundary-validation      OUTPUT/test_scenarios.md
  5 test idea, người duyệt
  6 test case
  7 coverage review
```

Mỗi skill chat 2 lần: lần 1 bàn, lần 2 làm. Bàn xong thấy đúng mới cho làm.

## 0. Chuẩn bị

```
git pull
node qa-system/tools/gate.js status
node qa-system/tools/check-m02.js
```

Chạy đúng là khi thấy: THONG QUA và 12/12 PASS.

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

So với đáp án trong repo: cấu trúc phải giống. Số vùng, số scenario được phép khác.
