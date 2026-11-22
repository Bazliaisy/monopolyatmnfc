'use strict';
window.__appLoaded = true;

/* ================= Config ================= */
// Real Monopoly banknote denominations
const DENOMS = [500, 100, 50, 20, 10, 5, 1];
const NOTE_COLORS = {
  1: '#f4f4ee', 5: '#f4a6c0', 10: '#f7e463', 20: '#7fd18b',
  50: '#6fa8f0', 100: '#e6cf9f', 500: '#f59b42'
};
const PALETTE = ['#ef4444', '#f59e0b', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#a3a3a3'];
const KEY = 'monopoly-bank-nfc-v1';
const APP_VERSION = '1.2.0';
const BIG_TRANSFER = 500;
const RENT_CHIPS = [2, 4, 6, 10, 14, 20, 26, 35, 50, 100];
const MAX_PLAYERS = 8;
const TABS = ['players', 'transfer', 'bank', 'history'];
const THEMES = ['auto', 'dark', 'light', 'glass'];
const ACCENTS = ['blue', 'green', 'purple', 'orange', 'pink'];

/* ================= Languages ================= */
const I18N = {
  en: {
    app_sub: 'Digital NFC card bank',
    settings: 'Settings',
    chip_nfc: 'NFC active', chip_sim: 'Simulation',
    total_money: 'Total money in play',
    new_player_ph: 'New player name', add: '+ Add',
    check_balance: 'Check balance (scan card)',
    empty_players: 'No players yet.<br>Add a player above to start.',
    card_ready: 'Card ready', no_card: 'No card yet', no_money: 'No money',
    reg_card: 'Register card', change_card: 'Change card', delete: 'Delete',
    tab_players: 'Players', tab_transfer: 'Transfer', tab_bank: 'Bank', tab_history: 'History',
    transfer_title: 'Transfer money between players',
    transfer_desc: 'Choose an amount → P1 scans card (balance checked) → P2 scans card to receive.',
    start_transfer: 'Start transfer', clear: 'Clear', amount: 'Amount',
    bank_title: 'Bank actions', bank_desc: 'Quick — scan the player’s card after tapping.',
    other_amount: 'Other amount', bank_pays: 'Bank pays player', player_pays: 'Player pays bank',
    note_go: 'Pass GO', note_income: 'Income Tax', note_luxury: 'Luxury Tax', note_jail: 'Jail Fine',
    note_bank_pays: 'Bank pays', note_player_pays: 'Pays bank', note_receive: 'Receive', note_pay: 'Pay',
    history_title: 'Transaction history', undo: 'Undo last', no_tx_yet: 'No transactions yet.',
    player_transfer: 'Player transfer',
    cancel: 'Cancel', ok: 'OK',
    step_1_2: 'Step 1/2', step_2_2: 'Step 2/2',
    p1_sender: 'Player 1 — Sender', p2_receiver: 'Player 2 — Receiver',
    hint_sender: 'Scan the card of the player paying {amt}',
    hint_receiver: '{name} verified (balance {bal}). Scan the receiver’s card.',
    sim_title: 'SIMULATION MODE — pick a card on screen',
    sim_new_card: 'Generate new simulated card', sim_no_cards: 'No cards registered yet.',
    err_unreadable: 'Could not read the card. Hold it closer.',
    err_no_serial: 'This card has no serial number. Use another card.',
    err_nfc: 'NFC error.',
    err_denied: 'NFC permission denied. Allow NFC for this site in Chrome settings.',
    err_off: 'NFC is turned off. Enable NFC in your phone settings.',
    unknown_card: 'Card not recognised', unknown_card_msg: 'This card is not registered to any player.',
    receiver_unknown: 'The receiver’s card is not registered.',
    same_card: 'Same card', same_card_msg: 'Sender and receiver cannot be the same player.',
    insufficient: 'Insufficient balance',
    insufficient_msg: '<b>{name}</b> only has <b>{bal}</b>.<br>Amount needed: <b>{amt}</b>.',
    short_by: 'Short by', balance_changed: 'Balance changed. Please try again.',
    transfer_ok: 'Transfer successful', balance_of: 'Balance {name}',
    cancelled: 'Cancelled', cancelled_transfer: 'Cancelled — no money moved',
    enter_amount: 'Enter an amount first', need_two: 'At least 2 players are needed',
    money_received: 'Money received', payment_ok: 'Payment successful',
    new_balance: 'New balance', balance: 'Balance',
    check_title: 'Check balance', check_hint: 'Scan a player’s card to see the balance.',
    register_title: 'Register card — {name}', register_hint: 'Place the NFC card you want to link to this player.',
    card_in_use: 'Card already in use', card_in_use_msg: 'This card is already registered to <b>{name}</b>.',
    card_registered: 'Card registered for {name}',
    bank_hint: '{note}: {amt} — scan the player’s card',
    undo_title: 'Undo last transaction?', undo_body: 'Money will be restored to how it was before that transaction.',
    undo_ok: 'Undo', no_tx: 'No transactions', player_deleted: 'Player was deleted',
    recv_low: 'Receiver’s balance is too low to undo', low_undo: 'Balance too low to undo',
    undone: 'Transaction undone',
    del_title: 'Delete player {name}?', del_body: 'The player and their card will be removed. This cannot be undone.',
    settings_title: 'Settings', set_start: 'Starting money for new players', set_symbol: 'Currency symbol',
    set_sim: 'Simulation mode (no NFC, pick the card on screen)',
    set_sound: 'Sound (card registered, warning, success)', set_lang: 'Language',
    reset_btn: 'Restart game (keep players)', wipe_btn: 'Delete all', done: 'Done',
    reset_title: 'Restart the game?', reset_body: 'All balances are reset and history is cleared. Players and cards are kept.',
    reset_ok: 'Restart', game_reset: 'Game restarted',
    wipe_title: 'Delete all data?', wipe_body: 'All players, cards and history will be deleted. This cannot be undone.',
    wipe_ok: 'Delete all', wiped: 'Everything deleted',
    max_players: 'Maximum {n} players', name_exists: 'Name already exists',
    legal: '© Unofficial fan project. Not affiliated with or endorsed by Hasbro. Monopoly is a trademark of Hasbro, Inc.',
    dismiss: 'Dismiss',
    nfc_unsupported: 'NFC is not available in this browser. Use Chrome on Android with NFC turned on, or enable Simulation mode in Settings.',
    nfc_ios: 'iPhone and iPad browsers do not support Web NFC. Use an Android phone with Chrome, or use Simulation mode in Settings.',
    rank_title: 'Ranking',
    edit: 'Edit', edit_title: 'Edit player', edit_name: 'Name', edit_color: 'Colour', save: 'Save', saved: 'Saved',
    quick_amounts: 'Quick amounts',
    bank_note_label: 'Reason (optional)', note_none: 'Other', note_mortgage: 'Mortgage', note_redeem: 'Redeem mortgage',
    note_property: 'Property', note_buildings: 'Houses & hotels', note_auction: 'Auction',
    pot_title: 'Free Parking pot', pot_desc: 'Taxes and fines go into the pot. Collect it when a player lands on Free Parking.',
    pot_collect: 'Collect pot', pot_collect_hint: 'Scan the player who landed on Free Parking to collect {amt}.',
    pot_empty: 'The pot is empty.', pot_collected: 'Pot collected', note_pot: 'Free Parking',
    set_pot: 'Free Parking pot (taxes and fines go into the pot)',
    set_confirm: 'Confirm transfers of {amt} or more', set_wake: 'Keep screen on while playing',
    confirm_tx_title: 'Confirm transfer', confirm_tx_body: '{from} pays {to} {amt}.', confirm_send: 'Send',
    set_backup: 'Backup', export_btn: 'Export backup', import_btn: 'Import backup', exported: 'Backup saved',
    import_title: 'Import backup?', import_body: 'This replaces all current players, history and settings.',
    import_ok: 'Import', imported: 'Backup imported', import_bad: 'That file is not a valid backup.',
    hist_all: 'All players', csv_btn: 'CSV', csv_empty: 'No transactions to export.', version: 'Version',
    close: 'Close', set_theme: 'Theme', theme_auto: 'Auto', theme_dark: 'Dark', theme_light: 'Light', theme_glass: 'Glass',
    set_accent: 'Accent colour', acc_blue: 'Blue', acc_green: 'Green', acc_purple: 'Purple', acc_orange: 'Orange', acc_pink: 'Pink'
  },
  ms: {
    app_sub: 'Bank digital kad NFC',
    settings: 'Tetapan',
    chip_nfc: 'NFC aktif', chip_sim: 'Simulasi',
    total_money: 'Jumlah wang dalam permainan',
    new_player_ph: 'Nama pemain baru', add: '+ Tambah',
    check_balance: 'Semak baki (scan kad)',
    empty_players: 'Belum ada pemain.<br>Tambah pemain di atas untuk mula.',
    card_ready: 'Kad sedia', no_card: 'Belum ada kad', no_money: 'Tiada wang',
    reg_card: 'Daftar kad', change_card: 'Tukar kad', delete: 'Padam',
    tab_players: 'Pemain', tab_transfer: 'Pindah', tab_bank: 'Bank', tab_history: 'Sejarah',
    transfer_title: 'Pindah wang antara pemain',
    transfer_desc: 'Pilih jumlah → P1 scan kad (baki disahkan) → P2 scan kad untuk menerima.',
    start_transfer: 'Mula pindahan', clear: 'Kosong', amount: 'Jumlah',
    bank_title: 'Urusan dengan Bank', bank_desc: 'Cepat — scan kad pemain selepas tekan.',
    other_amount: 'Jumlah lain', bank_pays: 'Bank bayar pemain', player_pays: 'Pemain bayar bank',
    note_go: 'Lalu GO', note_income: 'Cukai Pendapatan', note_luxury: 'Cukai Mewah', note_jail: 'Denda Penjara',
    note_bank_pays: 'Bank bayar', note_player_pays: 'Bayar bank', note_receive: 'Terima', note_pay: 'Bayar',
    history_title: 'Sejarah transaksi', undo: 'Buat asal terakhir', no_tx_yet: 'Tiada transaksi lagi.',
    player_transfer: 'Pindahan pemain',
    cancel: 'Batal', ok: 'OK',
    step_1_2: 'Langkah 1/2', step_2_2: 'Langkah 2/2',
    p1_sender: 'Pemain 1 — Pengirim', p2_receiver: 'Pemain 2 — Penerima',
    hint_sender: 'Imbas kad pemain yang akan membayar {amt}',
    hint_receiver: '{name} disahkan (baki {bal}). Imbas kad penerima.',
    sim_title: 'MOD SIMULASI — pilih kad di skrin',
    sim_new_card: 'Jana kad simulasi baru', sim_no_cards: 'Tiada kad didaftar lagi.',
    err_unreadable: 'Kad tak dapat dibaca. Cuba dekatkan semula.',
    err_no_serial: 'Kad ini tiada nombor siri. Guna kad lain.',
    err_nfc: 'Ralat NFC.',
    err_denied: 'Kebenaran NFC ditolak. Benarkan NFC untuk laman ini dalam tetapan Chrome.',
    err_off: 'NFC dimatikan. Hidupkan NFC dalam tetapan telefon.',
    unknown_card: 'Kad tidak dikenali', unknown_card_msg: 'Kad ini belum didaftarkan kepada mana-mana pemain.',
    receiver_unknown: 'Kad penerima belum didaftarkan.',
    same_card: 'Kad sama', same_card_msg: 'Pengirim dan penerima tidak boleh pemain yang sama.',
    insufficient: 'Baki tak cukup',
    insufficient_msg: '<b>{name}</b> hanya ada <b>{bal}</b>.<br>Jumlah diperlukan <b>{amt}</b>.',
    short_by: 'Kurang', balance_changed: 'Baki berubah. Sila cuba lagi.',
    transfer_ok: 'Pindahan berjaya', balance_of: 'Baki {name}',
    cancelled: 'Dibatalkan', cancelled_transfer: 'Dibatalkan — tiada wang dipindah',
    enter_amount: 'Masukkan jumlah dulu', need_two: 'Perlu sekurang-kurangnya 2 pemain',
    money_received: 'Wang diterima', payment_ok: 'Bayaran berjaya',
    new_balance: 'Baki baru', balance: 'Baki',
    check_title: 'Semak baki', check_hint: 'Imbas kad pemain untuk lihat baki.',
    register_title: 'Daftar kad — {name}', register_hint: 'Letakkan kad NFC yang mahu dipasangkan dengan pemain ini.',
    card_in_use: 'Kad sudah digunakan', card_in_use_msg: 'Kad ini sudah didaftarkan kepada <b>{name}</b>.',
    card_registered: 'Kad didaftarkan untuk {name}',
    bank_hint: '{note}: {amt} — imbas kad pemain',
    undo_title: 'Buat asal transaksi terakhir?', undo_body: 'Wang akan dikembalikan seperti sebelum transaksi itu.',
    undo_ok: 'Buat asal', no_tx: 'Tiada transaksi', player_deleted: 'Pemain sudah dipadam',
    recv_low: 'Baki penerima tak cukup untuk buat asal', low_undo: 'Baki tak cukup untuk buat asal',
    undone: 'Transaksi dibuat asal',
    del_title: 'Padam pemain {name}?', del_body: 'Pemain dan kadnya akan dikeluarkan. Tindakan ini tidak boleh dibuat asal.',
    settings_title: 'Tetapan', set_start: 'Wang permulaan pemain baru', set_symbol: 'Simbol mata wang',
    set_sim: 'Mod simulasi (tiada NFC, pilih kad di skrin)',
    set_sound: 'Bunyi (daftar kad, amaran, berjaya)', set_lang: 'Bahasa',
    reset_btn: 'Mula semula (kekal pemain)', wipe_btn: 'Padam semua', done: 'Siap',
    reset_title: 'Mula semula permainan?', reset_body: 'Semua baki disetkan semula dan sejarah dipadam. Pemain dan kad kekal.',
    reset_ok: 'Mula semula', game_reset: 'Permainan disetkan semula',
    wipe_title: 'Padam semua data?', wipe_body: 'Semua pemain, kad dan sejarah akan dipadam. Tindakan ini tidak boleh dibuat asal.',
    wipe_ok: 'Padam semua', wiped: 'Semua dipadam',
    max_players: 'Maksimum {n} pemain', name_exists: 'Nama sudah wujud',
    legal: '© Projek peminat tidak rasmi. Tiada kaitan dengan atau disokong oleh Hasbro. Monopoly ialah tanda dagangan Hasbro, Inc.',
    dismiss: 'Tutup',
    nfc_unsupported: 'NFC tidak tersedia dalam pelayar ini. Guna Chrome di Android dengan NFC dihidupkan, atau aktifkan Mod simulasi dalam Tetapan.',
    nfc_ios: 'Pelayar iPhone dan iPad tidak menyokong Web NFC. Guna telefon Android dengan Chrome, atau guna Mod simulasi dalam Tetapan.',
    rank_title: 'Kedudukan',
    edit: 'Edit', edit_title: 'Edit pemain', edit_name: 'Nama', edit_color: 'Warna', save: 'Simpan', saved: 'Disimpan',
    quick_amounts: 'Jumlah pantas',
    bank_note_label: 'Sebab (pilihan)', note_none: 'Lain-lain', note_mortgage: 'Gadai', note_redeem: 'Tebus gadaian',
    note_property: 'Harta', note_buildings: 'Rumah & hotel', note_auction: 'Lelongan',
    pot_title: 'Pot Free Parking', pot_desc: 'Cukai dan denda masuk ke dalam pot. Ambil bila pemain berhenti di Free Parking.',
    pot_collect: 'Ambil pot', pot_collect_hint: 'Imbas pemain yang berhenti di Free Parking untuk ambil {amt}.',
    pot_empty: 'Pot kosong.', pot_collected: 'Pot diambil', note_pot: 'Free Parking',
    set_pot: 'Pot Free Parking (cukai dan denda masuk pot)',
    set_confirm: 'Sahkan pemindahan {amt} atau lebih', set_wake: 'Kekalkan skrin hidup semasa bermain',
    confirm_tx_title: 'Sahkan pemindahan', confirm_tx_body: '{from} bayar {to} {amt}.', confirm_send: 'Hantar',
    set_backup: 'Sandaran', export_btn: 'Eksport sandaran', import_btn: 'Import sandaran', exported: 'Sandaran disimpan',
    import_title: 'Import sandaran?', import_body: 'Ini menggantikan semua pemain, sejarah dan tetapan semasa.',
    import_ok: 'Import', imported: 'Sandaran diimport', import_bad: 'Fail itu bukan sandaran yang sah.',
    hist_all: 'Semua pemain', csv_btn: 'CSV', csv_empty: 'Tiada transaksi untuk dieksport.', version: 'Versi',
    close: 'Tutup', set_theme: 'Tema', theme_auto: 'Auto', theme_dark: 'Gelap', theme_light: 'Cerah', theme_glass: 'Kaca',
    set_accent: 'Warna aksen', acc_blue: 'Biru', acc_green: 'Hijau', acc_purple: 'Ungu', acc_orange: 'Jingga', acc_pink: 'Merah jambu'
  }
};
// Notes saved by older versions (Malay text) -> language keys
const LEGACY_NOTES = {
  'Lalu GO': 'note_go', 'Cukai Pendapatan': 'note_income', 'Cukai Mewah': 'note_luxury',
  'Denda Penjara': 'note_jail', 'Bank bayar': 'note_bank_pays', 'Bayar bank': 'note_player_pays'
};

/* ================= State ================= */
function defaultState() {
  return { players: [], history: [], pot: 0, settings: { start: 1500, symbol: 'M', sim: false, sound: true, lang: 'en', theme: 'dark', accent: 'blue', pot: false, confirmBig: true, wake: true } };
}
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && Array.isArray(s.players)) {
      s.history = s.history || [];
      s.pot = Math.max(0, Math.floor(Number(s.pot) || 0));
      s.settings = Object.assign(defaultState().settings, s.settings || {});
      if (!I18N[s.settings.lang]) s.settings.lang = 'en';
      if (!THEMES.includes(s.settings.theme)) s.settings.theme = 'dark';
      if (!ACCENTS.includes(s.settings.accent)) s.settings.accent = 'blue';
      return s;
    }
  } catch (e) { /* ignore */ }
  return defaultState();
}
let state = load();
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
}

