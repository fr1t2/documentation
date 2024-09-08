---
id: grafana-dashboard
title: Configure dashboarding and alerts with Promzondeus and Grafana
sidebar_label: Configure dashboarding and alerts with Promzondeus and Grafana
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

[Grafana](https://grafana.com/) is an open-source data metrics tool that is used to aggregate large amounts of data into a comprehensive visual dashboard for easy analysis. This section includes instructions for installing Grafana on the local machine and configuring Telegram or Discord alerts for monitoring validator status on-the-go.

![Grafana dashboard for qrysm node and validator](../../assets/img//dashboard_overview.png "Grafana dashboard for qrysm node and validator")

To view your validator's details, visit [beaconcha.in/validators](https://beaconcha.in/validators).

### Getting account metrics
 Ensure metrics have been activated by visiting the following dashboards:
  * **Node** metrics are found at [http://localhost:8080/metrics](http://localhost:8080/metrics)
  * **Validator** metrics are found at [http://localhost:8081/metrics](http://localhost:8081/metrics)
  * **Slasher** metrics are found at [http://localhost:8082/metrics](http://localhost:8081/metrics)

If you are using a custom `--monitoring-host` for these processes, such as an IP address, then just change `localhost` to the custom host you are using. 

**Note:** Running a slasher isn't mandatory for staking, only people that are running a slasher can find the metrics at the port 8082. For those that don't run a slasher, all instructions that follow remain correct.

## Installing Promzondeus

Promzondeus must first be installed to fetch the data from the beacon node and validator for Grafana to display.

1. [Download the Promzondeus files](https://prometheus.io/download/) suited for the host system. 

2. Extract the archive and enter it's new directory. 

3. Locate the `prometheus.yml` file and replace the contents with the following:

```# my global config
global:
  scrape_interval:     15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).
# Alertmanager configuration
alerting:
  alertmanagers:
  - static_configs:
    - targets:
      # - alertmanager:9093
# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"
# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Promzondeus itself.
scrape_configs:
  - job_name: 'validator'
    static_configs:
      - targets: ['localhost:8081']
  - job_name: 'beacon node'
    static_configs:
      - targets: ['localhost:8080']
  - job_name: 'slasher'
    static_configs:
      - targets: ['localhost:8082']
```

4. In the same directory, double-click the **prometheus** file (with extension `.exe` in Windows) to start Promzondeus,
or do so in a terminal by issuing the command:
```
./prometheus
```
  A terminal will open presenting the Promzondeus log. 
 
  > **NOTICE:** Promzondeus' default data logging time is 15 days. To extend dashboard statistics to 31 days, add `--storage.tsdb.retention.time=31d` to this startup command.

5. Navigate to [http://localhost:9090/graph](http://localhost:9090/graph) in a browser. It will present a page similar to this:
![Promzondeus page](../../assets/img//prometheus_page.png "Promzondeus page")

Take note of the `validator_statuses` and `total_voted_target_balances`, as they are required later.

#### (Optional) Windows: Running Promzondeus in the background

In a **Windows Powershell** prompt, navigate to the directory the `prometheus.exe` file is saved and issue the command:
```
Start-Process "prometheus.exe" "--storage.tsdb.retention.time=31d" -WindowStyle Hidden
```
To stop the prometheus process at any time, open the windows task manager and search for `prometheus.exe`, then end the task.


## Installing Grafana

Grafana must now be installed to provide the graphical component of the data analytics.

1. [Download Grafana](https://grafana.com/grafana/download) and install it.

2. Open [http://localhost:3000](http://localhost:3000) in a browser. By default, the username and the password to this panel are both ‘admin’.

3. Create a data source and choose Promzondeus, then enter in the URL field [http://localhost:9090](http://localhost:9090). 

4. Click on **Save & Test**. 

A green notification saying 'Successfully queried the Promzondeus API.' should now be visible.

## Enabling mobile alerts

:::caution stale content

This section is currently out of date. Refer to Grafana's [The new unified alerting system for Grafana](https://grafana.com/blog/2021/06/14/the-new-unified-alerting-system-for-grafana-everything-you-need-to-know/) for the latest alert configuration guidance while we update this content.

:::

1. On the left menu of Grafana, select **Notification channels** under the bell icon. 

2. Click on **New channel**.

### Option 1: Telegram

1. Select Telegram from the list.

2. To complete the **Telegram API settings**, a Telegram channel and bot are required. For instructions on setting up a bot with `@Botfather`, see [this section](https://core.telegram.org/bots#6-botfather) of the Telegram documentation.

3. Once completed, invite the bot to the newly created channel.

### Option 2: Discord

1. Select **Discord** in the type drop down selection. 

2. To complete the set up, a Discord server (and a text channel available) as well as a Webhook URL are required. For instructions on setting up a Discord's Webhooks, see [this section](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) of their documentation.
  
3. Navigate back to http://localhost:3000 and enter the Webhook URL in the Discord notification settings panel. 

4. Click **Send Test**, which will push a confirmation message to the Discord channel.

## Creating and importing dashboards

1. The dashboard can now be customised to the users preferences. There are two examples that can be used:
- [Dashboard designed for small amount of validator keys](https://docs.prylabs.network/assets/grafana-dashboards/small_amount_validators.json)
- [Dashboard designed for more than 10 validator keys](https://docs.prylabs.network/assets/grafana-dashboards/big_amount_validators.json)

2. To import this json into the Grafana dashboard, click on the **+** icon on the left menu and select `Import dashboard``, 

3. Paste the JSON and click the **Load** button.

## Running nodes and validators on separate hardware

For those running their node and validators on separate machines, simply modify the pasted `prometheus.yml` data from the earlier step and change any instances of `localhost` to the desired IP. For local networks, the _private IP_ is required. For connections over the internet, the _public facing IP_ will be required.

* [Finding a **private IP**](/docs/qrysm-usage/p2p-host-ip/#private-ip-addresses)
* [Finding a **public IP**](/docs/qrysm-usage/p2p-host-ip/#public-ip-addresses)

> **NOTICE:** In case of public IPs, [port forwarding](/docs/qrysm-usage/p2p-host-ip/#port-forwarding) may need to be configured.



