import * as React from 'react';

import { list as projectList } from './Projects';
import getMarkdown from '../util/getMarkdown';

interface Location {
  loc: string;
  priority: number;
  md?: string;
}

// add xml to TSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      urlset: any;
      url: any;
      loc: any;
      changefreq: any;
      priority: any;
      lastmod: any;
    }
  }
}

const locations: Location[] = [
  {
    loc: '/',
    priority: 1,
    md: 'index'
  },
  {
    loc: '/projects',
    priority: 0.8
  },
  ...projectList.map(({ id }) => ({
    loc: `/projects/${id}`,
    priority: 0.8
  }))
];

const Sitemap = async () => {
  const dates = await getModifiedDates();

  return (
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/1.0">
      {locations.map(({ loc, priority }) => (
        <url key={loc}>
          <loc>{`https://bozdoz.com${loc}`}</loc>
          <changefreq>Monthly</changefreq>
          <priority>{priority}</priority>
          {dates[loc] && <lastmod>{dates[loc]}</lastmod>}
        </url>
      ))}
    </urlset>
  );
};

const getModifiedDates = async () => {
  const datesForMarkdown: Record<string, string> = {};

  await Promise.all(
    locations.map(async ({ loc, md }) => {
      // read static modified date from front matter
      const {
        attributes: { modified_date }
      } = await getMarkdown(md || loc);

      if (modified_date) {
        datesForMarkdown[loc] = modified_date;
      }
    })
  );

  return datesForMarkdown;
};

export default Sitemap;
