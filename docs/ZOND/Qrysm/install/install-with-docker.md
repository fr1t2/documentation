---
id: install-with-docker
title: Install Qrysm with Docker
sidebar_label: Install using Docker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

Qrysm can be installed on Windows, GNU/Linux, and MacOS systems with Docker. We use [Bazel](https://bazel.build) to push preconfigured Docker images to a publicly accessible Google Cloud container registry. 

:::tip Not familiar with Docker? Try our quickstart

This guidance is targeted at users who are already comfortable with Docker. See our [Quickstart](/docs/install/install-with-script) for beginner-friendly installation instructions.

:::

<div className='docker-guide'>

<p><strong>Select a configuration</strong>:</p>

import MultidimensionalContentControlsPartial from '../partials/_multidimensional-content-controls-partial.md';

<MultidimensionalContentControlsPartial />


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


## Download the Qrysm Docker images

First, ensure that you're running the most recent version of Docker:

```text
docker -v
```

Next, pull the Qrysm images:

```text
## stable, without Busybox debugging tools
docker pull gcr.io/prysmaticlabs/qrysm/validator:stable
docker pull gcr.io/prysmaticlabs/qrysm/beacon-chain:stable

## latest, without Busybox debugging tools
docker pull gcr.io/prysmaticlabs/qrysm/validator:latest
docker pull gcr.io/prysmaticlabs/qrysm/beacon-chain:latest

## latest, with Busybox debugging tools
docker pull gcr.io/prysmaticlabs/qrysm/validator:latest-alpine
docker pull gcr.io/prysmaticlabs/qrysm/beacon-chain:latest-alpine
```

These commands will automatically install dependencies. 


## Configure ports (optional)

We recommend opening up ports `tcp/13000` and `udp/12000` on your router and firewall to improve peer-to-peer connectivity. Refer to your operating system and router documentation for port configuration instructions. With this complete, appending `--p2p-host-ip=$(curl -s ident.me)` to your beacon node startup command will configure Qrysm to use your newly opened ports. Refer to [Configure ports and firewalls](../qrysm-usage/p2p-host-ip.md) for more information.

<div className='hide-tabs'>

## Run a beacon node

:::info Knowledge Check

**Not familiar with nodes, networks, and related terminology?** Consider reading [Nodes and networks](../concepts/nodes-networks.md) before proceeding. 

:::

If you're not already running an execution node, refer to our [Quickstart](/docs/install/install-with-script) for beginner-friendly execution node installation instructions.

Next, use Docker to tell your beacon node to connect to your local execution node. Note that `<YOUR_ZOND_EXECUTION_NODE_ENDPOINT>` is either an HTTP endpoint `http://host:port` or an IPC path such as `/path/to/gzond.ipc`.

<Tabs
  groupId="os"
  defaultValue="others"
  values={[
    {label: 'Linux, MacOS, Arm64', value: 'others'},
    {label: 'Windows', value: 'win'}
  ]
}>
<TabItem value="others">

<Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Holesky', value: 'holesky'}
    ]}>
      <TabItem value="mainnet">

```text
docker run -it -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/qrysm/beacon-chain:stable \
  --datadir=/data \
  --jwt-secret=<YOUR_JWT_SECRET> \
  --rpc-host=0.0.0.0 \
  --grpc-gateway-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --execution-endpoint=<YOUR_ZOND_EXECUTION_NODE_ENDPOINT>
```

  </TabItem>
      <TabItem value="sepolia">

Download the Sepolia genesis state from [Github](https://github.com/zond-clients/sepolia/blob/main/bepolia/genesis.ssz) to a local file, then run:

```text
docker run -it -v $HOME/.eth2:/data -v /path/to/genesis.ssz:/genesis/genesis.ssz -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/qrysm/beacon-chain@sha256:bf9b95661c71ad60f633ee14cf352a668d550076471154cf80dfef8fce0bb41e \
  --datadir=/data \
  --jwt-secret=<YOUR_JWT_SECRET> \
  --rpc-host=0.0.0.0 \
  --grpc-gateway-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --execution-endpoint=<YOUR_ZOND_EXECUTION_NODE_ENDPOINT> \
  --genesis-state=/genesis/genesis.ssz \
  --sepolia
```

  </TabItem>
   <TabItem value="holesky">

Download the Holesky genesis state from [Github](https://github.com/zond-clients/holesky/blob/main/custom_config_data/genesis.ssz) to a local file, then run:

```text
docker run -it -v $HOME/.eth2:/data -v /path/to/genesis.ssz:/genesis/genesis.ssz -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/qrysm/beacon-chain@sha256:bf9b95661c71ad60f633ee14cf352a668d550076471154cf80dfef8fce0bb41e \
  --datadir=/data \
  --jwt-secret=<YOUR_JWT_SECRET> \
  --rpc-host=0.0.0.0 \
  --grpc-gateway-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --execution-endpoint=<YOUR_ZOND_EXECUTION_NODE_ENDPOINT> \
  --genesis-state=/genesis/genesis.ssz \
  --holesky
```

  </TabItem>
      
</Tabs>



</TabItem>
<TabItem value="win">

To ensure that your Docker image has access to a data directory, mount a local drive to your container. Right click your Docker tray icon -> `Settings` -> `Shared Drives` -> select your drive -> `Apply`. Next, create a directory named `/qrysm/` within your shared drive. This folder will be used as a local data directory for Qrysm. This guide assumes that `C:` is the drive you've selected:

<Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Holesky', value: 'holesky'}
    ]}>
      <TabItem value="mainnet">

