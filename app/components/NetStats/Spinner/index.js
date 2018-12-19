import React from 'react';
import Img from './Img';
import Container from './Container';
import spinner from 'resources/img/netStatsSpinner.png';

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<Container className="fade-in"><Img src={spinner}/></Container>);
  }
}
