var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Resource = new keystone.List('Resource', {
	label: 'Resources',
		singular: 'Resource',
		track: true,
		// nodelete: true,
		nocreate: false
});
 
Resource.add({
    name: { type: String, required: true, initial: true, index: true },
    
    // visited: { type: Types.Relationship}
    // resources: { types: Types.Relationship, ref: }
});
 
Resource.register();
// module.exports = keystone.model('Resource', Resource);