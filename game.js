/* Cricket Career - cinematic web cricket prototype
   Static, dependency-free and GitHub Pages friendly. */
'use strict';

const TEAMS = {
  'India XI': {
    colors: ['#1f65ff', '#ff7a1f', '#ffffff', '#16a86a'],
    players: [
      ['Arjun Mehta','RHB Opener',72,88],['Ravi Malik','LHB Anchor',68,81],['Kabir Rao','RHB Stroke Maker',76,79],
      ['Dev Nair','All-rounder',70,77],['Veer Singh','Power Hitter',82,64],['Manav Sethi','WK Batter',74,72],
      ['Ishan Verma','Finisher',79,61],['Nakul Joshi','Fast Bowler',42,86],['Ayaan Khan','Leg Spinner',50,79],['Om Prakash','Swing Bowler',45,82],['Karan Gill','Yorker Specialist',38,88]
    ]
  },
  'Australia XI': {
    colors: ['#ffd42a', '#15823d', '#1e2c3a', '#ffffff'],
    players: [
      ['Liam Carter','RHB Opener',75,80],['Noah Hayes','LHB Attacker',78,74],['Ethan Brooks','RHB Anchor',70,78],
      ['Mason Clarke','All-rounder',67,81],['Jack Turner','Power Hitter',84,64],['Oliver Reed','WK Batter',73,69],
      ['Harry Stone','Finisher',76,66],['Cooper Miles','Fast Bowler',40,89],['Logan Price','Leg Spinner',52,77],['Blake Ward','Swing Bowler',44,82],['Ryan Fox','Pace Enforcer',39,87]
    ]
  },
  'England XI': {
    colors: ['#d51d2a', '#1d5fff', '#ffffff', '#0b2244'],
    players: [
      ['George Allen','RHB Opener',71,78],['Theo Jameson','LHB Opener',73,75],['Arthur Lane','RHB Anchor',68,80],
      ['Freddie Hall','All-rounder',69,76],['Oscar Wright','Power Hitter',81,61],['Henry Scott','WK Batter',72,70],
      ['Charlie Wood','Finisher',77,63],['Alfie Moore','Fast Bowler',41,87],['Jude Taylor','Off Spinner',54,79],['Sam Bishop','Swing Bowler',43,84],['Leo Grant','Seam Bowler',45,83]
    ]
  },
  'South Africa XI': {
    colors: ['#11a456', '#f3cc2f', '#101820', '#ffffff'],
    players: [
      ['Lucas Botha','RHB Opener',74,79],['Daniel Jacobs','LHB Cutter',70,74],['Milan Coetzee','RHB Anchor',69,78],
      ['Adrian Meyer','All-rounder',72,76],['Johan Kruger','Power Hitter',83,63],['Warren Naidoo','WK Batter',71,69],
      ['Kian Reddy','Finisher',78,65],['Marco Venter','Fast Bowler',39,90],['Shaun Pillay','Left-arm Spin',51,79],['Nico Steyn','Swing Bowler',44,84],['Dylan Ross','Pace Bowler',40,86]
    ]
  },
  'New Zealand XI': {
    colors: ['#101820', '#d6dce5', '#51b3ff', '#ffffff'],
    players: [
      ['Finn Walker','RHB Opener',72,76],['Leo Campbell','LHB Anchor',69,80],['Max Wilson','RHB Timer',74,77],
      ['Owen Fraser','All-rounder',66,78],['Jayden King','Power Hitter',79,62],['Toby Martin','WK Batter',71,70],
      ['Ben Cooper','Finisher',75,64],['Caleb Harris','Fast Bowler',41,86],['Isaac Bell','Off Spinner',52,76],['Adam Shaw','Swing Bowler',44,85],['Nate Fisher','Seam Bowler',45,82]
    ]
  },
  'Pakistan XI': {
    colors: ['#0b8f4d', '#ffffff', '#102820', '#b8ffdf'],
    players: [
      ['Hamza Ali','RHB Opener',73,79],['Saad Rehman','LHB Flair',77,72],['Zain Farooq','RHB Anchor',69,80],
      ['Usman Tariq','All-rounder',68,78],['Fahad Khan','Power Hitter',82,63],['Adeel Mir','WK Batter',70,69],
      ['Imran Qureshi','Finisher',76,64],['Bilal Ahmed','Fast Bowler',39,90],['Daniyal Shah','Leg Spinner',53,78],['Sameer Raza','Swing Bowler',43,86],['Omar Malik','Pace Bowler',40,88]
    ]
  },
  'Sri Lanka XI': {
    colors: ['#174ea6', '#f9a825', '#7b1b36', '#ffffff'],
    players: [
      ['Dinesh Perera','RHB Opener',71,76],['Kavindu Silva','LHB Stroke Maker',75,74],['Nuwan Fernando','RHB Anchor',68,79],
      ['Malith Jayasena','All-rounder',67,77],['Roshan Kumara','Power Hitter',78,63],['Charith Mendis','WK Batter',70,69],
      ['Akila Samarasinghe','Finisher',74,65],['Kasun Wijesinghe','Fast Bowler',42,84],['Lasith Karunaratne','Off Spinner',54,80],['Tharindu De Silva','Swing Bowler',43,82],['Isuru Bandara','Pace Bowler',41,83]
    ]
  },
  'Bangladesh XI': {
    colors: ['#0b8f4d', '#d71920', '#ffffff', '#103b2a'],
    players: [
      ['Rafiq Hasan','LHB Opener',70,76],['Nayeem Rahman','RHB Timer',72,74],['Mahin Chowdhury','RHB Anchor',68,78],
      ['Sabbir Karim','All-rounder',66,76],['Ashiq Islam','Power Hitter',77,62],['Tanzim Ahmed','WK Batter',69,68],
      ['Farhan Uddin','Finisher',73,64],['Rakib Hossain','Fast Bowler',41,83],['Shuvo Das','Left-arm Spin',55,79],['Adnan Bari','Swing Bowler',43,81],['Momin Saif','Medium Pacer',45,79]
    ]
  }
};

