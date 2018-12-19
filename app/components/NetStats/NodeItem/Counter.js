import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Detail from './Detail';
import {convertDurations} from '../../../utils/helpers';

class Counter extends React.Component {
  static propTypes = {
    // props given directly
    nodeIsActive: PropTypes.bool,
    receivedTimestamp: PropTypes.string,
    blockNumber: PropTypes.number,
    syncBlockNumber: PropTypes.number,
    // props given by redux
    tickTimer: PropTypes.number,
  };

  constructor(props) {
    super(props);
    const secondsElapsed = this.initialSecondsElapsed(props);
    this.state = {
      secondsElapsed,
      tickTimer: null,
    };
  }
  componentWillReceiveProps(nextProps) {
    const newState = {};
    if (this.props.tickTimer === null && nextProps.tickTimer !== null) {
      newState.tickTimer = nextProps.tickTimer;
    }
    if (this.directPropsChanged(nextProps, this.props)) {
      const secondsElapsed = this.initialSecondsElapsed(nextProps);
      newState.secondsElapsed = secondsElapsed;
      newState.tickTimer = nextProps.tickTimer;
    } else {
      if (this.timerShouldIncrement(nextProps)) {
        newState.secondsElapsed = this.state.secondsElapsed + 1;
      }
    }
    this.setState(newState);
  }
  shouldComponentUpdate(nextProps) {
    return this.directPropsChanged(nextProps, this.props) ? true : this.timerShouldIncrement(nextProps);
  }
  initialSecondsElapsed(p) {
    const { blockNumber, syncBlockNumber, receivedTimestamp } = p;
    let diff;
    if (blockNumber > syncBlockNumber) {
      diff = receivedTimestamp ?
        Math.max(0, Math.round((Date.now() / 1000) - (Date.parse(receivedTimestamp) / 1000)))
        : 0;
    } else {
      diff = 0;
    }
    return diff;
  }
  directPropsChanged(nextProps, props) {
    return (
      nextProps.nodeIsActive !== props.nodeIsActive
      || nextProps.receivedTimestamp !== props.receivedTimestamp
      || nextProps.blockNumber !== props.blockNumber
      || nextProps.syncBlockNumber !== props.syncBlockNumber
    );
  }
  timerShouldIncrement(nextProps) {
    return (nextProps.tickTimer === this.state.tickTimer);
  }

  render() {
    let lastBlockTime = 'N/A';
    let lastBlockTimeColor = '#324156';

    if (this.props.nodeIsActive) {
      lastBlockTime = convertDurations(this.state.secondsElapsed * 1000, 0) + ' ago';
      if (this.state.secondsElapsed <= 13) {
        lastBlockTimeColor = '#50E9D2';
      } else if (this.state.secondsElapsed > 13 && this.state.secondsElapsed <= 25) {
        lastBlockTimeColor = '#EFC865';
      } else {
        lastBlockTimeColor = '#EF6C6C';
      }
    } else {
      lastBlockTime = 'N/A';
      lastBlockTimeColor = '#324156';
    }

    return (
      <Detail width="80px" color={lastBlockTimeColor}>{lastBlockTime}</Detail>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tickTimer: state.global.tickTimer,
  };
};

export default connect(
  mapStateToProps,
  null
)(Counter);
