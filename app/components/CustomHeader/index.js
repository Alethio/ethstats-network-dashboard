import React from 'react';
import PropTypes from 'prop-types';
import Container from './Container';
import StatsContainer from './StatsContainer';
import StatsItem from './StatsItem';
import StatsLabel from './StatsLabel';
import PageLatency from './PageLatency/index';
import ActiveNodes from './ActiveNodes/index';
import LeftFlexHalf from './LeftFlexHalf';
import FlexBox from './FlexBox';
import ListYourNode from 'components/ListYourNode';
import History from 'components/NetStats/History';
import EthstatsLogo from 'components/EthstatsLogo';

export default  class CustomHeader extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    startGuideTour: PropTypes.func,
    hasActiveNodes: PropTypes.bool,
    hasGuideTour: PropTypes.bool,
    hidden: PropTypes.bool,
  };
  render() {
    const className = this.props.hidden ? 'hidden' : '';
    return (
      <Container style={this.props.style} className={className}>
        <FlexBox>
          <LeftFlexHalf>
            <EthstatsLogo/>
            <ListYourNode/>
            <History />
          </LeftFlexHalf>
          <StatsContainer>
            <StatsItem>
              <StatsLabel>Page latency: </StatsLabel>
              <PageLatency/>
            </StatsItem>
            { this.props.hasActiveNodes && <StatsItem>
              <StatsLabel>Active nodes </StatsLabel>
              <ActiveNodes/>
            </StatsItem> }
          </StatsContainer>
        </FlexBox>
      </Container>
    );
  }
}
