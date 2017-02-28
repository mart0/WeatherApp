var Arrow = require('arrow'),
	ORMError = Arrow.ORMError,
	request = require('request');

exports.findByID = function (Model, city_name, callback) {

	var cnnctr = Model.getConnector(),
		conf = cnnctr.config;

	var options = {
		uri: `${conf.openWeatherApiUrl}forecast/daily?q=${city_name}&mode=${conf.dataFormat}&units=metric&cnt=${conf.numberOfDays}&appid=${conf.apikey}`,
		method: 'GET',
		json: true
	};
	
	request(options, function (err, response, results) {
        if (!err) {
			var instance = Model.instance(results, true);
			callback(null, instance);
        } else {
            callback(err);
        }
    });
};
