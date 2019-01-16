import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { numberWithCommas, convertHashes } from 'utils/helpers';
import Title from '../Title';
import Value from '../Value';


class TopLeft extends React.Component {
  handleClickAction(data, index) {
    let blockNr = data.match(/\d/g);
    blockNr = blockNr.join('');
    window.open(`https://ethstats.io/block/${blockNr}`, '_blank');
  }
  render() {
    const { mainTitle, color, chartStateData, reducerName } = this.props;
    let finalValue = '';
    if (chartStateData) {
      if (reducerName === 'lastBlock') {
        finalValue = '#' + numberWithCommas(chartStateData['ethon:number']);
      } else if (reducerName === 'blockDifficulty') {
        finalValue = convertHashes(chartStateData[chartStateData.length - 1]['ethon:blockDifficulty']);
      } else if (reducerName === 'gasLimit') {
        finalValue = numberWithCommas(chartStateData[chartStateData.length - 1]['ethon:blockGasLimit']);
      }
    }
    return (
      <div>
        <Title>{mainTitle}</Title>
        { chartStateData &&
          <Value color={color} onClick={ reducerName === 'lastBlock' ? () => this.handleClickAction(finalValue) : null }
            className={ reducerName === 'lastBlock' ? 'pointer' : ''}>
            {finalValue}
          </Value> }
      </div>
    );
  }
}

TopLeft.propTypes = {
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
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopLeft);
