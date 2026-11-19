'use strict';
window.__appLoaded = true;

/* ================= Konfigurasi ================= */
// Denominasi wang kertas Monopoly sebenar
const DENOMS = [500, 100, 50, 20, 10, 5, 1];
const NOTE_COLORS = {
  1: '#f4f4ee', 5: '#f4a6c0', 10: '#f7e463', 20: '#7fd18b',
  50: '#6fa8f0', 100: '#e6cf9f', 500: '#f59b42'
};
const PALETTE = ['#ef4444', '#f59e0b', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#a3a3a3'];
const KEY = 'monopoly-bank-nfc-v1';
const MAX_PLAYERS = 8;

/* ================= State ================= */
function defaultState() {
  return { players: [], history: [], settings: { start: 1500, symbol: 'M', sim: false, sound: true } };
}
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && Array.isArray(s.players)) {
      s.history = s.history || [];
      s.settings = Object.assign(defaultState().settings, s.settings || {});
      return s;
    }
  } catch (e) { /* abaikan */ }
  return defaultState();
}
let state = load();
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* abaikan */ }
}

/* ================= Util ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = n => state.settings.symbol + Number(n).toLocaleString('en-US');
const byUid = uid => state.players.find(p => p.uid === uid);
const byId = id => state.players.find(p => p.id === id);
const vibe = (p = 60) => { try { navigator.vibrate && navigator.vibrate(p); } catch (e) { /* abaikan */ } };

/* ================= Bunyi (dijana dalam kod, tiada fail audio) ================= */
const Sound = {
  ctx: null,
  get enabled() { return state.settings.sound !== false; },
  unlock() {
    try {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        this.ctx = new AC();
      }
      if (this.ctx.state === 'suspended') this.ctx.resume();
    } catch (e) { /* abaikan */ }
  },
  tone(freq, start, dur, type = 'sine', gain = 0.25) {
    const c = this.ctx;
    const t = c.currentTime + start;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(c.destination);
    o.start(t); o.stop(t + dur + 0.05);
  },
  play(fn) {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ctx) return;
    try { fn.call(this); } catch (e) { /* abaikan */ }
  },
  scan()       { this.play(function () { this.tone(1175, 0, 0.12, 'sine', 0.22); this.tone(1568, 0.1, 0.18, 'sine', 0.22); }); },
  registered() { this.play(function () { [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.12 + i * 0.09, 0.35, 'triangle', 0.2)); }); },
  success()    { this.play(function () { [659, 784, 988, 1319].forEach((f, i) => this.tone(f, i * 0.09, 0.45, 'triangle', 0.22)); }); },
  warning()    { this.play(function () { this.tone(220, 0, 0.25, 'square', 0.12); this.tone(220, 0.32, 0.25, 'square', 0.12); }); },
  error()      { this.play(function () { this.tone(330, 0, 0.18, 'sawtooth', 0.12); this.tone(220, 0.16, 0.35, 'sawtooth', 0.12); }); }
};
// Pelayar hanya benarkan bunyi selepas pengguna menyentuh skrin
['pointerdown', 'keydown', 'touchstart'].forEach(ev =>
  document.addEventListener(ev, () => Sound.unlock(), { passive: true }));

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}
function openModal(id) { $('#' + id).classList.add('open'); }
function closeModal(id) { $('#' + id).classList.remove('open'); }

function breakdown(amount) {
  let left = amount;
  const out = [];
  for (const d of DENOMS) {
    const n = Math.floor(left / d);
    if (n > 0) { out.push([d, n]); left -= n * d; }
  }
  return out;
}

/* ================= NFC ================= */
const NFC = {
  ok: 'NDEFReader' in window,
  started: false,
  listener: null,
  lastAt: 0,
  async start() {
    if (this.started) return;
    const reader = new NDEFReader();
    await reader.scan();
    reader.addEventListener('reading', e => this.onRead(e));
    reader.addEventListener('readingerror', () => {
      if (this.listener) setScanErr('Kad tak dapat dibaca. Cuba dekatkan semula.');
    });
    this.started = true;
  },
  onRead(e) {
    const now = Date.now();
    if (!this.listener || now - this.lastAt < 1500) return;
    const uid = (e.serialNumber || '').toUpperCase();
    if (!uid) { setScanErr('Kad ini tiada nombor siri. Guna kad lain.'); return; }
    this.lastAt = now;
    const l = this.listener;
    this.listener = null;
    l(uid);
  }
};

