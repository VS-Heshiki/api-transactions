import { app } from '@/app'

import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { } from 'node:test'
import { execSync } from 'node:child_process'

describe('Route /transactions', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    beforeEach(() => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })

    describe('/POST', () => {
        it('should create a new transaction', async () => {
            const response = await request(app.server)
                .post('/transactions')
                .send({
                    title: 'new transaction',
                    amount: 120,
                    type: 'debit'
                })

            expect(response.statusCode).toBe(201)
        })
    })


    describe('/GET', () => {
        it('should list all transactions', async () => {
            const postTransactionResponse = await request(app.server)
                .post('/transactions')
                .send({
                    title: 'new transaction',
                    amount: 120,
                    type: 'debit'
                })

            const cookie = postTransactionResponse.get('Set-Cookie')

            await request(app.server)
                .post('/transactions')
                .set({ cookie })
                .send({
                    title: 'new transaction 2',
                    amount: 1000,
                    type: 'credit'
                })



            const response = await request(app.server)
                .get('/transactions')
                .set({ cookie })

            expect(response.statusCode).toBe(200)
            expect(response.body.transaction[0]).toEqual(expect.objectContaining({
                title: 'new transaction',
                amount: -120
            }))
            expect(response.body.transaction[1]).toEqual(expect.objectContaining({
                title: 'new transaction 2',
                amount: 1000
            }))
        })

        it('should list a specific transaction', async () => {
            const postTransactionResponse = await request(app.server)
                .post('/transactions')
                .send({
                    title: 'new transaction',
                    amount: 120,
                    type: 'credit'
                })

            const cookie = postTransactionResponse.get('Set-Cookie')

            const listTrasanctionsResponse = await request(app.server)
                .get('/transactions')
                .set({ cookie })
                .expect(200)

            const transactionId = listTrasanctionsResponse.body.transaction[0].id

            const getTransactionResponse = await request(app.server)
                .get(`/transactions/${transactionId}`)
                .set({ cookie })

            expect(getTransactionResponse.body.transaction).toEqual(
                expect.objectContaining({
                    title: 'new transaction',
                    amount: 120,
                })
            )
        })
    })
})
