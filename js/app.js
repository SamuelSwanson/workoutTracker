// ================================================================
//  APP — shared render engine
//  Requires: engine.js loaded first, buildDays() + weekProgNote()
//  defined as globals by the per-athlete days file.
// ================================================================

// ── CONFIG (set by init()) ──────────────────────────────────────
let _cfg = {};

// ── BLOCK LABELS ───────────────────────────────────────────────
function getBlockLabel(w){
  const totalWeeks=_cfg.totalWeeks||32;
  const isDL=totalWeeks===8?(DELOAD_WEEKS_8?.has(w)):DELOAD_WEEKS.has(w);
  let b,p2;
  if(totalWeeks===8){
    b=getBlock8(w);
    p2=isPhase2_8(w);
  }else{
    b=getBlock(w);
    p2=isPhase2(w);
  }
  const map={A:{label:'BLOCK A',sub:'Control & Foundation'},B:{label:'BLOCK B',sub:'Strength & Power'},C:{label:'BLOCK C',sub:'Strength Heavy'},D:{label:'BLOCK D',sub:'Integration & Peak'}};
  const clsMap={A:'',B:'b',C:'c',D:'d'};
  return{label:(p2?'P2 ':'')+(isDL?'DELOAD':map[b].label),sub:isDL?'Recovery — 60% volume, no PR attempts':map[b].sub+(p2?' — Phase 2 Elevated':''),cls:isDL?'deload':clsMap[b],isDeload:isDL};
}

// ── STATE ──────────────────────────────────────────────────────
let currentPhase=0, currentWeek=1;
let _exInfo={};

function getState(){ try{return JSON.parse(localStorage.getItem(_cfg.storageKey)||'{}')}catch(e){return{}} }
function saveState(s){ localStorage.setItem(_cfg.storageKey,JSON.stringify(s)) }
function saveWeekState(){ localStorage.setItem(_cfg.storageKey+'_week',JSON.stringify({phase:currentPhase,week:currentWeek})) }
function restoreWeekState(){ try{const w=JSON.parse(localStorage.getItem(_cfg.storageKey+'_week')||'{}');if(w.phase!==undefined)currentPhase=w.phase;if(w.week!==undefined)currentWeek=w.week;}catch(e){} }

// ── RENDER GRID ────────────────────────────────────────────────
function renderGrid(){
  const state=getState(), grid=document.getElementById('weekGrid');
  grid.innerHTML='';
  const totalWeeks=_cfg.totalWeeks||32;
  const weeksPerPhase=totalWeeks/2;
  const start=currentPhase===0?1:weeksPerPhase+1, end=currentPhase===0?weeksPerPhase:totalWeeks;
  for(let w=start;w<=end;w++){
    const wData=state[`week_${w}`]||{};
    const daysComplete=Object.keys(wData).filter(k=>k.startsWith('day_done_')).length;
    const completed=wData.week_done===true, deload=DELOAD_WEEKS.has(w)||(totalWeeks===8?DELOAD_WEEKS_8?.has(w):false);
    const btn=document.createElement('div');
    btn.className='week-btn'+(currentWeek===w?' active':'')+(completed?' completed':'')+(deload?' deload':'');
    const blockLabel=totalWeeks===8?(deload?'DL':`${getBlock8(w)}${blockWeek8(w)}`):(deload?'DL':`${getBlock(w)}${blockWeek(w)}`);
    btn.innerHTML=`<div class="wnum">W${w}</div><div class="wlabel">${blockLabel}</div><div class="prog-bar" style="width:${Math.round((daysComplete/6)*100)}%"></div><div class="check">✓</div>`;
    btn.onclick=()=>{currentWeek=w;saveWeekState();renderGrid();renderWeek();};
    grid.appendChild(btn);
  }
  let wDone=0,dDone=0;
  const s=getState();
  for(let i=1;i<=totalWeeks;i++){const wd=s[`week_${i}`]||{};if(wd.week_done)wDone++;Object.keys(wd).filter(k=>k.startsWith('day_done_')).forEach(()=>dDone++);}
  document.getElementById('weeksDone').textContent=wDone;
  document.getElementById('daysDone').textContent=dDone;
}

