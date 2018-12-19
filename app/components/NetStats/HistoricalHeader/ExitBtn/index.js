import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { clearOldErrors as clearOldErrorsAction } from 'actions/historicalBlock';
import Container from './Container';
import IconContainer from './IconContainer';
import Icon from 'components/Icon';

class ExitBtn extends React.Component {
  exitHistory = () => {
    browserHistory.push('/');
    this.props.stopRunningBlocks();
    if (this.props.hasError) {
      this.props.clearOldErrors();
    }
  };
  render() {
    return (
      <Container onClick={this.exitHistory} hasError={this.props.hasError}>
        <IconContainer>
          <Icon name="exit"/>
        </IconContainer>
        Exit history
      </Container>
    );
  }
}

ExitBtn.propTypes = {
  hasError: PropTypes.bool,
  clearOldErrors: PropTypes.func,
  stopRunningBlocks: PropTypes.func,
};

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearOldErrors: () => dispatch(clearOldErrorsAction()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExitBtn);

