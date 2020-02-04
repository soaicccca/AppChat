let express = require('express');
let router = express.Router();
let ctrl1 = require('../controllers/ctrl1');
let multer = require('multer');
let upload = multer({ dest: 'public/images/uploads/' });
let passport = require('passport');

router.route('/')
    .get(ctrl1.login, checkAuthenticated)
    .post(passport.authenticate('local', {
        successRedirect: '/chat',
        failureRedirect: '/',
        failureFlash: true
    }), (req, res) => {
        res.redirect('/chat')
    });
router.get('/chat', checkAuthenticated, ctrl1.chat);

router.route('/register')
    .get(ctrl1.signup)
    .post(upload.single('avatar'), ctrl1.register);
router.get('/add_friend/:email', ctrl1.add_friend);
router.get('/friend/:email', ctrl1.friend);
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/chat');
}
module.exports = router;