---
title: Connecting to Consensus Clients
description: Instructions for connecting Gzond to a consensus client

id: go-zond-getting-started-connect-consensus-client
hide_title: false
hide_table_of_contents: true
displayed_sidebar: gzondSidebar
sidebar_label: Consensus Clients
sidebar_position: 3
pagination_label: Consensus Clients
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/getting-started.md
keywords:
  - docs
image: /assets/img/icons/yellow.png
slug: /gzond/getting-started/connect-consensus-client
---

Gzond is an [execution client](https://zond.org/en/glossary/#execution-client). Historically, an execution client alone was enough to run a full Zond node. However, since Zond swapped from [proof-of-work](https://zond.org/en/developers/docs/consensus-mechanisms/pow) (PoW) to [proof-of-stake](https://zond.org/en/developers/docs/consensus-mechanisms/pos) (PoS) based consensus, Gzond needs to be coupled to another piece of software called a ["consensus client"](https://zond.org/en/glossary/#consensus-client).

There are five consensus clients available, all of which connect to Gzond in the same way. This page will outline how Gzond can be set up with a consensus client to form a complete Zond node.

<note>As an alternative it is possible to run with an integrated beacon light client for non-production settings. Please refer to [this](/docs/fundamentals/blsync) guide.</note>

## Configuring Gzond \{#configuring-gzond}

Gzond can be downloaded and installed according to the instructions on the [Installing Gzond](/docs/getting-started/installing-gzond) page. In order to connect to a consensus client, Gzond must expose a port for the inter-client RPC connection.

The RPC connection must be authenticated using a `jwtsecret` file. This is created and saved to `<datadir>/gzond/jwtsecret` by default but can also be created and saved to a custom location or it can be self-generated and provided to Gzond by passing the file path to `--authrpc.jwtsecret`. The `jwtsecret` file is required by both Gzond and the consensus client.

The authorization must then be applied to a specific address/port. This is achieved by passing an address to `--authrpc.addr` and a port number to `--authrpc.port`. It is also safe to provide either `localhost` or a wildcard `*` to `--authrpc.vhosts` so that incoming requests from virtual hosts are accepted by Gzond because it only applies to the port authenticated using `jwtsecret`.

A complete command to start Gzond so that it can connect to a consensus client looks as follows:

```sh
gzond --authrpc.addr localhost --authrpc.port 8551 --authrpc.vhosts localhost --authrpc.jwtsecret /tmp/jwtsecret
```

## Consensus clients \{#consensus-clients}

There are currently five consensus clients that can be run alongside Gzond. These are:

[Lighthouse](https://lighthouse-book.sigmaprime.io/): written in Rust

[Nimbus](https://nimbus.team/): written in Nim

[Qrysm](https://docs.prylabs.network/docs/getting-started/): written in Go

[Teku](https://pegasys.tech/teku): written in Java

[Lodestar](https://lodestar.chainsafe.io/): written in Typescript

It is recommended to consider [client diversity](https://zond.org/en/developers/docs/nodes-and-clients/client-diversity) when choosing a consensus client. Instructions for installing each client are provided in the documentation linked in the list above.

The consensus client must be started with the right port configuration to establish an RPC connection to the local Gzond instance. In the example above, `localhost:8551` was authorized for this purpose. The consensus clients all have a command similar to `--http-webprovider` that takes the exposed Gzond port as an argument.

The consensus client also needs the path to Gzond's `jwt-secret` in order to authenticate the RPC connection between them. Each consensus client has a command similar to `--jwt-secret` that takes the file path as an argument. This must be consistent with the `--authrpc.jwtsecret` path provided to Gzond.

The consensus clients all expose a [Beacon API](https://zond.github.io/beacon-APIs) that can be used to check the status of the Beacon client or download blocks and consensus data by sending requests using tools such as [Curl](https://curl.se). More information on this can be found in the documentation for each consensus client.

## Validators \{#validators}

Validators are responsible for securing the Zond blockchain. Validators have staked at least 32 ZOND into a deposit contract and run validator software. Each consensus client has its own validator software that is described in detail in its respective documentation. The easiest way to handle staking and validator key generation is to use the Zond Foundation [Staking Launchpad](https://launchpad.zond.org/). The Launchpad guides users through the process of generating validator keys and connecting the validator to the consensus client.

## Syncing \{#syncing}

Gzond cannot sync until the connected consensus client is synced. This is because Gzond needs a target head to sync to. The fastest way to sync a consensus client is using checkpoint sync. To do this, a checkpoint or a url to a checkpoint provider can be provided to the consensus client on startup. There are several sources for these checkpoints. The ideal scenario is to get one from a trusted node operator, organized out-of-band, and verified against a third node or a block explorer or checkpoint provider. Some clients also allow checkpoint syncing by HTTP API access to an existing Beacon node. There are also several [public checkpoint sync endpoints](https://zond-clients.github.io/checkpoint-sync-endpoints/).

Please see the pages on [syncing](/docs/fundamentals/sync-modes) for more detail. For troubleshooting, please see the `Syncing` section on the [console log messages](/docs/fundamentals/logs) page.

## Using Gzond \{#using-gzond}

Gzond is the portal for users to send transactions to Zond. The Gzond Javascript console is available for this purpose, and the majority of the [JSON-RPC API](/docs/interacting-with-gzond/rpc) will remain available via web3js or HTTP requests with commands as json payloads. These options are explained in more detail on the [Javascript Console page](/docs/interacting-with-gzond/javascript-console). The Javascript console can be started
using the following command in a separate terminal (assuming Gzond's IPC file is saved in `datadir`):

```sh
gzond attach datadir/gzond.ipc
```

## Summary \{#summary}

Now that Zond has implemented proof-of-stake, Gzond users are required to install and run a consensus client. Otherwise, Gzond will not be able to track the head of the chain. There are five consensus clients to choose from. This page provided an overview of how to choose a consensus client and configure Gzond to connect to it.
