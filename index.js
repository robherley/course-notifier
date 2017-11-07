const axios = require('axios');
const parser = require('xml2json');
require('dotenv').config();
const {
	TWILIO_ACCOUNT_SID,
	TWILIO_AUTH_TOKEN,
	TWILIO_NUM,
	PHONE_NUM
} = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Change these courses
const WANTED_COURSES = ['10523', '10585', '10531', '10589', '10963'];

const sendCourseStatus = async wantedCourses => {
	const xmlData = await axios.get(
		'https://web.stevens.edu/scheduler/core/core.php?cmd=getxml&term=2018S'
	);
	const jsonData = await parser.toJson(xmlData.data, { object: true });
	const { Course } = jsonData.Semester;
	let message = '\nCourse Status List:\n';
	Course.forEach(c => {
		if (wantedCourses.indexOf(c.CallNumber) !== -1) {
			const stat = c.Status === 'O' ? '✅ Open!' : '⛔️ Closed!';
			message += `${c.Section}: ${stat} (${c.CurrentEnrollment}/${c.MaxEnrollment})\n`;
		}
	});
	console.log(
		`Sending status of the following courses: ${WANTED_COURSES.toString()}`
	);
	client.messages.create({
		to: PHONE_NUM,
		from: TWILIO_NUM,
		body: message
	});
};

sendCourseStatus(WANTED_COURSES).catch(err => console.error(err));
