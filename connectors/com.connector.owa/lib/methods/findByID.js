// var Arrow = require('arrow')
// var ORMError = Arrow.ORMError
var request = require('request')

exports.findByID = function (Model, cityName, callback) {
  var cnnctr = Model.getConnector()
  var conf = cnnctr.config

  var options = {
    uri: `${conf.openWeatherApiUrl}forecast/daily?q=${cityName}&mode=${conf.dataFormat}&units=metric&cnt=${conf.numberOfDays}&appid=${conf.apikey}`,
    method: 'GET',
    json: true
  }

  request(options, function (err, response, results) {
    if (!err) {
      var instance = Model.instance(results, true)
      callback(null, instance)
    } else {
      callback(err)
    }
  })
}
