# DBM-CoA Classic 19 dungeon research — corrected export

Validated 19 maps, 190 NPC candidates, 80 spell candidates, 80 unique timing candidates across 6 maps. All timing candidates reference NPCs in the 19-map roster; min/max bounds are ordered.

The JSON coverage file is now an object with a structured `maps` array, rather than a Lua-code string. The Lua research export now has 19 numeric map keys and no empty `[]` key. The Lua export is passive and does **not** register boss timers or alter DBM-CoA.

**Not a playable addon release.** Current DBM-CoA source was not included, so runtime compatibility and integration have not been tested. All extracted records remain source-derived candidates, not confirmed Conquest Reborn encounter behavior.

Note: some spell IDs are custom-looking (e.g. 975011, 210xxxx); retain as supplied rather than inferring names or effects.
