var express = require('express');
var controller = require('./controllers/controller.js');

var app = express();
//set up EJS as template engine
app.set('view engine', 'ejs');
app.use(express.static('./public')); //This sets the directory for the EJS files to the public folder
app.get('/', (req, res) => {
  res.render('template');
});

//Listen
app.listen(8080);
console.log("Listening to port 8080.");
