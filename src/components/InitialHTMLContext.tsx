import { createContext } from 'react';

const InitialHTMLContext = createContext<typeof window.__INITIAL_HTML__>({
  body: '<div>unknown</div>',
  attributes: {
    title: 'unknown',
  },
  source: 'unknown',
});

export default InitialHTMLContext;
