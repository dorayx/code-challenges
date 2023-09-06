# tools

Provide tools to build & test packages in multiple CI environments (linux / macOS / ...)

## Getting Started

- Build packages

```bash
# on linux
bazel build //:tools/build_packages --runs_on=linux

# on macos
bazel build //:tools/build_packages --runs_on=macos
```

- Test packages

```bash
# on linux
bazel build //:tools/test_linux_packages

# on macos
bazel build //:tools/test_macos_packages
```

## References

- Issue: [Is there any way to exclude certain targets from "all" under certain conditions?](https://github.com/bazelbuild/bazel/issues/1619#issuecomment-238549150)
- Issue: [`test_suite` tests should be configurable](https://github.com/bazelbuild/bazel/issues/11455)
- Doc: [Bazel - Config Settings](https://bazel.build/docs/configurable-attributes#config_setting)
- Doc: [Bazel - Predefined Settings](https://bazel.build/extending/config#predefined-settings)
- Doc: [Bazel - Using Build Setting Aliases](https://bazel.build/extending/config#using-build-setting-aliases)
- Example: [isabella232/mozc](https://github.com/isabella232/mozc/blob/78066db57693ea6b61b59434136bece18aec80f1/src/tools/cc_target_os/BUILD.bazel)
