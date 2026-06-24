import { FastifyInstance } from "fastify";
import { NoteController } from "../controlers/notes";
import { NoteRepository } from "../repositories/notes";
import { NoteService } from "../services/notes";

export async function notesRoutes(app: FastifyInstance) {
    const repository: NoteRepository = new NoteRepository(app);
    const service: NoteService = new NoteService(repository);
    const controller: NoteController = new NoteController(service);

    app.get("/api/notes/", controller.findAll.bind(controller));
    app.get<{ Params: { id: string } }>("/api/notes/:id", controller.findById.bind(controller));
    app.post<{ Body: { title: string, content: string } }>("/api/notes/", controller.create.bind(controller));
    app.patch<{ Body: { title?: string, content?: string }, Params: { id: string } }>("/api/notes/:id", controller.update.bind(controller));
    app.delete<{ Params: { id: string } }>("/api/notes/:id", controller.delete.bind(controller));
}