/* Zemlog prototip — ortak kabuk, ikonlar, mock veri, yardımcılar. Tüm sayfalar bunu yükler. */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------------- Icons (lucide) ---------------- */
const ICONS = {
  'layout-dashboard': '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  package: '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  invoice: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 10.5v8"/><path d="M14 12.5h-3a1.25 1.25 0 0 0 0 2.5h2a1.25 1.25 0 0 1 0 2.5h-3"/>',
  'life-buoy': '<circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  'file-down': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/>',
  'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  image: '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  'panel-left': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>',
  'building-2': '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  'arrow-left-right': '<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>',
  'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  'arrow-down': '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  calculator: '<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
  ban: '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
  house: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
  paperclip: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  headphones: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3v-7a9 9 0 0 1 18 0v7h-3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  'monitor-chart': '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="m7 12 3-3 2 2 5-5"/>',
  'circle-help': '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  'monitor-check': '<path d="m9 10 2 2 4-4"/><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M12 17v4"/><path d="M8 21h8"/>',
  'help-circle': '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
  'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  'map-pin': '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  'trash-2': '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  'file-up': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 12v6"/><path d="m15 15-3-3-3 3"/>',
  printer: '<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>',
  'file-spreadsheet': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/>',
  circle: '<circle cx="12" cy="12" r="10"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
  'alert-circle': '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  'alert-triangle': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>'
};
const icon = (name, cls = 'ic') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${cls}" aria-hidden="true">${ICONS[name] || ''}</svg>`;
const hydrateIcons = (root = document) => { $$('i[data-icon]', root).forEach(el => { el.outerHTML = icon(el.dataset.icon, el.className ? `ic ${el.className}` : 'ic'); }); };

const LOGO = `<svg viewBox="0 0 110 34" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Zemlog">
<path d="M4.98924 0L1.72505 0.951488C0.812751 1.22003 0.68905 2.4617 1.53125 2.90446L15.2245 10.071L20.035 7.81446L4.98924 0Z" fill="#0B7FAB"/>
<path d="M13.5154 12.0219L2.57031 6.25781V23.6665C2.57031 24.1809 2.8538 24.6536 3.30789 24.8958L12.1887 29.6342L12.316 25.7422L4.80674 21.9522L13.5159 12.0219H13.5154Z" fill="#69B1CD"/>
<path d="M9.25833 21.0009L12.4029 22.6781L12.0844 32.9393C12.0844 33.9073 13.2766 34.3676 13.927 33.6511L20.0338 27.7015V8.71094L9.25781 21.0009H9.25833Z" fill="#0B7FAB"/>
<path d="M36.6206 20.6083H42.0189V23.4444H31L37.0992 13.3986H32.0254V10.5625H42.686L36.6212 20.6083H36.6206Z" fill="currentColor"/>
<path d="M51.6217 13.3986H47.641V15.551H51.3993V18.3871H47.641V20.6083H51.6217V23.4444H44.293V10.5625H51.6217V13.3986Z" fill="currentColor"/>
<path d="M53.4492 23.4444L55.6359 10.5625H58.9501L61.5294 17.4305L64.0921 10.5625H67.4063L69.593 23.4444H66.2616L65.1514 16.0296L62.1106 23.4444H60.778L57.8908 16.0296L56.7806 23.4444H53.4492Z" fill="currentColor"/>
<path d="M75.0595 10.5625V20.6083H79.0741V23.4444H71.7109V10.5625H75.0595Z" fill="currentColor"/>
<path d="M79.9609 17.0029C79.9609 16.0462 80.1377 15.1551 80.4906 14.3295C80.8435 13.5039 81.3333 12.7831 81.9596 12.168C82.5859 11.553 83.3347 11.0717 84.206 10.7242C85.0772 10.3772 86.0365 10.2031 87.0845 10.2031C88.1325 10.2031 89.0773 10.3772 89.9544 10.7242C90.8316 11.0717 91.5857 11.553 92.2179 12.168C92.8502 12.7831 93.3427 13.5034 93.6956 14.3295C94.0485 15.1551 94.2252 16.0462 94.2252 17.0029C94.2252 17.9596 94.0485 18.8512 93.6956 19.6768C93.3422 20.5024 92.8502 21.2233 92.2179 21.8383C91.5857 22.4533 90.8311 22.9346 89.9544 23.2816C89.0773 23.6292 88.1206 23.8027 87.0845 23.8027C86.0483 23.8027 85.0772 23.6286 84.206 23.2816C83.3347 22.9346 82.5854 22.4533 81.9596 21.8383C81.3333 21.2233 80.8435 20.503 80.4906 19.6768C80.1377 18.8512 79.9609 17.9601 79.9609 17.0029ZM83.4636 17.0029C83.4636 17.5153 83.5603 17.988 83.7542 18.421C83.9476 18.8539 84.2097 19.2299 84.5401 19.5484C84.8704 19.8675 85.2545 20.1151 85.6933 20.2913C86.1316 20.468 86.5957 20.5561 87.0856 20.5561C87.5754 20.5561 88.0395 20.468 88.4778 20.2913C88.9161 20.1151 89.3034 19.867 89.6397 19.5484C89.9754 19.2299 90.2402 18.8539 90.4341 18.421C90.6275 17.988 90.7247 17.5153 90.7247 17.0029C90.7247 16.4905 90.628 16.0178 90.4341 15.5848C90.2402 15.1519 89.9754 14.7764 89.6397 14.4573C89.3034 14.1383 88.9161 13.8907 88.4778 13.7139C88.0395 13.5377 87.5749 13.4491 87.0856 13.4491C86.5962 13.4491 86.1316 13.5377 85.6933 13.7139C85.2545 13.8907 84.8704 14.1383 84.5401 14.4573C84.2097 14.7764 83.9476 15.1519 83.7542 15.5848C83.5603 16.0178 83.4636 16.4905 83.4636 17.0029Z" fill="currentColor"/>
<path d="M102.616 16.2332H109.262C109.262 16.9164 109.233 17.5374 109.176 18.0955C109.119 18.6536 109.006 19.1719 108.835 19.65C108.596 20.3225 108.271 20.9171 107.861 21.4354C107.451 21.9538 106.969 22.3862 106.417 22.7337C105.864 23.0813 105.259 23.3461 104.598 23.5282C103.937 23.7103 103.243 23.8016 102.514 23.8016C101.511 23.8016 100.597 23.6367 99.7716 23.3063C98.946 22.9765 98.237 22.5119 97.6445 21.914C97.0521 21.3162 96.5912 20.5986 96.2609 19.7617C95.9305 18.9243 95.7656 17.9993 95.7656 16.9857C95.7656 15.9721 95.9278 15.0638 96.2523 14.2264C96.5767 13.3895 97.0381 12.6745 97.6359 12.0821C98.2338 11.4901 98.9541 11.0287 99.7969 10.6984C100.64 10.368 101.579 10.2031 102.616 10.2031C103.96 10.2031 105.138 10.4937 106.152 11.0744C107.166 11.6556 107.969 12.5553 108.561 13.7741L105.383 15.0896C105.087 14.3838 104.703 13.8767 104.23 13.5694C103.757 13.2622 103.219 13.108 102.615 13.108C102.114 13.108 101.659 13.202 101.249 13.39C100.839 13.578 100.489 13.8455 100.198 14.1931C99.9081 14.5406 99.6798 14.959 99.5149 15.4489C99.35 15.9388 99.2672 16.4856 99.2672 17.0888C99.2672 17.6357 99.3381 18.1427 99.481 18.6095C99.6234 19.0768 99.8366 19.4808 100.122 19.8224C100.407 20.164 100.759 20.4288 101.181 20.6168C101.603 20.8048 102.092 20.8988 102.651 20.8988C102.98 20.8988 103.3 20.8623 103.607 20.7876C103.915 20.7141 104.191 20.5943 104.436 20.4288C104.681 20.2639 104.883 20.0507 105.042 19.788C105.201 19.5259 105.31 19.2068 105.366 18.8314H102.616V16.2342L102.616 16.2332Z" fill="currentColor"/>
</svg>`;
const FLAG_US = `<svg class="flag" viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#fff"/><g fill="#b22234"><rect width="20" height="1.08"/><rect y="2.15" width="20" height="1.08"/><rect y="4.31" width="20" height="1.08"/><rect y="6.46" width="20" height="1.08"/><rect y="8.62" width="20" height="1.08"/><rect y="10.77" width="20" height="1.08"/><rect y="12.92" width="20" height="1.08"/></g><rect width="8.5" height="7.5" fill="#3c3b6e"/></svg>`;

