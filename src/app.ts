import Fastify from "fastify";
import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "./plugins/prisma";
import { notesRoutes } from "./rotes/notes";
import "dotenv/config"
import fastifyCors from "@fastify/cors";

const app = Fastify({ logger: true });

app.register(fastifyCors, {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
});

app.register(prisma);
app.register(notesRoutes);
app.get("/", (req: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send("Servidor funcionando");
});

app.listen({ port: 3000 }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
})