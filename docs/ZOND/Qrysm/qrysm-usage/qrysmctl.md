---
id: qrysmctl
title: Use qrysmctl
sidebar_label: Use qrysmctl
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="James"/>

`qrysmctl` is a command-line utility for common and one-off Zond proof-of-stake tasks, like helping users with validator exits or withdrawals. Most `qrysmctl` commands require access to a fully synced beacon node.


### Run via binaries

Binaries for the latest `qrysmctl` tool can be found on the [latest qrysm release page](https://github.com/prysmaticlabs/qrysm/releases). Each binary is a unique version with its own set of features. New releases may include new features for `qrysmctl` that will need to be downloaded separately. The installed binaries will need to be renamed to `qrysmctl` to use the example below. 

:::info

Some users will need to give permissions to the downloaded binaries to be executable. Linux users can do this by right clicking the file, going to permissions, and clicking the `Allow executing file as program` checkmark. This may be different for each operating system.

:::

Example of running qrysmctl by opening a terminal at the installed location after renaming.
```
./qrysmctl --help
```

The binaries can be run through a terminal directly and won't need installation. Please refer to the **list commands** section for additional information. 

### Install via source

Dependencies:

- [Bazelisk](https://bazel.build/install/bazelisk) - this will automatically manage the version of **Bazel** required.
- [golang](https://go.dev/) installed
- The `cmake` package installed
- The `git` package installed
- `libssl-dev` installed
- `libgmp-dev` installed
- `libtinfo5` installed
- `libprotoc` version 3.14 installed

#### Install Bazelisk

:::caution
    Windows users should run through binaries as some users may have issues building through bazel. 
:::

Bazelisk is a launcher for Bazel which automatically downloads and installs the version of Bazel that you need. There are several ways to install Bazelisk:

- Using [a binary release](https://github.com/bazelbuild/bazelisk/releases) for Linux, macOS, or Windows
- Using npm: `npm install -g @bazel/bazelisk`
- Using apt: https://bazel.build/install/ubuntu
- Using Homebrew on macOS: `brew install bazelisk`
- By compiling from source using Go: `go install github.com/bazelbuild/bazelisk@latest`

#### Clone the Qrysm project locally

Clone Qrysm's [main repository](https://github.com/prysmaticlabs/qrysm). Switch to the latest version (the latest version number can be found on the [releases page](https://github.com/prysmaticlabs/qrysm/releases)). Once cloned, enter the directory:

```
git clone https://github.com/prysmaticlabs/qrysm && cd qrysm
``````

#### Build `qrysmctl`

```
bazel build //cmd/qrysmctl --config=release
```

Bazel will automatically pull and install any dependencies as well, including Go and necessary compilers.

### List commands

```
./qrysmctl --help
```

**Using Docker**
```
docker run -it gcr.io/prysmaticlabs/qrysm/cmd/qrysmctl:latest --help
```

The `—-help` flag will provide a list of commands, subcommands, and flags to use.

Commands can also be found in our [Qrysm parameter documentation](./parameters)

### Frequently asked questions

**Q: One of the Qrysm guides tells me to use a `qrysmctl` command that isn't available. What do I do?**

A: You may be using an older version of `qrysmctl` and are required to download a newer version. 

**Q: Is `qrysmctl` accessible from qrysm.sh, qrysm.s1, or qrysm.bat?**

A: No. This utility will only be accessible by building from source or by downloading binaries for specific versions of Qrysm.

