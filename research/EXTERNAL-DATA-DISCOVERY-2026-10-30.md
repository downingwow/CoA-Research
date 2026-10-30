# CoA external data discovery — 2026-10-30

This is a verified **source inventory**, not a claim that the source datasets have been downloaded, mirrored, or validated against Conquest Reborn. Preserve provenance, license, snapshot date, realm/version, and raw identifiers when importing. Never infer live mechanics solely from client DBC data.

| Source | URL | Useful data | Caveats |
|---|---|---|---|
| CoA datamine | https://github.com/srhinos/coa-datamine | 368 client tables, 7,467,710 raw rows, spell/class/client Lua data, multiple realm variants | Its default Spell table can select Free-Pick overlay; explicitly select CoA/base-chain variant |
| Ascension data | https://github.com/hertigservices/ascension-data | BisBeard, Exiles DB mirror, PostgreSQL/CSV export, spawn coords, loot, Worldforged, CoA Databank | Check licenses, mirror dates, schema, and source-specific attribution before importing |
| Preservation data | https://github.com/Bharph/coa-preservation-data | 180k spell tooltip captures, 70k changelog entries, client content, 21 class spellbooks, WDB | Tooltip captures are not effect definitions; WDB is not spawn coordinate data |
| CoA Arena | https://github.com/johnayoung/coa-arena | Extracted class abilities, all_abilities.csv, arena role categorization, DPS/healer analysis | Role categories are heuristic |
| CoA Atlas | https://github.com/BlakeDonn/coa_classes | Class/spec research, talent snapshot, Chronomancer loot guide | Community synthesis; verify per spec |
| CoA Questie | https://github.com/Dandenas/coa-questie | Quest and map addon datasets, NPC/object/item data and exporter tools | Snapshot tied to a particular core revision |
| CoA database tools | https://github.com/pbozic/coa-db | Ascension database scrapers, recipes, reagents, item icons and export pipeline | Confirm source availability and parser accuracy |
| CoA Docker | https://github.com/d3athbl0w/CoA-Docker | DBC and world geometry asset provenance | Large binary files; do not blindly mirror |
| CoA Development | https://coa-development.org/ | Live emulator class pages, item/spell database, changelogs, armory, statistics, roadmap | Test realm; do not conflate with Conquest Reborn |
| CoA core | https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa | Server-side implementations, SQL, mechanics | Core behavior may differ by branch/deployment |

## Ingestion order
1. Inspect licenses, file sizes, branches, and schema; capture commit SHAs and timestamps.
2. Build separate indexes for spells, spell ranks, talents, class/spec mapping, NPCs, items, loot, quests, objects, and coordinates. Use stable IDs and provenance.
3. Reconcile renamed classes and realm-specific table variants before joining records.
4. Cross-reference spell tooltip captures against actual DBC and server implementation. Label inferred effects.
5. Cross-reference loot and spawn records against server SQL and observed client data. Do not treat WDB existence as proof of location.
6. Export compact, indexed, static site data rather than multi-GB raw data to Cloudflare Worker assets.
7. Maintain historical snapshots separately from current builds and identify the source/date for every displayed ranking.

## Data quality guardrails
- Never infer resource types or class armor proficiencies from generic armory stat panes.
- Do not call a spec priority or BiS list verified without source, patch, content context, and method.
- Preserve original upstream notices and license terms.
- Public source links are not proof of mirroring; this document is discovery only.
