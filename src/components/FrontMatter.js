import React from 'react';
import PropTypes from 'prop-types';
import getMarkDown from './getMarkDown';
import MarkDown from './MarkDown';
import TagList from './TagList';
import PageLayout from './PageLayout';

class FrontMatter extends React.Component {
	constructor (props) {
		super(props);
		this.state = this.get();
	}
	componentWillMount() {
		this.setState({
			loading: true
		});
	}
	componentDidMount() {
		this.setState({
			loading: false
		});
	}
	get () {
		/* might be async someday */
		const page = this.props.markdown || getMarkDown(this.props.source);
		const atts = page.attributes || {};

		return {
			...atts,
			body: page.body
		};
	}
	
	render () {
		const { 
			title, 
			link, 
			description, 
			tags,
			body, 
			image,
			loading
		} = this.state;

		let {
			subtitle
		} = this.state;

		if (link && subtitle) {
			subtitle = (<a target="_blank" href={link}>{subtitle}</a>);
		}

		return (
			<PageLayout 
				title={title} 
				subtitle={subtitle} 
				image={image} 
				loading={loading}
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
	markdown: PropTypes.object
};

export default FrontMatter;