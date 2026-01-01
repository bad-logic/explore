import { combineReducers } from 'redux';
// slice imports
import isomorphicReducer, {
  initialState as isomorphicInitialStates,
} from './isomorphic/slice';

export const initialStoreState = {
  global: {
    isomorphic: isomorphicInitialStates,
  },
};

export default combineReducers({
  global: combineReducers({
    isomorphic: isomorphicReducer,
  }),
});
