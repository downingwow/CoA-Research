# Dungeon encounter-to-mechanics gap audit — 2026-10-30

## Scope and method
Parsed **all 254 INSERT rows** from the preserved upstream `rev_20260929_20_heroic_mythic_encounters.sql` in `comprehensive-dungeon-encounter-roster-difficulty-loot-sources-2026-10-30.json`. This yields **188 distinct credited NPC IDs**, with **188 Heroic** and **66 Mythic** encounter-credit entries. Compared NPC IDs against the 64-row SQL boss-kit extraction (22 NPCs). This is a **cross-file inventory**, not full per-boss proof of missing mechanics. Source deployment on live Conquest Reborn remains unverified.

- **25 encounter-credit rows** have an NPC-ID match in the boss-kit extraction; **229 do not**.
- **19 unique credited NPCs** have a boss-kit match; **169 do not**.
- Of the **22 NPC IDs** in the kit, **3** do not appear in this Heroic/Mythic credit migration. They may still be valid bosses or NPCs: this migration is not a full roster.
- A missing match means **no record in this particular kit file**, NOT that no mechanics exist in other preserved research or on the realm.

## Additional preserved source scripts (not equivalent to kit rows)

- Deadmines: `boss_mr_smite.cpp` (upstream script extraction; deployment unverified)
- Scholomance: `boss_darkmaster_gandling.cpp` (upstream script extraction; deployment unverified)
- Scholomance: `boss_kormok.cpp` (upstream script extraction; deployment unverified)
- Dire Maul: `boss_isalien.cpp` (upstream script extraction; deployment unverified)
- Shadowfang Keep: `boss_apothecary_hummel.cpp` (upstream script extraction; deployment unverified)

## Full credited NPC inventory

