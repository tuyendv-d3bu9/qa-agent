#!/usr/bin/env node
// Kiểm qa-analyst/ sau khi tách prompt thành AGENTS.md + SKILL.md.
// Chạy ở gốc repo: node tools/check-m02.js
// Exit 0 khi mọi check PASS, exit 1 khi có FAIL.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(process.cwd(), 'qa-analyst');
const ARCHIVE = path.join(ROOT, '_archive', 'prompt_qa_analyst_v1.md');
const FILES = [
  'AGENTS.md',
  'knowledge/voucher-domain.md',
  'skills/interrogation-6w/SKILL.md',
  'skills/clarification-questions/SKILL.md',
  'skills/clarification-questions/assets/questions_for_clarification.md',
  'skills/missing-rule-classification/SKILL.md',
  'skills/requirement-autopsy-report/SKILL.md',
  'skills/requirement-autopsy-report/assets/requirement_autopsy_report.md',
  'skills/fact-self-check/SKILL.md',
];
const SKILLS = ['interrogation-6w', 'clarification-questions', 'missing-rule-classification', 'requirement-autopsy-report', 'fact-self-check'];
const META = {
  D01: ['Implicit assumption', 'TB'], D02: ['Implicit assumption', 'CAO'], D03: ['Implicit assumption', 'CAO'],
  D04: ['Edge case bị bỏ qua', 'TB'], D05: ['Implicit assumption', 'CAO'], D06: ['Implicit assumption', 'CAO'],
  D07: ['Implicit assumption', 'TB'], D08: ['Implicit assumption', 'TB'], D09: ['Implicit assumption', 'CAO'],
  D10: ['Implicit assumption', 'TB'], D11: ['Implicit assumption', 'CAO'], D12: ['Edge case bị bỏ qua', 'CAO'],
  D13: ['Implicit assumption', 'TB'], D14: ['Implicit assumption', 'CAO'], D15: ['Rollback/Undo', 'TB'],
  D16: ['Edge case bị bỏ qua', 'CAO'], D17: ['Rollback/Undo', 'TB'], D18: ['Edge case bị bỏ qua', 'CAO'],
  D19: ['Edge case bị bỏ qua', 'CAO'], D20: ['Implicit assumption', 'TB'], D21: ['Non-functional bị ignore', 'TB'],
  D22: ['Non-functional bị ignore', 'TB'], D23: ['Implicit assumption', 'THAP'],
};

const read = (rel) => {
  const p = path.join(ROOT, rel);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8').normalize('NFC').replace(/\r\n/g, '\n') : null;
};
const norm = (l) => l.trim().replace(/\s+/g, ' ');
const results = [];
const check = (id, name, fn) => {
  let msg = '';
  try { msg = fn(); } catch (e) { msg = 'Lỗi: ' + e.message; }
  results.push({ id, name, ok: msg === '', msg });
};

check('C01', 'Đủ 9 file đúng đường dẫn', () => {
  const miss = FILES.filter((f) => read(f) === null);
  return miss.length ? 'Thiếu: ' + miss.join(', ') : '';
});

check('C02', 'Prompt cũ đã chuyển vào _archive', () => {
  if (!fs.existsSync(ARCHIVE)) return 'Không thấy qa-analyst/_archive/prompt_qa_analyst_v1.md';
  if (fs.existsSync(path.join(ROOT, 'prompt_qa_analyst.md'))) return 'qa-analyst/prompt_qa_analyst.md vẫn còn';
  return '';
});

check('C03', 'SKILL.md đúng chuẩn frontmatter', () => {
  const errs = [];
  for (const s of SKILLS) {
    const t = read(`skills/${s}/SKILL.md`);
    if (t === null) { errs.push(`${s}: thiếu file`); continue; }
    const m = t.match(/^---\n([\s\S]*?)\n---\n/);
    if (!m) { errs.push(`${s}: thiếu frontmatter ở đầu file`); continue; }
    const name = (m[1].match(/^name:\s*(.+)$/m) || [])[1];
    const desc = (m[1].match(/^description:\s*(.+)$/m) || [])[1];
    if (name !== s) errs.push(`${s}: name phải là "${s}"`);
    if (name && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) errs.push(`${s}: name chỉ gồm a-z, 0-9, gạch ngang`);
    if (!desc || desc.length < 20 || desc.length > 1024) errs.push(`${s}: description phải dài 20–1024 ký tự`);
    else if (!/Pha [12]/.test(desc)) errs.push(`${s}: description phải nói dùng ở Pha 1 hay Pha 2`);
  }
  return errs.join('; ');
});

