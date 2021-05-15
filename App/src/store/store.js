import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer'
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux';

const enhancers = [
  applyMiddleware(
    thunkMiddleware,
  ),
];

const composeEnhancers =
  (__DEV__ &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const enhancer = composeEnhancers(...enhancers);

export const store = createStore(rootReducer, {}, enhancer);
export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();