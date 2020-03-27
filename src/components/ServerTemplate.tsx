import * as fs from 'fs';
import * as fm from 'front-matter';
import * as path from 'path';
import * as React from 'react';
import { Route } from 'react-router-dom';

import { GA_TRACKING_ID } from '../data/site_variables';

import App from './App';
import Head from './Head';

const env = process.env.NODE_ENV;

let pagedir = path.join(__dirname);

if (env !== 'production') {
  // path changes when bundled
  pagedir = path.join(pagedir, '..');
}

pagedir = path.join(pagedir, 'pages');

export { pagedir };

/**
 * gets frontmatter/markdown from given page
 *
 * @param Object source
 * @return Object|Null
 */
const getMarkdown = (_source: string): any => {
  let source = _source;

  try {
    let content = fs.readFileSync(path.join(pagedir, `${source}.md`), 'utf8');
    return fm(content);
  } catch (e) {
    // can't find a file; return 404
    return getMarkdown('404');
  }
};

/**
 * Sets Initial HTML (not needed if page.body is undefined)
 * Used and destroyed in FrontMatter.js
 */
export const InitialHTML = ({ page }: { page: object }) => (
  <script
    id="initial-state"
    dangerouslySetInnerHTML={{
      __html: `window.__INITIAL_HTML__ = ${JSON.stringify(page)};`
    }}
  />
);

/**
 * Indicates 404 Not Found
 * Used and destroyed in ProjectPage.js
 */
export const Is404 = () => (
  <script
    id="404-script"
    dangerouslySetInnerHTML={{
      __html: `window.__IS_404__ = true;`
    }}
  />
);

export const getPage = ({
  location,
  staticContext
}: {
  location: any;
  staticContext: any;
}) => {
  let page;
  if (location.pathname === '/') {
    page = getMarkdown('index');
  } else {
    page = getMarkdown(location.pathname);
  }
  staticContext.page = page;

  if (!page.attributes) {
    page.attributes = {};
  }
  return page;
};

const ServerTemplate = () => (
  <html lang="en" dir="ltr">
    <Route
      render={props => {
        const page = getPage(props);
        const atts = page.attributes;
        // conditionally load intial HTML
        // and 404 pages
        return (
          <Head {...atts}>
            {page.body && <Route render={() => <InitialHTML page={page} />} />}
            {atts.status === 404 && <Route component={Is404} />}
          </Head>
        );
      }}
    />
    <body>
      <div id="app">
        <App />
      </div>
      {env === 'production' &&
        GA_TRACKING_ID && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
        )}
      <script src="/js/main.js" />
      <script src="/js/prism.js" defer />
    </body>
  </html>
);

export default ServerTemplate;
