var express = require('express'),
	expressHbs = require('express-handlebars');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var app = express();

app.set('views', __dirname + '/views');
app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'base.hbs', layoutsDir: __dirname + '/templates/layouts'}));
app.set('view engine', 'hbs');

app.get('/', function(req, res){
  res.render('index');
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	console.log('start');
  // socket.emit('start');
});


app.listen(3000);

