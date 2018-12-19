import * as types from 'constants/historicalBlock';

const initialState = {
  loadingChartsData: false,
  loadingNodesData: false,
  chartsData: null,
  nodesData: null,
  chartsError: null,
  nodesError: null,
};

export default function transactions(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_CHARTS:
      return {
        ...state,
        loadingChartsData: true,
        chartsData: null,
        chartsError: null,
      };
    case types.LOAD_CHARTS_SUCCESS:
      return {
        ...state,
        loadingChartsData: false,
        chartsData: {
          ...state.chartsData,
          [action.blockNr]: action.data,
        },
      };
    case types.LOAD_CHARTS_FAIL:
      return {
        ...state,
        loadingChartsData: false,
        chartsError: {
          ...state.chartsError,
          [action.blockNr]: action.error,
        },
      };
    case types.LOAD_NODES:
      return {
        ...state,
        loadingNodesData: true,
        nodesData: null,
        nodesError: null,
      };
    case types.LOAD_NODES_SUCCESS:
      return {
        ...state,
        loadingNodesData: false,
        nodesData: {
          ...state.nodesData,
          [action.blockNr]: action.data,
        },
      };
    case types.LOAD_NODES_FAIL:
      return {
        ...state,
        loadingNodesData: false,
        nodesError: {
          ...state.nodesError,
          [action.blockNr]: action.error,
        },
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        nodesError: null,
        chartsError: null,
      };
    default:
      return state;
  }
}
