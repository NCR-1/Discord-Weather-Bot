import moment from 'moment';

export function stringToTime(timeString) {
	const dateTime = moment(timeString, 'HH:mm');
	// console.log(dateTime);
	return dateTime;
}

export function timeToString(dateTime) {
	const timeString = moment(dateTime).format('HH:mm');
	// console.log(timeString);
	return timeString;
}
