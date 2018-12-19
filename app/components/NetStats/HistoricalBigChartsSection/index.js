import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from './Container';
import HistoricalBlockChartSectionItem from 'components/NetStats/HistoricalBigChartsSectionItem';
import { BigNumber }  from 'bignumber.js';
import { convertHashes, numberWithCommas, prepareChartData } from 'utils/helpers';

class HistoricalBlockChartsSection extends React.Component {
  render() {
    const { data, blockNr } = this.props;
    let blockTime = 'N/A';
    let avgDifficulty = 'N/A';
    let avgGasLimit = 'N/A';
    let difficulty = 'N/A';
    let blockGasLimit = 'N/A';
    let avgBlockTime = 'N/A';
    let networkHashrate = 'N/A';
    let blockTimeChartData = [];
    let blockDifficultyChartData = [];
    let gasLimitChartData = [];
    if (data) {
      // blockTime

      blockTimeChartData = prepareChartData(data.charts['ethstats:blockTimeChartData'].slice(data.charts['ethstats:blockTimeChartData'].length - this.props.numberOfBars, data.charts['ethstats:blockTimeChartData'].length), 'ethstats:blockTime');
      blockTime = blockTimeChartData[blockTimeChartData.length - 1]['ethstats:blockTime'] + 's';

      // avg blockTime
      let blockTimeSum = 0;
      for (let i = 0; i < blockTimeChartData.length; i++) {
        blockTimeSum = blockTimeSum + blockTimeChartData[i]['ethstats:blockTime'];
      }
      avgBlockTime = blockTimeSum / blockTimeChartData.length;
      avgBlockTime = avgBlockTime.toFixed(2) + 's';

      // avg diff
      blockDifficultyChartData = prepareChartData(data.charts['ethstats:blockDifficultyChartData'].slice(data.charts['ethstats:blockDifficultyChartData'].length - this.props.numberOfBars, data.charts['ethstats:blockDifficultyChartData'].length), 'ethon:blockDifficulty');
      let sum = new BigNumber(0);
      for (let i = 0; i <  blockDifficultyChartData.length; i++) {
        sum = sum.plus(BigNumber(blockDifficultyChartData[i]['ethon:blockDifficulty']));
      }
      avgDifficulty = sum.dividedBy(blockDifficultyChartData.length).toString();
      avgDifficulty = numberWithCommas(convertHashes(parseInt(avgDifficulty, 10), 4));

      // difficulty
      difficulty = numberWithCommas(convertHashes(parseInt(blockDifficultyChartData[blockDifficultyChartData.length - 1]['ethon:blockDifficulty'], 10)));

      // avg gas limit
      gasLimitChartData = prepareChartData(data.charts['ethstats:gasLimitChartData'].slice(data.charts['ethstats:gasLimitChartData'].length - this.props.numberOfBars, data.charts['ethstats:gasLimitChartData'].length), 'ethon:blockGasLimit');
      let gasLimitSum  = new BigNumber(0);
      for (let i = 0; i <  gasLimitChartData.length; i++) {
        gasLimitSum = gasLimitSum.plus(BigNumber(gasLimitChartData[i]['ethon:blockGasLimit']));
      }
      avgGasLimit = gasLimitSum.dividedBy(gasLimitChartData.length).toString();
      avgGasLimit = numberWithCommas(parseInt(avgGasLimit, 10)) + ' gas';

      // block gas limit
      blockGasLimit = numberWithCommas(gasLimitChartData[gasLimitChartData.length - 1]['ethon:blockGasLimit']);

      // network hashrate
      networkHashrate = convertHashes(data.stats['ethstats:averageNetworkHashrate']) + '/s';
    }
    return (
      <Container>
        <HistoricalBlockChartSectionItem
          mainTitle="Block number"
          mainValue={'#' + numberWithCommas(blockNr)}
          secondTitle="Avg. block time"
          secondValue={avgBlockTime}
          thirdTitle="Block time"
          thirdValue={blockTime}
          color="#2774FE"
          iconName="clock"
          dataKey="ethstats:blockTime"
          measureUnit="s"
          tooltipKey="block"
          hasDomain
          chartReducer="blockTime"
          topRightReducer="avgBlockTime"
          valuePrefix="Block time: "
          labelPrefix="Block: "
          chartsData={blockTimeChartData}
          hasNavigation
        />
        <HistoricalBlockChartSectionItem
          id="difficulty"
          mainTitle="Difficulty"
          mainValue={difficulty}
          secondTitle="Avg. difficulty"
          secondValue={avgDifficulty}
          thirdTitle="Network hashrate"
          thirdValue={networkHashrate}
          color="#EFC865"
          iconName="fan"
          dataKey="ethon:blockDifficulty"
          measureUnit="H"
          tooltipKey="block"
          hasDomain
          chartReducer="blockDifficulty"
          topRightReducer="avgNetworkHashrate"
          valuePrefix="Difficulty: "
          labelPrefix="Block: "
          chartsData={blockDifficultyChartData}
          hasNavigation
        />
        <HistoricalBlockChartSectionItem
          id="gas_limit"
          mainTitle="Block gas limit"
          mainValue={blockGasLimit}
          secondTitle="Avg. gas limit"
          secondValue={avgGasLimit}
          thirdTitle=""
          color="#8399B8"
          iconName="gas"
          dataKey="ethon:blockGasLimit"
          measureUnit="gas"
          tooltipKey="block"
          hasDomain
          chartReducer="gasLimit"
          topRightReducer="pendingLastBlock"
          valuePrefix="Gas limit: "
          labelPrefix="Block: "
          chartsData={gasLimitChartData}
          hasNavigation
        />
      </Container>
    );
  }
}

HistoricalBlockChartsSection.propTypes = {
  data: PropTypes.object,
  blockNr: PropTypes.string,
  numberOfBars: PropTypes.number,
};

const mapStateToProps = (state, props) => {
  return {
    numberOfBars: state.global.bigChartBarCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoricalBlockChartsSection);

