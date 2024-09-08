
---
id: is-everything-fine
title: Monitor Qrysm for expected behavior
sidebar_label: Monitor Qrysm for expected behavior
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

## Expected behavior: Beacon node

When running a beacon node for the first time from a checktpoint, the beacon node will first sync the chain up to the head.

Logs should look like:

    ...
    INFO initial-sync: Waiting for enough suitable peers before syncing required=3 suitable=1
    INFO initial-sync: Processing block batch of size 19 starting from  0xf0f0eef4... 7379745/7379882 - estimated time remaining 2m24s blocksPerSecond=0.9 peers=8
    INFO initial-sync: Processing block batch of size 46 starting from  0x95cf8689... 7379777/7379882 - estimated time remaining 32s blocksPerSecond=3.2 peers=4
    INFO initial-sync: Synced to finalized epoch - now syncing blocks up to current head currentSlot=7379884 syncedSlot=7379839
    INFO blockchain: Synced new block block=0xdb1052e2... epoch=230620 finalizedEpoch=230617 finalizedRoot=0xcdeff59f... slot=7379841
    INFO blockchain: Finished applying state transition attestations=128 payloadHash=0x0a204c192768 slot=7379841 syncBitsCount=392 txCount=147
    INFO blockchain: Synced new block block=0x5b7dd003... epoch=230620 finalizedEpoch=230617 finalizedRoot=0xcdeff59f... slot=7379842
    INFO blockchain: Finished applying state transition attestations=123 payloadHash=0x8ae88fa0e955 slot=7379842 syncBitsCount=361 txCount=58
    INFO blockchain: Synced new block block=0xe038d8e2... epoch=230620 finalizedEpoch=230617 finalizedRoot=0xcdeff59f... slot=7379843
    INFO blockchain: Finished applying state transition attestations=128 payloadHash=0xdb62fc9e6e69 slot=7379843 syncBitsCount=388 txCount=78
    INFO blockchain: Synced new block block=0xb3fa9ab8... epoch=230620 finalizedEpoch=230617 finalizedRoot=0xcdeff59f... slot=7379845
    INFO blockchain: Finished applying state transition attestations=128 payloadHash=0x4462e3b94f01 slot=7379845 syncBitsCount=391 txCount=151
    INFO blockchain: Synced new block block=0xad7067bd... epoch=230620 finalizedEpoch=230617 finalizedRoot=0xcdeff59f... slot=7379846
    INFO blockchain: Finished applying state transition attestations=94 payloadHash=0x6499de456bff slot=7379846 syncBitsCount=392 txCount=80
    INFO blockchain: Synced new block block=0x61a5d0ab... epoch=230620 finalizedEpoch=230617 finalizedRoot=0xcdeff59f... slot=7379847
    INFO blockchain: Finished applying state transition attestations=128 payloadHash=0x4cd1c96f5ae6 slot=7379847 syncBitsCount=391 txCount=0
    INFO blockchain: Synced new block block=0xa0bf11eb... epoch=230620 finalizedEpoch=230617 finalizedRoot=0xcdeff59f... slot=7379848
    INFO blockchain: Finished applying state transition attestations=66 payloadHash=0x10e44e0316df slot=7379848 syncBitsCount=392 txCount=397
    INFO blockchain: Synced new block block=0x10585aae... epoch=230620 finalizedEpoch=230617 finalizedRoot=0xcdeff59f... slot=7379849
    INFO blockchain: Finished applying state transition attestations=128 payloadHash=0x14bbe9a3ac91 slot=7379849 syncBitsCount=389 txCount=121
    ...
    INFO initial-sync: Synced to head of chain currentSlot=7379887 syncedSlot=7379887
    INFO initial-sync: Synced up to slot 7379887


Then, every 12 seconds, you should see these two lines:
    
    INFO blockchain: Synced new block block=0xef79fc34... epoch=230621 finalizedEpoch=230619 finalizedRoot=0xa3861dc4... slot=7379898
    INFO blockchain: Finished applying state transition attestations=128 payloadHash=0x3d04fb83067c slot=7379898 syncBitsCount=390 txCount=280

From time to time you'll also see this kind of log:

     INFO p2p: Peer summary activePeers=70 inbound=59 outbound=7

If you notice anything concerning or have any questions, feel free to get in touch with us on [Discord](https://theqrl.org/discord).

## Expected behavior: Validator client

Validators are generally in one of the following states: `Unknown`, `Deposited`, `Pending`, `Active`, `Exiting`, `Slashing`, or `Exited`. To learn more about these states, visit [Validator Lifecycle](../how-qrysm-works/validator-lifecycle.md).

When your validator is in `Deposited` state, it will produce `INFO` logs that look like this:

```
INFO validator: Deposit processed, entering activation queue after finalization... 
```

When your validator is `Pending` activation, it will produce `INFO` logs that look like this:

```
INFO validator: Waiting to be assigned activation epoch
```

A healthy `Active` validator client will produce `INFO` logs that look like this:

    INFO validator: Previous epoch aggregated voting summary attestationInclusionPct=100% averageInactivityScore=0 correctlyVotedHeadPct=100% correctlyVotedSourcePct=100% correctlyVotedTargetPct=100% epoch=255839
    INFO validator: Vote summary since launch attestationsInclusionPct=100% correctlyVotedHeadPct=95% correctlyVotedSourcePct=100% correctlyVotedTargetPct=100% numberOfEpochs=202 pctChangeCombinedBalance=0.00620%
    INFO validator: Attestation schedule attesterDutiesAtSlot=1 pubKeys=[0x...] slot=8186914 slotInEpoch=2 timeTillDuty=24s totalAttestersInEpoch=1
    INFO validator: Submitted builder validator registration settings for custom builders
    INFO validator: Submitted new attestations AggregatorIndices=[] AttesterIndices=[...] BeaconBlockRoot=0x5e3a3cb822d6 CommitteeIndex=13 Slot=8186914 SourceEpoch=255840 SourceRoot=0xa02cc7706494 TargetEpoch=255841 TargetRoot=0x72d7a888b2f0


If you notice anything concerning or have any questions, feel free to get in touch with us on [Discord](https://theqrl.org/discord).

