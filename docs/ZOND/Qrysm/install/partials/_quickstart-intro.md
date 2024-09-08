import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Select a configuration 

If you're looking for the simplest configuration, select `Gzond` and `IPC`:

import MultidimensionalContentControlsPartial from '../../../../ZOND/Qrysm/partials/_multidimensional-content-controls-partial.md';

<MultidimensionalContentControlsPartial />

## Introduction

Qrysm is an implementation of the [Zond proof-of-stake consensus specification](https://github.com/ethereum/consensus-specs). In this quickstart, you’ll use Qrysm to run an Zond node and optionally a validator client. This will let you stake 32 ZOND using hardware that you manage.

This is a beginner-friendly guide. Familiarity with the command line is expected, but otherwise this guide makes no assumptions about your technical skills or prior knowledge.

At a high level, we'll walk through the following flow:

 1. Configure an **execution node** using an execution-layer client.
 2. Configure a **beacon node** using Qrysm, a consensus-layer client.
 3. Configure a **validator client** and stake ZOND using Qrysm (optional).

<br />

:::info Knowledge Check

**Not familiar with nodes, networks, and related terminology?** Consider reading [Nodes and networks](../../concepts/nodes-networks.md) before proceeding. 

:::

