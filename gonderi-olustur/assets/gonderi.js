/* Zemlog prototip — Yeni Gönderi akışı (tamamen mock veri) */
(() => {
'use strict';
const P = window.Proto;
const { $, $$, esc, icon, toast } = P;
P.renderShell('shipments');

/* ---------------- Mock veri ---------------- */
const RATE = { TRY: 1, USD: 44.8541, EUR: 52.3610, GBP: 60.1175 };
const COUNTRIES = [
  { cc: 'DE', name: 'Almanya', dial: '+49' },
  { cc: 'US', name: 'Amerika Birleşik Devletleri', dial: '+1' },
  { cc: 'GB', name: 'Birleşik Krallık', dial: '+44' },
  { cc: 'FR', name: 'Fransa', dial: '+33' },
  { cc: 'NL', name: 'Hollanda', dial: '+31' }
];
const ADDRS = {
  DE: [['Alexanderplatz 1', '10178', 'Berlin', 'Berlin'], ['Alexanderstraße 3', '10178', 'Berlin', 'Berlin'], ['Friedrichstraße 43', '10117', 'Berlin', 'Berlin'], ['Karl-Marx-Allee 78', '10243', 'Berlin', 'Berlin'], ['Schlossplatz 1', '70173', 'Stuttgart', 'Baden-Württemberg'], ['Marienplatz 8', '80331', 'München', 'Bayern'], ['Königsallee 60', '40212', 'Düsseldorf', 'Nordrhein-Westfalen'], ['Jungfernstieg 7', '20354', 'Hamburg', 'Hamburg'], ['Hohe Straße 52', '50667', 'Köln', 'Nordrhein-Westfalen']],
  US: [['350 5th Ave', '10118', 'New York', 'New York'], ['200 Park Ave', '10166', 'New York', 'New York'], ['1 Market St', '94105', 'San Francisco', 'California'], ['1600 Amphitheatre Pkwy', '94043', 'Mountain View', 'California'], ['233 S Wacker Dr', '60606', 'Chicago', 'Illinois'], ['100 Biscayne Blvd', '33132', 'Miami', 'Florida']],
  GB: [['10 Downing St', 'SW1A 2AA', 'London', 'England'], ['221B Baker St', 'NW1 6XE', 'London', 'England'], ['1 Deansgate', 'M3 1AZ', 'Manchester', 'England']],
  FR: [['5 Av. Anatole France', '75007', 'Paris', 'Île-de-France'], ['12 Rue de Rivoli', '75004', 'Paris', 'Île-de-France'], ['1 Place Bellecour', '69002', 'Lyon', 'Auvergne-Rhône-Alpes']],
  NL: [['Damrak 1', '1012 LG', 'Amsterdam', 'Noord-Holland'], ['Coolsingel 40', '3011 AD', 'Rotterdam', 'Zuid-Holland']]
};
const GEO = {
  DE: { 'Berlin': { 'Berlin': ['Mitte', 'Kreuzberg', 'Charlottenburg', 'Prenzlauer Berg'] }, 'Bayern': { 'München': ['Altstadt', 'Schwabing', 'Maxvorstadt'], 'Nürnberg': ['Altstadt', 'Gostenhof'] }, 'Baden-Württemberg': { 'Stuttgart': ['Mitte', 'West', 'Bad Cannstatt'] }, 'Hamburg': { 'Hamburg': ['Altona', 'Eimsbüttel', 'St. Pauli'] }, 'Nordrhein-Westfalen': { 'Düsseldorf': ['Altstadt', 'Oberkassel'], 'Köln': ['Innenstadt', 'Ehrenfeld'] } },
  US: { 'New York': { 'New York': ['Manhattan', 'Brooklyn', 'Queens'] }, 'California': { 'San Francisco': ['SoMa', 'Mission'], 'Mountain View': ['Downtown'] }, 'Illinois': { 'Chicago': ['Loop', 'River North'] }, 'Florida': { 'Miami': ['Downtown', 'Brickell'] } },
  GB: { 'England': { 'London': ['Westminster', 'Camden', 'Greenwich'], 'Manchester': ['City Centre', 'Salford'] } },
  FR: { 'Île-de-France': { 'Paris': ['1er', '4e', '7e'] }, 'Auvergne-Rhône-Alpes': { 'Lyon': ['2e', '6e'] } },
  NL: { 'Noord-Holland': { 'Amsterdam': ['Centrum', 'Zuid'] }, 'Zuid-Holland': { 'Rotterdam': ['Centrum', 'Kralingen'] } }
};
const TR = { 'İstanbul': ['Beşiktaş', 'Kadıköy', 'Sarıyer', 'Şişli', 'Ümraniye'], 'Ankara': ['Çankaya', 'Keçiören', 'Yenimahalle'], 'İzmir': ['Bornova', 'Karşıyaka', 'Konak'], 'Gaziantep': ['Şahinbey', 'Şehitkamil'], 'Bursa': ['Nilüfer', 'Osmangazi'] };
const ORIGINS = ['Türkiye', 'Almanya', 'Arjantin', 'Amerika Birleşik Devletleri', 'Çin', 'Fransa', 'Hindistan', 'İtalya'];
const UNITS = ['Adet', 'Kg', 'Metre', 'Litre', 'Çift', 'Set'];
const FEES = { invoice: Math.round(5 * RATE.USD), fast: 113, sign: 113, insPct: 0.02 };

const UPS = '<svg viewBox="0 0 24 28" width="18" height="21" aria-hidden="true"><path d="M12 1C7 1 3.2 1.9 1 3v13.2C1 22 6 25.2 12 27c6-1.8 11-5 11-10.8V3C20.8 1.9 17 1 12 1z" fill="#351c15"/><text x="12" y="17.5" font-size="8.6" font-weight="700" text-anchor="middle" fill="#ffb500" font-family="Arial,sans-serif">ups</text></svg>';
const IMG = n => `assets/icons/${n}.svg`;

/* ---------------- Durum ---------------- */
const newPkg = () => ({ w: '', l: '', h: '', kg: '', qty: '', ref: '' });
const S = {
  mode: 'paket', open: 1, done: { 1: false, 2: false, 3: false },
  senders: [
    { id: 's1', name: 'NERODA BIJUTERI IC VE DIS TICARET', tag: 'Kurumsal', city: 'İstanbul', addr: 'MASLAK MAH. BÜYÜKDERE CAD. NO 237 SARIYER İSTANBUL 34485' },
    { id: 's2', name: 'NERODA BIJUTERI IC VE DIS TICARET', tag: 'Bireysel', city: 'Gaziantep', addr: 'FATIH MAH MARASEL FEVZI CAK BULVARI NO 53 · GAZIANTEP SEHITKAMIL 27000' }
  ],
  senderId: 's1',
  rc: { cc: '', addr: null, query: '', name: '', company: '', phone: '', email: '', bill: null },
  type: null, pkgs: [newPkg()], svc: null, comment: '',
  c: { prepaid: false, kime: 'none', taxId: '', inv: null, cur: '', items: [], draft: { desc: '', hs: '', origin: '', unit: '', qty: '', price: '' }, sale: 'satis', cargo: 'haric', freight: '', invFile: null, fast: false, etgb: false, etgbFile: null, sign: false, ins: false, insVal: '', insCur: 'USD', cacc: false, caccNo: '', caccZip: '' }
};

/* ---------------- Yardımcılar ---------------- */
const num = v => { const n = parseFloat(String(v).replace(',', '.')); return isFinite(n) ? n : 0; };
const TL = n => `${Math.round(n).toLocaleString('tr-TR')} TL`;
const money = (n, cur) => `${(Math.round(n * 100) / 100).toLocaleString('tr-TR', { maximumFractionDigits: 2 })} ${cur}`;
const kgFmt = n => n.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const country = () => COUNTRIES.find(c => c.cc === S.rc.cc) || null;
const sender = () => S.senders.find(s => s.id === S.senderId) || null;
const fromTxt = () => { const s = sender(); return s ? `${s.city}, Türkiye` : 'Nereden ?'; };
const toTxt = () => { const c = country(); return S.rc.addr && c ? `${S.rc.addr.city}, ${c.name}` : (c ? c.name : 'Nereye ?'); };
const hasStep3 = () => S.type === 'paket';
const stepCount = () => (S.type === 'zarf' ? 2 : 3);

const pkgOk = p => num(p.w) > 0 && num(p.l) > 0 && num(p.h) > 0 && num(p.kg) > 0 && num(p.qty) >= 1;
const volKg = p => (num(p.w) * num(p.l) * num(p.h)) / 5000;
const roundHalf = n => Math.ceil(n * 2) / 2;
const totals = () => {
  if (S.type === 'zarf') return { koli: 1, real: 0.5, charge: 0.5 };
  const ok = S.pkgs.filter(pkgOk);
  const koli = ok.reduce((a, p) => a + Math.floor(num(p.qty)), 0);
  const real = ok.reduce((a, p) => a + num(p.kg) * Math.floor(num(p.qty)), 0);
  const charge = roundHalf(ok.reduce((a, p) => a + Math.max(num(p.kg), volKg(p)) * Math.floor(num(p.qty)), 0));
  return { koli, real, charge };
};

/* Servis fiyatları: bileşenler tamsayıya yuvarlanır, toplam = bileşenlerin toplamı */
const SVC_DEF = [
  { id: 'eko', name: 'Ekonomik', days: '4–6 iş günü', carrier: 'UPS Expedited', base: 900, perKg: 140 },
  { id: 'hizli', name: 'Hızlı', days: '2–3 iş günü', carrier: 'UPS Express Saver', base: 1150, perKg: 175, badge: 'Önerilen' },
  { id: 'express', name: 'Express', days: '1–2 iş günü', carrier: 'UPS Worldwide Express', base: 1500, perKg: 215 }
];
const build = (def, tasima, customs) => {
  const yakit = Math.round(tasima * 0.18);
  const gumruk = customs ? 360 : 0;
  const sezon = Math.round(tasima * 0.03);
  const kdv = Math.round((tasima + yakit + gumruk + sezon) * 0.2);
  const parts = [['Taşıma bedeli', tasima], ['Yakıt bedeli', yakit]];
  if (customs) parts.push(['Gümrük işlem bedeli', gumruk]);
  parts.push(['Uzak alan bedeli', 0], ['Yoğun sezon bedeli', sezon]);
  return { ...def, parts, kdv, total: parts.reduce((a, p) => a + p[1], 0) + kdv };
};
const services = () => {
  if (S.type === 'zarf') {
    return [{ id: 'zarf', name: 'Evrak / Zarf', days: '4–6 iş günü', carrier: 'UPS Worldwide Express Envelope', parts: [['Taşıma bedeli', 440], ['Yakıt bedeli', 82], ['Uzak alan bedeli', 0]], kdv: 105, total: 627 }];
  }
  const W = totals().charge;
  if (!W) return [];
  return SVC_DEF.map(d => build(d, Math.round(d.base + d.perKg * W), true));
};
const curSvc = () => services().find(s => s.id === S.svc) || null;

const itemsTotal = () => S.c.items.reduce((a, it) => a + it.qty * it.price, 0);
const declaredTL = () => {
  if (S.c.inv === 'sistem') return S.c.cur ? itemsTotal() * RATE[S.c.cur] : 0;
  return num(S.c.insVal) * RATE[S.c.insCur];
};
const extras = () => {
  if (!hasStep3()) return [];
  const c = S.c, out = [];
  if (c.inv === 'yukle') out.push(['Ticari fatura işlem bedeli', FEES.invoice]);
  if (c.fast) out.push(['Gümrükte hızlı geçiş', FEES.fast]);
  if (c.sign) out.push(['İmzalı teslimat', FEES.sign]);
  if (c.ins && declaredTL() > 0) out.push(['Sigorta', Math.round(declaredTL() * FEES.insPct)]);
  return out;
};
const grandTotal = () => { const s = curSvc(); return s ? s.total + extras().reduce((a, e) => a + e[1], 0) : 0; };

/* ---------------- Adım kabuğu ---------------- */
const STEPS = {
  1: { title: 'Nereden nereye gönderiyorsun?' },
  2: { title: 'Ne gönderiyorsun, ne kadara gidiyor?' },
  3: { title: 'Ticari fatura ve ek servisler' }
};
const stepSub = n => {
  if (n === 1) return `${fromTxt()} → ${toTxt()}`;
  if (n === 2) {
    const s = curSvc(), t = totals();
    if (!S.done[2] || !s) return 'Gönderi tipi, koliler ve fiyat';
    return `${S.type === 'zarf' ? 'Evrak / Zarf' : 'Paket / Çoklu Paket'} · ${t.koli} koli · ${kgFmt(t.charge)} kg · ${s.name} · ${TL(s.total)}`;
  }
  if (!S.done[3]) return 'Fatura yöntemi, ürün beyanı ve ek servisler';
  const c = S.c, bits = [c.inv === 'sistem' ? `Sistem faturası · ${c.items.length} ürün` : 'Fatura yüklendi'];
  const ex = [c.etgb && 'ETGB', c.sign && 'İmzalı teslimat', c.ins && 'Sigorta', c.cacc && 'Gümrük hesabı'].filter(Boolean);
  bits.push(ex.length ? ex.join(', ') : 'Ek servis yok');
  return bits.join(' · ');
};
const head = n => {
  const done = S.done[n] && S.open !== n;
  return `<button type="button" class="st-head" data-toggle="${n}" aria-expanded="${S.open === n}">
    <span class="st-num">${done ? icon('check') : n}</span>
    <span class="st-txt"><span class="st-title">${STEPS[n].title}</span><span class="st-sub" data-sub="${n}">${esc(stepSub(n))}</span></span>
    ${icon('chevron-down', 'ic st-chev')}</button>`;
};
const frame = n => {
  const el = $(`#s${n}`);
  el.classList.toggle('open', S.open === n);
  el.classList.toggle('done', !!S.done[n]);
};
const refreshSubs = () => { [1, 2, 3].forEach(n => { const s = $(`[data-sub="${n}"]`); if (s) s.textContent = stepSub(n); }); };

/* ---------------- Adım 1 ---------------- */
const senderCard = s => `<button type="button" class="opt ${S.senderId === s.id ? 'sel' : ''}" data-sender="${s.id}" role="radio" aria-checked="${S.senderId === s.id}">
  <span class="radio"></span>
  <span class="opt-main"><span class="opt-top"><span class="opt-name">${esc(s.name)}</span>${s.temp ? '<span class="chip sq gray">Bu gönderiye özel</span>' : `<span class="chip sq ${s.tag === 'Bireysel' ? 'info' : ''}">${s.tag}</span>`}</span>
  <span class="opt-addr" style="display:block">${s.title ? `<b style="font-weight:500">${esc(s.title)}</b> · ` : ''}${esc(s.addr)}</span></span></button>`;

const render1 = () => {
  const c = country();
  $('#s1').innerHTML = head(1) + `<div class="st-body">
    <div class="route-hero"><h2 id="heroFrom">${esc(fromTxt())}</h2>${icon('arrow-right')}<h2 id="heroTo">${esc(S.rc.addr ? S.rc.addr.city + ', ' + c.name : 'Nereye ?')}</h2></div>
    <div class="two-col">
      <div>
        <h3 class="col-t">Gönderici Adresi</h3>
        <div class="senders" id="senders" role="radiogroup">${S.senders.map(senderCard).join('')}</div>
        <button type="button" class="dash-btn" id="addSender">${icon('plus')}Adres Ekle</button>
      </div>
      <div>
        <h3 class="col-t">Teslimat Yeri</h3>
        <div class="fields">
          <div class="field" data-f="cc"><label for="rcCountry">Teslimat Ülkesi</label>
            <select class="select" id="rcCountry"><option value="">Lütfen teslimat ülkesi seçin...</option>${COUNTRIES.map(x => `<option value="${x.cc}" ${S.rc.cc === x.cc ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}</select>
            <div class="hint star">Öncelikle alıcı ülkesini seçmeniz gerekiyor.</div><div class="err-msg">Teslimat ülkesi seçin.</div></div>
          <div class="field" data-f="addr"><label for="rcSearch">Teslimat Adresi</label>
            <div class="search-wrap"><div class="search-in">${icon('search')}<input class="input" id="rcSearch" autocomplete="off" placeholder="Sokak, bina no veya posta kodu yaz..." value="${esc(S.rc.query)}" ${c ? '' : 'disabled'}></div><div class="sugg" id="sugg" hidden></div></div>
            <div id="picked"></div><div class="err-msg">Adres seçin veya manuel girin.</div></div>
          <div class="field" data-f="name"><label for="rcName">Ad Soyad</label><input class="input" id="rcName" data-rc="name" value="${esc(S.rc.name)}" placeholder="Lütfen alıcının adını ve soyadını giriniz..."><div class="err-msg">Alıcının adını girin.</div></div>
          <div class="field"><label for="rcCompany">Şirket Adı</label><input class="input" id="rcCompany" data-rc="company" value="${esc(S.rc.company)}" placeholder="Lütfen şirketinizin adını giriniz..."></div>
          <div class="grid-2">
            <div class="field" data-f="phone"><label for="rcPhone">Telefon Numarası</label><div class="tel"><span class="dial" id="rcDial">${c ? c.dial : '+'}</span><input class="input" id="rcPhone" data-rc="phone" inputmode="tel" value="${esc(S.rc.phone)}" placeholder="5** *** ** **"></div><div class="err-msg">Geçerli bir telefon girin.</div></div>
            <div class="field" data-f="email"><label for="rcEmail">E - Posta Adresi</label><input class="input" id="rcEmail" data-rc="email" type="email" value="${esc(S.rc.email)}" placeholder="Lütfen e-posta adresi giriniz..."><div class="err-msg">Geçerli bir e-posta girin.</div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="st-foot"><button type="button" class="btn btn-success-light" data-next="1">Devam et${icon('arrow-right')}</button></div>
  </div>`;
  frame(1);
  renderPicked();
};
const renderPicked = () => {
  const el = $('#picked'); if (!el) return;
  const a = S.rc.addr;
  el.innerHTML = a ? `<div class="picked">${icon('check-circle')}${esc(a.street)}, ${esc(a.zip)} ${esc(a.city)}${a.district ? ' · ' + esc(a.district) : ''}${S.rc.bill ? ' · ayrı fatura adresi' : ''}</div>` : '';
};
const updateHero = () => {
  const f = $('#heroFrom'), t = $('#heroTo');
  if (f) f.textContent = fromTxt();
  if (t) t.textContent = S.rc.addr ? toTxt() : 'Nereye ?';
};

/* adres arama */
let hl = -1;
const matches = q => {
  const list = ADDRS[S.rc.cc] || [];
  const k = q.trim().toLocaleLowerCase('tr');
  if (k.length < 2) return [];
  return list.filter(a => a.join(' ').toLocaleLowerCase('tr').includes(k)).slice(0, 5);
};
const renderSugg = () => {
  const box = $('#sugg'); const q = S.rc.query;
  if (!box) return;
  if (q.trim().length < 2) { box.hidden = true; return; }
  const m = matches(q), c = country();
  box.innerHTML = (m.length ? m.map((a, i) => `<button type="button" class="sugg-item ${i === hl ? 'hl' : ''}" data-pick="${i}">${icon('map-pin')}<span style="margin:0"><b>${esc(a[0])}</b><span>${esc(a[1])} ${esc(a[2])} · ${esc(a[3])} · ${esc(c.name)}</span></span></button>`).join('') : '<div class="sugg-none">Bu aramayla eşleşen adres bulunamadı.</div>')
    + `<button type="button" class="dash-btn" data-manual>${icon('plus')}Adresi Manuel Gir</button>`;
  box.hidden = false;
};
const pickAddr = a => {
  S.rc.addr = { street: a[0], zip: a[1], city: a[2], region: a[3] };
  S.rc.bill = null;
  S.rc.query = `${a[0]}, ${a[1]} ${a[2]}`;
  $('#rcSearch').value = S.rc.query;
  $('#sugg').hidden = true; hl = -1;
  $('[data-f="addr"]').classList.remove('err');
  renderPicked(); updateHero(); refreshSubs(); updateBar();
};

const valid1 = () => {
  const r = S.rc, errs = [];
  if (!sender()) { toast('Bir gönderici adresi seçin.', 'info'); return false; }
  if (!r.cc) errs.push('cc');
  if (!r.addr) errs.push('addr');
  if (r.name.trim().length < 3) errs.push('name');
  if (r.phone.replace(/\D/g, '').length < 7) errs.push('phone');
  if (r.email && !/^\S+@\S+\.\S+$/.test(r.email)) errs.push('email');
  $$('#s1 .field[data-f]').forEach(f => f.classList.toggle('err', errs.includes(f.dataset.f)));
  return !errs.length;
};

/* ---------------- Adım 2 ---------------- */
const typeCard = (id, img, t, d) => `<button type="button" class="type ${S.type === id ? 'sel' : ''}" data-type="${id}" role="radio" aria-checked="${S.type === id}"><img src="${IMG(S.type === id ? img + '-blue' : img)}" alt=""><span><b>${t}</b><span>${d}</span></span></button>`;
const pkgRow = (p, i) => `<div class="pkg" data-pkg="${i}">
  <div class="pkg-head"><b>${i + 1}. Paket Tipi</b><span style="display:flex;align-items:center;gap:12px"><span class="pkg-state" data-state="${i}"></span>${S.pkgs.length > 1 ? `<button type="button" class="ibtn" data-delpkg="${i}" title="Paketi sil" aria-label="Paketi sil">${icon('trash-2')}</button>` : ''}</span></div>
  <div class="pkg-grid">
    ${[['w', 'Genişlik', 'cm'], ['l', 'Uzunluk', 'cm'], ['h', 'Yükseklik', 'cm'], ['kg', 'Ağırlık', 'kg'], ['qty', 'Adet', '']].map(([k, l, u]) => `<div class="field"><label>${l}</label><div class="unit"><input class="input" inputmode="decimal" data-p="${k}" value="${esc(p[k])}" placeholder="0">${u ? `<em>${u}</em>` : ''}</div></div>`).join('')}
  </div>
  <div class="field"><label>Referans Numarası</label><input class="input" data-p="ref" value="${esc(p.ref)}" placeholder="REF-2026-0142"></div>
</div>`;
const render2 = () => {
  let inner = '';
  if (S.type === 'paket') {
    inner = `<div class="sec"><h3 class="sec-t">Paketler</h3><p class="sec-d">Her koliyi ayrı gir. Aynı ölçüde birden fazla koli varsa adedini artır.</p>
      <div class="tip"><img src="${IMG('paket-olcu')}" alt="Uzunluk, boyut ve yükseklik ölçüleri"><div><b>İPUCU</b><p>Kutuyu düz bir zemine koyun ve kapağı kapalıyken en geniş yerlerinden ölçün.<br>Aynı ölçüde birden fazla koli varsa tek satırda adedini artırın.</p></div></div>
      <div id="pkgs">${S.pkgs.map(pkgRow).join('')}</div>
      <button type="button" class="dash-btn" id="addPkg">${icon('plus')}Farklı Paket Tipi Ekle</button></div>
      <div id="provArea"></div>`;
  } else if (S.type === 'zarf') {
    inner = '<div id="provArea"></div>';
  }
  $('#s2').innerHTML = head(2) + `<div class="st-body">
    <div class="types" role="radiogroup">${typeCard('paket', 'box', 'Paket / Çoklu Paket', 'Kutu içinde eşya · ölçü ve gümrük faturası gerekir')}${typeCard('zarf', 'zarf', 'Evrak / Zarf', 'Sözleşme, belge · ölçü ve fatura sorulmaz')}</div>
    ${S.type ? '<div style="height:1px;background:var(--border);margin:28px 0 0"></div>' : ''}
    ${inner}
    ${S.type ? `<div class="sec" id="commentSec"><div class="field"><label for="comment">Yorum</label><textarea class="textarea" id="comment" placeholder="Yorum giriniz...">${esc(S.comment)}</textarea><div class="hint">Operasyon ekibine iletilir, etikete basılmaz.</div></div></div>` : ''}
    <div class="st-foot" style="margin-top:${S.type ? 0 : 28}px"><button type="button" class="btn btn-success-light" data-next="2">Devam et${icon('arrow-right')}</button></div>
  </div>`;
  frame(2);
  renderProv(); updatePkgStates();
};
const updatePkgStates = () => {
  S.pkgs.forEach((p, i) => {
    const el = $(`[data-state="${i}"]`); if (!el) return;
    const ok = pkgOk(p);
    el.classList.toggle('ok', ok);
    el.textContent = ok ? `Desi ${kgFmt(volKg(p))} kg · ${Math.floor(num(p.qty))} koli` : 'Ölçüler bekleniyor';
  });
};
const renderProv = () => {
  const el = $('#provArea'); if (!el) return;
  const list = services(), t = totals();
  if (!list.length) { el.innerHTML = ''; if (S.svc) S.svc = null; updateNext2(); return; }
  if (!list.some(s => s.id === S.svc)) S.svc = S.type === 'zarf' ? 'zarf' : null;
  const head = S.type === 'zarf'
    ? `<h3 class="sec-t">Koliler</h3><p class="sec-d">Toplam ${t.koli} koli · ${kgFmt(t.real)} kg gerçek · ${kgFmt(t.charge)} kg ücretlendirilebilir ağırlık.</p>`
    : `<h3 class="sec-t">Sağlayıcılar</h3><p class="sec-d">Toplam ${t.koli} paket · ${kgFmt(t.charge)} kgs (desi) ücretlendirilebilir ağırlık.</p>`;
  el.innerHTML = `<div class="sec">${head}<div class="provs ${list.length === 1 ? 'one' : ''}" role="radiogroup">${list.map(s => `<div class="prov-wrap ${S.svc === s.id ? 'sel' : ''}">
      <button type="button" class="opt prov ${S.svc === s.id ? 'sel' : ''}" data-svc="${s.id}" role="radio" aria-checked="${S.svc === s.id}"><span class="radio"></span>
        <span class="opt-main"><span class="opt-top"><span class="opt-name">${esc(s.name)}${s.badge ? `<span class="chip success">${s.badge}</span>` : ''}</span><span class="prov-price mono">${TL(s.total)}</span></span>
        <span class="prov-meta" style="display:block">${esc(s.days)}<br>${esc(s.carrier)}</span></span></button>
      <button type="button" class="link-btn" data-pricedetail="${s.id}">Fiyat Detaylarını Göster</button></div>`).join('')}</div></div>`;
  updateNext2();
};
const updateNext2 = () => { const b = $('[data-next="2"]'); if (b) b.disabled = !curSvc(); };
const valid2 = () => {
  if (!S.type) { toast('Gönderi tipini seçin.', 'info'); return false; }
  if (S.type === 'paket') {
    const bad = S.pkgs.map((p, i) => [p, i]).filter(([p]) => !pkgOk(p));
    if (bad.length) {
      bad.forEach(([, i]) => $$(`[data-pkg="${i}"] [data-p]`).forEach(inp => { if (inp.dataset.p !== 'ref' && !(num(inp.value) > 0)) inp.closest('.field').classList.add('err'); }));
      toast('Tüm paketlerin ölçü, ağırlık ve adedini girin.', 'info'); return false;
    }
  }
  if (!curSvc()) { toast('Bir sağlayıcı seçin.', 'info'); return false; }
  return true;
};

/* ---------------- Adım 3 ---------------- */
const seg = (key, opts) => `<div class="seg" role="radiogroup">${opts.map(([v, l]) => `<button type="button" class="${S.c[key] === v ? 'on' : ''}" data-seg="${key}" data-v="${v}" role="radio" aria-checked="${S.c[key] === v}">${l}</button>`).join('')}</div>`;
const drop = (key, label) => {
  const f = S.c[key];
  return `<div class="drop" data-drop="${key}" tabindex="0" role="button"><span class="up">${icon('upload')}</span><p><b>${label}</b> · PDF, JPG, PNG (Maks. 10MB)</p><input type="file" accept=".pdf,.jpg,.jpeg,.png" data-file="${key}" hidden></div>
    ${f ? `<div class="file-row">${icon('file-up')}<b>${esc(f.name)}</b><small>· yüklendi</small><button type="button" data-rmfile="${key}">Kaldır</button></div>` : ''}
    <div class="field-err" data-ferr="${key}" hidden></div>`;
};
const svcRow = (key, title, desc, price, extra = '') => `<label class="svc ${S.c[key] ? 'on' : ''}" data-svcrow="${key}"><input type="checkbox" data-chk="${key}" ${S.c[key] ? 'checked' : ''}><span class="svc-txt"><b>${title}</b><span>${desc}</span></span>${price}</label>${S.c[key] && extra ? `<div class="svc-extra">${extra}</div>` : ''}`;
const insPrice = () => { const v = declaredTL(); return v > 0 ? `<span class="svc-price mono" id="insPrice">+ ${TL(v * FEES.insPct)}</span>` : '<span class="svc-price txt" id="insPrice">Beyan değeri gerekli</span>'; };

const render3 = () => {
  const c = S.c;
  const kimeField = c.kime === 'ticari'
    ? `<div class="field q half" data-f="taxId"><label for="taxId">Alıcının vergi kimlik numarası</label><input class="input" id="taxId" data-c="taxId" value="${esc(c.taxId)}" placeholder="Lütfen vergi kimlik numarası giriniz..."><div class="hint">Hedef ülke gümrüğü ticari alıcılarda bunu zorunlu tutuyor.</div><div class="err-msg">Vergi kimlik numarasını girin.</div></div>`
    : c.kime === 'tuketici'
      ? `<div class="field q half" data-f="taxId"><label for="taxId">Alıcının kimlik numarası</label><input class="input" id="taxId" data-c="taxId" value="${esc(c.taxId)}" placeholder="Lütfen kimlik numarası giriniz..."><div class="hint">Hedef ülke gümrüğü bireysel alıcılarda kimlik numarası istiyor.</div><div class="err-msg">Kimlik numarasını girin.</div></div>`
      : '';
  const d = c.draft;
  const sistem = `<div class="q">
      <div class="field half" data-f="cur"><label for="cur">Para Birimi</label><select class="select" id="cur" data-c="cur"><option value="">Seçiniz...</option>${['USD', 'EUR', 'GBP', 'TRY'].map(x => `<option ${c.cur === x ? 'selected' : ''}>${x}</option>`).join('')}</select><div class="err-msg">Para birimi seçin.</div></div>
      <div class="product" id="product">
        <div class="product-grid">
          <div class="field" data-d="desc"><label for="dDesc">Ürün Açıklaması</label><div class="sub-hint">Gümrükte açan kişinin anlayacağı kadar sade yaz.</div><textarea class="textarea" id="dDesc" data-draft="desc" placeholder="Lütfen gönderi içeriğini açıklayın...">${esc(d.desc)}</textarea></div>
          <div style="display:flex;flex-direction:column;gap:16px">
            <div class="field" data-d="hs"><label for="dHs">HS Kodu</label><input class="input" id="dHs" data-draft="hs" inputmode="numeric" value="${esc(d.hs)}" placeholder="HS kodu girin"></div>
            <div class="field" data-d="origin"><label for="dOrigin">Menşei Ülke</label><select class="select" id="dOrigin" data-draft="origin"><option value="">Ürün menşeini seçiniz...</option>${ORIGINS.map(o => `<option ${d.origin === o ? 'selected' : ''}>${o}</option>`).join('')}</select></div>
          </div>
        </div>
        <div class="product-row">
          <div class="field" data-d="unit"><label for="dUnit">Ölçü Birimi</label><select class="select" id="dUnit" data-draft="unit"><option value="">Seçiniz...</option>${UNITS.map(o => `<option ${d.unit === o ? 'selected' : ''}>${o}</option>`).join('')}</select></div>
          <div class="field" data-d="qty"><label for="dQty">Adet</label><input class="input" id="dQty" data-draft="qty" inputmode="numeric" value="${esc(d.qty)}" placeholder="0"></div>
          <div class="field" data-d="price"><label for="dPrice">Birim Fiyatı</label><input class="input" id="dPrice" data-draft="price" inputmode="decimal" value="${esc(d.price)}" placeholder="0"></div>
          <button type="button" class="btn btn-soft" id="addItem">Ürün Ekle</button>
        </div>
      </div>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>#</th><th>Ürün Açıklaması</th><th>Hs Kodu</th><th>Menşei Ülke</th><th>Ölçü B.</th><th class="r">Birim F.</th><th class="c">Adet</th><th class="r">Toplam F.</th><th class="c">İşlemler</th></tr></thead>
        <tbody>${c.items.length ? c.items.map((it, i) => `<tr><td>${i + 1}</td><td>${esc(it.desc)}</td><td>${esc(it.hs)}</td><td>${esc(it.origin)}</td><td>${esc(it.unit)}</td><td class="r">${money(it.price, c.cur || 'USD')}</td><td class="c">${it.qty}</td><td class="r">${money(it.qty * it.price, c.cur || 'USD')}</td><td class="c"><button type="button" class="ibtn" data-delitem="${i}" aria-label="Ürünü sil">${icon('trash-2')}</button></td></tr>`).join('') : '<tr><td colspan="9" class="tbl-empty">Henüz ürün eklenmedi. Yukarıdaki formdan ürün ekleyin.</td></tr>'}</tbody></table>
        ${c.items.length ? `<div class="tbl-total">Toplam ${c.items.reduce((a, it) => a + it.qty, 0)} Ürün <span style="color:var(--muted)">/</span> Toplam ${money(itemsTotal(), c.cur || 'USD')}</div>` : ''}
        <div class="field-err" id="itemsErr" hidden>En az bir ürün ekleyin.</div></div>
    </div>
    <div class="sec" style="margin-top:24px">
      <span class="lbl">Bu gönderi satış mı, numune mi?</span>${seg('sale', [['satis', 'Satış'], ['numune', 'Numune']])}
      ${c.sale === 'numune' ? '<div class="note warn">Gerçekten numune ise numuneyi seç, yanlış beyanın sorumluluğu gönderici olarak size aittir.</div>' : `
        <div class="q"><span class="lbl">Satışı kargo dahil mi yaptınız?</span>${seg('cargo', [['dahil', 'Kargo dahil'], ['haric', 'Kargo hariç']])}</div>
        ${c.cargo === 'haric' ? `<div class="field q half"><label for="freight">Faturaya eklenecek navlun</label><input class="input" id="freight" data-c="freight" inputmode="decimal" value="${esc(c.freight)}" placeholder="0.0"><div class="hint">Seçtiğin para birimi cinsinden, ürün fiyatlarıyla aynı birim.</div></div>` : '<div class="hint" style="margin-top:10px">Kargo ücreti ürün fiyatlarının içinde, faturaya ayrıca navlun eklenmez.</div>'}`}
    </div>`;
  const insExtra = c.inv === 'sistem'
    ? `<div class="hint" style="margin:-4px 0 4px">Beyan değeri ürün tablosunun toplamından alınır${c.items.length && c.cur ? `: ${money(itemsTotal(), c.cur)}` : '.'}</div>`
    : `<div class="field" data-f="insVal" style="margin-bottom:4px"><label for="insVal">Beyan değeri</label><div class="ins-row"><input class="input" id="insVal" data-c="insVal" inputmode="decimal" value="${esc(c.insVal)}" placeholder="0"><select class="select" data-c="insCur" aria-label="Para birimi">${['USD', 'EUR', 'GBP', 'TRY'].map(x => `<option ${c.insCur === x ? 'selected' : ''}>${x}</option>`).join('')}</select></div><div class="hint">Yüklediğiniz faturadaki toplam tutarı girin.</div><div class="err-msg">Beyan değerini girin.</div></div>`;
  $('#s3').innerHTML = head(3) + `<div class="st-body">
    <div class="sec">
      <h3 class="sec-t" style="margin-bottom:16px">Gümrük tarafı</h3>
      <label class="switch-row"><span class="switch"><input type="checkbox" data-chk="prepaid" ${c.prepaid ? 'checked' : ''}><i></i></span><span>Vergi önceden tahsil edildi mi?<small>Pazaryeri üzerinden sattıysan ve KDV'yi alıcıdan zaten tahsil ettiysen aç.</small></span></label>
      ${c.prepaid ? '<div class="note info">Vergi önceden tahsil edildiği için alıcı tipi ve vergi kimlik numarası sorulmuyor — beyan pazaryeri kaydı üzerinden yapılacak.</div>'
        : `<div class="q"><span class="lbl">Kime gönderi yapıyorsunuz?</span>${seg('kime', [['none', 'Hiçbiri'], ['ticari', 'Ticari'], ['tuketici', 'Tüketici']])}</div>${kimeField}`}
    </div>
    <div class="sec">
      <h3 class="sec-t">Ticari Fatura</h3><p class="sec-d">Gümrük bu gönderi için ticari fatura istiyor.</p>
      <div class="inv-cards" role="radiogroup" id="invCards">
        <button type="button" class="type ${c.inv === 'sistem' ? 'sel' : ''}" data-inv="sistem" role="radio" aria-checked="${c.inv === 'sistem'}"><img src="${IMG(c.inv === 'sistem' ? 'fatura-sistem-blue' : 'fatura-sistem')}" alt=""><span><b>Ticari faturayı sistem oluştursun</b><span>Birkaç soru sorup faturayı biz hazırlarız · Ücretsiz</span></span></button>
        <button type="button" class="type ${c.inv === 'yukle' ? 'sel' : ''}" data-inv="yukle" role="radio" aria-checked="${c.inv === 'yukle'}"><img src="${IMG(c.inv === 'yukle' ? 'fatura-yukle-blue' : 'fatura-yukle')}" alt=""><span><b>Faturayı kendim oluşturacağım</b><span>Kendi faturanı yükle · +${TL(FEES.invoice)}</span></span></button>
      </div>
      <div class="field-err" id="invErr" hidden>Ticari fatura yöntemini seçin.</div>
      ${c.inv === 'sistem' ? sistem : c.inv === 'yukle' ? `<div class="q">${drop('invFile', 'Faturanızı yükleyin')}</div>` : ''}
    </div>
    <div class="sec">
      <h3 class="sec-t">Zorunlu servisler</h3><p class="sec-d">Bu hizmet, seçtiğiniz sağlayıcı tarafından zorunlu istenmektedir.</p>
      <div class="svc-list">${svcRow('fast', 'Gümrükte hızlı geçiş istiyorum', 'Sağlayıcı tarafından garantili hizmet', `<span class="svc-price mono">+ ${TL(FEES.fast)}</span>`)}</div>
      <div class="field-err" id="fastErr" hidden>Bu servis seçtiğiniz sağlayıcı için zorunlu, devam etmek için onaylayın.</div>
    </div>
    <div class="sec">
      <h3 class="sec-t">Ekstra servisler</h3><p class="sec-d">Hiçbiri zorunlu değil. Seçtiklerin gönderi ücretine eklenir.</p>
      <div class="svc-list">
        ${svcRow('etgb', "Bu gönderi ETGB'li gönderidir", 'Elektronik Ticaret Gümrük Beyannamesi belgesini yükle', '<span class="chip free">Ücretsiz</span>', drop('etgbFile', 'Beyannamenizi yükleyin'))}
        ${svcRow('sign', 'İmzalı teslimat istiyorum', 'Alıcıdan ıslak imza alınır', `<span class="svc-price mono">+ ${TL(FEES.sign)}</span>`)}
        ${svcRow('ins', 'Sigorta istiyorum', "Beyan değerinin %2'si · hasar ve kayıp teminatı", insPrice(), insExtra)}
        ${svcRow('cacc', 'Gümrük hesabı girmek istiyorum', 'Kendi gümrük müşavir hesabın üzerinden işlem görür', '<span class="chip free">Ücretsiz</span>', `<div class="grid-2" style="margin-bottom:4px"><div class="field" data-f="caccNo"><label for="caccNo">Gümrük Hesap Numarası</label><input class="input" id="caccNo" data-c="caccNo" value="${esc(c.caccNo)}" placeholder="Lütfen hesap numarası girin..."><div class="err-msg">Hesap numarasını girin.</div></div><div class="field" data-f="caccZip"><label for="caccZip">Gümrük Hesap Posta Kodu</label><input class="input" id="caccZip" data-c="caccZip" value="${esc(c.caccZip)}" placeholder="Lütfen posta kodu girin..."><div class="err-msg">Posta kodunu girin.</div></div></div>`)}
      </div>
    </div>
    <div class="st-foot" style="margin-top:4px"><button type="button" class="btn btn-success-light" data-next="3">Devam et${icon('arrow-right')}</button></div>
  </div>`;
  frame(3);
};
const valid3 = () => {
  const c = S.c; let ok = true; const bad = [];
  const flag = (sel, on) => { const el = $(sel); if (el) el.hidden = !on; if (on) ok = false; };
  $$('#s3 .field[data-f]').forEach(f => f.classList.remove('err'));
  const err = f => { const el = $(`#s3 .field[data-f="${f}"]`); if (el) { el.classList.add('err'); bad.push(el); } ok = false; };
  if (!c.prepaid && c.kime !== 'none' && c.taxId.trim().length < 5) err('taxId');
  flag('#invErr', !c.inv);
  if (c.inv === 'sistem') { if (!c.cur) err('cur'); flag('#itemsErr', !c.items.length); }
  if (c.inv === 'yukle' && !c.invFile) { const e = $('[data-ferr="invFile"]'); e.textContent = 'Faturanızı yükleyin.'; e.hidden = false; ok = false; }
  flag('#fastErr', !c.fast); $('[data-svcrow="fast"]').classList.toggle('err', !c.fast);
  if (c.etgb && !c.etgbFile) { const e = $('[data-ferr="etgbFile"]'); e.textContent = 'ETGB belgesini yükleyin.'; e.hidden = false; ok = false; }
  if (c.ins && c.inv !== 'sistem' && !(num(c.insVal) > 0)) err('insVal');
  if (c.ins && c.inv === 'sistem' && !(declaredTL() > 0)) { toast('Sigorta için ürün tablosuna ürün ekleyin.', 'info'); ok = false; }
  if (c.cacc) { if (!c.caccNo.trim()) err('caccNo'); if (!c.caccZip.trim()) err('caccZip'); }
  if (!ok) {
    const first = bad[0] || $$('#s3 .field-err:not([hidden])')[0];
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
    toast('Eksik alanları tamamlayın.', 'info');
  }
  return ok;
};

/* Ekrana dokunmadan adım geçerliliği (valid1/2/3 ile aynı kurallar) */
const stepOk = n => {
  if (n === 1) {
    const r = S.rc;
    return !!sender() && !!r.cc && !!r.addr && r.name.trim().length >= 3 && r.phone.replace(/\D/g, '').length >= 7 && (!r.email || /^\S+@\S+\.\S+$/.test(r.email));
  }
  if (n === 2) return !!S.type && (S.type === 'zarf' || S.pkgs.every(pkgOk)) && !!curSvc();
  const c = S.c;
  if (!c.prepaid && c.kime !== 'none' && c.taxId.trim().length < 5) return false;
  if (!c.inv) return false;
  if (c.inv === 'sistem' && (!c.cur || !c.items.length)) return false;
  if (c.inv === 'yukle' && !c.invFile) return false;
  if (!c.fast) return false;
  if (c.etgb && !c.etgbFile) return false;
  if (c.ins && !(declaredTL() > 0)) return false;
  if (c.cacc && (!c.caccNo.trim() || !c.caccZip.trim())) return false;
  return true;
};

/* ---------------- Alt bar ---------------- */
const updateBar = () => {
  const s = curSvc(), t = totals();
  $('#barRoute').innerHTML = `${esc(fromTxt())}${icon('arrow-right')}${esc(toTxt())}`;
  const bits = [];
  if (S.type === 'zarf') bits.push('Evrak / Zarf');
  else bits.push(`${t.koli} koli`, `${kgFmt(t.charge)} kg`);
  if (s) { if (S.type !== 'zarf') bits.push(s.name); bits.push(s.days.replace('–', ' - ')); }
  if (hasStep3() || !S.type) bits.push(S.c.inv === 'yukle' ? 'Fatura sizden' : 'Faturayı sistem hazırlar');
  $('#barSub').textContent = bits.join(' · ');
  $('#barPrice').textContent = s ? TL(grandTotal()) : '— TL';
  $('#barNote').hidden = !!s;
  if (!$('#pricePanel').hidden) renderPanel();
};
const renderPanel = () => {
  const s = curSvc(), p = $('#pricePanel');
  if (!s) { p.hidden = true; $('#barDetails').classList.remove('on'); return; }
  const rows = [...s.parts.filter(r => r[1] > 0), ...extras(), ['KDV', s.kdv]];
  p.innerHTML = `<div class="pp-head"><span>${esc(s.name)} · ${esc(s.carrier)} · ${kgFmt(totals().charge)} kg üzerinden</span><button type="button" class="xbtn" id="ppClose" aria-label="Kapat">${icon('x')}</button></div>
    <div class="pp-rows">${rows.map(r => `<div class="pp-row"><span>${esc(r[0])}</span><span>${TL(r[1])}</span></div>`).join('')}</div>
    <div class="pp-tot"><span>Toplam<small>Gümrük vergisi ve varış ülkesi harçları dahil değildir.</small></span><b>${TL(grandTotal())}</b></div>`;
  p.hidden = false; $('#barDetails').classList.add('on');
};

/* ---------------- Genel render ---------------- */
const renderAll = () => {
  render1(); render2();
  $('#s3').hidden = S.type === 'zarf';
  if (S.type !== 'zarf') render3(); else $('#s3').innerHTML = '';
  updateBar();
};
const openStep = (n, scroll = true) => {
  S.open = n;
  renderAll();
  if (scroll) setTimeout(() => $(`#s${n}`).scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
};
const canOpen = n => n === 1 || S.done[n - 1] || S.done[n];

/* ---------------- Olaylar: adımlar ---------------- */
document.addEventListener('click', e => {
  const t = e.target;
  const tg = t.closest('[data-toggle]');
  if (tg) {
    const n = +tg.dataset.toggle;
    if (S.open === n) { S.open = 0; renderAll(); return; }
    if (!canOpen(n)) { toast('Önce önceki adımı tamamlayın.', 'info'); return; }
    openStep(n); return;
  }
  const nx = t.closest('[data-next]');
  if (nx) {
    const n = +nx.dataset.next;
    const ok = n === 1 ? valid1() : n === 2 ? valid2() : valid3();
    if (!ok) return;
    S.done[n] = true;
    if (n < stepCount()) openStep(n + 1);
    else { S.open = 0; renderAll(); window.scrollTo({ top: 0, behavior: 'smooth' }); toast('Tüm adımlar tamam. Gönderiyi oluşturabilirsiniz.'); }
    return;
  }
  if (t.closest('.sugg') || t.closest('#rcSearch')) { /* aşağıda */ } else { const sg = $('#sugg'); if (sg) sg.hidden = true; }

  /* adım 1 */
  const sd = t.closest('[data-sender]');
  if (sd) { S.senderId = sd.dataset.sender; $$('#senders .opt').forEach(o => { const on = o.dataset.sender === S.senderId; o.classList.toggle('sel', on); o.setAttribute('aria-checked', on); }); updateHero(); refreshSubs(); updateBar(); return; }
  if (t.closest('#addSender')) { openSenderModal(); return; }
  const pk = t.closest('[data-pick]');
  if (pk) { pickAddr(matches(S.rc.query)[+pk.dataset.pick]); return; }
  if (t.closest('[data-manual]')) { $('#sugg').hidden = true; openRecipientModal(); return; }

  /* adım 2 */
  const ty = t.closest('[data-type]');
  if (ty) { if (S.type !== ty.dataset.type) { S.type = ty.dataset.type; S.svc = null; S.done[2] = false; S.done[3] = false; } renderAll(); return; }
  if (t.closest('#addPkg')) { S.pkgs.push(newPkg()); render2(); updateBar(); $(`[data-pkg="${S.pkgs.length - 1}"] input`).focus(); return; }
  const dp = t.closest('[data-delpkg]');
  if (dp) { S.pkgs.splice(+dp.dataset.delpkg, 1); render2(); updateBar(); refreshSubs(); return; }
  const sv = t.closest('[data-svc]');
  if (sv) { S.svc = sv.dataset.svc; renderProv(); updateBar(); refreshSubs(); return; }
  const pd = t.closest('[data-pricedetail]');
  if (pd) { openPriceModal(pd.dataset.pricedetail); return; }

  /* adım 3 */
  const sg = t.closest('[data-seg]');
  if (sg) { S.c[sg.dataset.seg] = sg.dataset.v; if (sg.dataset.seg === 'kime') S.c.taxId = ''; render3(); updateBar(); return; }
  const iv = t.closest('[data-inv]');
  if (iv) { S.c.inv = iv.dataset.inv; render3(); updateBar(); return; }
  if (t.closest('#addItem')) { addItem(); return; }
  const di = t.closest('[data-delitem]');
  if (di) { S.c.items.splice(+di.dataset.delitem, 1); render3(); updateBar(); return; }
  const dz = t.closest('[data-drop]');
  if (dz) { dz.querySelector('input[type=file]').click(); return; }
  const rf = t.closest('[data-rmfile]');
  if (rf) { e.preventDefault(); S.c[rf.dataset.rmfile] = null; render3(); return; }

  /* bar */
  if (t.closest('#barDetails')) { if (!curSvc()) { toast('Fiyat detayı için önce bir sağlayıcı seçin.', 'info'); return; } if ($('#pricePanel').hidden) renderPanel(); else { $('#pricePanel').hidden = true; $('#barDetails').classList.remove('on'); } return; }
  if (t.closest('#ppClose')) { $('#pricePanel').hidden = true; $('#barDetails').classList.remove('on'); return; }
  if (t.closest('#draftBtn')) { toast('Taslak kaydedildi. Gönderi listesinden devam edebilirsiniz.'); return; }
  if (t.closest('[data-submit]')) { submit(); return; }
});

document.addEventListener('change', e => {
  const t = e.target;
  if (t.id === 'rcCountry') {
    S.rc.cc = t.value; S.rc.addr = null; S.rc.bill = null; S.rc.query = '';
    const inp = $('#rcSearch'); inp.value = ''; inp.disabled = !t.value;
    $('#rcDial').textContent = country() ? country().dial : '+';
    t.closest('.field').classList.remove('err');
    renderPicked(); updateHero(); refreshSubs(); updateBar();
    if (t.value) inp.focus();
    return;
  }
  if (t.dataset.chk) {
    S.c[t.dataset.chk] = t.checked;
    render3(); updateBar(); return;
  }
  if (t.dataset.c === 'cur' || t.dataset.c === 'insCur') { S.c[t.dataset.c] = t.value; render3(); updateBar(); return; }
  if (t.dataset.draft) { S.c.draft[t.dataset.draft] = t.value; t.closest('.field').classList.remove('err'); return; }
  if (t.dataset.file) { takeFile(t.dataset.file, t.files[0]); t.value = ''; }
});

document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'rcSearch') { S.rc.query = t.value; if (S.rc.addr) { S.rc.addr = null; renderPicked(); updateHero(); refreshSubs(); updateBar(); } hl = -1; renderSugg(); return; }
  if (t.dataset.rc) { S.rc[t.dataset.rc] = t.value; t.closest('.field').classList.remove('err'); return; }
  if (t.dataset.p) {
    const i = +t.closest('[data-pkg]').dataset.pkg;
    S.pkgs[i][t.dataset.p] = t.value; t.closest('.field').classList.remove('err');
    updatePkgStates(); renderProv(); updateBar(); refreshSubs(); return;
  }
  if (t.id === 'comment') { S.comment = t.value; return; }
  if (t.dataset.draft) { S.c.draft[t.dataset.draft] = t.value; t.closest('.field').classList.remove('err'); return; }
  if (t.dataset.c) {
    S.c[t.dataset.c] = t.value;
    const f = t.closest('.field'); if (f) f.classList.remove('err');
    if (t.dataset.c === 'insVal') { const ip = $('#insPrice'); if (ip) ip.outerHTML = insPrice(); updateBar(); }
  }
});

