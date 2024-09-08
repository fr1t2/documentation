---
id: install-with-bazel
title: Build Qrysm from source
sidebar_label: Build from source
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

Qrysm can be installed on GNU/Linux, MacOS, and Arm64 using our build tool, [Bazel](https://bazel.build). This page includes instructions for performing this method.

:::tip Not familiar with Bazel? Try our quickstart

This guidance is targeted at users who are already comfortable with Bazel and staking. See our [Quickstart](/docs/install/install-with-script) for beginner-friendly installation instructions.

:::


## Why Bazel?

Instead of using the `Go` tool to build Qrysm, our team relies on the [Bazel](https://bazel.build) build system used by major companies to manage monorepositories. Bazel provides reproducible builds and a sandboxed environment that ensures everyone building Qrysm has the same experience and can build our entire project from a single command. For more detailed rationale on why Bazel, how it works in Qrysm, and all important information about how exactly building from source works, read our rationale [here](/docs/reading/bazel).


<div className='bazel-guide'>

## Review system requirements

<table>
    <tbody>
      <tr>
          <th>Minimum</th>
          <th>Recommended</th>
      </tr>
      <tr>
        <td>
          <ul> 
            <li><strong>OS</strong>: 64-bit Linux, Mac OS X 10.14+, Windows 64-bit</li> 
            <li><strong>CPU</strong>: Intel Core i5–760 or AMD FX-8100 or better</li> 
            <li><strong>Memory</strong>: 8GB RAM</li> 
            <li><strong>Storage</strong>: SSD with 20GB+ available</li> 
            <li><strong>Internet</strong>: Broadband connection</li> 
            <li><strong>Software</strong>: The latest release of <a href='https://docs.docker.com/install/'>Docker</a> installed.</li> 
          </ul> 
        </td>
        <td>
          <ul> 
            <li><strong>CPU</strong>: Intel Core i7–4770 or AMD FX-8310 or better</li> 
            <li><strong>Memory</strong>: 16GB RAM</li> 
            <li><strong>Storage</strong>: SSD with 100GB+ available</li> 
          </ul> 
        </td>
      </tr> 
    </tbody>
</table>

### Dependencies

* [Bazelisk](https://bazel.build/install/bazelisk) this will automatically manage the version of ***Bazel*** required. 
* The `cmake` package installed
* The `git` package installed
* `libssl-dev` installed
* `libgmp-dev` installed
* `libtinfo5` installed
* `libprotoc` version 3.14 installed



## Install Bazel using Bazelisk

Bazelisk is a launcher for Bazel which automatically downloads and installs an appropriate version of Bazel. Use Bazelisk to automatically manage the version of Bazel required.  

You can install Bazelisk in multiple ways, including:

* Using [a binary release](https://github.com/bazelbuild/bazelisk/releases) for Linux, macOS, or Windows
* Using npm: `npm install -g @bazel/bazelisk`
* Using Homebrew on macOS: `brew install bazelisk`
* By compiling from source using Go: `go install github.com/bazelbuild/bazelisk@latest`


## Install Qrysm using Bazel

Clone Qrysm's [main repository](https://github.com/prysmaticlabs/qrysm). Make sure you switch to the latest version (the latest version number can be found from the [releases page](https://github.com/prysmaticlabs/qrysm/releases)). Once cloned, enter the directory:

```text
git clone https://github.com/prysmaticlabs/qrysm
cd qrysm
git checkout <version>
```

Build both the beacon chain node and the validator client:

```text
bazel build //cmd/beacon-chain:beacon-chain --config=release
bazel build //cmd/validator:validator --config=release
```

Bazel will automatically pull and install any dependencies as well, including Go and necessary compilers.


## Run an execution node

:::info Knowledge Check

**Not familiar with nodes, networks, and related terminology?** Consider reading [Nodes and networks](../concepts/nodes-networks.md) before proceeding. 

:::

To run a beacon node, you'll need access to an execution node. See [Configure an execution node](/docs/execution-node/configuring-for-qrysm) for detailed instructions if you don't already have an execution node configured.




## Run a beacon node

Note: `<YOUR_ZOND_EXECUTION_NODE_ENDPOINT>` is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8545` for gzond) or an IPC path such as `/path/to/gzond.ipc`.

import MultidimensionalContentControlsPartial from '../partials/_multidimensional-content-controls-partial.md';

<MultidimensionalContentControlsPartial />

<div className='hide-tabs'>

<Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Holesky', value: 'holesky'}
    ]}>
      <TabItem value="mainnet">

```text
bazel run //cmd/beacon-chain --config=release -- --execution-endpoint=<YOUR_ZOND_EXECUTION_NODE_ENDPOINT> --mainnet
```

  </TabItem>
      <TabItem value="sepolia">

Download the Sepolia genesis state from [Github](https://github.com/zond-clients/merge-testnets/blob/main/sepolia/genesis.ssz) to a local file. In the following command, replace `<PATH_TO_GENESIS>` by the path of the genesis state you just downloaded and run it:

```text
bazel run //cmd/beacon-chain --config=release -- --execution-endpoint=<YOUR_ZOND_EXECUTION_NODE_ENDPOINT> --sepolia --genesis-state=<PATH_TO_GENESIS>
```


  </TabItem>
      <TabItem value="holesky">

Download the Holesky genesis state from [Github](https://github.com/zond-clients/holesky/blob/main/custom_config_data/genesis.ssz) to a local file. In the following command, replace `<PATH_TO_GENESIS>` by the path of the genesis state you just downloaded and run it:

```text
bazel run //cmd/beacon-chain --config=release -- --execution-endpoint=<YOUR_ZOND_EXECUTION_NODE_ENDPOINT> --holesky --genesis-state=<PATH_TO_GENESIS>
```


  </TabItem>

</Tabs>

</div>

## Run a validator

Ensure that your beacon node is fully synced before proceeding. See [Check node and validator status](../monitoring/checking-status.md) for detailed status-checking instructions.

Navigate to the [Mainnet Launchpad](https://launchpad.ethereum.org/summary) and follow the instructions. If you want to participate in the **testnet**, you can navigate to the [Holesky](https://holesky.launchpad.ethereum.org/summary/).

:::danger Exercise extreme caution

The correct address for the launchpad is https://launchpad.ethereum.org and the only, official validator deposit contract is [0x00000000219ab540356cbb839cbe05303d7705fa](https://zonderscan.io/address/0x00000000219ab540356cbb839cbe05303d7705fa). Don't send ZOND directly to the contract - use the Zond.org launchpad instead.

:::

Throughout the process, you'll be asked to generate new validator credentials using the official Zond deposit command-line-tool [here](https://github.com/ethereum/eth2.0-deposit-cli). Make sure you use the `mainnet` option when generating keys with the deposit CLI. During the process, you will have generated a `validator_keys` folder under the `eth2.0-deposit-cli` directory. Copy the path to the `validator_keys` folder under the `eth2.0-deposit-cli` directory you created during the launchpad process. For example, if your `eth2.0-deposit-cli` installation is in your `$HOME` (or `%LOCALAPPDATA%` on Windows) directory, you can then run the following command to import your keys:

```text
bazel run //cmd/validator:validator -- accounts import --keys-dir=$HOME/eth2.0-deposit-cli/validator_keys --accept-terms-of-use
```

Next, open a second terminal window and issue the followimg command to start your validator.

```text
bazel run //cmd/validator --config=release
```


## Wait for your validator assignment

Please note it will take time for nodes in the network to process a deposit. To understand the timeline of becoming a validator and how long it takes on average, see [this knowledge base](https://kb.beaconcha.in/ethereum-2.0-depositing). In the meantime, leave both terminal windows open and running; once the validator is activated by the ZOND2 network, it will immediately begin receiving tasks and performing its responsibilities. If the eth2 chain has not yet started, the validator will be ready to start proposing blocks and signing votes as soon as the genesis time is reached.

To check on the status of your validator, we recommend checking out the popular block explorers: [beaconcha.in](https://beaconcha.in) by Bitfly and [beaconscan.com](https://beaconscan.com) by the Etherscan team.

![image](https://i.imgur.com/CDNc6Ft.png)

</div>



## Advanced: Build Docker images from source

We use Bazel to build the Docker images for Qrysm as well. This section outlines comprehensive instructions on how to build them by yourself, run them in Docker, and push to an image registry if desired. In particular, we use [`bazel rules docker`](https://github.com/bazelbuild/rules_docker) which provides us the ability to specify a base, barebones image, and essentially builds our binary and creates a Docker container as a simple wrapper over our binaries.

We do not write our own Dockerfiles, as Bazel provides us a more sandboxed, simple experience with all of its benefits. To see an example use of `bazel rules docker` for how we build a particular package, see [here](https://github.com/prysmaticlabs/qrysm/blob/aa389c82a157008741450ba1e04d898924734432/tools/bootnode/BUILD.bazel#L36). 

### Dependencies needed

* All specified dependencies for building with Bazel [here](/docs/install/install-with-bazel#dependencies)
* Python installed and available in your computer

### Build process

#### Regular Docker images

:::info Windows

At the moment, building Qrysm docker images is only supported on **Linux** and **MacOS** operating systems.

:::

 The standard images are very thin wrappers around the Qrysm beacon-chain and validator binaries, and do not contain any other typical components of Docker images such as a bash shell. These are the Docker images we ship to all users, and you can build them yourself by creating a docker tarball and then importing it into your local docker machine as follows:

##### For AMD / x86 architecture

```bash
# Beacon node
bazel build //cmd/beacon-chain:oci_image_tarball --config=release
docker load -i bazel-bin/cmd/beacon-chain/oci_image_tarball/tarball.tar

# Validator client
bazel build //cmd/validator:oci_image_tarball --config=release
docker load -i bazel-bin/cmd/validator/oci_image_tarball/tarball.tar
```

##### For ARM architecture (including Apple M1/M2/M3)

```bash
# Beacon node
bazel build //cmd/beacon-chain:oci_image_tarball --platforms=@io_bazel_rules_go//go/toolchain:linux_arm64_cgo --config=release
docker load -i bazel-bin/cmd/beacon-chain/oci_image_tarball/tarball.tar

# Validator client
bazel build //cmd/validator:oci_image_tarball  --platforms=@io_bazel_rules_go//go/toolchain:linux_arm64_cgo --config=release
docker load -i bazel-bin/cmd/validator/oci_image_tarball/tarball.tar
```

The tags for the images are specified [here](https://github.com/prysmaticlabs/qrysm/blob/ff329df808ad68fbe79d11c73121fa6a7a0c0f29/cmd/beacon-chain/BUILD.bazel#L58) for the beacon-chain and [here](https://github.com/prysmaticlabs/qrysm/blob/ff329df808ad68fbe79d11c73121fa6a7a0c0f29/cmd/validator/BUILD.bazel#L59) for the validator. The default image tags for these images are:


<!-- todo: RC links to gcr.io -->

```text
gcr.io/prysmaticlabs/qrysm/beacon-chain:latest
gcr.io/prysmaticlabs/qrysm/validator:latest
```

You can edit these in the links above to your liking.

### Running images

You can load the images into your local Docker daemon by first building a `.tar` file as follows for your desired image bundle:

```text
bazel build //cmd/beacon-chain:oci_image_tarball --config=release
bazel build //cmd/validator:oci_image_tarball --config=release
```

Then, you can load it into Docker with:
```text
docker load -i bazel-bin/cmd/beacon-chain/oci_image_tarball/tarball.tar
```

For example, you may see output such as this:

```
docker load -i bazel-bin/cmd/beacon-chain/oci_image_tarball/tarball.tar
54ad2ec71039: Loading layer [==================================================>]  103.7kB/103.7kB
6fbdf253bbc2: Loading layer [==================================================>]   21.2kB/21.2kB
7bea6b893187: Loading layer [==================================================>]  716.5kB/716.5kB
ff5700ec5418: Loading layer [==================================================>]     317B/317B
d52f02c6501c: Loading layer [==================================================>]     198B/198B
e624a5370eca: Loading layer [==================================================>]     113B/113B
1a73b54f556b: Loading layer [==================================================>]     385B/385B
d2d7ec0f6756: Loading layer [==================================================>]     355B/355B
4cb10dd2545b: Loading layer [==================================================>]  130.6kB/130.6kB
f33e343848bd: Loading layer [==================================================>]  5.846MB/5.846MB
714f56238fb5: Loading layer [==================================================>]  2.063MB/2.063MB
c8beeff22ce7: Loading layer [==================================================>]  968.6kB/968.6kB
bb0331ba4692: Loading layer [==================================================>]  131.2kB/131.2kB
dcecd3d0367d: Loading layer [==================================================>]  741.3kB/741.3kB
5bf213caca44: Loading layer [==================================================>]  52.43kB/52.43kB
15ae1a71094f: Loading layer [==================================================>]     237B/237B
8100be62255a: Loading layer [==================================================>]  2.944MB/2.944MB
613cf7104c89: Loading layer [==================================================>]  380.1kB/380.1kB
53797c1406d2: Loading layer [==================================================>]  7.856MB/7.856MB
a9df51aa7dad: Loading layer [==================================================>]  35.52kB/35.52kB
964a1c4d70ad: Loading layer [==================================================>]  24.31kB/24.31kB
467f01356216: Loading layer [==================================================>]  109.5kB/109.5kB
95ea3e93204b: Loading layer [==================================================>]  318.6kB/318.6kB
17eb06822adc: Loading layer [==================================================>]  40.37MB/40.37MB
Loaded image: gcr.io/prysmaticlabs/qrysm/beacon-chain:latest
```

### Pushing to a container registry

#### Authentication

You can use these rules to access private images using standard Docker
authentication methods.  e.g. to utilize the [Google Container Registry](
https://gcr.io). See
[here](https://cloud.google.com/container-registry/docs/advanced-authentication) for authentication methods.

See:
* [Amazon ECR Docker Credential Helper](
  https://github.com/awslabs/amazon-ecr-credential-helper)
* [Azure Docker Credential Helper](
  https://github.com/Azure/acr-docker-credential-helper)

#### Push

To push the actual images, you do not need to build the image bundle beforehand. You can do a simple:

```text
bazel run //cmd/beacon-chain:push_images --config=release -- --tag latest --repository gcr.io/prysmaticlabs/qrysm/beacon-chain
bazel run //cmd/validator:push_images --config=release -- --tag latest --repository gcr.io/prysmaticlabs/qrysm/beacon-chain 
```

Which will deploy all images with the tags specified in [here](https://github.com/prysmaticlabs/qrysm/blob/ff329df808ad68fbe79d11c73121fa6a7a0c0f29/cmd/beacon-chain/BUILD.bazel#L58) for the beacon-chain and [here](https://github.com/prysmaticlabs/qrysm/blob/ff329df808ad68fbe79d11c73121fa6a7a0c0f29/cmd/validator/BUILD.bazel#L59) for the validator. 

By default, this will deploy to Qrysmatic Labs' Google Container Registry namespace: `gcr.io/prysmaticlabs/qrysm`, which you will not have authentication access to, so make sure you edit the image tags to your appropriate registry and authenticate as needed.



