# pages

Copy all the static html files into a `pages` directory which serves as artifacts for GitHub Pages.

## Getting Started

```bash
bazel build //...
bazel build //pages:github-pages
```

It requires to update `pages/BUILD.bazel` to add new pages or remove pages.

## Notices

- The domain is `https://dorayx.github.io`
- The base path is `/code-challenges`
