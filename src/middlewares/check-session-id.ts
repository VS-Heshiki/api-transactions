import { FastifyReply, FastifyRequest } from 'fastify'

export const checkSessionId = async (request: FastifyRequest, reply: FastifyReply) => {
    const { sessionId } = request.cookies

    if (!sessionId) {
        return reply.code(401).send({
            error: '⚠️ Unauthorized!'
        })
    }
}
