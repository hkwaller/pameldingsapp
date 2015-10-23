const React = require('react-native');
const {
	Text,
	View,
	StyleSheet,
	TouchableHighlight,
} = React;
const GridView = require('react-native-grid-view');

const Icon = require('react-native-vector-icons/Ionicons');

const PastActivity = require('./PastActivity');
const LocationMap = require('./LocationMap');
const Activity = require('./Activity');
const api = require('../utils/api');

const { convertDate } = require('../utils/helpers');

const {
	red,
	white,
	gray,
	black
} = require('../utils/colors');

const Activities = React.createClass({
	render() {
		const upcoming = this.props.activities.upcoming;
		return (
			<View style={styles.container}>
				<View style={styles.upcoming}>
					<View style={styles.upcomingHeader}>
						<View style={styles.leftContainer}>
							<Text style={styles.next}>Neste hendelse</Text>
						</View>
						<View style={styles.rightContainer}>
							<Text style={styles.signup}>Påmelding åpner</Text>
							<Text style={styles.signup}>{convertDate(upcoming.regStart, "D MMM HH:mm")}</Text>
						</View>
					</View>
					<TouchableHighlight onPress={this.onPressUpcoming}>
						<View style={styles.upcomingBody}>
							<Text style={styles.upcomingSubject}>{upcoming.subject}</Text>
							<Text style={styles.upcomingDate}>{convertDate(upcoming.startTime, 'dddd DD MMMM')}</Text>
							<Text style={styles.upcomingTime}>{convertDate(upcoming.startTime, 'HH:mm')}</Text>
						</View>
					</TouchableHighlight>
					<View style={styles.upcomingFooter}>
						<TouchableHighlight style={[styles.leftContainer]} onPress={this.onPressLocation}>
							<View style={styles.footerContainerLeft}>
							 	<Icon name="ios-location-outline" style={styles.icon} />					
							 	<Text style={styles.footerText}>{upcoming.location}</Text>
							</View>
						</TouchableHighlight>	
						<View style={[styles.rightContainer, styles.footerContainerRight]}>
						 	<Icon name="ios-people-outline" style={styles.icon} />					
						 	<Text style={styles.footerText}>{upcoming.participants.length}/{upcoming.maxNumber}</Text>
						</View>
					</View>
				</View>
				<View style={styles.past}>
					<Text style={styles.subHeader}>Tidligere</Text>
					<GridView
				        items={this.props.activities.past}
				        itemsPerRow={3}
				        renderItem={this.renderItem}
				      />
				</View>
			</View>
		)
	},
	onPressLocation() {
		this.props.navigator.push({
              title: 'Kart',
              component: LocationMap,
              backButtonTitle: ' ',
              passProps: {activity: this.props.activities.upcoming},
            });
	},
	onPressUpcoming() {
		this.props.navigator.push({
              title: 'Neste hendelse',
              component: Activity,
              backButtonTitle: ' ',
              passProps: {activity: this.props.activities.upcoming},
            });
	},
	onPressPast(activity) {
		api.getActivityById(activity.id).then(data => {
			this.props.navigator.push({
              title: 'Tidligere hendelse',
              component: Activity,
              backButtonTitle: ' ',
              passProps: {activity: data},
            });
		})
	},
	renderItem(activity) {
		return <PastActivity activity={activity} key={activity.id} onPressPast={this.onPressPast} />
	}
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgb(38,38,38)',
	},
	upcoming: {
		flex: 2,
	},
	upcomingHeader: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start'
	},
	leftContainer: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
		marginTop: 10
	},
	rightContainer: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
		marginTop: 10
	},
	footerContainerLeft: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginLeft: 30
	},
	footerContainerRight: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginRight: 30
	},

	icon: {
		fontSize: 30,
		color: white,
	},
	next: {
		marginLeft: 10,
		color: red,
		fontWeight: '800',
		fontStyle: 'italic'
	},
	signup: {
		color: red,
		marginRight: 10,
		fontSize: 10
	},
	upcomingBody: {
		flex: 4,
		alignItems: 'center',
		justifyContent: 'center',
	},
	upcomingSubject: {
		color: '#fff',
		fontSize: 30
	},
	upcomingDate: {
		color: red
	},
	upcomingTime: {
		fontSize: 45,
		color: red
	},
	upcomingFooter: {
		flex: 1,
		flexDirection: 'row'
	},
	footerText: {
		color: white,
		marginLeft: 10
	},
	past: {
		flex: 3,
	},
	subHeader: {
		padding: 10,
		fontSize: 16,
		color: white,
		textAlign: 'center'
	}
})


module.exports = Activities;