const WEATHER = ['A warm evening with a light breeze from mid-wicket.', 'Cloud cover is helping the swing bowlers early on.', 'Dry air, quick outfield, and a pitch that should reward timing.', 'A packed stadium under lights with a hint of dew expected later.'];
const PITCH = ['Hard pitch: good bounce and carry.', 'Dry pitch: spinners will come into play.', 'Green tinge: seamers may enjoy the new ball.', 'Flat surface: batters can trust the bounce.'];

const game = {
  canvas:null, ctx:null, w:0, h:0,
  scene:'select', frame:0, sceneStart:0, camera:'Selection Cam',
  teamName:'India XI', oppName:'Australia XI', jersey:'#1f65ff', overs:2,
  battingFirst:null, userBatting:true, tossChoice:'Heads', tossWinner:null, tossDecision:'Bat',
  innings:1, target:null, ballInOver:0, over:0, wickets:0, runs:0, oppRuns:0, oppWickets:0, striker:0, nonStriker:1, bowlerIndex:7,
  battingStyle:'Stroke', shotDir:0, bowlingStyle:'Good Length', speed:135, confidence:35, bowlerConfidence:35,
  commentary:[], highlights:[], lastOutcome:'', anim:{}, selectedTeam:null, selectedOpp:null,
  settings:{matchStarted:false}, balls:[], fielders:[], activeBall:null, showReplay:false
};

function $(id){return document.getElementById(id)}
function rand(min,max){return Math.random()*(max-min)+min}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
function now(){return performance.now()}

function initGame(){
  game.canvas = $('gameCanvas');
  if(!game.canvas) return;
  game.ctx = game.canvas.getContext('2d');
  setupUI();
  resize(); window.addEventListener('resize', resize);
  setScene('select');
  requestAnimationFrame(loop);
}

function resize(){
  const rect = game.canvas.getBoundingClientRect();
  const scale = Math.min(window.devicePixelRatio||1, 2);
  game.canvas.width = Math.floor(rect.width*scale);
  game.canvas.height = Math.floor(rect.height*scale);
  game.ctx.setTransform(scale,0,0,scale,0,0);
  game.w = rect.width; game.h = rect.height;
}

function setupUI(){
  const teamSel=$('teamSelect'), oppSel=$('oppSelect'), colorSel=$('colorSelect');
  Object.keys(TEAMS).forEach(t=>{
    const o=document.createElement('option'); o.value=t; o.textContent=t; teamSel.appendChild(o);
    const p=document.createElement('option'); p.value=t; p.textContent=t; oppSel.appendChild(p);
  });
  teamSel.value='India XI'; oppSel.value='Australia XI';
  function refreshColors(){
    colorSel.innerHTML='';
    TEAMS[teamSel.value].colors.forEach(c=>{const o=document.createElement('option');o.value=c;o.textContent=c;colorSel.appendChild(o);});
    colorSel.value=TEAMS[teamSel.value].colors[0];
  }
  refreshColors();
  teamSel.addEventListener('change',()=>{ if(teamSel.value===oppSel.value) oppSel.value=Object.keys(TEAMS).find(t=>t!==teamSel.value); refreshColors(); previewSelection(); });
  oppSel.addEventListener('change',()=>{ if(teamSel.value===oppSel.value) oppSel.value=Object.keys(TEAMS).find(t=>t!==oppSel.value); previewSelection(); });
  colorSel.addEventListener('change',previewSelection);
  $('overSelect').addEventListener('change',previewSelection);
  $('startMatch').addEventListener('click',startMatch);
  $('tossHeads').addEventListener('click',()=>selectToss('Heads'));
  $('tossTails').addEventListener('click',()=>selectToss('Tails'));
  $('chooseBat').addEventListener('click',()=>finishTossDecision('Bat'));
  $('chooseBowl').addEventListener('click',()=>finishTossDecision('Bowl'));
  document.querySelectorAll('[data-shot]').forEach(b=>b.addEventListener('click',()=>setShot(b.dataset.shot)));
  document.querySelectorAll('[data-bowl]').forEach(b=>b.addEventListener('click',()=>setBowl(b.dataset.bowl)));
  $('playShot').addEventListener('click',playShot);
  $('bowlNow').addEventListener('click',bowlNow);
  $('speedRange').addEventListener('input',e=>{game.speed=+e.target.value; $('speedValue').textContent=game.speed+' km/h'});
  $('specialBtn').addEventListener('click',useSpecial);
  $('nextBall').addEventListener('click',nextBall);
  $('viewHighlights').addEventListener('click',()=>setScene('highlights'));
  $('newMatch').addEventListener('click',resetMatch);

  let dragging=false, start=null;
  game.canvas.addEventListener('pointerdown',e=>{dragging=true;start=point(e);});
  game.canvas.addEventListener('pointerup',e=>{ if(!dragging||!start)return; const end=point(e); const dx=end.x-start.x, dy=end.y-start.y; if(Math.hypot(dx,dy)>20){ game.shotDir=Math.atan2(dy,dx); say('Shot direction selected. Aim locked toward '+directionName(game.shotDir)+'.'); updatePanel(); } dragging=false; });
  previewSelection();
}

