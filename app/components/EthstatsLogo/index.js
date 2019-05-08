import React from 'react';
import Container from './Container';
import { EXPLORER_URL } from 'config';
import Icon from 'components/Icon';
import IconConainer from './IconContainer';

class EthstatsLogo extends React.Component {

  render() {
    return (
      <Container>
        <a href={EXPLORER_URL}
           target="_blank"
           rel="noopener noreferrer">
          <IconConainer><Icon name="aleth_icon"></Icon></IconConainer>
        </a>
      </Container>
    );
  }
}


export default EthstatsLogo;
