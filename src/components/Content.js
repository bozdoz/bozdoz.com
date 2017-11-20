import React from 'react';
import PropTypes from 'prop-types';
import getPage from './getPage';
import MarkDown from './MarkDown';
import TagList from './TagList';
import Page from './Page';

class Content extends React.Component {
	constructor (props) {
		super(props);
		this.state = this.getPage();
	}
	getPage () {
		/* might be async someday */
		const page = getPage(this.props.source);
		page.attributes = page.attributes || {};

		return {
			title: page.attributes.title || null,
			subtitle: page.attributes.subtitle || null,
			link: page.attributes.link || null,
			description: page.attributes.description || null,
			tags: page.attributes.tags || null,
			content: page.body || null,
			image: page.attributes.image || null
		};
	}
	
	render () {
		const { 
			title, 
			link, 
			description, 
			tags,
			content, 
			image
		} = this.state;

		let {
			subtitle
		} = this.state;

		if (link && subtitle) {
			subtitle = (<a target="_blank" href={link}>{subtitle}</a>);
		}

		return (
			<Page title={title} subtitle={subtitle} image={image} {...this.props}>
			{description && 
				<div className="page-description">{description}</div>
			}
			{tags && 
				<TagList tags={tags} />
			}
			{content &&
				<MarkDown content={content} />
			}
			{this.props.children}
			</Page>
		);
	}
}

Content.propTypes = {
	source: PropTypes.string
};

export default Content;