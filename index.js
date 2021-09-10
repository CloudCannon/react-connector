import React from 'react';

export default function CloudCannonConnect(Component) {
	return class LivePageComponent extends React.Component{
		constructor(props) {
			super(props);
			this.state = {}
		}
		
		componentDidMount() {
			window.CloudCannon = {
				trigger: (eventName, frontMatter) => {
					this.setState(frontMatter);
				}
			};
		}
		
		componentWillUnmount() {
			if (window.CloudCannon) {
				window.CloudCannon.trigger = null;
			}
		}

		render() {
			const hydratedProps = {
				...this.props, 
				page: {
					...this.props.page, 
					...this.state,
				}
			}
			return React.createElement(Component, hydratedProps, null);
		}
	}
}