function point(e){const r=game.canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top}}
function selectToss(choice){ game.tossChoice=choice; setActive('tossChoice',choice); say('Captain calls '+choice+'. Coin is ready in the umpire camera.'); setScene('toss'); }
function setShot(s){game.battingStyle=s; setActive('shotChoice',s); updatePanel();}
function setBowl(s){game.bowlingStyle=s; setActive('bowlChoice',s); updatePanel();}
function setActive(group,val){document.querySelectorAll('[data-group="'+group+'"]').forEach(b=>b.classList.toggle('active',b.textContent.trim()===val||b.dataset.shot===val||b.dataset.bowl===val));}
function previewSelection(){
  game.teamName=$('teamSelect').value; game.oppName=$('oppSelect').value; game.jersey=$('colorSelect').value; game.overs=+$('overSelect').value;
  game.selectedTeam=makeTeam(game.teamName); game.selectedOpp=makeTeam(game.oppName);
  updatePanel();
}
function makeTeam(name){ return TEAMS[name].players.map((p,i)=>({name:p[0],role:p[1],bat:p[2],bowl:p[3],index:i,confidence:35})); }
function startMatch(){
  previewSelection(); game.settings.matchStarted=true; game.commentary=[]; game.highlights=[];
  say('Welcome to Cricket Career. '+game.teamName+' in '+game.jersey+' face '+game.oppName+'.');
  say('Weather report: '+pick(WEATHER)); say('Pitch report: '+pick(PITCH));
  setScene('tossIntro');
  setTimeout(()=>setScene('tossSelect'),1800);
}
function resetMatch(){
  Object.assign(game,{scene:'select',frame:0,innings:1,target:null,ballInOver:0,over:0,wickets:0,runs:0,oppRuns:0,oppWickets:0,striker:0,nonStriker:1,bowlerIndex:7,battingFirst:null,userBatting:true,tossWinner:null,confidence:35,bowlerConfidence:35,lastOutcome:'',activeBall:null,balls:[],highlights:[],commentary:[]});
  $('selectionPanel').classList.remove('hidden'); $('tossPanel').classList.add('hidden'); $('controlPanel').classList.add('hidden'); $('highlightPanel').classList.add('hidden'); $('resultPanel').classList.add('hidden');
  setScene('select'); updatePanel();
}
function finishTossDecision(decision){
  game.tossDecision=decision; game.userBatting = decision==='Bat'; game.battingFirst = game.userBatting ? game.teamName : game.oppName;
  say(game.teamName+' captain decides to '+decision.toLowerCase()+' first. Players are moving into position.');
  setScene('walkIn');
  setTimeout(()=>beginInnings(),4600);
}
function beginInnings(){
  setScene('fieldHuddle');
  setTimeout(()=>{
    setScene('play'); showControls(); say('Live now: watch the ball, choose shot style, swipe to choose direction.');
  },3600);
}
function showControls(){ $('selectionPanel').classList.add('hidden'); $('tossPanel').classList.add('hidden'); $('controlPanel').classList.remove('hidden'); $('highlightPanel').classList.add('hidden'); $('resultPanel').classList.add('hidden'); updatePanel(); }
function setScene(scene){ game.scene=scene; game.sceneStart=now(); game.frame=0; updatePanelsForScene(scene); }
function updatePanelsForScene(scene){
  $('selectionPanel').classList.toggle('hidden', scene!=='select');
  $('tossPanel').classList.toggle('hidden', !['tossSelect','toss','tossResult'].includes(scene));
  $('controlPanel').classList.toggle('hidden', scene!=='play' && scene!=='outEntry');
  $('highlightPanel').classList.toggle('hidden', scene!=='highlights');
  $('resultPanel').classList.toggle('hidden', scene!=='result');
  if(scene==='highlights') renderHighlights();
  updatePanel();
}
function say(text){ game.commentary.unshift(text); game.commentary=game.commentary.slice(0,12); updatePanel(); }
function addHighlight(type,text){ game.highlights.push({type,text,ball:scoreLabel(),time:new Date().toLocaleTimeString()}); }
function scoreLabel(){return game.over+'.'+game.ballInOver}

