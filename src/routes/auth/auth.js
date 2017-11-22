const User = require('../../models/User');
const authService = require('../../services/auth');

module.exports = {
    login,
    checkUserData,
    signup
};

function login(email, password) {
    return authService.attemptLogin(email, password);
}

function checkUserData(userData) {
    if (userData && userData.user_id && typeof userData.user_id === 'number') {
        return User.options.classMethods.validateUser(userData.user_id);
    }
    return Promise.reject(APIError(400, 'Invalid User Data'));
}

function signup(email, password, fname, lname) {
    authService.hashPassword(password)
        .then(hash => {
            return User.create({
                    email,
                    password: hash,
                    fname,
                    lname
                })
                .then(user => {
                    console.log(user);
                    return "User Created Successfully!"
                })
                .catch(err => {
                    throw APIError(err.status || 500, err.message || 'User Creation Failed');
                });
        });
}