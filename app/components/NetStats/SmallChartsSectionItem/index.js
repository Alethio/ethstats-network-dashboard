import React from 'react';
import PropTypes from 'prop-types';
import Container from './Container';
import Title from './Title';
import SmallChart from 'components/NetStats/SmallChart';

class SmallChartsSectionItem extends React.Component {
  render() {
    const { title, color, dataKey, tooltipKey, measureUnit, hasDomain, full, reducerName, labelPrefix, valuePrefix, hasNavigation } = this.props;
    return (
      <Container>
        <Title>{ title }</Title>
        <SmallChart
          color={ color }
          dataKey={ dataKey }
          tooltipKey={ tooltipKey }
          measureUnit={ measureUnit }
          hasDomain={ hasDomain }
          full={ full }
          chartReducer={ reducerName }
          valuePrefix={ valuePrefix }
          labelPrefix={ labelPrefix }
          hasNavigation={ hasNavigation }
        />
      </Container>
    );
  }
}

SmallChartsSectionItem.propTypes = {
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
};

export default SmallChartsSectionItem;
