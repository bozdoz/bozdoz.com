import * as React from 'react';
import { Link } from 'react-router-dom';

import PlainPage from './pages/PlainPage';

export const list = [
  {
    id: 'alberta-tomorrow',
    text: 'Alberta Tomorrow',
    description:
      'A classroom-focused, interactive mapping app designed to make students aware of some of the complexities involved in land-use planning'
  },
  {
    id: 'luke-buxton',
    text: 'Luke Buxton',
    description: 'Art director, Animator, and Production Designer'
  },
  {
    id: 'typewrite-something',
    text: 'Typewrite Something',
    description:
      'An online typewriter simulator, web app and mobile (Android) app.'
  },
  {
    id: 'leaflet-map',
    text: 'Leaflet Map',
    description:
      'Generate a Leaflet map on your WordPress site with simple shortcodes'
  }
];

export default (props: any) => (
  <PlainPage {...props}>
    <div className="container">
      <ul className="project-list list-group">
        {list.map(({ id, text, description }) => (
          <Link key={id} to={`/projects/${id}`} className="list-group-item">
            <div className="media">
              <img
                className="d-flex align-self-center mr-4"
                src={`/images/projects/${id}/${id}-sq.jpg`}
                alt={text}
                title={text}
              />
              <div className="media-body">
                <h5 className="list-group-item-heading">{text}</h5>
                <p className="list-group-item-text">{description}</p>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  </PlainPage>
);