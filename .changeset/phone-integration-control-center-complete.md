---
"@epilot/phone-integration-client": minor
"@epilot/sdk": minor
---

Phone Integration: the remaining control center operations — agent presence (`listAgentPresences`, `setAgentPresence`), insights (`getLiveKpis` with named periods or a custom `from`/`to` window, `getAgentPerformance`, `getQueuePerformance`), missed calls (`listMissedCalls`, `requestMissedCallCallback`), agent activity (`getAgentActivity`), queue and call handling settings (`getQueueSettings`, `setQueueSettings`, `getCallHandlingSettings`, `setCallHandlingSettings`) and the skill catalogue (`listSkills`, `createSkill`, `deleteSkill`, `setQueueSkill`, `removeQueueSkill`). `setAgentRouting` / `previewAgentRouting` accept `include_own_steps`; routing steps carry `team_members`.
