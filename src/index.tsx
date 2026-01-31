import { watch } from 'node:fs';
import { renderToReadableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import getMarkdown from './data-utils/getMarkdown';
import InitialHTMLContext from './components/InitialHTMLContext';

const port = 8000;
globalThis.HOST = `http://localhost:${port}`;

console.log(`listening: ${HOST}`);

// for websockets (hot reloading)
globalThis.clients = globalThis.clients || new Set();

// for routes to serve static files
const getFile = (request: Request, dir: string) => {
  const url = new URL(request.url);

  return new Response(Bun.file(`./${dir}/${url.pathname}`));
};

const getDist = (request: Request) => getFile(request, 'dist');
const getPublic = (request: Request) => getFile(request, 'public');

Bun.serve({
  port,
  // TODO: is all of this better served by nginx?
  development: process.env.NODE_ENV !== 'production',
  websocket: {
    message(ws, message) {},
    open(ws) {
      clients.add(ws);
    },
    close(ws, code, reason) {
      clients.delete(ws);
    },
  },
  routes: {
    '/client.css': getDist,
    '/client.js': getDist,
    '/images/*': getPublic,
    '/favicon.ico': getPublic,
    '/socket': async (request, server) => {
      if (!server.upgrade(request)) {
        return new Response('Upgrade failed', { status: 500 });
      }
    },
    '/pages/:page': async (request) => {
      // get markdown page
      const { page } = request.params;

      // TODO: make this request only available via xhr?
      const content = await getMarkdown(page);

      return Response.json(content);
    },
    '/pages/projects/:page': async (request) => {
      // get markdown page
      const { page } = request.params;

      // TODO: make this request only available via xhr?
      const content = await getMarkdown('projects', page);

      return Response.json(content);
    },
    '/*': async (request, server) => {
      const url = new URL(request.url);
      const content = await getMarkdown(
        url.pathname === '/' ? 'index' : url.pathname,
      );
      const status = content.attributes.status || 200;

      const app = await renderToReadableStream(
        <InitialHTMLContext value={content}>
          <StaticRouter location={url.pathname}>
            <App initialHTML={JSON.stringify(content)} />
          </StaticRouter>
        </InitialHTMLContext>,
        {
          bootstrapScripts: ['/client.js'],
          onError(error, errorInfo) {
            console.error('SSR ERROR:', error, errorInfo);
          },
        },
      );

      return new Response(app, {
        status,
        headers: { 'Content-Type': 'text/html' },
      });
    },
  },
});

if (process.env.NODE_ENV !== 'production' && !globalThis.initialized) {
  const { build, resass } = await import('./build');

  // reduce issues with re-watching
  globalThis.initialized = true;

  const change = () => {
    clients.forEach((client) => {
      client.send('hello');
    });
  };

  // watch the rest for js/ts changes
  watch('./src', { recursive: true }, async (event, filename) => {
    // sass changes here
    console.log(event, filename);
    if (filename?.startsWith('css/')) {
      await resass();
    } else {
      await build();
    }
    change();
  });
}

declare global {
  var initialized: boolean;
  var clients: Set<Bun.ServerWebSocket>;
  var HOST: string;
}
