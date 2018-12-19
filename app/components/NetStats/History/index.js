import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Container from 'components/ListYourNode/Container';
import IconContainer from './IconContainer';
import Icon from 'components/Icon';
import { animateForHistory as animateForHistoryAction, saveHistoryBlock as saveHistoryBlockAction } from 'actions/global';
const BLOCKS_OFFSET = 5;

class History extends React.Component {
  goToHistory = () => {
    if(this.props.lastBlock) {
      this.props.saveHistoryBlock(parseInt(this.props.lastBlock['ethon:number'], 10) - BLOCKS_OFFSET);
      this.props.animateForHistory(true);
      setTimeout(() => {
        this.props.animateForHistory(false);
        browserHistory.push(`/history/block/${parseInt(this.props.lastBlock['ethon:number'], 10) - BLOCKS_OFFSET}`);
      }, 300);
    } else {
      browserHistory.push('/history/block/5000000');
    }
  };
  render() {
    return (
      <Container onClick={this.goToHistory}>
        <IconContainer>
          <Icon name="history" className="white-hover"/>
        </IconContainer>
        History
      </Container>
    );
  }
}

History.propTypes = {
  lastBlock: PropTypes.object,
  animateForHistory: PropTypes.func,
  saveHistoryBlock: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    lastBlock: state.lastBlock.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    animateForHistory: (value) => dispatch(animateForHistoryAction(value)),
    saveHistoryBlock: (value) => dispatch(saveHistoryBlockAction(value)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(History);

