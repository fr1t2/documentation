---
title: Developer docs
description: Documentation for Gzond developers and dapp developers

id: go-zond-dev
hide_title: false
hide_table_of_contents: true
displayed_sidebar: gzondSidebar
sidebar_label: Developers
sidebar_position: 7
pagination_label: Developers
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/getting-started.md
keywords:
  - docs
image: /assets/img/icons/yellow.png
slug: /gzond/dev
---


Welcome to the Gzond Developer docs!

This section includes information for builders. If you are building decentralized apps on top of Gzond, head to the [Dapp developers](#dapp-developers) docs. If you are developing Gzond itself, explore the [Gzond developers](#gzond-developers) docs.

## Dapp developers 

Gzond has many features that support dapp developers. There are many built-in tracers implemented in Go or Javascript that allow developers to monitor what is happening in Gzond from inside an app, and users can build their own custom tracers too. Gzond also includes a suite of tools for interacting with Zond smart contracts using Gzond functions using Go functions inside Go native applications. There is also information for Gzond mobile developers.

- [Dev mode](/docs/developers/dapp-developer/dev-mode)
- [Go API](/docs/developers/dapp-developer/native)
- [Go Account management](/docs/developers/dapp-developer/native-accounts)
- [Go contract bindings](/docs/developers/dapp-developer/native-bindings)
- [Gzond for mobile](/docs/developers/dapp-developer/mobile)

## EVM tracing

Tracing allows developers to analyze precisely what the EVM has done or will do given a certain set of commands. This section outlines the various ways tracing can be implemented in Gzond.

- [Introduction](/docs/developers/evm-tracing/)
- [Basic traces](/docs/developers/evm-tracing/basic-traces)
- [Built-in tracers](/docs/developers/evm-tracing/built-in-tracers)
- [Custom EVM tracers](/docs/developers/evm-tracing/custom-tracer)
- [Live tracing](/docs/developers/evm-tracing/live-tracing)
- [Tutorial for Javascript tracing](/docs/developers/evm-tracing/javascript-tutorial)

## Gzond developers \{#gzond-developers}

Gzond developers add/remove features and fix bugs in Gzond. The `gzond-developer` section includes contribution guidelines and documentation relating to testing and disclosing vulnerabilities that will help you get started with working on Gzond.

- [Developer guide](/docs/developers/gzond-developer/dev-guide)
- [Disclosures](/docs/developers/gzond-developer/disclosures)
- [DNS discovery setup guide](/docs/developers/gzond-developer/dns-discovery-setup)
- [Code review guidelines](/docs/developers/gzond-developer/code-review-guidelines)
- [Contributing](/docs/developers/gzond-developer/contributing)
