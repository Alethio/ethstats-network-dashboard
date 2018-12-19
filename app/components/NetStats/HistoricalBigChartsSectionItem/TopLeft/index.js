import React from 'react';
import PropTypes from 'prop-types';

import Title from 'components/NetStats/BigChartsSectionItem/Title';
import Value from 'components/NetStats/BigChartsSectionItem/Value';


class TopLeft extends React.Component {
  render() {
    const { title, value, color } = this.props;
    return (
      <div>
        <Title>{title}</Title>
        <Value color={color}>
          {value}
        </Value>
      </div>
    );
  }
}

TopLeft.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
};

export default TopLeft;
