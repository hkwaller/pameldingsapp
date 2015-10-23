const React = require('react-native');
const {
	Text,
	View,
	StyleSheet,
	MapView
} = React;

const {
	red,
	white,
	gray,
	black
} = require('../utils/colors');


const LocationMap = React.createClass({
	getInitialState() {
		return {
			pin: {
				latitude: 59.92,
				longitude: 10.80
			}
		}
	},
	componentWillMount() {
		navigator.geolocation.getCurrentPosition(
	      (initialPosition) => {
	        this.setState({
	          pin: {
	            latitude: initialPosition.coords.latitude,
	            longitude: initialPosition.coords.longitude
	          }
	        })
	      },
	      (error) => alert(error.message),
	      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
	    );
	},
	render() {
		const activity = this.props.activity;
		return (
			<View style={styles.container}>
				<MapView
			        style={styles.map} 
          			annotations={[this.state.pin]}
			        showsUserLocation={true} />
			</View>
		)
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		flex: 1
	}
})


module.exports = LocationMap;