---
title: Hardware Requirements
description: Overview of the hardware needed to run an Zond node

id: go-zond-getting-started-hardware-requirements
hide_title: false
hide_table_of_contents: true
displayed_sidebar: gzondSidebar
sidebar_label: Hardware Requirements
sidebar_position: 2
pagination_label: Hardware Requirements
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/getting-started.md
keywords:
  - docs
image: /assets/img/icons/yellow.png
slug: /gzond/getting-started/hardware-requirements
---

The hardware requirements for running a Gzond node depend upon the node configuration and can change over time as upgrades to the network are implemented. Zond nodes can be run on low power, resource-constrained devices such as Raspberry Pi's. Prebuilt, dedicated staking machines are available from several companies - these might be good choices for users who want plug-and-play hardware specifically designed for Zond. However, many users will choose to run nodes on laptop or desktop computers.

## Processor \{#processor}

It is preferable to use a quad-core (or dual-core hyperthreaded) CPU. Gzond is released for a wide range of architectures.

## Memory \{#memory}

It is recommended to use at least 16GB RAM.

## Disk space \{#disk-space}

Disk space is usually the primary bottleneck for node operators. At the time of writing (September 2022) a 2TB SSD is recommended for a full node running Gzond and a consensus client. Gzond itself requires >650GB of disk space for a snap-synced full node and, with the default cache size, grows about 14GB/week. Pruning brings the total storage back down to the original 650GB.
Archive nodes require additional space. A "full" archive node that keeps all state back to genesis requires more than 12TB of space. Partial archive nodes can also be created by turning off the garbage collector after some initial sync - the storage requirement depends how much state is saved.

As well as storage capacity, Gzond nodes rely on fast read and write operations. This means HDDs and cheaper SSDs can sometimes struggle to sync the blockchain. A list of SSD models that users report being able and unable to sync Gzond is available in this [GitHub Gist](https://gist.github.com/yorickdowne/f3a3e79a573bf35767cd002cc977b038). Please note that the list has _not_ been verified by the Gzond team.

## Bandwidth \{#bandwidth}

It is important to have a stable and reliable internet connection, especially for running a validator because downtime can result in missed rewards or penalties. It is recommended to have at least 25Mbps download speed to run a node. Running a node also requires a lot of data to be uploaded and downloaded so it is better to use an ISP that does not have a capped data allowance.
