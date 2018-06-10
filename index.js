'use strict'

import Debug from 'debug'
import ejs from 'ejs'
import hapi from 'hapi'
import mongodb from 'hapi-mongodb'
import session from 'hapi-server-session'
import inert from 'inert'
import path from 'path'
import vision from 'vision'
import chatbot from './plugins/chatbot'

const debug = Debug('chatbot')
const port = process.env.PORT || 8080
const start = async () => {
  // Server's configuration.
  const server = hapi.server({
    host: 'localhost',
    port,
    routes: {
      files: {
        relativeTo: path.join(__dirname, 'public'),
      },
    },
  })

  // Middleware for static files.
  await server.register(inert)
  // Middleware for template engine.
  await server.register(vision)
  // Ejs configuration.
  server.views({
    engines: {
      ejs,
    },
    // compileMode: 'async', // je ne le maitrise pas encore, tourne dans le vide
    relativeTo: __dirname,
    path: 'templates',
  })
  // Middleware to set session.
  await server.register({
    plugin: session,
    options: {
      cookie: {
        isSecure: false,
        isSameSite: 'Strict',
      },
      // 15 minutes.
      expiresIn: 15 * 60 * 1000,
    },
  })
  // Middleware of MongoDB.
  await server.register({
    plugin: mongodb,
    options: {
      url: 'mongodb://localhost:27017/yelda',
      decorate: true,
    },
  })
  // My middleware :)
  await server.register({
    plugin: chatbot,
  })

  server.route([
    // Static files route.
    {
      method: 'GET',
      path: '/static/{filename}',
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          index: true,
        },
      },
    },
  ])

  await server.start()
  debug('Server running at:', server.info.uri)
}

start()
  .catch(error => debug(error))
