var Arrow = require('arrow');

var ForecastRoute = Arrow.Router.extend({
	name: 'forecast',
	path: '/',
	method: 'GET',
	description: 'Тhis is a web route to the forecast of the current user',
	action: function (req, resp, next) {
		let q = req.query.q;

		// Set fallback query param in order to avoid bad requests
		if (q === undefined) {
			q = 'Sofia';
		}
		req.server.getAPI('/api/forecast/:q', 'GET').execute({ q }, function (err, results) {
			if (err) {
				next(err);
			} else {
				return resp.render('forecast', JSON.parse(results));
				next(null);
			}
		});
	}
});

module.exports = ForecastRoute;