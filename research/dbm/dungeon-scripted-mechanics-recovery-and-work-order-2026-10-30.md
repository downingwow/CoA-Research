# Dungeon missing-mechanics recovery — scripted encounter cross-reference (2026-10-30)

## Purpose and limits
Follow-up to `dungeon-encounter-to-mechanics-gap-audit-2026-10-30.md`. That audit found 169 credited NPCs with **no exact ID match in one 64-record boss-kit SQL dataset**. Here we cross-reference the saved upstream scripted-boss extracts; a script can contain mechanics even when the SQL kit has no entry. **This is a partial scripted-source pass, not a complete audit of every archived script, datamine or combat log.**

## Newly recovered evidence outside the SQL boss-kit
| Dungeon | Credited NPC | Boss | Preserved script | Mechanics / spell IDs | Evidence |
|---|---:|---|---|---|---|
| Scholomance | 16118 | Kormok | `src/server/scripts/EasternKingdoms/Scholomance/boss_kormok.cpp` | Shadowbolt Volley **20741**, Bone Shield **27688**, Summon Bone Mages **27695** (subspells **27696–27699**), Summon Bone Minions **27687** (subspells **27690–27693**) | Script enum and DoCast statements; not live verified |
| Dire Maul | 16097 | Isalien **Trigger** (encounter-credit name) | `src/server/scripts/Kalimdor/DireMaul/boss_isalien.cpp` | Call Empyrean **27639**, Multi-Shot **14443**, Net **12024**, Starshards **27636**, Regrowth **27637** | **Name-based candidate match only**; encounter-credit NPC 16097 is labeled Isalien Trigger, so confirm actual summoned boss NPC before joining by ID |

Kormok is a **high-confidence name-and-instance script match** but the NPC ID itself was obtained from the encounter-credit migration, not directly confirmed in the saved script excerpt. Isalien is **ambiguous** because the credited NPC is explicitly a trigger.

## Existing script support for bosses already in SQL kit
- **Mr. Smite (646), Deadmines:** `boss_mr_smite.cpp` has Smite Stomp **2102575**, Fierce Blow **975011**, Stunning Strike **2102553**, Smite Rush **2102576**, Retaliation **2102577**, Rupture **2102580**. Script schedules Fierce Blow initially 8.4s, Stunning Strike 14–18s, Rupture 12–15s; **these differ from some candidate SQL-kit initial windows** and must not be silently merged.
- **Darkmaster Gandling (1853), Scholomance:** `boss_darkmaster_gandling.cpp` defines Arcane Missiles **15790**, Curse of the Darkmaster **18702**, Shadow Shield **12040**, Shadow Portal **17950**, plus room portal spells **17863, 17939, 17943, 17944, 17946, 17948**. These coexist with the SQL-kit CoA spells **2100397, 2100398, 2100389, 2100393**; **possible different implementations or overrides**, not automatically one simultaneous ability kit.

## Source files examined in this batch
- `research/dbm/dungeon-boss-mechanics-mass-extraction-18-encounters-2026-10-30.json`
- `research/dbm/scripted-dungeon-boss-mechanics-batch-2026-10-30.json`
- `research/dbm/coa-dungeon-boss-kit-timers-2026-10-30.json`
- `research/dbm/dungeon-encounter-to-mechanics-gap-audit-2026-10-30.md`

The first scripted batch also includes Apothecary Hummel (Shadowfang Keep seasonal event), whose presence is **not evidence of a match** in the Heroic/Mythic encounter-credit migration. Other extracted files in these batches include Northrend, Outland and Cataclysm/Culling scripts and must not be counted toward the scoped classic dungeon roster without explicit mapping.

## Updated gap interpretation
- Original **169** = no exact NPC-ID match in the 64-record SQL kit, **not 169 bosses without mechanics**.
- **Kormok** now has an additional recovered scripted mechanic source.
- **Isalien** has a plausible scripted mechanic source but trigger-to-boss identity is unresolved.
- These recoveries do **not** justify subtracting from 169 as a fully verified all-source missing count; a comprehensive all-source join is still needed.
- Boss names, difficulty overrides, spell IDs and active implementation on current Conquest Reborn remain subject to verification.

## Ordered remaining research work
1. **Extract all in-scope boss scripts** across archived source files; match boss IDs and script names to encounter-credit rows, explicitly distinguishing trigger NPCs and summons.
2. **Reconcile conflicting implementations** (Mr. Smite and Gandling are immediate examples): compare SQL, C++, historical logs and Exiles data; record source precedence.
3. **Complete custom dungeon mechanics** for Vaults of the Inquisition (936), Road to De Other Side (937), Frozen Reach (908) and Karazhan Crypts (1807).
4. **Audit difficulty-specific mechanics** for Normal, Heroic, Mythic and Mythic+ using separate source tables and observed logs where available.
5. **Create a canonical per-boss evidence table** with spell ID, source, difficulty, confidence, and unresolved flags; keep provenance per field.
6. **Seek current Conquest Reborn combat-log verification** for unresolved boss spells and timing, after research-only source work is exhausted.
7. **Publish a final evidence freeze** for use in the separate DBM-CoA development chat; do not implement addon changes here.
