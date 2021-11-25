import React from 'react';
import { useReduxState } from '../../hooks/useRedux';
const App = () => {
  const { isomorphic } = useReduxState();
  console.log({ isomorphic });
  return <div>ABOUT OUR TEAM</div>;
};

export default App;
