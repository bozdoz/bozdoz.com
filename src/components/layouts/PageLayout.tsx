import React from 'react';

import Title from '../Title';
import Breadcrumbs, { Breadcrumb } from '../Breadcrumbs';

export interface PageLayoutProps extends FrontMatterAttributes {
  header?: string;
  className?: string;
  children?: React.ReactNodeArray;
  breadcrumbs?: Breadcrumb[];
}

const PageLayout = (props: PageLayoutProps) => {
  const { title, header, subtitle, children, image, className } = props;

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
        </div>
      </header>
      {breadcrumbs && <Breadcrumbs list={breadcrumbs} />}
      {children}
    </article>
  );
};

export default PageLayout;
