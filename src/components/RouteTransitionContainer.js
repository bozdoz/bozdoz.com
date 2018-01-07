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
		return (
			<main id="main" className={this.state.loading ? 'loading' : null}>
				{this.props.children}
			</main>
		);
	}
}

export default RouteTransitionContainer;