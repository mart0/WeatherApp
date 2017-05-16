var Arrow = require('arrow')
var server = new Arrow()

server.on('starting', function () {
  server.logger.debug('server is starting!')

  var ejs = require('ejs')
  var engine = {}

  engine.ejs = ejs
  engine.createRenderer = function (content, filename, app) {
    return function (filename, opts, callback) {
      if (!content) {
        content = require('fs').readFileSync(filename, 'utf8').toString()
      }
      callback(null, ejs.render(content, opts))
    }
  }

  engine.extension = 'ejs'
  server.middleware.registerRendererEngine(engine)
})

// start the server
server.start()
