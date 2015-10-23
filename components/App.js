const React = require('react-native');
const {
	Text,
	View,
	StyleSheet,
	ActivityIndicatorIOS
} = React;

const Activities = require('./Activities');
const api = require('../utils/api');
const {
	gray,
	red
} = require('../utils/colors');

const App = React.createClass({
	getInitialState(){
		return {
		  activities: {
		  	past: [],
		  	upcoming: [],
		  }
		}
	},
	componentDidMount() {
		api.getAllActivities().then(data => {
		  this.setState({
		    activities: data,
		  })
		  this.props.navigator.replace({
              title: 'Hendelser',
              component: Activities,
              backButtonTitle: ' ',
              passProps: {activities: data},
            });
		  
		}.bind(this));
  	},
	render() {
		return (
			<View style={styles.container}>
				<ActivityIndicatorIOS size="large" style={styles.activity} color={red} />
			</View>
		)
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: gray
	}
})

module.exports = App;