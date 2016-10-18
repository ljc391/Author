'use strict';

var app = require('express')();
var path = require('path');
var User = require('../api/users/user.model');
var session = require('express-session');

app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'tongiscool' // or whatever you like
}));
app.use(function (req, res, next) {
  console.log('session', req.session);
  next();
});


app.use(require('./logging.middleware'));
app.use(require('./request-state.middleware'));
app.use(require('./statics.middleware'));

app.use('/api', require('../api/api.router'));

app.use('/api', function (req, res, next) {

  console.log('counter~~~',req.session);
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

app.post('/login', function (req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({
    where:{
      email:email,
      password:password
    }
  })
  .then(function(user){
    if(!user){
        res.sendStatus(401);
    }else{
        req.session.userId = user.id;
        //res.sendStatus(204);
        res.user = user;

        res.send(user).status(204);
    }
  })
  .catch(function(err){
    console.log("err~~",err);
  })
});

app.get('/logout', function (req, res, next){
    req.session.userId = null;
    res.send({success:true}).status(300);
})

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
