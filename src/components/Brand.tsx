import * as React from 'react';
import { Link } from 'react-router-dom';

const imgsize = 240;

export default () => (
  <Link id="brand-link" to="/" rel="home">
    <img
      src={`https://gravatar.com/avatar/008a440567c800274d0d2faa93da916c?s=${imgsize}`}
      width={imgsize}
      height={imgsize}
      alt="Benjamin J DeLong"
      title="Me"
    />
    <h1>@bozdoz</h1>
  </Link>
);
