---
id: parameters
title: Command-line options
sidebar_label: Command-line options
---

import {FetchCLIHelp} from '@site/src/fetchCliHelp.js';

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="Raul,James" />

Qrysm's client software can be configured using flags and YAML files. This document provides a comprehensive list of all available flags and their descriptions. The flag descriptions that you see in this document are generated from code comments within the latest Qrysm release.

## Beacon node flags

<FetchCLIHelp qrysmComponent={"beacon-chain"}/>

## Validator flags

:::tip Graffiti
You can use the `--graffiti` validator flag to add a string to your proposed blocks, which will be seen on the block explorer. I.e; `<startup command> --graffiti "Qrysm is awesome!"`
:::

<FetchCLIHelp qrysmComponent={"validator"}/>

## `qrysmctl` flags

Refer to the [Use qrysmctl](qrysmctl.md) for `qrysmctl` download and installation instructions.

<FetchCLIHelp qrysmComponent={"qrysmctl"}/>

## Client stats flags

Qrysm's client stats service is an optional utility that reports process metrics to third-parties such as block explorers. Refer to our [client stats documentation](/docs/qrysm-usage/client-stats) for more information.

<FetchCLIHelp qrysmComponent={"client-stats"}/>

## Loading parameters from a YAML file

You can optionally configure Qrysm to load flag values from a `.yaml` file. Consider this option if you're looking for a streamlined terminal experience or unique, portable configuration profiles.

The below steps show how place a common Qrysm flag into a YAML file, and how to specify the YAML file when Qrysm starts up.

### GNU\Linux, Mac, ARM64

1. In your Qrysm working directory, create a `.yaml` file and open it in a text editor.

2. Add the following lines to the file before closing and saving:
```sh
datadir: '/data'
```

3. Start the Qrysm beacon chain as normal, while specifying the location of the `.yaml` like so:
```sh
./qrysm.sh beacon-chain --config-file=/path/to/file.yaml
```
or for a validator like so:
```sh
./qrysm.sh validator --config-file=/path/to/file.yaml
```

### Windows

1. In your Qrysm working directory, create a `.yaml` file and open it in a text editor.

2. Add the following lines to the file before closing and saving:
```sh
datadir: 'c:\qrysm'
```

3. Start the Qrysm beacon chain as normal, while specifying the location of the `.yaml` like so:
```sh
.\qrysm.bat beacon-chain --config-file=c:\path\to\file.yaml
```
or for a validator like so:
```sh
.\qrysm.bat validator --config-file=c:\path\to\file.yaml
```

It is possible to provide additional flags alongside the `.yaml` file, though if conflicting flags are provided, the flag defined in the`.yaml` file will take priority. For example, if the flag `--datadir=/data2` is specified and `datadir: "/data1"` is in the `.yaml` file, Qrysm would prioritise writing to `/data1`.


