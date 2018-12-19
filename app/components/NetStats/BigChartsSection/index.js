import React from 'react';
import Container from './Container';
import BigChartsSectionItem from 'components/NetStats/BigChartsSectionItem';

class BigChartsSection extends React.Component {
  render() {
    return (
      <Container>
        <BigChartsSectionItem
          id="best_block"
          mainTitle="Best block"
          secondTitle="Avg. block time"
          secondValue="N/A"
          thirdTitle="Last block"
          color="#2774FE"
          iconName="clock"
          dataKey="ethstats:blockTime"
          measureUnit="s"
          tooltipKey="block"
          chartReducer="blockTime"
          topLeftReducer="lastBlock"
          topRightReducer="lastBlock"
          bottomLeftReducer="blockTime"
          valuePrefix="Block time: "
          labelPrefix="Block: "
          hasDomain
        />
        <BigChartsSectionItem
          id="difficulty"
          mainTitle="Difficulty"
          secondTitle="Avg. difficulty"
          secondValue="N/A"
          thirdTitle="Network hashrate"
          color="#EFC865"
          iconName="fan"
          dataKey="ethon:blockDifficulty"
          measureUnit="H"
          tooltipKey="block"
          hasDomain
          chartReducer="blockDifficulty"
          topLeftReducer="blockDifficulty"
          topRightReducer="avgNetworkHashrate"
          bottomLeftReducer="blockDifficulty"
          valuePrefix="Difficulty: "
          labelPrefix="Block: "
        />
        <BigChartsSectionItem
          id="gas_limit"
          mainTitle="Block gas limit"
          secondTitle="Avg. gas limit"
          secondValue="N/A"
          thirdTitle="Avg. gas price"
          color="#8399B8"
          iconName="gas"
          dataKey="ethon:blockGasLimit"
          measureUnit="gas"
          tooltipKey="block"
          hasDomain
          chartReducer="gasLimit"
          topLeftReducer="gasLimit"
          topRightReducer="pendingLastBlock"
          bottomLeftReducer="gasLimit"
          valuePrefix="Gas limit: "
          labelPrefix="Block: "
        />
      </Container>
    );
  }
}

export default BigChartsSection;
