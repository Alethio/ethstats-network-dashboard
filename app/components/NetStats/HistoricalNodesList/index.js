import React from 'react';
import PropTypes from 'prop-types';
import HistoricalSortableNodesList from 'components/NetStats/HistoricalSortableNodesList';
import Icon from 'components/Icon';
import Container from 'components/NetStats/NodesList/Container';
import Header from 'components/NetStats/NodesList/Header';
import HeaderContent from 'components/NetStats/NodesList/HeaderContent';
import HeaderItem from 'components/NetStats/NodesList/HeaderItem';
import SortIconContainer from 'components/NetStats/NodesList/SortIconContainer';
import { NETWORK_ALGO } from 'config';

export default class HistoricalNodesList extends React.Component {
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
    pinnedNodes[`${nodeName}`] = pin;
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
        <HistoricalSortableNodesList
          sortingOptions={this.state.sortOptions}
          pinnedNodes={this.state.pinnedNodes}
          updateNodePin={this.updateNodePin}
          blockNr={this.props.blockNr}
        />
      </Container>
    );
  }
}

HistoricalNodesList.propTypes = {
  blockNr: PropTypes.string,
};
