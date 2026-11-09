/**
 * ============================================================================
 * Hard Quality Gate Tool - tools/gate.js
 * ============================================================================
 * 
 * Mo ta:
 *   Cong kiem soat chat luong nghiem ngat (Hard Quality Gate).
 *   Quan ly tep trang thai gate_status.json de dam bao 100% cau hoi lam ro
 *   tu QA Analyst phai duoc QA/BA tra loi day du truoc khi cho phep tien hanh
 *   cac buoc phan tich tiep theo hoac viet Expected Results.
 * 
 * Cac lenh ho tro:
 *   - init:   Khoi tao gate_status.json tu tep Markdown hoac JSON chua cau hoi
 *   - check:  Kiem tra trang thai cong gate. Exit code 1 neu chua xong, 0 neu dat
 *   - answer: Cap nhat cau tra loi cho mot cau hoi cu the
 *   - status: Xem tong quan tien do giai quyet cau hoi
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DEFAULT_GATE_FILE = path.join(PROJECT_ROOT, 'gate_status.json');

/**
 * Doc tep JSON an toan
 */
function readGateStatus(filePath = DEFAULT_GATE_FILE) {
  if (!fs.existsSync(filePath)) {
    console.error(`[LOI] Khong tim thay tep gate status tai: ${filePath}`);
    console.error(`Goi y: Hay chay 'node tools/gate.js init <tep_cau_hoi>' de khoi tao.`);
    process.exit(1);
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    console.error(`[LOI] Khong the doc hoac phan tich cu phap JSON tai: ${filePath}`);
    console.error(error.message);
    process.exit(1);
  }
}

/**
 * Ghi tep JSON an toan
 */
function writeGateStatus(data, filePath = DEFAULT_GATE_FILE) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error(`[LOI] Khong the ghi tep gate status tai: ${filePath}`);
    console.error(error.message);
    process.exit(1);
  }
}

/**
 * Trich xuat danh sach cau hoi tu tep Markdown
 * Ho tro dinh dang bang Markdown hoac danh sach danh muc
 */
function parseQuestionsFromMarkdown(content) {
  const questions = [];
  const lines = content.split('\n');

  // Mau tim bang: | ID | D-code | Cau hoi | Phuong an / Goi y |
  let inTable = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('|') && trimmed.includes('ID') && trimmed.includes('Câu hỏi')) {
      inTable = true;
      continue;
    }
    if (inTable) {
      if (!trimmed.startsWith('|') || trimmed.includes('---')) {
        continue;
      }
      const cells = trimmed.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (cells.length >= 3) {
        let id = cells[0];
        let d_code = '';
        let questionText = '';
        let optionsText = '';

        if (cells.length >= 5) {
          d_code = cells[1];
          // Topic = cells[2]
          questionText = cells[3];
          optionsText = cells[4];
        } else if (cells.length === 4) {
          d_code = cells[1];
          questionText = cells[2];
          optionsText = cells[3];
        } else {
          questionText = cells[1];
          optionsText = cells[2];
        }

        if (id && id.toLowerCase() !== 'id') {
          const options = optionsText
            .split(/<br>|\n|; /)
            .map(opt => opt.trim())
            .filter(Boolean);

          questions.push({
            id,
            d_code,
            question: questionText,
            options: options.length > 0 ? options : [optionsText],
            status: 'UNRESOLVED',
            answer: null,
            answered_by: null,
            answered_at: null
          });
        }
      }
    }
  }

  // Neu khong phai dang bang, tim theo kieu danh sach ### Q-xxx hoac **Q-xxx**
  if (questions.length === 0) {
    const regex = /(?:###|\*\*)\s*(Q-[A-Za-z0-9_-]+)\s*(?::|\*\*)\s*(.+?)(?=(?:###|\*\*)\s*Q-|$)/gs;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const id = match[1].trim();
      const body = match[2].trim();
      const bodyLines = body.split('\n').map(l => l.trim()).filter(Boolean);
      const questionText = bodyLines[0] || body;
      const options = bodyLines.slice(1).filter(l => l.startsWith('-') || l.startsWith('*') || /^[A-D]\./i.test(l));

      questions.push({
        id,
        d_code: '',
        question: questionText,
        options: options.length > 0 ? options : [],
        status: 'UNRESOLVED',
        answer: null,
        answered_by: null,
        answered_at: null
      });
    }
  }

  return questions;
}

