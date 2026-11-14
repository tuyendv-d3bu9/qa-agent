#!/usr/bin/env node
// Kiểm qa-analyst/ sau khi thêm Pha 3 (Viewpoint, Test Idea, Test Case, Coverage Review).
// Chạy ở gốc repo:
//   node tools/check-m02-02.js                 -> kiểm qa-analyst/
//   node tools/check-m02-02.js <thư mục>       -> kiểm thư mục agent khác (ví dụ đáp án mẫu)
//   thêm --output <thư mục OUTPUT>             -> kiểm thêm các file đầu ra Pha 3
// Exit 0 khi mọi check PASS, exit 1 khi có FAIL.
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
let OUT = null;
const pos = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--output') {
    const next = args[i + 1];
    OUT = path.resolve(next && !next.startsWith('--') ? (i++, next) : 'OUTPUT');
  } else pos.push(args[i]);
}
const ROOT = path.resolve(pos[0] || 'qa-analyst');
const ARCHIVE = path.join(ROOT, '_archive', 'prompt_qa_analyst_v2.md');

const NEW_SKILLS = ['viewpoint-generator', 'test-idea-generation', 'test-case-format', 'coverage-review'];
const OLD_SKILLS = ['interrogation-6w', 'clarification-questions', 'missing-rule-classification', 'requirement-autopsy-report', 'fact-self-check'];
const FILES = [
  'AGENTS.md',
  'knowledge/voucher-domain.md',
  'knowledge/test-viewpoints.md',
  ...OLD_SKILLS.map((s) => `skills/${s}/SKILL.md`),
  'skills/clarification-questions/assets/questions_for_clarification.md',
  'skills/requirement-autopsy-report/assets/requirement_autopsy_report.md',
  ...NEW_SKILLS.map((s) => `skills/${s}/SKILL.md`),
  'skills/viewpoint-generator/assets/viewpoints.md',
  'skills/test-idea-generation/assets/test_ideas.md',
  'skills/test-case-format/assets/test_cases.md',
  'skills/coverage-review/assets/coverage_review.md',
];

const load = (p) => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8').normalize('NFC').replace(/\r\n/g, '\n') : null);
const read = (rel) => load(path.join(ROOT, rel));
const norm = (l) => l.trim().replace(/\s+/g, ' ');
const results = [];
const check = (id, name, fn) => {
  let msg = '';
  try { msg = fn(); } catch (e) { msg = 'Lỗi: ' + e.message; }
  results.push({ id, name, ok: msg === '', msg });
};

check('P01', 'Đủ file của Pha 3 đúng đường dẫn', () => {
  const miss = FILES.filter((f) => read(f) === null);
  return miss.length ? 'Thiếu: ' + miss.join(', ') : '';
});

check('P02', 'Prompt v2 nằm trong _archive', () =>
  fs.existsSync(ARCHIVE) ? '' : 'Không thấy ' + path.relative(process.cwd(), ARCHIVE));

