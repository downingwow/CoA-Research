# Witch Hunter Inquisition — Haste and Global Cooldown Research

Status: **Unverified for Conquest Reborn**. Historical mechanics and client records must not be mistaken for live server behavior.

## Question
Does Surging Tonic's haste reduce the global cooldown (GCD) of Witch Hunter Inquisition abilities, or do these abilities remain at a fixed 1.5-second GCD?

## WotLK baseline (not proof of Ascension implementation)
- Many melee-style abilities have a fixed 1.5-second GCD.
- Eligible spell GCDs can scale with spell haste, typically with a 1.0-second floor.
- A haste-eligible base 1.5-second GCD follows max(1.0, 1.5/(1+haste_fraction)).
- Examples: 0%=1.50s; 20%=1.25s; 30%=1.154s; 45%=1.034s; 50%=1.00s.
- Damage school (Fire/Shadow/Physical) and whether an ability is instant do **not** alone establish GCD haste scaling.
- Melee haste and spell haste may affect different mechanics.

## Historical Ascension observations (patch-dependent)
- Surging Tonic descriptions and patch notes have shown different haste values (including reports of 30%, 40%, 20%, and a player report of 45%). **Do not treat any of these as verified current Conquest Reborn values.**
- Inquisition candidate abilities for inspection: Smite Evil, Purifier's Edge, Dawn Blade, Dusk Blade.
- A reported Inquisition specialization passive ID 707063 has been described as having 0s GCD; a passive's GCD says nothing about active ability GCDs. **Verify ID and record before using it.**

## Data to extract and verify
For each active ability and Surging Tonic: canonical spell ID and rank variants; client build and realm/patch; Spell.dbc recovery time, category recovery time, start recovery category/time; spell attributes and haste-affecting flags; aura type and haste stat granted; any spell-family or triggered-spell links; authoritative client/database links. Record whether fields are exposed in the Ascension database. Client-side data alone may miss server-side overrides.

## In-game controlled test
1. Record current client version, tooltip, talent setup, buffs, and spell/attack haste before and after Surging Tonic.
2. Measure GCD duration for each candidate ability without tonic and with tonic; repeat enough times to exclude latency and animation effects.
3. Compare against predicted 1.5s fixed vs max(1.0,1.5/(1+h)) scaling. Use a reliable GCD measurement, not just ability cooldown or cast animation.
4. Check whether different Inquisition abilities behave differently, and whether spell haste vs melee haste changes the result.
5. Label results **verified live**, **verified client data**, **historical**, or **hypothesis**.

## Preliminary conclusion
WotLK mechanics make a fixed 1.5s GCD plausible for melee-style Inquisition abilities, but **no per-ability Conquest Reborn GCD flags or live test results have been verified here**. Surging Tonic's current value and effects are also unconfirmed. Do not publish a definitive claim until the records and/or live tests support it.

## Research entry metadata
Topic: Spell mechanics / Haste scaling / Global cooldown
Class: Witch Hunter
Specialization: Inquisition
Realm: Conquest Reborn
Maintainer: Uncle Bone — https://github.com/downingwow
