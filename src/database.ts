import 'dotenv/config'
import { Knex, knex as setupKnex } from 'knex'

export const config: Knex.Config = {
    client: 'sqlite',
    connection: {
        filename: process.env.DATABASE_URL as string
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './src/temp/migrations'
    }
}

export const knex = setupKnex(config)
