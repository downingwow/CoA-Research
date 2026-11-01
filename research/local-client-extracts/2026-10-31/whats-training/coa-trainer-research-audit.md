# What's Training? CoA recovery audit

## Extracted local data
Parsed `Data/Content/SpellRankData.json`: 13,311 rank rows. Each row contains spell ID, first spell ID, rank, and level (level 0 means the source supplies no level gate). These are client spell-rank candidates only. They do not establish trainer source, class, trainer NPC, cost, prerequisite, or current Conquest Reborn availability.

No trainer database table or live trainer capture was available in the local files. Therefore confirmed trainer-to-spell assignments: 0; confirmed trainer NPCs: 0. No fictional assignments were added.

## Class coverage
The class coverage file lists all 21 names requested. Verified class IDs, aliases, specializations and trainer mappings were not recoverable from the installed files checked in this pass; class identity is intentionally not guessed.

## Live learning fallback
The Lua module captures visible trainer service fields when TRAINER_SHOW/TRAINER_UPDATE fire, deduplicates by class/trainer/spell-or-name, records changed observations, and transmits nothing. `GetTrainerServiceSpellID` is guarded because its existence is unverified. In the 3.3.5 client, trainer APIs are legacy; GetTrainerServiceInfo returns name, subtext/rank, type, and usability according to client API lineage, while exact modified-client behavior must be tested. Spell identity may need service name/link parsing if GetTrainerServiceSpellID is absent. Cost/level/skill APIs are guarded.

## Validation boundary
The user's addon ZIP/source was not present in the checked output or AddOns locations, so integration into the actual addon, TOC/load-order validation, and preservation of existing features could not be performed. The generated Lua is a standalone capture helper and requires SavedVariables declaration in the target TOC before persistence. Live client validation remains required.

## Source
`C:\Games\Conquest Reborn\Data\Content\SpellRankData.json`