/* ---------------- Constants & helpers ---------------- */
const CATS = { shipment: 'Gönderi sorunu', tracking: 'Kargo Takip', customs: 'Gümrükte takıldı', delivery: 'Teslimata müdahale', billing: 'Fatura ve ödeme', account: 'Hesap ve erişim', tech: 'Teknik sorun', returns: 'İade talebi', other: 'Diğer' };
const STATUS = { open: 'Açık', awaiting: 'Yanıtınız bekleniyor', closed: 'Kapandı' };
const MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const MONTHS_SHORT = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
const MIN = 60e3, H = 3600e3, D = 86400e3;
const now = Date.now();
const pad = n => String(n).padStart(2, '0');
const fmtDate = t => { const d = new Date(t); return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };
const fmtTime = t => { const d = new Date(t); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
const fmtDay = t => { const d = new Date(t); return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; };
const fmtShort = t => { const d = new Date(t); return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}, ${fmtTime(t)}`; };
const fmtRel = t => { const diff = Date.now() - t; if (diff < MIN) return 'az önce'; if (diff < H) return `${Math.floor(diff / MIN)} dk önce`; if (diff < D) return `${Math.floor(diff / H)} sa önce`; return fmtDate(t); };
const parseTR = s => { const m = s.match(/(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2})/); return new Date(+m[3], +m[2] - 1, +m[1], +m[4], +m[5]).getTime(); };
/* bugüne göreli mock tarih: at(3,'09:14') → 3 gün önce 09:14 (prototip her açılışta güncel görünür) */
const at = (daysAgo, hm) => { const d = new Date(now - daysAgo * D); const [h, m] = hm.split(':').map(Number); d.setHours(h, m, 0, 0); return d.getTime(); };
const lower = s => String(s).toLocaleLowerCase('tr');
const sameDay = (a, b) => { const x = new Date(a), y = new Date(b); return x.getFullYear() === y.getFullYear() && x.getMonth() === y.getMonth() && x.getDate() === y.getDate(); };

/* seeded PRNG: the mock list is identical on every fresh load */
const mulberry32 = a => () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const rnd = mulberry32(20260924);
const pick = arr => arr[Math.floor(rnd() * arr.length)];
const between = (a, b) => a + rnd() * (b - a);
const digits = n => Array.from({ length: n }, () => Math.floor(rnd() * 10)).join('');
const upsNo = () => '1ZH28396' + digits(5);
const orderNo = () => 'ZM-' + digits(6);

/* ---------------- Mock data ---------------- */
const msg = (from, at, text, extra = {}) => ({ from, at, text, ...extra });
const AGENTS = ['Merve Kaya', 'Emre Yıldız', 'Zeynep Arslan', 'Burak Şahin'];
const DEST = [['ALİ CINAR', 'FR', 'PARIS'], ['JONAS WEBER', 'DE', 'BERLİN'], ['MARIE DUBOIS', 'FR', 'LYON'], ['LUCA ROSSI', 'IT', 'MİLANO'], ['EMMA JANSEN', 'NL', 'AMSTERDAM'], ['OLIVER SMITH', 'GB', 'LONDON'], ['SOFIA GARCIA', 'ES', 'MADRID']];
const ORIGIN_CITY = ['GAZİANTEP', 'İSTANBUL', 'İZMİR', 'BURSA', 'ANKARA'];
const SERVICES = ['UPS Express Saver', 'UPS Standard', 'UPS Expedited'];
const SHIP_STATUS = [['Manifest', 'warning'], ['Yolda', 'info'], ['Teslim edildi', 'success'], ['Gümrükte', 'warning'], ['İstisna', 'danger']];
const mkShipment = (tracking, o = {}) => ({
  id: o.id || String(3000 + Math.floor(rnd() * 900)),
  status: o.status || 'Yolda', kind: o.kind || 'info',
  from: { name: 'ZEMLOG', country: 'TR', city: o.city || pick(ORIGIN_CITY) },
  to: (() => { const d = o.to || pick(DEST); return { name: d[0], country: d[1], city: d[2] }; })(),
  service: o.service || pick(SERVICES), tracking
});

const fixed = [
  { id: 1042, cat: 'shipment', subject: 'Gönderi hasarlı teslim edildi', ref: '1ZH2839604589', status: 'open', agent: 'Emre Yıldız', updatedAt: now - 12 * MIN,
    shipment: mkShipment('1ZH2839604589', { id: '4128', status: 'Teslim edildi', kind: 'success', city: 'İSTANBUL', to: ['JONAS WEBER', 'DE', 'BERLİN'], service: 'UPS Standard' }),
    attachments: [{ name: 'hasar-foto-1.jpg', size: '2.1 MB', type: 'image' }, { name: 'hasar-foto-2.jpg', size: '1.8 MB', type: 'image' }],
    msgs: [
      msg('me', now - 2 * D - 3 * H, '1ZH2839604589 numaralı gönderimiz alıcıya hasarlı ulaştı. Kolinin köşesi ezilmiş, içindeki ürün kırık. İki fotoğraf ekliyorum.', { via: 'web' }),
      msg('sys', now - 2 * D - 3 * H + MIN, 'Talep durumu **Açık** olarak güncellendi'),
      msg('agent', now - 2 * D + H, 'Merhaba, üzgünüz. Hasar dosyası için ticari fatura ve en az dört fotoğraf gerekiyor.'),
      msg('me', now - 40 * MIN, 'Fotoğrafların ikisini yükledim, diğerlerini bugün ekleyeceğim.', { via: 'web' }),
      msg('agent', now - 12 * MIN, 'Dosyayı açtık. Ticari faturayı ve kalan iki fotoğrafı yüklediğinizde sağlayıcıya iletiyoruz.')
    ] },
  { id: 1041, cat: 'tracking', subject: '3710 numaralı gönderi teslimatta bekliyor', ref: '3710', status: 'open', agent: 'Merve Kaya', updatedAt: at(3, '09:26'),
    shipment: mkShipment('1ZXXXXXXXXXXXXETQS', { id: '3710', status: 'Manifest', kind: 'warning', city: 'GAZİANTEP', to: ['ALİ CINAR', 'FR', 'PARIS'], service: 'UPS Express Saver' }),
    attachments: [{ name: 'gonderi-3712-ekran.png', size: '1.3 MB', type: 'image' }],
    msgs: [
      msg('me', at(3, '09:14'), 'Merhaba, 3710 ID\'li gönderi 3 gündür "Manifest" durumunda görünüyor. Alıcı teslimat bekliyor, bilgi alabilir miyim?', { via: 'mail' }),
      msg('sys', at(3, '09:15'), 'Talep durumu **Açık** olarak güncellendi'),
      msg('agent', at(3, '09:21'), 'Merhaba, 3710 ID\'li gönderiyi inceliyoruz. Taşıyıcıyla iletişime geçtik, kısa süre içinde bilgi vereceğiz.'),
      msg('agent', at(3, '09:25'), 'Taşıyıcıdan dönüş aldık, gönderi bugün içinde tekrar hareket edecek. Yeni takip kaydını ekliyorum.'),
      msg('agent', at(3, '09:26'), '', { file: { name: '1ZXXXXXXXXXXXXETQS-takip.pdf', size: '135 KB', type: 'pdf' } })
    ] },
  { id: 1039, cat: 'customs', subject: 'Gümrük menşe belgesi istiyor', ref: '1ZH2839604298', status: 'awaiting', needs: 'menşe belgesi eksik', agent: 'Zeynep Arslan', updatedAt: at(2, '16:20'),
    shipment: mkShipment('1ZH2839604298', { id: '3688', status: 'Gümrükte', kind: 'warning', city: 'İZMİR', to: ['MARIE DUBOIS', 'FR', 'LYON'], service: 'UPS Express Saver' }),
    attachments: [],
    msgs: [
      msg('me', at(4, '11:05'), '1ZH2839604298 gönderisi gümrükte bekliyor, menşe belgesi istenmiş. Ne yapmamız gerekiyor?', { via: 'web' }),
      msg('sys', at(4, '11:06'), 'Talep durumu **Açık** olarak güncellendi'),
      msg('agent', at(4, '14:30'), 'Sağlayıcı A.TR veya menşe şahadetnamesi talep ediyor. Belgeyi bu talebe ekleyebilirsiniz, biz iletiriz.'),
      msg('agent', at(2, '16:20'), 'Ardiye 3. gününde, günlük yaklaşık 6,00 USD işliyor. Belgeyi bugün iletebilirseniz çekimi yarın yaptırabiliriz.'),
      msg('sys', at(2, '16:20'), 'Talep durumu **Yanıtınız bekleniyor** olarak güncellendi')
    ] },
  { id: 1031, cat: 'delivery', subject: 'Teslimat adresi değişikliği', ref: '1ZH2839604517', status: 'open', agent: 'Merve Kaya', updatedAt: at(8, '09:48'),
    shipment: mkShipment('1ZH2839604517', { id: '3641', status: 'Yolda', kind: 'info', city: 'BURSA', to: ['JONAS WEBER', 'DE', 'KÖLN'], service: 'UPS Standard' }),
    attachments: [],
    msgs: [
      msg('me', at(9, '17:12'), 'Alıcı taşındı, 1ZH2839604517 için yeni adres: Hauptstraße 12, 50667 Köln.', { via: 'mail' }),
      msg('sys', at(9, '17:13'), 'Talep durumu **Açık** olarak güncellendi'),
      msg('agent', at(8, '09:48'), 'Yeni adres sağlayıcıya iletildi, onay bekliyoruz. Bölge farkı çıkarsa bilgilendireceğiz.')
    ] },
  { id: 1024, cat: 'billing', subject: 'Ödememiz cari hesapta görünmüyor', ref: null, status: 'closed', agent: 'Burak Şahin', updatedAt: at(12, '15:37'),
    shipment: null,
    attachments: [{ name: 'dekont-havale.pdf', size: '88 KB', type: 'pdf' }],
    msgs: [
      msg('me', at(20, '10:20'), 'Geçen hafta havale ettik, dekontu ekledim. Bakiyede hâlâ görünmüyor.', { via: 'web' }),
      msg('me', at(20, '10:21'), '', { file: { name: 'dekont-havale.pdf', size: '88 KB', type: 'pdf' } }),
      msg('sys', at(20, '10:21'), 'Talep durumu **Açık** olarak güncellendi'),
      msg('agent', at(20, '13:05'), 'Dekontu muhasebeye ilettik, banka kaydıyla eşleştiriliyor.'),
      msg('agent', at(15, '11:40'), 'Ödeme cari hesabınıza işlendi, bakiye güncellendi.'),
      msg('me', at(12, '15:37'), 'Teşekkürler, bakiyede görünüyor. Kapatabilirsiniz.', { via: 'web' }),
      msg('sys', at(12, '15:37'), 'Talep durumu **Kapandı** olarak güncellendi')
    ] }
];

const TPL = [
  { cat: 'shipment', subject: 'Gönderi takip bilgisi güncellenmiyor', ref: 'ups', c1: '{ref} numaralı gönderi 5 gündür "Yolda" görünüyor, hiç hareket yok. Alıcı sormaya başladı, durumu öğrenebilir miyiz?', a1: 'Merhaba, sağlayıcıdan güncel tarama bilgisi talep ettik. 24 saat içinde dönüş yapacağız.', ask: 'Sağlayıcı alıcı telefon numarasının eksik olduğunu bildirdi. Güncel numarayı paylaşabilir misiniz?', c2: 'Teşekkürler, alıcı numarası +49 170 555 0198.', a2: 'Gönderi bugün teslim edildi, talebi kapatıyoruz. İyi çalışmalar.' },
  { cat: 'shipment', subject: 'Yanlış alıcıya teslim edildi', ref: 'ups', c1: '{ref} gönderimiz komşu adrese bırakılmış, alıcımız paketi bulamıyor.', a1: 'Sağlayıcıya araştırma dosyası açtık, kuryeyle iletişime geçiliyor.', ask: 'Kurye paketi kapı önüne bıraktığını belirtiyor. Alıcı bina görevlisine sorabilir mi? Sonucu paylaşırsanız dosyayı ilerletelim.', c2: 'Alıcı paketi bina görevlisinden aldı, sorun çözüldü.', a2: 'Bilgi için teşekkürler, talebi kapatıyoruz.' },
  { cat: 'tracking', subject: 'Gönderi kayıp bildirimi', ref: 'ups', c1: '{ref} 3 haftadır teslim edilmedi, son tarama Köln aktarma merkezi. Kayıp dosyası açabilir miyiz?', a1: 'Kayıp araştırması başlatıldı, sağlayıcı 5 iş günü içinde sonuç bildirecek.', ask: 'Tazmin süreci için ticari fatura ve içerik listesini yükleyebilir misiniz?', c2: 'Belgeleri ekledim.', a2: 'Tazmin onaylandı, tutar bir sonraki faturanızda alacak olarak görünecek. Talebi kapatıyoruz.' },
  { cat: 'customs', subject: 'Gümrükte ek vergi talebi', ref: 'ups', c1: '{ref} için alıcıdan 84 EUR ek vergi istenmiş. Beyan edilen değer 45 EUR idi, neden bu kadar yüksek?', a1: 'Beyanı inceledik; ürün HS kodu farklı sınıfa düşmüş görünüyor. Sağlayıcıyla itiraz sürecini başlattık.', ask: 'İtiraz için ürünün menşe bilgisini ve satın alma faturasını iletebilir misiniz?', c2: 'Fatura ekte, menşe Türkiye.', a2: 'İtiraz kabul edildi, vergi 12 EUR olarak düzeltildi. Talebi kapatıyoruz.' },
  { cat: 'customs', subject: 'HS kodu düzeltme talebi', ref: 'ups', c1: '{ref} gönderisinde HS kodunu yanlış girmişim, gümrükleme öncesi düzeltebilir miyiz?', a1: 'Gönderi henüz gümrüğe ulaşmadı, düzeltme talebini sağlayıcıya ilettik.', ask: 'Doğru HS kodunu ve ürün tanımını paylaşır mısınız?', c2: 'Doğru kod 6109.10, pamuklu tişört.', a2: 'HS kodu güncellendi, gümrükleme sorunsuz tamamlandı. Talebi kapatıyoruz.' },
  { cat: 'delivery', subject: 'Teslimat tarihi erteleme', ref: 'ups', c1: 'Alıcı 3 gün şehir dışında olacak, {ref} teslimatını haftaya erteleyebilir miyiz?', a1: 'Erteleme talebi sağlayıcıya iletildi, paket depoda bekletilecek.', ask: 'Sağlayıcı en fazla 5 gün bekletebiliyor. Yeni teslim tarihini netleştirir misiniz?', c2: 'Pazartesi uygun.', a2: 'Teslimat pazartesi gerçekleşti. Talebi kapatıyoruz.' },
  { cat: 'delivery', subject: 'Şubeden teslim seçeneği', ref: 'ups', c1: '{ref} alıcısı evde olamıyor, en yakın şubeden teslim alabilir mi?', a1: 'Sağlayıcıya şubeye yönlendirme talebi açtık.', ask: 'Yönlendirme için alıcının kimlik numarasının son 4 hanesi gerekiyor, paylaşabilir misiniz?', c2: 'Son 4 hane 4471.', a2: 'Paket şubeye yönlendirildi ve alıcı teslim aldı. Talebi kapatıyoruz.' },
  { cat: 'billing', subject: 'Fatura tutarı hatalı', ref: 'order', c1: '{ref} siparişine ait faturada 2 kg yerine 4 kg ücretlendirilmiş görünüyor.', a1: 'Sağlayıcı hacimsel ağırlık üzerinden ücretlendirmiş; ölçüleri kontrol ediyoruz.', ask: 'Kolinin en/boy/yükseklik ölçülerini iletebilir misiniz? Fotoğraf da olur.', c2: 'Ölçüler 30x20x15 cm, fotoğraf ekte.', a2: 'Fark faturası iptal edildi, düzeltilmiş fatura hesabınıza yüklendi. Talebi kapatıyoruz.' },
  { cat: 'billing', subject: 'Fatura iptali ve yeniden düzenleme', ref: 'order', c1: '{ref} faturasında vergi numaramız eksik, yeniden düzenlenebilir mi?', a1: 'Fatura iptal edildi, yeni fatura muhasebe onayında.', ask: 'Faturada görünmesini istediğiniz tam unvanı yazar mısınız?', c2: 'Deneme Organizasyon Dış Ticaret A.Ş.', a2: 'Yeni fatura düzenlendi ve Faturalar sayfasına yüklendi. Talebi kapatıyoruz.' },
  { cat: 'billing', subject: 'Cari hesap ekstresi talebi', ref: null, c1: 'Geçen aya ait cari hesap ekstresini alabilir miyiz?', a1: 'Ekstre hazırlanıyor, 1 iş günü içinde e-posta ile ileteceğiz.', ask: 'Ekstreyi hangi e-posta adresine göndermemizi istersiniz?', c2: 'muhasebe@denemeorg.com adresine lütfen.', a2: 'Ekstre gönderildi. Talebi kapatıyoruz.' },
  { cat: 'account', subject: 'Kullanıcı yetkisi güncelleme', ref: null, c1: 'Yeni muhasebe personelimizin yalnızca Faturalar sayfasını görmesini istiyoruz.', a1: 'Kullanıcı rolünü "Finans" olarak güncelledik.', ask: 'Hangi kullanıcı için işlem yapmamızı istersiniz? E-posta adresini paylaşır mısınız?', c2: 'ayse.demir@denemeorg.com', a2: 'Yetki güncellendi. Talebi kapatıyoruz.' },
  { cat: 'account', subject: 'API anahtarı yenileme', ref: null, c1: 'Entegrasyon anahtarımız sızmış olabilir, yenilemek istiyoruz.', a1: 'Mevcut anahtar iptal edildi, yeni anahtar API Uygulamaları sayfasında oluşturuldu.', ask: 'Güvenlik için işlemi yetkili kullanıcı hesabından onaylamanız gerekiyor. Onaylıyor musunuz?', c2: 'Onaylıyorum.', a2: 'Yeni anahtar aktif. Talebi kapatıyoruz.' },
  { cat: 'returns', subject: 'İade gönderisi oluşturma', ref: 'ups', c1: '{ref} alıcısı ürünü iade etmek istiyor, iade etiketi oluşturabilir misiniz?', a1: 'İade etiketi oluşturuldu ve alıcıya e-posta ile iletildi.', ask: 'İade adresi olarak hangi depoyu kullanmalıyız? İstanbul veya İzmir?', c2: 'İstanbul depo.', a2: 'İade teslim alındı. Talebi kapatıyoruz.' },
  { cat: 'other', subject: 'Etiket yazdırma sorunu', ref: 'order', c1: '{ref} etiketi PDF olarak boş geliyor, yazdıramıyoruz.', a1: 'Etiket yeniden oluşturuldu, indirip tekrar deneyebilirsiniz.', ask: 'Hangi tarayıcı ve sürümü kullanıyorsunuz? Ekran görüntüsü yardımcı olur.', c2: 'Chrome 128, ekran görüntüsü ekte.', a2: 'Sorun çözüldü. Talebi kapatıyoruz.' },
  { cat: 'other', subject: 'Fiyat hesaplama farkı', ref: null, c1: 'Fiyat hesaplama aracında çıkan tutar ile fatura tutarı arasında %8 fark var.', a1: 'Hesaplama aracı yakıt ek ücretini o gün için tahmini gösteriyor; fatura gerçekleşen oranı yansıtır.', ask: 'Karşılaştırdığınız gönderi numarasını paylaşır mısınız?', c2: '1ZH2839604102', a2: 'Açıklamayı ilettik, ek bir sorunuz yoksa talebi kapatıyoruz.' }
];

/* "Yanıtınız bekleniyor" durumundaki taleplerde müşteriden beklenen şey (kısa) */
const NEEDS = {
  'Gönderi takip bilgisi güncellenmiyor': 'alıcı telefonu eksik', 'Yanlış alıcıya teslim edildi': 'alıcı teyidi bekleniyor', 'Gönderi kayıp bildirimi': 'fatura ve içerik listesi eksik',
  'Gümrükte ek vergi talebi': 'menşe ve fatura eksik', 'HS kodu düzeltme talebi': 'doğru HS kodu bekleniyor', 'Teslimat tarihi erteleme': 'teslim tarihi bekleniyor', 'Şubeden teslim seçeneği': 'kimlik son 4 hane eksik',
  'Fatura tutarı hatalı': 'koli ölçüleri eksik', 'Fatura iptali ve yeniden düzenleme': 'unvan bilgisi bekleniyor', 'Cari hesap ekstresi talebi': 'e-posta adresi bekleniyor',
  'Kullanıcı yetkisi güncelleme': 'kullanıcı e-postası bekleniyor', 'API anahtarı yenileme': 'onay bekleniyor', 'İade gönderisi oluşturma': 'iade adresi bekleniyor',
  'Etiket yazdırma sorunu': 'tarayıcı bilgisi bekleniyor', 'Fiyat hesaplama farkı': 'gönderi numarası bekleniyor'
};

const anchors = [[1042, now], [1039, at(2, '16:20')], [1031, at(8, '09:48')], [1024, at(12, '15:37')], [1003, at(140, '09:00')]];
const timeFor = id => {
  for (let i = 0; i < anchors.length - 1; i++) {
    const [aId, aT] = anchors[i], [bId, bT] = anchors[i + 1];
    if (id < aId && id > bId) { const f = (aId - id) / (aId - bId); return aT - f * (aT - bT) - between(0, 4 * H); }
  }
  return anchors[anchors.length - 1][1];
};

const buildMock = () => {
  const list = fixed.map(t => JSON.parse(JSON.stringify(t)));
  for (let id = 1041; id >= 1004; id--) {
    if (fixed.some(f => f.id === id)) continue;
    const tpl = pick(TPL);
    const updatedAt = timeFor(id);
    const age = now - updatedAt;
    const status = age < 10 * D ? pick(['open', 'awaiting', 'closed', 'open', 'closed']) : (rnd() < 0.1 ? 'open' : 'closed');
    const ref = tpl.ref === 'ups' ? upsNo() : tpl.ref === 'order' ? orderNo() : null;
    const t = s => s.replace('{ref}', ref || '');
    const via = () => ({ via: rnd() < 0.3 ? 'mail' : 'web' });
    const sysOpen = at => msg('sys', at + MIN, 'Talep durumu **Açık** olarak güncellendi');
    let msgs;
    if (status === 'awaiting') {
      const c1 = updatedAt - between(1 * D, 4 * D);
      msgs = [msg('me', c1, t(tpl.c1), via()), sysOpen(c1), msg('agent', c1 + between(1 * H, 6 * H), t(tpl.a1)), msg('agent', updatedAt, t(tpl.ask)), msg('sys', updatedAt, 'Talep durumu **Yanıtınız bekleniyor** olarak güncellendi')];
    } else if (status === 'open') {
      const c1 = updatedAt - between(4 * H, 3 * D);
      msgs = rnd() < 0.5
        ? [msg('me', c1, t(tpl.c1), via()), sysOpen(c1), msg('agent', updatedAt, t(tpl.a1))]
        : [msg('me', c1, t(tpl.c1), via()), sysOpen(c1), msg('agent', c1 + between(1 * H, 6 * H), t(tpl.ask)), msg('me', updatedAt, t(tpl.c2), via())];
    } else {
      const c1 = updatedAt - between(2 * D, 6 * D);
      msgs = [msg('me', c1, t(tpl.c1), via()), sysOpen(c1), msg('agent', c1 + 2 * H, t(tpl.a1)), msg('agent', c1 + 1 * D, t(tpl.ask)), msg('me', c1 + 1.5 * D, t(tpl.c2), via()), msg('agent', updatedAt, t(tpl.a2)), msg('sys', updatedAt, 'Talep durumu **Kapandı** olarak güncellendi')];
    }
    const [sName, sKind] = pick(SHIP_STATUS);
    const shipment = tpl.ref === 'ups' ? mkShipment(ref, { status: sName, kind: sKind }) : null;
    const attachments = rnd() < 0.4 ? [{ name: `gonderi-${shipment ? shipment.id : digits(4)}-ekran.png`, size: `${(0.4 + rnd() * 2).toFixed(1)} MB`, type: 'image' }] : [];
    list.push({ id, cat: tpl.cat, subject: tpl.subject, ref, status, needs: status === 'awaiting' ? NEEDS[tpl.subject] || null : null, agent: pick(AGENTS), updatedAt, shipment, attachments, msgs });
  }
  return list;
};

/* ---------------- Store (sessionStorage: sayfalar arası tutarlılık) ---------------- */
const KEY = 'zemlog.proto.tickets.v4';
if (new URLSearchParams(location.search).has('reset')) { try { sessionStorage.removeItem(KEY); } catch (e) { /* ignore */ } }
let tickets = null;
try { const raw = sessionStorage.getItem(KEY); if (raw) { const arr = JSON.parse(raw); if (Array.isArray(arr) && arr.length) tickets = arr; } } catch (e) { /* ignore */ }
if (!tickets) tickets = buildMock();
const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(tickets)); } catch (e) { /* ignore */ } };
save();

const byId = id => tickets.find(t => t.id === id);
const lastMsg = t => [...t.msgs].reverse().find(m => m.from !== 'sys' && (m.text || m.file)) || t.msgs[t.msgs.length - 1];
const previewText = m => m.file ? `📎 ${m.file.name}` : m.text;
const ticketNo = t => `#DT-${t.id}`;
const awaitingCount = () => tickets.filter(t => t.status === 'awaiting').length;
const nextId = () => Math.max(...tickets.map(t => t.id)) + 1;

/* ---------------- Toast & confirm ---------------- */
const toast = (text, type = 'success') => {
  const wrap = $('#toasts');
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = icon(type === 'success' ? 'check-circle' : 'info') + `<span>${esc(text)}</span>`;
  wrap.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 250); }, 3200);
};

