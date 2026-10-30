# CoA source index

Last cataloged: 2026-10-29. Dates/counts below describe prior inspections, not a live guarantee of completeness.

## Official and core adjacent
| Source | URL | Research use |
| --- | --- | --- |
| CoA AzerothCore repository | https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa | C++ core, modules, world SQL, custom mechanics; contains `modules/mod-ascension`, `modules/mod-spellbook`, `data/coa-world`, `src/server` |
| CoA talents | https://coa-development.org/talents | Class/spec talent presentation; test-realm differences possible |
| Ascension DB website | https://ascension-db.ascension-archive.workers.dev/ | Item, spell, NPC and other archived Ascension reference material |
| CoA server manager | https://github.com/Corfirean/coa-server-manager | Server tooling and setup |
| CoA content scaling | https://github.com/Corfirean/mod-coa-content-scaling | Scaling reference |
| CoA playerbots | https://github.com/Corfirean/mod-coa-playerbots | AI classes, combat ability choices |
| Ascension offline source | https://github.com/Duff-SPP/AcensionOfflineDatabase | db.exil.es offline mirror source referenced by SQL converters |
| GitHub CoA discovery query | https://github.com/search?q=conquest+of+azeroth&type=repositories | Broader repository discovery; many forks |

## Archived and structured databases
| Repository | URL | Research use |
| --- | --- | --- |
| Ascension SQL conversions | https://github.com/DealsBeam/ascension-db | Seven SQL files, spells/ranks, NPCs, items, quests; see limitations |
| Preserved CoA data | https://github.com/Bharph/coa-preservation-data | Changelogs, spell tooltips, class spellbooks, WDB/client cache records; may use external packs |
| CoA Databank | https://github.com/f3rr311/CoA-Databank | CoABuildHub scrape, DBC/MPQ palette, provenance |
| Ascension data archive | https://github.com/hertigservices/ascension-data | Independent archive / conversion, compare provenance |
| CoA datamine | https://github.com/srhinos/coa-datamine | Client data / DBC investigation; inspect before assuming availability |
| CoA DB tools | https://github.com/codesage24/ConquestOfAzerothDb | Tools for Ascension database |
| Ascension armory | https://github.com/IOUJared/ascension-armory | Gear planning and comparison |
| Ascension Score DB | https://github.com/DungeonV/AscensionScoreDB | Rating / scores |
| CoA Reborn class study | https://github.com/Shadowjp2026/coa-reborn-classes | Class research project; not an authoritative client export |
| CoA talent scrape tools | https://github.com/v1cferr/ascension-coa-scraper | Normalize talent trees into JSON |
| CoA ability extractor lead | https://github.com/johnayoung/coa-arena | Examine exact source and compatibility before accepting extracted ability mappings |

## Historic BisBeard / builds
| Source | URL | Notes |
| --- | --- | --- |
| Discontinued CoA BisBeard | https://coa.bisbeard.com/ | Historical endpoint; availability not guaranteed |
| BisBeard root | https://bisbeard.com/ | Parent website |
| CoA tier list raw captures | https://github.com/Ryansousa10/coa-tier-list/tree/main/tools/data/raw | `bisbeard-items-p1.json`, `bisbeard-items-p2.json`, `bisbeard-meta.json`, combat and rankings captures |
| BisBeard extraction script | https://github.com/Ryansousa10/coa-tier-list/blob/main/tools/scrape/bisbeard.mjs | Historical request/scraping logic |
| BisBeard glyph dataset | https://github.com/kevinvongmany/bisbeard-db | `glyphs_ascension.ts` (observed ~509 KB) |
| BisBuddy | https://github.com/Leemo94/BisBuddy | BisBeard-adjacent tool |
| CoA DPS sim | https://github.com/kaderos/coa-dps-sim | Felsworn Infernal example |

## Combat, raid and UI reference projects
| Project | URL |
| --- | --- |
| CoA Molten Core restoration notes (published evidence from a 54-log live CoA corpus; raw logs excluded from public repo) | https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/docs/coa/molten-core.md#evidence-live-combat-logs |
| Reddit CoA Mythic record-count snapshot (community transcription, Aug 2 2026; not raw reports) | https://www.reddit.com/r/ProjectAscension/comments/1vdlzds/class_statistics/ |
| Reddit Week 1 Molten Core Normal Lucifron class/spec parse counts (Aug 12 2026; source total mismatch is flagged on BoneArchive) | https://www.reddit.com/r/ProjectAscension/comments/1vm1c7o/week_1_molten_core_normal_class_statistics/ |
| FangYuanWoW Ascension Logs Uploader / Companion (upload and combatant-metadata tooling; not a public log dump) | https://github.com/FangYuanWoW/ascension-logs-uploader |
| CoA Build Hub community-vote meta announcement (37 builds reported Jul 17 2026; not log-derived) | https://www.reddit.com/r/ProjectAscension/comments/1uz0jox/coa_build_hub_update_meta_tier_list_is_live_37/ |
| Preserved CoA Build Hub scrape mirror (128 identity-stripped builds; captured Jul 31 2026) | https://github.com/hertigservices/ascension-data/tree/main/supplemental/coa-databank/166001399306e4fb022116fe1e3cfbbd7bd4bf37/coabuildhub/builds |
| Method Raid Tools (community CoA) | https://github.com/ArgonautCaptain/Method-Raid-Tools-Ascension-CoA |
| CoAAnalytics | https://github.com/265ada/CoAAnalytics |
| CoA Raid Tool | https://github.com/Voxikai/CoA-Raid-Tool |
| CoACooldownManager | https://github.com/WoloUI/CoACooldownManager |
| CoAInspectTree | https://github.com/WoloUI/CoAInspectTree |
| Tinker utility addon | https://github.com/Minnona/Minn-Tinkers |
| CoA WeakAuras | https://github.com/Zillas/coa-weakauras |
| CoA combat tool | https://github.com/HighOnGames/CoACombat |
| CoA LootCollector community fork | https://github.com/Trollmingo/CoA-LootCollector |
| Questie CoA community | https://github.com/Dandenas/coa-questie |
| CoA UI | https://github.com/Fanatiques/CoA-UI |
| Modern SpellBook CoA | https://github.com/Sleepywalker69/ModernSpellBook-CoA-Ascension |
| CoA Talent Preview | https://github.com/Allerias-Forge/CoATalentPreview |

## User's addon repositories
Maintainer: **Uncle Bone**, GitHub: https://github.com/downingwow

- [Details](https://github.com/downingwow/Details) — combat meter
- [BoneUI](https://github.com/downingwow/BoneUI) — standalone UI replacement
- [SilverDragon](https://github.com/downingwow/SilverDragon) — rare tracking
- [CoA-Research](https://github.com/downingwow/CoA-Research) — this research hub

Other named projects in development: DBM-CoA, MRT-CoA, Questie-X, LootCollector, Zygor-CoA, ElvUI-CoA, FojjiCore-CoA, Leatrix Plus CoA, UncleGPT. Link their exact repositories only after confirmed rather than guessing URLs.
