---
"@epilot/cli": patch
---

Named profiles fail closed and tokens can be read from stdin. A profile named with `--profile` or `EPILOT_PROFILE` that does not exist now fails every command with `Profile "<name>" not found. Create it with: epilot profile create <name> --token …` (exit 1) instead of silently using the default login in `credentials.json`; `--token` / `EPILOT_TOKEN` still win, and `profile create`, `auth token --profile` and `auth login --profile` still create the profile. Pass the token as `-` to read it from stdin and keep it out of `ps` and shell history: `printf '%s' "$TOKEN" | epilot profile create <name> --token -`, `epilot auth token --profile <name> -`, `epilot auth login --profile <name> --token -`.
