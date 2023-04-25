import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { checkSessionId } from '../middlewares/check-session-id'

export async function transactionsRoutes (app: FastifyInstance): Promise<void> {

    //List all transactions
    app.get('/', { preHandler: [checkSessionId] }, async (request) => {
        const { sessionId } = request.cookies

        const transaction = await knex('transactions').where({ session_id: sessionId }).select()
        return { transaction }
    })

    //List a specific transaction by id
    app.get('/:id', { preHandler: [checkSessionId] }, async (request) => {
        const { sessionId } = request.cookies

        const transactionParamId = z.object({
            id: z.string().uuid()
        })

        const { id } = transactionParamId.parse(request.params)

        const transaction = await knex('transactions').where({ id, session_id: sessionId }).first()

        return { transaction }
    })

    // Get summary of an account
    app.get('/summary', { preHandler: [checkSessionId] }, async (request) => {
        const { sessionId } = request.cookies

        const summary = await knex('transactions').where({ session_id: sessionId }).sum('amount', { as: 'amount' }).first()

        return { summary }
    })

    // Create a new transaction
    app.post('/', async (request, reply) => {
        const transactionData = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, amount, type } = transactionData.parse(request.body)

        let { sessionId } = request.cookies

        if (!sessionId) {
            sessionId = randomUUID()

            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 7 // seven days 📺
            })
        }

        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
            session_id: sessionId
        })

        return reply.code(201).send()
    })
}
