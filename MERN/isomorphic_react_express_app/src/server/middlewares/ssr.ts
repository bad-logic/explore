import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Server from '../../client/entrypoint.server';
import { createHtmlResponse } from '../utils/templateEngine';

import { Provider } from 'react-redux';
import initializeReduxStore from '../../client/store';
import { TEMPLATE_TITLES, NOT_FOUND_TITLE } from '../utils/seo';
import { getTemplateNameFromRoute as getTemplateName } from '../utils/utils';

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
  const url = getTemplateName(req.url);
  const title = TEMPLATE_TITLES[url] || NOT_FOUND_TITLE;
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
