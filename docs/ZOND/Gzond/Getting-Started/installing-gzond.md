---
title: Installing Gzond
description: Guide to installing Gzond

id: go-zond-getting-started-installing
hide_title: false
hide_table_of_contents: true
displayed_sidebar: gzondSidebar
sidebar_label: Installing
sidebar_position: 1
pagination_label: Installing
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/getting-started.md
keywords:
  - docs
image: /assets/img/icons/yellow.png
slug: /gzond/getting-started/installing
---

There are several ways to install Gzond, including via a package manager, downloading a pre-built bundle, running as a docker container or building from downloaded source code. On this page the various installation options are explained for several major operating systems. Users prioritizing ease of installation should choose to use a package manager or prebuilt bundle. Users prioritizing customization should build from source. It is important to run the latest version of Gzond because each release includes bugfixes and improvements over the previous versions. The stable releases are recommended for most users because they have been fully tested. A list of stable releases can be found [here](https://github.com/zond/go-zond/releases). Instructions for updating existing Gzond installations are also provided in each section.

## Package managers \{#package-managers}

### MacOS via Homebrew \{#macos-via-homebrew}

The easiest way to install go-zond is to use the Gzond Homebrew tap. The first step is to check that Homebrew is installed. The following command should return a version number.

```sh
brew -v
```

If a version number is returned, then Homebrew is installed. If not, Homebrew can be installed by following the instructions [here](https://brew.sh/). With Homebrew installed, the following commands add the Gzond tap and install Gzond:

```sh
brew tap zond/zond
brew install zond
```

The previous command installs the latest stable release. Developers that wish to install the most up-to-date version can install the Gzond repository's master branch by adding the `--devel` parameter to the install command:

```sh
brew install zond --devel
```

These commands install the core Gzond software and the following developer tools: `clef`, `devp2p`, `abigen`, `bootnode`, `evm`, and `rlpdump`. The binaries for each of these tools are saved in `/usr/local/bin/`. The full list of command line options can be viewed [here](/docs/fundamentals/Command-Line-Options) or in the terminal by running `gzond --help`.

Updating an existing Gzond installation to the latest version can be achieved by stopping the node and running the following commands:

```sh
brew update
brew upgrade
brew reinstall zond
```

When the node is started again, Gzond will automatically use all the data from the previous version and sync the blocks that were missed while the node was offline.

### Ubuntu via PPAs \{#ubuntu-via-ppas}

The easiest way to install Gzond on Ubuntu-based distributions is with the built-in launchpad PPAs (Personal Package Archives). A single PPA repository is provided, containing stable and development releases for Ubuntu versions `xenial`, `trusty`, `impish`, `focal`, `bionic`.

The following command enables the launchpad repository:

```sh
sudo add-apt-repository -y ppa:zond/zond
```

Then, to install the stable version of go-zond:

```sh
sudo apt-get update
sudo apt-get install zond
```

Or, alternatively the develop version:

```sh
sudo apt-get update
sudo apt-get install zond-unstable
```

These commands install the core Gzond software and the following developer tools: `clef`, `devp2p`, `abigen`, `bootnode`, `evm` and `rlpdump`. The binaries for each of these tools are saved in `/usr/local/bin/`. The full list of command line options can be viewed [here](/docs/fundamentals/Command-Line-Options) or in the terminal by running `gzond --help`.

Updating an existing Gzond installation to the latest version can be achieved by stopping the node and running the following commands:

```sh
sudo apt-get update
sudo apt-get install zond
sudo apt-get upgrade gzond
```

When the node is started again, Gzond will automatically use all the data from the previous version and sync the blocks that were missed while the node was offline.

### Windows \{#windows}

The easiest way to install Gzond is to download a pre-compiled binary from the [downloads](/downloads) page. The page provides an installer as well as a zip file containing the Gzond source code. The install wizard offers the user the option to install Gzond, or Gzond and the developer tools. The installer adds `gzond` to the system's `PATH` automatically. The zip file contains the command `.exe` files that can be run from the command prompt. The full list of command line options can be viewed [here](/docs/fundamentals/Command-Line-Options) or in the terminal by running `gzond --help`.

Updating an existing Gzond installation can be achieved by stopping the node, downloading and installing the latest version following the instructions above. When the node is started again, Gzond will automatically use all the data from the previous version and sync the blocks that were missed while the node was offline.

### FreeBSD via pkg \{#freeBSD-via-pkg}

Gzond can be installed on FreeBSD using the package manager `pkg`. The following command downloads and installs Gzond:

```sh
pkg install go-zond
```

These commands install the core Gzond software and the following developer tools: `clef`, `devp2p`, `abigen`, `bootnode`, `evm`, `rlpdump` and `puppeth`.

The full list of command line options can be viewed [here](/docs/fundamentals/Command-Line-Options) or in the terminal by running `gzond --help`.

Updating an existing Gzond installation to the latest version can be achieved by stopping the node and running the following commands:

```sh
pkg upgrade
```

When the node is started again, Gzond will automatically use all the data from the previous version and sync the blocks that were missed while the node was offline.

### FreeBSD via ports \{#freeBSD-via-ports}

Installing Gzond using ports, simply requires navigating to the `net-p2p/go-zond` ports directory and running `make install` as root:

```sh
cd /usr/ports/net-p2p/go-zond
make install
```

These commands install the core Gzond software and the following developer tools: `clef`, `devp2p`, `abigen`, `bootnode`, `evm`, `rlpdump` and `puppeth`. The binaries for each of these tools are saved in `/usr/local/bin/`.

The full list of command line options can be viewed [here](/docs/fundamentals/Command-Line-Options) or in the terminal by running `gzond --help`.

Updating an existing Gzond installation can be achieved by stopping the node and running the following command:

```sh
portsnap fetch
```

When the node is started again, Gzond will automatically use all the data from the previous version and sync the blocks that were missed while the node was offline.

### Arch Linux via pacman \{#arch-linux-via-pacman}

The Gzond package is available from the [community repo](https://www.archlinux.org/packages/community/x86_64/gzond/). It can be installed by running:

```sh
pacman -S gzond
```

These commands install the core Gzond software and the following developer tools: `clef`, `devp2p`, `abigen`, `bootnode`, `evm`, `rlpdump` and `puppeth`. The binaries for each of these tools are saved in `/usr/bin/`.

The full list of command line options can be viewed [here](/docs/fundamentals/Command-Line-Options) or in the terminal by running `gzond --help`.

Updating an existing Gzond installation can be achieved by stopping the node and running the following command:

```sh
sudo pacman -Sy
```

When the node is started again, Gzond will automatically use all the data from the previous version and sync the blocks that were missed while the node was offline.

## Standalone bundle \{#standalone-bundle}

Stable releases and development builds are provided as standalone bundles. These are useful for users who: a) wish to install a specific version of Gzond (e.g., for reproducible environments); b) wish to install on machines without internet access (e.g. air-gapped computers); or c) wish to avoid automatic updates and instead prefer to manually install software.