function currentBatters(){return game.userBatting=== (game.innings===1) ? game.selectedTeam : game.selectedOpp}
function currentBowlers(){return game.userBatting=== (game.innings===1) ? game.selectedOpp : game.selectedTeam}
function battingSideName(){return game.userBatting=== (game.innings===1) ? game.teamName : game.oppName}
function bowlingSideName(){return game.userBatting=== (game.innings===1) ? game.oppName : game.teamName}
function strikerObj(){return currentBatters()[game.striker]||currentBatters()[0]}
function bowlerObj(){return currentBowlers()[game.bowlerIndex]||currentBowlers()[7]}

function playShot(){
  if(game.scene!=='play')return;
  const bat=strikerObj(), bowl=bowlerObj();
  const risk={Push:.14,Stroke:.28,Loft:.48}[game.battingStyle] || .25;
  const reward={Push:1.2,Stroke:3.2,Loft:5.8}[game.battingStyle] || 3;
  const skill=(bat.bat-55)/40; const pressure=(game.confidence-35)/90;
  const wicketChance=clamp(risk - skill*.08 - pressure*.07 + (bowl.bowl-75)/180, .03, .52);
  const contact=rand(0,1)+skill*.25+pressure*.15;
  let outcome;
  if(Math.random()<wicketChance){ outcome={runs:0,wicket:true,label:pick(['Caught at deep cover','Bowled through the gate','LBW appeal upheld','Edge to keeper']),umpire:'OUT'}; }
  else if(contact>1.12 && game.battingStyle==='Loft'){ outcome={runs:6,label:'SIX! Clean strike over '+directionName(game.shotDir),umpire:'SIX'}; }
  else if(contact>.92){ outcome={runs:4,label:'FOUR! Timed through '+directionName(game.shotDir),umpire:'FOUR'}; }
  else if(contact>.65){ outcome={runs:Math.floor(rand(1,4)),label:'Good running between wickets',umpire:'RUN'}; }
  else { outcome={runs:0,label:pick(['Super save near the rope','Dot ball with sharp fielding','Beaten by movement']),umpire:'DOT'}; }
  resolveBall(outcome,'bat');
}

function bowlNow(){
  if(game.scene!=='play')return;
  const bat=strikerObj(), bowl=bowlerObj();
  const ideal = game.bowlingStyle.includes('Spin') ? 86 : game.bowlingStyle.includes('Yorker') ? 142 : game.bowlingStyle.includes('Bouncer') ? 146 : 132;
  const accuracy = clamp(1 - Math.abs(game.speed-ideal)/70 + (bowl.bowl-70)/100 + (game.bowlerConfidence-35)/120, .12, 1.25);
  const wicketChance=clamp(.08 + accuracy*.19 - (bat.bat-70)/210, .04, .43);
  let outcome;
  if(Math.random()<wicketChance){ outcome={runs:0,wicket:true,label:pick(['Brilliant yorker, stumps disturbed','Sharp bouncer, top edge caught','Spin beats the bat, stumped','Late swing, edge to keeper']),umpire:'OUT'}; }
  else if(accuracy<.32){ outcome={runs:4,label:'Loose ball punished to the boundary',umpire:'FOUR'}; }
  else if(accuracy>.95){ outcome={runs:0,label:'Dot ball. Bowler hits the perfect area.',umpire:'DOT'}; }
  else { outcome={runs:Math.floor(rand(1,4)),label:'Batter works it into the gap',umpire:'RUN'}; }
  resolveBall(outcome,'bowl');
}

function useSpecial(){
  if(game.scene!=='play')return;
  if(game.confidence>=75){ game.confidence=55; game.battingStyle='Loft'; say('Special ability unlocked: Power Loft activated for this ball.'); playShot(); }
  else if(game.bowlerConfidence>=75){ game.bowlerConfidence=55; game.bowlingStyle='Perfect Yorker'; game.speed=145; say('Special ability unlocked: Perfect Yorker loaded.'); bowlNow(); }
  else say('Special ability needs 75 confidence. Build it with good shots or tight balls.');
}

