import React from 'react';
import PropTypes from 'prop-types';
import PaddingContainer from './PaddingContainer';

export default class ContainerWithFixedElements extends React.Component {
  render() {
    const p = this.props;
    const styles = {};
    if (p.header && p.headerHeight) {
      styles.paddingTop = p.headerHeight;
    }
    if (p.footer && p.footerHeight) {
      styles.paddingBottom = p.footerHeight;
    }
    return (
      <PaddingContainer style={styles}>
        { p.header ? React.cloneElement(p.header, {
          style: {position: 'fixed', top: 0}
        }) : null }
        { this.props.children }
        { p.footer ? React.cloneElement(this.props.footer, {
          style: {position: 'fixed', bottom: 0}
        }) : null }
      </PaddingContainer>
    );
  }
}

ContainerWithFixedElements.propTypes = {
  header: PropTypes.node,
  headerHeight: PropTypes.string,
  footer: PropTypes.node,
  footerHeight: PropTypes.string,
  children: PropTypes.node,
};
