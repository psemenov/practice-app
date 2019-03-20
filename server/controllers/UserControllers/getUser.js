const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (req, res, next) => {

  const { query } = req;
  const { token } = query;
  UserSession.find({
    _id: token
  }, (err, userSessions) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server Error'
      });
    } else {
      const id = userSessions[0].userId;
      User.find({
        _id: id
      }, (err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server Error'
          });
        } else {
          return res.send({
            success: true,
            info: user
          });
        }
      });
    }
  });
}
