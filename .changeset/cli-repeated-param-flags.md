---
"@epilot/cli": patch
---

Fix repeated `-p`/`--param` and `-H`/`--header` flags: only the last occurrence was used, so `epilot entity deleteEntity -p slug=contact -p id=<id> -p purge=true` dropped `slug` and `id` and prompted for them. Every occurrence is now honored.
