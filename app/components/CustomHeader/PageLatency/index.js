import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Container from './Container';
import { convertDurations } from 'utils/helpers';
import {loadPageLatency as loadPageLatencyAction} from '../../../actions/pageLatency';
import {DsService} from '../../../service';

class PageLatency extends React.Component {
  componentDidMount() {
    this.getPageLatency(this.props);
    this.timeID = setInterval(() => this.getPageLatency(this.props), 30000);
  }
  componentWillUnmount() {
    clearInterval(this.timeID);
  }
  getPageLatency(that) {
    const client = DsService.get();
    client.rpc.make('pingPong', Date.now(), (error, result) => {
      that.loadPageLatency(Date.now() - result);
    });
  }
  render() {
    const {pageLatency} = this.props;
    return (
      <Container color={this.props.color}>
        {isNaN(pageLatency) ? 'N/A' : convertDurations(pageLatency)}
      </Container>
    );
  }
}

PageLatency.propTypes = {
  pageLatency: PropTypes.any,
  loadPageLatency: PropTypes.func,
  color: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    pageLatency: state.pageLatency.data,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadPageLatency: (data) => dispatch(loadPageLatencyAction(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageLatency);

