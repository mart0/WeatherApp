var Arrow = require('arrow'),
	ORMError = Arrow.ORMError,
	request = require('request');

exports.findAll = function findAll(Model, callback) {
	
	var cnnctr = Model.getConnector(),
		conf = cnnctr.config;

	var options = {
		uri: `${conf.openWeatherApiUrl}forecast/daily?q=${conf.town}&mode=${conf.dataFormat}&units=metric&cnt=${conf.numberOfDays}&appid=${conf.apikey}`,
		method: 'GET',
		json: true
	};

	request(options, function (err, resp, results) {
		if (err) {
			callback(err);
		}
		
		var instance = Model.instance(results, true);
		callback(null, instance);
	});
};