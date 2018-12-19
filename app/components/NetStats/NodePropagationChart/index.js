import React from 'react';
import PropTypes from 'prop-types';
import {BarChart, Bar, Tooltip, YAxis} from 'recharts';
import ChartTooltip from 'components/ChartTooltip';

class NodePropagationChart extends React.Component {
  handleClickAction(data, index) {
    // browserHistory.push(`Block_${data['block'].replace(/,/g, '').replace(/\s/g, '')}`);
  }
  render() {
    const {data, dataKey, tooltipKey, measureUnit, hasDomain, hasNavigation, color} = this.props;
    const RoundedBar = (props) => {
      const {fill, x, y, height} = props;

      return (
        <g>
          <rect id="Rectangle-3" x={x} y={y} width="3" height={height} fill={fill} rx="1"/>
          <rect id="Rectangle-3" x={x - 1} y="0" width="4" height="80" fill={fill} fillOpacity="0" rx="1"/>
        </g>
      );
    };
    let min;
    let max;
    if (hasDomain) {
      min = Math.min(...data.map(item => item.dataKey));
      max = Math.max(...data.map(item => item.dataKey));
    }
    return (
      <BarChart width={200} height={15} data={data} margin={{top: 0, right: 0, left: 0, bottom: 0}} className="pointer">
        <Tooltip offset={15} content={<ChartTooltip dataKey={dataKey} tooltipKey={tooltipKey} measureUnit={measureUnit}/>}/>
        { hasNavigation ?
          <Bar dataKey={dataKey} minPointSize={3} isAnimationActive={false} fill={color} shape={<RoundedBar/>} onClick={this.handleClickAction}/>
          : <Bar dataKey={dataKey} minPointSize={3} isAnimationActive={false} fill={color} shape={<RoundedBar/>} />}
        {hasDomain && <YAxis orientation="left" domain={[min, max]} hide/>}
      </BarChart>
    );
  }
}

NodePropagationChart.propTypes = {
  data: PropTypes.array,
  dataKey: PropTypes.string,
  tooltipKey: PropTypes.string,
  measureUnit: PropTypes.string,
  color: PropTypes.string,
  hasDomain: PropTypes.bool,
  hasNavigation: PropTypes.bool,
};

export default NodePropagationChart;
