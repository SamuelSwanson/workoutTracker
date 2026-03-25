// ================================================================
//  DG ATHLETE — buildDays() + weekProgNote()
//  Requires engine.js loaded first (P, CT, DELOAD_WEEKS, etc.)
// ================================================================

function buildDays(w){
  const blk=getBlock(w), bw=blockWeek(w), p2=isPhase2(w), dl=DELOAD_WEEKS.has(w);
  const isB=['B','C','D'].includes(blk), isC=['C','D'].includes(blk), isD=blk==='D';

  return {
    monday:{
      name:'MONDAY', tag:'Lower Body + Coil', tagClass:'tag-lower',
      segments:{
        cardio:{label:'CARDIO',color:'cardio',items:[
          {name:'Peloton — Zone 2 Steady Ride', sets:CT(30,bw,blk,p2,dl)},
          {name:'Speed Jump Rope — warm-up', sets:'3 min'},
        ]},
        yoga:{label:'YOGA / STRETCH',color:'yoga',items:[
          {name:'Hip Flexor & Piriformis Flow — Yoga Mat', sets:'8 min'},
          {name:'Thoracic Rotation & Windmill Stretch', sets:'5 min'},
          {name:'Balance Board — Eyes Open Holds', sets:bw>=2?'6 min':'5 min'},
        ]},
        dg:{label:'DISC GOLF — COIL FOCUS',color:'dg',items:[
          {name:'Coil Drill — Resistance Handle Band on Disc', sets:P(3,10,'per side',bw,blk,p2,dl)},
          {name:'X-Step Footwork — Cones + Mini Hurdles', sets:'8 min'},
          {name:'Putting — Basket 15ft Circles', sets:'10 min'},
        ]},
        lift:{label:'LIFT — Lower Body',color:'lift',items:[
          {name:'Zercher Squat — Squat Rack + Barbell + Bumpers', sets:P(4,5,'add plate ea. set',bw,blk,p2,dl)},
          {name:'Zercher Reverse Lunge — Barbell', sets:P(3,8,'per leg',bw,blk,p2,dl)},
          {name:'Romanian Deadlift — Barbell + Std Plates', sets:P(3,8,'',bw,blk,p2,dl)},
          {name:'Landmine Rotation — Slow Coil Focus', sets:P(3,8,'per side',bw,blk,p2,dl)},
          {name:'Bulgarian Split Squat — Dumbbell', sets:P(3,8,'per leg',bw,blk,p2,dl)},
          {name:'Ankle Band Walks — Small Loop Ankle Bands', sets:'3×20 steps fwd/lateral/back'},
          {name:'Farmer Carry — Heavy Dumbbells', sets:dl?'3 trips 40ft light':'4 trips 40ft'},
          {name:'Ab Roller', sets:P(3,10,'',bw,blk,p2,dl)},
          ...(isB?[{name:'Lateral Bounds over Mini Hurdle', sets:P(3,5,'per side',bw,blk,p2,dl)}]:[]),
          ...(isC?[{name:'Nordic Curls — Feet anchored Adjustable Bench', sets:P(3,5,'eccentric focus',bw,blk,p2,dl)}]:[]),
        ]}
      }
    },
    tuesday:{
      name:'TUESDAY', tag:'Upper Body + Lag', tagClass:'tag-upper',
      segments:{
        cardio:{label:'CARDIO',color:'cardio',items:[
          {name:'Punching Bag — Speed Combos + Footwork', sets:CT(25,bw,blk,p2,dl)},
          {name:'Heavy Jump Rope — 2min power intervals', sets:'3 rounds'},
        ]},
        yoga:{label:'YOGA / STRETCH',color:'yoga',items:[
          {name:'Shoulder Capsule Stretch — Yoga Ball assist', sets:'5 min'},
          {name:'Wrist & Forearm Opener — Yoga Mat', sets:'4 min'},
          {name:'Lat + T-Spine Hang — Pull-up Bar', sets:'3×30s dead hang'},
        ]},
        dg:{label:'DISC GOLF — LAG & SNAP',color:'dg',items:[
          {name:'Lag Drills — TechDisc feedback', sets:'10 min focused'},
          {name:'Snap Drills — Handle Bands on Disc', sets:P(3,10,'per side',bw,blk,p2,dl)},
          {name:'Form Throws into Net — Trainer Disc', sets:'10 min'},
        ]},
        lift:{label:'LIFT — Upper Push',color:'lift',items:[
          {name:'Push Press — Squat Rack + Barbell + Bumpers', sets:isB?P(5,3,'max bar speed',bw,blk,p2,dl):P(4,4,'',bw,blk,p2,dl)},
          {name:'Bench Press — Adjustable Bench + Barbell + Plates', sets:P(3,8,'',bw,blk,p2,dl)},
          {name:'Ring Dips — Olympic Rings', sets:P(3,8,'',bw,blk,p2,dl)},
          {name:'Landmine Rotational Press — Explosive', sets:P(3,6,'per side',bw,blk,p2,dl)},
          {name:'Plyo Paralettes — Explosive Push-up', sets:P(3,8,'clap at top',bw,blk,p2,dl)},
          {name:'Banded Punches — Handle Bands', sets:P(3,15,'per side',bw,blk,p2,dl)},
          {name:'Forearm Roller — Wood Dowel + Weighted Dog Leash', sets:'3× full up + down'},
          {name:'Curl Bar — Bicep Curls', sets:P(3,12,'',bw,blk,p2,dl)},
          {name:'Ab Roller', sets:P(3,10,'',bw,blk,p2,dl)},
        ]}
      }
    },
    wednesday:{
      name:'WEDNESDAY', tag:'Recovery + Mobility', tagClass:'tag-recovery',
      segments:{
        cardio:{label:'CARDIO',color:'cardio',items:[
          {name:'Peloton — Easy Recovery Ride', sets:dl?'20 min easy':CT(25,bw,blk,p2,dl)},
        ]},
        yoga:{label:'YOGA / STRETCH',color:'yoga',items:[
          {name:'Full Body Yoga Flow — Yoga Mat', sets:'20 min'},
          {name:'Yoga Ball — Thoracic Extension Hold', sets:'3×45s'},
          {name:'Balance Board — Eyes Closed Holds', sets:bw>=2?'6 min':'5 min'},
          {name:'Ankle Mobility Circles — Small Loop Bands', sets:'2×15 circles per foot'},
        ]},
        dg:{label:'DISC GOLF — PUTTING',color:'dg',items:[
          {name:'Putting Only — Basket Circle 1 & 2', sets:'15 min focused'},
          {name:'TechDisc Grip & Release Feedback', sets:'10 min'},
        ]},
        lift:{label:'LIGHT LIFT — Recovery Focus',color:'lift',items:[
          {name:'Goblet Squat — Kettlebell', sets:dl?'2×12 light':'3×12'},
          {name:'Ring Push-ups — Olympic Rings', sets:dl?'2×10':'3×12'},
          {name:'Back Extensions — Adjustable Bench', sets:dl?'2×12':'3×15'},
          {name:'Band Pull-Aparts — Large Loop Band', sets:'3×20'},
          {name:'Mace 360 — Mace Bell warm weight', sets:'3×12 per direction'},
          {name:'Kettlebell Swings', sets:dl?'2×15':'3×15'},
          {name:'Yoga Ball — Dead Bug Core Hold', sets:'3×30s'},
          {name:'Resistance Band — Face Pulls large loop', sets:'3×20'},
        ]}
      }
    },
    thursday:{
      name:'THURSDAY', tag:'Explosive + Power', tagClass:'tag-explosive',
      segments:{
        cardio:{label:'CARDIO / AGILITY',color:'cardio',items:[
          {name:'Ladder Drills — Speed + Crossover Patterns', sets:CT(12,bw,blk,p2,dl)+' total'},
          {name:'Mini Hurdle — Lateral Hop Overs', sets:'4×8'},
          {name:'Cone Sprints — 5-10-5 Shuttle', sets:'6 rounds'},
        ]},
        yoga:{label:'YOGA / STRETCH',color:'yoga',items:[
          {name:'Dynamic Hip Circles + Leg Swings', sets:'5 min'},
          {name:'Glute & Psoas Release — Yoga Mat', sets:'5 min'},
          {name:'Ankle Mobility — Small Loop Band Assisted', sets:'3 min'},
        ]},
        dg:{label:'DISC GOLF — FULL THROWS',color:'dg',items:[
          {name:'Full Throws into Net — Various Discs', sets:isD?'70–80% full power':isC?'60–70% power':'50–60% power'},
          {name:'X-Step with Handle Band Resistance', sets:P(3,8,'per side',bw,blk,p2,dl)},
          {name:'Trainer Disc — Max Distance Throws', sets:'10 full power throws'},
        ]},
        lift:{label:'LIFT — Power & Plyometrics',color:'lift',items:[
          {name:'Box Jumps — '+(isC?'Max Height Box':isB?'High Box':'Mid Box')+' (3 heights avail)', sets:P(4,3,'max intent',bw,blk,p2,dl)},
          {name:'Zercher Deadlift — Barbell + Bumper Plates', sets:isC?P(4,2,'heavy PR',bw,blk,p2,dl):P(4,3,'',bw,blk,p2,dl)},
          {name:'Landmine Step-Through — Explosive Hip Drive', sets:P(4,5,'per side',bw,blk,p2,dl)},
          {name:'Slam Ball Rotational Throw — Slam Ball', sets:P(3,8,'per side',bw,blk,p2,dl)},
          {name:'Battle Rope — Alternating Waves', sets:`5×30s${bw>=2?' + 5s sprint finish':''}`},
          {name:'Box — Depth Drop to Broad Jump', sets:P(3,3,'',bw,blk,p2,dl)},
          {name:'Ab Roller', sets:P(3,10,'',bw,blk,p2,dl)},
          ...(isD?[{name:'Mace Spear + 360 Combo — Mace Bell', sets:P(3,10,'per direction',bw,blk,p2,dl)}]:[]),
          ...(isB?[{name:'Plyo Paralettes — Tuck Jump to L-Sit', sets:P(3,5,'',bw,blk,p2,dl)}]:[]),
        ]}
      }
    },
    friday:{
      name:'FRIDAY', tag:'Pull + Grip + DG Snap', tagClass:'tag-pull',
      segments:{
        cardio:{label:'CARDIO',color:'cardio',items:[
          {name:'Punching Bag — Power Combo Rounds', sets:CT(25,bw,blk,p2,dl)},
          {name:'Heavy Jump Rope — Steady State', sets:'5 min'},
        ]},
        yoga:{label:'YOGA / STRETCH',color:'yoga',items:[
          {name:'Thoracic Opener over Yoga Ball', sets:'5 min'},
          {name:'Lats & Biceps Hang Stretch — Pull-up Bar', sets:'3×30s'},
          {name:'Forearm & Wrist Figure-8s', sets:'3 min'},
          {name:'Balance Board — Single Leg Static Hold', sets:'3×30s per leg'},
        ]},
        dg:{label:'DISC GOLF — SNAP & LINES',color:'dg',items:[
          {name:'Snap Drills — TechDisc', sets:'10 min'},
          {name:'Anhyzer + Hyzer Lines into Net', sets:'10 min'},
          {name:'Long Putts — Basket 40ft+', sets:'10 min'},
        ]},
        lift:{label:'LIFT — Pull + Grip + Hang',color:'lift',items:[
          {name:'Weighted Pull-ups — Pull-up Bar + Plate Belt', sets:isC?P(4,4,'add weight ea. set',bw,blk,p2,dl):P(4,5,'',bw,blk,p2,dl)},
          {name:'Barbell Rows — Squat Rack', sets:P(3,8,'',bw,blk,p2,dl)},
          {name:'Ring Face Pulls — Olympic Rings', sets:P(3,15,'',bw,blk,p2,dl)},
          {name:'Ring Rows — Feet Elevated — Olympic Rings', sets:P(3,10,'',bw,blk,p2,dl)},
          {name:'Mace 360 + Grave Digger Combo — Mace Bell', sets:P(3,10,'per direction',bw,blk,p2,dl)},
          {name:'Dead Hang — Hang Board', sets:'3× max hold, log seconds'},
          {name:'Hang Board — Crimp / Open Hand Hold', sets:`3×${10+bw*5}s`},
          {name:'Forearm Roller — Loaded Dog Leash', sets:'4× up + down'},
          {name:'Pallof Press — Large Loop Band', sets:P(3,12,'per side',bw,blk,p2,dl)},
          {name:'Ab Roller', sets:P(3,10,'',bw,blk,p2,dl)},
        ]}
      }
    },
    saturday:{
      name:'SATURDAY', tag:'Full Circuit + Field', tagClass:'tag-circuit',
      segments:{
        cardio:{label:'CONDITIONING',color:'cardio',items:[
          {name:'Speed Jump Rope — Double Unders', sets:'5 min'},
          {name:'Heavy Jump Rope — Power sets', sets:'5 min'},
          ...(dl?[]:[{name:'Battle Rope — Tabata 20s on/10s off', sets:'4 rounds'}]),
        ]},
        yoga:{label:'STRETCH',color:'yoga',items:[
          {name:'Full Body Recovery Stretch — Yoga Mat', sets:'12 min'},
          {name:'Yoga Ball — Spinal Decompression', sets:'5 min'},
        ]},
        dg:{label:'DISC GOLF — FIELD DAY',color:'dg',items:[
          {name:'Field Work — Various Discs', sets:isD?'Full game-speed session':'Free practice'},
          {name:'Trainer Disc Max Distance', sets:'10 full-send throws'},
          {name:'Basket — 50 Putts to finish', sets:'C1 & C2 mix'},
        ]},
        lift:{label:dl?'CIRCUIT — 2 Rounds (light)':'CIRCUIT — 3–4 Rounds',color:'lift',items:[
          {name:'Kettlebell Swings', sets:dl?'×12 light':'×15'},
          {name:'Ring Push-ups — Olympic Rings', sets:dl?'×10':'×15'},
          {name:'Curl Bar — Bicep Curls', sets:'×12'},
          {name:'Plyo Paralettes — Dips', sets:'×12'},
          {name:'Slam Ball Slams', sets:'×10'},
          {name:'Ab Roller', sets:'×10'},
          {name:'Mace — Alternating 10-to-2', sets:'×12 per side'},
          ...(dl?[]:[{name:'Box — Broad Jump', sets:'×5'}]),
          ...(dl?[]:[{name:'Large Loop Band — Monster Walks', sets:'×20 fwd + back'}]),
          ...(dl?[]:[{name:'Dumbbell — Lateral Raise', sets:'×15'}]),
        ]}
      }
    },
    sunday:{
      name:'SUNDAY', tag:'Rest', tagClass:'tag-rest', isRest:true,
      segments:{
        yoga:{label:'ACTIVE RECOVERY — Optional',color:'yoga',items:[
          {name:'Walk or light hike — outdoors', sets:'30+ min'},
          {name:'Foam roll + full body Yoga Mat session', sets:'15 min'},
          {name:'Balance Board — casual no pressure', sets:'5 min optional'},
          {name:'Mental game visualization — plan the round', sets:'10 min'},
        ]}
      }
    }
  };
}

