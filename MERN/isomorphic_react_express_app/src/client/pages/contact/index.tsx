import React from 'react';
import { TEMPLATE_TITLES } from '../../../server/utils/seo';

const App = () => {
  React.useEffect(() => {
    document.getElementsByTagName('title')[0].innerHTML =
      TEMPLATE_TITLES['contact-us'];
  }, []);
  return <div>CONTACT US</div>;
};

export default App;