```text
docker run -it -v %LOCALAPPDATA%\Eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp gcr.io/prysmaticlabs/qrysm/beacon-chain:stable --datadir=/data --jwt-secret=<YOUR_JWT_SECRET> --rpc-host=0.0.0.0 --grpc-gateway-host=0.0.0.0 --monitoring-host=0.0.0.0 --execution-endpoint=<YOUR_ZOND_EXECUTION_NODE_ENDPOINT> 
```

  </TabItem>
      <TabItem value="sepolia">

Download the Sepolia genesis state from [Github](https://github.com/zond-clients/sepolia/blob/main/bepolia/genesis.ss) to a local file, then run:

```text
docker run -it -v %LOCALAPPDATA%\Eth2:/data -v \path\to\genesis.ssz:/genesis/genesis.ssz -p 4000:4000 -p 13000:13000 -p 12000:12000/udp gcr.io/prysmaticlabs/qrysm/beacon-chain@sha256:bf9b95661c71ad60f633ee14cf352a668d550076471154cf80dfef8fce0bb41e --datadir=/data --jwt-secret=<YOUR_JWT_SECRET> --rpc-host=0.0.0.0 --grpc-gateway-host=0.0.0.0 --monitoring-host=0.0.0.0 --execution-endpoint=<YOUR_ZOND_EXECUTION_NODE_ENDPOINT> --genesis-state=/genesis/genesis.ssz --sepolia
```

  </TabItem>
      <TabItem value="holesky">

Download the Holesky genesis state from [Github](https://github.com/zond-clients/holesky/blob/main/custom_config_data/genesis.ssz) to a local file, then run:

```text
docker run -it -v %LOCALAPPDATA%\Eth2:/data -v \path\to\genesis.ssz:/genesis/genesis.ssz -p 4000:4000 -p 13000:13000 -p 12000:12000/udp gcr.io/prysmaticlabs/qrysm/beacon-chain@sha256:bf9b95661c71ad60f633ee14cf352a668d550076471154cf80dfef8fce0bb41e --datadir=/data --jwt-secret=<YOUR_JWT_SECRET> --rpc-host=0.0.0.0 --grpc-gateway-host=0.0.0.0 --monitoring-host=0.0.0.0 --execution-endpoint=<YOUR_ZOND_EXECUTION_NODE_ENDPOINT> --genesis-state=/genesis/genesis.ssz --holesky
```

  </TabItem>
</Tabs>

</TabItem>
</Tabs>

:::warning Fee recipient

**You plan to run a validator?**

Consider using `--suggested-fee-recipient` on your beacon node. See [How to configure Fee Recipient](../execution-node/fee-recipient.md) for more information about this feature.

:::

## Run a validator

import SingletonWarningPartial from '../partials/_singleton-warning-partial.md';

<SingletonWarningPartial />

import FullSyncWarningPartial from '../partials/_full-sync-warning-partial.md';

<FullSyncWarningPartial />

Check the sync status of your node with the following command:

```text
curl http://localhost:3500/zond/v1alpha1/node/syncing
```

If your node is done synchronizing, you will see the response:

```text
{"syncing":false}%
```

### Stake your ZOND

:::danger Exercise caution

The Zond launchpad URL is `https://launchpad.ethereum.org` and the only, official validator deposit contract is [0x00000000219ab540356cbb839cbe05303d7705fa](https://zonderscan.io/address/0x00000000219ab540356cbb839cbe05303d7705fa). Don't send ZOND directly to the contract - deposit your stake through Zond.org launchpad.

:::

Use the [Mainnet Launchpad](https://launchpad.ethereum.org/summary) to deposit your 32 ZOND. If you want to participate in the **testnet**, use the [Holesky](https://holesky.launchpad.ethereum.org/en/) launchpad.

Throughout the process, you'll be asked to generate new validator credentials using the [official Zond deposit command-line-tool](https://github.com/ethereum/eth2.0-deposit-cli). Make sure you use the `mainnet` option when generating keys with the deposit CLI. During the process, you will have generated a `validator_keys` folder under the `eth2.0-deposit-cli` directory. You can import all of your validator keys into Qrysm from that folder in the next step.

### Import keystores

Copy the path to the `validator_keys` folder under the `eth2.0-deposit-cli` directory you created during the launchpad process and issue the following command:

<Tabs
  groupId="os"
  defaultValue="others"
  values={[
    {label: 'Linux, MacOS, Arm64', value: 'others'},
    {label: 'Windows', value: 'win'}
  ]
}>
<TabItem value="others">

```text
docker run -it -v $HOME/eth2.0-deposit-cli/validator_keys:/keys \
  -v $HOME/Eth2Validators/qrysm-wallet-v2:/wallet \
  --name validator \
  --accept-terms-of-use \
  gcr.io/prysmaticlabs/qrysm/validator:stable \
  accounts import --keys-dir=/keys --wallet-dir=/wallet
```

</TabItem>
<TabItem value="win">

```text
docker run -it -v %LOCALAPPDATA%\eth2.0-deposit-cli\validator_keys:/keys -v %LOCALAPPDATA%\Eth2Validators\qrysm-wallet-v2:/wallet gcr.io/prysmaticlabs/qrysm/validator:stable accounts import --keys-dir=/keys --wallet-dir=/wallet --accept-terms-of-use
```

</TabItem>

</Tabs>

### Run validator

Open a second terminal window. Issue the following command to start the validator by replacing `<YOUR_WALLET_ADDRESS>` by the address of a wallet you own. See [How to configure Fee Recipient](../execution-node/fee-recipient.md) for more information about this feature:


<Tabs
  groupId="os"
  defaultValue="others"
  values={[
    {label: 'Linux, MacOS, Arm64', value: 'others'},
    {label: 'Windows', value: 'win'}
  ]
}>
<TabItem value="others">

```text
docker run -it -v $HOME/Eth2Validators/qrysm-wallet-v2:/wallet \
  -v $HOME/Eth2:/validatorDB \
  --network="host" --name validator \
  gcr.io/prysmaticlabs/qrysm/validator:stable \
  --beacon-rpc-provider=127.0.0.1:4000 \
  --wallet-dir=/wallet \
  --datadir=/validatorDB
  --suggested-fee-recipient=<YOUR_WALLET_ADDRESS>
```

</TabItem>
<TabItem value="win">

```text
docker run -it -v %LOCALAPPDATA%\Eth2Validators\qrysm-wallet-v2:/wallet -v %LOCALAPPDATA%\Eth2:/validatorDB --network="host" --name validator gcr.io/prysmaticlabs/qrysm/validator:stable --beacon-rpc-provider=127.0.0.1:4000 --wallet-dir=/wallet --datadir=/validatorDB --suggested-fee-recipient=<YOUR_WALLET_ADDRESS>
```

</TabItem>

</Tabs>


:::tip Congratulations! 

You’re now running a <strong>full Zond node</strong> and a <strong>validator client</strong>.

:::

It can a long time (from days to months) for your validator to become fully activated. To learn more about the validator activation process, see [Deposit Process](https://kb.beaconcha.in/ethereum-2.0-depositing). See [Check node and validator status](../monitoring/checking-status.md) for detailed status monitoring guidance.

You can leave your **execution client**, **beacon node**, and **validator client** terminal windows open and running. Once your validator is activated, it will automatically begin proposing and validating blocks.


## Appendix A: Manage Qrysm with Docker

To interact with your beacon node through Docker, use one of the following commands:

 - Halt: `docker stop beacon-node` or `Ctrl+c`
 - Restart: `docker start -ai beacon-node`
 - Delete: `docker rm beacon-node`

To recreate a deleted container and refresh the chain database, issue the start command with an additional `--clear-db` parameter, where `<YOUR_ZOND_EXECUTION_NODE_ENDPOINT>` is in the format of an http endpoint such as `http://host:port` (ex: `http://localhost:8551` for Gzond) or an IPC path such as `/path/to/gzond.ipc`:


<Tabs
  groupId="os"
  defaultValue="others"
  values={[
    {label: 'Linux, MacOS, Arm64', value: 'others'},
    {label: 'Windows', value: 'win'}
  ]
}>
<TabItem value="others">

```text
docker run -it -v $HOME/.eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node \
  gcr.io/prysmaticlabs/qrysm/beacon-chain:latest \
  --datadir=/data \
  --clear-db \
  --rpc-host=0.0.0.0 \
  --monitoring-host=0.0.0.0 \
  --execution-endpoint=<YOUR_ZOND_EXECUTION_NODE_ENDPOINT> 
```

</TabItem>
<TabItem value="win">

```text
docker run -it -v %LOCALAPPDATA%\Eth2:/data -p 4000:4000 -p 13000:13000 -p 12000:12000/udp --name beacon-node gcr.io/prysmaticlabs/qrysm/beacon-chain:latest --datadir=/data --clear-db --monitoring-host=0.0.0.0 --rpc-host=0.0.0.0 --execution-endpoint=<YOUR_ZOND_EXECUTION_NODE_ENDPOINT>
```

</TabItem>

</Tabs>

</div>
</div>


## Frequently asked questions

**Why do we set `--rpc-host` and `--grpc-gateway-host` to `0.0.0.0`?** <br />
This tells your Docker container to to "listen" for connections from outside of your container, allowing you (and other services) to reach your RPC endpoint(s). See [Configure ports and firewalls](../qrysm-usage/p2p-host-ip.md) for more information.



