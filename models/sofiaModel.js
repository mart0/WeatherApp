var Arrow = require('arrow')

var sofiaModel = Arrow.Model.reduce('connectorModel', 'sofiaModel', {
  fields: {
    average_temp: {type: Number, required: true},
    max_temp: {type: Number, required: true},
    min_temp: {type: Number, required: true}
  },

  connector: 'com.connector.owa',
  autogen: false
})

module.exports = sofiaModel
