import React from 'react';
import Breadcrumbs from './Breadcrumbs';

const LoadingPage = (props) => {
	let className = 'loading page';

	if (props.className) {
		className += ` ${props.className}`;
	}
	return (
		<article className={className}>
			<header>
				<div className="header-image" />
				<div className="header-title">
					<h1>AAAAAAAAAA</h1>
					<h2>BBBBBBBB</h2>
				</div>
			</header>
			<Breadcrumbs />
			<div className="container markdown">
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
				Lorem Ipsum Maybe Lorem Ipsum Maybe Lorem Ipsum Maybe
			</div>
		</article>
	);
};

export default LoadingPage;