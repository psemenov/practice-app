//Models
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

//Controllers
const createUserController = require('../../controllers/UserControllers/createUser');
const loginUserController = require('../../controllers/UserControllers/loginUser');
const verifyTokenController = require('../../controllers/UserControllers/verifyToken');
const logoutUserController = require('../../controllers/UserControllers/logoutUser');
const getUserController = require('../../controllers/UserControllers/getUser');
const updateInfoController = require('../../controllers/UserControllers/updateUserInfo');
const changePasswordController = require('../../controllers/UserControllers/changePassword');

module.exports = (app) => {

//Sign up
app.post('/api/account/signup', createUserController);

//Sign in
app.post('/api/account/signin', loginUserController);

//Verify token
app.get('/api/account/verify', verifyTokenController);

//Sign out
app.get('/api/account/logout', logoutUserController);

//Get user info
app.get('/api/account/getinfo', getUserController);
	
//Update user info
app.post('/api/account/update_user', updateInfoController);

//Change password
app.post('/api/account/change_password', changePasswordController);


};