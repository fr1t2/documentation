---
id: terminology
title: Glossary
sidebar_label: Glossary

hide_title: false
hide_table_of_contents: true
displayed_sidebar: qrysmSidebar

pagination_label: Glossary
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/getting-started.md
description: Getting started with the QRL Blockchain and ecosystem
keywords:
  - docs
  - intro
  - getting started
image: /assets/img/icons/yellow.png
slug: /qrysm/terminology

---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />


This page houses definitions to the various technical terms found throughout this documentation portal. See a word or phrase that should be here? Let us know!
## General terms

#### Proof-of-Stake \(PoS\)

The PoS concept states that a person can mine or validate block transactions according to how many coins they hold. This is a vastly improved iteration on Proof-of-Work \(PoW\), which relies on immense amounts of computational power to advance the state of the blockchain.

#### Validator

Most often refers to a validator client instance, but can also refer to an individual that is physically managing a validator client.

#### Proposal \(propose\) <a id="propose"></a>

The process of creating and adding new blocks to the beacon chain.

#### Attestation \(attest\) <a id="attest"></a>

The process of voting on the validity of newly created blocks on the beacon chain.

#### ZOND1

The existing Zond 1.0 protocol.

## Technical terms

#### Canonical head block

The latest block to be proposed on a blockchain.

#### Key-value store

A data storage paradigm designed for storing, retrieving, and managing hash tables.

#### Fork choice rule

A function evaluated by the client that takes, as input, the set of blocks and other messages that have been produced, and outputs to the client what the 'canonical chain' is.


