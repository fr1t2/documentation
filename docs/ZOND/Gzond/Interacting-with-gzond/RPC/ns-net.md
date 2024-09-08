---
title: Net Namespace
description: Documentation for the JSON-RPC API "net" namespace

id: go-zond-interacting-rpc-ns-net
hide_title: false
hide_table_of_contents: true
displayed_sidebar: gzondSidebar
sidebar_label: Net Namespace
sidebar_position: 10
pagination_label: Net Namespace
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/getting-started.md
keywords:
  - docs
image: /assets/img/icons/yellow.png
slug: /gzond/interacting/rpc/ns-net
---

The `net` API provides insight about the networking aspect of the client.

## net_listening \{#net-listening}

Returns an indication if the node is listening for network connections.

| Client  | Method invocation             |
| :------ | ----------------------------- |
| Console | `net.listening`               |
| RPC     | `{"method": "net_listening"}` |

## net_peerCount \{#net-peercount}

Returns the number of connected peers.

| Client  | Method invocation             |
| :------ | ----------------------------- |
| Console | `net.peerCount`               |
| RPC     | `{"method": "net_peerCount"}` |

## net_version \{#net-version}

Returns the devp2p network ID (e.g. 1 for mainnet, 5 for goerli).

| Client  | Method invocation           |
| :------ | --------------------------- |
| Console | `net.version`               |
| RPC     | `{"method": "net_version"}` |
