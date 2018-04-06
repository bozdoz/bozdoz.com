import React from 'react';
import PropTypes from 'prop-types';
import { SITE } from '../config';

const env = process.env.NODE_ENV;

const Head = (props) => {
  const {
    description,
    image
  } = props;
  
  let { title } = props;

  if (title !== Head.defaultProps.title) {
    // DRY
    title = `${title} - @bozdoz`;
  }

  return (
  <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#000000" />

      <meta
        name="keywords"
        content="Benjamin, DeLong, bozdoz, software engineer, web developer, halifax, nova scotia" />
      <meta
        name="description"
        content={description} />

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

      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" crossOrigin="anonymous" />
      
      {env === 'production' &&
        <link rel="stylesheet" href="/css/main.css" />
      }

      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

      <title>{title}</title>
      {props.children}
    </head>
  );
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
};

Head.defaultProps = {
  title: '@bozdoz',
  description: 'Software Engineer from Halifax, Nova Scotia; specialized in JavaScript and interactive mapping applications.',
  image: '/images/bozdoz.jpg'
};

export default Head;
