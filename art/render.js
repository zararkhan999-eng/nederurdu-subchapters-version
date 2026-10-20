/* Combines the word-picture sets into one renderer: renderWord(id, kind) → standalone SVG markup. */
(function (root, factory) {
  const node = typeof module === "object" && module.exports;
  const K = node ? require("./kit.js") : root.PimArt;
  const ctx = (node ? require("./cast.js") : root.PimCast)();
  const sets = node ? ["objects", "people", "actions", "foundations"].map((s) => require(`./words-${s}.js`)) : root.PimWordSets || [];
  const api = factory(K, ctx, sets);
  if (node) module.exports = api;
  else root.PimWords = api;
})(typeof self !== "undefined" ? self : this, (K, ctx, sets) => {
  const words = Object.assign({}, ...sets.map((set) => set(ctx)));
  function renderWord(id, kind = "object", title = "") {
    const draw = words[id];
    if (!draw) return null;
    const out = draw();
    const { body, sky } = typeof out === "string" ? { body: out } : out;
    return K.card(kind, body, { sky, title });
  }
  return { words, renderWord, ids: Object.keys(words) };
});
