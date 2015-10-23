const moment = require('moment');
require('moment/locale/nb');


module.exports = {
	convertDate(seconds, format) {
		return moment.utc(seconds).locale('nb').format(format);
	}
};