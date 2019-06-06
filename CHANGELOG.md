# Changelog
All notable changes to this project will be documented in this file.

## [1.2.0] - 2019-06-06
- Show validators for POA networks (clique and ibft2)
- Add NETWORK_ALGO config (values: ethash, clique, ibft2)
- Add tooltip on isValidator/isMining to show the node address
- Fix logos

## [1.1.6] - 2019-02-18
- Show correct min/max values for the big charts
- Added config AVG_GAS_PRICE_ENABLED

## [1.1.5] - 2019-02-16
- If all bars in a chart have the same value the domain "min" value should be 0
- Fixed "Last Miners" chart

## [1.1.4] - 2019-02-06
- Added config EXPLORER_URL
- Added config PRIVACY_POLICY
- Fixed config issues

## [1.1.3] - 2019-01-23
- Update default Google Analytics ID

## [1.1.2] - 2019-01-19
- Add action to block number value from historical mode to open EthStats block explorer on specific block page
- Add action to tx count and gas small charts to open EthStats block explorer at specific block page
- Add navigation form lastBlock to EthStats blockchain explorer
- Add navigation from bigCharts to block explorer coresponding block

## [1.1.1] - 2019-01-15
- Update propagation chart to support 50 bar
- Added CircleCI workflow to trigger docker hub build sequentially

## [1.1.0] - 2018-12-19
- Moved repo to Github
- Added CircleCI integration
- Added github ISSUE_TEMPLATE 
- Dockerfile updates to support env vars
