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
})
