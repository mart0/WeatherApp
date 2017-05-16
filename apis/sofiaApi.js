var Arrow = require('arrow')
var Model = Arrow.Model
// var Logger = Arrow.createLogger()
var CoonectorModel = Model.getModel('connectorModel')

function mapForecast (forecast) {
  let dayList = {}

  forecast.forEach((element, index) => {
    var day = new Date(element.dt)
    var currentDayModel = CoonectorModel.instance({
      average_temp: element.temp.day,
      max_temp: element.temp.max,
      min_temp: element.temp.min
    })

    // Fill the dayList collection with 5 instances of the SofiaModel
    dayList[day] = currentDayModel
  })

  // instead of dayList, return a collection which contains 5 instances of this model
  // the point is that to use the model and to send it to the response chain
  return dayList
}

var SofiaAPI = Arrow.API.extend({
  group: 'sofia',
  path: '/api/forecast/:q',
  method: 'GET',
  description: 'Make internal call to get 5 day forecast',
  model: 'connectorModel',
  parameters: {
    q: {description: 'City name', required: true}
  },
  action: function (request, response, next) {
    const http = require('http')
    const openWeatherAPPID = 'd9f5b4e45c38241c2caa4d9f389825e5'

    let options = {
      host: 'api.openweathermap.org',
      path: `/data/2.5/forecast/daily?q=${request.params.q}&appid=${openWeatherAPPID}&units=metric&cnt=5`,
      method: 'GET'
    }
    http.request(options, (res) => {
      let forecastData = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => forecastData += chunk)
      res.on('end', () => {
        response.setHeader('Content-Type', 'application/json')
        let parsedData = JSON.parse(forecastData)
        parsedData.list = mapForecast(parsedData.list)
        response.send(JSON.stringify(parsedData))
        next(null, parsedData)
      })
    }).on('error', (err) => {
      next(err)
    }).end()
  }
})

module.exports = SofiaAPI
