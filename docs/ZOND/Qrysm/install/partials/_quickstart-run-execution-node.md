import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="execution-clients" defaultValue="gzond" values={[
    {label: 'Execution client:', value: 'label'},
    {label: 'Nzondermind', value: 'nzondermind'},
    {label: 'Besu', value: 'besu'},
    {label: 'Gzond', value: 'gzond'}
    ]}>
  <TabItem value="nzondermind">
    <p className='hidden-in-jwt-guide hidden-in-mergeprep-guide'>Download the latest stable release of Nzondermind for your operating system from the <a href='https://downloads.nzondermind.io/'>Nzondermind downloads page</a>.</p>
    <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
    {label: 'JWT', value: 'jwt'},
    {label: 'IPC', value: 'ipc'}
    ]}>
      <TabItem value="jwt">
        <p>Extract the contents into your <code>execution</code> folder. Run the following command to start your execution node by replacing <code>&lt;PATH_TO_JWT_FILE&gt;</code> by the path to the JWT file generated during the previous step:</p>
      </TabItem>
      <TabItem value="ipc">
        <p>Extract the contents into your <code>execution</code> folder. Run the following command to start your execution by replacing <code>&lt;PATH_TO_IPC_FILE&gt;</code> by any empty path on your file system. The execution layer client will create an IPC file at this location:</p>
      </TabItem>
    </Tabs>
      <Tabs groupId="os" defaultValue="others" values={[
      {label: 'Windows', value: 'win'},
      {label: 'Linux, MacOS, Arm64', value: 'others'}
      ]}>
        <TabItem value="win">        
          <Tabs groupId="network" defaultValue="mainnet" values={[
            {label: 'Mainnet', value: 'mainnet'},
            {label: 'Sepolia', value: 'sepolia'},
            {label: 'Holesky', value: 'holesky'},
          ]}>
            <TabItem value="mainnet">
              <Tabs className='tabs-hidden-in-jwt-guide' groupId="protocol" defaultValue="jwt" values={[
                {label: 'JWT', value: 'jwt'},
                {label: 'IPC', value: 'ipc'}
              ]}>
                <TabItem value="jwt"><pre><code>nzondermind --config mainnet --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.JwtSecretFile=&lt;PATH_TO_JWT_FILE&gt;</code></pre></TabItem>
                <TabItem value="ipc"><pre><code>nzondermind --config mainnet --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.IpcUnixDomainSocketPath=&lt;PATH_TO_IPC_FILE&gt;</code></pre></TabItem>
              </Tabs>
            </TabItem>
            <TabItem value="sepolia">
              <Tabs className='tabs-hidden-in-jwt-guide' groupId="protocol" defaultValue="jwt" values={[
                  {label: 'JWT', value: 'jwt'},
                  {label: 'IPC', value: 'ipc'}
                  ]}>
                      <TabItem value="jwt"><pre><code>nzondermind --config sepolia --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true--JsonRpc.JwtSecretFile=&lt;PATH_TO_JWT_FILE&gt</code></pre></TabItem>
                      <TabItem value="ipc"><pre><code>nzondermind --config sepolia --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.IpcUnixDomainSocketPath=&lt;PATH_TO_IPC_FILE&gt;</code></pre></TabItem>
                  </Tabs>
            </TabItem>
            <TabItem value="holesky">
              <Tabs className='tabs-hidden-in-jwt-guide' groupId="protocol" defaultValue="jwt" values={[
                  {label: 'JWT', value: 'jwt'},
                  {label: 'IPC', value: 'ipc'}
                  ]}>
                      <TabItem value="jwt"><pre><code>nzondermind --config holesky --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true--JsonRpc.JwtSecretFile=&lt;PATH_TO_JWT_FILE&gt;</code></pre></TabItem>
                      <TabItem value="ipc"><pre><code>nzondermind --config holesky --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.IpcUnixDomainSocketPath=/path/to/&lt;your.ipc&gt;</code></pre></TabItem>
                  </Tabs>
            </TabItem>
          </Tabs>
        </TabItem>
        <TabItem value="others">        
          <Tabs groupId="network" defaultValue="mainnet" values={[
            {label: 'Mainnet', value: 'mainnet'},
            {label: 'Sepolia', value: 'sepolia'},
            {label: 'Holesky', value: 'holesky'},
          ]}>
            <TabItem value="mainnet">
              <Tabs className='tabs-hidden-in-jwt-guide' groupId="protocol" defaultValue="jwt" values={[
                {label: 'JWT', value: 'jwt'},
                {label: 'IPC', value: 'ipc'}
              ]}>
                <TabItem value="jwt"><pre><code>./nzondermind --config mainnet --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.JwtSecretFile=&lt;PATH_TO_JWT_FILE&gt;</code></pre></TabItem>
                <TabItem value="ipc"><pre><code>./nzondermind --config mainnet --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.IpcUnixDomainSocketPath=&lt;PATH_TO_IPC_FILE&gt;</code></pre></TabItem>
              </Tabs>
            </TabItem>
            <TabItem value="sepolia">
              <Tabs className='tabs-hidden-in-jwt-guide' groupId="protocol" defaultValue="jwt" values={[
                  {label: 'JWT', value: 'jwt'},
                  {label: 'IPC', value: 'ipc'}
                  ]}>
                      <TabItem value="jwt"><pre><code>./nzondermind --config sepolia --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true--JsonRpc.JwtSecretFile=&lt;PATH_TO_JWT_FILE&gt</code></pre></TabItem>
                      <TabItem value="ipc"><pre><code>./nzondermind --config sepolia --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.IpcUnixDomainSocketPath=&lt;PATH_TO_IPC_FILE&gt;</code></pre></TabItem>
                  </Tabs>
            </TabItem>
            <TabItem value="holesky">
              <Tabs className='tabs-hidden-in-jwt-guide' groupId="protocol" defaultValue="jwt" values={[
                  {label: 'JWT', value: 'jwt'},
                  {label: 'IPC', value: 'ipc'}
                  ]}>
                      <TabItem value="jwt"><pre><code>./nzondermind --config holesky --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true--JsonRpc.JwtSecretFile=&lt;PATH_TO_JWT_FILE&gt;</code></pre></TabItem>
                      <TabItem value="ipc"><pre><code>./nzondermind --config holesky --JsonRpc.Enabled true --HealthChecks.Enabled true --HealthChecks.UIEnabled true --JsonRpc.IpcUnixDomainSocketPath=/path/to/&lt;your.ipc&gt;</code></pre></TabItem>
                  </Tabs>
            </TabItem>
          </Tabs>
        </TabItem>
      </Tabs>
    <p>See Nzondermind's <a href='https://docs.nzondermind.io/nzondermind/ethereum-client/configuration'>command-line options</a> for parameter definitions.</p>
  </TabItem>
  <TabItem value="besu">
    <p className='hidden-in-jwt-guide hidden-in-mergeprep-guide'>Ensure that the latest 64-bit version of the <a href='https://www.oracle.com/java/technologies/downloads/'>Java JDK</a> is installed. Download the latest stable release of Besu from the <a href='https://github.com/hyperledger/besu/releases'>Besu releases</a> page. OS-specific instructions are available on Besu's <a href='https://besu.hyperledger.org/public-networks/get-started/install/binary-distribution'>binary installation page</a>.</p>
    <p>Run the following command to start your execution node replacing <code>&lt;PATH_TO_JWT_FILE&gt;</code> by the path to the JWT file generated during the previous step:</p>
    <Tabs groupId="network" defaultValue="mainnet" values={[
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Holesky', value: 'holesky'},
    ]}>
      <TabItem value="mainnet">
          <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>besu --network=mainnet --rpc-http-enabled --engine-jwt-enabled=true --engine-jwt-secret=&lt;PATH_TO_JWT_FILE&gt; --engine-host-allowlist="*"</code></pre></TabItem>
                <TabItem value="ipc"><div className="admonition admonition-danger alert alert--info"><div className="admonition-content"><p>Content under construction.</p></div></div></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="sepolia">
        <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>besu --network=sepolia --rpc-http-enabled --engine-jwt-enabled=true --engine-jwt-secret=&lt;PATH_TO_JWT_FILE&gt; --engine-host-allowlist="*"</code></pre></TabItem>
                <TabItem value="ipc"><div className="admonition admonition-danger alert alert--info"><div className="admonition-content"><p>Content under construction.</p></div></div></TabItem>
            </Tabs>
      </TabItem>
      <TabItem value="holesky">
        <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
            {label: 'JWT', value: 'jwt'},
            {label: 'IPC', value: 'ipc'}
            ]}>
                <TabItem value="jwt"><pre><code>besu --network=holesky --rpc-http-enabled --engine-jwt-enabled=true --engine-jwt-secret=&lt;PATH_TO_JWT_FILE&gt; --engine-host-allowlist="*"</code></pre></TabItem>
                <TabItem value="ipc"><div className="admonition admonition-danger alert alert--info"><div className="admonition-content"><p>Content under construction.</p></div></div></TabItem>
            </Tabs>
      </TabItem>
    </Tabs>
    <p>See Besu's <a href='https://besu.hyperledger.org/en/stable/Reference/CLI/CLI-Syntax/'>command-line options</a> for parameter definitions.</p>
  </TabItem>
  <TabItem value="gzond">
    <p className='hidden-in-jwt-guide hidden-in-mergeprep-guide'>Download and run the latest 64-bit stable release of <strong>Gzond</strong> for your operating system from the <a href='https://gzond.ethereum.org/downloads/'>Gzond downloads page</a>.</p> 
    <p>Move the <code>gzond</code> executable into your <code>execution</code> directory.</p>
    <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
        {label: 'JWT', value: 'jwt'},
        {label: 'IPC', value: 'ipc'}
        ]}>
      <TabItem value="jwt">
        <p className='hidden-in-jwt-guide hidden-in-mergeprep-guide'>Navigate to your <code>execution</code> directory and run the following command to start your execution node by replacing <code>&lt;PATH_TO_JWT_FILE&gt;</code> by the path to the JWT file generated during the previous step:</p>
      </TabItem>
      <TabItem value="ipc">
        <p className='hidden-in-jwt-guide hidden-in-mergeprep-guide'>Navigate to your <code>execution</code> directory and run the following command to start your execution node by replacing <code>&lt;PATH_TO_IPC_FILE&gt;</code> by any empty path on your file system. The execution layer client will create an IPC file at this location:</p>
      </TabItem>
    </Tabs>
    <Tabs groupId="os" defaultValue="others" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
    ]}>
      <TabItem value="win">
        <Tabs groupId="network" defaultValue="mainnet" values={[
            {label: 'Mainnet', value: 'mainnet'},
            {label: 'Sepolia', value: 'sepolia'},
            {label: 'Holesky', value: 'holesky'},
        ]}>
          <TabItem value="mainnet">
            <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
                {label: 'JWT', value: 'jwt'},
                {label: 'IPC', value: 'ipc'}
                ]}>
                    <TabItem value="jwt"><pre><code>gzond --mainnet --http --http.api zond,net,engine,admin --authrpc.jwtsecret=&lt;PATH_TO_JWT_FILE&gt; </code></pre></TabItem>
                    <TabItem value="ipc"><pre><code>gzond --mainnet --http --http.api zond,net,engine,admin --ipcpath=&lt;PATH_TO_IPC_FILE&gt;</code></pre></TabItem>
            </Tabs>
          </TabItem>
          <TabItem value="sepolia">
            <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
                {label: 'JWT', value: 'jwt'},
                {label: 'IPC', value: 'ipc'}
                ]}>
                    <TabItem value="jwt"><pre><code>gzond --sepolia --http --http.api zond,net,engine,admin --authrpc.jwtsecret=&lt;PATH_TO_JWT_FILE&gt;</code></pre></TabItem>
                    <TabItem value="ipc"><pre><code>gzond --sepolia --http --http.api zond,net,engine,admin --ipcpath=&lt;PATH_TO_IPC_FILE&gt;</code></pre></TabItem>
            </Tabs>
          </TabItem>
          <TabItem value="holesky">
            <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
                {label: 'JWT', value: 'jwt'},
                {label: 'IPC', value: 'ipc'}
                ]}>
                    <TabItem value="jwt"><pre><code>gzond --holesky --http --http.api zond,net,engine,admin --authrpc.jwtsecret=&lt;PATH_TO_JWT_FILE&gt;</code></pre></TabItem>
                    <TabItem value="ipc"><pre><code>gzond --holesky --http --http.api zond,net,engine,admin --ipcpath=&lt;PATH_TO_IPC_FILE&gt;</code></pre></TabItem>
            </Tabs>
          </TabItem>
        </Tabs>
      </TabItem>
      <TabItem value="others">
        <Tabs groupId="network" defaultValue="mainnet" values={[
            {label: 'Mainnet', value: 'mainnet'},
            {label: 'Sepolia', value: 'sepolia'},
            {label: 'Holesky', value: 'holesky'},
        ]}>
          <TabItem value="mainnet">
            <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
                {label: 'JWT', value: 'jwt'},
                {label: 'IPC', value: 'ipc'}
                ]}>
                    <TabItem value="jwt"><pre><code>./gzond --mainnet --http --http.api zond,net,engine,admin --authrpc.jwtsecret=&lt;PATH_TO_JWT_FILE&gt; </code></pre></TabItem>
                    <TabItem value="ipc"><pre><code>./gzond --mainnet --http --http.api zond,net,engine,admin --ipcpath=&lt;PATH_TO_IPC_FILE&gt;</code></pre></TabItem>
            </Tabs>
          </TabItem>
          <TabItem value="sepolia">
            <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
                {label: 'JWT', value: 'jwt'},
                {label: 'IPC', value: 'ipc'}
                ]}>
                    <TabItem value="jwt"><pre><code>./gzond --sepolia --http --http.api zond,net,engine,admin --authrpc.jwtsecret=&lt;PATH_TO_JWT_FILE&gt;</code></pre></TabItem>
                    <TabItem value="ipc"><pre><code>./gzond --sepolia --http --http.api zond,net,engine,admin --ipcpath=&lt;PATH_TO_IPC_FILE&gt;</code></pre></TabItem>
            </Tabs>
          </TabItem>
          <TabItem value="holesky">
            <Tabs className='tabs-hidden-in-jwt-guide'  groupId="protocol" defaultValue="jwt" values={[
                {label: 'JWT', value: 'jwt'},
                {label: 'IPC', value: 'ipc'}
                ]}>
                    <TabItem value="jwt"><pre><code>./gzond --holesky --http --http.api zond,net,engine,admin --authrpc.jwtsecret=&lt;PATH_TO_JWT_FILE&gt;</code></pre></TabItem>
                    <TabItem value="ipc"><pre><code>./gzond --holesky --http --http.api zond,net,engine,admin --ipcpath=&lt;PATH_TO_IPC_FILE&gt;</code></pre></TabItem>
            </Tabs>
          </TabItem>
        </Tabs>
      </TabItem>
      <p>See Gzond's <a href='https://gzond.ethereum.org/docs/interface/command-line-options'>command-line options</a> for parameter definitions.</p>
    </Tabs>
  </TabItem>
</Tabs>

The execution layer client cannot sync without an attached beacon node. We'll see how to setup a beacon node in the next step.

