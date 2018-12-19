import React from 'react';
import PropTypes from 'prop-types';
import Container from './Container';
import IconContainer from './IconContainer';
import Icon from 'components/Icon';

export default class GuideTourStart extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  };
  render() {
    const className = this.props.disabled ? 'disabled' : 'active';
    return (
      <Container className={className} onClick={this.props.onClick}>
        <IconContainer className={className}>
          <Icon name="help" className="white-hover" />
        </IconContainer>
        Guided tour
      </Container>
    );
  }
}
