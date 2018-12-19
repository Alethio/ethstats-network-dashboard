import React from 'react';
import Container from 'components/ListYourNode/Container';
import IconContainer from 'components/NetStats/ReportIssue/IconContainer';
import Icon from 'components/Icon';
import { Link } from 'react-router';

export default class PrivacyPolicy extends React.PureComponent {
  render() {
    return (
      <Link target="_blank" to={'/privacy-policy'}>
        <Container noMargin>
          <IconContainer>
            <Icon name="privacy-policy" className="white-hover"/>
          </IconContainer>
          Privacy Policy
        </Container>
      </Link>
    );
  }
}
