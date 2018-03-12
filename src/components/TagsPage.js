import React from 'react';
import path from 'path';
import axios from 'axios';
import { getPage } from '../utils/ajax';
import LoadingPage from './LoadingPage';
import AjaxContent from './AjaxContent';
import TagList from './TagList';
import NotFoundPage from './NotFoundPage';

class TagsPage extends AjaxContent {
	constructor (props) {
		super(props);
		this.source = path.join('/', 'api', props.location.pathname);
		this.state = {
			data: null
		};
	}
	componentWillReceiveProps({ location }) {
		if (location.pathname !== this.props.location.pathname) {
			// new location
			this.source = path.join('/', 'api', location.pathname);
			this.setState({
				data: null
			}, this.getData);
		}
	}
	render () {
		const { data } = this.state;

		if (!data) {
			return <LoadingPage />;
		}

		if (this.props.match.isExact) {
			// tag list page
			const tags = data.tags.map(a => a.name);
			return <TagList tags={tags} />;
		}

		if (data.tag === null) {
			// tag not found
			return <NotFoundPage />
		}

		const {
			name,
			posts
		} = data.tag;

		console.log(posts);

		return (
			<div>
				<h2>{name}</h2>
				{posts && 
					<ul>
						{posts.map((a) => (
							<li key={a.id}>
								{a.title}
							</li>
						))}
					</ul>
				}
			</div>
		)
	}
}

export default TagsPage;