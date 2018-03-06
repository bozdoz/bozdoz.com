import React from 'react';
import FrontMatter from './FrontMatter';

/**
* it intercepts request url and passes it to FrontMatter
* so it can look up the page markdown file
*/
const PlainPage = (props) => (
	<FrontMatter source={props.match.url}  {...props} />
);

export default PlainPage;