import React from 'react';

class RouteTransitionContainer extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			loading: false
		};
	}
	componentDidUpdate () {
		if (this.state.loading) {
			this.setState({
				loading: false
			});
		}
	}
	componentWillReceiveProps () {
		if (!this.state.loading) {
			this.setState({
				loading: true
			});
		}
	}
	render() {
		console.log('main loading:', this.state.loading);
		return (
			<main id="main" className={this.state.loading ? 'loading' : ''}>
				{this.props.children}
			</main>
		);
	}
}

export default RouteTransitionContainer;