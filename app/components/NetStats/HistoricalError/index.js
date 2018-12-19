import React from 'react';
import Icon from 'components/Icon';
import Container from './Container';
import IconContainer from './IconContainer';

export default class HistoricalError extends React.Component {
  render() {
    return (
      <Container>
        <IconContainer><Icon name="info"/></IconContainer>
        <div>Sorry! There’s not enough data.</div>
        <div>Try searching for a different block or exit the Chain History Mode.</div>
      </Container>);
  }
}
