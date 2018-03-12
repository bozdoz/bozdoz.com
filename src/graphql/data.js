import fs from 'fs';
import path from 'path';
import fm from 'front-matter';

// unique tags
const tags = {};

// out data and schema
const data = {
	tags: [],
	posts: []
};

const projectpath = path.join(__dirname, '..', 'pages', 'projects');

fs.readdirSync(projectpath).forEach((file) => {
	const filename = path.join(projectpath, file);
	const content = fs.readFileSync(filename, 'utf8');
	
	const obj = fm(content);
	const post = obj.attributes;
	const ptags = post.tags.slice();

	// add new details
	post.id = file.replace(/\.md$/, '');

	// update tags format to match schema
	post.tags = post.tags.map((a) => (
		{name: a}
	));

	data.posts.push( post );

	// update unique tags
	ptags.forEach((tag) => {
		if (!tags[tag]) {
			// update list of posts
			tags[tag] = [];
		}
		tags[tag].push( post );
	});
});

Object.keys(tags).forEach((tag) => {
	// save desired output for tags
	data.tags.push({
		name: tag,
		posts: tags[tag]
	});
});

export default data;