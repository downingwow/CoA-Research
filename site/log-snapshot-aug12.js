(() => {
  const meta = document.querySelector("#meta");
  const logs = document.querySelector("#logs");
  if (!meta || !logs) return;

  // Values and labels transcribed from the third-party page's 2026-08-12 snapshot.
  // Values retain the source's displayed rounding (kDPS / HPS); they are not raw events.
  const groups = [
    {key:"st",label:"Raid / World Boss · boss-only DPS",unit:"kDPS",rows:[
      ["S","8.6","Death","Necromancer",41],["S","7.0","Zealot","Templar",688],["S","6.7","Hellfire","Knight of Xoroth",97],["S","6.5","Rime","Necromancer",273],["S","6.4","Animation","Necromancer",634],["S","6.3","Incineration","Pyromancer",297],["S","6.1","Gladiator","Guardian",239],["S","6.0","Wildwalker","Primalist",372],
      ["A","5.9","Mechanic","Tinker",431],["A","5.9","Harvest","Reaper",684],["A","5.8","Infinite","Chronomancer",577],["A","5.8","Boltslinger","Witch Hunter",228],["A","5.8","Brigand","Ranger",171],["A","5.8","Valkyrie","Sun Cleric",695],["A","5.7","Houndmaster","Witch Hunter",397],["A","5.7","Inquisition","Witch Hunter",155],["A","5.6","Infernal","Felsworn",1159],["A","5.3","Sanguine","Bloodmage",136],
      ["B","5.3","Voodoo","Witch Doctor",246],["B","5.3","Headhunter","Barbarian",161],["B","5.3","Godblade","Cultist",360],["B","5.2","Slayer","Felsworn",150],["B","5.2","Archery","Ranger",854],["B","5.2","Corruption","Cultist",161],["B","5.2","Accursed","Bloodmage",111],["B","5.2","Engravement","Runemaster",778],["B","5.1","Sentinel","Starcaller",69],["B","5.1","Rotweaver","Venomancer",564],["B","5.1","Artificer","Chronomancer",126],["B","5.0","Brutality","Barbarian",589],["B","5.0","War","Knight of Xoroth",719],["B","5.0","Warden","Starcaller",380],["B","4.8","Soul","Reaper",136],
      ["C","4.8","Demolition","Tinker",228],["C","4.6","Shadowhunting","Witch Doctor",476],["C","4.6","Stalking","Venomancer",49],["C","4.5","Piety","Sun Cleric",140],["C","4.4","Glyphic","Runemaster",144],["C","4.3","Geomancy","Primalist",49],["C","4.3","Crusader","Templar",362],["C","4.3","Lightning","Stormbringer",240],["C","4.3","Maelstrom","Stormbringer",55],["C","4.2","Riftblade","Runemaster",12],
      ["D","3.3","Fleshweaver","Bloodmage",329],["D","2.9","Ancestry","Barbarian",135],["D","2.9","Draconic","Pyromancer",56],["D","2.4","Inspiration","Guardian",404],["D","2.1","Grovekeeper","Primalist",865],["D","2.0","Wind","Stormbringer",118],["D","1.5","Farstrider","Ranger",13]
    ]},
    {key:"aoe",label:"Raid / World Boss · boss + adds DPS",unit:"kDPS",rows:[
      ["S","9.4","Death","Necromancer",41],["S","8.9","Zealot","Templar",688],["S","8.6","Rime","Necromancer",273],["S","7.9","Headhunter","Barbarian",161],["S","7.9","Animation","Necromancer",634],["S","7.8","Valkyrie","Sun Cleric",695],["S","7.8","Boltslinger","Witch Hunter",229],["S","7.8","Infinite","Chronomancer",577],
      ["A","7.8","Wildwalker","Primalist",372],["A","7.7","Hellfire","Knight of Xoroth",97],["A","7.6","Incineration","Pyromancer",297],["A","7.5","Gladiator","Guardian",239],["A","7.5","Brigand","Ranger",171],["A","7.4","Infernal","Felsworn",1160],["A","7.4","Mechanic","Tinker",431],["A","7.4","Houndmaster","Witch Hunter",397],["A","7.3","Stalking","Venomancer",49],["A","7.3","Archery","Ranger",854],
      ["B","7.1","Corruption","Cultist",161],["B","7.0","Harvest","Reaper",684],["B","6.8","Sanguine","Bloodmage",136],["B","6.8","Voodoo","Witch Doctor",246],["B","6.8","Inquisition","Witch Hunter",155],["B","6.7","Godblade","Cultist",360],["B","6.7","Artificer","Chronomancer",126],["B","6.7","Brutality","Barbarian",589],["B","6.6","Slayer","Felsworn",150],["B","6.6","War","Knight of Xoroth",719],["B","6.5","Engravement","Runemaster",778],["B","6.5","Accursed","Bloodmage",111],["B","6.5","Piety","Sun Cleric",140],["B","6.4","Rotweaver","Venomancer",564],["B","6.4","Shadowhunting","Witch Doctor",476],
      ["C","6.3","Warden","Starcaller",385],["C","6.1","Demolition","Tinker",228],["C","6.1","Sentinel","Starcaller",69],["C","6.1","Maelstrom","Stormbringer",55],["C","6.0","Soul","Reaper",136],["C","5.8","Geomancy","Primalist",49],["C","5.6","Glyphic","Runemaster",144],["C","5.3","Lightning","Stormbringer",240],["C","5.3","Crusader","Templar",362],["C","5.3","Riftblade","Runemaster",12],
      ["D","3.9","Fleshweaver","Bloodmage",332],["D","3.6","Ancestry","Barbarian",135],["D","3.6","Draconic","Pyromancer",56],["D","3.1","Inspiration","Guardian",404],["D","2.8","Grovekeeper","Primalist",865],["D","2.6","Wind","Stormbringer",118],["D","1.9","Farstrider","Ranger",13]
    ]},
    {key:"mplus",label:"Mythic+ · all key levels DPS",unit:"kDPS",rows:[
      ["S","8.8","Animation","Necromancer",1260],["S","7.0","Wildwalker","Primalist",597],["S","6.8","Rime","Necromancer",331],["S","6.7","Hellfire","Knight of Xoroth",138],["S","6.7","Gladiator","Guardian",286],["S","6.2","Brigand","Ranger",673],["S","6.1","Infinite","Chronomancer",351],["S","5.9","Houndmaster","Witch Hunter",262],
      ["A","5.9","Infernal","Felsworn",668],["A","5.8","Zealot","Templar",755],["A","5.8","Mechanic","Tinker",423],["A","5.7","Corruption","Cultist",396],["A","5.7","Brutality","Barbarian",640],["A","5.6","Lightning","Stormbringer",245],["A","5.5","Boltslinger","Witch Hunter",233],["A","5.4","Incineration","Pyromancer",74],["A","5.4","Valkyrie","Sun Cleric",678],["A","5.4","Inquisition","Witch Hunter",182],
      ["B","5.4","Accursed","Bloodmage",112],["B","5.4","Rotweaver","Venomancer",832],["B","5.3","Piety","Sun Cleric",154],["B","5.2","Headhunter","Barbarian",68],["B","5.1","Shadowhunting","Witch Doctor",339],["B","5.1","Demolition","Tinker",217],["B","5.0","War","Knight of Xoroth",648],["B","4.9","Voodoo","Witch Doctor",163],["B","4.9","Harvest","Reaper",536],["B","4.8","Sanguine","Bloodmage",92],["B","4.7","Archery","Ranger",358],["B","4.7","Godblade","Cultist",287],["B","4.6","Draconic","Pyromancer",222],["B","4.5","Engravement","Runemaster",308],
      ["C","4.5","Glyphic","Runemaster",233],["C","4.3","Stalking","Venomancer",63],["C","4.3","Soul","Reaper",43],["C","4.2","Slayer","Felsworn",211],["C","4.1","Crusader","Templar",325],["C","4.1","Artificer","Chronomancer",130],["C","3.8","Warden","Starcaller",251],["C","3.8","Riftblade","Runemaster",5],["C","3.7","Maelstrom","Stormbringer",34],["C","3.6","Death","Necromancer",7],
      ["D","3.3","Sentinel","Starcaller",44],["D","3.2","Inspiration","Guardian",60],["D","2.9","Grovekeeper","Primalist",387],["D","2.9","Ancestry","Barbarian",16],["D","2.3","Fleshweaver","Bloodmage",33],["D","2.2","Farstrider","Ranger",8],["D","2.1","Wind","Stormbringer",1]
    ]},
    {key:"heal",label:"Healing · HPS",unit:"HPS",rows:[
      ["S","1734","Heretic","Cultist",1113],["S","1636","Vizier","Venomancer",278],["A","1476","Flameweaver","Pyromancer",526],["B","1348","Invention","Tinker",901],["B","1111","Blessings","Sun Cleric",295],["B","1072","Time","Chronomancer",597],["C","1053","Moon Priest","Starcaller",277],["D","810","Brewing","Witch Doctor",224]
    ]},
    {key:"tank",label:"Tank-role DPS",unit:"kDPS",rows:[
      ["S","6.2","Eternal","Bloodmage",383],["S","3.9","Tyrant","Felsworn",131],["A","3.7","Seraphim","Sun Cleric",124],["A","3.7","Fortitude","Venomancer",358],["A","3.6","Defiance","Knight of Xoroth",22],["B","3.1","Mountain King","Primalist",128],["B","2.8","Domination","Reaper",127],["B","2.7","Vanguard","Guardian",204],["C","2.3","Moon Guard","Starcaller",25],["C","2.1","Black Knight","Witch Hunter",77],["C","2.1","Oathkeeper","Templar",132],["D","1.7","Dreadnought","Cultist",50]
    ]}
  ];

  const source = "https://coa.zalidan.com/tier-list-logs/";
  const details = document.createElement("details");
  const summary = document.createElement("summary"); summary.textContent="Expand August 12 log-derived DPS, HPS, tank, and Mythic+ snapshot";
  const note = document.createElement("p"); note.textContent="Third-party CoA Logs snapshot updated 2026-08-12. The page describes median DPS/HPS ranked within each category, quantile tier cutoffs, boss-only vs boss+adds modes, and a weak-sample flag below 10 parses. The Mythic+ section uses top-10 leaderboard rows per boss and key level pooled across levels, so compare only within that section. DPS values are rounded as displayed; tank numbers are DPS output in tank-role parses, not damage taken or survivability. This is not raw event data and the third-party methodology cannot be independently reproduced here.";
  const filters=document.createElement("div");filters.className="filters";
  const q=document.createElement("input");q.type="search";q.placeholder="Filter class or specialization";q.setAttribute("aria-label","Filter the August 12 log snapshot");
  const scope=document.createElement("select");scope.setAttribute("aria-label","Choose an August 12 log snapshot category");
  groups.forEach(group=>{const opt=document.createElement("option");opt.value=group.key;opt.textContent=group.label;scope.append(opt)});
  filters.append(q,scope);
  const count=document.createElement("p");
  const tableWrap=document.createElement("div");tableWrap.style.overflowX="auto";
  const table=document.createElement("table");table.innerHTML="<thead><tr><th>Source tier</th><th>Class</th><th>Specialization as listed</th><th>Displayed value</th><th>Parses</th></tr></thead>";
  const body=document.createElement("tbody");table.append(body);tableWrap.append(table);
  function render(){const group=groups.find(x=>x.key===scope.value);const query=q.value.trim().toLowerCase();const rows=group.rows.filter(r=>(r[2]+" "+r[3]).toLowerCase().includes(query));body.replaceChildren(...rows.map(([tier,value,spec,klass,parses])=>{const tr=document.createElement("tr");[tier,klass,spec,value+(group.unit==="kDPS"?"k":""),parses+(parses<10?" ⚠":"")].forEach(v=>{const td=document.createElement("td");td.textContent=v;tr.append(td)});return tr}));count.textContent=`${rows.length} shown · ${group.rows.length} entries in ${group.label} · values from 2026-08-12`}
  q.addEventListener("input",render);scope.addEventListener("change",render);render();
  const link=document.createElement("a");link.href=source;link.target="_blank";link.rel="noreferrer";link.textContent="Open original snapshot ↗";
  details.append(summary,note,filters,count,tableWrap,link);
  const card=document.createElement("div");card.className="card";const title=document.createElement("h3");title.textContent="August 12, 2026 · log-derived performance snapshot";card.append(title,details);
  meta.append(card);
  const notice=document.createElement("div");notice.className="card";notice.innerHTML="<strong>Historical performance snapshot added</strong><p>Open Meta / Tiers to filter 169 rows from the August 12 third-party log ranking snapshot, including boss-only DPS, boss-plus-adds DPS, Mythic+ DPS, HPS, and tank-role DPS.</p><a href=\"./explorer.html#meta\">View the full snapshot ↗</a>";
  logs.append(notice);
})();