let confirmResolve = null;
const confirmDialog = ({ title, text, yes = 'Onayla' }) => new Promise(resolve => {
  $('#confirmTitle').textContent = title;
  $('#confirmText').textContent = text;
  $('#confirmYes').textContent = yes;
  confirmResolve = resolve;
  $('#confirmModal').classList.add('show');
  $('#confirmNo').focus();
});
const settleConfirm = v => { $('#confirmModal').classList.remove('show'); if (confirmResolve) { confirmResolve(v); confirmResolve = null; } };

/* Ortak aksiyon: talebi kapat (onay + sistem mesajı) */
const closeTicket = async (id, onDone) => {
  const t = byId(id);
  if (!t || t.status === 'closed') return false;
  const ok = await confirmDialog({ title: 'Talebi kapat', text: `${ticketNo(t)} numaralı talebi kapatmak istediğinize emin misiniz? Kapatılan talebe yanıt yazılamaz; gerekirse yeni talep oluşturabilirsiniz.`, yes: 'Talebi Kapat' });
  if (!ok) return false;
  t.status = 'closed';
  t.updatedAt = Date.now();
  t.msgs.push(msg('sys', t.updatedAt, 'Talep durumu **Kapandı** olarak güncellendi (sizin tarafınızdan)'));
  save();
  toast(`${ticketNo(t)} kapatıldı.`, 'info');
  if (onDone) onDone(t);
  return true;
};

