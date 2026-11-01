-- 3.3.5 best-effort local trainer capture; no network/chat transmission.
What'sTrainingCoA = What'sTrainingCoA or {}
What'sTrainingCoA.observations = What'sTrainingCoA.observations or {}
local function safe(name,...)
 local f=_G[name]; if type(f)~="function" then return nil end
 local ok,a,b,c,d=pcall(f,...); if ok then return a,b,c,d end
end
local function key(class,npc,spell) return tostring(class)..":"..tostring(npc or 0)..":"..tostring(spell or 0) end
function What'sTrainingCoA.CaptureTrainer()
 local class=select(2, UnitClass("player")) or "UNKNOWN"
 local npc=UnitGUID and UnitGUID("target") or nil
 local n=safe("GetNumTrainerServices") or 0
 for i=1,n do
  local name,rank,category= safe("GetTrainerServiceInfo",i)
  local cost=safe("GetTrainerServiceCost",i)
  local level=safe("GetTrainerServiceLevelReq",i)
  local skill,skillLevel=safe("GetTrainerServiceSkillReq",i)
  local spellId=safe("GetTrainerServiceSpellID",i)
  local k=key(class,npc,spellId or name)
  local old=What'sTrainingCoA.observations[k]
  local row={classToken=class,trainerGUID=npc,spellId=spellId,name=name,rank=rank,category=category,costCopper=cost,requiredLevel=level,requiredSkill=skill,requiredSkillLevel=skillLevel,source="live_trainer_api_observation",verified=false}
  if old then row.firstSeen=old.firstSeen; row.changes=old.changes or 0; row.changes=row.changes+1 end
  row.lastSeen=time and time() or nil; row.firstSeen=row.firstSeen or row.lastSeen
  What'sTrainingCoA.observations[k]=row
 end
 return n
end
local f=CreateFrame("Frame")
f:RegisterEvent("TRAINER_SHOW"); f:RegisterEvent("TRAINER_UPDATE")
f:SetScript("OnEvent",function() What'sTrainingCoA.CaptureTrainer() end)
