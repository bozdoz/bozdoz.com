import * as React from 'react';
import * as PropTypes from 'prop-types';

import Title from './Title';
import Breadcrumbs from './Breadcrumbs';

const PageLayout = (props) => {
	const {
		title,
		header,
		subtitle,
		children,
		image,
		className
	} = props;

	let classname = 'page';
	let breadcrumbs = props.breadcrumbs;

	if (className) {
		classname += ` ${className}`;
	}

	if (breadcrumbs) {
		// add non-linking title 
		breadcrumbs = [...breadcrumbs, title];
	}
	return (
	<article className={classname}>
		<header>
			{image &&
				<div className="header-image"
					style={{
						backgroundImage: `url(${image})`
					}} />}
			<div className="header-title">
				<Title header={header}>{title}</Title>
			{subtitle && 
				<h2>{subtitle}</h2>
			}
			</div>
		</header>
		{breadcrumbs && 
			<Breadcrumbs list={breadcrumbs} />
		}
		{ children }
	</article>
	);
};

PageLayout.propTypes = {
	title: PropTypes.string.isRequired,
	header: PropTypes.string,
	subtitle: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	image: PropTypes.string,
	className: PropTypes.string,
};

export default PageLayout;