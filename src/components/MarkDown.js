import React from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import marked from 'marked';

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
		// change links to target blank
		this.container
			.querySelectorAll('a')
			.forEach((a) => {
				if (a.href.match(/(localhost|bozdoz.com)/)) {
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
					anchor.ariaHidden = 'true';
					anchor.className = `header-link`;
					anchor.href = `#${header.id}`;
					anchor.innerHTML = '<i class="fa fa-link" aria-hidden="true"></i>';
					header.appendChild(anchor);
				});
		});
	}
	render () {
		if (this.state.redirect) {
			return <Redirect push to={this.state.redirect} />;
		}
		return (
			<div ref={(a) => { this.container = a; }}
				className="container" 
				dangerouslySetInnerHTML={{
					__html: marked(this.props.content)
				}} />
		);
	}
}

MarkDown.propTypes = {
	content: PropTypes.string
};

export default MarkDown;