The following standalone bundles are available:

- 32bit, 64bit, ARMv5, ARMv6, ARMv7 and ARM64 archives (`.tar.gz`) on Linux
- 64bit archives (`.tar.gz`) on macOS
- 32bit and 64bit archives (`.zip`) and installers (`.exe`) on Windows

Some archives contain only Gzond, while other archives containing Gzond and the various developer tools (`clef`, `devp2p`, `abigen`, `bootnode`, `evm` and `rlpdump`). More information about these executables is available at the [`README`](https://github.com/zond/go-zond#executables).

The standalone bundles can be downloaded from the [Gzond Downloads](/downloads) page. To update an existing installation, download and manually install the latest version.

## Docker container \{#docker-container}

A Docker image with recent snapshot builds from our `develop` branch is maintained on DockerHub to support users who prefer to run containerized processes. There are four different Docker images available for running the latest stable or development versions of Gzond.

- `zond/client-go:latest` is the latest development version of Gzond (default)
- `zond/client-go:stable` is the latest stable version of Gzond
- `zond/client-go:{version}` is the stable version of Gzond at a specific version number
- `zond/client-go:release-{version}` is the latest stable version of Gzond at a specific version family

Pulling an image and starting a node is achieved by running these commands:

```sh
docker pull zond/client-go
docker run -it -p 30303:30303 zond/client-go
```

There are also four different Docker images for running the latest stable or development versions of miscellaneous Zond tools.

- `zond/client-go:alltools-latest` is the latest development version of the Zond tools
- `zond/client-go:alltools-stable` is the latest stable version of the Zond tools
- `zond/client-go:alltools-{version}` is the stable version of the Zond tools at a specific version number
- `zond/client-go:alltools-release-{version}` is the latest stable version of the Zond tools at a specific version family

The image has the following ports automatically exposed:

- `8545` TCP, used by the HTTP based JSON RPC API
- `8546` TCP, used by the WebSocket based JSON RPC API
- `8547` TCP, used by the GraphQL API
- `30303` TCP and UDP, used by the P2P protocol running the network

**Note:** if you are running an Zond client inside a Docker container, you should mount a data volume as the client's data directory (located at `/root/.zond` inside the container) to ensure that downloaded data is preserved between restarts and/or container life-cycles.

Updating Gzond to the latest version simply requires stopping the container, pulling the latest version from Docker and running it:

```sh
docker stop zond/client-go
docker pull zond/client-go:latest
docker run -it -p 30303:30303 zond/client-go
```

## Build from source code \{#build-from-source}

### Linux and Mac \{#linux-and-mac}

The `go-zond` repository should be cloned locally. Then, the command `make gzond` configures everything for a temporary build and cleans up afterwards. This method of building only works on UNIX-like operating systems, and a Go installation is still required.

```sh
git clone https://github.com/zond/go-zond.git
cd go-zond
make gzond
```

These commands create a Gzond executable file in the `go-zond/build/bin` folder that can be moved and run from another directory if required. The binary is standalone and doesn't require any additional files.

To update an existing Gzond installation simply stop the node, navigate to the project root directory and pull the latest version from the Gzond GitHub repository. then rebuild and restart the node.

```sh
cd go-zond
git pull
make gzond
```

### Windows \{#windows}

The Chocolatey package manager provides an easy way to install the required build tools. Chocolatey can be installed by following these [instructions](https://chocolatey.org). Then, to install the build tool the following commands can be run in an Administrator command prompt:

```sh
C:\Windows\system32> choco install git
C:\Windows\system32> choco install golang
C:\Windows\system32> choco install mingw
```

Installing these packages sets up the path environment variables. To get the new path a new command prompt must be opened. To install Gzond, a Go workspace directory must first be created, then the Gzond source code can be created and built.

```sh
C:\Users\xxx> mkdir src\github.com\zond
C:\Users\xxx> git clone https://github.com/zond/go-zond src\github.com\zond\go-zond
C:\Users\xxx> cd src\github.com\zond\go-zond
C:\Users\xxx\src\github.com\zond\go-zond> go get -u -v golang.org/x/net/context
C:\Users\xxx\src\github.com\zond\go-zond> go install -v ./cmd/...
```

### FreeBSD \{#freeBSD}

To build Gzond from source code on FreeBSD, the Gzond GitHub repository can be cloned into a local directory.

```sh
git clone https://github.com/zond/go-zond
```

Then, the Go compiler can be used to build Gzond:

```sh
pkg install go
```

If the Go version currently installed is >= 1.5, Gzond can be built using the following command:

```sh
cd go-zond
make gzond
```

If the installed Go version is &lt; 1.5 (quarterly packages, for example), the following command can be used instead:

```sh
cd go-zond
CC=clang make gzond
```

To start the node, the following command can be run:

```shell
build/bin/gzond
```

Additionally all the developer tools provided with Gzond (`clef`, `devp2p`, `abigen`, `bootnode`, `evm` and `rlpdump`) can be compiled by running `make all`. More information about these tools can be found [here](https://github.com/zond/go-zond#executables).

To build a stable release, e.g. v1.9.21, the command `git checkout v1.9.21` retrieves that specific version. Executing that command before running `make gzond` switches Gzond to a stable branch.
