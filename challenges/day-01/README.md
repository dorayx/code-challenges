# Day 01

## Challenge description

Initialize this repository as a monorepo using Bazel for multi-language development, include a Rust program example and add a GitHub Action to test all the projects.

- [x] Monorepo
- [x] Bazel
- [x] Rust program
- [x] GitHub Action

## Getting Started

```bash
bazel run //challenges/day-01:build
bazel test //challenges/day-01:ut_test
```

## References

- Doc: [Bazelisk](https://github.com/bazelbuild/bazelisk/blob/master/README.md)
- Doc: [Bazel Versions](https://bazel.build/release#support-matrix)
- Doc: [GitHub Action - bazelbuild/setup-bazelisk](https://github.com/bazelbuild/setup-bazelisk)
- API: [rust_binary](http://bazelbuild.github.io/rules_rust/flatten.html#rust_binary)
- API: [rust_test](http://bazelbuild.github.io/rules_rust/flatten.html#rust_test)
- Article: [kriscfoster/multi-language-bazel-monorepo](https://github.com/kriscfoster/multi-language-bazel-monorepo)
- Article: [Bazel with Rust](https://earthly.dev/blog/bazel-with-rust/)
- Article: [Building Rust Workspace with Bazel](https://www.tweag.io/blog/2023-07-27-building-rust-workspace-with-bazel/)
