---
id: builder
title: Configure MEV Builder
sidebar_label: Configure MEV Builder
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import BuilderPng from '../assets/img/builder.png';

:::caution

This guide is for advanced Qrysm users to configure their client for the purposes of extracting [MEV](https://ethereum.org/en/developers/docs/mev/). 
There are risks to using a builder which may result in missed rewards, missed proposals, censored transactions or omitted transactions. The Qrysm team does not provide guidance on which builders/relays are recommended but lists are available for you to make a judgment based on your own values. 

:::

## Learn about the Builder Lifecycle

<details>
  <summary>Builder lifecycle</summary>
  <div>
    <ol>
      <li> 
        Sign a validator registration request: This request contains validator <strong>proposer_settings</strong> with fields like <strong>fee_recipient</strong>, <strong>gas_limit</strong> and the current timestamp to be signed.
      </li>
      <li> 
       Submit signed validator registrations to the builder: call the  <a
              href="https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Validator/registerValidator"
              target="_blank"
              rel="noreferrer noopener">
              beacon api endpoint
            </a> which calls a <a
              href="https://ethereum.github.io/builder-specs/#/Builder/registerValidator"
              target="_blank"
              rel="noreferrer noopener">
              builder api endpoint
            </a> on the builder for the registration. Some relays will allow you to query which validators are registered currently.
      </li>
      <li> 
       Validator selected as a block proposer: extracting MEV will only be applicable when your validator has its turn to propose a block. 
      </li>
      <li> 
        Check if the builder is configured: The beacon node does a check to see if the builder is properly configured and the proposing validator is registered. You will not be able to retrieve a blinded block if you do not pass the builder configuration check.
      </li>
      <li> 
        Get and verify a blinded block: If the builder is configured, the beacon node will call the <a
              href="https://ethereum.github.io/builder-specs/#/Builder/getHeader"
              target="_blank"
              rel="noreferrer noopener">
              builder API
            </a> to get a payload header which is used to produce the blinded block. There are several steps of verification in this process.
      </li>
      <li> 
        Sign the blinded block: once the blinded block passes internal validation it is signed. At this point, the validator will no longer have the power to propose a block other than the builder's block or risk being slashed as the builder holds the validator's signature. 
      </li>
      <li> 
        Submit the blinded block to the builder to get the full execution payload: the signed blinded block is returned to the builder via the <a
              href="https://ethereum.github.io/builder-specs/#/Builder/submitBlindedBlock"
              target="_blank"
              rel="noreferrer noopener">
              builder API
            </a> for the full payload. When the builder gets the signed blinded block, it broadcasts the signed un-blinded block to the network, <strong>then</strong> it sends back the signed unblinded block to the proposer.
      </li>
      <li> 
        Unblind the block with the full payload: using the response of the builder, the blinded block can be converted into a full block with the full execution payload.
      </li>
      <li> 
        Broadcast the full block: the full block at this point is broadcasted to the network.
      </li>
    </ol>
    <p>
    In case of failures in the validator, such as bad connections or incorrect configurations, the beacon node will attempt to fall back to local execution, reconnecting to a regular execution client to ensure proper block processing.
    </p>
  </div>
</details>



## Builder configuration

<img style={{maxWidth: 846 + 'px'}} src={BuilderPng} /> 

<Tabs
  groupId="configure-builder"
  defaultValue="add"
  values={[{label: 'Add Builder', value: 'add'},{label: 'Remove Builder', value: 'remove'}]}>
<TabItem value="add">

## 1. Validator Client: register validator

To `register` the validator against the builder and enable the use of custom builders, the `proposer-settings` will need to be configured.

It is **recommended** to configure with the validator client with the `--suggested-fee-recipient` and `--enable-builder` flags. All validators will be registered periodically by using the `--enable-builder` flag.
**note:**  `--proposer-settings-file` or `--proposer-settings-url` flags with builder settings will override values provided from `--suggested-fee-recipient` and `--enable-builder`flags.


## 2. Beacon Node: connect to the builder

To use a builder the beacon node needs to start with the following configuration:

- `--http-mev-relay` flag pointed to any [Builder API](https://ethereum.github.io/builder-specs/) compatible endpoint. The most common use case is to target a [MEV-Boost](https://boost.flashbots.net/) instance. A less common use case is to directly target a relay (5. Builder: connected via relay URL).

Each relay's URL will correspond to a specific network and will need to be chosen accordingly, i.e. running a beacon node on mainnet will require the mainnet relay.


## 3. Is builder configured?

When a validator is proposing a block, the following is checked before attempting to use the builder through the relay:
- `--http-mev-relay` flag was provided and is pointed to MEV-Boost or an active relay of the correct network
- circuit breaker is not triggered 
- validator is registered (beacon API was successfully called and validator registration info is stored in the beacon node's db)

If all checks are satisfied, then 5. Builder: connected via relay URL will be used to get the execution payload (which contains the transactions) and build a blinded block. However, if the checks do not pass, then the beacon node will fall back to 4. Local Execution Client.

## 4. Local execution client: kept in sync and up to date

Local execution clients such as Gzond or Nzondermind must continue to run as usual even while using a builder and will be used in case the builder does not pass the `Is Builder Configured?` check. The execution client should be synced and running alongside your beacon node, and earnings from the block will be compared to the earnings from the builder's payload. If the local execution payload fails then the entire function will fail.

## 5. Builder: connected via relay URL

The ZONDStaker community provides a list of some of the relays that can be used as well as any censorship they may have [here](https://github.com/zond-educators/zondstaker-guides/blob/main/MEV-relay-list.md). You can also run your own relay locally such as MEV-Boost but each relay on the list will have their own instructions on how to run it. If running your own relay, instead of using a provided URL due to latency, you will simply need to update the `--http-mev-relay` flag on your beacon node with the appropriate URL for the specific network in use. The relay will connect to a builder which connects to block searchers. 

:::info

Make sure you are using the correct version that supports the current version of the beacon node. Hard-forks will typically require updates to relays.

:::

</TabItem>
<TabItem value="remove">

## 1. Validator Client: unregister validator

Update the following configurations and restart the validator client to stop the periodic registration of the validator. 
- remove the `--enable-builder` flag.
- remove the `--suggested-gas-limit` flag, though it should already be disabled once removing the `--enable-builder` flag.
- remove all wanted references of the `builder` field from the associated file/json for the validators you no longer want to register within the `--proposer-settings-file` and `--proposer-settings-url` flag.

## 2. Beacon Node: remove builder related flags

The following flag should be removed to disable builder use on the beacon node:
 - `--http-mev-relay` flag

:::info

The [register validator Beacon API](https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Validator/registerValidator) will also stop working with the removal of the `--http-mev-relay` flag and will no longer know the URL to MEV-Boost or the active relay.

:::

The following flags will be disabled after this flag is removed, and can safely be removed:
 - `--max-builder-consecutive-missed-slots`
 - `--max-builder-epoch-missed-slots`
 - `--local-block-value-boost`

## 3. Is builder configured?

Once the appropriate flags are fully removed this check shouldn't pass and will fall back to local execution.

## 4. Local execution client: kept the same

The execution client can safely continue to run "as-is" with no changes. Once the validator client and beacon node have their settings updated and restarted without builder changes, blocks will continue to be produced through with the payloads from local execution.

## 5. Builder: remove relay URL

removing the `--http-mev-relay` flag from the beacon node will disconnect the builder. Once removed, you can safely turn off your builder related services such as your MEV-Boost or relays.

</TabItem>
</Tabs>


## Advanced Validator Client Configurations

### Advanced Validator Registration
There are other ways to configure your validator registrations for more granular control on which validator keys should be registered to use the custom builder and which ones should use local execution.
In these cases you would replace the `--suggested-fee-recipient` flag with  `--proposer-settings-file` flag or `--proposer-settings-url` flag.
- if configuring with the `--proposer-settings-file` flag and provide it with a suitable JSON or YAML file. This file should include the necessary configuration for the builder. For detailed guidance and an example of this configuration, refer to the [MEV Builder and Gas Limit configuration guide](../execution-node/fee-recipient.md#advanced-configure-mev-builder-and-gas-limit).
 - if configuring with the `--proposer-settings-url` flag provide a url that returns the JSON response with the suitable proposer-settings. A guide and example on this configuration can be found [here](../execution-node/fee-recipient.md#advanced-configure-mev-builder-and-gas-limit).
 - if configuring with the `--proposer-settings-file` or `--proposer-settings-url` flag with no builder settings but providing the `--enable-builder` flag instead. Optionally, you can also add the `--suggested-gas-limit` to adjust the default gas limit for the builder, this only applies with `--enable-builder`.
 
:::info

Validators updated through the [Keymanager-API's](../how-qrysm-works/keymanager-api.md) fee recipient APIs will take on the default `proposer-settings` provided.

If the `--enable-builder` flag is used without providing `--suggested-fee-recipient`, `--proposer-settings-file`, or `--proposer-settings-url` it will override builder settings from the db if proposer settings are saved, or it will set default builder settings and only save to the db if fee-recipient settings are saved through the keymanager APIs.

The validator client utilizes `proposer-settings` to interact with the beacon node's [Beacon API](https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Validator/registerValidator). Subsequently, the beacon node calls the builder by making use of the [Builder API](https://ethereum.github.io/builder-specs/#/Builder/registerValidator).

Registration against the builder will only occur for active validators. Registration for eligible validators occurs at the beginning of the validator clients execution and at the middle of each epoch. It is important to note that the success of the API is not guaranteed, and the client will attempt registration again at the middle of each epoch.

The beacon node must also be configured to enable the builder via the `--http-mev-relay` flag.

:::

## Advanced Beacon Node Configurations

### Circuit breaker

The circuit breaker is a safety feature for falling back to local execution when using a builder.
This occurs when the builder or client using the builder endpoints encounters issues that cause missed blocks. 
By default, the circuit breaker will be triggered after 3 slots are consecutively missed or 5 slots are missed in an epoch, but this can be configured through the `--max-builder-consecutive-missed-slots` and `max-builder-epoch-missed-slots` flags.

### Registration cache

Validator registrations for Builder APIs are stored in a cache by default as of `4.0.7` instead of bolt db when starting the beacon node. The cache will enable:
  - in-memory storage of the validator registrations, this clears all validator registrations on restart.
This feature solves the unintended issue of wanting some validators unregistered while maintaining MEV-Boost on others. In the future the db used to store registrations will be removed completely and the flag will no longer be required for this feature. Validator settings will be persisted on the validator client side.

`--disable-registration-cache` flag can be used on the beacon node to fall back onto the using the bolt db. **note:** values stored in the bolt db will not be cleared and you will not be able to unregister validators unless using the cache and restarting.

### Parallel execution

By default the beacon node will construct the consensus and execution portions of the beacon block in parallel to improve speed and efficiency. `--disable-build-block-parallel` flag can be added to prevent node from building in parallel and will build sequentially. 

### Prioritizing local blocks

`--local-block-value-boost` flag is a `uint64` value that provides an additional percentage to multiply the local block value. Use builder block if: `builder_bid_value * 100 > local_block_value * (local-block-value-boost + 100)`. This will encourage your setup to use the local execution if the value earned is not above your threshold, helping to mitigate censorship concerns.


## Frequently asked questions

The provided guide offered explanations on configuring the Qrysm client to utilize a [custom builder](https://docs.flashbots.net/flashbots-mev-boost/block-builders) through a [relay](https://docs.flashbots.net/flashbots-mev-boost/relay). The relay acts as a middleware that connects validators to block builders. This configuration involves both the validator client and the beacon node. It's important to note this guide does not cover setting up your own relay, builder, or MEV-Boost software. 

:::info
In the Qrysm client, the builder is used through the relay to get transactions that maximize the validator's benefits, prioritizing them over local ones. However, the execution client will still be necessary as a fallback option in case any issues arise while utilizing the builder. The builder will only come into play when there is a validator proposal.
:::

**Q:** What are the risks of running Qrysm with a custom builder instead of using local execution?

**A:** The custom builder, whzonder connected through MEV-Boost or as a relay URL, will need to be updated consistently with Qrysm, adding another layer of complexity. Depending on the relay used some rewards may be missed due to the relay's connectivity or any builder bugs. Transactions may be censored under certain conditions.

**Q:** Do I need to run my execution client while using a custom builder?

**A:** Yes, the execution client will perform standard tasks and also be the fallback mechanism if the builder is not working correctly. 

**Q:** How do I recover if the circuit breaker is triggered?

**A:** Once the circuit breaker is triggered, local execution will continue to be used until both conditions: max consecutive slots missed and slots missed in epoch are no longer true. The beacon node does not need to be restarted.

**Q:** What happens if the execution client goes down while connected to the builder?

**A:** The earnings from the local execution payload will be compared to the bid from the builder payload and will error if local execution is offline or unavailable. 

**Q:** My setup is no longer using the builder. What happened?

**A:** There are multiple reasons why this could happen, including an incorrect relay URL, a relay that is offline or outdated compared to your Zond node setup, or a possible bug. Additionally, it's possible that the circuit breaker has been activated.

**Q:** What if the earnings from the builder are lower than from local execution?

**A:** The block from local execution will be used. This could also be triggered through `--local-block-value-boost` if the earnings from the builder don't pass some percentage threshold.