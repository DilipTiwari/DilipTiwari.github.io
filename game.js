import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const $ = (id) => document.getElementById(id);

const DOM = {
  canvas: $('gameCanvas'),
  canvasWrap: $('gameCanvasWrap'),
  loading: $('loading3d'),
  menu: $('menuScreen'),
  pause: $('pauseScreen'),
  result: $('resultScreen'),
  teamSelect: $('teamSelect'),
  opponentSelect: $('opponentSelect'),
  oversSelect: $('oversSelect'),
  languageSelect: $('languageSelect'),
  difficultySelect: $('difficultySelect'),
  jerseyChoices: $('jerseyChoices'),
  playerPreview: $('playerPreview'),
  startBtn: $('startBtn'),
  resumeBtn: $('resumeBtn'),
  restartFromPauseBtn: $('restartFromPauseBtn'),
  playAgainBtn: $('playAgainBtn'),
  menuBtn: $('menuBtn'),
  scoreText: $('scoreText'),
  oversText: $('oversText'),
  rrText: $('rrText'),
  lastBallText: $('lastBallText'),
  miniScore: $('miniScore'),
  commentaryText: $('commentaryText'),
  voiceBtn: $('voiceBtn'),
  powerFill: $('powerFill'),
  hitBtn: $('hitBtn'),
  defendBtn: $('defendBtn'),
  pauseBtn: $('pauseBtn'),
  resultTitle: $('resultTitle'),
  resultSummary: $('resultSummary'),
  shotButtons: [...document.querySelectorAll('.shot-btn')]
};

/*
  Country names are included. The default roster uses cricket-style fictional names so the web game is safe to monetize.
  If you have player/team licensing rights, replace the names below with approved real player names.
*/
const TEAMS = [
  { country: 'India', short: 'IND', color: '#1b61ff', players: ['Aarav Sharma', 'Vihaan Gill', 'Rohan Kohli', 'Kabir Iyer', 'Dev Patel', 'Arjun Singh', 'Nikhil Jadeja', 'Manav Kumar', 'Ishaan Bumra', 'Rudra Siraj', 'Yash Kuldeep'] },
  { country: 'Australia', short: 'AUS', color: '#ffd44a', players: ['Jack Warner', 'Liam Marsh', 'Oscar Smith', 'Noah Maxwell', 'Ethan Green', 'Lucas Carey', 'Mason Starc', 'Cooper Cummins', 'Harry Zampa', 'Oliver Hazle', 'Finn Ellis'] },
  { country: 'England', short: 'ENG', color: '#173b8f', players: ['Harry Brookson', 'George Root', 'Arthur Buttler', 'Theo Stokes', 'Leo Living', 'Freddie Ali', 'Henry Archer', 'Alfie Wood', 'Charlie Rashid', 'Oscar Curran', 'James Stone'] },
  { country: 'Pakistan', short: 'PAK', color: '#0b8f45', players: ['Ali Azam', 'Hamza Rizwan', 'Usman Fakhar', 'Saad Iftikhar', 'Danish Shadab', 'Bilal Shaheen', 'Imran Naseem', 'Omar Rauf', 'Ayaan Wasim', 'Zain Jamal', 'Haris Malik'] },
  { country: 'South Africa', short: 'SA', color: '#159947', players: ['Ryan de Silva', 'Dean Markram', 'Caleb Klaasen', 'Noel Miller', 'Dylan Jansen', 'Evan Rabada', 'Luke Nortje', 'Milan Maharaj', 'Tyler Ngidi', 'Kian Stubbs', 'Adam Coetzee'] },
  { country: 'New Zealand', short: 'NZ', color: '#111111', players: ['Finn Conway', 'Kai Williamson', 'Logan Mitchell', 'Blake Phillips', 'Riley Neesham', 'Milo Santner', 'Theo Boult', 'Archie Southee', 'Jude Ferguson', 'Eli Ravindra', 'Owen Allen'] },
  { country: 'Sri Lanka', short: 'SL', color: '#2052c9', players: ['Nuwan Mendis', 'Kavish Asalanka', 'Dilan Perera', 'Sahan Silva', 'Kasun Shanaka', 'Malith Hasaranga', 'Chamika Theek', 'Pathum Raj', 'Lahiru Madhu', 'Avish Fernando', 'Dushman Chameera'] },
  { country: 'Bangladesh', short: 'BAN', color: '#0a8f55', players: ['Tamim Rahman', 'Shakib Hasan', 'Mushfiq Karim', 'Litton Dasgupta', 'Mahmud Riad', 'Taskin Ahmed', 'Mustafiz Rahim', 'Mehidy Miraz', 'Najmul Shanto', 'Soumya Sarkar', 'Hasan Mahmud'] },
  { country: 'Afghanistan', short: 'AFG', color: '#2468d9', players: ['Rahman Zadran', 'Ibrahim Khan', 'Azmat Omar', 'Mohammad Nabiq', 'Rashid Alam', 'Naveen Haq', 'Fazal Farooqi', 'Mujeeb Rahman', 'Karim Janat', 'Najib Zai', 'Noor Ahmad'] },
  { country: 'West Indies', short: 'WI', color: '#8d1731', players: ['Brandon Charles', 'Nicholas Hope', 'Andre Russellson', 'Rovman Powell', 'Jason Holderman', 'Akeal Hosein', 'Alzarri Joseph', 'Shimron Het', 'Evin Lewis', 'Romario Shepherd', 'Sunil Narayan'] }
];

