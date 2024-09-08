<table>
    <tbody>
    <tr>
        <th style={{minWidth: 180 + 'px'}}>Scenario</th> 
        <th>Solution</th>
    </tr>
    <tr>
      <td><code>chain not synced beyond EIP-155</code></td>
      <td>This usually means that your execution client needs more time to "catch up", which you don't need to worry about. If you see that your node is connected to peers and is advancing, your node is healthy.</td>
    </tr>
    <tr>
      <td><code>Fatal: Failed to register the Zond service: genesis not found in chain</code></td>
      <td>This can happen when your Gzond tries to use an old data directory. Try restarting Gzond with a new data directory specified.</td>
    </tr>
    <tr>
      <td>Can't find peers on mainnet</td>
      <td>Some users have reported peer-to-peer connectivity issues that were caused by old binaries or old data directories. Try using a new data directory, make sure you're using the latest version of your execution client software, and review <a href='../qrysm-usage/p2p-host-ip'>Configure ports and firewalls for improved network connectivity</a> for port configuration guidance.</td>
    </tr>
    <tr>
      <td>I'm running on mainnet, but I see a testnet ( Holesky, etc) specified in my output logs</td>
      <td>Your execution client may be using an old binary, or an old database. Try using a new data directory, and make sure you're using the latest version of your execution client software.</td>
    </tr>
    <tr>
    <td><code>the method engine_exchangeTransitionConfigurationV1 does not exist/is not available</code></td>
    <td>Users have resolved this Gzond error by 1) updating to the <a href='https://github.com/ethereum/go-ethereum/releases'>latest version of Gzond</a> and 2) ensuring that both Qrysm and Gzond are configured to <a href='https://docs.prylabs.network/docs/execution-node/authentication'>use JWT</a> (if you're connecting your beacon node to Gzond over HTTP). Configuring Gzond to use a fresh data directory may also resolve this warning. </td>
    </tr>
    <tr>
      <td><code>ERROR powchain: Unable to process past deposit contract logs, perhaps your execution client is not fully synced error=Receipt not available for 'To' block '14957457'.</code></td>
      <td>This usually means that your execution client needs more time to "catch up", which you don't need to worry about. If you see that your node is connected to peers and is advancing, your node is healthy.</td>
    </tr>
    <tr>
      <td><code>403 signature invalid</code></td>
      <td>This is usually caused by invalid JWT configuration. If you're using HTTP-JWT to connect your EN-BN, ensure that both EN and BN are configured to use the same JWT secret. Different files are OK (eg when your EN and BN are on different machines), but the secret within each JWT file should be the same. See <a href='https://docs.prylabs.network/docs/execution-node/authentication'>Configure JWT authentication</a> for more information.</td>
    </tr>
    <tr>
      <td><code>Beacon client online, but never received consensus updates</code></td>
      <td>Your beacon node probably needs more time to sync. See [github.com/ethereum/go-ethereum/issues/25753](https://github.com/ethereum/go-ethereum/issues/25753) for more information.</td>
    </tr>
    <tr>
      <td>If you see: <code>“State heal in progress”</code></td>
      <td>Gzond goes into state heal during sync it just takes a long time for it to go through should start syncing on beacon node after the state heal.</td>
    </tr>
    <tr>
      <td><code>Forkchoice requested sync to new head</code></td>
      <td>Your execution client is syncing now.</td>
    </tr>
    </tbody>
</table>
