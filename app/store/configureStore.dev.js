import multi from 'redux-multi';
import {
  createStore,
  compose,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import DevTools from 'containers/DevTools';
import clientMiddleware from 'middleware/clientMiddleware';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(clientMiddleware(), thunk, multi),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
    )
  );

  return store;
}