check('P03', '4 SKILL.md mới đúng chuẩn frontmatter, nói rõ Pha 3', () => {
  const errs = [];
  for (const s of NEW_SKILLS) {
    const t = read(`skills/${s}/SKILL.md`);
    if (t === null) { errs.push(`${s}: thiếu file`); continue; }
    const m = t.match(/^---\n([\s\S]*?)\n---\n/);
    if (!m) { errs.push(`${s}: thiếu frontmatter ở đầu file`); continue; }
    const name = (m[1].match(/^name:\s*(.+)$/m) || [])[1];
    const desc = (m[1].match(/^description:\s*(.+)$/m) || [])[1];
    if (name !== s) errs.push(`${s}: name phải là "${s}"`);
    if (!desc || desc.length < 20 || desc.length > 1024) errs.push(`${s}: description phải dài 20–1024 ký tự`);
    else if (!/Pha 3/.test(desc)) errs.push(`${s}: description phải nói dùng ở Pha 3`);
    else if (!/OUTPUT\//.test(desc)) errs.push(`${s}: description nên nói file đầu ra trong OUTPUT/`);
  }
  return errs.join('; ');
});

check('P04', 'Chép nguyên văn từ prompt v2', () => {
  const v2 = load(ARCHIVE);
  if (!v2) return 'Không có prompt v2 để so';
  const all = new Set(FILES.map(read).filter(Boolean).join('\n').split('\n').map(norm));
  // Bỏ các dòng của v1 đã được sửa ở bài 09/11 (K2, K3, K4, K6) và câu mở đầu cũ của mục VI.
  const skip = (l) => !l.trim() || l.trim() === '---' || /^#/.test(l.trim()) || /^```/.test(l.trim()) ||
    l.includes('TRUNG BÌNH') || l.includes('mang nhãn `MOT_PHAN`') ||
    /^4\. \*\*Không phụ thuộc/.test(l.trim()) || /^- D\d\d: /.test(l.trim()) ||
    l.includes('với 2 tệp tin:') || l.includes('Toàn bộ tri thức đã được đóng gói khép kín trong prompt này');
  const miss = v2.split('\n').filter((l) => !skip(l) && !all.has(norm(l)));
  return miss.length ? `${miss.length} dòng không còn nguyên văn, ví dụ: "${norm(miss[0]).slice(0, 80)}"` : '';
});

check('P05', 'AGENTS.md trỏ đủ 9 skill và 2 file tri thức', () => {
  const t = read('AGENTS.md') || '';
  const need = [...OLD_SKILLS, ...NEW_SKILLS].map((s) => `skills/${s}/SKILL.md`)
    .concat(['knowledge/voucher-domain.md', 'knowledge/test-viewpoints.md']);
  const miss = need.filter((k) => !t.includes(k));
  return miss.length ? 'Thiếu: ' + miss.join(', ') : '';
});

check('P06', 'AGENTS.md có luồng Pha 3 và điểm dừng người lọc', () => {
  const t = read('AGENTS.md') || '';
  const miss = ['Pha 3', 'CHO_DUYET', 'DA_DUYET', 'OUTPUT/viewpoints.md', 'OUTPUT/test_ideas.md',
    'OUTPUT/test_cases.md', 'OUTPUT/test_cases.csv', 'OUTPUT/coverage_review.md'].filter((k) => !t.includes(k));
  return miss.length ? 'Thiếu: ' + miss.join(', ') : '';
});

check('P07', '8 viewpoint cố định, mỗi D01–D23 thuộc đúng 1 viewpoint', () => {
  const t = read('knowledge/test-viewpoints.md') || '';
  const errs = [];
  for (let i = 1; i <= 8; i++) if (!new RegExp('^\\|\\s*VP-0' + i + '\\s*\\|', 'm').test(t)) errs.push(`thiếu dòng VP-0${i}`);
  const map = t.split('\n').filter((l) => /^\|\s*VP-0\d [^|]+\|/.test(l)).map((l) => l.split('|')[2]).join(',');
  for (let d = 1; d <= 23; d++) {
    const code = 'D' + String(d).padStart(2, '0');
    const n = (map.match(new RegExp('\\b' + code + '\\b', 'g')) || []).length;
    if (n !== 1) errs.push(`${code} xuất hiện ${n} lần trong bảng gắn D-code`);
  }
  return errs.slice(0, 4).join('; ') + (errs.length > 4 ? ` (và ${errs.length - 4} lỗi khác)` : '');
});

check('P08', 'Mỗi thông tin một nơi: bảng 8 viewpoint và 9 điểm biên không bị chép lặp', () => {
  const errs = [];
  const vp = FILES.filter((f) => !f.includes('/assets/') && /^\|\s*VP-01\s*\|\s*Happy Path\s*\|/m.test(read(f) || ''));
  if (vp.length !== 1 || vp[0] !== 'knowledge/test-viewpoints.md') errs.push('Bảng 8 viewpoint phải chỉ nằm ở knowledge/test-viewpoints.md, đang ở: ' + vp.join(', '));
  const b = FILES.filter((f) => !f.includes('/assets/') && /^\|\s*B-01\s*\|/m.test(read(f) || ''));
  if (b.length !== 1 || b[0] !== 'skills/coverage-review/SKILL.md') errs.push('Bảng điểm biên phải chỉ nằm ở skills/coverage-review/SKILL.md, đang ở: ' + b.join(', '));
  return errs.join('; ');
});

check('P09', 'Skill có đủ quy tắc cốt lõi', () => {
  const errs = [];
  const ti = read('skills/test-idea-generation/SKILL.md') || '';
  if (!/BR-(\d+|xx)/.test(ti)) errs.push('test-idea-generation thiếu quy tắc BR');
  ['GIU', 'BO_TRUNG', 'NGOAI_PHAM_VI', 'CHO_DUYET', '20'].forEach((k) => { if (!ti.includes(k)) errs.push('test-idea-generation thiếu ' + k); });
  const tc = read('skills/test-case-format/SKILL.md') || '';
  ['TC_ID', 'Title', 'Precondition', 'Test Steps', 'Test Data', 'Expected Result', 'Priority', 'Tags', 'Nguồn',
    'CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'Verify', 'Validate', 'DA_DUYET'].forEach((k) => { if (!tc.includes(k)) errs.push('test-case-format thiếu ' + k); });
  const cr = read('skills/coverage-review/SKILL.md') || '';
  ['COVER', 'MOT_PHAN', 'CHUA_COVER', 'B-09', 'Ngoài danh sách'].forEach((k) => { if (!cr.includes(k)) errs.push('coverage-review thiếu ' + k); });
  const vg = read('skills/viewpoint-generator/SKILL.md') || '';
  ['KHONG_CO_DIEM', 'Top 3'].forEach((k) => { if (!vg.includes(k)) errs.push('viewpoint-generator thiếu ' + k); });
  return errs.slice(0, 4).join('; ') + (errs.length > 4 ? ` (và ${errs.length - 4} lỗi khác)` : '');
});

check('P10', 'Không có emoji', () => {
  const re = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B50}\u{2705}\u{274C}]/u;
  const bad = FILES.filter((f) => re.test(read(f) || ''));
  return bad.length ? 'Có emoji ở: ' + bad.join(', ') : '';
});

