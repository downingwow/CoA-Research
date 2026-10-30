# Road to De Other Side — three-boss direct C++ mechanics audit (2026-10-30)

**Map 937.** Inspected upstream `src/server/coa/CoAOtherSideMuzah.cpp` (816 lines), `CoAOtherSideDrakmath.cpp` (787 lines), and `CoAOtherSideEmbryo.cpp` (926 lines) in [Conquest-of-AzerothCore](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/tree/main/src/server/coa). These are **upstream source schedules, not live Conquest Reborn measurements**. EventMap delays during casts or state transitions.

## Muzah — NPC 162711
Source `CoAOtherSideMuzah.cpp` lines 39–66, 195–215, 245–347.
- Pull: casts **Whirling Glaives 256887** immediately. Schedules leap after `GlaiveCastMs + 5000ms` (repeat **25s**, potentially delayed by Cobra series), web first **20s** (repeat **20s**, also delayed during series), Fierce Blow **975011** initially **10–15s** (repeat **20–30s**), Glaive Strike at **15s**.
- **Mythic/Epic-only Glaive Strike**: `EVENT_GLAIVE_STRIKE` skips other difficulties; second strike **3s** later; repeat **20s**. Spell **257029** in enum; swirl helper NPC **162779** can cast it, so don't attribute all casts to Muzah.
- Web spell variants **256834 / 257039 / 257040** (Normal/Heroic/Mythic); Cobra Shot **256929 / 257030 / 257031**. After landing, Cobra sequence fires at tank then random targets; target marker **256964**.
- Bat/swirl check repeats **10s**; if all bats dead, casts Summon Bats **256904**, returns bats after **5.1s**. Bat NPCs **162777, 162778**; glaive NPC **162744**.
- Health **90%, 40%, 10%** are **dialogue thresholds**, not proven combat phase transitions.

## Drak'math — NPC 162715
Source `CoAOtherSideDrakmath.cpp` lines 30–55, 161–183, 220–320, 447–483.
- Pull: Parasitism **256867 / 257054 / 257055** first **7s**, repeat **55s** (busy state retries **1s**); Fierce Blow **975011** first **9s**, repeat **45s** (skipped while busy); Sink first **15s**.
- **Sunk phase is immune to damage** (`DamageTaken` sets damage to zero), becomes nonattackable/nonselectable, casts Submerged **256850**. Schedules submerged stage **600ms** after Sink; side pillars **2s** after submerged, rise **10s** after submerged, side pillar fade/burst **4s** after side pillars.
- After Rise, beam begins **1s** later: Death Beam **256858**, beam walker/pillars start **5s** later, missile markers fire **every 1s** during beam. Helpers: pillar **162727**, orb **162728**. Necrotic Explosion variants **256857 / 257057 / 257058**, Death Missile Hit variants **256864 / 257051 / 257052**.
- **Do not run continuous fixed pull timers across submerged/beam phases.**

## Chimeric Embryo — roster NPC 162716
Source `CoAOtherSideEmbryo.cpp` lines 30–61, 205–219, 274–325, 740–744. Boss NPC ID from the existing roster; source snippet here does not independently prove creature-template binding.
- Ground phase pull: Spikes **256878 / 257182 / 257183** first **5s**, repeat **20s**; Fierce Blow **975011** first **10s**, repeat **14s**.
- At **50% HP**, while in Ground phase, flags **Egg phase** (starts after casting ends). Egg phase includes Nova **256873** every **3s**, Ritual **256872 / 256965 / 256967**, swirling poison, blobs, egg rain (repeat **3s**) and spider helpers.
- After landing, timers are **reseeded**: Spikes **5s** / repeat **20s**; Web Lines **3s** / repeat **10s**; Poison Bolt **256882 / 257063 / 257064** **8s** / repeat **10s**; Fierce Blow **10s** / repeat **14s**.
- Helpers: controller **162731**, poison zone **162739**, web mark **162740**, web **162741**, spider **162743**, spike **162973**, egg **9370010**. Distinguish helper effects from boss casts.

## Important research distinctions
- Spell variants follow source Normal/Heroic/Mythic difficulty selection, not verified live behavior.
- Initial schedules do not equal observed cast times. Boss states, busy retries and cinematic phases shift timers.
- Source-only research should be labeled **high source confidence / unknown live deployment**.
- No Karazhan Crypts boss AI was identified in this particular targeted source-tree pass; do not fabricate a roster.
- Frozen Reach/Manastorm has separate module and event architecture; do not equate generic Manastorm progression code with a verified Frozen Reach boss kit.

## Next work
Extract exact egg phase offsets and Drak'math beam constants, investigate Road to De Other Side SQL spell-script registrations, then extend machine-readable canonical NPC/spell records. No DBM addon code changed.
