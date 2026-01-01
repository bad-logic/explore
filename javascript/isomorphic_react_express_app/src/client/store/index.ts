import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import combinedReducer, { initialStoreState } from './slice';

const initializeReduxStore = (initialState = initialStoreState) => {
  const store = createStore(
    combinedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};

const getState = () => initialStoreState;

export type initialStoreInterface = ReturnType<typeof getState>;

export default initializeReduxStore;
