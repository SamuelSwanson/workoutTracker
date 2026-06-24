// ================================================================
//  DG ATHLETE 2.0 — 2-A-DAYS STRUCTURE
//  Morning: Cardio + Abs | Evening: Strength Training + Yoga
//  Requires engine.js loaded first (P, CT, DELOAD_WEEKS, etc.)
// ================================================================

function buildDays(w){
  const blk=getBlock(w), bw=blockWeek(w), p2=isPhase2(w), dl=DELOAD_WEEKS.has(w);
  const isB=['B','C','D'].includes(blk), isC=['C','D'].includes(blk), isD=blk==='D';

  const days = {
    monday:{
      name:'MONDAY', tag:'Bike Day | Upper Strength', tagClass:'tag-upper',
      segments:{
        morning:{label:'MORNING (20-30 MIN) — CARDIO + ABS',color:'cardio',items:[
          {name:'Peloton — Zone 2 Steady Ride', sets:'25-30 min'},
          {name:'Speed Jump Rope — warm-up/cool-down', sets:'3 min'},
        ]},
        evening:{label:'EVENING (40 MIN) — UPPER STRENGTH + YOGA',color:'lift',items:[
          {name:'Push Press — Squat Rack + Barbell + Bumpers', sets:isC?P(4,3,'heavy, add weight',bw,blk,p2,dl):isB?P(4,4,'','',bw,blk,p2,dl):P(4,5,'',bw,blk,p2,dl)},
          {name:'Weighted Pull-ups — Pull-up Bar + Plate Belt', sets:isC?P(4,3,'add weight ea. set',bw,blk,p2,dl):isB?P(4,4,'','',bw,blk,p2,dl):P(4,5,'',bw,blk,p2,dl)},
          {name:'Bench Press — Adjustable Bench + Barbell', sets:isC?P(4,3,'heavy',bw,blk,p2,dl):isB?P(4,4,'','',bw,blk,p2,dl):P(4,5,'',bw,blk,p2,dl)},
          {name:'Barbell Rows — Squat Rack', sets:isC?P(4,3,'heavy',bw,blk,p2,dl):isB?P(4,4,'','',bw,blk,p2,dl):P(4,5,'',bw,blk,p2,dl)},
          {name:'Ring Dips — Olympic Rings', sets:P(3,6,'lower reps',bw,blk,p2,dl)},
          {name:'Ring Face Pulls — Olympic Rings', sets:P(3,12,'controlled',bw,blk,p2,dl)},
          {name:'Dumbbell Lateral Raises — Dumbbells', sets:P(3,10,'strict form, shoulders',bw,blk,p2,dl)},
          {name:'Rope Pushdowns — Cable Machine', sets:P(3,12,'tricep isolation',bw,blk,p2,dl)},
        ]},
        yoga_evening:{label:'YOGA (20 MIN)',color:'yoga',items:[
          {name:'Peloton Yoga/Stretch — Full Body Recovery', sets:'20 min'},
        ]},
      }
    },
    tuesday:{
      name:'TUESDAY', tag:'Agility Day | Lower Strength', tagClass:'tag-lower',
      segments:{
        morning:{label:'MORNING (20-30 MIN) — ROPE + BAG + AGILITY',color:'cardio',items:[
          {name:'Heavy Jump Rope — Power sets', sets:'10 min total (2 min intervals)'},
          {name:'Punching Bag — Speed Combos + Footwork', sets:'10 min'},
          {name:'Agility Drills — See AGILITY DAY variant below', sets:'5 min - rotate weekly'},
        ]},
        dg_morning:{label:'DG FOCUS (15 MIN)',color:'dg',items:[
          {name:'Coil Drill — Resistance Handle Band on Disc', sets:P(3,10,'per side',bw,blk,p2,dl)},
          {name:'X-Step Footwork — Cones + Mini Hurdles', sets:'5 min'},
          {name:'Snap Drills — Handle Bands', sets:P(3,8,'per side',bw,blk,p2,dl)},
        ]},
        evening:{label:'EVENING (40 MIN) — LOWER STRENGTH + YOGA',color:'lift',items:[
          {name:'Zercher Squat — Squat Rack + Barbell + Bumpers', sets:isC?P(4,3,'heavy, add plate',bw,blk,p2,dl):isB?P(4,4,'','',bw,blk,p2,dl):P(4,5,'',bw,blk,p2,dl)},
          {name:'Barbell Deadlift — Heavy', sets:isC?P(3,3,'max effort',bw,blk,p2,dl):isB?P(3,4,'','',bw,blk,p2,dl):P(3,5,'',bw,blk,p2,dl)},
          {name:'Romanian Deadlift — Barbell', sets:P(3,5,'lower reps',bw,blk,p2,dl)},
          {name:'Zercher Reverse Lunge — Barbell', sets:P(3,6,'per leg',bw,blk,p2,dl)},
          {name:'Leg Extension Machine', sets:P(3,8,'heavy load',bw,blk,p2,dl)},
          {name:'Hamstring Curl Machine — Heavy, 3s Eccentric', sets:P(3,8,'slow tempo',bw,blk,p2,dl)},
        ]},
        yoga_evening:{label:'YOGA (20 MIN)',color:'yoga',items:[
          {name:'Peloton Yoga/Stretch — Lower Body Recovery', sets:'20 min'},
        ]},
      }
    },
    wednesday:{
      name:'WEDNESDAY', tag:'Bike Day | Upper Hypertrophy', tagClass:'tag-upper',
      segments:{
        morning:{label:'MORNING (20-30 MIN) — CARDIO + ABS',color:'cardio',items:[
          {name:'Peloton — Zone 2 Steady Ride', sets:'25-30 min'},
          {name:'Speed Jump Rope — warm-up/cool-down', sets:'3 min'},
        ]},
        evening:{label:'EVENING (40 MIN) — UPPER HYPERTROPHY + YOGA',color:'lift',items:[
          {name:'Bench Press — Adjustable Bench + Barbell', sets:P(4,8,'moderate weight',bw,blk,p2,dl)},
          {name:'Barbell Rows — Squat Rack', sets:P(4,8,'moderate weight',bw,blk,p2,dl)},
          {name:'Incline Dumbbell Press — Dumbbells + Adjustable Bench', sets:P(3,10,'hypertrophy tempo',bw,blk,p2,dl)},
          {name:'Landmine Rotational Press — Controlled', sets:P(3,10,'per side',bw,blk,p2,dl)},
          {name:'Ring Dips — Olympic Rings', sets:P(3,12,'moderate',bw,blk,p2,dl)},
          {name:'Curl Bar — Bicep Curls', sets:P(3,12,'controlled tempo',bw,blk,p2,dl)},
          {name:'Dumbbell Lateral Raises — Dumbbells', sets:P(4,12,'hypertrophy shoulders',bw,blk,p2,dl)},
          {name:'Tricep Rope Extensions — Cable Machine', sets:P(3,15,'high reps for pump',bw,blk,p2,dl)},
        ]},
        yoga_evening:{label:'YOGA (20 MIN)',color:'yoga',items:[
          {name:'Peloton Yoga/Stretch — Full Body Recovery', sets:'20 min'},
        ]},
      }
    },
    thursday:{
      name:'THURSDAY', tag:'Agility Day | Lower Hypertrophy', tagClass:'tag-lower',
      segments:{
        morning:{label:'MORNING (20-30 MIN) — ROPE + BAG + AGILITY',color:'cardio',items:[
          {name:'Heavy Jump Rope — Power sets', sets:'10 min total (2 min intervals)'},
          {name:'Punching Bag — Speed Combos + Footwork', sets:'10 min'},
          {name:'Agility Drills — See AGILITY DAY variant below', sets:'5 min - rotate weekly'},
        ]},
        dg_morning:{label:'DG FOCUS (15 MIN)',color:'dg',items:[
          {name:'Lag Drills — TechDisc feedback', sets:'5 min focused'},
          {name:'Form Throws into Net — Trainer Disc', sets:'10 min @ 60-70% effort'},
        ]},
        evening:{label:'EVENING (40 MIN) — LOWER HYPERTROPHY + YOGA',color:'lift',items:[
          {name:'Bulgarian Split Squat — Dumbbell', sets:P(4,10,'per leg',bw,blk,p2,dl)},
          {name:'Goblet Squat — Kettlebell', sets:P(3,12,'hypertrophy tempo',bw,blk,p2,dl)},
          {name:'Leg Extension Machine — Moderate Weight', sets:P(4,12,'controlled',bw,blk,p2,dl)},
          {name:'Hamstring Curl Machine — Moderate Weight', sets:P(4,12,'slow eccentric',bw,blk,p2,dl)},
          {name:'Landmine Step-Through — Hip Drive', sets:P(3,10,'per side',bw,blk,p2,dl)},
          {name:'Ankle Band Walks — Small Loop Ankle Bands', sets:'3×20 steps fwd/lateral/back'},
        ]},
        yoga_evening:{label:'YOGA (20 MIN)',color:'yoga',items:[
          {name:'Peloton Yoga/Stretch — Full Body Recovery', sets:'20 min'},
        ]},
      }
    },
    friday:{
      name:'FRIDAY', tag:'Bike Day | Functional', tagClass:'tag-explosive',
      segments:{
        morning:{label:'MORNING (20-30 MIN) — CARDIO + ABS',color:'cardio',items:[
          {name:'Peloton — Zone 2 Steady Ride', sets:'25-30 min'},
          {name:'Speed Jump Rope — warm-up/cool-down', sets:'3 min'},
        ]},

        evening:{label:'EVENING (40 MIN) — FUNCTIONAL (KETTLEBELL + LANDMINE) + YOGA',color:'lift',items:[
          {name:'Kettlebell Swings', sets:P(4,15,'explosive hip drive',bw,blk,p2,dl)},
          {name:'Landmine Deadlift — Single Arm Rows', sets:P(3,12,'per side',bw,blk,p2,dl)},
          {name:'Kettlebell Turkish Get-up', sets:P(3,5,'per side, controlled',bw,blk,p2,dl)},
          {name:'Landmine Rotation — Full Body', sets:P(3,12,'per side',bw,blk,p2,dl)},
          {name:'Kettlebell Goblet Squat', sets:P(3,12,'','',bw,blk,p2,dl)},
          {name:'Battle Rope — Alternating Waves', sets:P(3,30,'seconds',bw,blk,p2,dl)},
        ]},
        yoga_evening:{label:'YOGA (20 MIN)',color:'yoga',items:[
          {name:'Peloton Yoga/Stretch — Full Body Recovery', sets:'20 min'},
        ]},
      }
    },
    saturday:{
      name:'SATURDAY', tag:'Agility Day | Functional', tagClass:'tag-explosive',
      segments:{
        morning:{label:'MORNING (20-30 MIN) — ROPE + BAG + AGILITY',color:'cardio',items:[
          {name:'Heavy Jump Rope — Power sets', sets:'10 min total (2 min intervals)'},
          {name:'Punching Bag — Speed Combos + Footwork', sets:'10 min'},
          {name:'Ladder Drills — See AGILITY DAY variant below', sets:'5 min - rotate weekly'},
        ]},
        dg_morning:{label:'DG FOCUS (15 MIN)',color:'dg',items:[
          {name:'Full Throws into Net — Various Discs', sets:'10 min @ 70-80% effort'},
          {name:'X-Step with Handle Band Resistance', sets:P(3,8,'per side',bw,blk,p2,dl)},
        ]},
        evening:{label:'EVENING (40 MIN) — FUNCTIONAL (KETTLEBELL + LANDMINE) + YOGA',color:'lift',items:[
          {name:'Kettlebell Swings', sets:P(4,15,'explosive hip drive',bw,blk,p2,dl)},
          {name:'Landmine Deadlift — Single Arm Rows', sets:P(3,12,'per side',bw,blk,p2,dl)},
          {name:'Kettlebell Farmer Carry — Heavy', sets:P(3,40,'feet per carry',bw,blk,p2,dl)},
          {name:'Landmine Rotational Press — Explosive', sets:P(3,10,'per side',bw,blk,p2,dl)},
          {name:'Box Jumps', sets:P(3,5,'max height',bw,blk,p2,dl)},
          {name:'Battle Rope — Alternating Waves', sets:P(3,30,'seconds',bw,blk,p2,dl)},
        ]},
        yoga_evening:{label:'YOGA (20 MIN)',color:'yoga',items:[
          {name:'Peloton Yoga/Stretch — Full Body Recovery', sets:'20 min'},
        ]},
      }
    },
    sunday:{
      name:'SUNDAY', tag:'Recovery + Grip/Hang', tagClass:'tag-recovery',
      segments:{
        morning:{label:'MORNING — LIGHT RECOVERY',color:'cardio',items:[
          {name:'Peloton — Easy Recovery Ride', sets:dl?'20 min easy':'25 min Zone 2'},
        ]},
        evening:{label:'EVENING (40 MIN) — GRIP + HANG TRAINING + YOGA',color:'lift',items:[
          {name:'Dead Hang — Hang Board', sets:'3× max hold, log seconds'},
          {name:'Hang Board — Crimp / Open Hand Hold', sets:`3×${15+bw*5}s`},
          {name:'Forearm Roller — Loaded Dog Leash', sets:'4× full up + down'},
          {name:'Weighted Pull-ups — Light Weight, Focus Grip', sets:P(3,8,'controlled',bw,blk,p2,dl)},
          {name:'Ring Rows — Feet Elevated — Olympic Rings', sets:P(3,12,'grip focus',bw,blk,p2,dl)},
          {name:'Mace 360 + Grave Digger Combo — Mace Bell', sets:P(3,12,'per direction',bw,blk,p2,dl)},
        ]},
        yoga_evening:{label:'YOGA (20 MIN)',color:'yoga',items:[
          {name:'Peloton Yoga/Stretch — Full Body Recovery', sets:'20 min'},
        ]},
      }
    }
  };

  return days;
}

