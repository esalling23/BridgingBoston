var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var SpriteSheet = new keystone.List('SpriteSheet', {
		label: 'Sprite Sheets',
		singular: 'Sprite Sheet',
		track: true,
        autokey: { path: 'sprite_key', from: 'name', unique: true },
		// nodelete: true,
		nocreate: false
	});
 
SpriteSheet.add({
    name: { type: String, label: "Sprite Sheet Name", required: true, index: true },
    spriteSheet: { type: Types.CloudinaryImage, label:"Sprite Sheet", note: "Sprites should be cut into 300px squares"},
    steps: { type: Number, label: "Number of sprites in this sheet or animation set"}
});

SpriteSheet.register();
SpriteSheet.defaultColumns = "name";