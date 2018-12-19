import React from 'react';
import PropTypes from 'prop-types';


class Counter extends React.Component {
  constructor(props) {
    super(props);
    let diff;
    if (props.lastBlock) {
      diff = Math.floor(Date.now() / 1000) - Math.floor(Date.parse(props.lastBlock['ethstats:receivedTimestamp']) / 1000);
      diff = Math.max(0, diff);
    } else {
      diff = 0;
    }
    this.state = {
      secondsElapsed: diff,
    };
  }
  tick () {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  }
  componentDidMount() {
    this.interval = setInterval(::this.tick, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  componentWillReceiveProps() {
    this.setState({secondsElapsed: 0});
  }
  render() {
    return (
      <div>
        {this.state.secondsElapsed}s ago
      </div>
    );
  }
}

Counter.propTypes = {
  lastBlock: PropTypes.object,
};

export default Counter;

