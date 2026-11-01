# Questie-X CoA local research inventory

## Data sources present
The installed client contains Questie-X (558 files, ~106.8 MB), Questie-X-WotLKDB (24 files, ~29.8 MB), Questie-X-WotLK-Locale (42 files, ~37.2 MB), Questie-X-AscensionDB (18 files, ~224 KB), and Questie-X-CoADB (7 files, ~528 KB). Also present: pfQuest-ascension (23 files), ZygorGuidesViewerRM (922 files), and CoA-Research-Offline references. These remain in place; the datasets were not duplicated.

Game `Data/Content` contains HandOfFateQuestData.json (~1.5 MB) and WorldMapAreaData.json (~22 KB), among other content datasets. Hand of Fate data is not a complete quest catalog; world map areas alone do not establish transforms or addon marker behavior.

## Evidence boundaries
CoA-specific quest records should be sourced from Questie-X-CoADB and verified for current Conquest Reborn availability. AscensionDB and WotLKDB may include data not present or enabled on this realm. Offline NPC/spell references are marked legacy/unverified by their local policy. Talent files do not constitute a complete verified class/spec registry. No current server exports or runtime UI tests were performed.

## Coverage and gaps
This local inventory confirms the relevant data packages exist, but does not parse their Lua tables into normalized exports. Therefore verified counts for quests, NPCs, objects, items, coordinates, current availability, and custom class/spec restrictions are not claimed. Map frame compatibility, addon conflicts, QX1/QX2 message validation/merging, and actual memory use remain unmeasured.

## Recommended next steps
1. Parse Questie-X-CoADB first, retain each source file and mark records `candidate_CR` pending live check; separately parse AscensionDB and WotLKDB as their own provenance tiers.
2. Extract NPC/object/item/quest relationships and map IDs from their generated database Lua files, retaining source identifiers and confidence.
3. Audit Questie-X message handlers for QX1/QX2 and shared BBLC25C behavior, including validation, chunk reassembly, deduplication and persistence.
4. Profile addon memory by module in-game before redesign; compare cold load, zone transition, map open/close, and GC behavior.
5. Test map markers with each installed map/UI addon and the default client, recording frame transforms and coordinates.
6. Validate custom class/spec restrictions against current CoA sources and controlled in-game quests.

## Performance guidance
Use the installed split databases with lazy zone/module loading; avoid eager copies and duplicate localization tables. Index by numeric quest/NPC/object IDs, reuse marker frames, and update from quest/world-map events. Measure actual memory and frame time before selecting compression or aggressive GC, which can create stutter.
