var keystone = require('keystone'),
		Player = keystone.list('Player'),
    User = keystone.list('User');
 
exports.create = {
	User: [
	  { 'name.first': 'Dev', 'name.last': 'User', email: 'user@admin.edu', password: 'admin', isAdmin: true }
	]
};