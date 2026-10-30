# Vaults of the Inquisition — recurring boss mechanics and helper schedule (2026-10-30)

**Primary source:** [`src/server/coa/CoAVaults.cpp`](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/src/server/coa/CoAVaults.cpp), inspected 2026-10-30. **Status:** upstream source verified; live realm unverified. All numbers below are scheduled events, not guaranteed cast timestamps; casting delays may shift execution.

## Merciless Echo — NPC 162700
| Mechanic | Spell or helper | First scheduled | Repeat |
|---|---|---|---|
| Chains | Summons `NPC_CHAIN_ZONE` at random player's position | 5s | **Normal 10s / Heroic 4s / Mythic 2s**, using `ByDifficulty` |
| Fierce Blow | **975011** on victim | 6s | **9–11s** |
| Spectral Strike | **256975** on victim, summons images | 15s | **37s** |
| Spectral Destruction | **256805** AoE, glow | 25s | **37s** |
| Second dialogue line | no spell | 6s | no repeat shown |

## His Majesty Darkandle — NPC 162703
| Mechanic | Spell | First scheduled | Repeat |
|---|---|---|---|
| More Fire | **256814** self | 5s | **20s** |
| Fire Circles | helper routine | 3s after More Fire | chained with each More Fire |
| Fire Line / dialogue | helper routine | 4s after Fire Circles | chained |
| Earthquake | **256819** AoE | 18.5s | **20s** |
| Quake end / remove dynamic objects | cleanup | 7s after Earthquake | chained |
| Fierce Blow | **975011** victim | 9s | **6–8s** |

## The Deceiver's Presence — NPC 162704
`DeceiverCycle = 40s`; `DeceiverRingDelay = 5s`.

| Mechanic | Spell or helper | First scheduled | Repeat |
|---|---|---|---|
| Voidflare | **256927**, `CastVoidflare()` | 7s | **40s** |
| Inner Ring | **256825** self, **256821** ring aura | 20s | **40s** |
| Inner burst | **256823** damage | 25s (5s after ring) | chained |
| Outer Ring | **256822** visual | 25s | **40s** |
| Outer burst | **256824** damage | 30s (5s after ring) | chained |
| Soak | summons `NPC_TRAP_CONTROLLER` at random player, lifespan `SoakLifeMs = 4500` | 30s | **40s** |
| Crystal | `SpawnHelpCrystal()`, summons `NPC_HOLY_CRYSTAL_FIGHT` | 35s | **40s** |
| Void Wrath | **256844** self | 40s | **40s** |
| Fierce Blow | **975011** victim | 10s | **10–12s** |

## Source-quality cautions
- A scheduled helper event is **not** proof that the boss directly casts the helper's spell.
- The source uses a `ByDifficulty` helper for Echo chains; inspect the helper's exact difficulty comparison before assuming these values match current live realm mode labels.
- EventMap can delay execution while the boss is casting; don't publish these as observed live timers.
- Additional encounter phase and health logic, intro sequences, and NPC helper behaviors remain to be reconciled.
- All three boss NPC IDs and **Darkandle** spelling are supported by C++ source.

## Next steps
1. Extract boss phase/health thresholds and spell interactions with helper creatures.
2. Compare actual live logs with the predicted 40s Deceiver cycle and difficulty-specific Echo chain intervals.
3. Transfer verified research to the separate DBM-CoA development workflow; **no addon code here**.
