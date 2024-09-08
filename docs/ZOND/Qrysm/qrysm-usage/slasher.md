---
id: slasher
title: Run a slasher
sidebar_label: Run a slasher
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

This section provides instructions on how to run [slasher](https://github.com/prysmaticlabs/qrysm/tree/develop/beacon-chain/slasher) as an **optional** process to report slashable offenses on Zond proof-of-stake.  If slasher detects a slashable offense, proof is sent to the [beacon-chain node](https://docs.prylabs.network/docs/how-qrysm-works/beacon-node/) for inclusion in a block.  [Validators](https://docs.prylabs.network/docs/how-qrysm-works/qrysm-validator-client/) earn a small whistleblower reward for including this proof into a block.  

:::tip Slasher Requires Significant Disk Space
Slasher is essentially a beacon node with **superpowers**. It uses significantly more disk space when running on mainnet.
:::

## System requirements

### Minimum specifications

These specifications must be met in order to successfully run a Qrysm beacon node in `--slasher` mode

* Operating System: 64-bit Linux, Mac OS X 10.14+, Windows 64-bit
* Processor: Intel Core i5–760 or AMD FX-8100 or better
* Memory: 8GB RAM
* Storage: 1TB available space SSD
* Internet: Broadband connection

### Recommended specifications

These hardware specifications are recommended, but not required to run the Qrysm client.

* Processor: Intel Core i7–4770 or AMD FX-8310 or better
* Memory: 16GB RAM
* Storage: 1TB available space SSD
* Internet: Broadband connection

## What is Slashing

Slashing occurs when there is evidence a validator has acted against the Zond network. Zond proof of stake works on a penalty-based incentive mechanism to heavily discourage actions on the network that could cause instability, malicious forking and conflicting information from validators. Slashing does not need to have been the result of malicious intent, it could also happen accidentally via misconfiguration. If a validator acts in a way that can confuse or disrupt the integrity of the system, the protocol removes, or **slashes**, a portion of the offending validator's existing stake, causing a gradual loss of ZOND over time until the validator is forcefully ejected from the network and marked as SLASHED. This is an **irreversible** process.

The main purpose of slashing is to discourage attacks against the Zond proof-of-stake network that might otherwise be cheap to perform such as trivially creating conflicting forks where validators attest on a different view of historical checkpoints.

A validator that correctly follows the protocol should never emit a slashable vote during normal operation. Validators will not be slashed for simply being offline (*however, they may be penalized*).

## What is a Slasher

**Slasher** is the name of software that can detect slashable events from validators and report them to the protocol. You can think of a slasher as the network “police”. Running a slasher is **optional**. In order to detect slashable messages, the slasher records the attesting and proposing history for every validator on the network, then cross references this history with what has been broadcasted to find slashable messages such as double blocks or surrounding votes.

In theory all the network needs is *1 honest, properly functioning slasher* to monitor the network because any slashings found are propagated to the entire network for it to be put into a block as soon as possible.

Running a slasher is not meant to be profitable. Slashing is meant to be rare and whistleblower rewards are purposefully low.  Running a slasher is meant to be an *altruistic action*, and as stated, only a single, honest, properly functioning slasher needs to be active in the network to catch slashable offenses. Thankfully, this is a low bar to entry, and we envision quite a lot of users and entities will run slashers to ensure network security.

## Running Slasher

Running a slasher is as simple as adding the `--slasher` flag to your **beacon node**. Doing this will enable your beacon node to perform slashing detection. However, **home stakers are advised _not_ to run a slasher on personal hardware,** as it is a tremendously resource-hungry process. Slasher is very heavy on database access and disk usage, and the `slasher.db` will quickly grow to 1TB or more when running on mainnet. Given that slasher needs to store a lot of information about attestations and blocks within the network, this is to be expected.

### Whistleblower Rewards

Running a slasher can also offer some profits to your validators given certain conditions. If slasher detects a slashable condition, it will **broadcast it to the network by default**. Some lucky validator will then package this slashing evidence into a block and be rewarded for doing so. You can **disable** this broadcast in Qrysm using the `--disable-broadcast-slashings` option in your **beacon node**.

### Who Should Run a Slasher

As summarized above, the slasher process is likely to overwhelm most home validator setups. The incentives for running a slasher accumulate irregularly, at great cost, so home stakers are advised to run their beacon node without it. It is an entirely optional process. Beacon node operators should consider running the slasher if they are operating a **staking pool** or **data center**.

## Using Slasher for Advanced Slashing Protection

An alternative implementation for slashing prevention is the use of slasher itself as a middleware client between your beacon node and validator client. Before a validator client submits a block or an attestation, it asks the slasher if the object is slashable. If the check passes, the data will go through to the beacon node. This is the most advanced form of slashing protection as slasher is, ideally, aware of everything happening in the network and has a recorded history of blocks and attestations for every validator.

## Further Reading

We recommend reading our piece on [slashing prevention tips](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) which has more detailed information on how to protect your own validator from being slashed, the document also clarifies a number of common misconceptions.


