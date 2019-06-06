import React from 'react';
import SortableNodesList from './SortableNodesList';
import Container from './Container';
import Header from './Header';
import HeaderContent from './HeaderContent';
import HeaderItem from './HeaderItem';
import Icon from 'components/Icon';
import SortIconContainer from './SortIconContainer';
import { NETWORK_ALGO } from 'config';

export default class NodesList extends React.Component {
  constructor(props) {
    super(props);

    this.headerData = [
      {
        id: 'ethNodeName',
        name: 'Node name',
        width: 235,
        ascendingOrder: true,
        extraProps: {doubleGrow: true},
      }, {
        id: 'nodeType',
        name: 'Type',
        width: 95,
        ascendingOrder: true,
        extraProps: {},
      }, {
        id: 'latency',
        name: 'Latency',
        width: 65,
        ascendingOrder: true,
        extraProps: {},
      }, {
        id: ((['clique', 'ibft2'].includes(NETWORK_ALGO)) ? 'isValidator' : 'isMining'),
        name: ((['clique', 'ibft2'].includes(NETWORK_ALGO)) ? 'Is validator' : 'Is mining'),
        width: 70,
        extraProps: {},
        ascendingOrder: true,
        noSorting: true,
      }, {
        id: 'peers',
        name: 'Peers',
        width: 50,
        ascendingOrder: false,
        extraProps: {},
      }, {
        id: 'blockNr',
        name: 'Last block',
        width: 160,
        ascendingOrder: false,
        extraProps: {},
      }, {
        id: 'txs',
        name: 'Block TXs',
        width: 75,
        ascendingOrder: false,
        extraProps: {},
      }, {
        id: 'uncles',
        name: 'Uncles',
        width: 55,
        ascendingOrder: false,
        extraProps: {},
      }, {
        id: 'blockTime',
        name: 'Block time',
        width: 80,
        extraProps: {},
        ascendingOrder: true,
        noSorting: true,
      }, {
        id: 'propagationTime',
        name: 'Propagation time',
        width: 260,
        ascendingOrder: true,
        extraProps: {},
      }, {
        id: 'propagationAvg',
        name: 'Avg',
        width: 75,
        ascendingOrder: true,
        extraProps: {rightSide: true},
      }, {
        id: 'uptime',
        name: 'Uptime',
        width: 60,
        ascendingOrder: false,
        extraProps: {rightSide: true},
      },
    ];

    const localStoragePinnedNodes =
      localStorage.getItem('pinnedNodes') === null ? {} : JSON.parse(localStorage.getItem('pinnedNodes'));

    this.state = {
      sortOptions: {
        key: 'blockNr',
        ascendingOrder: false,
      },
      pinnedNodes: localStoragePinnedNodes,
    };
  }

  changeSortType = (key) => {
    const options = {
      key: key,
      ascendingOrder: this.headerData.find((hData) => {
        return hData.id === key;
      }).ascendingOrder === true,
    };
    if (this.state.sortOptions.key === key) {
      options.ascendingOrder = !this.state.sortOptions.ascendingOrder;
    }
    this.setState({sortOptions: options});
  };

  updateNodePin = (nodeName, pin) => {
    const pinnedNodes = { ...this.state.pinnedNodes };
    pinnedNodes[nodeName] = pin;
    this.setState({pinnedNodes});
    localStorage.setItem('pinnedNodes', JSON.stringify(pinnedNodes));
  };

  render() {
    return (
      <Container id="nodes_list">
        <Header>
          <HeaderContent>
            {
              this.headerData.map((hData) => {
                return (
                  <HeaderItem
                    key={hData.id}
                    active={this.state.sortOptions.key === hData.id}
                    width={hData.width + 'px'}
                    id={hData.id}
                    onClick={!hData.noSorting ? this.changeSortType : undefined}
                    doubleGrow={ hData.extraProps.doubleGrow }
                    rightSide={ hData.extraProps.rightSide }
                  >
                    { hData.name }
                    { this.state.sortOptions.key === hData.id &&
                    <SortIconContainer ascending={this.state.sortOptions.ascendingOrder}>
                      <Icon name="sort-arrow"/>
                    </SortIconContainer>
                    }
                  </HeaderItem>
                );
              })
            }
          </HeaderContent>
        </Header>
        <SortableNodesList
          sortingOptions={this.state.sortOptions}
          pinnedNodes={this.state.pinnedNodes}
          updateNodePin={this.updateNodePin}
        />
      </Container>
    );
  }
}
