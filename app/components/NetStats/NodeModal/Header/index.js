import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { numberWithCommas, trimValue, convertDurations } from 'utils/helpers';
import { clearNodeData as clearNodeDataAction } from 'actions/nodeHistory';
import { hideNodeHistoryModal as hideNodeHistoryModalAction } from 'actions/global';
import NodePropagationChart from 'components/NetStats/NodePropagationChart';
import Container from './Container';
import FlexItem from './FlexItem';
import Title from './Title';
import Value from './Value';
import CloseIcon from '../CloseIcon';
import FlexRow from '../FlexRow';
import { NETWORK_ALGO } from 'config';

class Header extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }
  handleKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.props.hideNodeHistoryModal();
    }
  };
  prepareChartData( data, dataKey) {
    const finalArray = [];
    for (let i = data.length - 1; i >= 0; i--) {
      finalArray.push({
        [dataKey]: parseFloat(data[data.length - i - 1]),
      });
    }
    return finalArray;
  }
  getColors() {
    const { realtimeData } = this.props;
    const lastBlockNumber = this.props.lastBlock['ethon:number'];
    if (!realtimeData || !realtimeData['ethstats:nodeData']['ethstats:nodeIsActive']) {
      return {
        nameColor: '#324156',
        latencyColor: '#EF6C6C',
        blockColor: '#324156',
        uptimeColor: '#324156',
        avgPropColor: '#324156',
        propTimeColor: '#324156',
      };
    }

    const colors = {
      nameColor: '#50E9D2',
      latencyColor: '#50E9D2',
      blockColor: '#50E9D2',
      uptimeColor: '#50E9D2',
      avgPropColor: '#50E9D2',
      propTimeColor: '#50E9D2',
    };

    // peers checker
    if (realtimeData['ethstats:nodeStatistics']) {
      if (realtimeData['ethstats:nodeStatistics']['ethstats:numberOfPeers'] < 4) {
        colors.nameColor = '#EFC865';
      }
      if (realtimeData['ethstats:nodeStatistics']['ethstats:numberOfPeers'] <= 1) {
        colors.nameColor = '#EF6C6C';
      }
    } else {
      colors.nameColor = '#EF6C6C';
    }

    // latency checker
    if (realtimeData['ethstats:nodeData']['ethstats:wsLatency'] > 100 && realtimeData['ethstats:nodeData']['ethstats:wsLatency'] <= 1000) {
      colors.latencyColor = '#EFC865';
    } else if (realtimeData['ethstats:nodeData']['ethstats:wsLatency'] > 1000) {
      colors.latencyColor = '#EF6C6C';
    }

    // block checker && propagation checker
    if (realtimeData['ethstats:nodeBlockData']) {
      if (parseInt(lastBlockNumber, 10) - realtimeData['ethstats:nodeBlockData']['ethon:number'] >= 1 && parseInt(lastBlockNumber, 10) - realtimeData['ethstats:nodeBlockData']['ethon:number'] < 4) {
        colors.blockColor = '#EFC865';
      } else if (parseInt(lastBlockNumber, 10) - realtimeData['ethstats:nodeBlockData']['ethon:number'] >= 4) {
        colors.blockColor = '#EF6C6C';
      }
      // avg prop
      if (realtimeData['ethstats:nodeBlockData']['ethon:number'].toString() !== lastBlockNumber.toString()) {
        colors.avgPropColor = '#324156';
        colors.propTimeColor = '#324156';
      } else {
        if (realtimeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] === 0) {
          colors.avgPropColor = '#2774FE';
        } else if (realtimeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] > 0 && realtimeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] < 1000) {
          colors.avgPropColor = '#50E9D2';
        } else if (realtimeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] >= 1000 && realtimeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] < 3000) {
          colors.avgPropColor = '#EFC865';
        } else if (realtimeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] >= 3000) {
          colors.avgPropColor = '#EF6C6C';
        }
        // prop time
        if (realtimeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] === 0) {
          colors.propTimeColor = '#2774FE';
        } else if (realtimeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] > 0 && realtimeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] < 1000) {
          colors.propTimeColor = '#50E9D2';
        } else if (realtimeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] >= 1000 && realtimeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] < 3000) {
          colors.propTimeColor = '#EFC865';
        } else if (realtimeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] >= 3000) {
          colors.propTimeColor = '#EF6C6C';
        }
      }
    } else {
      colors.blockColor = '#EF6C6C';
      colors.avgPropColor = '#324156';
      colors.propTimeColor = '#324156';
    }

    // uptime checker
    if (realtimeData['ethstats:nodeData']['ethstats:onlineTimePercent'] < 90 && realtimeData['ethstats:nodeData']['ethstats:onlineTimePercent'] >= 75) {
      colors.uptimeColor = '#EFC865';
    } else if (realtimeData['ethstats:nodeData']['ethstats:onlineTimePercent'] < 75) {
      colors.uptimeColor = '#EF6C6C';
    }
    return colors;
  }
  render() {
    const { realtimeData } = this.props;
    let colors = '';
    let type = 'N/A';
    let latency = 'N/A';
    let isValidator = 'N/A';
    let mining = 'N/A';
    let peers = 'N/A';
    let currentBlock = 0;
    let syncedBlock = 0;
    let blockNr = 'N/A';
    let txsNr = 'N/A';
    let unclesNr = 'N/A';
    let propagationTime = 'N/A';
    let propagationAvg = 'N/A';
    let uptime = 'N/A';
    let propChartData;
    if (realtimeData) {
      if (realtimeData['ethstats:nodeData']) {
        if (realtimeData['ethstats:nodeData']['ethstats:node']) {
          type = realtimeData['ethstats:nodeData']['ethstats:node'].split('/')[0];
        } else {
          type = 'N/A';
        }
        latency = realtimeData['ethstats:nodeData']['ethstats:wsLatency'] + ' ms';
        isValidator = realtimeData['ethstats:nodeData']['ethstats:nodeIsValidator'] ? 'Yes' : 'No';
        if (realtimeData['ethstats:nodeData']['ethstats:onlineTimePercent']) {
          uptime = realtimeData['ethstats:nodeData']['ethstats:onlineTimePercent'].toFixed(2) + '%';
        }
        if(!realtimeData['ethstats:nodeData']['ethstats:nodeIsActive']) {
          latency = 'offline';
        }
      }
      if (realtimeData['ethstats:nodeStatistics']) {
        mining = realtimeData['ethstats:nodeStatistics']['ethstats:isMining'] ? 'Yes' : 'No';
        peers = realtimeData['ethstats:nodeStatistics']['ethstats:numberOfPeers'];
      }
      if (realtimeData['ethstats:nodeBlockData'] && realtimeData['ethstats:nodeBlockData']['ethon:number']) {
        currentBlock = realtimeData['ethstats:nodeBlockData']['ethon:number'];
      }
      if (realtimeData['ethstats:nodeSyncInfo'] && realtimeData['ethstats:nodeSyncInfo']['ethstats:currentBlock']) {
        syncedBlock = realtimeData['ethstats:nodeSyncInfo']['ethstats:currentBlock'];
      }
      if (currentBlock > syncedBlock) {
        propChartData = this.prepareChartData(
          realtimeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationChartData'],
          'propagation'
        );
        blockNr = '#' + numberWithCommas(currentBlock) + ' ' + trimValue(realtimeData['ethstats:nodeBlockData']['ethon:blockHash']);
        txsNr = realtimeData['ethstats:nodeBlockData']['alethio:numberOfTxs'];
        unclesNr = realtimeData['ethstats:nodeBlockData']['alethio:numberOfUncles'];
        propagationTime = convertDurations(realtimeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime']);
        propagationAvg = convertDurations(realtimeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage']);
      } else {
        blockNr = '#' + numberWithCommas(syncedBlock);
      }
      colors = this.getColors();
    }
    return (
      <Container>
        <FlexRow>
          <FlexItem>
            <Title>Node name</Title>
            <Value color={colors.nameColor}>{this.props.nodeName}</Value>
          </FlexItem>
          <FlexItem>
            <Title>Type</Title>
            <Value color={colors.nameColor}>{type}</Value>
          </FlexItem>
          <FlexItem>
            <Title>Latency</Title>
            <Value color={colors.latencyColor}>{latency}</Value>
          </FlexItem>
          <FlexItem>
            <Title>{((['clique', 'ibft2'].includes(NETWORK_ALGO)) ? 'Is validator' : 'Is mining')}</Title>
            <Value color={colors.nameColor}>{((['clique', 'ibft2'].includes(NETWORK_ALGO)) ? isValidator : mining)}</Value>
          </FlexItem>
          <FlexItem>
            <Title>Peers</Title>
            <Value color={colors.nameColor}>{peers}</Value>
          </FlexItem>
          <FlexItem>
            <Title>Latest block</Title>
            <Value color={colors.blockColor}>{blockNr}</Value>
          </FlexItem>
          <FlexItem>
            <Title>Block Txs</Title>
            <Value color={colors.nameColor}>{txsNr}</Value>
          </FlexItem>
          <FlexItem>
            <Title>Uncles</Title>
            <Value color={colors.nameColor}>{unclesNr}</Value>
          </FlexItem>
          <FlexItem>
            <Title>Propagation time</Title>
            <FlexRow>
              <Value color={colors.propTimeColor} className="padded">{propagationTime}</Value>
              { propChartData && <NodePropagationChart dataKey="propagation" data={propChartData} color={colors.nameColor} measureUnit="ms"/> }
            </FlexRow>
          </FlexItem>
          <FlexItem>
            <Title>Avg</Title>
            <Value color={colors.avgPropColor}>{propagationAvg}</Value>
          </FlexItem>
          <FlexItem>
            <Title>Uptime</Title>
            <Value color={colors.uptimeColor}>{uptime}</Value>
          </FlexItem>
        </FlexRow>
        <CloseIcon onClick={() => { this.props.hideNodeHistoryModal(); this.props.clearNodeData();}}/>
      </Container>
    );
  }
}

Header.propTypes = {
  nodeName: PropTypes.string,
  realtimeData: PropTypes.object,
  clearNodeData: PropTypes.func,
  hideNodeHistoryModal: PropTypes.func,
  lastBlock: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    nodeName: state.nodeHistory.nodeName,
    realtimeData: state.nodesData.data[`ethstats/node/${state.nodeHistory.nodeName}`],
    lastBlock: state.lastBlock.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideNodeHistoryModal: () => dispatch(hideNodeHistoryModalAction()),
    clearNodeData: () => dispatch(clearNodeDataAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
