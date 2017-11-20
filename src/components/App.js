import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './Layout';
import IndexPage from './IndexPage';
import Projects from './Projects';
import ProjectPage from './ProjectPage';
import ResumePage from './ResumePage';
import AboutPage from './AboutPage';
import Content from './Content';
import NotFoundPage from './NotFoundPage';
import ScrollToTop from './ScrollToTop';
import GoogleAnalytics from './GoogleAnalytics';

const PlainPage = (props) => (
	<Content source={props.match.url}  {...props} /> 
);

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