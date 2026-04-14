# Contributing

The epilot Javascript SDK is free and open source software. PRs welcome!

## Updating clients (epilot internal)

To update a client package with a new API definition, you should have made the changes already on the current API repo.

```bash
## navigate into you client folder
cd clients/entity-client

## update openapi.json with the new API spec (if already deployed to prod)
npm run openapi

## shortcut: if the desired openapi spec is still deploying, but will be in prod soon.
npm run openapi <path/to/local/openapi.yml>

## build and generate new types
npm run typegen && npm run build

## increment the version number in package.json
## to increment the minor or major version number instead, replace "patch" with "minor" or "major" in the below command
npm version patch --no-git-tag-version

## commit your changes
git commit -am 'chore(entity-client): update client with new spec'
```

## Auto-release (`@epilot/sdk`)

When changes to any `clients/*/openapi.json` file land on `main`, the CI automatically:

1. Detects which OpenAPI specs changed
2. Regenerates types and rebuilds `@epilot/sdk`
3. Runs tests
4. Bumps the patch version, commits, and creates a git tag
5. Publishes the new version to npm

This means most SDK updates require no manual publishing — just merge your client spec changes and the release happens automatically.

## Publishing packages (epilot internal)

This monorepo uses [Changesets](https://github.com/changesets/changesets) for version management and publishing.

### Creating a changeset for a single package

```bash
# Create a changeset (interactive prompt)
pnpm changeset

# Apply version bumps
pnpm version-packages

# Publish to npm (requires 2FA)
pnpm publish-packages
```

### Publishing all client packages with a version bump

To bump and publish all client packages at once:

```bash
# 1. Create a changeset file manually or use the changeset command
# Example: .changeset/minor-bump-all-clients.md with all client packages listed

# 2. Apply version bumps to all packages
pnpm version-packages

# 3. Publish all updated packages (requires 2FA authentication)
pnpm publish-packages # NOTE: you may need to run this multiple times due to NPM rate limiting
```

### Manual changeset creation

For bulk updates, create a file in `.changeset/` directory:

```markdown
---
"@epilot/entity-client": minor
"@epilot/file-client": patch
---

Description of changes
```

### Available scripts

- `pnpm changeset` - Create a new changeset
- `pnpm version-packages` - Apply version bumps based on changesets
- `pnpm publish-packages` - Publish updated packages to npm