function useSim() { return !NFC.ok || state.settings.sim; }
function nfcErrMsg(err) {
  if (!err) return 'Ralat NFC.';
  if (err.name === 'NotAllowedError') return 'Kebenaran NFC ditolak. Benarkan NFC untuk laman ini dalam tetapan Chrome.';
  if (err.name === 'NotSupportedError') return 'NFC dimatikan. Hidupkan NFC dalam tetapan telefon.';
  return err.message || 'Ralat NFC.';
}
function setScanErr(msg) { $('#scanErr').textContent = msg || ''; }

let scanDone = null;
function scanCard({ title, hint, step = '', mode = 'use' }) {
  return new Promise(resolve => {
    const done = uid => {
      if (uid) Sound.scan();
      NFC.listener = null;
      scanDone = null;
      closeModal('scanModal');
      resolve(uid);
    };
    scanDone = done;
    $('#scanStep').textContent = step;
    $('#scanTitle').textContent = title;
    $('#scanHint').textContent = hint;
    setScanErr('');
    renderSim(mode);
    openModal('scanModal');
    if (!useSim()) {
      NFC.listener = uid => { vibe(); done(uid); };
      NFC.start().catch(err => setScanErr(nfcErrMsg(err)));
    } else {
      NFC.listener = null;
    }
  });
}
$('#scanCancel').addEventListener('click', () => scanDone && scanDone(null));

function renderSim(mode) {
  const box = $('#simBox');
  box.innerHTML = '';
  if (!useSim()) return;
  let html = '<div class="sim-title">MOD SIMULASI — pilih kad di skrin</div>';
  if (mode === 'register') {
    html += '<button class="sim-btn" data-uid="__new__">Jana kad simulasi baru</button>';
  } else {
    const list = state.players.filter(p => p.uid);
    if (!list.length) html += '<div class="muted">Tiada kad didaftar lagi.</div>';
    list.forEach(p => {
      html += `<button class="sim-btn" style="--pc:${p.color}" data-uid="${esc(p.uid)}">${esc(p.name)}<small>${fmt(p.balance)}</small></button>`;
    });
  }
  box.innerHTML = html;
}
$('#simBox').addEventListener('click', e => {
  const b = e.target.closest('.sim-btn');
  if (!b || !scanDone) return;
  let uid = b.dataset.uid;
  if (uid === '__new__') uid = 'SIM-' + Math.random().toString(16).slice(2, 10).toUpperCase();
  scanDone(uid);
});

/* ================= Keputusan ================= */
function showResult(kind, title, html) {
  return new Promise(resolve => {
    const icon = { ok: '✓', err: '✕', warn: '!' }[kind];
    if (kind === 'ok') Sound.success(); else if (kind === 'warn') Sound.warning(); else Sound.error();
    const el = $('#resIcon');
    el.className = 'res-icon ' + kind;
    el.textContent = icon;
    $('#resTitle').textContent = title;
    $('#resBody').innerHTML = html;
    openModal('resultModal');
    $('#resOk').onclick = () => { closeModal('resultModal'); resolve(); };
  });
}

/* ================= Logik wang ================= */
function addHist(h) {
  state.history.unshift(Object.assign({ id: Date.now() + '-' + Math.random().toString(16).slice(2, 6), t: Date.now() }, h));
  if (state.history.length > 200) state.history.length = 200;
}

