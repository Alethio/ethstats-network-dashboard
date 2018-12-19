import React from 'react';
import PropTypes from 'prop-types';
import Container from 'components/ListYourNode/Container';
import IconContainer from './IconContainer';
import Icon from 'components/Icon';

export default class GoogleFeedback extends React.PureComponent {
  static propTypes = {
    feedbackLink: PropTypes.string,
  };
  render() {
    return (
      <a target="_blank"
        href="https://docs.google.com/forms/d/e/1FAIpQLScp2PA4r-3ivNPfOvoY4UMK3FYZJimQ4CqHwl0YSnxBje6A_Q/viewform"
        rel="noopener noreferrer"
        style={{
          marginRight: '16px',
        }}
      >
        <Container noMargin>
          <IconContainer>
            <Icon name="info" className="white-hover"/>
          </IconContainer>
          Feedback form
        </Container>
      </a>
    );
  }
}