document.addEventListener('focusin', e => { if (e.target.id === 'rcSearch') renderSugg(); });
document.addEventListener('keydown', e => {
  if (e.target.id === 'rcSearch') {
    const m = matches(S.rc.query);
    if (e.key === 'ArrowDown' && m.length) { e.preventDefault(); hl = (hl + 1) % m.length; renderSugg(); }
    else if (e.key === 'ArrowUp' && m.length) { e.preventDefault(); hl = (hl - 1 + m.length) % m.length; renderSugg(); }
    else if (e.key === 'Enter') { e.preventDefault(); if (m[hl]) pickAddr(m[hl]); else if (m.length === 1) pickAddr(m[0]); }
    else if (e.key === 'Escape') $('#sugg').hidden = true;
    return;
  }
  if (e.key === 'Enter' && e.target.closest && e.target.closest('#product') && e.target.tagName !== 'TEXTAREA') { e.preventDefault(); addItem(); return; }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset && e.target.dataset.drop) { e.preventDefault(); e.target.querySelector('input').click(); return; }
  if (e.key === 'Escape') { const m = $('.modal.show'); if (m) closeModal(m); }
});

/* sürükle-bırak */
['dragenter', 'dragover'].forEach(ev => document.addEventListener(ev, e => { const d = e.target.closest && e.target.closest('[data-drop]'); if (d) { e.preventDefault(); d.classList.add('over'); } }));
['dragleave', 'drop'].forEach(ev => document.addEventListener(ev, e => {
  const d = e.target.closest && e.target.closest('[data-drop]'); if (!d) return;
  e.preventDefault(); d.classList.remove('over');
  if (ev === 'drop' && e.dataTransfer.files[0]) takeFile(d.dataset.drop, e.dataTransfer.files[0]);
}));
const takeFile = (key, f) => {
  if (!f) return;
  const errEl = $(`[data-ferr="${key}"]`);
  if (!/\.(pdf|jpe?g|png)$/i.test(f.name)) { errEl.textContent = 'Sadece PDF, JPG veya PNG yükleyebilirsiniz.'; errEl.hidden = false; return; }
  if (f.size > 10 * 1024 * 1024) { errEl.textContent = "Dosya 10MB'dan büyük olamaz."; errEl.hidden = false; return; }
  S.c[key] = { name: f.name, size: f.size };
  render3(); toast(`${f.name} yüklendi.`);
};

