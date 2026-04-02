// ================================================================
//  BJJ / JIU-JITSU ATHLETE — buildDays() + weekProgNote()
//  Schedule: BJJ Mon/Tue/Wed · Strength Lift Thu/Fri · Rest Sat/Sun
//  Equipment: bench, squat rack, kettlebells, standard gym machines
//  (lat pulldown, rows, fly, triceps, leg curl, glute/ham),
//  dip bar, cardio bike, rower, treadmill
//  Lift focus: STRENGTH (3–5 rep ranges) — BJJ is the endurance
//  Requires engine.js loaded first.
// ================================================================

function buildDays(w){
  const blk=getBlock(w), bw=blockWeek(w), p2=isPhase2(w), dl=DELOAD_WEEKS.has(w);
  const isB=['B','C','D'].includes(blk), isC=['C','D'].includes(blk), isD=blk==='D';

  return {
    monday:{
      name:'MONDAY', tag:'BJJ Training', tagClass:'tag-lower',
      segments:{
        yoga:{label:'PRE-CLASS WARM-UP — ~15 min',color:'yoga',items:[
          {name:'Hip Flexor & Groin Flow — Mat', sets:'5 min'},
          {name:'Butterfly Stretch + Pigeon Pose', sets:'4 min'},
          {name:'Neck Mobility — Circles + Side Tilt', sets:'3 min'},
          {name:'Wrist + Forearm Opener', sets:'3 min'},
        ]},
        dg:{label:'BJJ — GROUND WORK + ROLLING',color:'dg',items:[
          {name:'Hip Escapes (Shrimping) — warm-up drill', sets:'3×10 per side, controlled'},
          {name:'Bridge + Roll Drill', sets:P(3,8,'explosive',bw,blk,p2,dl)},
          {name:'Guard Retention / Escapes — class drilling', sets:'~20 min technique'},
          {name:'Live Rolling', sets:dl?'1–2 rounds technical only':isD?'4–5 rounds × 5 min':isC?'3–4 rounds × 5 min':'3 rounds × 5 min'},
          {name:'Post-Roll: Hip + Shoulder Stretch — Mat', sets:'5 min cooldown'},
        ]},
      }
    },
    tuesday:{
      name:'TUESDAY', tag:'BJJ Training', tagClass:'tag-upper',
      segments:{
        yoga:{label:'PRE-CLASS WARM-UP — ~15 min',color:'yoga',items:[
          {name:'Shoulder Capsule + Rotator Cuff Circles', sets:'5 min'},
          {name:'Neck Mobility — Bridges + Side Tilt', sets:'4 min'},
          {name:'Thoracic Rotation + Arm Swings', sets:'3 min'},
          {name:'Hip Circles + Leg Swings', sets:'3 min'},
        ]},
        dg:{label:'BJJ — CLINCH / TAKEDOWN + ROLLING',color:'dg',items:[
          {name:'Penetration Step Drill — Shot Simulation', sets:isD?'80% speed':isC?'65% speed':'50% controlled'},
          {name:'Resistance Band Pummeling — Underhook Sim.', sets:'3×1 min continuous'},
          {name:'Takedown / Clinch Entries — class drilling', sets:'~20 min technique'},
          {name:'Live Rolling', sets:dl?'1–2 rounds technical only':isD?'4–5 rounds × 5 min':isC?'3–4 rounds × 5 min':'3 rounds × 5 min'},
          {name:'Post-Roll: Forearm + Wrist Shake-out', sets:'3 min cooldown'},
        ]},
      }
    },
    wednesday:{
      name:'WEDNESDAY', tag:'BJJ Training', tagClass:'tag-recovery',
      segments:{
        yoga:{label:'PRE-CLASS WARM-UP — ~15 min',color:'yoga',items:[
          {name:'Full Body Joint Circles — neck to ankles', sets:'5 min'},
          {name:'Deep Hip Openers — Lizard + Pigeon', sets:'5 min'},
          {name:'Spinal Twist + Back Bridge Stretch', sets:'5 min'},
        ]},
        dg:{label:'BJJ — POSITIONAL / FLOW + LIGHT ROLLING',color:'dg',items:[
          {name:'Guard Position Isometric Hold — 90° Hip Flex', sets:'3×45s each side'},
          {name:'Hip Escape Flow — slow and controlled', sets:'3×10 per side'},
          {name:'Positional Drilling — class focus', sets:'~20 min technique'},
          {name:'Rolling — '+(dl?'1 round easy, positional only':'flow rolling, technical, no ego')},
          {name:'Post-Roll: Full Body Stretch — Mat', sets:'5 min'},
        ]},
      }
    },
    thursday:{
      name:'THURSDAY', tag:'Lower Body Strength', tagClass:'tag-explosive',
      segments:{
        cardio:{label:'WARM-UP',color:'cardio',items:[
          {name:'Cardio Bike — easy spin', sets:'5 min to get blood moving'},
        ]},
        yoga:{label:'MOBILITY — Pre-Lift',color:'yoga',items:[
          {name:'Hip Flexor + Quad Stretch', sets:'3 min'},
          {name:'Ankle + Calf Mobility', sets:'2 min'},
        ]},
        lift:{label:'LIFT — Lower Body Strength (60 min)',color:'lift',items:[
          {name:'Back Squat — Squat Rack', sets:P(4,4,'add weight ea. set',bw,blk,p2,dl)},
          {name:'Barbell Hip Thrust — Bench + Barbell', sets:P(4,4,'',bw,blk,p2,dl)},
          {name:'Leg Press — Machine', sets:P(3,5,'',bw,blk,p2,dl)},
          {name:'Leg Curl Machine', sets:P(3,5,'3s eccentric',bw,blk,p2,dl)},
          {name:'Glute / Hamstring Machine', sets:P(3,5,'squeeze at top',bw,blk,p2,dl)},
          {name:'Kettlebell Swings — posterior chain finish', sets:dl?'2×10 light':'3×10 heavy'},
          {name:'Ab Wheel Rollout', sets:P(3,8,'',bw,blk,p2,dl)},
          ...(isC?[{name:'Single-Leg Hip Thrust — Dumbbell + Bench', sets:P(3,4,'per leg, slow eccentric',bw,blk,p2,dl)}]:[]),
        ]}
      }
    },
    friday:{
      name:'FRIDAY', tag:'Upper Body Strength', tagClass:'tag-pull',
      segments:{
        cardio:{label:'WARM-UP',color:'cardio',items:[
          {name:'Rowing Machine — easy pace', sets:'5 min to warm shoulders'},
        ]},
        yoga:{label:'MOBILITY — Pre-Lift',color:'yoga',items:[
          {name:'Shoulder Capsule + Sleeper Stretch', sets:'3 min'},
          {name:'Wrist + Forearm Opener', sets:'2 min'},
        ]},
        lift:{label:'LIFT — Upper Body Strength (60 min)',color:'lift',items:[
          {name:'Bench Press — Barbell', sets:P(4,4,'',bw,blk,p2,dl)},
          {name:'Dumbbell Arnold Press', sets:P(3,5,'',bw,blk,p2,dl)},
          {name:'Lat Pulldown — Machine', sets:P(4,5,'full stretch at top',bw,blk,p2,dl)},
          {name:'Machine Row or Barbell Row', sets:P(3,5,'',bw,blk,p2,dl)},
          {name:'Weighted Dips — Dip Bar + Belt', sets:P(3,5,'',bw,blk,p2,dl)},
          {name:'Chest Fly — Machine or Cable', sets:P(3,6,'controlled stretch',bw,blk,p2,dl)},
          {name:'Tricep Machine — Pushdown or Overhead', sets:P(3,6,'',bw,blk,p2,dl)},
          {name:'Face Pulls — Cable or Machine', sets:'3×12 — shoulder health, do not skip'},
          ...(isB?[{name:'Kettlebell Row — Single Arm, Explosive', sets:P(3,5,'per side',bw,blk,p2,dl)}]:[]),
          ...(isD?[{name:'Dead Hang — Pull-up Bar Max Hold', sets:'3× max, log seconds'}]:[]),
        ]}
      }
    },
    saturday:{
      name:'SATURDAY', tag:'Rest', tagClass:'tag-rest', isRest:true,
      segments:{
        yoga:{label:'OPTIONAL RECOVERY — keep it gentle',color:'yoga',items:[
          {name:'Light walk — outdoors', sets:'20–30 min if you want'},
          {name:'Foam roll + full body stretch — Mat', sets:'10 min optional'},
          {name:'Mental game — visualize your positions and submissions', sets:'10 min'},
        ]}
      }
    },
    sunday:{
      name:'SUNDAY', tag:'Rest', tagClass:'tag-rest', isRest:true,
      segments:{
        yoga:{label:'OPTIONAL RECOVERY',color:'yoga',items:[
          {name:'Light walk or easy movement', sets:'20–30 min if you want'},
          {name:'Hip + shoulder stretch — Mat', sets:'10 min optional'},
        ]}
      }
    }
  };
}

