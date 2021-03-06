var express = require('express'),
    morgan = require('morgan'),
    app = express(),
    mongoose = require('mongoose'),
    request = require('request'),
    bodyParser = require('body-parser');

app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/angularApp', function (err) {
      if(err){
        console.log(err);
      } else {
        console.log('connection successful');
      }
    });

var port_number = app.listen(process.env.PORT || 3000);
app.listen(function() {
  console.log('listening on port');
});



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

app.post('/api/sentiment', function (req, res){
  var articleText = req.body.text;

  request.post({url:'http://text-processing.com/api/sentiment/', formData: {text: articleText}}, function (err, httpResponse, body){
    console.log(body);

    res.send(body);
  })

})
