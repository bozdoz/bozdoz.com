import React from 'react';
import PropTypes from 'prop-types';
import path from 'path';
import MarkDown from './MarkDown';
import TagList from './TagList';
import PageLayout from './PageLayout';
import LoadingPage from './LoadingPage';
import AjaxContent from './AjaxContent';

class FrontMatter extends AjaxContent {
	constructor(props) {
		super(props);

		let page = props.page || null;

		this.source = path.join('/', 'api', 'pages', props.source);

		if (props.staticContext) {
			// server-side rendering already has it
			page = props.staticContext.page;
		} else if (
			typeof(window) !== 'undefined' && 
			window.__INITIAL_HTML__
		) {
			// client-side initial render
			// gets variable set in ServerTemplate.js
			page = window.__INITIAL_HTML__;
			
			// destroy variable and script
			delete window.__INITIAL_HTML__;
			let script = document.getElementById('initial-state');
			script.parentNode.removeChild(script);

			// cache page
			this.updateCache( page );
		}

		this.state = { 
			data: page 
		};
	}
		
	render () {
		const { data } = this.state;

		// no page while ajax retrieves 
		// between client routes
		if (data === null) {
			return <LoadingPage {...this.props} />;
		}

		const { 
			body,
			attributes 
		} = data;

		const { 
			link, 
			description, 
			show_description, 
			tags
		} = attributes;

		let { subtitle } = attributes;

		if (link && subtitle) {
			subtitle = (<a target="_blank" href={link}>{subtitle}</a>);
		}

		return (
			<PageLayout 
				{...attributes} 
				subtitle={subtitle}
				{...this.props}>
			{description && 
				(show_description !== false) &&
				<div className="page-description">
					<p>{description}</p>
				</div>
			}
			{tags && 
				<TagList tags={tags} />
			}
			{body &&
				<MarkDown content={body} />
			}
			{this.props.children}
			</PageLayout>
		);
	}
}

FrontMatter.propTypes = {
	source: PropTypes.string.isRequired,
	page: PropTypes.object
};

export default FrontMatter;