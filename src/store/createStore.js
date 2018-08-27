import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import thunk from 'redux-thunk'
import { browserHistory } from 'react-router'
import makeRootReducer from './reducers'
import { updateLocation } from './location'
import createSagaMiddleware from 'redux-saga'
import mySaga from '../sagas/rootSagas'
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER_FROM_TOKEN } from '../../src/api/login/loginActions';

const createStore = (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const sagaMiddleware = createSagaMiddleware()

  const middleware = [thunk]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const middlewares = [
    sagaMiddleware
  ]

  const enhancers = [
    applyMiddleware(...middlewares)
  ]
  let composeEnhancers = compose

  if (__DEV__) {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  // To unsubscribe, invoke `store.unsubscribeHistory()` anytime
  store.unsubscribeHistory = browserHistory.listen(updateLocation(store))
  sagaMiddleware.run(mySaga)
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  if (localStorage.jwtToken) {
     const token = localStorage.jwtToken;
     setAuthorizationToken(token);
     store.dispatch({ type: SET_CURRENT_USER_FROM_TOKEN, token });
  }
  setAuthorizationToken(localStorage.jwtToken);

  return store
}

export default createStore
