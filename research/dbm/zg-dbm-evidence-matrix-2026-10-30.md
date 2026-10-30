# Zul'Gurub DBM evidence matrix — 2026-10-30

Source: research/dbm/coa-zulgurub-pr9139-updated-9-boss-scripts-and-audit-2026-10-30.json, containing a restoration audit comparing historical CoA combat logs and proposed scripts. Restoration PR #9139 was described as unbuilt and untested. **These are historical observations, not confirmed current Conquest Reborn timers.**

| Boss | NPC | Historical log timing observations | Current CR verification |
|---|---:|---|---|
| Jeklik | 14517 | Mass Fear ~44s; Greater Heal first ~21s; Call of Hir'eek first ~22s | Needed |
| Venoxis | 14507 | Renew ~28s; Holy Nova ~17s | Needed |
| Mar'li | 14510 | Web Spray ~45s; Poison Shock ~45s; Burrow 2118140; Poison Nova 2118150 | Needed |
| Thekal | 14509 | Disrupting Shout ~25.8s; War Stomp / Speed Slash ~40s | Needed |
| Arlokk | 14515 | Claw Storm ~55s | Needed |
| Mandokir | 11382 | Mortal Strike ~12s | Needed |
| Hakkar | 14834 | Blood Scythe ~15s; Blood Siphon first ~59.5s, next ~79.5s; Pool of Corrupted Blood 2118607 | Needed |
| Gri'lek | 15082 | Ground Slam first ~24s, repeat ~25s; encounter not completed in source log | Needed |
| Jin'do | 11380 | Not present in cited clear | Needed |
| Gahz'ranka | 15114 | Not present in cited clear | Needed |
| Other Edge of Madness | 15083–15085 | Not present in cited clear | Needed |

## Adds and supporting mechanics
- Lor'Khan (11347): Greater Heal 2118260; Storm Shield 2118261–2118263; Holy Ward 2760204.
- Zath (11348): Sinister Strike 2118250; Blind 2118252; Disarm 2118255.
- Ohgan (14988): Shred Armor 2106616; Dash 2106617.
- Chained Spirit (15117): Resurrection 2118426.
- Spawn of Mar'li (15041): Growth 2118117.
- Zulian Prowler (15101): Prowl 2118350; Shred 2118351; Shadowstep 2118352.
- Son of Hakkar (11357): Pool of Poisoned Blood 2118675.
- Boss/add general: Fierce Blow 975011 and Knockdown 520871 in source audit.

## Conflicts and cautions
- Custom Hakkar script proposes Blood Siphon first 90s / repeat 90s, conflicting with cited log's ~59.5s first / ~79.5s repeat. Do not treat either as a deterministic current-realm timer.
- Legacy AzerothCore spell IDs are not interchangeable with CoA custom spell IDs.
- Proposed custom scripts contain explicit design decisions, not exclusively observed mechanics.
- The source identifies Normal/Heroic/Mythic/Ascended historical difficulty modes; current realm implementation remains unverified.
- AtlasLoot-CoA v8.1.6 is the accepted loot research baseline; loot is out of scope for DBM.

## Next
Prioritize live ZG AutoLearner combat-log comparison, with per-pull spell timestamps, first-cast and repeat ranges, summon events and phase transitions. Start with Hakkar, then other ZG bosses; dungeons follow after ZG.