function resolveBall(outcome, mode){
  game.lastOutcome=outcome.umpire;
  game.ballInOver++;
  if(outcome.wicket){ game.wickets++; game.confidence=clamp(game.confidence-18,10,100); game.bowlerConfidence=clamp(game.bowlerConfidence+20,10,100); addHighlight('Wicket',outcome.label); say(outcome.label+'. Umpire raises the finger. New batter is warming up.'); }
  else { game.runs+=outcome.runs; if(outcome.runs>=4){addHighlight(outcome.runs===6?'Six':'Four',outcome.label); game.confidence=clamp(game.confidence+14,10,100);} else if(outcome.runs===0){addHighlight('Fielding',outcome.label); game.bowlerConfidence=clamp(game.bowlerConfidence+8,10,100);} else {game.confidence=clamp(game.confidence+5,10,100);}
    say(outcome.label+'. '+outcome.runs+' run'+(outcome.runs===1?'':'s')+'.');
    if(outcome.runs%2===1){ const tmp=game.striker; game.striker=game.nonStriker; game.nonStriker=tmp; }
  }
  animateBall(outcome);
  updatePanel();
  if(outcome.wicket){ setScene('outEntry'); setTimeout(()=>{ nextBatter(); checkInningsOrEnd(); },2400); }
  else checkInningsOrEnd();
}

function nextBatter(){
  const next = Math.max(game.striker, game.nonStriker)+1;
  if(next < 11){ game.striker=next; say(strikerObj().name+' walks in, checks guard, shadow practices and studies the field. Career rating: BAT '+strikerObj().bat+'.'); setScene('play'); }
}
function checkInningsOrEnd(){
  if(game.ballInOver>=6){ game.ballInOver=0; game.over++; const tmp=game.striker; game.striker=game.nonStriker; game.nonStriker=tmp; say('Over completed. Fielders gather, captain discusses plans, and a new bowler warms up.'); game.bowlerIndex = 7 + ((game.over)%4); }
  if(game.innings===2 && game.runs>=game.target){ finishMatch(); return; }
  if(game.over>=game.overs || game.wickets>=10){
    if(game.innings===1){
      if(game.userBatting){ game.target=game.runs+1; game.oppRuns=game.runs; game.oppWickets=game.wickets; } else { game.target=game.runs+1; game.oppRuns=game.runs; game.oppWickets=game.wickets; }
      addHighlight('Innings Break','Target set: '+game.target+'. Bowling side regroups with the captain.');
      say('Innings break. Target is '+game.target+'. Now roles switch.');
      game.innings=2; game.runs=0; game.wickets=0; game.over=0; game.ballInOver=0; game.striker=0; game.nonStriker=1; game.bowlerIndex=7; setScene('fieldHuddle'); setTimeout(()=>{setScene('play');showControls();},3300);
    } else finishMatch();
  }
  updatePanel();
}
function finishMatch(){
  const userScore = game.userBatting ? (game.innings===1?game.runs:game.target-1) : game.runs;
  const result = game.runs>=game.target ? battingSideName()+' win by '+(10-game.wickets)+' wickets' : bowlingSideName()+' win by '+(game.target-1-game.runs)+' runs';
  say('Match complete. '+result+'. Highlights are ready.'); addHighlight('Result',result); setScene('result'); updatePanel();
}
function nextBall(){ if(game.scene==='outEntry') setScene('play'); }
function animateBall(outcome){ game.activeBall={t:0,outcome,angle:game.shotDir,mode:'hit'}; }
function directionName(a){ const dirs=['deep mid-wicket','long-on','straight','long-off','cover','point','third man','fine leg']; let idx=Math.round((((a+Math.PI)/(Math.PI*2))*8))%8; return dirs[idx]; }