const JERSEY_COLORS = ['#1b61ff', '#0b8f45', '#8d1731', '#ffd44a', '#f04f68', '#111111', '#ff7a18', '#7c4dff', '#00bcd4', '#f8f8f8'];

const COMMENTARY = {
  hi: {
    start: ['Match start! Helmet tight kar lo, bowler mood mein lag raha hai!', 'Cricket Career mein swagat hai! Aaj ball bhi bolegi: please maarna mat!'],
    dot: ['Dot ball! Batsman ne ball ko respect de diya, bilkul family function jaisa.', 'Arre yaar, shot gaya WhatsApp draft mein... send nahi hua!'],
    one: ['Single mil gaya! Dheere dheere hi sahi, scoreboard chal raha hai.', 'Ek run! Batsman bola: boundary baad mein, attendance pehle.'],
    two: ['Do run! Running between wickets mein gym membership dikh rahi hai.', 'Double! Fielders ko thoda cardio kara diya.'],
    three: ['Teen run! Boundary nahi mili, par petrol poora kharch ho gaya.', 'Three runs! Batsman aur non-striker ne Uber cancel kar diya.'],
    four: ['Chauka! Ball boundary pe jaake selfie le rahi hai!', 'Kya shot hai! Seedha four, bowler ka confidence buffering mein.'],
    six: ['Chhakka! Ball to stadium ke bahar chai peene chali gayi!', 'Arre wah! Sixer itna bada ki cloud storage mein save hoga.'],
    wicket: ['Out! Stumps hil gaye, batsman ka career mode thoda emotional ho gaya.', 'Wicket! Bowler ne bola: bhai, ab pavilion mein refreshment lo.'],
    defend: ['Solid defence! Wall ban gaya batsman, cement ka ad mil sakta hai.', 'Defended! Ball ko gently bola: beta ghar jao.'],
    miss: ['Miss! Bat aur ball ne aaj breakup kar liya.', 'Swing hua, connection nahi. Internet bhi better hota hai kabhi kabhi!'],
    complete: ['Innings complete! Scoreboard ne apna kaam imaandari se kiya.', 'Match khatam! Ab highlights mein apni best acting dekhna.']
  },
  te: {
    start: ['మ్యాచ్ స్టార్ట్! బ్యాట్ రెడీ, బౌలర్ కూడా ఫుల్ జోష్‌లో ఉన్నాడు!', 'క్రికెట్ కెరీర్‌కు స్వాగతం! ఈరోజు షాట్లు ఫుల్ ఫన్‌గా ఉంటాయి!'],
    dot: ['డాట్ బాల్! బ్యాట్స్‌మన్ కాస్త జాగ్రత్తగా ఆడాడు.', 'అయ్యో! షాట్ టైమింగ్ కొంచెం మిస్ అయ్యింది.'],
    one: ['ఒక రన్! స్కోర్‌బోర్డ్ నెమ్మదిగా ముందుకు వెళ్తోంది.', 'సింగిల్ వచ్చేసింది! సేఫ్‌గా ఆడారు.'],
    two: ['రెండు రన్స్! రన్నింగ్ బాగుంది.', 'డబుల్! ఫీల్డర్లకు మంచి వర్కౌట్ ఇచ్చారు.'],
    three: ['మూడు రన్స్! బౌండరీ కాకపోయినా మంచి పరుగులు.', 'త్రీ రన్స్! బ్యాట్స్‌మన్ ఫుల్ స్పీడ్‌లో పరిగెత్తాడు.'],
    four: ['ఫోర్! బాల్ బౌండరీ దాటేసింది!', 'సూపర్ షాట్! నేరుగా నాలుగు రన్స్.'],
    six: ['సిక్స్! బాల్ స్టేడియం బయటకు వెళ్లిపోయింది!', 'అద్భుతం! భారీ సిక్సర్ కొట్టాడు.'],
    wicket: ['అవుట్! స్టంప్స్ కూలిపోయాయి.', 'వికెట్! బౌలర్‌కు ఇది పెద్ద సెలబ్రేషన్.'],
    defend: ['మంచి డిఫెన్స్! చాలా కూల్‌గా ఆడారు.', 'డిఫెండ్ చేశాడు! రిస్క్ తీసుకోలేదు.'],
    miss: ['మిస్ అయ్యింది! బ్యాట్ బాల్‌ను కలవలేదు.', 'స్వింగ్ బాగుంది, కానీ కనెక్షన్ లేదు.'],
    complete: ['ఇన్నింగ్స్ పూర్తయ్యింది! మంచి గేమ్.', 'మ్యాచ్ ముగిసింది! స్కోర్ చూడండి.']
  },
  en: {
    start: ['Game on! The bowler is charging in.', 'Welcome to Cricket Career. Time to build your batting career!'],
    dot: ['Dot ball. Good bowling, no run.', 'No run! The fielder cut it off.'],
    one: ['A safe single keeps the scoreboard moving.', 'One run. Smart cricket.'],
    two: ['Two runs! Good running between the wickets.', 'They push hard and come back for two.'],
    three: ['Three runs! Excellent running.', 'Not a boundary, but three is valuable.'],
    four: ['Four! Beautiful timing through the gap.', 'Cracking shot! That races to the boundary.'],
    six: ['Six! That has gone a long way.', 'Massive hit! Into the crowd.'],
    wicket: ['Wicket! The bowler strikes.', 'Out! That is a big breakthrough.'],
    defend: ['Solid defence. No risk there.', 'Defended calmly.'],
    miss: ['Beaten! No contact with the bat.', 'Missed it! The timing was late.'],
    complete: ['Innings complete. Well played.', 'Match over. Check your final score!']
  }
};

