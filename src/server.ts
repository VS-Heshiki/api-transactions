require('module-alias/register')

import { app } from '@/app'
import { env } from '@/env'


app.listen({ port: env.PORT }).then(() => console.log(`Listening on ${env.PORT}`))
