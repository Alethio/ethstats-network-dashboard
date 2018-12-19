import React from 'react';
import PropTypes from 'prop-types';
import SmallTitle from 'components/NetStats/BigChartsSectionItem/SmallTitle';
import SmallValue from 'components/NetStats/BigChartsSectionItem/SmallValue';

class BottomLeft extends React.Component {
  render() {
    const { title, value, color } = this.props;
    return (
      <div>
        <SmallTitle>{title}</SmallTitle>
        <SmallValue color={color}>{value}</SmallValue>
      </div>
    );
  }
}

BottomLeft.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
};

export default BottomLeft;

