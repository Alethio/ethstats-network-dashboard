import React from 'react';
import PropTypes from 'prop-types';
import IconContainer from './IconContainer';

class NavigationArrow extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    lastBlock: PropTypes.object,
    type: PropTypes.string,
    blockNr: PropTypes.string,
  };
  render() {
    const {type, lastBlock, blockNr} = this.props;
    let hasAction = true;
    if (type === 'next') {
      if (lastBlock && blockNr) {
        if (parseInt(blockNr, 10) >= parseInt(lastBlock['ethon:number'], 10) - 2) {
          hasAction = false;
        }
      }
    }
    return (
      <div>
        { hasAction ?
          <IconContainer onClick={this.props.onClick}>
            {this.props.children}
          </IconContainer> :
          <IconContainer disabled onClick={null}>
            {this.props.children}
          </IconContainer>
        }
      </div>
    );
  }
}

export default NavigationArrow;
