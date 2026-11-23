// The One-Line Laugh — entry for u-ronigrv-the-one-line-laugh-7ccca46f
// SPDX-License-Identifier: MIT

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line: a smart speaker that knows its owner too well.
// Setup promises motivation; the twist is that the "motivation" is just
// the owner's own procrastination, played back to them.
const LINE =
  "I asked my smart speaker for motivation, and it just played a recording of me saying, 'I'll start on Monday.'";

const MAX_CHARS = 200;

/** Collapse any run of whitespace to a single space and trim the ends. */
function normalize(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

/** A valid line is one sentence, non-empty, and at most 200 characters. */
function validate(text: string): void {
  if (text.length === 0) {
    throw new Error("Invalid line: entry is empty.");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(
      `Invalid line: ${text.length} characters exceeds the ${MAX_CHARS}-character limit ` +
        `by ${text.length - MAX_CHARS}. Shorten the line to fit.`,
    );
  }
  if (/\s{2,}/.test(text)) {
    throw new Error("Invalid line: contains a run of multiple spaces.");
  }
  // One sentence: exactly one sentence-ending full stop, at the very end
  // (allowing a closing quote after it, as in quoted speech).
  const stops = (text.match(/\./g) ?? []).length;
  const bareEnd = text.replace(/["'”’)\]]+$/, "");
  if (stops !== 1 || !bareEnd.endsWith(".")) {
    throw new Error(
      `Invalid line: expected exactly one sentence (one full stop, at the end) but found ${stops} full stop(s).`,
    );
  }
}

/** Write the validated line to <outputDir>/entry.txt. */
function writeEntry(outputDir: string): void {
  const line = normalize(LINE);
  validate(line);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), line, "utf8");
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
writeEntry(outputDir);
const line = normalize(LINE);
console.log(`Wrote one-line entry (${line.length} chars) to ${join(outputDir, "entry.txt")}`);
