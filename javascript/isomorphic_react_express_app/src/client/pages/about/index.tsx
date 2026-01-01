import React from 'react';
import { useReduxState } from '../../hooks/useRedux';
import WithMeta from '../../hoc/withMeta';

const About = () => {
  // const { isomorphic } = useReduxState();
  return <div>ABOUT OUR TEAM</div>;
};

export default WithMeta(About);
