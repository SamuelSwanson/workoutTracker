// ================================================================
//  FOOTBALL / BASKETBALL ATHLETE — buildDays() + weekProgNote()
//  High School Bulk Program. Standard gym + landmine. 1–2 hrs/day.
//  Requires engine.js loaded first.
// ================================================================

function buildDays(w){
  const blk=getBlock(w), bw=blockWeek(w), p2=isPhase2(w), dl=DELOAD_WEEKS.has(w);
  const isB=['B','C','D'].includes(blk), isC=['C','D'].includes(blk), isD=blk==='D';

  return {
    monday:{
      name:'MONDAY', tag:'Lower Body + Mass', tagClass:'tag-lower',
      segments:{
        cardio:{label:'WARM-UP',color:'cardio',items:[
          {name:'Jump Rope or Stationary Bike — Warm-Up', sets:'5–8 min'},
          {name:'Dynamic Leg Swings + Hip Circles', sets:'3 min'},
        ]},
        yoga:{label:'ACTIVATION / MOBILITY',color:'yoga',items:[
          {name:'Hip Flexor Stretch — Kneeling Lunge', sets:'2 min per side'},
          {name:'Glute Activation — Banded Clamshells', sets:'2×15 per side'},
          {name:'Ankle Mobility — Wall Drill', sets:'2×10 per foot'},
        ]},
        dg:{label:'FOOTBALL / HOOPS — LEG POWER',color:'dg',items:[
          {name:'Vertical Jump Attempts — Max Height', sets:'5 jumps, rest between each'},
          {name:'Broad Jump — Triple Extension Practice', sets:P(3,4,'max distance',bw,blk,p2,dl)},
          {name:'Lateral Shuffle + Crossover Cut — Cones', sets:'4×20ft each direction'},
        ]},
        lift:{label:'LIFT — Lower Body Mass',color:'lift',items:[
          {name:'Back Squat — Barbell + Rack', sets:P(5,5,'add weight ea. set',bw,blk,p2,dl)},
          {name:'Romanian Deadlift — Barbell', sets:P(4,8,'',bw,blk,p2,dl)},
          {name:'Landmine Split Squat — Single Leg', sets:P(3,10,'per leg',bw,blk,p2,dl)},
          {name:'Bulgarian Split Squat — Dumbbell', sets:P(3,8,'per leg',bw,blk,p2,dl)},
          {name:'Nordic Curl Negative — Feet Anchored on Bench', sets:P(3,5,'eccentric slow 5s',bw,blk,p2,dl)},
          {name:'Standing Calf Raise — Dumbbell or Barbell', sets:P(4,15,'',bw,blk,p2,dl)},
          {name:'Ab Wheel Rollout', sets:P(3,10,'',bw,blk,p2,dl)},
          ...(isB?[{name:'Depth Drop to Squat — Box', sets:P(3,4,'absorb landing fully',bw,blk,p2,dl)}]:[]),
          ...(isC?[{name:'Pause Squat — 3s hold at bottom', sets:P(3,4,'add weight',bw,blk,p2,dl)}]:[]),
        ]}
      }
    },
    tuesday:{
      name:'TUESDAY', tag:'Upper Push + Mass', tagClass:'tag-upper',
      segments:{
        cardio:{label:'WARM-UP',color:'cardio',items:[
          {name:'Jump Rope — Warm-Up', sets:'5 min'},
          {name:'Band Pull-Aparts + Arm Circles', sets:'2×20'},
        ]},
        yoga:{label:'ACTIVATION / MOBILITY',color:'yoga',items:[
          {name:'Shoulder Capsule Stretch — Floor', sets:'2 min per side'},
          {name:'Chest Opener — Band or Doorway Stretch', sets:'2 min'},
          {name:'Wrist Circles + Forearm Flexor Stretch', sets:'2 min'},
        ]},
        dg:{label:'FOOTBALL / HOOPS — PUSH POWER',color:'dg',items:[
          {name:'Medicine Ball Chest Pass — Wall, Explosive', sets:P(3,8,'max force into wall',bw,blk,p2,dl)},
          {name:'Landmine Push Press — Single Arm Explosive', sets:P(3,6,'per side',bw,blk,p2,dl)},
          {name:'Overhead Med Ball Slam — Forward', sets:P(3,6,'',bw,blk,p2,dl)},
        ]},
        lift:{label:'LIFT — Upper Push + Mass',color:'lift',items:[
          {name:'Bench Press — Barbell', sets:isB?P(5,3,'max bar speed',bw,blk,p2,dl):P(5,5,'',bw,blk,p2,dl)},
          {name:'Incline Dumbbell Press', sets:P(4,8,'',bw,blk,p2,dl)},
          {name:'Overhead Press — Barbell or Dumbbell', sets:P(4,8,'',bw,blk,p2,dl)},
          {name:'Landmine Press — Single Arm, Kneeling', sets:P(3,10,'per arm',bw,blk,p2,dl)},
          {name:'Dumbbell Lateral Raise', sets:P(3,15,'',bw,blk,p2,dl)},
          {name:'Tricep Dips — Weighted if possible', sets:P(3,10,'',bw,blk,p2,dl)},
          {name:'Skull Crushers — Barbell or Dumbbell', sets:P(3,12,'',bw,blk,p2,dl)},
          {name:'Plank or Ab Wheel', sets:P(3,10,'',bw,blk,p2,dl)},
        ]}
      }
    },
    wednesday:{
      name:'WEDNESDAY', tag:'Conditioning + Skills', tagClass:'tag-recovery',
      segments:{
        cardio:{label:'CONDITIONING',color:'cardio',items:[
          {name:'Basketball Dribbling Drills OR Football Route Running', sets:dl?'15 min easy':'25–35 min full effort'},
          {name:'Cone Agility Drill — 5-10-5 Shuttle', sets:'6 rounds, log times'},
          {name:'Defensive Slides + Backpedal Sprint Combo', sets:'4 rounds'},
        ]},
        yoga:{label:'MOBILITY / RECOVERY',color:'yoga',items:[
          {name:'Full Body Stretch — Mat', sets:'12 min'},
          {name:'Hip Flexor + Hamstring Flow', sets:'6 min'},
          {name:'Thoracic Rotation + Spine Mobility', sets:'4 min'},
        ]},
        dg:{label:'FOOTBALL / HOOPS — SPORT SKILLS',color:'dg',items:[
          {name:'Hoops: Ball Handling + Shot Mechanics — OR — Football: Route Running + Cuts', sets:'15–20 min focused'},
          {name:'Approach Jump + Vertical Leap Practice', sets:'5 max-height attempts, log height'},
          {name:'Reaction Drill — Mirror Drill or Ball Drop Catch', sets:'4×45s'},
        ]},
        lift:{label:'LIGHT LIFT — Active Recovery',color:'lift',items:[
          {name:'Goblet Squat — Light Dumbbell', sets:dl?'2×12':'3×12'},
          {name:'Push-Ups — Explosive Clap', sets:dl?'2×10':'3×15'},
          {name:'Band Pull-Aparts', sets:'3×20'},
          {name:'Kettlebell Swings — Moderate', sets:dl?'2×15':'3×15'},
          {name:'Dead Bug Core Hold — Mat', sets:'3×30s'},
        ]}
      }
    },
    thursday:{
      name:'THURSDAY', tag:'Explosive + Power', tagClass:'tag-explosive',
      segments:{
        cardio:{label:'AGILITY / SPEED WORK',color:'cardio',items:[
          {name:'Ladder Drills — In/Out, Icky Shuffle, Ali Shuffle', sets:CT(12,bw,blk,p2,dl)+' total'},
          {name:'Sprint Starts — 10yd burst', sets:'4×8 reps, focus on first 3 steps'},
          {name:'Defensive Slide to Sprint Combo', sets:'4 rounds'},
        ]},
        yoga:{label:'DYNAMIC WARM-UP',color:'yoga',items:[
          {name:'Leg Swings + Hip Circles', sets:'4 min'},
          {name:'Inchworm + Thoracic Rotation', sets:'3 min'},
          {name:'Glute + Psoas Release — Mat', sets:'3 min'},
        ]},
        dg:{label:'FOOTBALL / HOOPS — EXPLOSIVENESS',color:'dg',items:[
          {name:'Box Jumps — Max Height, Full Intent', sets:P(4,4,'reset between reps',bw,blk,p2,dl)},
          {name:'Broad Jump Series', sets:P(3,3,'max distance ea. rep',bw,blk,p2,dl)},
          {name:'Landmine Rotational Press — Hip Drive + Rotate', sets:P(3,6,'explosive per side',bw,blk,p2,dl)},
        ]},
        lift:{label:'LIFT — Power + Explosiveness',color:'lift',items:[
          {name:'Power Clean or Hang Clean — Barbell', sets:P(4,3,'bar speed priority',bw,blk,p2,dl)},
          {name:'Landmine Deadlift — Full Extension', sets:isC?P(4,2,'heavy PR',bw,blk,p2,dl):P(4,4,'',bw,blk,p2,dl)},
          {name:'Landmine Squat to Press — Full Body', sets:P(3,6,'explosive drive',bw,blk,p2,dl)},
          {name:'Slam Ball — Overhead + Rotational Throw', sets:P(3,8,'',bw,blk,p2,dl)},
          {name:'Battle Rope — Alternating Waves', sets:`5×30s${bw>=2?' + 5s sprint finish':''}`},
          {name:'Depth Drop to Broad Jump — Box', sets:P(3,3,'',bw,blk,p2,dl)},
          {name:'Ab Rollout', sets:P(3,10,'',bw,blk,p2,dl)},
          ...(isD?[{name:'Sprint + Hard Cut — 10yd sprint, plant, cut back', sets:'6 full-speed reps each direction'}]:[]),
          ...(isB?[{name:'Plyometric Push-Up — Clap or Plate', sets:P(3,8,'',bw,blk,p2,dl)}]:[]),
        ]}
      }
    },
    friday:{
      name:'FRIDAY', tag:'Upper Pull + Mass', tagClass:'tag-pull',
      segments:{
        cardio:{label:'WARM-UP',color:'cardio',items:[
          {name:'Jump Rope — Warm-Up', sets:'5 min'},
          {name:'Face Pulls + Band Pull-Aparts — Shoulder Prep', sets:'2×20'},
        ]},
        yoga:{label:'MOBILITY / STRETCH',color:'yoga',items:[
          {name:'Lat + T-Spine Dead Hang — Pull-up Bar', sets:'3×30s'},
          {name:'Bicep + Forearm Flexor Stretch', sets:'3 min'},
          {name:'Posterior Shoulder Stretch — Cross-Body', sets:'2 min per side'},
        ]},
        dg:{label:'FOOTBALL / HOOPS — PULL + GRIP',color:'dg',items:[
          {name:'Dead Hang — Pull-up Bar', sets:`3×${20+bw*10}s hold, log time`},
          {name:'Landmine Row — Single Arm Explosive', sets:P(3,8,'per side',bw,blk,p2,dl)},
          {name:'Towel Pull-up Hold — Grip Simulation', sets:P(3,5,'hold 2s at top',bw,blk,p2,dl)},
        ]},
        lift:{label:'LIFT — Upper Pull + Back Mass',color:'lift',items:[
          {name:'Weighted Pull-ups — Pull-up Bar + Belt', sets:isC?P(4,4,'add weight',bw,blk,p2,dl):P(5,5,'',bw,blk,p2,dl)},
          {name:'Barbell Rows — Overhand, Heavy', sets:P(4,8,'',bw,blk,p2,dl)},
          {name:'Landmine Row — Chest-Braced Single Arm', sets:P(3,10,'per arm',bw,blk,p2,dl)},
          {name:'Dumbbell Row — Single Arm', sets:P(3,10,'per arm',bw,blk,p2,dl)},
          {name:'Face Pulls — Band or Cable', sets:P(3,15,'',bw,blk,p2,dl)},
          {name:'Barbell or Dumbbell Bicep Curl', sets:P(4,10,'',bw,blk,p2,dl)},
          {name:'Hammer Curl — Dumbbell', sets:P(3,12,'',bw,blk,p2,dl)},
          {name:'Ab Rollout', sets:P(3,10,'',bw,blk,p2,dl)},
        ]}
      }
    },
    saturday:{
      name:'SATURDAY', tag:'Full Body + Sport Skills', tagClass:'tag-circuit',
      segments:{
        cardio:{label:'CONDITIONING',color:'cardio',items:[
          {name:'Sprint Circuit — 4×50yd with 30s rest', sets:'4 rounds, log times'},
          {name:'Jump Rope — Mixed Tempo', sets:'5 min'},
          ...(dl?[]:[{name:'Battle Rope — Tabata 20s on / 10s off', sets:'4 rounds'}]),
        ]},
        yoga:{label:'STRETCH',color:'yoga',items:[
          {name:'Full Body Recovery Stretch — Mat', sets:'12 min'},
          {name:'Hip + Hamstring + Quad Focus', sets:'5 min'},
        ]},
        dg:{label:'FOOTBALL / HOOPS — GAME SKILLS',color:'dg',items:[
          {name:'Hoops: Shooting + Layup Circuits — OR — Football: Receiving Routes + Cuts', sets:isD?'Full-intensity game-prep session':'Progressive sport practice'},
          {name:'Vertical Jump — Measure + Log Every Week', sets:'5 max attempts, record best'},
          {name:'Cone Change-of-Direction Drill', sets:'6 rounds'},
        ]},
        lift:{label:dl?'CIRCUIT — 2 Rounds (light)':'CIRCUIT — 3–4 Rounds',color:'lift',items:[
          {name:'Kettlebell Swings', sets:dl?'×12 light':'×15'},
          {name:'Push-Ups — Explosive', sets:dl?'×10':'×15'},
          {name:'Pull-ups — Bodyweight Max', sets:'×max'},
          {name:'Box Jump', sets:dl?'×3 controlled':'×5'},
          {name:'Slam Ball Slams', sets:'×10'},
          {name:'Landmine Press — Alternating Arms', sets:'×8 per side'},
          {name:'Ab Wheel', sets:'×10'},
          ...(dl?[]:[{name:'Broad Jump', sets:'×5'}]),
          ...(dl?[]:[{name:'Dumbbell Lateral Raise', sets:'×15'}]),
          ...(dl?[]:[{name:'Barbell Curl — Drop Set', sets:'×12 heavy → strip weight → ×10'}]),
        ]}
      }
    },
    sunday:{
      name:'SUNDAY', tag:'Rest', tagClass:'tag-rest', isRest:true,
      segments:{
        yoga:{label:'ACTIVE RECOVERY — Optional',color:'yoga',items:[
          {name:'Walk or casual sport play — outdoors', sets:'30+ min'},
          {name:'Foam roll + full body stretch — Mat', sets:'15 min'},
          {name:'Core holds — plank + dead bug', sets:'5 min optional'},
          {name:'Watch film or mental game prep', sets:'10 min'},
        ]}
      }
    }
  };
}

