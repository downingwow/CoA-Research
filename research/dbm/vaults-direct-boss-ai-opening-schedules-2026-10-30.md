# Vaults of the Inquisition — direct boss AI spell and opening schedule (2026-10-30)

## Source and confidence
Read upstream [`src/server/coa/CoAVaults.cpp`](https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/src/server/coa/CoAVaults.cpp) (2,166 lines) and compared the existing SQL restoration notes. This is **direct source-code evidence**, not a live Conquest Reborn verification. Timings below are initial **scheduled events on combat engagement**, not guaranteed cast timestamps, and not necessarily recurring intervals.

## Confirmed source boss mappings
| NPC | Boss | C++ AI | Initial scheduled events |
|---:|---|---|---|
| **162700** | Merciless Echo | `boss_coa_vaults_echo` | Chains **5s**, Fierce Blow **6s**, Strike **15s**, Spectral Destruction **25s**; second dialogue line **6s** |
| **162703** | His Majesty **Darkandle** | `boss_coa_vaults_darkandle` | More Fire **5s**, Fierce Blow **9s**, Earthquake **18.5s** |
| **162704** | The Deceiver's Presence | `boss_coa_vaults_deceiver` | Voidflare **7s**, Fierce Blow **10s**, inner ring **20s**, outer ring **25s**, soak **30s**, crystal **35s**, Void Wrath **40s** |

## Spell IDs from enum and cast handlers
### Merciless Echo (162700)
- Fierce Blow **975011** (`DoCastVictim`).
- Spectral Strike **256975** (`DoCastVictim`).
- Spectral Destruction **256805** (`DoCastAOE`).
- Chains event **5s**: additional handler investigation needed to establish which chain spell is directly cast versus a triggered zone.

### Darkandle (162703)
- More Fire **256814** (`DoCastSelf`), scheduled **5s**.
- Earthquake **256819** (`DoCastAOE`), scheduled **18.5s**.
- Fierce Blow **975011** (`DoCastVictim`), scheduled **9s**.
- Fire circles/line are chained event stages **3s** and **4s** after their respective prior event, not independent pull timers.

### The Deceiver's Presence (162704)
- Void Wrath **256844** (`DoCastSelf`), scheduled **40s**.
- Fierce Blow **975011** (`DoCastVictim`), scheduled **10s**.
- Shadowy Rings **256825** (`DoCastSelf`); inner ring aura **256821**; inner ring damage **256823**; outer ring visual **256822**, outer ring damage **256824**.
- Ring events begin **20s** and **25s** after engage; the actual bursts are delayed separately by `DeceiverRingDelay`.
- Voidflare, soak and crystal event handlers need further inspection before assigning specific spell IDs.

## Important correction
The actual C++ AI enum and SQL both call NPC **162703 Darkandle**; prior overview naming **Darkveil** is not supported by these inspected sources.

## Remaining work
1. Extract the **repeat schedules** and health/phase conditions for all three boss AIs.
2. Resolve helper/spawn spell IDs for chains, voidflare, soak, crystal, candles.
3. Determine whether these source scripts are deployed on the current realm.
4. Keep boss-specific cast IDs distinct from environment and helper NPC spells.

No DBM-CoA addon code changed.
