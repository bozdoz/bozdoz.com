import React from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import Breadcrumbs from './Breadcrumbs';

const PageLayout = (props) => {
	const {
		title,
		subtitle,
		children,
		image
	} = props;

	let classname = 'page';
	let breadcrumbs = props.breadcrumbs;

	if (props.className) {
		classname += ` ${props.className}`;
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
				<Title>{title}</Title>
			{subtitle && 
				<h2>{subtitle}</h2>
			}
			</div>
		</header>
		{breadcrumbs && <Breadcrumbs list={breadcrumbs} />}
		{ children }
	</article>
	);
};

PageLayout.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	image: PropTypes.string,
	className: PropTypes.string,
};

export default PageLayout;