async function doTransfer() {
  const amt = transferAmt.get();
  if (!amt || amt <= 0) { toast('Masukkan jumlah dulu'); return; }
  if (state.players.length < 2) { toast('Perlu sekurang-kurangnya 2 pemain'); return; }

  // Langkah 1: pengirim
  const uidA = await scanCard({
    step: 'Langkah 1/2', title: 'Pemain 1 — Pengirim',
    hint: `Imbas kad pemain yang akan membayar ${fmt(amt)}`
  });
  if (!uidA) { toast('Dibatalkan'); return; }
  const sender = byUid(uidA);
  if (!sender) {
    vibe([80, 60, 80]);
    return showResult('err', 'Kad tidak dikenali', 'Kad ini belum didaftarkan kepada mana-mana pemain.');
  }
  if (sender.balance < amt) {
    vibe([120, 60, 120]);
    return showResult('warn', 'Baki tak cukup',
      `<b>${esc(sender.name)}</b> hanya ada <b>${fmt(sender.balance)}</b>.<br>
       Jumlah diperlukan <b>${fmt(amt)}</b>.
       <div class="res-line"><span>Kurang</span><b>${fmt(amt - sender.balance)}</b></div>`);
  }

  // Langkah 2: penerima
  const uidB = await scanCard({
    step: 'Langkah 2/2', title: 'Pemain 2 — Penerima',
    hint: `✓ ${sender.name} disahkan (baki ${fmt(sender.balance)}). Imbas kad penerima.`
  });
  if (!uidB) { toast('Dibatalkan — tiada wang dipindah'); return; }
  const receiver = byUid(uidB);
  if (!receiver) {
    vibe([80, 60, 80]);
    return showResult('err', 'Kad tidak dikenali', 'Kad penerima belum didaftarkan.');
  }
  if (receiver.id === sender.id) {
    vibe([80, 60, 80]);
    return showResult('err', 'Kad sama', 'Pengirim dan penerima tidak boleh pemain yang sama.');
  }

  // Sahkan semula & laksana
  if (sender.balance < amt) return showResult('warn', 'Baki tak cukup', 'Baki berubah. Sila cuba lagi.');
  sender.balance -= amt;
  receiver.balance += amt;
  addHist({ type: 'transfer', from: sender.id, to: receiver.id, fromName: sender.name, toName: receiver.name, amount: amt });
  save(); renderAll(); vibe([60, 40, 60]);
  transferAmt.clear();

  await showResult('ok', 'Pindahan berjaya',
    `<div class="res-line"><span>${esc(sender.name)}</span><b>−${fmt(amt)}</b></div>
     <div class="res-line"><span>${esc(receiver.name)}</span><b>+${fmt(amt)}</b></div>
     <div class="res-line"><span>Baki ${esc(sender.name)}</span><b>${fmt(sender.balance)}</b></div>
     <div class="res-line"><span>Baki ${esc(receiver.name)}</span><b>${fmt(receiver.balance)}</b></div>`);
}

async function doBank(dir, amt, note) {
  if (!amt || amt <= 0) { toast('Masukkan jumlah dulu'); return; }
  const uid = await scanCard({
    title: dir === 'in' ? 'Bank bayar pemain' : 'Pemain bayar bank',
    hint: `${note || (dir === 'in' ? 'Terima' : 'Bayar')} ${fmt(amt)} — imbas kad pemain`
  });
  if (!uid) { toast('Dibatalkan'); return; }
  const p = byUid(uid);
  if (!p) { vibe([80, 60, 80]); return showResult('err', 'Kad tidak dikenali', 'Kad ini belum didaftarkan.'); }
  if (dir === 'out' && p.balance < amt) {
    vibe([120, 60, 120]);
    return showResult('warn', 'Baki tak cukup',
      `<b>${esc(p.name)}</b> hanya ada <b>${fmt(p.balance)}</b>.<br>Jumlah diperlukan <b>${fmt(amt)}</b>.
       <div class="res-line"><span>Kurang</span><b>${fmt(amt - p.balance)}</b></div>`);
  }
  p.balance += dir === 'in' ? amt : -amt;
  addHist({ type: dir === 'in' ? 'bank-in' : 'bank-out', player: p.id, playerName: p.name, amount: amt, note: note || '' });
  save(); renderAll(); vibe([60, 40, 60]);
  bankAmt.clear();
  await showResult('ok', dir === 'in' ? 'Wang diterima' : 'Bayaran berjaya',
    `<div class="res-line"><span>${esc(p.name)}</span><b>${dir === 'in' ? '+' : '−'}${fmt(amt)}</b></div>
     <div class="res-line"><span>Baki baru</span><b>${fmt(p.balance)}</b></div>`);
}

async function checkBalance() {
  const uid = await scanCard({ title: 'Semak baki', hint: 'Imbas kad pemain untuk lihat baki.' });
  if (!uid) return;
  const p = byUid(uid);
  if (!p) { vibe([80, 60, 80]); return showResult('err', 'Kad tidak dikenali', 'Kad ini belum didaftarkan.'); }
  showResult('ok', p.name, `<div class="res-line"><span>Baki</span><b>${fmt(p.balance)}</b></div>`);
}

async function registerCard(p) {
  const uid = await scanCard({
    mode: 'register', title: 'Daftar kad — ' + p.name,
    hint: 'Letakkan kad NFC yang mahu dipasangkan dengan pemain ini.'
  });
  if (!uid) return;
  const other = byUid(uid);
  if (other && other.id !== p.id) {
    vibe([80, 60, 80]);
    return showResult('err', 'Kad sudah digunakan', `Kad ini sudah didaftarkan kepada <b>${esc(other.name)}</b>.`);
  }
  p.uid = uid;
  Sound.registered();
  save(); renderAll(); vibe();
  toast('Kad didaftarkan untuk ' + p.name);
}

