Rename the exported function `parseCfg` to `parseConfig` everywhere in this
project, keeping behavior identical:

- its definition in src/config/parseCfg.js (keep the filename as is)
- the eight modules that import it: src/app/alerts.js, src/app/billing.js,
  src/app/cache.js, src/app/dashboard.js, src/app/exporter.js,
  src/app/ingest.js, src/app/notify.js, src/app/search.js
- the barrel export in src/index.js
- the references in test/smoke.test.js

No occurrence of the old name may remain (import paths keep the filename).
