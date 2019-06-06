import React from 'react';
import PropTypes from 'prop-types';
import { numberWithCommas, trimValue } from 'utils/helpers';
import ReactTooltip from 'react-tooltip';
import Container from 'components/NetStats/NodeItem/Container';
import Pin from 'components/NetStats/NodeItem/Pin';
import Detail from 'components/NetStats/NodeItem/Detail';
import FlexBox from 'components/NetStats/NodeItem/FlexBox';
import JustFlex from 'components/NetStats/NodeItem/JustFlex';
import PaddedProp from 'components/NetStats/NodeItem/PaddedProp';
import NodePropagationChart from 'components/NetStats/NodePropagationChart';
import { NETWORK_ALGO } from 'config';

class HistoricalNodeItem extends React.Component {
  static propTypes = {
    // props given directly
    pinned: PropTypes.bool,
    updateNodePinCallback: PropTypes.func,
    nodeData: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.timerHandle = undefined;

    this.state = {
      shouldBeRendered: false,
    };
  }
  componentDidMount() {
    if (this.props.nodeData) {
      const propTime = this.props.nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'];
      if (propTime === 0) {
        this.setState({
          shouldBeRendered: true,
        });
      } else if (propTime > 0 && propTime <= 5000 ) {
        this.timerHandle = setTimeout(() => {
          this.setState({
            shouldBeRendered: true
          });
        }, propTime);
      } else {
        this.timerHandle = setTimeout(() => {
          this.setState({
            shouldBeRendered: true
          });
        }, 5000);
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.nodeData) {
      if (nextProps.nodeData !== this.props.nodeData) {
        if (this.timerHandle !== 0) {
          clearTimeout(this.timerHandle);
        }
        this.setState({
          shouldBeRendered: false,
        });
      }
      const propTime = nextProps.nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'];
      if (propTime === 0) {
        this.setState({
          shouldBeRendered: true,
        });
      } else if (propTime > 0 && propTime <= 5000 ) {
        this.timerHandle = setTimeout(() => {
          this.setState({
            shouldBeRendered: true
          });
        }, propTime);
      } else {
        this.timerHandle = setTimeout(() => {
          this.setState({
            shouldBeRendered: true
          });
        }, 5000);
      }
    }
  }
  componentWillUnmount() {
    if (this.timerHandle !== 0) {
      clearTimeout(this.timerHandle);
    }
  }

  getColors() {
    const { nodeData } = this.props;
    if (!nodeData || !nodeData['ethstats:nodeData']['ethstats:nodeIsActive']) {
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
    if (nodeData['ethstats:nodeStatistics']) {
      if (nodeData['ethstats:nodeStatistics']['ethstats:numberOfPeers'] < 4) {
        colors.nameColor = '#EFC865';
      }
      if (nodeData['ethstats:nodeStatistics']['ethstats:numberOfPeers'] <= 1) {
        colors.nameColor = '#EF6C6C';
      }
    } else {
      colors.nameColor = '#EF6C6C';
    }

    // latency checker
    if (nodeData['ethstats:nodeData']['ethstats:wsLatency'] > 100 && nodeData['ethstats:nodeData']['ethstats:wsLatency'] <= 1000) {
      colors.latencyColor = '#EFC865';
    } else if (nodeData['ethstats:nodeData']['ethstats:wsLatency'] > 1000) {
      colors.latencyColor = '#EF6C6C';
    }

    // block checker && propagation checker
    if (nodeData['ethstats:nodeBlockData']) {
      // avg prop
      if (nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] === 0) {
        colors.avgPropColor = '#2774FE';
      } else if (nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] > 0 && nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] < 1000) {
        colors.avgPropColor = '#50E9D2';
      } else if (nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] >= 1000 && nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] < 3000) {
        colors.avgPropColor = '#EFC865';
      } else if (nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'] >= 3000) {
        colors.avgPropColor = '#EF6C6C';
      }
      // prop time
      if (nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] === 0) {
        colors.propTimeColor = '#2774FE';
      } else if (nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] > 0 && nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] < 1000) {
        colors.propTimeColor = '#50E9D2';
      } else if (nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] >= 1000 && nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] < 3000) {
        colors.propTimeColor = '#EFC865';
      } else if (nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'] >= 3000) {
        colors.propTimeColor = '#EF6C6C';
      }
    } else {
      colors.blockColor = '#EF6C6C';
      colors.avgPropColor = '#324156';
      colors.propTimeColor = '#324156';
    }

    // uptime checker
    if (nodeData['ethstats:nodeData']['ethstats:onlineTimePercent'] < 90 && nodeData['ethstats:nodeData']['ethstats:onlineTimePercent'] >= 75) {
      colors.uptimeColor = '#EFC865';
    } else if (nodeData['ethstats:nodeData']['ethstats:onlineTimePercent'] < 75) {
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
  render() {
    const { nodeData, pinned } = this.props;
    let ethNodeName = 'N/A';
    let shortNodeName = 'N/A';
    let colors,
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
    if (nodeData && Object.keys(nodeData).length !== 0 && nodeData.constructor === Object) {
      colors = this.getColors();
      shortNodeName = nodeData['ethstats:nodeData']['ethstats:nodeName'];
      ethNodeName = 'ethstats/nodes/' + nodeData['ethstats:nodeData']['ethstats:nodeName'];

      nodeType = nodeData['ethstats:nodeData']['ethstats:node'] ? nodeData['ethstats:nodeData']['ethstats:node'].split('/')[0] : 'N/A';
      latency = nodeData['ethstats:nodeData']['ethstats:nodeIsActive']
        ? nodeData['ethstats:nodeData']['ethstats:wsLatency'] + ' ms'
        : 'offline';
      uptime = nodeData['ethstats:nodeData']['ethstats:onlineTimePercent']
        ? parseFloat(nodeData['ethstats:nodeData']['ethstats:onlineTimePercent'].toFixed(2), 10) + '%'
        : 'N/A';
      isValidator = nodeData['ethstats:nodeData']['ethstats:nodeIsValidator'] ? 'Yes' : 'No';
      if (nodeData['ethstats:nodeStatistics']) {
        peers = nodeData['ethstats:nodeStatistics']['ethstats:numberOfPeers'];
        mining = nodeData['ethstats:nodeStatistics']['ethstats:isMining'] ? 'Yes' : 'No';
      }

      propChartData = this.prepareChartData(
        nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationChartData'],
        'propagation'
      );
      lastBlock = '#' + numberWithCommas(nodeData['ethstats:nodeBlockData']['ethon:number']);
      lastBlockHash = trimValue(nodeData['ethstats:nodeBlockData']['ethon:blockHash']);
      lastBlockTxCount = nodeData['ethstats:nodeBlockData']['alethio:numberOfTxs'];
      lastBlockUnclesCount = nodeData['ethstats:nodeBlockData']['alethio:numberOfUncles'];

      lastBlockPropTime = nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'];
      if (parseInt(lastBlockPropTime, 10) < 1000) {
        lastBlockPropTime = lastBlockPropTime + ' ms';
      } else if (parseInt(lastBlockPropTime, 10) >= 1000 && parseInt(lastBlockPropTime, 10) < 60000) {
        lastBlockPropTime = parseFloat((lastBlockPropTime / 1000).toFixed(1)) + 's';
      } else {
        lastBlockPropTime = parseFloat((lastBlockPropTime / 60000).toFixed(1)) + 'min';
      }

      propAvg = nodeData['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'];
      if (parseInt(propAvg, 10) < 1000) {
        propAvg = propAvg.toFixed(1) + ' ms';
      } else if (parseInt(propAvg, 10) >= 1000 && parseInt(propAvg, 10) < 60000) {
        propAvg = parseFloat((propAvg / 1000).toFixed(1)) + 's';
      } else {
        propAvg = parseFloat((propAvg / 60000).toFixed(1)) + 'min';
      }
    }
    return this.state.shouldBeRendered ? (
      <Container>
        <Pin pinned={pinned} ethNodeName={ethNodeName} onClick={this.props.updateNodePinCallback} />
        <FlexBox>
          <Detail width="235px" color={colors.nameColor} doubleGrow>{shortNodeName}</Detail>
          <Detail width="95px" color={colors.nameColor} data-tip data-for={`viewNodeType-${shortNodeName}`}>{nodeType}
            <ReactTooltip id={`viewNodeType-${shortNodeName}`} place="bottom" className="tooltip-custom">
              <span>{nodeData['ethstats:nodeData']['ethstats:node'] ? nodeData['ethstats:nodeData']['ethstats:node'] : 'N/A' }</span>
            </ReactTooltip>
          </Detail>
          <Detail width="65px" color={colors.latencyColor}>{latency}</Detail>
          <Detail width="70px" color={colors.nameColor} data-tip data-for={`viewNodeCoinbase-${shortNodeName}`}>{((['clique', 'ibft2'].includes(NETWORK_ALGO)) ? isValidator : mining)}
            <ReactTooltip id={`viewNodeCoinbase-${shortNodeName}`} place="bottom" className="tooltip-custom">
              <span>Address: {nodeData['ethstats:nodeData']['ethstats:coinbase'] ? nodeData['ethstats:nodeData']['ethstats:coinbase'] : 'N/A' }</span>
            </ReactTooltip>
          </Detail>
          <Detail width="50px" color={colors.nameColor}>{peers}</Detail>
          <Detail width="160px" color={colors.blockColor}>{lastBlock}<span className="space"/>{lastBlockHash}</Detail>
          <Detail width="75px" color={colors.nameColor}>{lastBlockTxCount}</Detail>
          <Detail width="55px" color={colors.nameColor}>{lastBlockUnclesCount}</Detail>
          <Detail width="260px" color={colors.propTimeColor}>
            <JustFlex>
              <PaddedProp>{lastBlockPropTime}</PaddedProp>
              {propChartData && <NodePropagationChart dataKey="propagation" data={propChartData} color={colors.nameColor} measureUnit="ms"/> }
            </JustFlex>
          </Detail>
          <Detail width="75px" color={colors.avgPropColor} rightSide>{propAvg}</Detail>
        </FlexBox>
      </Container>
    ) : null;
  }
}

export default HistoricalNodeItem;
