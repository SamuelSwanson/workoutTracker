// ================================================================
//  MOM FIT 65+ — buildDays() + weekProgNote()
//  Requires engine.js loaded first (P, CT, DELOAD_WEEKS, etc.)
// ================================================================

function buildDays(w){
  const blk=getBlock(w), bw=blockWeek(w), p2=isPhase2(w), dl=DELOAD_WEEKS.has(w);
  const cardioDuration = dl ? 20 : (bw === 4 ? 35 : 30);
  const walkPace = dl ? 'brisk' : 'moderate';
  const toneSets = dl ? '2×12 light' : P(2,10,'',bw,blk,p2,dl);

  return {
    monday:{
      name:'MONDAY', tag:'Treadmill + Walk', tagClass:'tag-cardio',
      segments:{
        cardio:{label:'AEROBIC',color:'cardio',items:[
          {name:'Treadmill Walk (warm-up)', sets:'5 min easy'},
          {name:`Treadmill Walk — ${walkPace}`, sets:`${cardioDuration} min`},
          {name:'Treadmill Incline Walk', sets:dl?'3×5 min low incline':'4×5 min moderate incline'},
        ]},
        yoga:{label:'MOBILITY',color:'yoga',items:[
          {name:'Ankle + Hip Circles with Loop Band', sets:'3×10 each leg'},
          {name:'Cat-Cow + Thread the Needle', sets:'2 rounds'},
          {name:'Standing Chest Openers with Band', sets:'3×12'},
        ]},
      }
    },
    tuesday:{
      name:'TUESDAY', tag:'Core + Bands', tagClass:'tag-lower',
      segments:{
        core:{label:'CORE',color:'dg',items:[
          {name:'Wonder Core Basic Crunches', sets:dl?'2×10':'3×12'},
          {name:'Wonder Core Twists (each side)', sets:dl?'2×8':'3×10'},
          {name:'Plank Hold', sets:dl?'2×20s':'3×30s'},
        ]},
        lift:{label:'LIGHT STRENGTH',color:'lift',items:[
          {name:'Dumbbells — Bicep Curl', sets:toneSets},
          {name:'Dumbbells — Overhead Press', sets:toneSets},
          {name:'Loop Band — Lateral Walks', sets:'3×15 steps each direction'},
          {name:'PT Tube Band — Seated Row', sets:toneSets},
          {name:'Wall Push-ups', sets:dl?'2×10':'3×12'},
        ]},
      }
    },
    wednesday:{
      name:'WEDNESDAY', tag:'Recovery Mobility', tagClass:'tag-recovery',
      segments:{
        yoga:{label:'MOBILITY / RECOVERY',color:'yoga',items:[
          {name:'Chair Yoga Flow', sets:'20 min'},
          {name:'Hip Flexor Stretch with Band', sets:'2×30s each side'},
          {name:'Seated Hamstring Stretch', sets:'2×30s each leg'},
          {name:'Deep Breathing + Mindful Walk', sets:'10 min'},
        ]},
        core:{label:'LIGHT CORE',color:'dg',items:[
          {name:'Bird Dog (kneeling)', sets:'2×10 each side'},
          {name:'Dead Bug (slow)', sets:'2×10 each side'},
        ]},
      }
    },
    thursday:{
      name:'THURSDAY', tag:'Strength + Bands', tagClass:'tag-upper',
      segments:{
        lift:{label:'STRENGTH',color:'lift',items:[
          {name:'Dumbbells — Goblet Squat', sets:toneSets},
          {name:'Loop Band — Good Morning', sets:toneSets},
          {name:'Dumbbells — Seated Row', sets:toneSets},
          {name:'PT Band — Chest Press', sets:toneSets},
          {name:'Wonder Core — Assisted Sit-up', sets:dl?'2×8':'3×10'},
        ]},
        yoga:{label:'MOBILITY',color:'yoga',items:[
          {name:'Shoulder Circles + Band Pull-aparts', sets:'3×12'},
          {name:'Quad Stretch', sets:'2×30s each leg'},
        ]},
      }
    },
    friday:{
      name:'FRIDAY', tag:'Cardio + Stability', tagClass:'tag-pull',
      segments:{
        cardio:{label:'AEROBIC',color:'cardio',items:[
          {name:'Treadmill Walk or Outdoor Walk', sets:`${cardioDuration} min`},
          {name:'Stationary Step-ups', sets:'3×12 each leg'},
        ]},
        core:{label:'BALANCE + CORE',color:'dg',items:[
          {name:'Standing Bird Dog', sets:'3×10 each side'},
          {name:'Side Leg Raise with Ankle Band', sets:'3×12 each side'},
        ]},
      }
    },
    saturday:{
      name:'SATURDAY', tag:'Light Activity', tagClass:'tag-circuit',
      segments:{
        cardio:{label:'ACTIVE RECOVERY',color:'cardio',items:[
          {name:'Leisure Walk + Fresh Air', sets:'20-30 min'},
          {name:'Gentle Stretching', sets:'10 min'},
        ]},
        yoga:{label:'MOBILITY',color:'yoga',items:[
          {name:'Neck + Shoulder Relax', sets:'5 min'},
          {name:'Calf Stretch with Band', sets:'2×30s each'},
        ]},
      }
    },
    sunday:{
      name:'SUNDAY', tag:'Rest Day', tagClass:'tag-rest', isRest:true,
      segments:{
        yoga:{label:'OPTIONAL RECOVERY',color:'yoga',items:[
          {name:'Easy Walk or Gardening', sets:'15-20 min optional'},
          {name:'Breathing + Gentle Meditation', sets:'10 min'},
        ]}
      }
    },
  };
}

function weekProgNote(w){
  const dl=DELOAD_WEEKS.has(w);
  if(dl) return {title:'🔵 RECOVERY WEEK (deload)', body:'Keep intensity light this week: focus on form, mobility, and steady breathing. Reduce load and keep sessions enjoyable.'};

  const p = isPhase2(w)?'Phase 2':'Phase 1';
  return {title:`📅 ${p} — Aim for 5 days this week`, body:'Rate each workout as Low / Good / Perfect. Celebrate completion and consistency. It’s about moving daily, not max effort.'};
}
