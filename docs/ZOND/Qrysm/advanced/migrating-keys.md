---
id: migrating-keys
title: Move to a new machine
sidebar_label: Move to a new machine
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

This document provides guidance on migrating Qrysm and your validator keys from one host system to another while minimizing the risk of slashing.  

:::danger Slashing Prevention

The following best practices will help minimize the risk of [slashing](../concepts/slashing.md) while migrating between machines:

1.	Never run more than a single validator process with the same keys loaded.
2.  Delete your keys from the old machine before starting your new machine.
3.	Maintain and utilize slashing protection.
4.	Accept some downtime as part of a successful migration. We recommend waiting at least 2 epochs (roughly 13 minutes) between "old machine off" and "new machine on".

:::

## Migration Process

The migration process is straightforward and not too dissimilar to backing up and restoring important data.  

### Step 1: Export slashing protection history

:::tip Stop the Validator
Exporting the slashing protection database is a real-time process and can be undertaken at any time. During migration, you should run the export once you have stopped the validator you are migrating away from. This ensures all validator actions are captured and subsequently imported into the new validator process.  
:::

To export your slashing protection history, use Qrysm's built in commands which will work with any installation method.

:::info

In the below commands `datadir` should point to the directory containing your `validator.db` file. For example: `/direct/validator.db`.