/**
 * Lenh: init
 */
function cmdInit(args) {
  const sourcePath = args[0];
  if (!sourcePath) {
    console.error('[LOI] Thieu duong dan tep cau hoi.');
    console.error('Cu phap: node tools/gate.js init <duong_dan_tep_cau_hoi.md_hoac_json>');
    process.exit(1);
  }

  const resolvedSource = path.resolve(PROJECT_ROOT, sourcePath);
  if (!fs.existsSync(resolvedSource)) {
    console.error(`[LOI] Khong tim thay tep nguon tai: ${resolvedSource}`);
    process.exit(1);
  }

  const rawContent = fs.readFileSync(resolvedSource, 'utf8');
  let questions = [];

  if (resolvedSource.endsWith('.json')) {
    const parsed = JSON.parse(rawContent);
    questions = Array.isArray(parsed) ? parsed : (parsed.questions || []);
  } else {
    questions = parseQuestionsFromMarkdown(rawContent);
  }

  if (questions.length === 0) {
    console.warn('[CANH BAO] Khong trich xuat duoc cau hoi nao tu tep nguon.');
  }

  const gateData = {
    project: 'QA Analyst Clarification Gate',
    source_file: path.relative(PROJECT_ROOT, resolvedSource),
    total_questions: questions.length,
    resolved_count: 0,
    unresolved_count: questions.length,
    gate_passed: false,
    created_at: new Date().toISOString(),
    last_checked_at: null,
    questions: questions
  };

  writeGateStatus(gateData);
  console.log('========================================================');
  console.log(' KHOI TAO HARD QUALITY GATE THANH CONG');
  console.log('========================================================');
  console.log(` - Tep trang thai : gate_status.json`);
  console.log(` - Tong so cau hoi: ${questions.length}`);
  console.log(` - Trang thai gate: DANG CHAN (UNRESOLVED: ${questions.length})`);
  console.log('========================================================');
}

/**
 * Lenh: check
 */
function cmdCheck() {
  const gateData = readGateStatus();
  const questions = gateData.questions || [];

  const unresolved = questions.filter(q => q.status !== 'RESOLVED' || !q.answer || String(q.answer).trim() === '');
  const resolved = questions.filter(q => q.status === 'RESOLVED' && q.answer && String(q.answer).trim() !== '');

  gateData.total_questions = questions.length;
  gateData.resolved_count = resolved.length;
  gateData.unresolved_count = unresolved.length;
  gateData.last_checked_at = new Date().toISOString();

  if (unresolved.length > 0) {
    gateData.gate_passed = false;
    writeGateStatus(gateData);

    console.error('========================================================');
    console.error(' [CHAN CUOC] HARD QUALITY GATE: KHONG THE DI TIEP!');
    console.error('========================================================');
    console.error(`Tien do: ${resolved.length}/${questions.length} cau hoi duoc giai quyet.`);
    console.error(`Con ${unresolved.length} cau hoi CHUA DUOC TRA LOI:\n`);

    unresolved.forEach((q, index) => {
      console.error(` ${index + 1}. [${q.id}] (${q.d_code || 'Khong ro'}) ${q.question}`);
      if (q.options && q.options.length > 0) {
        q.options.forEach(opt => console.error(`    - ${opt}`));
      }
      console.error('');
    });

    console.error('--------------------------------------------------------');
    console.error('QUY TAC: Tuyet doi khong tiep tuc phan tich hoac sinh');
    console.error('Expected Results cho den khi tat ca cau hoi duoc giai quyet.');
    console.error('Hay cap nhat cau tra loi bang cach sua file gate_status.json');
    console.error('hoac dung lenh: node tools/gate.js answer --id <ID> --answer <TRA_LOI> --by <NGUOI_TRA_LOI>');
    console.error('========================================================');
    process.exit(1);
  } else {
    gateData.gate_passed = true;
    writeGateStatus(gateData);

    console.log('========================================================');
    console.log(' [THONG QUA] HARD QUALITY GATE: DA SAN SANG DI TIEP!');
    console.log('========================================================');
    console.log(` - 100% cau hoi (${questions.length}/${questions.length}) da duoc giai quyet day du.`);
    console.log(` - Thoi diem kiem tra: ${gateData.last_checked_at}`);
    console.log(' - He thong duoc phep tiep tuc phan tich chi tiet.');
    console.log('========================================================');
    process.exit(0);
  }
}