const addItem = () => {
  const d = S.c.draft, bad = [];
  if (d.desc.trim().length < 3) bad.push('desc');
  if (!/^\d{4,12}$/.test(d.hs.replace(/\D/g, '')) || !d.hs.trim()) bad.push('hs');
  if (!d.origin) bad.push('origin');
  if (!d.unit) bad.push('unit');
  if (!(parseInt(d.qty, 10) > 0)) bad.push('qty');
  if (!(num(d.price) > 0)) bad.push('price');
  $$('#product .field[data-d]').forEach(f => f.classList.toggle('err', bad.includes(f.dataset.d)));
  if (bad.length) { toast('Ürün bilgilerini eksiksiz girin. HS kodu 4–12 haneli olmalı.', 'info'); return; }
  S.c.items.push({ desc: d.desc.trim(), hs: d.hs.replace(/\D/g, ''), origin: d.origin, unit: d.unit, qty: parseInt(d.qty, 10), price: num(d.price) });
  S.c.draft = { desc: '', hs: '', origin: d.origin, unit: d.unit, qty: '', price: '' };
  render3(); updateBar();
  setTimeout(() => $('#dDesc') && $('#dDesc').focus(), 0);
};

/* ---------------- Modaller ---------------- */
const openModal = m => { m.classList.add('show'); setTimeout(() => { const f = m.querySelector('input:not([type=checkbox]),select'); if (f) f.focus(); }, 60); };
const closeModal = m => m.classList.remove('show');
$$('.modal').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-close]')) closeModal(m); });
});