function weekProgNote(w){
  const bw=blockWeek(w), blk=getBlock(w), p2=isPhase2(w), dl=DELOAD_WEEKS.has(w);
  if(dl) return{title:'🟡 DELOAD WEEK — Recovery & Muscle Repair',body:'Drop all lifting sets by 2 and use ~60% weight. No PRs. Conditioning stays light. Eat at a surplus and sleep 8–9 hours — deload weeks are when the bulk actually happens. Never skip this.'};
  const bNotes={
    A:'BLOCK A FOCUS: Learn the lifts under load. Track your starting numbers — bench, squat, clean. Build the habit of progressive overload. Every week should be slightly heavier than the last.',
    B:'BLOCK B FOCUS: Volume and speed. Add a set to every main lift. Move the bar with intent — speed IS strength. Athletic focus shifts to reactive cuts, faster first step, higher jump.',
    C:'BLOCK C FOCUS: Max strength. Fewer reps, heavier weight, PRs on bench and squat. This is the block where the bulk turns into real power on the field and court. Eat extra.',
    D:'BLOCK D FOCUS: Athletic peak. Lower volume, maximum explosiveness. Translate gym strength to game speed. Sprint faster, jump higher, play stronger. Trust the process.'
  };
  const wNotes=['','WEEK 1 OF BLOCK — Establish baseline weights. Nail form before adding load. Log every number.','WEEK 2 OF BLOCK — Add 1 set to all main lifts. Eat more on training days — you need the fuel.','WEEK 3 OF BLOCK — Peak volume week. Add 2 sets, chase PRs. Sleep 8–9 hrs this week minimum.',''];
  return{title:`📈 ${p2?'PHASE 2 — ':''}BLOCK ${blk} — WEEK ${bw}/4`,body:`${wNotes[bw]||''} ${bNotes[blk]}`};
}
