import React from 'react';
import PropTypes from 'prop-types';
import Container from './Container';
import Spinner from './Spinner';
import spinnerImgRes from 'app/resources/img/Eclipse.svg';

class HistoricalChartSpinner extends React.Component {
  render() {
    return (
      <Container height={this.props.height} color={this.props.color}>
        <Spinner src={spinnerImgRes}/>
      </Container>
    );
  }
}

HistoricalChartSpinner.propTypes = {
  height: PropTypes.string,
  color: PropTypes.string,
};

export default HistoricalChartSpinner;
