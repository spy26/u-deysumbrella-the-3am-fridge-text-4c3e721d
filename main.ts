// The 3AM Fridge Text — FINAL
// Program writes the fridge's 3am text message to /output/entry.txt.
// Entry: V1 from VARIANTS.md (benchmark winner, 45/50, 96 chars).
// The gate requires 1-140 characters of UTF-8 text, not only whitespace;
// a trailing newline would add a character and a second (empty) line, so
// the file holds exactly the entry bytes and nothing else.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "3am. The microwave and I have been talking. We agreed: you don't need a snack, you need therapy.";

// Validate before writing: the gate accepts 1-140 characters of UTF-8
// text, not only whitespace. Fail loudly instead of writing a bad entry.
const bytes = Buffer.byteLength(ENTRY, "utf8");
if (ENTRY.length < 1 || ENTRY.length > 140) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1-140`);
}
if (bytes !== ENTRY.length || ![...ENTRY].every((c) => c >= " " && c <= "~")) {
  throw new Error("entry must be printable ASCII only");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY);
console.log(ENTRY);
