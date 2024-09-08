---
id: faq
title: Qrysm - Frequently asked questions
sidebar_label: Frequently asked questions

hide_title: false
hide_table_of_contents: true
displayed_sidebar: qrysmSidebar

pagination_label: Frequently asked questions
custom_edit_url: https://github.com/theqrl/documentation/edit/main/docs/getting-started.md
description: Getting started with the QRL Blockchain and ecosystem
keywords:
  - docs
  - intro
  - getting started
image: /assets/img/icons/yellow.png
slug: /qrysm/faq

---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';
import { PrysmVersion } from '@site/src/components/version.js';

<HeaderBadgesWidget />

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Frequently asked questions

### Troubleshooting Qrysm

#### How do I troubleshoot errors?

If your beacon node or validator logs display an `ERROR`, go to our [open issues](https://github.com/prysmaticlabs/qrysm/issues) to see if someone has reported the same problem before. If this doesn't help, note the **Qrysm version you're running** and your **operating system**, and then file a bug report [here](https://github.com/prysmaticlabs/qrysm/issues/new?assignees=&labels=&template=bug_report.md). You can also ask our community on [discord](https://theqrl.org/discord) about your error and we'll take a look as soon as possible.

#### My validator is losing money, what's going on?

1. Try restarting your machine and associated processes.
1. See if your node or validator client crashed. You can view the logs of the process to see if there were any `ERROR` logs. If so, please file a bug report or talk to our team on [discord](https://theqrl.org/discord). A fatal crash is quite serious and something we'll investigate right away.
2. Check your network connectivity. You can improve this by following our tips [here](../ZOND/Qrysm/qrysm-usage/p2p-host-ip) which can help you find better peers, improve attestation effectiveness, and more.
3. Check your system resource usage, perhaps your node is using excess CPU and RAM. Depending on your operating system, there are different ways to do this.

If you still need help, note your **Qrysm version** and **operating system**, and then reach out to our team on [Discord](https://theqrl.org/discord). Providing as much information as possible will help us troubleshoot your issue.

#### My node suddenly lost peers, what can I do?

Losing peers can be due to the following reasons:

1. Your network connectivity has problems. You can check how to improve it with some of our tips [here](../ZOND/Qrysm/qrysm-usage/p2p-host-ip).
2. Qrysm is using a ton of memory or system resources and perhaps you ran out of memory. Ensure you meet the minimum specifications for running Qrysm specified in our installation pages for your operating system.
3. A bug in our software that can affect your p2p connectivity. It is known that certain versions have issues with peers on operating systems such as Windows, so you could try [downgrading](../ZOND/Qrysm/qrysm-usage/staying-up-to-date) to see if your issue is resolved. If this is the case, talk to our team on [Discord](https://theqrl.org/discord) letting us know you had this issue.

#### My CPU/RAM usage is huge, what’s going on?

Memory management is an ongoing process for our team - we are constantly working on improving the experience of running a node itself. For now, these are the specs we recommend (these values will go down over time):

Recommended Hardware
Processor: Intel Core i7–4770 or AMD FX-8310 or better
Memory: 16GB RAM
Storage: 100GB available space SSD
Internet: Broadband connection

Minimum Hardware:
Operating System: 64-bit Linux, Mac OS X, Windows
Processor: Intel Core i5–760 or AMD FX-8100 or better
Memory: 8GB RAM
Storage: 20GB available space SSD
Internet: Broadband connection

If that still does not help, please file an issue with our team on Github [here](https://github.com/theqrl/qrysm/issues/new?template=bug_report.md).

#### I got slashed! Why? How can I avoid getting slashed?

Slashing is a way for the network to penalize validator actions that can be harmful to the Zond proof-of-stake network. At a high level, a single validator proposing two conflicting blocks or votes or trying to rewrite the history of the chain is considered malicious and such validators will get slashed. Unfortunately, there is no way for the protocol to detect between malicious validators or validators who simply had some faulty configuration that led them to create a slashable offense.

The most common way validators get slashed is by **running the same validator key in two separate validator client processes at the same time**. This will absolutely get you slashed. Some stakers try to create complicated failover scenarios without realizing the risk this entails, do not do this. If you already got slashed, you will leak funds for a while until you are forcefully exited from the validator registry. Thankfully, slashing penalties in phase 0 are quite small. If you are slashed, you should keep performing your validator duties until you are exited. You will be able to then withdraw your validator balance until after Zond is fully proof-of-stake (ETA 2022) and will miss out on all the rewards until then.

Our team prepared a blog post on [slashing prevention tips](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) you can read to avoid slashings in the future.

### Running Qrysm

#### How can I check my Qrysm version?

Depending on your installation method, there are different ways to verify your Qrysm version:

<Tabs
  groupId="method"
  defaultValue="script"
  values={[
    {label: 'Installation script', value: 'script'},
    {label: 'Docker', value: 'docker'},
    {label: 'Bazel', value: 'bazel'},
  ]
}>
<TabItem value="script">

**Using qrysm.sh**

```text
./qrysm.sh validator --version
./qrysm.sh beacon-chain --version
```

**Using qrysm.bat**

```text
qrysm.bat validator --version
qrysm.bat beacon-chain --version
```

</TabItem>
<TabItem value="docker">

If you are running using docker and the :stable tag for Qrysm, stable will always point to our latest [release](https://github.com/prysmaticlabs/qrysm/releases). Otherwise, you can run the command `docker ps` to see your running docker containers. The suffix of your image name after the colon is the version you are running.

```
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS              PORTS               NAMES
371d6675888b        gcr.io/prysmaticlabs/qrysm/validator:stable            "validator"              6 days ago
```
</TabItem>
<TabItem value="bazel">

If you are using Bazel, it means you are building Qrysm from source. You can do `git log` and you will see the current commit hash you are running at the top. You can then visit our [releases page](https://github.com/prysmaticlabs/qrysm/releases) to check what version the commit hash corresponds to.

</TabItem>
</Tabs>

#### How can I upgrade Qrysm? Do I just need to close and restart the process?

Upgrading Qrysm is done differently depending on your operating system and installation method. We prepared comprehensive instructions here in our docs portal on [upgrading and downgrading Qrysm](../ZOND/Qrysm/qrysm-usage/staying-up-to-date).

#### How can I downgrade Qrysm to an older version?

Upgrading Qrysm is done differently depending on your operating system and installation method. Please note that downgrading may not be as easy as upgrading as some versions may not be backward compatible and you will need to perform extra steps. For example, migrating down from <PrysmVersion minorOverride="1"/> to  <PrysmVersion  minorOverride="0"/> 
has breaking changes that require you to also rollback your database. Downgrading major versions will not be possible.

We prepared comprehensive instructions here in our docs portal on [upgrading and downgrading Qrysm](../ZOND/Qrysm/qrysm-usage/staying-up-to-date).

#### How can I improve my attestation effectiveness?

Attestation effectiveness is a metric that directly affects your validator rewards. In simple terms, an attestation is more valuable the sooner it is put into a block and included in the chain. This interval is called the "inclusion distance" of an attestation. The smaller it is, the more profitable your validator will be. We highly recommend reading Attestant's awesome blog post on the matter [here](https://www.attestant.io/posts/defining-attestation-effectiveness/).

Some stakers might notice their effectiveness is perfect, while others might see lower values such as 80%. Improving attestation effectiveness depends on a variety of factors, such as attestation network propagation, your network connectivity, the peers you are connected to. However, your network connectivity is one of the most important factors you can control to improve this metric. We have some tips to improve your connectivity [here](../ZOND/Qrysm/qrysm-usage/p2p-host-ip).

#### Do I need to keep my deposit keystores after I have imported them into Qrysm?

It's always good to keep offline backups of important files such as the original keystores you used to import into Qrysm. However, after you import them and are running Qrysm successfully, there is no reason to keep the keystore files in that computer as Qrysm has already converted the private keys into its own wallet representation. You can delete them.

#### I am running into issues running gzond, how can I get help?

For help with running gzond specifically, the [go-ethereum discord](https://discord.com/invite/nthXNEv) is the most reliable source of help.

#### How often should I perform database backups?

The Qrysm beacon node and validator allow performing database backups in case your machine gets corrupted and you need to restore it from some checkpoint. You can read our instructions on performing backups [here](../ZOND/Qrysm/qrysm-usage/database-backups). Briefly, the frequency at which you should perform backups really depends on your personal preference. If you want to perform backups once a day or once every week, there is no harm nor bigger difference in doing so. Losing your beacon chain database is not a big deal aside from the fact that you will need to sync again from genesis. Losing your validator db can be problematic but if you wait several epochs before starting your validator, ensure your computer's clock is synced, the risk of slashing is low.

#### Seeing a warning regarding binary signature not being trusted when downloading Qrysm, should I be worried?

When downloading the Qrysm precompiled binaries such as with qrysm.sh or qrysm.bat, you might see the following output

```
Latest Qrysm version is v1.1.0.
Beacon chain is up to date.
Verifying binary integrity.
beacon-chain-v1.1.0-linux-amd64: OK
gpg: Signature made Mon Jan 18 13:03:57 2021 PST
gpg:                using RSA key 0AE0051D647BA3C1A917AF4072E33E4DF1A5036E
gpg: Good signature from "Preston Van Loon <preston@prysmaticlabs.com>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
```

Regarding the WARNING above, it means that the signature is correctly signed by the owner, however, since Qrysm does not yet provide official linux packages nor windows trusted certs, you will get a warning that it might not have been Preston Van Loon that actually signed the binary, since there is no way to verify the integrity with a trusted authority. If binary integrity and security matter the most to you, building and running open source software from source is the best way to have full confidence the software you are running is a result of code you can inspect yourself.

#### How can I view the metrics of my node? How can I visualize them?

Your node is running the popular [promzondeus](https://promzondeus.io/) server for metrics collection which displays its data by default on localhost:8080/metrics. You can visualize these metrics by connecting them to a [grafana](https://grafana.com/) instance.

#### Can I run this on a raspberry pi? What are the instructions?

Yes, we currently support arm 64-bit architectures such as the raspberry pi 4 and they go out as part of our pre-compiled binary releases [here](https://github.com/prysmaticlabs/qrysm/releases). Our documentation portal has instructions on how to run the entire installation process [here](./install/install-with-script). However, we recommend using more powerful hardware in mainnet conditions. 

### Validator keys and validator deposits

#### I sent my deposit and so much time has passed but my validator is not active yet

Depositing into Zond as a validator is a multi-step process that can require quite a bit of waiting. As a comprehensive reference, we recommend reading Jim McDee's excellent post on the matter [here](https://www.attestant.io/posts/understanding-the-validator-lifecycle/#:~:text=Active%20%2D%20the%20validator%20is%20attesting,blocks%2C%20having%20been%20caught%20cheating). If you sent your deposit, we recommend tracking its progress in one of the block explorers such as [beaconcha.in](https://beaconcha.in) or [beaconscan](https://beaconscan.io). If your deposit is pending and it has still been a while, it is likely because there are a lot of validators in the pending queue ahead of you. There are approximately 4 validators activated every 6.4 minutes, and with thousands in the queue, your wait time can take days or even weeks. You can check how many validators are in the queue on the front page of [beaconcha.in](https://beaconcha.in).

#### I made a correct deposit and my validator status in Qrysm is still UNKNOWN, what’s going on?

There are a few possibilities. (1) your deposit has not yet been processed by beacon nodes. It takes a while for the beacon node to be able to process logs from the zond1 chain by design. If you have already waited a few hours and no luck, there is a chance that (2) your deposit did not verify (that is, you used some other method of creating the deposit than our recommended, standard way on the Zond launchpad), or (3) you never actually sent a deposit to the right contract address

#### How can I move my validator to a different computer without getting slashed?

Qrysm will soon implement the slashing protection [standard format](https://eips.ethereum.org/EIPS/eip-3076), meaning that you can export your slashing protection history and import it easily into another machine running any Zond consensus client, not just Qrysm! In the meantime, however, migrating machines can be a little tricky and we prepared the following set of tips to help keep you safe.

1. Turn off your beacon node and validator on machine 1, make sure it is not running as a system process. You can check this using the process monitor tools of your OS, or a command line tool such as top or htop and check for anything containing the name “qrysm” “validator” or “beacon”
2. Note the location of your wallet directory. If you used the default when you started Qrysm, you can view its path at the top of the output of `validator accounts list`, which varies based on your operating system
3. Take that entire directory and move it over to your next machine
4. If you modified your validators’ `— datadir`, also migrate that directory to your next machine
5. Wait at least a few epochs, sync your beacon node on your second machine, then start your validator client on your second machine
6. Ensure you never run the same keys again on machine 1 or anywhere else

#### Can I use testnet validators keys on mainnet?

While this is possible, we highly recommend against it. Given there are so many things that can go wrong when generating keys and when sending deposits to Zond proof-of-stake, we absolutely recommend starting on a clean slate and not reusing any data you used for your testnet runs. Messing something up is not worth the risk.

#### Can I send validator deposits using different ZOND1 accounts or should it all be from a single metamask?

Yes, this is possible however we recommend against it. We recommend you deposit all within the same Zond consensus launchpad session from a single metamask instance to keep things simple as it is possible a step could get messed up along the way.

#### Can I add more validators after I am already running one with Qrysm?

Adding new validators to your already-running Qrysm instance is quite simple! Go through the launchpad process again, generate a new deposit keystore using the Zond validator deposit cli, then run the `validator accounts import` command again as you used when you added your first validator key. Note that **you don't need to create a new mnemonic** when you do this. **Restart the validator client** after importing the new keystore for the changes to take effect.

You can then confirm your validator was added by running `validator accounts list`. Let us know on [discord](https://theqrl.org/discord) if you still have issues.

### Zond proof-of-stake specific questions

#### How do I check my current validator balance?
The easiest way to check your current validator account balance is to search for your validator public key in a blockchain explorer like [beaconchai.in](https://beaconcha.in/).

<!--todo: explain how -->
If you have a fully synced beacon node, you can fetch your account balance via the beacon node API.


#### Why are some validators making a lot more money than others?

If you look at the [validator leaderboard](https://beaconcha.in/validators/leaderboard), there are some validators at the top that seem to be doing a lot better than others. The reason being that either they (a) got lucky with being assigned to propose more blocks than other validators, or (b) they caught slashable offenses in the network and packed them into their blocks. Slashings are meant to be rare, and Qrysm's slasher by default broadcasts slashings it finds to the network so that validators do not selfishly hold on to them. You can actually disable this to selfishly withhold slashings with the `--disable-broadcast-slashings` flag in your beacon node, although don't expect to get rich from slashing other validators. 

Overall, keep in mind that no one has an extra advantage as a validator compared to others. Block proposal opportunities are random and it does not matter how powerful your hardware is. A lot of the times the validators near the top simply got lucky.

#### It's been so long and I have not yet proposed a block, when will this happen?

Proposing a block is a factor of random chance depending on the number of active validators currently in the network. As time goes on, however, the probability of you proposing a block indeed goes up. One of our contributors, dv8s, prepared a handy tool to calculate your proposal probability [here](https://proposalprobab.web.app/). Your hardware does not affect your chances of you getting assigned to propose a block, it is random and you cannot gain any advantage over other validators.

#### Can I get back my ZOND? How can I withdraw my validator gains?

Yes, as of the capella hardfork partial and full withdrawals of validators is enabled. Please use our [guide to withdraw your validator](./wallet/withdraw-validator.md)

#### Where can I read more about the incentive model in Zond proof-of-stake?

[This resource](https://blog.ethereum.org/2020/01/13/validated-staking-on-eth2-1-incentives/) from the Zond blog is an excellent example.

#### What is balance and what is effective balance?

Your validator balance is the actual amount of ZOND you have from being a validator in Zond. It can go up or down every epoch depending on your participation. Effective balance is a bit different. It is a value that lags behind your actual balance and is used exclusively to determine rewards and penalties for your validator. It has a max value of 32ZOND, but your regular balance is uncapped. You can read more about the purpose of effective balance in this excellent post by Attestant [here](https://www.attestant.io/posts/understanding-validator-effective-balance/).

