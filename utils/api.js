
var activities = {
	past: [],
	upcoming: []
}

const rootUrl = "http://paamelding.herokuapp.com/api/events";

module.exports = {
	getAllActivities() {

		return fetch(rootUrl).then(data => {
			return data.json();
		}).then(jsonData => {

			let upcoming = jsonData.splice(jsonData.length - 1, 1);
			const upcomingUrl = `${rootUrl}/${upcoming[0].id}`;
			console.log(upcomingUrl);

			activities.past = jsonData.reverse();

			return fetch(upcomingUrl).then(data => {
				return data.json();
			}).then(jsonData => {
				activities.upcoming = jsonData;
				return activities;
			})
		})
	},
	getActivityById(id) {
		return fetch(`${rootUrl}/${id}`).then(data => {
			return data.json();
		}).then(jsonData => {
			return jsonData;
		})
	}
};