if (OUT) {
  const o = (f) => load(path.join(OUT, f));
  const rows = (t, re) => (t || '').split('\n').filter((l) => re.test(l));
  check('O01', 'viewpoints.md đủ 8 viewpoint và có Top 3', () => {
    const t = o('viewpoints.md');
    if (!t) return 'Thiếu file';
    const ids = new Set(rows(t, /^\|\s*VP-0[1-8]\s*\|/).map((l) => l.split('|')[1].trim()));
    if (ids.size !== 8) return `Có ${ids.size}/8 viewpoint`;
    return /Top 3/.test(t) ? '' : 'Thiếu mục Top 3';
  });
  check('O02', 'test_ideas.md từ 20 idea, đã duyệt, có nguồn', () => {
    const t = o('test_ideas.md');
    if (!t) return 'Thiếu file';
    const r = rows(t, /^\|\s*TI-\d+\s*\|/);
    if (r.length < 20) return `Mới có ${r.length} idea`;
    if (!/Trạng thái duyệt:\s*DA_DUYET/.test(t)) return 'Chưa có "Trạng thái duyệt: DA_DUYET"';
    const noSrc = r.filter((l) => !/(BR-\d+|Q-[DX]\d+-\d+|VP-0\d)/.test(l.split('|')[4] || ''));
    return noSrc.length ? `${noSrc.length} idea không có nguồn` : '';
  });
  check('O03', 'test_cases.md và .csv khớp số dòng', () => {
    const md = o('test_cases.md'); const csv = o('test_cases.csv');
    if (!md || !csv) return 'Thiếu test_cases.md hoặc test_cases.csv';
    const n = rows(md, /^\|\s*VOUCHER-\d{3}\s*\|/).length;
    const m = rows(csv, /^"VOUCHER-\d{3}"/).length;
    if (!n) return 'Không có test case nào';
    return n === m ? '' : `md có ${n} test case, csv có ${m}`;
  });
  check('O04', 'coverage_review.md có đủ 3 góc và mục Gap', () => {
    const t = o('coverage_review.md');
    if (!t) return 'Thiếu file';
    const miss = ['Góc 1', 'Góc 2', 'Góc 3', 'GAP-'].filter((k) => !t.includes(k));
    return miss.length ? 'Thiếu: ' + miss.join(', ') : '';
  });
}

const w = Math.max(...results.map((r) => r.name.length));
console.log('Kiểm ' + path.relative(process.cwd(), ROOT) + (OUT ? ' + ' + path.relative(process.cwd(), OUT) : ''));
console.log('-'.repeat(50));
for (const r of results) {
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.id}  ${r.name.padEnd(w)}`);
  if (!r.ok) console.log('            ' + r.msg);
}
const pass = results.filter((r) => r.ok).length;
console.log('-'.repeat(50));
console.log(`Kết quả: ${pass}/${results.length} PASS`);
process.exit(pass === results.length ? 0 : 1);