/* ================= Util ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = n => state.settings.symbol + Number(n).toLocaleString('en-US');
const byUid = uid => state.players.find(p => p.uid === uid);
const byId = id => state.players.find(p => p.id === id);
const vibe = (p = 60) => { try { navigator.vibrate && navigator.vibrate(p); } catch (e) { /* ignore */ } };

function t(key, vars) {
  const L = I18N[state.settings.lang] || I18N.en;
  let s = L[key] !== undefined ? L[key] : (I18N.en[key] !== undefined ? I18N.en[key] : key);
  if (vars) Object.keys(vars).forEach(k => { s = s.split('{' + k + '}').join(vars[k]); });
  return s;
}
function noteLabel(n) {
  if (!n) return '';
  if (I18N.en[n] !== undefined) return t(n);
  if (LEGACY_NOTES[n]) return t(LEGACY_NOTES[n]);
  return n;
}
function applyI18n() {
  document.documentElement.lang = state.settings.lang;
  $$('[data-i18n]').forEach(e => { e.textContent = t(e.dataset.i18n); });
  $$('[data-i18n-html]').forEach(e => { e.innerHTML = t(e.dataset.i18nHtml); });
  $$('[data-i18n-ph]').forEach(e => { e.placeholder = t(e.dataset.i18nPh); });
  $$('[data-i18n-aria]').forEach(e => { e.setAttribute('aria-label', t(e.dataset.i18nAria)); });
}

