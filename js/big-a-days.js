// ================================================================
//  BIG A — 8-WEEK FULL BODY STRENGTH PROGRAM
//  buildDays() + weekProgNote()
//  Strength, Stability, Mobility. ~35 min/workout, 6 days/week
//  Equipment: Squat/Trap Bar, Pull-up Bar, Rack, Box, Landmine, Treadmill
//  Requires engine.js loaded first.
// ================================================================

// Override engine for 8-week cycle
const DELOAD_WEEKS_8 = new Set([4, 8]);

function blockWeek8(w) {
  return ((w - 1) % 4) + 1;
}

function getBlock8(w) {
  if (w <= 4) return 'A';
  return 'B';
}

function isPhase2_8(w) {
  return w > 4;
}

function P8(baseSets, baseReps, note, bw, blk, p2, dl) {
  if (dl) return `${Math.max(2, baseSets - 2)}×${baseReps} @ 60%`;
  let s = baseSets, r = baseReps, tag = '';
  if (bw === 2) s = baseSets + 1;
  if (bw === 3) s = baseSets + 2;
  if (blk === 'B') tag = ' — heavy';
  if (blk === 'B' && bw === 3) s = Math.max(3, baseSets + 1);
  const noteStr = note ? ` (${note})` : '';
  return `${s}×${r}${tag}${noteStr}`;
}

function CT8(base, bw, dl) {
  if (dl) return `${base} min easy`;
  let t = base;
  if (bw >= 2) t += 3;
  if (bw === 3) t += 3;
  if (t > 55) t = 55;
  return `${t} min`;
}

