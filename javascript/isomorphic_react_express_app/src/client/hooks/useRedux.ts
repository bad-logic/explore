import { initialStoreInterface } from '../store';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

const useAppSelector: TypedUseSelectorHook<initialStoreInterface> = useSelector;

// hooks that returns the redux state values
export const useReduxState = () => {
  const globalState = useAppSelector((state) => state?.global);
  return globalState;
};
