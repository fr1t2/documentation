---
title: Command-line Options
description: A list of commands for Gzond

id: go-zond-fundamentals-command-line-options
hide_title: false
hide_table_of_contents: true
displayed_sidebar: gzondSidebar
sidebar_label: Command-line Options
sidebar_position: 2
pagination_label: Command-line Options
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/getting-started.md
keywords:
  - docs
image: /assets/img/icons/yellow.png
slug: /gzond/fundamentals/command-line-options
---

Gzond is primarily controlled using the command line. Gzond is started using the `gzond`
command. It is stopped by pressing `ctrl-c`.

You can configure Gzond using command-line options (a.k.a. flags). Gzond also has
sub-commands, which can be used to invoke functionality such as the console or blockchain
import/export.

The command-line help listing is reproduced below for your convenience. The same
information can be obtained at any time from your own Gzond instance by running:

```sh
gzond --help
```

## Commands \{#commands}

```sh
NAME:
   gzond - the go-zond command line interface

USAGE:
   gzond [global options] command [command options] [arguments...]

VERSION:
   1.13.1-stable-3f40e65c

COMMANDS:
   account                Manage accounts
   attach                 Start an interactive JavaScript environment (connect to node)
   console                Start an interactive JavaScript environment
   db                     Low level database operations
   dump                   Dump a specific block from storage
   dumpconfig             Export configuration values in a TOML format
   dumpgenesis            Dumps genesis block JSON configuration to stdout
   export                 Export blockchain into file
   export-preimages       Export the preimage database into an RLP stream
   import                 Import a blockchain file
   import-preimages       Import the preimage database from an RLP stream
   init                   Bootstrap and initialize a new genesis block
   js                     (DEPRECATED) Execute the specified JavaScript files
   license                Display license information
   removedb               Remove blockchain and state databases
   show-deprecated-flags  Show flags that have been deprecated
   snapshot               A set of commands based on the snapshot
   verkle                 A set of experimental verkle tree management commands
   version                Print version numbers
   version-check          Checks (online) for known Gzond security vulnerabilities
   wallet                 Manage Zond presale wallets
   help, h                Shows a list of commands or help for one command

GLOBAL OPTIONS:

    --log.rotate                        (default: false)                   ($GZOND_LOG_ROTATE)
          Enables log file rotation

   ACCOUNT


    --allow-insecure-unlock             (default: false)                   ($GZOND_ALLOW_INSECURE_UNLOCK)
          Allow insecure account unlocking when account-related RPCs are exposed by http

    --keystore value                                                       ($GZOND_KEYSTORE)
          Directory for the keystore (default = inside the datadir)

    --lightkdf                          (default: false)                   ($GZOND_LIGHTKDF)
          Reduce key-derivation RAM & CPU usage at some expense of KDF strength

    --password value                                                       ($GZOND_PASSWORD)
          Password file to use for non-interactive password input

    --pcscdpath value                   (default: "/run/pcscd/pcscd.comm") ($GZOND_PCSCDPATH)
          Path to the smartcard daemon (pcscd) socket file

    --signer value                                                         ($GZOND_SIGNER)
          External signer (url or path to ipc file)

    --unlock value                                                         ($GZOND_UNLOCK)
          Comma separated list of accounts to unlock

    --usb                               (default: false)                   ($GZOND_USB)
          Enable monitoring and management of USB hardware wallets

   ALIASED (deprecated)


    --cache.trie.journal value                                             ($GZOND_CACHE_TRIE_JOURNAL)
          Disk journal directory for trie cache to survive node restarts

    --cache.trie.rejournal value        (default: 0s)                      ($GZOND_CACHE_TRIE_REJOURNAL)
          Time interval to regenerate the trie cache journal

    --nousb                             (default: false)                   ($GZOND_NOUSB)
          Disables monitoring for and managing USB hardware wallets (deprecated)

    --txlookuplimit value               (default: 2350000)                 ($GZOND_TXLOOKUPLIMIT)
          Number of recent blocks to maintain transactions index for (default = about one
          year, 0 = entire chain) (deprecated, use history.transactions instead)

    --v5disc                            (default: false)                   ($GZOND_V5DISC)
          Enables the experimental RLPx V5 (Topic Discovery) mechanism (deprecated, use
          --discv5 instead)

    --whitelist value                                                      ($GZOND_WHITELIST)
          Comma separated block number-to-hash mappings to enforce (<number>=<hash>)
          (deprecated in favor of --zond.requiredblocks)

   API AND CONSOLE


    --authrpc.addr value                (default: "localhost")             ($GZOND_AUTHRPC_ADDR)
          Listening address for authenticated APIs

    --authrpc.jwtsecret value                                              ($GZOND_AUTHRPC_JWTSECRET)
          Path to a JWT secret to use for authenticated RPC endpoints

    --authrpc.port value                (default: 8551)                    ($GZOND_AUTHRPC_PORT)
          Listening port for authenticated APIs

    --authrpc.vhosts value              (default: "localhost")             ($GZOND_AUTHRPC_VHOSTS)
          Comma separated list of virtual hostnames from which to accept requests (server
          enforced). Accepts '*' wildcard.

    --exec value                                                           ($GZOND_EXEC)
          Execute JavaScript statement

    --graphql                           (default: false)                   ($GZOND_GRAPHQL)
          Enable GraphQL on the HTTP-RPC server. Note that GraphQL can only be started if
          an HTTP server is started as well.

    --graphql.corsdomain value                                             ($GZOND_GRAPHQL_CORSDOMAIN)
          Comma separated list of domains from which to accept cross origin requests
          (browser enforced)

    --graphql.vhosts value              (default: "localhost")             ($GZOND_GRAPHQL_VHOSTS)
          Comma separated list of virtual hostnames from which to accept requests (server
          enforced). Accepts '*' wildcard.

    --header value, -H value
          Pass custom headers to the RPC server when using --remotedb or the gzond attach
          console. This flag can be given multiple times.

    --http                              (default: false)                   ($GZOND_HTTP)
          Enable the HTTP-RPC server

    --http.addr value                   (default: "localhost")             ($GZOND_HTTP_ADDR)
          HTTP-RPC server listening interface

    --http.api value                                                       ($GZOND_HTTP_API)
          API's offered over the HTTP-RPC interface

    --http.corsdomain value                                                ($GZOND_HTTP_CORSDOMAIN)
          Comma separated list of domains from which to accept cross origin requests
          (browser enforced)

    --http.port value                   (default: 8545)                    ($GZOND_HTTP_PORT)
          HTTP-RPC server listening port

    --http.rpcprefix value                                                 ($GZOND_HTTP_RPCPREFIX)
          HTTP path path prefix on which JSON-RPC is served. Use '/' to serve on all
          paths.

    --http.vhosts value                 (default: "localhost")             ($GZOND_HTTP_VHOSTS)
          Comma separated list of virtual hostnames from which to accept requests (server
          enforced). Accepts '*' wildcard.

    --ipcdisable                        (default: false)                   ($GZOND_IPCDISABLE)
          Disable the IPC-RPC server

    --ipcpath value                                                        ($GZOND_IPCPATH)
          Filename for IPC socket/pipe within the datadir (explicit paths escape it)

    --jspath value                      (default: .)                       ($GZOND_JSPATH)
          JavaScript root path for `loadScript`

    --preload value                                                        ($GZOND_PRELOAD)
          Comma separated list of JavaScript files to preload into the console

    --rpc.allow-unprotected-txs         (default: false)                   ($GZOND_RPC_ALLOW_UNPROTECTED_TXS)
          Allow for unprotected (non EIP155 signed) transactions to be submitted via RPC

    --rpc.batch-request-limit value     (default: 1000)                    ($GZOND_RPC_BATCH_REQUEST_LIMIT)
          Maximum number of requests in a batch

    --rpc.batch-response-max-size value (default: 25000000)                ($GZOND_RPC_BATCH_RESPONSE_MAX_SIZE)
          Maximum number of bytes returned from a batched call

    --rpc.enabledeprecatedpersonal      (default: false)                   ($GZOND_RPC_ENABLEDEPRECATEDPERSONAL)
          Enables the (deprecated) personal namespace

    --rpc.evmtimeout value              (default: 5s)                      ($GZOND_RPC_EVMTIMEOUT)
          Sets a timeout used for zond_call (0=infinite)

    --rpc.gascap value                  (default: 50000000)                ($GZOND_RPC_GASCAP)
          Sets a cap on gas that can be used in zond_call/estimateGas (0=infinite)

    --rpc.txfeecap value                (default: 1)
          Sets a cap on transaction fee (in ether) that can be sent via the RPC APIs (0 =
          no cap)

    --ws                                (default: false)                   ($GZOND_WS)
          Enable the WS-RPC server

    --ws.addr value                     (default: "localhost")             ($GZOND_WS_ADDR)
          WS-RPC server listening interface

    --ws.api value                                                         ($GZOND_WS_API)
          API's offered over the WS-RPC interface

    --ws.origins value                                                     ($GZOND_WS_ORIGINS)
          Origins from which to accept websockets requests

    --ws.port value                     (default: 8546)                    ($GZOND_WS_PORT)
          WS-RPC server listening port

    --ws.rpcprefix value                                                   ($GZOND_WS_RPCPREFIX)
          HTTP path prefix on which JSON-RPC is served. Use '/' to serve on all paths.

   DEVELOPER CHAIN


    --dev                               (default: false)                   ($GZOND_DEV)
          Ephemeral proof-of-authority network with a pre-funded developer account, mining
          enabled

    --dev.gaslimit value                (default: 11500000)                ($GZOND_DEV_GASLIMIT)
          Initial block gas limit

    --dev.period value                  (default: 0)                       ($GZOND_DEV_PERIOD)
          Block period to use in developer mode (0 = mine only if transaction pending)

   ZOND


    --bloomfilter.size value            (default: 2048)                    ($GZOND_BLOOMFILTER_SIZE)
          Megabytes of memory allocated to bloom-filter for pruning

    --config value                                                         ($GZOND_CONFIG)
          TOML configuration file

    --datadir value                     (default: /root/.zond)         ($GZOND_DATADIR)
          Data directory for the databases and keystore

    --datadir.ancient value                                                ($GZOND_DATADIR_ANCIENT)
          Root directory for ancient data (default = inside chaindata)

    --datadir.minfreedisk value                                            ($GZOND_DATADIR_MINFREEDISK)
          Minimum free disk space in MB, once reached triggers auto shut down (default =
          --cache.gc converted to MB, 0 = disabled)

    --db.engine value                                                      ($GZOND_DB_ENGINE)
          Backing database implementation to use ('pebble' or 'leveldb')

    --zond.requiredblocks value                                             ($GZOND_ZOND_REQUIREDBLOCKS)
          Comma separated block number-to-hash mappings to require for peering
          (<number>=<hash>)

    --exitwhensynced                    (default: false)                   ($GZOND_EXITWHENSYNCED)
          Exits after block synchronisation completes

    --goerli                            (default: false)                   ($GZOND_GOERLI)
          Görli network: pre-configured proof-of-authority test network

    --holesky                           (default: false)                   ($GZOND_HOLESKY)
          Holesky network: pre-configured proof-of-stake test network

    --mainnet                           (default: false)                   ($GZOND_MAINNET)
          Zond mainnet

    --networkid value                   (default: 1)                       ($GZOND_NETWORKID)
          Explicitly set network id (integer)(For testnets: use --goerli, --sepolia,
          --holesky instead)

    --override.cancun value             (default: 0)                       ($GZOND_OVERRIDE_CANCUN)
          Manually specify the Cancun fork timestamp, overriding the bundled setting

    --override.verkle value             (default: 0)                       ($GZOND_OVERRIDE_VERKLE)
          Manually specify the Verkle fork timestamp, overriding the bundled setting

    --sepolia                           (default: false)                   ($GZOND_SEPOLIA)
          Sepolia network: pre-configured proof-of-work test network

    --snapshot                          (default: true)                    ($GZOND_SNAPSHOT)
          Enables snapshot-database mode (default = enable)

   GAS PRICE ORACLE


    --gpo.blocks value                  (default: 20)                      ($GZOND_GPO_BLOCKS)
          Number of recent blocks to check for gas prices

    --gpo.ignoreprice value             (default: 2)
          Gas price below which gpo will ignore transactions

    --gpo.maxprice value                (default: 500000000000)
          Maximum transaction priority fee (or gasprice before London fork) to be
          recommended by gpo

    --gpo.percentile value              (default: 60)                      ($GZOND_GPO_PERCENTILE)
          Suggested gas price is the given percentile of a set of recent transaction gas
          prices

   LIGHT CLIENT


    --light.egress value                (default: 0)                       ($GZOND_LIGHT_EGRESS)
          Outgoing bandwidth limit for serving light clients (kilobytes/sec, 0 =
          unlimited)

    --light.ingress value               (default: 0)                       ($GZOND_LIGHT_INGRESS)
          Incoming bandwidth limit for serving light clients (kilobytes/sec, 0 =
          unlimited)

    --light.maxpeers value              (default: 100)                     ($GZOND_LIGHT_MAXPEERS)
          Maximum number of light clients to serve, or light servers to attach to

    --light.nopruning                   (default: false)                   ($GZOND_LIGHT_NOPRUNING)
          Disable ancient light chain data pruning

    --light.nosyncserve                 (default: false)                   ($GZOND_LIGHT_NOSYNCSERVE)
          Enables serving light clients before syncing

    --light.serve value                 (default: 0)                       ($GZOND_LIGHT_SERVE)
          Maximum percentage of time allowed for serving LES requests (multi-threaded
          processing allows values over 100)

   LOGGING AND DEBUGGING


    --log.backtrace value                                                  ($GZOND_LOG_BACKTRACE)
          Request a stack trace at a specific logging statement (e.g. "block.go:271")

    --log.compress                      (default: false)                   ($GZOND_LOG_COMPRESS)
          Compress the log files

    --log.debug                         (default: false)                   ($GZOND_LOG_DEBUG)
          Prepends log messages with call-site location (file and line number)

    --log.file value                                                       ($GZOND_LOG_FILE)
          Write logs to a file

    --log.format value                                                     ($GZOND_LOG_FORMAT)
          Log format to use (json|logfmt|terminal)

    --log.maxage value                  (default: 30)                      ($GZOND_LOG_MAXAGE)
          Maximum number of days to retain a log file

    --log.maxbackups value              (default: 10)                      ($GZOND_LOG_MAXBACKUPS)
          Maximum number of log files to retain

    --log.maxsize value                 (default: 100)                     ($GZOND_LOG_MAXSIZE)
          Maximum size in MBs of a single log file

    --log.vmodule value                                                    ($GZOND_LOG_VMODULE)
          Per-module verbosity: comma-separated list of <pattern>=<level> (e.g.
          zond/*=5,p2p=4)

    --nocompaction                      (default: false)                   ($GZOND_NOCOMPACTION)
          Disables db compaction after import

    --pprof                             (default: false)                   ($GZOND_PPROF)
          Enable the pprof HTTP server

    --pprof.addr value                  (default: "127.0.0.1")             ($GZOND_PPROF_ADDR)
          pprof HTTP server listening interface

    --pprof.blockprofilerate value      (default: 0)                       ($GZOND_PPROF_BLOCKPROFILERATE)
          Turn on block profiling with the given rate

    --pprof.cpuprofile value                                               ($GZOND_PPROF_CPUPROFILE)
          Write CPU profile to the given file

    --pprof.memprofilerate value        (default: 524288)                  ($GZOND_PPROF_MEMPROFILERATE)
          Turn on memory profiling with the given rate

    --pprof.port value                  (default: 6060)                    ($GZOND_PPROF_PORT)
          pprof HTTP server listening port

    --remotedb value                                                       ($GZOND_REMOTEDB)
          URL for remote database

    --trace value                                                          ($GZOND_TRACE)
          Write execution trace to the given file

    --verbosity value                   (default: 3)                       ($GZOND_VERBOSITY)
          Logging verbosity: 0=silent, 1=error, 2=warn, 3=info, 4=debug, 5=detail

   METRICS AND STATS


    --ethstats value                                                       ($GZOND_ZONDSTATS)
          Reporting URL of a ethstats service (nodename:secret@host:port)

    --metrics                           (default: false)                   ($GZOND_METRICS)
          Enable metrics collection and reporting

    --metrics.addr value                                                   ($GZOND_METRICS_ADDR)
          Enable stand-alone metrics HTTP server listening interface.

    --metrics.expensive                 (default: false)                   ($GZOND_METRICS_EXPENSIVE)
          Enable expensive metrics collection and reporting

    --metrics.influxdb                  (default: false)                   ($GZOND_METRICS_INFLUXDB)
          Enable metrics export/push to an external InfluxDB database

    --metrics.influxdb.bucket value     (default: "gzond")                  ($GZOND_METRICS_INFLUXDB_BUCKET)
          InfluxDB bucket name to push reported metrics to (v2 only)

    --metrics.influxdb.database value   (default: "gzond")                  ($GZOND_METRICS_INFLUXDB_DATABASE)
          InfluxDB database name to push reported metrics to

    --metrics.influxdb.endpoint value   (default: "http://localhost:8086") ($GZOND_METRICS_INFLUXDB_ENDPOINT)
          InfluxDB API endpoint to report metrics to

    --metrics.influxdb.organization value (default: "gzond")                  ($GZOND_METRICS_INFLUXDB_ORGANIZATION)
          InfluxDB organization name (v2 only)

    --metrics.influxdb.password value   (default: "test")                  ($GZOND_METRICS_INFLUXDB_PASSWORD)
          Password to authorize access to the database

    --metrics.influxdb.tags value       (default: "host=localhost")        ($GZOND_METRICS_INFLUXDB_TAGS)
          Comma-separated InfluxDB tags (key/values) attached to all measurements

    --metrics.influxdb.token value      (default: "test")                  ($GZOND_METRICS_INFLUXDB_TOKEN)
          Token to authorize access to the database (v2 only)

    --metrics.influxdb.username value   (default: "test")                  ($GZOND_METRICS_INFLUXDB_USERNAME)
          Username to authorize access to the database

    --metrics.influxdbv2                (default: false)                   ($GZOND_METRICS_INFLUXDBV2)
          Enable metrics export/push to an external InfluxDB v2 database

    --metrics.port value                (default: 6060)                    ($GZOND_METRICS_PORT)
          Metrics HTTP server listening port.
          Please note that --metrics.addr must be set
          to start the server.

   MINER


    --mine                              (default: false)                   ($GZOND_MINE)
          Enable mining

    --miner.etherbase value                                                ($GZOND_MINER_ZONDERBASE)
          0x prefixed public address for block mining rewards

    --miner.extradata value                                                ($GZOND_MINER_EXTRADATA)
          Block extra data set by the miner (default = client version)

    --miner.gaslimit value              (default: 30000000)                ($GZOND_MINER_GASLIMIT)
          Target gas ceiling for mined blocks

    --miner.gasprice value              (default: 0)                       ($GZOND_MINER_GASPRICE)
          Minimum gas price for mining a transaction

    --miner.newpayload-timeout value    (default: 2s)                      ($GZOND_MINER_NEWPAYLOAD_TIMEOUT)
          Specify the maximum time allowance for creating a new payload

    --miner.recommit value              (default: 2s)                      ($GZOND_MINER_RECOMMIT)
          Time interval to recreate the block being mined

   MISC


    --help, -h                          (default: false)
          show help

    --synctarget value                                                     ($GZOND_SYNCTARGET)
          File for containing the hex-encoded block-rlp as sync target(dev feature)

    --version, -v                       (default: false)
          print the version

   NETWORKING


    --bootnodes value                                                      ($GZOND_BOOTNODES)
          Comma separated enode URLs for P2P discovery bootstrap

    --discovery.dns value                                                  ($GZOND_DISCOVERY_DNS)
          Sets DNS discovery entry points (use "" to disable DNS)

    --discovery.port value              (default: 30303)                   ($GZOND_DISCOVERY_PORT)
          Use a custom UDP port for P2P discovery

    --discovery.v4, --discv4            (default: true)                    ($GZOND_DISCOVERY_V4)
          Enables the V4 discovery mechanism

    --discovery.v5, --discv5            (default: false)                   ($GZOND_DISCOVERY_V5)
          Enables the experimental RLPx V5 (Topic Discovery) mechanism

    --identity value                                                       ($GZOND_IDENTITY)
          Custom node name

    --maxpeers value                    (default: 50)                      ($GZOND_MAXPEERS)
          Maximum number of network peers (network disabled if set to 0)

    --maxpendpeers value                (default: 0)                       ($GZOND_MAXPENDPEERS)
          Maximum number of pending connection attempts (defaults used if set to 0)

    --nat value                         (default: "any")                   ($GZOND_NAT)
          NAT port mapping mechanism (any|none|upnp|pmp|pmp:<IP>|extip:<IP>)

    --netrestrict value                                                    ($GZOND_NETRESTRICT)
          Restricts network communication to the given IP networks (CIDR masks)

    --nodekey value                                                        ($GZOND_NODEKEY)
          P2P node key file

    --nodekeyhex value                                                     ($GZOND_NODEKEYHEX)
          P2P node key as hex (for testing)

    --nodiscover                        (default: false)                   ($GZOND_NODISCOVER)
          Disables the peer discovery mechanism (manual peer addition)

    --port value                        (default: 30303)                   ($GZOND_PORT)
          Network listening port

   PERFORMANCE TUNING


    --cache value                       (default: 1024)                    ($GZOND_CACHE)
          Megabytes of memory allocated to internal caching (default = 4096 mainnet full
          node, 128 light mode)

    --cache.blocklogs value             (default: 32)                      ($GZOND_CACHE_BLOCKLOGS)
          Size (in number of blocks) of the log cache for filtering

    --cache.database value              (default: 50)                      ($GZOND_CACHE_DATABASE)
          Percentage of cache memory allowance to use for database io

    --cache.gc value                    (default: 25)                      ($GZOND_CACHE_GC)
          Percentage of cache memory allowance to use for trie pruning (default = 25% full
          mode, 0% archive mode)

    --cache.noprefetch                  (default: false)                   ($GZOND_CACHE_NOPREFETCH)
          Disable heuristic state prefetch during block import (less CPU and disk IO, more
          time waiting for data)

    --cache.preimages                   (default: false)                   ($GZOND_CACHE_PREIMAGES)
          Enable recording the SHA3/keccak preimages of trie keys

    --cache.snapshot value              (default: 10)                      ($GZOND_CACHE_SNAPSHOT)
          Percentage of cache memory allowance to use for snapshot caching (default = 10%
          full mode, 20% archive mode)

    --cache.trie value                  (default: 15)                      ($GZOND_CACHE_TRIE)
          Percentage of cache memory allowance to use for trie caching (default = 15% full
          mode, 30% archive mode)

    --crypto.kzg value                  (default: "gokzg")                 ($GZOND_CRYPTO_KZG)
          KZG library implementation to use; gokzg (recommended) or ckzg

    --fdlimit value                     (default: 0)                       ($GZOND_FDLIMIT)
          Raise the open file descriptor resource limit (default = system fd limit)

   STATE HISTORY MANAGEMENT


    --gcmode value                      (default: "full")                  ($GZOND_GCMODE)
          Blockchain garbage collection mode, only relevant in state.scheme=hash ("full",
          "archive")

    --history.state value               (default: 90000)                   ($GZOND_HISTORY_STATE)
          Number of recent blocks to retain state history for (default = 90,000 blocks, 0
          = entire chain)

    --history.transactions value        (default: 2350000)                 ($GZOND_HISTORY_TRANSACTIONS)
          Number of recent blocks to maintain transactions index for (default = about one
          year, 0 = entire chain)

    --state.scheme value                (default: "hash")                  ($GZOND_STATE_SCHEME)
          Scheme to use for storing zond state ('hash' or 'path')

    --syncmode value                    (default: snap)                    ($GZOND_SYNCMODE)
          Blockchain sync mode ("snap", "full" or "light")

   TRANSACTION POOL (BLOB)


    --blobpool.datacap value            (default: 10737418240)             ($GZOND_BLOBPOOL_DATACAP)
          Disk space to allocate for pending blob transactions (soft limit)

    --blobpool.datadir value            (default: "blobpool")              ($GZOND_BLOBPOOL_DATADIR)
          Data directory to store blob transactions in

    --blobpool.pricebump value          (default: 100)                     ($GZOND_BLOBPOOL_PRICEBUMP)
          Price bump percentage to replace an already existing blob transaction

   TRANSACTION POOL (EVM)


    --txpool.accountqueue value         (default: 64)                      ($GZOND_TXPOOL_ACCOUNTQUEUE)
          Maximum number of non-executable transaction slots permitted per account

    --txpool.accountslots value         (default: 16)                      ($GZOND_TXPOOL_ACCOUNTSLOTS)
          Minimum number of executable transaction slots guaranteed per account

    --txpool.globalqueue value          (default: 1024)                    ($GZOND_TXPOOL_GLOBALQUEUE)
          Maximum number of non-executable transaction slots for all accounts

    --txpool.globalslots value          (default: 5120)                    ($GZOND_TXPOOL_GLOBALSLOTS)
          Maximum number of executable transaction slots for all accounts

    --txpool.journal value              (default: "transactions.rlp")      ($GZOND_TXPOOL_JOURNAL)
          Disk journal for local transaction to survive node restarts

    --txpool.lifetime value             (default: 3h0m0s)                  ($GZOND_TXPOOL_LIFETIME)
          Maximum amount of time non-executable transaction are queued

    --txpool.locals value                                                  ($GZOND_TXPOOL_LOCALS)
          Comma separated accounts to treat as locals (no flush, priority inclusion)

    --txpool.nolocals                   (default: false)                   ($GZOND_TXPOOL_NOLOCALS)
          Disables price exemptions for locally submitted transactions

    --txpool.pricebump value            (default: 10)                      ($GZOND_TXPOOL_PRICEBUMP)
          Price bump percentage to replace an already existing transaction

    --txpool.pricelimit value           (default: 1)                       ($GZOND_TXPOOL_PRICELIMIT)
          Minimum gas price tip to enforce for acceptance into the pool

    --txpool.rejournal value            (default: 1h0m0s)                  ($GZOND_TXPOOL_REJOURNAL)
          Time interval to regenerate the local transaction journal

   VIRTUAL MACHINE


    --vmdebug                           (default: false)                   ($GZOND_VMDEBUG)
          Record information useful for VM and contract debugging


COPYRIGHT:
   Copyright 2013-2023 The go-zond Authors
```