/**
 * Lenh: answer
 */
function cmdAnswer(args) {
  let id = null;
  let answer = null;
  let by = 'QA/BA';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--id' && args[i + 1]) {
      id = args[i + 1];
      i++;
    } else if (args[i] === '--answer' && args[i + 1]) {
      answer = args[i + 1];
      i++;
    } else if (args[i] === '--by' && args[i + 1]) {
      by = args[i + 1];
      i++;
    }
  }

  if (!id || !answer) {
    console.error('[LOI] Thieu tham so --id hoac --answer.');
    console.error('Cu phap: node tools/gate.js answer --id <ID> --answer <NOI_DUNG> [--by <TEN>]');
    process.exit(1);
  }

  const gateData = readGateStatus();
  const target = (gateData.questions || []).find(q => q.id.toLowerCase() === id.toLowerCase());

  if (!target) {
    console.error(`[LOI] Khong tim thay cau hoi co ID: ${id}`);
    process.exit(1);
  }

  target.status = 'RESOLVED';
  target.answer = answer;
  target.answered_by = by;
  target.answered_at = new Date().toISOString();

  // Cap nhat bo dem
  const resolved = gateData.questions.filter(q => q.status === 'RESOLVED' && q.answer);
  gateData.resolved_count = resolved.length;
  gateData.unresolved_count = gateData.questions.length - resolved.length;
  gateData.gate_passed = gateData.unresolved_count === 0;

  writeGateStatus(gateData);
  console.log(`[Thanh cong] Da cap nhat cau tra loi cho [${target.id}]:`);
  console.log(` - Cau hoi: ${target.question}`);
  console.log(` - Tra loi: ${target.answer}`);
  console.log(` - Nguoi tra loi: ${target.answered_by}`);
  console.log(` - Tien do hien tai: ${gateData.resolved_count}/${gateData.total_questions}`);
}

/**
 * Lenh: status
 */
function cmdStatus() {
  const gateData = readGateStatus();
  console.log('========================================================');
  console.log(' TIEN DO HARD QUALITY GATE');
  console.log('========================================================');
  console.log(` - Tong so cau hoi : ${gateData.total_questions}`);
  console.log(` - Da giai quyet   : ${gateData.resolved_count}`);
  console.log(` - Chua giai quyet : ${gateData.unresolved_count}`);
  console.log(` - Trang thai cong : ${gateData.gate_passed ? 'THONG QUA' : 'DANG CHAN'}`);
  console.log('========================================================');
}

/**
 * Dieu huong lenh chinh
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'init':
      cmdInit(args.slice(1));
      break;
    case 'check':
      cmdCheck();
      break;
    case 'answer':
      cmdAnswer(args.slice(1));
      break;
    case 'status':
      cmdStatus();
      break;
    default:
      console.log('Cac lenh kha dung:');
      console.log('  node tools/gate.js init <duong_dan_tep_cau_hoi>');
      console.log('  node tools/gate.js check');
      console.log('  node tools/gate.js answer --id <ID> --answer <NOI_DUNG> [--by <TEN>]');
      console.log('  node tools/gate.js status');
      break;
  }
}

main();
