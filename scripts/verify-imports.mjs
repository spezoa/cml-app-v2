
// verify-imports.mjs
// Fails if there's an import using wrong casing or pointing to missing file for local modules.
// Only checks path aliases '@/...' and relative './' '../' imports.
import fs from 'fs';
import path from 'path';

const repoRoot = process.cwd();

const exts = ['.tsx','.ts','.jsx','.js','.mjs','.mts','.cjs'];

function listFiles(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    for (const entry of fs.readdirSync(cur, { withFileTypes: true })) {
      if (entry.name.startsWith('.git')) continue;
      const full = path.join(cur, entry.name);
      if (entry.isDirectory()) stack.push(full);
      else if (exts.some(e => entry.name.endsWith(e))) out.push(full);
    }
  }
  return out;
}

function fileExistsCaseSensitive(p) {
  if (fs.existsSync(p) && fs.statSync(p).isFile()) return true;
  const candidates = [];
  for (const ext of exts) {
    const f = p + ext;
    if (fs.existsSync(f) && fs.statSync(f).isFile()) return true;
    const idx = path.join(p, 'index' + ext);
    if (fs.existsSync(idx) && fs.statSync(idx).isFile()) return true;
    candidates.push(f, idx);
  }
  return false;
}

const aliasPrefix = '@/';
const srcRoot = repoRoot; // paths are relative to repo root due to tsconfig baseUrl

const importRe = /from\\s+['"]([^'"]+)['"]|import\\(\\s*['"]([^'"]+)['"]\\s*\\)/g;

const files = listFiles(repoRoot);
const issues = [];

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = importRe.exec(text))) {
    const spec = m[1] || m[2];
    if (!spec) continue;
    if (spec.startsWith('@/')) {
      const rel = spec.slice(2);
      const target = path.join(srcRoot, rel);
      if (!fileExistsCaseSensitive(target)) {
        issues.push({ file, spec, reason: 'missing (or wrong case)', target });
      }
    } else if (spec.startsWith('./') || spec.startsWith('../')) {
      const base = path.dirname(file);
      const target = path.join(base, spec);
      if (!fileExistsCaseSensitive(target)) {
        issues.push({ file, spec, reason: 'missing (or wrong case)', target });
      }
    }
  }
}

if (issues.length) {
  console.error('❌ Import path issues found:');
  for (const i of issues) {
    console.error(` - ${path.relative(repoRoot, i.file)} imports "${i.spec}" -> ${path.relative(repoRoot, i.target)}: ${i.reason}`);
  }
  process.exit(1);
} else {
  console.log('✅ Import paths look good.');
}
