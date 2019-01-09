import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {BarChart, ComposedChart, Line, Bar, Tooltip, YAxis} from 'recharts';
import ChartTooltip from 'components/ChartTooltip';
import {prepareChartData, prepareUncleChartData, preparePropagationChartData, prepareETHPendingChartData, prepareGasPriceChartData} from 'utils/helpers';
import RoundedBar from './RoundedBar';
const BAR_WIDTH = 6;
const CHART_HEIGHT = 62;
const CHART_MARGINS = {
  top: 0,
  right: 0,
  left: 0,
  bottom: 0
};

class HistoricalSmallChart extends React.Component {
  handleClickAction(data, index) {
    browserHistory.push(`/history/block/${data['block'].replace(/,/g, '').replace(/\s/g, '')}`);
  }
  render() {
    const { dataKey, tooltipKey, measureUnit, hasDomain, hasNavigation, color, full, chartData, labelPrefix, valuePrefix} = this.props;
    let data = [];
    let min;
    let max;
    if (chartData) {
      if (dataKey === 'ethstats:count') {
        data = prepareUncleChartData(chartData.slice(chartData.length - this.props.numberOfBars, chartData.length), dataKey);
      } else if (dataKey === 'histogram') {
        data = preparePropagationChartData(chartData, dataKey);
      } else if (dataKey === 'totalValue') {
        data = prepareETHPendingChartData(chartData, dataKey);
      } else if (dataKey === 'gasPriceSum') {
        data = prepareGasPriceChartData(chartData, dataKey);
      } else {
        data = prepareChartData(chartData.slice(chartData.length - this.props.numberOfBars, chartData.length), dataKey);
      }
      if (hasDomain) {
        min = Math.min(...data.map(item => item.dataKey));
        max = Math.max(...data.map(item => item.dataKey));
      }
    }
    const RoundedBar = (props) => {
      const {fill, x, y, height} = props;

      return (
        <g>
          <rect id="Rectangle-3" x={x} y={y} width="4" height={height} fill={fill} rx="1"/>
          <rect id="Rectangle-3" x={x - 1} y="0" width="6" height="80" fill={fill} fillOpacity="0" rx="1"/>
        </g>
      );
    };
    let chartWidth = this.props.numberOfBars * BAR_WIDTH;
    if (full) {
      chartWidth = 297;
    }
    return (
      <div>
        {dataKey === 'histogram' ?
          <ComposedChart
            cursor="default"
            width={chartWidth} height={CHART_HEIGHT} data={data}
            margin={CHART_MARGINS}
            className="pointer">
            <Tooltip offset={0} wrapperStyle={{top: '-55px'}} content={<ChartTooltip dataKey={dataKey} tooltipKey={tooltipKey} measureUnit={measureUnit} full={full}/>}/>
            {hasNavigation ?
              <Bar dataKey={dataKey} minPointSize={1} isAnimationActive={false} fill={color} shape={<RoundedBar/>} onClick={this.handleClickAction}/>
              : <Bar dataKey={dataKey} minPointSize={1} isAnimationActive={false} fill={color} shape={<RoundedBar/>}/>}
            <Line type="monotone" dataKey={dataKey} stroke="#EFC865" dot={false} activeDot={false} strokeWidth="1"/>
            {hasDomain && <YAxis orientation="left" domain={[min, max]} hide/>}
          </ComposedChart> :
          dataKey === 'ethstats:count' ?
            <BarChart
              cursor={ hasNavigation ? 'pointer' : 'default'}
              width={chartWidth} height={CHART_HEIGHT} data={data}
              margin={CHART_MARGINS}
              className="pointer">
              <Tooltip offset={0} wrapperStyle={{top: '-50px'}} content={<ChartTooltip forUncles dataKey={dataKey} tooltipKey={tooltipKey} measureUnit={measureUnit} full={full} labelPrefix={labelPrefix} valuePrefix={valuePrefix}/>}/>
              {hasNavigation ?
                <Bar dataKey={dataKey} minPointSize={3} isAnimationActive={false} fill={color} shape={<RoundedBar/>} onClick={this.handleClickAction}/> :
                <Bar dataKey={dataKey} minPointSize={3} isAnimationActive={false} fill={color} shape={<RoundedBar/>}/>}
              {hasDomain && <YAxis orientation="left" domain={[min, max]} hide/>}
            </BarChart> :
            chartData ?
              <BarChart
                cursor={ hasNavigation ? 'pointer' : 'default'}
                width={chartWidth} height={CHART_HEIGHT} data={data}
                margin={CHART_MARGINS}
                className="pointer">
                <Tooltip offset={0} wrapperStyle={{top: '-50px'}} content={<ChartTooltip dataKey={dataKey} tooltipKey={tooltipKey} measureUnit={measureUnit} full={full} labelPrefix={labelPrefix} valuePrefix={valuePrefix}/>}/>
                {hasNavigation ?
                  <Bar dataKey={dataKey} minPointSize={3} isAnimationActive={false} fill={color} shape={<RoundedBar/>} onClick={this.handleClickAction}/> :
                  <Bar dataKey={dataKey} minPointSize={3} isAnimationActive={false} fill={color} shape={<RoundedBar/>}/>}
                {hasDomain && <YAxis orientation="left" domain={[min, max]} hide/>}
              </BarChart> : <div></div>
        }
      </div>
    );
  }
}

HistoricalSmallChart.propTypes = {
  dataKey: PropTypes.string,
  tooltipKey: PropTypes.string,
  measureUnit: PropTypes.string,
  chartReducer: PropTypes.string,
  valuePrefix: PropTypes.string,
  labelPrefix: PropTypes.string,
  color: PropTypes.string,
  hasDomain: PropTypes.bool,
  full: PropTypes.bool,
  hasNavigation: PropTypes.bool,
  chartData: PropTypes.array,
  numberOfBars: PropTypes.number,
};

const mapStateToProps = (state, props) => {
  return {
    numberOfBars: state.global.smallChartBarCount,
  };
};

export default connect(
  mapStateToProps,
  {}
)(HistoricalSmallChart);

