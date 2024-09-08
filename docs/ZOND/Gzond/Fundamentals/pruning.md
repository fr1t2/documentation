---
title: Pruning
description: Instructions for pruning a Gzond node

id: go-zond-fundamentals-gzond-pruning
hide_title: false
hide_table_of_contents: true
displayed_sidebar: gzondSidebar
sidebar_label: Pruning
sidebar_position: 11
pagination_label: Pruning
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/getting-started.md
keywords:
  - docs
image: /assets/img/icons/yellow.png
slug: /gzond/fundamentals/gzond-pruning
---


:::note
Offline pruning is only for the hash-based state scheme. Soon, we will have a path-based state scheme which enables the pruning by default. Once the hash-based state scheme is no longer supported, offline pruning will be deprecated.
:::

A snap-sync'd Gzond node currently requires more than 650 GB of disk space to store the historic blockchain data. With default cache size the database grows by about 14 GB/week. This means that Gzond users will rapidly run out of space on 1TB hard drives. To solve this problem without needing to purchase additional hardware, Gzond can be pruned. Pruning is the process of erasing older data to save disk space. Since Gzond `v1.10`, users have been able to trigger a snapshot offline prune to bring the total storage back down to the original ~650 GB. The pruning time depends on your hardware but it can take upwards of 12 hours. This has to be done periodically to keep the total disk storage
within the bounds of the local hardware (e.g. every month or so for a 1TB disk).

To prune a Gzond node at least 40 GB of free disk space is recommended. This means pruning cannot be used to save a hard drive that has been completely filled. A good rule of thumb is to prune before the node fills ~80% of the available disk space.

## Pruning rules \{#pruning-rules}

1. Do not try to prune an archive node. Archive nodes need to maintain ALL historic data by definition.
2. Ensure there is at least 40 GB of storage space still available on the disk that will be pruned. Failures have been reported with ~25GB of free space.
3. Gzond is at least `v1.10` ideally > `v1.10.3`
4. Gzond is fully sync'd
5. Gzond has finished creating a snapshot that is at least 128 blocks old. This is true when "state snapshot generation" is no longer reported in the logs.

With these rules satisfied, Gzond's database can be pruned.

## How pruning works \{#how-pruning-works}

Pruning uses snapshots of the state database as an indicator to determine which nodes in the state trie can be kept and which ones are stale and can be discarded. Gzond identifies the target state trie based on a stored snapshot layer which has at least 128 block confirmations on top (for surviving reorgs) data that isn't part of the target state trie or genesis state.

Gzond prunes the database in three stages:

1. Iterating state snapshot: Gzond iterates the bottom-most snapshot layer and constructs a bloom filter set for identifying the target trie nodes.
2. Pruning state data: Gzond deletes stale trie nodes from the database which are not in the bloom filter set.
3. Compacting database: Gzond tidies up the new database to reclaim free space.

There may be a period of >1 hour during the Compacting Database stage with no log messages at all. This is normal, and the pruning should be left to run until finally a log message containing the phrase `State pruning successful` appears (i.e. do not restart Gzond yet!). That message indicates that the pruning is complete and Gzond can be started.

## Pruning command \{#pruning-command}

For a normal Gzond node, Gzond should be stopped and the following command executed to start an offline state prune:

```sh
gzond snapshot prune-state
```

For a Gzond node run using `systemd`:

```sh
sudo systemctl stop gzond # stop gzond, wait >3mins to ensure clean shutdown
tmux # tmux enables pruning to keep running even if you disconnect
sudo -u <user> gzond --datadir <path> snapshot prune-state # wait for pruning to finish
sudo systemctl start gzond # restart gzond
```

The pruning could take 4-5 hours to complete. Once finished, restart Gzond.

## Troubleshooting \{#troubleshooting}

Messages about "state snapshot generation" indicate that a snapshot is not fully generated. This suggests either the `--datadir` is not correct or Gzond ran out of time to complete the snapshot generation and the pruning began before the snapshot was completed. In either case, the best course of action is to stop Gzond, run it normally again (no pruning) until the snapshot is definitely complete and at least 128 blocks exist on top of it, then try pruning again.

## Further Reading \{#further-reading}

[Zond Foundation blog post for Gzond v1.10.0](https://blog.zond.org/2021/03/03/gzond-v1-10-0/)

[Pruning Gzond guide (@yorickdowne)](https://gist.github.com/yorickdowne/3323759b4cbf2022e191ab058a4276b2)

[Pruning Gzond in a RocketPool node](https://docs.rocketpool.net/guides/node/pruning.html)
