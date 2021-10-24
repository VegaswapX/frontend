// @flow
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import rootSaga from "./sagas";

//TODO remove and fix the result layout issue
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

function configureStore() {
  let store;
  let initialState = {};
  // if (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) {
  //     store = createStore(reducers, initialState, window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'](applyMiddleware(...middlewares)));
  // } else {
  //     store = createStore(reducers, initialState, applyMiddleware(...middlewares));
  // }
  store = createStore(reducers, initialState, applyMiddleware(...middlewares));
  sagaMiddleware.run(rootSaga);
  return store;
}

export let store = configureStore();
