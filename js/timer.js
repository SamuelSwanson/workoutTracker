// ================================================================
//  TIMER PANEL — injected into each athlete page
//  Exposes: openTimerModal(exNames), closeTimerModal()
//  Depends on: base.css (timer panel styles already included)
// ================================================================
(function(){
'use strict';

// ── AUDIO ──────────────────────────────────────────────────────
var _actx=null, _comp=null;
function getCtx(){
  if(!_actx||_actx.state==='closed'){
    _actx=new(window.AudioContext||window.webkitAudioContext)();
    // Compressor maximises perceived loudness without clipping
    _comp=_actx.createDynamicsCompressor();
    _comp.threshold.value=-6;
    _comp.knee.value=3;
    _comp.ratio.value=20;
    _comp.attack.value=0.001;
    _comp.release.value=0.1;
    _comp.connect(_actx.destination);
  }
  if(_actx.state==='suspended')_actx.resume();
  return {ctx:_actx,dest:_comp||_actx.destination};
}
function tone(freq,dur,vol,type,delay){
  vol=vol||0.9; type=type||'sine'; delay=delay||0;
  try{
    var ac=getCtx(),ctx=ac.ctx,dest=ac.dest,t=ctx.currentTime+delay;
    var osc=ctx.createOscillator(),gain=ctx.createGain();
    osc.type=type; osc.frequency.value=freq;
    gain.gain.setValueAtTime(vol,t);
    gain.gain.exponentialRampToValueAtTime(0.001,t+dur);
    osc.connect(gain); gain.connect(dest);
    osc.start(t); osc.stop(t+dur+0.05);
  }catch(e){}
}
// All tones: same frequency + square wave so they cut through music
var BEEP_HZ=1047, BEEP_VOL=0.9;
function sndCountdown(){ tone(BEEP_HZ,0.10,BEEP_VOL,'square'); }
function sndWork(){ tone(BEEP_HZ,0.12,BEEP_VOL,'square'); tone(BEEP_HZ,0.12,BEEP_VOL,'square',0.20); }
function sndRestEx(){ tone(BEEP_HZ,0.12,BEEP_VOL,'square'); }
function sndRestRnd(){ tone(BEEP_HZ,0.70,BEEP_VOL,'square'); }
function sndDone(){ tone(BEEP_HZ,0.12,BEEP_VOL,'square'); tone(BEEP_HZ,0.12,BEEP_VOL,'square',0.20); tone(BEEP_HZ,0.12,BEEP_VOL,'square',0.40); }

// ── STATE ──────────────────────────────────────────────────────
var _phase='idle',_cdCount=0,_leftMs=0,_totalMs=0;
var _exercise=1,_round=1;
var _cfg={workMs:0,restExMs:0,restRndMs:0,exercises:1,rounds:1};
var _exNames=[];
var _tickId=null,_lastTick=0,_paused=false;

// ── DOM REFS ───────────────────────────────────────────────────
var $face,$phase,$exName,$digits,$exLabel,$rndLabel;
var $fillIntv,$fillRnd,$btnStart,$btnPause,$btnSkip;

function getDom(){
  $face    =document.getElementById('tmFace');
  $phase   =document.getElementById('tmPhase');
  $exName  =document.getElementById('tmExName');
  $digits  =document.getElementById('tmDigits');
  $exLabel =document.getElementById('tmExLabel');
  $rndLabel=document.getElementById('tmRndLabel');
  $fillIntv=document.getElementById('tmFillIntv');
  $fillRnd =document.getElementById('tmFillRnd');
  $btnStart=document.getElementById('tmBtnStart');
  $btnPause=document.getElementById('tmBtnPause');
  $btnSkip =document.getElementById('tmBtnSkip');
}

// ── PUBLIC API ─────────────────────────────────────────────────
window.openTimerModal=function(names){
  getDom();
  _exNames=Array.isArray(names)&&names.length>0?names:[];

  var src=document.getElementById('tmSource');
  if(_exNames.length>0){
    if(src) src.textContent=_exNames.length+' exercises loaded from your lift';
    // Pre-fill exercises count if timer is idle
    if(_phase==='idle'||_phase==='done'){
      var exInp=document.getElementById('tmExercises');
      if(exInp) exInp.value=_exNames.length;
    }
  } else {
    if(src) src.textContent='— manual mode —';
  }

  // Open panel
  document.getElementById('tmPanel').classList.add('open');
  // Backdrop only on mobile
  if(window.innerWidth<=600){
    document.getElementById('tmBackdrop').classList.add('open');
    document.body.style.overflow='hidden';
  }

  if(_phase==='idle') tmRenderIdle();
};

window.closeTimerModal=function(){
  document.getElementById('tmPanel').classList.remove('open');
  document.getElementById('tmBackdrop').classList.remove('open');
  document.body.style.overflow='';
};

// ── CONTROLS (called from onclick in injected HTML) ────────────
window.tmHandleStart=function(){
  if(_paused){tmResume();return;}
  if(_phase!=='idle')return;
  var cfg=tmReadSettings();
  if(cfg.workMs<=0){tmFlashWork();return;}
  _cfg=cfg; _round=1; _exercise=1;
  tmLockSettings(true);
  tmBeginCountdown();
};
window.tmHandlePause=function(){
  if(_phase==='idle'||_phase==='done')return;
  _paused?tmResume():tmPause();
};
window.tmHandleReset=function(){
  tmStopTick();
  _phase='idle'; _paused=false;
  tmLockSettings(false);
  if($btnStart){$btnStart.textContent='START';$btnStart.disabled=false;}
  if($btnPause){$btnPause.textContent='PAUSE';$btnPause.disabled=true;}
  tmRenderIdle();
};
window.tmClampInput=function(el,min,max){
  var v=parseInt(el.value);
  if(!isNaN(v)) el.value=Math.min(max,Math.max(min,v));
  if(_phase==='idle') tmRenderIdle();
};

// ── PHASE TRANSITIONS ──────────────────────────────────────────
function tmPause(){
  _paused=true; tmStopTick();
  if($btnPause) $btnPause.textContent='RESUME';
}
function tmResume(){
  _paused=false;
  if($btnPause) $btnPause.textContent='PAUSE';
  _lastTick=Date.now();
  _tickId=setInterval(_phase==='countdown'?tmTickCountdown:tmTickTimer,
                      _phase==='countdown'?1000:50);
}
function tmBeginCountdown(){
  _phase='countdown'; _cdCount=3;
  sndCountdown();
  if($btnStart){$btnStart.disabled=true;}
  if($btnPause){$btnPause.disabled=false;}
  tmRenderCountdown();
  tmStopTick(); _tickId=setInterval(tmTickCountdown,1000);
}
function tmTickCountdown(){
  _cdCount--;
  if(_cdCount<=0){tmStopTick();tmBeginWork();}
  else{sndCountdown();tmRenderCountdown();}
}
function tmBeginWork(){
  _phase='work'; _totalMs=_cfg.workMs; _leftMs=_cfg.workMs;
  _lastTick=Date.now(); sndWork(); tmDoRender();
  tmStopTick(); _tickId=setInterval(tmTickTimer,50);
}
function tmBeginRestEx(){
  _phase='rest-ex'; _totalMs=_cfg.restExMs; _leftMs=_cfg.restExMs;
  _lastTick=Date.now(); sndRestEx(); tmDoRender();
  tmStopTick(); _tickId=setInterval(tmTickTimer,50);
}
function tmBeginRestRnd(){
  _phase='rest-rnd'; _totalMs=_cfg.restRndMs; _leftMs=_cfg.restRndMs;
  _lastTick=Date.now(); sndRestRnd(); tmDoRender();
  tmStopTick(); _tickId=setInterval(tmTickTimer,50);
}
function tmTickTimer(){
  if(_paused){_lastTick=Date.now();return;}
  var now=Date.now();
  _leftMs-=(now-_lastTick); _lastTick=now;
  if(_leftMs<=0){
    _leftMs=0; tmDoRender(); tmStopTick();
    if(_phase==='work') tmOnWorkDone();
    else if(_phase==='rest-ex') tmOnRestExDone();
    else if(_phase==='rest-rnd') tmOnRestRndDone();
  } else { tmDoRender(); }
}
function tmOnWorkDone(){
  if(_exercise<_cfg.exercises){
    if(_cfg.restExMs>0) tmBeginRestEx();
    else{_exercise++;tmBeginWork();}
  } else {
    if(_round<_cfg.rounds){
      if(_cfg.restRndMs>0) tmBeginRestRnd();
      else{_round++;_exercise=1;tmBeginWork();}
    } else { tmBeginDone(); }
  }
}
function tmOnRestExDone(){_exercise++;tmBeginWork();}
function tmOnRestRndDone(){_round++;_exercise=1;tmBeginWork();}
function tmBeginDone(){
  _phase='done'; sndDone();
  tmLockSettings(false);
  if($btnPause){$btnPause.disabled=true;}
  if($btnStart){$btnStart.disabled=true;}
  tmRenderDone();
}

// ── DISPLAY ────────────────────────────────────────────────────
function pad2(n){ var s=String(n); return s.length<2?'0'+s:s; }
function fmtMs(ms){
  var s=Math.max(0,Math.ceil(ms/1000));
  return pad2(Math.floor(s/60))+':'+pad2(s%60);
}

function tmGetExNameText(){
  if(!_exNames.length) return '';
  if(_phase==='work') return _exNames[_exercise-1]||'';
  if(_phase==='rest-ex'){
    var next=_exNames[_exercise];
    return next?'Next: '+next:'Rest';
  }
  if(_phase==='rest-rnd') return 'Round rest — breathe';
  return '';
}

function tmDoRender(){
  var intvPct=_totalMs>0?Math.min(100,(1-_leftMs/_totalMs)*100):0;
  var exDone=(_exercise-1)+(_phase==='work'?intvPct/100:
             (_phase==='rest-ex'||_phase==='rest-rnd')?1:0);
  var rndPct=Math.min(100,(exDone/_cfg.exercises)*100);
  var label=_phase==='work'?'WORK':_phase==='rest-ex'?'EXERCISE REST':'ROUND REST';
  tmSetFace(_phase,label,fmtMs(_leftMs),tmGetExNameText(),
    'EX '+_exercise+' / '+_cfg.exercises,
    'ROUND '+_round+' / '+_cfg.rounds,
    intvPct,rndPct);
}
function tmRenderCountdown(){
  tmSetFace('ready','GET READY',String(_cdCount),'',
    'EX — / '+_cfg.exercises,'ROUND '+_round+' / '+_cfg.rounds,
    (_cdCount/3)*100,0);
}
function tmRenderIdle(){
  var cfg=tmReadSettings();
  tmSetFace('idle','READY',pad2(Math.floor(cfg.workMs/60000))+':'+pad2(Math.floor((cfg.workMs%60000)/1000)),'','— / —','ROUND — / —',0,0);
}
function tmRenderDone(){
  tmSetFace('done','DONE','✓','All done!',
    _cfg.exercises+' / '+_cfg.exercises,
    'ROUND '+_cfg.rounds+' / '+_cfg.rounds,100,100);
}
function tmSetFace(phase,label,digits,exNameText,exText,rndText,intvPct,rndPct){
  if(!$face) return;
  $face.className='tm-face phase-'+phase;
  if($phase) $phase.textContent=label;
  if($exName){
    $exName.textContent=exNameText;
    $exName.style.display=exNameText?'block':'none';
  }
  if($digits) $digits.textContent=digits;
  if($exLabel) $exLabel.textContent=exText;
  if($rndLabel) $rndLabel.textContent=rndText;
  var color=phase==='rest-ex'?'#f7a030':phase==='rest-rnd'?'#a87fff':
            phase==='done'?'#c8f73a':phase==='ready'?'#9b7fff':'#00d4cc';
  if($fillIntv){$fillIntv.style.width=intvPct+'%';$fillIntv.style.background=color;}
  if($fillRnd){
    $fillRnd.style.width=rndPct+'%';
    $fillRnd.style.background=(phase==='rest-rnd'||phase==='idle')?'var(--muted)':'#00d4cc';
  }
}

// ── HELPERS ────────────────────────────────────────────────────
function tmStopTick(){if(_tickId){clearInterval(_tickId);_tickId=null;}}

function tmReadSettings(){
  function g(id){return Math.max(0,parseInt((document.getElementById(id)||{}).value)||0);}
  return {
    workMs:   (g('tmWorkMin')*60+Math.min(59,g('tmWorkSec')))*1000,
    restExMs: (g('tmRestExMin')*60+Math.min(59,g('tmRestExSec')))*1000,
    restRndMs:(g('tmRestRndMin')*60+Math.min(59,g('tmRestRndSec')))*1000,
    exercises:Math.max(1,parseInt((document.getElementById('tmExercises')||{}).value)||1),
    rounds:   Math.max(1,parseInt((document.getElementById('tmRounds')||{}).value)||1),
  };
}
function tmLockSettings(lock){
  ['tmWorkMin','tmWorkSec','tmRestExMin','tmRestExSec','tmRestRndMin','tmRestRndSec','tmExercises','tmRounds']
    .forEach(function(id){
      var el=document.getElementById(id);
      if(el) el.disabled=lock;
    });
}
function tmFlashWork(){
  ['tmWorkMin','tmWorkSec'].forEach(function(id){
    var el=document.getElementById(id);
    if(el){el.style.borderColor='#f75a3a';setTimeout(function(){el.style.borderColor='';},800);}
  });
}

// ── SAFE ONCLICK HELPERS (avoids bracket-notation in HTML attrs on Android) ──
window.tmOpenDayTimer=function(key){
  openTimerModal((window._dayEx&&window._dayEx[key])||[]);
};
window.tmOpenSegTimer=function(key){
  openTimerModal((window._liftEx&&window._liftEx[key])||[]);
};

// ── INJECT PANEL + NAV BUTTON ──────────────────────────────────
(function inject(){
  var wrap=document.createElement('div');
  wrap.innerHTML=
'<div class="tm-backdrop" id="tmBackdrop" onclick="closeTimerModal()"></div>'+
'<div class="tm-panel" id="tmPanel">'+
  '<div class="tm-panel-header">'+
    '<div>'+
      '<div class="tm-title">INTERVAL TIMER</div>'+
      '<div class="tm-source" id="tmSource">— manual mode —</div>'+
    '</div>'+
    '<button class="tm-close-btn" onclick="closeTimerModal()">✕ CLOSE</button>'+
  '</div>'+
  '<div class="tm-body">'+
    '<div class="tm-face" id="tmFace">'+
      '<div class="tm-phase" id="tmPhase">READY</div>'+
      '<div class="tm-ex-name" id="tmExName" style="display:none"></div>'+
      '<div class="tm-digits" id="tmDigits">00:30</div>'+
      '<div class="tm-ex-label" id="tmExLabel">— / —</div>'+
      '<div class="tm-rnd-label" id="tmRndLabel">ROUND — / —</div>'+
    '</div>'+
    '<div class="tm-prog-group">'+
      '<div class="tm-prog-row"><div class="tm-prog-key">INTV</div><div class="tm-prog-track"><div class="tm-prog-fill" id="tmFillIntv"></div></div></div>'+
      '<div class="tm-prog-row"><div class="tm-prog-key">RND</div><div class="tm-prog-track"><div class="tm-prog-fill" id="tmFillRnd" style="background:var(--muted)"></div></div></div>'+
    '</div>'+
    '<div class="tm-controls">'+
      '<button class="tm-btn primary" id="tmBtnStart" onclick="tmHandleStart()">START</button>'+
      '<button class="tm-btn" id="tmBtnPause" onclick="tmHandlePause()" disabled>PAUSE</button>'+
      '<button class="tm-btn" onclick="tmHandleReset()">RESET</button>'+
    '</div>'+
    '<div class="tm-settings">'+
      '<div class="tm-srow">'+
        '<div class="tm-sgroup">'+
          '<div class="tm-slabel"><span class="tdot" style="background:#00d4cc"></span>Work Time</div>'+
          '<div class="tm-tinputs">'+
            '<input class="tm-input" type="number" id="tmWorkMin" min="0" max="99" value="0" oninput="tmClampInput(this,0,99)">'+
            '<span>m</span>'+
            '<input class="tm-input" type="number" id="tmWorkSec" min="0" max="59" value="30" oninput="tmClampInput(this,0,59)">'+
            '<span>s</span>'+
          '</div>'+
        '</div>'+
        '<div class="tm-sgroup">'+
          '<div class="tm-slabel"><span class="tdot" style="background:#f7a030"></span>Exercise Rest</div>'+
          '<div class="tm-tinputs">'+
            '<input class="tm-input" type="number" id="tmRestExMin" min="0" max="99" value="0" oninput="tmClampInput(this,0,99)">'+
            '<span>m</span>'+
            '<input class="tm-input" type="number" id="tmRestExSec" min="0" max="59" value="10" oninput="tmClampInput(this,0,59)">'+
            '<span>s</span>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="tm-srow">'+
        '<div class="tm-sgroup">'+
          '<div class="tm-slabel"><span class="tdot" style="background:#a87fff"></span>Round Rest</div>'+
          '<div class="tm-tinputs">'+
            '<input class="tm-input" type="number" id="tmRestRndMin" min="0" max="99" value="1" oninput="tmClampInput(this,0,99)">'+
            '<span>m</span>'+
            '<input class="tm-input" type="number" id="tmRestRndSec" min="0" max="59" value="0" oninput="tmClampInput(this,0,59)">'+
            '<span>s</span>'+
          '</div>'+
        '</div>'+
        '<div class="tm-sgroup">'+
          '<div class="tm-slabel">Exercises / Round</div>'+
          '<input class="tm-input wide" type="number" id="tmExercises" min="1" max="20" value="4" oninput="tmClampInput(this,1,20)">'+
        '</div>'+
      '</div>'+
      '<div class="tm-srow">'+
        '<div class="tm-sgroup">'+
          '<div class="tm-slabel">Rounds</div>'+
          '<input class="tm-input wide" type="number" id="tmRounds" min="1" max="99" value="3" oninput="tmClampInput(this,1,99)">'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'+
'</div>';
  document.body.appendChild(wrap);
  getDom();
  tmRenderIdle();

  // Add ⏱ TIMER button to header-stats
  var stats=document.querySelector('.header-stats');
  if(stats){
    var btn=document.createElement('button');
    btn.className='timer-open-btn';
    btn.innerHTML='⏱&nbsp;TIMER';
    btn.onclick=function(){openTimerModal([]);};
    stats.insertAdjacentElement('afterbegin',btn);
  }

  window._timerLoaded=true;
})();

})();
