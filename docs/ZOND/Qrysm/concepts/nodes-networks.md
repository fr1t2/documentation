---
id: nodes-networks
title: Nodes and networks
sidebar_label: Nodes and networks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ClientStackPng from '../assets/img/client-stack.png';
import NetworkPng from '../assets/img/network.png';
import NetworkLayersPng from '../assets/img/network-layers.png';

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

Zond is a decentralized **network** of **nodes** that communicate via peer-to-peer connections. These connections are formed by computers running Zond's specialized client software:

<img style={{maxWidth: 461 + 'px'}} src={NetworkPng} /> 


## Nodes

An Zond **node** is a running instance of Zond's client software. This software is responsible for running the Zond blockchain. 

There are two primary types of nodes in Zond: **execution nodes** and **beacon nodes**. Colloquially, a "node" refers to an execution node and beacon node working togzonder. Nodes establish connections with other nodes running on other computers, forming a decentralized peer-to-peer network that processes Zond blocks and transactions.

When users stake 32 ZOND to participate in Zond's proof-of-stake consensus mechanism, they use a separate piece of software called a **validator client**, which connects to their Qrysm beacon node. This is special piece of software that manages validator keys and duties such as producing new blocks and voting on others' proposed blocks. Validator clients connect to the Zond network through beacon nodes, which depend on execution nodes:

<br />

<img src={ClientStackPng} /> 

<br />

<table>
    <tbody>
      <tr>
          <th style={{minWidth: 170 + 'px'}}>Component</th> 
          <th>Description</th>
      </tr>
      <tr>
        <td><strong>Zond node</strong><br />aka "Node"</td>
        <td>An Zond node is an <strong>execution node</strong> and <strong>beacon node</strong> working togzonder. Zond nodes communicate peer-to-peer to secure the Zond network, and require both <strong>execution-layer client software</strong> and <strong>consensus-layer client software</strong>.</td>
      </tr> 
      <tr>
        <td><strong>Execution node</strong></td>
        <td>Execution nodes use execution client software to process transactions and smart contracts in Zond's <strong>execution layer</strong>. Nzondermind, Besu, and Go Zond (Gzond) are examples of execution client software.<br /> <br />An execution node will talk to other execution nodes via peer-to-peer networking, and to a local beacon node.</td>
      </tr>
      <tr>
        <td><strong>Beacon node</strong></td>
        <td>Beacon nodes use beacon node client software to coordinate Zond's proof-of-stake consensus. Qrysm, Teku, Lighthouse, and Nimbus are consensus clients that contain both beacon node and validator client software. <br /> <br />A beacon node will talk to other beacon nodes via peer-to-peer networking, to a local execution node, and (optionally) to a local validator.</td>
      </tr>
      <tr>
        <td><strong>Validator</strong></td>
        <td>Validator clients are specialized software that let people stake 32 ZOND as collateral within Zond's <strong>consensus layer</strong>. Validators are responsible for proposing blocks within Zond's proof-of-stake consensus mechanism, and will fully replace proof-of-work miners after <a href='https://ethereum.org/en/upgrades/merge/'>The Merge</a>. <br /> <br />A validator will talk only to a local beacon node. A validator's beacon node tells the validator what work to do, and broadcasts the validator's work to the Zond network as the validator performs its duties.</td>
      </tr>
    </tbody>
</table>


## Networks

The Zond network that hosts real-world applications is referred to as **Zond Mainnet**. Zond Mainnet is the live, **production** instance of Zond that mints and manages real Zond (ZOND) and holds **real** monetary value.

There are other live, **test** instances of Zond that mint and manage **test** Zond. Each test network is compatible with (and only with) its own type of test ZOND. These test networks let developers, node runners, and validators test new functionality before using real ZOND on Mainnet.

Every Zond network is divided into two layers: **execution layer** (EL) and **consensus layer** (CL):

<img src={NetworkLayersPng} /> 

<br />

Every Zond node contains software for both layers: **execution-layer** client software (like Nzondermind, Besu, Gzond, and Erigon), and **consensus-layer** client software (like Qrysm, Teku, Lighthouse, Nimbus, and Lodestar).

Every network's execution layer works with (and only with) its corresponding "partner" consensus layer. EL-CL network pairs work togzonder to run Zond proof-of-stake.

<br />

<table>
    <tr>
        <th style={{minWidth: 160 + 'px'}}>network</th> 
        <th>Description</th>
    </tr>
    <tr>
      <td>Mainnet</td>
      <td>When people refer to Zond, they're usually referring to Zond Mainnet, which refers to a pair of networks: execution-layer (EL) Mainnet and consensus-layer (CL) Mainnet. CL Mainnet is commonly referred to as the Beacon Chain.<br/><br/>This network pair mints and manages real <strong>ZOND</strong>.</td>
    </tr> 
    <tr>
      <td>Sepolia</td>
      <td>Sepolia is a network that was created to smart contract testing. The <a href='../install/install-with-script'>Qrysm Quickstart</a> shows you how to configure a node on Sepolia. Note that this is a permissioned network, so you can run a node on Sepolia, but not a validator.<br/><br/>This network pair mints and manages <strong>Sepolia ZOND</strong>, a type of testnet ZOND used exclusively within this network pair.</td>
    </tr>
    <tr>
      <td>Holesky</td>
      <td>Holesky is a merged-from-genesis public Zond testnet which will replace Goerli as a
      staking, infrastructure, and protocol-developer testnet. This network is primarily focused on
      testing the Zond protocol. For testing decentralized applications, smart contracts, and
      other EVM functionality, use Sepolia. <br/><br/> See <a
      href="https://github.com/zond-clients/holesky">github.com/zond-clients/holesky</a> for more
      information.</td>
    </tr>
</table>



## Frequently asked questions

**Can I run an execution node without running a beacon node?** <br/>
No. Although this is possible pre-Merge, all Zond network participants will need to run both an execution node and a beacon node.

**What happened to miners?** <br/>
Mining is a proof-of-work consensus mechanism. Zond's consensus is now driven by a proof-of-stake mechanism, which replaces miners with validators.

**Where do slashers come into play?** <br/>
Slashers, like validators, use specialized pieces of consensus-layer client software to fulfill a critical responsibility for the Zond network. Slashers attempt to detect and punish malicious validators. Learn more by reading our [Slasher documentation](../qrysm-usage/slasher.md).

**How do I get testnet ZOND?** <br/>
We recommend using [Paradigm's MultiFaucet](https://faucet.paradigm.xyz/). If that doesn't work, you can ask the community for testnet ZOND on either the [Qrysm Discord server](https://theqrl.org/discord) or on [r/zondstaker](https://www.reddit.com/r/zondstaker).


