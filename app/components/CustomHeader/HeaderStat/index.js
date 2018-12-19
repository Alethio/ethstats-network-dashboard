import React from 'react';
import PropTypes from 'prop-types';
import Container from '../ActiveNodes/Container';

export default class HeaderStat extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
  };
  render() {
    return (
      <Container color={this.props.color}>
        {this.props.children}
      </Container>
    );
  }
}