// ── RENDER WEEK ────────────────────────────────────────────────
function renderWeek(){
  _exInfo={};
  const w=currentWeek, bl=getBlockLabel(w), days=buildDays(w);
  const state=getState(), wData=state[`week_${w}`]||{}, pn=weekProgNote(w);
  const totalWorkoutDays=Object.keys(days).filter(k=>!days[k].isRest).length;
  const daysLogged=Object.keys(wData).filter(k=>k.startsWith('day_done_')&&wData[k]===true).length;
  let weeklyQuality='Low';
  if(daysLogged>=5) weeklyQuality='Perfect';
  else if(daysLogged>=3) weeklyQuality='Good';
  const progressPercent = Math.round(daysLogged/totalWorkoutDays*100);
  const progressColor = weeklyQuality==='Perfect' ? 'var(--accent2)' : weeklyQuality==='Good' ? 'var(--accent)' : 'var(--yellow)';
  const content=document.getElementById('contentArea');
  content.innerHTML=`
    <div class="week-header">
      <div class="week-title">WEEK <span>${w}</span></div>
      <div class="week-meta"><div class="block-badge ${bl.cls}">${bl.label}</div><div class="week-focus">${bl.sub}</div></div>
    </div>
    <div class="quality-summary">Weekly Quality: <strong>${weeklyQuality}</strong> (${daysLogged}/${totalWorkoutDays} workouts complete)</div>
    <div class="weekly-progress-bar" aria-label="Weekly progress bar"><div class="weekly-progress-fill" style="width:${progressPercent}%;background:${progressColor}"></div></div>
    <div class="prog-banner ${bl.isDeload?'deload-banner':''}"><strong>${pn.title}</strong>${pn.body}</div>
    <div class="days-grid" id="daysGrid"></div>
    <div class="variants-grid" id="variantsGrid"></div>
    <div class="notes-area">
      <div class="notes-label">Week Notes / PRs / Weights / How You Felt</div>
      <textarea class="notes-input" id="weekNotes" placeholder="e.g. Squats: 185×5. Session felt strong. HR avg 142 on bike..."></textarea>
      <div class="io-row"><button class="io-btn" onclick="exportProgress()">↓ EXPORT PROGRESS</button><button class="io-btn imp" onclick="importProgress()">↑ IMPORT PROGRESS</button></div>
    </div>`;
  // Set week notes value safely (avoids template literal escaping issues)
  const notesEl=document.getElementById('weekNotes');
  notesEl.value=wData.notes||'';
  notesEl.addEventListener('input',()=>{const s=getState();if(!s[`week_${w}`])s[`week_${w}`]={};s[`week_${w}`].notes=notesEl.value;saveState(s);});

  const dg=document.getElementById('daysGrid');
  Object.keys(days).forEach(dayKey=>{
    const day=days[dayKey], dayDone=wData[`day_done_${dayKey}`]===true, exStates=wData[`ex_${dayKey}`]||{};
    // Collect all exercise names across every segment for the day timer
    let dayTimerBtn='';
    if(!day.isRest&&window._timerLoaded){
      if(!window._dayEx) window._dayEx={};
      const allNames=[];
      Object.keys(day.segments).forEach(sk=>{
        if(day.segments[sk].color==='lift')
          day.segments[sk].items.forEach(ex=>allNames.push(ex.name.split('—')[0].trim()));
      });
      window._dayEx[`${w}_${dayKey}`]=allNames;
      if(allNames.length>0)
        dayTimerBtn=`<button class="day-timer-btn" title="Start interval timer for this day" onclick="tmOpenDayTimer('${w}_${dayKey}')">⏱</button>`;
    }

    const card=document.createElement('div');
    card.className='day-card'+(day.isRest?' rest':'');
    let segHtml='';
    Object.keys(day.segments).forEach(segKey=>{
      const seg=day.segments[segKey];
      let timerBtn='';
      if(seg.color==='lift'&&window._timerLoaded){
        if(!window._liftEx) window._liftEx={};
        window._liftEx[`${w}_${dayKey}`]=seg.items.map(ex=>ex.name.split('—')[0].trim());
        timerBtn=`<button class="seg-timer-btn" onclick="tmOpenSegTimer('${w}_${dayKey}')">⏱ TIMER</button>`;
      }
      segHtml+=`<div class="segment"><div class="seg-label"><div class="seg-dot ${seg.color}"></div>${seg.label}${timerBtn}</div><ul class="exercise-list">`;
      seg.items.forEach((ex,i)=>{
        const exId=`${dayKey}_${segKey}_${i}`, done=exStates[exId]===true;
        const infoKey=`${w}_${dayKey}_${segKey}_${i}`; _exInfo[infoKey]={name:ex.name,sets:ex.sets};
        segHtml+=`<li><div class="ex-check ${done?'done':''}" onclick="toggleEx('${w}','${dayKey}','${segKey}',${i},this)">${done?'✓':''}</div><span class="ex-name">${ex.name}</span><span class="ex-sets">${ex.sets}</span><button class="ex-info-btn" onclick="openInfoModal('${infoKey}')">?</button></li>`;
      });
      segHtml+=`</ul></div>`;
    });
    card.innerHTML=`<div class="day-header"><div class="day-name">${day.name}</div><div class="day-header-right"><div class="day-tag ${day.tagClass}">${day.tag}</div>${dayTimerBtn}</div></div><div class="day-body">${segHtml}<div class="day-notes-wrap"><div class="day-notes-label">Day Notes</div><textarea class="day-notes-input" placeholder="How did it go? Weights, reps, how you felt..."></textarea></div><button class="day-complete-btn ${dayDone?'done':''}" onclick="toggleDay('${w}','${dayKey}',this)">${dayDone?'✓ DAY COMPLETE':'MARK DAY COMPLETE'}</button></div>`;
    dg.appendChild(card);
    const dn=card.querySelector('.day-notes-input');
    dn.value=wData[`day_notes_${dayKey}`]||'';
    dn.addEventListener('input',function(){const s=getState();if(!s[`week_${w}`])s[`week_${w}`]={};s[`week_${w}`][`day_notes_${dayKey}`]=this.value;saveState(s);});
  });

  // ─── RENDER VARIANT BOXES ───────────────────────────────────
  const vg=document.getElementById('variantsGrid');
  const absVariants=getAllAbsVariants(w);
  const agilityVariants=getAllAgilityVariants(w);

  // ABS VARIANTS BOX
  let absHtml='<div class="variant-box abs-box"><div class="variant-title">ABS WORKOUTS</div><div class="variant-content">';
  absVariants.forEach(v=>{
    absHtml+=`<div class="variant-item"><div class="variant-num">Day ${v.num}</div><div class="variant-label">${v.label}</div><ul class="variant-exercises">`;
    v.items.forEach(ex=>{
      absHtml+=`<li><span class="var-ex-name">${ex.name}</span><span class="var-ex-sets">${ex.sets}</span></li>`;
    });
    absHtml+='</ul></div>';
  });
  absHtml+='</div></div>';

  // AGILITY VARIANTS BOX
  let agHtml='<div class="variant-box agility-box"><div class="variant-title">AGILITY WORKOUTS</div><div class="variant-content">';
  agilityVariants.forEach(v=>{
    agHtml+=`<div class="variant-item"><div class="variant-num">Day ${v.num}</div><div class="variant-label">${v.label}</div><ul class="variant-exercises">`;
    v.items.forEach(ex=>{
      agHtml+=`<li><span class="var-ex-name">${ex.name}</span><span class="var-ex-sets">${ex.sets}</span></li>`;
    });
    agHtml+='</ul></div>';
  });
  agHtml+='</div></div>';

  vg.innerHTML=absHtml+agHtml;
}


