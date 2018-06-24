import * as React from 'react';
import { Redirect } from 'react-router';
import * as PropTypes from 'prop-types';
import * as marked from 'marked';

class MarkDown extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}
	handleOnClick (href) {
		this.setState({
			redirect: href
		});
	}
	componentDidMount () {
		const host = new RegExp(`^https?://${window.location.host}`);

		/*
		jest renderer doesn't create
	 	this.container (apparently)
	 	*/
		if (!this.container) {
			return false;
		}

		// change links to use react router
		// or open new tabs
		this.container
			.querySelectorAll('a')
			.forEach((a) => {
				if (a.href.match( host )) {
					// add redirect handler
					a.addEventListener('click', (e) => {
						e.preventDefault();
						this.handleOnClick(e.target.getAttribute('href'));
					});
				} else {
					// otherwise push to a new tab
					a.target = '_blank';
				}
			});

		// style codeblocks;
		if (typeof(Prism) !== 'undefined') {
			Prism.highlightAll();
		}

		// add links to headers
		['h1','h2','h3','h4','h5'].forEach((a) => {
			this.container
				.querySelectorAll(a)
				.forEach((header) => {
					const anchor = document.createElement('a');
					anchor.className = `header-link`;
					anchor.href = `#${header.id}`;
					anchor.innerHTML = '<i class="fa fa-link" aria-hidden="true"></i>';
					header.appendChild(anchor);
				});
		});

		// copy img alt text to title
		this.container
			.querySelectorAll('img')
			.forEach(img => {
				img.title = img.alt;
			});

		// todo: add header links to top of `this.container`
		// as a list of skip-to links

		// maybe do some wordpress-style shortcodes someday!! :)
		// idea: [fa icon=link]
	}
	render () {
		if (this.state.redirect) {
			return <Redirect push to={this.state.redirect} />;
		}
		return (
			<div ref={(a) => { this.container = a; }}
				className="container markdown" 
				dangerouslySetInnerHTML={{
					__html: marked.parse(this.props.content)
				}} />
		);
	}
}

MarkDown.propTypes = {
	content: PropTypes.string
};

export default MarkDown;