function buildDays(w) {
  const bw = blockWeek8(w);
  const blk = getBlock8(w);
  const p2 = isPhase2_8(w);
  const dl = DELOAD_WEEKS_8.has(w);
  const isB = blk === 'B';

  return {
    monday: {
      name: 'MONDAY',
      tag: 'Lower Body + Stability',
      tagClass: 'tag-lower',
      segments: {
        cardio: {
          label: 'WARM-UP',
          color: 'cardio',
          items: [
            { name: 'Treadmill Walk or Light Jog', sets: '5 min' },
            { name: 'Leg Swings + Hip Circles', sets: '3 min' }
          ]
        },
        yoga: {
          label: 'MOBILITY PREP',
          color: 'yoga',
          items: [
            { name: 'Cat-Cow + Hip Flexor Stretch', sets: '2 min' },
            { name: 'Glute Activation — Clamshells', sets: '2×12 per side' },
            { name: 'Ankle Mobility — Circles + Dorsiflexion', sets: '2 min' }
          ]
        },
        dg: {
          label: 'MAIN LIFT — Squat Pattern',
          color: 'dg',
          items: [
            {
              name: 'Back Squat or Trap Bar Squat — Box if needed',
              sets: P8(4, 6, 'build form, add weight each set', bw, blk, p2, dl)
            },
            {
              name: 'Pause Squat — 2s hold at bottom',
              sets: P8(3, 5, 'stability focus', bw, blk, p2, dl)
            }
          ]
        },
        lift: {
          label: 'ACCESSORY + CONDITIONING',
          color: 'lift',
          items: [
            {
              name: 'Landmine Split Squat — Single Leg',
              sets: P8(3, 8, 'per leg', bw, blk, p2, dl)
            },
            {
              name: 'Nordic Curl Negatives — Eccentric Focus',
              sets: P8(2, 5, '4-5s lowering', bw, blk, p2, dl)
            },
            {
              name: 'Dead Bug Hold — Core Stability',
              sets: dl ? '2×30s' : '3×40s'
            },
            { name: 'Box Step-Ups — Controlled', sets: P8(2, 8, 'per leg', bw, blk, p2, dl) }
          ]
        }
      }
    },
    tuesday: {
      name: 'TUESDAY',
      tag: 'Upper Push + Stability',
      tagClass: 'tag-upper',
      segments: {
        cardio: {
          label: 'WARM-UP',
          color: 'cardio',
          items: [
            { name: 'Jump Rope or Rowing Machine', sets: '5 min' },
            { name: 'Band Pull-Aparts + Arm Circles', sets: '2 min' }
          ]
        },
        yoga: {
          label: 'MOBILITY PREP',
          color: 'yoga',
          items: [
            { name: 'Shoulder Capsule Stretch — Cross-Body', sets: '2 min per side' },
            { name: 'Thoracic Rotation on Foam Roller', sets: '2 min' },
            { name: 'Wrist Circles + Forearm Stretch', sets: '1 min' }
          ]
        },
        dg: {
          label: 'MAIN LIFT — Press Pattern',
          color: 'dg',
          items: [
            {
              name: 'Bench Press or Dumbbell Press',
              sets: P8(4, 6, 'build stability and control', bw, blk, p2, dl)
            },
            {
              name: 'Landmine Press — Single Arm',
              sets: P8(3, 8, 'per side, anti-rotation', bw, blk, p2, dl)
            }
          ]
        },
        lift: {
          label: 'ACCESSORY + CONDITIONING',
          color: 'lift',
          items: [
            {
              name: 'Overhead Press — Barbell or Dumbbell',
              sets: P8(3, 8, '', bw, blk, p2, dl)
            },
            {
              name: 'Dumbbell Fly or Machine Fly',
              sets: P8(3, 10, 'chest stability', bw, blk, p2, dl)
            },
            {
              name: 'Plank Hold — Front or Side',
              sets: dl ? '2×30s' : '3×45s'
            },
            { name: 'Dumbbell Lateral Raise', sets: P8(2, 12, '', bw, blk, p2, dl) }
          ]
        }
      }
    },
    wednesday: {
      name: 'WEDNESDAY',
      tag: 'Conditioning + Core',
      tagClass: 'tag-recovery',
      segments: {
        cardio: {
          label: 'CONDITIONING WORK',
          color: 'cardio',
          items: [
            { name: 'Treadmill Intervals', sets: dl ? '15 min easy' : CT8(20, bw, dl) },
            {
              name: 'If using intervals: 30s hard / 90s easy × 6 rounds',
              sets: 'or 25 min steady moderate'
            }
          ]
        },
        yoga: {
          label: 'MOBILITY FOCUS',
          color: 'yoga',
          items: [
            { name: 'Full-Body Stretch Sequence', sets: '10 min' },
            { name: 'Hip Flexor + Hamstring Deep Stretch', sets: '4 min' },
            { name: 'Thoracic Rotation + Spine Mobility', sets: '3 min' }
          ]
        },
        dg: {
          label: 'ACTIVE RECOVERY',
          color: 'dg',
          items: [
            { name: 'Foam Roll — Quads, Calves, Lats', sets: '5 min' },
            { name: 'Lacrosse Ball Release — Glutes, Rhomboids', sets: '3 min' }
          ]
        },
        lift: {
          label: 'CORE CIRCUIT — 2 Rounds',
          color: 'lift',
          items: [
            { name: 'Ab Wheel Rollout or Stability Ball', sets: '×10' },
            { name: 'Pallof Press — Anti-Rotation', sets: '×8 per side' },
            { name: 'Bird Dog Hold', sets: '×20s per side' },
            { name: 'Dead Bug', sets: '×15' }
          ]
        }
      }
    },
    thursday: {
      name: 'THURSDAY',
      tag: 'Lower Power + Trap Bar',
      tagClass: 'tag-explosive',
      segments: {
        cardio: {
          label: 'ACTIVATION',
          color: 'cardio',
          items: [
            { name: 'Treadmill Walk + Dynamic Leg Swings', sets: '5 min' },
            { name: 'Inchworm + Glute Bridges', sets: '2 min' }
          ]
        },
        yoga: {
          label: 'DYNAMIC WARM-UP',
          color: 'yoga',
          items: [
            { name: 'Hip Mobility Flows', sets: '3 min' },
            { name: 'Quad + Calf Active Stretches', sets: '2 min' }
          ]
        },
        dg: {
          label: 'MAIN LIFT — Deadlift Pattern',
          color: 'dg',
          items: [
            {
              name: 'Trap Bar Deadlift or Conventional Deadlift',
              sets: P8(4, 4, 'heavy, perfect form', bw, blk, p2, dl)
            },
            {
              name: 'Single-Leg RDL — Landmine or Dumbbell',
              sets: P8(3, 6, 'per leg, stability', bw, blk, p2, dl)
            }
          ]
        },
        lift: {
          label: 'ACCESSORY + EXPLOSIVE',
          color: 'lift',
          items: [
            {
              name: 'Box Jump — Max Height',
              sets: dl ? '2×3' : '3×5'
            },
            {
              name: 'Landmine Rotational Press — Hip Drive',
              sets: P8(3, 6, 'explosive per side', bw, blk, p2, dl)
            },
            { name: 'Sled Push or Plate Push', sets: P8(2, 8, '20ft', bw, blk, p2, dl) },
            { name: 'Kettlebell Swings', sets: P8(2, 12, '', bw, blk, p2, dl) }
          ]
        }
      }
    },
    friday: {
      name: 'FRIDAY',
      tag: 'Upper Pull + Grip',
      tagClass: 'tag-pull',
      segments: {
        cardio: {
          label: 'WARM-UP',
          color: 'cardio',
          items: [
            { name: 'Jump Rope or Light Bike', sets: '5 min' },
            { name: 'Band Pull-Aparts + Dead Hangs', sets: '2 min' }
          ]
        },
        yoga: {
          label: 'MOBILITY PREP',
          color: 'yoga',
          items: [
            { name: 'Lat Stretch — Dead Hang on Pull-up Bar', sets: '2×30s' },
            { name: 'Bicep + Forearm Flexor Stretch', sets: '2 min' },
            { name: 'Posterior Shoulder Stretch', sets: '2 min per side' }
          ]
        },
        dg: {
          label: 'MAIN LIFT — Pull Pattern',
          color: 'dg',
          items: [
            {
              name: 'Weighted Pull-ups or Assisted Pull-ups',
              sets: P8(4, 4, 'add weight each set', bw, blk, p2, dl)
            },
            {
              name: 'Barbell Rows — Overhand or Underhand',
              sets: P8(4, 6, 'heavy, controlled', bw, blk, p2, dl)
            }
          ]
        },
        lift: {
          label: 'ACCESSORY + GRIP',
          color: 'lift',
          items: [
            {
              name: 'Landmine Row — Single Arm',
              sets: P8(3, 8, 'per side', bw, blk, p2, dl)
            },
            {
              name: 'Dumbbell Row — Single Arm',
              sets: P8(3, 8, 'per side', bw, blk, p2, dl)
            },
            { name: 'Face Pulls — Band or Cable', sets: P8(3, 15, '', bw, blk, p2, dl) },
            {
              name: 'Dead Hang or Towel Hold — Grip Work',
              sets: dl ? '2×20s' : '3×30s'
            }
          ]
        }
      }
    },
    saturday: {
      name: 'SATURDAY',
      tag: 'Full Body Complex',
      tagClass: 'tag-circuit',
      segments: {
        cardio: {
          label: 'WARM-UP',
          color: 'cardio',
          items: [
            { name: 'Treadmill Walk or Jog', sets: '5 min' },
            { name: 'Dynamic Mobility Circuit', sets: '3 min' }
          ]
        },
        yoga: {
          label: 'ACTIVE RECOVERY / STRETCH',
          color: 'yoga',
          items: [
            { name: 'Full-Body Flow Sequence', sets: '8 min' },
            { name: 'Focus Areas: Hips, Shoulders, T-Spine', sets: '2 min' }
          ]
        },
        dg: {
          label: 'MOVEMENT QUALITY',
          color: 'dg',
          items: [
            {
              name: 'Goblet Squat — Tempo (2s down, 1s pause)',
              sets: dl ? '2×10' : '3×12'
            },
            {
              name: 'Push-ups — Perfect Form or Incline',
              sets: dl ? '2×10' : '3×15'
            },
            {
              name: 'Landmine Rotational Slam or Med Ball Throw',
              sets: dl ? '2×6' : '3×8'
            }
          ]
        },
        lift: {
          label: dl ? 'LIGHT CIRCUIT — 2 Rounds' : 'COMPLEX CIRCUIT — 3 Rounds',
          color: 'lift',
          items: [
            { name: 'Box Step-Down with Control', sets: '×8 per leg' },
            { name: 'Landmine Press Alternate', sets: '×6 per side' },
            { name: 'Pull-up Holds or Negatives', sets: '×max' },
            { name: 'Kettlebell Swings', sets: '×10' },
            { name: 'Battle Rope Waves or Mountain Climbers', sets: '×20' },
            { name: 'Ab Wheel', sets: '×8' },
            ...(dl
              ? []
              : [
                  { name: 'Broad Jump or Box Jump', sets: '×5' },
                  { name: 'Dumbbell Lateral Raise Drop Set', sets: '×12 → ×8 light' }
                ])
          ]
        }
      }
    },
    sunday: {
      name: 'SUNDAY',
      tag: 'Rest',
      tagClass: 'tag-rest',
      isRest: true,
      segments: {
        yoga: {
          label: 'ACTIVE RECOVERY — Optional',
          color: 'yoga',
          items: [
            { name: 'Walk 20–30 min outdoors', sets: 'easy pace' },
            { name: 'Full-body foam roll + stretch', sets: '15 min' },
            { name: 'Mobility work on tight areas', sets: '10 min optional' }
          ]
        }
      }
    }
  };
}

