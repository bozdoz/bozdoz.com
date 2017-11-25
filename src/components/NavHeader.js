import React from 'react';
import { Link } from 'react-router-dom';

const NavHeader = () => (
	<div id="brand-link">
		<Link to="/">
			<img className="img-responsive rounded-circle mr-3"
				src="https://secure.gravatar.com/avatar/008a440567c800274d0d2faa93da916c?s=64"
				alt="Benjamin J DeLong" 
				title="Me" /> 
			<h1>@bozdoz</h1>
		</Link>
	</div>
);

export default NavHeader;