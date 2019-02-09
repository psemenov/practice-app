//Models
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

//Controllers
const createUserController = require('../../controllers/UserControllers/createUser');
const loginUserController = require('../../controllers/UserControllers/loginUser');
const verifyTokenController = require('../../controllers/UserControllers/verifyToken');
const logoutUserController = require('../../controllers/UserControllers/logoutUser');

module.exports = (app) => {

//Sign up
app.post('/api/account/signup', createUserController);

//Sign in
app.post('/api/account/signin', loginUserController);

//Verify token
app.get('/api/account/verify', verifyTokenController);

//Sign out
app.get('/api/account/logout', logoutUserController);

	
};