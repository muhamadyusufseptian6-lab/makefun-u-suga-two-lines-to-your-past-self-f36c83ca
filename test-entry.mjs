// TDD-lite checks for the Two Lines to Your Past Self entry.
// Run: node test-entry.mjs
// Verifies the kit gate (UTF-8, 1-280 chars, not only whitespace),
// the two-line shape, determinism, and stdlib-only imports.
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
let failures = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
}

function runOnce() {
  const out = mkdtempSync(join(tmpdir(), "two-lines-out-"));
  execFileSync(process.execPath, [join(repoDir, "main.ts")], {
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: out },
    stdio: "pipe",
  });
  const text = readFileSync(join(out, "entry.txt"), "utf8");
  rmSync(out, { recursive: true, force: true });
  return text;
}

// 1. Gate: entry.txt is UTF-8 text of 1 to 280 characters, not only whitespace.
const text = runOnce();
check("entry is 1-280 chars", text.length >= 1 && text.length <= 280, `${text.length} chars`);
check("entry is not only whitespace", text.trim().length > 0);
check("entry is valid UTF-8 round-trip", Buffer.from(text, "utf8").toString("utf8") === text);

// 2. Shape: exactly two lines, one sentence each.
const lines = text.replace(/\n$/, "").split("\n");
check("exactly two lines", lines.length === 2, `${lines.length} lines`);
check("line 1 is one sentence", lines[0].trim().length > 0 && (lines[0].match(/\./g) || []).length <= 1);
check("line 2 is one sentence", lines[1].trim().length > 0 && (lines[1].match(/\./g) || []).length <= 1);
check("line 1 warns about a specific moment", /8am|exam|café/i.test(lines[0]));
check("line 2 traces cause and effect", /that is why|because|so /i.test(lines[1]));

// 3. Determinism: same input -> same output.
check("deterministic output", runOnce() === text);

// 4. Stdlib-only: main.ts imports only node: builtins.
const src = readFileSync(join(repoDir, "main.ts"), "utf8");
const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]);
check(
  "stdlib-only imports",
  imports.every((i) => i.startsWith("node:")),
  imports.join(", ") || "(none)",
);

if (failures > 0) {
  console.error(`${failures} check(s) failed`);
  process.exit(1);
}
console.log("All checks passed.");