function weekProgNote(w){
  const bw=blockWeek(w), blk=getBlock(w), p2=isPhase2(w), dl=DELOAD_WEEKS.has(w);
  if(dl) return{title:'🟡 DELOAD WEEK — Mandatory Recovery',body:'Cut all lift sets by 2 and use ~60% weight. No PRs. BJJ rolling stays technical and light — no ego rounds. Your body adapts during recovery. Skipping deload is the fastest way to stall.'};
  const bNotes={
    A:'BLOCK A FOCUS: Establish your strength baseline. Learn these movements at these loads. Record every weight — everything progresses from here. BJJ: focus on technique and position over energy.',
    B:'BLOCK B FOCUS: Bar speed on every lift. Move the weight with intent. BJJ: start committing to explosive entries and takedown shots. Strength builds in the gym, timing builds on the mat.',
    C:'BLOCK C FOCUS: Heavy strength work. Lower reps, more load, PR attempts. This is where your grappling strength gets built. BJJ: use that new strength to control positions, not muscle through them.',
    D:'BLOCK D FOCUS: Lower volume, high intent. Every set should feel athletic. BJJ: this is your peak — rolling should feel efficient and powerful. Trust the 12 weeks of work behind you.'
  };
  const wNotes=['','WEEK 1 OF BLOCK — Establish baseline. Learn at these loads. Record every weight.','WEEK 2 OF BLOCK — Add 1 set to all main lifts. Push past comfort slightly.','WEEK 3 OF BLOCK — Max volume week. Add 2 sets, go after PRs. Peak output.',''];
  return{title:`📈 ${p2?'PHASE 2 — ':''}BLOCK ${blk} — WEEK ${bw}/4`,body:`${wNotes[bw]||''} ${bNotes[blk]}`};
}