const state = {
  running: false,
  paused: false,
  overLimit: 1,
  ballsLimit: 6,
  balls: 0,
  runs: 0,
  wickets: 0,
  maxWickets: 10,
  selectedShot: 'straight',
  jerseyColor: JERSEY_COLORS[0],
  language: 'hi',
  difficulty: 'normal',
  team: TEAMS[0],
  opponent: TEAMS[1],
  currentBatterIndex: 0,
  currentBowlerIndex: 10,
  lastBall: '-',
  voice: true,
  power: 0.5,
  powerDir: 1,
  ballPhase: 'idle',
  ballT: 0,
  hitAttempted: false,
  defendAttempted: false,
  lastOutcomeAt: 0,
  nextBallDelay: 1100,
  swipeStart: null
};

let scene, camera, renderer, clock;
let fieldGroup, batsman, bowler, bat, ball, stumps, crowdGroup, hitMarker;
let audioCtx;

initUI();
init3D();
animate();

function initUI() {
  TEAMS.forEach((team, index) => {
    const opt1 = new Option(`${team.country} (${team.short})`, index);
    const opt2 = new Option(`${team.country} (${team.short})`, index);
    DOM.teamSelect.add(opt1);
    DOM.opponentSelect.add(opt2);
  });
  DOM.opponentSelect.value = '1';

  JERSEY_COLORS.forEach((color, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `color-chip${index === 0 ? ' selected' : ''}`;
    btn.style.background = color;
    btn.setAttribute('aria-label', `Jersey color ${color}`);
    btn.addEventListener('click', () => {
      state.jerseyColor = color;
      document.querySelectorAll('.color-chip').forEach((el) => el.classList.remove('selected'));
      btn.classList.add('selected');
      updatePlayerColors();
    });
    DOM.jerseyChoices.appendChild(btn);
  });

  DOM.teamSelect.addEventListener('change', updateTeamPreview);
  DOM.opponentSelect.addEventListener('change', updateTeamPreview);
  DOM.languageSelect.addEventListener('change', () => {
    state.language = DOM.languageSelect.value;
    speakLine('start');
  });

  DOM.startBtn.addEventListener('click', startMatch);
  DOM.resumeBtn.addEventListener('click', resumeGame);
  DOM.pauseBtn.addEventListener('click', pauseGame);
  DOM.restartFromPauseBtn.addEventListener('click', () => {
    hideOverlay(DOM.pause);
    startMatch();
  });
  DOM.playAgainBtn.addEventListener('click', startMatch);
  DOM.menuBtn.addEventListener('click', showMenu);
  DOM.voiceBtn.addEventListener('click', toggleVoice);

  DOM.shotButtons.forEach((btn) => {
    btn.addEventListener('click', () => selectShot(btn.dataset.shot));
  });
  DOM.hitBtn.addEventListener('click', hitBall);
  DOM.defendBtn.addEventListener('click', defendBall);

  DOM.canvasWrap.addEventListener('pointerdown', onPointerDown, { passive: true });
  DOM.canvasWrap.addEventListener('pointerup', onPointerUp, { passive: true });

  window.addEventListener('resize', resizeRenderer);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.running) pauseGame();
  });

  updateTeamPreview();
  updateScoreboard();
}

function init3D() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x071827);
  scene.fog = new THREE.Fog(0x071827, 58, 128);

  camera = new THREE.PerspectiveCamera(50, 1, 0.1, 250);
  camera.position.set(0, 18, 31);
  camera.lookAt(0, 2.7, 0);

  renderer = new THREE.WebGLRenderer({ canvas: DOM.canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  clock = new THREE.Clock();

  const hemi = new THREE.HemisphereLight(0xcfefff, 0x1c421f, 1.8);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xffffff, 2.1);
  sun.position.set(20, 42, 10);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -50;
  sun.shadow.camera.right = 50;
  sun.shadow.camera.top = 50;
  sun.shadow.camera.bottom = -50;
  scene.add(sun);

  const rim = new THREE.PointLight(0x00e5ff, 2.3, 80);
  rim.position.set(-18, 12, 24);
  scene.add(rim);

  createStadium();
  createPlayers();
  createBallAndMarkers();
  resizeRenderer();
  DOM.loading.style.display = 'none';
}

