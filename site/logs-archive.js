(() => {
  const section = document.querySelector("#logs");
  if (!section) return;

  const evidence = {
    corpus: {
      title: "Molten Core event-level corpus located",
      headline: "54 logs · ~10 million events · 0 unparsed",
      note: "A public restoration write-up cites a real parsed corpus covering fights, casts, auras, and damage per pull. Its raw log folder and detailed coverage files are gitignored, so BoneArchive has the published evidence summary, not the 54 source files.",
      link: "https://github.com/Conquest-of-AzerothCore/azerothcore-wotlk-coa/blob/main/docs/coa/molten-core.md#evidence-live-combat-logs",
      linkText: "Read the public log evidence ↗",
      coverage: [
        ["Ragnaros", "33 pulls; mostly wipes"],
        ["Son of Flame chain", "40N+72A / 16N+28A*"],
        ["Majordomo Sacrificial Chains", "48 of 49 pulls"],
        ["Sulfuron’s disciples", "3 Mythic/Ascended pulls only"],
        ["Normal/Heroic Sulfuron and Majordomo", "No pulls in this corpus"]
      ],
      limitations: "Difficulty is inferred, coordinates are absent, and some add cast counts are unreliable. The public note calls the corpus August–September 2026; its full date inventory is not public. *The source does not explain the slash-separated Son of Flame counts further."
    },
    weeklyLucifron: {
      title: "Week 1 · Molten Core Normal · Lucifron",
      sourceTotal: 2457,
      source: "https://www.reddit.com/r/ProjectAscension/comments/1vm1c7o/week_1_molten_core_normal_class_statistics/",
      classes: [
        ["Sun Cleric",203,["Blessings: 55","Piety: 21","Seraphim: 21","Valkyrie: 106"]],
        ["Cultist",194,["Corruption: 36","Dreadnought: 6","Godblade: 52","Heretic: 100"]],
        ["Venomancer",159,["Fortitude: 54","Rot: 57","Stalking: 7","Vizier: 41"]],
        ["Tinker",153,["Demolition: 40","Invention: 66","Mechanics: 47"]],
        ["Primalist",145,["Geomancy: 6","Grovekeeper: 80","Mountain King: 17","Wildwalker: 42"]],
        ["Felsworn",144,["Infernal: 92","Slayer: 19","Tyrant: 33"]],
        ["Witch Doctor",138,["Brewing: 34","Shadow Hunting: 76","Voodoo: 28"]],
        ["Templar",130,["Crusader: 62","Oathkeeper: 17","Zealot: 51"]],
        ["Ranger",121,["Archery: 94","Brigand: 22","Farstrider: 5"]],
        ["Knight of Xoroth",118,["Defiance: 15","Hellfire: 15","War: 88"]],
        ["Witch Hunter",118,["Black Knight: 27","Boltslinger: 35","Houndmaster: 35","Inquisition: 21"]],
        ["Bloodmage",116,["Accursed: 12","Eternal: 53","Fleshweaver: 29","Sanguine: 22"]],
        ["Reaper",115,["Domination: 20","Harvest: 88","Soul: 7"]],
        ["Chronomancer",111,["Artificer: 21","Infinite: 41","Time: 49"]],
        ["Necromancer",106,["Animation: 80","Death: 4","Rime: 22"]],
        ["Starcaller",101,["Moon Guard: 13","Moon Priest: 30","Sentinel: 22","Warden: 36"]],
        ["Pyromancer",96,["Draconic: 21","Flameweaving: 52","Incineration: 23"]],
        ["Barbarian",94,["Ancestry: 10","Brutality: 62","Headhunting: 22"]],
        ["Runemaster",91,["Engravement: 70","Glyphic: 17","Riftblade: 4"]],
        ["Guardian",64,["Gladiator: 19","Inspiration: 18","Vanguard: 27"]],
        ["Stormbringer",46,["Lightning: 32","Maelstrom: 8","Wind: 6"]]
      ]
    },
    communityDps: {
      title: "Reddit community DPS ranking · July 25, 2026",
      source: "https://www.reddit.com/r/ProjectAscension/comments/1v6itd1/most_recent_dps_statistics_ranking/",
      caveat: "Low-confidence community transcription of a DPS Statistics page. The post does not identify phase, content filter, percentile, date range, or sample thresholds. Reddit comments dispute the methodology and mention gear/population skew, changing balance, and small samples. Values and tier labels are preserved as posted; they are not BoneArchive's validated ranking.",
      entries: [
        ["S+","Witch Doctor","Shadowhunting",6135],["S+","Templar","Crusader",6126],
        ["S","Tinker","Mechanics",5747],["S","Ranger","Archery",5682],["S","Templar","Zealot",5572],["S","Tinker","Demolition",5551],
        ["A","Chronomancer","Artificer",5448],["A","Witch Doctor","Voodoo",5419],["A","Witch Hunter","Inquisition",5205],["A","Pyromancer","Incineration",5044],
        ["B+","Felsworn","Infernal",4961],["B+","Necromancer","Animation",4702],["B+","Chronomancer","Infinite",4666],["B+","Reaper","Soul",4604],["B+","Venomancer","Rot",4552],
        ["B","Bloodmage","Accursed",4477],["B","Sun Cleric","Piety",4458],["B","Starcaller","Sentinel",4395],["B","Runemaster","Riftblade",4370],["B","Bloodmage","Sanguine",4315],["B","Barbarian","Headhunting",4303],
        ["C+","Knight of Xoroth","War",4198],["C+","Witch Hunter","Boltslinger",4183],["C+","Cultist","Godblade",4127],["C+","Necromancer","Death",4087],["C+","Starcaller","Warden",4080],["C+","Barbarian","Brutality",4056],
        ["C","Primalist","Wildwalker",3997],["C","Runemaster","Glyphic",3993],["C","Pyromancer","Draconic",3980],["C","Witch Hunter","Houndmaster",3900],["C","Stormbringer","Lightning",3846],["C","Necromancer","Rime",3829],["C","Knight of Xoroth","Hellfire",3810],["C","Sun Cleric","Valkyrie",3804],
        ["D","Runemaster","Engrave",3702],["D","Reaper","Harvest",3667],["D","Stormbringer","Maelstrom",3630],["D","Felsworn","Tyrant",3601],["D","Venomancer","Stalking",3574],["D","Guardian","Gladiator",3538],["D","Cultist","Corruption",3500],["D","Primalist","Geomancy",3343],["D","Felsworn","Slayer",3279],
        ["Low","Bloodmage","Fleshweaver",3090],["Low","Ranger","Brigand",2865],["Low","Bloodmage","Eternal DPS",2580],["Low","Guardian","Inspiration",2562],["Low","Primalist","Grovekeeper",2274],["Low","Templar","Oathkeeper DPS",2172],["Low","Barbarian","Ancestry",2127],
        ["Bottom","Stormbringer","Wind",1977],["Bottom","Venomancer","Fortitude DPS",1928],["Bottom","Sun Cleric","Seraphim DPS",1775],["Bottom","Ranger","Farstrider",1740],["Bottom","Knight of Xoroth","Defiance DPS",1704],["Bottom","Primalist","Mountain King DPS",1661],["Bottom","Reaper","Domination DPS",1650],["Bottom","Starcaller","Moon Guard DPS",1428],["Bottom","Witch Hunter","Black Knight DPS",1393],["Bottom","Cultist","Dreadnought DPS",1032],["Bottom","Guardian","Vanguard DPS",842]
      ],
      alternateTiers: [
        ["S+","Witch Doctor — Shadowhunting; Templar — Crusader"],
        ["S","Tinker — Mechanics; Ranger — Archery; Tinker — Demolition; Templar — Zealot; Chronomancer — Artificer"],
        ["A","Witch Doctor — Voodoo; Witch Hunter — Inquisition; Pyromancer — Incineration; Felsworn — Infernal; Necromancer — Animation; Chronomancer — Infinite"],
        ["B","Reaper — Soul; Venomancer — Rot; Bloodmage — Accursed; Sun Cleric — Piety; Starcaller — Sentinel; Runemaster — Riftblade; Bloodmage — Sanguine; Barbarian — Headhunting; Knight of Xoroth — War; Witch Hunter — Boltslinger"],
        ["C","Cultist — Godblade; Necromancer — Death; Starcaller — Warden; Barbarian — Brutality; Primalist — Wildwalker; Runemaster — Glyphic; Pyromancer — Draconic; Witch Hunter — Houndmaster; Stormbringer — Lightning; Necromancer — Rime; Knight of Xoroth — Hellfire; Sun Cleric — Valkyrie"],
        ["D","Runemaster — Engrave; Reaper — Harvest; Stormbringer — Maelstrom; Felsworn — Tyrant; Venomancer — Stalking; Guardian — Gladiator; Cultist — Corruption; Primalist — Geomancy; Felsworn — Slayer"],
        ["F (tank/support-oriented in comment)","Bloodmage — Fleshweaver; Ranger — Brigand; Bloodmage — Eternal; Guardian — Inspiration; Primalist — Grovekeeper; Templar — Oathkeeper; Barbarian — Ancestry; Stormbringer — Wind; Venomancer — Fortitude; Sun Cleric — Seraphim; Ranger — Farstrider; Knight of Xoroth — Defiance; Primalist — Mountain King; Reaper — Domination; Starcaller — Moon Guard"]
      ]
    },
    mythicDungeonSnapshot: {
      title: "Current Mythic dungeon record counts · Aug 2, 2026",
      source: "https://www.reddit.com/r/ProjectAscension/comments/1vdlzds/class_statistics/",
      note: "Community-transcribed record counts from CoA Logs. The author warns this is submitted PvE data, not the realm population. Counts can overlap because a player may have records in multiple specs. It is a popularity/coverage snapshot, not a performance tier list.",
      classes: [
        ["Barbarian",144,["Ancestry: 18","Brutality: 120","Headhunting: 15"]],
        ["Bloodmage",272,["Accursed: 36","Eternal: 120","Fleshweaver: 65","Sanguine: 67"]],
        ["Chronomancer",176,["Artificer: 70","Infinite: 62","Time: 74"]],
        ["Cultist",499,["Corruption: 31","Dreadnought: 51","Godblade: 169","Heretic: 275"]],
        ["Felsworn",381,["Infernal: 161","Slayer: 40","Tyrant: 100"]],
        ["Guardian",148,["Gladiator: 47","Inspiration: 44","Vanguard: 70"]],
        ["Knight of Xoroth",310,["Defiance: 70","Hellfire: 41","War: 209"]],
        ["Necromancer",255,["Animation: 169","Death: 5","Rime: 89"]],
        ["Primalist",364,["Geomancy: 24","Grovekeeper: 175","Mountain King: 93","Wildwalker: 101"]],
        ["Pyromancer",311,["Draconic: 77","Flameweaving: 186","Incineration: 65"]],
        ["Ranger",265,["Archery: 230","Brigand: 35","Farstrider: 14"]],
        ["Reaper",260,["Domination: 70","Harvest: 159","Soul: 40"]],
        ["Runemaster",191,["Engravement: 71","Glyphic: 79","Riftblade: 51"]],
        ["Starcaller",346,["Moon Guard: 69","Moon Priest: 85","Sentinel: 48","Warden: 174"]],
        ["Stormbringer",101,["Lightning: 73","Maelstrom: 30","Wind: 4"]],
        ["Sun Cleric",464,["Blessing: 130","Piety: 83","Seraphim: 94","Valkyrie: 187"]],
        ["Templar",400,["Crusader: 291","Oathkeeper: 99","Zealot: 24"]],
        ["Tinker",313,["Demolition: 141","Invention: 116","Mechanics: 78"]],
        ["Venomancer",398,["Fortitude: 211","Rot: 90","Stalking: 19","Vizier: 92"]],
        ["Witch Doctor",365,["Brewing: 126","Shadowhunter: 201","Voodoo: 62"]],
        ["Witch Hunter",244,["Black Knight: 96","Boltslinger: 65","Houndmaster: 31","Inquisition: 70"]]
      ]
    },
    snapshots: [
      {date:"2026-07-27",title:"39,481 logged fights",detail:"A published CoA guide reports this sample size for dungeon and world-boss rankings. Aggregate claim, no report export.",url:"https://kami-labs.fr/en/ascension/guides-ascension/tier-list-ascension-pve-meilleurs-builds-coa/"},
      {date:"2026-07-25",title:"Community DPS ranking with numeric values",detail:"A Reddit user copied 62 class/spec DPS values from CoA Logs and assigned informal tiers. The post omits filters/sample sizes; the entire table is reproduced above as low-confidence community data.",url:"https://www.reddit.com/r/ProjectAscension/comments/1v6itd1/most_recent_dps_statistics_ranking/"},
      {date:"2026-07-13",title:"Tank class impressions from a healer",detail:"One healer's leveling-based ranking puts Venomancer, Templar, and Cultist at the top; Bloodmage, Sun Cleric, and Primalist in the middle; and Knight of Xoroth, Witch Hunter, and Felsworn at the bottom. Single-player experience; not a controlled comparison.",url:"https://www.reddit.com/r/ProjectAscension/comments/1uuiwb3/which_tank_coa_im_here_for_a_good_time_not_a_long/"},
      {date:"2026-07-25",title:"Tank damage-intake anecdotes",detail:"A leveling healer describes Veno, Bloodmage, Guardian, Knight of Xoroth, and Templar as sturdy, with Felsworn, Starcaller, some Primalists, and Reapers taking heavy damage. Replies cite level, player skill, scaling, and physical/magic mitigation as confounders.",url:"https://www.reddit.com/r/ProjectAscension/comments/1v6j5ca/coa_tank_damage_intake_profiles/"},
      {date:"2026-07-27",title:"Healer preference poll for tanks",detail:"Replies disagree: some prefer Venomancer/Templar; others prefer level-60 Felsworn or Primalist, while KoX, Reaper, and Cultist are criticized by other players. Anecdotal, with different levels and playstyles.",url:"https://www.reddit.com/r/ProjectAscension/comments/1v7vu3q/hello_dear_healers_what_is_the_tank_you_most/"},
      {date:"2026-08-18",title:"High-key tank ranking claim",detail:"One commenter names Sun Cleric, Guardian, and Templar as the top three for high keys, claims a Sun Cleric completed M30, and estimates Bloodmage peaks around M20–25. No leaderboard evidence supplied in the thread.",url:"https://www.reddit.com/r/ProjectAscension/comments/1vrgkde/how_would_you_rank_the_tanks/"},
      {date:"2026-08-16",title:"Accursed Bloodmage report-comparison question",detail:"A player comparing raid reports said cast counts and kill time looked similar but Reave damage differed, and noted a Wound damage source on other reports. A reply cites gear, item level, buffs, and consumables as possible confounders. Not independently checked against raw reports.",url:"https://www.reddit.com/r/ProjectAscension/comments/1vpmbqi/bloodmage_accursed_help/"},
      {date:"2026-09-14",title:"Post-shutdown rotation recollections",detail:"Players described remembered rotations, including a Brutality Barbarian sequence (Headbutt → Crush → Decapitate) and a joking one-line Glyphic Runemaster summary. These are recollections, not parsed cast sequences.",url:"https://www.reddit.com/r/ProjectAscension/comments/1wgfo2x/what_coa_spec_did_you_play_how_did_it_work/"},
      {date:"2026-07-17",title:"CoA Build Hub · 37 community builds",detail:"The advertised meta list was driven by community upvotes/downvotes, with PvE/PvP/leveling/class filters. It was a popularity snapshot, not log-derived performance.",url:"https://www.reddit.com/r/ProjectAscension/comments/1uz0jox/coa_build_hub_update_meta_tier_list_is_live_37/"},
      {date:"2026-07-31",title:"128 community builds preserved",detail:"A separately permitted CoA Build Hub mirror contains 128 community build guides, plus a 21-class talent/skill scrape. It is build knowledge, not combat-log evidence.",url:"https://github.com/hertigservices/ascension-data/tree/main/supplemental/coa-databank/166001399306e4fb022116fe1e3cfbbd7bd4bf37/coabuildhub/builds"},
      {date:"2026-08-02",title:"Mythic record-count snapshot",detail:"A Reddit post transcribes submitted dungeon records by class/spec; it is not a population census or raw-log archive.",url:"https://www.reddit.com/r/ProjectAscension/comments/1vdlzds/class_statistics/"},
      {date:"2026-08-09",title:"6,015 aggregate rows",detail:"Already browsable in the Tier Lists tab. Captured at 2026-08-09T23:22:38.696Z; these are summary metrics, not report timelines.",url:"https://github.com/Ryansousa10/coa-tier-list/tree/main/tools/data/raw"},
      {date:"2026-08-12",title:"Third-party tier snapshot",detail:"DPS/HPS/tank and Mythic+ summaries with parse counts; derived snapshot, not full combat reports.",url:"https://coa.zalidan.com/tier-list-logs/"},
      {date:"2026-08-22–29",title:"Late-August report examples",detail:"Public spec pages cite individual report dates through August 22 and show a ranking update on August 29. Examples only; no full report archive.",url:"https://kami-labs.fr/en/ascension/build-chronomancien-temps-coa/"}
    ]
  };

  const card = (title, body) => {
    const el = document.createElement("article");
    el.className = "card";
    const h = document.createElement("strong"); h.textContent = title;
    el.append(h, body);
    return el;
  };

  const corpus = document.createElement("div");
  const corpusTitle = document.createElement("h3"); corpusTitle.textContent = evidence.corpus.title;
  const stat = document.createElement("p"); stat.className = "tag"; stat.textContent = evidence.corpus.headline;
  const note = document.createElement("p"); note.textContent = evidence.corpus.note;
  const link = document.createElement("a"); link.href = evidence.corpus.link; link.textContent = evidence.corpus.linkText; link.target = "_blank"; link.rel = "noreferrer";
  const tableWrap = document.createElement("div"); tableWrap.style.overflowX = "auto";
  const table = document.createElement("table");
  table.innerHTML = "<thead><tr><th>Encounter</th><th>Coverage in the source corpus</th></tr></thead>";
  const tbody = document.createElement("tbody");
  evidence.corpus.coverage.forEach(([boss,coverage]) => {
    const tr = document.createElement("tr");
    [boss,coverage].forEach(value => { const td=document.createElement("td");td.textContent=value;tr.append(td); });
    tbody.append(tr);
  });
  table.append(tbody); tableWrap.append(table);
  const caution = document.createElement("small"); caution.textContent = evidence.corpus.limitations;
  corpus.append(corpusTitle,stat,note,tableWrap,caution,document.createElement("br"),link);

  const snapshots = document.createElement("div"); snapshots.className = "cards";
  evidence.snapshots.forEach(item => {
    const p = document.createElement("p"); p.textContent = item.detail;
    const a = document.createElement("a"); a.href=item.url;a.target="_blank";a.rel="noreferrer";a.textContent="Open source ↗";
    const meta = document.createElement("small"); meta.textContent=item.date;
    const box = card(item.title,p); box.append(meta,document.createElement("br"),a); snapshots.append(box);
  });

  const heading = document.createElement("h2"); heading.textContent = "Recovered archive evidence";
  const intro = document.createElement("p"); intro.textContent = "These dated discoveries are separated by evidence type. Aggregate snapshots support rankings; event-level corpora can support rotation and encounter research. Community build votes and guides are not combat metrics. None of these imply a complete July-to-September report archive.";
  const wrap = document.createElement("div"); wrap.className="card"; wrap.append(corpus);
  const week = document.createElement("section");
  const weekHeading = document.createElement("h3"); weekHeading.textContent = evidence.weeklyLucifron.title;
  const weekIntro = document.createElement("p"); weekIntro.textContent = "Class/spec parse-count snapshot transcribed from the community post for all logged Week 1 Lucifron Normal kills. These are representation counts, not damage/healing rankings or unique-player counts.";
  const weekTableWrap = document.createElement("div"); weekTableWrap.style.overflowX = "auto";
  const weekTable = document.createElement("table");
  weekTable.innerHTML = "<thead><tr><th>Class</th><th>Logged parses</th><th>Specialization parse counts</th></tr></thead>";
  const weekBody = document.createElement("tbody");
  evidence.weeklyLucifron.classes.forEach(([klass,total,specs]) => {
    const tr = document.createElement("tr");
    [klass,total,specs.join(" · ")].forEach(value => { const td=document.createElement("td");td.textContent=value;tr.append(td); });
    weekBody.append(tr);
  });
  weekTable.append(weekBody); weekTableWrap.append(weekTable);
  const listedTotal = evidence.weeklyLucifron.classes.reduce((n,row) => n + row[1],0);
  const mismatch = document.createElement("p"); mismatch.textContent = `Data check: the Reddit post states ${evidence.weeklyLucifron.sourceTotal.toLocaleString()} total parses, while its listed class totals add to ${listedTotal.toLocaleString()} (a ${ (listedTotal-evidence.weeklyLucifron.sourceTotal).toLocaleString()}-parse difference). We preserve the posted figures and flag the mismatch for verification.`;
  const weekSource = document.createElement("a"); weekSource.href=evidence.weeklyLucifron.source;weekSource.target="_blank";weekSource.rel="noreferrer";weekSource.textContent="Open the Reddit source ↗";
  week.append(weekHeading,weekIntro,weekTableWrap,mismatch,weekSource);
  const weekCard = card("A weekly log record exists",week);
  const mythicIntro = document.createElement("p"); mythicIntro.textContent = evidence.mythicDungeonSnapshot.note;
  const mythicDetails = document.createElement("details");
  const mythicSummary = document.createElement("summary"); mythicSummary.textContent="Expand all 21 classes and specialization counts";
  const mythicTableWrap = document.createElement("div"); mythicTableWrap.style.overflowX="auto";
  const mythicTable = document.createElement("table");
  mythicTable.innerHTML = "<thead><tr><th>Class</th><th>Records</th><th>Specialization record counts</th></tr></thead>";
  const mythicBody=document.createElement("tbody");
  evidence.mythicDungeonSnapshot.classes.forEach(([klass,total,specs])=>{
    const tr=document.createElement("tr");
    [klass,total,specs.join(" · ")].forEach(value=>{const td=document.createElement("td");td.textContent=value;tr.append(td);});
    mythicBody.append(tr);
  });
  mythicTable.append(mythicBody); mythicTableWrap.append(mythicTable); mythicDetails.append(mythicSummary,mythicTableWrap);
  const mythicSource=document.createElement("a");mythicSource.href=evidence.mythicDungeonSnapshot.source;mythicSource.target="_blank";mythicSource.rel="noreferrer";mythicSource.textContent="Open the Reddit source ↗";
  const mythicCardContent=document.createElement("div");
  const mythicTitle=document.createElement("h3");mythicTitle.textContent=evidence.mythicDungeonSnapshot.title;
  mythicCardContent.append(mythicIntro,mythicDetails,mythicSource);
  const mythicCard=card("Mythic dungeon snapshot located",mythicCardContent);mythicCard.prepend(mythicTitle);
  const dpsCardBody=document.createElement("div");
  const dpsCaveat=document.createElement("p");dpsCaveat.textContent=evidence.communityDps.caveat;
  const dpsDetails=document.createElement("details");dpsDetails.open=false;
  const dpsSummary=document.createElement("summary");dpsSummary.textContent=`Expand ${evidence.communityDps.entries.length} posted class/spec DPS rows`;
  const dpsTableWrap=document.createElement("div");dpsTableWrap.style.overflowX="auto";
  const dpsTable=document.createElement("table");dpsTable.innerHTML="<thead><tr><th>Posted tier</th><th>Class</th><th>Specialization as posted</th><th>Reported DPS value</th></tr></thead>";
  const dpsBody=document.createElement("tbody");
  evidence.communityDps.entries.forEach(([tier,klass,spec,value])=>{const tr=document.createElement("tr");[tier,klass,spec,value.toLocaleString()].forEach(value=>{const td=document.createElement("td");td.textContent=value;tr.append(td)});dpsBody.append(tr)});
  dpsTable.append(dpsBody);dpsTableWrap.append(dpsTable);dpsDetails.append(dpsSummary,dpsTableWrap);
  const altDetails=document.createElement("details");
  const altSummary=document.createElement("summary");altSummary.textContent="Expand an alternative 90th-percentile community tier grouping";
  const altNote=document.createElement("p");altNote.textContent="A commenter said this grouping combined world-boss and dungeon performance at the 90th percentile, and that ChatGPT helped calculate it. No source export or calculation is provided, so preserve as an unverified community interpretation.";
  const altTable=document.createElement("table");altTable.innerHTML="<thead><tr><th>Comment tier</th><th>Specializations listed</th></tr></thead>";
  const altBody=document.createElement("tbody");
  evidence.communityDps.alternateTiers.forEach(([tier,specs])=>{const tr=document.createElement("tr");[tier,specs].forEach(value=>{const td=document.createElement("td");td.textContent=value;tr.append(td)});altBody.append(tr)});
  altTable.append(altBody);altDetails.append(altNote,altTable);
  const dpsSource=document.createElement("a");dpsSource.href=evidence.communityDps.source;dpsSource.target="_blank";dpsSource.rel="noreferrer";dpsSource.textContent="Open the Reddit post and discussion ↗";
  const dpsTitle=document.createElement("h3");dpsTitle.textContent=evidence.communityDps.title;
  dpsCardBody.append(dpsTitle,dpsCaveat,dpsDetails,altDetails,dpsSource);
  const dpsCard=card("Community DPS tier snapshot · low confidence",dpsCardBody);
  section.append(heading,intro,wrap,dpsCard,weekCard,mythicCard,snapshots);
})();
