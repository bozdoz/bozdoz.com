import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import resume from '../data/resume';

import FrontMatter from './FrontMatter';

const ResumeHighlightList = props => (
    <ul className="resume-highlight-list">
        {props.list.map((item, i) => (
            <li key={i} className="resume-highlight-item">
                {item}
            </li>
        ))}
    </ul>
);

ResumeHighlightList.propTypes = {
    list: PropTypes.array.isRequired
};

const ResumeSection = ({ header, subheader, date, bullets }) => (
    <div>
        {header && <h4>{header}</h4>}
        {subheader && (
            <h5>
                {subheader}
                {date && (
                    <small className="ml-1 text-muted">
                        &nbsp;&nbsp;({date})
                    </small>
                )}
            </h5>
        )}
        {bullets && <ResumeHighlightList list={bullets} />}
    </div>
);

ResumeSection.propTypes = {
    header: PropTypes.string,
    subheader: PropTypes.string,
    date: PropTypes.string,
    bullets: PropTypes.array
};

export default props => (
    <FrontMatter className="resume-page" source="resume" {...props}>
        <div id="resume" className="container-fluid">
            <section className="table-row">
                <div className="section-title text-success">
                    <h3>EXPERIENCE</h3>
                </div>
                <div className="section-content">
                    {resume['EXPERIENCE'].map(exp => (
                        <ResumeSection key={exp.header} {...exp} />
                    ))}
                </div>
            </section>
            <section className="table-row">
                <div className="section-title text-success">
                    <h3>SKILLS</h3>
                </div>
                <div className="section-content">
                    {resume['SKILLS'].map(skill => (
                        <ResumeSection key={skill.header} {...skill} />
                    ))}
                </div>
            </section>
            <section className="table-row">
                <div className="section-title text-success">
                    <h3>PROJECTS</h3>
                </div>
                <div className="section-content">
                    {Object.keys(resume['PROJECTS']).map(key => (
                        <div key={key}>
                            <h4>{key}</h4>
                            <p>
                                {resume['PROJECTS'][key].description}{' '}
                                <Link
                                    className="badge badge-info"
                                    to={resume['PROJECTS'][key].link}
                                >
                                    View Project
                                </Link>
                            </p>
                        </div>
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
        </div>
    </FrontMatter>
);
