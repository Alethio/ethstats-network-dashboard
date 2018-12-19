import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { numberWithCommas } from 'utils/helpers';
import Container from './Container';
import Content from './Content';
import Pending from './Pending';
import Spinner from 'components/NetStats/Spinner';

class Header extends React.Component {

  render() {
    const { lastBlock } = this.props;
    let pendingString = '';
    if (lastBlock) {
      pendingString = numberWithCommas(parseInt(lastBlock['ethon:number'], 10) + 1);
    }
    return (
      <Container>
        <Content>
          <Spinner/>
          <Pending>Pending next block #{pendingString} ...</Pending>
        </Content>
      </Container>
    );
  }
}

Header.propTypes = {
  lastBlock: PropTypes.object,
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
)(Header);

