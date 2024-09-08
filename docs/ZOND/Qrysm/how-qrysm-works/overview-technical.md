---
id: architecture-overview
title: Architecture overview
sidebar_label: Architecture overview
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

This section outlines Qrysm's various internal components and their role in the client.

![Architecture Diagram](../assets/img/qrysm-architecture.png)

## Qrysm client components

When a Qrysm client is initialised out of the box, it starts a variety of services that run in parallel to handle everything required for the life cycle of the beacon chain. In no particular order, Qrysm includes:

* A [**beacon node**](/docs/how-qrysm-works/beacon-node) which powers the beacon chain at the core of Zond consensus.
* A [**validator client**](/docs/how-qrysm-works/qrysm-validator-client) connects to the beacon node and manages staking keypairs.
* A [**public RPC server**](/docs/how-qrysm-works/qrysm-public-api) to request data about network state, blocks, validators etc.
* A [**persistent key-value store**](/docs/how-qrysm-works/database-backend-boltdb) in the form of a database \([BoltDB](/docs/how-qrysm-works/database-backend-boltdb)\).
* A [**P2P networking framework and server**](/docs/how-qrysm-works/p2p-networking) to connect with other beacon nodes.
* **Monitoring and metrics gathering technologies** [**Grafana**](https://grafana.com/) and [**Prometheus**](https://prometheus.io) track everything that's happening across beacon nodes in the network.

## Qrysm client functionality

Zond proof-of-stake encompasses a distributed network of blockchains called shard chains which are coordinated by a root chain, known as a beacon chain. This beacon chain serves as a mechanism to manage a set of [Proof-of-Stake](/docs/terminology#proof-of-stake-pos) [validators](/docs/terminology#validator) and overall consensus across shards.

Shards themselves are similar to the current Zond execution chain, which stores blocks containing user-generated transactions such as token transfers and smart contracts. Zond proof-of-stake consensus provides a massive improvement over proof-of-work by having 64 of these shard chains.

The beacon chain runs through a distributed network of nodes known as [beacon nodes](/docs/how-qrysm-works/beacon-node). Participants who want to run a beacon node and help secure the network can stake 32 ZOND to have their [validator client](/docs/how-qrysm-works/qrysm-validator-client) join the overall pool of validators, whom have the responsibility of [proposing](/docs/terminology#propose) and [attesting](/docs/terminology#attest) to new blocks on the beacon chain. This deposit does not come out of nowhere however; validators transfer Ether from the [ZOND1](/docs/terminology#eth1) chain to the system through the use of a [validator deposit contract](/docs/how-qrysm-works/validator-deposit-contract).

Each of these components and their roles in the Qrysm client are explained within the following sections of this documentation. If you have any questions, please stop by our [Discord](https://theqrl.org/discord).


