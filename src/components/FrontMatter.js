import React from 'react';
import PropTypes from 'prop-types';
import MarkDown from './MarkDown';
import TagList from './TagList';
import PageLayout from './PageLayout';
import axios from 'axios';
import path from 'path';

const cache = {};

const getPage = ( page ) => {
	return new Promise((resolve) => {
		if (cache[page]) {
			resolve(cache[page]);
		} else {
			axios.get(path.join('/', 'pages', `${page}`), {
		    	headers: {
		    		'X-Requested-With': 'XMLHttpRequest'
		    	}
		    })
			.then((request) => request.data)
			.then((data) => {
				cache[page] = data;
				resolve(data);
			});
		}
	});
}

class FrontMatter extends React.Component {
	constructor(props) {
		super(props);

		let page = props.page || null;

		if (props.staticContext) {
			// server-side rendering already has it
			page = props.staticContext.page;
		} else if (window.__INITIAL_HTML__) {
			// client-side initial render
			// gets variable set in ServerTemplate.js
			page = window.__INITIAL_HTML__;
			
			// destroy variable and script
			delete window.__INITIAL_HTML__;
			let script = document.getElementById('initial-state');
			script.parentNode.removeChild(script);

			// cache page
			cache[ props.source ] = page;
		}
		
		this.state = { page };
	}
	
	componentDidMount() {
		// no page
	    if ( !this.state.page ) {
	    	// get the page from the source!
		    getPage( this.props.source )
		        .then((page) => this.setState({ page }));
		}
	}
	
	render () {
		const { page } = this.state;

		// no page while ajax retrieves 
		// between client routes
		if (page === null) {
			return <div>Loading...</div>;
		}

		const { 
			body,
			attributes 
		} = page;

		const { 
			title, 
			link, 
			description, 
			tags,
			image
		} = attributes;

		let { subtitle } = attributes;

		if (link && subtitle) {
			subtitle = (<a target="_blank" href={link}>{subtitle}</a>);
		}

		return (
			<PageLayout 
				title={title} 
				subtitle={subtitle} 
				image={image} 
				{...this.props}>
			{description && 
				<div className="page-description">{description}</div>
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