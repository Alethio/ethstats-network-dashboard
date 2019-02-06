import React from 'react';
import PropTypes from 'prop-types';
import { EXPLORER_URL } from 'config';

import Title from 'components/NetStats/BigChartsSectionItem/Title';
import Value from 'components/NetStats/BigChartsSectionItem/Value';


class TopLeft extends React.Component {
  handleClickAction(data) {
    let blockNr = data.match(/\d/g);
    blockNr = blockNr.join('');
    window.open(`${EXPLORER_URL}/block/${blockNr}`, '_blank');
  }
  render() {
    const { title, value, color } = this.props;
    return (
      <div>
        <Title>{title}</Title>
        <Value color={color} onClick={  title === 'Block number' && EXPLORER_URL ? () => this.handleClickAction(value) : null }
          className={ title === 'Block number' && EXPLORER_URL ? 'pointer' : '' }>
          {value}
        </Value>
      </div>
    );
  }
}

TopLeft.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  color: PropTypes.string,
};

export default TopLeft;
