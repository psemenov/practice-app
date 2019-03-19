const User = require('../../models/User');

module.exports = (req, res, next) => {

  const { body } = req;
  const {
    firstName,
    lastName,
    password
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
    } else if (users.length > 0) {
      return res.send({
        success: false,
        message: 'Account already exists'
      });
    }

    const newUser = new User();
    
    newUser.firstName = firstName;
    newUser.lastName = lastName;
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
        message: ''
      });

    });
  });
};
