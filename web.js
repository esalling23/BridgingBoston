var keystone = require('keystone');
var appServer = keystone.get('appServer');
var rootDir = require('app-root-path');
var handlebars = require('express-handlebars');
var coreHelpers = require(__dirname + '/templates/helpers');

// console.log (coreHelpers.ifeq);
      // moduleHelpers = require('../templates/helpers')();

  // Merge core and module helpers if former is defined
  // var hbsHelpers = (moduleHelpers !== undefined) ? merge(coreHelpers, moduleHelpers) : coreHelpers;

  var hbsInstance = handlebars.create({
                      layoutsDir: __dirname + '/templates/layouts',
                      partialsDir: [ { dir: __dirname  + '/../public', namespace: 'core' }, __dirname  + '/templates/partials'],
                      defaultLayout: 'base',
                      helpers: coreHelpers,
                      extname: '.hbs'
                    });
// var hbs = require('handlebars');
keystone.init({
  
  'name': 'Bridging Boston',
  
  'favicon': 'public/favicon.ico',
  'sass': 'public',
  'static': ['public'],
  
  'views': 'templates/views',
  'view engine': 'hbs',
  'handlebars': hbsInstance,
  'custom engine': hbsInstance.engine,

  'locals': {

    _: require('underscore')

  },
  
  'auto update': true,
  'mongo': 'mongodb://localhost/Bridging-Boston',
  
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '(your secret here)', 

  'cloudinary config': { cloud_name: 'esalling', api_key: '723551514692962', api_secret: 'syiIllz2Vf6VglCJWRDZFsNafD8' }, 
  'cloudinary prefix': 'keystone',
  'cloudinary folders': true,
  'cloudinary secure': true
  
});
 
require('./models');

keystone.set('routes', require('./routes'));
 
var socketio = require('socket.io');

// var socketio = require(rootDir + '/sockets/')(appServer);

keystone.start({
    onHttpServerCreated: function(){
        keystone.set('io', socketio.listen(keystone.httpServer));
        
    },
    onStart: function(){
        var io = keystone.get('io');
        var session = keystone.get('express session');
        // require('./sockets/')();
        // // Share session between express and socketio
        io.use(function(socket, next){
            session(socket.handshake, {}, next);
        });


        // // Socketio connection
        io.on('connect', function(socket){
            console.log('--- User connected');
            
        //     // Set session variables in route controller
        //     // which is going to load the client side socketio
        //     // in this case, ./routes/index.js
        //     console.log(socket.handshake.session, " yah digg");
            socket.emit('message', 'yah digg');


            socket.on('login:admin', function(){
              console.log("admin login");
              socket.emit('client:admin', function(){

              });
            });


            socket.on('disconnect', function(){
                console.log('--- User disconnected');
            });
        });
    }
});
