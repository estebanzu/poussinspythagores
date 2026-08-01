#!/usr/bin/env node
// QA script for Super Maths CP
// Usage: node scripts/qa.js --geome   | geometry game QA
//        node scripts/qa.js --frontend | frontend HTTP + asset QA

const { spawn, spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const PORT = 3210;
const BASE = `http://localhost:${PORT}`;
const ROOT = path.join(__dirname, '..');

const checks = [];
let failures = 0;

function check(label, fn) {
  checks.push({ label, fn });
}

async function runChecks() {
  for (const c of checks) {
    try {
      await c.fn();
      console.log(`  ✓ ${c.label}`);
    } catch (err) {
      failures++;
      console.error(`  ✗ ${c.label}`);
      console.error(`      ${err.message}`);
    }
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForServer() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`${BASE}/health`);
      if (res.ok) return;
    } catch (_) {
      /* server not up yet */
    }
    await sleep(200);
  }
  throw new Error(`Server did not start on port ${PORT}`);
}

async function startServer() {
  const child = spawn(process.execPath, ['server.js'], {
    cwd: ROOT,
    env: { ...process.env, PORT: String(PORT) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  await waitForServer();
  return child;
}

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function contains(rel, needles) {
  const content = read(rel);
  const missing = needles.filter((n) => !content.includes(n));
  if (missing.length) {
    throw new Error(`${rel} missing: ${missing.join(', ')}`);
  }
}

function syntaxCheckAll(relDir) {
  const dir = path.join(ROOT, relDir);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.js'));
  for (const f of files) {
    const r = spawnSync(process.execPath, ['--check', '--input-type=module'], {
      input: fs.readFileSync(path.join(dir, f)),
    });
    if (r.status !== 0) {
      throw new Error(`${relDir}/${f}: ${r.stderr}`);
    }
  }
}

function geome() {
  console.log('Geometry game QA\n');
  check('Category B "Espace et Géométrie" defined in constants.js', () =>
    contains('public/js/constants.js', [
      'Espace et Géométrie',
      "id: 'b_figures'",
      "id: 'b_vocabulaire_spatial'",
    ])
  );
  check('Geometry render logic present in games.js', () =>
    contains('public/js/games.js', [
      "'b_figures'",
      "'b_vocabulaire_spatial'",
      'toggleShapeSelected',
      'validateFormesTri',
    ])
  );
  check('Geometry handlers exposed on window (main.js)', () =>
    contains('public/js/main.js', ['toggleShapeSelected', 'validateFormesTri'])
  );
  check('Home screen mentions geometry category (index.html)', () =>
    contains('index.html', ['Espace et Géométrie'])
  );
  check('All public JS modules parse as ES modules', () =>
    syntaxCheckAll('public/js')
  );
}

async function frontend() {
  console.log('Frontend QA\n');
  const child = await startServer();
  try {
    check('GET / serves the app shell', async () => {
      const res = await fetch(`${BASE}/`);
      const body = await res.text();
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      for (const n of [
        'screen-game',
        'styles.css',
        'js/main.js',
        'manifest.json',
      ]) {
        if (!body.includes(n)) throw new Error(`missing ${n}`);
      }
    });
    check('GET /styles.css served as CSS', async () => {
      const res = await fetch(`${BASE}/styles.css`);
      const body = await res.text();
      const ct = res.headers.get('content-type') || '';
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!ct.includes('text/css')) throw new Error(`Content-Type "${ct}"`);
      if (body.length < 10000)
        throw new Error(`suspiciously small (${body.length} bytes)`);
    });
    check('GET /js/main.js served as module JS', async () => {
      const res = await fetch(`${BASE}/js/main.js`);
      const body = await res.text();
      const ct = res.headers.get('content-type') || '';
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (!ct.includes('javascript')) throw new Error(`Content-Type "${ct}"`);
      if (!body.includes('import')) throw new Error('not an ES module');
    });
    check('GET /service-worker.js served', async () => {
      const res = await fetch(`${BASE}/service-worker.js`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    });
    check('GET /manifest.json served', async () => {
      const res = await fetch(`${BASE}/manifest.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    });
    check('GET /logo.png served', async () => {
      const res = await fetch(`${BASE}/logo.png`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    });
    check('No Tailwind CDN in served HTML', async () => {
      const body = await (await fetch(`${BASE}/`)).text();
      if (body.includes('cdn.tailwindcss.com'))
        throw new Error('Tailwind CDN still present');
    });
    check('All public JS modules parse as ES modules', () =>
      syntaxCheckAll('public/js')
    );
    await runChecks();
  } finally {
    child.kill();
  }
}

async function main() {
  const mode = process.argv[2];
  if (mode === '--geome') {
    geome();
    await runChecks();
  } else if (mode === '--frontend') {
    await frontend();
  } else {
    console.error('Usage: node scripts/qa.js --geome|--frontend');
    process.exit(2);
  }

  if (failures > 0) {
    console.error(`\n${failures} check(s) failed`);
    process.exit(1);
  }
  console.log('\nAll checks passed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
