# RetailGuildPane-CoA client research

Static research only; the game was not launched. The client BUILD.txt identifies a Win32 release build, Interface 30300, with enUS data and MPQ archives. Guild API documentation exists under Interface/AddOns/APIDocumentation/Documentation/GuildDocumentation.lua and GuildBankDocumentation.lua. These are API documentation records, not runtime proof.

Installed addon directories include DragonUI, Guild_Roster_Manager, GuildQuickInvite, Mapster, LootCollector, Cell, Details, WeakAuras, SexyMap, Leatrix, AtlasLoot, Questie-X and ZygorGuidesViewerRM. Presence alone does not establish conflicts or compatibility.

Use the bundled diagnostic addon in a test account. It probes function types and asks for the guild roster only after login. It does not invite, promote, edit guild data, or send chat. Runtime output remains to be collected.

Build guidance: implement with legacy FrameXML widgets and 3.3.5 event/API patterns; do not depend on Retail C_Club, communities, ScrollBox, mixins, or atlas APIs without confirming runtime exposure. Reuse the original guild frame and GuildBankFrame where available; server permissions remain authoritative.
