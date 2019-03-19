const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
function validateEmail(email) {
    return 
}
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
      message: 'Email cannot be blank'
    });
  }

  if(!password) {
    return res.send({
      success: false,
      message: 'Password cannot be blank'
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
        message: 'Invalid email'
      });
    }

    const user = users[0];
    if (!user.validPassword(password)){
    	return res.send({
        success: false,
        message: 'Invalid password'
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
        message: '',
        token: doc._id
      });
      
    });
  });
};