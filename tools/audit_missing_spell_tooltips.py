#!/usr/bin/env python3
"""Cross-reference missing archived spell definitions against preserved tooltip records."""
import gzip,json,collections
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT/"datasets"
REL=BASE/"relationships"
SOURCE=BASE/"bulk/Bharph__coa-preservation-data/spell-tooltips/all-spell-tooltips-merged.ndjson.gz"
def gz(path):
    with gzip.open(path,"rt",encoding="utf-8") as f:return json.load(f)
def main():
    graph=gz(REL/"enriched-spells-by-id.json.gz")
    missing={k for k,v in graph.items() if "spellDefinition" not in v}
    found={}
    sample_keys=collections.Counter()
    scanned=0
    with gzip.open(SOURCE,"rt",encoding="utf-8") as f:
        for line in f:
            try: obj=json.loads(line)
            except ValueError:continue
            scanned+=1
            if not isinstance(obj,dict):continue
            sample_keys.update(obj.keys())
            sid=next((obj[k] for k in ("spellId","spellID","id") if type(obj.get(k)) is int),None)
            if sid is None or str(sid) not in missing:continue
            key=str(sid)
            found.setdefault(key,[]).append(obj)
    with gzip.open(REL/"historical-tooltip-fallbacks.json.gz","wt",encoding="utf-8") as f:
        json.dump(found,f,ensure_ascii=False,separators=(",",":"))
    report={"source":"Bharph/coa-preservation-data spell-tooltips/all-spell-tooltips-merged.ndjson",
            "versionStatus":"historical archive, not current Conquest Reborn",
            "missingDefinitionIds":len(missing),"tooltipRecordsScanned":scanned,
            "missingIdsWithHistoricalTooltip":len(found),
            "stillWithoutDefinitionOrHistoricalTooltip":len(missing)-len(found),
            "sourceFieldSample":dict(sample_keys.most_common(25)),
            "caution":"Historical tooltips are fallback evidence only, never treated as current spell effects."}
    (REL/"historical-tooltip-audit.json").write_text(json.dumps(report,indent=2)+"\n",encoding="utf-8")
    print(json.dumps(report,indent=2))
    assert scanned>0
if __name__=="__main__":main()
