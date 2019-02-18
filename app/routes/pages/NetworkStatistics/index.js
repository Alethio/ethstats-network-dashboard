import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NodesList from 'components/NetStats/NodesList';
import BigChartsSection from 'components/NetStats/BigChartsSection';
import SmallChartsSection from 'components/NetStats/SmallChartsSection';
import ContainerWithFixedElements from 'components/ContainerWithFixedElements';
import { DsService } from 'service';
import { loadNodes, unloadNodes } from 'actions/nodesList';
import { loadAvgBlockTime as loadAvgBlockTimeAction } from 'actions/avgBlockTime';
import { loadAvgNetworkHashrate as loadAvgNetworkHashrateAction } from 'actions/avgNetworkHashrate';
import { loadBlockTime as loadBlockTimeAction } from 'actions/blockTime';
import { loadBlockDifficulty as loadBlockDifficultyAction } from 'actions/blockDifficulty';
import { loadTransactionsHistory as loadTransactionsHistoryAction } from 'actions/transactionsHistory';
import { loadUncleCount as loadUncleCountAction } from 'actions/uncleCount';
import { loadGasSpending as loadGasSpendingAction } from 'actions/gasSpending';
import { loadGasLimit as loadGasLimitAction } from 'actions/gasLimit';
import { loadBlockPropagation as loadBlockPropagationAction } from 'actions/blockPropagation';
import { loadMinersTop as loadMinersTopAction } from 'actions/minersTop';
import { loadPendingLastBlock as loadPendingLastBlockAction } from 'actions/pendingLastBlock';
import { startTickTimer, stopTickTimer } from 'actions/global';
import { AVG_GAS_PRICE_ENABLED } from 'config';

class NetworkStatistics extends React.Component {
  componentDidMount() {
    this.props.dispatch(startTickTimer());
    this.props.dispatch(loadNodes());
    DsService.getList('charts').then( ( list ) => {
      // interact with the list
      list.map((item) => {
        DsService.getRawRecord(item).then(record => {
          record.subscribe(this.handleChartSubscribe.bind(this, item), true);
        });
      });
    });
    DsService.getList('stats').then( ( list ) => {
      // interact with the list
      list.map((item) => {
        DsService.getRawRecord(item).then(record => {
          record.subscribe(this.handleChartSubscribe.bind(this, item), true);
        });
      });
    });
    if (AVG_GAS_PRICE_ENABLED) {
      DsService.getRawRecord('pending/v2/lastBlockData').then((record) => {
        record.subscribe(this.handlePendingLastBlockSubscribe.bind(this), true);
      });
    }
  }
  componentWillUnmount() {
    this.props.dispatch(stopTickTimer());
    this.props.dispatch(unloadNodes());
    DsService.getList('charts').then( ( list ) => {
      list.map((item) => {
        DsService.getRawRecord(item).then(record => {
          record.unsubscribe();
        });
      });
    });
    DsService.getList('stats').then( ( list ) => {
      list.map((item) => {
        if (item !== 'ethstats/stats/lastBlockData') {
          DsService.getRawRecord(item).then(record => {
            record.unsubscribe();
          });
        }
      });
    });
    if (AVG_GAS_PRICE_ENABLED) {
      DsService.getRawRecord('pending/v2/lastBlockData').then((record) => {
        record.unsubscribe();
      });
    }
  }
  handlePendingLastBlockSubscribe(data) {
    this.props.dispatch(loadPendingLastBlockAction(data));
  }
  handleChartSubscribe(item, data) {
    const { dispatch } = this.props;
    if (item === 'ethstats/stats/averageBlockTime') {
      dispatch(loadAvgBlockTimeAction(data['ethstats:averageBlockTime']));
    } else if (item === 'ethstats/stats/averageNetworkHashrate') {
      dispatch(loadAvgNetworkHashrateAction(data['ethstats:averageNetworkHashrate']));
    } else if (item === 'ethstats/chart/blockTimeChartData') {
      dispatch(loadBlockTimeAction(data['ethstats:blockTimeChartData']));
    } else if (item === 'ethstats/chart/blockDifficultyChartData') {
      dispatch(loadBlockDifficultyAction(data['ethstats:blockDifficultyChartData']));
    } else if (item === 'ethstats/chart/transactionsChartData') {
      dispatch(loadTransactionsHistoryAction(data['ethstats:transactionsChartData']));
    } else if (item === 'ethstats/chart/uncleCountChartData') {
      dispatch(loadUncleCountAction(data['ethstats:uncleCountChartData']));
    } else if (item === 'ethstats/chart/gasSpendingChartData') {
      dispatch(loadGasSpendingAction(data['ethstats:gasSpendingChartData']));
    } else if (item === 'ethstats/chart/gasLimitChartData') {
      dispatch(loadGasLimitAction(data['ethstats:gasLimitChartData']));
    } else if (item === 'ethstats/chart/blockPropagationChartData') {
      dispatch(loadBlockPropagationAction(data['ethstats:blockPropagationChartData']));
    } else if (item === 'ethstats/chart/topMinersChartData') {
      dispatch(loadMinersTopAction(data['ethstats:topMinersChartData']));
    }
  }
  render() {
    return (
      <div className="full-width" style={{minWidth: '1440px'}}>
        <ContainerWithFixedElements>
          <BigChartsSection/>
          <NodesList/>
          <SmallChartsSection/>
        </ContainerWithFixedElements>
      </div>
    );
  }
}

NetworkStatistics.propTypes = {
  dispatch: PropTypes.func,
  startGuideTour: PropTypes.func,
};

export default connect()(NetworkStatistics);