| NPC | Encounter name | Heroic | Mythic | Kit-ID match |
|---:|---|:---:|:---:|:---:|
| 4422 | Agathelos the Raging | Yes | — | — |
| 4424 | Aggem Thorncurse | Yes | — | — |
| 4829 | Aku'mai | Yes | — | — |
| 11492 | Alzzin the Wildshaper | Yes | Yes | — |
| 9156 | Ambassador Flamelash | Yes | Yes | Yes |
| 7358 | Amnennar the Coldbringer | Yes | — | — |
| 7206 | Ancient Stone Keeper | Yes | — | — |
| 8127 | Antu'sul | Yes | — | — |
| 6487 | Arcanist Doan | Yes | Yes | — |
| 2748 | Archaedas | Yes | — | — |
| 10811 | Archivist Galford | Yes | — | — |
| 4275 | Archmage Arugal | Yes | — | — |
| 8580 | Atal'alarion | Yes | — | — |
| 8443 | Avatar of Hakkar | Yes | — | — |
| 9016 | Bael'Gar | Yes | Yes | — |
| 10813 | Balnazzar | Yes | — | — |
| 9596 | Bannok Grimaxe | Yes | Yes | — |
| 10440 | Baron Rivendare | Yes | — | — |
| 3887 | Baron Silverlaine | Yes | — | — |
| 10436 | Baroness Anastari | Yes | — | Yes |
| 1716 | Bazil Thredd | Yes | — | — |
| 11519 | Bazzalan | Yes | — | — |
| 14861 | Blood Steward of Kirtonos | Yes | Yes | — |
| 4543 | Bloodmage Thalnos | Yes | Yes | — |
| 10263 | Burning Felguard | Yes | Yes | — |
| 10997 | Cannon Master Willey | Yes | — | — |
| 647 | Captain Greenskin | Yes | — | — |
| 14325 | Captain Kromcrush | Yes | Yes | — |
| 12225 | Celebras the Cursed | Yes | Yes | — |
| 4421 | Charlga Razorflank | Yes | — | — |
| 7267 | Chief Ukorz Sandscalp &  Ruuzlu | Yes | — | — |
| 14324 | Cho'Rush the Observer | Yes | Yes | — |
| 4278 | Commander Springvale | Yes | — | — |
| 645 | Cookie | Yes | — | — |
| 6229 | Crowd Pummeler 9-60 | Yes | — | — |
| 10376 | Crystal Fang | Yes | Yes | — |
| 1853 | Darkmaster Gandling | Yes | — | Yes |
| 14516 | Death Knight Darkreaver | Yes | Yes | — |
| 4428 | Death Speaker Jargba | Yes | — | — |
| 1663 | Dextren Ward | Yes | — | — |
| 11261 | Doctor Theolen Krastinov | Yes | — | — |
| 5721 | Dreamscythe | Yes | — | — |
| 639 | Edwin VanCleef | Yes | — | — |
| 6235 | Electrocutioner 6000 | Yes | — | — |
| 9019 | Emperor Dagran Thaurissan | Yes | Yes | Yes |
| 4274 | Fenrus the Devourer | Yes | — | — |
| 9056 | Fineous Darkvire | Yes | Yes | — |
| 11058 | Fras Siabi | Yes | Yes | — |
| 7291 | Galgann Firehammer | Yes | — | — |
| 6243 | Gelihast | Yes | — | — |
| 9033 | General Angerforge | Yes | Yes | Yes |
| 10363 | General Drakkisath | Yes | — | Yes |
| 4887 | Ghamoo-ra | Yes | — | — |
| 7273 | Ghaz'rilla | Yes | — | — |
| 9718 | Ghok Bashguud | Yes | Yes | — |
| 1763 | Gilnid | Yes | — | — |
| 10268 | Gizrul the Slavener | Yes | — | — |
| 8567 | Glutton | Yes | — | — |
| 8983 | Golem Lord Argelmach | Yes | Yes | — |
| 10899 | Goraluk Anvilcrack | Yes | Yes | — |
| 4854 | Grimlok | Yes | — | — |
| 7361 | Grubbis | Yes | — | — |
| 14321 | Guard Fengus | Yes | Yes | — |
| 14326 | Guard Mol'dar | Yes | Yes | — |
| 14323 | Guard Slip'kik | Yes | Yes | — |
| 10220 | Halycon | Yes | — | Yes |
| 1717 | Hamhock | Yes | — | — |
| 5722 | Hazzas | Yes | — | — |
| 10558 | Hearthsinger Forresten | Yes | — | — |
| 3975 | Herod | Yes | Yes | — |
| 4542 | High Inquisitor Fairbanks | Yes | Yes | — |
| 3977 | High Inquisitor Whitemane | Yes | Yes | — |
| 9018 | High Interrogator Gerstahn | Yes | Yes | Yes |
| 9196 | Highlord Omokk | Yes | — | Yes |
| 9319 | Houndmaster Grebmar | Yes | Yes | — |
| 3974 | Houndmaster Loksey | Yes | Yes | — |
| 9537 | Hurley Blackbreath | Yes | — | — |
| 7795 | Hydromancer Velratha | Yes | — | — |
| 13280 | Hydrospawn | Yes | Yes | — |
| 11488 | Illyanna Ravenoak | Yes | Yes | — |
| 11496 | Immol'thar | Yes | Yes | — |
| 10505 | Instructor Malicia | Yes | — | — |
| 3983 | Interrogator Vishas | Yes | Yes | — |
| 7228 | Ironaya | Yes | — | — |
| 16097 | Isalien Trigger | Yes | Yes | — |
| 5710 | Jammal'an and Ogom | Yes | — | — |
| 10503 | Jandice Barov | Yes | Yes | — |
| 10509 | Jed Runewatcher | Yes | Yes | — |
| 11518 | Jergosh the Invoker | Yes | — | — |
| 1666 | Kam Deepfury | Yes | — | — |
| 11501 | King Gordok | Yes | Yes | — |
| 10506 | Kirtonos the Herald | Yes | Yes | Yes |
| 16118 | Kormok | Yes | — | — |
| 3653 | Kresh | Yes | — | — |
| 3671 | Lady Anacondra | Yes | — | — |
| 10502 | Lady Illucia Barov | Yes | — | — |
| 4831 | Lady Sarevess | Yes | — | — |
| 12203 | Landslide | Yes | Yes | — |
| 14327 | Lethtendris | Yes | Yes | — |
| 10504 | Lord Alexei Barov | Yes | — | — |
| 3669 | Lord Cobrahn | Yes | — | — |
| 14506 | Lord Hel'nurath | Yes | Yes | — |
| 9017 | Lord Incendius | Yes | Yes | — |
| 3670 | Lord Pythas | Yes | — | — |
| 9025 | Lord Roccor | Yes | Yes | — |
| 3673 | Lord Serpentis | Yes | — | — |
| 16042 | Lord Valthalak | Yes | Yes | — |
| 12236 | Lord Vyletongue | Yes | Yes | — |
| 10901 | Lorekeeper Polkelt | Yes | — | — |
| 12902 | Lorgus Jett | Yes | — | — |
| 11487 | Magister Kalendris | Yes | Yes | — |
| 10435 | Magistrate Barthilas | Yes | — | — |
| 9938 | Magmus | Yes | Yes | Yes |
| 10438 | Maleki the Pallid | Yes | — | — |
| 11032 | Malor the Zealous | Yes | — | — |
| 10433 | Marduk Blackpool | Yes | — | — |
| 7800 | Mekgineer Thermaplugg | Yes | — | — |
| 16080 | Mor Grayhoof | Yes | Yes | — |
| 7357 | Mordresh Fire Eye | Yes | — | — |
| 5719 | Morphaz | Yes | — | — |
| 10596 | Mother Smolderweb | Yes | — | — |
| 646 | Mr. Smite | Yes | — | Yes |
| 3654 | Mutanus the Devourer | Yes | — | — |
| 7796 | Nekrum Gutchewer | Yes | — | — |
| 10437 | Nerub'enkan | Yes | — | — |
| 13282 | Noxxion | Yes | Yes | — |
| 4279 | Odo the Blindwatcher | Yes | — | — |
| 11517 | Oggleflint | Yes | — | — |
| 4830 | Old Serra'kis | Yes | — | — |
| 4420 | Overlord Ramtusk | Yes | — | — |
| 9568 | Overlord Wyrmthalak | Yes | — | Yes |
| 8923 | Panzor the Invincible | Yes | — | — |
| 9502 | Phalanx | Yes | — | Yes |
| 9499 | Plugger Spazzring | Yes | — | — |
| 11486 | Prince Tortheldrin | Yes | Yes | — |
| 12201 | Princess Theradras | Yes | Yes | — |
| 9816 | Pyroguard Emberseer | Yes | — | Yes |
| 9024 | Pyromancer Loregrain | Yes | Yes | — |
| 9736 | Quartermaster Zigris | Yes | — | Yes |
| 10439 | Ramnstein the Gorger | Yes | — | — |
| 11622 | Rattlegore | Yes | — | — |
| 3886 | Razorclaw the Butcher | Yes | — | — |
| 12258 | Razorlash | Yes | Yes | — |
| 3914 | Rethilgore | Yes | — | — |
| 6910 | Revelosh | Yes | — | — |
| 644 | Rhahk'zor | Yes | — | — |
| 9543 | Ribbly Screwspigot | Yes | — | — |
| 10096 | Ring of Law | Yes | Yes | — |
| 6168 | Roogug | Yes | — | — |
| 13596 | Rotgrip | Yes | Yes | — |
| 5709 | Shade of Eranikus | Yes | — | — |
| 9236 | Shadow Hunter Vosh'gajin | Yes | — | — |
| 7275 | Shadowpriest Sezz'ziz | Yes | — | — |
| 10393 | Skul | Yes | Yes | — |
| 3674 | Skum | Yes | — | — |
| 642 | Sneed | Yes | — | — |
| 10264 | Solakar Flamewreath | Yes | — | — |
| 9218 | Spirestone Battle Lord | Yes | Yes | — |
| 9219 | Spirestone Butcher | Yes | Yes | — |
| 9217 | Spirestone Lord Magus | Yes | Yes | — |
| 14322 | Stomper Kreeg | Yes | Yes | — |
| 10809 | Stonespine | Yes | Yes | — |
| 11520 | Taragaman the Hungerer | Yes | — | — |
| 1696 | Targorr the Dread | Yes | — | — |
| 11489 | Tendris Warpwood | Yes | Yes | — |
| 10430 | The Beast | Yes | — | Yes |
| 6906 | The Lost Dwarves | Yes | — | — |
| 10507 | The Ravenian | Yes | — | — |
| 9039 | The Seven | Yes | — | Yes |
| 10516 | The Unforgiven | Yes | — | — |
| 7272 | Theka the Martyr | Yes | — | — |
| 10808 | Timmy the Cruel | Yes | — | — |
| 13601 | Tinkerer Gizlock | Yes | Yes | — |
| 11467 | Tsu'zee | Yes | Yes | — |
| 7355 | Tuten'kash | Yes | — | — |
| 4832 | Twilight Lord Kelris | Yes | — | — |
| 10584 | Urok Doomhowl | Yes | — | — |
| 10432 | Vectus | Yes | — | — |
| 5775 | Verdan the Everliving | Yes | — | — |
| 7079 | Viscous Fallout | Yes | — | — |
| 9237 | War Master Voone | Yes | — | Yes |
| 10429 | Warchief Rend Blackhand | Yes | — | — |
| 9041 | Warder Stilgiss | Yes | Yes | — |
| 5720 | Weaver | Yes | — | — |
| 7271 | Witch Doctor Zum'rah | Yes | — | — |
| 3927 | Wolf Master Nandos | Yes | — | — |
| 17830 | Zelemar the Wrathful | Yes | — | — |
| 11490 | Zevrim Thornhoof | Yes | Yes | — |

## Audit limitations / follow-up

1. This migration lists Heroic/Mythic *encounter-credit rows* and is not a complete Normal-mode or custom-instance boss roster.
2. Some encounter names and IDs may be duplicated or superseded by other migrations; do not assume one source snapshot represents deployed CR.
3. Existing source-script extractions (including unrelated TBC/Wrath encounters) must be matched by explicit NPC ID or reliable name and dungeon; matching only by script filename is insufficient.
4. For the 188 credited NPCs, the kit-match column is an **exact NPC-ID join only**. It is not a complete multi-source mechanics coverage verdict.
5. Next step: extract explicit boss/NPC mappings from all saved in-scope scripts, datamine records and combat-log evidence; publish a multi-source per-boss evidence matrix.

No DBM-CoA addon code changed.