function createStadium() {
  fieldGroup = new THREE.Group();
  scene.add(fieldGroup);

  const fieldMat = new THREE.MeshStandardMaterial({ color: 0x167d3b, roughness: 0.95, metalness: 0.02 });
  const field = new THREE.Mesh(new THREE.CylinderGeometry(48, 48, 0.25, 128), fieldMat);
  field.receiveShadow = true;
  field.position.y = -0.14;
  fieldGroup.add(field);

  const stripeMat = new THREE.MeshStandardMaterial({ color: 0x1c9a49, roughness: 1 });
  for (let i = 0; i < 7; i++) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(8 + i * 5.4, 10 + i * 5.4, 128), stripeMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.01;
    fieldGroup.add(ring);
  }

  const pitch = new THREE.Mesh(new THREE.BoxGeometry(5, 0.08, 24), new THREE.MeshStandardMaterial({ color: 0xcaa86a, roughness: 0.9 }));
  pitch.receiveShadow = true;
  pitch.position.set(0, 0.04, 0);
  fieldGroup.add(pitch);

  const creaseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  [-8.2, 8.2].forEach((z) => {
    const crease = new THREE.Mesh(new THREE.BoxGeometry(5.7, 0.025, 0.08), creaseMat);
    crease.position.set(0, 0.11, z);
    fieldGroup.add(crease);
  });

  crowdGroup = new THREE.Group();
  scene.add(crowdGroup);
  const standMats = [0x123b66, 0x185f74, 0x24345c, 0xf4cb4d, 0xd94b61].map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 }));
  for (let ring = 0; ring < 4; ring++) {
    const radius = 55 + ring * 3.5;
    const height = 1.6 + ring * 1.1;
    const count = 84;
    for (let i = 0; i < count; i++) {
      if (i % 7 === 0 && ring > 1) continue;
      const angle = (i / count) * Math.PI * 2;
      const seat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.25, 2.1), standMats[(i + ring) % standMats.length]);
      seat.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      seat.rotation.y = -angle + Math.PI / 2;
      crowdGroup.add(seat);
    }
  }

  const screen = new THREE.Mesh(new THREE.BoxGeometry(16, 8, 0.6), new THREE.MeshStandardMaterial({ color: 0x06111f, emissive: 0x06111f, roughness: 0.4 }));
  screen.position.set(0, 12, -58);
  screen.castShadow = true;
  crowdGroup.add(screen);

  const screenGlow = new THREE.Mesh(new THREE.PlaneGeometry(14.5, 6.5), new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.2 }));
  screenGlow.position.set(0, 12, -57.65);
  crowdGroup.add(screenGlow);
}

function createPlayers() {
  batsman = createCricketer(state.jerseyColor, 0xffffff);
  batsman.position.set(0.85, 0, 8.9);
  batsman.rotation.y = Math.PI;
  scene.add(batsman);
  bat = createBat();
  bat.position.set(-0.55, 1.55, 0.22);
  bat.rotation.set(0.2, 0, -0.35);
  batsman.add(bat);

  bowler = createCricketer(state.opponent.color, 0xffffff);
  bowler.position.set(-0.7, 0, -13.5);
  scene.add(bowler);

  stumps = new THREE.Group();
  [-0.35, 0, 0.35].forEach((x) => {
    const stump = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.45, 14), new THREE.MeshStandardMaterial({ color: 0xf4e4b8 }));
    stump.position.set(x, 0.75, 9.75);
    stump.castShadow = true;
    stumps.add(stump);
  });
  [-0.18, 0.18].forEach((x) => {
    const bail = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.05, 0.05), new THREE.MeshStandardMaterial({ color: 0xf4e4b8 }));
    bail.position.set(x, 1.48, 9.75);
    stumps.add(bail);
  });
  scene.add(stumps);
}

function createCricketer(jersey, pads) {
  const group = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xb97948, roughness: 0.7 });
  const jerseyMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(jersey), roughness: 0.65, metalness: 0.05 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: pads, roughness: 0.75 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.8 });

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.45, 1.0, 8, 16), jerseyMat);
  body.position.y = 1.9;
  body.castShadow = true;
  group.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.34, 24, 16), skin);
  head.position.y = 2.8;
  head.castShadow = true;
  group.add(head);

  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.34, 0.16, 24), darkMat);
  cap.position.y = 3.1;
  cap.castShadow = true;
  group.add(cap);

  const armGeo = new THREE.CapsuleGeometry(0.13, 0.8, 6, 12);
  const leftArm = new THREE.Mesh(armGeo, jerseyMat);
  const rightArm = new THREE.Mesh(armGeo, jerseyMat);
  leftArm.position.set(-0.58, 1.9, 0);
  rightArm.position.set(0.58, 1.9, 0);
  leftArm.rotation.z = 0.3;
  rightArm.rotation.z = -0.3;
  leftArm.castShadow = rightArm.castShadow = true;
  group.add(leftArm, rightArm);

  const legGeo = new THREE.CapsuleGeometry(0.16, 1.0, 6, 12);
  const leftLeg = new THREE.Mesh(legGeo, whiteMat);
  const rightLeg = new THREE.Mesh(legGeo, whiteMat);
  leftLeg.position.set(-0.22, 0.7, 0);
  rightLeg.position.set(0.22, 0.7, 0);
  leftLeg.castShadow = rightLeg.castShadow = true;
  group.add(leftLeg, rightLeg);

  return group;
}

