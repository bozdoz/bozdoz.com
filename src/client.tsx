import { hydrateRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import InitialHTMLContext from './components/InitialHTMLContext';

// grab initial html from script and delete
const initialHTML = window.__INITIAL_HTML__;
// document.querySelector('#initial-state')?.remove();

hydrateRoot(
  document,
  <InitialHTMLContext value={initialHTML}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </InitialHTMLContext>,
);

console.log('NODE_ENV', process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  const socket = new WebSocket(`ws://${window.location.host}/socket`);

  socket.addEventListener('message', () => {
    window.location.reload();
  });
}
