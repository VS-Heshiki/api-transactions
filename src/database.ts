import { env } from '@/env'

import { Knex, knex as setupKnex } from 'knex'

const db = env.DATABASE_CLIENT === 'sqlite' ? {
    filename: env.DATABASE_URL
} : env.DATABASE_URL

export const config: Knex.Config = {
    client: env.DATABASE_CLIENT,
    connection: db,
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './src/temp/migrations'
    }
}

export const knex = setupKnex(config)
