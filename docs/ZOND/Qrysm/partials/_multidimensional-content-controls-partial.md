import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import {MultiDimensionalContentWidget} from '@site/src/components/MultiDimensionalContentWidget.js';

<MultiDimensionalContentWidget />

<div className='quickstart-tabs'>

<Tabs className="tabgroup-with-label os-tabgroup" groupId="os" defaultValue="others" values={[
    {label: 'Operating system:', value: 'label'},
    {label: 'Linux, MacOS, Arm64', value: 'others'},
    {label: 'Windows', value: 'win'}
]}>
  <TabItem className="unclickable-element" value="label"></TabItem>
  <TabItem value="others"></TabItem>
  <TabItem value="win"></TabItem>
</Tabs>

<Tabs className="tabgroup-with-label network-tabgroup" groupId="network" defaultValue="mainnet" values={[
        {label: 'Network:', value: 'label'},
        {label: 'Mainnet', value: 'mainnet'},
        {label: 'Sepolia', value: 'sepolia'},
        {label: 'Holesky', value: 'holesky'}
    ]}>
    <TabItem className="unclickable-element" value="label"></TabItem>
    <TabItem value="mainnet"></TabItem>
    <TabItem value="sepolia"></TabItem>
    <TabItem value="holesky"></TabItem>
</Tabs>

<Tabs className="tabgroup-with-label hidden-in-docker-guide el-tabgroup" groupId="execution-clients" defaultValue="gzond" values={[
  {label: 'Execution client:', value: 'label'},
  {label: 'Gzond', value: 'gzond'},
  {label: 'Nzondermind', value: 'nzondermind'},
  {label: 'Besu', value: 'besu'}
  ]}>
  <TabItem className="unclickable-element" value="label"></TabItem>
  <TabItem value="gzond"></TabItem>
  <TabItem value="nzondermind"></TabItem>
  <TabItem value="besu"></TabItem>
</Tabs>

<Tabs className="tabgroup-with-label hidden-in-jwt-guide hidden-in-docker-guide enbn-tabgroup" groupId="protocol" defaultValue="jwt" values={[
        {label: 'EN-BN connection:', value: 'label'},
        {label: 'HTTP-JWT', value: 'jwt'},
        {label: 'IPC', value: 'ipc'}
    ]}>
    <TabItem className="unclickable-element" value="label"></TabItem>
    <TabItem value="jwt"></TabItem>
    <TabItem value="ipc"></TabItem>
</Tabs>

</div>
