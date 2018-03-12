import React from 'react';
import { default as Enzyme, mount as render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { StaticRouter as Router, Route } from 'react-router-dom';
import App from '../src/components/App';
import { getPage, InitialHTML, Is404 } from '../src/components/ServerTemplate';
import { list as projectlist } from '../src/components/Projects';
import { getMarkdown as mockMarkdown } from '../src/api.js';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('axios', () => {
	return {
		get: (url) => {
			const md = url.replace('/pages', '');
			return new Promise((resolve, reject) => {
				resolve({
					data: mockMarkdown(md)
				});
			}).catch((error) => console.error(error));
		},
		CancelToken: {
			source: () => 'asdf'
		}
	};
});

/**
* Sends a url to React Router and 
* renders a page
*
* @param String url
* @return Component
*/
const loadPage = (url) => {
	const wrapper = render((
		<Router location={url} context={{}}>
			<div>
				<Route render={(props) => {
					const page = getPage(props);
					const atts = page.attributes;
					return (
						<React.Fragment>
							<Route render={() => (
								<InitialHTML page={page} />
							)} />
							{atts.status === 404 &&
								<Route component={Is404} />
							}
						</React.Fragment>
					);
				}} />
				<App />
			</div>
		</Router>
	));
	expect(wrapper).toBeTruthy();
	return wrapper;
};

describe('Render all pages without error', () => {
	test('Index', () => {
		const wrapper = loadPage('/');
		expect(wrapper.find('.header-title h1').text()).toBe('@bozdoz');
	});

	test('About', () => {
		const wrapper = loadPage('/about');
		expect(wrapper.find('.header-title h1').text()).toBe('About');
	});

	test('Projects', () => {
		const wrapper = loadPage('/projects');
		expect(wrapper.find('.header-title h1').text()).toBe('Projects');
	});

	// render all project pages
	projectlist.forEach((a) => {
		test(a.text, () => {
			const wrapper = loadPage(`/projects/${a.id}`);
			expect(wrapper.find('.header-title h1').text()).toBe(`${a.text}`);
		});
	});

	// test 404
	test('Generic 404', () => {
		const wrapper = loadPage('/asdf');
		expect(wrapper.find('.header-title h1').text()).toBe('Not Found');
	});

	// test a project that isn't found
	test('Project prefixed 404', () => {
		const wrapper = loadPage('/projects/asdf');
		expect(wrapper.find('.header-title h1').text()).toBe('Not Found');
	});
});