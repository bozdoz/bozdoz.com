import { useEffect, useState } from 'react';

import Breadcrumbs from '../Breadcrumbs';

interface Props {
  className?: string;
}

const LoadingPage = (props: Props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // set loading to true
    // if component has been mounted too long
    const timeout = setTimeout(() => {
      setLoading(true);
    }, 500);
    clearTimeout(timeout);
  });

  let className = 'loading page';

  if (props.className) {
    className += ` ${props.className}`;
  }

  if (!loading) {
    // render blank page if
    // load time is small enough
    return <article className={className} />;
  }

  return (
    <article className={className}>
      <header>
        <div className="header-image" />
        <div className="header-title">
          <h1>&nbsp;</h1>
          <h2>&nbsp;</h2>
        </div>
      </header>
      <Breadcrumbs />
      <div className="container markdown">&nbsp;</div>
    </article>
  );
};

export default LoadingPage;
