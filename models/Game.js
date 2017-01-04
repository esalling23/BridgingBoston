var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Game = new keystone.List('Game', {
	label: 'Games',
	singular: 'Game',
	track: true,
	// nodelete: true,
	nocreate: false
});
 
Game.add({
    name: { type: String, required: true, initial: true, index: true }
    // characters: { type: Types.Relationship}
});
 
Game.register();
Game.defaultColumns = "name";
// module.exports = keystone.model('Game', Game);