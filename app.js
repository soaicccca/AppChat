let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let path = require('path');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');
let app = express();
let router = require('./routes/rou1');
let server = require('http').Server(app);
let io = require('socket.io')(server);
require('./configs/passport')(passport);


mongoose.connect('mongodb://localhost:27017/appchat', { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())
app.use(session({
    secret: 'ffjnfdbsdsgdsdvd',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});
let online = [];
io.on('connection', function(socket) {
    socket.on('send_info', (user) => {
        online.push(user);
    })
    socket.broadcast.emit('online', online);
    socket.on('disconnect', () => {

    })

});


app.use(router);
server.listen(3000, () => {
    console.log("server is running on port 3000");
});