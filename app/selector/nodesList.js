import { createSelector } from 'reselect';
import _ from 'lodash';

const getNodesList = (state) => state.nodesList.data;
const getNodesData = (state) => state.nodesData.data;
const getSortingOptions = (s, props) => props.sortingOptions;
const getPinnedNodes = (s, props) => props.pinnedNodes;

const filterNodesData = (nodesData, nodesList) => {
  return ((nodesData && nodesList) ?
    nodesList.reduce((tempNodesData, nodeKey) => {
      if (nodesData[nodeKey] && nodesData[nodeKey]['ethstats:nodeData']) {
        tempNodesData.push(nodesData[nodeKey]);
      }
      return tempNodesData;
    }, [])
    : []);
};

const sortNodesData = (data, options, pinnedNodes) => {
  const pinnedOrderFunction = (n) => {
    const pinInfo = pinnedNodes[n.fullNodeName];
    return (
      pinInfo !== undefined
        ? (pinInfo ? 1 : 0)
        : 0
    );
  };
  const activeOrderFunction = (n) => n['ethstats:nodeData']['ethstats:nodeIsActive'];

  switch (options.key) {
    case 'blockNr':
      return _.orderBy(data, [
        (e) => {
          return (e['ethstats:nodeBlockData'] || e['ethstats:nodeSyncInfo']) ? 0 : 1;
        },
        pinnedOrderFunction,
        activeOrderFunction,
        (e) => {
          if (e['ethstats:nodeBlockData']) {
            return e['ethstats:nodeBlockData']['ethon:number'];
          }
          if (e['ethstats:nodeSyncInfo']) {
            return e['ethstats:nodeSyncInfo']['ethstats:currentBlock'];
          }
          return options.ascendingOrder ? Number.MAX_VALUE : 0;
        },
        (e) => {
          if (e['ethstats:nodeBlockData'] && e['ethstats:nodeBlockData']['ethstats:propagationData']) {
            return e['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'];
          }
          return null;
        }
      ], ['asc', 'desc', 'desc', options.ascendingOrder ? 'asc' : 'desc', 'asc']);

    case 'ethNodeName':
      return _.orderBy(data, [
        pinnedOrderFunction,
        activeOrderFunction,
        (e) => {
          return e['ethstats:nodeData']['ethstats:nodeName'].toUpperCase();
        }
      ], ['desc', 'desc', options.ascendingOrder ? 'asc' : 'desc']);

    case 'nodeType':
      return _.orderBy(data, [
        pinnedOrderFunction,
        activeOrderFunction,
        (e) => {
          return e['ethstats:nodeData']['ethstats:node'].toUpperCase();
        }
      ], ['desc', 'desc', options.ascendingOrder ? 'asc' : 'desc']);

    case 'latency':
      return _.orderBy(data, [
        pinnedOrderFunction,
        activeOrderFunction,
        (e) => {
          return e['ethstats:nodeData']['ethstats:wsLatency'];
        }
      ], ['desc', 'desc', options.ascendingOrder ? 'asc' : 'desc']);

    case 'peers':
      return _.orderBy(data, [
        pinnedOrderFunction,
        activeOrderFunction,
        (e) => {
          return e['ethstats:nodeStatistics']['ethstats:numberOfPeers'];
        }
      ], ['desc', 'desc', options.ascendingOrder ? 'asc' : 'desc']);

    case 'uptime':
      return _.orderBy(data, [
        pinnedOrderFunction,
        activeOrderFunction,
        (e) => {
          return e['ethstats:nodeData']['ethstats:onlineTimePercent'];
        }
      ], ['desc', 'desc', options.ascendingOrder ? 'asc' : 'desc']);

    case 'propagationTime':
      return _.orderBy(data, [
        pinnedOrderFunction,
        activeOrderFunction,
        (e) => {
          if (e['ethstats:nodeBlockData']) {
            return e['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'];
          }
          return Number.MAX_VALUE;
        }
      ], ['desc', 'desc', options.ascendingOrder ? 'asc' : 'desc']);

    case 'propagationAvg':
      return _.orderBy(data, [
        pinnedOrderFunction,
        activeOrderFunction,
        (e) => {
          if (e['ethstats:nodeBlockData']) {
            return e['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationAverage'];
          }
          return Number.MAX_VALUE;
        }
      ], ['desc', 'desc', options.ascendingOrder ? 'asc' : 'desc']);

    case 'txs':
      return _.orderBy(data, [
        pinnedOrderFunction,
        activeOrderFunction,
        (e) => {
          if (e['ethstats:nodeBlockData']) {
            return e['ethstats:nodeBlockData']['alethio:numberOfTxs'];
          }
          return Number.MAX_VALUE;
        }
      ], ['desc', 'desc', options.ascendingOrder ? 'asc' : 'desc']);

    case 'uncles':
      return _.orderBy(data, [
        pinnedOrderFunction,
        activeOrderFunction,
        (e) => {
          if (e['ethstats:nodeBlockData']) {
            return e['ethstats:nodeBlockData']['alethio:numberOfUncles'];
          }
          return Number.MAX_VALUE;
        }
      ], ['desc', 'desc', options.ascendingOrder ? 'asc' : 'desc']);

    default:
      return data;
  }
};

export default createSelector(
  [ getNodesList, getNodesData, getSortingOptions, getPinnedNodes ],
  (nodesList, nodesData, sortingOptions, pinnedNodes) => {
    return {
      nodesList: sortNodesData(filterNodesData(nodesData, nodesList), sortingOptions, pinnedNodes)
        .map((node) => node.fullNodeName),
    };
  }
);
