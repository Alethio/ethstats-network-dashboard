import { createSelector } from 'reselect';
import _ from 'lodash';

const getNodesData = (state, props) => {
  if (state.historicalBlock.nodesData) {
    return state.historicalBlock.nodesData[props.blockNr];
  }
  return null;
};
const getSortingOptions = (s, props) => props.sortingOptions;
const getPinnedNodes = (s, props) => props.pinnedNodes;

const sortNodesData = (data, options, pinnedNodes) => {
  const pinnedOrderFunction = (n) => {
    const pinInfo = pinnedNodes[`ethstats/nodes/${n['ethstats:nodeData']['ethstats:nodeName']}`];
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
        pinnedOrderFunction,
        activeOrderFunction,
        (e) => {
          if (e['ethstats:nodeBlockData']) {
            return e['ethstats:nodeBlockData']['ethon:number'];
          }
          return options.ascendingOrder ? Number.MAX_VALUE : 0;
        },
        (e) => {
          if (e['ethstats:nodeBlockData'] && e['ethstats:nodeBlockData']['ethstats:propagationData']) {
            return e['ethstats:nodeBlockData']['ethstats:propagationData']['ethstats:propagationTime'];
          }
          return null;
        }
      ], ['desc', 'desc', options.ascendingOrder ? 'asc' : 'desc', 'asc']);

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
  [ getNodesData, getSortingOptions, getPinnedNodes ],
  (nodesData, sortingOptions, pinnedNodes) => {
    return {
      nodesList: sortNodesData(nodesData, sortingOptions, pinnedNodes)
        .map((node) => node),
    };
  }
);
