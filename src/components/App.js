import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './IndexPage';
import Projects from './Projects';
import ProjectPage from './ProjectPage';
import ResumePage from './ResumePage';
import AboutPage from './AboutPage';
import PlainPage from './PlainPage';
import NotFoundPage from './NotFoundPage';
import ScrollToTop from './ScrollToTop';
import GoogleAnalytics from './GoogleAnalytics';

const App = () => (
	<Layout>
		<Switch>
			<Route exact path="/" component={IndexPage} />
			<Route path="/projects/:id" component={ProjectPage} />
			<Route path="/projects" component={Projects} />
			<Route path="/resume" component={ResumePage} />
			<Route path="/about" component={AboutPage} />
			<Route path="/privacy" component={PlainPage} />
			<Route component={NotFoundPage} />
		</Switch>
		<ScrollToTop />
		<GoogleAnalytics />
	</Layout>
);

export default App;