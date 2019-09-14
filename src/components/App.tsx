import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './layouts/Layout';
import IndexPage from './pages/IndexPage';
import Projects from './Projects';
import ProjectPage from './pages/ProjectPage';
import ResumePage from './pages/ResumePage';
import AboutPage from './pages/AboutPage';
import PlainPage from './pages/PlainPage';
import NotFoundPage from './pages/NotFoundPage';
import ScrollToTop from './ScrollToTop';
import GoogleAnalytics from './GoogleAnalytics';

const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={IndexPage} />
      <Route exact path="/projects" component={Projects} />
      <Route exact path="/projects/:id" component={ProjectPage} />
      <Route exact path="/resume" component={ResumePage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/privacy" component={PlainPage} />
      <Route component={NotFoundPage} />
    </Switch>
    <ScrollToTop />
    <GoogleAnalytics />
  </Layout>
);

export default App;