/* Ortak aksiyon: yeni talep oluştur (sihirbazın son adımı ve hızlı form bunu çağırır) */
const isImage = name => /\.(png|jpe?g|gif|webp)$/i.test(name);
const createTicket = ({ cat = 'other', subject, ref = null, text = '', files = [], shipment = null }) => {
  const id = nextId();
  const at = Date.now();
  const msgs = [msg('me', at, text, { via: 'web' })];
  files.forEach((f, i) => msgs.push(msg('me', at + i + 1, '', { file: { name: f.name, size: f.size || '—', type: isImage(f.name) ? 'image' : 'pdf' } })));
  msgs.push(msg('sys', at + 1000, 'Talep durumu **Açık** olarak güncellendi'));
  const t = { id, cat, subject, ref, status: 'open', needs: null, agent: 'Merve Kaya', updatedAt: at, shipment, attachments: files.map(f => ({ name: f.name, size: f.size || '—', type: isImage(f.name) ? 'image' : 'pdf' })), msgs };
  tickets.unshift(t);
  save();
  return t;
};

/* ---------------- Shell (sidebar + header + modals) ---------------- */
const NAV = [
  { key: 'dashboard', label: 'Gösterge Paneli', icon: 'layout-dashboard', href: '#' },
  { section: 'Operasyon' },
  { key: 'shipments', label: 'Gönderiler', icon: 'truck', href: 'index.html' },
  { key: 'import', label: 'Tek Nokta İthalat', icon: 'package', href: '#' },
  { key: 'invoices', label: 'Faturalar', icon: 'invoice', href: '#' },
  { section: 'Destek & Talep' },
  { key: 'support', label: 'Destek Taleplerim', icon: 'life-buoy', href: '../destek-talepleri/index.html', badge: true },
  { section: 'Diğer' },
  { key: 'org', label: 'Organizasyon Ayarları', icon: 'settings', open: true, children: [
    { key: 'org-org', label: 'Organizasyon', href: '#' },
    { key: 'org-addresses', label: 'Gönderim Adresleri', href: '#' },
    { key: 'org-users', label: 'Kullanıcılar', href: '#' },
    { key: 'org-api', label: 'API Uygulamaları', href: '#' }
  ] },
  { key: 'files', label: 'Dosya İşlemleri', icon: 'file-down', href: '#' }
];

