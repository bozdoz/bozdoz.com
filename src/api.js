import path from 'path';
import express from 'express';
import fs from 'fs';
import fm from 'front-matter';
import { graphql } from 'graphql';
import schema from './graphql/schema';

export const getMarkdown = (page) => {
	const filename = path.join(__dirname, 'pages', `${page}.md`);
	const content = fs.readFileSync(filename, 'utf8');

	return fm(content);
};

const router = express.Router();

// ajax page requests
router.get('/pages/*', function (req, res) {
	const page = req.params['0'];
	let status = 200;
	let content = {
		attributes: {}, 
		body: ""
	};

	try {
		if (req.xhr) {
			content = getMarkdown(page);
		}
	} catch (e) {
		// can't find a file; return 404
		content = getMarkdown('404');
		status = 404;
	}

	res.status(status)
		.json(content);
});

// ajax tag requests
router.get('/tags*', async (req, res) => {
	let tag = req.params['0'].replace(/^\//, '');
	let status = 200;
	let content = {};
	let query;

	if (tag) {
		// slug to tag
		tag = tag.replace(/\-/g, ' ');
		query = `{
			tag (name: "${tag}") {
				name,
				posts {
					id,
					title,
					image
				}
			}
		}`;
	} else {
		query = `{ 
			tags {
				name
			}
		}`;
	}

	await graphql(schema, query)
		.then((response) => {
			if (response.errors) {
				status = 404;
				return response.errors;
			}
			return response.data || {}
		})
		.then((data) => {
			content = data;
		})
		.catch((err) => {
			status = 404;
			content = {
				errors: err
			}
		});

	res.status(status)
		.json(content);
});

export default router;