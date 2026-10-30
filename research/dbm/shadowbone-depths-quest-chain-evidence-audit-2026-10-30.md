# Shadowbone Depths — additional quest-chain and evidence audit (2026-10-30)

## Release status
Official Conquest Reborn roadmap still lists Shadowbone Depths as **Pale Reach 19 of 19**, **In progress**, with target **30 Oct–8 Nov** (moved from 24 Oct–1 Nov). Not marked Live; release dates provisional.
- https://conquestreborn.com/roadmap.html
- https://conquestreborn.com/

## Confirmed quest progression
- **175118 A Renegade Witch** — Deirdre reveals Rockrend captives' fate and Rooted Shadow threat.
- **175119 Morgwena's Hushed Ones** — cursed Ealdir masks; outside Baile Escada, **not proven dungeon trash**.
- **175120 Great Stag Blessing** — bone amulet and Great Stag blessing to bypass hut wards.
- **175121 Death to the Rook** — Deirdre's poison for Serenya; prerequisite chain.
- **175124 The Assassination That Wasn't** — Serenya's ring to Deirdre.
- **175125 Grimoire of The Witch Mother** — recover grimoire; gameobject **2300695**; directly opens **175126**.
- **175126 Shadowbone Depths** — enter caverns, defeat Morgwena before ritual; Deirdre **164355** quest giver/ender.

Sources: https://db.ascension.gg/?quest=175118 ; https://db.ascension.gg/?quest=175119 ; https://db.ascension.gg/?quest=175120 ; https://db.ascension.gg/?quest=175121 ; https://db.ascension.gg/?quest=175124 ; https://db.ascension.gg/?quest=175125 ; https://db.ascension.gg/?quest=175126

## Nearby related NPCs — not confirmed dungeon encounters
- **Jagged Cave Ealdir 164043** and **Wild Ealdir 164004** mention Morgwena in NPC dialogue; cannot infer these spawn in Shadowbone Depths.
- Deirdre **164355** is a story/quest NPC, not a confirmed boss.
- **Hushed Ealdir** are a separate outdoor quest target; no source establishes dungeon inclusion.
Sources: https://db.ascension.gg/?npc=164043 ; https://db.ascension.gg/?npc=164004 ; https://db.ascension.gg/?npc=164355

## Unresolved
No source-verified dungeon map ID, boss NPC template for Morgwena, additional boss roster, boss spells, phases, timers, difficulty variants, or loot table. Do not import outdoor NPCs as dungeon trash based on lore alone.

## Research next
Search future source commits/SQL for Morgwena creature-template and map-bound spawn; cross-reference dungeon entrance, instance template, and spell scripts. Validate combat mechanics against actual Conquest Reborn runs after release. No addon code changes.
