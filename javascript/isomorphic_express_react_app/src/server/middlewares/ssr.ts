import { Request, Response, NextFunction } from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import initializeReduxStore from '../../client/store';
import Server from '../../client/entrypoint.server';
import { createHtmlResponse } from '../utils/templateEngine';
import { TEMPLATE_TITLES, NOT_FOUND_TITLE } from '../utils/seo';
import { getTemplateNameFromRoute as getTemplateName } from '../utils/utils';

export const serverSideRendering = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const store = initializeReduxStore();
    const url = getTemplateName(req.url);
    const title = TEMPLATE_TITLES[url] || NOT_FOUND_TITLE;

    // const componentHtml = ReactDOMServer.renderToStaticMarkup(
    //   React.createElement(Provider, {
    //     store,
    //     children: React.createElement(Server, {
    //       location: req.url,
    //     }),
    //   })
    // );

    const componentHtml = ReactDOMServer.renderToString(
      React.createElement(Provider, {
        store,
        children: React.createElement(Server, {
          location: req.url,
        }),
      })
    );

    const html = await createHtmlResponse(
      'index.html',
      {
        title: title,
        content: componentHtml,
      },
      store.getState()
    );
    res.send(html);
  } catch (err) {
    console.log({ err });
  }
};
