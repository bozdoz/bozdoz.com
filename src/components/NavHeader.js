import React from 'react';
import { Link } from 'react-router-dom';

const NavHeader = () => (
	<div id="brand-link">
		<Link to="/">
			<img className="img-responsive rounded-circle mr-3"
				src="https://secure.gravatar.com/avatar/008a440567c800274d0d2faa93da916c"
				alt="Benjamin J DeLong" 
				title="Me" />
			<div className="profile-headers"> 
				<h1>Benjamin J DeLong</h1>
				<h2>Full Stack Web Developer</h2>
			</div>
		</Link>
	</div>
);

export default NavHeader;