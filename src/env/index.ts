import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
    DATABASE_URL: z.string(),
    PORT: z.number().default(8888)
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('⚠️ Invalid environment variable! ⚠️', _env.error.format())
    throw new Error('Environment variable error!')
}

export const env = _env.data