// ================================================================
//  REFERENCE VARIANTS — Display as separate reference boxes
// ================================================================

function getAllAbsVariants(w){
  const bw=blockWeek(w), blk=getBlock(w), p2=isPhase2(w), dl=DELOAD_WEEKS.has(w);
  return [
    {
      num: 1,
      label: 'ABS DAY 1 — STABILITY + BALANCE BOARD',
      items: [
        {name:'Balance Board Core Hold — Static', sets:P(3,60,'seconds, neutral spine',bw,blk,p2,dl)},
        {name:'Balance Board Chop — Rotation', sets:P(3,12,'per side, controlled',bw,blk,p2,dl)},
        {name:'Ab Roller — Extended Range', sets:P(3,10,'controlled eccentric',bw,blk,p2,dl)},
        {name:'Pallof Press — Large Loop Band', sets:P(3,15,'per side, anti-rotation',bw,blk,p2,dl)},
        {name:'Dead Bug Hold — Yoga Mat', sets:P(3,45,'seconds, precision',bw,blk,p2,dl)},
      ]
    },
    {
      num: 2,
      label: 'ABS DAY 2 — ROPE ANCHOR + DYNAMIC',
      items: [
        {name:'Rope Anchor — Anchored Leg Raises', sets:P(3,12,'feet hooked, controlled',bw,blk,p2,dl)},
        {name:'Rope Anchor — Anchored Crunches', sets:P(3,15,'explosive up, slow down',bw,blk,p2,dl)},
        {name:'Rope Anchor — Anchored Sit-ups', sets:P(3,12,'full range motion',bw,blk,p2,dl)},
        {name:'Hanging Knee Raises — Pull-up Bar', sets:P(3,10,'controlled, no swinging',bw,blk,p2,dl)},
        {name:'Slam Ball Rotational Slams', sets:P(3,15,'explosive, core engagement',bw,blk,p2,dl)},
      ]
    },
    {
      num: 3,
      label: 'ABS DAY 3 — EXPLOSIVE + ROTATIONAL',
      items: [
        {name:'Landmine Rotation — Explosive', sets:P(3,15,'per side, power',bw,blk,p2,dl)},
        {name:'Slam Ball Overhead Slams', sets:P(3,12,'full power, breath control',bw,blk,p2,dl)},
        {name:'Yoga Ball Decline Crunch', sets:P(3,12,'explosive',bw,blk,p2,dl)},
        {name:'Landmine Side Rotation — Standing', sets:P(3,12,'per side, explosive',bw,blk,p2,dl)},
        {name:'Battle Rope — Core Engaged', sets:P(3,30,'seconds, full power',bw,blk,p2,dl)},
      ]
    }
  ];
}

