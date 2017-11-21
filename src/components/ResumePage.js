import React from 'react';
import PropTypes from 'prop-types';
import PageLayout from './PageLayout';
import { Link } from 'react-router-dom';

const resume = {
	'EXPERIENCE' : [
		'Built, designed, and maintained 2 large-scale, data-driven websites in Django',
		'Designed intuitive, responsive websites and user interfaces with JavaScript and CSS',
		'Wrote and benchmarked database queries in PostgreSQL and PostGIS',
		'Optimized server performance with NGINX and Varnish caching',
		'Maintained websites with Continuous Integration, error tracking tools, and browser developer tools'
	],
	'SKILLS': {
		'Languages': [
			'JavaScript - jQuery, ES6, React, Node.js, Express',
			'Python - Django',
			'PHP - WordPress'
		],
		'Other': [
			'PostgreSQL, PostGIS, MySQL, Cordova/Phonegap'
		]
	},
	'PROJECTS': {
		'Leaflet Map WordPress Plugin': {
			link: '/projects/leaflet-map',
			description: 'A WordPress shortcode-based plugin to create multiple maps in posts and pages, and add multiple markers on those maps.'
		},
		'Typewrite Something': {
			link: '/projects/typewrite-something',
			description: 'An online typewriter simulator. A work in progress, a test project for Phonegap, and CasperJS test suite.'
		}
	}
};

const ResumeHighlightList = (props) => (
	<ul className="resume-highlight-list">
		{props.list.map((item, i) => (
			<li key={i} className="resume-highlight-item">{item}</li>
		))}
	</ul>
);

ResumeHighlightList.propTypes = {
	list: PropTypes.array.isRequired
};

const ResumeSection = (props) => {
	return Object.keys(props.dict).map((item) => (
		<div key={item}>
			<h4>{item}</h4>
			<ResumeHighlightList list={props.dict[item]} />
		</div>
	));
};

ResumeSection.propTypes = {
	dict: PropTypes.object.isRequired
};

const ResumePage = () => (
	<PageLayout className="resume-page" title="Benjamin J. DeLong">
		<div id="resume" className="container-fluid">
			<section className="table-row">
				<div className="section-title text-success">
					<h3>EXPERIENCE</h3>
				</div>
				<div className="section-content">
					<div className="experience-item">
						<h4>
							<span className="job-location">
								Self-Employed
							</span>&nbsp;|&nbsp; 
							<span className="job-title">
								Full Stack Web Developer
							</span>&nbsp;
						</h4>
						<h5 className="job-time-period text-muted">
							(2012 - Present)
						</h5>
						<ResumeHighlightList list={resume['EXPERIENCE']} />
					</div>
				</div>
			</section>
			<section className="table-row">
				<div className="section-title text-success">
					<h3>SKILLS</h3>
				</div>
				<div className="section-content">
					<ResumeSection dict={resume['SKILLS']} />
				</div>
			</section>
			<section className="table-row">
				<div className="section-title text-success">
					<h3>PROJECTS</h3>
				</div>
				<div className="section-content">
					{Object.keys(resume['PROJECTS']).map((key) => (
						<div key={key}>
							<h4>{key}</h4>
							<p>{resume['PROJECTS'][key].description} <Link className="badge badge-info" to={resume['PROJECTS'][key].link}>View Project</Link></p>
						</div>
					))}
				</div>
			</section>
		</div>
	</PageLayout>
);

export default ResumePage;