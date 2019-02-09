const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (req, res, next) => {

	const { query } = req;
	const { token } = query;

	console.log(token);

	//Verify the token is unique and not deleted

	UserSession.find({
		_id: token,
		isDeleted: false
	}, (err, sessions) => {
		if (err) {
			return res.send({
				success: false,
				message: 'Error: Server Error' 
			});
		}
		console.log(sessions.length);
		if (sessions.length != 1) {
			return res.send({
				success: false,
				message: 'Error: Invalid Token' 
			});
		} else {
			return res.send({
				success: true,
				message: 'Valid Token' 
			});
		}

	});
};
