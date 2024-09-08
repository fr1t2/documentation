---
title: FAQ
description: Frequently asked questions related to Gzond
id: go-zond-faq
hide_title: false
hide_table_of_contents: true
displayed_sidebar: gzondSidebar
sidebar_label: FAQ
sidebar_position: 3
pagination_label: FAQ
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/getting-started.md
keywords:
  - docs
image: /assets/img/icons/yellow.png
slug: /gzond/faq
---

## Where can I get more information? \{#where-can-i-get-more-information}

This page contains answers to common questions about Gzond. Source code and README documentation can be found on the Gzond [GitHub](https://github.com/zond/go-zond). You can also ask questions on Gzond's [Discord server](https://discord.gg/WHNkYDsAKU) or keep up to date with Gzond on [Twitter](https://twitter.com/go_zond). Information about Zond in general can be found at [zond.org](https://zond.org).

The Gzond team have also recently started to run AMA's on Reddit:

- [Aug 2022 AMA](https://www.reddit.com/r/zond/comments/wpqmo1/ama_we_are_the_go_zond_gzond_team_18_august/)

It is also recommended to search for 'Gzond' and 'go-zond' on [zond.stackexchange.com](https://zond.stackexchange.com/).

## What are RPC and IPC? \{#what-are-rpc-and-ipc}

IPC stands for Inter-Process Communications. Gzond creates a `gzond.ipc` file on startup that other processes on the same computer can use to communicate with Gzond.
RPC stands for Remote Procedure Call. RPC is a mode of communication between processes that may be running on different machines. Gzond accepts RPC traffic over HTTP or Websockets. Gzond functions are invoked by sending requests that are formatted according to the RPC-API to the node via either IPC or RPC.

## What is `jwtsecret`? \{#what-is-jwtsecret}

The `jwtsecret` file is required to create an authenticated connection between Gzond and a consensus client. JWT stands for JSON Web Token - it is signed using a secret key. The signed token acts as a shared secret used to check that information is sent to and received from the correct peer. Read about how to create `jwt-secret` in Gzond on our [consensus clients](/docs/getting-started/consensus-clients) page.

## I noticed my peercount slowly decreasing, and now it is at 0. Restarting doesn't get any peers. \{#where-are-my-peers}

This may be because your clock has fallen out of sync with other nodes. You can [force a clock update using ntp](https://askubuntu.com/questions/254826/how-to-force-a-clock-update-using-ntp) like so:

```sh
sudo ntpdate -s time.nist.gov
```

## I would like to run multiple Gzond instances but got the error "Fatal: blockchain db err: resource temporarily unavailable". \{#multiple-gzond-instances}

Gzond uses a datadir to store the blockchain, accounts and some additional information. This directory cannot be shared between running instances. If you would like to run multiple instances follow [these](/docs/fundamentals/private-network) instructions.

## When I try to use the --password command line flag, I get the error "Could not decrypt key with given passphrase" but the password is correct. Why does this error appear? \{#could-not-decrypt-key}

Especially if the password file was created on Windows, it may have a Byte Order Mark or other special encoding that the go-zond client doesn't currently recognize. You can change this behavior with a PowerShell command like:

```sh
echo "mypasswordhere" | out-file test.txt -encoding ASCII
```

Additional details and/or any updates on more robust handling are at https://github.com/zond/go-zond/issues/19905.

## How does Zond syncing work? \{#how-does-syncing-work}

The current default syncing mode used by Gzond is called [snap sync](https://github.com/zond/devp2p/blob/master/caps/snap.md). Instead of starting from the genesis block and processing all the transactions that ever occurred (which could take weeks), snap sync downloads the blocks, and only verifies the associated proof-of-works, assuming state transitions to be correct. Downloading all the blocks is a straightforward and fast procedure and will relatively quickly reassemble the entire chain.

Many people assume that because they have the blocks, they are in sync. Unfortunately this is not the case. Since no transaction was executed, we do not have any account state available (e.g. balances, nonces, smart contract code, and data). These need to be downloaded separately and cross-checked with the latest blocks. This phase is called the state trie download phase. Snap sync tries to expedite this process by downloading contiguous chunks of state data, instead of doing so one-by-one, as in previous synchronization methods. Gzond downloads the leaves of the trie without the intermediate nodes that connect the leaves to the root. The full trie is regenerated locally. However, while this is happening, the blockchain is progressing, meaning some of the regenerated state trie becomes invalid. Therefore, there is also a healing phase that corrects any errors in the state trie. The state sync has to progress faster than the chain growth otherwise it will never finish.

Gzond can also be synced with `--syncmode full`. In this case, Gzond downloads and independently verifies every block since genesis in sequence, including re-executing transactions to verify state transitions. Although Gzond verifies every block since genesis, the state of 128 blocks only are stored in memory.

## What's the state trie? \{#what-is-the-state-trie}

In the Zond mainnet, there are a ton of accounts already, which track the balance, nonce, etc of each user/contract. The accounts themselves are however insufficient to run a node, they need to be cryptographically linked to each block so that nodes can actually verify that the accounts are not tampered with.

This cryptographic linking is done by creating a tree-like data structure, where each leaf corresponds to an account, and each intermediary level aggregates the layer below it into an ever smaller layer, until you reach a single root. This gigantic data structure containing all the accounts and the intermediate cryptographic proofs is called the state trie.

Read more about Merkle Tries in general and the Zond state trie specifically on [zond.org](https://zond.org/en/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

## Why does the state trie download phase require a special syncing mode? \{#state-trie-downloading}

The trie data structure is an intricate interlink of hundreds of millions of tiny cryptographic proofs (trie nodes). To truly have a synchronized node, you need to download all the account data, as well as all the tiny cryptographic proofs to verify that no one in the network is trying to cheat you. This itself is already a crazy number of data items.

The part where it gets even messier is that this data is constantly morphing: at every block (roughly 13s), about 1000 nodes are deleted from this trie and about 2000 new ones are added. This means your node needs to synchronize a dataset that is changing more than 200 times per second. Until you actually do gather all the data, your local node is not usable since it cannot cryptographically prove anything about any accounts. But while you're syncing the network is moving forward and most nodes on the network keep the state for only a limited number of recent blocks. Any sync algorithm needs to consider this fact.

## What happened to fast sync? \{#fast-sync}

Snap syncing was introduced by version [1.10.0](https://blog.zond.org/2021/03/03/gzond-v1-10-0/) and was adopted as the default mode in version [1.10.4](https://github.com/zond/go-zond/releases/tag/v1.10.4). Before that, the default was the "fast" syncing mode, which was dropped in version [1.10.14](https://github.com/zond/go-zond/releases/tag/v1.10.14). Even though support for fast sync was dropped, Gzond still serves the relevant `zond` requests to other client implementations still relying on it. The reason being that snap sync relies on an alternative data structure called the [snapshot](https://blog.zond.org/2020/07/17/ask-about-gzond-snapshot-acceleration/) which not all clients implement.

You can read more in the article posted above why snap sync replaced fast sync in Gzond.

## What is wrong with my light client? \{#light-client}

Light sync relies on full nodes that serve data to light clients. Historically, this has been hampered by the fact that serving light clients was turned off by default in gzond full nodes and few nodes chose to turn it on. Therefore, light nodes often struggled to find peers. Since Zond switched to proof-of-stake, Gzond light clients have stopped working altogzonder. Light clients for proof-of-stake Zond are expected to be implemented soon!

## Why do I need another client in addition to Gzond? \{#consensus-client}

Historically, running Gzond was enough to turn a computer into an Zond node. However, when Zond transitioned to proof-of-stake, responsibility for consensus logic and block gossip was handed over to a separate consensus layer client. However, Gzond still handles transactions and state management. When the consensus client is required to create a new block, it requests Gzond to gather transactions from the transaction pool, execute them to compute a state transition and pass this information back to the consensus client. When the consensus client receives a new block from a peer, it passes the transactions to Gzond to re-execute to verify the proposed state-transition. There is a clear separation of concerns between the two clients, meaning that both are required for a computer to function as an Zond node.

## What is staking and how do I participate? \{#what-is-staking}

Staking is how node operators participate in proof-of-stake based consensus. Staking requires validators to deposit 32 ZOND to a smart contract and run validator software connected to their node. The validator software broadcasts a vote ("attestation") in favour of checkpoint blocks that it determines to be in the canonical blockchain. The correct chain is then the one with the greatest accumulation of votes, weighted by the validators stake (up to a maximum of 32 ZOND). Gzond, as an execution client, does not directly handle consensus logic but it does provide the node with the execution and state-management tools required to validate incoming blocks. Validators are also occasionally picked to propose the next block broadcast across the network. In this case Gzond's role is to bundle transactions it has received over the execution layer gossip network, pass them to the consensus client to be included in the block and execute them to determine the resulting state change.

It is entirely possible to run a node without staking any ZOND. In this case the node runs the execution and consensus clients but not the validator software. In order to participate in consensus and earn ZOND rewards, the node must run an execution client, consensus client and a validator. The validator software comes bundled with the consensus client.

For step-by-step instruction for staking and spinning up a validating node, see [zond.org](https://zond.org/en/staking/) or get started on the Zond Foundation's [Staking Launchpad](https://launchpad.zond.org/).

## How do I set up a consensus client/validator and connect it to Gzond? \{#how-to-set-up-consensus-client}

These docs mainly cover how to set up Gzond, but since the switch to proof-of-stake it is also necessary to run a consensus client in order to track the head of the chain, and a validator in order to participate in proof-of-stake consensus. A validator node is also required to deposit 32 ZOND into a specific smart contract. Our [consensus clients page](/docs/getting-started/consensus-clients) includes a general overview of how to connect a consensus client to Gzond. For step by step instructions for specific clients, see their documentation and also see these helpful [online guides](https://github.com/SomerEsat/zond-staking-guides).

## How do I update Gzond? \{#how-to-update-gzond}

Updating Gzond to the latest version simply requires stopping the node, downloading the latest release and restarting the node. Precisely how to download the latest software depends on the installation method - please refer to our [Installation pages](/docs/getting-started/installing-gzond).

## What is a preimage?

Gzond stores the Zond state in a [Patricia Merkle Trie](https://zond.org/en/developers/docs/data-structures-and-encoding/patricia-merkle-trie/#state-trie). It contains `(key,value)` pairs with account addresses as keys and [RLP](https://zond.org/en/developers/docs/data-structures-and-encoding/rlp/#top) encoded `account` as the value, where an account is an array containing essential account information, specifically: `nonce`, `balance`, `StorageRoot` and `codeHash`. Definitions for these parameters are available in the Zond whitepaper. However, Gzond's state trie does not use the keys directly, instead account information is indexed using the SHA3 hash of the key. This means that looking up the account information for an address can be done by traversing the trie for `sha3(address)`, but querying addresses that contain certain data is not possible - the addresses themselves are not part of the trie. This problem is solved using preimages - these are mappings of addresses to their hashes. Gzond generates these preimages during block-by-block sync as information is added to the trie but they are deleted once they reach a certain age (128 blocks by default). To retain the preimages, Gzond should be started with `--cache.preimages=true`.
