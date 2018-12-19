import * as types from 'constants/global';

const initialState = {
  devMode: false,
  metamaskIcons: false,
  showNodeHistoryModal: false,
  showConnectNodeModal: false,
  tickTimer: null,
  shouldGoToHistory: false,
  historyBlock: null,
  smallChartBarCount: 24,
  bigChartBarCount: 30,
};

export default function global(state = initialState, action) {
  switch (action.type) {
    case types.CHANGE_DEV_MODE:
      return {
        ...state,
        devMode: action.devMode,
      };
    case types.CHANGE_ICONS_TYPE:
      return {
        ...state,
        metamaskIcons: action.metamaskIcons,
      };
    case types.CHANGE_NODE_HISTORY_VISIBILITY:
      return {
        ...state,
        showNodeHistoryModal: action.showNodeHistoryModal,
      };
    case types.CHANGE_TICK_TIMER:
      return {
        ...state,
        tickTimer: action.tickTimer,
      };
    case types.CHANGE_GO_TO_HISTORY:
      return {
        ...state,
        shouldGoToHistory: action.shouldGoToHistory,
      };
    case types.CHANGE_HISTORY_BLOCK:
      return {
        ...state,
        historyBlock: action.historyBlock,
      };
    case types.CHANGE_SMALL_CHART_BAR_COUNT:
      return {
        ...state,
        smallChartBarCount: action.smallChartBarCount,
      };
    case types.CHANGE_BIG_CHART_BAR_COUNT:
      return {
        ...state,
        bigChartBarCount: action.bigChartBarCount,
      };
    case types.CHANGE_CONNECT_NODE_VISIBILITY:
      return {
        ...state,
        showConnectNodeModal: action.showConnectNodeModal,
      };
    default:
      return state;
  }
}
