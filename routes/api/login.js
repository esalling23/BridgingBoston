var keystone = require('keystone');
var Player = keystone.list('Player');
var appRoot = require('app-root-path');
var TemplateLoader = require('../../lib/TemplateLoader');
var Templates = new TemplateLoader();
var _ = require('underscore');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');


exports.get = function(req, res) {

	var locals = res.locals;
	locals.section = 'login';

	var query = Player.model.findOne({$or:[{userName:req.query.username},{email:req.query.username}]});

	query.select('userName email passWord');

	query.exec(function (err, person) {
		console.log ("person:" + person + ":person");
	  if (err) return handleError("we havenot found your person" + err);
	  console.log('This is %s with password %s and email %s.', person.userName, person.passWord, person.email);
	  // var data = {username:person.userName, password:person.passWord, email:person.email};

	  // console.log(data._.password);

	  person._.passWord.compare(req.query.password, function(err, result){

	  	console.log(result);
			if (result) {

			  	console.log("correct password");

			  	// locals.username = person.userName;
			  	// locals.password = person.pass;
			  	// locals.email = person.email;
			  	var data;
			  	data = {
				  	player: {
				  		username:person.userName, 
				  		password:person.passWord, 
				  		email:person.email
				  	},
			  		info: {
			  			playing:person.playing
			  		}
		  		};
			  	

			  	Templates.Load("partials/profile", data, function(html) {
			  		// console.log(html, " --- html --- ");
			  		// console.log(data, " --- html --- ");
		            res.send(html);

	        }); 

			  } else {

			  	// res.apiResponse('wrong password');
			  	
			  	io.emit("login:error", req.query.username);
			  	console.log("wrong password");
			  }
	  });
		// pass._.compare(passwordInput)
	  
	});

};