function weekProgNote(w){
  const bw=blockWeek(w), blk=getBlock(w), p2=isPhase2(w), dl=DELOAD_WEEKS.has(w);
  if(dl) return{title:'🟡 DELOAD WEEK — Mandatory Recovery',body:'Cut all lifting sets by 2 and use ~60% weight. No PRs, no grinding. Cardio stays moderate. Mobility gets extra time. Your body gets stronger during rest — skipping deload is the fastest way to stall progress.'};
  const bNotes={A:'BLOCK A FOCUS: Control every rep. Build the motor pattern. Track starting weights — everything progresses from here.',B:'BLOCK B FOCUS: Bar speed is the goal. Move the weight fast. Disc golf emphasis shifts to feeling the whip and lag.',C:'BLOCK C FOCUS: Load the bar. Lower reps, more weight, PRs this block. Translate raw strength to disc spin.',D:'BLOCK D FOCUS: Everything becomes athletic. Lower volume, higher intent. Disc golf gets 70–80% full-power throws.'};
  const wNotes=['','WEEK 1 OF BLOCK — Establish baseline. Learn the movements at these loads. Record every weight used.','WEEK 2 OF BLOCK — Add 1 set to all main lifts. Push slightly past comfort.','WEEK 3 OF BLOCK — Max volume week. Add 2 sets. Go after PRs. This is your peak week.',''];
  return{title:`📈 ${p2?'PHASE 2 — ':''}BLOCK ${blk} — WEEK ${bw}/4`,body:`${wNotes[bw]||''} ${bNotes[blk]}`};
}
