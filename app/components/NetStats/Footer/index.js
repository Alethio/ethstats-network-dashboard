import React from 'react';
import { PRIVACY_POLICY } from 'config';
import Container from './Container';
import IconContainer from './IconContainer';
import FlexRow from './FlexRow';
import AlethioLink from './AlethioLink';
import Text from './Text';
import Icon from 'components/Icon';
import GuideTourStart from 'components/NetStats/GuideTour/GuideTourStart';
import ReportIssue from 'components/NetStats/ReportIssue';
import PrivacyPolicy from 'components/NetStats/PrivacyPolicy';
import PropTypes from 'prop-types';

class Footer extends React.Component {
  static propTypes = {
    hasGuideTour: PropTypes.bool,
    startGuideTour: PropTypes.func,
  };
  render() {
    const activeGuideTour = window.location.pathname === '/';
    const guideTour = activeGuideTour ? <GuideTourStart onClick={this.props.startGuideTour} /> : <GuideTourStart disabled/>;
    return (
      <Container>
        <FlexRow>
          { this.props.hasGuideTour && guideTour}
          <ReportIssue />
          {PRIVACY_POLICY && <PrivacyPolicy/> }
        </FlexRow>
        <FlexRow>
          <Text>EthStats.io (beta) powered by </Text>
          <AlethioLink href="https://company.aleth.io" target="_blank" rel="noopener noreferrer">
            <Text>&nbsp;Aleth.io</Text>
            <IconContainer><Icon name="aleth_icon"/></IconContainer>
          </AlethioLink>
        </FlexRow>
      </Container>
    );
  }
}


export default Footer;
