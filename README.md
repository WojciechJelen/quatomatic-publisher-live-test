# Quatomatic Publisher Live Test

Private fixture repository for testing Quatomatic's GitHub PR publisher.

## What this repo provides

- A healthy Vite app on `main`.
- A PR branch that intentionally breaks the `/signup` route.
- A real GitHub pull request target for validating Quatomatic check runs and sticky PR comments.

## Local app commands

```bash
pnpm install
pnpm dev
```

## How to use this with Quatomatic

1. Deploy this repository or PR branch to a preview provider such as Vercel.
2. Use the preview URL for the broken PR branch, ideally with `/signup` appended.
3. Run Quatomatic from the `quatomatic` repo:

```bash
GITHUB_TOKEN=<github-app-installation-token> pnpm poc \
  --url <preview-url>/signup \
  --github-owner WojciechJelen \
  --github-repo quatomatic-publisher-live-test \
  --github-pr <pr-number> \
  --commit-sha <pr-head-sha>
```

Expected result: Quatomatic publishes a `Quatomatic QA` check run and updates one sticky PR comment.
