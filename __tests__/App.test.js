import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../src/components/App';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(
  		<Router>
  			<App />
  		</Router>
  ).toJSON();
  expect(rendered).toBeTruthy();
});