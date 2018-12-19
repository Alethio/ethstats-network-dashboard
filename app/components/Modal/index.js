import React from 'react';
import PropTypes from 'prop-types';
import Portal from 'components/Portal';
import { browserHistory } from 'react-router';

class Modal extends React.Component {

  handleClick = (evt) => {
    browserHistory.push('/');
  };
  render() {
    const { active, children, homeRedirect, addNodeBg } = this.props;
    let className = 'modal';
    if (addNodeBg) {
      className = 'modal addNodeBg';
    }
    if (active) {
      return (
        <Portal>
          { homeRedirect ? <div className={className} onClick={this.handleClick}>
            { children }
          </div> :
            <div className={className}>
              { children }
            </div>
          }
        </Portal>
      );
    }

    return null;
  }
}

Modal.propTypes = {
  active: PropTypes.bool,
  addNodeBg: PropTypes.bool,
  children: PropTypes.any,
  homeRedirect: PropTypes.bool,
};

export default Modal;
