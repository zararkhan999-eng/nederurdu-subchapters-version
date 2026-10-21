# Visual review

The contact sheets in this folder show every word picture the app ships, grouped by kind
(`foundations`, `people-body`, `objects-places`, `actions`, `situations`).

All word pictures are Pim-themed SVGs drawn by the art kit in `art/` and rendered with
`npm run art:build`. No picture contains a Dutch word, so none gives an answer away; letters and
numerals appear only where they are the concept. Browse them live, with Pim's model sheet, the cast
and the prop library, in `visual-lab.html`.

Regenerate the sheets with `node scripts/create-visual-contact-sheets.js`.
