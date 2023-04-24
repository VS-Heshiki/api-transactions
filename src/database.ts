import 'dotenv/config'
import { Knex, knex as setupKnex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
    client: 'sqlite',
    connection: {
        filename: env.DATABASE_URL
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './src/temp/migrations'
    }
}

export const knex = setupKnex(config)