/* ================= Theme ================= */
const lightQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
function resolvedTheme() {
  const m = state.settings.theme;
  if (m === 'light' || m === 'dark' || m === 'glass') return m;
  return lightQuery && lightQuery.matches ? 'light' : 'dark';
}
function applyTheme() {
  const th = resolvedTheme();
  const root = document.documentElement;
  root.setAttribute('data-theme', th);
  root.setAttribute('data-accent', state.settings.accent);
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', th === 'light' ? '#e6e9ef' : th === 'glass' ? '#0a0d24' : '#07080b');
  $$('#setTheme button').forEach(b => b.classList.toggle('active', b.dataset.v === state.settings.theme));
  $$('#setAccent .sw').forEach(b => b.classList.toggle('active', b.dataset.v === state.settings.accent));
}
if (lightQuery && lightQuery.addEventListener) {
  lightQuery.addEventListener('change', () => { if (state.settings.theme === 'auto') applyTheme(); });
}

/* ================= Sound (generated in code, no audio files) ================= */
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
    } catch (e) { /* ignore */ }
  },
  tone(freq, start, dur, type = 'sine', gain = 0.25) {
    const c = this.ctx;
    const tm = c.currentTime + start;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, tm);
    g.gain.setValueAtTime(0.0001, tm);
    g.gain.exponentialRampToValueAtTime(gain, tm + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, tm + dur);
    o.connect(g); g.connect(c.destination);
    o.start(tm); o.stop(tm + dur + 0.05);
  },
  play(fn) {
    if (!this.enabled) return;
    this.unlock();
    if (!this.ctx) return;
    try { fn.call(this); } catch (e) { /* ignore */ }
  },
  scan()       { this.play(function () { this.tone(1175, 0, 0.12, 'sine', 0.22); this.tone(1568, 0.1, 0.18, 'sine', 0.22); }); },
  registered() { this.play(function () { [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.12 + i * 0.09, 0.35, 'triangle', 0.2)); }); },
  success()    { this.play(function () { [659, 784, 988, 1319].forEach((f, i) => this.tone(f, i * 0.09, 0.45, 'triangle', 0.22)); }); },
  warning()    { this.play(function () { this.tone(220, 0, 0.25, 'square', 0.12); this.tone(220, 0.32, 0.25, 'square', 0.12); }); },
  error()      { this.play(function () { this.tone(330, 0, 0.18, 'sawtooth', 0.12); this.tone(220, 0.16, 0.35, 'sawtooth', 0.12); }); }
};
// Browsers only allow sound after the user has touched the screen
['pointerdown', 'keydown', 'touchstart'].forEach(ev =>
  document.addEventListener(ev, () => Sound.unlock(), { passive: true }));

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}
function openModal(id) { $('#' + id).classList.add('open'); }
function closeModal(id) { $('#' + id).classList.remove('open'); }
function anyModalOpen() { return $$('.modal.open').length > 0; }

