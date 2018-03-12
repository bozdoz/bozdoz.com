import React from 'react';
import axios from 'axios';
import { cache, getPage } from '../utils/ajax';

class AjaxContent extends React.Component {
	constructor(props) {
		super(props);
	}

	getData() {
		// no data
	    if ( this.state.data === null ) {
	    	// get the data from the source!
	    	// and a cancel token from axios
	    	this.req = axios.CancelToken.source();

		    getPage(this.source, this.req)
		        .then((data) => {
		        	console.log('got data');
		        	this.setState({ data });
		        });
		}
	}

	componentDidMount() {
		this.getData();
	}

	componentWillUnmount() {
		// abort ajax request
		if (this.req) {
			this.req.cancel();
		}
	}

	updateCache(value) {
		cache[this.source] = value;
	}
}

export default AjaxContent;