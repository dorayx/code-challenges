# Day 06

## Challenge description

Deploy static HTML to GitHub Pages with Bazel + GitHub Action.

## Getting Started

### Use PNPM to install dependencies

```bash
pnpm install
```

### Use PNPM to develop

```bash
pnpm --filter day-06 dev
```

### Use Bazel to build and test

```bash
bazel build //challenges/day-06:build
bazel test //challenges/day-06:ut_test
```

## Build Assets

- The output directory is `/canary`
- The public assets path is `/code-challenges/canary`

## References

- Doc: [actions/upload-pages-artifact](https://github.com/actions/upload-pages-artifact)
- Doc: [aspect-build/bazel-lib - copy_to_directory](https://github.com/aspect-build/bazel-lib/blob/main/docs/copy_to_directory.md)
