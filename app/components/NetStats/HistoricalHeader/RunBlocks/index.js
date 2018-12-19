import React from 'react';
import PropTypes from 'prop-types';
import Container from '../ExitBtn/Container';
import IconContainer from '../ExitBtn/IconContainer';
import Icon from 'components/Icon';

class RunBlocks extends React.Component {
  render() {
    const { runningBlocks, disabled } = this.props;
    let playClassName = 'play';
    if (runningBlocks) {
      playClassName = 'pause';
    }
    return (
      <div>
        {disabled ?
          <Container onClick={null} disabled>
            <IconContainer runningBlocks={runningBlocks}>
              <Icon name={playClassName}/>
            </IconContainer>
            {runningBlocks ? 'Pause blocks' : 'Run Blocks'}
          </Container> :
          <Container onClick={this.props.onClick}>
            <IconContainer runningBlocks={runningBlocks}>
              <Icon name={playClassName}/>
            </IconContainer>
            {runningBlocks ? 'Pause blocks' : 'Run Blocks'}
          </Container>
        }
      </div>
    );
  }
}

RunBlocks.propTypes = {
  onClick: PropTypes.func,
  runningBlocks: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default RunBlocks;
