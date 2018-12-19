import React from 'react';
import PropTypes from 'prop-types';
import Container from 'components/NetStats/SmallChartsSectionItem/Container';
import Title from 'components/NetStats/SmallChartsSectionItem/Title';
import HistoricalSmallChart from 'components/NetStats/HistoricalSmallChart';

class HistoricalSmallChartsSectionItem extends React.Component {
  render() {
    const { title, color, dataKey, tooltipKey, measureUnit, hasDomain, full, reducerName, labelPrefix, valuePrefix, chartData, hasNavigation } = this.props;
    return (
      <Container>
        <Title>{ title }</Title>
        <HistoricalSmallChart
          color={ color }
          dataKey={ dataKey }
          tooltipKey={ tooltipKey }
          measureUnit={ measureUnit }
          hasDomain={ hasDomain }
          full={full}
          chartReducer={reducerName}
          valuePrefix={valuePrefix}
          labelPrefix={labelPrefix}
          chartData={chartData}
          hasNavigation={hasNavigation}
        />
      </Container>
    );
  }
}

HistoricalSmallChartsSectionItem.propTypes = {
  title: PropTypes.string,
  dataKey: PropTypes.string,
  measureUnit: PropTypes.string,
  tooltipKey: PropTypes.string,
  color: PropTypes.string,
  reducerName: PropTypes.string,
  valuePrefix: PropTypes.string,
  labelPrefix: PropTypes.string,
  hasDomain: PropTypes.bool,
  hasNavigation: PropTypes.bool,
  full: PropTypes.bool,
  chartData: PropTypes.array,
};

export default HistoricalSmallChartsSectionItem;
