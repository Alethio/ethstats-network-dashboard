import * as types from 'constants/nodesData';

const initialState = {
  data: {},
  loaded: false,
  loading: false,
  error: null,
};

export default function nodesList(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_NODES_DATA:
      return {
        ...state,
        data: action.data,
        loading: false,
        loaded: true,
      };
    default:
      return state;
  }
}