function getAllAgilityVariants(w){
  const bw=blockWeek(w), blk=getBlock(w), p2=isPhase2(w), dl=DELOAD_WEEKS.has(w);
  return [
    {
      num: 1,
      label: 'AGILITY DAY 1 — LADDER + CONE FOCUS',
      items: [
        {name:'In-In-Out-Out Ladder — Speed', sets:P(4,2,'full length, fast',bw,blk,p2,dl)},
        {name:'Single Leg Ladder Hops — Balance', sets:P(3,2,'per leg, controlled',bw,blk,p2,dl)},
        {name:'Lateral Shuffle Through Ladder — Side to Side', sets:P(4,2,'full length',bw,blk,p2,dl)},
        {name:'Cone 5-10-5 Shuttle Sprint', sets:P(5,1,'max effort, rest 60s',bw,blk,p2,dl)},
        {name:'Cone T-Drill — Change of Direction', sets:P(4,1,'controlled transitions',bw,blk,p2,dl)},
      ]
    },
    {
      num: 2,
      label: 'AGILITY DAY 2 — BOX + MINI HURDLE FOCUS',
      items: [
        {name:'Box Step-Ups — Explosive Drive', sets:P(4,8,'per leg, power focus',bw,blk,p2,dl)},
        {name:'Box Jumps — Varied Heights', sets:P(5,5,'max effort per jump',bw,blk,p2,dl)},
        {name:'Broad Jump to Box — Power Transfer', sets:P(4,3,'explosive landing',bw,blk,p2,dl)},
        {name:'Mini Hurdle Lateral Hops — Side to Side', sets:P(4,10,'per side, rhythm',bw,blk,p2,dl)},
        {name:'Mini Hurdle High Knees — Forward', sets:P(4,15,'drive knees up',bw,blk,p2,dl)},
      ]
    },
    {
      num: 3,
      label: 'AGILITY DAY 3 — SLANT BOARD VARIANTS',
      items: [
        {name:'Slant Board Single Leg Holds — Balance Challenge', sets:P(3,45,'seconds per leg, eyes closed',bw,blk,p2,dl)},
        {name:'Slant Board Lateral Walks — Resistance Band', sets:P(3,12,'per direction, controlled',bw,blk,p2,dl)},
        {name:'Slant Board Calf Raises — Heavy', sets:P(4,12,'max range',bw,blk,p2,dl)},
        {name:'Slant Board Squats — Full Range', sets:P(3,10,'deep, slow tempo',bw,blk,p2,dl)},
        {name:'Slant Board Side-to-Side Hops — Explosive', sets:P(4,10,'quick transitions, rhythm',bw,blk,p2,dl)},
      ]
    }
  ];
}

