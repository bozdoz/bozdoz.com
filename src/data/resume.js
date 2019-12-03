export default {
  EXPERIENCE: [
    {
      header: 'VineView',
      subheader: 'Full-Stack Software Engineer',
      date: 'May 2018 - Present',
      bullets: [
        'Developing NodeJS, React/Redux apps with TypeScript',
        'Using Mapbox GL JS, Electron JS, and Python, with Docker'
      ]
    },
    {
      header: 'ALCES Landscape & Land-use Ltd.',
      subheader: 'Full-Stack Software Engineer',
      date: 'Nov 2014 - Apr 2018',
      bullets: [
        'Planned, designed, and developed 2 data-driven, mapping applications in Django, as part of a team',
        'Translated mockups into intuitive, responsive user interfaces for web and mobile apps with JavaScript and CSS',
        'Implemented RESTful APIs for interacting with a microservices architecture'
      ]
    },
    {
      header: 'Ursudio Multimedia Marketing',
      subheader: 'Software Developer',
      date: 'Oct 2012 - Nov 2014',
      bullets: [
        'Designed intuitive user interfaces in JavaScript and CSS',
        'Maintained sites built in WordPress, and Django',
        'Developed plugins to integrate with mapping applications'
      ]
    }
  ],
  SKILLS: [
    {
      header: 'Languages',
      bullets: [
        'JavaScript - TypeScript, React, NodeJS, Express, Koa, VueJS, jQuery',
        'Python - Django',
        'PHP - WordPress'
      ]
    },
    {
      header: 'Development',
      bullets: ['Jest, ESLint, Docker, Gitlab CI/CD, CasperJS, Vagrant']
    },
    {
      header: 'Other',
      bullets: [
        'Redux, PostgreSQL, PostGIS, MySQL, Cordova/Phonegap, GraphQL, RESTful APIs, Bash'
      ]
    }
  ],
  EDUCATION: {
    header: 'Mount Saint Vincent University',
    subheader: 'Bachelor of Public Relations',
    date: 'Graduate of 2010',
    bullets: [
      'Courses included Audio-Visual, Web Design, Communications Theory, Marketing, and Business.'
    ]
  },
  PROJECTS: {
    'Alberta Tomorrow': {
      link: '/projects/alberta-tomorrow',
      description:
        'A classroom-focused mapping application, complete with interactive geo-spatial database queries, a predictive model, a RESTful API, and a free mobile app.'
    },
    'Leaflet Map WordPress Plugin': {
      link: '/projects/leaflet-map',
      description:
        'A shortcode-based WordPress plugin to create multiple Leaflet maps in posts and pages.  It has companion shortcodes to add markers, geojson, and images to those maps.  It is a solo project, and the first project where I used Object-Oriented Programming with PHP.'
    }
  }
};
