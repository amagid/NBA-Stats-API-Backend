const Auth = require('./auth');
const requireAuthorization = require('../../middlewares/require-auth');

module.exports = addRoutes;

function addRoutes(router) {
    router.post('/login', (req, res) => res.promise(Auth.login(req.body.email, req.body.password)));

    router.post('/check-jwt', requireAuthorization, (req, res) => res.promise(Auth.checkUserData(req.user)));

    router.post('/signup', (req, res) => res.promise(Auth.signup(req.body.email, req.body.password, req.body.fname, req.body.lname)));

    router.get('/verify-email', (req, res) => res.promise(Auth.verifyEmail(req.query.token)));
}