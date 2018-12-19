import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { convertHashes, converter, numberWithCommas } from 'utils/helpers';
import Container from './Container';
import Counter from '../../Counter';
import SmallTitle from '../SmallTitle';
import SmallValue from '../SmallValue';


class TopRight extends React.Component {
  render() {
    const { mainTitle, color, chartStateData, reducerName } = this.props;
    let finalValue = '';
    let content = [];
    if (chartStateData) {
      if (reducerName === 'lastBlock') {
        content.push(<SmallValue color={color} key={reducerName}><Counter lastBlock={chartStateData}/></SmallValue>);
      } else if (reducerName === 'avgNetworkHashrate') {
        finalValue = convertHashes(chartStateData) + '/s';
        content.push(<SmallValue color={color} key={reducerName}>{finalValue}</SmallValue>);
      } else if (reducerName === 'pendingLastBlock') {
        finalValue = numberWithCommas(converter(chartStateData.averageGasPrice, 'wei'));
        content.push(<SmallValue color={color} key={reducerName}>{finalValue}</SmallValue>);
      }
    }
    return (
      <Container>
        <SmallTitle padded>{mainTitle}</SmallTitle>
        { chartStateData && content }
      </Container>
    );
  }
}

TopRight.propTypes = {
  mainTitle: PropTypes.string,
  mainValue: PropTypes.string,
  color: PropTypes.string,
  reducerName: PropTypes.string,
  chartStateData: PropTypes.any,
};

const mapStateToProps = (state, props) => {
  return {
    chartStateData: state[props.reducerName].data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopRight);
