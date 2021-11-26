import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { initialStoreInterface } from '../../client/store';
import { CUSTOM_BROWSER_OBJECTS } from '../utils/browser';

const readFile = promisify(fs.readFile);

// @NOTE use templating engines like pug, ejs...
interface ITemplateProps {
  title: string;
  content: string;
}
export const createHtmlResponse = async (
  template: string,
  data: ITemplateProps,
  reduxStore: initialStoreInterface
) => {
  try {
    const fileContent = await readFile(
      path.join(__dirname, 'templates', template)
    );
    return fileContent
      .toString()
      .replace('{{title}}', data.title)
      .replace('{{content}}', data.content)
      .replace(
        '{{redux_store_script}}',
        `<script>window.${
          CUSTOM_BROWSER_OBJECTS.REDUX_STORE_STATE
        }=${JSON.stringify(reduxStore)}</script>`
      );
  } catch (err) {
    console.log({ err });
    throw new Error(`Error Reading ${template}`);
  }
};
