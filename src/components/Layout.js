import * as React from 'react';
import { Link } from 'react-router-dom';

import NavHeader from './NavHeader';
import Nav from './Nav';
import NavFooter from './NavFooter';

const Layout = (props) => (
	<div id="page-container">
		<nav id="nav">
			<div id="nav-top">
				<NavHeader />
				<Nav />
			</div>
			<NavFooter />
		</nav>
		<main id="main">
			{props.children}
		</main>
	</div>
);

export default Layout;