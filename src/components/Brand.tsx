import React from 'react';
import { Link } from 'react-router-dom';
import SocialNav from './SocialNav';

const imgsize = 90;

const Brand = () => (
  <div id="brand">
    <Link to="/" rel="home" aria-hidden>
      <img
        id="avatar"
        src={`https://gravatar.com/avatar/008a440567c800274d0d2faa93da916c?s=${imgsize *
          2}`}
        width={imgsize}
        height={imgsize}
        role="presentation"
        alt=""
        title="Me"
      />
    </Link>
    <div>
      <Link to="/" rel="home">
        <h1>Benjamin J DeLong</h1>
        <h2>Software Engineer</h2>
      </Link>
      <SocialNav />
    </div>
  </div>
);

export default Brand;
