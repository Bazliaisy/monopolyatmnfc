# Monopoly Bank NFC

A digital bank for Monopoly that runs in the browser and uses NFC cards. Tap a card to identify a player, then send money, collect from the bank and review the history, all without paper money.

**Live demo:** https://monopolybanknfc.netlify.app

## Features

- **NFC cards as player IDs.** Each card's serial number (UID) is linked to a player.
- **Safe transfers.** Player 1 taps first and the balance is checked. If it is too low, an "Insufficient balance" warning appears. Player 2 then taps to receive the money.
- **Bank actions.** Pass GO (+M200), Income Tax (-M200), Luxury Tax (-M75), Jail Fine (-M50) and a custom amount with the real Monopoly denominations (1, 5, 10, 20, 50, 100, 500).
- **History and undo.** Every transaction is logged and the last one can be undone.
- **Installable and offline.** Works as a PWA and keeps running without internet once installed.
- **Sound effects** for card registered, warning and success.
- **Custom dialogs and SVG icons.** No native browser pop-ups and no emoji.
- **English by default**, with Bahasa Melayu available in Settings.
- **Swipeable bottom navigation.** Swipe left or right to change tabs.
- **Themes.** Auto, Dark, Light or Liquid Glass (frosted, translucent look), plus five accent colours.
- **Simulation mode** to try the app without NFC by picking cards on screen.
- **Saved automatically** in the browser (localStorage).

## Requirements

Web NFC only works in:

- **Chrome on Android**
- Served over **HTTPS** (or `localhost`)

On other browsers or devices, turn on **Simulation mode** in Settings.

## Getting started

1. Open the app in Chrome on an Android phone with NFC turned on.
2. Go to **Players** and tap **Add player**, enter a name, then tap an NFC card to register it.
3. Use **Transfer** to move money between players and **Bank** for GO, taxes and fines.
4. Open **Settings** to change the starting money, currency symbol, language, theme, sound and simulation mode.

Any NFC tag works, including NTAG213/215/216 stickers and cards. Nothing is written to the card, only its UID is read.

## Run locally

No build step or dependencies are needed.

```bash
git clone https://github.com/Bazliaisy/monopolyatmnfc.git
cd monopolyatmnfc 
python3 -m http.server 8080
```

Open `http://localhost:8080`. To test NFC on a phone you need HTTPS, so deploy it (see below) or use a tunnel.

## Deploy

It is a static site, so any static host works. Netlify, GitHub Pages and Cloudflare Pages all work fine.

1. Push all files to a GitHub repository.
2. Connect the repository to your host with no build command and the root as the publish directory.
3. Open the HTTPS URL on your phone and use Chrome's **Install app** option.

A single-file build, `monopoly-bank-satu-fail.html`, has the CSS and JS inlined. It can be hosted or opened on its own.

## Project structure

```
index.html                      App markup
style.css                       Styles and themes
app.js                          App logic, NFC, sounds, translations
sw.js                           Service worker (offline cache)
manifest.webmanifest            PWA manifest
icon-192.png, icon-512.png,
icon-maskable.png               App icons
monopoly-bank-satu-fail.html    Single-file build
```

## Updating a deployed version

The service worker caches the app. After changing any file, bump the cache name in `sw.js` (for example `monopoly-bank-v6` to `monopoly-bank-v7`), redeploy, then fully close and reopen the installed app.

## Disclaimer

This is an unofficial fan project for personal use. It is not affiliated with or endorsed by Hasbro. Monopoly is a trademark of Hasbro, Inc.

## License

Released under the [MIT License](LICENSE).
