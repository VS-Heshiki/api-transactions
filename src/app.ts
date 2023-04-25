import { transactionsRoutes } from '@/routes/transactions'

import cookies from '@fastify/cookie'
import fastify from 'fastify'

export const app = fastify()

app.register(cookies)
app.register(transactionsRoutes, {
    prefix: '/transactions'
})
