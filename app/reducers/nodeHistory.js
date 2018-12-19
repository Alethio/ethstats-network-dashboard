import * as types from 'constants/nodeHistory';

const initialState = {
  data: [],
  countData: null,
  nodeName: null,
  loaded: false,
  loading: false,
  error: null,
};

export default function nodeHistory(state = initialState, action) {
  switch (action.type) {
    case types.LOAD:
      return {
        ...state,
        loading: true,
        error: null,
        // data: null,
      };
    case types.LOAD_COUNT:
      return {
        ...state,
        loading: true,
        error: null,
        countData: null,
      };
    case types.LOAD_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        countData: action.data,
      };
    case types.LOAD_COUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
        countData: null,
      };
    case types.LOAD_NODENAME:
      return {
        ...state,
        nodeName: action.data,
      };
    case types.LOAD_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        loaded: true,
      };
    case types.LOAD_FAIL:
      return {
        ...state,
        data: null,
        loading: false,
        loaded: false,
        error: action.error
      };
    case types.CLEAR_DATA:
      return {
        ...state,
        data: [],
        loaded: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
