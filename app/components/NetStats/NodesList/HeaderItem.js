import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InnerHeaderItem = styled.div`
  width: ${props => props.width};
  font-weight: 600;
  opacity: ${props => props.active ? '1' : '0.6'};
  cursor: ${props => props.isClickable ? 'pointer' : 'default'};
  text-align: ${props => props.rightSide ? 'right' : 'left'};
  flex-grow: ${props => props.doubleGrow ? '2' : '1'};
  display: flex;
  justify-content: ${props => props.rightSide ? 'flex-end' : 'flex-start'};
  
  &:hover {
    opacity: ${props => props.isClickable ? '1' : '0.6'};
  }
`;

export default class HeaderItem extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    id: PropTypes.string,
    onClick: PropTypes.func,
  };
  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.id);
    }
  };
  render() {
    const {
      /* eslint-disable-next-line */
      onClick,
      ...otherProps
    } = this.props;
    return (
      <InnerHeaderItem {...otherProps} onClick={this.onClick} isClickable={this.props.onClick}>
        { this.props.children }
      </InnerHeaderItem>
    );
  }
}
