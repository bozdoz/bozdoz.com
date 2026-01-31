import path from 'path';

const dir = process.env.NODE_ENV === 'production' ? 'dist' : path.join(__dirname, '..')

const getMarkdown = async (...paths: string[]): Promise<FrontMatterObject & { source: string }> => {
  let filename, content;

  try {
    filename = path.join(dir, 'pages', ...paths.slice(0, -1), `${paths.at(-1)}.md`);
    content = await Bun.file(filename).text();
  } catch (e) {
    filename = path.join(dir, 'pages', `404.md`);
    content = await Bun.file(filename).text();
  }

  const formatted = await formatMarkdown(content);

  return { ...formatted, source: paths.join('/') };
};

// gets frontmatter and markdown doc
export const formatMarkdown = async (markdown: string): Promise<FrontMatterObject> => {
  // get frontmatter
  const [, fm, ...rest] = markdown.split(/^---\n/m)

  const attributes = { title: "Unknown Error Occurred" }
  if (fm) {
    Object.assign(attributes, Bun.YAML.parse(fm))
  }

  const body = Bun.markdown.html(rest.join('---\n'))

  return {
    attributes,
    body
  }
}

export default getMarkdown;
