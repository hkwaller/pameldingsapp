const React = require('react-native');
const {
	Text,
	View,
	StyleSheet,
	TouchableHighlight
} = React;

const Activities = require('./Activities');
const {
	red,
	white,
	gray,
	black
} = require('../utils/colors');const Icon = require('react-native-vector-icons/Ionicons');

const moment = require('moment');
require('moment/locale/nb');

const { convertDate } = require('../utils/helpers');

const PastActivity = React.createClass({
	render() {
		const activity = this.props.activity;
		return (
			<View style={styles.container}>
				<TouchableHighlight onPress={() => this.props.onPressPast(activity)}>
					<View style={styles.activityContainer}>
						<Text style={styles.subject} numberOfLines={2}>{activity.subject}</Text>
						<Text style={styles.date}>{convertDate(activity.startTime, "D MMM")}</Text>
						<View style={styles.locationContainer}>
							<Icon name="ios-location-outline" style={styles.icon} />
							<Text style={[styles.subject, styles.location]}>{activity.location}</Text>
						</View>
					</View>
				</TouchableHighlight>
			</View>
		)
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	activityContainer: {
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
		borderRightWidth: 1,
		borderRightColor: '#555',
		borderBottomWidth: 1,
		borderBottomColor: '#555',
		borderTopWidth: 1,
		borderTopColor: '#555'
	},
	subject: {
		fontSize: 10,
		color: white,
		width: 100,
		textAlign: 'center',
	},
	date: {
		fontSize: 20,
		color: red
	},
	icon: {
		fontSize: 10,
		fontWeight: '600',
		color: white,
		flex: 1
	},
	location: {
		width: 50
	},
	locationContainer: {
		flexDirection: 'row',
	}
})


module.exports = PastActivity;