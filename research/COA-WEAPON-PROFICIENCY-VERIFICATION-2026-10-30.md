# Weapon proficiency verification ledger — Conquest Reborn

Created 2026-10-30. Baseline: archived BisBeard equipment model (`site/data/equipment-rules.json`). **Not yet verified against the current client**. Screenshot evidence for Primalist is recorded below.

| Class | Archived weapon families | Dual wield | Shields | Current-client status |
|---|---|---|---|---|
| Barbarian | Axe, Mace, Polearm, Sword, Dagger, Fist, Thrown | Yes | No | Unverified archive |
| Witch Doctor | Axe, Mace, Polearm, Staff, Bow, Dagger, Fist, Thrown, Wand, Crossbow | Yes | No | Unverified archive |
| Felsworn | Axe, Mace, Polearm, Sword, Staff, Bow, Dagger, Fist, Thrown, Wand | Yes | No | Unverified archive |
| Witch Hunter | Axe, Mace, Sword, Gun, Dagger, Crossbow | Yes | No | Unverified archive |
| Stormbringer | Mace, Staff, Dagger, Wand | No | No | Unverified archive |
| Knight of Xoroth | Axe, Mace, Polearm, Sword, Bow, Crossbow | No | Yes | Unverified archive |
| Guardian | Axe, Mace, Sword, Bow, Gun, Fist, Thrown, Crossbow | No | Yes | Unverified archive |
| Templar | Axe, Mace, Polearm, Sword, Staff, Bow, Fist, Crossbow | Yes | No | Unverified archive |
| Bloodmage | Axe, Mace, Polearm, Sword, Staff, Bow, Dagger, Fist, Wand, Crossbow | Yes | No | Unverified archive |
| Ranger | Axe, Polearm, Sword, Bow, Dagger, Fist, Crossbow | Yes | No | Unverified archive |
| Chronomancer | Mace, Staff, Dagger, Wand | No | No | Unverified archive |
| Necromancer | Sword, Staff, Dagger, Wand | No | No | Unverified archive |
| Pyromancer | Sword, Staff, Dagger, Wand | No | No | Unverified archive |
| Cultist | Axe, Mace, Polearm, Sword, Staff, Bow, Gun, Dagger, Fist, Thrown, Wand, Crossbow | No | Yes | Unverified archive |
| Starcaller | Axe, Mace, Polearm, Sword, Staff, Bow, Dagger, Wand, Crossbow | Yes | Yes | Unverified archive |
| Sun Cleric | Mace, Polearm, Sword, Staff, Bow, Wand, Crossbow | Yes | Yes | Unverified archive |
| Tinker | Axe, Mace, Polearm, Staff, Gun, Dagger | No | Yes | Unverified archive |
| Venomancer | Mace, Polearm, Staff, Bow, Dagger, Fist, Thrown, Wand, Crossbow | Yes | No | Unverified archive |
| Reaper | Axe, Mace, Polearm, Sword, Bow, Dagger, Thrown, Crossbow | Yes | No | Unverified archive |
| Primalist | Axe, Mace, Polearm, Bow, Fist, Thrown, Wand | Yes | No | Partial: screenshot and player confirmation |
| Runemaster | Axe, Polearm, Sword, Staff, Dagger, Fist, Thrown, Wand | Yes | No | Unverified archive |

## Current-client evidence: Primalist
- Player screenshot of weapon skill panel: Axes, Bows, Fist Weapons, Maces, Polearms, Two-Handed Axes, Two-Handed Maces, Wands; also Defense and Unarmed (not weapon-equipment categories).
- Player directly confirmed Primalist can dual wield.
- Armor panel: Cloth, Leather, Mail, Plate; character-creation primary armor: Plate.
- Screenshot does not establish shields, thrown weapons, other weapon families, or every off-hand combination.

## Verification method
1. Compare each class's in-game weapon skill panel, including expanded entries.
2. Check dual wield and shield skill/actual equip behavior separately.
3. Track one-handed vs two-handed proficiency independently; talent-gated special cases must be spec-specific.
4. Retain archive-only claims as unverified until direct evidence arrives.
5. Do not treat weapon mentions in spec descriptions as exhaustive proficiency lists.

## Source references
- `site/data/equipment-rules.json` — archived BisBeard model.
- `datasets/normalized/coa-conquest-reborn-character-creation-2026-10-30.json` — current-client creation screens.
