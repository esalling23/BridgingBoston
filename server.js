var express = require('express'),
	expressHbs = require('express-handlebars');
var app = express();
var io = require('socket.io').listen(app.listen(3000));
server.listen(app.get('port'));

app.set('port', process.env.PORT || 3000);

app.listen(server);


app.set('views', __dirname + '/views');
app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'base.hbs', layoutsDir: __dirname + '/templates/layouts'}));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
	req.io = io;
  res.render('index');
  res.sendfile(__dirname + '/index.html');
});



