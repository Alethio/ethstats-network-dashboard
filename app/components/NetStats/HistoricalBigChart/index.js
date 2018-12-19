import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { BarChart, Bar, Tooltip, YAxis, ReferenceLine } from 'recharts';
import { convertHashes, numberWithCommas } from 'utils/helpers';
import { BigNumber }  from 'bignumber.js';
import ChartTooltip from 'components/ChartTooltip';
import Spinner from '../BigChartsSectionItem/Spinner';
import SpinnerContainer from 'components/NetStats/BigChart/SpinnerContainer';
import Container from 'components/NetStats/BigChart/Container';
import Label from 'components/NetStats/BigChart/Label';
import Value from 'components/NetStats/BigChart/Value';
import spinner from 'resources/img/Eclipse.svg';
const BAR_WIDTH = 8;
const CHART_HEIGHT = 91;
const CHART_MARGINS = {
  top: 25,
  right: 0,
  left: 0,
  bottom: 0
};


class HistoricalBigChart extends Component {
  handleClickAction(data, index) {
    browserHistory.push(`/history/block/${data['block'].replace(/,/g, '').replace(/\s/g, '')}`);
  }
  render() {
    const {dataKey, tooltipKey, measureUnit, hasDomain, hasNavigation, color, chartData, labelPrefix, valuePrefix} = this.props;
    let data = [];
    let RoundedBar;
    let min;
    let max;
    let minValueString = '';
    let maxValueString = '';
    let avg = 0;
    let sum = 0;
    let chartColor;
    const minPointSize = 1;
    if (chartData) {
      data = chartData.slice(chartData.slice.length - this.props.numberOfBars, chartData.length);
      RoundedBar = (props) => {
        const {fill, x, y, height} = props;

        return (
          <g>
            <rect id="Rectangle-3" x={x} y={y} width="5" height={height} fill={fill} rx="1"/>
            <rect id="Rectangle-3" x={x - 1} y="0" width="7" height="80" fill={fill} fillOpacity="0" rx="1"/>
          </g>
        );
      };
      if (hasDomain && chartData) {
        min = Math.min(...data.map(item => item[dataKey]));
        max = Math.max(...data.map(item => item[dataKey]));
        if (dataKey === 'ethstats:blockTime') {
          minValueString = min + 's';
          maxValueString = max + 's';
          sum = 0;
          for (let i = 0; i < data.length; i++) {
            sum = sum + data[i]['ethstats:blockTime'];
          }
          avg = sum / data.length;
          chartColor = '#2774FE';
        } else if (dataKey === 'ethon:blockDifficulty') {
          minValueString = convertHashes(min, 4);
          maxValueString = convertHashes(max, 4);
          sum = new BigNumber(0);
          for (let i = 0; i < data.length; i++) {
            sum = sum.plus(BigNumber(data[i]['ethon:blockDifficulty']));
          }
          avg = sum.dividedBy(data.length);
          avg = avg.toString();
          chartColor = '#EFC865';
        } else if (dataKey === 'ethon:blockGasLimit') {
          minValueString = numberWithCommas(min) + 'gas';
          maxValueString = numberWithCommas(max) + 'gas';
          sum = new BigNumber(0);
          for (let i = 0; i < data.length; i++) {
            sum = sum.plus(BigNumber(data[i]['ethon:blockGasLimit']));
          }
          avg = sum.dividedBy(data.length);
          avg = avg.toString();
          chartColor = '#8399B8';
        }
      }
    }
    return (
      <div>
        { chartData ?
          <div>
            <BarChart
              width={this.props.numberOfBars * BAR_WIDTH} height={CHART_HEIGHT} data={data}
              margin={CHART_MARGINS}
              className="pointer">
              <defs>
                <linearGradient x1="50%" y1="3.061617e-15%" x2="50%" y2="100%" id="barGradient">
                  <stop stopColor="#40FFFF" offset="0%"/>
                  <stop stopColor="#358BFF" offset="100%"/>
                </linearGradient>
              </defs>
              <Tooltip offset={0} wrapperStyle={{top: '60px', zIndex: 100}} content={<ChartTooltip dataKey={dataKey} tooltipKey={tooltipKey} measureUnit={measureUnit} valuePrefix={valuePrefix} labelPrefix={labelPrefix}/>}/>
              { hasNavigation ?
                <Bar dataKey={dataKey} minPointSize={minPointSize} isAnimationActive={false} fill={color} shape={<RoundedBar/>} onClick={this.handleClickAction}/>
                : <Bar dataKey={dataKey} minPointSize={minPointSize} isAnimationActive={false} fill={color} shape={<RoundedBar/>} />}
              {hasDomain && <YAxis orientation="left" domain={[min, max]} hide/>}
              <ReferenceLine y={avg} label="" stroke={chartColor} />
            </BarChart>
            <Container spaceBetween padded>
              <Container>
                <Label className="white">Min.</Label>
                <Value>{minValueString}</Value>
              </Container>
              <Container>
                <Label className="red">Max.</Label>
                <Value>{maxValueString}</Value>
              </Container>
            </Container>
          </div> : <SpinnerContainer><Spinner src={spinner}/></SpinnerContainer> }
      </div>
    );
  }
}

HistoricalBigChart.propTypes = {
  chartData: PropTypes.array,
  dataKey: PropTypes.string,
  tooltipKey: PropTypes.string,
  measureUnit: PropTypes.string,
  valuePrefix: PropTypes.string,
  labelPrefix: PropTypes.string,
  color: PropTypes.string,
  hasDomain: PropTypes.bool,
  hasNavigation: PropTypes.bool,
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
)(HistoricalBigChart);

