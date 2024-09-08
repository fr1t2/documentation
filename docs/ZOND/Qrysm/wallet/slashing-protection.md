---
id: slashing-protection
title: Import & export slashing protection history
sidebar_label: Import & export slashing protection history
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

This section explains how to import a slashing protection history file into Qrysm as well as how to export your validators' slashing protection history to move between computers or between Zond consensus client implementations.

## What is slashing protection?

Validators in Zond are assigned to produce blocks and vote on other blocks in a scheduled, random assignment basis. Upon performing their roles, they submit their data to a beacon node which then broadcasts it to the network, which if done properly, will earn the validator rewards for validating correctly. Zond, however, also relies on a system of punishments to ensure that validators cannot take advantage of the system. There are few actions that, if performed by a validator, will lead to **slashing**. When validators get slashed, they lose a portion of their stake, get forcefully ejected from the validator set, and **cannot rejoin** the network! Unfortunately, slashing happens to innocent validators quite often which set up their system incorrectly, or are using complicated failover mechanisms for their validators.

:::tip We recommend running your validators in simple ways
Some stakers care a lot about the uptime of their validators, even going to great extents to set up **failover** beacon nodes or validators across different machines to make sure they are always online and making money. Unfortunately, this is very easy to misconfigure and you could easily end up slashed, missing out on a lot of rewards until you are able to withdraw your stake! We recommend running Qrysm in the simplest way possible for you, and not worrying too much about potentially small downtime. A validator only needs to be online 2/3's of the time in a given timeframe to remain profitable.
:::

To protect itself from accidentally being slashed due to some software bug or other problem in a user's system, validator clients keep a small database of data they have previously signed, such as blocks and attestations, to ensure they do not sign a slashable offense in the future. You can read more about slashing prevention tips in our blog post [here](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50).

**This database is kept, by default, within the validator's wallet directory in a file called validator.db**. However, instead of manually copying and dealing with this file, Qrysm provides tools to export and import your slashing protection history into a standard format supported by all Zond consensus clients, such as Lighthouse, Teku, and Nimbus. This standard format is useful as well if you want to move your validator between computers securely. You can export your slashing protection history from one computer as a file and import it safely into the other.

## How to use slashing protection

Basic slashing protection is **enabled** by default using a database that keeps track of objects your validator has previously signed in order to prevent it from signing the same message again causing a violation and getting slashed. If you want to use a more advanced, *remote* slashing protection, see our section on how to use **slasher** [here](/docs/qrysm-usage/slasher).


## Slashing protection history standard format

