'use strict';

async function gearPage(params, token) {
  const cls = classFrom(params.get('class'));
  const spec = tabsOf(cls).find(t => String(t.tabId) === params.get('spec')) || tabsOf(cls)[0];
  const phase = params.get('phase') === '2' ? '2' : '1';
  const mode = params.get('mode') === 'planner' ? 'planner' : 'ranked';
  const [remote, equipment, catalogDoc, performance] = await Promise.all([
    json('remote.json'), json('equipment-rules.json'), json('item-catalog-p' + phase + '.json'), Promise.resolve(null),
  ]);
  if (token !== routeToken) return;

  const classPair = Object.entries(remote.classData).find(([, value]) => value.name === cls.name);
  const specPair = classPair && Object.entries(classPair[1].specs).find(([, row]) => row.name === labelTab(cls, spec));
  const file = classPair && specPair ? 'p' + phase + '-' + classPair[0] + '-' + specPair[0] + '.json' : null;
  renderSidebar(cls.key);
  app.innerHTML = hero('Gear research · Phase ' + phase,
    esc(labelTab(cls, spec)) + '<br><em>A closer look at your gear.</em>',
    'Explore recovered class gear rankings, search the combined item candidate catalog, or save a personal equipment set.') +
    '<div class="toolbar"><label>Class <select id="gear-class">' + classes.map(x => '<option value="' + x.key + '" ' + (x.key === cls.key ? 'selected' : '') + '>' + esc(x.name) + '</option>').join('') + '</select></label>' +
    '<label>Specialization <select id="gear-spec">' + tabsOf(cls).map(t => '<option value="' + t.tabId + '" ' + (t.tabId === spec.tabId ? 'selected' : '') + '>' + esc(labelTab(cls, t)) + '</option>').join('') + '</select></label>' +
    '<label>Phase <select id="gear-phase"><option value="1" ' + (phase === '1' ? 'selected' : '') + '>Phase 1</option><option value="2" ' + (phase === '2' ? 'selected' : '') + '>Phase 2</option></select></label></div>' +
    '<div class="gear-mode-tabs" role="tablist" aria-label="Gear views"><button type="button" role="tab" aria-selected="' + (mode === 'ranked') + '" data-gear-mode="ranked">Recovered BiS lists</button><button type="button" role="tab" aria-selected="' + (mode === 'planner') + '" data-gear-mode="planner">Personal gear planner</button></div>' +
    '<div class="notice">Rankings use the preserved Phase ' + phase + ' candidate pool from all 70 class/spec snapshots and the historical profile weights. Legal candidates are re-scored for the selected specialization. Weapon DPS is reconstructed from archived scores when possible; items missing recoverable weapon DPS are labeled and rank below complete weapon scores.</div>' +
    '<div id="gear-content" role="status">Loading recovered equipment data…</div>' +
    '<div class="sourcebar ba-credit"><strong>BoneArchive Gear &amp; BiS</strong> · Curated by Uncle Bone · Item sources and capture notes are collected in Sources.</div><div id="gear-tooltip" class="gear-tooltip" role="tooltip" hidden></div>';

  const route = (next = {}) => go('gear', { class: cls.key, spec: spec.tabId, phase, ...next });
  $('#gear-class').onchange = e => go('gear', { class: e.target.value, phase });
  $('#gear-spec').onchange = e => go('gear', { class: cls.key, spec: e.target.value, phase });
  $('#gear-phase').onchange = e => go('gear', { class: cls.key, spec: spec.tabId, phase: e.target.value, mode });
  $$('[data-gear-mode]').forEach(button => button.onclick = () => route({ mode: button.dataset.gearMode }));

  if (!file || !remote.gear.includes(file)) {
    $('#gear-content').innerHTML = empty('No recovered BisBeard profile is indexed for this specialization.');
    return;
  }
  let historical;
  try {
    const key = 'gear:' + file;
    if (!cache.has(key)) cache.set(key, fetch('https://raw.githubusercontent.com/Ryansousa10/coa-tier-list/' + remote.sha + '/public/data/bis/' + file)
      .then(r => { if (!r.ok) throw Error('Source returned ' + r.status); return r.json(); })
      .catch(e => { cache.delete(key); throw e; }));
    historical = await cache.get(key);
  } catch (e) {
    $('#gear-content').innerHTML = '<div class="empty"><p>The selected BisBeard profile could not be loaded.</p><p>' + esc(e.message) + '</p></div>';
    return;
  }
  if (token !== routeToken) return;

  const labels = {head:'Head',neck:'Neck',shoulders:'Shoulders',back:'Back',chest:'Chest',wrists:'Wrists',hands:'Hands',waist:'Waist',legs:'Legs',feet:'Feet',finger:'Finger',trinket:'Trinket',twohand:'Two-Hand',mainhand:'Main Hand',offhand:'Off Hand',ranged:'Ranged'};
  const sourceLabels = {cabeca:'Head',pescoco:'Neck',ombros:'Shoulders',costas:'Back',peito:'Chest',pulsos:'Wrists',maos:'Hands',cintura:'Waist',pernas:'Legs',pes:'Feet',anel:'Finger',berloque:'Trinket','arma de duas maos':'Two-Hand','mao principal':'Main Hand','mao secundaria':'Off Hand','a distancia':'Ranged'};
  const normalize = value => String(value || '').toLowerCase().replace(/\u00a0/g,' ').trim();
  const weaponType = value => {
    const key = normalize(value).replace(/^(two[- ]handed|one[- ]handed)\s*/,'').replace(/[^a-z]/g,'');
    return ({axes:'axe',maces:'mace',swords:'sword',daggers:'dagger',fists:'fist',bows:'bow',crossbows:'crossbow',wands:'wand',staves:'staff',guns:'gun',polearms:'polearm',thrownweapons:'thrown'})[key] || key;
  };
  const displaySlot = (raw, key) => labels[key] || sourceLabels[normalize(raw).normalize('NFD').replace(/[\u0300-\u036f]/g,'')] || raw || key;
  const weaponSlots = new Set(['Ranged','One-Hand','Main Hand','Off Hand','Two-Hand','Shield','Held In Off-hand']);
  const armorSlots = new Set(['Head','Shoulders','Chest','Wrists','Hands','Waist','Legs','Feet']);
  const weaponTypes = new Set(['axe','mace','sword','dagger','fist','bow','crossbow','wand','staff','gun','polearm','thrown']);
  const classWeapons = equipment.weaponPermissions?.[cls.name] || {};
  const specWeapons = equipment.specWeaponPermissions?.[cls.name]?.[labelTab(cls,spec)] || {};
  const weights = historical.weights || {};
  const catalog = catalogDoc.records || [];
  const excludedBySlot = new Map();
  const groups = [
    ['head','Head',['Head']],['neck','Neck',['Neck']],['shoulders','Shoulders',['Shoulders']],['back','Back',['Back']],
    ['chest','Chest',['Chest']],['wrists','Wrists',['Wrists']],['hands','Hands',['Hands']],['waist','Waist',['Waist']],
    ['legs','Legs',['Legs']],['feet','Feet',['Feet']],['finger','Finger',['Finger']],['trinket','Trinket',['Trinket']],
    ['twohand','Two-Hand',['Two-Hand']],['mainhand','Main Hand',['One-Hand','Main Hand']],
    ['offhand','Off Hand',['Off Hand','Shield','Held In Off-hand','One-Hand']],['ranged','Ranged',['Ranged']],
  ];
  const scoreItem = item => {
    const stats = item.stats || {};
    const spellWeight = Math.max(Number(weights.spellPower) || 0, Number(weights.spellDamage) || 0);
    let score = Object.entries(weights).reduce((sum,[key,value]) => {
      if (key === 'spellDamage' || key === 'weaponDps' || key === 'rangedDps') return sum;
      const statValue = key === 'spellPower' ? Math.max(Number(stats.spellPower) || 0, Number(stats.spellDamage) || 0) : Number(stats[key]) || 0;
      const statWeight = key === 'spellPower' ? spellWeight : Number(value) || 0;
      return sum + statValue * statWeight;
    }, 0);
    const isRange = item.slot === 'Ranged';
    const dpsWeight = isRange ? Number(weights.rangedDps || 0) : Number(weights.weaponDps || 0);
    const dps = isRange ? item.rangedDps : item.weaponDps;
    const requiresDps = weaponSlots.has(item.slot) && dpsWeight > 0 && item.type !== 'Shield' && item.slot !== 'Held In Off-hand';
    if (Number.isFinite(Number(dps)) && dpsWeight) score += Number(dps) * dpsWeight;
    return { score: Math.round(score * 10) / 10, incomplete: requiresDps && !(Number(dps) > 0) };
  };
  const eligible = (item, group) => {
    if (armorSlots.has(item.slot) && ['Cloth','Leather','Mail','Plate'].includes(item.type)) {
      if (!(equipment.armorPermissions?.[cls.name] || []).includes(item.type)) return false;
    }
    if (weaponSlots.has(item.slot)) {
      const type = weaponType(item.type);
      const shield = item.type === 'Shield' || item.slot === 'Shield';
      const heldOffhand = item.slot === 'Held In Off-hand';
      if (shield && item.slot === 'Off Hand' && !classWeapons.shield && !specWeapons.shieldRequiredTalentNodeId) return false;
      if (!shield && !heldOffhand && weaponTypes.has(type)) {
        if (!(classWeapons.allowedTypes || []).some(value => weaponType(value) === type)) return false;
        if (item.slot === 'Ranged' && specWeapons.allowedRangedWeaponTypes && !specWeapons.allowedRangedWeaponTypes.some(value => weaponType(value) === type)) return false;
        if (['One-Hand','Main Hand'].includes(item.slot) && (classWeapons.noOneHanded || []).some(value => weaponType(value) === type)) return false;
        if (item.slot === 'Two-Hand' && (classWeapons.noTwoHanded || []).some(value => weaponType(value) === type)) return false;
        if (group === 'offhand' && ['One-Hand','Main Hand'].includes(item.slot)) {
          const dualWield = specWeapons.dualWield || (classWeapons.dualWield ? 'oneHand' : 'none');
          const types = specWeapons.oneHandDualWieldTypes || [];
          if (item.slot === 'Main Hand' || (['none','twoHand'].includes(dualWield) && !types.some(value => weaponType(value) === type))) return false;
          if (types.length && !types.some(value => weaponType(value) === type)) return false;
        }
        if (group === 'offhand' && item.slot === 'Two-Hand') {
          if ((specWeapons.dualWield || 'none') !== 'twoHand') return false;
          if ((specWeapons.twoHandDualWieldBlockedTypes || []).some(value => weaponType(value) === type)) return false;
        }
      }
    }
    return true;
  };

  const itemKey = item => [item.id,item.slot,item.type,JSON.stringify(item.stats || {})].join('::');
  const byKey = new Map();
  const chosen = new Map();
  const ranked = groups.map(([key,label,slots]) => {
    const candidates = catalog.filter(item => slots.includes(item.slot) && eligible(item,key)).map(item => {
      const score = scoreItem(item);
      const gatedShield = (item.type === 'Shield' || item.slot === 'Shield') && !classWeapons.shield && specWeapons.shieldRequiredTalentNodeId;
      return {...item,slotKey:key,score:score.score,scoreIncomplete:score.incomplete,...(gatedShield?{eligibilityNote:'Requires talent node '+specWeapons.shieldRequiredTalentNodeId,requiredTalentNodeId:specWeapons.shieldRequiredTalentNodeId}:{})};
    }).filter(item => item.score > 0).sort((a,b) => Number(a.scoreIncomplete)-Number(b.scoreIncomplete) || b.score-a.score || Number(b.ilvl||0)-Number(a.ilvl||0));
    candidates.forEach(item => byKey.set(itemKey(item),item));
    if (!candidates.length) excludedBySlot.set(key,(catalog.filter(item=>slots.includes(item.slot)).length));
    return {key,label,items:candidates};
  });
  const allowedGroups = ranked.filter(slot => slot.items.length || slot.key === 'offhand');
  const sourceSlots = new Map((historical.slots || []).map(slot => [slot.key,slot]));
  const listRows = allowedGroups.map(slot => ({...slot,sourceCount:sourceSlots.get(slot.key)?.items?.length || 0}));
  const itemById = new Map();
  for (const slot of listRows) for (const item of slot.items) itemById.set(String(item.id),item);
  const selected = new Map();
  const tooltip = $('#gear-tooltip');
  const imageMarkup = item => image(item,'gear-piece-icon');
  let previewCloseTimer = 0;
  function previewMarkup(item) {
    const stats = Object.entries(item.stats || {});
    const archive='https://ascension-db.ascension-archive.workers.dev/#search?kind=planner-item&q='+encodeURIComponent(item.name);
    return '<div class="gear-piece-summary">' + imageMarkup(item) + '<div class="gear-piece-copy"><button type="button" class="gear-preview-trigger" data-item-preview="' + esc(itemKey(item)) + '" aria-label="Preview ' + esc(item.name) + ' stats">' + esc(item.name) + '</button><div class="gear-tags"><span>' + esc(item.quality || 'Item') + '</span><span>iLvl ' + esc(item.ilvl || '—') + '</span><span>Weighted score ' + esc(item.score) + (item.scoreIncomplete ? ' · partial' : '') + '</span>' + (item.eligibilityNote ? '<span class="gear-conditional-tag">' + esc(item.eligibilityNote) + '</span>' : '') + '</div><p>' + esc(item.source || 'Source unknown') + '</p><a class="gear-archive-link" href="' + esc(archive) + '" target="_blank" rel="noopener">Search preserved CoA item records ↗</a></div></div><div class="gear-stat-chips">' + stats.slice(0,4).map(([key,value]) => '<span>' + esc(key) + ' <b>' + esc(value) + '</b></span>').join('') + (stats.length > 4 ? '<details><summary>All ' + stats.length + ' stats</summary><div>' + stats.slice(4).map(([key,value]) => '<span>' + esc(key) + ' <b>' + esc(value) + '</b></span>').join('') + '</div></details>' : '') + (item.scoreIncomplete ? '<small class="gear-dps-note">Weapon DPS was not preserved for this candidate, so its displayed score uses recorded stats only.</small>' : '') + '</div>';
  }
  function showPreview(item, anchor) {
    clearTimeout(previewCloseTimer);
    const archive='https://ascension-db.ascension-archive.workers.dev/#search?kind=planner-item&q='+encodeURIComponent(item.name);
    const statNames={agility:'Agility',strength:'Strength',intellect:'Intellect',stamina:'Stamina',spirit:'Spirit',attackPower:'Attack power',rangedAttackPower:'Ranged attack power',spellPower:'Spell power',spellDamage:'Spell power',healingPower:'Healing power',critRating:'Critical strike',hitRating:'Hit rating',hasteRating:'Haste',armorPenetration:'Armor penetration',spellPenetration:'Spell penetration',expertise:'Expertise',defense:'Defense',dodge:'Dodge',parry:'Parry',block:'Block',blockValue:'Block value',shieldBlockValue:'Shield block value',armor:'Armor',fireResist:'Fire resistance',natureResist:'Nature resistance',frostResist:'Frost resistance',shadowResist:'Shadow resistance',arcaneResist:'Arcane resistance'};
    const statLines=Object.entries(item.stats || {}).map(([key,value]) => '<div><span>' + esc(statNames[key]||key.replace(/([A-Z])/g,' $1').replace(/^./,x=>x.toUpperCase())) + '</span><b>' + esc(value) + '</b></div>').join('');
    const weaponLines=(item.rangedDps?'<div class="gear-preview-estimate"><span>Ranged DPS (estimated)</span><b>'+esc(item.rangedDps)+'</b></div>':'')+(item.weaponDps?'<div class="gear-preview-estimate"><span>Weapon DPS (estimated)</span><b>'+esc(item.weaponDps)+'</b></div>':'');
    tooltip.innerHTML = '<div class="gear-preview-head">' + imageMarkup(item) + '<div><strong class="quality-' + esc(normalize(item.quality||'').replace(/[^a-z]/g,'')) + '">' + esc(item.name) + '</strong><span>' + esc(item.quality || 'Item') + (item.ilvl?' · Item Level '+esc(item.ilvl):'') + '</span></div></div><div class="gear-tooltip-slot">' + esc(item.type || '') + '<span>' + esc(displaySlot(item.slot,'')) + '</span></div>' + ((statLines||weaponLines)?'<div class="gear-preview-stats">'+statLines+weaponLines+'</div>':'<p>No stat lines were preserved for this record.</p>') + '<div class="gear-tooltip-source"><span>' + esc(item.source || 'Source unknown') + '</span><span>Item ' + esc(item.id) + '</span></div><div class="gear-preview-score' + (item.scoreIncomplete ? ' is-partial' : '') + '" title="Historical candidate score calculated from the preserved profile weights">Historical score <b>' + esc(item.score) + (item.scoreIncomplete ? ' · partial' : '') + '</b></div><a class="gear-archive-link" href="' + esc(archive) + '" target="_blank" rel="noopener">Open preserved item record ↗</a>' + (item.eligibilityNote ? '<small class="gear-conditional-tag">' + esc(item.eligibilityNote) + '</small>' : '');
    wireImages(tooltip);
    tooltip.hidden = false;
    const rect = anchor.getBoundingClientRect(), width = Math.min(360,innerWidth-24), left = Math.max(12,Math.min(innerWidth-width-12,rect.left));
    tooltip.style.width = width + 'px'; tooltip.style.left = left + 'px';
    const height=tooltip.offsetHeight, below=rect.bottom+10;
    tooltip.style.top = (below+height <= innerHeight-12 ? below : Math.max(12,rect.top-height-10)) + 'px';
  }
  const closePreviewSoon = () => { clearTimeout(previewCloseTimer); previewCloseTimer=setTimeout(()=>{tooltip.hidden=true;},180); };
  tooltip.onmouseenter=()=>clearTimeout(previewCloseTimer);
  tooltip.onmouseleave=closePreviewSoon;
  function bindPreviews() {
    for (const button of $$('.gear-preview-trigger',$('#gear-results'))) {
      const item = byKey.get(button.dataset.itemPreview); if (!item) continue;
      button.onmouseenter = () => showPreview(item,button); button.onfocus = () => showPreview(item,button);
      button.onmouseleave = closePreviewSoon; button.onblur = closePreviewSoon;
    }
  }

  function comparison() {
    const rows = [...selected.values()];
    $('#gear-compare').innerHTML = rows.length ? '<section class="gear-compare card"><div class="sectionline" style="margin:0"><h3>Compare candidates</h3><button class="button secondary small" id="clear-compare">Clear comparison</button></div><div class="doc-table"><table><thead><tr><th>Attribute</th>' + rows.map(item => '<th>' + esc(item.name) + '</th>').join('') + '</tr></thead><tbody>' + ['Score','Item level',...new Set(rows.flatMap(item => Object.keys(item.stats || {})))].map(key => '<tr><td>' + esc(key) + '</td>' + rows.map(item => '<td>' + esc(key === 'Score' ? item.score : key === 'Item level' ? item.ilvl : item.stats?.[key] ?? '—') + '</td>').join('') + '</tr>').join('') + '</tbody></table></div></section>' : '';
    const clear = $('#clear-compare'); if (clear) clear.onclick = () => { selected.clear(); comparison(); paintRanked(); };
  }
  function paintRanked() {
    const query = $('#gear-query').value.toLowerCase(), only = $('#gear-slot').value;
    let count = 0;
    $('#gear-results').innerHTML = listRows.filter(slot => !only || slot.key === only).map(slot => {
      const items = slot.items.filter(item => [item.name,item.source,item.id].join(' ').toLowerCase().includes(query)); count += items.length;
      if (!items.length) return '';
      const previous = items.find(item => itemKey(item) === chosen.get(slot.key)) || items[0]; chosen.set(slot.key,itemKey(previous));
      const rank = items.indexOf(previous) + 1;
      return '<section class="gear-slot-card"><div class="gear-slot-heading"><div><span class="eyebrow">EQUIPMENT SLOT</span><h2>' + esc(slot.label) + '</h2></div><label class="gear-rank-select">Ranked candidates<select data-gear-choice="' + esc(slot.key) + '">' + items.slice(0,6).map((item,index) => '<option value="' + esc(itemKey(item)) + '" ' + (itemKey(item) === itemKey(previous) ? 'selected' : '') + '>#' + (index+1) + ' · ' + esc(item.name) + ' · ' + esc(item.score) + (item.scoreIncomplete ? ' · DPS missing' : '') + '</option>').join('') + '</select></label></div><div class="gear-selected-item"><span class="gear-best-badge">#' + rank + ' of ' + items.length + '</span>' + previewMarkup(previous) + '<div class="gear-item-actions"><button class="button secondary small" data-compare-item="' + esc(itemKey(previous)) + '">' + (selected.has(itemKey(previous)) ? 'Remove from comparison' : 'Compare item') + '</button></div></div></section>';
    }).join('');
    $('#gear-count').textContent = count + ' eligible candidates across ' + listRows.filter(slot => !only || slot.key === only).length + ' equipment slots · Phase ' + phase + ' · catalog built from 140 recovered class/spec lists';
    for (const select of $$('[data-gear-choice]')) select.onchange = () => { chosen.set(select.dataset.gearChoice,select.value); paintRanked(); };
    for (const button of $$('[data-compare-item]')) button.onclick = () => { const item=byKey.get(button.dataset.compareItem), key=itemKey(item); if (selected.has(key)) selected.delete(key); else if (selected.size >= 4) { toast('Compare up to four candidates at a time.'); return; } else selected.set(key,item); comparison(); paintRanked(); };
    bindPreviews(); wireImages();
  }

  const slotStorageKey = 'bone-gear-sets-v1';
  const setId = cls.key + '|' + spec.tabId + '|' + phase;
  const readSavedSets = () => { try { return JSON.parse(localStorage.getItem(slotStorageKey) || '[]'); } catch { return []; } };
  const bestFor = key => listRows.find(slot => slot.key === key)?.items[0] || null;
  const plannerRows = listRows.flatMap(slot => ['finger','trinket'].includes(slot.key)
    ? [{...slot,key:slot.key+'1',poolKey:slot.key,label:(slot.key==='finger'?'Ring':'Trinket')+' 1'},{...slot,key:slot.key+'2',poolKey:slot.key,label:(slot.key==='finger'?'Ring':'Trinket')+' 2'}]
    : [{...slot,poolKey:slot.key}]);
  const nextBest = (key,excluded=new Set()) => (listRows.find(slot=>slot.key===key)?.items||[]).find(item=>!excluded.has(String(item.id)))||null;
  const defaultWeaponMode = () => {
    const two=bestFor('twohand'),main=bestFor('mainhand'),off=bestFor('offhand');
    return two && (!main || two.score >= main.score + (off?.score || 0)) ? 'twohand' : 'onehand';
  };
  function recommendedSet(name='My gear set') {
    const weaponMode=defaultWeaponMode(), choices={};
    for (const slot of plannerRows) {
      if (['twohand','mainhand','offhand'].includes(slot.key)) continue;
      const excluded=new Set(Object.entries(choices).filter(([key])=>key.startsWith('finger')||key.startsWith('trinket')).map(([,value])=>String(value).split('::')[0]));
      const item=nextBest(slot.poolKey,excluded);
      if (item) choices[slot.key]=itemKey(item);
    }
    if (weaponMode==='twohand') { if (bestFor('twohand')) choices.twohand=itemKey(bestFor('twohand')); }
    else { if (bestFor('mainhand')) choices.mainhand=itemKey(bestFor('mainhand')); if (bestFor('offhand')) choices.offhand=itemKey(bestFor('offhand')); }
    return {id:setId,name,classKey:cls.key,className:cls.name,specId:spec.tabId,specName:labelTab(cls,spec),phase,weaponMode,choices};
  }
  function paintPlanner(existing) {
    const savedSets=readSavedSets().filter(row => row.id === setId);
    let current=existing || savedSets[0] || recommendedSet('My '+labelTab(cls,spec)+' set');
    let query='';
    $('#gear-results').innerHTML='<section class="gear-planner card"><div class="gear-planner-head"><div><span class="eyebrow">PERSONAL LOADOUT</span><h2>Build and save your gear</h2><p>Start with the strongest eligible candidate in each slot, replace pieces from the phase catalog, and save sets in this browser.</p></div><div class="gear-planner-controls"><input id="gear-set-name" value="'+esc(current.name)+'" maxlength="48" aria-label="Gear set name"><button class="button" id="save-gear-set">Save set</button><button class="button secondary" id="reset-gear-set">Use ranked recommendations</button></div></div><div class="toolbar gear-planner-tools"><input id="planner-search" type="search" placeholder="Search item names, stats or drop sources…" aria-label="Search planner items"><a class="button secondary" href="https://ascension-db.ascension-archive.workers.dev/#search?kind=planner-item" target="_blank" rel="noopener">Browse full archived planner catalog ↗</a><select id="planner-saved" aria-label="Load saved gear set"><option value="">Saved sets for this specialization</option>'+savedSets.map((row,index)=>'<option value="'+index+'">'+esc(row.name)+'</option>').join('')+'</select><label>Weapon setup <select id="planner-weapon-mode">'+(bestFor('twohand')?'<option value="twohand" '+(current.weaponMode==='twohand'?'selected':'')+'>Two-handed</option>':'')+'<option value="onehand" '+(current.weaponMode==='onehand'?'selected':'')+'>Main hand '+(bestFor('offhand')?'and off hand':'only')+'</option></select></label></div><div class="gear-planner-total" id="planner-total"></div><div class="gear-planner-slots" id="planner-slots"></div><p class="gear-planner-note">Personal sets are saved locally in this browser. The local score catalog contains candidates from all 140 recovered phase/spec lists; the full archived planner catalog opens in a separate tab. Weapon DPS is estimated when recoverable from archived scores.</p></section>';
    const search=$('#planner-search'); search.value=query;
    function repaint() {
      query=search.value.toLowerCase();
      current.weaponMode=$('#planner-weapon-mode').value;
    const visible=plannerRows.filter(slot => !['twohand','mainhand','offhand'].includes(slot.key) || (current.weaponMode==='twohand'?slot.key==='twohand':['mainhand','offhand'].includes(slot.key)));
      let total=0;
      $('#planner-slots').innerHTML=visible.map(slot=>{
        const selectedKey=current.choices[slot.key]||'';
        const pool=listRows.find(row=>row.key===slot.poolKey)?.items||[];
        const matching=pool.filter(item=>!query||[item.name,item.source,item.type,...Object.entries(item.stats||{}).flat()].join(' ').toLowerCase().includes(query));
        const selectedItem=pool.find(item=>itemKey(item)===selectedKey);
        const options=(selectedItem&&!matching.some(item=>itemKey(item)===selectedKey)?[selectedItem,...matching]:matching).map(item=>'<option value="'+esc(itemKey(item))+'" '+(itemKey(item)===selectedKey?'selected':'')+'>'+esc(item.name)+' · '+esc(item.type||item.slot)+' · '+esc(item.score)+(item.scoreIncomplete?' · incomplete DPS':'')+'</option>').join('');
        const choice=selectedItem||null; if(choice)total+=choice.score;
        return '<article class="gear-planner-slot"><div class="gear-planner-slot-top"><span class="eyebrow">'+esc(slot.label.toUpperCase())+'</span><strong>'+(choice?'Score '+esc(choice.score)+(choice.scoreIncomplete?' · partial':''):'Choose a piece')+'</strong></div><select data-plan-slot="'+esc(slot.key)+'" aria-label="Choose '+esc(slot.label)+' item"><option value="">— Select an item —</option>'+options+'</select>'+(choice?previewMarkup(choice):'<p class="gear-planner-empty">No eligible item in this phase candidate catalog.</p>')+'</article>';
      }).join('');
      const offhandRow=visible.find(slot=>slot.key==='offhand');
      let offhandMessage='';
      if(current.weaponMode==='twohand') offhandMessage='Off hand is empty because a two-handed weapon is selected.';
      else if(!bestFor('offhand')) offhandMessage='Off hand is unavailable under the preserved class and specialization rules.';
      if(offhandMessage&&!offhandRow) $('#planner-slots').insertAdjacentHTML('beforeend','<div class="gear-planner-empty-wide">'+esc(offhandMessage)+'</div>');
      $('#planner-total').innerHTML='<span>Combined candidate score</span><strong>'+total.toFixed(1)+'</strong><small>Historical linear weights · score is a comparison aid, not a simulation</small>';
      for(const select of $$('[data-plan-slot]')) select.onchange=()=>{
        const key=select.dataset.planSlot, value=select.value;
        if(value) current.choices[key]=value; else delete current.choices[key];
        if(key==='twohand'&&value){current.weaponMode='twohand';$('#planner-weapon-mode').value='twohand';delete current.choices.mainhand;delete current.choices.offhand;}
        if(key==='mainhand'&&value){current.weaponMode='onehand';$('#planner-weapon-mode').value='onehand';delete current.choices.twohand;}
        repaint();
      };
      bindPreviews(); wireImages();
    }
    search.oninput=repaint; $('#planner-weapon-mode').onchange=()=>{current.weaponMode=$('#planner-weapon-mode').value;if(current.weaponMode==='twohand'){delete current.choices.mainhand;delete current.choices.offhand;}else delete current.choices.twohand;repaint();};
    $('#planner-saved').onchange=()=>{const idx=Number($('#planner-saved').value);if(Number.isInteger(idx)&&savedSets[idx])paintPlanner(savedSets[idx]);};
    $('#save-gear-set').onclick=()=>{
      current.name=$('#gear-set-name').value.trim()||'My '+labelTab(cls,spec)+' set';
      current.classKey=cls.key;current.className=cls.name;current.specId=spec.tabId;current.specName=labelTab(cls,spec);current.phase=phase;current.id=setId;
      const all=readSavedSets().filter(row=>!(row.id===setId&&row.name===current.name));all.unshift(current);
      try{localStorage.setItem(slotStorageKey,JSON.stringify(all));toast('Gear set saved in this browser.');paintPlanner(current);}catch{toast('This browser could not save the gear set.');}
    };
    $('#reset-gear-set').onclick=()=>paintPlanner(recommendedSet('My '+labelTab(cls,spec)+' set'));
    repaint();
  }
  function recommendedSummary(){const picks=[];for(const slot of listRows){if(['finger','trinket'].includes(slot.key)){for(let n=0;n<2;n++){const item=slot.items[n];if(item)picks.push({slot:(slot.key==='finger'?'Ring ':'Trinket ')+(n+1),item});}}else if(slot.key==='twohand'){if(!listRows.find(x=>x.key==='mainhand')?.items.length||slot.items[0]?.score>=(listRows.find(x=>x.key==='mainhand')?.items[0]?.score||0)+(listRows.find(x=>x.key==='offhand')?.items[0]?.score||0)){if(slot.items[0])picks.push({slot:slot.label,item:slot.items[0]});}}else if(!['mainhand','offhand'].includes(slot.key)){if(slot.items[0])picks.push({slot:slot.label,item:slot.items[0]});}}const hasTwo=picks.some(x=>x.slot==='Two-Hand');if(!hasTwo){for(const k of ['mainhand','offhand']){const slot=listRows.find(x=>x.key===k);if(slot?.items[0])picks.push({slot:slot.label,item:slot.items[0]});}}return picks;}
function paint() {
    if (mode==='planner') { paintPlanner(); return; }
    $('#gear-results').innerHTML='';
    const query=$('#gear-query').value.toLowerCase(), only=$('#gear-slot').value; let count=0;
    $('#gear-results').innerHTML=listRows.filter(slot=>!only||slot.key===only).map(slot=>{
      const matches=slot.items.filter(item=>[item.name,item.source,item.id].join(' ').toLowerCase().includes(query));count+=matches.length;if(!matches.length)return '';
      const previous=matches.find(item=>itemKey(item)===chosen.get(slot.key))||matches[0];chosen.set(slot.key,itemKey(previous));const rank=matches.indexOf(previous)+1;
      return '<section class="gear-slot-card"><div class="gear-slot-heading"><div><span class="eyebrow">EQUIPMENT SLOT</span><h2>'+esc(slot.label)+'</h2></div><label class="gear-rank-select">Ranked candidates<select data-gear-choice="'+esc(slot.key)+'">'+matches.slice(0,6).map((item,index)=>'<option value="'+esc(itemKey(item))+'" '+(itemKey(item)===itemKey(previous)?'selected':'')+'>#'+(index+1)+' · '+esc(item.name)+' · '+esc(item.score)+(item.scoreIncomplete?' · DPS missing':'')+'</option>').join('')+'</select></label></div><div class="gear-selected-item"><span class="gear-best-badge">#'+rank+' of '+matches.length+'</span>'+previewMarkup(previous)+'<div class="gear-item-actions"><button class="button secondary small" data-compare-item="'+esc(itemKey(previous))+'">'+(selected.has(itemKey(previous))?'Remove from comparison':'Compare item')+'</button></div></div></section>';
    }).join('');
    $('#gear-count').textContent=count+' eligible candidates across '+listRows.filter(slot=>!only||slot.key===only).length+' slots · re-scored with '+esc(cls.name)+' — '+esc(labelTab(cls,spec))+' weights · Phase '+phase+' · catalog: '+catalog.length+' recovered item variants';
    for(const select of $$('[data-gear-choice]'))select.onchange=()=>{chosen.set(select.dataset.gearChoice,select.value);paint();};
    for(const button of $$('[data-compare-item]'))button.onclick=()=>{const item=byKey.get(button.dataset.compareItem),key=itemKey(item);if(selected.has(key))selected.delete(key);else if(selected.size>=4){toast('Compare up to four candidates at a time.');return;}else selected.set(key,item);comparison();paint();};
    bindPreviews();wireImages();
  }
  if(mode==='planner') { $('#gear-content').innerHTML='<div id="gear-results" class="gear-slot-list"></div>'; paintPlanner(); }
  else {
    const recommendations=recommendedSummary();
    const totalScore=Math.round(recommendations.reduce((sum,x)=>sum+x.item.score,0)*10)/10;
    $('#gear-content').innerHTML='<section class="card gear-evidence-note"><h2>Observed player gear vs ranked candidates</h2><p>The combat archive contains aggregate performance rows, but no player equipment snapshots linked to them. The set below is a scored combination of eligible Phase '+phase+' candidates using this specialization’s recovered profile. It is a candidate set, not gear observed on top-performing players or an author-verified BiS set.</p></section><section class="card gear-set-recommendation"><span class="eyebrow">PHASE '+phase+' · ESTIMATED CANDIDATE SET</span><h2>Highest-scoring eligible set</h2><p>Combined weighted score '+totalScore+' · '+recommendations.length+' filled slots. These are the best candidates in each slot under this archived scoring model, not a set observed on top-performing players.</p><div class="gear-recommended-grid">'+recommendations.map(x=>'<div><span class="muted">'+esc(x.slot)+'</span><strong>'+esc(x.item.name)+'</strong><span>'+esc(x.item.score)+(x.item.scoreIncomplete?' · partial DPS':'')+'</span></div>').join('')+'</div><button class="button" id="open-recommended-planner">Open and edit this set</button></section><div class="toolbar"><input id="gear-query" type="search" aria-label="Search gear" placeholder="Search item names or sources…"><select id="gear-slot" aria-label="Equipment slot"><option value="">All slots</option>'+listRows.map(slot=>'<option value="'+esc(slot.key)+'">'+esc(slot.label)+'</option>').join('')+'</select></div><div id="gear-count" class="scope-count"></div><div id="gear-compare"></div><div id="gear-results" class="gear-slot-list"></div>';
    $('#gear-query').oninput=paint;$('#gear-slot').onchange=paint;$('#open-recommended-planner').onclick=()=>go('gear',{class:cls.key,spec:spec.tabId,phase,mode:'planner'});comparison();paint();
  }
}
