# Changesets

For versioning and publishing of the Equinor EnergyVision packages we use [Changesets](https://github.com/changesets/changesets)

## Development

- To make a new changeset to include in a commit: `pnpm publish`; This will build all packages in the folder `packages` and then it will do `changeset publish`
- Choose the packages that should be bumped with `arrowkeys` + `Space`

`🦋 Which packages would you like to include?`

Hit `Space` to choose the packages, then `Enter` to go forward.

`🦋 Which packages should have a major bump?`

Hit `Enter` to move on _*or*_ choose the packages that should have a major bump with `arrowkeys` + `Space`

`🦋 Which packages should have a minor bump?`

Hit `Enter` to move on _*or*_ choose the packages that should have a minor bump with `arrowkeys` + `Space`

If you dont choose major or minor the packages will get patch bump

- Commit og push.

## Fixed versioning

The packages has `fixed versioning`. This means bump on one package will bump all to same version.

```sh
  "@equinor/energyvision-tailwind-preset",
  ...
```
