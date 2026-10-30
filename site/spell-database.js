"use strict";
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let rows=[],shown=60,classes={};
function render(){
 const q=$("q").value.trim().toLowerCase(),cl=$("class").value,def=$("defined").value;
 const matches=rows.filter(r=>(!cl||r.c.includes(Number(cl)))&&(!def||(def==="yes"===r.defined))&&(!q||String(r.id).includes(q)||String(r.n).toLowerCase().includes(q)||String(r.d).toLowerCase().includes(q)));
 $("status").textContent=matches.length.toLocaleString()+" matching spells · "+rows.length.toLocaleString()+" archived records";
 $("cards").innerHTML=matches.slice(0,shown).map(r=>'<article class="card"><div class="id">SPELL ID '+r.id+(r.defined?' · archived definition':' · definition unavailable')+'</div><h2>'+esc(r.n)+'</h2><div class="meta">Classes: '+r.c.map(c=>esc(classes[c]||c)).join(", ")+'<br>Candidate spec IDs: '+(r.s.join(", ")||"unassigned")+'<br>Cooldown: '+(r.cd==null?"unknown":esc(r.cd)+" ms")+' · Cast: '+(r.ct==null?"unknown":esc(r.ct)+" ms")+'<br>Duration: '+(r.du==null?"unknown":esc(r.du)+" ms")+' · Cost: '+(r.m==null?"unknown":esc(r.m))+'</div>'+(r.d?'<p class="desc">'+esc(r.d.replace(/<[^>]*>/g," ").replace(/&[a-z]+;/gi," "))+'</p>':'')+'</article>').join("");
 $("more").hidden=matches.length<=shown;
}
$("q").addEventListener("input",()=>{shown=60;render()});
$("class").addEventListener("change",()=>{shown=60;render()});
$("defined").addEventListener("change",()=>{shown=60;render()});
$("more").addEventListener("click",()=>{shown+=60;render()});
(async()=>{try{
 const [index,registry]=await Promise.all([fetch("./data/spell-search-index.json").then(r=>{if(!r.ok)throw Error("Spell index unavailable");return r.json()}),fetch("../datasets/normalized/coa-class-spec-id-registry.json").then(r=>r.ok?r.json():null).catch(()=>null)]);
 rows=index.records;
 if(registry)for(const s of registry.records)classes[s.classId]=s.className;
 const ids=[...new Set(rows.flatMap(r=>r.c))].sort((a,b)=>a-b);
 $("class").innerHTML='<option value="">All classes</option>'+ids.map(id=>'<option value="'+id+'">'+esc(classes[id]||"Class "+id)+'</option>').join("");
 render();
}catch(e){$("status").textContent="Unable to load spell database: "+e.message;}
})();
