import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Create a folder called `ethereum` on your SSD, and then two subfolders within it: `consensus` and `execution`:

```
📂ethereum
┣ 📂consensus
┣ 📂execution
```

<Tabs groupId="os" defaultValue="others" values={[
    {label: 'Windows', value: 'win'},
    {label: 'Linux, MacOS, Arm64', value: 'others'}
]}>
  <TabItem value="win">
    <p>Navigate to your <code>consensus</code> directory and run the following commands:</p>

```
curl https://raw.githubusercontent.com/prysmaticlabs/qrysm/master/qrysm.bat --output qrysm.bat
reg add HKCU\Console /v VirtualTerminalLevel /t REG_DWORD /d 1
```

  <p>This will download the Qrysm client and update your registry to enable verbose logging.</p>
  </TabItem>
  <TabItem value="others">
    <p>Navigate to your <code>consensus</code> directory and run the following commands:</p>

```
curl https://raw.githubusercontent.com/prysmaticlabs/qrysm/master/qrysm.sh --output qrysm.sh && chmod +x qrysm.sh
```

  <p>This will download the Qrysm client and make it executable.</p>
  </TabItem>
</Tabs>


<Tabs groupId="protocol" defaultValue="jwt" values={[
        {label: 'JWT', value: 'jwt'},
        {label: 'IPC', value: 'ipc'}
    ]}>
    <TabItem value="jwt">

<h3>Generate JWT Secret</h3>

import JwtGenerationPartial from '../../../../ZOND/Qrysm/partials/_jwt-generation-partial.md';

<JwtGenerationPartial />
    
  </TabItem>
</Tabs>