/* gönderici */
const fS = $('#fSender');
const fillTrCities = () => {
  fS.sehir.innerHTML = '<option value="">Lütfen şehir seçin...</option>' + Object.keys(TR).map(c => `<option>${c}</option>`).join('');
  fS.ilce.innerHTML = '<option value="">Lütfen ilçe seçin...</option>'; fS.ilce.disabled = true;
};
fS.sehir.addEventListener('change', () => {
  const list = TR[fS.sehir.value] || [];
  fS.ilce.innerHTML = '<option value="">Lütfen ilçe seçin...</option>' + list.map(c => `<option>${c}</option>`).join('');
  fS.ilce.disabled = !list.length;
});
fS.kaydet.addEventListener('change', () => { $('#senderTitleField').hidden = !fS.kaydet.checked; });
fS.addEventListener('input', e => { const f = e.target.closest('.field'); if (f) f.classList.remove('err'); });
fS.addEventListener('change', e => { const f = e.target.closest('.field'); if (f) f.classList.remove('err'); });
const openSenderModal = () => { fS.reset(); fillTrCities(); $('#senderTitleField').hidden = false; $$('#fSender .field').forEach(f => f.classList.remove('err')); openModal($('#mSender')); };
fS.addEventListener('submit', e => {
  e.preventDefault();
  const v = k => fS[k].value.trim(), bad = [];
  if (!v('ad')) bad.push('ad');
  if (!v('soyad')) bad.push('soyad');
  if (v('tel').replace(/\D/g, '').length < 10) bad.push('tel');
  if (v('eposta') && !/^\S+@\S+\.\S+$/.test(v('eposta'))) bad.push('eposta');
  if (!v('sehir')) bad.push('sehir');
  if (!v('ilce')) bad.push('ilce');
  if (v('acik').length < 5) bad.push('acik');
  if (!v('pk')) bad.push('pk');
  if (fS.kaydet.checked && !v('baslik')) bad.push('baslik');
  $$('#fSender .field[data-f]').forEach(f => f.classList.toggle('err', bad.includes(f.dataset.f)));
  if (bad.length) return;
  const up = s => s.toLocaleUpperCase('tr');
  const s = {
    id: 's' + Date.now(), name: up(v('sirket') || `${v('ad')} ${v('soyad')}`), tag: v('sirket') ? 'Kurumsal' : 'Bireysel', city: v('sehir'),
    addr: up(`${v('acik')}${v('detay') ? ' ' + v('detay') : ''} · ${v('ilce')} ${v('sehir')} ${v('pk')}`), title: fS.kaydet.checked ? v('baslik') : '', temp: !fS.kaydet.checked
  };
  S.senders.unshift(s); S.senderId = s.id;
  closeModal($('#mSender')); render1(); updateBar(); refreshSubs();
  toast(s.temp ? 'Adres bu gönderi için eklendi.' : 'Gönderici adresi kaydedildi.');
});

