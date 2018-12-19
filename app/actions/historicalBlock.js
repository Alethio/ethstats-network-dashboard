import * as types from 'constants/historicalBlock';
import { getChartsForBlock, getNodesForBlock } from 'netstatsApi';

function loadCharts() {
  return {
    type: types.LOAD_CHARTS
  };
}

function loadChartsSuccess(data, blockNr) {
  return {
    type: types.LOAD_CHARTS_SUCCESS,
    data,
    blockNr,
  };
}

function loadChartsFail(error, blockNr) {
  return {
    type: types.LOAD_CHARTS_FAIL,
    error,
    blockNr,
  };
}

function loadNodes() {
  return {
    type: types.LOAD_NODES
  };
}

function loadNodesSuccess(data, blockNr) {
  return {
    type: types.LOAD_NODES_SUCCESS,
    data,
    blockNr,
  };
}

function loadNodesFail(error, blockNr) {
  return {
    type: types.LOAD_NODES_FAIL,
    error,
    blockNr,
  };
}

function clearErrors() {
  return {
    type: types.CLEAR_ERRORS
  };
}

export function clearOldErrors() {
  return dispatch => {
    dispatch(clearErrors());
  };
}

export function getCharts(blockNr) {
  return dispatch => {
    // dispatch(loadCharts());
    getChartsForBlock(blockNr)
      .then(data => {
        dispatch(loadChartsSuccess(data, blockNr));
      })
      .catch(error => {
        dispatch(loadChartsFail(error, blockNr));
      });
  };
}

export function getNodes(blockNr) {
  return dispatch => {
    // dispatch(loadNodes());
    getNodesForBlock(blockNr)
      .then(data => {
        dispatch(loadNodesSuccess(data, blockNr));
      })
      .catch(error => {
        dispatch(loadNodesFail(error, blockNr));
      });
  };
}

