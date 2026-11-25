// Two Lines to Your Past Self — make.fun entry (program/v1, Node 22, stdlib-only).
//
// Writes the two-line warning to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Deterministic: the same text every run, no input, no network, no clock.
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));

const ENTRY =
  "Don't order the large coffee at the campus café at 8am — your three-hour exam starts at nine.\n" +
  "You spend the whole test bouncing your leg and thinking about the bathroom instead of the answers, and that is why you fail by two points.\n";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// The output directory is provided by the harness; never delete or recreate it.
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");

// The entry text is resolved from this file's own location (via repoDir
// above), never from process.cwd() — so the program writes the same two
// lines no matter where it is invoked from.
void repoDir;
