# Vaults of the Inquisition — timing constants and trash source audit (2026-10-30)

Primary source: https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/src/server/coa/CoAVaults.cpp

**Source-derived, not live verified.** All trash first casts add random **0–1500 ms** at Reset. First/repeat values in seconds. Cast-time delays can shift execution.

## Deceiver boss constants (source lines 1114–1121)
- `DeceiverCycle = 40s` for Voidflare, inner/outer ring, soak, crystal and Void Wrath.
- `DeceiverRingDelay = 5s` from inner or outer ring telegraph to burst.
- Seal/awakening choreography schedules Holy Cracks at **12s**, Seal Ring **14s**, Roar **15.5s**, Awake **17s**, relative to the relevant seal-break event (not initial pull).
- Do not anchor these pre-engage events to combat start.

## Trash NPC source table (lines 1778–1814)
| NPC | Source name | Spell, first/repeat seconds | Difficulty |
|---|---|---|---|
| 162733 | Torturer | Sword Strike 256918 1/6.5; Fierce Blow 975011 7/9 | All |
| 162734 | Phantasmal Bound | Mana Burn 267007 2.5/16; Silence 267008 7.5/16; Psychic Scream 257166 13/16; Fierce Blow 7/9 | Psychic Scream Heroic+ |
| 162735 | Freed Prisoner | Manifest 257167 4/600; Fierce Blow 7/9 | All |
| 162736 | Wrathful Torment | Endless Affliction 256891 4.5/8; Haunting Wrath 257171 9.5/8; Fierce Blow 7/9 | Haunting Wrath Heroic+ |
| 162737,162759 | Kobold | Pickaxe Strike 257175 4.3/10; Fierce Blow 7/9 | All |
| 162762 | Elite Kobold | Pickaxe Strike 257175 4.7/10; Fierce Blow 7/9 | All |
| 162738 | Brute | Dark Wax Explosion 256893 4.5/19.5; Charge Impact 257186 12.5/19.3; Fierce Blow 7/9 | Charge Heroic+ |
| 162763 | Elite Brute | Dark Wax Explosion 256893 4.5/19.5; Charge Impact 257186 9/19.3; Fierce Blow 7/9 | Charge Heroic+ |
| 163813 | Kobold Flame | Kobold Flame 256892 0.2/2; Fierce Blow 7/9 | All |
| 162748 | Shadow Projection | Lash of the Void 256895 0.5/5, with 1s retry if no valid near target | All |
| 162761 | Corporeal Shadow | Shadowfury 256491 5/16.5; Fierce Blow 7/9 | All |
| 162999 | Confessor Konrad | Mind Blast 256962 2/13; Abyssal Cry 256963 7/13; Fierce Blow 7/9 | All |

**Mechanic notes:** Freed Prisoner Manifest summons a Phantasmal Bound (162734) and kills the prisoner. Brute Charge uses motion and a delayed impact (~1.2s), not an instant spell hit. Shadow Projection attempts Lash within 20 yards and can retry every second on failure. These are source-symbol labels, not independently confirmed creature display names.

## Parallel unresolved investigations
- Frozen Reach custom map 908: location and template confirmed, no spawn-to-AI encounter linkage found.
- Karazhan Crypts: map 0 world teleport identified, no CoA encounter instance/roster confirmed.
- Existing Road to De Other Side three-boss + trash audit remains separate. Preserve distinction between original upstream CoA content and current Conquest Reborn deployment.

No DBM addon modifications.
