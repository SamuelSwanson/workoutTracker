// ================================================================
//  SNOW / SKATE ATHLETE — buildDays() + weekProgNote()
//  Standard gym equipment only. 1–2 hrs/day.
//  Requires engine.js loaded first.
// ================================================================

function buildDays(w){
  const blk=getBlock(w), bw=blockWeek(w), p2=isPhase2(w), dl=DELOAD_WEEKS.has(w);
  const isB=['B','C','D'].includes(blk), isC=['C','D'].includes(blk), isD=blk==='D';

  return {
    monday:{
      name:'MONDAY', tag:'Lower Body + Hip Drive', tagClass:'tag-lower',
      segments:{
        cardio:{label:'CARDIO',color:'cardio',items:[
          {name:'Snowboard / Skate Session — if conditions allow', sets:dl?'20 min easy':'20–45 min — skip bike if you ride'},
          {name:'Stationary Bike — Zone 2 (skip if you rode)', sets:CT(30,bw,blk,p2,dl)},
          {name:'Jump Rope — Warm-Up Singles', sets:'3 min'},
        ]},
        yoga:{label:'MOBILITY / STRETCH',color:'yoga',items:[
          {name:'Hip Flexor & Groin Flow — Mat', sets:'8 min'},
          {name:'Thoracic Rotation & Windmill Stretch', sets:'5 min'},
          {name:'Single-Leg Balance Hold — Eyes Open', sets:bw>=2?'6 min':'5 min'},
        ]},
        dg:{label:'SNOW / SKATE — EDGE & STANCE WORK',color:'dg',items:[
          {name:'Lateral Bounds over Line — Edge-to-Edge Power', sets:P(3,8,'per side',bw,blk,p2,dl)},
          {name:'Single-Leg Squat — Board Stance Simulation', sets:P(3,6,'per leg',bw,blk,p2,dl)},
          {name:'Resistance Band Lateral Shuffle — 10ft width', sets:'4×30s'},
        ]},
        lift:{label:'LIFT — Lower Body',color:'lift',items:[
          {name:'Back Squat — Barbell + Rack', sets:P(4,5,'add weight ea. set',bw,blk,p2,dl)},
          {name:'Romanian Deadlift — Barbell', sets:P(3,8,'',bw,blk,p2,dl)},
          {name:'Bulgarian Split Squat — Dumbbell', sets:P(3,8,'per leg',bw,blk,p2,dl)},
          {name:'Lateral Band Walks — Resistance Band', sets:'3×20 steps each direction'},
          {name:'Box Jump — Pop Simulation', sets:P(4,3,'max height intent',bw,blk,p2,dl)},
          {name:'Hip Thrust — Barbell + Bench', sets:P(3,10,'',bw,blk,p2,dl)},
          {name:'Ab Wheel Rollout', sets:P(3,10,'',bw,blk,p2,dl)},
          ...(isB?[{name:'Depth Drop to Squat Landing — Box', sets:P(3,5,'absorb landing',bw,blk,p2,dl)}]:[]),
          ...(isC?[{name:'Pistol Squat Negative — Slow Eccentric', sets:P(3,4,'per leg',bw,blk,p2,dl)}]:[]),
        ]}
      }
    },
    tuesday:{
      name:'TUESDAY', tag:'Upper Body + Rotation', tagClass:'tag-upper',
      segments:{
        cardio:{label:'CARDIO',color:'cardio',items:[
          {name:'Rowing Machine — Steady Power Pull', sets:CT(25,bw,blk,p2,dl)},
          {name:'Jump Rope — Power Intervals', sets:'3 rounds 1 min on/30s off'},
        ]},
        yoga:{label:'MOBILITY / STRETCH',color:'yoga',items:[
          {name:'Shoulder Capsule Stretch — Floor', sets:'5 min'},
          {name:'Wrist & Forearm Opener', sets:'4 min'},
          {name:'Lat + T-Spine Dead Hang — Pull-up Bar', sets:'3×30s'},
        ]},
        dg:{label:'SNOW / SKATE — ARM & ROTATION DRILLS',color:'dg',items:[
          {name:'Resistance Band Arm Swing — Frontside Turn Sim.', sets:P(3,12,'per side',bw,blk,p2,dl)},
          {name:'Dumbbell Woodchop — Rotational Power', sets:P(3,10,'per side',bw,blk,p2,dl)},
          {name:'Med Ball Rotational Slam — Against Wall', sets:P(3,8,'per side',bw,blk,p2,dl)},
        ]},
        lift:{label:'LIFT — Upper Push + Core',color:'lift',items:[
          {name:'Push Press — Barbell + Rack', sets:isB?P(5,3,'max bar speed',bw,blk,p2,dl):P(4,4,'',bw,blk,p2,dl)},
          {name:'Bench Press — Barbell + Adjustable Bench', sets:P(3,8,'',bw,blk,p2,dl)},
          {name:'Dumbbell Shoulder Press — Standing', sets:P(3,10,'',bw,blk,p2,dl)},
          {name:'Tricep Dips — Parallel Bars or Bench', sets:P(3,10,'',bw,blk,p2,dl)},
          {name:'Landmine Rotational Press — Explosive', sets:P(3,6,'per side',bw,blk,p2,dl)},
          {name:'Dumbbell Bicep Curl', sets:P(3,12,'',bw,blk,p2,dl)},
          {name:'Ab Wheel Rollout', sets:P(3,10,'',bw,blk,p2,dl)},
          {name:'Plank — Standard Hold', sets:`3×${30+bw*10}s`},
        ]}
      }
    },
    wednesday:{
      name:'WEDNESDAY', tag:'Recovery + Mobility', tagClass:'tag-recovery',
      segments:{
        cardio:{label:'CARDIO',color:'cardio',items:[
          {name:'Stationary Bike or Walk — Easy Recovery Pace', sets:dl?'20 min easy':CT(25,bw,blk,p2,dl)},
        ]},
        yoga:{label:'YOGA / MOBILITY',color:'yoga',items:[
          {name:'Full Body Yoga Flow — Mat', sets:'20 min'},
          {name:'Hip Opener Flow — Pigeon + Figure 4 Stretch', sets:'8 min'},
          {name:'Ankle Circles + Dorsiflexion Work', sets:'2×15 per foot'},
          {name:'Thoracic Extension over Foam Roller', sets:'5 min'},
        ]},
        dg:{label:'SNOW / SKATE — SESSION OR VISUALIZATION',color:'dg',items:[
          {name:'Snowboard / Skate Session — casual, low pressure', sets:dl?'15–20 min easy':'20–35 min — conditions permitting'},
          {name:'Mental Run-Through — Visualize Tricks + Lines (if no ride)', sets:'10 min'},
          {name:'Single-Leg Balance Hold — Eyes Closed', sets:'5 min casual'},
        ]},
        lift:{label:'LIGHT LIFT — Recovery',color:'lift',items:[
          {name:'Goblet Squat — Dumbbell', sets:dl?'2×12 light':'3×12'},
          {name:'Push-Ups — Bodyweight', sets:dl?'2×10':'3×15'},
          {name:'Back Extensions — Adjustable Bench', sets:dl?'2×12':'3×15'},
          {name:'Band Pull-Aparts', sets:'3×20'},
          {name:'Kettlebell Swings', sets:dl?'2×15 light':'3×15'},
          {name:'Dead Bug Core Hold — Mat', sets:'3×30s'},
        ]}
      }
    },
    thursday:{
      name:'THURSDAY', tag:'Explosive + Pop', tagClass:'tag-explosive',
      segments:{
        cardio:{label:'CARDIO / AGILITY',color:'cardio',items:[
          {name:'Ladder Drills — In/Out + Crossover Patterns', sets:CT(12,bw,blk,p2,dl)+' total'},
          {name:'Lateral Hurdle Hops — Mini Hurdles', sets:'4×8'},
          {name:'180° Jump to Stick Landing — 3 sets', sets:'4×5'},
        ]},
        yoga:{label:'MOBILITY / STRETCH',color:'yoga',items:[
          {name:'Dynamic Hip Circles + Leg Swings', sets:'5 min'},
          {name:'Glute & Psoas Release — Mat', sets:'5 min'},
          {name:'Calf + Achilles Stretch — Wall', sets:'3 min'},
        ]},
        dg:{label:'SNOW / SKATE — SESSION + TRICK TRAINING',color:'dg',items:[
          {name:'Snowboard / Skate Session — primary sport day', sets:isD?'30–45 min full power':isC?'25–40 min power focus':dl?'20 min easy ride':'20–35 min progressive'},
          {name:'Box Jump to Deep Squat Landing — Absorption Focus (if no session)', sets:isD?'Max height, full absorption':isC?'60% deep squat landing':'Controlled full landings'},
          {name:'180° Jump over Hurdle — Rotation Entry', sets:P(3,5,'per direction',bw,blk,p2,dl)},
          {name:'Broad Jump to Lateral Bound Combo', sets:P(3,4,'each combo',bw,blk,p2,dl)},
        ]},
        lift:{label:'LIFT — Power & Plyometrics',color:'lift',items:[
          {name:'Box Jumps — '+(isC?'Max Height':isB?'High Box':'Mid Box'), sets:P(4,3,'max intent',bw,blk,p2,dl)},
          {name:'Conventional Deadlift — Barbell', sets:isC?P(4,2,'heavy PR',bw,blk,p2,dl):P(4,3,'',bw,blk,p2,dl)},
          {name:'Power Clean — Light to Moderate', sets:P(4,3,'bar speed focus',bw,blk,p2,dl)},
          {name:'Slam Ball — Overhead Rotational Throw', sets:P(3,8,'per side',bw,blk,p2,dl)},
          {name:'Battle Rope — Alternating Waves', sets:`5×30s${bw>=2?' + 5s sprint finish':''}`},
          {name:'Depth Drop to Broad Jump — Box', sets:P(3,3,'',bw,blk,p2,dl)},
          {name:'Ab Wheel Rollout', sets:P(3,10,'',bw,blk,p2,dl)},
          ...(isD?[{name:'Single-Leg Box Jump — Max Intent', sets:P(3,3,'per leg',bw,blk,p2,dl)}]:[]),
          ...(isB?[{name:'Lateral Bounding — 3-Step Approach', sets:P(3,5,'per side',bw,blk,p2,dl)}]:[]),
        ]}
      }
    },
    friday:{
      name:'FRIDAY', tag:'Pull + Stability', tagClass:'tag-pull',
      segments:{
        cardio:{label:'CARDIO',color:'cardio',items:[
          {name:'Rowing Machine — Steady State', sets:CT(25,bw,blk,p2,dl)},
          {name:'Jump Rope — Steady State', sets:'5 min'},
        ]},
        yoga:{label:'MOBILITY / STRETCH',color:'yoga',items:[
          {name:'Thoracic Opener over Foam Roller', sets:'5 min'},
          {name:'Lats + Biceps Dead Hang — Pull-up Bar', sets:'3×30s'},
          {name:'Wrist & Forearm Figure-8s', sets:'3 min'},
          {name:'Single-Leg Balance Hold — Platform', sets:'3×30s per leg'},
        ]},
        dg:{label:'SNOW / SKATE — EDGE PRESSURE & STABILITY',color:'dg',items:[
          {name:'Single-Leg Lateral Step-Up — Box', sets:P(3,8,'per leg',bw,blk,p2,dl)},
          {name:'Farmer Carry — Heavy Dumbbells', sets:dl?'3 trips 40ft light':'4 trips 40ft'},
          {name:'Single-Leg Hip Hinge — Slow Eccentric', sets:P(3,8,'per leg',bw,blk,p2,dl)},
        ]},
        lift:{label:'LIFT — Pull + Core',color:'lift',items:[
          {name:'Weighted Pull-ups — Pull-up Bar + Belt', sets:isC?P(4,4,'add weight ea. set',bw,blk,p2,dl):P(4,5,'',bw,blk,p2,dl)},
          {name:'Barbell Rows — Bent Over', sets:P(3,8,'',bw,blk,p2,dl)},
          {name:'Cable or Band Face Pulls', sets:P(3,15,'',bw,blk,p2,dl)},
          {name:'Dumbbell Single-Arm Row', sets:P(3,10,'per side',bw,blk,p2,dl)},
          {name:'Dead Hang — Pull-up Bar', sets:'3× max hold, log seconds'},
          {name:'Pallof Press — Cable or Band', sets:P(3,12,'per side',bw,blk,p2,dl)},
          {name:'Ab Wheel Rollout', sets:P(3,10,'',bw,blk,p2,dl)},
        ]}
      }
    },
    saturday:{
      name:'SATURDAY', tag:'Circuit + Park Day', tagClass:'tag-circuit',
      segments:{
        cardio:{label:'CONDITIONING',color:'cardio',items:[
          {name:'Jump Rope — Mixed Singles + Double Unders', sets:'5 min'},
          {name:'Jump Rope — Power Interval Sets', sets:'5 min'},
          ...(dl?[]:[{name:'Battle Rope — Tabata 20s on / 10s off', sets:'4 rounds'}]),
        ]},
        yoga:{label:'STRETCH',color:'yoga',items:[
          {name:'Full Body Recovery Stretch — Mat', sets:'12 min'},
          {name:'Hip + Ankle Focus — Foam Roller', sets:'5 min'},
        ]},
        dg:{label:'SNOW / SKATE — OPEN SESSION',color:'dg',items:[
          {name:'Skatepark / Snowpark Session or Dry-Land Practice', sets:isD?'Full-send session':'Progressive practice'},
          {name:'Pop + Trick Body Drill — Max Intent Reps', sets:'10 full-intent reps'},
          {name:'Landing Mechanics — Stick Every Landing', sets:'15 controlled landings'},
        ]},
        lift:{label:dl?'CIRCUIT — 2 Rounds (light)':'CIRCUIT — 3–4 Rounds',color:'lift',items:[
          {name:'Kettlebell Swings', sets:dl?'×12 light':'×15'},
          {name:'Push-Ups — Explosive', sets:dl?'×10':'×15'},
          {name:'Dumbbell Bicep Curl', sets:'×12'},
          {name:'Box Jump', sets:dl?'×3 controlled':'×5'},
          {name:'Slam Ball Slams', sets:'×10'},
          {name:'Ab Wheel', sets:'×10'},
          {name:'Lateral Bounds', sets:'×8 per side'},
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
          {name:'Walk or easy skate session — outdoors', sets:'30+ min'},
          {name:'Foam roll + full body stretch — Mat', sets:'15 min'},
          {name:'Single-leg balance — casual, no pressure', sets:'5 min optional'},
          {name:'Visualize lines + tricks — mental rehearsal', sets:'10 min'},
        ]}
      }
    }
  };
}

