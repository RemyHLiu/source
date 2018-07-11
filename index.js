//invoke other JS
var express = require("express");
var bodyParser = require("body-parser");
//define layout path
var exphbs = require("express-handlebars").create({
    defaultLayout:'main',
    layoutsDir: "views/main/"
    //extname: '.hbs'
 });
var fs = require("fs");
var markdown = require("markdown-js");
var verifMidd = require("./middleware/verification");

var app = express();
var jsonParser = bodyParser.json();
// 创建 application/x-www-form-urlencoded 解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//setup route

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/index', function(req, res){
  res.render('normal', {Title:args});
});
app.use(jsonParser);
app.post('/logon', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
//  console.log("username->"+username);
//  console.log("password->"+password);
  if(username == password){
    res.redirect('/mdfile');
  }else{
    res.render('normal', {Title:"Logon failed!!"});
  }


});
//reader markdown file

app.get('/mdfile', function(req, res, next){
  fs.readFile('./public/text.md', function(err, content){
    var str = markdown.makeHtml(content.toString());
    res.render('shown', {content:str});
  });
});

app.engine('md', function(path, options, fn){
  fs.readFile(path, 'utf8', function(err, str){
    if(err) return fn(err);
    str = markdown.parse(str).toString();
    fn(null, str);
  });
});
app.use(function(req, res, next){ // routing for 404
  res.render('404Status');
  //res.send('404');
});
app.use(function(req, res, next){
  res.render('500Status');
  //res.send('500');
});
app.use(verifMidd);
// using template
app.engine('handlebars', exphbs.engine);// change default template to handlebars
app.set('view engine', 'handlebars');

//setup static file path
app.use(express.static(__dirname+'/public'));
//settle an indicator for handlebar using
var args = 'handlebar implementation successful';

var server = app.listen(3000, function () { //listening port of 3000
  var host = server.address().address;
  var port = server.address().port;

  console.log('Web service has setup listening at http://localhost:'+host, port);
});