function weekProgNote(w) {
  const bw = blockWeek8(w);
  const blk = getBlock8(w);
  const p2 = isPhase2_8(w);
  const dl = DELOAD_WEEKS_8.has(w);

  if (dl) {
    return {
      title: '🟡 DELOAD WEEK — Recovery & Adaptation',
      body: 'Reduce all lifting sets by 2 and use ~60% weight. No PRs. Keep conditioning light and easy. Sleep 8–9 hours and eat well. Deload weeks are when your body actually builds strength. Never skip this.'
    };
  }

  const bNotes = {
    A:
      'BLOCK A FOCUS: Foundation Building. Learn perfect movement patterns. Establish baseline numbers for all lifts. Build stability and movement quality. Progressive overload by adding 1 rep or slight weight increases.',
    B:
      'BLOCK B FOCUS: Strength Emphasis. Lower reps, heavier weight. Chase PRs on main lifts. Mobility and stability have been built — now we build strength. Add 2–3 reps or 5% more weight each week.'
  };

  const wNotes = [
    '',
    'WEEK 1 OF BLOCK — Establish baseline numbers. Perfect form over weight. Log everything.',
    'WEEK 2 OF BLOCK — Add 1 set to main lifts or 1–2 reps. Eat well on training days.',
    'WEEK 3 OF BLOCK — Peak week before deload. Add weight, chase PRs. Sleep 8–9 hours.',
    ''
  ];

  return {
    title: `📈 BLOCK ${blk} — WEEK ${bw}/4`,
    body: `${wNotes[bw] || ''} ${bNotes[blk]}`
  };
}
