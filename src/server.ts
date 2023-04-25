import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

import cookies from '@fastify/cookie'
import fastify from 'fastify'

const app = fastify()

app.register(cookies)
app.register(transactionsRoutes, {
    prefix: '/transactions'
})

app.listen({ port: env.PORT }).then(() => console.log(`Listening on ${env.PORT}`))
