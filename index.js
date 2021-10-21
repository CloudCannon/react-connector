const React = require('react');

function identity(props) {
	return props;
}

module.exports = {
	CloudCannonConnect: function (Component, options = {}) {
		const processProps = options?.processProps || identity;
		return class LivePageComponent extends React.Component{
			constructor(props) {
				super(props);
				this.state = {}
				this.onLoadEventListener = (e) => {
					this.onCloudCannonLoad(e.detail.CloudCannon);
				};

				this.onUpdateEventListener = (e) => {
					this.loadNewPropsFromCloudCannon(e.detail.CloudCannon);
				};
			}
			
			componentDidMount() {
				document.addEventListener('cloudcannon:load', this.onLoadEventListener);
				document.addEventListener('cloudcannon:update', this.onUpdateEventListener);
				if (window.CloudCannon) {
					this.onCloudCannonLoad(window.CloudCannon);
				}
			}

			async loadNewPropsFromCloudCannon(CloudCannon) {
				try {
					const latestValue = await CloudCannon.value();
					this.setState(latestValue);
				} catch(fetchError) {
					console.warn('Failed to fetch latest page props', fetchError);
				}
			}

			onCloudCannonLoad(CloudCannon) {
				CloudCannon.enableEvents();
				this.loadNewPropsFromCloudCannon(CloudCannon);
			}
			
			componentWillUnmount() {
				document.removeEventListener('cloudcannon:load', this.onLoadEventListener);
				document.removeEventListener('cloudcannon:update', this.onUpdateEventListener);
			}

			render() {
				const hydratedProps = {
					...this.props, 
					page: {
						...processProps(this.props.page),
						...this.state,
					}
				}
				return React.createElement(Component, hydratedProps, this.props.children);
			}
		}
	}
}