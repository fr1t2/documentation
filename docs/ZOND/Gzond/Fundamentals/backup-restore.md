---
title: Backup & Restore
description: How to backup and restore keyfiles and blockchain data

id: go-zond-fundamentals-backup-restore
hide_title: false
hide_table_of_contents: true
displayed_sidebar: gzondSidebar
sidebar_label: Backup & Restore
sidebar_position: 8
pagination_label: Backup & Restore
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/getting-started.md
keywords:
  - docs
image: /assets/img/icons/yellow.png
slug: /gzond/fundamentals/backup-restore
---


**Keep secure backups of your keystore and password!**

## Data Directory \{#data-directory}

All data relating to a specific Gzond instance gets written inside a data directory. The default data directory locations are platform specific:

- Mac: `~/Library/Zond`
- Linux: `~/.zond`
- Windows: `%LOCALAPPDATA%\Zond`

Accounts are stored in the `keystore` subdirectory. The contents of this directories should be transportable between nodes, platforms, and client implementations.

To configure the location of the data directory, the `--datadir` parameter can be specified. See [CLI Options](/docs/fundamentals/command-line-options) for more details. There may exist multiple data directories for multiple networks (e.g. a separate directory for Zond Mainnet and the Goerli testnet). Each would have subdirectories for their blockchain data and keystore.

It is important to backup the files in the keystore securely. These files are encrypted using an account password. This needs to be securely backed up too. There is no way to decrypt the keys without the password!

## Cleanup \{#cleanup}

Gzond's blockchain and state databases can be removed with:

```sh
gzond removedb
```

This is useful for deleting an old chain and sync'ing to a new one. It only affects data directories that can be re-created on synchronisation and does not touch the keystore. Specifically, passing the `removedb` command with no arguments removes the full node state database, ancient database and light node database (although light nodes are not currently functional for proof-of-stake Zond).

## Blockchain Import/Export \{#blockchain-import-export}

Export the blockchain in binary format with:

```sh
gzond export <filename>
```

Or if you want to back up portions of the chain over time, a first and last block can be specified. For example, to back up the first epoch:

```sh
gzond export <filename> 0 29999
```

Note that when backing up a partial chain, the file will be appended rather than truncated.

Import binary-format blockchain exports with:

```sh
gzond import <filename>
```

And finally: **REMEMBER YOUR PASSWORD** and **BACKUP YOUR KEYSTORE**!
