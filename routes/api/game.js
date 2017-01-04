var keystone = require('keystone');
var Game = keystone.list('Game');
var appRoot = require('app-root-path');
var TemplateLoader = require('../../lib/TemplateLoader');
var Templates = new TemplateLoader();
var _ = require('underscore');

exports.create = function(req, res) {

	var locals = res.locals;
	locals.section = 'newGame';

	console.log(req.body);

	var game = req.body.userName + '-game-' + '01';
	
  new Game.model({
   	name: game

  })
  .save(function(err) {

		if (err)
	    console.log(err);
	  else 
	  	console.log ("success");

	});



};



exports.get = function(req, res) {

	// console.log (req, "req");



	var query = Game.model.findOne({$or:[{userName:req.query.username},{email:req.query.username}]});

	console.log(query, " is the response");

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

			  	// Define and query player data
			  	var data = {
				  	Game: {
				  		username:person.userName, 
				  		password:person.passWord, 
				  		email:person.email
				  	},
			  		info: {
			  			inGame:person.inGame
			  		}
		  		};

		  		// Define and query game data (if player is playing)


		  		// Define and query 
			  	

			  	Templates.Load("partials/profile", data, function(html) {
			  		// console.log(html, " --- html --- ");
			  		// console.log(data, " --- html --- ");
		            res.send(html);

	        }); 

			  } else {
			  	console.log("wrong password");
			  	// socket.emit("login:wrong_password");
			  }
	  });
		// pass._.compare(passwordInput)
	  
	});

};