function createBat() {
  const group = new THREE.Group();
  const blade = new THREE.Mesh(new THREE.BoxGeometry(0.42, 1.45, 0.13), new THREE.MeshStandardMaterial({ color: 0xd9b071, roughness: 0.75 }));
  blade.position.y = -0.28;
  blade.castShadow = true;
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.95, 14), new THREE.MeshStandardMaterial({ color: 0x1e2632, roughness: 0.8 }));
  handle.position.y = 0.82;
  handle.castShadow = true;
  group.add(blade, handle);
  return group;
}

function createBallAndMarkers() {
  ball = new THREE.Mesh(new THREE.SphereGeometry(0.16, 24, 16), new THREE.MeshStandardMaterial({ color: 0xd62d3a, roughness: 0.55, metalness: 0.02 }));
  ball.castShadow = true;
  ball.position.set(0, 1.1, -12);
  scene.add(ball);

  hitMarker = new THREE.Mesh(new THREE.RingGeometry(0.65, 0.8, 32), new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.0, side: THREE.DoubleSide }));
  hitMarker.rotation.x = -Math.PI / 2;
  hitMarker.position.set(0, 0.14, 7.15);
  scene.add(hitMarker);
}

function startMatch() {
  unlockAudio();
  const teamIndex = Number(DOM.teamSelect.value);
  let opponentIndex = Number(DOM.opponentSelect.value);
  if (teamIndex === opponentIndex) opponentIndex = (opponentIndex + 1) % TEAMS.length;

  state.team = TEAMS[teamIndex];
  state.opponent = TEAMS[opponentIndex];
  state.overLimit = Number(DOM.oversSelect.value);
  state.ballsLimit = state.overLimit * 6;
  state.language = DOM.languageSelect.value;
  state.difficulty = DOM.difficultySelect.value;
  state.runs = 0;
  state.wickets = 0;
  state.balls = 0;
  state.currentBatterIndex = 0;
  state.currentBowlerIndex = 10;
  state.lastBall = '-';
  state.running = true;
  state.paused = false;
  state.ballPhase = 'idle';
  state.lastOutcomeAt = 0;
  state.hitAttempted = false;
  state.defendAttempted = false;

  updatePlayerColors();
  resetBall();
  hideOverlay(DOM.menu);
  hideOverlay(DOM.result);
  hideOverlay(DOM.pause);
  updateScoreboard();
  say(randomLine('start'));
  setTimeout(bowlBall, 700);
}

function showMenu() {
  state.running = false;
  hideOverlay(DOM.result);
  showOverlay(DOM.menu);
}

function pauseGame() {
  if (!state.running || state.paused) return;
  state.paused = true;
  showOverlay(DOM.pause);
}

function resumeGame() {
  if (!state.running) return;
  state.paused = false;
  hideOverlay(DOM.pause);
  if (state.ballPhase === 'idle') bowlBall();
}

function toggleVoice() {
  state.voice = !state.voice;
  DOM.voiceBtn.textContent = `Voice: ${state.voice ? 'On' : 'Off'}`;
  DOM.voiceBtn.setAttribute('aria-pressed', String(state.voice));
  if (!state.voice && 'speechSynthesis' in window) window.speechSynthesis.cancel();
}

function bowlBall() {
  if (!state.running || state.paused || isMatchOver()) return;
  state.ballPhase = 'bowling';
  state.ballT = 0;
  state.hitAttempted = false;
  state.defendAttempted = false;
  ball.position.set(rand(-0.55, 0.55), 1.25, -12.2);
  ball.visible = true;
  animateBowlerThrow();
  playTone(220, 0.05, 'sine', 0.05);
}

function hitBall() {
  if (!state.running || state.paused || state.ballPhase !== 'bowling' || state.hitAttempted) return;
  unlockAudio();
  state.hitAttempted = true;
  const timing = getTimingScore();
  swingBat(timing);
  resolveBall(timing, false);
}

function defendBall() {
  if (!state.running || state.paused || state.ballPhase !== 'bowling' || state.hitAttempted) return;
  unlockAudio();
  state.hitAttempted = true;
  state.defendAttempted = true;
  swingBat(0.52);
  const timing = getTimingScore();
  resolveBall(Math.max(0.22, timing * 0.65), true);
}

