import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import JwtGenerationPartial from '../../../ZOND/Qrysm/partials/_jwt-generation-partial.md';

<JwtGenerationPartial />

## Configure an execution node

Your execution node needs to **expose a new port** and then **use the JWT token** to authenticate your beacon node's connection to that port.

<p className="hidden-in-mergeprep-guide">Using the latest version of your execution client software, issue the following command to configure your execution node's JWT token and Engine API endpoint:</p>

import QuickstartRunExecutionNodeJWTPartial from '../../../ZOND/Qrysm/install/partials/_quickstart-run-execution-node.md';

<QuickstartRunExecutionNodeJWTPartial />

## Configure beacon node

Next, we'll configure your beacon node to consume your JWT token so it can form an authenticated HTTP connection with your execution node.

import QuickstartRunBeaconNodePartial from '../../../ZOND/Qrysm/install/partials/_quickstart-run-beacon-node.md';

<QuickstartRunBeaconNodePartial />
