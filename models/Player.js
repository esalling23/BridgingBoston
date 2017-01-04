var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Player = new keystone.List('Player', {
	label: 'Players',
		singular: 'Player',
		track: true,
		// nodelete: true,
		nocreate: false, 
        map: {name: 'userName'}
});
 
Player.add({
    userName: { type: String, required: true, initial: true, index: true },
    email: { type: Types.Email, initial: true, required: true, index: true },
    passWord: { type: Types.Password, initial:true, required: true}, 
    playing: { type: Types.Boolean, label: 'Player Status', note: 'Is this player in a game?'}, 
    games: { 
        type: Types.Relationship, 
        ref: 'Game'
    }
});
 
Player.register();
Player.defaultColumns = "userName, email, passWord";
// module.exports = keystone.model('Player', Player);