let User = require('../models/user');
let Notification = require('../models/notification');
let Friends = require('../models/friends');
let bcrypt = require('bcryptjs');
let message = '';
let fs = require('fs');



function login(req, res) {
    res.status(200).render('signin');
}

function chat(req, res) {
    res.status(200).render('index', { user: req.user });
}

function signup(req, res) {
    res.status(200).render('signup', { message: message });
    message = ''
}

function register(req, res) {
    let errors = [];
    User.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            errors.push({ msg: 'Email already exists' });
            res.redirect('/register');
        } else {
            let hasPassword = bcrypt.hashSync(req.body.pass, 5);
            console.log(hasPassword);
            if (req.file == undefined) {
                if (req.body.gender == "male") {
                    User.insertMany([{
                        avatar: "nam.jpg",
                        name: req.body.name,
                        gender: "male",
                        email: req.body.email,
                        password: hasPassword
                    }], (err, user) => {
                        if (user) {
                            req.flash(
                                'success_msg',
                                'You are now registered and can log in'
                            );
                            res.redirect('/');
                        }
                    })
                } else {
                    User.insertMany([{
                        avatar: "nu.jpg",
                        name: req.body.name,
                        gender: "female",
                        email: req.body.email,
                        password: hasPassword
                    }], (err, user) => {
                        if (user) {
                            req.flash(
                                'success_msg',
                                'You are now registered and can log in'
                            );
                            res.redirect('/');
                        }
                    })
                }
            } else {

                User.insertMany([{
                    avatar: req.file.originalname,
                    name: req.body.name,
                    gender: req.body.gender,
                    email: req.body.email,
                    password: hasPassword
                }], (err, user) => {
                    if (user) {
                        req.flash(
                            'success_msg',
                            'You are now registered and can log in'
                        );
                        res.redirect('/');
                    }
                })
                let old_path = req.file.path;
                let new_path = req.file.destination + req.file.originalname;
                fs.rename(old_path, new_path, err => {
                    if (err) throw err;
                });
            }
        }
    })

}


function add_friend(req, res) {
    let emails = req.params.email.split(',');
    Notification.updateOne({ email: emails[0] }, {
        contents: [{
            friend: emails[1],
            status: "waiting"
        }]
    }, (err, raw) => {
        res.redirect('/');
    })
}

function friend(req, res) {
    User.findOne({ email: req.params.email }, (err, user) => {
        if (user) {
            res.render('friend', { user: user })
        }
    })
}
module.exports = {
    login: login,
    signup: signup,
    // check_login: check_login,
    register: register,
    add_friend: add_friend,
    friend: friend,
    chat: chat
}