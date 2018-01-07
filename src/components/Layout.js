import React from 'react';
import NavHeader from './NavHeader';
import Nav from './Nav';
import NavFooter from './NavFooter';
import { Link } from 'react-router-dom';
import RouteTransitionContainer from './RouteTransitionContainer';

const Layout = (props) => (
	<div id="page-container">
		<nav id="nav">
			<div id="nav-top">
				<NavHeader />
				<Nav />
			</div>
			<NavFooter />
		</nav>
		<RouteTransitionContainer>
			{props.children}
		</RouteTransitionContainer>
	</div>
);

export default Layout;