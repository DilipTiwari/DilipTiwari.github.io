# Cricket Career - 3D Web Cricket Game

Cricket Career is a mobile-friendly browser cricket game prototype.

## What is included

- 3D cricket stadium using Three.js
- 1 batsman and 1 AI bowler
- Basic batting and bowling animations
- Runs: 0, 1, 2, 3, 4, 6
- Wicket system
- 1 over, 2 over, and 5 over match options
- Country team selection
- Jersey color customization
- Scoreboard and run rate
- Hindi-English funny commentary
- Telugu commentary
- Browser Text-to-Speech commentary
- Sound effects using Web Audio
- Mobile-friendly tap and swipe controls
- Ad placeholder slots for future monetization
- Logo, app icon, and PWA manifest

## How to run locally

Because the game uses JavaScript modules, run it with a local server instead of opening `index.html` directly.

### Option 1: VS Code

1. Open this folder in VS Code.
2. Install the extension **Live Server**.
3. Right-click `index.html`.
4. Click **Open with Live Server**.

### Option 2: Python local server

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## How to upload to a free host

You can upload the full folder to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting
- Cloudflare Pages

Upload these files/folders together:

```text
index.html
styles.css
game.js
manifest.webmanifest
assets/
```

## Important note about ads

The game currently includes safe placeholder ad boxes only.

To run real ads, you need:

1. A hosted website URL.
2. Approval from an ad network such as Google AdSense or another web ad network.
3. The ad network script added in the correct location.

Do not place ads over the HIT button or game controls. That can cause accidental clicks and may violate ad network policies.

## Important note about real player names

The default roster uses fictional cricket-style player names. This is safer for monetized public hosting.

If you have rights or permission to use real player names, edit the `TEAMS` array inside `game.js` and replace the player names.

## Files

```text
cricket-career-web/
├── index.html
├── styles.css
├── game.js
├── manifest.webmanifest
├── README.md
└── assets/
    ├── logo.svg
    └── icon.svg
```

## Package name

For the web version, Android-style package name is not required. Your requested package name is kept for future Android/PWA build reference:

```text
gaming.cricketgame
```

## Next improvements

- Real 3D character models
- Better batting animation
- Bowling variations: yorker, bouncer, spin, slower ball
- Full two-innings chase mode
- Tournament mode
- Leaderboard
- Save career progress
- Real voice-recorded commentary files