function weekProgNote(w){
  const bw=blockWeek(w), blk=getBlock(w), p2=isPhase2(w), dl=DELOAD_WEEKS.has(w);
  if(dl) return{title:'🟡 DELOAD WEEK — Mandatory Recovery',body:'Cut all lifting sets by 2 and use ~60% weight. No PRs. Keep balance drills casual. Your nervous system needs this — skipping deload kills progress and increases injury risk on the board.'};
  const bNotes={
    A:'BLOCK A FOCUS: Build your foundation. Learn movement patterns under load, establish baseline weights. Record everything. On-board work focuses on body position and edge awareness.',
    B:'BLOCK B FOCUS: Speed and pop. Fast intent on every lift. Board sport emphasis shifts to reactive feel — edge transitions and body response over thought.',
    C:'BLOCK C FOCUS: Load up. Lower reps, heavier weight, PR attempts. Translate raw leg and back strength directly into board power.',
    D:'BLOCK D FOCUS: Athletic integration. Lower volume, maximum intent. Sessions at 70–80% full speed. Everything becomes reactive and automatic.'
  };
  const wNotes=['','WEEK 1 OF BLOCK — Establish baseline. Focus on mechanics and form. Log every weight.','WEEK 2 OF BLOCK — Add 1 set to main lifts. Push slightly past comfort.','WEEK 3 OF BLOCK — Max volume week. Add 2 sets, chase PRs. Peak output.',''];
  return{title:`📈 ${p2?'PHASE 2 — ':''}BLOCK ${blk} — WEEK ${bw}/4`,body:`${wNotes[bw]||''} ${bNotes[blk]}`};
}
