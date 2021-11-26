import React from 'react';
import { useReduxState } from '../../hooks/useRedux';
import { TEMPLATE_TITLES } from '../../../server/utils/seo';

const App = () => {
  // const { isomorphic } = useReduxState();

  React.useEffect(() => {
    document.getElementsByTagName('title')[0].innerHTML =
      TEMPLATE_TITLES['about-us'];
  }, []);

  return <div>ABOUT OUR TEAM</div>;
};

export default App;
