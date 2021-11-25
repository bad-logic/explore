import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Server from '../../client/entrypoint.server';
import { createHtmlResponse } from '../utils/templateEngine';

import { Provider } from 'react-redux';
import initializeReduxStore from '../../client/store';

const TITLE_OBJECT_MAPPER: Record<string, string> = {
  home: 'Home',
  'about-us': 'About Us',
  'contact-us': 'Contact Us',
};

const NOT_FOUND_TITLE = 'Not Found';

export const serverSideRendering = async (req: any, res: any, next: any) => {
  const store = initializeReduxStore();

  const componentHtml = ReactDOMServer.renderToString(
    React.createElement(Provider, {
      store,
      children: React.createElement(Server, {
        location: req.url,
      }),
    })
  );
  const url = req.url.replace(/\//g, '').toLowerCase() || 'home'; // in case the url is / only
  const title = TITLE_OBJECT_MAPPER[url] || NOT_FOUND_TITLE;
  const html = await createHtmlResponse(
    'index.html',
    {
      title: title,
      content: componentHtml,
    },
    store.getState()
  );
  res.send(html);
};
