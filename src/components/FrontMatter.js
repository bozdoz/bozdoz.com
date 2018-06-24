import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as axios from 'axios';
import * as path from 'path';

import MarkDown from './MarkDown';
import TagList from './TagList';
import PageLayout from './PageLayout';
import LoadingPage from './LoadingPage';

const cache = {};

/**
* Gets markdown formatted page content from server
*
* @param string page
* @param object req 	created by axios.CancelToken.source()
* @return Promise
*/
const getPage = ( page, req ) => {
	return new Promise((resolve) => {
		if (cache[page]) {
			resolve(cache[page]);
		} else {
			axios.get(path.join('/', 'pages', `${page}`), {
		    	headers: {
		    		'X-Requested-With': 'XMLHttpRequest'
		    	},
		    	cancelToken: req.token
		    })
			.then((request) => request.data)
			.then((data) => {
				cache[page] = data;
				resolve(data);
			})
			.catch((error) => {
	        	console.error(error);
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
			cache[ props.source ] = page;
		}
		
		this.state = { page };
	}
	
	componentDidMount() {
		// no page
	    if ( !this.state.page ) {
	    	// get the page from the source!
	    	// and a cancel token from axios
	    	this.req = axios.CancelToken.source();

		    getPage( this.props.source, this.req )
		        .then((page) => this.setState({ page }));
		}
	}

	componentWillUnmount() {
		// abort ajax request
		if (this.req) {
			this.req.cancel();
		}
	}
	
	render () {
		const { page } = this.state;

		// no page while ajax retrieves 
		// between client routes
		if (page === null) {
			return <LoadingPage {...this.props} />;
		}

		const { 
			body,
			attributes 
		} = page;

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