var request = require('request')

module.exports = (appConfig) => {
  appConfig = appConfig || {}
  var port = appConfig.port || 8080
  var baseUrl = `http://localhost:${port}`
  var apiPrefix = appConfig.apiPrefix || '/api'
  var url = `${baseUrl}${apiPrefix}`

  return {
    getData: (options, callback) => {
      makeRequest(createRequestOptions(options), callback)
    },

    getDataByID: (options, callback) => {
      options.uri = `${url}/${options.model}/${options.id}`
      makeRequest(createRequestOptions(options), callback)
    },

    getDataByQuery: (options, callback) => {
      options.uri = `${url}/${options.model}/query?${options.where}`
      makeRequest(createRequestOptions(options), callback)
    },

    postData: (options, callback) => {
      options.method = 'POST'
      makeRequest(createRequestOptions(options), callback)
    },

    deleteData: (options, callback) => {
      options.uri = `${url}/${options.model}/${options.id}`
      options.method = 'DELETE'
      makeRequest(createRequestOptions(options), callback)
    }
  }

  function createRequestOptions (options) {
    var requestOptions = {
      uri: options.uri || `${url}/${options.model}`,
      method: options.method || 'GET',
      json: true,
      body: options.body || {}
    }
    var defaultAuth = {
      user: appConfig.apikey
    }

    if (options.auth) {
      requestOptions.auth = options.auth
    } else if (!options.skipAuth) {
      requestOptions.auth = defaultAuth
    }

    return requestOptions
  }

  function makeRequest (options, callback) {
    request(options, function (err, response, body) {
      if (err) {
        throw new Error(err.message)
      }
      callback(response, body)
    })
  }
}
