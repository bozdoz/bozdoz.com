import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './layouts/Layout';
import IndexPage from './pages/IndexPage';
import Projects from './Projects';
import ProjectPage from './pages/ProjectPage';
import ResumePage from './pages/ResumePage';
import NotFoundPage from './pages/NotFoundPage';
import ScrollToTop from './ScrollToTop';
import GoogleAnalytics from './GoogleAnalytics';
import FrontMatter from './FrontMatter';

const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/projects/:id" component={ProjectPage} />
      <Route exact path="/resume" component={ResumePage} />
      <Route exact path="/privacy" component={FrontMatter} />
      {/* @since 2020-04-29 */}
      <Redirect from="/about" to="/" />
      <Route component={NotFoundPage} />
    </Switch>
    <ScrollToTop />
    <GoogleAnalytics />
  </Layout>
);

export default App;
