import * as types from 'constants/nodesList';
import { DsService } from 'service';
import _ from 'lodash';
import { saveNodesDataAction } from './nodesData';

const mergedData = {};
let newMergedData = false;
let debounceInterval = null;

function load() {
  return {
    type: types.LOAD
  };
}

function loadNodesSuccess(data) {
  return {
    type: types.LOAD_NODES_SUCCESS,
    data
  };
}

function loadNodesFail(error) {
  return {
    type: types.LOAD_NODES_FAIL,
    error
  };
}

function startSetNodesData() {
  return dispatch => {
    debounceInterval = setInterval(() => {
      if (newMergedData) {
        dispatch(saveNodesDataAction({ ...mergedData }));
        newMergedData = false;
      }
    }, 200);
  };
}
function stopSetNodesData() {
  clearInterval(debounceInterval);
  debounceInterval = null;
}

function appendMergedData(node, data) {
  const availableTopics = [
    'ethstats:nodeData',
    'ethstats:nodeSyncInfo',
    'ethstats:nodeStatistics',
    'ethstats:nodeBlockData'
  ];
  if(!mergedData[node] ) {
    mergedData[node] = {
      fullNodeName: node,
    };
  }
  for (const i in availableTopics) {
    if (data[availableTopics[i]]) {
      mergedData[node] = JSON.parse(JSON.stringify(mergedData[node]));
      mergedData[node][availableTopics[i]] = data[availableTopics[i]];
      newMergedData = true;
    }
  }
}
function clearMergedData(node) {
  if (mergedData[node]) {
    delete mergedData[node];
    newMergedData = true;
  }
}

// UN SUBSCRIBE FROM NODE
function unsubscribeFromNode(node) {
  Promise.all([
    DsService.getRawRecord(`${node}/nodeData`).then(record => {
      record.unsubscribe();
    }),
    DsService.getRawRecord(`${node}/nodeSyncInfo`).then(record => {
      record.unsubscribe();
    }),
    DsService.getRawRecord(`${node}/nodeStatistics`).then(record => {
      record.unsubscribe();
    }),
    DsService.getRawRecord(`${node}/nodeBlockData`).then(record => {
      record.unsubscribe();
    }),
  ]).then(() => {
    clearMergedData(node);
  });
}

export function loadNodes() {
  return (dispatch, getState) => {
    // dispatch(init load);
    dispatch(load());
    // deepstream get raw list
    DsService.getRawList('nodes').then((nodes) => {
      nodes.subscribe((nextList) => {
        const nodesList = getState().nodesList.data;
        dispatch(loadNodesSuccess(nextList));

        if (nextList.length > 0 && debounceInterval === null) {
          dispatch(startSetNodesData());
        }
        if (nextList.length === 0 && debounceInterval !== null) {
          stopSetNodesData();
        }

        const nodesToAdd = _.difference(nextList, nodesList);
        const nodesToRemove = _.difference(nodesList, nextList);

        // adding new nodes
        if (nodesToAdd.length > 0) {
          nodesToAdd.map((node) => {
            DsService.getRawRecord(`${node}/nodeData`).then(record => {
              record.subscribe((data) => appendMergedData(node, data), true);
            });
            DsService.getRawRecord(`${node}/nodeSyncInfo`).then(record => {
              record.subscribe((data) => appendMergedData(node, data), true);
            });
            DsService.getRawRecord(`${node}/nodeStatistics`).then(record => {
              record.subscribe((data) => appendMergedData(node, data), true);
            });
            DsService.getRawRecord(`${node}/nodeBlockData`).then(record => {
              record.subscribe((data) => appendMergedData(node, data), true);
            });
          });
        }
        // removing old nodes
        if (nodesToRemove.length > 0) {
          nodesToRemove.map(unsubscribeFromNode);
        }
      }, true);
    }).catch((err) => {
      dispatch(loadNodesFail(err));
    });
  };
}

export function unloadNodes() {
  return () => {
    DsService.getRawList('nodes').then((nodes) => {
      stopSetNodesData();
      nodes.unsubscribe((nextList) => {
        nextList.map(unsubscribeFromNode);
      }, true);
    });
  };
}
