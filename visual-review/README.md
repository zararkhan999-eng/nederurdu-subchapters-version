# Visual review

The contact sheets in this folder contain the 99 regenerated visuals approved for app use.

The app temporarily keeps the original SVG for 53 concepts:

- 42 could not be generated because the image-generation account limit was reached.
- 11 generated candidates were rejected during contact-sheet review because the concept was wrong, ambiguous, or contained a letter-like symbol.

Pending IDs are exposed as `window.NEDERURDU_PENDING_VISUAL_IDS` in `word-visual-data.js`. Each pending record points explicitly to its SVG fallback, so exercises do not show broken or knowingly mismatched images.

Rejected candidates: `achter`, `baan`, `bellen`, `bsn`, `jongen`, `kaartje`, `letter-i`, `meisje`, `prijs`, `rooster`, `voor`.
