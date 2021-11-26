import React from 'react';
import { TEMPLATE_TITLES } from '../../../server/utils/seo';

const App = () => {
  React.useEffect(() => {
    document.getElementsByTagName('title')[0].innerHTML =
      TEMPLATE_TITLES['home'];
  }, []);
  return (
    <>
      <div>This is react isomorphic app home page</div>
    </>
  );
};

export default App;