check('C04', 'Chép nguyên văn từ prompt cũ', () => {
  if (!fs.existsSync(ARCHIVE)) return 'Không có bản cũ để so';
  const old = fs.readFileSync(ARCHIVE, 'utf8').normalize('NFC').replace(/\r\n/g, '\n').split('\n');
  const all = new Set(FILES.map(read).filter(Boolean).join('\n').split('\n').map(norm));
  const skip = (l) => !l.trim() || l.trim() === '---' || /^#/.test(l.trim()) ||
    l.includes('TRUNG BÌNH') || l.includes('mang nhãn `MOT_PHAN`') ||
    /^4\. \*\*Không phụ thuộc/.test(l.trim()) || /^- D\d\d: /.test(l.trim());
  const miss = old.filter((l) => !skip(l) && !all.has(norm(l)));
  return miss.length ? `${miss.length} dòng không còn nguyên văn, ví dụ: "${norm(miss[0]).slice(0, 80)}"` : '';
});

check('C05', 'K1 — AGENTS.md định nghĩa 4 nhãn trạng thái', () => {
  const t = read('AGENTS.md') || '';
  const miss = ['RO', 'MO_HO', 'KHONG_DE_CAP', 'MAU_THUAN'].filter((n) => !new RegExp('^\\|\\s*`?' + n + '`?\\s*\\|', 'm').test(t));
  return miss.length ? 'Thiếu dòng bảng cho: ' + miss.join(', ') : '';
});

check('C06', 'K2 — Phân loại dùng nhãn trạng thái, không dùng nhãn 6W', () => {
  const t = read('skills/missing-rule-classification/SKILL.md') || '';
  if (/`MOT_PHAN` hoặc `KHONG`/.test(t)) return 'Vẫn chọn điểm theo nhãn 6W';
  const miss = ['MO_HO', 'KHONG_DE_CAP', 'MAU_THUAN'].filter((n) => !t.includes(n));
  return miss.length ? 'Thiếu nhãn: ' + miss.join(', ') : '';
});

check('C07', 'K3 — Không còn "TRUNG BÌNH"', () => {
  const bad = FILES.filter((f) => (read(f) || '').includes('TRUNG BÌNH'));
  return bad.length ? 'Còn ở: ' + bad.join(', ') : '';
});

check('C08', 'K4 — Danh mục có cột Loại và Rủi ro, đúng 23 D-code', () => {
  const t = read('knowledge/voucher-domain.md') || '';
  const errs = [];
  for (const [d, [lo, ri]] of Object.entries(META)) {
    const row = t.split('\n').find((l) => new RegExp('^\\|\\s*' + d + '\\s*\\|').test(l));
    if (!row) { errs.push(d + ' thiếu dòng bảng'); continue; }
    const cells = row.split('|').map((c) => c.trim());
    if (!cells.includes(lo)) errs.push(`${d} Loại phải là "${lo}"`);
    if (!cells.includes(ri)) errs.push(`${d} Rủi ro phải là ${ri}`);
  }
  return errs.slice(0, 3).join('; ') + (errs.length > 3 ? ` (và ${errs.length - 3} lỗi khác)` : '');
});

check('C09', 'K5 — Có quy tắc đặt ID và mã X', () => {
  const t = read('skills/clarification-questions/SKILL.md') || '';
  const miss = ['Q-<D-code>', 'X01', '<br>'].filter((k) => !t.includes(k));
  return miss.length ? 'Thiếu: ' + miss.join(', ') : '';
});

check('C10', 'K6 — Ràng buộc 4 không còn trỏ resources/ làm nguồn', () => {
  const t = read('AGENTS.md') || '';
  if (/Không phụ thuộc vào thư mục `resources\/`/.test(t)) return 'Vẫn là ràng buộc 4 cũ';
  return /^4\. .*qa-analyst\//m.test(t) ? '' : 'Ràng buộc 4 phải nói tri thức nằm trong qa-analyst/';
});

check('C11', 'AGENTS.md trỏ đủ 5 skill và tri thức ngành', () => {
  const t = read('AGENTS.md') || '';
  const miss = SKILLS.map((s) => `skills/${s}/SKILL.md`).concat(['knowledge/voucher-domain.md']).filter((k) => !t.includes(k));
  return miss.length ? 'Thiếu: ' + miss.join(', ') : '';
});

check('C12', 'Không có emoji', () => {
  const re = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]/u;
  const bad = FILES.filter((f) => re.test(read(f) || ''));
  return bad.length ? 'Có emoji ở: ' + bad.join(', ') : '';
});

console.log('KIỂM TRA qa-analyst/');
console.log('--------------------------------------------------');
for (const r of results) {
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.id}  ${r.name}`);
  if (!r.ok) console.log('            ' + r.msg);
}
const pass = results.filter((r) => r.ok).length;
console.log('--------------------------------------------------');
console.log(`Kết quả: ${pass}/${results.length} PASS`);
process.exit(pass === results.length ? 0 : 1);
