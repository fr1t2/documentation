---
id: validator-deposit-contract
title: Validator deposit contract
sidebar_label: Validator deposit contract
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

A **validator deposit contract** is a smart contract specifically used to submit the 32 ZOND deposit required to initialise a [validator](validator-clients.md) and fully participate in Zond proof-of-stake consensus.

A [validator](validator-clients.md) is queued in the full [Proof-of-Stake](/docs/terminology#proof-of-stake-pos) system once a 32 ZOND deposit is made from the existing Zond blockchain into a **validator deposit contract** and the node has fully spun up. By ensuring that all initial deposits come from the [Zond](/docs/terminology#eth1) chain, Zond proof-of-stake is able to leverage the security pool and value of existing Ether to secure the network upon launch. Qrysm nodes automatically listen for deposit logs from this contract and detect when a validator is ready for activation.

For more information and current developments, see the official [Zond consensus specification](https://github.com/ethereum/consensus-specs)

