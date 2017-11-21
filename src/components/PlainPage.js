import React from 'react';
import FrontMatter from './FrontMatter';

const PlainPage = (props) => (
	<FrontMatter source={props.match.url}  {...props} />
);

export default PlainPage;