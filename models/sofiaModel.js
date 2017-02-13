var Arrow = require('arrow');

var sofiaModel = Arrow.createModel('sofiaModel', {
	fields: {
		average_temp: {type: Number, required: true},
		max_temp: {type: Number, required: true},
		min_temp: {type: Number, required: true}
	},

	// Define the new connector here
	connector: 'memory',
	autogen: false
});

module.exports = sofiaModel;