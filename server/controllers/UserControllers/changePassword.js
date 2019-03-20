const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (req, res, next) => {

  const { body } = req;
  const {
    oldPassword,
    newPassword,
    newPassword2,
    token
  } = body;
  
 if(newPassword !== newPassword2) {
    return res.send({
      success: false,
      message: 'Passwords don\'t match'
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
      User.find({
        _id: id
      }, (err, users) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server Error'
          });
        } else if(users.length > 0) {
          const user = users[0];
          if (!user.validPassword(oldPassword)){
            return res.send({
                success: false,
                message: 'Invalid password'
              });
          } else {
            User.findOneAndUpdate({
              _id: user.id
            }, {
              password: user.generateHash(newPassword),
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
        }
      });
    }
  });
};
