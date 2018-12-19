import * as types from 'constants/nodesList';

const initialState = {
  data: [ ],
  version: 0,
  loaded: false,
  loading: false,
  error: null,
};

export default function nodesList(state = initialState, action) {
  switch (action.type) {
    case types.LOAD:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.INCREMENT:
      return {
        ...state,
        version: action.data,
      };
    case types.LOAD_NODES_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        loaded: true,
      };
    case types.LOAD_NODES_FAIL:
      return {
        ...state,
        data: null,
        loading: false,
        loaded: false,
        error: action.error,
        version: 0,
      };
    default:
      return state;
  }
}