function undoLast() {
  const h = state.history[0];
  if (!h) { toast('Tiada transaksi'); return; }
  if (!confirm('Buat asal transaksi terakhir?')) return;
  if (h.type === 'transfer') {
    const a = byId(h.from), b = byId(h.to);
    if (!a || !b) return toast('Pemain sudah dipadam');
    if (b.balance < h.amount) return toast('Baki penerima tak cukup untuk buat asal');
    b.balance -= h.amount; a.balance += h.amount;
  } else {
    const p = byId(h.player);
    if (!p) return toast('Pemain sudah dipadam');
    if (h.type === 'bank-in') {
      if (p.balance < h.amount) return toast('Baki tak cukup untuk buat asal');
      p.balance -= h.amount;
    } else {
      p.balance += h.amount;
    }
  }
  state.history.shift();
  save(); renderAll(); toast('Transaksi dibuat asal');
}

/* ================= Pemilih jumlah ================= */
function amountPicker(root) {
  root.innerHTML = `
    <div class="amt-wrap">
      <div class="amt-row">
        <div class="amt-box"><span class="amt-sym"></span>
          <input type="text" inputmode="numeric" placeholder="0" maxlength="7" aria-label="Jumlah"></div>
      </div>
      <div class="denoms"></div>
    </div>`;
  const input = $('input', root);
  const sym = $('.amt-sym', root);
  const wrap = $('.denoms', root);
  wrap.innerHTML = [...DENOMS].reverse().map(d =>
    `<button type="button" class="denom" data-d="${d}" style="background:${NOTE_COLORS[d]}">${d}</button>`
  ).join('') + '<button type="button" class="denom clear">Kosong</button>';
  input.addEventListener('input', () => { input.value = input.value.replace(/\D/g, '').replace(/^0+(?=\d)/, ''); });
  wrap.addEventListener('click', e => {
    const b = e.target.closest('.denom');
    if (!b) return;
    if (b.classList.contains('clear')) { input.value = ''; return; }
    input.value = String((parseInt(input.value, 10) || 0) + parseInt(b.dataset.d, 10));
    vibe(15);
  });
  return {
    get: () => parseInt(input.value, 10) || 0,
    clear: () => { input.value = ''; },
    refresh: () => { sym.textContent = state.settings.symbol; }
  };
}

/* ================= Render ================= */
function renderPlayers() {
  const total = state.players.reduce((s, p) => s + p.balance, 0);
  $('#totalMoney').textContent = fmt(total);
  const list = $('#playerList');
  if (!state.players.length) {
    list.innerHTML = '<div class="empty">Belum ada pemain.<br>Tambah pemain di atas untuk mula.</div>';
    return;
  }
  list.innerHTML = state.players.map(p => {
    const notes = breakdown(p.balance).map(([d, n]) =>
      `<span class="note" style="background:${NOTE_COLORS[d]}">${n}×${d}</span>`).join('');
    return `
    <div class="player" style="--pc:${p.color}" data-id="${p.id}">
      <div class="p-top">
        <div class="p-name"><span class="dot"></span>${esc(p.name)}</div>
        <span class="badge ${p.uid ? 'ok' : 'no'}">${p.uid ? 'Kad ✓' : 'Belum ada kad'}</span>
      </div>
      <div class="p-bal">${fmt(p.balance)}</div>
      <div class="notes">${notes || '<span class="note" style="background:#555;color:#fff">Tiada wang</span>'}</div>
      <div class="p-actions">
        <button class="btn ghost" data-act="reg">${p.uid ? 'Tukar kad' : 'Daftar kad'}</button>
        <button class="btn ghost" data-act="del">Padam</button>
      </div>
    </div>`;
  }).join('');
}

function renderHistory() {
  const el = $('#historyList');
  if (!state.history.length) { el.innerHTML = '<div class="empty">Tiada transaksi lagi.</div>'; return; }
  const time = t => new Date(t).toLocaleTimeString('ms-MY', { hour: '2-digit', minute: '2-digit' });
  el.innerHTML = state.history.map(h => {
    let main, sub, cls, sign;
    if (h.type === 'transfer') {
      main = `${esc(h.fromName)} → ${esc(h.toName)}`; sub = 'Pindahan pemain'; cls = 'neu'; sign = '';
    } else if (h.type === 'bank-in') {
      main = esc(h.playerName); sub = 'Bank → ' + esc(h.note || 'Terima'); cls = 'pos'; sign = '+';
    } else {
      main = esc(h.playerName); sub = 'Bank ← ' + esc(h.note || 'Bayar'); cls = 'neg'; sign = '−';
    }
    return `<div class="h-item"><div><div class="h-main">${main}</div>
      <div class="h-sub">${sub} · ${time(h.t)}</div></div>
      <div class="h-amt ${cls}">${sign}${fmt(h.amount)}</div></div>`;
  }).join('');
}

