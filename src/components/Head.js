import React from 'react';
import PropTypes from 'prop-types';
import { SITE } from '../config';

const env = process.env.NODE_ENV;

const Head = (props) => {
  const {
    title,
    description,
    image
  } = props;
  return (
  <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#000000" />
      <link rel="shortcut icon" href="/favicon.ico" />

      <meta
        name="keywords"
        content="Benjamin, DeLong, bozdoz, web developer, halifax, nova scotia" />
      <meta
        name="description"
        content={description} />

      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={SITE + image} />

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

      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossOrigin="anonymous" />
      
      {env === 'production' &&
        <link rel="stylesheet" href="/css/main.css" />
      }

      <link rel="stylesheet" href="/css/font-awesome.min.css" />

      {title === Head.defaultProps.title ?
        <title>{title}</title>
        :
        <title>{`${title} - @bozdoz`}</title>
      }
    </head>
  );
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

Head.defaultProps = {
  title: '@bozdoz',
  description: 'Web developer in Halifax, Nova Scotia',
  image: '/images/bozdoz.jpg'
};

export default Head;