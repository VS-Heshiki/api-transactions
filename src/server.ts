import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {
    await knex('sqlite_schema').select('*')
})

app.listen({ port: 8888 }).then(() => console.log('Listening on 8888'))
