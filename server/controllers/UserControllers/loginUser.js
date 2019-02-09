const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (req, res, next) => {

  const { body } = req;
  const {
    password
  } = body;
  let {
    email
  } = body;
  email = email.toLowerCase();

  if(!email) {
    return res.send({
      success: false,
      message: 'Error: Email cannot be blank'
    });
  }

  if(!password) {
    return res.send({
      success: false,
      message: 'Error: Password cannot be blank'
    });
  }

  User.find({
    email: email
  }, (err, users) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server Error'
      });
    } 
    if (users.length != 1) {
    	return res.send({
        success: false,
        message: 'Error: Invalid email'
      });
    }

    const user = users[0];
    if (!user.validPassword(password)){
    	return res.send({
        success: false,
        message: 'Error: Invalid password'
      });
    }

    //Correct user
    const userSession = new UserSession();
    userSession.userId = user._id;
    userSession.save((err, doc) => {
    	if (err) {
        return res.send({
          success: false,
          message: 'Error: Server Error'
        });
      }
      return res.send({
        success: true,
        message: 'Valid Sign In',
        token: doc._id
      });
      
    });
  });
};