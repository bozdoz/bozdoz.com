import * as React from 'react';

import Title from '../Title';
import Breadcrumbs from '../Breadcrumbs';

type breadcrumb = (string | undefined)[];

interface Props extends FrontMatterAttributes {
  header?: string;
  className?: string;
  children?: React.ReactNodeArray;
  breadcrumbs?: breadcrumb[];
}

const PageLayout = (props: Props) => {
  const {
    title,
    header,
    subtitle,
    children,
    image,
    className,
    modified_date
  } = props;

  let classname = 'page';
  let { breadcrumbs } = props;

  if (className) {
    classname += ` ${className}`;
  }

  if (breadcrumbs) {
    // add non-linking title
    breadcrumbs = [...breadcrumbs, [title]];
  }

  return (
    <article className={classname}>
      <header>
        {image && (
          <div
            className="header-image"
            style={{
              backgroundImage: `url(${image})`
            }}
          />
        )}
        <div className="header-title">
          <Title header={header}>{title}</Title>
          {subtitle && <h2>{subtitle}</h2>}
          {modified_date && <h5>Last modified: {modified_date}</h5>}
        </div>
      </header>
      {breadcrumbs && <Breadcrumbs list={breadcrumbs} />}
      {children}
    </article>
  );
};

export default PageLayout;
