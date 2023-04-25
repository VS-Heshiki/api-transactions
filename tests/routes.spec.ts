import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

beforeAll(async () => {
    await app.ready()
})

afterAll(async () => {
    await app.close()
})

describe('Route /transaction', () => {
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