:::


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
./qrysm.sh validator slashing-protection-history export --datadir=/path/to/validatorDb --slashing-protection-export-dir=/path/to/desired/outputdir
```

**Using Docker**

```sh
docker run -it -v /path/to/outputdir:/output -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/qrysm/validator:stable -- slashing-protection-history export --datadir=/path/to/validatorDb --slashing-protection-export-dir=/output
```

**Using Bazel**

```sh
bazel run //cmd/validator -- slashing-protection-history export --datadir=/path/to/validatorDb --slashing-protection-export-dir=/path/to/desired/outputdir
```

The first time you run the process you will be asked to accept or decline the terms and conditions. Once accepted, the process exports the slashing protection JSON file in your specified `/path/to/outputdir` folder.

</TabItem>
<TabItem value="win">

**Using the Qrysm installation script**

```sh
qrysm.bat validator slashing-protection-history export --datadir=\path\to\validatorDb --slashing-protection-export-dir=\path\to\desired\outputdir
```


**Using Docker**

```sh
docker run -it -v \path\to\outputdir:/output -v \path\to\wallet:/wallet gcr.io/prysmaticlabs/qrysm/validator:stable --slashing-protection-history export --datadir=/path/to/validatorDb --slashing-protection-export-dir=/output
```

Note that `datadir` should point to the directory containing your `validator.db` file. For example: `/direct/validator.db`.

The first time you run the process you will be asked to accept or decline the terms and conditions. Once accepted, the process exports the slashing protection JSON file in your specified /path/to/outputdir folder.

</TabItem>
<TabItem value="mac">

**Using the Qrysm installation script**

```sh
./qrysm.sh validator slashing-protection-history export --datadir=/path/to/validatorDb --slashing-protection-export-dir=/path/to/desired/outputdir
```

**Using Docker**

```sh
docker run -it -v /path/to/outputdir:/output -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/qrysm/validator:stable -- slashing-protection-history export --datadir=/path/to/validatorDb --slashing-protection-export-dir=/output
```

**Using Bazel**

```sh
bazel run //cmd/validator -- slashing-protection-history export --datadir=/path/to/validatorDb --slashing-protection-export-dir=/path/to/desired/outputdir
```

The first time you run the process you will be asked to accept or decline the terms and conditions. Once accepted, the process exports the slashing protection JSON file in your specified /path/to/outputdir folder.

</TabItem>
<TabItem value="arm">

**Using the Qrysm installation script**

```sh
./qrysm.sh validator slashing-protection-history export --datadir=\path\to\validatorDb --slashing-protection-export-dir=\path\to\desired\outputdir
```

**Using Bazel**

```sh
bazel run //cmd/validator -- slashing-protection-history export --datadir=/path/to/validatorDb --slashing-protection-export-dir=/path/to/desired/outputdir
```

The first time you run the process you will be asked to accept or decline the terms and conditions. Once accepted, the process exports the slashing protection JSON file in your specified /path/to/outputdir folder.

</TabItem>
</Tabs>



### Step 2:  Verify and Backup Validator accounts

An important aspect of managing Validator accounts is ensuring you know which account(s) you are working with. This enables you to verify the account(s) loaded in the validator prior to starting or taking any other action using the validator process, and can help reduce the risk of running the same account on more than one validator instance. 


:::tip Wallet Password needed 
You will need the password to the validator wallet in order to undertake Delete, List, Backup or Import actions.   
:::

#### Identify Accounts 
To Identify the account(s) loaded in your validator, issue the following command:

**Using Linux/MacOS based systems**

```sh
./qrysm.sh validator accounts list
```

**Using Windows based systems**

```sh
qrysm.bat validator accounts list
```
This will produce output in the format of account number, three words separated by a hyphen (-) and the public keys of each account. The output will be similar to this: 

```sh
Account 0 | three-random-words
[validating public key] 0xabcd1234...........
Account 1 | words-three-random
[validating public key] 0xdcba4321...........
```

We recommend that you keep an accurate and up-to-date record of the name (three word and public key combinations) of your account(s) for management and verification purposes.
 
 #### Backup
 
You can backup validator accounts from your wallet using the following command:

**Using Linux/MacOS based systems**

```sh
./qrysm.sh validator accounts backup
```

**Using Windows based systems**

```sh
qrysm.bat validator accounts backup
```
You will now be prompted for the wallet password. Once entered, you will be guided through the backup process where you will able to select individual or all accounts to backup and the location where the backup file is created. You will also be prompted for a **"password"** for the backup file, **it is important to keep a note of this for use during the import process**. 

You can also run the accounts backup command non-interactively by using the following command line flags, which are also viewable by appending --help to the command line listed above:


**Flag Usage**

| Flag                     | Usage                                                                                                  |
| ------------------------ | :----------------------------------------------------------------------------------------------------- |
| `--wallet-dir`           | Path to a wallet directory (default: "$HOME/Eth2Validators/qrysm-wallet-v2")                           |
| `--wallet-password-file` | Path to a plain-text, .txt file containing your wallet's password.                                     |
| `--backup-dir`           | Path to a directory where accounts will be backed up into a zip file. (default: $HOME/Eth2Validators/) |
| `--backup-public-keys`   | Comma-separated list of public key hex strings to specify which validator accounts to backup.          |
| `--backup-password-file` | Path to a plain-text, .txt file containing the desired password for your backed up accounts.           |


### Step 3:  Importing Validator accounts

Expand (unzip) the backup file created above. The file will contain one JSON file for each account in the validator. Once the JSON files have been created, import them using the following command:

**Using Linux/MacOS based systems**

```sh
./qrysm.sh validator accounts import --keys-dir=/path/to/keystore-file.json
```

**Using Windows based systems**

```sh
qrysm.bat validator accounts import --keys-dir=\path\to\keystore-file.json
```

This will import all files that are valid EIP-2335 keystores, such as those generated by the backup process above or the official Zond deposit launchpad's command-line tool. 

The files you are importing must have the prefix "keystore-" using the defaults in backup will typically create a zip file containing the sequential keystores for the validators. If you have 1 validator account the zip file will typically contain the file keystore-0.json. If you have 3 validator accounts the keystore will typically contain keystore-0.json, keystore-1.json and keystore-2.json.  

### Step 4: Importing slashing protection history

To import a slashing protection JSON file (all Zond consensus clients use the same format defined in EIP-3076) use the appropriate installation method for your Qrysm validator.

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
./qrysm.sh validator slashing-protection-history import --datadir=/path/to/validatorDb --slashing-protection-json-file=/path/to/desiredimportfile
```

