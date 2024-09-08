---
title: JavaScript Console
description: How to interact with Gzond using Javascript

id: go-zond-interacting-js-console
hide_title: false
hide_table_of_contents: true
displayed_sidebar: gzondSidebar
sidebar_label: JavaScript Console
sidebar_position: 1
pagination_label: JavaScript Console
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/getting-started.md
keywords:
  - docs
image: /assets/img/icons/yellow.png
slug: /gzond/interacting/js-console
---

Gzond responds to instructions encoded as JSON objects as defined in the [JSON-RPC-API](/docs/interacting-with-gzond/rpc). A Gzond user can send these instructions directly, for example over HTTP using tools like [Curl](https://github.com/curl/curl). The code snippet below shows a request for an account balance sent to a local Gzond node with the HTTP port `8545` exposed.

```sh
curl --data '{"jsonrpc":"2.0","method":"zond_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
```

This returns a result which is also a JSON object, with values expressed as hexadecimal strings, for example:

```terminal
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

This is a low level and rather error-prone way to interact with Gzond. Most developers prefer to use convenience libraries that abstract away some of the more tedious and awkward tasks such as converting values from hexadecimal strings into numbers, or converting between denominations of quanta (Shor, Gwei, etc). One such library is [Web3.js](https://web3js.readthedocs.io/en/v1.7.3/).
The purpose of Gzond's Javascript console is to provide a built-in environment to use a subset of the Web3.js libraries to interact with a Gzond node.

:::note
The web3.js version that comes bundled with Gzond is not up to date with the official Web3.js documentation. There are several Web3.js libraries that are not available in the Gzond Javascript Console. There are also administrative APIs included in the Gzond console that are not documented in the Web3.js documentation. The full list of libraries available in the Gzond console is available on the [JSON-RPC API page](/docs/interacting-with-gzond/rpc).
:::

## Starting the console \{#starting-the-console}

There are two ways to start an interactive session using Gzond console. The first is to provide the `console` command when Gzond is started up. This starts the node and runs the console in the same terminal. It is therefore convenient to suppress the logs from the node to prevent them from obscuring the console. If the logs are not needed, they can be redirected to the `dev/null` path, effectively muting them. Alternatively, if the logs are required they can be redirected to a text file. The level of detail provided in the logs can be adjusted by providing a value between 1-6 to the `--verbosity` flag as in the example below:

```sh
# to mute logs
gzond <other flags> console 2> /dev/null

# to save logs to file
gzond <other flags> console --verbosity 3 2> gzond-logs.log
```

Alternatively, a Javascript console can be attached to an existing Gzond instance (i.e. one that is running in another terminal or remotely). In this case, `gzond attach` can be used to open a Javascript console connected to the Gzond node. It is also necessary to define the method used to connect the console to the node. Gzond supports websockets, HTTP or local IPC. To use HTTP or Websockets, these must be enabled at the node by providing the following flags at startup:

```sh
# enable websockets
gzond <other flags> --ws

# enable http
gzond <other flags> --http
```

The commands above use default HTTP/WS endpoints and only enables the default JSON-RPC libraries. To update the Websockets or HTTP endpoints used, or to add support for additional libraries, the `.addr` `.port` and `.api` flags can be used as follows:

```sh
# define a custom http address, custom http port and enable libraries
gzond <other commands> --http --http.addr 192.60.52.21 --http.port 8552 --http.api zond,web3,admin

# define a custom Websockets address and enable libraries
gzond <other commands> --ws --ws.addr 192.60.52.21 --ws.port 8552 --ws.api zond,web3,admin
```

It is important to note that by default **some functionality, including account unlocking is forbidden when HTTP or Websockets access is enabled**. This is because an attacker that manages to access the node via the externally-exposed HTTP/WS port then control the unlocked account. This is not a hypothetical risk: **there are bots that continually scan for http-enabled Zond nodes to attack**

The Javascript console can also be connected to a Gzond node using IPC. When Gzond is started, a `gzond.ipc` file is automatically generated and saved to the data directory. This file, or a custom path to a specific ipc file can be passed to `gzond attach` as follows:

```sh
gzond attach datadir/gzond.ipc
```

Once started, the console looks like this:

```terminal
Welcome to the Gzond Javascript console!

instance: Gzond/v1.10.18-unstable-8d85a701-20220503/linux-amd64/go1.18.1
coinbase: 0x281aabb85c68e1638bb092750a0d9bb06ba103ee
at block: 12305815 (Thu May 26 2022 16:16:00 GMT+0100 (BST))
  datadir: /home/go-zond/data
  modules: admin:1.0 debug:1.0 zond:1.0 ethash:1.0 miner:1.0 net:1.0 rpc:1.0 txpool:1.0 web3:1.0

To exit, press ctrl-d or type exit
>
```

## Interactive use \{#interactive-use}

Once the console has been started, it can be used to interact with Gzond. The console supports Javascript and the full Gzond [JSON-RPC API](/docs/interacting-with-gzond/rpc). For example, to check the balance of the first account already existing in the keystore:

```js
zond.getBalance(zond.accounts[0]);
```

To send a transaction (without global account unlocking):

```js
zond.sendTransaction({
  to: zond.accounts[0],
  to: zond.accounts[1],
  value: web3.toWei(0.5, 'ether')
});
```

It is also possible to load pre-written Javascript files into the console by passing the `--preload` flag when starting the console. This is useful for setting up complex contract objects or loading frequently-used functions.

```sh
gzond console --preload "/my/scripts/folder/utils.js"
```

Once the interactive session is over, the console can be closed down by typing `exit` or `CTRL-D`.

Remember that interactions that touch accounts need approval in Clef - either manually or by writing a custom ruleset.

## Non-interactive Use: Script Mode \{#non-interactive-use}

It is also possible to execute JavaScript code non-interactively by passing the `--exec` and a JSON-RPC-API endpoint to `gzond attach` or `gzond console`. The result is displayed directly in the terminal rather than in an interactive Javascript console.

For example, to display the accounts in the keystore:

```sh
gzond --exec zond.accounts attach
```

```sh
gzond --exec zond.blockNumber attach
```

The same syntax can be used to execute a local script file with more complex statements on a remote node over http, for example:

```sh
gzond --exec 'loadScript("/tmp/checkbalances.js")' attach http://gzond.example.org:8545

gzond --jspath "/tmp" --exec 'loadScript("checkbalances.js")' attach http://gzond.example.org:8545
```

The `--jspath` flag is used to set a library directory for the Javascript scripts. Any parameters passed to `loadScript()` that do not explicitly define an absolute path will be interpreted relative to the `jspath` directory.

## Timers \{#timers}

In addition to the full functionality of JS (as per ECMA5), the Zond Javascript Runtime Environment (JSRE) is augmented with various timers. It implements `setInterval`, `clearInterval`, `setTimeout`, `clearTimeout` which some users will be familiar with from browser windows. It also provides implementation for `admin.sleep(seconds)` and a block based timer, `admin.sleepBlocks(n)` which sleeps till the number of new blocks added is equal to or greater than `n`.

## Caveats \{#caveats}

Gzond's console is built using the [GoJa JS Virtual Machine](https://github.com/dop251/goja) which is compatible with ECMAScript 5.1. This does not support promises or `async` functions. Web3js depends upon the `bignumber.js` library. This is auto-loaded into the console.
