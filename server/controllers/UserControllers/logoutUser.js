const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (req, res, next) => {
	
	const { query } = req;
	const { token } = query;

	console.log(token);

	//Verify the token is unique and not deleted

	UserSession.findOneAndUpdate({
		_id: token,
		isDeleted: false
	},
	{
		$set: {isDeleted: true}
	}, null, (err, sessions) => {
		if (err) {
			return res.send({
				success: false,
				message: 'Error: Server Error' 
			});
		}
		
		return res.send({
			success: true,
			message: 'Signed Out' 
		});
		
	});
};
