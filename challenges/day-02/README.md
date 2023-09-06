# Day 02

## Challenge description

Integrate NodeJS + PNPM Workspace + React + TypeScript + Vite + Vitest with Bazel

- [x] NodeJS (+ nvmrc)
- [x] PNPM Workspace
- [x] Vite
- [x] Vitest
- [x] React
- [x] TypeScript

**TODO**

- [ ] Husky
- [ ] Workspace Linters (ESLint, Prettier, Commitlint, LintStaged, etc)

## Getting Started

### Use PNPM to install dependencies

```bash
pnpm install
```

### Use PNPM to develop

```bash
pnpm --filter day-02 dev
```

### Use Bazel to build and test

```bash
bazel build //challenges/day-02:build
bazel test //challenges/day-02:ut_test
```

## Notices

### NodeJS Workspace

We use `aspect/rules-js#npm_translate_lock`, which imitates behaviours of PNPM Workspace, to integrate NodeJS Workspace with Bazel,
and it requires some manual steps to make it work:

Every time when a new package is added to or removed from the workspace:

1. Update `npm_translate_lock`'s `data` properties in `WORKSPACE.bazel`

```starlark
npm_translate_lock(
    # ...
    data = [
        "@//:challenges/day-02/package.json",
        "@//:package.json",
        "@//:pnpm-workspace.yaml",
    ],
    # ...
)
```

2. Update `.bazelignore` to ignore node_modules *([See](https://docs.aspect.build/rules/aspect_rules_js/docs/npm_translate_lock/#verify_node_modules_ignored))*

```gitignore
node_modules
challenges/day-02/node_modules
# ...
```

3. Update `pnpm-workspace.yaml`

```yaml
packages:
  - 'challenges/day-02'
```

## References

- Issue: [Support yarn/npm7 workspaces](https://github.com/bazelbuild/rules_nodejs/issues/266#issuecomment-1357040951)
- Doc: [aspect-build/rules_js](https://github.com/aspect-build/rules_js)
- Example: [sourcegraph/sourcegraph](https://github.com/sourcegraph/sourcegraph)
- Example: [nikmmd/bazel-polyglot-mono](https://github.com/nikmmd/bazel-polyglot-mono)
