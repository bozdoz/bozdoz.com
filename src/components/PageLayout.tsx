import * as React from 'react';

import Title from './Title';
import Breadcrumbs from './Breadcrumbs';

interface Props {
	title: string
	header?: string
	subtitle?: string | JSX.Element
	image?: string
	className?: string
	children?: React.ReactNodeArray
	breadcrumbs?: string[]
}

const PageLayout = (props: Props) => {
	const {
		title,
		header,
		subtitle,
		children,
		image,
		className
	} = props;

	let classname = 'page';
	let { breadcrumbs } = props;

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

export default PageLayout;