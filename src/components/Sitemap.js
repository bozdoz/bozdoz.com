import React from 'react';
import fs from 'fs';
import path from 'path';
import { pagedir } from './ServerTemplate';
import { list as projectlist } from './Projects';

const locations = [
	{
		loc: "/",
		priority: 1,
		md: 'index.md'
	},
	{
		loc: "/projects",
		priority: 0.8
	},
	...projectlist.map(({id}) => (
		{
			loc: `/projects/${id}`,
			priority: 0.8
		}
	)),
	{
		loc: "/about",
		priority: 0.5
	},
];

const getPath = (loc, md) => {
	// md file for "home/index" above
	if (md) {
		return path.join(pagedir, md);
	}
	// other files are purely based on their URL
	return path.join(pagedir, loc) + '.md'
}

const getDateFormat = (date) => {
	// convert to 'YYYY-MM-DD'
	date = new Date(date);

	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (month < 10) {
		month = `0${month}`;
	}

	if (day < 10) {
		day = `0${day}`;
	}

	return [
		date.getFullYear(),
		month,
		day
	].join('-');
};

const Sitemap = () => (
 	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/1.0">
		{locations.map(({loc, priority, md}) => (
			<url key={loc}>
			<loc>{`https://bozdoz.com${loc}`}</loc>
			<changefreq>Monthly</changefreq>
			<priority>{priority}</priority>
			<lastmod>{
				getDateFormat(fs.statSync(getPath(loc, md)).mtime)
			}</lastmod>
		  </url>
			))}
	</urlset>	
);

export default Sitemap;