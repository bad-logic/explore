import React from 'react';
import { useHistory } from 'react-router-dom';
import { getTemplateNameFromRoute } from '../../../server/utils/utils';
import { TEMPLATE_TITLES } from '../../../server/utils/seo';

const withMetaTags = <P extends object>(Component: React.ComponentType<P>) => {
  const withMetaTags: React.FC<P> = (props) => {
    const {
      location: { pathname },
    } = useHistory();

    React.useEffect(() => {
      const title = getTemplateNameFromRoute(pathname);
      document.getElementsByTagName('title')[0].innerHTML =
        TEMPLATE_TITLES[title];
    }, []);
    return <Component {...props} />;
  };
  withMetaTags.displayName = Component.displayName;
  return withMetaTags;
};

export default withMetaTags;
