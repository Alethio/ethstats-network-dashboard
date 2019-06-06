import React from 'react';
import PropTypes from 'prop-types';
import { numberWithCommas, trimValue } from 'utils/helpers';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import NodePropagationChart from 'components/NetStats/NodePropagationChart';
import Container from './Container';
import Counter from './Counter';
import Detail from './Detail';
import FlexBox from './FlexBox';
import Pin from './Pin';
import JustFlex from './JustFlex';
import PaddedProp from './PaddedProp';
import { getNodeName as getNodeNameAction } from 'actions/nodeHistory';
import { showNodeHistoryModal as showNodeHistoryModalAction } from 'actions/global';
import nodeDataSelector from 'selector/nodeData';
import { NETWORK_ALGO } from 'config';

class NodeItem extends React.Component {
  static propTypes = {
    // props given directly
    ethNodeName: PropTypes.string,
    pinned: PropTypes.bool,
    updateNodePinCallback: PropTypes.func,
    // props given by redux
    data: PropTypes.object,
    lastBlock: PropTypes.object,
    nodeLastBlockNumber: PropTypes.number,
    getNodeName: PropTypes.func,
    showNodeHistoryModal: PropTypes.func
  };

  getColors() {
    const { data, lastBlock } = this.props;
    const lastBlockNumber = lastBlock ? lastBlock['ethon:number'].toString() : 'N/A';
    if (!data || !data['ethstats:nodeData']['ethstats:nodeIsActive']) {
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
    if (data['ethstats:nodeStatistics']) {
      if (data['ethstats:nodeStatistics']['ethstats:numberOfPeers'] < 4) {
        colors.nameColor = '#EFC865';
      }
      if (data['ethstats:nodeStatistics']['ethstats:numberOfPeers'] <= 1) {
        colors.nameColor = '#EF6C6C';
      }
    } else {
      colors.nameColor = '#EF6C6C';
    }

    // latency checker
    if (data['ethstats:nodeData']['ethstats:wsLatency'] > 100 && data['ethstats:nodeData']['ethstats:wsLatency'] <= 1000) {
      colors.latencyColor = '#EFC865';
    } else if (data['ethstats:nodeData']['ethstats:wsLatency'] > 1000) {
      colors.latencyColor = '#EF6C6C';
    }

    // block checker && propagation checker
    if (data['ethstats:nodeBlockData']) {
      if (parseInt(lastBlockNumber, 10) - data['ethstats:nodeBlockData']['ethon:number'] >= 1 && parseInt(lastBlockNumber, 10) - data['ethstats:nodeBlockData']['ethon:number'] < 4) {
        colors.blockColor = '#EFC865';
      } else if (parseInt(lastBlockNumber, 10) - data['ethstats:nodeBlockData']['ethon:number'] >= 4) {
        colors.blockColor = '#EF6C6C';
      }
      // avg prop
      if (data['ethstats:nodeBlockData']['ethon:number'].toString() !== lastBlockNumber.toString()) {
        colors.avgPropColor = '#324156';
        colors.propTimeColor = '#324156';
      } else {
        if (data['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] === 0) {
          colors.avgPropColor = '#2774FE';
        } else if (data['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] > 0 && data['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] < 1000) {
          colors.avgPropColor = '#50E9D2';
        } else if (data['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] >= 1000 && data['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] < 3000) {
          colors.avgPropColor = '#EFC865';
        } else if (data['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] >= 3000) {
          colors.avgPropColor = '#EF6C6C';
        }
        // prop time
        if (data['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] === 0) {
          colors.propTimeColor = '#2774FE';
        } else if (data['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] > 0 && data['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] < 1000) {
          colors.propTimeColor = '#50E9D2';
        } else if (data['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] >= 1000 && data['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] < 3000) {
          colors.propTimeColor = '#EFC865';
        } else if (data['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] >= 3000) {
          colors.propTimeColor = '#EF6C6C';
        }
      }
    } else {
      colors.blockColor = '#EF6C6C';
      colors.avgPropColor = '#324156';
      colors.propTimeColor = '#324156';
    }

    // uptime checker
    if (data['ethstats:nodeData']['ethstats:onlineTimePercent'] < 90 && data['ethstats:nodeData']['ethstats:onlineTimePercent'] >= 75) {
      colors.uptimeColor = '#EFC865';
    } else if (data['ethstats:nodeData']['ethstats:onlineTimePercent'] < 75) {
      colors.uptimeColor = '#EF6C6C';
    }
    return colors;
  }
  prepareChartData( data, dataKey) {
    const finalArray = [];
    for (let i = data.length - 1; i >= 0; i--) {
      finalArray.push({
        [dataKey]: parseFloat(data[data.length - i - 1]),
      });
    }
    return finalArray;
  }

  handleNodeClick(shortNodeName) {
    this.props.getNodeName(shortNodeName);
    this.props.showNodeHistoryModal();
  }

  render() {
    const { data, pinned, ethNodeName, nodeLastBlockNumber } = this.props;
    let shouldBeVisible = false,
      colors,
      shortNodeName,
      nodeType = 'N/A',
      peers = 'N/A',
      latency,
      uptime,
      isValidator = 'N/A',
      mining = 'N/A',
      propAvg = 'N/A',
      lastBlock = 'N/A',
      lastBlockHash = 'N/A',
      lastBlockTxCount = 'N/A',
      lastBlockUnclesCount = 'N/A',
      lastBlockPropTime = 'N/A',
      propChartData;
    if (data && Object.keys(data).length !== 0 && data.constructor === Object) {
      shouldBeVisible = true;
      colors = this.getColors();
      shortNodeName = data['ethstats:nodeData']['ethstats:nodeName'];
      nodeType = data['ethstats:nodeData']['ethstats:node'] ? data['ethstats:nodeData']['ethstats:node'].split('/')[0] : 'N/A';
      latency = data['ethstats:nodeData']['ethstats:nodeIsActive']
        ? data['ethstats:nodeData']['ethstats:wsLatency'] + ' ms'
        : 'offline';
      uptime = data['ethstats:nodeData']['ethstats:onlineTimePercent']
        ? parseFloat(data['ethstats:nodeData']['ethstats:onlineTimePercent'].toFixed(2), 10) + '%'
        : 'N/A';
      isValidator = data['ethstats:nodeData']['ethstats:nodeIsValidator'] ? 'Yes' : 'No';
      if (data['ethstats:nodeStatistics']) {
        peers = data['ethstats:nodeStatistics']['ethstats:numberOfPeers'];
        mining = data['ethstats:nodeStatistics']['ethstats:isMining'] ? 'Yes' : 'No';
      }

      const blockNumberBlockData = data['ethstats:nodeBlockData']
        ? data['ethstats:nodeBlockData']['ethon:number'] : 0;
      const blockNumberFromSyncInfo = data['ethstats:nodeSyncInfo']
        ? data['ethstats:nodeSyncInfo']['ethstats:currentBlock'] : 0;
      const takeDataFromBlock = blockNumberBlockData >= blockNumberFromSyncInfo && blockNumberBlockData >= nodeLastBlockNumber;

      if (blockNumberBlockData > 0 || blockNumberFromSyncInfo > 0) {
        if (takeDataFromBlock) {
          propChartData = this.prepareChartData(
            data['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationChartData'],
            'propagation'
          );
          lastBlock = '#' + numberWithCommas(data['ethstats:nodeBlockData']['ethon:number']);
          lastBlockHash = trimValue(data['ethstats:nodeBlockData']['ethon:blockHash']);
          lastBlockTxCount = data['ethstats:nodeBlockData']['alethio:numberOfTxs'];
          lastBlockUnclesCount = data['ethstats:nodeBlockData']['alethio:numberOfUncles'];

          lastBlockPropTime = data['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'];
          if (parseInt(lastBlockPropTime, 10) < 1000) {
            lastBlockPropTime = lastBlockPropTime + ' ms';
          } else if (parseInt(lastBlockPropTime, 10) >= 1000 && parseInt(lastBlockPropTime, 10) < 60000) {
            lastBlockPropTime = parseFloat((lastBlockPropTime / 1000).toFixed(1)) + 's';
          } else {
            lastBlockPropTime = parseFloat((lastBlockPropTime / 60000).toFixed(1)) + 'min';
          }

          propAvg = data['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'];
          if (parseInt(propAvg, 10) < 1000) {
            propAvg = propAvg.toFixed(1) + ' ms';
          } else if (parseInt(propAvg, 10) >= 1000 && parseInt(propAvg, 10) < 60000) {
            propAvg = parseFloat((propAvg / 1000).toFixed(1)) + 's';
          } else {
            propAvg = parseFloat((propAvg / 60000).toFixed(1)) + 'min';
          }
        } else {
          lastBlock = '#' + numberWithCommas(nodeLastBlockNumber > blockNumberFromSyncInfo ? nodeLastBlockNumber : blockNumberFromSyncInfo);
          lastBlockHash = '(syncing)';
          lastBlockTxCount = 'N/A';
          lastBlockUnclesCount = 'N/A';
          lastBlockPropTime = 'N/A';
          propAvg = 'N/A';
        }
      }
    }
    return shouldBeVisible ? (
      <Container>
        <Pin pinned={pinned} ethNodeName={ethNodeName} onClick={this.props.updateNodePinCallback} />
        <FlexBox onClick={() => {this.handleNodeClick(shortNodeName);}}>
          <Detail width="235px" color={colors.nameColor} doubleGrow data-tip data-for={`viewDetails-${shortNodeName}`}>{shortNodeName}
            <ReactTooltip id={`viewDetails-${shortNodeName}`} place="bottom" className="tooltip-custom">
              <span>View details</span>
            </ReactTooltip>
          </Detail>
          <Detail width="95px" color={colors.nameColor} data-tip data-for={`viewNodeType-${shortNodeName}`}>{nodeType}
            <ReactTooltip id={`viewNodeType-${shortNodeName}`} place="bottom" className="tooltip-custom">
              <span>{data['ethstats:nodeData']['ethstats:node'] ? data['ethstats:nodeData']['ethstats:node'] : 'N/A' }</span>
            </ReactTooltip>
          </Detail>
          <Detail width="65px" color={colors.latencyColor} data-tip data-for={`viewDetails-${shortNodeName}`}>{latency}</Detail>
          <Detail width="70px" color={colors.nameColor} data-tip data-for={`viewNodeCoinbase-${shortNodeName}`}>{((['clique', 'ibft2'].includes(NETWORK_ALGO)) ? isValidator : mining)}
            <ReactTooltip id={`viewNodeCoinbase-${shortNodeName}`} place="bottom" className="tooltip-custom">
              <span>Address: {data['ethstats:nodeData']['ethstats:coinbase'] ? data['ethstats:nodeData']['ethstats:coinbase'] : 'N/A' }</span>
            </ReactTooltip>
          </Detail>
          <Detail width="50px" color={colors.nameColor} data-tip data-for={`viewDetails-${shortNodeName}`}>{peers}</Detail>
          <Detail width="160px" color={colors.blockColor} data-tip data-for={`viewDetails-${shortNodeName}`}>{lastBlock}<span className="space"/>{lastBlockHash}</Detail>
          <Detail width="75px" color={colors.nameColor} data-tip data-for={`viewDetails-${shortNodeName}`}>{lastBlockTxCount}</Detail>
          <Detail width="55px" color={colors.nameColor} data-tip data-for={`viewDetails-${shortNodeName}`}>{lastBlockUnclesCount}</Detail>
          <Counter
            nodeIsActive={data['ethstats:nodeData']['ethstats:nodeIsActive']}
            receivedTimestamp={data['ethstats:nodeBlockData'] && data['ethstats:nodeBlockData']['ethstats:receivedTimestamp'].toString()}
            blockNumber={data['ethstats:nodeBlockData'] && parseInt(data['ethstats:nodeBlockData']['ethon:number'], 10)}
            syncBlockNumber={data['ethstats:nodeSyncInfo'] && parseInt(data['ethstats:nodeSyncInfo']['ethstats:currentBlock'], 10)}
          />
          <Detail width="260px" color={colors.propTimeColor}>
            <JustFlex>
              <PaddedProp>{lastBlockPropTime}</PaddedProp>
              {propChartData && <NodePropagationChart dataKey="propagation" data={propChartData} color={colors.nameColor} measureUnit="ms"/> }
            </JustFlex>
          </Detail>
          <Detail width="75px" color={colors.avgPropColor} rightSide data-tip data-for={`viewDetails-${shortNodeName}`}>{propAvg}</Detail>
          <Detail width="60px" color={colors.uptimeColor} rightSide data-tip data-for={`viewDetails-${shortNodeName}`}>{uptime}</Detail>
        </FlexBox>
      </Container>
    ) : null;
  }
}

const mapStateToProps = (state, props) => {
  return nodeDataSelector(state, props);
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNodeName: (shortNodeName) => dispatch(getNodeNameAction(shortNodeName)),
    showNodeHistoryModal: () => dispatch(showNodeHistoryModalAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeItem);
