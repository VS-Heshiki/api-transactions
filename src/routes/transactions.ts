import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import crypto from 'node:crypto'

export async function transactionsRoutes (app: FastifyInstance): Promise<void> {
    app.get('/hello', async () => {
        await knex('transactions').insert({
            id: crypto.randomUUID(),
            title: 'transaction test',
            amount: 1000
        })
    })
}
