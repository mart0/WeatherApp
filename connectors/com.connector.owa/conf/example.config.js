module.exports = {
	connectors: {
		'com.connector.owa': {
			modelAutogen: true,
            openWeatherApiUrl : 'http://api.openweathermap.org/data/2.5/',
            town : "Sofia",
			numberOfDays: 5,
			unitsFOrmat: "metric",
			dataFormat: "json",
            apikey : "dc98411c082bfb665d92c4e337b1b562",
		}
	}
};