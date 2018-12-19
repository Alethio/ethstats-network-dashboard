import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from './Container';

class ActiveNodes extends React.Component {
  render() {
    const { nodesData } = this.props;
    const nodesKeys = Object.keys(nodesData);
    const activeCounter = nodesKeys.reduce((innerCounter, item) => {
      if (nodesData[item]['ethstats:nodeData']) {
        if (nodesData[item]['ethstats:nodeData']['ethstats:nodeIsActive']) {
          innerCounter.active++;
        }
        innerCounter.total++;
        return innerCounter;
      }
      return innerCounter;
    }, {active: 0, total: 0});
    return (
      <Container>
        {activeCounter.active}/{activeCounter.total}
      </Container>
    );
  }
}

ActiveNodes.propTypes = {
  nodesData: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    nodesData: state.nodesData.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveNodes);

