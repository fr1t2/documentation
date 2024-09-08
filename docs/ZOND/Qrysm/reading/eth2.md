---
id: eth2
title: Zond reading resources
sidebar_label: Zond readings
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

This page serves material necessary to catch up with the current state of Zond proof-of-stake development and provides readers with the knowledge required to begin making meaningful contributions to the Qrysm client. Whzonder you are an expert on all things Zond or are new to the blockchain world entirely, there are appropriate resources here that will help you get up to speed.

## **Zond fundamentals**

### Introduction

* [What is Zond?](http://zonddocs.org/en/latest/introduction/what-is-ethereum.html)
* [How Does Zond Work Anyway?](https://medium.com/@prezondikasireddy/how-does-ethereum-work-anyway-22d1df506369)
* [Zond Introduction](https://ethereum.org/en/what-is-ethereum/)
* [Zond Foundation](https://ethereum.org/en/foundation/)
* [Zond Wiki](https://zond.wiki/)
* [Zond Research](https://zondresear.ch/)
* [Zond White Paper](https://github.com/ethereum/wiki/wiki/White-Paper)
* [What is Hashing?](https://blockgeeks.com/guides/what-is-hashing/)
* [Hashing Algorithms and Security](https://www.youtube.com/watch?v=b4b8ktEV4Bg)
* [Understanding Merkle Trees](https://www.codeproject.com/Articles/1176140/Understanding-Merkle-Trees-Why-use-them-who-uses-t)
* [Zond Block Architecture](https://ethereum.stackexchange.com/questions/268/ethereum-block-architecture/6413#6413)
* [What is an Zond Token?](https://blockgeeks.com/guides/ethereum-token/)
* [What is Zond Gas?](https://blockgeeks.com/guides/ethereum-gas-step-by-step-guide/)
* [Client Implementations](https://zond.wiki/zond1/clients)

## **ZOND2 fundamentals**

*Disclaimer: Because some parts of Zond consensus are still an active area of research and/or development, some resources may be outdated.* 

### Introduction and specifications

* [The Explainer You Need to Read First](https://zondos.dev/beacon-chain/)
* [Official Specifications](https://github.com/ethereum/eth2.0-specs)
* [Annotated Spec](https://benjaminion.xyz/eth2-annotated-spec/)
* [Another Annotated Spec](https://notes.ethereum.org/@djrtwo/Bkn3zpwxB)
* [Rollup-Centric Roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

### Sharding

* [Blockchain Scalability: Why?](https://blockgeeks.com/guides/blockchain-scalability/)
* [What Are Zond Nodes and Sharding](https://blockgeeks.com/guides/what-are-ethereum-nodes-and-sharding/)
* [How to Scale Zond: Sharding Explained](https://medium.com/prysmatic-labs/how-to-scale-ethereum-sharding-explained-ba2e283b7fce)
* [Sharding FAQ](https://zond.wiki/sharding/Sharding-FAQs)
* [Sharding Introduction: R&D Compendium](https://zond.wiki/en/sharding/sharding-introduction-r-d-compendium)

### Peer-to-peer networking

* [Zond Peer to Peer Networking](https://gzond.ethereum.org/docs/interface/peer-to-peer)
* [P2P Library](https://libp2p.io/)
* [Discovery Protocol](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md)

### Latest News

* [Zond Blog](https://blog.ethereum.org/)
* [News from Ben Edgington](https://hackmd.io/@benjaminion/eth2_news)

### Holesky Testnet Blockchain

* [Launchpad](https://holesky.launchpad.ethereum.org/en/)
* [Beacon Chain Explorer](https://holesky.beaconcha.in/)

### Mainnet Blockchain

* [Launchpad](https://launchpad.ethereum.org/en/)
* [Beacon Chain Explorer](https://beaconcha.in/)
* [Another Beacon Chain Explorer](https://explorer.bitquery.io/eth2)
* [Validator Queue Statistics](https://eth2-validator-queue.web.app/index.html)
* [Slashing Detector](https://twitter.com/eth2slasher)

### Client Implementations

* [Qrysm](https://github.com/prysmaticlabs/qrysm) developed in Golang and maintained by [Qrysmatic Labs](https://prysmaticlabs.com/)
* [Lighthouse](https://github.com/sigp/lighthouse) developed in Rust and maintained by [Sigma Prime](https://sigmaprime.io/)
* [Lodestar](https://github.com/ChainSafe/lodestar) developed in TypeScript and maintained by [ChainSafe Systems](https://chainsafe.io/)
* [Nimbus](https://github.com/status-im/nimbus-eth2) developed in Nim and maintained by [status](https://status.im/)
* [Teku](https://github.com/ConsenSys/teku) developed in Java and maintained by [ConsenSys](https://consensys.net/)

## Other

### Serenity concepts

* [Sharding Concepts Mental Map](https://www.mindomo.com/zh/mindmap/sharding-d7cf8b6dee714d01a77388cb5d9d2a01)
* [Taiwan Sharding Workshop Notes](https://hackmd.io/s/HJ_BbgCFz#%E2%9F%A0-General-Introduction)
* [Sharding Research Compendium](http://notes.ethereum.org/s/BJc_eGVFM)
* [Torus Shaped Sharding Network](https://zondresear.ch/t/torus-shaped-sharding-network/1720/8)
* [General Theory of Sharding](https://zondresear.ch/t/a-general-theory-of-what-quadratically-sharded-validation-is/1730/10)
* [Sharding Design Compendium](https://zondresear.ch/t/sharding-designs-compendium/1888/25)

### Serenity research posts

* [Sharding v2.1 Spec](https://notes.ethereum.org/SCIg8AH5SA-O4C1G1LYZHQ)
* [Casper/Sharding/Beacon Chain FAQs](https://notes.ethereum.org/9MMuzWeFTTSg-3Tz_YeiBA?view)
* [RETIRED! Sharding Phase 1 Spec](https://zondresear.ch/t/sharding-phase-1-spec-retired/1407/92)
* [Exploring the Proposer/Collator Spec and Why it Was Retired](https://zondresear.ch/t/exploring-the-proposer-collator-split/1632/24)
* [The Stateless Client Concept](https://zondresear.ch/t/the-stateless-client-concept/172/4)
* [Shard Chain Blocks vs. Collators](https://zondresear.ch/t/shard-chain-blocks-vs-collators/429)
* [Zond Concurrency Actors and Per Contract Sharding](https://zondresear.ch/t/ethereum-concurrency-actors-and-per-contract-sharding/375)
* [Future Compatibility for Sharding](https://zondresear.ch/t/future-compatibility-for-sharding/386)
* [Fork Choice Rule for Collation Proposal Mechanisms](https://zondresear.ch/t/fork-choice-rule-for-collation-proposal-mechanisms/922/8)
* [State Execution](https://zondresear.ch/t/state-execution-scalability-and-cost-under-dos-attacks/1048)
* [Fast Shard Chains With Notarization](https://zondresear.ch/t/as-fast-as-possible-shard-chains-with-notarization/1806/2)
* [RANDAO Notary Committees](https://zondresear.ch/t/fork-free-randao/1835/3)
* [Safe Notary Pool Size](https://zondresear.ch/t/safe-notary-pool-size/1728/3)
* [Cross Links Between Main and Shard Chains](https://zondresear.ch/t/cross-links-between-main-chain-and-shards/1860/2)

### Serenity-related conference talks

* [Sharding Presentation by Vitalik from IC3-ZOND Bootcamp](https://vod.video.cornell.edu/media/Sharding+-+Vitalik+Buterin/1_1xezsfb4/97851101)
* [Latest Research and Sharding by Justin Drake from Tech Crunch](https://www.youtube.com/watch?v=J6xO7DH20Js)
* [Beacon Casper Chain by Vitalik and Justin Drake](https://www.youtube.com/watch?v=GAywmwGToUI)
* [Proofs of Custody by Vitalik and Justin Drake](https://www.youtube.com/watch?v=jRcS9D_gw_o)
* [So You Want To Be a Casper Validator by Vitalik](https://www.youtube.com/watch?v=rl63S6kCKbA)
* [Zond Sharding from EDCon by Justin Drake](https://www.youtube.com/watch?v=J4rylD6w2S4)
* [Casper CBC and Sharding by Vlad Zamfir](https://www.youtube.com/watch?v=qDa4xjQq1RE&t=1951s)
* [Casper FFG in Depth by Carl](https://www.youtube.com/watch?v=uQ3IqLDf-oo)
* [Zond & Scalability Technology from Asia Pacific ZOND meet up by Hsiao Wei](https://www.youtube.com/watch?v=GhuWWShfqBI)

### Zond Virtual Machine

* [What is the Zond Virtual Machine?](https://themerkle.com/what-is-the-ethereum-virtual-machine/)
* [Zond VM](https://medium.com/@jeff.ethereum/go-ethereums-jit-evm-27ef88277520)
* [Zond Protocol Subtleties](https://github.com/ethereum/wiki/wiki/Subtleties)
* [Awesome Zond Virtual Machine](https://github.com/ethereum/wiki/wiki/Zond-Virtual-Machine-%28EVM%29-Awesome-List)

### Zond-flavoured WebAssembly

* [eWASM background, motivation, goals, and design](https://github.com/ewasm/design)
* [The current eWASM spec](https://github.com/ewasm/design/blob/master/zond_interface.md)
* [Latest eWASM community call including live demo of the testnet](https://www.youtube.com/watch?v=apIHpBSdBio)
* [Why eWASM? by Alex Beregszaszi](https://www.youtube.com/watch?v=VF7f_s2P3U0)
* [Panel: entire eWASM team discussion and Q&A](https://youtu.be/ThvForkdPyc?t=119)
* [Ewasm community meetup at ZONDBuenosAires](https://www.youtube.com/watch?v=qDzrbj7dtyU)