const navItemHtml = (item, active) => {
  if (item.section) return `<div class="nav-section"><span>${esc(item.section)}</span><span class="dots"><i></i><i></i><i></i></span></div>`;
  if (item.children) {
    return `<div class="nav-group ${item.open ? 'open' : ''}">
      <button type="button" class="nav-item" data-toggle-group><span class="slot">${icon(item.icon)}</span><span class="nav-label">${esc(item.label)}</span>${icon('chevron-right', 'ic nav-chev')}</button>
      <div class="nav-sub">${item.children.map(c => `<a href="${c.href}" class="nav-item ${c.key === active ? 'active' : ''}"><span class="slot"><span class="bullet"></span></span><span class="nav-label">${esc(c.label)}</span></a>`).join('')}</div>
    </div>`;
  }
  const badge = item.badge ? `<span class="nav-badge" id="navBadge" ${awaitingCount() ? '' : 'hidden'}>${awaitingCount()}</span>` : '';
  return `<a href="${item.href}" class="nav-item ${item.key === active ? 'active' : ''}"><span class="slot">${icon(item.icon)}</span><span class="nav-label">${esc(item.label)}</span>${badge}</a>`;
};

const renderShell = (active = 'support') => {
  const sidebar = $('#sidebar');
  sidebar.innerHTML = `
    <div class="sb-head">
      <a href="index.html" class="logo" aria-label="Zemlog">${LOGO}</a>
      <button class="sb-toggle" id="sbToggle" type="button" title="Menüyü daralt" aria-label="Menüyü daralt">${icon('panel-left')}</button>
    </div>
    <nav class="nav">${NAV.map(i => navItemHtml(i, active)).join('')}</nav>`;
  $('#header').innerHTML = `
    <div class="hdr-left">
      <button class="menu-btn" id="menuBtn" type="button" aria-label="Menüyü aç">${icon('menu')}</button>
      <div class="org">
        ${icon('building-2', 'ic org-icon')}
        <div class="org-text">
          <span class="org-name">DENEME ORGANIZASYON</span>
          <span class="org-code">Kod: D1TVOJ <button class="copy-btn" id="copyCode" type="button" title="Kodu kopyala">${icon('copy')}</button></span>
        </div>
        <button class="org-switch" type="button" title="Organizasyon değiştir" aria-label="Organizasyon değiştir">${icon('arrow-left-right')}</button>
      </div>
    </div>
    <div class="hdr-right">
      <button class="ghost-btn" type="button" title="Fiyat hesapla" aria-label="Fiyat hesapla">${icon('calculator')}</button>
      <div class="hdr-cur"><span class="vdiv"></span><div class="cur"><span class="cur-top">${FLAG_US} US dollar</span><span class="cur-val">44.8541₺</span></div><span class="vdiv"></span></div>
      <button class="avatar" type="button" title="Samet Kemerkaya" aria-label="Hesap menüsü">SA</button>
    </div>`;
  if (!$('#navScrim')) { const s = document.createElement('div'); s.className = 'nav-scrim'; s.id = 'navScrim'; sidebar.insertAdjacentElement('afterend', s); }
  if (!$('#toasts')) { const t = document.createElement('div'); t.className = 'toasts'; t.id = 'toasts'; document.body.appendChild(t); }
  if (!$('#confirmModal')) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="modal" id="confirmModal"><div class="modal-box sm" role="alertdialog">
        <div class="modal-body"><div class="confirm-row"><div class="warn-ico">${icon('alert-triangle')}</div><div><h2 class="modal-title" id="confirmTitle" style="margin-bottom:6px"></h2><p id="confirmText"></p></div></div></div>
        <div class="modal-foot"><button type="button" class="btn btn-ghost" id="confirmNo">Vazgeç</button><button type="button" class="btn btn-danger" id="confirmYes">Onayla</button></div>
      </div></div>`);
    $('#confirmYes').addEventListener('click', () => settleConfirm(true));
    $('#confirmNo').addEventListener('click', () => settleConfirm(false));
    $('#confirmModal').addEventListener('click', e => { if (e.target.id === 'confirmModal') settleConfirm(false); });
  }
  hydrateIcons();

  const app = $('#app');
  $('#sbToggle').addEventListener('click', () => app.classList.toggle('collapsed'));
  $('#menuBtn').addEventListener('click', () => app.classList.add('nav-open'));
  $('#navScrim').addEventListener('click', () => app.classList.remove('nav-open'));
  $$('[data-toggle-group]').forEach(b => b.addEventListener('click', () => { app.classList.remove('collapsed'); b.parentElement.classList.toggle('open'); }));
  $('#copyCode').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText('D1TVOJ'); toast('Organizasyon kodu kopyalandı.', 'info'); }
    catch (e) { toast('Kopyalama desteklenmiyor.', 'info'); }
  });
  document.addEventListener('click', e => { const a = e.target.closest('a[href="#"]'); if (a) e.preventDefault(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('#confirmModal').classList.contains('show')) settleConfirm(false); });
};

const refreshBadge = () => { const b = $('#navBadge'); if (!b) return; const n = awaitingCount(); b.textContent = n; b.hidden = n === 0; };

/* "Açık Talepleriniz" paneli — oluşturma sayfalarının sağ sütunu (.card.open-panel içine basılır) */
const ageText = t => { const days = Math.floor((Date.now() - t.msgs[0].at) / D); return days < 1 ? 'bugün' : `${days} gün`; };
const openPanelHtml = (limit = 5) => {
  const list = tickets.filter(t => t.status !== 'closed').sort((a, b) => b.updatedAt - a.updatedAt);
  const shown = list.slice(0, limit);
  const items = shown.map(t => {
    const title = (t.shipment && t.shipment.tracking) || t.ref || t.subject;
    const awaiting = t.status === 'awaiting';
    const sub = awaiting ? `Müşteri bekleniyor${t.needs ? ' · ' + esc(t.needs) : ''}` : (t.shipment ? 'UPS bekleniyor' : 'Temsilci inceliyor');
    return `<a class="open-item ${awaiting ? 'awaiting' : ''}" href="../destek-talepleri/destek-talep-detay.html?id=${t.id}" title="${ticketNo(t)} · ${esc(t.subject)}">
      <span class="dot"></span>
      <span class="txt"><span class="ttl">${esc(title)}</span><span class="sub">${sub}</span></span>
      <span class="age">${ageText(t)}</span>
    </a>`;
  }).join('');
  return `<h3>Açık Talepleriniz</h3>${items || '<div class="none">Açık talebiniz bulunmuyor.</div>'}${list.length > shown.length ? `<a class="more" href="../destek-talepleri/index.html">Tüm açık talepler (${list.length})</a>` : ''}`;
};

window.Proto = {
  $, $$, esc, icon, hydrateIcons,
  CATS, STATUS, MIN, H, D,
  fmtDate, fmtTime, fmtDay, fmtShort, fmtRel, lower, sameDay,
  tickets, byId, lastMsg, previewText, ticketNo, nextId, msg, save, awaitingCount, refreshBadge,
  toast, confirmDialog, closeTicket, createTicket, renderShell, openPanelHtml
};
})();
