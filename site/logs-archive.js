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
  section.append(heading,intro,wrap,weekCard,mythicCard,snapshots);
})();
