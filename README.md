# Code Challenges

Web development evolves fast, and it's hard to keep up with all the new technologies and tools.
I made this repository as a collection of code challenges, doing some experiment with fresh ideas, new techs and tools.
In general, the code challenges aren't tailored for technical interviews but designed for fun and learning, so you might not find the best practices here,
and the projects here are all experimental, not always complete and not production-ready.

I've tracked my practices in the table below:

|  Day  |     Date      | State | Challenge                                                                                                                                                               | Keywords                         |     Demo     |               Source Code                |
|:-----:|:-------------:|:-----:|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------|:------------:|:----------------------------------------:|
|  01   |  3 Sep, 2023  |   ✅   | ⚙️ Initialize this repository as a monorepo using Bazel for multi-language development, include a Rust program example and add a GitHub Action to test all the projects | Bazel, Rust                      |      -       | [challenges/day-01](./challenges/day-01) |
|  02   |  4 Sep, 2023  |   ✅   | ⚙️ Integrate NodeJS + PNPM Workspace + React + TypeScript + Vite + Vitest with Bazel                                                                                    | Bazel, NodeJS, PNPM Workspace    |      -       | [challenges/day-02](./challenges/day-02) |
|  03   |  6 Sep, 2023  |   ✅   | 🍎 Create a macOS menu bar app with several menu items                                                                                                                  | Bazel, macOS App, Tray App       |      -       | [challenges/day-03](./challenges/day-03) |
|  04   |  8 Sep, 2023  |  ⚠️   | ⏰ Use CSS Scroll Snap to create a clock                                                                                                                                 | CSS Scroll Snap                  |      🚧      | [challenges/day-04](./challenges/day-04) |
| 05 | 10 Sep, 2023 |   ✅   | ⚙️ Integrate Go Workspace with Bazel                                                                                                                                    | Bazel, Go Workspace              |      -       | [challenges/day-05](./challenges/day-05) |
| 06 | 11 Sep, 2023 | 🚧 | ⚙️ Deploy static HTML to GitHub Pages with Bazel + GitHub Action                                                                                                        | Bazel, GitHub Pages, Static HTML | GitHub Pages | [challenges/day-06](./challenges/day-06) |

- ✅: Completed
- ⚠️: Need improvements
- 🚧: In progress

## Getting Started

### Build all projects

```bash
bazel build //...
```

### Run all unit tests

```bash
bazel test //...
```