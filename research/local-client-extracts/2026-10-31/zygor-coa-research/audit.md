# Zygor-CoA Pale Reach research package

## Source extraction
Parsed all 237 quest rows from `C:\Games\Conquest Reborn\Interface\AddOns\Questie-X-CoADB\Data\PaleReachData.lua`. Extracted quest ID, name, zone ID, level/minimum level fields when present, prerequisite IDs from `[13]`, source raw Lua record, and coordinate entries in `[27]` structures. Counts: 237 quests, 134 prerequisite edges, 41 coordinate records. Source coordinate records cover 14 distinct quests. CoA world DB-derived data; current live availability not independently tested.

## Guide and loader
Existing Zygor uses `ZygorGuidesViewer:RegisterGuide(name, [[...` and the addon TOC loads `Guides\\Autoload.xml`; guide file locations are managed by the native guide loader. The installed `Guides/CoA/PaleReach.lua` only has three separate references and explicitly says it is not a complete route. Generated `PaleReach.lua` is one guide checklist with source-derived waypoints where present. Its numeric quest order is not asserted as route order and must not be represented as complete verified route yet.

## Important gaps
Questie data does not provide all pickup/turn-in/objective locations as guide-ready named destinations. NPC/object tables primarily encode quest associations rather than full coordinates in the files examined. Only 14/237 quests have coordinate records extracted. Current realm availability, objective completion semantics, route order, branches, and scaling mode detection remain unverified. 18-60 scaling applies only when scaling is enabled per supplied project brief; no local client API for detection was confirmed.

## Validation status
Static extraction completed; no in-game registration, waypoint-arrow, browser visibility, progression, or partial-completion testing performed. Do not integrate as a production-complete route until in-game tests pass. No existing addon files were modified.
