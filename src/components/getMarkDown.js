/*json-loader!front-matter-loader!*/
const fs = require('fs');
const fm = require('front-matter');
const path = require('path');
const cache = {};

/**
* gets frontmatter/markdown from given page
*
* @param Object source
* @return Object|Null
*/
const getMarkDown = (_source) => {
	let source = _source;
	if (source.match(/^\//)) {
		// strip leading slash
		source = source.substr(1);
	}
	if (fs.readFileSync) {
		let content;
		let page;	
		if (cache[source]) {
			return cache[source];
		}

		try {
			content = fs.readFileSync(path.join(__dirname, `../pages/${source}.md`), 'utf8');
			page = fm(content);
			cache[source] = page;
		} catch (e) {
			// 500 error? 404?
		}
		return page;
	}
	return require(`../pages/${source}.md`);
};

export default getMarkDown;