---
id: contribution-guidelines
title: Contribute to Qrysm's codebase
sidebar_label: Contribute to Qrysm's codebase
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

There are a number of ways to help out the project for people of all skillsets and experience levels. If you are unsure where you may be best suited, stop by either our [**Discord**](https://theqrl.org/discord) and a member of the team or community will be happy to answer questions and offer some direction.

## Getting Started

Once you are a bit more familiar with the concepts behind Zond and are ready to write some code, head over and explore Qrysm's [open issues on Github](https://github.com/prysmaticlabs/qrysm/issues). We recommend looking for issues tagged with the `Good First Issue` label if it is your first contribution. If you are still unsure about how to tackle a bug or a feature, our team is always available on [Discord](https://theqrl.org/discord). Sign in to your Github account, then navigate to [the official Qrysm repository](https://github.com/prysmaticlabs/qrysm/). In the upper right hand corner of the page, click the `Fork` button. This will create a copy of the Qrysm repository on your account that can be edited for pull requests.

### Setting up your environment

To develop Qrysm, you'll need the following:

- A modern Windows, MacOS X, or Minux operating system
- Go 1.21 version installed, download and install [here](https://golang.org/dl/)
- The `git` package installed
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/download) or Jetbrains' [Goland IDE](https://www.jetbrains.com/go/) or your preferred one

First, create a local clone of Qrysm.

```bash
git clone https://github.com/prysmaticlabs/qrysm.git && cd qrysm
```

Then link your local repository to your newly created fork.

```bash
git remote add myqrysmrepo https://github.com/<your_github_user_name>/qrysm.git
```

Finally, ensure Go is installed and working on your machine:

```bash
go version

Example output:

```bash
go version go1.21.5 darwin/arm64
```

### Building and testing Qrysm with Go

The Qrysm project is a large monorepo containing all sorts of tools and services that implement the Zond protocol. We use Go for everything we do in development, helping everyone have reproducible builds. If you want to build the whole project, you can run the following command:

```text
$ go build -v ./...
```

This will build the project by downloading dependencies as Go modules.

#### Running Go tests

All code we check into our repo needs to have sufficient tests to ensure it is maintainable and works as expected.

Many tests rely on the Bazel build system, thus testing with `go test` may not work.

If you decide to do so and if you get the following error:

```bash
Caught SIGILL in blst_cgo_init, consult <blst>/bindings/go/README.md.
```

Please define the following environment variable when running tests:

```bash
CGO_CFLAGS="-O2 -D__BLST_PORTABLE__"
```
It is particulary useful when running tests / debug in your IDE without using bazel.

See the [next section](#building-and-testing-qrysm-with-bazel) for instructions on testing with qrysm.

### Building and testing Qrysm with Bazel

The Qrysm project is a large monorepo containing all sorts of tools and services that implement the Zond consensus protocol. We use the [Bazel](https://bazel.build) build system created by Google for everything we do, helping everyone have reproducible builds. 

To build the beacon chain, run the following command:

```bash
bazel build //cmd/beacon-chain
```

To build the validator client, run the following command:

```bash
bazel build //cmd/validator
```

Other binaries in our codebase use a similar command to build. If you want to run a particular built binary, you can use the command:

```bash
bazel run //cmd/beacon-chain -- --help
```

Where you can specify any amount of command line arguments you need based on the available flags of the item you're running.

In order to write code for the Qrysm codebase comfortably with Bazel, we recommend using either [Visual Studio Code](https://code.visualstudio.com/download) with its [Bazel plugin](https://marketplace.visualstudio.com/items?itemName=BazelBuild.vscode-bazel), or any [Jetbrains IDE](https://www.jetbrains.com/) with the [Bazel plugin](https://plugins.jetbrains.com/plugin/8609-bazel) ([Goland](https://www.jetbrains.com/go/) is a great choice, used by most of the Qrysmatic Labs team). 

You can also find various other types of IDE support for Bazel in the official Bazel documentation [here](https://docs.bazel.build/versions/master/ide.html). Once you have your coding environment set-up, you'll be well-equipped to contribute to Zond!

#### Running Bazel tests

All code we check into our repo needs to have sufficient tests to ensure it is maintainable and works as expected. We use bazel to run all of our test suites in Qrysm. If there is a particular subfolder you want to test, such as `beacon-chain/node`, you can run the command:

```bash
bazel test //beacon-chain/node:go_default_test
```

For running a specific test, for example, a test called `TestNodeStart_Ok` inside of `beacon-chain/node`, you can use Bazel to filter it out:

```bash
bazel test //beacon-chain/node:go_default_test --test_filter TestNodeStart_Ok
```
To display logs while running the test, you can add the `--test_output streamed` option, such as:

```bash
bazel test //beacon-chain/node:go_default_test --test_output streamed --test_filter TestNodeStart_Ok
```

To run all tests recursively under a directory, you can use the `...` syntax. The following example runs all tests recursively under the `validator/client` directory:

```bash
bazel test //validator/client/...
```

For the list of all available flags to the `bazel test` command, you can see the reference documentation [here](https://docs.bazel.build/versions/master/command-line-reference.html#test).

You can also run our full, end-to-end test suite with:

```bash
bazel test //testing/endtoend:go_default_test
```

#### Adding dependencies

If you want to add a new dependency to Qrysm, please adhere to the guidelines found in our [DEPENDENCIES.md](https://github.com/prysmaticlabs/qrysm/blob/master/DEPENDENCIES.md) document.

### Contributing to the Zond consensus API

The Zond consensus API implemented by Qrysm is maintained as a separate repository than Qrysm. You can read more about how to contribute specifically to the API [here](/docs/how-qrysm-works/qrysm-public-api#contributing).

### Making your first contribution

Each time you begin a set of changes, ensure that you are working on a new branch that you have created as opposed to the `develop` of your local repository. By keeping your changes segregated in this branch, merging your changes into the main repository later will be much simpler for the team.

To create a local branch for `git` to checkout, issue the command:

```bash
git checkout -b feature-in-progress-branch
```

To checkout a branch you have already created:

```bash
git checkout feature-in-progress-branch
```

**Preparing your commit**

To fetch changes to the Qrysm repository since your last session:

```bash
git fetch origin
```

Then synchronize your develop branch:

```bash
git pull origin develop
```

To stage the changed files that are be committed, issue the command:

```bash
git add --all
```

Once you are ready to make a commit, you can do so with:

```bash
git commit  -m “Message to explain what the commit covers”
```

The `–-amend` flag can be used as well to include previous commits that have not yet been pushed to an upstream repository.

If there are conflicts between your edits and those made by others since you started work Git will ask you to resolve them. To find out which files have conflicts, run:

```bash
git status
```

Open those files, and you will see lines inserted by Git that identify the conflicts:

```bash
<<<<<< HEAD

Other developers’ version of the conflicting code

======

Your version of the conflicting code

'>>>>> Your Commit
```

The code from the Qrysm repository is inserted between `<<<` and `===` while the change you have made is inserted between `===` and `>>>>`. Remove everything between `<<<<` and `>>>` and replace it with code that resolves the conflict. Repeat the process for all files listed by Git status to have conflicts.

When you are ready, use git push to move your local copy of the changes to your fork of the repository on Github.

```bash
git push myrepo feature-in-progress-branch
```

#### Opening a pull request

:::info
If your change is user facing, ensure that your changeset includes an entry to the CHANGELOG.md file!
:::

Navigate to your fork of the repository on Github. In the upper left where the current branch is listed, change the branch to your newly created one. Open the files that you have worked on and ensure they include your changes.

Navigate to [https://github.com/prysmaticlabs/qrysm/pulls](https://github.com/prysmaticlabs/qrysm/pulls) and click on the `New pull request` button. In the `base` box on the left, leave the default selection `base: develop` the branch that you want your changes to be applied to. In the `compare` box on the right, select the branch containing the changes you want to apply. You will then be asked to answer a few questions about your pull request. Pull requests should have enough context about what you are working on, how you are solving a problem, and reference all necessary information for your reviewers to help.

After you complete the questionnaire, the pull request will appear in the list of pull requests.

#### Following up

Core developers may ask questions and request that you make edits. If you set notifications at the top of the page to `not watching`, you will still be notified by email whenever someone comments on the page of a pull request you have created. If you are asked to modify your pull request, edit your local branch, push up your fixes, then leave a comment to notify the original reviewer that the pull request is ready for further review.

