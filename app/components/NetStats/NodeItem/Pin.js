import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Bullet from './Bullet';

const InnerPin = styled.div`
  width: 14px;
  height: 14px;
  border: 2px solid ${props => props.pinned ? props.theme.colors.teal : props.theme.colors.line_color };
  border-radius: 100px;
  margin: 20px 20px 21px 21px;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
`;

export default class Pin extends React.Component {
  static propTypes = {
    pinned: PropTypes.bool,
    onClick: PropTypes.func,
    ethNodeName: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      showBullet: false,
    };
  }
  onClick = () => {
    this.props.onClick(this.props.ethNodeName, !this.props.pinned);
  };
  onMouseEnter = () => {
    this.setState({ showBullet: true });
  };
  onMouseLeave = () => {
    this.setState({ showBullet: false });
  };
  render() {
    const {
      /* eslint-disable-next-line */
      onClick,
      ...otherProps
    } = this.props;
    return (
      <InnerPin {...otherProps} onClick={this.onClick} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {this.props.pinned ? <Bullet /> : this.state.showBullet ? <Bullet className="dimmed"/> : null}
      </InnerPin>
    );
  }
}
