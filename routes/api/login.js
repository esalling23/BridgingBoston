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
	

	var query = Player.model.findOne({$or:[{userName:req.body.username},{email:req.body.username}]});

	query.select('userName email passWord');

	query.exec(function (err, person) {
		console.log ("person:" + person + ":person");
	  if (err) return handleError("we have not found your person" + err);
	  // console.log('This is %s with password %s and email %s.', person.userName, person.passWord, person.email);
	  // var data = {username:person.userName, password:person.passWord, email:person.email};

	  // console.log(data._.password);

	  person._.passWord.compare(req.body.password, function(err, result){

	  	console.log(result);
			if (result) {

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
			  	

			  	// Templates.Load("partials/profile", data, function(html) {
			  	// 	// console.log(html, " --- html --- ");
			  	// 	// console.log(data, " --- html --- ");
			  	// 	locals.section = 'login';
		    //         res.send(html);

	     //    }); 
		     res.send({code: 'valid', msg: 'You must include at least one type of content.'});


			  } else {

			  	return res.apiError('error', 'wrong password');
			  	locals.section = 'login:error';
			  	// res.apiResponse('wrong password');
			  	
			  	// io.emit("login:error", req.query.username);
			  	console.log("wrong password");

			  }
	  });
		// pass._.compare(passwordInput)
	  
	});

};