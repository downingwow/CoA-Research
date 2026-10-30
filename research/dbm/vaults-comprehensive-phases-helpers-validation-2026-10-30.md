# Vaults comprehensive phases, helper NPCs, and validation matrix — 2026-10-30

## Provenance
Directly inspected [`CoAVaults.cpp`](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/src/server/coa/CoAVaults.cpp), including boss AI, helper AI, pre-fight phases, and spell scripts. All findings are **upstream implementation**, not proof that Conquest Reborn is running the same build. Scheduled times are not guaranteed cast times.

## 1. Merciless Echo — NPC 162700
- **Pre-fight RP gate:** `JustEngagedWith` returns until `_rpDone` and the walking sequence finishes. The boss must finish RP/movement before combat timers are meaningful (lines 493–515).
- **Chains:** at 5s then repeat Normal 10s / Heroic 4s / Mythic 2s. Boss summons **NPC 162702** at a random player's position, lifetime 5s. Helper first casts zone **256803** and then **Subjugating Chains 256804** after approximately 2.5s (lines 588–591, 1470–1474, 1554–1559).
- **Spectral Strike:** initial 15s, repeat 37s; boss casts **256975** and summons image NPC **162701**. Images can also cast 256975 at a player after approximately 0.5s (lines 597–601, 1571–1583).
- **Spectral Destruction:** initial 25s, repeat 37s; boss casts AoE **256805**, with glow state (lines 603–608).
- **Fierce Blow:** **975011** initial 6s, repeat 9–11s (lines 593–595).
- No health-triggered phase transition was found in this boss AI's inspected combat handlers; do not infer that the encounter has none outside this source.

## 2. His Majesty Darkandle — NPC 162703
- **Health phase:** `DamageTaken` triggers `StartEscape()` once on incoming damage crossing **15% Normal, 20% Heroic, 30% Mythic** (`ByDifficulty`), then a separate one-time dialogue at **10%** (lines 855–863).
- **Escape:** interrupts current cast, makes boss unattackable, roots/stops attacks, casts **Void Escape 256811**; after `DarkandleEscapeMs`, teleports to devour position; after `DarkandleAfterTeleport`, restores attackability and casts **Abyssal Devour 256820** AoE (lines 1007–1034). Durations require checking constant definitions; do not invent them.
- **More Fire 256814:** initial 5s, repeats 20s. Chains into Fire Circles after 3s and Fire Line after another 4s (lines 915–926).
- **Earthquake 256819:** initial 18.5s, repeats 20s; spawns marker NPC **162745** with **Quake Zone 256917**, clears dynamic objects 7s after cast (lines 927–935, 999–1005).
- **Fierce Blow 975011:** initial 9s, repeats 6–8s (lines 937–939).
- Candle helpers: **162706** candle flames and **162707** zones. Zone helpers can trigger candle fireball **256816** through candle creature casts (lines 1036–1080, 1646–1653). Distinguish candle-sourced damage from direct boss cast.

## 3. The Deceiver's Presence — NPC 162704
### Pre-fight seal / awakening state
- Starts submerged and non-engageable, periodically casts **Void Consumption 257219** while seal crystals **NPC 162705** remain (lines 1150–1155, 1275–1304).
- Seal crystal NPC 162705 supports click/channel interaction; crystal breaking uses a **3s** channel-like delay (`CrystalBreakMs`), with `Holy Channel Look 47540` as a visual channel marker (lines 1699–1770).
- When no seal crystals remain, the boss starts a **17s** scripted awakening timeline measured from the unseal trigger: eruptions at **2s, 6s, 11s, 13s**, holy cracks at **12s**, seal ring at **14s**, roar at **15.5s**, attackable/awakened at **17s** (lines 1113–1117, 1299–1314, 1332–1363). These are **pre-fight RP/event cues**, not combat pull timers.
### Combat cycle
- Voidflare **256927**: first 7s, every 40s; boss faces victim and casts on self, with short facing lock (lines 1226–1229, 1380–1393).
- Inner ring: starts 20s, every 40s; aura **256821** and burst **256823** after **5s**, radius **0–9.5 yards** (lines 1230–1238, 1404–1415).
- Outer ring: starts 25s, every 40s; visual **256822** and burst **256824** after **5s**, annulus **9.5–18.5 yards** (lines 1239–1246).
- Soak controller NPC **162978**: first 30s, every 40s; target is random player position; after **4s** resolves. If a player is inside **4.2 yards**, deals logged **Soak Eruption 256925** to one soaker and knocks them back; otherwise deals **Void Wrath Tick 256926** to players within room range (lines 1247–1251, 1589–1591, 1597–1643).
- Fight crystal NPC **162723**: first 35s, every 40s; players can click it, spawning **Holy Shelter Zone NPC 162724** which grants **Holy Shelter 256847**. These zones are cleared on Void Wrath end (lines 1252–1254, 1418–1433, 1523–1534, 1585–1588, 1173–1179).
- Void Wrath **256844**: first 40s, every 40s. The `void_wrath_tick` spell script explicitly excludes targets with **Holy Shelter 256847** (lines 1256–1259, 2036–2076).
- Fierce Blow **975011**: first 10s, repeats 10–12s.
- **No percent-health transition** was identified in the Deceiver's combat AI; the major state change is **pre-fight seal breaking**, not a combat HP phase.

## 4. Difficulty / interpretation
`DifficultyIndex()` maps `DUNGEON_DIFFICULTY_HEROIC` to 1, `DUNGEON_DIFFICULTY_EPIC` to 2, everything else to 0 (lines 213–237). This grounds the **Normal/Heroic/Mythic** values as implemented by this source. Whether Mythic+ maps to the same enum on the target server remains unverified.

## 5. DBM research handoff (not addon implementation)
- **Pull clock:** start only on actual engagement; Echo RP, Darkandle intro, Deceiver seal/awakening should not be treated as combat pulls.
- **Health warnings:** Darkandle one-shot escape threshold differs by difficulty; 10% dialogue is informational.
- **Mechanic alerts:** Echo chains spawn and delayed trigger; Darkandle quake marker and fire-circle sequences; Deceiver ring warning vs burst (5s), soak success/failure (4s), click crystal and shelter protection for Void Wrath.
- **Cast source:** helper creatures may generate logged spells. Preserve NPC origin to avoid misattributing to bosses.
- **Validation:** collect live `SPELL_CAST_START`, `SPELL_CAST_SUCCESS`, `SPELL_AURA_APPLIED`, `SPELL_DAMAGE`, NPC summon/death and HP events; compare to source schedules and difficulty.
- **Confidence:** source implementation = high; live Conquest Reborn deployment = unknown; precise combat timestamps = predicted.

## 6. Research remaining
- Confirm `DarkandleEscapeMs`, `DarkandleAfterTeleport`, and other delays from constants.
- Validate source boss/phase timings in current live logs.
- Expand beyond Vaults to other custom dungeons, and reconcile NPC spell joins in the 188-encounter index.