function renderQuick() {
  $$('[data-q]').forEach(b => { b.textContent = fmt(b.dataset.q); });
}
function renderChip() {
  const c = $('#nfcChip');
  if (!NFC.ok) { c.textContent = 'Simulasi'; c.className = 'chip sim'; }
  else if (state.settings.sim) { c.textContent = 'Simulasi'; c.className = 'chip sim'; }
  else { c.textContent = 'NFC aktif'; c.className = 'chip on'; }
}
function renderAll() {
  renderPlayers(); renderHistory(); renderQuick(); renderChip();
  transferAmt.refresh(); bankAmt.refresh();
}

/* ================= Init UI ================= */
const transferAmt = amountPicker($('#transferAmt'));
const bankAmt = amountPicker($('#bankAmt'));

$$('.tab').forEach(t => t.addEventListener('click', () => {
  $$('.tab').forEach(x => x.classList.toggle('active', x === t));
  $$('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + t.dataset.view));
  window.scrollTo({ top: 0 });
}));

$('#addForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#newName').value.trim();
  if (!name) return;
  if (state.players.length >= MAX_PLAYERS) return toast('Maksimum ' + MAX_PLAYERS + ' pemain');
  if (state.players.some(p => p.name.toLowerCase() === name.toLowerCase())) return toast('Nama sudah wujud');
  const used = state.players.map(p => p.color);
  const color = PALETTE.find(c => !used.includes(c)) || PALETTE[0];
  const p = {
    id: 'p' + Date.now().toString(36) + Math.random().toString(16).slice(2, 4),
    name, color, uid: null, balance: Number(state.settings.start) || 0
  };
  state.players.push(p);
  $('#newName').value = '';
  save(); renderAll();
  registerCard(p);
});

$('#playerList').addEventListener('click', e => {
  const btn = e.target.closest('[data-act]');
  if (!btn) return;
  const p = byId(btn.closest('.player').dataset.id);
  if (!p) return;
  if (btn.dataset.act === 'reg') registerCard(p);
  if (btn.dataset.act === 'del') {
    if (!confirm(`Padam pemain ${p.name}?`)) return;
    state.players = state.players.filter(x => x.id !== p.id);
    save(); renderAll();
  }
});

$('#btnCheck').addEventListener('click', checkBalance);
$('#btnTransfer').addEventListener('click', doTransfer);
$('#btnBankIn').addEventListener('click', () => doBank('in', bankAmt.get(), 'Bank bayar'));
$('#btnBankOut').addEventListener('click', () => doBank('out', bankAmt.get(), 'Bayar bank'));
$$('.quick').forEach(q => q.addEventListener('click', () =>
  doBank(q.dataset.dir, parseInt(q.dataset.amt, 10), q.dataset.note)));
$('#btnUndo').addEventListener('click', undoLast);

/* tetapan */
$('#btnSettings').addEventListener('click', () => {
  $('#setStart').value = state.settings.start;
  $('#setSymbol').value = state.settings.symbol;
  $('#setSim').checked = !!state.settings.sim;
  $('#setSound').checked = state.settings.sound !== false;
  $('#setSim').disabled = !NFC.ok;
  openModal('settingsModal');
});
$('#setSound').addEventListener('change', e => { if (e.target.checked) { state.settings.sound = true; Sound.success(); } });
$('#setClose').addEventListener('click', () => {
  const st = parseInt($('#setStart').value, 10);
  state.settings.start = isNaN(st) || st < 0 ? 1500 : st;
  state.settings.symbol = $('#setSymbol').value;
  state.settings.sim = $('#setSim').checked;
  state.settings.sound = $('#setSound').checked;
  save(); renderAll(); closeModal('settingsModal');
});
$('#btnResetGame').addEventListener('click', () => {
  if (!confirm('Set semula semua baki dan sejarah? Pemain & kad kekal.')) return;
  const st = Number($('#setStart').value);
  const start = isNaN(st) || st < 0 ? state.settings.start : st;
  state.settings.start = start;
  state.players.forEach(p => { p.balance = start; });
  state.history = [];
  save(); renderAll(); closeModal('settingsModal'); toast('Permainan disetkan semula');
});
$('#btnWipe').addEventListener('click', () => {
  if (!confirm('Padam SEMUA pemain, kad dan sejarah?')) return;
  const settings = state.settings;
  state = defaultState();
  state.settings = settings;
  save(); renderAll(); closeModal('settingsModal'); toast('Semua dipadam');
});

renderAll();

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => { /* abaikan */ });
  });
}