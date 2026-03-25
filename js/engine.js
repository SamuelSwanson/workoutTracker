// ================================================================
//  ENGINE — pure computation, no DOM
//  Loaded first so per-athlete day files can use P(), CT(), etc.
// ================================================================

const DELOAD_WEEKS = new Set([4,8,12,16,20,24,28,32]);

function blockWeek(w){ const wk=w>16?w-16:w; return((wk-1)%4)+1; }
function getBlock(w){ const wk=w>16?w-16:w; if(wk<=4)return'A';if(wk<=8)return'B';if(wk<=12)return'C';return'D'; }
function isPhase2(w){ return w>16; }

// ── PROGRESSIVE OVERLOAD ENGINE ──
// bw=block week 1-4, blk=A/B/C/D, p2=bool, dl=deload
function P(baseSets, baseReps, note, bw, blk, p2, dl){
  if(dl) return `${Math.max(2,baseSets-2)}×${baseReps} @ 60%`;
  let s=baseSets, r=baseReps, tag='';
  if(bw===2) s=baseSets+1;
  if(bw===3) s=baseSets+2;
  if(blk==='B') tag=' — bar speed';
  if(blk==='C'){ s=Math.max(3,baseSets+1); r=Math.max(2,baseReps-2); tag=' — heavy'; }
  if(blk==='D') tag=' — game speed';
  if(p2&&bw===3) s=s+1;
  const noteStr=note?` (${note})`:'';
  return `${s}×${r}${tag}${noteStr}`;
}

function CT(base, bw, blk, p2, dl){
  if(dl) return `${base} min easy`;
  let t=base;
  if(bw>=2) t+=5;
  if(bw===3) t+=5;
  if(p2) t+=5;
  if(t>55) t=55;
  return `${t} min`;
}
