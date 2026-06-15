import fp from "fastify-plugin"
import { PrismaClient } from "@prisma/client";

// Use 'async' to support awaiting client connection
export default fp(async (fastify, opts) => {
  const prisma = new PrismaClient();

  // Decorate fastify so you can access it via `fastify.prisma`
  fastify.decorate('prisma', prisma);

  // Gracefully close the database connection when Fastify shuts down
  fastify.addHook('onClose', async (server) => {
    await prisma.$disconnect();
  });
});

// TypeScript declaration to ensure auto-complete in Fastify requests
declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}