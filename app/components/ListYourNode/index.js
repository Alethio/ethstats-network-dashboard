import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from 'components/Icon';
import Container from './Container';
import IconContainer from './IconContainer';
import { showConnectNodeModal as showConnectNodeModalAction } from 'actions/global';

class ListYourNode extends React.Component {
  showModal = () => {
    this.props.showConnectNodeModal();
  };
  render() {
    return (
      <Container onClick={this.showModal}>
        <IconContainer>
          <Icon name="add_circle" className="white-hover"/>
        </IconContainer>
        Connect your node
      </Container>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    showConnectNodeModal: () => dispatch(showConnectNodeModalAction()),
  };
};

ListYourNode.propTypes = {
  showConnectNodeModal: PropTypes.func,
};
export default connect(
  null,
  mapDispatchToProps
)(ListYourNode);
