import React from 'react';
import PropTypes from 'prop-types';
import SmallTitle from '../SmallTitle';
import SmallValue from '../SmallValue';
import {connect} from 'react-redux';
import { BigNumber }  from 'bignumber.js';
import { numberWithCommas, convertHashes, prepareChartData } from 'utils/helpers';

class BottomLeft extends React.Component {
  render() {
    const { mainTitle, color, chartStateData, reducerName } = this.props;
    const content = [];
    if (reducerName === 'blockTime') {
      if (chartStateData) {
        const chartData = prepareChartData(chartStateData.slice(chartStateData.length - this.props.numberOfBars, chartStateData.length), 'ethstats:blockTime');
        let sum = 0;
        for (let i = 0; i < chartData.length; i++ ){
          sum = sum + chartData[i]['ethstats:blockTime'];
        }
        const avg = sum / chartData.length;
        content.push(<div key={reducerName}>{avg.toFixed(2)}s</div>);
      }
    } else if ( reducerName === 'gasLimit') {
      if (chartStateData) {
        const chartData = prepareChartData(chartStateData.slice(chartStateData.length - this.props.numberOfBars, chartStateData.length), 'ethon:blockGasLimit');
        let sum = 0;
        for (let i = 0; i < chartData.length; i++ ){
          sum = sum + chartData[i]['ethon:blockGasLimit'];
        }
        const avg = sum / chartData.length;
        content.push(<div key={reducerName}>{numberWithCommas(parseInt(avg, 10))} gas</div>);
      }
    } else if ( reducerName === 'blockDifficulty') {
      if (chartStateData) {
        const chartData = prepareChartData(chartStateData.slice(chartStateData.length - this.props.numberOfBars, chartStateData.length), 'ethon:blockDifficulty');
        let sum = new BigNumber(0);
        for (let i = 0; i < chartData.length; i++) {
          sum = sum.plus(BigNumber(chartData[i]['ethon:blockDifficulty']));
        }
        const avg = sum.dividedBy(chartData.length);
        content.push(<div key={reducerName}>{numberWithCommas(convertHashes(parseInt(avg, 10), 4))}</div>);
      }
    }
    return (
      <div>
        <SmallTitle>{mainTitle}</SmallTitle>
        <SmallValue color={color}>{chartStateData && content}</SmallValue>
      </div>
    );
  }
}

BottomLeft.propTypes = {
  mainTitle: PropTypes.string,
  color: PropTypes.string,
  reducerName: PropTypes.string,
  chartStateData: PropTypes.any,
  loadPageLatency: PropTypes.func,
  numberOfBars: PropTypes.number,
};


const mapStateToProps = (state, props) => {
  return {
    chartStateData: state[props.reducerName].data,
    numberOfBars: state.global.bigChartBarCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomLeft);

