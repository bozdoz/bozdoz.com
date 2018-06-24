import * as React from 'react';
import { Link } from 'react-router-dom';

const imgsize = 90;

const imgprops = {
  width: imgsize,
  height: imgsize,
  alt: 'Benjamin J DeLong',
  title: 'Me',
  src: `https://gravatar.com/avatar/008a440567c800274d0d2faa93da916c?s=${imgsize *
    2}`
};

const NavHeader = () => (
  <div id="brand-link">
    <Link to="/">
      <img className="img-responsive rounded-circle mr-3" {...imgprops} />
      <div className="profile-headers">
        <h1>Benjamin J DeLong</h1>
        <h2>Full-Stack Software Engineer</h2>
      </div>
    </Link>
  </div>
);

export default NavHeader;
