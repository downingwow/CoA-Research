# Vaults of the Inquisition — SQL bindings, map, and LFG source audit (2026-10-30)

**Source:** https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/updates/pending_db_world/rev_20261028_60_vaults_of_the_inquisition.sql

**C++ loader:** https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/src/server/coa/CoAScriptLoader.cpp

## Verified upstream definitions
- Map **936**; teleport ID **2205**, `VaultsOfInquisition`, **(-6658.51, -5569.48, 175.073)**, orientation **4.72967** on map 936. These are **inside-map teleport coordinates**, not necessarily outside entrance coordinates.
- LFG dungeon IDs: **401 Normal**, **1401 Heroic**, **2401 Mythic**. The SQL includes LFG spawn coordinates.
- Boss entries and ScriptName:
  - **162700 Merciless Echo**, `boss_coa_vaults_echo`, Heroic **262700**, Mythic **362700**.
  - **162703 His Majesty Darkandle**, `boss_coa_vaults_darkandle`, Heroic **262703**, Mythic **362703**.
  - **162704 The Deceiver's Presence**, `boss_coa_vaults_deceiver`, Heroic **262704**, Mythic **362704**.
- Trash template `ScriptName=npc_coa_vaults_trash` includes **162733 Inquisitorial Torturer**, **162734 Phantasmal Bound**, **162735 Freed Prisoner**, **162736 Wrathful Torment**, **162737 Darkandle Kobold**, **162738 Darkandle Brute**, **162748 Shadow Projection**, **162759 Darkandle Kobold**, **162761 Corporeal Shadow**, **162762 Darkandle Kobold**, **162763 Darkandle Brute**, **162999 Inquisitorial Confessor Konrad**, **163813 Darkandle Kobold**.
- Script loader calls `AddSC_CoAVaults()` (CoAScriptLoader.cpp line 832); `CoAVaults.cpp` registers three boss AI classes and trash AI (lines 2148–2159). This verifies **source registration**, not deployment on live Conquest Reborn.
- The SQL file contains creature spawns, gameobject spawns, spell scripts and loot definitions. Those sections should be extracted separately before claiming particular drop/item IDs.

## Source limitations
SQL header says reconstructed from combat logs, Exiles dump and video; this is an upstream developer description, **not independent verification of live mechanics**. Difficulty and spell mechanics may vary on Conquest Reborn. No evidence here for Frozen Reach or Karazhan Crypts.

## Companion research
- `research/dbm/vaults-of-the-inquisition-three-boss-source-audit-2026-10-30.md`
- `research/dbm/vaults-trash-and-deceiver-timing-audit-2026-10-30.md`
- `research/dbm/custom-dungeons-canonical-v1-2026-10-30.json`
