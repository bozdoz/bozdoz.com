import * as React from 'react';
import { Link } from 'react-router-dom';

const imgsize = 90;

export default () => (
  <Link id="brand-link" to="/" rel="home">
    <img
      src={`https://gravatar.com/avatar/008a440567c800274d0d2faa93da916c?s=${imgsize *
        2}`}
      width={imgsize}
      height={imgsize}
      alt="Benjamin J DeLong"
      title="Me"
    />
    <div>
      <h1>Benjamin J DeLong</h1>
      <h2>Software Engineer</h2>
    </div>
  </Link>
);
