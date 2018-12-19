import * as types from 'constants/global';

let tickTimerInterval = null;

export function changeDevMode() {
  return (dispatch, getState) => {
    const { devMode } = getState().global;

    dispatch({
      type: types.CHANGE_DEV_MODE,
      devMode: !devMode,
    });
  };
}
export function changeIconsType() {
  return (dispatch, getState) => {
    const { metamaskIcons } = getState().global;

    dispatch({
      type: types.CHANGE_ICONS_TYPE,
      metamaskIcons: !metamaskIcons,
    });
  };
}
export function showNodeHistoryModal() {
  return (dispatch) => {
    dispatch({
      type: types.CHANGE_NODE_HISTORY_VISIBILITY,
      showNodeHistoryModal: true,
    });
  };
}
export function hideNodeHistoryModal() {
  return (dispatch) => {
    dispatch({
      type: types.CHANGE_NODE_HISTORY_VISIBILITY,
      showNodeHistoryModal: false,
    });
  };
}

export function showConnectNodeModal() {
  return (dispatch) => {
    dispatch({
      type: types.CHANGE_CONNECT_NODE_VISIBILITY,
      showConnectNodeModal: true,
    });
  };
}
export function hideConnectNodeModal() {
  return (dispatch) => {
    dispatch({
      type: types.CHANGE_CONNECT_NODE_VISIBILITY,
      showConnectNodeModal: false,
    });
  };
}

export function startTickTimer() {
  const ticksPerSecond = 5;
  return (dispatch, getState) => {
    tickTimerInterval = setInterval(() => {
      const currentTick = getState().global.tickTimer;
      const nextTick = (currentTick + 1) % ticksPerSecond;
      dispatch({
        type: types.CHANGE_TICK_TIMER,
        tickTimer: nextTick,
      });
    }, 1000 / ticksPerSecond);
  };
}

export function stopTickTimer() {
  return (dispatch) => {
    clearInterval(tickTimerInterval);
    dispatch({
      type: types.CHANGE_TICK_TIMER,
      tickTimer: null,
    });
  };
}

export function animateForHistory(value) {
  return (dispatch) => {
    dispatch({
      type: types.CHANGE_GO_TO_HISTORY,
      shouldGoToHistory: value,
    });
  };
}

export function saveHistoryBlock(historyBlock) {
  return (dispatch) => {
    dispatch({
      type: types.CHANGE_HISTORY_BLOCK,
      historyBlock: historyBlock,
    });
  };
}

export function saveSmallChartBarCount(count) {
  return (dispatch) => {
    dispatch({
      type: types.CHANGE_SMALL_CHART_BAR_COUNT,
      smallChartBarCount: count,
    });
  };
}

export function saveBigChartBarCount(count) {
  return (dispatch) => {
    dispatch({
      type: types.CHANGE_BIG_CHART_BAR_COUNT,
      bigChartBarCount: count,
    });
  };
}
