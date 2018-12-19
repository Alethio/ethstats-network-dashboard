import React from 'react';
import PropTypes from 'prop-types';
import Joyride from 'react-joyride';
import {withTheme} from 'styled-components';

class GuideTour extends React.Component {
  static propTypes = {
    run: PropTypes.bool,
    autoStart: PropTypes.bool,
    onTourEnd: PropTypes.func,
    theme: PropTypes.object,
  };
  callback = (event) => {
    if (event.type === 'finished') {
      if (this.props.onTourEnd) {
        this.joyride.reset(true);
        this.props.onTourEnd();
      }
    }
  };
  getStepStyle() {
    return {
      backgroundColor: '#BDC5D2',
      // color: '#fff',
      mainColor: '#ff4456',
      width: '550px',
      header: {
        display: 'none',
      },
      main: {
        padding: '20px',
        fontSize: '13px',
      },
      button: {
        backgroundColor: this.props.theme.colors.blue_event, // '#000000',
      },
      skip: {},
      back: {
        color: this.props.theme.colors.blue_event,
      },
      close: {
        width: '14px',
        height: '14px',
        backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3c?xml version=\'1.0\' encoding=\'UTF-8\'?%3e%3csvg width=\'10px\' height=\'10px\' viewBox=\'0 0 10 10\' version=\'1.1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\'%3e%3cg id=\'Stats-View\' stroke=\'none\' stroke-width=\'1\' fill=\'none\' fill-rule=\'evenodd\' opacity=\'0.400000006\'%3e%3cg id=\'StatsView\' transform=\'translate(-412.000000, -390.000000)\'%3e%3cg id=\'ic_close_white_18px\' transform=\'translate(405.000000, 383.000000)\'%3e%3cpolygon id=\'Shape\' points=\'0 0 24 0 24 24 0 24\'%3e%3c/polygon%3e%3cpolygon id=\'Shape\' fill=\'%23324156\' fill-rule=\'nonzero\' points=\'17 8.41 15.59 7 12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12\'%3e%3c/polygon%3e%3c/g%3e%3c/g%3e%3c/g%3e%3c/svg%3e")',
      }
    };
  }
  render() {
    return (
      <Joyride
        ref={(j) => { this.joyride = j; }}
        steps={[{
          title: 'First Step',
          text: `
  This section is all about the block time (how long it takes to mine a block). The average block time should be close
  to 14 seconds, as the Ethereum protocol is designed to approach that interval. We also display the latest known valid
  block (which represents the tip of the blockchain) and how long ago the last block was mined.
  <br /><br />
  The blue chart shows the times it took to mine the latest blocks.`,
          selector: '#best_block',
          position: 'bottom',
          type: 'click',
          style: this.getStepStyle(),
        }, {
          title: 'Second Step',
          text: `
  The difficulty in the Ethereum network is dynamically adjusted, so that no matter how much mining power is
  accumulated, the average block time approaches 14 seconds. The difficulty describes the average number of guesses it
  takes to find a valid new block. 1 PH (Peta Hash) can also be written as 1,000,000,000,000,000 Hashes. The average
  hashrate is the average number of solutions the Ethereum miners are currently trying per second.
  <br /><br />
  The yellow chart shows the evolution of the difficulty over the latest blocks.`,
          selector: '#difficulty',
          position: 'bottom',
          type: 'click',
          style: this.getStepStyle(),
        }, {
          title: 'Third Step',
          text: `
  The grey section contains key information about the Ethereum Gas system. Read more about it
  <a href="https://myetherwallet.github.io/knowledge-base/gas/what-is-gas-ethereum.html" target="_blank" rel="noopener noreferrer">here</a>.
  <br /><br />
  The block gas limit is the maximum amount of gas that can be used in one block. It is dynamically adjusted by miners,
  who have the ability to change it within +/- 0.1% of the parent block's gas limit.
  <br /><br />
  The average and median gas limit are calculated over the previous blocks. They are an indicator of how high users
  are setting the gas limit.
  <br /><br />
  The grey chart displays how the block gas limit has evolved over the latest blocks.`,
          selector: '#gas_limit',
          position: 'bottom',
          type: 'click',
          isFixed: true,
          style: this.getStepStyle(),
        }, {
          title: 'Fourth Step',
          text: `
  This section takes a closer look at key stats for each node active in the network. This list is not complete because
  sending data to us is voluntary. We show the node's type, how well it is connected to the Ethereum peer to peer
  network and other statistics. To order by a column, just click its header.
  <br /><br />
  Particularly interesting is the column propagation time. The propagation time represents the time it took the network
  to make the last block known to a node after it was mined. It is shown for the last 40 blocks in the chart and the
  average of this value is also given. You can make some nodes your favorite by clicking the check bock on the left.
  When you click the row of a node you enter the detail view for it. This new view can be used to debug network and
  consensus issues and to monitor your own node closely.`,
          selector: '#nodes_list',
          position: 'top',
          type: 'click',
          style: { ...this.getStepStyle(), width: '1000px' },
        }, {
          title: 'Fifth Step',
          text: `
  The bottom section provides interesting additional statistics. The blue chart informs about the current average uncle
  rate of the Ethereum network. High uncle rates are an indicator of many p2p network problems, for example bad node
  connectivity. The green chart gives an overview of the number of transactions in the previous blocks. The 3rd
  chart, colored in grey, displays how much gas was spent in a block. If the bars are all close to the block gas limit
  (see grey section at the top) it means that Ethereum blocks are at their capacity limit. Chart no.4 shows a frequency
  graph of propagation times. If the network, as seen by EthStats, is healthy it should have a very high first bar and a
  long low tail. The second chart from the right is about the miners. It shows the top two miners' accounts and the
  blocks mined by them out of the last 50 blocks. The last element in the bottom area is a map with the IP-Address based
  location of all Ethereum nodes EthStats knows about. Feel free to explore!`,
          selector: '#small_charts',
          position: 'top',
          type: 'click',
          style: { ...this.getStepStyle(), width: '1000px' },
        }]}
        run={this.props.run}
        autoStart={this.props.autoStart}
        callback={this.callback}
        type="continuous"
        holePadding={0}
        locale={{
          back: 'Back',
          close: 'Close',
          last: 'Finish',
          next: 'Next',
          skip: 'Skip'
        }}
      />
    );
  }
}

export default withTheme(GuideTour);