**Using Docker**

```sh
docker run -it -v /path/to/desiredimportfile.json:/import/desiredimportfile.json -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/qrysm/validator:stable -- slashing-protection-history import --datadir=/path/to/validatorDb --slashing-protection-json-file=/import/desiredimportfile.json
```

**Using Bazel**

```sh
bazel run //cmd/validator -- slashing-protection-history import --datadir=/path/to/validatorDb --slashing-protection-json-file=/path/to/desiredimportfile
```

</TabItem>
<TabItem value="win">

**Using the Qrysm installation script**

```sh
qrysm.bat validator slashing-protection-history import --datadir=\path\to\validatorDb --slashing-protection-json-file=\path\to\desiredimportfile
```
**Using Docker**

```sh
docker run -it -v \path\to\desiredimportfile.json:/import/desiredimportfile.json -v \path\to\wallet:/wallet gcr.io/prysmaticlabs/qrysm/validator:stable -- slashing-protection-history import --datadir=/path/to/validatorDb --slashing-protection-json-file=/import/desiredimportfile.json
```

</TabItem>
<TabItem value="mac">

**Using the Qrysm installation script**

```sh
./qrysm.sh validator slashing-protection-history import --datadir=/path/to/validatorDb --slashing-protection-json-file=/path/to/desiredimportfile
```

**Using Docker**

```sh
docker run -it -v /path/to/desiredimportfile.json:/import/desiredimportfile.json -v /path/to/wallet:/wallet gcr.io/prysmaticlabs/qrysm/validator:stable -- slashing-protection-history import --datadir=/wallet --slashing-protection-json-file=/import/desiredimportfile.json
```

**Using Bazel**

```sh
bazel run //cmd/validator -- slashing-protection-history import --datadir=/path/to/validatorDb --slashing-protection-json-file=/path/to/desiredimportfile
```

</TabItem>
<TabItem value="arm">

**Using the Qrysm installation script**

```sh
./qrysm.sh validator slashing-protection-history import --datadir=/path/to/validatorDb --slashing-protection-json-file=/path/to/desiredimportfile
```

**Using Bazel**

```sh
bazel run //cmd/validator -- slashing-protection-history import --datadir=/path/to/validatorDb --slashing-protection-json-file=/path/to/desiredimportfile
```

</TabItem>
</Tabs>


### Step 5:  Verification and restarting the validator client

It is highly recommended that the validator process on the original, migrated validator is stopped and disabled to ensure it is not restarted automatically or accidentally. 

On the original system, with the validator process stopped, remove the account(s) using the process below: 

**Using Linux/MacOS based systems**

```sh
./qrysm.sh validator accounts delete 
```

**Using Windows based systems**

```sh
qrysm.bat validator accounts delete
```
This will produce output in the same format as the list function, three words identifying the account separated by a hyphen (-) and the public keys of each account, the output will be similar to this: 

```sh
Use the arrow keys to navigate 
Select the account(s) you would like to delete
    Done Selecting
    All Accounts
    0 | three-random-words | 0xabcd1234...........
    1 | words-three-random | 0xdcba4321...........
```
Using the arrow keys (up-down-left-right) navigate to the Validator(s) that has been migrated and that you want to delete and select it.  

Once complete, verify the account removal using the validator accounts list command outlined above in [Identify Accounts](#identify-accounts). 

**When removal of the account has been confirmed, the new, migrated validator process can be started.**  


## Frequently asked questions

**When I migrate my slashing protection history from Machine A -> Machine B, or Client A -> Client B, do I need to retain A's slashing protection history after importing to B?**

No. After successfully importing your slashing protection history from A -> B, you can discard A. If you need to migrate from B -> C, B's slashing protection history is all you need to export/import.


