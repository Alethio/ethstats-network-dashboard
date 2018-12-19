import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { numberWithCommas } from 'utils/helpers';

import Container from './Container';
import SearchInput from './SearchInput';
import ClearText from './ClearText';

class HistoricalSearchBox extends React.Component {
  constructor(props) {
    super(props);
    if (props.hasError) {
      this.state = {
        inputValue: '',
        inputInFocus: false,
      };
    } else {
      this.state = {
        inputValue: `#${numberWithCommas(props.blockNr)}`,
        inputInFocus: false,
      };
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.state.inputInFocus) {
      if (nextProps.hasError) {
        this.setState({
          inputValue: '',
        });
      } else {
        this.setState({
          inputValue: `#${numberWithCommas(nextProps.blockNr)}`,
        });
      }
    }
  }
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const tempBlockNr = e.target.value.replace(/\D/g, '');
      if (this.props.lastBlock && parseInt(tempBlockNr, 10) < this.props.lastBlock['ethon:number']) {
        browserHistory.push(`/history/block/${tempBlockNr}`);
        e.target.blur();
      }
    }
  };
  handleSearchClick = () => {
    const tempBlockNr = this.state.inputValue.replace(/\D/g, '');
    if (this.props.lastBlock && parseInt(tempBlockNr, 10) < this.props.lastBlock['ethon:number']) {
      browserHistory.push(`/history/block/${tempBlockNr}`);
    }
  };
  handleOnChange = (e) => {
    this.setState({inputValue: e.target.value});
  };
  inputOnFocus = () => {
    this.setState({
      inputInFocus: true,
    });
  };
  inputOnBlur = () => {
    this.setState({
      inputInFocus: false,
    });
  };
  clearInput = () => {
    this.setState({
      inputValue: '',
    });
  };
  render() {
    const {hasError} = this.props;
    const iconName = 'iconSearch';
    const clearIconName = 'butClose';

    return (
      <Container hasError={hasError}>
        <div className="iconContainer pointer" onClick={this.handleSearchClick}><Icon name={iconName} className="icon"/></div>
        <SearchInput hasError={hasError} tabIndex="-1" placeholder="insert block #" onKeyPress={this.handleKeyPress} value={this.state.inputValue} onChange={this.handleOnChange} onFocus={this.inputOnFocus} onBlur={this.inputOnBlur}/>
        <ClearText hasError={hasError} onClick={this.clearInput}>
          <Icon name={clearIconName}/>
        </ClearText>
      </Container>
    );
  }
}

HistoricalSearchBox.propTypes = {
  lastBlock: PropTypes.object,
  blockNr: PropTypes.string,
  hasError: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    lastBlock: state.lastBlock.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoricalSearchBox);