/* alıcı (manuel) */
const addrFields = p => `<div class="grid-2">
    <div class="field" data-f="${p}region"><label>Bölge</label><select class="select" data-geo="${p}" data-lv="region"></select><div class="err-msg">Bölge seçin.</div></div>
    <div class="field" data-f="${p}city"><label>Şehir</label><select class="select" data-geo="${p}" data-lv="city" disabled><option value="">Lütfen şehir seçin...</option></select><div class="err-msg">Şehir seçin.</div></div>
  </div>
  <div class="grid-2">
    <div class="field" data-f="${p}district"><label>İlçe</label><select class="select" data-geo="${p}" data-lv="district" disabled><option value="">Lütfen ilçe seçin...</option></select><div class="err-msg">İlçe seçin.</div></div>
    <div class="field" data-f="${p}zip"><label>Posta Kodu</label><input class="input" name="${p}zip" placeholder="Lütfen posta kodu girin..."><div class="err-msg">Posta kodunu girin.</div></div>
  </div>
  <div class="field" data-f="${p}l1"><label>Adres Satırı 1</label><input class="input" name="${p}l1" placeholder="Lütfen açık adres bilgilerini giriniz..."><div class="hint">Örn. Mahalle, cadde, sokak ve bina bilgisi</div><div class="err-msg">Açık adresi girin.</div></div>
  <div class="field"><label>Adres Satırı 2</label><input class="input" name="${p}l2" placeholder="Lütfen adres detaylarını giriniz..."><div class="hint">Örn. Apartman, kat, daire, ofis vb.</div></div>`;
