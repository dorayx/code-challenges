# Day 05

## Challenge description

Integrate Go Workspace with Bazel

## Getting Started

```bash
bazel build //challenges/day-05/main:build
bazel test //challenges/day-05/hello:ut_test
```

## Notices

### Go Workspace

I use Go Workspace to manage multiple Go modules, and it requires some manual steps to make it work:

```bash
go work use challenges/day-xxx
```

The `go work use` command adds a new module to the `go.work` file.

```bash
go work sync
```

The `go work sync` command syncs dependencies from the workspace’s build list into each of the workspace modules.

## References

- Doc: [Go Workspaces](https://go.dev/ref/mod#workspaces)
- Doc: [Getting started with multi-module workspaces](https://go.dev/doc/tutorial/workspaces)
- Issue: [Support for go 1.18 "workspace" mode?](https://github.com/bazelbuild/bazel-gazelle/issues/1232)
- Article: [BUILDING A GO PROJECT USING BAZEL](https://www.tweag.io/blog/2021-09-08-rules_go-gazelle/)
- Example: [pingcap/tidb](https://github.com/pingcap/tidb)
- Example: [google/flatbuffers](https://github.com/google/flatbuffers)