function weekProgNote(w){
  const bw=blockWeek(w), blk=getBlock(w), p2=isPhase2(w), dl=DELOAD_WEEKS.has(w);
  if(dl) return{title:'🟡 DELOAD WEEK — Mandatory Recovery',body:'Cut all lifting sets by 2 and use ~60% weight. Morning cardio stays consistent. No PRs, no grinding. Your body gets stronger during rest — skipping deload is the fastest way to stall progress.'};
  const bNotes={A:'BLOCK A FOCUS: Control every rep. Build the motor pattern. Track starting weights — everything progresses from here. Morning agility stays sharp.',B:'BLOCK B FOCUS: Bar speed is the goal. Move weight fast. DG technique work focuses on whip and lag. Cardio base builds aerobic capacity.',C:'BLOCK C FOCUS: Load the bar. Lower reps, more weight, PRs this block. Translate raw strength to disc spin. Functional work gets heavier.',D:'BLOCK D FOCUS: Everything becomes athletic. Lower volume, higher intent. DG throws increase to 70-80% intensity. Grip strength at peak.'};
  const wNotes=['','WEEK 1 OF BLOCK — Establish baseline. Learn the movements at these loads. Record every weight used.','WEEK 2 OF BLOCK — Add 1 set to all main lifts. Push slightly past comfort.','WEEK 3 OF BLOCK — Max volume week. Add 2 sets. Go after PRs. This is your peak week.',''];
  return{title:`📈 2-A-DAYS — ${p2?'PHASE 2 — ':''}BLOCK ${blk} — WEEK ${bw}/4`,body:`${wNotes[bw]||''} ${bNotes[blk]}`};
}