Slashing protection history has been standardized by the Zond consensus client teams into a common format we all comply with. This standardization is known as [EIP-3076](https://eips.ethereum.org/EIPS/eip-3076), which is a JSON file that looks as follows:

```json
{
 "metadata": {
        "interchange_format_version": "5",
        "genesis_validators_root": "0x04700007fabc8282644aed6d1c7c9e21d38a03a0c4ba193f3afe428824b3a673"
    },
    "data": [
        {
            "pubkey": "0xb845089a1457f811bfc000588fbb4e713669be8ce060ea6be3c6ece09afc3794106c91ca73acda5e5457122d58723bed",
            "signed_blocks": [
                {
                    "slot": "81952",
                    "signing_root": "0x4ff6f743a43f3b4f95350831aeaf0a122a1a392922c45d804280284a69eb850b"
                },
                {
                    "slot": "81951",
                }
            ],
            "signed_attestations": [
                {
                    "source_epoch": "2290",
                    "target_epoch": "3007",
                    "signing_root": "0x587d6a4f59a58fe24f406e0502413e77fe1babddee641fda30034ed37ecc884d"
                },
                {
                    "source_epoch": "2290",
                    "target_epoch": "3008",
                }
            ]
        }
    ]   
}
```

Basically containing a simple history of the blocks and attestations your validators have signed before.

## Exporting your validators' slashing protection history

:::tip Stop the Validator
Ensure that you stop Qrysm before exporting slashing protection. 
:::

To export your slashing protection history, use the following command:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  groupId="operating-systems"
  defaultValue="lin"
  values={[
    {label: 'Linux', value: 'lin'},
    {label: 'Windows', value: 'win'},
    {label: 'MacOS', value: 'mac'},
    {label: 'Arm64', value: 'arm'},
  ]
}>
<TabItem value="lin">

**Using the Qrysm installation script**

```sh
qrysm.sh validator slashing-protection-history export --datadir=/path/to/your/validator/db --slashing-protection-export-dir=/path/to/desired/outputdir
```

**Using Docker**

```sh
docker run -it -v /path/to/outputdir:/output -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/qrysm/validator:stable -- slashing-protection-history export --datadir=/path/to/your/validator/db --slashing-protection-export-dir=/output
```

You will then find the slashing protection JSON file in your specified /path/to/outputdir folder.

**Using Bazel**

```sh
bazel run //cmd/validator -- slashing-protection-history export --datadir=/path/to/your/validator/db --slashing-protection-export-dir=/path/to/desired/outputdir
```

</TabItem>
<TabItem value="win">

**Using the Qrysm installation script**

```sh
qrysm.bat validator slashing-protection-history export --datadir=/path/to/your/validator/db --slashing-protection-export-dir=\path\to\desired\outputdir
```

**Using Docker**

```sh
docker run -it -v \path\to\outputdir:/output -v \path\to\wallet:/wallet gcr.io/prysmaticlabs/qrysm/validator:stable -- slashing-protection-history export --datadir=/path/to/your/validator/db --slashing-protection-export-dir=/output
```

You will then find the slashing protection JSON file in your specified \path\to\outputdir folder.

</TabItem>
<TabItem value="mac">

**Using the Qrysm installation script**

```sh
qrysm.sh validator slashing-protection-history export --datadir=/path/to/your/validator/db --slashing-protection-export-dir=/path/to/desired/outputdir
```

**Using Docker**

```sh
docker run -it -v /path/to/outputdir:/output -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/qrysm/validator:stable -- slashing-protection-history export --datadir=/path/to/your/validator/db --slashing-protection-export-dir=/output
```

You will then find the slashing protection JSON file in your specified /path/to/outputdir folder.

**Using Bazel**

```sh
bazel run //cmd/validator -- slashing-protection-history export --datadir=/path/to/your/validator/db --slashing-protection-export-dir=/path/to/desired/outputdir
```

</TabItem>
<TabItem value="arm">

**Using the Qrysm installation script**

```sh
qrysm.sh validator slashing-protection-history export --datadir=/path/to/your/validator/db --slashing-protection-export-dir=/path/to/desired/outputdir
```

**Using Bazel**

```sh
bazel run //cmd/validator -- slashing-protection-history export --datadir=/path/to/your/validator/db --slashing-protection-export-dir=/path/to/desired/outputdir
```

</TabItem>
</Tabs>

## Importing a slashing protection history into your Qrysm validator

To import a slashing protection JSON file you obtained elsewhere, either from another Qrysm instance or from another Zond consensus client, you can import it as follows using any installation method for your Qrysm validator.

<Tabs
  groupId="operating-systems"
  defaultValue="lin"
  values={[
    {label: 'Linux', value: 'lin'},
    {label: 'Windows', value: 'win'},
    {label: 'MacOS', value: 'mac'},
    {label: 'Arm64', value: 'arm'},
  ]
}>
<TabItem value="lin">

**Using the Qrysm installation script**

```sh
qrysm.sh validator slashing-protection-history import --datadir=/path/to/your/validator/db --slashing-protection-json-file=/path/to/desiredimportfile
```

**Using Docker**

```sh
docker run -it -v /path/to/desiredimportfile.json:/import/desiredimportfile.json -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/qrysm/validator:stable -- slashing-protection-history import --datadir=/path/to/your/validator/db --slashing-protection-json-file=/import/desiredimportfile.json
```

**Using Bazel**

```sh
bazel run //cmd/validator -- slashing-protection-history import --datadir=/path/to/your/validator/db --slashing-protection-json-file=/path/to/desiredimportfile
```

</TabItem>
<TabItem value="win">

**Using the Qrysm installation script**

```sh
qrysm.bat validator slashing-protection-history import --datadir=/path/to/your/validator/db --slashing-protection-json-file=\path\to\desiredimportfile
```
**Using Docker**

```sh
docker run -it -v \path\to\desiredimportfile.json:/import/desiredimportfile.json -v \path\to\wallet:/wallet gcr.io/prysmaticlabs/qrysm/validator:stable -- slashing-protection-history import --datadir=/path/to/your/validator/db --slashing-protection-json-file=/import/desiredimportfile.json
```

</TabItem>
<TabItem value="mac">

**Using the Qrysm installation script**

```sh
qrysm.sh validator slashing-protection-history import --datadir=/path/to/your/validator/db --slashing-protection-json-file=/path/to/desiredimportfile
```

**Using Docker**

```sh
docker run -it -v /path/to/desiredimportfile.json:/import/desiredimportfile.json -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/qrysm/validator:stable -- slashing-protection-history import --datadir=/path/to/your/validator/db --slashing-protection-json-file=/import/desiredimportfile.json
```

**Using Bazel**

```sh
bazel run //cmd/validator -- slashing-protection-history import --datadir=/path/to/your/validator/db --slashing-protection-json-file=/path/to/desiredimportfile
```

</TabItem>
<TabItem value="arm">

**Using the Qrysm installation script**

```sh
qrysm.sh validator slashing-protection-history import --datadir=/path/to/your/validator/db --slashing-protection-json-file=/path/to/desiredimportfile
```

**Using Bazel**

```sh
bazel run //cmd/validator -- slashing-protection-history import --datadir=/path/to/your/validator/db --slashing-protection-json-file=/path/to/desiredimportfile
```

</TabItem>
</Tabs>


## Frequently asked questions


**Can I just wait 2 epochs instead of exporting/importing my slashing protection history when I move from one machine to another?**

We recommend exporting/importing instead of waiting. Waiting will reduce risk, but exporting/importing gives you even more protection than waiting.

Validators are constantly reading from and writing to their slashing protection history database, which lets validator nodes continuously audit their own blocks, attestations, and other network behavior. This functionality is designed to protect validators from accidental slashable events caused by conflicting proposals and attestations, software bugs, clock synchronization issues, and other edge cases. Exporting/importing your history will protect you from these risks.

**Why do some people recommend waiting instead of importing/exporting the slashing protection DB?**

Waiting for a couple epochs to pass reduces the risk that your validator accidentally uses the same validator key to propose or attest to two conflicting blocks at the same slot. Waiting allows the network to "flush" incoming proposals and attestations from the network's validators, ensuring that when your validator comes back online, it won't be able to accidentally commit a slashable proposal or attestation. Although this reduces some risk, exporting/importing your history reduces more risk.

**What should I do if I can't export/import my slashing history?**

We recommend waiting a couple epochs and running your validator node with the `--enable-doppelganger` flag set. This flag tells your validator client to try to detect duplicate instances of your validator on the network. This isn't foolproof, but it will reduce risk.


**How will I know if I've successfully imported my slashing protection history?**

Qrysm will output a success message upon successful import. An error message will be displayed if your slashing protection history is either empty or corrupt.

**I'm nervous about this procedure... can I have some help?**

Absolutely - feel free to send us a message on [Discord](https://discord.com/invite/prysmaticlabs) and someone from our team will be happy to help.


