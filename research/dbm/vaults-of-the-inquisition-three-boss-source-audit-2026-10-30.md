# Vaults of the Inquisition — three-boss direct C++ schedule audit (2026-10-30)

**Map 936.** Primary source: [CoAVaults.cpp](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/src/server/coa/CoAVaults.cpp). This is source timing, **not verified live Conquest Reborn combat timing**. All timings are EventMap schedules subject to cast delays.

## Merciless Echo — NPC 162700
- Combat engage only after scripted RP/walk. Chains summon zone NPC **162702** at random player: first **5s**, repeat **10s Normal / 4s Heroic / 2s Mythic**.
- Fierce Blow **975011**: first **6s**, repeat randomized **9–11s**.
- Spectral Strike **256975** with image summons: first **15s**, repeat **37s**.
- Spectral Destruction **256805** with glow: first **25s**, repeat **37s**; glow duration **5.5s**.
- NPC image **162701**. Second dialogue event at **6s** is not a combat ability.
- Source lines 489–515 and 584–608.

## Darkandle — NPC 162703
- Starts combat only after intro. More Fire **256814**: first **5s**, repeat **20s**, schedules fire circles **3s** later, then fire line/dialogue **4s** after circles.
- Earthquake **256819**: first **18.5s**, repeat **20s**; quake-end cleanup scheduled **7s** after each earthquake.
- Fierce Blow **975011**: first **9s**, repeat randomized **6–8s**.
- At health below **15% Normal / 20% Heroic / 30% Mythic**, initiates an escape/devour sequence (source `StartEscape`); separate 10% threshold is dialogue, not necessarily another phase.
- Source lines 807–859 and 915–940.

## Deceiver — NPC 162704
- Initially sealed/unattackable; do not start boss combat timers until awakened and engaged.
- Voidflare **256927** first **7s**; inner ring **20s**; outer ring **25s**; soak/trap **30s**; help crystal **35s**; Void Wrath **256844** **40s**. These repeat using shared `DeceiverCycle` constant (not yet extracted here).
- Inner/outer ring bursts follow telegraphs after `DeceiverRingDelay` (constant not yet extracted here).
- Fierce Blow **975011** first **10s**, repeat randomized **10–12s**.
- Voidflare may lock/hold event processing; avoid treating nominal EventMap intervals as exact live cast times.
- Helpers: trap controller **162978**, shield zone **162724**, holy crystal **162723**.
- Source lines 1128–1168 and 1193–1263.

## Additional source validation
[Custom dungeon melee SQL](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/data/sql/updates/pending_db_world/rev_20261029_85_coa_custom_dungeons_melee.sql) explicitly identifies Vaults map **936** and Road to De Other Side map **937**, with Normal/Heroic/Mythic creature tuning. It also independently names Road to De Other Side bosses and assigns difficulty entries **262711/362711**, **262715/362715**, **262716/362716** to normal NPCs **162711**, **162715**, **162716** respectively. This improves confidence in the Chimeric Embryo NPC template identity, previously marked as roster-only.

## Next extraction
Read `DeceiverCycle`, `DeceiverRingDelay`, and phase helper methods; extract Vaults trash spells and difficulty variants. Audit live realm deployment separately. No addon code modified.
