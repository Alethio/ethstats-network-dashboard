import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { clearOldErrors as clearErrorsAction } from 'actions/historicalBlock';
import Icon from 'components/Icon';
import Container from './Container';
import AbsoluteContainer from './AbsoluteContainer';
import ExitBtn from './ExitBtn';
import RunBlocks from './RunBlocks';
import ProgressBar from './ProgressBar';
import ProgressBarContainer from './ProgressBarContainer';
import WhiteCorner from './WhiteCorner';
import PageLatency from 'components/CustomHeader/PageLatency';
import StatsItem from 'components/CustomHeader/StatsItem';
import StatsLabel from 'components/CustomHeader/StatsLabel';
import NavigationArrow from './NavigationArrow';
import HistoricalSearchBox from 'components/NetStats/HistoricalSearchBox';
import HeaderStat from 'components/CustomHeader/HeaderStat';
import WhiteRectangle from './WhiteRectangle';
import BlueRectangle from './BlueRectangle';
import EthstatsLogo from '../../EthstatsLogo';

const TIMER_INTERVAL = 200;

class HistoricalHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchError: props.hasError,
      runningBlocks: false,
      blockProgress: 0,
      secondsElapsed: 0,
      blockTime: props.blockTime,
    };
    this.progressTimer = null;
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.hasError) {
      this.setState({
        searchError: nextProps.hasError,
      });
    } else {
      this.setState({
        searchError: null,
        blockTime: nextProps.blockTime,
      });
    }
    if (nextProps.blockNr !== this.props.blockNr) {
      clearInterval(this.progressTimer);
      this.setState({
        blockProgress: 0,
        blockTime: nextProps.blockTime,
        secondsElapsed: 0,
      }, () => {
        if (this.state.runningBlocks) {
          this.progressTimer = setInterval(() => this.incrementProgress(this.state.blockTime), TIMER_INTERVAL);
        }
      });
    }
    if (nextProps.lastBlock) {
      if (parseInt(nextProps.blockNr, 10) >= parseInt(nextProps.lastBlock['ethon:number'], 10) - 2) {
        this.stopRunningBlocks();
      }
    }
  }
  incrementProgress(blockTime) {
    if (blockTime) {
      const incrementRate = (TIMER_INTERVAL / 1000) / parseInt(blockTime, 10) * 100;
      const {blockProgress, secondsElapsed} = this.state;
      if (blockProgress + incrementRate > 100) {
        this.setState({
          blockProgress: 0,
          secondsElapsed: 0,
        }, browserHistory.push(`/history/block/${parseInt(this.props.blockNr, 10) - -1}`));
      } else {
        this.setState({
          blockProgress: blockProgress + incrementRate,
          secondsElapsed: secondsElapsed + TIMER_INTERVAL / 1000,
        });
      }
    }
  }
  handleRunBlocksClick = () => {
    const { runningBlocks } = this.state;
    if (runningBlocks) {
      clearInterval(this.progressTimer);
      this.setState({
        runningBlocks: false,
      });
    } else {
      this.setState({
        runningBlocks: true,
      });
      this.progressTimer = setInterval(() => this.incrementProgress(this.state.blockTime), TIMER_INTERVAL);
    }
  };
  stopRunningBlocks = () => {
    clearInterval(this.progressTimer);
    this.setState({
      runningBlocks: false,
      blockProgress: 0,
      secondsElapsed: 0,
    });
  };
  loadPrevBlock() {
    this.props.clearErrors();
    browserHistory.push(`/history/block/${parseInt(this.props.blockNr, 10) - 1}`);
  }
  loadNextBlock() {
    this.props.clearErrors();
    browserHistory.push(`/history/block/${parseInt(this.props.blockNr, 10) - -1}`);
  }
  render() {
    const { blockNr, notHidden, lastBlock } = this.props;
    const { searchError, secondsElapsed, blockTime } = this.state;
    const className = notHidden ? 'notHidden' : '';
    let disablePlay = false;
    if (blockNr && lastBlock) {
      if (parseInt(blockNr, 10) >= parseInt(lastBlock['ethon:number'], 10) - 2) {
        disablePlay = true;
      }
    }
    let progressBarText = blockTime - Math.floor(secondsElapsed);
    if ( blockTime - Math.floor(secondsElapsed) < 10) {
      progressBarText = '0' + (blockTime - Math.floor(secondsElapsed));
    }
    return (
      <Container hasError={searchError} className={className}>
        <AbsoluteContainer>
          {!searchError &&
            <NavigationArrow onClick={() => {
              this.loadPrevBlock();
            }}>
              <Icon name="previous"/>
            </NavigationArrow>
          }
          <HistoricalSearchBox blockNr={blockNr} hasError={searchError} />
          {!searchError &&
            <NavigationArrow type="next" lastBlock={lastBlock} blockNr={blockNr} onClick={() => {
              this.loadNextBlock();
            }}>
              <Icon name="skip"/>
            </NavigationArrow>
          }
        </AbsoluteContainer>
        <div className="display-flex centered-flex">
          <EthstatsLogo/>
          <ExitBtn hasError={searchError} stopRunningBlocks={this.stopRunningBlocks}/>
          { !searchError && <RunBlocks disabled={disablePlay} runningBlocks={this.state.runningBlocks} onClick={this.handleRunBlocksClick}/> }
        </div>
        {!searchError &&
        <div className="display-flex">
          <StatsItem fullOpacity>
            <StatsLabel color="white">Page latency</StatsLabel>
            <PageLatency color="white"/>
          </StatsItem>
          <StatsItem fullOpacity>
            <StatsLabel color="white">Nodes</StatsLabel>
            <HeaderStat color="white">
              {this.props.nodesNr}
            </HeaderStat>
          </StatsItem>
        </div>
        }
        <ProgressBarContainer>
          <ProgressBar width={`${this.state.blockProgress}%`}>
            <WhiteRectangle>{progressBarText}<WhiteCorner/><BlueRectangle/></WhiteRectangle>
          </ProgressBar>
        </ProgressBarContainer>
      </Container>
    );
  }
}

HistoricalHeader.propTypes = {
  blockNr: PropTypes.string,
  nodesNr: PropTypes.number,
  clearErrors: PropTypes.func,
  blockTime: PropTypes.number,
  lastBlock: PropTypes.object,
  hasError: PropTypes.bool,
  notHidden: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    lastBlock: state.lastBlock.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearErrors: () => dispatch(clearErrorsAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoricalHeader);

