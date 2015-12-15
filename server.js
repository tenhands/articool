var express = require('express'),
    morgan = require('morgan'),
    app = express(),
    mongoose = require('mongoose'),
    request = require('request'),
    bodyParser = require('body-parser');

app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect('mongodb://localhost/angularApp', function (err) {
      if(err){
        console.log(err);
      } else {
        console.log('connection successful');
      }
    });

app.listen(3000, function(){
  console.log('listening on port 3000');
});

// app.get('/api/sentiment', function (req, res){
//   res.send('hello');
//
// 
// });

// start here
app.get('/users', function (req, res) {
  User.find().exec(function (err, users) {
    res.send(users);
  });
});

app.post('/users', function (req, res) {
  var user = new User(req.body);
  user.save(function (err) {
    if(err){
      console.log(err);
    }else {
      res.send(user);
    }
  });
});
