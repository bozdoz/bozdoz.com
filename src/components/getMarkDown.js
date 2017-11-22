/*json-loader!front-matter-loader!*/
const fs = require('fs');
const fm = require('front-matter');
const path = require('path');
const cache = {};
const env = process.env.NODE_ENV;

/**
* gets frontmatter/markdown from given page
*
* @param Object source
* @return Object|Null
*/
const getMarkDown = (_source) => {
	let source = _source;
	
	// strip leading and trailing slashes
	source = source.replace(/(^\/+|\/+$)/g, '');

	if (fs.readFileSync) {
		let content;
		let page;
		let _path = path.join(__dirname);

		if (env !== 'production') {
			// path changes when bundled
			_path = path.join(_path, '..');
		}

		if (cache[source]) {
			return cache[source];
		}

		try {
			content = fs.readFileSync(path.join(_path, `pages/${source}.md`), 'utf8');
			page = fm(content);
			cache[source] = page;
		} catch (e) {
			// 500 error? 404?
			return getMarkDown('404');
		}
		return page;
	}
	return require(`../pages/${source}.md`);
};

export default getMarkDown;