function updatePanel(){
  if(!$('scoreText')) return;
  $('scoreText').textContent = game.runs+'/'+game.wickets+' in '+game.over+'.'+game.ballInOver+' overs';
  $('targetText').textContent = game.target ? 'Target '+game.target : 'First innings';
  $('teamText').textContent = battingSideName();
  $('bowlerText').textContent = bowlerObj()?bowlerObj().name:'Bowler';
  $('batterText').textContent = strikerObj()?strikerObj().name:'Batter';
  $('cameraText').textContent = game.camera;
  $('commentaryText').textContent = game.commentary[0] || 'Select teams and start the match.';
  $('miniLog').innerHTML = game.commentary.slice(0,5).map(c=>'<div class="small">• '+escapeHtml(c)+'</div>').join('');
  $('confBar').style.width=game.confidence+'%'; $('bowlConfBar').style.width=game.bowlerConfidence+'%';
  $('confText').textContent=Math.round(game.confidence); $('bowlConfText').textContent=Math.round(game.bowlerConfidence);
  $('specialBtn').textContent = game.confidence>=75 ? 'Use Special: Power Loft' : game.bowlerConfidence>=75 ? 'Use Special: Perfect Yorker' : 'Special locked';
  if($('resultText')) $('resultText').textContent = game.commentary[0] || 'Match finished.';
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function renderHighlights(){
  $('highlightList').innerHTML = game.highlights.length ? game.highlights.map((h,i)=>`<div class="highlight-item"><b>${i+1}. ${escapeHtml(h.type)}</b><br><span>${escapeHtml(h.ball)} - ${escapeHtml(h.text)}</span></div>`).join('') : '<div class="highlight-item">No highlights yet. Play a match first.</div>';
}

function loop(){ game.frame++; draw(); requestAnimationFrame(loop); }
function draw(){
  const ctx=game.ctx,w=game.w,h=game.h; if(!ctx)return; ctx.clearRect(0,0,w,h);
  drawSky(ctx,w,h); drawStadium(ctx,w,h);
  if(game.scene==='select') { game.camera='Selection Cam'; drawSelection(ctx,w,h); }
  else if(game.scene==='tossIntro'||game.scene==='tossSelect') { game.camera='Toss Cam'; drawTossSetup(ctx,w,h,false); }
  else if(game.scene==='toss') { game.camera='Coin Close-up'; drawTossSetup(ctx,w,h,true); const elapsed=now()-game.sceneStart; if(elapsed>3300){ finishToss(); } }
  else if(game.scene==='tossResult') { game.camera='Umpire Cam'; drawTossResult(ctx,w,h); }
  else if(game.scene==='walkIn') { game.camera='Player Entry Cam'; drawWalkIn(ctx,w,h); }
  else if(game.scene==='fieldHuddle') { game.camera='Field Huddle Cam'; drawHuddle(ctx,w,h); }
  else if(game.scene==='outEntry') { game.camera='New Batter Cam'; drawOutEntry(ctx,w,h); }
  else if(game.scene==='highlights') { game.camera='Highlights Room'; drawHighlightsScene(ctx,w,h); }
  else if(game.scene==='result') { game.camera='Post Match Cam'; drawResultScene(ctx,w,h); }
  else { game.camera='Live Broadcast Cam'; drawPlay(ctx,w,h); }
  updatePanel();
}
function drawSky(ctx,w,h){
  const g=ctx.createLinearGradient(0,0,0,h); g.addColorStop(0,'#0b2442'); g.addColorStop(.58,'#061625'); g.addColorStop(1,'#031017'); ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
  ctx.fillStyle='rgba(255,255,255,.08)'; for(let i=0;i<20;i++){ const x=(i*97+game.frame*.08)%w; const y=30+(i*37)%130; ctx.beginPath(); ctx.arc(x,y,1.5+(i%3),0,Math.PI*2); ctx.fill(); }
}
function drawStadium(ctx,w,h){
  const cx=w/2, cy=h*.58, rx=w*.46, ry=h*.34;
  ctx.fillStyle='#16233a'; ctx.beginPath(); ctx.ellipse(cx,cy,rx*1.08,ry*1.1,0,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='#1b8149'; ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.22)'; ctx.lineWidth=3; ctx.beginPath(); ctx.ellipse(cx,cy,rx*.83,ry*.76,0,0,Math.PI*2); ctx.stroke();
  for(let i=0;i<16;i++){const a=i*Math.PI*2/16; ctx.fillStyle=i%2?'#24415f':'#2f5276'; ctx.fillRect(cx+Math.cos(a)*rx*1.03-14,cy+Math.sin(a)*ry*1.03-8,28,16)}
  ctx.fillStyle='#c59a60'; roundRect(ctx,cx-34,cy-125,68,250,18); ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.55)'; ctx.lineWidth=2; ctx.strokeRect(cx-26,cy-106,52,212);
}
function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function drawPerson(ctx,x,y,color,label,scale=1,pose='stand'){
  ctx.save();ctx.translate(x,y);ctx.scale(scale,scale);ctx.fillStyle=color;ctx.beginPath();ctx.arc(0,-22,9,0,Math.PI*2);ctx.fill();ctx.fillStyle=color;roundRect(ctx,-9,-13,18,30,8);ctx.fill();ctx.strokeStyle='#f0f5ff';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-7,18);ctx.lineTo(-13,36);ctx.moveTo(7,18);ctx.lineTo(13,36);ctx.stroke();
  ctx.beginPath(); if(pose==='six'){ctx.moveTo(-8,-7);ctx.lineTo(-22,-30);ctx.moveTo(8,-7);ctx.lineTo(22,-30);} else if(pose==='out'){ctx.moveTo(8,-7);ctx.lineTo(12,-48);ctx.moveTo(-8,-7);ctx.lineTo(-16,8);} else if(pose==='bowl'){ctx.moveTo(-8,-7);ctx.lineTo(-23,8);ctx.moveTo(8,-7);ctx.lineTo(22,-28);} else {ctx.moveTo(-8,-7);ctx.lineTo(-21,4);ctx.moveTo(8,-7);ctx.lineTo(21,4);} ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,.9)';ctx.font='10px system-ui';ctx.textAlign='center';if(label)ctx.fillText(label,0,52);ctx.restore();
}
function drawSelection(ctx,w,h){
  ctx.fillStyle='rgba(0,0,0,.28)'; roundRect(ctx,w*.1,h*.13,w*.8,h*.22,24); ctx.fill(); ctx.fillStyle='#fff'; ctx.font='bold 28px system-ui'; ctx.textAlign='center'; ctx.fillText('Choose Team, Jersey and Overs',w/2,h*.22); ctx.font='16px system-ui'; ctx.fillStyle='#bfe4ff'; ctx.fillText('AdSense-safe cricket game: original teams, original commentary and no copied assets.',w/2,h*.28);
  drawPerson(ctx,w*.42,h*.60,game.jersey,'Captain',1.2); drawPerson(ctx,w*.58,h*.60,'#ffd35a','Opponent',1.2);
}
function drawTossSetup(ctx,w,h,animate){
  const cx=w/2,cy=h*.56; drawPerson(ctx,cx-110,cy+10,game.jersey,'Captain',1.05); drawPerson(ctx,cx+110,cy+10,'#ffd35a','Captain',1.05); drawPerson(ctx,cx,cy,'#f4f4f4','Umpire',1.05,'out');
  ctx.fillStyle='rgba(0,0,0,.55)'; roundRect(ctx,w*.24,h*.12,w*.52,70,18); ctx.fill(); ctx.fillStyle='#fff'; ctx.font='bold 24px system-ui';ctx.textAlign='center';ctx.fillText('Coin Toss Ceremony',w/2,h*.18);
  if(animate){ const t=(now()-game.sceneStart)/3300; const y=cy-90 - Math.sin(Math.min(t,1)*Math.PI)*150 + Math.max(0,t-.65)*210; const r=22+Math.sin(t*30)*5; ctx.save(); ctx.translate(cx,y); ctx.rotate(t*14); ctx.fillStyle=t%0.2>.1?'#ffd35a':'#e4b93d'; ctx.beginPath(); ctx.ellipse(0,0,r,Math.max(5,r*.35),0,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#5b3b00'; ctx.font='bold 12px system-ui'; ctx.textAlign='center'; ctx.fillText(t%0.2>.1?'H':'T',0,4); ctx.restore(); }
  else { ctx.fillStyle='#ffd35a'; ctx.beginPath(); ctx.arc(cx,cy-110,22,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#5b3b00'; ctx.font='bold 12px system-ui'; ctx.textAlign='center'; ctx.fillText('H/T',cx,cy-106); }
}
function finishToss(){
  const result=Math.random()<.5?'Heads':'Tails'; game.tossWinner = result===game.tossChoice ? game.teamName : game.oppName; say('Coin lands on '+result+'. Toss won by '+game.tossWinner+'.'); setScene('tossResult');
  if(game.tossWinner!==game.teamName){ const dec=Math.random()<.5?'Bat':'Bowl'; game.tossDecision=dec; game.userBatting=dec==='Bowl'; game.battingFirst = game.userBatting ? game.teamName : game.oppName; setTimeout(()=>{say(game.oppName+' choose to '+dec.toLowerCase()+'. Broadcast moves to player entry.'); setScene('walkIn'); setTimeout(()=>beginInnings(),4400);},1800); }
}
function drawTossResult(ctx,w,h){ drawTossSetup(ctx,w,h,false); const cx=w/2; ctx.fillStyle='rgba(255,211,90,.22)'; roundRect(ctx,w*.25,h*.72,w*.5,70,20); ctx.fill(); ctx.fillStyle='#fff';ctx.font='bold 22px system-ui';ctx.textAlign='center'; ctx.fillText(game.tossWinner+' won the toss',cx,h*.78); if(game.tossWinner===game.teamName){ctx.font='15px system-ui'; ctx.fillText('Choose Bat or Bowl from the side panel.',cx,h*.83);} }
function drawWalkIn(ctx,w,h){
  const t=(now()-game.sceneStart)/4600; const x1=-40+t*w*.55; const x2=w+40-t*w*.55; drawPerson(ctx,x1,h*.62,game.jersey,strikerObj().name,1.1,'stand'); drawPerson(ctx,x1-70,h*.66,game.jersey,currentBatters()[game.nonStriker].name,1.0,'stand'); drawPerson(ctx,x2,h*.58,'#f4f4f4','Umpire',1.0,'stand');
  ctx.fillStyle='rgba(0,0,0,.62)';roundRect(ctx,w*.1,h*.12,w*.8,92,22);ctx.fill(); ctx.fillStyle='#fff';ctx.font='bold 24px system-ui';ctx.textAlign='center';ctx.fillText('Batter Entry & Record Card',w/2,h*.18);ctx.font='15px system-ui';ctx.fillStyle='#c8e8ff';ctx.fillText(strikerObj().name+' • '+strikerObj().role+' • BAT '+strikerObj().bat+' • Confidence '+game.confidence,w/2,h*.24);
}
function drawHuddle(ctx,w,h){
  const cx=w/2,cy=h*.60; for(let i=0;i<8;i++){ const a=i*Math.PI*2/8+game.frame*.004; drawPerson(ctx,cx+Math.cos(a)*95,cy+Math.sin(a)*55,'#ffd35a','',.8,'stand'); }
  drawPerson(ctx,cx,cy,'#ffd35a','Captain',1,'stand'); ctx.fillStyle='rgba(0,0,0,.62)';roundRect(ctx,w*.12,h*.12,w*.76,95,22);ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 23px system-ui';ctx.textAlign='center';ctx.fillText('Fielding Team Discussion',w/2,h*.18);ctx.font='15px system-ui';ctx.fillStyle='#c8e8ff';ctx.fillText('Captain sets the field, bowler marks run-up, camera checks the pitch.',w/2,h*.24);
}
function drawOutEntry(ctx,w,h){
  drawPlay(ctx,w,h); ctx.fillStyle='rgba(0,0,0,.68)';roundRect(ctx,w*.18,h*.18,w*.64,150,24);ctx.fill();ctx.fillStyle='#ff7381';ctx.font='bold 34px system-ui';ctx.textAlign='center';ctx.fillText('WICKET!',w/2,h*.28);ctx.fillStyle='#fff';ctx.font='16px system-ui';ctx.fillText('Next batter warms up, checks guard and studies the field.',w/2,h*.35); drawPerson(ctx,w*.5,h*.56,game.jersey,'New Batter',1.15,'stand');
}
function drawPlay(ctx,w,h){
  const cx=w/2,cy=h*.58; drawFielders(ctx,w,h); drawPerson(ctx,cx,cy+90,game.jersey,strikerObj().name,.92,'stand'); drawPerson(ctx,cx+32,cy+58,'#0d1320','WK',.78,'stand'); drawPerson(ctx,cx,cy-112,'#ffd35a',bowlerObj().name,.88,'bowl'); drawPerson(ctx,cx+72,cy+4,'#f4f4f4','Umpire',.8,lastOutcomePose());
  drawBat(ctx,cx,cy+82); if(game.activeBall) drawActiveBall(ctx,w,h);
}
function drawFielders(ctx,w,h){ const cx=w/2,cy=h*.58,rx=w*.36,ry=h*.24; for(let i=0;i<9;i++){const a=i*Math.PI*2/9+0.2; const color='#ffd35a';drawPerson(ctx,cx+Math.cos(a)*rx,cy+Math.sin(a)*ry,color,'',.6,'stand');}}
function drawBat(ctx,x,y){ ctx.save();ctx.translate(x-12,y-8);ctx.rotate(-.45);ctx.fillStyle='#d29b59';roundRect(ctx,-4,-42,8,58,4);ctx.fill();ctx.restore(); }
function lastOutcomePose(){ if(game.lastOutcome==='SIX')return 'six'; if(game.lastOutcome==='OUT')return 'out'; return 'stand'; }
function drawActiveBall(ctx,w,h){ const b=game.activeBall; b.t+=.025; const cx=w/2,cy=h*.58; const dist=clamp(b.t,0,1); const angle=b.angle||-.6; const x=cx+Math.cos(angle)*dist*w*.35; const y=cy+90+Math.sin(angle)*dist*h*.28 - Math.sin(dist*Math.PI)*90; ctx.fillStyle='#f52d2d';ctx.beginPath();ctx.arc(x,y,6,0,Math.PI*2);ctx.fill(); if(dist>=1) game.activeBall=null; }
function drawHighlightsScene(ctx,w,h){ ctx.fillStyle='rgba(0,0,0,.62)';roundRect(ctx,w*.14,h*.15,w*.72,h*.62,28);ctx.fill();ctx.fillStyle='#fff';ctx.font='bold 34px system-ui';ctx.textAlign='center';ctx.fillText('Match Highlights',w/2,h*.25);ctx.font='16px system-ui';ctx.fillStyle='#c8e8ff';ctx.fillText('Use the side panel to review fours, sixes, wickets and super saves.',w/2,h*.32); }
function drawResultScene(ctx,w,h){ ctx.fillStyle='rgba(0,0,0,.62)';roundRect(ctx,w*.14,h*.18,w*.72,h*.48,28);ctx.fill();ctx.fillStyle='#35d07f';ctx.font='bold 38px system-ui';ctx.textAlign='center';ctx.fillText('Match Complete',w/2,h*.31);ctx.font='18px system-ui';ctx.fillStyle='#fff';ctx.fillText(game.commentary[0]||'Result ready',w/2,h*.40); }

window.addEventListener('DOMContentLoaded',initGame);
