import fs from "fs";
import path from "path";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

// @NOTE use templating engines like pug, ejs...
interface ITemplateProps {
  title: string;
  content: string;
}
export const createHtmlResponse = async (
  template: string,
  data: ITemplateProps
) => {
  try {
    const fileContent = await readFile(
      path.join(__dirname, "templates", template)
    );
    return fileContent
      .toString()
      .replace("{{title}}", data.title)
      .replace("{{content}}", data.content);
  } catch (err) {
    console.log({ err });
    throw new Error(`Error Reading ${template}`);
  }
};
