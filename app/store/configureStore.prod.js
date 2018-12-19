import multi from 'redux-multi';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import clientMiddleware from 'middleware/clientMiddleware';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, multi, clientMiddleware())
  );
}