function getTimingScore() {
  const z = ball.position.z;
  const perfectZ = 7.2;
  const distance = Math.abs(z - perfectZ);
  return clamp(1 - distance / 4.2, 0, 1);
}

function resolveBall(timing, defended) {
  if (state.ballPhase !== 'bowling') return;
  state.ballPhase = 'resolved';
  state.balls += 1;

  const difficultyPenalty = state.difficulty === 'easy' ? 0.12 : state.difficulty === 'hard' ? -0.12 : 0;
  const quality = clamp((timing * 0.72) + (state.power * 0.32) + difficultyPenalty + rand(-0.09, 0.09), 0, 1.18);
  let run = 0;
  let wicket = false;

  if (defended) {
    run = timing > 0.72 && Math.random() > 0.76 ? 1 : 0;
  } else if (timing < 0.18) {
    wicket = Math.random() < (state.difficulty === 'hard' ? 0.48 : 0.33);
    run = 0;
  } else if (quality < 0.32) {
    wicket = Math.random() < (state.difficulty === 'hard' ? 0.28 : 0.17);
    run = wicket ? 0 : weighted([[0, 55], [1, 32], [2, 13]]);
  } else if (quality < 0.55) {
    run = weighted([[0, 20], [1, 42], [2, 28], [3, 6], [4, 4]]);
  } else if (quality < 0.78) {
    run = weighted([[1, 28], [2, 28], [3, 12], [4, 27], [6, 5]]);
  } else if (quality < 0.98) {
    run = weighted([[2, 10], [3, 10], [4, 48], [6, 32]]);
  } else {
    run = weighted([[4, 37], [6, 63]]);
  }

  if (wicket) {
    state.wickets += 1;
    state.currentBatterIndex = Math.min(state.currentBatterIndex + 1, state.team.players.length - 1);
    state.lastBall = 'W';
    showWicketAnimation();
    say(randomLine('wicket'));
    playWicketSound();
  } else {
    state.runs += run;
    state.lastBall = defended ? (run ? String(run) : 'D') : String(run);
    animateHit(run, quality);
    if (defended) {
      say(randomLine('defend'));
      playTone(170, 0.05, 'triangle', 0.08);
    } else {
      const key = run === 0 ? (timing < 0.22 ? 'miss' : 'dot') : run === 1 ? 'one' : run === 2 ? 'two' : run === 3 ? 'three' : run === 4 ? 'four' : 'six';
      say(randomLine(key));
      if (run === 4 || run === 6) playBoundarySound(run);
      else playBatSound(Math.max(0.2, quality));
    }
  }

  updateScoreboard();
  state.lastOutcomeAt = performance.now();

  if (isMatchOver()) {
    setTimeout(endMatch, 1200);
  } else {
    setTimeout(() => {
      if (state.running && !state.paused) {
        resetBall();
        bowlBall();
      }
    }, state.nextBallDelay);
  }
}

function isMatchOver() {
  return state.balls >= state.ballsLimit || state.wickets >= state.maxWickets;
}

function endMatch() {
  if (!state.running) return;
  state.running = false;
  state.ballPhase = 'idle';
  say(randomLine('complete'));
  DOM.resultTitle.textContent = 'Innings Complete';
  DOM.resultSummary.innerHTML = `<strong>${state.team.country}</strong> scored <strong>${state.runs}/${state.wickets}</strong> in <strong>${formatOvers(state.balls)}</strong> overs.<br>Run Rate: <strong>${calculateRR()}</strong><br>Top moment: ${state.lastBall === '6' ? 'Massive six!' : state.runs > state.overLimit * 9 ? 'Strong batting!' : 'Good practice round!'}`;
  showOverlay(DOM.result);
}

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.033);
  updatePower(dt);
  updateBall(dt);
  updateCharacterIdle(dt);
  renderer.render(scene, camera);
}

function updatePower(dt) {
  state.power += state.powerDir * dt * 0.85;
  if (state.power >= 1) {
    state.power = 1;
    state.powerDir = -1;
  } else if (state.power <= 0.18) {
    state.power = 0.18;
    state.powerDir = 1;
  }
  DOM.powerFill.style.width = `${Math.round(state.power * 100)}%`;
}

function updateBall(dt) {
  if (!state.running || state.paused || state.ballPhase !== 'bowling') return;
  const speed = state.difficulty === 'easy' ? 0.42 : state.difficulty === 'hard' ? 0.64 : 0.52;
  state.ballT += dt * speed;
  const t = clamp(state.ballT, 0, 1.15);
  const startZ = -12.2;
  const endZ = 10.5;
  ball.position.z = lerp(startZ, endZ, t);
  ball.position.y = 0.18 + Math.abs(Math.sin(t * Math.PI * 2.15)) * 1.08 + (1 - t) * 0.45;
  ball.position.x += Math.sin(t * 12) * 0.006;
  ball.rotation.x += dt * 14;
  ball.rotation.z += dt * 8;

  const markerOpacity = 1 - clamp(Math.abs(ball.position.z - 7.15) / 4.5, 0, 1);
  hitMarker.material.opacity = markerOpacity * 0.75;
  hitMarker.scale.setScalar(1 + markerOpacity * 0.18);

  if (t >= 1.02 && !state.hitAttempted) {
    state.hitAttempted = true;
    swingBat(0.1);
    resolveBall(0.05, false);
  }
}