function breakdown(amount) {
  let left = amount;
  const out = [];
  for (const d of DENOMS) {
    const n = Math.floor(left / d);
    if (n > 0) { out.push([d, n]); left -= n * d; }
  }
  return out;
}

/* ================= Backup / export helpers ================= */
function download(name, text, mime) {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
function stamp() {
  const d = new Date(), p = n => String(n).padStart(2, '0');
  return d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '-' + p(d.getHours()) + p(d.getMinutes());
}
function normalizeState(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const d = raw.data && Array.isArray(raw.data.players) ? raw.data : raw;
  if (!Array.isArray(d.players) || d.players.length > MAX_PLAYERS) return null;
  const ids = new Set(), players = [];
  for (const p of d.players) {
    if (!p || typeof p !== 'object') return null;
    const bal = Number(p.balance), id = String(p.id || '');
    if (!Number.isFinite(bal) || bal < 0 || !id || ids.has(id)) return null;
    ids.add(id);
    players.push({
      id, name: String(p.name || '?').slice(0, 14),
      color: /^#[0-9a-f]{6}$/i.test(p.color) ? p.color : PALETTE[0],
      uid: p.uid ? String(p.uid) : null, balance: Math.floor(bal)
    });
  }
  const types = ['transfer', 'bank-in', 'bank-out', 'pot-collect'];
  const history = (Array.isArray(d.history) ? d.history : [])
    .filter(h => h && types.includes(h.type) && Number.isFinite(Number(h.amount)))
    .slice(0, 200).map(h => Object.assign({}, h, { amount: Number(h.amount), t: Number(h.t) || Date.now() }));
  const def = defaultState().settings;
  const s = Object.assign({}, def, d.settings && typeof d.settings === 'object' ? d.settings : {});
  if (!I18N[s.lang]) s.lang = 'en';
  if (!THEMES.includes(s.theme)) s.theme = 'dark';
  if (!ACCENTS.includes(s.accent)) s.accent = 'blue';
  if (!['M', 'RM', '$', '£'].includes(s.symbol)) s.symbol = 'M';
  s.start = Number.isFinite(Number(s.start)) && Number(s.start) >= 0 ? Math.floor(Number(s.start)) : 1500;
  ['sim', 'sound', 'pot', 'confirmBig', 'wake'].forEach(k => { s[k] = !!s[k]; });
  return { players, history, pot: Math.max(0, Math.floor(Number(d.pot) || 0)), settings: s };
}

/* ================= Keep screen on ================= */
let wakeLock = null;
async function applyWake() {
  try {
    if (state.settings.wake !== false && 'wakeLock' in navigator && document.visibilityState === 'visible') {
      if (!wakeLock) {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => { wakeLock = null; });
      }
    } else if (wakeLock) {
      await wakeLock.release(); wakeLock = null;
    }
  } catch (e) { wakeLock = null; }
}
document.addEventListener('visibilitychange', applyWake);
document.addEventListener('pointerdown', () => { if (!wakeLock) applyWake(); }, { passive: true });

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
      if (this.listener) setScanErr(t('err_unreadable'));
    });
    this.started = true;
  },
  onRead(e) {
    const now = Date.now();
    if (!this.listener || now - this.lastAt < 1500) return;
    const uid = (e.serialNumber || '').toUpperCase();
    if (!uid) { setScanErr(t('err_no_serial')); return; }
    this.lastAt = now;
    const l = this.listener;
    this.listener = null;
    l(uid);
  }
};

