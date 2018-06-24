import * as React from 'react';

import { SITE, GFONT_FAMILY } from '../data/site_variables';

const env = process.env.NODE_ENV;
interface Props {
  title: string;
  description: string;
  image: string;
  children: React.ReactChildren;
}

const defaultDescription = `Full-Stack Software Engineer from Halifax, 
  Nova Scotia, specializing in JavaScript and interactive mapping applications.`;

const Head = (props: Props) => {
  const {
    description = defaultDescription,
    image = '/images/bozdoz.jpg'
  } = props;

  let { title = '@bozdoz' } = props;

  if (title !== defaultDescription) {
    // DRY
    title = `${title} - @bozdoz`;
  }

  return (
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content="#5171E0" />

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="bozdoz, Benjamin, DeLong, software engineer, web developer, web design, programmer, halifax, nova scotia, ns"
      />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@bozdoz" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@bozdoz" />
      <meta name="twitter:image" content={SITE + image} />

      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={SITE} />
      <meta property="og:image" content={SITE + image} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:locale" content="en_CA" />

      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={`https://fonts.googleapis.com/css?family=${GFONT_FAMILY}`}
        crossOrigin="anonymous"
      />

      {env === 'production' &&
        <link rel="stylesheet" href="/css/main.css" />
      }

      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      {props.children}
    </head>
  );
};

export default Head;