function updateCharacterIdle(dt) {
  const time = performance.now() / 1000;
  if (batsman) {
    batsman.position.y = Math.sin(time * 2.2) * 0.025;
    if (state.ballPhase !== 'resolved') bat.rotation.z = -0.35 + Math.sin(time * 1.7) * 0.08;
  }
  if (bowler) {
    bowler.position.y = Math.sin(time * 2.8) * 0.02;
  }
  if (crowdGroup) crowdGroup.rotation.y += dt * 0.01;
}

function animateBowlerThrow() {
  const start = performance.now();
  const duration = 550;
  const tick = () => {
    const t = clamp((performance.now() - start) / duration, 0, 1);
    bowler.rotation.x = Math.sin(t * Math.PI) * 0.22;
    bowler.rotation.z = Math.sin(t * Math.PI) * 0.08;
    if (t < 1 && state.ballPhase === 'bowling') requestAnimationFrame(tick);
    else bowler.rotation.set(0, 0, 0);
  };
  tick();
}

function swingBat(timing) {
  const start = performance.now();
  const duration = 360;
  const side = state.selectedShot === 'left' ? -1 : state.selectedShot === 'right' ? 1 : 0;
  const tick = () => {
    const t = clamp((performance.now() - start) / duration, 0, 1);
    const swing = Math.sin(t * Math.PI);
    bat.rotation.z = -0.35 - swing * (1.45 + timing * 0.6);
    bat.rotation.y = side * swing * 0.9;
    bat.rotation.x = 0.2 + swing * 0.45;
    batsman.rotation.y = Math.PI + side * swing * 0.18;
    if (t < 1) requestAnimationFrame(tick);
    else {
      bat.rotation.set(0.2, 0, -0.35);
      batsman.rotation.y = Math.PI;
    }
  };
  tick();
}

function animateHit(run, quality) {
  if (run === 0) {
    ball.visible = false;
    return;
  }
  const start = performance.now();
  const duration = run >= 4 ? 1100 : 680;
  const side = state.selectedShot === 'left' ? -1 : state.selectedShot === 'right' ? 1 : rand(-0.25, 0.25);
  const startPos = ball.position.clone();
  const distance = run === 6 ? 58 : run === 4 ? 44 : 12 + run * 4;
  const end = new THREE.Vector3(side * distance * 0.42, run === 6 ? 14 : 0.4, 9 + distance);
  const tick = () => {
    const t = clamp((performance.now() - start) / duration, 0, 1);
    const arc = Math.sin(t * Math.PI) * (run === 6 ? 18 : run === 4 ? 4 : 1.4) * quality;
    ball.position.lerpVectors(startPos, end, t);
    ball.position.y += arc;
    ball.rotation.x += 0.4;
    if (t < 1) requestAnimationFrame(tick);
    else {
      if (run >= 4) createCelebration(run);
      ball.visible = false;
    }
  };
  tick();
}

function showWicketAnimation() {
  const start = performance.now();
  const original = stumps.rotation.z;
  const tick = () => {
    const t = clamp((performance.now() - start) / 600, 0, 1);
    stumps.rotation.z = original + Math.sin(t * Math.PI) * 0.22;
    stumps.position.x = Math.sin(t * 32) * 0.05;
    if (t < 1) requestAnimationFrame(tick);
    else {
      stumps.rotation.z = original;
      stumps.position.x = 0;
    }
  };
  tick();
}

function createCelebration(run) {
  const count = run === 6 ? 50 : 25;
  const particles = [];
  const matColors = [0x00e5ff, 0x20ff8a, 0xffe66d, 0xff5b6e];
  for (let i = 0; i < count; i++) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshBasicMaterial({ color: matColors[i % matColors.length] }));
    mesh.position.set(rand(-4, 4), rand(3, 7), rand(16, 25));
    mesh.userData.velocity = new THREE.Vector3(rand(-3, 3), rand(2, 6), rand(-2, 2));
    scene.add(mesh);
    particles.push(mesh);
  }
  const start = performance.now();
  const tick = () => {
    const dt = 0.016;
    particles.forEach((p) => {
      p.userData.velocity.y -= 8 * dt;
      p.position.addScaledVector(p.userData.velocity, dt);
    });
    if (performance.now() - start < 1400) requestAnimationFrame(tick);
    else particles.forEach((p) => scene.remove(p));
  };
  tick();
}

function resetBall() {
  ball.position.set(0, 1.1, -12.2);
  ball.visible = true;
  stumps.rotation.set(0, 0, 0);
  stumps.position.set(0, 0, 0);
  hitMarker.material.opacity = 0;
  state.ballPhase = 'idle';
}

