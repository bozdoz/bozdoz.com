import React from 'react';
import Nav from './Nav';
import NavFooter from './NavFooter';
import { Link } from 'react-router-dom';

const Layout = (props) => (
	<div id="page-container">
		<nav id="nav" role="navigation">
			<div id="nav-top">
				<div id="brand-link">
					<Link to="/"><h1>@bozdoz</h1></Link>
				</div>
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