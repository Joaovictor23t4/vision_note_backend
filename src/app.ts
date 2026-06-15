import Fastify from "fastify";
import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "./plugins/prisma";

const app = Fastify({ logger: true });

app.register(prisma);
app.get("/", (req: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send("Servidor funcionando");
});

app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
})