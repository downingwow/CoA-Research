# Road to De Other Side — trash mechanics direct source audit (2026-10-30)

Source: [CoAOtherSideTrash.cpp](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/src/server/coa/CoAOtherSideTrash.cpp), 335 lines. **Upstream source schedules only, not verified live Conquest Reborn casts.**

## NPC-to-ability mappings
All initial timers add **0–1.5s random jitter** in Reset; schedules may slip while casting. Listed numbers below are base first/repeat seconds.

| NPC entry | Role (source symbol) | Spell IDs, first/repeat (s) |
|---|---|---|
| 162765, 162776, 162783 | Wanderers | Decaying Hemorrhage 256905 (4/7); Fierce Blow 975011 (6/8) |
| 162769 | Matriarch | Sting 256909 (3/8); Brood Empowerment 257200 (1/2.5); Fierce Blow 975011 (6/8); Brood State 257201 on engage |
| 162770, 162743 | Spider / spider add | Fierce Blow 975011 (6/8) |
| 162773, 162775 | Gutdevourers | Bite 256906 (3/8); Venomous Breath 256907 (10/26); Fierce Blow 975011 (6/8) |
| 162780, 162982 | Cultists | Rend Flesh 256938 (4/9); Fierce Blow 975011 (6/8) |
| 162983 | Shield cultist | Shield Bash 256939 (5/9); Fierce Blow 975011 (6/8) |
| 162782 | Hisser | Toxic Expulsion 257203 (4/8); Fierce Blow 975011 (6/8) |
| 162784 | Swarm | Biting Cloud 257202 (1/2.5) **Heroic and Mythic/Epic only**; Fierce Blow 975011 (6/8) |
| 162785 | Watcher | Fissure Strike 256110 (5/8); Fierce Blow 975011 (6/8) |
| 162979, 162980 | Lifedrinkers | Fierce Blow 975011 (6/8); Engorged 257198 on direct damage dealt |

## Mechanics requiring specialized handling
- Fissure Strike **256110** uses custom after-cast player checks; Earth Strike **256109** damage applies within a **20-yard forward length** and **2-yard half-width**, excluding players more than **5 yards** vertically from caster. Avoid treating as an ordinary circle.
- Brood Empowerment **257200** filters targets to spider NPCs **162770 / 162743** within **30 yards**.
- Swarm Biting Cloud **257202** is absent on Normal in this implementation.
- Difficulty mapping: normal, heroic, and `DUNGEON_DIFFICULTY_EPIC` (source calls Mythic).
- Matriarch Brood State is applied on combat engage. Wanderer speech is probabilistic, not a reliable encounter timer.

## Caveats
- Source symbol names are not verified in-game creature display names.
- Spell and aura damage scaling is implemented separately; don't mistake damage tuning for a new cast.
- Shared Fierce Blow should not be displayed as a boss-only ability.
- This adds **trash**, not another boss. No changes to DBM-CoA.

## Other simultaneous tracks
Frozen Reach map 908 still lacks linked spawn/template/AI evidence in available targeted source searches. Karazhan Crypts still lacks CoA-specific encounter proof. Canonical boss database remains at `research/dbm/custom-dungeons-canonical-v1-2026-10-30.json`; keep trash in a distinct dataset to avoid conflation.