const fR = $('#fRecipient');
const geoSel = (p, lv) => fR.querySelector(`[data-geo="${p}"][data-lv="${lv}"]`);
const initGeo = p => {
  const g = GEO[S.rc.cc] || {};
  geoSel(p, 'region').innerHTML = '<option value="">Lütfen bölge seçin...</option>' + Object.keys(g).map(r => `<option>${r}</option>`).join('');
};
fR.addEventListener('change', e => {
  const s = e.target; const f = s.closest('.field'); if (f) f.classList.remove('err');
  if (s.id === 'billDiff') { $('#billAddr').hidden = !s.checked; if (s.checked) setTimeout(() => $('#billAddr').scrollIntoView({ behavior: 'smooth', block: 'start' }), 30); return; }
  if (!s.dataset.geo) return;
  const p = s.dataset.geo, g = GEO[S.rc.cc] || {};
  if (s.dataset.lv === 'region') {
    const cities = Object.keys(g[s.value] || {});
    const c = geoSel(p, 'city'); c.innerHTML = '<option value="">Lütfen şehir seçin...</option>' + cities.map(x => `<option>${x}</option>`).join(''); c.disabled = !cities.length;
    const d = geoSel(p, 'district'); d.innerHTML = '<option value="">Lütfen ilçe seçin...</option>'; d.disabled = true;
  } else if (s.dataset.lv === 'city') {
    const r = geoSel(p, 'region').value; const ds = (g[r] || {})[s.value] || [];
    const d = geoSel(p, 'district'); d.innerHTML = '<option value="">Lütfen ilçe seçin...</option>' + ds.map(x => `<option>${x}</option>`).join(''); d.disabled = !ds.length;
  }
});
fR.addEventListener('input', e => { const f = e.target.closest('.field'); if (f) f.classList.remove('err'); });
const openRecipientModal = () => {
  if (!S.rc.cc) { toast('Önce teslimat ülkesini seçin.', 'info'); return; }
  $('#recAddr').innerHTML = addrFields('');
  $('#billAddr').innerHTML = '<h3 class="z-sub">Fatura Adresi</h3>' + addrFields('b');
  $('#billAddr').hidden = true; $('#billDiff').checked = false;
  initGeo(''); initGeo('b');
  $('#mRecT').textContent = `Alıcı Adresi Ekle · ${country().name}`;
  openModal($('#mRecipient'));
};
const readAddr = (p, bad) => {
  const g = lv => geoSel(p, lv).value, v = n => fR[n].value.trim();
  [['region', g('region')], ['city', g('city')], ['district', g('district')], ['zip', v(p + 'zip')], ['l1', v(p + 'l1')]].forEach(([k, val]) => { if (!val || (k === 'l1' && val.length < 5)) bad.push(p + k); });
  return { street: v(p + 'l1') + (v(p + 'l2') ? ', ' + v(p + 'l2') : ''), zip: v(p + 'zip'), city: g('city'), region: g('region'), district: g('district'), manual: true };
};
fR.addEventListener('submit', e => {
  e.preventDefault();
  const bad = [];
  const a = readAddr('', bad);
  const b = $('#billDiff').checked ? readAddr('b', bad) : null;
  $$('#fRecipient .field[data-f]').forEach(f => f.classList.toggle('err', bad.includes(f.dataset.f)));
  if (bad.length) { const f = $('#fRecipient .field.err'); if (f) f.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
  S.rc.addr = a; S.rc.bill = b; S.rc.query = `${a.street}, ${a.zip} ${a.city}`;
  $('#rcSearch').value = S.rc.query; $('[data-f="addr"]').classList.remove('err');
  closeModal($('#mRecipient')); renderPicked(); updateHero(); refreshSubs(); updateBar();
  toast('Alıcı adresi eklendi.');
});

/* fiyat detayı */
const openPriceModal = id => {
  const s = services().find(x => x.id === id); if (!s) return;
  const rows = [...s.parts, ['KDV', s.kdv]];
  $('#priceBody').innerHTML = `<div class="pd-top"><span>${UPS}${esc(s.carrier)}</span><b style="font-weight:500">${TL(s.total)}</b></div>
    <table class="pd"><tbody>${rows.map(r => `<tr><td>${esc(r[0])}</td><td>:</td><td>${TL(r[1])}</td></tr>`).join('')}<tr class="tot"><td>Toplam</td><td>:</td><td>${TL(s.total)}</td></tr></tbody></table>`;
  openModal($('#mPrice'));
};

/* ---------------- Sekmeler ---------------- */
$('#modes').addEventListener('click', e => {
  const b = e.target.closest('[data-mode]'); if (!b) return;
  S.mode = b.dataset.mode;
  $$('.mode').forEach(m => { const on = m.dataset.mode === S.mode; m.classList.toggle('active', on); m.setAttribute('aria-selected', on); });
  $('#flow').hidden = S.mode !== 'paket';
  $('#bar').hidden = S.mode !== 'paket';
  $('#bulk').hidden = S.mode !== 'toplu';
  $$('.page-head [data-submit]').forEach(x => { x.hidden = S.mode !== 'paket'; });
  if (S.mode === 'toplu') renderBulk();
});
const renderBulk = () => {
  $('#bulk').innerHTML = `<h2>Toplu Gönderi</h2><p class="sec-d">CSV dosyanızı yükleyin, her satır ayrı bir gönderi olarak oluşturulsun.</p>
    <div class="drop" id="csvDrop" tabindex="0" role="button"><span class="up">${icon('file-spreadsheet')}</span><p><b>CSV dosyanızı yükleyin</b> · .csv (Maks. 10MB)</p><input type="file" accept=".csv" id="csvIn" hidden></div>
    <div id="csvRes"></div>
    <div class="bulk-foot"><span class="hint" style="margin:0">Sütunlar: alıcı adı, ülke, adres, posta kodu, telefon, ağırlık, ölçüler, servis.</span><a href="#" id="csvTpl">Örnek CSV şablonunu indir</a></div>`;
  $('#csvDrop').addEventListener('click', () => $('#csvIn').click());
  $('#csvIn').addEventListener('change', e => {
    const f = e.target.files[0]; if (!f) return;
    const n = 12 + (f.size % 37);
    $('#csvRes').innerHTML = `<div class="file-row">${icon('file-up')}<b>${esc(f.name)}</b><small>· ${n} satır okundu, ${n - 2} gönderi hazır, 2 satırda eksik bilgi var</small><button type="button" id="csvRm">Kaldır</button></div>`;
    $('#csvRm').addEventListener('click', () => { $('#csvRes').innerHTML = ''; });
  });
  $('#csvTpl').addEventListener('click', e => { e.preventDefault(); toast('Örnek şablon indirildi (prototip).', 'info'); });
};

/* ---------------- Oluştur ---------------- */
const submit = () => {
  /* "Devam et"e basılmamış adımlar burada kontrol edilir: alanlar tamamsa adım tamamlanmış sayılır */
  for (const n of [1, 2, 3].slice(0, stepCount())) {
    if (S.done[n]) continue;
    if (stepOk(n)) { S.done[n] = true; continue; }
    S.open = n; renderAll();
    if (n === 1) { if (valid1()) return; toast(`"${STEPS[1].title}" adımında eksik alanlar var.`, 'info'); }
    else if (n === 2) valid2();
    else valid3();
    if (n !== 3) setTimeout(() => $(`#s${n}`).scrollIntoView({ behavior: 'smooth', block: 'start' }), 30);
    return;
  }
  S.open = 0;
  const no = 'ZML-' + String(Math.floor(100000 + Math.random() * 900000));
  const trk = '1Z' + Array.from({ length: 16 }, () => '0123456789ABCDEFGHJKLMNPRSTUVWXY'[Math.floor(Math.random() * 32)]).join('');
  const s = curSvc(), t = totals(), snd = sender();
  $('#flow').hidden = true; $('#pricePanel').hidden = true;
  document.body.classList.add('is-done');
  $('#done').hidden = false;
  $('#done').innerHTML = `<div class="card done-card">
    <div class="done-box">
      <span class="done-ico">${icon('check')}</span>
      <h2>Gönderiniz oluşturuldu</h2>
      <p>${esc(fromTxt())} → ${esc(toTxt())} gönderiniz ${esc(s.carrier)} servisine iletildi.</p>
      <span class="done-no"><span class="mono">${no}</span><button type="button" id="copyNo" title="Gönderi numarasını kopyala" aria-label="Gönderi numarasını kopyala">${icon('copy')}</button></span>
    </div>
    <div class="done-grid">
      <div><small>Gönderici</small><b>${esc(snd.name)}</b></div>
      <div><small>Alıcı</small><b>${esc(S.rc.name)}${S.rc.company ? ' · ' + esc(S.rc.company) : ''}</b></div>
      <div><small>Teslimat adresi</small><b>${esc(S.rc.addr.street)}, ${esc(S.rc.addr.zip)} ${esc(S.rc.addr.city)}</b></div>
      <div><small>İçerik</small><b>${S.type === 'zarf' ? 'Evrak / Zarf' : `${t.koli} koli · ${kgFmt(t.charge)} kg`}</b></div>
      <div><small>Servis</small><b>${esc(s.name)} · ${esc(s.days)}</b></div>
      <div><small>Takip numarası</small><b class="mono" style="font-size:13px">${trk}</b></div>
      <div><small>Toplam ücret</small><b class="mono">${TL(grandTotal())}</b></div>
      <div><small>Ticari fatura</small><b>${S.type === 'zarf' ? 'Gerekmiyor' : S.c.inv === 'sistem' ? 'Sistem tarafından oluşturuldu' : 'Yüklenen fatura'}</b></div>
      <div><small>Ek servisler</small><b>${S.type === 'zarf' ? '—' : ([S.c.fast && 'Hızlı geçiş', S.c.etgb && 'ETGB', S.c.sign && 'İmzalı teslimat', S.c.ins && 'Sigorta', S.c.cacc && 'Gümrük hesabı'].filter(Boolean).join(', ') || '—')}</b></div>
    </div>
    <div class="done-next">${icon('info')}<span>Sıradaki adım: etiketinizi yazdırıp ${S.type === 'zarf' ? 'zarfın' : 'her kolinin'} üzerine yapıştırın. Kurye, gönderici adresinizden bir sonraki iş günü teslim alır.</span></div>
    <div class="done-acts">
      <button type="button" class="btn btn-primary btn-lg" id="dlLabel">${icon('printer')}Etiketi İndir</button>
      <button type="button" class="btn btn-success-light btn-lg" id="newShip">${icon('plus')}Yeni Gönderi Oluştur</button>
      <a class="btn btn-secondary btn-lg" href="#">Gönderi Listesine Dön</a>
    </div></div>`;
  $('#dlLabel').addEventListener('click', () => toast(`${no} etiketi indirildi (prototip).`));
  $('#newShip').addEventListener('click', () => { location.href = location.pathname; });
  $('#copyNo').addEventListener('click', async () => { try { await navigator.clipboard.writeText(no); toast('Gönderi numarası kopyalandı.', 'info'); } catch (err) { toast('Kopyalama desteklenmiyor.', 'info'); } });
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/* ---------------- Demo (?demo=2 | 3 | zarf | done) ---------------- */
const demo = new URLSearchParams(location.search).get('demo');
const fill1 = () => { S.rc = { cc: 'DE', addr: { street: 'Alexanderplatz 1', zip: '10178', city: 'Berlin', region: 'Berlin' }, query: 'Alexanderplatz 1, 10178 Berlin', name: 'Lena Hoffmann', company: 'Hoffmann Schmuck GmbH', phone: '1512 3456789', email: 'lena@hoffmann-schmuck.de', bill: null }; S.done[1] = true; };
const fill2 = () => { S.type = 'paket'; S.pkgs = [{ w: '14', l: '12', h: '26', kg: '1.2', qty: '2', ref: 'REF-2026-0142' }, { w: '30', l: '20', h: '15', kg: '2.4', qty: '1', ref: 'REF-2026-0143' }]; S.svc = 'hizli'; S.done[2] = true; };
const fill3 = () => { Object.assign(S.c, { kime: 'ticari', taxId: 'DE811569869', inv: 'sistem', cur: 'USD', items: [{ desc: 'Gümüş kolye', hs: '711311', origin: 'Türkiye', unit: 'Adet', qty: 11, price: 23 }, { desc: 'Örme halı', hs: '570500', origin: 'Türkiye', unit: 'Adet', qty: 2, price: 45 }], fast: true, sign: true, ins: true }); S.done[3] = true; };
if (demo === '2') { fill1(); S.open = 2; }
else if (demo === '3') { fill1(); fill2(); S.open = 3; }
else if (demo === '2p') { fill1(); fill2(); S.done[2] = false; S.open = 2; }
else if (demo === 'full') { fill1(); fill2(); fill3(); S.done[3] = false; S.c.etgb = true; S.c.cacc = true; S.open = 3; }
else if (demo === 'zarf') { fill1(); S.type = 'zarf'; S.svc = 'zarf'; S.open = 2; }
else if (demo === 'done') { fill1(); fill2(); fill3(); S.open = 0; }

P.hydrateIcons();
renderAll();
if (demo === 'done') submit();
if (demo === 'full') renderPanel();
})();
