import { app } from '@/app'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Route /transactions', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
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
            const responseCreateTransaction = await request(app.server)
                .post('/transactions')
                .send({
                    title: 'new transaction',
                    amount: 120,
                    type: 'debit'
                })

            const cookie = responseCreateTransaction.get('Set-Cookie')

            const response = await request(app.server)
                .get('/transactions')
                .set({ cookie })

            expect(response.statusCode).toBe(200)
            expect(response.body.transaction[0]).toBeTruthy()
        })
    })
})
