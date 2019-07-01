'use strict'
const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const config = require('config')
const favicon = require('serve-favicon')
var serveStatic = require('serve-static')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const timeout = require('connect-timeout')
var processExit = false

config.home_directory = __dirname

if (process.env.NODE_ENV !== 'development') {
  console.log('adding compression')
  app.use(compression())
} else {
  console.log('Testing Debug')
}

const haltOnTimedout = (req, res, next) => {
  if (!req.timedout) next()
}

app.use(timeout('60s'))
app.use(helmet())
app.use(haltOnTimedout)
app.use(cookieParser())

app.use(bodyParser.json({
  limit: '100mb'
})) // parse application/json
app.use(bodyParser.json({
  type: 'application/vnd.api+json',
  limit: '100mb'
})) // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: true,
  parameterLimit: 50000
})) // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')) // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
if (process.env.NODE_ENV !== 'development') {
  console.log('adding chache options', __dirname)
  app.use(express.static(__dirname + '/dist')) // set the static files location /public/img will be /img for users
} else {
  app.use(express.static(path.resolve(`${__dirname}/dist`))) // set the static files location /src/assets will be /img for users
}
if (process.env.NODE_ENV !== 'development') {
  // app.use(favicon(path.resolve(__dirname, '/dist/favicon.ico')))
  app.use(favicon(`${__dirname}/src/favicon.ico`))
} else {
  // app.use(favicon(__dirname, '/src/favicon.ico'))
}

const logErrors = (err, req, res, next) => {
  console.log('in logErrors')
  console.error(err.stack)
  next(err)
}

const clientErrorHandler = (err, req, res, next) => {
  console.log('in clientErrorHandler')
  if (req.xhr) {
    res.status(500).send({
      error: 'Something failed!'
    })
  } else {
    next(err)
  }
}

app.use(logErrors)
app.use(clientErrorHandler)

require('./rest-app/routes')(app)

app.use(cors(), (req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

app.get('*', function (req, res, next) {
  // if (app.get('env') === 'staging' || app.get('env') === 'production') {
  //   res.sendFile(path.resolve(`${__dirname}/dist/browser/index.html`))
  // } else
  if (app.get('env') === 'production') {
    res.sendFile(`${__dirname}/dist/index.html`)
    // res.send('welcome to way2money merchant production api')
  } else {
    res.send('welcome to way2money development api')
  }
})

app.internalError = (err, code, res) => {
  const error = {}
  error.message = err
  error.status = 'error'
  res.statusCode = code
  return res.send(error)
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: err
    })
  })
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: {}
    })
  })
}

app.use((err, req, res, next) => {
  res.end(err.message) // this catches the error!!
})

/**
 * Normalize a port into a number, string, or false.
 */

var normalizePort = function (val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

// EncDec.base64EncReq({ key: 'my name is khan' })

const port = normalizePort(config.port || '3333')
app.set('port', port)
app.listen(port, config.host, () => {
  console.log(`Server listening on ${port}`)
})

process.on('uncaughtException', (err) => {
  console.error((new Date()).toUTCString() + ' uncaughtException:', err.message)
  console.error(err)
})

process.on('SIGINT', () => {
  console.log(' on exit called by node')
  processExit = true
  process.exit(1)
})

exports = module.exports = app // expose app