function updateScoreboard() {
  DOM.scoreText.textContent = `${state.runs}/${state.wickets}`;
  DOM.oversText.textContent = formatOvers(state.balls);
  DOM.rrText.textContent = calculateRR();
  DOM.lastBallText.textContent = state.lastBall;
  DOM.miniScore.textContent = `${state.runs}/${state.wickets} • ${formatOvers(state.balls)} ov`;
}

function calculateRR() {
  if (state.balls === 0) return '0.00';
  return ((state.runs / state.balls) * 6).toFixed(2);
}

function formatOvers(balls) {
  return `${Math.floor(balls / 6)}.${balls % 6}`;
}

function updateTeamPreview() {
  const team = TEAMS[Number(DOM.teamSelect.value || 0)];
  const opponent = TEAMS[Number(DOM.opponentSelect.value || 1)];
  DOM.playerPreview.innerHTML = `
    <div><strong>${team.country}</strong><ol>${team.players.map((p) => `<li>${p}</li>`).join('')}</ol></div>
    <div><strong>${opponent.country}</strong><ol>${opponent.players.map((p) => `<li>${p}</li>`).join('')}</ol></div>
  `;
}

function updatePlayerColors() {
  if (!batsman || !bowler) return;
  setCricketerColor(batsman, state.jerseyColor);
  setCricketerColor(bowler, state.opponent.color || '#173b8f');
}

function setCricketerColor(group, color) {
  group.traverse((child) => {
    if (child.isMesh && child.geometry && child.geometry.type === 'CapsuleGeometry' && child.position.y > 1.2) {
      child.material.color.set(color);
    }
  });
}

function selectShot(shot) {
  state.selectedShot = shot;
  DOM.shotButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.shot === shot));
}

function onPointerDown(event) {
  state.swipeStart = { x: event.clientX, y: event.clientY, at: performance.now() };
}

function onPointerUp(event) {
  if (!state.swipeStart) return;
  const dx = event.clientX - state.swipeStart.x;
  const dy = event.clientY - state.swipeStart.y;
  const dist = Math.hypot(dx, dy);
  const elapsed = performance.now() - state.swipeStart.at;
  if (dist > 35 && elapsed < 900) {
    if (Math.abs(dx) > Math.abs(dy)) selectShot(dx < 0 ? 'left' : 'right');
    else selectShot('straight');
    hitBall();
  }
  state.swipeStart = null;
}

function say(text) {
  DOM.commentaryText.textContent = text;
  if (!state.voice || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = state.language === 'hi' ? 1.06 : 1.0;
  utter.pitch = state.language === 'hi' ? 1.08 : 1.02;
  utter.lang = state.language === 'te' ? 'te-IN' : state.language === 'hi' ? 'hi-IN' : 'en-IN';
  window.speechSynthesis.speak(utter);
}

function speakLine(key) {
  say(randomLine(key));
}

function randomLine(key) {
  const list = COMMENTARY[state.language]?.[key] || COMMENTARY.en[key] || ['Nice shot!'];
  return list[Math.floor(Math.random() * list.length)];
}

function unlockAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playTone(freq, duration = 0.08, type = 'sine', gainValue = 0.06) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.frequency.value = freq;
  osc.type = type;
  gain.gain.value = gainValue;
  osc.connect(gain).connect(audioCtx.destination);
  osc.start();
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.stop(audioCtx.currentTime + duration + 0.02);
}

function playBatSound(quality) {
  playTone(380 + quality * 260, 0.09, 'square', 0.035 + quality * 0.04);
}

function playBoundarySound(run) {
  playBatSound(1);
  setTimeout(() => playTone(run === 6 ? 720 : 580, 0.18, 'triangle', 0.07), 90);
  setTimeout(() => playTone(run === 6 ? 920 : 740, 0.16, 'sine', 0.055), 230);
}

function playWicketSound() {
  playTone(120, 0.15, 'sawtooth', 0.08);
  setTimeout(() => playTone(90, 0.25, 'sawtooth', 0.065), 120);
}

function resizeRenderer() {
  if (!renderer || !camera) return;
  const rect = DOM.canvasWrap.getBoundingClientRect();
  renderer.setSize(rect.width, rect.height, false);
  camera.aspect = rect.width / rect.height;
  camera.updateProjectionMatrix();
}

function showOverlay(el) { el.classList.add('active'); }
function hideOverlay(el) { el.classList.remove('active'); }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function rand(min, max) { return Math.random() * (max - min) + min; }

function weighted(items) {
  const total = items.reduce((sum, [, weight]) => sum + weight, 0);
  let roll = Math.random() * total;
  for (const [value, weight] of items) {
    roll -= weight;
    if (roll <= 0) return value;
  }
  return items[items.length - 1][0];
}

// Lightweight placeholder for future ad integration.
// Keep this file as a static game. Add real ad scripts only after your website/domain is approved by the ad network.
window.CricketCareerAds = {
  refresh() {
    document.querySelectorAll('.ad-slot').forEach((slot) => {
      slot.dataset.ready = 'true';
    });
  }
};
window.CricketCareerAds.refresh();
