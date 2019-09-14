import * as React from 'react';
import { Link } from 'react-router-dom';

type breadcrumb = (string | undefined)[];

interface Props {
  list?: breadcrumb[];
}

const Breadcrumbs = ({ list = [] }: Props) => (
  <nav className="breadcrumbs" aria-label="breadcrumbs">
    {list.map(breadcrumb => {
      const [name, link] = breadcrumb;

      console.log({ name });

      return (
        <React.Fragment key={name}>
          {link ? <Link to={link}>{name}</Link> : name}{' '}
        </React.Fragment>
      );
    })}
  </nav>
);

export default Breadcrumbs;