// ── TOGGLE HANDLERS ────────────────────────────────────────────
function toggleEx(week,dayKey,segKey,idx,el){
  const s=getState(),wk=`week_${week}`;
  if(!s[wk])s[wk]={};if(!s[wk][`ex_${dayKey}`])s[wk][`ex_${dayKey}`]={};
  const exId=`${dayKey}_${segKey}_${idx}`, wasDone=s[wk][`ex_${dayKey}`][exId]===true;
  s[wk][`ex_${dayKey}`][exId]=!wasDone; saveState(s);
  el.classList.toggle('done',!wasDone); el.textContent=!wasDone?'✓':'';
}
function toggleDay(week,dayKey,btn){
  const s=getState(),wk=`week_${week}`;
  if(!s[wk])s[wk]={};
  const key=`day_done_${dayKey}`, wasDone=s[wk][key]===true;
  s[wk][key]=!wasDone; saveState(s);
  btn.classList.toggle('done',!wasDone);
  btn.textContent=!wasDone?'✓ DAY COMPLETE':'MARK DAY COMPLETE';
  showToast(!wasDone?'🏆 Day logged!':'Day unmarked');
  renderGrid(); renderWeek();
}
function setPhase(p){
  currentPhase=p; currentWeek=p===0?1:17;
  saveWeekState();
  document.querySelectorAll('.phase-tab').forEach((t,i)=>t.classList.toggle('active',i===p));
  renderGrid(); renderWeek();
}
function showToast(msg){
  const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2200);
}

// ── INFO MODAL ─────────────────────────────────────────────────
function openInfoModal(key){
  const ex=_exInfo[key]; if(!ex)return;
  document.getElementById('modalName').textContent=ex.name;
  document.getElementById('modalSets').textContent=ex.sets;
  document.getElementById('modalYT').href='https://www.youtube.com/results?search_query='+encodeURIComponent('how to '+ex.name.split('—')[0].trim()+' exercise');
  document.getElementById('infoModal').classList.add('open');
}
function closeModal(){ document.getElementById('infoModal').classList.remove('open'); }
document.addEventListener('keydown',e=>{ if(e.key==='Escape')closeModal(); });

// ── IMPORT / EXPORT ────────────────────────────────────────────
function exportProgress(){
  const data=localStorage.getItem(_cfg.storageKey)||'{}';
  const blob=new Blob([data],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=_cfg.exportFilename;
  a.click();
  showToast('Progress exported!');
}
function importProgress(){
  const input=document.createElement('input');
  input.type='file'; input.accept='.json,application/json';
  input.onchange=e=>{
    const file=e.target.files[0]; if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{
      try{
        const parsed=JSON.parse(ev.target.result);
        localStorage.setItem(_cfg.storageKey,JSON.stringify(parsed));
        renderGrid(); renderWeek(); showToast('Progress imported!');
      }catch(err){ showToast('Invalid file — import failed'); }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ── INIT ───────────────────────────────────────────────────────
function init(cfg){
  _cfg=cfg;
  restoreWeekState();
  renderGrid();
  renderWeek();
}