function useSim() { return !NFC.ok || state.settings.sim; }
function nfcErrMsg(err) {
  if (!err) return t('err_nfc');
  if (err.name === 'NotAllowedError') return t('err_denied');
  if (err.name === 'NotSupportedError') return t('err_off');
  return err.message || t('err_nfc');
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
$('#scanX').addEventListener('click', () => scanDone && scanDone(null));

function renderSim(mode) {
  const box = $('#simBox');
  box.innerHTML = '';
  if (!useSim()) return;
  let html = '<div class="sim-title">' + esc(t('sim_title')) + '</div>';
  if (mode === 'register') {
    html += '<button class="sim-btn" data-uid="__new__">' + esc(t('sim_new_card')) + '</button>';
  } else {
    const list = state.players.filter(p => p.uid);
    if (!list.length) html += '<div class="muted">' + esc(t('sim_no_cards')) + '</div>';
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

/* ================= Confirm dialog (replaces the browser's confirm) ================= */
function askConfirm({ title, body = '', ok = t('ok'), danger = true }) {
  return new Promise(resolve => {
    $('#cfTitle').textContent = title;
    $('#cfBody').textContent = body;
    $('#cfCancel').textContent = t('cancel');
    const okBtn = $('#cfOk');
    okBtn.textContent = ok;
    okBtn.className = 'btn big ' + (danger ? 'bad' : 'primary');
    const modal = $('#confirmModal');
    const finish = v => {
      modal.removeEventListener('click', onBackdrop);
      closeModal('confirmModal');
      resolve(v);
    };
    const onBackdrop = e => { if (e.target === modal) finish(false); };
    modal.addEventListener('click', onBackdrop);
    okBtn.onclick = () => finish(true);
    $('#cfCancel').onclick = () => finish(false);
    $('#cfX').onclick = () => finish(false);
    openModal('confirmModal');
    if (danger) Sound.warning();
  });
}

/* ================= Result popup ================= */
function showResult(kind, title, html) {
  return new Promise(resolve => {
    const ICONS = {
      ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
      err: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
      warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6.5v7"/><circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none"/></svg>'
    };
    const icon = ICONS[kind];
    if (kind === 'ok') Sound.success(); else if (kind === 'warn') Sound.warning(); else Sound.error();
    const el = $('#resIcon');
    el.className = 'res-icon ' + kind;
    el.innerHTML = icon;
    $('#resTitle').textContent = title;
    $('#resBody').innerHTML = html;
    openModal('resultModal');
    const closeRes = () => { closeModal('resultModal'); resolve(); };
    $('#resOk').onclick = closeRes;
    $('#resX').onclick = closeRes;
  });
}

function insufficientHtml(p, amt) {
  return t('insufficient_msg', { name: esc(p.name), bal: fmt(p.balance), amt: fmt(amt) }) +
    `<div class="res-line"><span>${esc(t('short_by'))}</span><b>${fmt(amt - p.balance)}</b></div>`;
}

/* ================= Money logic ================= */
function addHist(h) {
  state.history.unshift(Object.assign({ id: Date.now() + '-' + Math.random().toString(16).slice(2, 6), t: Date.now() }, h));
  if (state.history.length > 200) state.history.length = 200;
}

async function doTransfer() {
  const amt = transferAmt.get();
  if (!amt || amt <= 0) { toast(t('enter_amount')); return; }
  if (state.players.length < 2) { toast(t('need_two')); return; }

  // Step 1: sender
  const uidA = await scanCard({
    step: t('step_1_2'), title: t('p1_sender'),
    hint: t('hint_sender', { amt: fmt(amt) })
  });
  if (!uidA) { toast(t('cancelled')); return; }
  const sender = byUid(uidA);
  if (!sender) {
    vibe([80, 60, 80]);
    return showResult('err', t('unknown_card'), esc(t('unknown_card_msg')));
  }
  if (sender.balance < amt) {
    vibe([120, 60, 120]);
    return showResult('warn', t('insufficient'), insufficientHtml(sender, amt));
  }

  // Step 2: receiver
  const uidB = await scanCard({
    step: t('step_2_2'), title: t('p2_receiver'),
    hint: t('hint_receiver', { name: sender.name, bal: fmt(sender.balance) })
  });
  if (!uidB) { toast(t('cancelled_transfer')); return; }
  const receiver = byUid(uidB);
  if (!receiver) {
    vibe([80, 60, 80]);
    return showResult('err', t('unknown_card'), esc(t('receiver_unknown')));
  }
  if (receiver.id === sender.id) {
    vibe([80, 60, 80]);
    return showResult('err', t('same_card'), esc(t('same_card_msg')));
  }

  if (state.settings.confirmBig !== false && amt >= BIG_TRANSFER) {
    const okGo = await askConfirm({
      title: t('confirm_tx_title'),
      body: t('confirm_tx_body', { from: sender.name, to: receiver.name, amt: fmt(amt) }),
      ok: t('confirm_send'), danger: false
    });
    if (!okGo) { toast(t('cancelled_transfer')); return; }
  }

  // Re-check and execute
  if (sender.balance < amt) return showResult('warn', t('insufficient'), esc(t('balance_changed')));
  sender.balance -= amt;
  receiver.balance += amt;
  addHist({ type: 'transfer', from: sender.id, to: receiver.id, fromName: sender.name, toName: receiver.name, amount: amt });
  save(); renderAll(); vibe([60, 40, 60]);
  transferAmt.clear();

  await showResult('ok', t('transfer_ok'),
    `<div class="res-line"><span>${esc(sender.name)}</span><b>−${fmt(amt)}</b></div>
     <div class="res-line"><span>${esc(receiver.name)}</span><b>+${fmt(amt)}</b></div>
     <div class="res-line"><span>${esc(t('balance_of', { name: sender.name }))}</span><b>${fmt(sender.balance)}</b></div>
     <div class="res-line"><span>${esc(t('balance_of', { name: receiver.name }))}</span><b>${fmt(receiver.balance)}</b></div>`);
}

async function doBank(dir, amt, noteKey) {
  if (!amt || amt <= 0) { toast(t('enter_amount')); return; }
  const note = noteKey || (dir === 'in' ? 'note_receive' : 'note_pay');
  const uid = await scanCard({
    title: dir === 'in' ? t('bank_pays') : t('player_pays'),
    hint: t('bank_hint', { note: t(note), amt: fmt(amt) })
  });
  if (!uid) { toast(t('cancelled')); return; }
  const p = byUid(uid);
  if (!p) { vibe([80, 60, 80]); return showResult('err', t('unknown_card'), esc(t('unknown_card_msg'))); }
  if (dir === 'out' && p.balance < amt) {
    vibe([120, 60, 120]);
    return showResult('warn', t('insufficient'), insufficientHtml(p, amt));
  }
  p.balance += dir === 'in' ? amt : -amt;
  const toPot = dir === 'out' && !!state.settings.pot;
  if (toPot) state.pot = (state.pot || 0) + amt;
  addHist({ type: dir === 'in' ? 'bank-in' : 'bank-out', player: p.id, playerName: p.name, amount: amt, note, pot: toPot });
  save(); renderAll(); vibe([60, 40, 60]);
  bankAmt.clear();
  await showResult('ok', dir === 'in' ? t('money_received') : t('payment_ok'),
    `<div class="res-line"><span>${esc(p.name)}</span><b>${dir === 'in' ? '+' : '−'}${fmt(amt)}</b></div>
     <div class="res-line"><span>${esc(t('new_balance'))}</span><b>${fmt(p.balance)}</b></div>`);
}

async function collectPot() {
  if (!state.pot) { toast(t('pot_empty')); return; }
  const amt = state.pot;
  const uid = await scanCard({ title: t('pot_title'), hint: t('pot_collect_hint', { amt: fmt(amt) }) });
  if (!uid) { toast(t('cancelled')); return; }
  const p = byUid(uid);
  if (!p) return showResult('err', t('unknown_card'), esc(t('unknown_card_msg')));
  p.balance += amt;
  state.pot = 0;
  addHist({ type: 'pot-collect', player: p.id, playerName: p.name, amount: amt });
  save(); renderAll();
  await showResult('ok', t('pot_collected'),
    `<div class="res-line"><span>${esc(p.name)}</span><b>+${fmt(amt)}</b></div>
     <div class="res-line"><span>${esc(t('new_balance'))}</span><b>${fmt(p.balance)}</b></div>`);
}

async function checkBalance() {
  const uid = await scanCard({ title: t('check_title'), hint: t('check_hint') });
  if (!uid) return;
  const p = byUid(uid);
  if (!p) { vibe([80, 60, 80]); return showResult('err', t('unknown_card'), esc(t('unknown_card_msg'))); }
  showResult('ok', p.name, `<div class="res-line"><span>${esc(t('balance'))}</span><b>${fmt(p.balance)}</b></div>`);
}

async function registerCard(p) {
  const uid = await scanCard({
    mode: 'register', title: t('register_title', { name: p.name }),
    hint: t('register_hint')
  });
  if (!uid) return;
  const other = byUid(uid);
  if (other && other.id !== p.id) {
    vibe([80, 60, 80]);
    return showResult('err', t('card_in_use'), t('card_in_use_msg', { name: esc(other.name) }));
  }
  p.uid = uid;
  Sound.registered();
  save(); renderAll(); vibe();
  toast(t('card_registered', { name: p.name }));
}

async function undoLast() {
  const h = state.history[0];
  if (!h) { toast(t('no_tx')); return; }
  if (!await askConfirm({ title: t('undo_title'), body: t('undo_body'), ok: t('undo_ok'), danger: false })) return;
  if (h.type === 'transfer') {
    const a = byId(h.from), b = byId(h.to);
    if (!a || !b) return toast(t('player_deleted'));
    if (b.balance < h.amount) return toast(t('recv_low'));
    b.balance -= h.amount; a.balance += h.amount;
  } else if (h.type === 'pot-collect') {
    const p = byId(h.player);
    if (!p) return toast(t('player_deleted'));
    if (p.balance < h.amount) return toast(t('low_undo'));
    p.balance -= h.amount; state.pot = (state.pot || 0) + h.amount;
  } else {
    const p = byId(h.player);
    if (!p) return toast(t('player_deleted'));
    if (h.type === 'bank-out' && h.pot) state.pot = Math.max(0, (state.pot || 0) - h.amount);
    if (h.type === 'bank-in') {
      if (p.balance < h.amount) return toast(t('low_undo'));
      p.balance -= h.amount;
    } else {
      p.balance += h.amount;
    }
  }
  state.history.shift();
  save(); renderAll(); toast(t('undone'));
}

/* ================= Amount picker ================= */
function amountPicker(root) {
  root.innerHTML = `
    <div class="amt-wrap">
      <div class="amt-row">
        <div class="amt-box"><span class="amt-sym"></span>
          <input type="text" inputmode="numeric" placeholder="0" maxlength="7" data-i18n-aria="amount"></div>
      </div>
      <div class="denoms"></div>
    </div>`;
  const input = $('input', root);
  const sym = $('.amt-sym', root);
  const wrap = $('.denoms', root);
  wrap.innerHTML = [...DENOMS].reverse().map(d =>
    `<button type="button" class="denom" data-d="${d}" style="background:${NOTE_COLORS[d]}">${d}</button>`
  ).join('') + '<button type="button" class="denom clear" data-i18n="clear"></button>';
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
    set: v => { input.value = String(v); },
    refresh: () => { sym.textContent = state.settings.symbol; }
  };
}

/* ================= Render ================= */
function renderPlayers() {
  const total = state.players.reduce((s, p) => s + p.balance, 0);
  $('#totalMoney').textContent = fmt(total);
  const list = $('#playerList');
  if (!state.players.length) {
    list.innerHTML = '<div class="empty">' + t('empty_players') + '</div>';
    return;
  }
  list.innerHTML = state.players.map(p => {
    const notes = breakdown(p.balance).map(([d, n]) =>
      `<span class="note" style="background:${NOTE_COLORS[d]}">${n}×${d}</span>`).join('');
    return `
    <div class="player" style="--pc:${p.color}" data-id="${p.id}">
      <div class="p-top">
        <div class="p-name"><span class="dot"></span>${esc(p.name)}</div>
        <span class="badge ${p.uid ? 'ok' : 'no'}">${esc(p.uid ? t('card_ready') : t('no_card'))}</span>
      </div>
      <div class="p-bal">${fmt(p.balance)}</div>
      <div class="notes">${notes || '<span class="note" style="background:#555;color:#fff">' + esc(t('no_money')) + '</span>'}</div>
      <div class="p-actions">
        <button class="btn ghost" data-act="reg">${esc(p.uid ? t('change_card') : t('reg_card'))}</button>
        <button class="btn ghost" data-act="edit">${esc(t('edit'))}</button>
        <button class="btn ghost" data-act="del">${esc(t('delete'))}</button>
      </div>
    </div>`;
  }).join('');
}

function renderRank() {
  const card = $('#rankCard');
  if (state.players.length < 2) { card.hidden = true; return; }
  card.hidden = false;
  const sorted = state.players.slice().sort((a, b) => b.balance - a.balance);
  const max = Math.max(1, sorted[0].balance);
  $('#rankList').innerHTML = sorted.map((p, i) =>
    `<div class="rank-row" style="--pc:${p.color}">
      <span class="rank-n">${i + 1}</span>
      <div class="rank-main"><div class="rank-top"><span>${esc(p.name)}</span><b>${fmt(p.balance)}</b></div>
      <div class="rank-bar"><i style="width:${Math.max(2, Math.round(p.balance / max * 100))}%"></i></div></div>
    </div>`).join('');
}
function renderBankExtras() {
  const on = !!state.settings.pot;
  $('#potCard').hidden = !on;
  $('#potAmt').textContent = fmt(state.pot || 0);
  $('#btnPot').disabled = !state.pot;
}
function renderRentChips() {
  $('#rentChips').innerHTML = RENT_CHIPS.map(v => `<button type="button" class="amt-chip" data-v="${v}">${fmt(v)}</button>`).join('');
}
function renderNfcWarn() {
  const w = $('#nfcWarn');
  let dismissed = false;
  try { dismissed = localStorage.getItem('mb-nfc-warn') === '1'; } catch (e) { /* ignore */ }
  if (NFC.ok || dismissed) { w.hidden = true; return; }
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  $('#nfcWarnText').textContent = t(ios ? 'nfc_ios' : 'nfc_unsupported');
  w.hidden = false;
}

let histFilter = 'all';
function renderHistory() {
  const sel = $('#histFilter');
  if (histFilter !== 'all' && !byId(histFilter)) histFilter = 'all';
  sel.innerHTML = '<option value="all">' + esc(t('hist_all')) + '</option>' +
    state.players.map(p => `<option value="${esc(p.id)}">${esc(p.name)}</option>`).join('');
  sel.value = histFilter;
  const el = $('#historyList');
  const list = histFilter === 'all' ? state.history : state.history.filter(h => h.from === histFilter || h.to === histFilter || h.player === histFilter);
  if (!list.length) { el.innerHTML = '<div class="empty">' + esc(t('no_tx_yet')) + '</div>'; return; }
  const loc = state.settings.lang === 'ms' ? 'ms-MY' : 'en-GB';
  const time = tm => new Date(tm).toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit' });
  el.innerHTML = list.map(h => {
    let main, sub, cls, sign;
    if (h.type === 'transfer') {
      main = `${esc(h.fromName)} → ${esc(h.toName)}`; sub = esc(t('player_transfer')); cls = 'neu'; sign = '';
    } else if (h.type === 'pot-collect') {
      main = esc(h.playerName); sub = esc(t('note_pot')); cls = 'pos'; sign = '+';
    } else if (h.type === 'bank-in') {
      main = esc(h.playerName); sub = 'Bank → ' + esc(noteLabel(h.note) || t('note_receive')); cls = 'pos'; sign = '+';
    } else {
      main = esc(h.playerName); sub = (h.pot ? esc(t('note_pot')) : 'Bank') + ' ← ' + esc(noteLabel(h.note) || t('note_pay')); cls = 'neg'; sign = '−';
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
  if (!NFC.ok || state.settings.sim) { c.textContent = t('chip_sim'); c.className = 'chip sim'; }
  else { c.textContent = t('chip_nfc'); c.className = 'chip on'; }
}
function renderAll() {
  applyI18n(); applyTheme();
  renderPlayers(); renderRank(); renderHistory(); renderQuick(); renderChip(); renderBankExtras(); renderRentChips(); renderNfcWarn();
  $('#setConfirmTxt').textContent = t('set_confirm', { amt: fmt(BIG_TRANSFER) });
  $('#verLine').textContent = 'Monopoly Bank NFC · ' + t('version') + ' ' + APP_VERSION;
  transferAmt.refresh(); bankAmt.refresh();
}

/* ================= Init UI ================= */
const transferAmt = amountPicker($('#transferAmt'));
const bankAmt = amountPicker($('#bankAmt'));

/* ---- Tab navigation: tap, swipe the page, or slide a finger along the bottom bar ---- */
let curTab = 'players';
function positionPill(animate) {
  const pill = $('.tab-pill'), a = $('.tab.active');
  if (!pill || !a) return;
  if (!animate) pill.classList.add('no-anim');
  pill.style.width = a.offsetWidth + 'px';
  pill.style.height = a.offsetHeight + 'px';
  pill.style.top = a.offsetTop + 'px';
  pill.style.translate = a.offsetLeft + 'px 0';
  if (!animate) { void pill.offsetWidth; pill.classList.remove('no-anim'); }
}
let pillDragging = false;
function switchTab(name) {
  if (!TABS.includes(name) || name === curTab) return;
  const dir = TABS.indexOf(name) > TABS.indexOf(curTab) ? 'from-right' : 'from-left';
  curTab = name;
  $$('.tab').forEach(x => x.classList.toggle('active', x.dataset.view === name));
  $$('.view').forEach(v => {
    v.classList.remove('from-right', 'from-left');
    const on = v.id === 'view-' + name;
    v.classList.toggle('active', on);
    if (on) v.classList.add(dir);
  });
  if (!pillDragging) positionPill(true);
  window.scrollTo({ top: 0 });
}
$$('.tab').forEach(tb => tb.addEventListener('click', () => switchTab(tb.dataset.view)));

(function setupSwipe() {
  let sx = 0, sy = 0, st = 0, tracking = false;
  const EDGE = 24;      // ignore swipes that start at the screen edge (Android back gesture)
  const MIN_DX = 60;
  document.addEventListener('touchstart', e => {
    if (e.touches.length !== 1 || anyModalOpen()) { tracking = false; return; }
    const tg = e.target;
    // Ignore swipes on the tab bar, dropdowns, and on a text box that is being typed in
    if (tg.closest('.tabbar, select, textarea') || (tg.matches && tg.matches('input') && document.activeElement === tg)) { tracking = false; return; }
    const x = e.touches[0].clientX;
    if (x < EDGE || x > window.innerWidth - EDGE) { tracking = false; return; }
    sx = x; sy = e.touches[0].clientY; st = Date.now(); tracking = true;
  }, { passive: true });
  document.addEventListener('touchend', e => {
    if (!tracking) return;
    tracking = false;
    const tc = e.changedTouches[0];
    const dx = tc.clientX - sx, dy = tc.clientY - sy;
    if (Date.now() - st > 700) return;
    if (Math.abs(dx) < MIN_DX || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    const i = TABS.indexOf(curTab) + (dx < 0 ? 1 : -1);
    if (i >= 0 && i < TABS.length) switchTab(TABS[i]);
  }, { passive: true });
  // Drag the glass highlight freely along the bottom bar (no stepping, no vibration)
  const bar = $('.tabbar');
  const pill = $('.tab-pill');
  let dragId = null;
  const tabEls = () => $$('.tab');
  function follow(clientX) {
    const tabs = tabEls();
    const r = bar.getBoundingClientRect();
    const w = tabs[0].offsetWidth;
    const minX = tabs[0].offsetLeft, maxX = tabs[tabs.length - 1].offsetLeft;
    const x = Math.max(minX, Math.min(maxX, clientX - r.left - w / 2));
    pill.style.translate = x + 'px 0';
    // the page follows whichever tab the glass is over
    let best = tabs[0], bd = Infinity;
    tabs.forEach(tb => { const d = Math.abs(tb.offsetLeft + tb.offsetWidth / 2 - (x + w / 2)); if (d < bd) { bd = d; best = tb; } });
    switchTab(best.dataset.view);
  }
  bar.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragId = e.pointerId;
    pillDragging = true;
    try { bar.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
    pill.classList.add('drag');
    follow(e.clientX);
  });
  bar.addEventListener('pointermove', e => { if (e.pointerId === dragId) follow(e.clientX); });
  const endDrag = e => {
    if (e.pointerId !== dragId) return;
    dragId = null;
    pillDragging = false;
    pill.classList.remove('drag');
    positionPill(true);   // settle onto the chosen tab
  };
  bar.addEventListener('pointerup', endDrag);
  bar.addEventListener('pointercancel', endDrag);
  bar.addEventListener('lostpointercapture', endDrag);
})();

$('#addForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#newName').value.trim();
  if (!name) return;
  if (state.players.length >= MAX_PLAYERS) return toast(t('max_players', { n: MAX_PLAYERS }));
  if (state.players.some(p => p.name.toLowerCase() === name.toLowerCase())) return toast(t('name_exists'));
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

$('#playerList').addEventListener('click', async e => {
  const btn = e.target.closest('[data-act]');
  if (!btn) return;
  const p = byId(btn.closest('.player').dataset.id);
  if (!p) return;
  if (btn.dataset.act === 'reg') registerCard(p);
  if (btn.dataset.act === 'edit') openEdit(p);
  if (btn.dataset.act === 'del') {
    if (!await askConfirm({ title: t('del_title', { name: p.name }), body: t('del_body'), ok: t('delete') })) return;
    state.players = state.players.filter(x => x.id !== p.id);
    save(); renderAll();
  }
});

$('#btnCheck').addEventListener('click', checkBalance);
$('#btnTransfer').addEventListener('click', doTransfer);
$('#btnBankIn').addEventListener('click', () => doBank('in', bankAmt.get(), $('#bankNote').value || 'note_bank_pays'));
$('#btnBankOut').addEventListener('click', () => doBank('out', bankAmt.get(), $('#bankNote').value || 'note_player_pays'));
$('#btnPot').addEventListener('click', collectPot);
$('#rentChips').addEventListener('click', e => { const b = e.target.closest('.amt-chip'); if (b) transferAmt.set(b.dataset.v); });
$('#nfcWarnClose').addEventListener('click', () => { try { localStorage.setItem('mb-nfc-warn', '1'); } catch (e) { /* ignore */ } $('#nfcWarn').hidden = true; });
$$('.quick').forEach(q => q.addEventListener('click', () =>
  doBank(q.dataset.dir, parseInt(q.dataset.amt, 10), q.dataset.note)));
$('#btnUndo').addEventListener('click', undoLast);

/* settings */
$('#btnSettings').addEventListener('click', () => {
  $('#setStart').value = state.settings.start;
  $('#setSymbol').value = state.settings.symbol;
  $('#setLang').value = state.settings.lang;
  $('#setSim').checked = !!state.settings.sim;
  $('#setSound').checked = state.settings.sound !== false;
  $('#setPot').checked = !!state.settings.pot;
  $('#setConfirm').checked = state.settings.confirmBig !== false;
  $('#setWake').checked = state.settings.wake !== false;
  $('#setSim').disabled = !NFC.ok;
  openModal('settingsModal');
});
$('#setStart').addEventListener('change', () => {
  const v = parseInt($('#setStart').value, 10);
  state.settings.start = isNaN(v) || v < 0 ? 1500 : v;
  save();
});
$('#setSymbol').addEventListener('change', e => { state.settings.symbol = e.target.value; save(); renderAll(); });
$('#setSim').addEventListener('change', e => { state.settings.sim = e.target.checked; save(); renderAll(); });
$('#setTheme').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  state.settings.theme = THEMES.includes(b.dataset.v) ? b.dataset.v : 'dark';
  save(); applyTheme();
});
$('#setAccent').addEventListener('click', e => {
  const b = e.target.closest('.sw'); if (!b) return;
  state.settings.accent = ACCENTS.includes(b.dataset.v) ? b.dataset.v : 'blue';
  save(); applyTheme(); Sound.scan();
});
$('#setPot').addEventListener('change', e => { state.settings.pot = e.target.checked; save(); renderAll(); });
$('#setConfirm').addEventListener('change', e => { state.settings.confirmBig = e.target.checked; save(); });
$('#setWake').addEventListener('change', e => { state.settings.wake = e.target.checked; save(); applyWake(); });
$('#btnExport').addEventListener('click', () => {
  download('monopoly-bank-backup-' + stamp() + '.json',
    JSON.stringify({ app: 'monopoly-bank-nfc', version: 1, exportedAt: new Date().toISOString(), data: state }, null, 2), 'application/json');
  toast(t('exported'));
});
$('#btnImport').addEventListener('click', () => $('#impFile').click());
$('#impFile').addEventListener('change', async e => {
  const f = e.target.files && e.target.files[0];
  e.target.value = '';
  if (!f) return;
  let next = null;
  try { next = normalizeState(JSON.parse(await f.text())); } catch (err) { next = null; }
  if (!next) { Sound.error(); return toast(t('import_bad')); }
  if (!await askConfirm({ title: t('import_title'), body: t('import_body'), ok: t('import_ok') })) return;
  state = next;
  save(); renderAll(); applyWake(); closeModal('settingsModal'); toast(t('imported'));
});
$('#btnCsv').addEventListener('click', () => {
  if (!state.history.length) return toast(t('csv_empty'));
  const q = v => { v = String(v == null ? '' : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
  const rows = [['time', 'type', 'player_or_from', 'to', 'amount', 'note']];
  state.history.slice().reverse().forEach(h => {
    rows.push([new Date(h.t).toISOString(), h.type, h.type === 'transfer' ? h.fromName : h.playerName,
      h.type === 'transfer' ? h.toName : '', h.amount, h.type === 'pot-collect' ? t('note_pot') : noteLabel(h.note)]);
  });
  download('monopoly-bank-history-' + stamp() + '.csv', '\ufeff' + rows.map(r => r.map(q).join(',')).join('\r\n'), 'text/csv');
  toast(t('exported'));
});
$('#histFilter').addEventListener('change', e => { histFilter = e.target.value; renderHistory(); });

/* edit player */
let editingId = null, editingColor = null;
function paintEditColors() {
  $$('#edColors .sw').forEach(b => b.classList.toggle('active', b.dataset.v === editingColor));
}
function openEdit(p) {
  editingId = p.id; editingColor = p.color;
  $('#edName').value = p.name;
  $('#edColors').innerHTML = PALETTE.map(c => `<button type="button" class="sw" data-v="${c}" style="--c:${c}" aria-label="${c}"></button>`).join('');
  paintEditColors();
  openModal('editModal');
}
$('#edColors').addEventListener('click', e => { const b = e.target.closest('.sw'); if (!b) return; editingColor = b.dataset.v; paintEditColors(); });
$('#edX').addEventListener('click', () => closeModal('editModal'));
$('#editModal').addEventListener('click', e => { if (e.target.id === 'editModal') closeModal('editModal'); });
$('#edSave').addEventListener('click', () => {
  const p = byId(editingId); if (!p) return closeModal('editModal');
  const name = $('#edName').value.trim();
  if (!name) return;
  if (state.players.some(x => x.id !== p.id && x.name.toLowerCase() === name.toLowerCase())) return toast(t('name_exists'));
  p.name = name; p.color = editingColor || p.color;
  state.history.forEach(h => {
    if (h.from === p.id) h.fromName = name;
    if (h.to === p.id) h.toName = name;
    if (h.player === p.id) h.playerName = name;
  });
  save(); renderAll(); closeModal('editModal'); toast(t('saved'));
});

$('#setX').addEventListener('click', () => $('#setClose').click());
$('#settingsModal').addEventListener('click', e => { if (e.target.id === 'settingsModal') $('#setClose').click(); });
$('#setLang').addEventListener('change', e => {
  state.settings.lang = I18N[e.target.value] ? e.target.value : 'en';
  save(); renderAll();
});
$('#setSound').addEventListener('change', e => { if (e.target.checked) { state.settings.sound = true; Sound.success(); } });
$('#setClose').addEventListener('click', () => {
  const st = parseInt($('#setStart').value, 10);
  state.settings.start = isNaN(st) || st < 0 ? 1500 : st;
  state.settings.symbol = $('#setSymbol').value;
  state.settings.lang = I18N[$('#setLang').value] ? $('#setLang').value : 'en';
  state.settings.sim = $('#setSim').checked;
  state.settings.sound = $('#setSound').checked;
  save(); renderAll(); closeModal('settingsModal');
});
$('#btnResetGame').addEventListener('click', async () => {
  if (!await askConfirm({ title: t('reset_title'), body: t('reset_body'), ok: t('reset_ok') })) return;
  const st = Number($('#setStart').value);
  const start = isNaN(st) || st < 0 ? state.settings.start : st;
  state.settings.start = start;
  state.players.forEach(p => { p.balance = start; });
  state.history = [];
  state.pot = 0;
  save(); renderAll(); closeModal('settingsModal'); toast(t('game_reset'));
});
$('#btnWipe').addEventListener('click', async () => {
  if (!await askConfirm({ title: t('wipe_title'), body: t('wipe_body'), ok: t('wipe_ok') })) return;
  const settings = state.settings;
  state = defaultState();
  state.settings = settings;
  save(); renderAll(); closeModal('settingsModal'); toast(t('wiped'));
});

renderAll();
applyWake();
positionPill(false);
window.addEventListener('resize', () => positionPill(false));
window.addEventListener('load', () => positionPill(false));
if (window.ResizeObserver) new ResizeObserver(() => positionPill(false)).observe($('.tabbar'));

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => { /* ignore */ });
  });
}
