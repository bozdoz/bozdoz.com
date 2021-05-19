import { promisify } from 'util';
import path from 'path';
import { readFile } from 'fs';
import fm from 'front-matter';

const readFileAsync = promisify(readFile);

const getMarkdown = async (page: string) => {
  const filename = path.join(__dirname, '..', 'pages', `${page}.md`);
  const content = await readFileAsync(filename, 'utf8');

  return fm<FrontMatterAttributes>(content);
};

export default getMarkdown;
