import React from 'react';
import { Link } from 'react-router-dom';

export type Breadcrumb = (string | undefined)[];

interface Props {
  list?: Breadcrumb[];
}

const Breadcrumbs = ({ list = [] }: Props) => (
  <nav className="breadcrumbs" aria-label="breadcrumbs">
    {list.map(breadcrumb => {
      const [name, link] = breadcrumb;

      return (
        <React.Fragment key={name}>
          {link ? <Link to={link}>{name}</Link> : name}{' '}
        </React.Fragment>
      );
    })}
  </nav>
);

export default Breadcrumbs;
