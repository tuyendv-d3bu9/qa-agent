#!/usr/bin/env node
// Trainer đóng vai BA: trả lời 28 câu hỏi trong gate_status.json để demo mở cổng chặn.
// Đây là đáp án DEMO cho buổi học, KHÔNG phải quy định thật của ShopGo.
const { spawnSync } = require('child_process');

const BY = 'BA (demo lớp học)';
const ANSWERS = [
  ['Q-D01-01', 'B. Không hỗ trợ mã Freeship (chỉ hỗ trợ 2 loại mã giảm giá tiền hàng)'],
  ['Q-D02-01', 'A. Có trần giảm tối đa (cấu hình theo từng mã cụ thể)'],
  ['Q-D03-01', 'A. Tạm tính tiền hàng (Subtotal - chưa bao gồm phí vận chuyển)'],
  ['Q-D03-02', 'A. Lớn hơn hoặc bằng (>= giá trị tối thiểu quy định)'],
  ['Q-D04-01', 'A. Đến 23:59:59 của ngày hết hạn'],
  ['Q-D04-02', 'A. Múi giờ Việt Nam (GMT+7)'],
  ['Q-D05-01', 'A. Có giới hạn tổng lượt dùng toàn hệ thống (hết lượt thì không dùng được nữa)'],
  ['Q-D06-01', 'A. Tối đa 1 lần duy nhất cho mỗi tài khoản khách hàng'],
  ['Q-D07-01', 'B. Cho phép nhập áp dụng thử để xem số tiền giảm, nhưng khi bấm Đặt hàng thì bắt buộc đăng nhập'],
  ['Q-D08-01', 'A. Áp dụng cho toàn bộ sản phẩm trong giỏ hàng'],
  ['Q-D09-01', 'A. Tối đa 1 mã giảm giá duy nhất trên một đơn hàng'],
  ['Q-D09-02', 'A. Tự động ghi đè mã mới thay thế mã cũ nếu mã mới hợp lệ'],
  ['Q-D10-01', 'A. Không phân biệt hoa/thường (hệ thống tự động chuyển đổi thành chữ in hoa)'],
  ['Q-D10-02', 'A. Tự động cắt bỏ khoảng trắng thừa (auto-trim) trước khi kiểm tra mã'],
  ['Q-D11-01', 'A. Làm tròn số học đến hàng đơn vị 1đ'],
  ['Q-D12-01', 'A. Tiền giảm tối đa bằng tạm tính tiền hàng (tiền hàng sau giảm về 0đ)'],
  ['Q-D13-01', 'A. Tách biệt thông báo lỗi theo nguyên nhân (Hết hạn, Chưa đủ đơn tối thiểu, Hết lượt dùng, Mã không tồn tại)'],
  ['Q-D14-01', 'B. Tạm giữ lượt khi bấm Áp dụng mã thành công và trừ chính thức khi Đặt hàng thành công'],
  ['Q-D15-01', 'A. Tự động hoàn lại lượt dùng mã cho khách hàng'],
  ['Q-D16-01', 'A. Tự động hủy áp dụng mã và thông báo đơn hàng không còn đủ điều kiện hưởng ưu đãi'],
  ['Q-D17-01', 'A. Có nút hoặc biểu tượng gỡ mã, khi bấm vào thì gỡ mã và tính lại tổng tiền ban đầu'],
  ['Q-D18-01', 'B. Giữ chỗ (reserve) lượt dùng ngay tại thời điểm khách bấm Áp dụng thành công'],
  ['Q-D19-01', 'A. Kiểm tra lại tại thời điểm bấm Đặt hàng, từ chối tạo đơn và thông báo mã không còn hiệu lực'],
  ['Q-D20-01', 'A. Chỉ giảm trừ vào tiền hàng (Subtotal), không giảm trừ vào phí vận chuyển'],
  ['Q-D21-01', 'A. Khóa tạm thời tính năng nhập mã trong 5 phút sau 5 lần nhập sai liên tiếp'],
  ['Q-D22-01', 'A. Có hiển thị spinner/loading và vô hiệu hóa nút Áp dụng trong khi chờ API phản hồi'],
  ['Q-D23-01', 'A. Có lưu vết đầy đủ mã giảm giá, số tiền được giảm và hiển thị trong chi tiết đơn hàng, lịch sử đơn và email xác nhận'],
  ['Q-X01-01', 'A. Không hỗ trợ, chỉ phục vụ khách mua hàng và giao hàng tại Việt Nam với đơn vị tiền tệ VNĐ'],
];

let ok = 0;
for (const [id, answer] of ANSWERS) {
  const r = spawnSync(process.execPath, ['tools/gate.js', 'answer', '--id', id, '--answer', answer, '--by', BY], { encoding: 'utf8' });
  if (r.status === 0) { ok++; console.log('DA TRA LOI  ' + id); }
  else { console.log('LOI         ' + id + '  ' + (r.stderr || r.stdout).trim()); }
}
console.log('Tổng: ' + ok + '/' + ANSWERS.length);
spawnSync(process.execPath, ['tools/gate.js', 'status'], { stdio: 'inherit' });
