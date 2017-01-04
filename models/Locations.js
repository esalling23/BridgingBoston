var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Location = new keystone.List('Location', {
		label: 'Locations',
		singular: 'Location',
		track: true,
		// nodelete: true,
		nocreate: false
	});
 
Location.add({
    name: { type: String, required: true, index: true },
    status: { type: Types.Number },
    enabled: { type: Boolean, label: "Enabled Location.", note: "If not enabled, will not appear on site."},
    category: { type: Types.Select, label: "Category", options: "Residence, Park, Government Building, School, Hospital, Commercial, Other"},
    size: { type: Types.Select, label: "Size", options: "small, large"},
    shape: { type: Types.Select, lable: "Shape", options: "square, rectangle"}, 
    // sprites: {}
});

Location.register();
Location.defaultColumns = "name, category, size, shape";