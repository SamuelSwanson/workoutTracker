// ================================================================
//  BJJ / JIU-JITSU ATHLETE — buildDays() + weekProgNote()
//  Standard gym equipment only. 1–2 hrs/day.
//  Requires engine.js loaded first.
// ================================================================

function buildDays(w){
  const blk=getBlock(w), bw=blockWeek(w), p2=isPhase2(w), dl=DELOAD_WEEKS.has(w);
  const isB=['B','C','D'].includes(blk), isC=['C','D'].includes(blk), isD=blk==='D';

  return {
    monday:{
      name:'MONDAY', tag:'Strength + Conditioning', tagClass:'tag-lower',
      segments:{
        cardio:{label:'CARDIO / CONDITIONING',color:'cardio',items:[
          {name:'Rowing Machine — Steady Power Pull', sets:CT(20,bw,blk,p2,dl)},
          {name:'Jump Rope — Mixed Tempo', sets:'3 min'},
        ]},
        yoga:{label:'MOBILITY / STRETCH',color:'yoga',items:[
          {name:'Hip Flexor & Groin Flow — Mat', sets:'8 min'},
          {name:'Butterfly Stretch + Pigeon Pose', sets:'6 min'},
          {name:'Ankle Mobility Work', sets:'3 min'},
        ]},
        dg:{label:'BJJ — DRILLING + LIVE ROLLING',color:'dg',items:[
          {name:'Hip Escapes (Shrimping) — Mat', sets:'4×10 per side'},
          {name:'Bridge + Roll Drill — Mat', sets:P(3,8,'explosive',bw,blk,p2,dl)},
          {name:'Guard Retention Pummeling — Wall Simulation', sets:'3×1 min continuous'},
          {name:'Live Rolling / Grappling — with partner if available', sets:isD?'3–4 rounds × 5 min':dl?'2 rounds easy, technical only':isC?'3 rounds × 5 min':'2–3 rounds × 5 min'},
        ]},
        lift:{label:'LIFT — Lower Body Strength',color:'lift',items:[
          {name:'Romanian Deadlift — Barbell', sets:P(4,5,'',bw,blk,p2,dl)},
          {name:'Back Squat or Goblet Squat — Barbell / Dumbbell', sets:P(3,8,'',bw,blk,p2,dl)},
          {name:'Walking Lunges — Dumbbell', sets:P(3,10,'per leg',bw,blk,p2,dl)},
          {name:'Hip Thrust — Barbell + Bench', sets:P(3,10,'',bw,blk,p2,dl)},
          {name:'Nordic Curl Negative — Feet Anchored on Bench', sets:P(3,5,'eccentric focus',bw,blk,p2,dl)},
          {name:'Lateral Band Walk', sets:'3×20 steps each direction'},
          {name:'Ab Wheel Rollout', sets:P(3,10,'',bw,blk,p2,dl)},
          ...(isB?[{name:'Broad Jump — Explosive Intent', sets:P(3,5,'',bw,blk,p2,dl)}]:[]),
          ...(isC?[{name:'Single-Leg Deadlift — Slow Eccentric', sets:P(3,6,'per leg',bw,blk,p2,dl)}]:[]),
        ]}
      }
    },
    tuesday:{
      name:'TUESDAY', tag:'Upper Body + Grip', tagClass:'tag-upper',
      segments:{
        cardio:{label:'CARDIO / CONDITIONING',color:'cardio',items:[
          {name:'Battle Ropes — Clinch Simulation Waves', sets:CT(20,bw,blk,p2,dl)},
          {name:'Heavy Bag — Pummeling Combos + Footwork', sets:'3 rounds 2 min'},
        ]},
        yoga:{label:'MOBILITY / STRETCH',color:'yoga',items:[
          {name:'Shoulder Capsule + Rotator Cuff Stretch', sets:'5 min'},
          {name:'Wrist + Forearm Extensor Opener', sets:'4 min'},
          {name:'Neck Mobility — Circles + Side Tilt', sets:'3 min'},
        ]},
        dg:{label:'BJJ — GRIP & CLINCH DRILLS',color:'dg',items:[
          {name:'Dead Hang Grip Sets — Pull-up Bar', sets:`3×${20+bw*10}s hold`},
          {name:'Towel Pull-up Hold — Collar Grip Simulation', sets:P(3,5,'',bw,blk,p2,dl)},
          {name:'Resistance Band Pummeling — Underhook Simulation', sets:'3×1 min continuous'},
        ]},
        lift:{label:'LIFT — Pull + Push + Grip',color:'lift',items:[
          {name:'Weighted Pull-ups — Pull-up Bar + Belt', sets:isC?P(4,4,'add weight',bw,blk,p2,dl):P(4,5,'',bw,blk,p2,dl)},
          {name:'Barbell Rows — Overhand Grip', sets:P(3,8,'',bw,blk,p2,dl)},
          {name:'Bench Press — Barbell', sets:P(3,8,'',bw,blk,p2,dl)},
          {name:'Dips — Parallel Bars or Bench', sets:P(3,8,'',bw,blk,p2,dl)},
          {name:'Hammer Curl — Dumbbell', sets:P(3,12,'',bw,blk,p2,dl)},
          {name:'Forearm Roller — Loaded Dumbbell or Bar', sets:'4× full up + down'},
          {name:'Ab Wheel Rollout', sets:P(3,10,'',bw,blk,p2,dl)},
        ]}
      }
    },
    wednesday:{
      name:'WEDNESDAY', tag:'Recovery + Flexibility', tagClass:'tag-recovery',
      segments:{
        cardio:{label:'CARDIO',color:'cardio',items:[
          {name:'Stationary Bike or Walk — Easy Recovery', sets:dl?'20 min easy':CT(25,bw,blk,p2,dl)},
        ]},
        yoga:{label:'YOGA / FLEXIBILITY',color:'yoga',items:[
          {name:'Full Body Yoga Flow — Mat', sets:'20 min'},
          {name:'Deep Hip Openers — Pigeon + Lizard Pose', sets:'8 min'},
          {name:'Spinal Twist + Back Bridge Stretch', sets:'5 min'},
          {name:'Ankle Mobility Circles', sets:'2×15 per foot'},
        ]},
        dg:{label:'BJJ — TECHNIQUE FLOW + LIGHT ROLLING',color:'dg',items:[
          {name:'Guard Position Isometric Hold — 90° Hip Flex', sets:'3×45s each side'},
          {name:'Hip Escape Flow — Slow Controlled Reps', sets:'4×10 per side'},
          {name:'Light Rolling — slow, positional only, no strength', sets:dl?'1–2 rounds easy':'2 rounds × 5 min, flow not fight'},
          {name:'Mental Visualization — Guard Passing + Sweeps (if no roll)', sets:'10 min'},
        ]},
        lift:{label:'LIGHT LIFT — Recovery',color:'lift',items:[
          {name:'Goblet Squat — Light Dumbbell', sets:dl?'2×12 light':'3×12'},
          {name:'Push-Ups', sets:dl?'2×10':'3×15'},
          {name:'Back Extensions — Adjustable Bench', sets:dl?'2×12':'3×15'},
          {name:'Band Pull-Aparts', sets:'3×20'},
          {name:'Kettlebell Swings', sets:dl?'2×15 light':'3×15'},
          {name:'Dead Bug Core Hold', sets:'3×30s'},
        ]}
      }
    },
    thursday:{
      name:'THURSDAY', tag:'Explosive + Mat Conditioning', tagClass:'tag-explosive',
      segments:{
        cardio:{label:'CARDIO / AGILITY',color:'cardio',items:[
          {name:'Sprawl Simulation — Drop to Ground + Pop Up Fast', sets:'4×8 reps'},
          {name:'Level Change Drills — Fast Squat-to-Stand', sets:'4×10'},
          {name:'Cone Sprints — 5-10-5 Shuttle', sets:'6 rounds'},
        ]},
        yoga:{label:'MOBILITY / STRETCH',color:'yoga',items:[
          {name:'Dynamic Hip Circles + Leg Swings', sets:'5 min'},
          {name:'Glute & Psoas Release — Mat', sets:'5 min'},
          {name:'Ankle + Calf Mobility Work', sets:'3 min'},
        ]},
        dg:{label:'BJJ — EXPLOSIVE DRILLS + LIVE GRAPPLING',color:'dg',items:[
          {name:'Penetration Step Drill — Wrestling Shot Simulation', sets:isD?'80% full speed':isC?'65% speed':'50% controlled speed'},
          {name:'Double-Leg Entry with Resistance Band', sets:P(3,8,'per side',bw,blk,p2,dl)},
          {name:'Grip-Break + Entry Combo — Band Resistance', sets:P(3,10,'per side',bw,blk,p2,dl)},
          {name:'Live Grappling / Rolling — primary mat day', sets:isD?'4–5 rounds × 5 min':dl?'2 rounds easy, technical':isC?'3–4 rounds × 5 min':'3 rounds × 5 min'},
        ]},
        lift:{label:'LIFT — Power & Explosiveness',color:'lift',items:[
          {name:'Box Jumps — '+(isC?'Max Height':isB?'High Box':'Mid Box'), sets:P(4,3,'max intent',bw,blk,p2,dl)},
          {name:'Conventional Deadlift — Barbell', sets:isC?P(4,2,'heavy PR',bw,blk,p2,dl):P(4,3,'',bw,blk,p2,dl)},
          {name:'Landmine Row — Explosive Pull', sets:P(4,5,'per side',bw,blk,p2,dl)},
          {name:'Slam Ball — Overhead Slam', sets:P(3,8,'',bw,blk,p2,dl)},
          {name:'Battle Rope — Alternating Waves', sets:`5×30s${bw>=2?' + 5s burst finish':''}`},
          {name:'Broad Jump Series', sets:P(3,3,'',bw,blk,p2,dl)},
          {name:'Ab Wheel Rollout', sets:P(3,10,'',bw,blk,p2,dl)},
          ...(isD?[{name:'Reactive Med Ball Chest Pass — Wall', sets:P(3,8,'',bw,blk,p2,dl)}]:[]),
          ...(isB?[{name:'Jump Squat — Bodyweight or Light Load', sets:P(3,5,'max pop',bw,blk,p2,dl)}]:[]),
        ]}
      }
    },
    friday:{
      name:'FRIDAY', tag:'Pull + Core + Grappling', tagClass:'tag-pull',
      segments:{
        cardio:{label:'CARDIO',color:'cardio',items:[
          {name:'Rowing Machine — Moderate Pace', sets:CT(25,bw,blk,p2,dl)},
          {name:'Jump Rope — Steady State', sets:'5 min'},
        ]},
        yoga:{label:'MOBILITY / STRETCH',color:'yoga',items:[
          {name:'Thoracic Rotation + Cat-Cow Stretch', sets:'5 min'},
          {name:'Lats + Biceps Dead Hang — Pull-up Bar', sets:'3×30s'},
          {name:'Forearm + Wrist Rolling Stretch', sets:'3 min'},
          {name:'Hip 90/90 Stretch — Guard Position Simulation', sets:'3×30s per side'},
        ]},
        dg:{label:'BJJ — GUARD & CORE WORK',color:'dg',items:[
          {name:'Hanging Leg Raises — Guard Position Simulation', sets:P(3,10,'',bw,blk,p2,dl)},
          {name:'Bridging Series — Hip Bridge to Full Bridge', sets:P(3,8,'explosive',bw,blk,p2,dl)},
          {name:'Isometric Knees-Up Hang — Pull-up Bar', sets:`3×${20+bw*10}s`},
        ]},
        lift:{label:'LIFT — Pull + Core Dominant',color:'lift',items:[
          {name:'Weighted Pull-ups — Pull-up Bar + Belt', sets:isC?P(4,4,'add weight',bw,blk,p2,dl):P(4,5,'',bw,blk,p2,dl)},
          {name:'Barbell Rows — Supinated Grip', sets:P(3,8,'',bw,blk,p2,dl)},
          {name:'Cable or Band Face Pulls', sets:P(3,15,'',bw,blk,p2,dl)},
          {name:'Dumbbell Rows — Single Arm', sets:P(3,10,'per side',bw,blk,p2,dl)},
          {name:'Dead Hang — Max Hold', sets:'3× max, log seconds'},
          {name:'Farmer Carry — Heavy Dumbbells', sets:dl?'3 trips 40ft light':'4 trips 40ft'},
          {name:'Pallof Press — Cable or Band', sets:P(3,12,'per side',bw,blk,p2,dl)},
          {name:'Ab Wheel Rollout', sets:P(3,10,'',bw,blk,p2,dl)},
        ]}
      }
    },
    saturday:{
      name:'SATURDAY', tag:'Rolling Circuit', tagClass:'tag-circuit',
      segments:{
        cardio:{label:'CONDITIONING',color:'cardio',items:[
          {name:'Jump Rope — 1 min on / 30s off Intervals', sets:'5 rounds'},
          {name:'Heavy Bag — 3 min rounds, pummeling focus', sets:'3 rounds'},
          ...(dl?[]:[{name:'Sprawl Sprint Combo — Sprawl + Immediate Sprint', sets:'4×8'}]),
        ]},
        yoga:{label:'STRETCH',color:'yoga',items:[
          {name:'Full Body Recovery Stretch — Mat', sets:'12 min'},
          {name:'Deep Hip + Spine Opener', sets:'5 min'},
        ]},
        dg:{label:'BJJ — POSITIONAL CIRCUIT',color:'dg',items:[
          {name:'Rolling Simulation — 5 min round, full effort', sets:isD?'4 rounds high intensity':'3 rounds'},
          {name:'Guard Retention Circuit — Shrimp + Frame + Kick', sets:'3×10 combinations'},
          {name:'Takedown Entry Sim. — Shot + Level Change', sets:'10 full reps each side'},
        ]},
        lift:{label:dl?'CIRCUIT — 2 Rounds (light)':'CIRCUIT — 3–4 Rounds',color:'lift',items:[
          {name:'Kettlebell Swings', sets:dl?'×12 light':'×15'},
          {name:'Push-Ups', sets:dl?'×10':'×15'},
          {name:'Pull-Ups — Bodyweight', sets:'×max'},
          {name:'Slam Ball Slams', sets:'×10'},
          {name:'Ab Wheel', sets:'×10'},
          {name:'Hip Escapes (Shrimping) — Mat', sets:'×10 per side'},
          {name:'Bridge to Sit-Out Flow', sets:'×8 per side'},
          ...(dl?[]:[{name:'Broad Jump', sets:'×5'}]),
          ...(dl?[]:[{name:'Resistance Band Monster Walks', sets:'×20 fwd + back'}]),
          ...(dl?[]:[{name:'Dumbbell Lateral Raise', sets:'×15'}]),
        ]}
      }
    },
    sunday:{
      name:'SUNDAY', tag:'Rest', tagClass:'tag-rest', isRest:true,
      segments:{
        yoga:{label:'ACTIVE RECOVERY — Optional',color:'yoga',items:[
          {name:'Walk or light movement — outdoors', sets:'30+ min'},
          {name:'Foam roll + full body stretch — Mat', sets:'15 min'},
          {name:'Guard position isometric hold — casual', sets:'5 min optional'},
          {name:'Mental visualization — game plan your positions', sets:'10 min'},
        ]}
      }
    }
  };
}

