import { Route, Routes } from 'react-router-dom';

import Layout from './components/layouts/Layout';
import IndexPage from './components/pages/IndexPage';
import Projects from './components/Projects';
import NotFoundPage from './components/pages/NotFoundPage';
import ProjectPage from './components/pages/ProjectPage';
import ResumePage from './components/pages/ResumePage';
import AsyncPage from './components/AsyncPage';

type Props = {
  /** server-side only */
  initialHTML?: string;
};

const App = ({ initialHTML }: Props) => (
  <html lang="en" dir="ltr">
    <head>
      {initialHTML && (
        <script
          id="initial-state"
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_HTML__ = ${initialHTML};`,
          }}
        />
      )}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Elms+Sans:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Stack+Sans+Headline:wght@200..700&display=swap"
        rel="stylesheet"
      />

      <link rel="stylesheet" type="text/css" href="/client.css"></link>
    </head>
    <body>
      <div id="app">
        <Layout>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/privacy" element={<AsyncPage source="privacy" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </div>
    </body>
  </html>
);

export default App;
