const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (req, res, next) => {

  const { body } = req;
  const {
    firstName,
    lastName,
    token
  } = body;
  let {
    email
  } = body;
  email = email.toLowerCase();
  
  if(email.indexOf('@') == -1) {
      return res.send({
        success: false,
        message: 'Invalid Email'
      });
    }
 
 if(!firstName) {
    return res.send({
      success: false,
      message: 'First name cannot be blank'
    });
  }

  if(!lastName) {
    return res.send({
      success: false,
      message: 'Last name cannot be blank'
    });
  }

  if(!email) {
    return res.send({
      success: false,
      message: 'Email cannot be blank'
    });
  }

  UserSession.find({
    _id: token
  }, (err, userSessions) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server Error'
      });
    } else if (userSessions.length > 0) {
      const id = userSessions[0].userId;
      User.findOneAndUpdate({
        _id: id
      }, {
        firstName: firstName,
        lastName: lastName,
        email: email
      }, (err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server Error'
          });
        } else {
          return res.send({
            success: true,
            message: 'Saved'
          });
        }
      });
    }
  });
};
