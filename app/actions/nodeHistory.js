import * as types from 'constants/nodeHistory';
import {getNodeHistory as getNodeHistoryApi} from 'netstatsApi';
import {getInitialNodeHistory as getInitialNodeHistoryApi} from 'netstatsApi';
import {getCustomTimeframeNodeHistory as getCustomTimeframeNodeHistoryApi} from 'netstatsApi';
import {getEventsCount as getEventsCountApi} from 'netstatsApi';
import { filterEventsData } from 'utils/helpers';

export function load() {
  return {
    type: types.LOAD
  };
}

export function loadSuccess(data, limitTimestamp = false, source = 'api') {
  return (dispatch, getState) => {
    const oldData = getState().nodeHistory.data;
    let newData;
    if (limitTimestamp) {
      newData = filterEventsData(data, limitTimestamp);
    } else {
      newData = data;
    }
    dispatch({
      type: types.LOAD_SUCCESS,
      data: [...oldData, ...newData],
      source,
      error: null
    });
  };
}

export function loadFail(error) {
  return {
    type: types.LOAD_FAIL,
    error
  };
}

export function loadNodeName(data) {
  return {
    type: types.LOAD_NODENAME,
    data,
  };
}

export function clearData() {
  return {
    type: types.CLEAR_DATA,
  };
}

export function loadCount() {
  return {
    type: types.LOAD_COUNT,
  };
}

function loadCountSuccess(data) {
  return {
    type: types.LOAD_COUNT_SUCCESS,
    data
  };
}

function loadCountFail(error) {
  return {
    type: types.LOAD_COUNT_FAIL,
    error
  };
}

export function clearNodeData() {
  return dispatch => {
    dispatch(clearData());
  };
}

export function getNodeName(nodeName) {
  return dispatch => {
    dispatch(loadNodeName(nodeName));
  };
}

export function getInitialNodeHistory(nodeName) {
  return dispatch => {
    dispatch(load());

    getInitialNodeHistoryApi(nodeName)
      .then(nodeData => dispatch(loadSuccess(nodeData)))
      .catch(error => dispatch(loadFail(error)));
  };
}

export function getCustomTimeframeNodeHistory(nodeName, from, to, eventTypes) {
  return dispatch => {
    dispatch(load());

    getCustomTimeframeNodeHistoryApi(nodeName, from, to, eventTypes)
      .then(nodeData => dispatch(loadSuccess(nodeData)))
      .catch(error => dispatch(loadFail(error)));
  };
}

export function getNodeHistory(nodeName, to, eventTypes) {
  return dispatch => {
    dispatch(load());

    getNodeHistoryApi(nodeName, to, eventTypes)
      .then(nodeData => dispatch(loadSuccess(nodeData)))
      .catch(error => dispatch(loadFail(error)));
  };
}

export function getNodeHistoryWithFilter(nodeName, to, eventTypes, limitTimestamp) {
  return dispatch => {
    dispatch(load());

    getNodeHistoryApi(nodeName, to, eventTypes)
      .then(nodeData => dispatch(loadSuccess(nodeData, limitTimestamp)))
      .catch(error => dispatch(loadFail(error)));
  };
}

export function getEventsCount(nodeName, from, to) {
  return dispatch => {
    dispatch(loadCount());

    getEventsCountApi(nodeName, from, to)
      .then(nodeData => dispatch(loadCountSuccess(nodeData)))
      .catch(error => dispatch(loadCountFail(error)));
  };
}
