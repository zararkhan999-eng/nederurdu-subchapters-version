/* Brand marks built from Pim's head: the app icon (web, Play store, Android adaptive layers) and the
   feature graphic. Pim's orange fur sits on brand blue so the mark reads at launcher size. */
(function (root, factory) {
  const node = typeof module === "object" && module.exports;
  const api = factory(node ? require("./kit.js") : root.PimArt);
  if (node) module.exports = api;
  else root.PimBrand = api;
})(typeof self !== "undefined" ? self : this, (K) => {
  const { C, parts } = K;
  const BG = C.blue;
  // Pim's head with a strip of red scarf under the chin, centred on (0,0), about 110 wide at s=1.
  const head = ({ mood = "happy" } = {}) =>
    `<g transform="translate(-139 -40)">${K.soft("M112 70q30 14 56 0l2 12q-30 14-60 0Z", C.scarfShade, 4)}${K.soft("M113 66q28 12 54 0l1.4 9q-28 13-56.4 0Z", C.scarf, 4)}${parts.head({ mood })}</g>`;
  // White silhouette for Android's themed (monochrome) icon.
  const silhouette = () => `<g transform="translate(-139 -40)" fill="#fff">
    <path d="M116 32L113 9L134 23Z" stroke="#fff" stroke-width="7" stroke-linejoin="round"/><path d="M150 22L170 8L168 33Z" stroke="#fff" stroke-width="7" stroke-linejoin="round"/>
    <ellipse cx="140" cy="45.5" rx="30" ry="26"/><path d="M113 50L102 55L113 58L105 64L118 62Z" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>
    <path d="M113 66q28 12 54 0l1.4 9q-28 13-56.4 0Z" stroke="#fff" stroke-width="4" stroke-linejoin="round"/></g>`;

  // Full icon on a square: `rounded` for the web icon; Play applies its own mask so it gets a plain square.
  function icon({ rounded = true, size = 192 } = {}) {
    const bg = rounded ? K.rect(0, 0, 192, 192, 42, BG) : K.rect(0, 0, 192, 192, 0, BG);
    const glow = K.circ(96, 104, 74, K.tint(BG, 0.18));
    return K.svg(192, 192, bg + glow + K.g(head(), { x: 96, y: 98, s: 1.42 }), "NederUrdu").replace('width="192" height="192"', `width="${size}" height="${size}"`);
  }
  // Android adaptive layers on the 108dp canvas: keep the mark inside the 66dp safe circle.
  function adaptiveForeground() { return K.svg(108, 108, K.g(head(), { x: 54, y: 56, s: 0.64 })); }
  function adaptiveMonochrome() {
    const holes = `<g transform="translate(-139 -40)" fill="#000"><ellipse cx="131" cy="42" rx="5" ry="6.4"/><ellipse cx="157" cy="41" rx="4.6" ry="6"/><path d="M142.6 51h7.6l-3.8 3.6Z"/></g>`;
    const mask = `<mask id="pim-mono"><rect width="108" height="108" fill="#fff"/>${K.g(holes, { x: 54, y: 56, s: 0.64 })}</mask>`;
    return K.svg(108, 108, `${mask}<g mask="url(#pim-mono)">${K.g(silhouette(), { x: 54, y: 56, s: 0.64 })}</g>`);
  }

  return { BG, head, icon, adaptiveForeground, adaptiveMonochrome };
});
