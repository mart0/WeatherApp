var Arrow = require('arrow'),
Model = Arrow.Model,
Logger = Arrow.createLogger(),
SofiaModels = Model.getModel('sofiaModel');

function mapForecast (forecast) {
    let dayList = {};

    forecast.forEach((element, index) => {
        let day = element.dt_txt.substring(0,10);
        let hour = element.dt_txt.substring(11);
        // console.log(element.dt_txt);
        // console.log(element.main.temp);
        // console.log(element.main.temp_max);
        // console.log(element.main.temp_min);
        // console.log("#################");

        if (hour.indexOf('15') === -1) {
            return;
        }

        var currentDayModel = SofiaModels.instance({
                              average_temp: element.main.temp,
                              max_temp: element.main.temp_max, 
                              min_temp: element.main.temp_min});

        // Fill the dayList collection with 5 instances of the SofiaModel
        dayList[day] = currentDayModel;
    });

    // instead of dayList, return a collection which contains 5 instances of this model
    // the point is that to use the model and to send it to the response chain
    return dayList;
}

var SofiaAPI = Arrow.API.extend({
    group: 'sofia',
    path: '/api/forecast/:q',
    method: 'GET',
    description: 'Make internal call to get 5 day forecast',
    model: 'sofiaModel',
    parameters: {
        q: {description: 'City name', required: true}
    },
    action: function (request, response, next) {
        const http = require('http');
        const openWeatherAPPID = 'd9f5b4e45c38241c2caa4d9f389825e5';

        let options = {
            host: 'api.openweathermap.org',
            path: `/data/2.5/forecast?q=${request.params.q}&appid=${openWeatherAPPID}&units=metric`,
            method: 'GET',
        }
        http.request(options, (res) => {
            let forecastData = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => forecastData += chunk);
            res.on('end', () => {
                response.setHeader('Content-Type', 'application/json');
                let parsedData = JSON.parse(forecastData);
                parsedData.list = mapForecast(parsedData.list);
                response.send(JSON.stringify(parsedData));
                next(null, parsedData);
            });
        }).on('error', (err) => {
            next(err);
        }).end();
    }
});

module.exports = SofiaAPI;
