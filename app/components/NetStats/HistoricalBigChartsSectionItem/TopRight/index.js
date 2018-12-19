import React from 'react';
import PropTypes from 'prop-types';
import SmallTitle from 'components/NetStats/BigChartsSectionItem/SmallTitle';
import SmallValue from 'components/NetStats/BigChartsSectionItem/SmallValue';
import Container from 'components/NetStats/BigChartsSectionItem/TopRight/Container';


class TopRight extends React.Component {
  render() {
    const { title, value, color } = this.props;
    return (
      <Container>
        <SmallTitle padded>{title}</SmallTitle>
        <SmallValue color={color}>{value}</SmallValue>
      </Container>
    );
  }
}

TopRight.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
};

export default TopRight;
