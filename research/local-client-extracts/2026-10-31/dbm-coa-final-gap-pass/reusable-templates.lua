-- Reusable state template; no live DBM registrations
CoAEncounterTemplates = CoAEncounterTemplates or {}
function CoAEncounterTemplates.ResetOnPhase(s,p) s.phase=p; s.lastCast={}; s.pending={} end
function CoAEncounterTemplates.RecordCast(s,id,t) s.lastCast[id]=t end
function CoAEncounterTemplates.Interval(s,id,t) local p=s.lastCast[id]; if p and t>=p then return t-p end end
