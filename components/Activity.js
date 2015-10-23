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

const GridView = require('react-native-grid-view');
const { convertDate } = require('../utils/helpers')

const Icon = require('react-native-vector-icons/Ionicons');

const Activity = React.createClass({
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
				<View style={styles.headerContainer}>
					<View style={styles.leftHeader}>
						<Text style={{color: white}}>{activity.subject}</Text>
						<Text style={{color: red}}>{convertDate(activity.startTime, 'DD MMMM HH:mm')}</Text>
					</View>
					<View style={styles.rightHeader}>
						<MapView
					        style={styles.map} 
		          			annotations={[this.state.pin]}
					        showsUserLocation={true} />
					</View>
				</View>
				<View style={styles.participants}>
					<View style={styles.participantsHeader}>
						<Text style={styles.participantsHeaderText}>Deltakere</Text>
					</View>
					<View style={styles.participantsBody}>
						<GridView
					        items={activity.participants}
					        itemsPerRow={2}
					        renderItem={this.renderItem}
					      />
					</View>
				</View>
			</View>
		)
	},
	renderItem(participant) {
		return (
			<View style={styles.participant}>
				{participant.reserve ? <Text style={{ color: red }}>{participant.name}</Text> :
									<Text style={{ color: white }}>{participant.name}</Text>}
			</View>
		)
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: gray
	},
	headerContainer: {
		flexDirection: 'row',
		flex: 1
	},
	participants: {
		flex: 2
	},
	leftHeader: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	rightHeader: {
		flex: 1,
		backgroundColor: 'blue'
	},
	map: {
		flex: 1
	},
	participantsHeader: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 100
	},
	participantsHeaderText: {
		fontSize: 20,
		color: red
	},
	participantsBody: {
		flex: 1
	},
	participant: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center'
	}
})

module.exports = Activity;