function weekProgNote(w){
  const bw=blockWeek(w), blk=getBlock(w), p2=isPhase2(w), dl=DELOAD_WEEKS.has(w);
  if(dl) return{title:'🟡 DELOAD WEEK — Mandatory Recovery',body:'Cut all lifting sets by 2 and use ~60% weight. No PRs. Drilling stays light and technical — focus on form not intensity. Rolling simulation is casual. Recovery is when you adapt and get stronger.'};
  const bNotes={
    A:'BLOCK A FOCUS: Build your base. Learn the movement patterns under load, establish starting weights. Drilling focus is form and position over speed.',
    B:'BLOCK B FOCUS: Explosive transitions. Fast intent on every lift. BJJ drills shift to reactive — entry speed, weight commitment, and timing.',
    C:'BLOCK C FOCUS: Heavy strength work. Lower reps, more load, PR attempts. Build the raw grappling strength that wins scrambles and positions.',
    D:'BLOCK D FOCUS: Athletic integration. Lower volume, high intent. Rolling simulation at 70–80% effort. Everything converts to mat power.'
  };
  const wNotes=['','WEEK 1 OF BLOCK — Establish baseline. Learn at these loads. Record every weight.','WEEK 2 OF BLOCK — Add 1 set to all main lifts. Push past comfort slightly.','WEEK 3 OF BLOCK — Max volume week. Add 2 sets, go after PRs. Peak output.',''];
  return{title:`📈 ${p2?'PHASE 2 — ':''}BLOCK ${blk} — WEEK ${bw}/4`,body:`${wNotes[bw]||''} ${bNotes[blk]}`};
}
