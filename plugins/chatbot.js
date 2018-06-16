import axios from 'axios'
import boom from 'boom'

const chatbot = {
  name: 'chatbot',
  version: '1.0.0',
  register: async (server) => {
    server.route([
      // Form's route.
      {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
          request.session.views = request.session.views + 1 || 1
          return h.view('index', { title: 'Form', page: 'form' })
        },
      },
      // Add a message.
      {
        method: 'POST',
        path: '/',
        async handler(request) {
          const swansonQuotes = await axios.get('http://ron-swanson-quotes.herokuapp.com/v2/quotes')
          let result = await request.mongo.db.collection('chatbot').findOne({ userId: request.payload.user_id, 'thread.id': request.state.id })

          if (result) {
            const values = {
              'thread.$.messages': {
                userMessage: request.payload.message,
                botResponse: swansonQuotes.data[0],
              },
            }

            const response = await request.mongo.db.collection('chatbot').updateOne({ userId: request.payload.user_id, 'thread.id': request.state.id }, { $push: values })

            if (!response.result.nModified) {
              throw boom.badData('Bad data')
            }

            return {
              userId: request.payload.user_id,
              userMessage: request.payload.message,
              botResponse: swansonQuotes.data[0],
              threadId: request.state.id,
            }
          }

          result = await request.mongo.db.collection('chatbot').findOne({ userId: request.payload.user_id })

          if (result) {
            const values = {
              thread: {
                id: request.state.id,
                messages: [
                  {
                    userMessage: request.payload.message,
                    botResponse: swansonQuotes.data[0],
                  },
                ],
              },
            }

            const response = await request.mongo.db.collection('chatbot').updateOne({ userId: request.payload.user_id }, { $push: values })

            if (!response.result.nModified) {
              throw boom.badData('Bad data')
            }

            return {
              userId: request.payload.user_id,
              userMessage: request.payload.message,
              botResponse: swansonQuotes.data[0],
              threadId: request.state.id,
            }
          }

          const values = {
            userId: request.payload.user_id,
            thread: [
              {
                id: request.state.id,
                messages: [
                  {
                    userMessage: request.payload.message,
                    botResponse: swansonQuotes.data[0],
                  },
                ],
              },
            ],
          }

          const response = await request.mongo.db.collection('chatbot').insert(values)

          if (!response.insertedCount) {
            throw boom.badData('Bad data')
          }

          return response.ops
        },
      },
      // Get the threadId.
      {
        method: 'GET',
        path: '/user/{id}',
        async handler(request) {
          const result = await request.mongo.db.collection('chatbot').findOne({ userId: request.params.id })

          if (result === null) {
            throw boom.notFound('Wrong userId')
          }

          return result.thread.map(thread => thread.id)
        },
      },
      // Get the thread content.
      {
        method: 'GET',
        path: '/thread/{id}',
        async handler(request) {
          const result = await request.mongo.db.collection('chatbot').findOne({ 'thread.id': request.params.id })

          if (result === null) {
            throw boom.notFound('Wrong threadId')
          }

          for (const thread of result.thread) {
            if (thread.id === request.params.id) {
              return thread.messages.map(message =>
                ({ userMessage: message.userMessage, botResponse: message.botResponse }))
            }
          }
        },
      },
    ])
  },
}

export default chatbot
