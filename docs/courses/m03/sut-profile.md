# Hồ sơ hệ thống đang kiểm thử (SUT profile)

## Mục đích

Nhiều agent cần biết web đang test nằm ở đâu và chạy thế nào: agent review giao diện, agent test tính năng AI, sau này agent automation. Nếu mỗi lần ra lệnh lại dán link thì dễ sai link, và agent dễ tự đoán.

Skill này đọc thông tin môi trường trong INPUT, mở web để quan sát, rồi ghi ra knowledge/_sut.json. Khai 1 lần, mọi agent đọc lại. Đổi môi trường thì sửa INPUT rồi chạy lại skill, không sửa tay file JSON.

SUT là viết tắt của System Under Test, tức hệ thống đang kiểm thử.

## Đầu vào, đầu ra

| | File | Lấy gì |
|---|---|---|
| Đầu vào | INPUT/moi-truong.md | Tên hệ thống, URL, ghi chú môi trường. Người viết |
| Đầu vào | qa-system/templates/knowledge/_sut.json | Khuôn của file đầu ra |
| Đầu ra | knowledge/_sut.json | Hồ sơ hệ thống, các agent khác đọc |
| Đầu ra | OUTPUT/sut_profile.md | Mỗi trường: giá trị, nguồn, bằng chứng. Để người duyệt |

Cần công cụ Playwright MCP để mở web và chụp màn hình.

## Các trường và nguồn

| Trường | Ý nghĩa | Lấy từ | Không chắc thì |
|---|---|---|---|
| name | Tên hệ thống | INPUT/moi-truong.md | Dừng, hỏi |
| url | Địa chỉ môi trường test | INPUT/moi-truong.md | Dừng, hỏi. Không tự đoán |
| type | Loại web: SPA (1 trang, đổi nội dung không tải lại) hay MPA (nhiều trang, mỗi lần chuyển tải lại) | Quan sát: chuyển màn có tải lại trang không | Giữ nguyên chỗ giữ chỗ trong khuôn |
| routing | Cách chuyển màn: URL có đổi theo màn không | Quan sát: thanh địa chỉ khi bấm sang màn khác | Giữ nguyên chỗ giữ chỗ |
| storage_keys | Dữ liệu web lưu ở trình duyệt (localStorage), ví dụ giỏ hàng | Quan sát: localStorage trước và sau khi thêm giỏ, áp mã | Để mảng rỗng |
| constraints | Điều agent sau phải biết để không làm sai, ví dụ web không có router thì không mở thẳng đường dẫn được, phải bấm nút | Suy ra từ type và routing | Ghi kèm [GIẢ ĐỊNH] |
| ui_map | Đường dẫn file bản đồ màn hình | Giữ nguyên khuôn | Giữ nguyên |

## Cách làm

1. Đọc INPUT/moi-truong.md. Không có file hoặc không có URL thì dừng, hỏi người dùng.
2. Mở URL bằng Playwright MCP. Đi qua các màn chính: trang chủ, giỏ hàng, Checkout. Chụp mỗi màn 1 ảnh, lưu ở OUTPUT/sut/.
3. Quan sát để điền type, routing, storage_keys. Chỉ ghi điều thấy được.
4. Ghi knowledge/_sut.json theo khuôn. Giữ mục _comment của khuôn. Ô không chắc giữ nguyên chỗ giữ chỗ.
5. Ghi OUTPUT/sut_profile.md theo khuôn bên dưới.
6. Dừng, chờ người duyệt. Người kiểm từng dòng, mở web xem lại nếu cần.

## Quy tắc

- Chỉ mở đúng URL trong INPUT/moi-truong.md.
- Không nhập dữ liệu cá nhân thật, không đăng nhập bằng tài khoản thật, không thanh toán thật.
- Mỗi giá trị phải có nguồn: INPUT, quan sát (kèm tên ảnh), hoặc suy ra (kèm [GIẢ ĐỊNH]).
- Không đổi tên trường của khuôn. Các agent và công cụ khác đọc đúng tên trường này.
- Phân tích yêu cầu nghiệp vụ (Pha 1) không đọc INPUT/moi-truong.md. File này không phải tài liệu nghiệp vụ.

## Khuôn đầu ra

```markdown
# SUT Profile: ShopGo

| Trường | Giá trị | Nguồn | Bằng chứng |
|---|---|---|---|

## Màn hình đã đi qua
| Màn | URL trên thanh địa chỉ | Ảnh |
|---|---|---|

## Chưa chắc
| Trường | Vì sao |
|---|---|
```

## Lỗi hay gặp

| Lỗi | Sửa |
|---|---|
| Agent tự điền URL không có trong INPUT | Xóa, URL chỉ lấy từ INPUT/moi-truong.md |
| Ghi type, routing theo cảm giác | Phải có ảnh hoặc mô tả quan sát làm bằng chứng |
| Xóa mục _comment hoặc đổi tên trường | Giữ đúng khuôn |
| Phân tích yêu cầu sinh câu hỏi BA về file môi trường | Ghi rõ Pha 1 bỏ qua INPUT/moi-truong.md |

## Dùng cho phần sau

- screenshot-analysis, ai-feature-testing: lấy url để mở web.
- exploratory-charter: Area ghi theo các màn đã đi qua.
- Module 6: qa-automation và playwright.config.ts đọc url ở đây để biết chạy test vào đâu.
