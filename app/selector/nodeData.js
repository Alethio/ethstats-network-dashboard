import { createSelector } from 'reselect';

const getNodesData = (state) => state.nodesData.data;
const getNodeName = (s, props) => props.ethNodeName;
const getLastBlock = (state) => state.lastBlock.data;
const nodesLastBlockNumber = {};

export default createSelector(
  [ getNodesData, getNodeName, getLastBlock ],
  (nodesData, nodeName, lastBlock) => {
    const nodeData = nodesData[nodeName];
    const lastBlockNumberFromBlockData = nodeData['ethstats:nodeBlockData'] ? nodeData['ethstats:nodeBlockData']['ethon:number'] : 0;
    const lastBlockNumberFromSyncData = nodeData['ethstats:nodeSyncInfo'] ? nodeData['ethstats:nodeSyncInfo']['ethstats:currentBlock'] : 0;
    const nodeLastBlockNumber = lastBlockNumberFromBlockData > lastBlockNumberFromSyncData ? lastBlockNumberFromBlockData : lastBlockNumberFromSyncData;
    nodesLastBlockNumber[nodeName] = nodesLastBlockNumber[nodeName] > nodeLastBlockNumber ? nodesLastBlockNumber[nodeName] : nodeLastBlockNumber;

    return {
      data: nodeData,
      lastBlock: lastBlock,
      nodeLastBlockNumber: parseInt(nodesLastBlockNumber[nodeName], 10)
    };
  }
);
