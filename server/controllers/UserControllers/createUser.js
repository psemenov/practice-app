const User = require('../../models/User');

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
    } else if (users.length > 0) {
      return res.send({
        success: false,
        message: 'Error: Account already exists'
      });
    }

    const newUser = new User();

    newUser.email = email;
    newUser.password = newUser.generateHash(password);
    newUser.save( (err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server Error'
        });
      }

      return res.send({
        success: true,
        message: 'Signed Up'
      });

    });
  });
};
