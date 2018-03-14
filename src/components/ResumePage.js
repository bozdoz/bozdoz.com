import React from 'react';
import PropTypes from 'prop-types';
import FrontMatter from './FrontMatter';
import { Link } from 'react-router-dom';

const resume = {
	'EXPERIENCE' : {
		"header" : "ALCES Landscape & Land-use Ltd.",
		"subheader" : "Full Stack Web Developer",
		"date" : "Oct. 2012 - Present",
		"bullets": [
			'Planned, designed, and developed 2 data-driven, map-based websites in Django, as part of a team',
			'Translated mockups into intuitive, responsive user interfaces for web and mobile apps with JavaScript and CSS',
			'Maintained websites with automated testing suites, Continuous Integration, and browser developer tools',
		],
	},
	'SKILLS': [
		{
			"header": "Languages",
			"bullets": [
				'JavaScript - jQuery, ES6, React, Node.js, Express',
				'Python - Django',
				'PHP - WordPress',
			]
		},
		{
			"header": 'Development', 
			"bullets": [
				'JSHint, CasperJS, Jest, TypeScript, Vagrant'
			],
		},
		{
			"header": 'Other', 
			"bullets": [
				'PostgreSQL, PostGIS, MySQL, Cordova/Phonegap, GraphQL, RESTful APIs, Bash, YAML'
			]
		}
	],
	'EDUCATION': {
		"header": "Mount Saint Vincent University",
		"subheader": "Bachelor of Public Relations",
		"date": "Graduate of 2010",
		"bullets": [
			"Courses included Audio-Visual, Web Design, Communications Theory, Marketing, and Business."
		]
	},
	'PROJECTS': {
		'Alberta Tomorrow': {
			link: '/projects/alberta-tomorrow',
			description: 'A classroom-focused mapping application, complete with interactive geo-spatial database queries, a predictive model, a RESTful API, and a free mobile app.'
		},
		'Leaflet Map WordPress Plugin': {
			link: '/projects/leaflet-map',
			description: 'A shortcode-based WordPress plugin to create multiple Leaflet maps in posts and pages.  It has companion shortcodes to add markers, geojson, and images to those maps.  It is a solo project, and the first project where I used Object-Oriented Programming with PHP.'
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

const ResumeSection = ({header, subheader, date, bullets}) => (
	<div>
		{header && 
			<h4>{header}</h4>
		}
		{subheader &&
			<h5>
				{subheader}
				{date &&
					<small className="ml-1 text-muted">&nbsp;&nbsp;({date})</small>
				}
			</h5>
		}
		{bullets &&
			<ResumeHighlightList list={bullets} />
		}
	</div>
);

ResumeSection.propTypes = {
	header: PropTypes.string,
	subheader: PropTypes.string,
	date: PropTypes.string,
	bullets: PropTypes.array,
}

const ResumePage = () => (
	<FrontMatter className="resume-page" source="resume">
		<div id="resume" className="container-fluid">
			<section className="table-row">
				<div className="section-title text-success">
					<h3>EXPERIENCE</h3>
				</div>
				<div className="section-content">
					<ResumeSection {...resume['EXPERIENCE']} />
				</div>
			</section>
			<section className="table-row">
				<div className="section-title text-success">
					<h3>SKILLS</h3>
				</div>
				<div className="section-content">
					{resume['SKILLS'].map((skill) => (
						<ResumeSection key={skill.header} {...skill} />
					))}
				</div>
			</section>
			<section className="table-row">
				<div className="section-title text-success">
					<h3>EDUCATION</h3>
				</div>
				<div className="section-content">
					<ResumeSection {...resume['EDUCATION']} />
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
	</FrontMatter>
);

export default ResumePage;