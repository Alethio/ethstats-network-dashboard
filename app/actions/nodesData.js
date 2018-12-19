import * as types from '../constants/nodesData';

export function saveNodesDataAction(data) {
  return {
    type: types.SAVE_NODES_DATA,
    data
  };
}
