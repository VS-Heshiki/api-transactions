import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'

export async function transactionsRoutes (app: FastifyInstance): Promise<void> {
    app.get('/', async () => {
        const transaction = await knex('transactions').select()
        return { transaction }
    })

    app.get('/:id', async (request) => {
        const transactionParamId = z.object({
            id: z.string().uuid()
        })

        const { id } = transactionParamId.parse(request.params)

        const transaction = await knex('transactions').where({ id }).first()

        return { transaction }
    })

    app.post('/', async (request, reply) => {
        const transactionData = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit'])
        })

        const { title, amount, type } = transactionData.parse(request.body)

        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1
        })

        return reply.code(201).send()
    })
}
