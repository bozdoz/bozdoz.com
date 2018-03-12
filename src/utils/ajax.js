import axios from 'axios';

export const cache = {};

/**
* Gets content from server
*
* @param string page
* @param object req 	created by axios.CancelToken.source()
* @return Promise
*/
export const getPage = ( url, req ) => {
	return new Promise((resolve) => {
		if (cache[url]) {
			resolve(cache[url]);
		} else {
			axios.get(url, {
		    	headers: {
		    		'X-Requested-With': 'XMLHttpRequest'
		    	},
		    	cancelToken: req.token
		    })
			.then((request) => request.data)
			.then((data) => {
				cache[url] = data;
				resolve(data);
			})
			.catch((error) => {
	        	console.error(error);
	        });
		}
	});
};