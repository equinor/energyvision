Use this folder to create scripts for content migration.

## Steps:

1. Inside sanityv3 folder run `pnpx sanity migration create "Issue <ISSUE_NO>"` to create a migration script folder. You can choose the appropriate template or start with a basic one.
2. Open the `index.ts` file which is just created and modify the script.
3. Login to sanity from the cli using SSO `pnpm sanity login --sso <sso_slug>`
4. Run `pnpm sanity migration run issue-<ISSUE_NO> --project=<PROJECT_ID> --dataset=<DATASET>` for dry run, and verify the patches.
5. Run `pnpm sanity migration run issue-<ISSUE_NO> --project=<PROJECT_ID> --dataset=<DATASET> --no-dry-run` to migrate.
